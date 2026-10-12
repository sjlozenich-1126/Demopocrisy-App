import React, { useState } from 'react';
import { CIVIL_ACTION_2026 } from '../data/forensicAnalysisData';
import { ALL_DOCUMENTS } from '../data/casesData';
import { Scale, FileText, Download, Check, ExternalLink, ShieldCheck, FileCheck, Layers } from 'lucide-react';

interface CivilActionHubProps {
  onOpenSecurePortal: () => void;
}

export const CivilActionHub: React.FC<CivilActionHubProps> = ({ onOpenSecurePortal }) => {
  const [downloadingKit, setDownloadingKit] = useState(false);
  const [kitDownloaded, setKitDownloaded] = useState(false);

  const handleDownloadPressKit = () => {
    setDownloadingKit(true);
    setTimeout(() => {
      setDownloadingKit(false);
      setKitDownloaded(true);

      // Create downloadable summary file
      const summaryContent = `DEMOPOCRISY FORENSIC SYSTEMS RESEARCH
CONSOLIDATED CIVIL LITIGATION & AUDIT KIT — JUNE 2026

Court: King County Superior Court
Case Nos: 21-1-04347-2 SEA / 22-1-04242-3 SEA
Petitioner: Shane Jonathan Lozenich
Systemic Discrepancy Index (D): 89.75 / 100

CAUSE OF ACTION 1: Due Process & Constitutional Violations (RCW 10.77 Bypass, CrR 3.3 Nullification)
CAUSE OF ACTION 2: Medical Battery & Civil Rights Infringements (Harborview Forced Meds, CSF Discordance)
CAUSE OF ACTION 3: Administrative Infrastructure & Data Failures (CAD Database Lag, Retaliatory Eviction)

RELIEF SOUGHT:
1. Declaratory judgment on constitutional breaches.
2. Permanent expungement of un-adjudicated database records.
3. Structural administrative oversight reforms.

PRIMARY DOCUMENT ARCHIVE:
- Master Report: https://drive.google.com/file/d/1NfFY_fghQjlmW6P-fMH-HdxKkUewQvX6/view?usp=drivesdk
- Network Analysis: https://drive.google.com/file/d/1hDfDkTv4oIkwytYtFo-QyoYPXRRSjx1x/view?usp=drivesdk
- Narrative Timeline: https://drive.google.com/file/d/1XYg6z1urlW-WTODQaULS86OMuAFtUT91/view?usp=drivesdk`;

      const blob = new Blob([summaryContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Demopocrisy_June2026_Civil_Action_Legal_Kit.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => setKitDownloaded(false), 4000);
    }, 800);
  };

  const keyMasterDocs = ALL_DOCUMENTS.filter(d => d.caseNumber === 'Consolidated');

  return (
    <section className="py-8 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-black/10">
          <div>
            <div className="text-xs font-mono-code text-[#E53935] uppercase font-semibold tracking-wider mb-1">
              MODULE 06 · LEGAL ACTION & CIVIL LITIGATION HUB
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-sans">
              June 2026 Consolidated Civil Action Portal
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 max-w-3xl">
              Official filings in King County Superior Court challenging the systemic convergence of no-complaint arrests, non-consensual medical transfers, and quasi-governmental immunity shields.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPressKit}
              disabled={downloadingKit}
              className="px-3.5 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-mono-code font-semibold rounded transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {kitDownloaded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-[#E53935]" />}
              <span>{kitDownloaded ? 'Kit Downloaded' : downloadingKit ? 'Packaging...' : 'Download Press & Legal Kit'}</span>
            </button>
          </div>
        </div>

        {/* Pleadings Overview Card */}
        <div className="bg-white border border-black/10 rounded-lg p-6 shadow-2xs mb-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-black/10 text-xs font-mono-code">
            <div>
              <span className="font-bold text-neutral-900 uppercase">COURT OF RECORD: </span>
              <span className="text-neutral-700">{CIVIL_ACTION_2026.court}</span>
            </div>
            <div>
              <span className="font-bold text-neutral-900 uppercase">CASE DOCKET: </span>
              <span className="text-[#E53935] font-semibold">{CIVIL_ACTION_2026.caseNumber}</span>
            </div>
            <div>
              <span className="font-bold text-neutral-900 uppercase">FILED: </span>
              <span className="text-neutral-700">{CIVIL_ACTION_2026.dateFiled}</span>
            </div>
          </div>

          {/* Causes of Action */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono-code uppercase text-neutral-900 tracking-wider">
              Three Primary Causes of Action Asserted
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CIVIL_ACTION_2026.causesOfAction.map((cause, idx) => (
                <div key={idx} className="bg-neutral-50 border border-black/10 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="font-bold text-[#E53935]">{cause.number}</span>
                    <Scale className="w-3.5 h-3.5 text-neutral-500" />
                  </div>
                  <h4 className="text-sm font-bold font-sans text-neutral-900 leading-snug">
                    {cause.title}
                  </h4>
                  <p className="text-xs text-neutral-700 font-sans leading-relaxed">
                    {cause.claims}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Relief Sought */}
          <div className="pt-4 border-t border-black/10 space-y-2">
            <h3 className="text-xs font-bold font-mono-code uppercase text-neutral-900">
              Relief Sought Under Superior Court Equity Powers:
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-800 font-sans list-disc list-inside">
              {CIVIL_ACTION_2026.reliefSought.map((relief, idx) => (
                <li key={idx} className="leading-relaxed">
                  {relief}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Master Audits & Downloads Grid */}
        <div className="bg-white border border-black/10 rounded-lg p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500">
            <span className="font-bold uppercase text-neutral-900">PRIMARY LITIGATION & AUDIT EXHIBITS</span>
            <span>Verified Source Files</span>
          </div>

          <div className="divide-y divide-black/5">
            {keyMasterDocs.map((doc) => (
              <div key={doc.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-code">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E53935] shrink-0" />
                  <div>
                    <span className="font-bold text-neutral-900">{doc.fileName}</span>
                    <span className="text-[11px] text-neutral-500 block font-sans">{doc.description}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded transition-colors flex items-center gap-1 text-xs"
                  >
                    <ExternalLink className="w-3 h-3 text-[#E53935]" />
                    <span>View Filed PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-code text-neutral-600">
            <span>Need privileged access to unredacted medical notes or witness audio logs?</span>
            <button
              onClick={onOpenSecurePortal}
              className="text-[#E53935] hover:underline font-semibold cursor-pointer"
            >
              Access Secure Client Portal →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
