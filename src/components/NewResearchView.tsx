import React, { useState } from 'react';
import {
  Globe,
  FileText,
  Plus,
  Trash2,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Cpu,
  RefreshCw,
  Search,
} from 'lucide-react';
import { Source } from '../types';
import { NORTHBRIDGE_SOURCES } from '../data/sampleData';

interface NewResearchViewProps {
  onAnalyze: (question: string, sources: Source[]) => Promise<void>;
  isLoading: boolean;
  onLoadDemo: () => void;
  onInspectSource: (source: Source) => void;
}

export function NewResearchView({
  onAnalyze,
  isLoading,
  onLoadDemo,
  onInspectSource,
}: NewResearchViewProps) {
  const [question, setQuestion] = useState(
    'What should I verify before applying for the Northbridge Student Support Award?'
  );

  const [activeInputTab, setActiveInputTab] = useState<'url' | 'paste'>('url');

  // Option A state (URL extraction)
  const [urlInput, setUrlInput] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);

  // Option B state (Paste content)
  const [pasteTitle, setPasteTitle] = useState('');
  const [pasteUrl, setPasteUrl] = useState('');
  const [pasteContent, setPasteContent] = useState('');
  const [pasteDate, setPasteDate] = useState('');

  // Selected Sources list
  const [sources, setSources] = useState<Source[]>(NORTHBRIDGE_SOURCES);

  // Quick Preset handlers
  const handleLoadNorthbridge = () => {
    setQuestion(
      'What should I verify before applying for the Northbridge Student Support Award?'
    );
    setSources(NORTHBRIDGE_SOURCES);
    setExtractionError(null);
  };

  const handleClearSources = () => {
    setSources([]);
    setExtractionError(null);
  };

  // Extract URL via backend
  const handleExtractUrl = async () => {
    if (!urlInput.trim()) return;
    setIsExtracting(true);
    setExtractionError(null);

    try {
      const response = await fetch('/api/extract-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to extract content from URL');
      }

      const newSource: Source = {
        id: `src-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        title: data.title || urlInput,
        url: data.url,
        domain: data.domain,
        date: data.date,
        author: data.author,
        content: data.content,
        wordCount: data.wordCount,
        status: 'ready',
      };

      setSources((prev) => [newSource, ...prev]);
      setUrlInput('');
    } catch (err: any) {
      setExtractionError(err.message || 'Unable to extract content from this URL');
    } finally {
      setIsExtracting(false);
    }
  };

  // Add Pasted content
  const handleAddPastedSource = () => {
    if (!pasteContent.trim()) return;

    const wordCount = pasteContent.trim().split(/\s+/).filter(Boolean).length;
    const domain = pasteUrl
      ? pasteUrl.replace(/^https?:\/\//, '').split('/')[0]
      : 'Pasted Document';

    const newSource: Source = {
      id: `src-paste-${Date.now()}`,
      title: pasteTitle.trim() || `Pasted Source (${new Date().toLocaleTimeString()})`,
      url: pasteUrl.trim() || undefined,
      domain,
      date: pasteDate.trim() || new Date().toISOString().split('T')[0],
      content: pasteContent.trim(),
      wordCount,
      status: 'ready',
    };

    setSources((prev) => [newSource, ...prev]);
    setPasteTitle('');
    setPasteUrl('');
    setPasteContent('');
    setPasteDate('');
  };

  const handleRemoveSource = (id: string) => {
    setSources((prev) => prev.filter((s) => s.id !== id));
  };

  const handleTriggerAnalysis = () => {
    if (!question.trim() || sources.length === 0) return;
    onAnalyze(question.trim(), sources);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Title & Guidance */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h1 className="text-xl lg:text-2xl font-extrabold text-white">
              New Research Workspace
            </h1>
          </div>

          <button
            onClick={handleLoadNorthbridge}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#121c32] hover:bg-[#1a2846] text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Load Fictional Award Preset</span>
          </button>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Define your research question, add target sources via live URL extraction or pasted text, and run the InfoPhantom cross-analysis engine.
        </p>
      </div>

      {/* Step 1: Research Question Input */}
      <div className="p-5 rounded-2xl bg-[#0c1427] border border-[#1b2844] space-y-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="research-question"
            className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2"
          >
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">
              1
            </span>
            Research Question or Decision Topic
          </label>
          <span className="text-[11px] text-slate-400">
            Be specific about requirements, eligibility, or terms
          </span>
        </div>

        <input
          id="research-question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. What should I verify before applying for this scholarship?"
          className="w-full px-4 py-3 rounded-xl bg-[#080d1a] border border-[#203154] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors font-medium"
        />

        {/* Suggestion Chips */}
        <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
          <span className="text-slate-400 text-[11px]">Presets:</span>
          <button
            type="button"
            onClick={() =>
              setQuestion(
                'What should I verify before applying for the Northbridge Student Support Award?'
              )
            }
            className="text-[11px] px-2.5 py-1 rounded-md bg-[#131d33] hover:bg-[#1a2948] text-slate-300 border border-[#223354] transition-colors"
          >
            Northbridge Scholarship Check
          </button>
          <button
            type="button"
            onClick={() =>
              setQuestion(
                'What are the mandatory compliance gaps and conflicting requirements between these privacy notices?'
              )
            }
            className="text-[11px] px-2.5 py-1 rounded-md bg-[#131d33] hover:bg-[#1a2948] text-slate-300 border border-[#223354] transition-colors"
          >
            Compliance & Privacy Comparison
          </button>
          <button
            type="button"
            onClick={() =>
              setQuestion(
                'What hidden prerequisites and renewal stipulations exist for this remote work visa program?'
              )
            }
            className="text-[11px] px-2.5 py-1 rounded-md bg-[#131d33] hover:bg-[#1a2948] text-slate-300 border border-[#223354] transition-colors"
          >
            Remote Work Visa Criteria
          </button>
        </div>
      </div>

      {/* Step 2: Add Sources (Option A: URLs, Option B: Pasted text) */}
      <div className="p-5 rounded-2xl bg-[#0c1427] border border-[#1b2844] space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">
              2
            </span>
            Add Source Documents
          </label>

          {/* Toggle between Option A and Option B */}
          <div className="flex rounded-lg bg-[#080d1a] p-1 border border-[#1f2f50]">
            <button
              type="button"
              onClick={() => setActiveInputTab('url')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeInputTab === 'url'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Option A: Add URLs</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveInputTab('paste')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeInputTab === 'paste'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Option B: Paste Information</span>
            </button>
          </div>
        </div>

        {/* Option A: URL Extraction Form */}
        {activeInputTab === 'url' && (
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleExtractUrl();
                    }
                  }}
                  placeholder="https://example.edu/scholarships/notice-2026 or article URL"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080d1a] border border-[#203154] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <button
                type="button"
                disabled={isExtracting || !urlInput.trim()}
                onClick={handleExtractUrl}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold text-xs shadow-md transition-all cursor-pointer shrink-0"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Extract Webpage</span>
                  </>
                )}
              </button>
            </div>

            {extractionError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Extraction Notice:</span>
                  <span>{extractionError}</span>
                </div>
              </div>
            )}

            <p className="text-[11px] text-slate-400">
              Backend fetches the webpage, strips navigation/scripts, detects publication metadata, and extracts clean article body text.
            </p>
          </div>
        )}

        {/* Option B: Paste Text Form */}
        {activeInputTab === 'paste' && (
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                type="text"
                value={pasteTitle}
                onChange={(e) => setPasteTitle(e.target.value)}
                placeholder="Source Title (e.g. Official Scholarship Notice)"
                className="w-full px-3 py-2 rounded-xl bg-[#080d1a] border border-[#203154] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
              <input
                type="text"
                value={pasteUrl}
                onChange={(e) => setPasteUrl(e.target.value)}
                placeholder="Source URL or Reference (optional)"
                className="w-full px-3 py-2 rounded-xl bg-[#080d1a] border border-[#203154] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
              <input
                type="text"
                value={pasteDate}
                onChange={(e) => setPasteDate(e.target.value)}
                placeholder="Publication Date (e.g. 2026-08-15)"
                className="w-full px-3 py-2 rounded-xl bg-[#080d1a] border border-[#203154] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <textarea
              rows={4}
              value={pasteContent}
              onChange={(e) => setPasteContent(e.target.value)}
              placeholder="Paste article text, eligibility criteria, official notice, or document excerpt here..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d1a] border border-[#203154] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 resize-y"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Word count: {pasteContent.trim().split(/\s+/).filter(Boolean).length} words
              </span>
              <button
                type="button"
                disabled={!pasteContent.trim()}
                onClick={handleAddPastedSource}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add Pasted Source</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step 3: Selected Sources Review & Action */}
      <div className="p-5 rounded-2xl bg-[#0c1427] border border-[#1b2844] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#18263f]">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Selected Sources for Cross-Analysis</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                {sources.length}
              </span>
            </h2>
          </div>

          {sources.length > 0 && (
            <button
              onClick={handleClearSources}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear all</span>
            </button>
          )}
        </div>

        {sources.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-[#080d1a] border border-dashed border-[#1f2f4e] space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-xs text-slate-300 font-medium">
              No sources selected yet.
            </p>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              Extract webpage URLs using Option A or paste document text using Option B. You need at least 1 source (recommended 2-4) to cross-verify claims.
            </p>
            <button
              onClick={handleLoadNorthbridge}
              className="mt-2 text-xs font-semibold text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Load Northbridge Demo Sources
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {sources.map((source, index) => (
              <div
                key={source.id}
                className="p-3.5 rounded-xl bg-[#080d1a] border border-[#1a2742] hover:border-slate-700 flex items-center justify-between gap-3 transition-colors group"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                      Source {String.fromCharCode(65 + index)}
                    </span>
                    <h3 className="text-xs font-semibold text-white truncate max-w-md">
                      {source.title}
                    </h3>
                    {source.isSimulated && (
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        Simulated Demo
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
                    {source.domain && (
                      <span className="font-mono text-slate-300">
                        {source.domain}
                      </span>
                    )}
                    {source.date && (
                      <span>Date: <span className="text-slate-300">{source.date}</span></span>
                    )}
                    {source.wordCount && (
                      <span>{source.wordCount} words</span>
                    )}
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline flex items-center gap-0.5"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onInspectSource(source)}
                    className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-[#121c33] hover:bg-[#1a2949] rounded-lg border border-[#1f2e50] transition-colors"
                  >
                    Inspect
                  </button>
                  <button
                    onClick={() => handleRemoveSource(source.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                    title="Remove source"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Primary Action Button: Analyze Sources */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#18263f]">
          <div className="text-xs text-slate-400">
            {sources.length > 0 ? (
              <span>
                Ready to cross-examine {sources.length} sources for information gaps, conflicts, and outdated notices.
              </span>
            ) : (
              <span>Add at least one source document to begin analysis.</span>
            )}
          </div>

          <button
            type="button"
            disabled={isLoading || sources.length === 0 || !question.trim()}
            onClick={handleTriggerAnalysis}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Running InfoPhantom Gap Detection...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4 stroke-[2.5]" />
                <span>Analyze Sources</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
