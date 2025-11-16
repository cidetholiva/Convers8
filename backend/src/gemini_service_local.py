# backend/src/gemini_service_local.py

import os
import google.generativeai as genai

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    # Simple + safe default model
    MODEL_ID = "gemini-flash-latest"
    model = genai.GenerativeModel(MODEL_ID)
    print("DEBUG: Gemini configured with model:", MODEL_ID)
else:
    model = None
    print("DEBUG: No GEMINI_API_KEY set – Gemini helpers will fall back.")


def _safe_text(resp) -> str:
    """
    Safely extract text from a Gemini response.
    Handles cases where resp.text is missing or finish_reason != STOP.
    """
    if not resp:
        return ""

    # 1) Try the convenience accessor
    try:
        if getattr(resp, "text", None):
            return resp.text
    except Exception:
        pass

    # 2) Manually walk candidates/parts
    try:
        parts = []
        for cand in getattr(resp, "candidates", []):
            content = getattr(cand, "content", None)
            if not content:
                continue
            for part in getattr(content, "parts", []):
                txt = getattr(part, "text", None)
                if txt:
                    parts.append(txt)
        return "\n".join(parts)
    except Exception:
        return ""


def summarize_notes(notes: str) -> str:
    """
    Turn raw notes text into a short, paraphrased study summary.
    This is SYNC – do NOT 'await' it.
    """
    if not model:
        print("Gemini summarize_notes: no model configured, using fallback.")
        # Just fall back to truncated raw notes
        return notes[:1000]

    try:
        prompt = (
            "You are a friendly tutor. Summarize the following study notes in "
            "5–7 bullet points, paraphrasing everything in your own words. "
            "Do NOT copy long phrases directly; keep it short and study-friendly.\n\n"
            f"{notes[:6000]}"
        )

        resp = model.generate_content(prompt)
        text = _safe_text(resp)

        if not text.strip():
            # Safety / blocked → fallback
            print("Gemini summarize_notes: empty text (likely safety). Using fallback.")
            return "I loaded your notes successfully, but I couldn’t auto-summarize them. I’ll still use them to quiz you."

        return text

    except Exception as e:
        print("Gemini summarize_notes error:", e)
        # Fallback: just return a chunk of the notes
        return notes[:1000]


def answer_with_notes(notes_summary: str, transcript: str) -> str:
    """
    Use the notes summary + what the student just said
    to generate an explanation / quiz question.
    This is SYNC – do NOT 'await' it.
    """
    if not model:
        print("Gemini answer_with_notes: no model configured, using fallback.")
        return (
            "I don't have access to Gemini right now, but based on your notes, "
            "try explaining the main idea in your own words. I’ll help you refine it."
        )

    try:
        prompt = (
            "You are an AI study partner using the Feynman Technique.\n"
            "- You have a summary of the student's notes.\n"
            "- The student just spoke out loud.\n"
            "- You respond in a conversational, encouraging way.\n"
            "- Either explain the concept more clearly OR ask a follow-up question "
            "to test their understanding.\n\n"
            f"Notes summary:\n{notes_summary}\n\n"
            f"Student just said (transcript):\n{transcript}\n\n"
            "Now respond to the student."
        )

        resp = model.generate_content(prompt)
        text = _safe_text(resp)

        if not text.strip():
            print("Gemini answer_with_notes: empty text (likely safety). Using fallback.")
            return (
                "I had trouble generating an answer from Gemini just now, "
                "but based on your notes, try walking through the main idea step by step. "
                "What is the concept really saying in your own words?"
            )

        return text

    except Exception as e:
        print("Gemini answer_with_notes error:", e)
        return (
            "I ran into an issue talking to Gemini, but let's still practice: "
            "explain the main point of your notes in one or two sentences."
        )
