'use client';

import React from 'react';
import GlassCard from './GlassCard';
import { LucideIcon } from 'lucide-react';

interface StatWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: 'blue' | 'purple' | 'cyan' | 'amber' | 'emerald';
}

export default function StatWidget({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp,
  color = 'blue'
}: StatWidgetProps) {
  const colorStyles = {
    blue: 'from-blue-600/20 to-blue-500/5 text-blue-400 border-blue-500/30 shadow-blue-500/10',
    purple: 'from-purple-600/20 to-purple-500/5 text-purple-400 border-purple-500/30 shadow-purple-500/10',
    cyan: 'from-cyan-600/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30 shadow-cyan-500/10',
    amber: 'from-amber-600/20 to-amber-500/5 text-amber-400 border-amber-500/30 shadow-amber-500/10',
    emerald: 'from-emerald-600/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10',
  };

  return (
    <GlassCard className="p-5 relative overflow-hidden group hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-extrabold text-white mt-1 tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          {trend && (
            <div className="flex items-center space-x-1 mt-2 text-xs font-semibold">
              <span className={trendUp ? 'text-emerald-400' : 'text-rose-400'}>{trend}</span>
              <span className="text-slate-500 font-normal">vs last period</span>
            </div>
          )}
        </div>

        <div className={`p-3 rounded-xl bg-gradient-to-br border shadow-lg ${colorStyles[color]}`}>
          <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        </div>
      </div>
    </GlassCard>
  );
}
