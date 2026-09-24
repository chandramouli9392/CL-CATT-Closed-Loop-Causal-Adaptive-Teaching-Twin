# Installation Guide — CL-CATT Platform

This document provides step-by-step instructions for installing and running the Closed-Loop Causal Adaptive Teaching Twin (CL-CATT) research prototype platform.

## Prerequisites
- Node.js v18.0.0+
- Python 3.12+
- Git

## Step 1: Environment Variables
Create a `.env` file inside the `backend` directory:
```env
GROQ_API_KEY="your api here"
DATABASE_URL=sqlite:///./cl_catt.db
SECRET_KEY=cl_catt_secret_key_2026
```

## Step 2: Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m app.main
```
The FastAPI backend server will start at `http://localhost:8000`. Access interactive API documentation at `http://localhost:8000/docs`.

## Step 3: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The Next.js 15 web application will start at `http://localhost:3000`.
