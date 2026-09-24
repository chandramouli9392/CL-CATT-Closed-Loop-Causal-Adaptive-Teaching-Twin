'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import TwinRadarChart from '@/components/TwinRadarChart';
import StatWidget from '@/components/StatWidget';
import { fetchStudentById, runSimulationApi, Student, SimulationResult } from '@/lib/api';
import { 
  Users, 
  BrainCircuit, 
  Activity, 
  Sparkles, 
  ArrowLeft, 
  Sliders, 
  History, 
  CheckCircle2, 
  ShieldAlert, 
  Bot
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function StudentTwinDetailPage() {
  const params = useParams();
  const studentId = Number(params.id) || 1;

  const [student, setStudent] = useState<Student | null>(null);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    fetchStudentById(studentId).then(setStudent);
  }, [studentId]);

  const handleSimulate = async () => {
    setSimulating(true);
    const res = await runSimulationApi(studentId, 0.85);
    setSimulation(res);
    setSimulating(false);
  };

  if (!student) {
    return <div className="text-center py-20 text-slate-400">Loading Cognitive Digital Twin...</div>;
  }

  const twin = student.digital_twin || {
    knowledge_level: 0.68,
    attention_span: 0.85,
    motivation_score: 0.82,
    confidence_level: 0.74,
    learning_speed: 0.88,
    concept_mastery: 0.70,
    risk_level: 'Low'
  };

  const historyData = twin.historical_metrics || [
    { week: 'Week 1', knowledge: 0.52, attention: 0.78 },
    { week: 'Week 2', knowledge: 0.60, attention: 0.82 },
    { week: 'Week 3', knowledge: 0.68, attention: 0.85 }
  ];

  return (
    <div className="space-y-8">
      {/* Top Nav */}
      <div className="flex items-center space-x-3">
        <Link href="/students" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-white">Digital Twin: {student.full_name}</h1>
          <p className="text-xs text-slate-400">ID: {student.student_id} • {student.grade} • Style: {student.learning_style}</p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget title="Knowledge Level" value={`${Math.round(twin.knowledge_level * 100)}%`} icon={BrainCircuit} color="cyan" />
        <StatWidget title="Attention Span" value={`${Math.round(twin.attention_span * 100)}%`} icon={Activity} color="purple" />
        <StatWidget title="Motivation Score" value={`${Math.round(twin.motivation_score * 100)}%`} icon={Sparkles} color="blue" />
        <StatWidget title="Confidence Level" value={`${Math.round(twin.confidence_level * 100)}%`} icon={Users} color="amber" />
      </div>

      {/* Main Twin Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Radar & State Vector */}
        <GlassCard className="p-6 space-y-4 lg:col-span-1">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
            <span>6D Cognitive State Vector</span>
          </h3>

          <TwinRadarChart
            knowledge={twin.knowledge_level}
            attention={twin.attention_span}
            motivation={twin.motivation_score}
            confidence={twin.confidence_level}
            speed={twin.learning_speed}
            mastery={twin.concept_mastery}
          />

          <div className="space-y-2 text-xs pt-4 border-t border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-400">Learning Velocity</span>
              <span className="text-white font-bold">{Math.round(twin.learning_speed * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Prerequisite Mastery</span>
              <span className="text-cyan-400 font-bold">{Math.round(twin.concept_mastery * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Risk Assessment</span>
              <span className="text-emerald-400 font-bold">{twin.risk_level} Risk</span>
            </div>
          </div>
        </GlassCard>

        {/* Historical Trajectory & Live Simulation */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <History className="w-5 h-5 text-blue-400" />
              <span>Historical Cognitive Trajectory</span>
            </h3>

            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#94a3b8" />
                  <YAxis domain={[0, 1]} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                  <Line type="monotone" dataKey="knowledge" stroke="#38bdf8" strokeWidth={3} name="Knowledge" />
                  <Line type="monotone" dataKey="attention" stroke="#c084fc" strokeWidth={2} name="Attention" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Interactive Simulation Run */}
          <GlassCard className="p-6 space-y-4 border-purple-500/20 glass-card-glow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Counterfactual Simulation Engine</h3>
                <p className="text-xs text-slate-400">Simulate predicted learning gains for this student twin</p>
              </div>

              <button
                onClick={handleSimulate}
                disabled={simulating}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center space-x-2 transition-all"
              >
                <Sliders className="w-4 h-4 text-cyan-300" />
                <span>{simulating ? 'Simulating...' : 'Run Counterfactual Sim'}</span>
              </button>
            </div>

            {simulation && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 animate-fadeIn">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Predicted Knowledge Gain</span>
                  <span className="text-emerald-400 font-bold text-sm">+{Math.round(simulation.predicted_gain * 100)}%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Simulation Confidence</span>
                  <span className="text-cyan-400 font-bold">{Math.round(simulation.confidence * 100)}%</span>
                </div>

                <div className="grid grid-cols-5 gap-2 pt-2">
                  {simulation.simulation_steps.map((step, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[9px] font-mono text-slate-400">{step.step}</span>
                      <p className="text-xs font-bold text-cyan-400">{Math.round(step.knowledge * 100)}%</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
