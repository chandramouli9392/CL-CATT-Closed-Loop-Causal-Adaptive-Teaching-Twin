'use client';

import React from 'react';
import { BrainCircuit, Github, Linkedin, Mail, GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Purpose */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-bold text-white tracking-wide text-base">CL-CATT Platform</span>
              <p className="text-xs text-slate-400">Closed-Loop Causal Adaptive Teaching Twin</p>
            </div>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed max-w-md">
            A Cognitive Digital Twin Framework for Adaptive Teaching using Causal Reasoning, 
            Policy Simulation, Teacher-in-the-Loop Learning, and Continuous Explanation Memory.
          </p>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-amber-400/90 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Research Prototype Disclaimer:</strong> This application demonstrates educational AI architectures 
              and cognitive digital twin simulations. Algorithms are research prototypes and not clinically or educationally validated products.
            </span>
          </div>
        </div>

        {/* Lead Researcher Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center space-x-1.5">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>Developed By</span>
          </h4>
          <div className="text-xs space-y-1">
            <p className="font-semibold text-white">Chandramouli Boppana</p>
            <p className="text-slate-400">Artificial Intelligence & Machine Learning</p>
            <p className="text-cyan-400 font-medium">Mohan Babu University</p>
          </div>
        </div>

        {/* External Links & Socials */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Connect & Source</h4>
          <div className="flex flex-col space-y-2 text-xs">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn Profile</span>
            </a>
            <a 
              href="mailto:chandramouli@mbu.edu.in" 
              className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>chandramouli@mbu.edu.in</span>
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© 2026 CL-CATT Framework. Mohan Babu University. All rights reserved.</p>
        <p className="flex items-center space-x-1 mt-2 sm:mt-0">
          <span>Engineered with Groq LLM & FastAPI</span>
        </p>
      </div>
    </footer>
  );
}
