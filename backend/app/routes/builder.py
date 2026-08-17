from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import openai
import os

router = APIRouter()

class ResumeRequest(BaseModel):
    personalInfo: dict
    experience: List[dict]
    education: List[dict]
    skills: List[str]

class ResumeResponse(BaseModel):
    resume: str

@router.post("/generate", response_model=ResumeResponse)
async def generate_resume(request: ResumeRequest):
    try:
        openai.api_key = os.getenv("OPENAI_API_KEY")
        
        prompt = f"""
        Create a professional, high-impact resume/CV based on the following details:
        
        Personal Information:
        {request.personalInfo}
        
        Work Experience:
        {request.experience}
        
        Education:
        {request.education}
        
        Skills:
        {request.skills}
        
        Please format the response as a clean Markdown document. Use professional headers, bullet points for achievements, and a modern structure. Focus on quantifiable results and strong action verbs.
        """

        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an expert professional resume writer."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )

        resume_text = response.choices[0].message.content
        return ResumeResponse(resume=resume_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate resume: {str(e)}")
