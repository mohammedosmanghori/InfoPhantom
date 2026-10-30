import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Plus,
  CheckCircle,
  Filter,
} from 'lucide-react';
import { InformationGap, Priority } from '../types';
import { StatusBadge, PriorityBadge } from './Badges';

interface GapAnalysisViewProps {
  gaps: InformationGap[];
  onAddToChecklist: (task: string, priority: Priority, category: string) => void;
  onOpenSourceByName?: (sourceTitle: string) => void;
}

export function GapAnalysisView({
  gaps,
  onAddToChecklist,
  onOpenSourceByName,
}: GapAnalysisViewProps) {
  const [severityFilter, setSeverityFilter] = useState<'ALL' | Priority>('ALL');
  const [addedTasks, setAddedTasks] = useState<Record<string, boolean>>({});

  const filteredGaps = gaps.filter((gap) => {
    if (severityFilter === 'ALL') return true;
    return gap.severity === severityFilter;
  });

  const handleAdd = (gap: InformationGap) => {
    onAddToChecklist(
      gap.recommendedAction,
      gap.severity,
      'Gap Verification'
    );
    setAddedTasks((prev) => ({ ...prev, [gap.id]: true }));
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <h1 className="text-xl lg:text-2xl font-extrabold text-white">
              Information Gap Detection (Dark Spots)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Critical omissions, unaddressed policies, and silent clauses absent from all supplied material.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex rounded-lg bg-[#0c1427] p-1 border border-[#1b2844] self-start sm:self-auto">
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                severityFilter === sev
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Educational Banner: Why Gap Detection Matters */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-[#0e1933] to-[#0a1226] border border-cyan-500/30 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <span className="font-semibold text-cyan-300 block mb-0.5">
            The InfoPhantom Distinction
          </span>
          Traditional summarizers repeat what is written. InfoPhantom performs forensic absence-testing: uncovering information hidden between scattered sources by evaluating what policies or prerequisites an applicant or decision-maker strictly requires, but which the reviewed documents silently neglect to answer.
        </div>
      </div>

      {/* Gaps List */}
      {filteredGaps.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0a1020] border border-[#18263f] space-y-3">
          <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-sm font-semibold text-white">
            No gaps match current filter
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {gaps.length === 0
              ? 'Run an analysis to detect information gaps in your sources.'
              : 'Try changing your severity filter above.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGaps.map((gap, index) => {
            const isAdded = addedTasks[gap.id];

            return (
              <div
                key={gap.id}
                className="p-6 rounded-2xl bg-[#0c1427] border border-[#1e2e4e] hover:border-cyan-500/40 transition-all space-y-4 shadow-md"
              >
                {/* Gap Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        DARK SPOT #{index + 1}
                      </span>
                      <StatusBadge status="POTENTIAL GAP" size="sm" />
                      <PriorityBadge priority={gap.severity} />
                    </div>

                    <h2 className="text-base font-bold text-white leading-snug pt-1">
                      {gap.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => handleAdd(gap)}
                    disabled={isAdded}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all self-start shrink-0 cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-[#14203a] hover:bg-[#1a2b4e] text-cyan-300 border border-cyan-500/40'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Added to Checklist</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-cyan-400 stroke-[2.5]" />
                        <span>Add Verification Task</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Explanation */}
                <div className="text-xs text-slate-300 leading-relaxed bg-[#080d1a] p-3.5 rounded-xl border border-[#18263f]">
                  <span className="font-semibold text-slate-200 block mb-1">
                    Forensic Examination:
                  </span>
                  {gap.explanation}
                </div>

                {/* Why it Matters (Consequence) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                    <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                      Why It Matters (Applicant Risk):
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {gap.whyItMatters}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 space-y-1">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                      Information Confirmed Missing:
                    </span>
                    <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                      {gap.missingInformation}
                    </p>
                  </div>
                </div>

                {/* Reviewed Sources & Action */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#18263f] text-xs">
                  <div className="flex items-center gap-2 flex-wrap text-slate-400">
                    <span className="text-[11px] font-mono text-slate-400">
                      Sources Checked:
                    </span>
                    {gap.reviewedSources.map((src, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#10192e] border border-[#1b2a48] text-slate-300 text-[11px] font-medium"
                      >
                        <BookOpen className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[200px]">{src}</span>
                      </span>
                    ))}
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1.5 text-cyan-300 font-medium text-xs">
                      <span>Action: {gap.recommendedAction}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
