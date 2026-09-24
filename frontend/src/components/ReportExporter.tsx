'use client';

import React from 'react';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

interface ReportExporterProps {
  reportTitle?: string;
  reportData?: any;
}

export default function ReportExporter({ reportTitle = 'CL-CATT Research Report', reportData }: ReportExporterProps) {
  const handleExport = () => {
    window.print();
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white text-xs font-semibold flex items-center space-x-2 transition-all shadow-md hover:scale-105"
    >
      <Download className="w-4 h-4 text-cyan-400" />
      <span>Export PDF / Print Report</span>
    </button>
  );
}
