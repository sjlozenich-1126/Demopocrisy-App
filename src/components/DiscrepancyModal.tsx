import React from 'react';
import { X, Activity, AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';
import { SYSTEMIC_DISCREPANCY_METRICS } from '../data/forensicAnalysisData';

interface DiscrepancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCase?: (caseNumber: string) => void;
}

export const DiscrepancyModal: React.FC<DiscrepancyModalProps> = ({ isOpen, onClose, onSelectCase }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-[#F9F9F9] border border-black/20 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-black/10 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#E53935]/10 text-[#E53935] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono-code text-neutral-900 leading-tight">
                Systemic Discrepancy Index (D̄ = 89.75 / 100)
              </h2>
              <p className="text-xs text-neutral-500 font-mono-code">
                Forensic Quantitative Audit · 5-Component Matrix Across 8 King County Dockets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Top Score Banner */}
          <div className="bg-white border border-black/10 rounded-lg p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
              <div>
                <span className="text-xs font-mono-code uppercase text-neutral-500 block mb-1">AGGREGATE D̄ SCORE</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-mono-code text-[#E53935]">89.75</span>
                  <span className="text-sm font-mono-code text-neutral-500">/ 100.00</span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs font-mono-code px-2.5 py-1 bg-[#E53935]/10 text-[#E53935] font-semibold rounded inline-block mb-1">
                  EXTREME DISCREPANCY INTENSITY
                </span>
                <p className="text-xs text-neutral-600 font-mono-code">
                  Scale: 0–25 Low · 25–50 Mild · 50–75 Moderate · 75–100 Extreme
                </p>
              </div>
            </div>

            {/* Formula Explainer */}
            <div className="pt-4 text-xs font-mono-code text-neutral-700 space-y-1">
              <div className="font-semibold text-neutral-900">ANALYTIC FORMULA:</div>
              <div className="p-2.5 bg-neutral-50 rounded border border-black/5 text-neutral-800">
                Score = f(Constitutional & Statutory Requirement − Actual Operational Pathway) + Clinical Concordance Penalties + SNA Network Centrality
              </div>
              <p className="text-neutral-500 text-[11px] pt-1 font-sans">
                This metric does not reflect a subjective error count; it quantitatively measures procedural due-process collapse where statutory mandates were bypassed in favor of administrative momentum.
              </p>
            </div>
          </div>

          {/* 5 Scoring Components */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono-code uppercase text-neutral-900 tracking-wider">
              Component Contribution Breakdown
            </h3>

            {SYSTEMIC_DISCREPANCY_METRICS.components.map((comp, idx) => {
              const percentage = Math.round((comp.score / comp.maxWeight) * 100);
              return (
                <div key={idx} className="bg-white border border-black/10 rounded-lg p-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold font-mono-code text-neutral-900">
                      0{idx + 1}. {comp.name}
                    </span>
                    <div className="flex items-baseline gap-1 text-xs font-mono-code">
                      <strong className="text-[#E53935] font-bold">{comp.score}</strong>
                      <span className="text-neutral-400">/ {comp.maxWeight} pts</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-neutral-100 rounded-full h-2 mb-2.5 overflow-hidden">
                    <div 
                      className="bg-[#E53935] h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="text-xs text-neutral-700 font-sans mb-1.5">
                    {comp.description}
                  </p>
                  <div className="text-[11px] font-mono-code text-neutral-500 bg-neutral-50 px-2 py-1 rounded border border-black/5">
                    Impact: {comp.impact}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Case Contribution Table */}
          <div className="bg-white border border-black/10 rounded-lg p-4">
            <h3 className="text-xs font-bold font-mono-code uppercase text-neutral-900 mb-3 tracking-wider">
              Discrepancy Intensity by Case Proceeding
            </h3>
            <div className="divide-y divide-black/5 text-xs font-mono-code">
              <div className="py-1.5 flex items-center justify-between text-neutral-500 text-[11px]">
                <span>CASE DOCKET</span>
                <span>PRIMARY ANOMALY</span>
                <span>D̄ SCORE</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="font-semibold text-neutral-900">Case 658959 (SMC)</span>
                <span className="text-neutral-600 hidden sm:inline">Harborview 22-day hold; 95% neutrophil CSF</span>
                <span className="text-[#E53935] font-bold">96.0</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="font-semibold text-neutral-900">Case 22-1-04242-3 SEA (KCSC)</span>
                <span className="text-neutral-600 hidden sm:inline">10 mo detention; missing voicemail discovery void</span>
                <span className="text-[#E53935] font-bold">95.0</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="font-semibold text-neutral-900">Case 21-1-04347-2 SEA (KCSC)</span>
                <span className="text-neutral-600 hidden sm:inline">Pre-signed restoration order without evaluation</span>
                <span className="text-[#E53935] font-bold">94.5</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="font-semibold text-neutral-900">Case 25-2-17456-5 SEA (Housing)</span>
                <span className="text-neutral-600 hidden sm:inline">Retaliatory eviction; Telecare aid refusal</span>
                <span className="text-[#E53935] font-bold">93.0</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="font-semibold text-neutral-900">Case 658931 (SMC)</span>
                <span className="text-neutral-600 hidden sm:inline">24h jail hold without formal complaint</span>
                <span className="text-[#E53935] font-bold">92.5</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="font-semibold text-neutral-900">Case 22-1-04247-3 SEA (KCSC)</span>
                <span className="text-neutral-600 hidden sm:inline">Ambiguous speech elevated to felony limbo</span>
                <span className="text-[#E53935] font-bold">91.5</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="font-semibold text-neutral-900">Case 660121 (SMC)</span>
                <span className="text-neutral-600 hidden sm:inline">Expired CAD flag; unexecuted referral</span>
                <span className="text-[#E53935] font-bold">91.0</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="font-semibold text-neutral-900">Case 664676 (SMC)</span>
                <span className="text-neutral-600 hidden sm:inline">Protected party consent ignored; union bonus window</span>
                <span className="text-[#E53935] font-bold">89.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-100 border-t border-black/10 px-6 py-3 flex items-center justify-between text-xs font-mono-code text-neutral-600">
          <span>Source: Demopocrisy Systemic Forensic Synthesis Report (May–Oct 2026)</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-neutral-900 hover:bg-black text-white rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
