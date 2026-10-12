/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopTicker } from './components/TopTicker';
import { GlobalHeader } from './components/GlobalHeader';
import { DiagnosticHero } from './components/DiagnosticHero';
import { EvidenceVault } from './components/EvidenceVault';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { SystemsNetworkMap } from './components/SystemsNetworkMap';
import { TheoreticalModels } from './components/TheoreticalModels';
import { ReformMatrix } from './components/ReformMatrix';
import { InvestigativeSeries } from './components/InvestigativeSeries';
import { CivilActionHub } from './components/CivilActionHub';
import { DiscrepancyModal } from './components/DiscrepancyModal';
import { CSFModal } from './components/CSFModal';
import { SecureClientPortal } from './components/SecureClientPortal';
import { WhistleblowerModal } from './components/WhistleblowerModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CASES_DATA } from './data/casesData';
import { ArrowRight, ShieldCheck, Scale, FileText, Database, Compass, Layers, Lock, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedCaseNumber, setSelectedCaseNumber] = useState<string>('658931');

  // Modals state
  const [isDiscrepancyModalOpen, setIsDiscrepancyModalOpen] = useState(false);
  const [isCSFModalOpen, setIsCSFModalOpen] = useState(false);
  const [isSecurePortalOpen, setIsSecurePortalOpen] = useState(false);
  const [isWhistleblowerOpen, setIsWhistleblowerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCase = (caseNo: string) => {
    setSelectedCaseNumber(caseNo);
    setActiveTab('vault');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string, caseNo?: string) => {
    if (caseNo) {
      setSelectedCaseNumber(caseNo);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-neutral-900 flex flex-col font-sans selection:bg-[#E53935]/15 selection:text-[#b71c1c]">
      {/* 1. Global Utility Bar & Forensic Counter Ticker */}
      <TopTicker
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSecurePortal={() => setIsSecurePortalOpen(true)}
        onOpenWhistleblower={() => setIsWhistleblowerOpen(true)}
        onSelectMetric={() => setIsDiscrepancyModalOpen(true)}
      />

      {/* 2. Global Header Nav */}
      <GlobalHeader
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCivilAction={() => {
          setActiveTab('civilAction');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 3. Main Views */}
      <main className="flex-1">
        {/* VIEW: OVERVIEW / HERO DASHBOARD */}
        {activeTab === 'overview' && (
          <div>
            <DiagnosticHero
              onExploreVault={() => {
                setActiveTab('vault');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onLaunchNetwork={() => {
                setActiveTab('network');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenCivilAction={() => {
                setActiveTab('civilAction');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenDiscrepancyModal={() => setIsDiscrepancyModalOpen(true)}
              onOpenCSFModal={() => setIsCSFModalOpen(true)}
            />

            {/* Quick Overview Navigation Grid */}
            <section className="py-12 max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-black/10 text-xs font-mono-code text-neutral-500">
                <span className="font-bold uppercase text-neutral-900">CORE FORENSIC INVESTIGATION MODULES</span>
                <span>8 Dockets · 57 SNA Nodes · 75+ Verified Source Documents</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Module 1 Box */}
                <div 
                  onClick={() => setActiveTab('vault')}
                  className="bg-white border border-black/10 hover:border-black/30 p-6 rounded-lg transition-all shadow-2xs hover:shadow-xs cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-[#E53935] font-bold">MODULE 01</span>
                      <span className="text-neutral-400">8 CASES</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 font-sans group-hover:text-[#E53935] transition-colors">
                      The Evidence Vault & Case Dossiers
                    </h3>
                    <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                      Complete procedural histories of all eight Seattle Municipal Court and King County Superior Court matters, cataloging unfiled complaints, warrantless arrests, and the 2026 competency restoration.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs font-mono-code text-neutral-800 group-hover:text-[#E53935]">
                    <span>Enter Vault</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Module 2 Box */}
                <div 
                  onClick={() => setActiveTab('timeline')}
                  className="bg-white border border-black/10 hover:border-black/30 p-6 rounded-lg transition-all shadow-2xs hover:shadow-xs cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-[#E53935] font-bold">MODULE 07</span>
                      <span className="text-neutral-400">2020–2026</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 font-sans group-hover:text-[#E53935] transition-colors">
                      Interactive Chronological Timeline
                    </h3>
                    <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                      Interactive chronological data visualization with granular category and year filtering, cross-referencing initial data breaches, custody milestones, and the Leavey 2026 restoration.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs font-mono-code text-neutral-800 group-hover:text-[#E53935]">
                    <span>Explore Chronology</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Module 3 Box */}
                <div 
                  onClick={() => setActiveTab('network')}
                  className="bg-white border border-black/10 hover:border-black/30 p-6 rounded-lg transition-all shadow-2xs hover:shadow-xs cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-[#E53935] font-bold">MODULE 02</span>
                      <span className="text-neutral-400">57 NODES</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 font-sans group-hover:text-[#E53935] transition-colors">
                      Systems Mapping & Social Network Analysis
                    </h3>
                    <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                      Kumu / D3 graph isolating the Seattle Police Department as the sole structural bridge (betweenness 0.0040) and exposing the root-cause reform gap in detention economics.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs font-mono-code text-neutral-800 group-hover:text-[#E53935]">
                    <span>View Graph Canvas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Secondary Module Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Models */}
                <div 
                  onClick={() => setActiveTab('models')}
                  className="bg-white border border-black/10 hover:border-black/30 p-5 rounded-lg transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#E53935] mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>DIAGNOSTIC MODELS</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 font-sans mb-1">
                    Stratigraphic Hardening & Epistemic Inversion
                  </h4>
                  <p className="text-xs text-neutral-600 font-sans">
                    6 geological layers of procedural hardening, the 7-step institutional cycle, and the split-screen cybernetic reality engine.
                  </p>
                </div>

                {/* Reforms */}
                <div 
                  onClick={() => setActiveTab('reforms')}
                  className="bg-white border border-black/10 hover:border-black/30 p-5 rounded-lg transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#E53935] mb-1">
                    <Scale className="w-3.5 h-3.5" />
                    <span>POLICY REFORM MATRIX</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 font-sans mb-1">
                    Failure Mode ↔ Statutory Directive Engine
                  </h4>
                  <p className="text-xs text-neutral-600 font-sans">
                    Prioritized legislative remedies (P1 to P4) paired with model bill text for the Washington State Procedural Due Process Act.
                  </p>
                </div>

                {/* Investigations */}
                <div 
                  onClick={() => setActiveTab('investigations')}
                  className="bg-white border border-black/10 hover:border-black/30 p-5 rounded-lg transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#E53935] mb-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>INVESTIGATIVE JOURNALISM</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 font-sans mb-1">
                    Special Investigative Series 01–04
                  </h4>
                  <p className="text-xs text-neutral-600 font-sans">
                    Examining officer anonymity vs. civilian surveillance, the 1,300-day discovery void, and the Midvale Ave N property cluster.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: EVIDENCE VAULT */}
        {activeTab === 'vault' && (
          <EvidenceVault
            onOpenCSFModal={() => setIsCSFModalOpen(true)}
            selectedCaseNumber={selectedCaseNumber}
            onSelectCaseNumber={(no) => setSelectedCaseNumber(no)}
          />
        )}

        {/* VIEW: INTERACTIVE TIMELINE */}
        {activeTab === 'timeline' && (
          <InteractiveTimeline
            onSelectCase={handleSelectCase}
            onOpenCSFModal={() => setIsCSFModalOpen(true)}
          />
        )}

        {/* VIEW: SYSTEMS NETWORK MAP (SNA) */}
        {activeTab === 'network' && (
          <SystemsNetworkMap onSelectCase={handleSelectCase} />
        )}

        {/* VIEW: DIAGNOSTIC MODELS */}
        {activeTab === 'models' && (
          <TheoreticalModels />
        )}

        {/* VIEW: REFORM MATRIX */}
        {activeTab === 'reforms' && (
          <ReformMatrix />
        )}

        {/* VIEW: INVESTIGATIVE SERIES */}
        {activeTab === 'investigations' && (
          <InvestigativeSeries onSelectCase={handleSelectCase} />
        )}

        {/* VIEW: JUNE 2026 CIVIL ACTION */}
        {activeTab === 'civilAction' && (
          <CivilActionHub onOpenSecurePortal={() => setIsSecurePortalOpen(true)} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white py-10 text-xs font-mono-code text-neutral-600">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#E53935]" />
                <span className="font-bold text-neutral-900 text-sm">DEMOPOCRISY</span>
                <span className="text-neutral-400">·</span>
                <span className="text-neutral-600">Forensic Laboratory & Archive</span>
              </div>
              <p className="text-neutral-500 text-[11px] font-sans max-w-xl">
                Auditing Systemic Discrepancy, Procedural Due Process, and Medicalized Custody in King County, Washington (2021–2026).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <button
                onClick={() => setIsSecurePortalOpen(true)}
                className="text-neutral-900 hover:text-[#E53935] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3 h-3 text-[#E53935]" />
                <span>Client Document Portal</span>
              </button>

              <button
                onClick={() => setIsWhistleblowerOpen(true)}
                className="text-neutral-900 hover:text-[#E53935] font-semibold cursor-pointer"
              >
                Submit Evidence
              </button>

              <button
                onClick={() => setIsDiscrepancyModalOpen(true)}
                className="text-neutral-900 hover:text-[#E53935] font-semibold cursor-pointer"
              >
                D̄ Index: 89.75
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-neutral-500">
            <div>
              CONFIDENTIAL — FOR LEGAL, ACADEMIC & ADVOCACY RESEARCH ONLY
            </div>
            <div className="flex items-center gap-3">
              <span>Repository Source: sjlozenich-1126/Demopocrisy-Repository-</span>
              <span>·</span>
              <span>Leavey Competency Evaluation Certified (Feb 2026)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <DiscrepancyModal
        isOpen={isDiscrepancyModalOpen}
        onClose={() => setIsDiscrepancyModalOpen(false)}
        onSelectCase={handleSelectCase}
      />

      <CSFModal
        isOpen={isCSFModalOpen}
        onClose={() => setIsCSFModalOpen(false)}
      />

      <SecureClientPortal
        isOpen={isSecurePortalOpen}
        onClose={() => setIsSecurePortalOpen(false)}
      />

      <WhistleblowerModal
        isOpen={isWhistleblowerOpen}
        onClose={() => setIsWhistleblowerOpen(false)}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onOpenCSFModal={() => setIsCSFModalOpen(true)}
      />
    </div>
  );
}
