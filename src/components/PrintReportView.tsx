import React from 'react';
import { AnalysisResult } from '../types';

interface PrintReportViewProps {
  result: AnalysisResult | null;
}

export function PrintReportView({ result }: PrintReportViewProps) {
  if (!result) return null;

  return (
    <div className="hidden print:block text-black bg-white p-8 max-w-4xl mx-auto font-sans">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900">
            InfoPhantom
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            AI-Assisted Information Gap Detection Platform • Shinchan Online Hackathon 2026
          </p>
          <p className="text-xs italic text-slate-500 mt-0.5">
            "Uncovers information hidden between scattered sources."
          </p>
        </div>
        <div className="text-right text-xs text-slate-600 font-mono">
          <div>DATE: {new Date(result.analyzedAt).toLocaleDateString()}</div>
          <div>STATUS: {result.summary.overallConfidence}</div>
          {result.isSimulatedDemo && (
            <div className="text-amber-700 font-bold mt-1">
              [SIMULATED DEMONSTRATION DATA]
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">
          Research Question / Subject
        </h2>
        <div className="text-lg font-bold text-slate-900 p-3 bg-slate-50 border border-slate-200 rounded">
          {result.researchQuestion}
        </div>
      </div>

      {/* Summary Box */}
      <div className="mb-6 p-4 bg-slate-50 border border-slate-300 rounded">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Executive Verification Synthesis
        </h3>
        <p className="text-sm leading-relaxed text-slate-800">
          {result.summary.keyTakeaway}
        </p>

        <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-200 text-center font-mono text-xs">
          <div>
            <span className="font-bold text-slate-900 block text-base">
              {result.summary.totalSources}
            </span>
            <span className="text-slate-500 text-[10px]">Sources</span>
          </div>
          <div>
            <span className="font-bold text-slate-900 block text-base">
              {result.informationGaps.length}
            </span>
            <span className="text-slate-500 text-[10px]">Gaps (Dark Spots)</span>
          </div>
          <div>
            <span className="font-bold text-slate-900 block text-base">
              {result.conflicts.length}
            </span>
            <span className="text-slate-500 text-[10px]">Conflicts</span>
          </div>
          <div>
            <span className="font-bold text-slate-900 block text-base">
              {result.outdatedInformation.length}
            </span>
            <span className="text-slate-500 text-[10px]">Outdated</span>
          </div>
        </div>
      </div>

      {/* Gaps Section */}
      <div className="mb-6 print-break-inside-avoid">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
          1. Detected Information Gaps (Silent Omissions)
        </h3>
        <div className="space-y-4">
          {result.informationGaps.map((gap, i) => (
            <div key={i} className="border border-slate-200 p-3 rounded">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-slate-900">
                  {i + 1}. {gap.title}
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-200 rounded">
                  {gap.severity}
                </span>
              </div>
              <p className="text-xs text-slate-700 mb-1.5">{gap.explanation}</p>
              <div className="text-xs text-slate-800 font-semibold mb-1">
                Risk Consequence: <span className="font-normal">{gap.whyItMatters}</span>
              </div>
              <div className="text-xs text-slate-800 font-semibold mb-1">
                Missing Information: <span className="font-mono font-normal">{gap.missingInformation}</span>
              </div>
              <div className="text-xs text-slate-900 font-medium bg-slate-100 p-2 rounded mt-1">
                Recommended Verification Step: {gap.recommendedAction}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conflicts Section */}
      <div className="mb-6 print-break-inside-avoid">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
          2. Potential Conflicts Across Sources
        </h3>
        <div className="space-y-4">
          {result.conflicts.map((c, i) => (
            <div key={i} className="border border-slate-200 p-3 rounded">
              <div className="font-bold text-sm text-slate-900 mb-2">
                {i + 1}. {c.conflictingClaim}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                <div className="bg-slate-50 p-2 border border-slate-200 rounded">
                  <div className="font-bold text-slate-700">Source A: {c.sourceAReference}</div>
                  <div className="italic text-slate-600 mt-1">"{c.directExcerptA}"</div>
                </div>
                <div className="bg-slate-50 p-2 border border-slate-200 rounded">
                  <div className="font-bold text-slate-700">Source B: {c.sourceBReference}</div>
                  <div className="italic text-slate-600 mt-1">"{c.directExcerptB}"</div>
                </div>
              </div>
              <div className="text-xs text-slate-800">
                <strong>Reconciliation Advice:</strong> {c.reconciliationRecommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outdated Information */}
      {result.outdatedInformation.length > 0 && (
        <div className="mb-6 print-break-inside-avoid">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
            3. Outdated / Superseded Notices
          </h3>
          {result.outdatedInformation.map((o, i) => (
            <div key={i} className="border border-amber-300 bg-amber-50 p-3 rounded mb-2">
              <div className="font-bold text-sm text-slate-900">
                {o.sourceTitle} (Detected: {o.detectedDate})
              </div>
              <div className="text-xs text-slate-700 mt-1">{o.reasonWhyOutdated}</div>
              <div className="text-xs font-bold text-rose-800 mt-1">Warning: {o.criticalWarning}</div>
            </div>
          ))}
        </div>
      )}

      {/* Checklist */}
      <div className="mb-6 print-break-inside-avoid">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
          4. Prioritized Verification Checklist
        </h3>
        <div className="space-y-1.5 text-xs">
          {result.verificationChecklist.map((item, i) => (
            <div key={i} className="flex items-start gap-2 border-b border-slate-100 py-1.5">
              <span className="font-mono font-bold text-slate-500">[{item.completed ? 'X' : ' '}]</span>
              <div className="flex-1">
                <span className="font-bold text-slate-900">{item.task}</span>
                <div className="text-slate-600 text-[11px]">Action: {item.verificationAction}</div>
                {item.notes && (
                  <div className="text-slate-800 text-[11px] font-mono italic">Note: {item.notes}</div>
                )}
              </div>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded">
                {item.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-300 pt-3 text-center text-xs text-slate-500">
        Confidential Research Audit • InfoPhantom Verification Platform
      </div>
    </div>
  );
}
