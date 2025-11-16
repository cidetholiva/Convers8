# backend/src/entry.py

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from dotenv import load_dotenv
from pypdf import PdfReader
from io import BytesIO
import base64
import os

import sst_service_local as sst          # your local STT helper (ElevenLabs/Whisper/etc.)
import tts_service_local as tts          # your local TTS helper (ElevenLabs)
from gemini_service_local import (
    summarize_notes,
    answer_with_notes,
)

# ---------------- ENV + CONFIG ----------------

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

print("DEBUG: Loaded ELEVENLABS_API_KEY:", ELEVENLABS_API_KEY)
print("DEBUG: ELEVENLABS_API_KEY set?:", bool(ELEVENLABS_API_KEY))
print("DEBUG: GEMINI_API_KEY set?:", bool(GEMINI_API_KEY))

# 👉 Pick a default ElevenLabs voice here (female, friendly, etc.)
# You can replace this with any other voice ID from your ElevenLabs account.
DEFAULT_VOICE_ID = "pNInz6obpgDQGcFmaJgB"  # example: 'Clyde' / 'Sarah' / etc.

# In-memory storage for current session notes
NOTES_TEXT: str | None = None
NOTES_SUMMARY: str | None = None

# ---------------- FASTAPI APP ----------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your Next.js dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Backend is up :)"}


# ------------- UPLOAD NOTES (TXT + PDF) -------------

@app.post("/upload-notes")
async def upload_notes(file: UploadFile = File(...)):
    """
    Accepts a study-notes file (TXT or PDF),
    extracts raw text, summarizes with Gemini,
    and stores both in memory for later voice queries.
    """
    global NOTES_TEXT, NOTES_SUMMARY

    try:
        file_bytes = await file.read()
        filename = (file.filename or "").lower()

        # ---- PDF SUPPORT ----
        if filename.endswith(".pdf"):
            pdf = PdfReader(BytesIO(file_bytes))
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        else:
            # ---- TXT (or other plain text-like) fallback ----
            text = file_bytes.decode("utf-8", errors="ignore")

        print("DEBUG: EXTRACTED NOTES LENGTH =", len(text))

        if not text.strip():
            return {"error": "Could not extract text from the uploaded file."}

        # Store full text
        NOTES_TEXT = text

        # Summarize with Gemini (SYNC, no await)
        summary = summarize_notes(text)
        NOTES_SUMMARY = summary
        print("DEBUG: SAVED NOTES_SUMMARY length =", len(summary))

        return {
            "status": "ok",
            "notes_length": len(text),
            "summary_preview": summary[:200],
        }

    except Exception as e:
        print("Upload error:", e)
        return {"error": str(e)}


# ------------- VOICE S T T + GEMINI + T T S -------------

@app.post("/sst")
async def sst_endpoint(file: UploadFile = File(...)):
    """
    - Takes an audio file from the frontend (webm)
    - Runs STT to get a transcript
    - If no notes uploaded yet → asks user to upload
    - If notes exist → calls Gemini with {NOTES_SUMMARY + transcript}
    - Uses ElevenLabs TTS to synthesize the answer
    - Returns {transcript, answer, audio_base64}
    """
    global NOTES_SUMMARY

    audio_bytes = await file.read()
    print(f"Got audio file: {file.filename}, {len(audio_bytes)} bytes")

    # --- Speech-to-text ---
    transcript = sst.speech_to_text(audio_bytes)
    print("DEBUG transcript:", transcript)

    # Decide what to answer
    if not transcript.strip():
        answer = (
            "I couldn't quite hear that. Try speaking a bit more clearly "
            "or closer to the mic."
        )
    elif not NOTES_SUMMARY:
        answer = (
            "Please upload your study notes first so I can quiz you and "
            "explain things in context."
        )
    else:
        # Use Gemini with the current notes summary + user transcript
        answer = answer_with_notes(NOTES_SUMMARY, transcript)

    # --- Text-to-speech (ElevenLabs) ---
    try:
        # If your tts_service_local.text_to_speech supports a voice_id param:
        tts_audio = tts.text_to_speech(answer, voice_id=DEFAULT_VOICE_ID)
    except TypeError:
        # Fallback if your helper only takes the text argument
        tts_audio = tts.text_to_speech(answer)

    audio_base64 = base64.b64encode(tts_audio).decode("utf-8")

    return {
        "transcript": transcript,
        "answer": answer,
        "audio_base64": audio_base64,
    }
