import React from 'react';
import { ArrowRight, Activity, FileCheck, Network, Scale, AlertOctagon, Compass, Layers } from 'lucide-react';
import schematicImg from '../assets/images/demopocrisy_lab_schematic_1791827405305.jpg';

interface DiagnosticHeroProps {
  onExploreVault: () => void;
  onLaunchNetwork: () => void;
  onOpenCivilAction: () => void;
  onOpenDiscrepancyModal: () => void;
  onOpenCSFModal: () => void;
}

export const DiagnosticHero: React.FC<DiagnosticHeroProps> = ({
  onExploreVault,
  onLaunchNetwork,
  onOpenCivilAction,
  onOpenDiscrepancyModal,
  onOpenCSFModal
}) => {
  return (
    <section className="border-b border-black/10 bg-[#F9F9F9] relative overflow-hidden">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-grid-schematic opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Top Kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-neutral-600 mb-3">
          <span className="font-semibold text-[#E53935] uppercase tracking-wider">FORENSIC SYSTEMS RESEARCH</span>
          <span aria-hidden="true">·</span>
          <span>KING COUNTY / SEATTLE JURISDICTION</span>
          <span aria-hidden="true">·</span>
          <span>SUBJECT: SHANE JONATHAN LOZENICH</span>
          <span aria-hidden="true">·</span>
          <span>SYNTHESIS AUDIT: OCTOBER 2026</span>
        </div>

        {/* 2-Column Desktop Grid: Left Headline & Synthesis / Right Architectural Drawing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-neutral-900 leading-[1.15] mb-5">
                Auditing Systemic Discrepancy, Procedural Due Process, and Medicalized Custody in Washington State (2021–2026)
              </h1>

              {/* Executive Summary Panel */}
              <div className="bg-white border border-black/10 rounded-lg p-5 mb-6 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-500 mb-2.5">
                  <span className="w-1.5 h-1.5 bg-[#E53935] rounded-full" />
                  <span className="font-semibold text-neutral-900 uppercase">Executive Summary & Forensic Hypothesis</span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed font-sans mb-3">
                  Demopocrisy is a dual-purpose forensic laboratory and investigative archive built around eight interconnected legal and civil matters in King County (2021–2026). Across five years of court records, the data reveal not isolated administrative missteps but a coherent structural architecture: <strong>low-threshold automated database alerts and psychiatric competency frameworks systematically displaced adversarial jury trials</strong>.
                </p>
                <div className="pt-2.5 border-t border-black/5 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-mono-code text-neutral-600">
                  <span>DOMINANT FLOW: Intake → Physical Containment → Administrative Substitution → Record Pollution</span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreVault}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-mono-code font-semibold rounded flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <span>Explore Evidence Vault</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E53935]" />
              </button>

              <button
                onClick={onLaunchNetwork}
                className="px-4 py-2.5 bg-white hover:bg-neutral-100 text-neutral-900 border border-black/15 text-xs font-mono-code font-semibold rounded flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
              >
                <Network className="w-3.5 h-3.5 text-[#E53935]" />
                <span>Launch 57-Node Network (SNA)</span>
              </button>

              <button
                onClick={onOpenCivilAction}
                className="px-4 py-2.5 bg-white hover:bg-neutral-100 text-neutral-900 border border-black/15 text-xs font-mono-code font-semibold rounded flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5 text-neutral-600" />
                <span>View June 2026 Civil Action</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Architectural Schematic Drawing */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white border border-black/10 rounded-lg p-3 flex-1 flex flex-col justify-between shadow-2xs">
              <div className="relative overflow-hidden rounded border border-black/5 bg-neutral-100 group">
                <img
                  src={schematicImg}
                  alt="Demopocrisy Forensic Document Laboratory and Research Archive Schematic"
                  className="w-full h-56 sm:h-64 object-cover object-center grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-neutral-950/85 text-white text-[10px] font-mono-code px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
                  <span>DRG NO. FD-ARCH-001 · LEVEL 1-3 SCHEMATIC</span>
                </div>
              </div>

              <div className="pt-3 px-1">
                <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500 mb-1">
                  <span>ARCHIVAL STRATIGRAPHY</span>
                  <span>1:160 SCALE</span>
                </div>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  Three-tier forensic workstation modeling procedural strata: Primary Public Source Layer (dockets/logs) → Discrepancy Extraction Engine → Counter-Archive & Reform Matrix.
                </p>
                <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between text-[11px] font-mono-code">
                  <span className="text-neutral-500">CORPUS: 8 Dockets · 75+ Verified Exhibits</span>
                  <button
                    onClick={onOpenCSFModal}
                    className="text-[#E53935] hover:underline font-semibold cursor-pointer"
                  >
                    View CSF Lab Audit →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Metric Counter Cards Strip (Full Width Row Below) */}
        <div className="mt-8 pt-6 border-t border-black/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Discrepancy Index */}
          <button
            onClick={onOpenDiscrepancyModal}
            className="text-left bg-white border border-black/10 hover:border-[#E53935] p-4 rounded-lg transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500 mb-1">
              <span>PRIMARY METRIC</span>
              <Activity className="w-4 h-4 text-[#E53935] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold font-mono-code text-neutral-950 flex items-baseline gap-1.5">
              <span>89.75</span>
              <span className="text-xs text-neutral-500 font-normal">/ 100</span>
            </div>
            <div className="text-xs font-semibold text-[#E53935] font-mono-code mt-0.5">
              D̄ Systemic Discrepancy Index
            </div>
            <p className="text-xs text-neutral-600 mt-2 font-sans line-clamp-2">
              Quantifies gap between statutory due process requirements and operational containment pathways. Click for breakdown.
            </p>
          </button>

          {/* Card 2: No Complaint Filed */}
          <button
            onClick={onExploreVault}
            className="text-left bg-white border border-black/10 hover:border-neutral-400 p-4 rounded-lg transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500 mb-1">
              <span>CHARGING FAILURE</span>
              <FileCheck className="w-4 h-4 text-neutral-600 group-hover:text-neutral-900 transition-colors" />
            </div>
            <div className="text-2xl font-bold font-mono-code text-neutral-950 flex items-baseline gap-1.5">
              <span>4 of 8</span>
              <span className="text-xs text-neutral-500 font-normal">Proceedings</span>
            </div>
            <div className="text-xs font-semibold text-neutral-800 font-mono-code mt-0.5">
              Dismissed Without Complaint
            </div>
            <p className="text-xs text-neutral-600 mt-2 font-sans line-clamp-2">
              Arrested, booked, and arraigned in King County Jail without the prosecution ever filing a formal criminal complaint.
            </p>
          </button>

          {/* Card 3: Involuntary Holds */}
          <button
            onClick={onOpenCSFModal}
            className="text-left bg-white border border-black/10 hover:border-[#E53935] p-4 rounded-lg transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500 mb-1">
              <span>CLINICAL SUBSTITUTION</span>
              <AlertOctagon className="w-4 h-4 text-[#E53935] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold font-mono-code text-neutral-950 flex items-baseline gap-1.5">
              <span>2 Holds</span>
              <span className="text-xs text-neutral-500 font-normal">Harborview + WSH</span>
            </div>
            <div className="text-xs font-semibold text-[#E53935] font-mono-code mt-0.5">
              Involuntary Psychiatric Holds
            </div>
            <p className="text-xs text-neutral-600 mt-2 font-sans line-clamp-2">
              Undocumented post-dismissal medical transfer; Harborview spinal tap; forced psychotropics with contradictory 95% neutrophil CSF.
            </p>
          </button>

          {/* Card 4: SPD Centrality */}
          <button
            onClick={onLaunchNetwork}
            className="text-left bg-white border border-black/10 hover:border-neutral-400 p-4 rounded-lg transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500 mb-1">
              <span>SNA TOPOLOGY</span>
              <Compass className="w-4 h-4 text-neutral-600 group-hover:text-neutral-900 transition-colors" />
            </div>
            <div className="text-2xl font-bold font-mono-code text-neutral-950 flex items-baseline gap-1.5">
              <span>0.0040</span>
              <span className="text-xs text-neutral-500 font-normal">Betweenness</span>
            </div>
            <div className="text-xs font-semibold text-neutral-800 font-mono-code mt-0.5">
              SPD: Sole Structural Bridge
            </div>
            <p className="text-xs text-neutral-600 mt-2 font-sans line-clamp-2">
              Highest betweenness centrality across 57 nodes. Law enforcement intake bottlenecks information before reaching courts.
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};
