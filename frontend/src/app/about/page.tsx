'use client';

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { BookOpen, Target, Lightbulb, BrainCircuit, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutResearchPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Research Specifications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">About the CL-CATT Research Framework</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Closed-Loop Causal Adaptive Teaching Twin: A Cognitive Digital Twin Framework for Adaptive Teaching using 
          Causal Reasoning, Policy Simulation, Teacher-in-the-Loop Learning, and Continuous Explanation Memory.
        </p>
      </div>

      {/* Grid: Problem Statement vs Research Gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="p-6 space-y-4 border-rose-500/20">
          <div className="flex items-center space-x-3 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
            <h2 className="text-base font-bold text-white">Problem Statement</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Modern Intelligent Tutoring Systems (ITS) suffer from **static rule-based interventions** and 
            **black-box correlation models**. They treat student confusion as a linear scoring deficit rather than 
            identifying underlying causal bottlenecks in prerequisite concept graphs.
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Inability to model student cognitive states dynamically over time.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Lack of counterfactual simulation prior to strategy deployment.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>No persistent memory of student-preferred explanation modalities.</span>
            </li>
          </ul>
        </GlassCard>

        <GlassCard className="p-6 space-y-4 border-cyan-500/20">
          <div className="flex items-center space-x-3 text-cyan-400">
            <Target className="w-5 h-5" />
            <h2 className="text-base font-bold text-white">Research Gap Addressed</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            CL-CATT bridges the gap between **Generative AI (Groq LLaMA 3.3)** and **Causal Inference Networks**. 
            By building a real-time Cognitive Digital Twin for every student, teachers can simulate interventions, 
            evaluate risk-confidence trade-offs, and store explanation styles continuously.
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Causal Directed Acyclic Graphs (DAGs) replace naive correlation.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Teacher-in-the-loop validation maintains educational oversight.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Continuous explanation trace aligns visual, analogy, and step-by-step styles.</span>
            </li>
          </ul>
        </GlassCard>
      </div>

      {/* Core Objectives */}
      <GlassCard className="p-8 space-y-6">
        <div className="flex items-center space-x-3">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">Research Objectives & Innovations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: '1. Cognitive Digital Twin Modeling',
              desc: 'Tracking 6 key cognitive dimensions: Knowledge Level, Attention Span, Motivation, Confidence, Learning Speed, and Concept Mastery.'
            },
            {
              title: '2. Groq LLM Strategy Synthesis',
              desc: 'Generating 5–10 candidate teaching strategies with explicit expected outcome ratings and risk confidence calculations.'
            },
            {
              title: '3. Closed-Loop Outcome Verification',
              desc: 'Comparing predicted learning gains against observed post-quiz results to refine future policy iterations.'
            }
          ].map((obj, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-xs font-bold text-blue-400">{obj.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{obj.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Researcher Credit */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-base font-bold text-white">Lead Research & Development</h3>
          <p className="text-xs text-cyan-300 font-semibold">Chandramouli Boppana • Mohan Babu University</p>
          <p className="text-[11px] text-slate-400">Department of Artificial Intelligence & Machine Learning</p>
        </div>

        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-500/30 flex items-center space-x-2 shrink-0"
        >
          <span>View Teacher Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
