import math
import random
from typing import Dict, Any, List

class CausalSimulationEngine:
    """
    Closed-Loop Causal Adaptive Teaching Twin (CL-CATT)
    Causal Simulation Engine for predicting cognitive state trajectories,
    calculating policy impact vectors, and executing counterfactual simulations.
    """

    def simulate_intervention(
        self,
        initial_knowledge: float,
        attention_span: float,
        motivation: float,
        confidence: float,
        intervention_intensity: float = 0.8,
        explanation_alignment: float = 0.9
    ) -> Dict[str, Any]:
        """
        Simulate cognitive progression over 5 time steps (T0 to T4) using causal equations:
        ΔK = alpha * (1 - K) * Attention * Motivation * Alignment * Intensity
        """
        alpha = 0.35 # Learning rate constant
        steps = []
        
        current_k = initial_knowledge
        current_att = attention_span
        current_mot = motivation
        current_conf = confidence
        
        for t in range(5):
            time_label = f"Step T{t}"
            if t == 0:
                steps.append({
                    "step": time_label,
                    "knowledge": round(current_k, 3),
                    "attention": round(current_att, 3),
                    "motivation": round(current_mot, 3),
                    "confidence": round(current_conf, 3),
                    "gain_so_far": 0.0
                })
                continue
            
            # Causal gain formula
            gain = alpha * (1.0 - current_k) * current_att * current_mot * explanation_alignment * (0.8 + 0.4 * intervention_intensity)
            current_k = min(0.98, current_k + gain)
            
            # Attention dynamic update (boosted initially by good intervention, slight decay)
            current_att = max(0.4, min(0.99, current_att + 0.05 * intervention_intensity - 0.02 * t))
            # Motivation boost from positive gain
            current_mot = max(0.5, min(0.99, current_mot + gain * 0.4))
            # Confidence grows as knowledge increases
            current_conf = max(0.5, min(0.98, current_conf + gain * 0.6))

            steps.append({
                "step": time_label,
                "knowledge": round(current_k, 3),
                "attention": round(current_att, 3),
                "motivation": round(current_mot, 3),
                "confidence": round(current_conf, 3),
                "gain_so_far": round(current_k - initial_knowledge, 3)
            })

        total_gain = round(current_k - initial_knowledge, 3)
        confidence_interval = round(0.88 + 0.10 * (explanation_alignment * intervention_intensity), 3)

        return {
            "initial_knowledge": initial_knowledge,
            "simulated_knowledge": round(current_k, 3),
            "predicted_gain": total_gain,
            "confidence": confidence_interval,
            "simulation_steps": steps,
            "causal_factors": {
                "attention_impact": round(attention_span * 0.3, 3),
                "motivation_impact": round(motivation * 0.25, 3),
                "explanation_alignment": round(explanation_alignment * 0.25, 3),
                "intervention_intensity": round(intervention_intensity * 0.2, 3)
            }
        }

causal_engine = CausalSimulationEngine()
