'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BrainCircuit, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Network, 
  Bot, 
  ShieldCheck, 
  Cpu, 
  BarChart3, 
  CheckCircle2, 
  Zap, 
  Layers, 
  BookOpen,
  Users
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function HomePage() {
  const steps = [
    { num: '01', title: 'Continuous Observation', desc: 'Captures multi-dimensional student attention, motivation, and quiz interaction vectors.' },
    { num: '02', title: 'Cognitive Digital Twin', desc: 'Constructs real-time state models (Knowledge, Speed, Confidence, Mastery Level).' },
    { num: '03', title: 'Causal Policy Generation', desc: 'Groq LLM synthesizes adaptive teaching strategies with explicit counterfactual reasoning.' },
    { num: '04', title: 'Counterfactual Simulation', desc: 'Simulates predicted learning gains prior to live classroom intervention execution.' },
    { num: '05', title: 'Teacher-in-the-Loop', desc: 'Empowers educators to review, approve, override, or refine generated teaching policies.' },
    { num: '06', title: 'Explanation Memory', desc: 'Continuously updates individual explanation preferences (Visual, Analogy, Step-by-Step).' },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 text-center overflow-hidden">
        {/* Background Glowing Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-cyan-500/20 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse-slow" />

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>AI Research Prototype • CL-CATT Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Closed-Loop Causal Adaptive Teaching Twin{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            (CL-CATT)
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          A Cognitive Digital Twin Framework for Adaptive Teaching using Causal Reasoning, 
          Policy Simulation, Teacher-in-the-Loop Learning, and Continuous Explanation Memory.
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-105"
          >
            <span>Launch Teacher Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/policy-generator"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl glass-card border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Generate Teaching Policy</span>
          </Link>
        </div>

        {/* Live System Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Groq LLaMA 3.3 70B Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Causal DAG Simulation Engine</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Continuous Memory Trace</span>
          </div>
        </div>
      </section>

      {/* Closed-Loop Architecture Workflow */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">System Architecture</span>
          <h2 className="text-3xl font-extrabold text-white">Closed-Loop Cognitive Flow</h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            CL-CATT continuously senses student state vectors, runs causal simulations, generates Groq LLM strategies, 
            and adapts explanation modalities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <GlassCard key={step.num} className="p-6 space-y-4 hover:border-blue-500/40 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-blue-500/40 font-mono group-hover:text-blue-400 transition-colors">
                  {step.num}
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Core Research Contributions */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Innovation & Impact</span>
          <h2 className="text-3xl font-extrabold text-white leading-tight">
            Why CL-CATT Outperforms Traditional Static AI Tutors
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Conventional adaptive learning platforms rely on rigid item-response theory. CL-CATT integrates 
            **causal directed acyclic graphs (DAGs)** with **neural LLM policy generation** to understand 
            *why* a student struggles, not just *that* they struggled.
          </p>

          <div className="space-y-3">
            {[
              { title: 'Causal Reasoning vs Correlation', desc: 'Identifies true bottleneck concept nodes instead of superficial quiz scoring.' },
              { title: 'Counterfactual Policy Simulation', desc: 'Predicts student knowledge gains before teacher applies intervention.' },
              { title: 'Continuous Explanation Memory', desc: 'Remembers whether student learns best via Visual, Analogy, or Step-by-Step.' },
              { title: 'Teacher-in-the-Loop Protocol', desc: 'Puts educators in direct control of policy approval and confidence thresholds.' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid Card */}
        <GlassCard className="p-8 space-y-6 border-purple-500/30 glass-card-glow">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <BrainCircuit className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Live Prototype Capabilities</h3>
            </div>
            <span className="text-xs text-purple-300 font-mono">FastAPI + Groq</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Student Twin Dashboard', link: '/students', icon: Users },
              { label: 'Classroom Analytics', link: '/analytics', icon: Activity },
              { label: 'Cognitive Twin Graph', link: '/twin-graph', icon: Cpu },
              { label: 'Policy Generator', link: '/policy-generator', icon: Sparkles },
              { label: 'Policy Simulator', link: '/policy-simulation', icon: Layers },
              { label: 'Causal Knowledge Graph', link: '/causal-graph', icon: Network },
              { label: 'Explanation Memory', link: '/explanation-memory', icon: Bot },
              { label: 'Outcome Monitoring', link: '/outcome-monitoring', icon: BarChart3 },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={idx}
                  href={feature.link}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 transition-all group flex items-center space-x-2.5"
                >
                  <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{feature.label}</span>
                </Link>
              );
            })}
          </div>
        </GlassCard>
      </section>

      {/* Technology Stack Banner */}
      <section className="p-8 rounded-2xl glass-card border border-slate-800 space-y-6 text-center">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Built With Modern Research Stack</h3>
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-300">
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">Next.js 15</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">React & TypeScript</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">FastAPI & Python 3.12</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-300">Groq API (LLaMA 3.3 70B)</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">Recharts & SVG DAGs</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">SQLAlchemy & SQLite</span>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950 border border-blue-500/20 space-y-6">
        <h2 className="text-3xl font-extrabold text-white">Ready to Explore the CL-CATT Architecture?</h2>
        <p className="text-xs text-slate-300 max-w-xl mx-auto">
          Experience how Cognitive Digital Twins and Causal Reasoning revolutionize adaptive education.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/30"
        >
          <span>Explore Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
