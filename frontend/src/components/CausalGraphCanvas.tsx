'use client';

import React, { useState } from 'react';
import { ArrowRight, Plus, Eye, Sparkles } from 'lucide-react';

interface NodeItem {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  mastery: number;
}

interface EdgeItem {
  from: string;
  to: string;
  weight: number;
  rel: string;
}

export default function CausalGraphCanvas() {
  const [nodes, setNodes] = useState<NodeItem[]>([
    { id: 'C1', label: 'Linear Algebra', category: 'Foundation', x: 80, y: 120, mastery: 0.82 },
    { id: 'C2', label: 'Calculus & Gradients', category: 'Foundation', x: 80, y: 280, mastery: 0.78 },
    { id: 'C3', label: 'Bayes & Probability', category: 'Foundation', x: 80, y: 440, mastery: 0.85 },
    { id: 'C4', label: 'Causal DAGs', category: 'Core Concept', x: 340, y: 440, mastery: 0.88 },
    { id: 'C5', label: 'Neural Architectures', category: 'Core Concept', x: 340, y: 200, mastery: 0.80 },
    { id: 'C6', label: 'Counterfactual Sim', category: 'Advanced AI', x: 600, y: 440, mastery: 0.90 },
    { id: 'C7', label: 'Cognitive Twin Adaptation', category: 'Advanced AI', x: 600, y: 200, mastery: 0.94 },
  ]);

  const [edges, setEdges] = useState<EdgeItem[]>([
    { from: 'C1', to: 'C5', weight: 0.85, rel: 'Prerequisite' },
    { from: 'C2', to: 'C5', weight: 0.90, rel: 'Prerequisite' },
    { from: 'C3', to: 'C4', weight: 0.92, rel: 'Prerequisite' },
    { from: 'C4', to: 'C6', weight: 0.95, rel: 'Causal Effect' },
    { from: 'C5', to: 'C7', weight: 0.88, rel: 'Sub-component' },
    { from: 'C6', to: 'C7', weight: 0.96, rel: 'Drives Policy' },
  ]);

  const [selectedNode, setSelectedNode] = useState<NodeItem | null>(nodes[3]);
  const [newNodeLabel, setNewNodeLabel] = useState('');

  const handleAddNode = () => {
    if (!newNodeLabel.trim()) return;
    const newId = `C${nodes.length + 1}`;
    const newNode: NodeItem = {
      id: newId,
      label: newNodeLabel,
      category: 'Dynamic Concept',
      x: 340,
      y: 320,
      mastery: 0.75
    };
    setNodes(prev => [...prev, newNode]);
    // Connect to C7
    setEdges(prev => [...prev, { from: newId, to: 'C7', weight: 0.85, rel: 'Adaptive Edge' }]);
    setNewNodeLabel('');
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <input
            type="text"
            value={newNodeLabel}
            onChange={(e) => setNewNodeLabel(e.target.value)}
            placeholder="Add new concept node (e.g. Memory Scaffolding)..."
            className="px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-full sm:w-72"
          />
          <button
            onClick={handleAddNode}
            className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center space-x-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Node</span>
          </button>
        </div>

        <div className="flex items-center space-x-4 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>Foundation</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <span>Core Concept</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>Advanced AI</span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative h-[500px] glass-card rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 p-4">
          <svg className="w-full h-full">
            {/* Draw Edges */}
            {edges.map((e, idx) => {
              const src = nodes.find(n => n.id === e.from);
              const tgt = nodes.find(n => n.id === e.to);
              if (!src || !tgt) return null;
              return (
                <g key={idx}>
                  <line
                    x1={src.x + 60}
                    y1={src.y + 20}
                    x2={tgt.x}
                    y2={tgt.y + 20}
                    stroke="#3b82f6"
                    strokeWidth={e.weight * 3.5}
                    strokeOpacity={0.6}
                    strokeDasharray={e.rel === 'Adaptive Edge' ? '4 4' : undefined}
                  />
                  <text
                    x={(src.x + tgt.x) / 2 + 10}
                    y={(src.y + tgt.y) / 2 + 10}
                    fill="#94a3b8"
                    fontSize="10"
                    className="font-mono"
                  >
                    w={e.weight}
                  </text>
                </g>
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((n) => {
              const isSelected = selectedNode?.id === n.id;
              let bg = '#3b82f6';
              if (n.category === 'Core Concept') bg = '#8b5cf6';
              if (n.category === 'Advanced AI') bg = '#06b6d4';

              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x}, ${n.y})`}
                  onClick={() => setSelectedNode(n)}
                  className="cursor-pointer group"
                >
                  <rect
                    width="140"
                    height="48"
                    rx="12"
                    fill="#0f172a"
                    stroke={isSelected ? '#38bdf8' : bg}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-200 group-hover:scale-105"
                  />
                  <circle cx="16" cy="24" r="6" fill={bg} />
                  <text x="28" y="22" fill="#ffffff" fontSize="11" fontWeight="bold">
                    {n.label.length > 15 ? n.label.substring(0, 15) + '...' : n.label}
                  </text>
                  <text x="28" y="36" fill="#94a3b8" fontSize="9">
                    Mastery: {Math.round(n.mastery * 100)}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Details Panel */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Causal Inspector</h3>
          </div>

          {selectedNode ? (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">{selectedNode.category}</span>
                <h4 className="text-base font-extrabold text-white">{selectedNode.label}</h4>
                <p className="text-xs text-slate-400">Node ID: {selectedNode.id}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Prerequisite Mastery</span>
                  <span className="text-cyan-400 font-bold">{Math.round(selectedNode.mastery * 100)}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                    style={{ width: `${selectedNode.mastery * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-slate-300 mb-2">Connected Downstream Effects</h5>
                <div className="space-y-2">
                  {edges.filter(e => e.from === selectedNode.id).map((edge, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-between">
                      <span className="text-slate-300">{edge.to} ({edge.rel})</span>
                      <span className="text-blue-400 font-mono font-bold">weight={edge.weight}</span>
                    </div>
                  ))}
                  {edges.filter(e => e.from === selectedNode.id).length === 0 && (
                    <p className="text-xs text-slate-500 italic">Terminal node (drives final outcome adaptation).</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Select any node on the graph canvas to inspect its causal weight vectors.</p>
          )}
        </div>
      </div>
    </div>
  );
}
