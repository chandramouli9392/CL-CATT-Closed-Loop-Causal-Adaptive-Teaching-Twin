'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassCard({ children, className = '', glow = false }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${
        glow ? 'glass-card-glow' : 'glass-card'
      } ${className}`}
    >
      {children}
    </div>
  );
}
