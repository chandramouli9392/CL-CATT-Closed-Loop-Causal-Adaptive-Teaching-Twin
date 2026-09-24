'use client';

import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, RefreshCw } from 'lucide-react';
import { groqChatApi } from '@/lib/api';

interface GroqChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GroqChatModal({ isOpen, onClose }: GroqChatModalProps) {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'groq'; text: string }>>([
    {
      sender: 'groq',
      text: 'Hello! I am the Groq AI Research Assistant for CL-CATT. Ask me anything about cognitive digital twins, adaptive teaching policies, or causal intervention analysis.'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    const userText = inputPrompt;
    setInputPrompt('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await groqChatApi(userText);
      setMessages(prev => [...prev, { sender: 'groq', text: res.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'groq', text: 'Error connecting to Groq AI. Please check server settings.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl glass-card-glow bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Groq AI Pedagogy Assistant</h3>
              <p className="text-[11px] text-purple-300">Powered by LLaMA 3.3 70B & CL-CATT Causal Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-purple-600/30 border border-purple-500/40 text-purple-300'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 shadow-md'
              }`}>
                <p className="whitespace-pre-line">{m.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3 text-xs text-purple-400">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Groq AI is reasoning over causal student state vectors...</span>
            </div>
          )}
        </div>

        {/* Form Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-900/40 flex items-center space-x-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask Groq for teaching advice, policy reasoning, or student insights..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center space-x-1 transition-colors"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
