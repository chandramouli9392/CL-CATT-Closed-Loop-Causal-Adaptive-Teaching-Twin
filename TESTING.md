# Testing Guide — CL-CATT Research Prototype

## Automated Backend API Verification

You can verify the API endpoints using python `urllib` or `curl`:

### 1. Health & Root Endpoint
```bash
curl http://localhost:8000/
```

### 2. Fetch Student Digital Twins
```bash
curl http://localhost:8000/api/students
```

### 3. Generate Groq Teaching Policies
```bash
curl -X POST http://localhost:8000/api/policies/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Causal Invariance", "difficulty_level": "Intermediate", "target_group": "General Class"}'
```

### 4. Run Policy Counterfactual Simulation
```bash
curl -X POST http://localhost:8000/api/simulation/run \
  -H "Content-Type: application/json" \
  -d '{"student_id": 1, "intensity": 0.85}'
```

## Frontend Verification
- Run `npm run build` in `frontend/` to verify zero TypeScript or Next.js build errors.
