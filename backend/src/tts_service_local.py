# backend/src/tts_service_local.py

from pathlib import Path
from dotenv import load_dotenv
import os
from typing import Optional

from elevenlabs.client import ElevenLabs

BASE_DIR = Path(__file__).resolve().parent
env_path = BASE_DIR / ".env"
load_dotenv(env_path)

ELEVEN_API_KEY = os.getenv("ELEVENLABS_API_KEY")

client: Optional[ElevenLabs] = None
if ELEVEN_API_KEY:
    client = ElevenLabs(api_key=ELEVEN_API_KEY)
else:
    print("WARNING: ELEVENLABS_API_KEY is not set; TTS will be disabled.")


def text_to_speech(text: str) -> bytes:
    """
    Convert text to speech using ElevenLabs and return raw audio bytes.
    NOTE: You may need to adjust the exact arguments/IDs based on
    the latest ElevenLabs Python SDK docs and the voices you have enabled.
    """
    if not client:
        return b""

    # TODO: set these to values from your ElevenLabs account
    voice_id = "cgSgspJ2msm6clMCkdW9"      # example voice ID
    model_id = "eleven_turbo_v2"           # example model

    # Depending on SDK version, this may return bytes or an iterator of chunks.
    audio = client.text_to_speech.convert(
        voice_id=voice_id,
        model_id=model_id,
        text=text,
        output_format="mp3_44100_128",
    )

    # If it's already bytes:
    if isinstance(audio, (bytes, bytearray)):
        return bytes(audio)

    # If it's an iterator/generator of chunks:
    collected = bytearray()
    for chunk in audio:
        collected.extend(chunk)
    return bytes(collected)
