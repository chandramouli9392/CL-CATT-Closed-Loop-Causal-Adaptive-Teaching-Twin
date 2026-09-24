'use client';

import React from 'react';
import GlassCard from '@/components/GlassCard';
import StatWidget from '@/components/StatWidget';
import ReportExporter from '@/components/ReportExporter';
import { Settings, Cpu, BrainCircuit, Sparkles, BookOpen, Layers, ShieldCheck, Download } from 'lucide-react';

export default function ResearchDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">CL-CATT Research Hub & Architecture</h1>
          <p className="text-xs text-slate-400">Scientific Paper Specifications • System Metrics • PDF Report Generator</p>
        </div>

        <ReportExporter reportTitle="CL-CATT Complete Architectural Research Report" />
      </div>

      {/* Top Research Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget title="Causal Fidelity" value="94.2%" subtitle="DAG Model Accuracy" icon={Cpu} color="cyan" />
        <StatWidget title="Active LLM Engine" value="Groq LLaMA 3.3" subtitle="70B Parameter Model" icon={Sparkles} color="purple" />
        <StatWidget title="Cognitive Twins" value="24 Active" subtitle="6D Vector State" icon={BrainCircuit} color="blue" />
        <StatWidget title="Prediction MAE" value="0.012" subtitle="Observed vs Target" icon={ShieldCheck} color="emerald" />
      </div>

      {/* Architecture Spec Card */}
      <GlassCard className="p-8 space-y-6 border-purple-500/30 glass-card-glow">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <Layers className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Architectural Flow & Module Topology</h2>
          </div>
          <span className="text-xs text-purple-300 font-mono">v1.0-Research-Prototype</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Module 1 • Sensing</span>
            <h3 className="text-sm font-bold text-white">Observation & Digital Twin Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Maintains real-time state vectors for Knowledge, Attention, Motivation, Confidence, Speed, and Mastery.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Module 2 • Synthesis</span>
            <h3 className="text-sm font-bold text-white">Groq Policy & Simulation Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Generates 5–10 teaching strategies with counterfactual gain predictions and risk-confidence scoring.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Module 3 • Adaptation</span>
            <h3 className="text-sm font-bold text-white">Explanation Memory & Outcome Monitor</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Updates visual/analogy affinities continuously and validates predicted vs observed post-quiz gains.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Author & Academic Info */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Principal Investigator & Institutional Attribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400 uppercase font-semibold text-[10px]">Lead AI Engineer & Author</span>
            <h4 className="text-base font-extrabold text-white">Chandramouli Boppana</h4>
            <p className="text-purple-300">Department of Artificial Intelligence & Machine Learning</p>
            <p className="text-cyan-400 font-semibold">Mohan Babu University</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400 uppercase font-semibold text-[10px]">Prototype Purpose</span>
            <h4 className="text-base font-extrabold text-white">Educational AI Architecture Demonstration</h4>
            <p className="text-slate-300">
              Demonstrates Cognitive Digital Twin synchronization, causal policy simulation, teacher-in-the-loop validation, and continuous explanation memory.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
