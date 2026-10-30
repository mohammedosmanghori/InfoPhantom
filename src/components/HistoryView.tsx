import React, { useState } from 'react';
import {
  History,
  Search,
  Calendar,
  Layers,
  ArrowRight,
  Trash2,
  FileCheck,
  AlertTriangle,
  GitCompare,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ResearchSession } from '../types';

interface HistoryViewProps {
  sessions: ResearchSession[];
  onOpenSession: (session: ResearchSession) => void;
  onDeleteSession: (id: string) => void;
  onClearAll: () => void;
  onStartNew: () => void;
}

export function HistoryView({
  sessions,
  onOpenSession,
  onDeleteSession,
  onClearAll,
  onStartNew,
}: HistoryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = sessions.filter(
    (s) =>
      s.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              <History className="w-4 h-4" />
            </span>
            <h1 className="text-xl lg:text-2xl font-extrabold text-white">
              Analysis History & Audits
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Persisted research sessions, gap detections, and checklist progress.
          </p>
        </div>

        {sessions.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      {sessions.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past research sessions by question or topic..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1427] border border-[#1b2844] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>
      )}

      {/* Sessions List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0a1020] border border-[#18263f] space-y-4">
          <FileCheck className="w-10 h-10 text-slate-500 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-white">No research history found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery
                ? `No sessions matched "${searchQuery}".`
                : 'Analyses you run will be saved here automatically for subsequent review.'}
            </p>
          </div>
          <button
            onClick={onStartNew}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all cursor-pointer"
          >
            Start New Research
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="p-5 rounded-2xl bg-[#0c1427] border border-[#1a2846] hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div
                onClick={() => onOpenSession(s)}
                className="space-y-2 cursor-pointer flex-1"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {s.title || s.question}
                  </h3>
                  {s.isSimulatedDemo && (
                    <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      Simulated Demo
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {new Date(s.createdAt).toLocaleDateString()} at{' '}
                    {new Date(s.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span>•</span>
                  <span>{s.sources.length} sources</span>
                  {s.result && (
                    <>
                      <span>•</span>
                      <span className="text-cyan-400 font-mono text-[11px]">
                        {s.result.informationGaps.length} gaps
                      </span>
                      <span>•</span>
                      <span className="text-rose-400 font-mono text-[11px]">
                        {s.result.conflicts.length} conflicts
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => onOpenSession(s)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14203a] hover:bg-[#1a2b4e] text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Open Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteSession(s.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-rose-500/10 transition-colors"
                  title="Delete from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
