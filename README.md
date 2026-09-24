# Closed-Loop Causal Adaptive Teaching Twin (CL-CATT)

> **Subtitle:** A Cognitive Digital Twin Framework for Adaptive Teaching using Causal Reasoning, Policy Simulation, Teacher-in-the-Loop Learning, and Continuous Explanation Memory.
>
> **Lead Researcher & Architect:** Chandramouli Boppana  
> **Department:** Artificial Intelligence & Machine Learning  
> **Institution:** Mohan Babu University  
> **Status:** Research Prototype Platform

---

## 📌 Research Disclaimer
This repository contains a **fully functional research prototype platform** designed to demonstrate the theoretical and architectural concepts of Cognitive Digital Twins, counterfactual policy simulation, and teacher-in-the-loop adaptation. The algorithms and state transitions are research demonstrations and are **not clinically or educationally validated products**.

---

## 🚀 Key Architectural Features

1. **Continuous Cognitive Observation**: Senses multi-dimensional student vectors (Knowledge Level, Attention Span, Motivation, Confidence, Speed, Concept Mastery).
2. **Cognitive Digital Twin Modeling**: Builds real-time 6D state representations for every student.
3. **Groq LLM Policy Generator**: Integrates the Groq API (LLaMA 3.3 70B) to synthesize 5–10 adaptive teaching strategies with explicit causal reasoning and risk/confidence scoring.
4. **Counterfactual Policy Simulation Engine**: Simulates student cognitive state progression across 5 time steps (T0–T4) prior to classroom deployment.
5. **Continuous Explanation Memory**: Dynamically tracks individual explanation modality affinities (Visual Diagrams, Physical Analogies, Step-by-Step, Interactive).
6. **Causal Knowledge Graph**: Interactive Directed Acyclic Graph (DAG) for visual node inspection, prerequisite mapping, and causal weight editing.
7. **Closed-Loop Outcome Monitoring**: Compares predicted knowledge gains against observed post-quiz results to refine future policies.
8. **Research Report Exporter**: PDF/Print generation for student, classroom, and architectural reports.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 15 (React 19, TypeScript)
- **Styling:** Tailwind CSS (Glassmorphism, Dark Mode, Neon Blue/Purple/Cyan)
- **Icons:** Lucide React
- **Data Visualizations:** Recharts, SVG Graph Canvas

### Backend
- **Framework:** FastAPI (Python 3.12)
- **Database:** SQLite / PostgreSQL (SQLAlchemy ORM)
- **AI LLM Integration:** Groq API (`GROQ_API_KEY`)
- **Authentication:** JWT (Teacher & Admin login)

---

## 💻 Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:3000` in your web browser.

---

## 🐳 Docker Support

Run the full stack with Docker Compose:
```bash
docker-compose up --build
```

---

## 📄 License & Attribution
Developed by Chandramouli Boppana, Department of Artificial Intelligence & Machine Learning, Mohan Babu University.
