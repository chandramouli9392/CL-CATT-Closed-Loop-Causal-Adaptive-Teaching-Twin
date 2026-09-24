'use client';

import React from 'react';
import GlassCard from '@/components/GlassCard';
import StatWidget from '@/components/StatWidget';
import { Activity, BarChart3, Users, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from 'recharts';

export default function AnalyticsPage() {
  const distributionData = [
    { range: '0-40%', count: 1, label: 'High Risk' },
    { range: '40-60%', count: 3, label: 'Medium Risk' },
    { range: '60-80%', count: 12, label: 'On Track' },
    { range: '80-100%', count: 8, label: 'Mastered' },
  ];

  const trendData = [
    { week: 'Week 1', avgScore: 62, engagement: 74, predictedGain: 12 },
    { week: 'Week 2', avgScore: 68, engagement: 79, predictedGain: 15 },
    { week: 'Week 3', avgScore: 74, engagement: 85, predictedGain: 18 },
    { week: 'Week 4', avgScore: 81, engagement: 88, predictedGain: 22 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Classroom Analytics & Predictions</h1>
        <p className="text-xs text-slate-400">Macro-Level Cognitive Distribution • Attendance • Engagement • Knowledge Gains</p>
      </div>

      {/* Metric Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget title="Class Attendance" value="96.2%" subtitle="Daily Sync Rate" icon={Users} color="cyan" />
        <StatWidget title="Engagement Index" value="84.5%" subtitle="Real-time Interaction" icon={Activity} color="purple" />
        <StatWidget title="Predicted Gain" value="+18.4%" subtitle="CL-CATT Target" icon={TrendingUp} color="blue" />
        <StatWidget title="Fidelity Accuracy" value="94.2%" subtitle="Predicted vs Observed" icon={Sparkles} color="emerald" />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Knowledge Distribution Histogram */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span>Knowledge Distribution (Class Spectrum)</span>
            </h3>
            <span className="text-xs text-slate-400">Total: 24 Students</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="range" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Engagement & Mastery Trend */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span>Engagement vs Mastery Trajectory</span>
            </h3>
            <span className="text-xs text-emerald-400 font-bold">+19% Growth</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Area type="monotone" dataKey="avgScore" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="Avg Mastery Score" />
                <Area type="monotone" dataKey="engagement" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} name="Engagement Index" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
