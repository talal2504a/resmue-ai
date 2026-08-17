from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import openai
import os
import json

router = APIRouter()

class JobMatchRequest(BaseModel):
    resume: str
    jobDescription: str

class JobMatchResponse(BaseModel):
    matchScore: int
    matchedSkills: List[str]
    missingSkills: List[str]
    keywordGaps: List[str]
    suggestions: List[str]

@router.post("/job-match", response_model=JobMatchResponse)
async def job_match(request: JobMatchRequest):
    try:
        openai.api_key = os.getenv("OPENAI_API_KEY")
        
        prompt = f"""
        Analyze the following resume against the job description and provide a detailed match analysis.
        
        Resume:
        {request.resume}
        
        Job Description:
        {request.jobDescription}
        
        Provide a JSON response with the following structure:
        {{
            "matchScore": 82,
            "matchedSkills": ["React", "JavaScript", "HTML", "CSS"],
            "missingSkills": ["TypeScript", "Docker", "AWS"],
            "keywordGaps": ["leadership", "agile", "ci/cd"],
            "suggestions": [
                "Add TypeScript to your skills section",
                "Include AWS experience or certifications",
                "Highlight leadership and project management experience"
            ]
        }}
        
        Be thorough and specific in your analysis.
        """

        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an expert ATS (Applicant Tracking System) analyst and career coach."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
        )

        content = response.choices[0].message.content
        result = json.loads(content)
        return JobMatchResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze job match: {str(e)}")
