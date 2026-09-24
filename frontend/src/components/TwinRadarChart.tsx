'use client';

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface TwinRadarProps {
  knowledge: number;
  attention: number;
  motivation: number;
  confidence: number;
  speed: number;
  mastery: number;
}

export default function TwinRadarChart({
  knowledge,
  attention,
  motivation,
  confidence,
  speed,
  mastery
}: TwinRadarProps) {
  const data = [
    { metric: 'Knowledge', value: Math.round(knowledge * 100) },
    { metric: 'Attention', value: Math.round(attention * 100) },
    { metric: 'Motivation', value: Math.round(motivation * 100) },
    { metric: 'Confidence', value: Math.round(confidence * 100) },
    { metric: 'Speed', value: Math.round(speed * 100) },
    { metric: 'Mastery', value: Math.round(mastery * 100) },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
          <Radar
            name="Cognitive State"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.4}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
            itemStyle={{ color: '#38bdf8' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
