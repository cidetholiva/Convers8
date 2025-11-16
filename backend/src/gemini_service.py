import json
from google import generativeai as genai
from typing import List, Dict

def extract_concepts(content: str, api_key: str) -> List[str]:
    """
    Extract 3-5 key concepts from study material
    
    Args:
        content: Text content of study material
        api_key: Gemini API key
        
    Returns:
        List of concept strings
    """
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')
    prompt = f"""Analyze this study material and extract 3-5 key concepts. 
Return ONLY a JSON array like: ["concept1", "concept2", "concept3"]

{content}"""
    
    try:
        response = model.generate_content(prompt)
        concepts_text = response.text.replace('```json', '').replace('```', '').strip()
        concepts = json.loads(concepts_text)
        return concepts
    except Exception as e:
        print(f"Error extracting concepts: {e}")
        raise


def generate_feynman_questions(concepts: List[str], api_key: str) -> List[Dict[str, str]]:
    """
    Generate Feynman Technique questions for given concepts
    
    Args:
        concepts: List of concept strings
        api_key: Gemini API key
        
    Returns:
        List of dicts with 'question' and 'concept' keys
    """
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')
    prompt = f"""Create 3 Feynman Technique questions for these concepts: {', '.join(concepts)}

Ask the student to explain in simple terms. 
Return ONLY JSON: [{{"question": "...", "concept": "..."}}]"""
    
    try:
        response = model.generate_content(prompt)
        questions_text = response.text.replace('```json', '').replace('```', '').strip()
        questions = json.loads(questions_text)
        return questions
    except Exception as e:
        print(f"Error generating questions: {e}")
        raise


def generate_tutor_response(student_message: str, api_key: str, context: str = "") -> str:
    """
    Generate conversational tutor response using Feynman Technique
    
    Args:
        student_message: What the student said
        api_key: Gemini API key
        context: Optional conversation context
        
    Returns:
        AI tutor response string
    """
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    context_prompt = f"Context: {context}\n\n" if context else ""
    prompt = f"""{context_prompt}You are a friendly tutor using the Feynman Technique. 
Student said: "{student_message}"

Respond conversationally and ask a follow-up question to deepen understanding. Keep it under 50 words."""
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating tutor response: {e}")
        raise


def analyze_student_response(question: str, student_response: str, api_key: str) -> Dict:
    """
    Analyze and evaluate student's answer to a question
    
    Args:
        question: The question that was asked
        student_response: Student's answer
        api_key: Gemini API key
        
    Returns:
        Dict with 'score' (1-10), 'feedback', and 'followUp' keys
    """
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')
    prompt = f"""Student was asked: "{question}"
Their answer: "{student_response}"

Evaluate their understanding using the Feynman Technique principles:
- Can they explain it simply?
- Do they understand the core concept?
- Where are the gaps?

Return ONLY JSON: {{"score": 1-10, "feedback": "constructive feedback...", "followUp": "next question..."}}"""
    
    try:
        response = model.generate_content(prompt)
        analysis_text = response.text.replace('```json', '').replace('```', '').strip()
        analysis = json.loads(analysis_text)
        return analysis
    except Exception as e:
        print(f"Error analyzing response: {e}")
        raise


def generate_study_summary(concepts: List[str], responses: List[Dict], api_key: str) -> str:
    """
    Generate a summary of the study session
    
    Args:
        concepts: List of concepts covered
        responses: List of student responses with scores
        api_key: Gemini API key
        
    Returns:
        Summary text
    """
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    avg_score = sum(r.get('score', 0) for r in responses) / len(responses) if responses else 0
    
    prompt = f"""Generate a brief study summary for these concepts: {', '.join(concepts)}

Average score: {avg_score}/10
Number of questions answered: {len(responses)}

Provide:
1. Overall performance (2 sentences)
2. Strong areas (1 sentence)
3. Areas to review (1 sentence)
4. Next steps (1 sentence)

Keep total under 100 words."""
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating summary: {e}")
        raise
