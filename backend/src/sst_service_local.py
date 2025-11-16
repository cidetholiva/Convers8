from io import BytesIO #no need to update in pyproject.toml
import requests
from elevenlabs.client import ElevenLabs



def speech_to_text(audio_file: bytes, server_env) -> str:
    #audio_url = "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
    #response = requests.get(audio_url)
    elevenlabs = ElevenLabs(api_key=server_env.ELEVENLABS_API_KEY)
    audio_data = BytesIO(audio_file)  # Convert bytes to file-like object
    #audio_data = BytesIO(response.content)
    transcription_result = elevenlabs.speech_to_text.convert(
         file=audio_data,
         model_id="scribe_v1",
         language_code="eng",
    )
    if isinstance(transcription_result, dict):
        return transcription_result.get('text', '')
    elif hasattr(transcription_result, 'text'):
        return transcription_result.text
    else:
        # Fallback: convert to string
        return str(transcription_result)
    
    
def speech_to_text2(server_env) -> str:
    audio_url = "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
    response = requests.get(audio_url)
    elevenlabs = ElevenLabs(api_key=server_env.ELEVENLABS_API_KEY)
    # Convert bytes to file-like object
    audio_data = BytesIO(response.content)
    # Transcribe - returns a JSON object
    transcription_result = elevenlabs.speech_to_text.convert(
        file=audio_data,
        model_id="scribe_v1",
        language_code="eng",
    )
    
    # Extract just the text field
    # The result is a dict with 'text', 'language_code', 'words', etc.
    if isinstance(transcription_result, dict):
        return transcription_result.get('text', '')
    elif hasattr(transcription_result, 'text'):
        return transcription_result.text
    else:
        # Fallback: convert to string
        return str(transcription_result)