from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.database import get_db
from app.models import Student, DigitalTwin, ExplanationMemory
from app.schemas import StudentSchema, DigitalTwinSchema

router = APIRouter(prefix="/api/students", tags=["Students & Digital Twins"])

@router.get("", response_model=List[StudentSchema])
def get_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    return students

@router.get("/{student_id}", response_model=StudentSchema)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.get("/{student_id}/twin", response_model=DigitalTwinSchema)
def get_student_twin(student_id: int, db: Session = Depends(get_db)):
    twin = db.query(DigitalTwin).filter(DigitalTwin.student_id == student_id).first()
    if not twin:
        raise HTTPException(status_code=404, detail="Digital twin not found")
    return twin

@router.put("/{student_id}/twin", response_model=DigitalTwinSchema)
def update_student_twin(student_id: int, updates: Dict[str, Any], db: Session = Depends(get_db)):
    twin = db.query(DigitalTwin).filter(DigitalTwin.student_id == student_id).first()
    if not twin:
        raise HTTPException(status_code=404, detail="Digital twin not found")

    for key, value in updates.items():
        if hasattr(twin, key):
            setattr(twin, key, value)
            
    db.commit()
    db.refresh(twin)
    return twin

@router.get("/analytics/classroom-summary")
def get_classroom_analytics(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    twins = db.query(DigitalTwin).all()
    
    if not twins:
        return {"avg_knowledge": 0.65, "avg_attention": 0.80, "high_risk_count": 0}

    total_k = sum(t.knowledge_level for t in twins)
    total_att = sum(t.attention_span for t in twins)
    total_mot = sum(t.motivation_score for t in twins)
    total_conf = sum(t.confidence_level for t in twins)
    high_risk = sum(1 for t in twins if t.risk_level == "High")
    med_risk = sum(1 for t in twins if t.risk_level == "Medium")
    low_risk = sum(1 for t in twins if t.risk_level == "Low")

    n = len(twins)
    return {
        "total_students": len(students),
        "avg_knowledge": round(total_k / n, 2),
        "avg_attention": round(total_att / n, 2),
        "avg_motivation": round(total_mot / n, 2),
        "avg_confidence": round(total_conf / n, 2),
        "risk_distribution": {
            "high": high_risk,
            "medium": med_risk,
            "low": low_risk
        },
        "knowledge_distribution": [
            {"range": "0-40%", "count": sum(1 for t in twins if t.knowledge_level < 0.4)},
            {"range": "40-60%", "count": sum(1 for t in twins if 0.4 <= t.knowledge_level < 0.6)},
            {"range": "60-80%", "count": sum(1 for t in twins if 0.6 <= t.knowledge_level < 0.8)},
            {"range": "80-100%", "count": sum(1 for t in twins if t.knowledge_level >= 0.8)}
        ]
    }
