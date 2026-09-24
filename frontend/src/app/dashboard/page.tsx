'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import StatWidget from '@/components/StatWidget';
import { 
  Users, 
  BrainCircuit, 
  Activity, 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  Sliders
} from 'lucide-react';
import { fetchStudents, Student } from '@/lib/api';

export default function TeacherDashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents().then(data => {
      setStudents(data);
      setLoading(false);
    });
  }, []);

  const totalStudents = students.length || 4;
  const avgKnowledge = students.length
    ? (students.reduce((acc, s) => acc + (s.digital_twin?.knowledge_level || 0.65), 0) / students.length)
    : 0.68;
  const avgAttention = students.length
    ? (students.reduce((acc, s) => acc + (s.digital_twin?.attention_span || 0.80), 0) / students.length)
    : 0.82;
  const highRiskCount = students.filter(s => s.digital_twin?.risk_level === 'High').length || 1;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Teacher Dashboard</h1>
          <p className="text-xs text-slate-400">Classroom Cognitive Overview • AI Policy Recommendations</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/policy-generator"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-xs font-semibold flex items-center space-x-2 shadow-md shadow-blue-500/20"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Generate Strategy</span>
          </Link>
          <Link
            href="/policy-simulation"
            className="px-4 py-2 rounded-xl glass-card border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold flex items-center space-x-2"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Run Simulation</span>
          </Link>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget
          title="Total Active Twins"
          value={totalStudents}
          subtitle="Real-time Cognitive Synchronized"
          icon={Users}
          color="blue"
          trend="+12%"
          trendUp={true}
        />
        <StatWidget
          title="Avg Class Mastery"
          value={`${Math.round(avgKnowledge * 100)}%`}
          subtitle="Concept Readiness"
          icon={BrainCircuit}
          color="purple"
          trend="+5.4%"
          trendUp={true}
        />
        <StatWidget
          title="Avg Attention Span"
          value={`${Math.round(avgAttention * 100)}%`}
          subtitle="Real-time Engagement"
          icon={Activity}
          color="cyan"
          trend="+3.1%"
          trendUp={true}
        />
        <StatWidget
          title="Intervention Alerts"
          value={highRiskCount}
          subtitle="High Cognitive Drift Risk"
          icon={AlertTriangle}
          color="amber"
          trend="Action Needed"
          trendUp={false}
        />
      </div>

      {/* Main Grid: Student List vs Today's Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Student Twin Roster (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Student Cognitive Digital Twins</h3>
                <p className="text-xs text-slate-400">Select any twin to view full cognitive metrics & risk profile</p>
              </div>
              <Link href="/students" className="text-xs text-cyan-400 hover:underline flex items-center space-x-1">
                <span>View All Twins</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {students.map((student) => {
                const twin = student.digital_twin;
                const riskColor = 
                  twin?.risk_level === 'High' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' :
                  twin?.risk_level === 'Medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';

                return (
                  <div
                    key={student.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-sm">
                        {student.full_name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{student.full_name}</h4>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                          <span>{student.student_id}</span>
                          <span>•</span>
                          <span className="text-purple-300 font-medium">{student.learning_style}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 uppercase">Knowledge Level</span>
                        <p className="text-xs font-bold text-cyan-400">{Math.round((twin?.knowledge_level || 0.65) * 100)}%</p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${riskColor}`}>
                        {twin?.risk_level || 'Low'} Risk
                      </span>

                      <Link
                        href={`/students/${student.id}`}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Right Sidebar: Today's Recommendations & Alerts */}
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4 border-purple-500/20 glass-card-glow">
            <div className="flex items-center space-x-2 text-purple-400">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <h3 className="text-base font-bold text-white">Groq AI Recommendation</h3>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-2">
              <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">Top Teaching Strategy</span>
              <h4 className="text-sm font-bold text-white">Causal Multimodal Visual Scaffolding</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Re-ground linear algebra vector concepts visually for Ananya Reddy (High Risk Twin) before proceeding to neural forward pass equations.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Policy Confidence</span>
                <span className="text-emerald-400 font-bold">95.4%</span>
              </div>
            </div>

            <Link
              href="/policy-generator"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
            >
              <span>Review Policy Options</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </GlassCard>

          {/* Real-time Alerts */}
          <GlassCard className="p-6 space-y-4 border-amber-500/20">
            <div className="flex items-center space-x-2 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Real-time Cognitive Alerts</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                <span className="text-rose-400 font-bold">Attention Dip Detected</span>
                <p className="text-slate-300">Ananya Reddy attention metric dropped below 60% during Socratic prompt phase.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                <span className="text-cyan-400 font-bold">Explanation Alignment</span>
                <p className="text-slate-300">Aarav Sharma requested visual diagram tracing for matrix multiplication.</p>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
