import React, { useState } from 'react';
import { REFORM_MATRIX_TIERS } from '../data/forensicAnalysisData';
import { Scale, Check, Copy, Download, ShieldAlert, Sparkles, FileText, ArrowRight } from 'lucide-react';

export const ReformMatrix: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [copiedBill, setCopiedBill] = useState(false);
  const [showModelBill, setShowModelBill] = useState(false);

  const modelBillText = `WASHINGTON STATE LEGISLATURE
69th Regular Session — 2026

AN ACT Relating to procedural due process safeguards, cross-database purge synchronization, and the prevention of administrative medicalization in custodial proceedings; amending RCW 10.77.060, RCW 10.77.086, RCW 26.50.110, and RCW 39.34.030; adding a new chapter to Title 10 RCW; creating new sections; and declaring an emergency.

BE IT ENACTED BY THE LEGISLATURE OF THE STATE OF WASHINGTON:

SECTION 1. LEGISLATIVE INTENT.
The legislature finds that procedural due process requires real-time coordination between law enforcement booking systems and prosecuting attorneys. The systemic practice of custodial detention without timely criminal complaints, repetitive competency continuances that suspend CrR 3.3 speedy trial obligations, and automated custodial seizures premised on database synchronization lag undermine the constitutional rights of the citizens of Washington State.

SECTION 2. REAL-TIME BOOKING-TO-PROSECUTOR TRACKING & AUTOMATIC RELEASE.
(1) Whenever any law enforcement agency in this state books an individual into a jail or custodial holding facility for an alleged criminal offense, the booking system shall transmit an automated, real-time notification to the prosecutor intake queue.
(2) If a formal criminal complaint or probable cause information is not filed within twenty-four (24) hours of initial physical booking, the jail administrator shall trigger an automatic, immediate release of the individual without prejudice. No custodial hold may persist in the absence of active charging documents.

SECTION 3. HUMAN-IN-THE-LOOP CAD AND PROTECTIVE ORDER VERIFICATION.
(1) Prior to executing any physical custody action or tactical search premised upon an automated computer-aided dispatch (CAD) or law enforcement information system alert regarding a protective order or domestic violence no-contact order, responding officers shall execute human-in-the-loop verification of the real-time judicial docket to confirm the order has not expired or been dismissed.
(2) Contemporaneous, verified communications demonstrating consensual contact between parties shall be incorporated into the officer's field investigation prior to custodial seizure.

SECTION 4. COMPETENCY SAFEGUARDS AND SPEEDY TRIAL PRESERVATION.
(1) No court may issue an inpatient or outpatient restoration order under RCW 10.77 without a live judicial signature executed in open court in the presence of defense counsel and the defendant, supported by a timely, filed clinical evaluation. Pre-signed or template restoration orders are void as a matter of law.
(2) Orders for competency evaluation or restoration shall not toll, suspend, or reset the speedy trial clock under Superior Court Criminal Rule (CrR) 3.3 or Municipal Court Criminal Rule (CrRLJ) 3.3 beyond ninety (90) cumulative days.
(3) The state shall produce all initiating digital, audio, and physical discovery materials within thirty (30) days of arraignment. In the event of non-production of core initiating evidence, the court shall entertain immediate motions for dismissal with prejudice.

SECTION 5. INTER-AGENCY MEDICAL TRANSFERS AND INFORMED CONSENT.
(1) No individual released or dismissed from criminal-legal custody may be transferred to a medical or psychiatric facility without an express, written, reviewable judicial transfer order.
(2) Chemical restraints and psychotropic medications may not be administered without documented, voluntary informed consent or prior judicial authorization in an adversarial hearing.

SECTION 6. DECOUPLING ECONOMIC INCENTIVES FROM DETENTION VOLUME.
(1) It shall be unlawful for any municipality, county, or law enforcement agency to utilize gross detention volume, arrest metrics, or custodial throughput numbers as leverage in collective bargaining agreements, police union contract negotiations, or officer recruitment/retention bonus authorizations.
(2) An independent civilian auditing body shall review all interlocal agreements and public development authority immunity shields annually.`;

  const handleCopyBill = () => {
    navigator.clipboard.writeText(modelBillText);
    setCopiedBill(true);
    setTimeout(() => setCopiedBill(false), 2500);
  };

  const handleDownloadBill = () => {
    const element = document.createElement('a');
    const file = new Blob([modelBillText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Washington_Procedural_Due_Process_Act_2026.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="py-8 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-black/10">
          <div>
            <div className="text-xs font-mono-code text-[#E53935] uppercase font-semibold tracking-wider mb-1">
              MODULE 04 · LEGISLATIVE ADVOCACY & POLICY ENGINE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-sans">
              Failure Mode ↔ Reform Directive Matrix
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 max-w-3xl">
              Connecting measured empirical failure drivers directly to statutory remedies. Designed for legislative sponsors, judicial reform committees, and civil rights advocates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModelBill(!showModelBill)}
              className="px-3.5 py-1.5 bg-[#E53935] hover:bg-[#c62828] text-white text-xs font-mono-code font-semibold rounded transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showModelBill ? 'Hide Model Bill' : 'View Model Legislation'}</span>
            </button>
          </div>
        </div>

        {/* Model Legislation Drawer */}
        {showModelBill && (
          <div className="bg-white border-2 border-[#E53935]/30 rounded-lg p-6 mb-8 shadow-md space-y-4 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10">
              <div>
                <span className="text-[10px] font-mono-code text-[#E53935] uppercase font-bold">
                  MODEL LEGISLATIVE DRAFT · 2026 SESSION
                </span>
                <h3 className="text-base font-bold font-mono-code text-neutral-900">
                  Washington State Procedural Due Process & Database Integrity Act
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-code">
                <button
                  onClick={handleCopyBill}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedBill ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBill ? 'Copied' : 'Copy Text'}</span>
                </button>
                <button
                  onClick={handleDownloadBill}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white rounded flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#E53935]" />
                  <span>Download Draft</span>
                </button>
              </div>
            </div>

            <pre className="bg-[#FAF9F6] p-4 rounded border border-black/10 text-xs font-mono-code text-neutral-800 leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap">
              {modelBillText}
            </pre>
          </div>
        )}

        {/* Priority Tier Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs font-mono-code">
          <span className="text-neutral-500 mr-1">Filter by Tier:</span>
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-3 py-1 rounded border cursor-pointer transition-colors ${
              selectedTier === 'all'
                ? 'bg-neutral-900 border-neutral-900 text-white font-semibold'
                : 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            All Priorities (10 Directives)
          </button>
          <button
            onClick={() => setSelectedTier('P1')}
            className={`px-3 py-1 rounded border cursor-pointer transition-colors ${
              selectedTier === 'P1'
                ? 'bg-[#E53935] border-[#E53935] text-white font-semibold'
                : 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            P1 — Critical (Immediate)
          </button>
          <button
            onClick={() => setSelectedTier('P2')}
            className={`px-3 py-1 rounded border cursor-pointer transition-colors ${
              selectedTier === 'P2'
                ? 'bg-neutral-900 border-neutral-900 text-white font-semibold'
                : 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            P2 — High
          </button>
          <button
            onClick={() => setSelectedTier('P3')}
            className={`px-3 py-1 rounded border cursor-pointer transition-colors ${
              selectedTier === 'P3'
                ? 'bg-neutral-900 border-neutral-900 text-white font-semibold'
                : 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            P3 — Moderate
          </button>
          <button
            onClick={() => setSelectedTier('P4')}
            className={`px-3 py-1 rounded border cursor-pointer transition-colors ${
              selectedTier === 'P4'
                ? 'bg-purple-900 border-purple-900 text-white font-semibold'
                : 'bg-white border-black/10 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            P4 — Root Cause Gap
          </button>
        </div>

        {/* Matrix Cards By Tier */}
        <div className="space-y-6">
          {REFORM_MATRIX_TIERS.filter(tier => selectedTier === 'all' || tier.tier.startsWith(selectedTier)).map((tierGroup, idx) => (
            <div key={idx} className="bg-white border border-black/10 rounded-lg overflow-hidden shadow-2xs">
              <div 
                className="px-5 py-3 border-b flex items-center justify-between"
                style={{ backgroundColor: `${tierGroup.color}0D`, borderColor: `${tierGroup.color}30` }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tierGroup.color }} />
                  <h3 className="text-xs font-bold font-mono-code uppercase text-neutral-900">
                    {tierGroup.tier}
                  </h3>
                </div>
                <span className="text-[11px] font-mono-code text-neutral-500">
                  {tierGroup.reforms.length} Statutory {tierGroup.reforms.length === 1 ? 'Directive' : 'Directives'}
                </span>
              </div>

              <div className="divide-y divide-black/5">
                {tierGroup.reforms.map((item, rIdx) => (
                  <div key={rIdx} className="p-5 hover:bg-neutral-50/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      {/* Left: Driver & Proposed Statutory Directive */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
                          <span className="font-bold text-neutral-900">{item.title}</span>
                          <span className="text-neutral-400">·</span>
                          <span className="text-neutral-500">{item.amendments}</span>
                        </div>

                        <div className="p-2.5 bg-neutral-50 rounded border border-black/5 text-xs font-mono-code text-neutral-700">
                          <strong className="text-neutral-900 font-semibold">Empirical Failure Driver: </strong>
                          {item.driver}
                        </div>

                        <p className="text-xs sm:text-sm text-neutral-800 font-sans leading-relaxed pt-1">
                          <strong className="font-semibold text-neutral-900 font-mono-code">Statutory Remedy: </strong>
                          {item.statutoryRemedy}
                        </p>
                      </div>

                      {/* Right: Badge */}
                      <div className="shrink-0 flex items-center md:flex-col items-end gap-2 text-xs font-mono-code">
                        <span 
                          className="px-2.5 py-1 rounded text-[11px] font-semibold"
                          style={{ backgroundColor: `${tierGroup.color}15`, color: tierGroup.color }}
                        >
                          {tierGroup.tier.split('—')[0].trim()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
