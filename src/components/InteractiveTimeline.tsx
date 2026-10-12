import React, { useState, useMemo } from 'react';
import { MASTER_TIMELINE_EVENTS } from '../data/timelineData';
import { TimelineEvent } from '../types';
import { Calendar, Filter, Search, ArrowRight, AlertTriangle, ShieldCheck, FileText, ChevronRight, Compass, RotateCcw } from 'lucide-react';

interface InteractiveTimelineProps {
  onSelectCase?: (caseNumber: string) => void;
  onOpenCSFModal: () => void;
  onSelectDocument?: (docUrl: string) => void;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  onSelectCase,
  onOpenCSFModal,
  onSelectDocument
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const categories = [
    'All',
    'Municipal',
    'Felony',
    'Medical',
    'Civil/Housing',
    'Origin & Breach',
    'Restoration'
  ];

  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

  const filteredEvents = useMemo(() => {
    return MASTER_TIMELINE_EVENTS.filter((evt) => {
      // Category filter
      if (selectedCategory !== 'All' && evt.category !== selectedCategory) {
        return false;
      }

      // Year filter
      if (selectedYear !== 'all' && evt.year !== selectedYear) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match = `${evt.title} ${evt.summary} ${evt.details} ${evt.date} ${evt.tags.join(' ')} ${evt.statuteOrQuote || ''}`.toLowerCase();
        if (!match.includes(q)) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedYear, searchQuery]);

  return (
    <section className="py-8 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-black/10">
          <div>
            <div className="text-xs font-mono-code text-[#E53935] uppercase font-semibold tracking-wider mb-1">
              MODULE 07 · CHRONOLOGICAL DATA VISUALIZATION
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-sans">
              Master Forensic Timeline (2020–2026)
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 max-w-3xl">
              Precision chronological tracking tracing the transformation of low-threshold database errors into 365+ days of pretrial custody, undocumented medical transfers, and five-year administrative limbo.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-500">
            <span>SHOWING: <strong className="text-neutral-900">{filteredEvents.length}</strong> of {MASTER_TIMELINE_EVENTS.length} EVENTS</span>
          </div>
        </div>

        {/* Interactive Filtering Bar */}
        <div className="bg-white border border-black/10 rounded-lg p-4 mb-8 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chronological events, statutes, witnesses, or keywords..."
                className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-black/10 rounded text-xs font-mono-code text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#E53935] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs font-mono-code"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded border border-black/5 text-xs font-mono-code overflow-x-auto">
              <span className="text-[11px] text-neutral-500 px-1.5 shrink-0">Year:</span>
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  selectedYear === 'all'
                    ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                    selectedYear === y
                      ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-black/5 text-xs font-mono-code">
            <span className="text-neutral-500 mr-2 text-[11px]">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded border text-xs transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 border-neutral-900 text-white font-semibold'
                    : 'bg-white border-black/10 text-neutral-600 hover:text-neutral-950 hover:border-black/20'
                }`}
              >
                {cat}
              </button>
            ))}

            {(selectedCategory !== 'All' || selectedYear !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedYear('all');
                  setSearchQuery('');
                }}
                className="ml-auto text-neutral-500 hover:text-[#E53935] flex items-center gap-1 text-[11px] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Timeline Visualization Track */}
        <div className="relative pl-4 sm:pl-8 border-l-2 border-neutral-300 space-y-8">
          {filteredEvents.length === 0 ? (
            <div className="p-8 bg-white border border-black/10 rounded-lg text-center text-xs font-mono-code text-neutral-500">
              No timeline events match the selected criteria. Try adjusting your year or category filters.
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const isExpanded = expandedEventId === evt.id;

              return (
                <div key={evt.id} className="relative group">
                  {/* Timeline Node Indicator */}
                  <div className={`absolute -left-[23px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition-all ${
                    evt.category === 'Restoration'
                      ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-200'
                      : evt.category === 'Medical'
                      ? 'border-[#E53935] bg-red-50 ring-2 ring-red-200'
                      : 'border-neutral-700'
                  }`} />

                  {/* Card Content */}
                  <div className="bg-white border border-black/10 hover:border-black/25 rounded-lg p-5 transition-all shadow-2xs">
                    {/* Event Meta Line */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded border border-black/5">
                          {evt.date}
                        </span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-[#E53935] font-semibold uppercase">{evt.category}</span>
                        {evt.caseNumber && (
                          <>
                            <span className="text-neutral-500">·</span>
                            <span className="text-neutral-700 font-medium">Case #{evt.caseNumber}</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                        {evt.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-neutral-600">
                            #{tag}{tIdx < evt.tags.length - 1 ? ' ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 font-sans tracking-tight mb-2">
                      {evt.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed mb-3">
                      {evt.summary}
                    </p>

                    {/* Discrepancy Flag Callout */}
                    {evt.discrepancyFlag && (
                      <div className="p-3 bg-red-50/60 border border-[#E53935]/20 rounded mb-3 text-xs font-sans text-neutral-800 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#E53935] font-mono-code font-bold uppercase text-[11px] block">
                            Forensic Discrepancy Signature:
                          </strong>
                          <span>{evt.discrepancyFlag}</span>
                        </div>
                      </div>
                    )}

                    {/* Expandable Details */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-black/5 space-y-3 animate-in fade-in duration-150">
                        <p className="text-xs text-neutral-800 font-sans leading-relaxed">
                          {evt.details}
                        </p>

                        {evt.statuteOrQuote && (
                          <div className="p-2.5 bg-neutral-50 rounded border border-black/5 text-xs font-mono-code text-neutral-800 italic">
                            {evt.statuteOrQuote}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-black/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
                      <button
                        onClick={() => setExpandedEventId(isExpanded ? null : evt.id)}
                        className="text-neutral-600 hover:text-neutral-950 font-medium cursor-pointer"
                      >
                        {isExpanded ? 'Collapse Narrative ↑' : 'Expand Full Forensic Details ↓'}
                      </button>

                      <div className="flex items-center gap-3">
                        {evt.category === 'Medical' && (
                          <button
                            onClick={onOpenCSFModal}
                            className="text-[#E53935] hover:underline font-semibold cursor-pointer"
                          >
                            Audit Harborview Labs →
                          </button>
                        )}

                        {evt.caseNumber && onSelectCase && (
                          <button
                            onClick={() => onSelectCase(evt.caseNumber!)}
                            className="text-neutral-900 hover:text-[#E53935] font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <span>Open Docket Dossier</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
