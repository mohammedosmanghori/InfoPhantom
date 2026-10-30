import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  GitCompare,
  Clock,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { Priority, VerificationStatus } from '../types';

export function StatusBadge({
  status,
  size = 'md',
}: {
  status: VerificationStatus;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }[size];

  switch (status) {
    case 'SOURCE-SUPPORTED':
      return (
        <span
          className={`inline-flex items-center font-medium font-mono rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 ${sizeClasses}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          SOURCE-SUPPORTED
        </span>
      );
    case 'POTENTIAL GAP':
      return (
        <span
          className={`inline-flex items-center font-medium font-mono rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 ${sizeClasses}`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          POTENTIAL GAP
        </span>
      );
    case 'POTENTIAL CONFLICT':
      return (
        <span
          className={`inline-flex items-center font-medium font-mono rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/30 ${sizeClasses}`}
        >
          <GitCompare className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          POTENTIAL CONFLICT
        </span>
      );
    case 'POSSIBLY OUTDATED':
      return (
        <span
          className={`inline-flex items-center font-medium font-mono rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 ${sizeClasses}`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          POSSIBLY OUTDATED
        </span>
      );
    case 'AI SUGGESTION':
      return (
        <span
          className={`inline-flex items-center font-medium font-mono rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 ${sizeClasses}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          AI SUGGESTION
        </span>
      );
    default:
      return null;
  }
}

export function PriorityBadge({ priority }: { priority: Priority | 'URGENT' }) {
  switch (priority) {
    case 'CRITICAL':
    case 'URGENT':
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
          <ShieldAlert className="w-3 h-3 text-rose-400" />
          {priority}
        </span>
      );
    case 'HIGH':
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
          HIGH
        </span>
      );
    case 'MEDIUM':
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
          MEDIUM
        </span>
      );
    case 'LOW':
      return (
        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium px-2 py-0.5 rounded bg-slate-700/50 text-slate-300 border border-slate-600/40">
          LOW
        </span>
      );
    default:
      return null;
  }
}

export function SimulationBanner() {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-xs text-amber-300">
      <div className="flex items-center gap-2">
        <span className="font-mono font-bold bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase border border-amber-500/30">
          Demo Notice
        </span>
        <span className="font-medium">
          SIMULATED DEMONSTRATION DATA — NOT A REAL SCHOLARSHIP OR OFFICIAL NOTICE.
        </span>
      </div>
      <span className="text-[11px] text-amber-400/70 hidden md:inline">
        Shinchan Online Hackathon 2026 Sample Scenario
      </span>
    </div>
  );
}
