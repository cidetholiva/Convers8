from workers import Response, WorkerEntrypoint
# from submodule import get_hello_message
from sst_service_local import speech_to_text
# from tts_service_local import text_to_speech
from fastapi import FastAPI, Request

app = FastAPI()

class Default(WorkerEntrypoint):
    async def fetch(self, request, env):
        import asgi
        return await asgi.fetch(app, request.js_object, self.env)

@app.get("/")
async def hello():
    return {"message": "Hello World!"}

@app.get("/sst")
async def test(req: Request):
    import sst_service_local as sst
    env = req.scope["env"]
    transcription = sst.speech_to_text2(env)
    # message = env.ELEVENLABS_API_KEY
    # return {"message": message}
    return transcription

@app.get("/tts")
async def test(req:Request):
    import tts_service_local as tts
    env = req.scope["env"]
    audio_bytes = tts.text_to_speech("HHHHIIIII", env)
    
    return Response(
        content=audio_bytes,
        media_type="audio/mpeg"
    )
    # message = env.ELEVENLABS_API_KEY
    # return {"message" : message}


    

