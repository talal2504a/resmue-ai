from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
import io
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

router = APIRouter()

class PDFRequest(BaseModel):
    content: str
    filename: str = "resume.pdf"

@router.post("/pdf")
async def generate_pdf(request: PDFRequest):
    try:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        styles = getSampleStyleSheet()
        
        # Build the PDF content
        story = []
        for line in request.content.split('\n'):
            if line.strip():
                if line.startswith('# '):
                    story.append(Paragraph(line[2:], styles['Title']))
                elif line.startswith('## '):
                    story.append(Paragraph(line[3:], styles['Heading2']))
                else:
                    story.append(Paragraph(line, styles['BodyText']))
                story.append(Spacer(1, 12))
        
        doc.build(story)
        buffer.seek(0)
        
        return Response(
            content=buffer.getvalue(),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={request.filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF: {str(e)}")
