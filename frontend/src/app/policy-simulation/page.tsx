'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { runSimulationApi, SimulationResult } from '@/lib/api';
import { Sliders, ArrowRight, Sparkles, BrainCircuit, CheckCircle2, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function PolicySimulationPage() {
  const [selectedPolicy, setSelectedPolicy] = useState('Causal Multimodal Visual Framing');
  const [intensity, setIntensity] = useState(0.8);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRunSim = async () => {
    setLoading(true);
    const res = await runSimulationApi(1, intensity);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Policy Counterfactual Simulator</h1>
        <p className="text-xs text-slate-400">Before → Intervention Simulation → Predicted Learning Gain → Policy Comparison</p>
      </div>

      {/* Control Panel */}
      <GlassCard className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Select Teaching Policy Option</label>
            <select
              value={selectedPolicy}
              onChange={(e) => setSelectedPolicy(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option>Causal Multimodal Visual Framing</option>
              <option>Socratic Counterfactual Questioning</option>
              <option>Micro-Scaffolded Analogy Mapping</option>
              <option>Interleaved Gamified Recall</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-semibold text-slate-300">Intervention Intensity Vector</label>
              <span className="text-cyan-400 font-bold">{Math.round(intensity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.05"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleRunSim}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sliders className="w-4 h-4" />}
              <span>Execute Counterfactual Simulation</span>
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Simulation Animated Workflow Cards (Before -> Simulation -> Gain) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Step 1: Before State */}
        <GlassCard className="p-6 space-y-4 border-slate-700">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 01 • Baseline State</span>
          <h3 className="text-lg font-bold text-white">Before Intervention</h3>
          <div className="space-y-3 pt-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Knowledge Level</span>
              <span className="text-amber-400 font-bold">{result ? Math.round(result.initial_knowledge * 100) : 65}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Attention Metric</span>
              <span className="text-purple-300 font-bold">82%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Risk Profile</span>
              <span className="text-amber-400 font-bold">Medium Risk</span>
            </div>
          </div>
        </GlassCard>

        {/* Step 2: Simulation In Progress */}
        <GlassCard className="p-6 space-y-4 border-cyan-500/30 glass-card-glow">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Stage 02 • Simulation Engine</span>
          <h3 className="text-lg font-bold text-white">Causal DAG Traversal</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Applying policy: <strong className="text-cyan-300">{selectedPolicy}</strong> across 5 cognitive time steps.
          </p>
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">Sim Confidence</span>
            <span className="text-emerald-400 font-bold">{result ? Math.round(result.confidence * 100) : 94}%</span>
          </div>
        </GlassCard>

        {/* Step 3: Predicted Gain */}
        <GlassCard className="p-6 space-y-4 border-emerald-500/30">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Stage 03 • Outcome</span>
          <h3 className="text-lg font-bold text-white">Predicted Gain</h3>
          <div className="space-y-3 pt-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Simulated Knowledge</span>
              <span className="text-emerald-400 font-bold text-base">
                {result ? Math.round(result.simulated_knowledge * 100) : 87}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Net Knowledge Gain</span>
              <span className="text-emerald-400 font-bold">
                +{result ? Math.round(result.predicted_gain * 100) : 22}%
              </span>
            </div>
          </div>
        </GlassCard>

      </div>

      {/* Step Chart */}
      {result && (
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Cognitive Trajectory Over 5 Time Steps (T0 to T4)</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={result.simulation_steps}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="step" stroke="#94a3b8" />
                <YAxis domain={[0.4, 1.0]} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Line type="monotone" dataKey="knowledge" stroke="#38bdf8" strokeWidth={3} name="Knowledge Level" />
                <Line type="monotone" dataKey="attention" stroke="#c084fc" strokeWidth={2} name="Attention Span" />
                <Line type="monotone" dataKey="confidence" stroke="#34d399" strokeWidth={2} name="Confidence" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
