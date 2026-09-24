'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import TwinRadarChart from '@/components/TwinRadarChart';
import { fetchStudents, Student } from '@/lib/api';
import { Users, Search, ArrowRight, Eye, ShieldAlert, Sparkles, BrainCircuit } from 'lucide-react';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents().then(setStudents);
  }, []);

  const filteredStudents = students.filter(s =>
    s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Digital Twin Roster</h1>
          <p className="text-xs text-slate-400">Continuous Cognitive State & Explanation Preference Tracking</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student or ID..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Grid of Student Twins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => {
          const twin = student.digital_twin || {
            knowledge_level: 0.65,
            attention_span: 0.80,
            motivation_score: 0.75,
            confidence_level: 0.70,
            learning_speed: 0.85,
            concept_mastery: 0.68,
            risk_level: 'Low'
          };

          return (
            <GlassCard key={student.id} className="p-6 space-y-4 hover:border-blue-500/40 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 shadow-md">
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-white text-base">
                        {student.full_name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                        {student.full_name}
                      </h3>
                      <p className="text-xs text-slate-400">{student.student_id} • {student.grade}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                    twin.risk_level === 'High' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' :
                    twin.risk_level === 'Medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {twin.risk_level} Risk
                  </span>
                </div>

                {/* Radar Chart Component */}
                <TwinRadarChart
                  knowledge={twin.knowledge_level}
                  attention={twin.attention_span}
                  motivation={twin.motivation_score}
                  confidence={twin.confidence_level}
                  speed={twin.learning_speed}
                  mastery={twin.concept_mastery}
                />

                {/* Preferred Style & Baseline */}
                <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Style Affinity</span>
                    <p className="font-semibold text-purple-300">{student.learning_style}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Baseline Ability</span>
                    <p className="font-semibold text-cyan-400">{Math.round(student.baseline_ability * 100)}%</p>
                  </div>
                </div>
              </div>

              <Link
                href={`/students/${student.id}`}
                className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-all border border-slate-800 hover:border-blue-500"
              >
                <span>Inspect Digital Twin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
