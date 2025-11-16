# backend/src/gemini_service.py

from pathlib import Path
from dotenv import load_dotenv
import os

import google.generativeai as genai

# -------- Load env + configure Gemini --------
BASE_DIR = Path(__file__).resolve().parent
env_path = BASE_DIR / ".env"
load_dotenv(env_path)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY is not set; Gemini calls will fail.")
else:
    genai.configure(api_key=GEMINI_API_KEY)

# Use a fast, cheap model for now
_model = genai.GenerativeModel("gemini-1.5-flash")


def summarize_notes(raw_text: str) -> str:
    """
    Turn raw uploaded notes into a compact summary we'll reuse
    for every voice turn.
    """
    if not GEMINI_API_KEY:
        # Fallback: just truncate raw text
        return raw_text[:2000]

    prompt = (
        "You are a study assistant. Summarize these notes into concise bullet "
        "points with key concepts, formulas, and examples. Keep it under 300 words.\n\n"
        f"{raw_text[:15000]}"
    )

    resp = _model.generate_content(prompt)
    return (resp.text or "").strip()


def ask_gemini(notes_summary: str, user_transcript: str) -> str:
    """
    Use the notes summary + what the student said
    to generate a teaching-style response.
    """
    if not GEMINI_API_KEY:
        return "Gemini API key is missing on the backend."

    prompt = f"""
You are Convers8, a friendly study partner that uses the Feynman Technique.

STUDY NOTES SUMMARY:
{notes_summary}

STUDENT JUST SAID (their explanation / question):
\"\"\"{user_transcript}\"\"\".

Please:
1. Respond directly to what they said.
2. Gently correct any misunderstandings.
3. Give a short, clear explanation.
4. End with ONE follow-up question that deepens their understanding.

Keep it under 6 sentences.
"""

    resp = _model.generate_content(prompt)
    return (resp.text or "").strip()
