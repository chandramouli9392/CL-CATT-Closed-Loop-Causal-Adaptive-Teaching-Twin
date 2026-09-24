import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    department = Column(String, default="Artificial Intelligence & Data Science")
    institution = Column(String, default="Mohan Babu University")
    role = Column(String, default="teacher") # 'teacher' or 'admin'
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    policies = relationship("TeachingPolicy", back_populates="teacher")
    feedbacks = relationship("AuditLog", back_populates="teacher")

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    grade = Column(String, default="Grade 10")
    section = Column(String, default="Section A")
    learning_style = Column(String, default="Visual-Interactive")
    baseline_ability = Column(Float, default=0.70)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    digital_twin = relationship("DigitalTwin", uselist=False, back_populates="student")
    explanation_memory = relationship("ExplanationMemory", uselist=False, back_populates="student")
    outcomes = relationship("OutcomeRecord", back_populates="student")
    simulations = relationship("SimulationResult", back_populates="student")

class DigitalTwin(Base):
    __tablename__ = "digital_twins"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), unique=True, nullable=False)
    
    # Cognitive State Metrics (0.0 to 1.0)
    knowledge_level = Column(Float, default=0.65)
    attention_span = Column(Float, default=0.80)
    motivation_score = Column(Float, default=0.75)
    confidence_level = Column(Float, default=0.70)
    learning_speed = Column(Float, default=0.85)
    concept_mastery = Column(Float, default=0.68)
    risk_level = Column(String, default="Low") # Low, Medium, High
    
    last_updated = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    historical_metrics = Column(JSON, default=list)

    student = relationship("Student", back_populates="digital_twin")

class ExplanationMemory(Base):
    __tablename__ = "explanation_memories"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), unique=True, nullable=False)
    
    preferred_style = Column(String, default="Visual") # Visual, Analogy, Step-by-Step, Interactive, Code-First
    visual_affinity = Column(Float, default=0.85)
    analogy_affinity = Column(Float, default=0.60)
    step_by_step_affinity = Column(Float, default=0.70)
    interactive_affinity = Column(Float, default=0.90)
    
    memory_trace = Column(JSON, default=list) # Historical explanation outcomes
    last_updated = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("Student", back_populates="explanation_memory")

class TeachingPolicy(Base):
    __tablename__ = "teaching_policies"

    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=True)
    topic = Column(String, nullable=False)
    difficulty_level = Column(String, default="Intermediate")
    target_group = Column(String, default="General Class")
    
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    expected_outcome = Column(Float, default=0.85)
    confidence_score = Column(Float, default=0.92)
    risk_score = Column(Float, default=0.15)
    causal_reasoning = Column(Text, nullable=False)
    groq_explanation = Column(Text, nullable=False)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    teacher = relationship("Teacher", back_populates="policies")
    simulations = relationship("SimulationResult", back_populates="policy")

class KnowledgeGraphNode(Base):
    __tablename__ = "knowledge_graph_nodes"

    id = Column(Integer, primary_key=True, index=True)
    node_key = Column(String, unique=True, index=True, nullable=False)
    label = Column(String, nullable=False)
    category = Column(String, default="Core Concept")
    mastery_threshold = Column(Float, default=0.75)
    difficulty = Column(Float, default=0.5)
    description = Column(Text, nullable=True)

class KnowledgeGraphEdge(Base):
    __tablename__ = "knowledge_graph_edges"

    id = Column(Integer, primary_key=True, index=True)
    source_node = Column(String, nullable=False)
    target_node = Column(String, nullable=False)
    causal_weight = Column(Float, default=0.8) # 0.0 to 1.0 effect strength
    relationship_type = Column(String, default="Prerequisite")

class SimulationResult(Base):
    __tablename__ = "simulation_results"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    policy_id = Column(Integer, ForeignKey("teaching_policies.id"), nullable=True)
    
    initial_knowledge = Column(Float, nullable=False)
    simulated_knowledge = Column(Float, nullable=False)
    predicted_gain = Column(Float, nullable=False)
    confidence = Column(Float, nullable=False)
    simulation_steps = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("Student", back_populates="simulations")
    policy = relationship("TeachingPolicy", back_populates="simulations")

class OutcomeRecord(Base):
    __tablename__ = "outcome_records"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    topic = Column(String, nullable=False)
    
    predicted_gain = Column(Float, nullable=False)
    observed_gain = Column(Float, nullable=False)
    quiz_score = Column(Float, nullable=False)
    attendance_rate = Column(Float, default=0.95)
    engagement_index = Column(Float, default=0.88)
    retention_score = Column(Float, default=0.82)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("Student", back_populates="outcomes")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=True)
    action = Column(String, nullable=False)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    teacher = relationship("Teacher", back_populates="feedbacks")
