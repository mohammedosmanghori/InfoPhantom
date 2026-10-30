import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Library,
  ScanEye,
  GitCompare,
  CheckSquare,
  History,
  Settings,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { InfoPhantomLogo } from './InfoPhantomLogo';

export type NavTab =
  | 'dashboard'
  | 'new-research'
  | 'source-library'
  | 'gap-analysis'
  | 'conflicts'
  | 'checklist'
  | 'history'
  | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  result?: AnalysisResult;
  historyCount: number;
  onLoadDemo: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({
  currentTab,
  onSelectTab,
  result,
  historyCount,
  onLoadDemo,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const gapsCount = result?.informationGaps?.length || 0;
  const conflictsCount = result?.conflicts?.length || 0;
  const outdatedCount = result?.outdatedInformation?.length || 0;
  const checklistPending =
    result?.verificationChecklist?.filter((c) => !c.completed)?.length || 0;
  const sourcesCount = result?.summary?.totalSources || 0;

  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'new-research' as NavTab,
      label: 'New Research',
      icon: PlusCircle,
      badge: null,
      highlight: true,
    },
    {
      id: 'source-library' as NavTab,
      label: 'Source Library',
      icon: Library,
      badge: sourcesCount > 0 ? `${sourcesCount}` : null,
      badgeColor: 'bg-slate-800 text-slate-300',
    },
    {
      id: 'gap-analysis' as NavTab,
      label: 'Gap Analysis',
      icon: ScanEye,
      badge: gapsCount > 0 ? `${gapsCount} gaps` : null,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    },
    {
      id: 'conflicts' as NavTab,
      label: 'Conflicts',
      icon: GitCompare,
      badge: conflictsCount > 0 ? `${conflictsCount} conflicts` : null,
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    },
    {
      id: 'checklist' as NavTab,
      label: 'Verification Checklist',
      icon: CheckSquare,
      badge: checklistPending > 0 ? `${checklistPending} due` : null,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
    {
      id: 'history' as NavTab,
      label: 'Analysis History',
      icon: History,
      badge: historyCount > 0 ? `${historyCount}` : null,
      badgeColor: 'bg-slate-800 text-slate-400',
    },
    {
      id: 'settings' as NavTab,
      label: 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#0a0f1d] border-r border-[#1a253c] flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1a253c]">
        <div className="flex items-start gap-3">
          <InfoPhantomLogo size="md" />
          <div className="min-w-0 flex-1">
            <h1 className="font-extrabold text-lg tracking-tight text-white leading-tight">
              Info<span className="text-cyan-400">Phantom</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-normal mt-0.5 leading-snug">
              Uncovers information hidden between scattered sources.
            </p>
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#0e162b] border border-[#1e2d4a]">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
            Hackathon 2026
          </span>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
            Shinchan Edition
          </span>
        </div>
      </div>

      {/* Quick Demo Trigger Banner */}
      <div className="p-3.5 mx-3 mt-3 rounded-xl bg-gradient-to-b from-[#101b33] to-[#0c1529] border border-cyan-500/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Evaluation Demo</span>
          </div>
          <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-200 px-1.5 py-0.5 rounded">
            Ready
          </span>
        </div>
        <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
          Test forensic gap detection with the Northbridge Award scenario.
        </p>
        <button
          onClick={() => {
            onLoadDemo();
            if (onCloseMobile) onCloseMobile();
          }}
          className="mt-2.5 w-full flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <span>Load Sample Research</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
          Intelligence Workspace
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#121c32]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-cyan-400'
                      : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
                <span className={isActive ? 'font-semibold text-white' : ''}>
                  {item.label}
                </span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    item.badgeColor || 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Current Analysis Mini-Status */}
      {result && (
        <div className="p-3.5 mx-3 mb-3 rounded-xl bg-[#0e162b] border border-[#1c2a47]">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span className="font-mono uppercase text-[10px] text-slate-400">
              Active Audit
            </span>
            <span className="text-cyan-400 font-mono text-[10px]">
              {result.summary.overallConfidence}
            </span>
          </div>
          <p className="text-xs text-slate-200 font-medium line-clamp-1">
            {result.researchQuestion}
          </p>
          <div className="mt-2 grid grid-cols-3 gap-1 text-center font-mono text-[10px]">
            <div className="bg-[#14203a] py-1 rounded">
              <span className="text-cyan-400 font-bold block">
                {result.informationGaps.length}
              </span>
              <span className="text-slate-400 text-[9px]">Gaps</span>
            </div>
            <div className="bg-[#14203a] py-1 rounded">
              <span className="text-rose-400 font-bold block">
                {result.conflicts.length}
              </span>
              <span className="text-slate-400 text-[9px]">Conflicts</span>
            </div>
            <div className="bg-[#14203a] py-1 rounded">
              <span className="text-amber-400 font-bold block">
                {result.outdatedInformation.length}
              </span>
              <span className="text-slate-400 text-[9px]">Outdated</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="p-3.5 border-t border-[#1a253c] text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Evidence Grounded</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">v2.4.0</span>
      </div>
    </aside>
  );
}
