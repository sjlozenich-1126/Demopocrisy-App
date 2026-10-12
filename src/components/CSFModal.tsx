import React from 'react';
import { X, AlertOctagon, CheckCircle2, ShieldAlert, FileText, FlaskConical, Pill } from 'lucide-react';
import { CSF_LAB_AUDIT_DATA } from '../data/forensicAnalysisData';

interface CSFModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDocument?: (docId: string) => void;
}

export const CSFModal: React.FC<CSFModalProps> = ({ isOpen, onClose, onOpenDocument }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-[#F9F9F9] border border-black/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-black/10 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#E53935]/10 text-[#E53935] flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono-code text-neutral-900 leading-tight">
                Harborview CSF Spinal Fluid Audit & Clinical Discordance
              </h2>
              <p className="text-xs text-neutral-500 font-mono-code">
                Harborview Medical Research Center · March 27 – April 7, 2021 · Case No. 658959
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
          {/* Key Forensic Finding Callout */}
          <div className="bg-red-50/70 border border-[#E53935]/30 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <AlertOctagon className="w-5 h-5 text-[#E53935] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold font-mono-code text-[#E53935] uppercase tracking-wider mb-1">
                  Primary Forensic Finding: Acute Diagnostic Contradiction
                </h3>
                <p className="text-xs text-neutral-800 leading-relaxed font-sans">
                  The hospital justified a 22-day involuntary psychiatric and infectious disease hold on a working diagnosis of <em>neurosyphilis</em> and <em>psychosis</em>. However, the cerebrospinal fluid (CSF) cell differential showed <strong>87 nucleated cells with 95% neutrophils</strong>. Neurosyphilis classically presents with <strong>lymphocytic predominance</strong>. Neutrophilic predominance indicates bacterial meningitis or traumatic tap—yet glucose was completely normal (62 mg/dL) and cultures were negative.
                </p>
                <div className="mt-3 p-2.5 bg-white/80 rounded border border-black/5 text-[11px] font-mono-code text-neutral-700">
                  <span className="font-semibold text-neutral-900">LAB’S OWN WARNING:</span> “Detection of antibodies in the CSF may suggest CNS infection. However, these results are unable to distinguish between intrathecal antibodies and serum antibodies introduced into the CSF at the time of lumbar puncture or from blood-brain barrier breakdown.”
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Lab Differential Table */}
          <div className="bg-white border border-black/10 rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <span className="text-xs font-bold font-mono-code uppercase text-neutral-900">
                CSF & Serology Parameter Comparison Matrix
              </span>
              <span className="text-[11px] font-mono-code text-neutral-500">10 Parameters Audited</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono-code">
                <thead>
                  <tr className="bg-neutral-50 border-b border-black/10 text-neutral-500 text-[11px]">
                    <th className="py-2.5 px-4 font-medium">TEST / PARAMETER</th>
                    <th className="py-2.5 px-4 font-medium">PATIENT RESULT</th>
                    <th className="py-2.5 px-4 font-medium">CLINICAL REFERENCE NORM</th>
                    <th className="py-2.5 px-4 font-medium">CONCORDANCE EVALUATION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-neutral-800">
                  {CSF_LAB_AUDIT_DATA.diagnosticFlags.map((flag, idx) => {
                    const isSevere = flag.matchStatus.includes('Discordance') || flag.matchStatus.includes('Mismatch') || flag.matchStatus.includes('Inflation');
                    return (
                      <tr key={idx} className={isSevere ? 'bg-red-50/40' : 'hover:bg-neutral-50/60'}>
                        <td className="py-2.5 px-4 font-semibold text-neutral-900">{flag.parameter}</td>
                        <td className="py-2.5 px-4 font-bold text-neutral-950">{flag.value}</td>
                        <td className="py-2.5 px-4 text-neutral-500">{flag.norm}</td>
                        <td className="py-2.5 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            isSevere 
                              ? 'bg-[#E53935]/15 text-[#E53935]' 
                              : flag.matchStatus === 'Negative' 
                              ? 'bg-neutral-100 text-neutral-700' 
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {flag.matchStatus}
                          </span>
                          <span className="block text-[10px] text-neutral-500 mt-0.5 font-sans leading-tight">
                            {flag.note}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Forced Medications Table */}
          <div className="bg-white border border-black/10 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Pill className="w-4 h-4 text-[#E53935]" />
              <h3 className="text-xs font-bold font-mono-code uppercase text-neutral-900">
                Administered Pharmacological Regimen & Adverse Effects
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-code divide-y divide-black/5">
                <thead>
                  <tr className="text-neutral-500 text-[11px] pb-2">
                    <th className="py-2 pr-3">MEDICATION</th>
                    <th className="py-2 pr-3">DOSAGE & ROUTE</th>
                    <th className="py-2 pr-3">CHARTED RATIONALE</th>
                    <th className="py-2">INFORMED CONSENT STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-neutral-800">
                  {CSF_LAB_AUDIT_DATA.medicationsAdministered.map((med, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/50">
                      <td className="py-2 pr-3 font-semibold text-neutral-900">{med.drug}</td>
                      <td className="py-2 pr-3 text-neutral-600">{med.dosage}</td>
                      <td className="py-2 pr-3 text-neutral-700">{med.justification}</td>
                      <td className="py-2 text-[#E53935] font-medium">{med.consent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-neutral-50 rounded border border-black/5 text-xs font-sans text-neutral-700">
              <strong className="font-semibold text-neutral-900">Documented Acute Dystonic Reaction:</strong> Following co-administration of Haloperidol 5mg and Risperdal, patient experienced involuntary limb locking, twisting neck, and abdominal spasms lasting over two hours, necessitating rescue Benztropine. No screening or voluntary consent was obtained prior to injection.
            </div>
          </div>

          {/* Legal Implications */}
          <div className="bg-white border border-black/10 rounded-lg p-5">
            <h3 className="text-xs font-bold font-mono-code uppercase text-neutral-900 mb-2">
              Systemic & Legal Implications for June 2026 Civil Action
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-700 font-sans list-disc list-inside">
              <li><strong>Medical Battery:</strong> Forced psychotropic injections and lumbar puncture administered under physical restraint without documented judicial authorization.</li>
              <li><strong>Substituted Adjudication:</strong> Harborview clinical findings were immediately accepted by Seattle Municipal Court to justify incompetency dismissal and subsequent administrative holds.</li>
              <li><strong>Apple Health Release Override:</strong> Insurer formally noted lack of medical necessity on April 5, 2021; detention continued until April 15 without reviewable order.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-100 border-t border-black/10 px-6 py-3 flex items-center justify-between text-xs font-mono-code text-neutral-600">
          <span>Evidence Citation: Harborview Medical Docs HMRC (March 27 – April 7, 2021)</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-neutral-900 hover:bg-black text-white rounded transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
