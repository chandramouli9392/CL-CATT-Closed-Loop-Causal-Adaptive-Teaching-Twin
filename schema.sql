-- Schema definition for CL-CATT PostgreSQL / SQLite database

CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    department VARCHAR(255) DEFAULT 'Artificial Intelligence & Machine Learning',
    institution VARCHAR(255) DEFAULT 'Mohan Babu University',
    role VARCHAR(50) DEFAULT 'teacher',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    grade VARCHAR(50) DEFAULT 'Grade 10',
    section VARCHAR(50) DEFAULT 'Section A',
    learning_style VARCHAR(100) DEFAULT 'Visual-Interactive',
    baseline_ability FLOAT DEFAULT 0.70,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS digital_twins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER UNIQUE NOT NULL,
    knowledge_level FLOAT DEFAULT 0.65,
    attention_span FLOAT DEFAULT 0.80,
    motivation_score FLOAT DEFAULT 0.75,
    confidence_level FLOAT DEFAULT 0.70,
    learning_speed FLOAT DEFAULT 0.85,
    concept_mastery FLOAT DEFAULT 0.68,
    risk_level VARCHAR(50) DEFAULT 'Low',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    historical_metrics TEXT DEFAULT '[]',
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE IF NOT EXISTS explanation_memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER UNIQUE NOT NULL,
    preferred_style VARCHAR(100) DEFAULT 'Visual',
    visual_affinity FLOAT DEFAULT 0.85,
    analogy_affinity FLOAT DEFAULT 0.60,
    step_by_step_affinity FLOAT DEFAULT 0.70,
    interactive_affinity FLOAT DEFAULT 0.90,
    memory_trace TEXT DEFAULT '[]',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE IF NOT EXISTS teaching_policies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teacher_id INTEGER,
    topic VARCHAR(255) NOT NULL,
    difficulty_level VARCHAR(100) DEFAULT 'Intermediate',
    target_group VARCHAR(100) DEFAULT 'General Class',
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    expected_outcome FLOAT DEFAULT 0.85,
    confidence_score FLOAT DEFAULT 0.92,
    risk_score FLOAT DEFAULT 0.15,
    causal_reasoning TEXT NOT NULL,
    groq_explanation TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE TABLE IF NOT EXISTS knowledge_graph_nodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    node_key VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Core Concept',
    mastery_threshold FLOAT DEFAULT 0.75,
    difficulty FLOAT DEFAULT 0.5,
    description TEXT
);

CREATE TABLE IF NOT EXISTS knowledge_graph_edges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_node VARCHAR(100) NOT NULL,
    target_node VARCHAR(100) NOT NULL,
    causal_weight FLOAT DEFAULT 0.80,
    relationship_type VARCHAR(100) DEFAULT 'Prerequisite'
);

CREATE TABLE IF NOT EXISTS outcome_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    topic VARCHAR(255) NOT NULL,
    predicted_gain FLOAT NOT NULL,
    observed_gain FLOAT NOT NULL,
    quiz_score FLOAT NOT NULL,
    attendance_rate FLOAT DEFAULT 0.95,
    engagement_index FLOAT DEFAULT 0.88,
    retention_score FLOAT DEFAULT 0.82,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teacher_id INTEGER,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);
