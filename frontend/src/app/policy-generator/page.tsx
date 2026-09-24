'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { generatePoliciesApi, Policy } from '@/lib/api';
import { Sparkles, BrainCircuit, ShieldAlert, CheckCircle2, ArrowRight, RefreshCw, Sliders } from 'lucide-react';
import Link from 'next/link';

export default function PolicyGeneratorPage() {
  const [topic, setTopic] = useState('Deep Learning Forward Pass & Backpropagation');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [targetGroup, setTargetGroup] = useState('General Class');
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await generatePoliciesApi(topic, difficulty, targetGroup);
      setPolicies(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI Teaching Policy Generator</h1>
        <p className="text-xs text-slate-400">Powered by Groq LLaMA 3.3 70B & CL-CATT Counterfactual Reasoning Engine</p>
      </div>

      {/* Input Parameters Form */}
      <GlassCard className="p-6 space-y-6">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Teaching Topic / Sub-Concept</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Causal DAGs, Matrix Calculus, Attention Mechanics..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Difficulty Level</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option>Beginner Scaffolding</option>
              <option>Intermediate</option>
              <option>Advanced Mastery</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Student Cohort</label>
            <select
              value={targetGroup}
              onChange={(e) => setTargetGroup(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option>General Class</option>
              <option>High-Risk Twins (Remedial)</option>
              <option>Visual-Preferred Cohort</option>
              <option>Accelerated Track</option>
            </select>
          </div>

          <div className="md:col-span-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:opacity-90 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center space-x-2 transition-all hover:scale-105"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Policies via Groq...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Generate 5–10 Adaptive Policies</span>
                </>
              )}
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Policy Results */}
      {policies.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white">Synthesized Teaching Policies ({policies.length})</h3>
            <span className="text-xs text-cyan-400 font-mono">Groq LLaMA 3.3 Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map((policy, idx) => (
              <GlassCard key={idx} className="p-6 space-y-4 hover:border-purple-500/40 relative flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      Strategy #{idx + 1}
                    </span>

                    <div className="flex items-center space-x-3 text-xs">
                      <span className="text-emerald-400 font-bold">Conf: {Math.round(policy.confidence_score * 100)}%</span>
                      <span className="text-slate-500">|</span>
                      <span className="text-amber-400 font-bold">Risk: {Math.round(policy.risk_score * 100)}%</span>
                    </div>
                  </div>

                  <h4 className="text-base font-extrabold text-white">{policy.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{policy.description}</p>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Causal Reasoning</span>
                    <p className="text-slate-300">{policy.causal_reasoning}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/40 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">Groq AI Explanation</span>
                    <p className="text-purple-200">{policy.groq_explanation}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400">Expected Gain: </span>
                    <span className="text-emerald-400 font-bold">+{Math.round(policy.expected_outcome * 100)}%</span>
                  </div>

                  <Link
                    href="/policy-simulation"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Simulate Policy</span>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
