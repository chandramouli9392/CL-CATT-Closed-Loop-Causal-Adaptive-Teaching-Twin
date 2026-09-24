from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import datetime

from app.database import get_db
from app.models import ExplanationMemory, Student
from app.schemas import ExplanationMemorySchema

router = APIRouter(prefix="/api/explanation-memory", tags=["Explanation Memory"])

@router.get("/{student_id}", response_model=ExplanationMemorySchema)
def get_explanation_memory(student_id: int, db: Session = Depends(get_db)):
    mem = db.query(ExplanationMemory).filter(ExplanationMemory.student_id == student_id).first()
    if not mem:
        student = db.query(Student).filter(Student.id == student_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")
        # Create initial memory trace
        mem = ExplanationMemory(
            student_id=student.id,
            preferred_style=student.learning_style or "Visual",
            visual_affinity=0.85,
            analogy_affinity=0.70,
            step_by_step_affinity=0.75,
            interactive_affinity=0.90,
            memory_trace=[]
        )
        db.add(mem)
        db.commit()
        db.refresh(mem)
    return mem

@router.put("/{student_id}", response_model=ExplanationMemorySchema)
def update_explanation_memory(student_id: int, updates: Dict[str, Any], db: Session = Depends(get_db)):
    mem = db.query(ExplanationMemory).filter(ExplanationMemory.student_id == student_id).first()
    if not mem:
        raise HTTPException(status_code=404, detail="Explanation memory not found")

    if "preferred_style" in updates:
        mem.preferred_style = updates["preferred_style"]
    if "visual_affinity" in updates:
        mem.visual_affinity = updates["visual_affinity"]
    if "analogy_affinity" in updates:
        mem.analogy_affinity = updates["analogy_affinity"]
    if "step_by_step_affinity" in updates:
        mem.step_by_step_affinity = updates["step_by_step_affinity"]
    if "interactive_affinity" in updates:
        mem.interactive_affinity = updates["interactive_affinity"]

    if "new_interaction" in updates:
        current_trace = list(mem.memory_trace or [])
        current_trace.append(updates["new_interaction"])
        mem.memory_trace = current_trace

    mem.last_updated = datetime.datetime.utcnow()
    db.commit()
    db.refresh(mem)
    return mem
