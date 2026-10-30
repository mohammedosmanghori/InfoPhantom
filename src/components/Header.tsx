import React from 'react';
import {
  Menu,
  Sparkles,
  Download,
  Plus,
  Activity,
  Cpu,
  FileText,
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { InfoPhantomLogo } from './InfoPhantomLogo';

interface HeaderProps {
  onToggleMobile: () => void;
  onNewResearch: () => void;
  onLoadDemo: () => void;
  onExport: () => void;
  result?: AnalysisResult;
  isSimulatedDemo?: boolean;
}

export function Header({
  onToggleMobile,
  onNewResearch,
  onLoadDemo,
  onExport,
  result,
  isSimulatedDemo,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#080d19]/90 backdrop-blur-md border-b border-[#1a253c] px-4 lg:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand snippet for mobile & small screens */}
        <div className="lg:hidden flex items-center gap-2 mr-1">
          <InfoPhantomLogo size="sm" />
          <span className="font-extrabold text-sm text-white tracking-tight">
            Info<span className="text-cyan-400">Phantom</span>
          </span>
        </div>

        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-sm font-semibold text-slate-200">
              {result ? (
                <span className="truncate max-w-md inline-block align-bottom">
                  {result.researchQuestion}
                </span>
              ) : (
                'InfoPhantom Workspace'
              )}
            </h2>
            {isSimulatedDemo && (
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Demo Mode
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            {result
              ? `Cross-analyzed ${result.summary.totalSources} sources • ${result.summary.gapsDetected} gaps • ${result.summary.conflictsFound} conflicts`
              : 'Uncovers information hidden between scattered sources.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Gemini Engine Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0e162b] border border-[#1e2d4a] text-[11px] text-slate-300">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-[10px] text-cyan-300">Gemini 3.8 Flash</span>
        </div>

        {/* Load Sample Research Button */}
        <button
          onClick={onLoadDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#111c34] hover:bg-[#18284b] text-cyan-300 border border-cyan-500/40 shadow-sm transition-all cursor-pointer"
          title="Load Northbridge Student Support Award demo scenario"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Load Sample Research</span>
          <span className="sm:hidden">Demo</span>
        </button>

        {/* Start New Research Button */}
        <button
          onClick={onNewResearch}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Research</span>
        </button>

        {/* Export Findings Button */}
        {result && (
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#141e35] hover:bg-[#1b2949] text-slate-200 border border-slate-700/60 transition-all cursor-pointer"
            title="Export verification report as PDF, Markdown or JSON"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        )}
      </div>
    </header>
  );
}
