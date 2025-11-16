from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sst_service_local import speech_to_text

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Backend is up :)"}


@app.post("/sst")
async def sst(file: UploadFile = File(...)):
    """
    Accepts an uploaded audio file from the frontend and returns
    a real transcript from ElevenLabs + a simple explanation.
    """
    audio_bytes = await file.read()
    print(f"Got audio bytes: {len(audio_bytes)}")

    try:
        transcript = speech_to_text(audio_bytes)
    except Exception as e:
        print("Error in speech_to_text:", e)
        transcript = "There was an error calling the speech-to-text service."

    # You can replace this with an LLM call later
    answer = (
        "Here's a quick explanation based on your answer: "
        "right now this is just placeholder text."
    )

    return {"transcript": transcript, "answer": answer}
