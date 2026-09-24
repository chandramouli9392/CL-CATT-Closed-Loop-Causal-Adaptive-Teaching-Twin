'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import CausalGraphCanvas from '@/components/CausalGraphCanvas';
import { Cpu, BrainCircuit, Activity, Sliders, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function TwinGraphPage() {
  const [selectedStudent, setSelectedStudent] = useState('Aarav Sharma (STU-1001)');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Cognitive Digital Twin Network Visualizer</h1>
          <p className="text-xs text-slate-400">Animated Concept Nodes • Prerequisite Causal Dependencies • Live Edge Editing</p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs text-slate-400">Select Twin:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option>Aarav Sharma (STU-1001)</option>
            <option>Diya Patel (STU-1002)</option>
            <option>Rohan Verma (STU-1003)</option>
            <option>Ananya Reddy (STU-1004)</option>
          </select>
        </div>
      </div>

      {/* Main Graph Component */}
      <CausalGraphCanvas />
    </div>
  );
}
