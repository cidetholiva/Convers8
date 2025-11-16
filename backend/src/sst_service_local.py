from io import BytesIO
from elevenlabs.client import ElevenLabs
from dotenv import load_dotenv
import os

# Load .env so ELEVENLABS_API_KEY is available
load_dotenv()


def speech_to_text(audio_file: bytes) -> str:
    """
    Takes raw audio bytes and returns a transcript string
    using ElevenLabs Scribe.
    """
    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        raise RuntimeError("ELEVENLABS_API_KEY not set in environment")

    client = ElevenLabs(api_key=api_key)

    # Convert bytes to file-like object
    audio_data = BytesIO(audio_file)

    result = client.speech_to_text.convert(
        file=audio_data,
        model_id="scribe_v1",
        language_code="eng",
    )

    # Handle different possible return shapes
    if isinstance(result, dict):
        return result.get("text", "")
    elif hasattr(result, "text"):
        return result.text
    else:
        return str(result)
