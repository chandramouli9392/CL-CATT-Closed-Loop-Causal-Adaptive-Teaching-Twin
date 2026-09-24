'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BrainCircuit, 
  BarChart3, 
  Users, 
  Network, 
  Sparkles, 
  Bot, 
  Sliders, 
  ShieldAlert, 
  BookOpen, 
  Cpu, 
  Settings, 
  Activity,
  Menu,
  X
} from 'lucide-react';
import GroqChatModal from './GroqChatModal';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGroqModalOpen, setIsGroqModalOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: BrainCircuit },
    { name: 'About Research', path: '/about', icon: BookOpen },
    { name: 'Teacher Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'Student Twins', path: '/students', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: Activity },
    { name: 'Twin Graph', path: '/twin-graph', icon: Cpu },
    { name: 'Policy Generator', path: '/policy-generator', icon: Sparkles },
    { name: 'Policy Simulation', path: '/policy-simulation', icon: Sliders },
    { name: 'Explanation Memory', path: '/explanation-memory', icon: Bot },
    { name: 'Causal Graph', path: '/causal-graph', icon: Network },
    { name: 'Outcome Monitoring', path: '/outcome-monitoring', icon: ShieldAlert },
    { name: 'Research Hub', path: '/research', icon: Settings },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-card border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Title */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-300">
                  CL-CATT
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  PROTOTYPE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Cognitive Digital Twin Framework</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsGroqModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-md shadow-purple-500/25 flex items-center space-x-1.5 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>Ask Groq AI</span>
            </button>

            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors hidden md:block"
            >
              Admin Panel
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Groq Chat Modal */}
      <GroqChatModal isOpen={isGroqModalOpen} onClose={() => setIsGroqModalOpen(false)} />
    </>
  );
}
