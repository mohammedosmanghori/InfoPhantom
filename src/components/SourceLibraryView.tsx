import React, { useState } from 'react';
import {
  Library,
  Search,
  ExternalLink,
  Calendar,
  FileText,
  User,
  Globe,
  Plus,
  Eye,
  Trash2,
} from 'lucide-react';
import { Source } from '../types';

interface SourceLibraryViewProps {
  sources: Source[];
  onInspectSource: (source: Source) => void;
  onStartNew: () => void;
}

export function SourceLibraryView({
  sources,
  onInspectSource,
  onStartNew,
}: SourceLibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'simulated' | 'live'>('all');

  const filteredSources = sources.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.domain && s.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.author && s.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === 'simulated') return matchesSearch && s.isSimulated;
    if (filterType === 'live') return matchesSearch && !s.isSimulated;
    return matchesSearch;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Library className="w-4 h-4" />
            </span>
            <h1 className="text-xl lg:text-2xl font-extrabold text-white">
              Source Library & Ingested Material
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete registry of raw primary documents, official notices, and third-party references.
          </p>
        </div>

        <button
          onClick={onStartNew}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add More Sources</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sources by title, publisher domain, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c1427] border border-[#1b2844] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex rounded-lg bg-[#0c1427] p-1 border border-[#1b2844] self-stretch sm:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filterType === 'all'
                ? 'bg-[#182643] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({sources.length})
          </button>
          <button
            onClick={() => setFilterType('simulated')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filterType === 'simulated'
                ? 'bg-[#182643] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Simulated ({sources.filter((s) => s.isSimulated).length})
          </button>
          <button
            onClick={() => setFilterType('live')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              filterType === 'live'
                ? 'bg-[#182643] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Extracted ({sources.filter((s) => !s.isSimulated).length})
          </button>
        </div>
      </div>

      {/* Sources List */}
      {filteredSources.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0a1020] border border-[#18263f] space-y-3">
          <FileText className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-sm font-semibold text-white">No sources found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery
              ? `No sources matched your query "${searchQuery}".`
              : 'Add sources in the New Research workspace to populate your library.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredSources.map((source, idx) => (
            <div
              key={source.id}
              className="p-5 rounded-2xl bg-[#0c1427] border border-[#1a2846] hover:border-[#273d68] transition-all space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      SOURCE {String.fromCharCode(65 + idx)}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {source.title}
                    </h3>
                    {source.isSimulated && (
                      <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        Simulated Demo Notice
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap pt-0.5">
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
                    {source.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        {source.author}
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
                        <span>Original link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onInspectSource(source)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14203a] hover:bg-[#1a2b4e] text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all cursor-pointer self-start"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Inspect Full Text</span>
                </button>
              </div>

              {/* Text Excerpt preview */}
              <div className="p-3.5 rounded-xl bg-[#070b16] border border-[#15223c] font-mono text-xs text-slate-300 leading-relaxed max-h-24 overflow-hidden relative">
                <p className="line-clamp-3 whitespace-pre-line">
                  {source.content}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#070b16] to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
