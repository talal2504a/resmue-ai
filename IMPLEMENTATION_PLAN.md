# ResumeAI - Implementation Plan

## Project Overview

AI-powered resume/CV platform that allows users to create, analyze, improve, and optimize resumes using OpenAI GPT-4o. Built with Next.js 16 frontend and FastAPI backend.

## Current Status

### Completed ✅
- Next.js project setup with TypeScript and Tailwind CSS
- Supabase schema with profiles, resumes, job_matches, resume_analyses tables
- Supabase client setup and RLS policies
- Authentication context (AuthContext) and UI
- Frontend pages: Home, Builder, Detector, Improve, Job Match, Templates, Dashboard
- Frontend components: Hero, Navbar, Footer, ResumeForm, ResumePreview, ResumeUpload, Loading, ToastContainer
- API routes: `/api/generate`, `/api/improve`, `/api/detect`, `/api/job-match`
- Responsive UI with Tailwind CSS and Lucide icons

### In Progress 🔄
- Backend FastAPI application setup
- OpenAI API integration for AI features
- PDF processing (upload/extract) and PDF generation
- Database CRUD operations with Supabase

### Pending 📋
- Template system implementation
- PDF download functionality
- Testing and QA
- Production deployment

## Architecture

### Frontend (Next.js 16 + React 19)
```
src/
├── app/
│   ├── api/              # Next.js API routes
│   │   ├── generate/route.ts
│   │   ├── improve/route.ts
│   │   ├── detect/route.ts
│   │   └── job-match/route.ts
│   ├── builder/page.tsx
│   ├── dashboard/page.tsx
│   ├── detector/page.tsx
│   ├── improve/page.tsx
│   ├── job-match/page.tsx
│   ├── templates/page.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/           # Reusable UI components
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ResumeForm.tsx
│   ├── ResumePreview.tsx
│   ├── ResumeUpload.tsx
│   ├── TemplateCard.tsx
│   ├── JobMatchResult.tsx
│   ├── ImprovementResult.tsx
│   ├── DetectorResult.tsx
│   └── Loading.tsx
├── context/              # React context providers
│   ├── AuthContext.tsx
│   └── ToastContext.tsx
└── lib/                  # Utilities and configs
    └── supabase.ts
```

### Backend (FastAPI + Python)
```
backend/
├── app/
│   ├── main.py           # FastAPI app entry point
│   ├── routes/           # API endpoints
│   │   ├── resume.py
│   │   ├── analyze.py
│   │   └── pdf.py
│   ├── services/         # Business logic
│   │   ├── openai_service.py
│   │   ├── pdf_service.py
│   │   └── resume_service.py
│   ├── models/           # Data models
│   │   └── resume.py
│   ├── schemas/          # Pydantic schemas
│   │   └── resume.py
│   └── utils/            # Utilities
│       ├── prompts.py
│       └── parsers.py
├── requirements.txt
└── .env.example
```

### Database (Supabase / PostgreSQL)
- `profiles` - User profile data
- `resumes` - Saved resumes with JSONB for sections
- `job_matches` - Job matching results
- `resume_analyses` - AI detection and improvement history

## Implementation Roadmap

### Phase 1: Foundation (Current)
- [x] Project initialization and structure
- [x] UI/UX design with Tailwind CSS
- [x] Supabase database schema
- [x] Authentication flow
- [ ] Backend FastAPI setup
- [ ] Environment configuration

### Phase 2: Core Features
- [ ] OpenAI service integration
- [ ] Resume generation endpoint
- [ ] Resume improvement endpoint
- [ ] AI detection endpoint
- [ ] Job matching endpoint
- [ ] PDF upload and text extraction
- [ ] PDF generation for resumes

### Phase 3: Data & Persistence
- [ ] CRUD operations for resumes
- [ ] Save/load resume functionality
- [ ] Dashboard data fetching
- [ ] User profile management
- [ ] History tracking for analyses

### Phase 4: Templates & Polish
- [ ] Template rendering engine
- [ ] Multiple resume templates (Modern, Classic, Minimal)
- [ ] PDF export with templates
- [ ] Mobile responsiveness refinement
- [ ] Loading states and error handling

### Phase 5: Testing & Deployment
- [ ] Unit tests for backend services
- [ ] Integration tests for API routes
- [ ] E2E testing with Playwright
- [ ] Performance optimization
- [ ] Production deployment (Vercel + Render/Railway)

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Markdown**: React Markdown + remark-gfm
- **PDF**: pdf-parse (client-side), ReportLab (server-side)
- **State**: React Context + Hooks

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.9+
- **AI**: OpenAI API (GPT-4o)
- **PDF**: pdfplumber, python-docx, ReportLab
- **Validation**: Pydantic

### Database
- **Provider**: Supabase (PostgreSQL)
- **Features**: Row Level Security (RLS), Real-time subscriptions

## API Endpoints

### Frontend (Next.js API Routes)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generate` | Generate resume from user input |
| POST | `/api/improve` | Improve existing resume content |
| POST | `/api/detect` | Detect AI-generated content |
| POST | `/api/job-match` | Match resume against job description |

### Backend (FastAPI - Planned)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/generate` | AI resume generation |
| POST | `/api/resume/improve` | AI resume improvement |
| POST | `/api/resume/analyze` | AI detection analysis |
| POST | `/api/job-match` | Job matching with ATS optimization |
| POST | `/api/resume/extract` | Extract text from PDF/DOCX |
| POST | `/api/resume/pdf` | Generate PDF resume |

## Environment Variables

### Frontend (.env)
```
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key
SECRET_KEY=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role
```

## Testing Strategy

- **Frontend**: Component testing with React Testing Library
- **Backend**: Unit tests with pytest
- **API**: Integration tests for all endpoints
- **E2E**: Playwright for critical user flows
- **Manual**: Feature checklist per page

## Deployment

### Frontend
- **Platform**: Vercel
- **Build**: `npm run build`
- **Preview**: Vercel Preview Deployments

### Backend
- **Platform**: Render / Railway
- **Build**: Docker container or Python deployment
- **Process**: Uvicorn with multiple workers

### Database
- **Provider**: Supabase Cloud
- **Migrations**: SQL scripts for schema changes
- **Backups**: Supabase automated backups

## Success Criteria

1. User can sign up/sign in via Supabase Auth
2. User can generate a resume using AI
3. User can upload a resume for analysis/improvement
4. User can match resume against job description
5. User can save and manage resumes in dashboard
6. User can download resume as PDF
7. All features work on mobile and desktop
8. App passes lint and typecheck without errors

## Notes

- Current frontend is fully responsive
- Supabase RLS ensures data isolation per user
- OpenAI API handles all AI operations
- PDF generation requires backend service for reliable output
