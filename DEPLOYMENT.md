# Deployment Guide — CL-CATT Research Prototype

## Production Deployment Checklist

### 1. Docker Deployment
Use the included `docker-compose.yml` to orchestrate both the FastAPI backend and Next.js frontend:
```bash
docker-compose up --build -d
```

### 2. Database Migration
To switch from SQLite to PostgreSQL for high-scale multi-class deployments:
1. Update `DATABASE_URL` in `backend/.env`:
   `DATABASE_URL=postgresql://user:password@localhost:5432/cl_catt_db`
2. Install `psycopg2-binary` in backend requirements.
3. Run SQL schema initialization using `schema.sql`.

### 3. Groq API Rate Limiting & Proxying
Ensure the `GROQ_API_KEY` is maintained securely in server environment variables.
