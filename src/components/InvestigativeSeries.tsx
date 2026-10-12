import React, { useState } from 'react';
import { SPECIAL_INVESTIGATIVE_SERIES } from '../data/forensicAnalysisData';
import { Play, Pause, Volume2, Radio, FileText, ChevronRight, Share2, AlertCircle } from 'lucide-react';

interface InvestigativeSeriesProps {
  onSelectCase?: (caseNo: string) => void;
}

export const InvestigativeSeries: React.FC<InvestigativeSeriesProps> = ({ onSelectCase }) => {
  const [activeSeriesId, setActiveSeriesId] = useState<string>('series-01');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioTrack, setAudioTrack] = useState<string>('Dispatch Simulation: CAD Event #21-1002695');

  const selectedSeries = SPECIAL_INVESTIGATIVE_SERIES.find(s => s.id === activeSeriesId) || SPECIAL_INVESTIGATIVE_SERIES[0];

  const audioTracks: { [key: string]: string } = {
    'series-01': 'SPD Radio Dispatch Fragment · July 23, 2021 · Unmarked Unit Transit',
    'series-02': 'Governor Office Voicemail Queue Status Log · 1,300+ Days Unproduced',
    'series-03': 'Midvale Ave N CAD Incident Call Stack · Cluster 2020–2021',
    'series-04': 'State Auditor Accellion Incident Alert Briefing · 1.6M Records'
  };

  const toggleAudio = (seriesId: string) => {
    setAudioTrack(audioTracks[seriesId] || 'Archival Audio Record');
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <section className="py-8 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-black/10">
          <div>
            <div className="text-xs font-mono-code text-[#E53935] uppercase font-semibold tracking-wider mb-1">
              MODULE 05 · PUBLIC AWARENESS & JOURNALISTIC INVESTIGATIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-sans">
              Special Investigative Series
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 max-w-3xl">
              Long-form forensic inquiries cross-referencing public CAD logs, Washington Supreme Court petitions, FOIA disclosures, and audio dispatch streams.
            </p>
          </div>
        </div>

        {/* 2-Column Layout: Left Series Index / Right Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Series Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono-code text-neutral-500 uppercase font-semibold block">
              Investigative Chapters:
            </span>
            {SPECIAL_INVESTIGATIVE_SERIES.map((series) => {
              const isSelected = activeSeriesId === series.id;
              return (
                <div
                  key={series.id}
                  onClick={() => {
                    setActiveSeriesId(series.id);
                    setIsPlayingAudio(false);
                  }}
                  className={`p-4 rounded-lg border transition-all cursor-pointer select-none bg-white ${
                    isSelected
                      ? 'border-[#E53935] ring-2 ring-red-100 shadow-xs'
                      : 'border-black/10 hover:border-black/25'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-code mb-1">
                    <span className="font-bold text-[#E53935]">SERIES {series.number}</span>
                    <span className="text-neutral-400 text-[10px]">{series.caseRefs[0]}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold font-sans text-neutral-900 leading-tight mb-2">
                    {series.title}
                  </h4>
                  <div className="text-[11px] font-mono-code text-neutral-500 line-clamp-1">
                    {series.kicker}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Dive Panel (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-black/10 rounded-lg p-6 shadow-2xs space-y-5">
            <div className="border-b border-black/10 pb-4">
              <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500 mb-1.5">
                <span className="text-[#E53935] font-semibold">SERIES {selectedSeries.number} · {selectedSeries.kicker}</span>
                <span>INVESTIGATIVE BRIEF</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 leading-snug">
                {selectedSeries.title}
              </h3>
            </div>

            {/* Audio player simulator */}
            <div className="bg-[#FAF9F6] border border-black/10 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleAudio(selectedSeries.id)}
                  className="w-10 h-10 rounded-full bg-[#E53935] hover:bg-[#c62828] text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer shrink-0"
                  aria-label="Toggle audio excerpt playback"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono-code text-neutral-900 font-semibold">
                    <Radio className="w-3.5 h-3.5 text-[#E53935]" />
                    <span>Archival Recording / Dispatch Stream</span>
                  </div>
                  <p className="text-[11px] font-mono-code text-neutral-500 mt-0.5">
                    {audioTracks[selectedSeries.id] || audioTrack}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-600">
                <Volume2 className="w-4 h-4 text-neutral-400" />
                <span className={isPlayingAudio ? 'text-[#E53935] font-bold animate-pulse' : 'text-neutral-500'}>
                  {isPlayingAudio ? 'STREAMING' : 'AUDIO READY'}
                </span>
              </div>
            </div>

            {/* Narrative text */}
            <div className="text-xs sm:text-sm text-neutral-800 font-sans leading-relaxed space-y-3">
              <p>{selectedSeries.summary}</p>
              {selectedSeries.id === 'series-01' && (
                <p className="text-xs text-neutral-700 bg-neutral-50 p-3 rounded border border-black/5">
                  &ldquo;While Seattle police officers argued that publicly identifying them would violate their privacy after participating in the January 6 Capitol demonstrations, Shane Lozenich was detained by plainclothes officers operating unmarked vehicles with zero visible badges or identification.&rdquo;
                </p>
              )}
              {selectedSeries.id === 'series-02' && (
                <p className="text-xs text-neutral-700 bg-neutral-50 p-3 rounded border border-black/5">
                  &ldquo;A felony trial has been suspended for three years without producing the alleged voicemail audio or verified transcript. When evidence is weak, institutional processing redirects the citizen into the competency-restoration pipeline rather than risking an adversarial verdict.&rdquo;
                </p>
              )}
            </div>

            {/* Metrics Checklist */}
            <div className="pt-2">
              <div className="text-xs font-mono-code font-bold text-neutral-900 uppercase mb-2">
                Empirical Indicators:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedSeries.metrics.map((m, i) => (
                  <div key={i} className="bg-neutral-50 p-2.5 rounded border border-black/5 text-xs font-mono-code text-neutral-800 font-medium">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Related Cases */}
            <div className="pt-3 border-t border-black/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
              <div className="flex items-center gap-2">
                <span className="text-neutral-500">Related Dockets:</span>
                {selectedSeries.caseRefs.map((cr, idx) => (
                  <span key={idx} className="font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">
                    {cr}
                  </span>
                ))}
              </div>

              {onSelectCase && (
                <button
                  onClick={() => onSelectCase(selectedSeries.caseRefs[0].split(' ')[1] || '658931')}
                  className="text-[#E53935] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Docket Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
