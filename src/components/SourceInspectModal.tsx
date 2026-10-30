import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Calendar,
  User,
  Globe,
} from 'lucide-react';
import { Source } from '../types';

interface SourceInspectModalProps {
  source: Source | null;
  onClose: () => void;
}

export function SourceInspectModal({
  source,
  onClose,
}: SourceInspectModalProps) {
  const [copied, setCopied] = useState(false);

  if (!source) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(source.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c1427] border border-[#1e2f54] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#1a2744] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                RAW SOURCE INSPECTION
              </span>
              {source.isSimulated && (
                <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Simulated Demo Record
                </span>
              )}
            </div>
            <h2 className="text-base font-bold text-white leading-snug">
              {source.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap pt-0.5">
              {source.domain && (
                <span className="flex items-center gap-1 font-mono text-slate-300">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  {source.domain}
                </span>
              )}
              {source.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {source.date}
                </span>
              )}
              {source.wordCount && (
                <span className="font-mono text-slate-400">
                  {source.wordCount} words
                </span>
              )}
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  <span>Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#182643] transition-colors"
              title="Copy source text"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#182643] transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Raw Text */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed bg-[#070b16] space-y-4">
          <div className="p-3 rounded-lg bg-[#0e162b] border border-[#1a2744] text-[11px] text-slate-400">
            Note: This is the raw text parsed by the extraction engine and delivered to the Gemini cross-verification pipeline.
          </div>

          <pre className="whitespace-pre-wrap font-sans text-xs text-slate-200">
            {source.content}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1a2744] flex items-center justify-between text-xs text-slate-400 bg-[#0a1020]">
          <span>Source ID: <code className="text-slate-300 font-mono">{source.id}</code></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
