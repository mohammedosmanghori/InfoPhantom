import React from 'react';
import {
  GitCompare,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Conflict, OutdatedInfo } from '../types';
import { StatusBadge, PriorityBadge } from './Badges';

interface ConflictsViewProps {
  conflicts: Conflict[];
  outdatedInfo: OutdatedInfo[];
  onOpenSourceByName?: (sourceTitle: string) => void;
}

export function ConflictsView({
  conflicts,
  outdatedInfo,
  onOpenSourceByName,
}: ConflictsViewProps) {
  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <GitCompare className="w-4 h-4" />
          </span>
          <h1 className="text-xl lg:text-2xl font-extrabold text-white">
            Cross-Source Conflicts & Outdated Notice Alerts
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Direct side-by-side evidence comparison showing contradictory mandates, divergent document lists, and expired notices.
        </p>
      </div>

      {/* Outdated Notices Banner if any exist */}
      {outdatedInfo.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Potentially Outdated or Expired Sources Detected ({outdatedInfo.length})
            </h2>
          </div>

          <div className="space-y-3">
            {outdatedInfo.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-3 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <StatusBadge status="POSSIBLY OUTDATED" size="sm" />
                    <h3 className="text-sm font-bold text-white">
                      {item.sourceTitle}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-amber-300">
                    <span>Detected: {item.detectedDate}</span>
                    <span>•</span>
                    <span className="text-rose-400 font-bold">{item.applicableCycle}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#090e1c] border border-amber-500/20 text-xs text-slate-200 leading-relaxed">
                  <span className="font-semibold text-amber-300 block mb-0.5">
                    Reason Identified as Superseded:
                  </span>
                  {item.reasonWhyOutdated}
                </div>

                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Critical Warning:</span>
                    <span>{item.criticalWarning}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conflicting Claims List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-rose-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              Direct Contradictions & Claim Divergences ({conflicts.length})
            </h2>
          </div>
        </div>

        {conflicts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0a1020] border border-[#18263f] space-y-3">
            <Sparkles className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-semibold text-white">
              No Conflicting Claims Found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              All analyzed sources appear to be in consensus or have not made conflicting factual claims.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {conflicts.map((conflict, idx) => (
              <div
                key={conflict.id}
                className="p-6 rounded-2xl bg-[#0c1427] border border-[#1e2e4e] hover:border-rose-500/40 transition-all space-y-4 shadow-md"
              >
                {/* Conflict Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                      CONFLICT #{idx + 1}
                    </span>
                    <StatusBadge status="POTENTIAL CONFLICT" size="sm" />
                    <PriorityBadge priority={conflict.riskLevel} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Side-by-Side Verification Matrix
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {conflict.conflictingClaim}
                </h3>

                {/* Side-by-Side Comparison Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Column A */}
                  <div className="p-4 rounded-xl bg-[#080d1a] border border-[#1c2a47] space-y-2">
                    <div className="flex items-center justify-between border-b border-[#18243e] pb-2">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        SOURCE A CLAIM
                      </span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[180px]">
                        {conflict.sourceAReference}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {conflict.sourceASaid}
                    </p>
                    <div className="p-2.5 rounded-lg bg-[#0e172e] border-l-2 border-cyan-400 font-mono text-[11px] text-cyan-200">
                      "{conflict.directExcerptA}"
                    </div>
                  </div>

                  {/* Column B */}
                  <div className="p-4 rounded-xl bg-[#080d1a] border border-[#1c2a47] space-y-2">
                    <div className="flex items-center justify-between border-b border-[#18243e] pb-2">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        SOURCE B CLAIM
                      </span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[180px]">
                        {conflict.sourceBReference}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {conflict.sourceBSaid}
                    </p>
                    <div className="p-2.5 rounded-lg bg-[#0e172e] border-l-2 border-amber-400 font-mono text-[11px] text-amber-200">
                      "{conflict.directExcerptB}"
                    </div>
                  </div>
                </div>

                {/* Forensic Divergence Analysis */}
                <div className="p-3.5 rounded-xl bg-[#090e1c] border border-[#18253e] text-xs text-slate-300 space-y-1">
                  <span className="font-semibold text-slate-200 block">
                    Forensic Divergence Assessment:
                  </span>
                  <p className="leading-relaxed">
                    {conflict.divergenceAnalysis}
                  </p>
                </div>

                {/* Reconciliation Recommendation */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-emerald-300">
                      Recommended Verification Action:
                    </span>
                    <span>{conflict.reconciliationRecommendation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
