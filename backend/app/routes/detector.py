from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import openai
import os
import json

router = APIRouter()

class DetectionRequest(BaseModel):
    text: str

class DetectionResponse(BaseModel):
    score: int
    indicators: List[str]
    recommendations: str

@router.post("/detect", response_model=DetectionResponse)
async def detect_ai_content(request: DetectionRequest):
    try:
        openai.api_key = os.getenv("OPENAI_API_KEY")
        
        prompt = f"""
        Analyze the following resume text for AI-generated content indicators.
        
        Resume Text:
        {request.text}
        
        Provide:
        1. A score from 0-100 indicating the likelihood of AI-generated content
        2. A list of specific indicators found (e.g., generic wording, repetitive phrasing, uniform writing style, overly formal language)
        3. Recommendations for making the resume more authentic and human-written
        
        Return the response as JSON with the following structure:
        {{
            "score": 72,
            "indicators": ["Generic wording", "Repetitive phrasing"],
            "recommendations": "Add more specific personal achievements and use varied sentence structures."
        }}
        """

        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an expert at detecting AI-generated content in resumes."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
        )

        content = response.choices[0].message.content
        result = json.loads(content)
        return DetectionResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze resume: {str(e)}")
