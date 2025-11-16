# import os
# from dotenv import load_dotenv
from io import BytesIO
import requests
from elevenlabs.client import ElevenLabs



def speech_to_text(server_env) -> str:
    audio_url = "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
    response = requests.get(audio_url)
    elevenlabs = ElevenLabs(api_key=server_env.ELEVENLABS_API_KEY)
    #audio_data = BytesIO(audio_file_bytes)  # Convert bytes to file-like object
    audio_data = BytesIO(response.content)
    transcription = elevenlabs.speech_to_text.convert(
         file=audio_data,
         model_id="scribe_v1",
         language_code="eng",
    )
    # # print(transcription)
    return transcription
    