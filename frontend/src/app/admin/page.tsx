'use client';

import React from 'react';
import GlassCard from '@/components/GlassCard';
import StatWidget from '@/components/StatWidget';
import { Users, Server, Database, ShieldCheck, Activity, Terminal } from 'lucide-react';

export default function AdminPanelPage() {
  const auditLogs = [
    { time: '21:50:12', user: 'Prof. Chandramouli Boppana', action: 'GENERATED_POLICY', detail: 'Generated 5 policies for Causal Invariance topic via Groq API.' },
    { time: '21:44:05', user: 'System Auto-Sync', action: 'TWIN_STATE_UPDATE', detail: 'Synchronized STU-1004 cognitive vector (Attention dropped to 58%).' },
    { time: '21:30:00', user: 'Admin User', action: 'GRAPH_NODE_ADD', detail: 'Added new knowledge node C7: Cognitive Twin Adaptation.' },
    { time: '21:15:22', user: 'Prof. Chandramouli Boppana', action: 'SIMULATION_EXEC', detail: 'Executed counterfactual simulation for student Aarav Sharma.' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Admin & Control Panel</h1>
        <p className="text-xs text-slate-400">Manage Teachers • System Audit Logs • Database & API Status</p>
      </div>

      {/* System Status Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget title="Backend Server" value="FastAPI 0.110" subtitle="Uvicorn Active" icon={Server} color="emerald" />
        <StatWidget title="Database Status" value="SQLite Online" subtitle="SQLAlchemy ORM" icon={Database} color="blue" />
        <StatWidget title="Groq API Key" value="Configured" subtitle="LLaMA 3.3 70B Active" icon={ShieldCheck} color="purple" />
        <StatWidget title="Active Teachers" value="2 Accounts" subtitle="1 Admin, 1 Teacher" icon={Users} color="cyan" />
      </div>

      {/* Audit Log Table */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>System Audit & Policy Execution Logs</span>
          </h3>
          <span className="text-xs text-slate-400">Live Logging Active</span>
        </div>

        <div className="space-y-2">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono">
              <div className="flex items-center space-x-3">
                <span className="text-slate-500">{log.time}</span>
                <span className="text-cyan-400 font-bold">{log.action}</span>
                <span className="text-slate-300 font-sans">{log.detail}</span>
              </div>
              <span className="text-purple-300 text-[11px] font-sans">{log.user}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
