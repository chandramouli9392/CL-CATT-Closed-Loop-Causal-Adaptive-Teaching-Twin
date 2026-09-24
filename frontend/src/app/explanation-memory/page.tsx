'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { Bot, Sparkles, BrainCircuit, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ExplanationMemoryPage() {
  const [selectedStudent, setSelectedStudent] = useState('Aarav Sharma (STU-1001)');
  const [preferredStyle, setPreferredStyle] = useState('Visual Diagrams');
  const [visualAffinity, setVisualAffinity] = useState(92);
  const [analogyAffinity, setAnalogyAffinity] = useState(65);
  const [stepAffinity, setStepAffinity] = useState(70);
  const [interactiveAffinity, setInteractiveAffinity] = useState(88);

  const [memoryTrace, setMemoryTrace] = useState([
    { topic: 'Calculus Gradients', styleUsed: 'Visual Vector Field', comprehensionScore: '94%', timestamp: '2026-07-24' },
    { topic: 'Neural Forward Pass', styleUsed: 'Interactive Canvas Node', comprehensionScore: '91%', timestamp: '2026-07-25' },
    { topic: 'Causal DAG Invariance', styleUsed: 'Physical Analogy', comprehensionScore: '86%', timestamp: '2026-07-26' },
  ]);

  const handleUpdateMemory = () => {
    setMemoryTrace(prev => [
      {
        topic: 'Real-time Adaptation',
        styleUsed: preferredStyle,
        comprehensionScore: `${Math.min(98, visualAffinity + 5)}%`,
        timestamp: 'Just now'
      },
      ...prev
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Continuous Explanation Memory</h1>
          <p className="text-xs text-slate-400">Stores & Continuously Adapts Student Explanation Style Affinities</p>
        </div>

        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
        >
          <option>Aarav Sharma (STU-1001)</option>
          <option>Diya Patel (STU-1002)</option>
          <option>Rohan Verma (STU-1003)</option>
          <option>Ananya Reddy (STU-1004)</option>
        </select>
      </div>

      {/* Main Grid: Modality Affinities vs Memory Trace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Style Affinity Sliders */}
        <GlassCard className="p-6 space-y-6">
          <div className="flex items-center space-x-2 text-purple-400">
            <Bot className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Explanation Style Affinity Vector</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300 font-semibold">Visual Diagram Affinity</span>
                <span className="text-cyan-400 font-bold">{visualAffinity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={visualAffinity}
                onChange={(e) => setVisualAffinity(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300 font-semibold">Physical Analogy Affinity</span>
                <span className="text-purple-400 font-bold">{analogyAffinity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={analogyAffinity}
                onChange={(e) => setAnalogyAffinity(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300 font-semibold">Step-by-Step Formalism Affinity</span>
                <span className="text-blue-400 font-bold">{stepAffinity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={stepAffinity}
                onChange={(e) => setStepAffinity(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg accent-blue-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300 font-semibold">Interactive Sandbox Affinity</span>
                <span className="text-emerald-400 font-bold">{interactiveAffinity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={interactiveAffinity}
                onChange={(e) => setInteractiveAffinity(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handleUpdateMemory}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Update Explanation Memory Trace</span>
          </button>
        </GlassCard>

        {/* Memory History Trace Log */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
            <span>Historical Memory Trace</span>
          </h3>

          <div className="space-y-3">
            {memoryTrace.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{item.topic}</span>
                  <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Style: <strong className="text-purple-300">{item.styleUsed}</strong></span>
                  <span>Comprehension: <strong className="text-emerald-400">{item.comprehensionScore}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
