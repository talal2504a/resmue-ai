from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
import os
import pdfplumber
import docx2txt
import io

router = APIRouter()

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt", ".md", ".csv", ".json"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


def validate_file(file: UploadFile):
    filename = file.filename or "uploaded"
    ext = os.path.splitext(filename)[1].lower()
    
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type '{ext}' not allowed. Allowed: {', '.join(ALLOWED_EXTENSIONS)}")
    
    return ext


@router.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    try:
        ext = validate_file(file)
        content = await file.read()
        
        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File size exceeds 10MB limit")
        
        text = ""
        
        if ext == ".pdf":
            try:
                with pdfplumber.open(io.BytesIO(content)) as pdf:
                    pages = []
                    for page in pdf.pages:
                        page_text = page.extract_text()
                        if page_text:
                            pages.append(page_text)
                    text = "\n\n".join(pages)
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Failed to read PDF: {str(e)}")
        
        elif ext == ".docx":
            try:
                with docx2txt.process(io.BytesIO(content)) as result:
                    text = result if result else ""
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Failed to read DOCX: {str(e)}")
        
        else:
            try:
                text = content.decode("utf-8", errors="replace")
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Failed to read text file: {str(e)}")
        
        if not text.strip():
            return JSONResponse({
                "success": True,
                "text": "",
                "message": "No readable text found. The file may be image-based/scanned."
            })
        
        return JSONResponse({
            "success": True,
            "text": text.strip(),
            "message": f"Successfully extracted {len(text.strip())} characters"
        })
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")
