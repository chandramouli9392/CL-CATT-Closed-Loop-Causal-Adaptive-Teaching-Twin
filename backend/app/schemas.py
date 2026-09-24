from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
from datetime import datetime

class TeacherLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_name: str
    role: str

class DigitalTwinSchema(BaseModel):
    id: int
    student_id: int
    knowledge_level: float
    attention_span: float
    motivation_score: float
    confidence_level: float
    learning_speed: float
    concept_mastery: float
    risk_level: str
    last_updated: datetime
    historical_metrics: Optional[List[Dict[str, Any]]] = []

    class Config:
        from_attributes = True

class ExplanationMemorySchema(BaseModel):
    id: int
    student_id: int
    preferred_style: str
    visual_affinity: float
    analogy_affinity: float
    step_by_step_affinity: float
    interactive_affinity: float
    memory_trace: Optional[List[Dict[str, Any]]] = []

    class Config:
        from_attributes = True

class StudentSchema(BaseModel):
    id: int
    student_id: str
    full_name: str
    grade: str
    section: str
    learning_style: str
    baseline_ability: float
    created_at: datetime
    digital_twin: Optional[DigitalTwinSchema] = None
    explanation_memory: Optional[ExplanationMemorySchema] = None

    class Config:
        from_attributes = True

class PolicyGenerateRequest(BaseModel):
    topic: str
    difficulty_level: str = "Intermediate"
    target_group: str = "General Class"
    student_id: Optional[int] = None

class TeachingPolicySchema(BaseModel):
    id: int
    topic: str
    difficulty_level: str
    target_group: str
    title: str
    description: str
    expected_outcome: float
    confidence_score: float
    risk_score: float
    causal_reasoning: str
    groq_explanation: str
    created_at: datetime

    class Config:
        from_attributes = True

class SimulationRequest(BaseModel):
    student_id: int
    policy_id: Optional[int] = None
    intervention_type: Optional[str] = "Adaptive Visual Step-by-Step"
    intensity: Optional[float] = 0.8

class SimulationResponse(BaseModel):
    student_id: int
    student_name: str
    initial_knowledge: float
    simulated_knowledge: float
    predicted_gain: float
    confidence: float
    simulation_steps: List[Dict[str, Any]]
    causal_factors: Dict[str, float]

class KnowledgeNodeSchema(BaseModel):
    id: int
    node_key: str
    label: str
    category: str
    mastery_threshold: float
    difficulty: float
    description: Optional[str] = ""

    class Config:
        from_attributes = True

class KnowledgeEdgeSchema(BaseModel):
    id: int
    source_node: str
    target_node: str
    causal_weight: float
    relationship_type: str

    class Config:
        from_attributes = True

class OutcomeSchema(BaseModel):
    id: int
    student_id: int
    student_name: str
    topic: str
    predicted_gain: float
    observed_gain: float
    quiz_score: float
    attendance_rate: float
    engagement_index: float
    retention_score: float
    created_at: datetime

    class Config:
        from_attributes = True

class GroqChatRequest(BaseModel):
    prompt: str
    context: Optional[str] = ""

class GroqChatResponse(BaseModel):
    response: str
    model_used: str = "llama3-70b-8192"
