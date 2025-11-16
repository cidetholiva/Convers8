from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
import os

def text_to_speech(text: str, server_env) -> bytes:
    elevenlabs = ElevenLabs(api_key=server_env.ELEVENLABS_API_KEY)
    audio = elevenlabs.text_to_speech.convert(
        text=text,
        voice_id="JBFqnCBsd6RMkjVDRZzb",
        model_id="eleven_multilingual_v2",
        output_format="mp3_44100_128",
    )
    return audio 