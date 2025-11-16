from io import BytesIO
from pathlib import Path
import os

from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs


# ---------------------------
# Load environment variables
# ---------------------------
# Path to backend/src (this file's folder)
BASE_DIR = Path(__file__).resolve().parent

# .env is in backend/src/.env
env_path = BASE_DIR / ".env"
load_dotenv(env_path)

ELEVEN_API_KEY = os.environ.get("ELEVENLABS_API_KEY")
print("DEBUG: Loaded ELEVENLABS_API_KEY:", ELEVEN_API_KEY)


# ---------------------------
# Speech-to-text helper
# ---------------------------
def speech_to_text(audio_file: bytes) -> str:
    """
    Take raw audio bytes, send them to ElevenLabs STT, return transcript text.
    """
    if not ELEVEN_API_KEY:
        # Frontend will show this message if the key isn't set
        return "ELEVENLABS_API_KEY is not set on the backend."

    # Init ElevenLabs client
    elevenlabs = ElevenLabs(api_key=ELEVEN_API_KEY)

    # Convert bytes to file-like object for the SDK
    audio_data = BytesIO(audio_file)

    # Call ElevenLabs STT
    transcription_result = elevenlabs.speech_to_text.convert(
        file=audio_data,
        model_id="scribe_v1",
        language_code="eng",
    )

    # Handle different possible return shapes
    if isinstance(transcription_result, dict):
        return transcription_result.get("text", "")
    elif hasattr(transcription_result, "text"):
        return transcription_result.text
    else:
        # Fallback: just stringify whatever came back
        return str(transcription_result)


# Optional helper you had before – using a sample audio URL
def speech_to_text2() -> str:
    """
    Example helper that transcribes a fixed demo mp3 from ElevenLabs CDN.
    Useful for testing that your API key works even before wiring the mic.
    """
    import requests

    if not ELEVEN_API_KEY:
        return "ELEVENLABS_API_KEY is not set on the backend."

    audio_url = "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
    response = requests.get(audio_url)
    response.raise_for_status()

    elevenlabs = ElevenLabs(api_key=ELEVEN_API_KEY)
    audio_data = BytesIO(response.content)

    transcription_result = elevenlabs.speech_to_text.convert(
        file=audio_data,
        model_id="scribe_v1",
        language_code="eng",
    )

    if isinstance(transcription_result, dict):
        return transcription_result.get("text", "")
    elif hasattr(transcription_result, "text"):
        return transcription_result.text
    else:
        return str(transcription_result)
