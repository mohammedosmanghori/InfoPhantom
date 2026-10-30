import React from 'react';
import {
  Settings,
  Cpu,
  ShieldCheck,
  Award,
  AlertTriangle,
  GitCompare,
  Clock,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';
import { StatusBadge } from './Badges';
import { InfoPhantomLogo } from './InfoPhantomLogo';

interface SettingsViewProps {
  onResetDemo: () => void;
}

export function SettingsView({ onResetDemo }: SettingsViewProps) {
  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <InfoPhantomLogo size="sm" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white">
              InfoPhantom Architecture & Methodology
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Forensic verification standards, AI grounding policies, and Hackathon submission details.
          </p>
        </div>
      </div>

      {/* Shinchan Online Hackathon 2026 Submission Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d162d] via-[#101b38] to-[#0a1124] border border-cyan-500/30 space-y-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              Shinchan Online Hackathon 2026
            </h2>
            <p className="text-xs text-cyan-300 font-mono">
              Track: AI-Assisted Information Gap Detection Platform
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-[#080d1a] border border-[#1a2744]">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">
              Participation
            </span>
            <span className="text-white font-semibold">Individual Entry</span>
          </div>
          <div className="p-3 rounded-xl bg-[#080d1a] border border-[#1a2744]">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">
              AI Engine
            </span>
            <span className="text-cyan-400 font-semibold font-mono">
              Gemini 3.8 Flash (Server-Side)
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#080d1a] border border-[#1a2744]">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">
              Tagline
            </span>
            <span className="text-cyan-300 font-medium italic">
              "Uncovers information hidden between scattered sources."
            </span>
          </div>
        </div>
      </div>

      {/* Verification Status Taxonomy */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">
          Evidence & Verification Taxonomy
        </h2>
        <p className="text-xs text-slate-400">
          InfoPhantom strictly enforces transparent epistemological labeling so users can distinguish verified facts from identified absences:
        </p>

        <div className="space-y-2.5">
          <div className="p-4 rounded-xl bg-[#0c1427] border border-[#1b2844] flex items-start gap-4">
            <StatusBadge status="SOURCE-SUPPORTED" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Information that is directly anchored to a verbatim excerpt from a retrieved or provided primary document.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c1427] border border-[#1b2844] flex items-start gap-4">
            <StatusBadge status="POTENTIAL GAP" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Essential policy, eligibility criteria, or process steps confirmed absent or silent across all reviewed materials.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c1427] border border-[#1b2844] flex items-start gap-4">
            <StatusBadge status="POTENTIAL CONFLICT" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Direct contradiction between two or more sources regarding document requirements, deadlines, or qualifying standards.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c1427] border border-[#1b2844] flex items-start gap-4">
            <StatusBadge status="POSSIBLY OUTDATED" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Notice or page referring to an expired academic year or earlier submission cycle that should not be relied upon.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0c1427] border border-[#1b2844] flex items-start gap-4">
            <StatusBadge status="AI SUGGESTION" />
            <p className="text-xs text-slate-300 leading-relaxed">
              A logical recommendation or hypothesis synthesized by AI that requires independent primary verification.
            </p>
          </div>
        </div>
      </div>

      {/* Core Rules for Reliability */}
      <div className="p-5 rounded-2xl bg-[#0c1427] border border-[#1b2844] space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Anti-Hallucination & Reliability Directives</span>
        </div>
        <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>
            <strong>Bounded Ingestion:</strong> The model analyzes only provided text or successfully fetched URLs.
          </li>
          <li>
            <strong>Absence vs Non-Extraction:</strong> The platform distinguishes between unextracted fragments and confirmed structural omission.
          </li>
          <li>
            <strong>Zero Fabricated Citations:</strong> If an excerpt does not exist in the source, no quote is created.
          </li>
          <li>
            <strong>Cycle Sensitivity:</strong> Dates and academic years are cross-checked against current calendar realities.
          </li>
        </ul>
      </div>

      {/* Demo Reset */}
      <div className="pt-2 flex items-center justify-between border-t border-[#1a2744]">
        <div className="text-xs text-slate-400">
          Need to test the fictional demonstration from a clean slate?
        </div>
        <button
          onClick={onResetDemo}
          className="px-3.5 py-2 rounded-xl bg-[#14203a] hover:bg-[#1b2b4e] text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all cursor-pointer"
        >
          Reset Northbridge Demo
        </button>
      </div>
    </div>
  );
}
