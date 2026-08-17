# ResumeAI - AI-Powered Resume Builder

A complete AI-powered resume/CV website that allows users to create, analyze, improve, and optimize resumes using advanced AI technology.

## Features

- **AI Resume Builder**: Generate professional resumes from your details using AI
- **AI Detector**: Analyze resumes for AI-generated content indicators
- **Resume Improver**: Enhance existing resumes with AI-powered suggestions
- **Job Match**: Compare resumes against job descriptions and optimize for ATS
- **Resume Templates**: Choose from professionally designed templates
- **User Dashboard**: Manage saved resumes and job matches

## Tech Stack

### Frontend
- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS
- React Markdown

### Backend
- FastAPI (Python)
- OpenAI API (GPT-4o)
- PDF processing (pdfplumber, python-docx)
- PDF generation (ReportLab)

### Database (Planned)
- Supabase (PostgreSQL)

## Project Structure

```
resume-ai/
├── frontend/ (Next.js app in root)
│   ├── src/app/          # App Router pages
│   ├── src/components/   # React components
│   ├── public/           # Static assets
│   └── package.json
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── models/       # Data models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── utils/        # Utilities
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- OpenAI API key
- (Optional) Supabase account for database

### Frontend Setup

1. Navigate to the project directory:
```bash
cd resume-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup (Optional - for production)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

5. Add your configuration to `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
SECRET_KEY=your_secret_key_here
```

6. Run the FastAPI server:
```bash
uvicorn app.main:app --reload --port 8000
```

## Pages

- `/` - Landing page with hero section and feature overview
- `/builder` - AI Resume Builder
- `/detector` - AI Resume Detector
- `/improve` - Resume Improver
- `/job-match` - Job Match & ATS Optimizer
- `/templates` - Resume Templates
- `/dashboard` - User Dashboard
- `/login` - Login page
- `/signup` - Signup page

## API Endpoints

### Frontend (Next.js API Routes)
- `POST /api/generate` - Generate resume using AI
- `POST /api/detect` - Detect AI-generated content
- `POST /api/improve` - Improve resume content
- `POST /api/job-match` - Match resume with job description

### Backend (FastAPI)
- `POST /api/resume/generate` - Generate resume
- `POST /api/resume/analyze` - Analyze resume
- `POST /api/resume/improve` - Improve resume
- `POST /api/job-match` - Job matching
- `POST /api/resume/extract` - Extract text from files
- `POST /api/resume/pdf` - Generate PDF

## Environment Variables

### Frontend (.env)
```
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key_here
SECRET_KEY=your_secret_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/resume_ai
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Development

### Running Lint
```bash
npm run lint
```

### Type Checking
```bash
npm run typecheck
```

### Building for Production
```bash
npm run build
npm run start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email support@resumeai.com or create an issue in the repository.
