import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, FileText, ArrowRight, Activity, Scale, Compass, Calendar } from 'lucide-react';
import { CASES_DATA, ALL_DOCUMENTS } from '../data/casesData';
import { MASTER_TIMELINE_EVENTS } from '../data/timelineData';
import { CSF_LAB_AUDIT_DATA } from '../data/forensicAnalysisData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, caseNumber?: string) => void;
  onOpenCSFModal: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenCSFModal
}) => {
  const [query, setQuery] = useState('');

  // Handle ESC key and Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return { cases: [], documents: [], timeline: [], labMatches: [] };
    }
    const q = query.toLowerCase();

    const cases = CASES_DATA.filter(c =>
      c.caseNumber.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.cause.toLowerCase().includes(q) ||
      c.judge.toLowerCase().includes(q)
    );

    const documents = ALL_DOCUMENTS.filter(d =>
      d.fileName.toLowerCase().includes(q) ||
      d.caseNumber.toLowerCase().includes(q) ||
      (d.description && d.description.toLowerCase().includes(q))
    ).slice(0, 5);

    const timeline = MASTER_TIMELINE_EVENTS.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
    ).slice(0, 4);

    const labMatches = CSF_LAB_AUDIT_DATA.diagnosticFlags.filter(f =>
      f.parameter.toLowerCase().includes(q) ||
      f.value.toLowerCase().includes(q) ||
      f.note.toLowerCase().includes(q)
    );

    return { cases, documents, timeline, labMatches };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white border border-black/20 rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Header */}
        <div className="p-3 border-b border-black/10 flex items-center gap-3 bg-neutral-50">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 ml-1" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 8 dockets, CSF labs, statutes (10.77, CrR 3.3), and 75+ documents..."
            className="w-full bg-transparent border-none text-xs sm:text-sm font-mono-code text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-xs text-neutral-400 hover:text-neutral-700"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Container */}
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-4 text-xs font-mono-code">
          {!query.trim() ? (
            <div className="py-8 text-center text-neutral-500 space-y-2">
              <p className="text-xs">Quick search suggestions:</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['658959', 'Harborview CSF', 'RCW 10.77', 'Governor Inslee', 'CrR 3.3', 'Majorat', 'Dr. Leavey', 'Accellion'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded cursor-pointer transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Cases Matches */}
              {results.cases.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Court Dockets ({results.cases.length})
                  </div>
                  <div className="space-y-1">
                    {results.cases.map((c) => (
                      <div
                        key={c.caseNumber}
                        onClick={() => {
                          onNavigate('vault', c.caseNumber);
                          onClose();
                        }}
                        className="p-2.5 hover:bg-neutral-100 rounded flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <strong className="text-neutral-900">Case No. {c.caseNumber}</strong>
                          <span className="text-neutral-500 ml-2">({c.court})</span>
                          <p className="text-[11px] text-neutral-600 font-sans mt-0.5">{c.cause} · Judge {c.judge}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#E53935]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lab Panel Matches */}
              {results.labMatches.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Harborview Medical Lab Results
                  </div>
                  <div className="space-y-1">
                    {results.labMatches.map((f, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          onOpenCSFModal();
                          onClose();
                        }}
                        className="p-2.5 hover:bg-neutral-100 rounded flex items-center justify-between cursor-pointer transition-colors bg-red-50/30"
                      >
                        <div>
                          <strong className="text-[#E53935]">{f.parameter}: {f.value}</strong>
                          <p className="text-[11px] text-neutral-700 font-sans mt-0.5">{f.note}</p>
                        </div>
                        <span className="text-[10px] text-[#E53935] font-bold">Audit Lab →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline Matches */}
              {results.timeline.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Chronological Timeline Events
                  </div>
                  <div className="space-y-1">
                    {results.timeline.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          onNavigate('timeline');
                          onClose();
                        }}
                        className="p-2.5 hover:bg-neutral-100 rounded flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <span className="text-neutral-500 font-semibold">{t.date}: </span>
                          <strong className="text-neutral-900">{t.title}</strong>
                          <p className="text-[11px] text-neutral-600 font-sans mt-0.5 line-clamp-1">{t.summary}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Document Matches */}
              {results.documents.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Verified Repository Documents
                  </div>
                  <div className="space-y-1">
                    {results.documents.map((d) => (
                      <a
                        key={d.id}
                        href={d.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 hover:bg-neutral-100 rounded flex items-center justify-between transition-colors block"
                      >
                        <div>
                          <strong className="text-neutral-900">{d.fileName}</strong>
                          <span className="text-neutral-500 ml-2">Case #{d.caseNumber}</span>
                          <p className="text-[11px] text-neutral-500 font-sans mt-0.5">{d.description}</p>
                        </div>
                        <span className="text-[10px] text-neutral-700">Drive →</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {results.cases.length === 0 && results.documents.length === 0 && results.timeline.length === 0 && results.labMatches.length === 0 && (
                <div className="py-8 text-center text-neutral-500">
                  No records found matching &ldquo;{query}&rdquo;.
                </div>
              )}
            </>
          )}
        </div>

        {/* Search Footer */}
        <div className="p-3 bg-neutral-100 border-t border-black/10 flex items-center justify-between text-[11px] font-mono-code text-neutral-500">
          <span>Search scope: 8 dockets · 75+ exhibits · 57 SNA nodes</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
