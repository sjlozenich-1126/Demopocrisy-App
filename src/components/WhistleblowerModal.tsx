import React, { useState } from 'react';
import { X, UploadCloud, Shield, CheckCircle2, Lock, FileText, AlertTriangle } from 'lucide-react';

interface WhistleblowerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhistleblowerModal: React.FC<WhistleblowerModalProps> = ({ isOpen, onClose }) => {
  const [evidenceType, setEvidenceType] = useState('CAD Dispatch Audio / Radio Logs');
  const [jurisdiction, setJurisdiction] = useState('Seattle Police Department / King County');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [stripMetadata, setStripMetadata] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const receiptHash = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setSubmissionReceipt(`DEMOPOCRISY-VAULT-${receiptHash.toUpperCase()}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setDescription('');
    setFileName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-[#F9F9F9] border border-black/20 rounded-lg max-w-xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#E53935]/10 text-[#E53935] flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono-code text-neutral-900 leading-tight">
                Secure Whistleblower Evidence Ingestion Drop
              </h3>
              <p className="text-xs text-neutral-500 font-mono-code">
                Encrypted Submission Portal · Dispatch Audio, Unfiled Bookings & Records
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs font-mono-code">
            <div className="p-3 bg-neutral-100 rounded border border-black/5 flex items-start gap-2.5 text-neutral-700">
              <Shield className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
              <div className="text-[11px] font-sans leading-relaxed">
                <strong>Anonymity Guarantee:</strong> Submissions are processed through client-side memory. All EXIF metadata, client IP headers, and device fingerprints are automatically stripped prior to repository cataloging.
              </div>
            </div>

            <div>
              <label className="block text-neutral-700 uppercase font-semibold mb-1">
                Category of Evidence:
              </label>
              <select
                value={evidenceType}
                onChange={(e) => setEvidenceType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-black/15 rounded text-neutral-900 focus:outline-none focus:border-[#E53935]"
              >
                <option value="CAD Dispatch Audio / Radio Logs">CAD Dispatch Audio / 911 Radio Recording</option>
                <option value="Unfiled Booking or Custodial Intake">Unfiled Booking / Jail Intake Log</option>
                <option value="Medical or Psychiatric Chart Override">Hospital Chart / CSF Lab Override Record</option>
                <option value="Court Docket or Pre-Signed Order">Court Docket / Pre-Signed Order Form</option>
                <option value="Agency Whistleblower Affidavit">Sworn Law Enforcement / Agency Whistleblower Memo</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-700 uppercase font-semibold mb-1">
                Implicated Institutional Node:
              </label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-black/15 rounded text-neutral-900 focus:outline-none focus:border-[#E53935]"
              >
                <option value="Seattle Police Department">Seattle Police Department (SPD)</option>
                <option value="King County Jail (DAJD)">King County Jail / Dept of Adult & Juvenile Detention</option>
                <option value="Harborview Medical Center">Harborview Medical Center</option>
                <option value="Western State Hospital">Western State Hospital</option>
                <option value="Seattle Municipal Court">Seattle Municipal Court (SMC)</option>
                <option value="King County Superior Court">King County Superior Court (KCSC)</option>
                <option value="SCIDpda Housing Management">SCIDpda / Bush Hotel Housing Authority</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-700 uppercase font-semibold mb-1">
                Evidence Summary & Authentication Notes:
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail date, badge numbers, CAD call incident numbers, or procedural anomalies..."
                className="w-full px-3 py-2 bg-white border border-black/15 rounded text-neutral-900 focus:outline-none focus:border-[#E53935]"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="strip-meta"
                checked={stripMetadata}
                onChange={(e) => setStripMetadata(e.target.checked)}
                className="accent-[#E53935]"
              />
              <label htmlFor="strip-meta" className="text-neutral-700 cursor-pointer">
                Scrub document timestamps, GPS tags, and device identifiers (Recommended)
              </label>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#E53935] hover:bg-[#c62828] text-white font-bold rounded transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypt & Transmit Evidence</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold font-mono-code text-neutral-900">
              Evidence Stamped & Ingested into Counter-Archive
            </h4>
            <p className="text-xs text-neutral-600 font-sans max-w-md mx-auto">
              Your submission has been cryptographically cataloged. Save your verification receipt code below for independent provenance verification.
            </p>
            <div className="p-3 bg-neutral-100 rounded border border-black/10 font-mono-code text-xs text-neutral-900 font-bold select-all">
              {submissionReceipt}
            </div>
            <div className="pt-4 flex items-center justify-center gap-3 text-xs font-mono-code">
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded cursor-pointer"
              >
                Submit Another Record
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-neutral-900 hover:bg-black text-white font-semibold rounded cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
