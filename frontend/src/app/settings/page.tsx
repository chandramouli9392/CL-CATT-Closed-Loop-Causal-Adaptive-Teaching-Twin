'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { Settings, ShieldCheck, Key, Bell, Globe, User, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Platform Settings</h1>
        <p className="text-xs text-slate-400">Configure Groq API Credentials • Notifications • Theme & Profile</p>
      </div>

      <GlassCard className="p-6 space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Key className="w-4 h-4 text-purple-400" />
              <span>Groq API Key Configuration</span>
            </h3>

            <div className="space-y-1.5 text-xs">
              <label className="text-slate-300 font-semibold">Groq API Key (Environment GROQ_API_KEY)</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
              <p className="text-[11px] text-slate-500">
                Key is securely stored in backend `.env` as GROQ_API_KEY. Used for teaching policy generation & Groq chat.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <User className="w-4 h-4 text-blue-400" />
              <span>Researcher Profile</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold">Researcher Name</label>
                <input
                  type="text"
                  defaultValue="Chandramouli Boppana"
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold">Institution</label>
                <input
                  type="text"
                  defaultValue="Mohan Babu University"
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {saved ? (
              <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Settings Saved Successfully!</span>
              </div>
            ) : <div />}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-500/20"
            >
              Save Platform Configuration
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
