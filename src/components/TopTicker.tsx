import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Scale, ShieldCheck, ChevronRight, Search, Lock, UploadCloud } from 'lucide-react';

interface TopTickerProps {
  onOpenSearch: () => void;
  onOpenSecurePortal: () => void;
  onOpenWhistleblower: () => void;
  onSelectMetric: (metric: string) => void;
}

export const TopTicker: React.FC<TopTickerProps> = ({
  onOpenSearch,
  onOpenSecurePortal,
  onOpenWhistleblower,
  onSelectMetric
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) + ' · ' + now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' PST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-b border-black/10 bg-[#F2F2F2] text-xs font-mono-code text-neutral-800 select-none">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Forensic Ticker Counters */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-xs">
          <button
            onClick={() => onSelectMetric('discrepancy')}
            className="flex items-center gap-1.5 hover:text-[#E53935] transition-colors cursor-pointer text-left"
            title="Click to view Discrepancy Index breakdown"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#E53935]" />
            <span className="font-semibold text-neutral-900">SYSTEMIC DISCREPANCY INDEX (D̄):</span>
            <span className="text-[#E53935] font-bold">89.75 / 100</span>
            <span className="text-neutral-500 hidden sm:inline">(Extreme Intensity)</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-neutral-600">
            <span className="text-neutral-300">|</span>
            <span>AUDITED DOCKETS: <strong className="text-neutral-900 font-semibold">8 PROCEEDINGS</strong></span>
            <span className="text-neutral-300">|</span>
            <span>PRETRIAL CUSTODY: <strong className="text-neutral-900 font-semibold">365+ DAYS</strong></span>
            <span className="text-neutral-300">|</span>
            <span>TRIAL VERDICTS: <strong className="text-neutral-900 font-semibold">0</strong></span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-neutral-700">
            <span className="text-neutral-300">|</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>COMPETENCY STATUS: <strong className="text-emerald-700 font-semibold">100% RESTORED (FEB 2026)</strong></span>
          </div>
        </div>

        {/* Right: Operational Actions & Timestamp */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs ml-auto">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-black/10 hover:border-black/30 rounded text-neutral-700 transition-colors shadow-2xs"
            title="Global Search across cases, labs, and statutes"
          >
            <Search className="w-3 h-3 text-neutral-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="bg-neutral-100 text-[10px] px-1 py-0.2 rounded border border-neutral-300 text-neutral-500">⌘K</kbd>
          </button>

          <button
            onClick={onOpenWhistleblower}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-neutral-50 border border-black/15 rounded text-neutral-800 transition-colors"
            title="Encrypted drop for court records, audio, and affidavits"
          >
            <UploadCloud className="w-3 h-3 text-[#E53935]" />
            <span className="hidden sm:inline font-medium">Submit Evidence</span>
            <span className="sm:hidden font-medium">Drop</span>
          </button>

          <button
            onClick={onOpenSecurePortal}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 hover:bg-black text-white rounded transition-colors shadow-2xs"
            title="Secure Client & Counsel Document Portal"
          >
            <Lock className="w-3 h-3 text-[#E53935]" />
            <span className="font-medium">Client Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
