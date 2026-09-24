import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import engine, Base, SessionLocal
from app.seed_data import seed_initial_data
from app.config import settings

# Import API Routers
from app.api import auth, students, policies, simulation, causal_graph, explanation_memory, outcomes, research

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("CL-CATT")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize Database Tables
    logger.info("Initializing CL-CATT Database Schema...")
    Base.metadata.create_all(bind=engine)
    
    # Seed Initial Dataset
    db = SessionLocal()
    try:
        seed_initial_data(db)
    finally:
        db.close()

    yield
    logger.info("Shutting down CL-CATT API server...")

app = FastAPI(
    title="Closed-Loop Causal Adaptive Teaching Twin (CL-CATT) API",
    description="Cognitive Digital Twin Framework for Adaptive Teaching using Causal Reasoning & Groq LLM",
    version="1.0.0-Research-Prototype",
    lifespan=lifespan
)

# CORS Configuration for Next.js Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev/prototype
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth.router)
app.include_router(students.router)
app.include_router(policies.router)
app.include_router(simulation.router)
app.include_router(causal_graph.router)
app.include_router(explanation_memory.router)
app.include_router(outcomes.router)
app.include_router(research.router)

@app.get("/")
def root_status():
    return {
        "status": "Online",
        "system": "Closed-Loop Causal Adaptive Teaching Twin (CL-CATT)",
        "lead_researcher": "Chandramouli Boppana",
        "institution": "Mohan Babu University",
        "groq_api_status": "Configured" if settings.GROQ_API_KEY else "Missing Key",
        "documentation": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
