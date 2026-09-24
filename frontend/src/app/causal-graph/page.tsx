'use client';

import React from 'react';
import CausalGraphCanvas from '@/components/CausalGraphCanvas';

export default function CausalKnowledgeGraphPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Causal Knowledge Graph Management</h1>
        <p className="text-xs text-slate-400">Interactive DAG Ontology • Node Causal Weight Tuning • Sub-concept Prerequisite Edges</p>
      </div>

      <CausalGraphCanvas />
    </div>
  );
}
