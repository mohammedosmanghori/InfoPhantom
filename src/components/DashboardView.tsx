import React from 'react';
import {
  ScanEye,
  AlertTriangle,
  GitCompare,
  Clock,
  CheckCircle2,
  PlusCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  FileSearch,
  BookOpen,
  HelpCircle,
  Layers,
} from 'lucide-react';
import { AnalysisResult, ResearchSession } from '../types';
import { StatusBadge, PriorityBadge } from './Badges';
import { InfoPhantomLogo } from './InfoPhantomLogo';

interface DashboardViewProps {
  result?: AnalysisResult;
  sessions: ResearchSession[];
  onStartNew: () => void;
  onLoadDemo: () => void;
  onSelectTab: (tab: any) => void;
  onOpenSession: (session: ResearchSession) => void;
}

export function DashboardView({
  result,
  sessions,
  onStartNew,
  onLoadDemo,
  onSelectTab,
  onOpenSession,
}: DashboardViewProps) {
  // Aggregate real stats
  const totalSessionsCount = sessions.length;
  const sourcesAnalyzedCount = sessions.reduce(
    (acc, s) => acc + (s.result?.summary?.totalSources || s.sources.length || 0),
    0
  );
  const totalGapsCount = sessions.reduce(
    (acc, s) => acc + (s.result?.informationGaps?.length || 0),
    0
  );
  const totalConflictsCount = sessions.reduce(
    (acc, s) => acc + (s.result?.conflicts?.length || 0),
    0
  );
  const totalOutdatedCount = sessions.reduce(
    (acc, s) => acc + (s.result?.outdatedInformation?.length || 0),
    0
  );

  const hasData = sessions.length > 0 || Boolean(result);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Hero Welcome / Value Proposition */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d162d] via-[#101b38] to-[#0a1124] border border-[#1e2f54] p-6 lg:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>AI Research Verification Platform</span>
            </div>
            <div className="flex items-center gap-3">
              <InfoPhantomLogo size="lg" />
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  Info<span className="text-cyan-400">Phantom</span>
                </h1>
                <p className="text-sm font-semibold text-cyan-300/90 mt-0.5 tracking-normal">
                  Uncovers information hidden between scattered sources.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed pt-1">
              Standard search finds pages. Summarizers condense what’s there.
              <strong className="text-white font-semibold"> InfoPhantom</strong> cross-examines multiple sources, exposes silent omissions and requirement conflicts, flags outdated notices, and creates an actionable verification checklist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={onStartNew}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>Start New Research</span>
            </button>
            <button
              onClick={onLoadDemo}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#14203a] hover:bg-[#1a2b4e] text-cyan-300 border border-cyan-500/40 text-sm font-semibold transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Load Northbridge Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Metric 1: Research Sessions */}
        <div className="p-4 rounded-xl bg-[#0c1427] border border-[#1a2744] hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Research Sessions</span>
            <Layers className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-white font-mono">
            {totalSessionsCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {totalSessionsCount === 0 ? 'No sessions logged' : 'Active research logs'}
          </div>
        </div>

        {/* Metric 2: Sources Analyzed */}
        <div className="p-4 rounded-xl bg-[#0c1427] border border-[#1a2744] hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Sources Analyzed</span>
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-white font-mono">
            {sourcesAnalyzedCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {sourcesAnalyzedCount === 0 ? 'Awaiting inputs' : 'Extracted & verified'}
          </div>
        </div>

        {/* Metric 3: Gaps Detected */}
        <div className="p-4 rounded-xl bg-[#0c1427] border border-[#1a2744] hover:border-cyan-500/50 transition-colors">
          <div className="flex items-center justify-between text-cyan-400 text-xs font-medium">
            <span>Information Gaps</span>
            <AlertTriangle className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-cyan-300 font-mono">
            {totalGapsCount}
          </div>
          <div className="mt-1 text-[11px] text-cyan-400/70">
            {totalGapsCount === 0 ? 'Zero omissions' : 'Unaddressed criteria'}
          </div>
        </div>

        {/* Metric 4: Potential Conflicts */}
        <div className="p-4 rounded-xl bg-[#0c1427] border border-[#1a2744] hover:border-rose-500/50 transition-colors">
          <div className="flex items-center justify-between text-rose-400 text-xs font-medium">
            <span>Conflicts Identified</span>
            <GitCompare className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-rose-400 font-mono">
            {totalConflictsCount}
          </div>
          <div className="mt-1 text-[11px] text-rose-400/70">
            {totalConflictsCount === 0 ? 'Consensus found' : 'Divergent statements'}
          </div>
        </div>

        {/* Metric 5: Potentially Outdated */}
        <div className="p-4 rounded-xl bg-[#0c1427] border border-[#1a2744] hover:border-amber-500/50 transition-colors">
          <div className="flex items-center justify-between text-amber-400 text-xs font-medium">
            <span>Outdated Sources</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-amber-400 font-mono">
            {totalOutdatedCount}
          </div>
          <div className="mt-1 text-[11px] text-amber-400/70">
            {totalOutdatedCount === 0 ? 'Timely records' : 'Expired/past cycles'}
          </div>
        </div>
      </div>

      {/* Active Session Detailed Overview */}
      {result ? (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0b1224] border border-[#1e2f52] shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#1a2744]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                    Current Active Audit
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-400">
                    {new Date(result.analyzedAt).toLocaleDateString()} at{' '}
                    {new Date(result.analyzedAt).toLocaleTimeString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white leading-snug">
                  {result.researchQuestion}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-400">Readiness Score:</span>
                <span className="font-mono text-base font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                  {Math.round(
                    ((result.verificationChecklist.filter((c) => c.completed).length) /
                      (result.verificationChecklist.length || 1)) *
                      100
                  )}
                  %
                </span>
              </div>
            </div>

            {/* Key Takeaway synthesis */}
            <div className="mt-4 p-4 rounded-xl bg-[#0f1933] border border-cyan-500/20">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Executive Verification Synthesis</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {result.summary.keyTakeaway}
              </p>
            </div>

            {/* Quick Links into Detailed Views */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Gaps Preview */}
              <div
                onClick={() => onSelectTab('gap-analysis')}
                className="p-4 rounded-xl bg-[#0e162a] border border-[#1b2742] hover:border-cyan-500/50 cursor-pointer group transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-cyan-400" />
                    Information Gaps ({result.informationGaps.length})
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {result.informationGaps[0]?.title || 'No gaps detected.'}
                </p>
                <span className="mt-3 inline-block text-[11px] font-mono text-cyan-400 group-hover:underline">
                  Examine full dark spots &rarr;
                </span>
              </div>

              {/* Card 2: Conflicts Preview */}
              <div
                onClick={() => onSelectTab('conflicts')}
                className="p-4 rounded-xl bg-[#0e162a] border border-[#1b2742] hover:border-rose-500/50 cursor-pointer group transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                    <GitCompare className="w-3.5 h-3.5 text-rose-400" />
                    Conflicts ({result.conflicts.length})
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {result.conflicts[0]?.conflictingClaim ||
                    'Sources in full alignment.'}
                </p>
                <span className="mt-3 inline-block text-[11px] font-mono text-rose-400 group-hover:underline">
                  Compare side-by-side &rarr;
                </span>
              </div>

              {/* Card 3: Checklist Preview */}
              <div
                onClick={() => onSelectTab('checklist')}
                className="p-4 rounded-xl bg-[#0e162a] border border-[#1b2742] hover:border-emerald-500/50 cursor-pointer group transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Action Checklist ({result.verificationChecklist.length})
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {result.verificationChecklist[0]?.task ||
                    'Checklist completed.'}
                </p>
                <span className="mt-3 inline-block text-[11px] font-mono text-emerald-400 group-hover:underline">
                  View prioritized steps &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 lg:p-12 rounded-2xl bg-[#090f1e] border border-[#18253e] text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <FileSearch className="w-8 h-8" />
          </div>
          <div className="max-w-lg mx-auto space-y-2">
            <h3 className="text-lg font-bold text-white">
              No Research Session Currently Active
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Start by typing any research topic, pasting URLs or documents, or immediately load the Northbridge Student Support Award demonstration to see the gap detection engine in action.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartNew}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all cursor-pointer"
            >
              Start New Research Session
            </button>
            <button
              onClick={onLoadDemo}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#111c34] hover:bg-[#18284c] text-cyan-300 border border-cyan-500/40 font-semibold text-xs transition-all cursor-pointer"
            >
              Load Hackathon Demonstration
            </button>
          </div>
        </div>
      )}

      {/* Detection Pillars Explanation Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
          How InfoPhantom Dissects Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#0a1020] border border-[#162238] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Information Gaps</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Identifies missing eligibility thresholds, unstated renewal rules, and silent procedural omissions across documents.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0a1020] border border-[#162238] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <GitCompare className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Conflicting Claims</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compares document requirements and statements side-by-side to expose contradictory criteria and divergent guidance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0a1020] border border-[#162238] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Outdated Notices</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cross-checks cycle years and publication dates to flag archived pages and prevent costly adherence to expired deadlines.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0a1020] border border-[#162238] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Actionable Checklist</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Converts complex forensic findings into a prioritized, interactive checklist of specific verification inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Sessions List if available */}
      {sessions.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Recent Research Activity
            </h3>
            <button
              onClick={() => onSelectTab('history')}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              View all ({sessions.length}) &rarr;
            </button>
          </div>

          <div className="space-y-2">
            {sessions.slice(0, 3).map((s) => (
              <div
                key={s.id}
                onClick={() => onOpenSession(s)}
                className="p-4 rounded-xl bg-[#0a1020] border border-[#18263f] hover:border-cyan-500/40 flex items-center justify-between gap-4 cursor-pointer group transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {s.title || s.question}
                    </h4>
                    {s.isSimulatedDemo && (
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        Demo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    {s.sources.length} sources analyzed • Created{' '}
                    {new Date(s.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {s.result && (
                    <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
                      <span className="text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                        {s.result.informationGaps.length} gaps
                      </span>
                      <span className="text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-800/40">
                        {s.result.conflicts.length} conflicts
                      </span>
                    </div>
                  )}
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
