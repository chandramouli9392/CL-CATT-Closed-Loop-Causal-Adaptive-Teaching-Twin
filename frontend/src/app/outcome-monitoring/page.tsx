'use client';

import React from 'react';
import GlassCard from '@/components/GlassCard';
import StatWidget from '@/components/StatWidget';
import ReportExporter from '@/components/ReportExporter';
import { ShieldAlert, BarChart3, CheckCircle2, TrendingUp, Sparkles, Award } from 'lucide-react';

export default function OutcomeMonitoringPage() {
  const outcomes = [
    { student: 'Aarav Sharma', topic: 'Causal Inference & DAGs', predictedGain: '+22%', observedGain: '+21%', quizScore: '92.5%', attendance: '100%', retention: '94%' },
    { student: 'Diya Patel', topic: 'Socratic Counterfactuals', predictedGain: '+18%', observedGain: '+17%', quizScore: '86.0%', attendance: '95%', retention: '88%' },
    { student: 'Rohan Verma', topic: 'Neural Forward Pass', predictedGain: '+15%', observedGain: '+16%', quizScore: '95.0%', attendance: '100%', retention: '96%' },
    { student: 'Ananya Reddy', topic: 'Visual Matrix Scaffolding', predictedGain: '+25%', observedGain: '+23%', quizScore: '78.5%', attendance: '90%', retention: '82%' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Closed-Loop Outcome Monitoring</h1>
          <p className="text-xs text-slate-400">Post-Teaching Quiz • Attendance • Engagement • Predicted vs Observed Comparison</p>
        </div>

        <ReportExporter reportTitle="CL-CATT Post-Intervention Outcome Report" />
      </div>

      {/* Top Fidelity Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget title="Prediction Fidelity" value="94.2%" subtitle="Mean Absolute Error: 0.012" icon={Sparkles} color="cyan" />
        <StatWidget title="Avg Quiz Mastery" value="88.0%" subtitle="Post-Intervention Score" icon={Award} color="emerald" />
        <StatWidget title="Avg Retention Rate" value="90.0%" subtitle="30-Day Delay Recall" icon={TrendingUp} color="purple" />
        <StatWidget title="Total Evaluations" value="48" subtitle="Completed Sessions" icon={BarChart3} color="blue" />
      </div>

      {/* Outcome Table */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Predicted vs Observed Intervention Outcomes</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Fidelity Tolerance: ±2.5%</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Lesson Topic</th>
                <th className="py-3 px-4">Predicted Gain</th>
                <th className="py-3 px-4">Observed Gain</th>
                <th className="py-3 px-4">Quiz Score</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Retention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {outcomes.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{row.student}</td>
                  <td className="py-3.5 px-4 text-purple-300">{row.topic}</td>
                  <td className="py-3.5 px-4 text-cyan-400 font-mono font-bold">{row.predictedGain}</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-mono font-bold">{row.observedGain}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{row.quizScore}</td>
                  <td className="py-3.5 px-4 text-slate-300">{row.attendance}</td>
                  <td className="py-3.5 px-4 text-blue-400 font-bold">{row.retention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
