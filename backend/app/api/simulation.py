from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.database import get_db
from app.models import Student, DigitalTwin, TeachingPolicy, SimulationResult
from app.schemas import SimulationRequest, SimulationResponse
from app.services.causal_engine import causal_engine

router = APIRouter(prefix="/api/simulation", tags=["Policy Simulation"])

@router.post("/run", response_model=SimulationResponse)
def run_simulation(request: SimulationRequest, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == request.student_id).first()
    if not student:
        # Fallback for demo student ID
        student = db.query(Student).first()
        if not student:
            raise HTTPException(status_code=404, detail="No student available for simulation")

    twin = db.query(DigitalTwin).filter(DigitalTwin.student_id == student.id).first()
    k = twin.knowledge_level if twin else 0.65
    att = twin.attention_span if twin else 0.80
    mot = twin.motivation_score if twin else 0.75
    conf = twin.confidence_level if twin else 0.70

    intensity = request.intensity if request.intensity else 0.80

    sim_data = causal_engine.simulate_intervention(
        initial_knowledge=k,
        attention_span=att,
        motivation=mot,
        confidence=conf,
        intervention_intensity=intensity,
        explanation_alignment=0.90
    )

    # Record simulation result
    res_obj = SimulationResult(
        student_id=student.id,
        policy_id=request.policy_id,
        initial_knowledge=sim_data["initial_knowledge"],
        simulated_knowledge=sim_data["simulated_knowledge"],
        predicted_gain=sim_data["predicted_gain"],
        confidence=sim_data["confidence"],
        simulation_steps=sim_data["simulation_steps"]
    )
    db.add(res_obj)
    db.commit()

    return {
        "student_id": student.id,
        "student_name": student.full_name,
        "initial_knowledge": sim_data["initial_knowledge"],
        "simulated_knowledge": sim_data["simulated_knowledge"],
        "predicted_gain": sim_data["predicted_gain"],
        "confidence": sim_data["confidence"],
        "simulation_steps": sim_data["simulation_steps"],
        "causal_factors": sim_data["causal_factors"]
    }
