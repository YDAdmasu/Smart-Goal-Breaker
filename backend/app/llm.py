import os
import json
from typing import Dict, Any
from groq import Groq

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama3-8b-8192")

def parse_ai_response_to_json(text: str) -> Dict[str, Any]:
    """
    Expect the model to return JSON. Try to parse; otherwise provide fallback.
    """
    try:
        # Try to extract JSON from markdown code blocks if present
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].split("```")[0].strip()
        
        return json.loads(text)
    except Exception:
        # Very conservative fallback: attempt to extract lines like 1. .. 2. ..
        tasks = []
        for line in text.splitlines():
            line = line.strip()
            if not line: 
                continue
            # strip leading numbering
            if line and line[0].isdigit():
                parts = line.split('.', 1)
                if len(parts) > 1:
                    tasks.append(parts[1].strip())
                    continue
            tasks.append(line)
        # return first 5 found or pad
        tasks = tasks[:5]
        while len(tasks) < 5:
            tasks.append("Refine this step further.")
        return {"tasks": tasks, "complexity": 5}

def local_generate(goal: str) -> Dict[str, Any]:
    # Deterministic simple logic for dev/testing
    base = [
        f"Research the market for '{goal}'",
        "Define the 1-page plan (problem, solution, 3 features)",
        "Build a minimum viable version (MVP)",
        "Test with 5–10 users and iterate",
        "Prepare go-to-market and outreach"
    ]
    return {"tasks": base, "complexity": 6}

def gemini_generate(goal: str) -> Dict[str, Any]:
    """
    Call Groq API using Llama model to generate actionable steps.
    Groq is fast, free, and has generous rate limits.
    """
    if not GROQ_API_KEY or GROQ_API_KEY == "your_groq_api_key_here":
        return local_generate(goal)

    prompt = f"""Break down this goal into exactly 5 actionable steps and rate its complexity.

Goal: {goal}

Return ONLY a JSON object with this exact format:
{{
  "tasks": ["step 1", "step 2", "step 3", "step 4", "step 5"],
  "complexity": 7
}}

Where:
- tasks: array of exactly 5 short, actionable steps (strings)
- complexity: integer from 1 to 10 (1=very easy, 10=very hard)

Return only the JSON, no other text."""

    try:
        # Initialize Groq client
        client = Groq(api_key=GROQ_API_KEY)
        
        # Generate content using Groq
        response = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are a goal-setting expert. Break down goals into exactly 5 clear, actionable steps with a complexity rating. Always respond with valid JSON only."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=500,
            top_p=1,
            stream=False
        )
        
        # Extract the text from the response
        if response and response.choices and len(response.choices) > 0:
            text = response.choices[0].message.content
            return parse_ai_response_to_json(text)
        
        # If we can't get text, fall back to local
        print("Groq response has no content")
        return local_generate(goal)
        
    except Exception as e:
        # fallback to local
        print("Groq API call failed:", e)
        return local_generate(goal)
