from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import openai
import os

router = APIRouter()

class ImproveRequest(BaseModel):
    resume: str

class ImproveResponse(BaseModel):
    improvedResume: str

@router.post("/improve", response_model=ImproveResponse)
async def improve_resume(request: ImproveRequest):
    try:
        openai.api_key = os.getenv("OPENAI_API_KEY")
        
        prompt = f"""
        Improve the following resume text to make it more professional, impactful, and polished.
        
        Original Resume:
        {request.resume}
        
        Please:
        1. Enhance the wording and language to be more professional and impactful
        2. Add strong action verbs and quantifiable achievements
        3. Improve the structure and flow
        4. Fix any grammar or formatting issues
        5. Make it more compelling to recruiters
        
        Return the improved resume text only, without any explanations or markdown formatting.
        """

        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an expert professional resume writer and editor."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )

        improved_resume = response.choices[0].message.content
        return ImproveResponse(improvedResume=improved_resume)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to improve resume: {str(e)}")
