from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import builder, detector, improve, job_match, pdf, payment

app = FastAPI(title="ResumeAI Backend", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(builder.router, prefix="/api/resume", tags=["builder"])
app.include_router(detector.router, prefix="/api", tags=["detector"])
app.include_router(improve.router, prefix="/api/resume", tags=["improve"])
app.include_router(job_match.router, prefix="/api", tags=["job-match"])
app.include_router(pdf.router, prefix="/api/resume", tags=["pdf"])
app.include_router(payment.checkout.router, prefix="/api/payment", tags=["payment"])
app.include_router(payment.webhook.router, prefix="/api/payment", tags=["payment"])

@app.get("/")
async def root():
    return {"message": "ResumeAI Backend is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
