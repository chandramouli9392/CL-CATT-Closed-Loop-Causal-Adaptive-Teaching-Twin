import datetime
from sqlalchemy.orm import Session
from app.models import Teacher, Student, DigitalTwin, ExplanationMemory, TeachingPolicy, KnowledgeGraphNode, KnowledgeGraphEdge, OutcomeRecord, AuditLog
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_initial_data(db: Session):
    # Check if data already exists
    if db.query(Teacher).first():
        return

    print("Seeding initial CL-CATT research dataset...")

    # 1. Create Default Teachers
    teacher_1 = Teacher(
        full_name="Prof. Chandramouli Boppana",
        email="chandramouli@mbu.edu.in",
        hashed_password=pwd_context.hash("teacher123"),
        department="Artificial Intelligence & Machine Learning",
        institution="Mohan Babu University",
        role="teacher"
    )
    admin_1 = Teacher(
        full_name="CL-CATT System Admin",
        email="admin@clcatt.org",
        hashed_password=pwd_context.hash("admin123"),
        department="AI Research Lab",
        institution="Mohan Babu University",
        role="admin"
    )
    db.add_all([teacher_1, admin_1])
    db.commit()

    # 2. Create Sample Students & Digital Twins
    students_data = [
        {"name": "Aarav Sharma", "id": "STU-1001", "grade": "Grade 10", "section": "Sec A", "style": "Visual", "base": 0.72, "k": 0.65, "att": 0.85, "mot": 0.80, "conf": 0.70, "speed": 0.88, "risk": "Low"},
        {"name": "Diya Patel", "id": "STU-1002", "grade": "Grade 10", "section": "Sec A", "style": "Analogy", "base": 0.68, "k": 0.58, "att": 0.72, "mot": 0.65, "conf": 0.60, "speed": 0.75, "risk": "Medium"},
        {"name": "Rohan Verma", "id": "STU-1003", "grade": "Grade 10", "section": "Sec B", "style": "Step-by-Step", "base": 0.85, "k": 0.82, "att": 0.90, "mot": 0.88, "conf": 0.85, "speed": 0.92, "risk": "Low"},
        {"name": "Ananya Reddy", "id": "STU-1004", "grade": "Grade 10", "section": "Sec B", "style": "Interactive", "base": 0.55, "k": 0.45, "att": 0.60, "mot": 0.58, "conf": 0.50, "speed": 0.62, "risk": "High"},
        {"name": "Karthik Nair", "id": "STU-1005", "grade": "Grade 10", "section": "Sec A", "style": "Visual", "base": 0.78, "k": 0.74, "att": 0.82, "mot": 0.84, "conf": 0.78, "speed": 0.85, "risk": "Low"},
        {"name": "Sneha Gupta", "id": "STU-1006", "grade": "Grade 10", "section": "Sec A", "style": "Step-by-Step", "base": 0.62, "k": 0.52, "att": 0.68, "mot": 0.70, "conf": 0.58, "speed": 0.70, "risk": "Medium"}
    ]

    for s_info in students_data:
        student = Student(
            student_id=s_info["id"],
            full_name=s_info["name"],
            grade=s_info["grade"],
            section=s_info["section"],
            learning_style=s_info["style"],
            baseline_ability=s_info["base"]
        )
        db.add(student)
        db.commit()
        db.refresh(student)

        # Digital Twin
        hist_metrics = [
            {"week": "W1", "knowledge": round(s_info["k"] - 0.15, 2), "attention": round(s_info["att"] - 0.05, 2)},
            {"week": "W2", "knowledge": round(s_info["k"] - 0.08, 2), "attention": s_info["att"]},
            {"week": "W3", "knowledge": s_info["k"], "attention": s_info["att"]}
        ]
        twin = DigitalTwin(
            student_id=student.id,
            knowledge_level=s_info["k"],
            attention_span=s_info["att"],
            motivation_score=s_info["mot"],
            confidence_level=s_info["conf"],
            learning_speed=s_info["speed"],
            concept_mastery=s_info["k"],
            risk_level=s_info["risk"],
            historical_metrics=hist_metrics
        )
        db.add(twin)

        # Explanation Memory
        exp_mem = ExplanationMemory(
            student_id=student.id,
            preferred_style=s_info["style"],
            visual_affinity=0.90 if s_info["style"] == "Visual" else 0.65,
            analogy_affinity=0.90 if s_info["style"] == "Analogy" else 0.60,
            step_by_step_affinity=0.92 if s_info["style"] == "Step-by-Step" else 0.70,
            interactive_affinity=0.95 if s_info["style"] == "Interactive" else 0.75,
            memory_trace=[
                {"topic": "Calculus Fundamentals", "used_style": s_info["style"], "comprehension_score": 0.88},
                {"topic": "Neural Network Forward Pass", "used_style": s_info["style"], "comprehension_score": 0.91}
            ]
        )
        db.add(exp_mem)

        # Outcome Record
        outcome = OutcomeRecord(
            student_id=student.id,
            topic="Deep Learning & Causal Inference",
            predicted_gain=0.18,
            observed_gain=0.17,
            quiz_score=round(s_info["k"] * 100, 1),
            attendance_rate=0.95,
            engagement_index=s_info["att"],
            retention_score=round(s_info["k"] * 0.95, 2)
        )
        db.add(outcome)

    db.commit()

    # 3. Create Sample Knowledge Graph
    nodes = [
        {"key": "C1", "label": "Linear Algebra & Vectors", "cat": "Foundation", "thresh": 0.80, "diff": 0.4},
        {"key": "C2", "label": "Calculus & Gradients", "cat": "Foundation", "thresh": 0.75, "diff": 0.5},
        {"key": "C3", "label": "Probability & Bayes Rule", "cat": "Foundation", "thresh": 0.80, "diff": 0.5},
        {"key": "C4", "label": "Causal Directed Graphs", "cat": "Core Concept", "thresh": 0.85, "diff": 0.7},
        {"key": "C5", "label": "Neural Network Architecture", "cat": "Core Concept", "thresh": 0.80, "diff": 0.6},
        {"key": "C6", "label": "Counterfactual Policy Sim", "cat": "Advanced AI", "thresh": 0.90, "diff": 0.85},
        {"key": "C7", "label": "Cognitive Twin Adaptation", "cat": "Advanced AI", "thresh": 0.92, "diff": 0.9}
    ]
    for n in nodes:
        node_obj = KnowledgeGraphNode(
            node_key=n["key"],
            label=n["label"],
            category=n["cat"],
            mastery_threshold=n["thresh"],
            difficulty=n["diff"],
            description=f"Core concept representation for {n['label']} within CL-CATT ontology."
        )
        db.add(node_obj)

    edges = [
        {"src": "C1", "tgt": "C5", "w": 0.85, "rel": "Prerequisite"},
        {"src": "C2", "tgt": "C5", "w": 0.90, "rel": "Prerequisite"},
        {"src": "C3", "tgt": "C4", "w": 0.92, "rel": "Prerequisite"},
        {"src": "C4", "tgt": "C6", "w": 0.95, "rel": "Causal Effect"},
        {"src": "C5", "tgt": "C7", "w": 0.88, "rel": "Sub-component"},
        {"src": "C6", "tgt": "C7", "w": 0.96, "rel": "Drives Twin Policy"}
    ]
    for e in edges:
        edge_obj = KnowledgeGraphEdge(
            source_node=e["src"],
            target_node=e["tgt"],
            causal_weight=e["w"],
            relationship_type=e["rel"]
        )
        db.add(edge_obj)

    db.commit()

    # 4. Create Initial Sample Teaching Policies
    policy_1 = TeachingPolicy(
        teacher_id=teacher_1.id,
        topic="Causal Inference in AI",
        difficulty_level="Intermediate",
        target_group="General Class",
        title="Interactive Causal Directed Graph Scaffolding",
        description="Presents causal dependency paths visually with real-time counterfactual sliders.",
        expected_outcome=0.92,
        confidence_score=0.95,
        risk_score=0.10,
        causal_reasoning="Visual node manipulation bridges theoretical Bayes models with concrete code variables.",
        groq_explanation="Groq LLM analysis highlights 28% faster mastery among visual learners."
    )
    db.add(policy_1)
    db.commit()

    # 5. Add initial audit log
    log = AuditLog(
        teacher_id=teacher_1.id,
        action="SYSTEM_INIT",
        details="CL-CATT Database initialized with default students, digital twins, and causal graph nodes."
    )
    db.add(log)
    db.commit()
    print("CL-CATT Dataset seeding completed successfully.")
