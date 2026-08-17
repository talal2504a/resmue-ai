# ResumeAI - Setup Guide

## Quick Start

### 1. Run Setup Script
```bash
setup.bat
```

This will:
- Create `backend/.env` from template
- Install frontend dependencies

### 2. Configure Environment Variables

#### Frontend (`.env` - already configured)
- `OPENROUTER_API_KEY` - Already set
- `NEXT_PUBLIC_SUPABASE_URL` - Already set
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Already set

#### Backend (`backend/.env` - needs your keys)
Open `backend/.env` and fill in:

```env
# OpenRouter AI Key (same as frontend)
OPENROUTER_API_KEY=sk-or-v1-...

# Supabase Keys
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Safepay Payment (Get from https://dashboard.safepay.com)
SAFEPAY_API_KEY=your-safepay-api-key
SAFEPAY_SECRET_KEY=your-safepay-secret-key
SAFEPAY_WEBHOOK_SECRET=your-webhook-secret
SAFEPAY_BASE_URL=https://api.safepay.com/v1
SAFEPAY_PLAN_ID=plan_pro_monthly
FRONTEND_URL=http://localhost:3000
```

### 3. Setup Supabase Database

1. Go to your Supabase project
2. Open SQL Editor
3. Run the contents of `supabase-schema.sql`
4. This creates: profiles, resumes, job_matches, resume_analyses, subscriptions tables

### 4. Start Development

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

### 5. Access the App
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Where to Get Keys

### OpenRouter
- https://openrouter.ai/keys
- Create key and paste in both `.env` files

### Supabase
- https://supabase.com/dashboard
- Project Settings → API
- Copy `URL`, `anon key`, and `service_role key`

### Safepay
- https://dashboard.safepay.com
- Developers → API Keys → Copy Public & Secret keys
- Plans → Create Pro plan → Copy Plan ID
- Webhooks → Add endpoint → Copy Webhook Secret

## Project Structure
```
C:\resume-ai\
├── src\                    # Frontend Next.js app
│   ├── app\               # Pages and API routes
│   ├── components\        # React components
│   └── context\           # Auth and Toast contexts
├── backend\               # Python FastAPI backend
│   ├── app\               # Backend code
│   └── .env               # Backend secrets (create this)
├── .env                   # Frontend secrets
└── supabase-schema.sql    # Database schema
```

## Troubleshooting

**Backend won't start?**
- Make sure Python 3.9+ is installed
- Make sure venv is activated: `.\venv\Scripts\Activate.ps1`
- Install dependencies: `pip install -r requirements.txt`

**Payment not working?**
- Backend must be running on port 8000
- Safepay keys must be real (not placeholders)
- Webhook URL must be configured in Safepay dashboard
- Supabase `subscriptions` table must exist

**AI not working?**
- OpenRouter API key must be valid
- Check OpenRouter dashboard for credits/usage
