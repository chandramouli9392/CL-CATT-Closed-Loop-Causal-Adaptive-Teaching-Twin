from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.database import get_db
from app.models import OutcomeRecord, Student
from app.schemas import OutcomeSchema

router = APIRouter(prefix="/api/outcomes", tags=["Outcome Monitoring"])

@router.get("", response_model=List[OutcomeSchema])
def get_outcomes(db: Session = Depends(get_db)):
    records = db.query(OutcomeRecord).all()
    results = []
    for r in records:
        student = db.query(Student).filter(Student.id == r.student_id).first()
        results.append({
            "id": r.id,
            "student_id": r.student_id,
            "student_name": student.full_name if student else f"Student #{r.student_id}",
            "topic": r.topic,
            "predicted_gain": r.predicted_gain,
            "observed_gain": r.observed_gain,
            "quiz_score": r.quiz_score,
            "attendance_rate": r.attendance_rate,
            "engagement_index": r.engagement_index,
            "retention_score": r.retention_score,
            "created_at": r.created_at
        })
    return results

@router.post("", response_model=OutcomeSchema)
def record_outcome(data: Dict[str, Any], db: Session = Depends(get_db)):
    student_id = data.get("student_id", 1)
    student = db.query(Student).filter(Student.id == student_id).first()
    
    rec = OutcomeRecord(
        student_id=student_id,
        topic=data.get("topic", "Adaptive Lesson Unit"),
        predicted_gain=float(data.get("predicted_gain", 0.18)),
        observed_gain=float(data.get("observed_gain", 0.17)),
        quiz_score=float(data.get("quiz_score", 85.0)),
        attendance_rate=float(data.get("attendance_rate", 0.95)),
        engagement_index=float(data.get("engagement_index", 0.88)),
        retention_score=float(data.get("retention_score", 0.82))
    )
    db.add(rec)
    db.commit()
    db.refresh(rec)

    return {
        "id": rec.id,
        "student_id": rec.student_id,
        "student_name": student.full_name if student else f"Student #{rec.student_id}",
        "topic": rec.topic,
        "predicted_gain": rec.predicted_gain,
        "observed_gain": rec.observed_gain,
        "quiz_score": rec.quiz_score,
        "attendance_rate": rec.attendance_rate,
        "engagement_index": rec.engagement_index,
        "retention_score": rec.retention_score,
        "created_at": rec.created_at
    }
