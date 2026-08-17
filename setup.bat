@echo off
echo ==========================================
echo   ResumeAI - Quick Setup
echo ==========================================
echo.

echo [1/3] Setting up environment files...

if not exist "backend\.env" (
    copy backend\.env.example backend\.env
    echo Created backend\.env from template
) else (
    echo backend\.env already exists, skipping
)

echo.
echo [2/3] Installing dependencies...

echo Installing frontend dependencies...
call npm install

echo.
echo [3/3] Setup complete!
echo.
echo ==========================================
echo   NEXT STEPS:
echo ==========================================
echo.
echo 1. Edit backend\.env and add your Safepay keys
echo    (Get keys from: https://dashboard.safepay.com)
echo.
echo 2. Run Supabase schema in Supabase SQL Editor:
echo    File: supabase-schema.sql
echo.
echo 3. Start backend server:
echo    cd backend
echo    .\venv\Scripts\Activate.ps1
echo    uvicorn app.main:app --reload --port 8000
echo.
echo 4. Start frontend (in new terminal):
echo    npm run dev
echo.
echo 5. Open http://localhost:3000
echo.
echo ==========================================
pause
