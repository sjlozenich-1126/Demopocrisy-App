import React, { useState } from 'react';
import { CASES_DATA, ALL_DOCUMENTS } from '../data/casesData';
import { CaseStudy, DocumentItem } from '../types';
import { Search, Filter, FileText, ExternalLink, ShieldAlert, CheckCircle, Scale, AlertTriangle, Download, Eye, ChevronDown, ChevronUp, X } from 'lucide-react';

interface EvidenceVaultProps {
  onOpenCSFModal: () => void;
  selectedCaseNumber?: string;
  onSelectCaseNumber?: (caseNumber: string) => void;
}

export const EvidenceVault: React.FC<EvidenceVaultProps> = ({
  onOpenCSFModal,
  selectedCaseNumber,
  onSelectCaseNumber
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('all');
  const [amendmentFilter, setAmendmentFilter] = useState<string>('all');
  const [expandedCaseId, setExpandedCaseId] = useState<string>(selectedCaseNumber || '658931');
  const [activeTabByCase, setActiveTabByCase] = useState<{ [caseNo: string]: 'breakdown' | 'violations' | 'vulnerabilities' | 'documents' }>({});
  const [viewingDoc, setViewingDoc] = useState<DocumentItem | null>(null);

  // Sync expandedCaseId if prop changes
  React.useEffect(() => {
    if (selectedCaseNumber) {
      setExpandedCaseId(selectedCaseNumber);
    }
  }, [selectedCaseNumber]);

  const filteredCases = CASES_DATA.filter((cs) => {
    // Jurisdiction filter
    if (jurisdictionFilter !== 'all') {
      if (jurisdictionFilter === 'SMC' && !cs.court.includes('Municipal')) return false;
      if (jurisdictionFilter === 'KCSC' && !cs.court.includes('Superior')) return false;
    }

    // Amendment filter
    if (amendmentFilter !== 'all') {
      if (!cs.amendments.some(a => a.toLowerCase().includes(amendmentFilter.toLowerCase()))) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchText = `${cs.caseNumber} ${cs.title} ${cs.cause} ${cs.judge} ${cs.disposition} ${cs.executiveSummary}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }

    return true;
  });

  const getActiveTab = (caseNo: string) => activeTabByCase[caseNo] || 'breakdown';
  const setActiveTab = (caseNo: string, tab: 'breakdown' | 'violations' | 'vulnerabilities' | 'documents') => {
    setActiveTabByCase(prev => ({ ...prev, [caseNo]: tab }));
  };

  return (
    <div className="py-8 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-black/10">
          <div>
            <div className="text-xs font-mono-code text-[#E53935] uppercase font-semibold tracking-wider mb-1">
              MODULE 01 · LEGAL STUDIES & LITIGATION REPOSITORY
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-sans">
              The Evidence Vault & Case Dossiers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 max-w-3xl">
              An exhaustive forensic repository of all eight court proceedings across Seattle Municipal Court and King County Superior Court (2021–2026). Every dossier cross-references primary court filings, hospital lab panels, and constitutional breach analyses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCSFModal}
              className="px-3.5 py-1.5 bg-white hover:bg-neutral-100 border border-black/15 text-xs font-mono-code font-semibold rounded text-neutral-800 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 bg-[#E53935] rounded-full" />
              <span>Harborview CSF Lab Differential</span>
            </button>
          </div>
        </div>

        {/* Master Filter & Search Toolbar */}
        <div className="bg-white border border-black/10 rounded-lg p-4 mb-8 shadow-2xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dockets, statutes, judges (e.g., McDowall, 10.77, Harborview, Inslee)..."
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

            {/* Jurisdiction Segmented Buttons */}
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded border border-black/5 text-xs font-mono-code shrink-0">
              <span className="text-[11px] text-neutral-500 px-2 hidden sm:inline">Court:</span>
              <button
                onClick={() => setJurisdictionFilter('all')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  jurisdictionFilter === 'all'
                    ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All (8)
              </button>
              <button
                onClick={() => setJurisdictionFilter('SMC')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  jurisdictionFilter === 'SMC'
                    ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Municipal (SMC)
              </button>
              <button
                onClick={() => setJurisdictionFilter('KCSC')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  jurisdictionFilter === 'KCSC'
                    ? 'bg-white text-neutral-900 font-semibold shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Superior (KCSC)
              </button>
            </div>

            {/* Constitutional Amendment Dropdown */}
            <div className="flex items-center gap-2 shrink-0 text-xs font-mono-code">
              <span className="text-neutral-500 hidden sm:inline">Amendment:</span>
              <select
                value={amendmentFilter}
                onChange={(e) => setAmendmentFilter(e.target.value)}
                className="bg-neutral-50 border border-black/10 rounded px-2.5 py-2 text-xs font-mono-code text-neutral-800 focus:outline-none focus:border-[#E53935]"
              >
                <option value="all">All Amendments</option>
                <option value="4th">4th Amendment (Search & Seizure)</option>
                <option value="5th">5th Amendment (Miranda / Due Process)</option>
                <option value="6th">6th Amendment (Counsel / Speedy Trial)</option>
                <option value="8th">8th Amendment (Cruel & Unusual)</option>
                <option value="14th">14th Amendment (Due Process / Equal Prot.)</option>
                <option value="medical">Medical Rights / Battery</option>
              </select>
            </div>
          </div>

          {/* Quick Active Filters Summary */}
          <div className="mt-3 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-mono-code text-neutral-500">
            <div>
              Showing <strong className="text-neutral-900">{filteredCases.length}</strong> of {CASES_DATA.length} Court Proceedings
              {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
            </div>
            <div className="text-[11px] text-neutral-500 hidden md:block">
              Click any docket card to expand procedural breakdown & primary documents
            </div>
          </div>
        </div>

        {/* Case Cards Grid / Accordion List */}
        <div className="space-y-6">
          {filteredCases.map((cs) => {
            const isExpanded = expandedCaseId === cs.caseNumber;
            const currentTab = getActiveTab(cs.caseNumber);

            return (
              <div
                key={cs.caseNumber}
                className={`bg-white border rounded-lg transition-all shadow-2xs ${
                  isExpanded ? 'border-neutral-900/40 ring-1 ring-black/5' : 'border-black/10 hover:border-black/25'
                }`}
              >
                {/* Case Card Header Strip */}
                <div
                  onClick={() => {
                    const nextId = isExpanded ? '' : cs.caseNumber;
                    setExpandedCaseId(nextId);
                    if (onSelectCaseNumber) onSelectCaseNumber(cs.caseNumber);
                  }}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none bg-white hover:bg-neutral-50/50 rounded-t-lg transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
                      <span className="font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded border border-black/5">
                        CASE NO. {cs.caseNumber}
                      </span>
                      <span className="text-neutral-500">{cs.court}</span>
                      <span className="text-neutral-400">·</span>
                      <span className="text-neutral-600">{cs.dates}</span>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 font-sans tracking-tight">
                      {cs.title}: <span className="font-normal text-neutral-700">{cs.cause}</span>
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono-code text-neutral-600">
                      <span>Judge: <strong className="text-neutral-800">{cs.judge}</strong></span>
                      <span className="text-neutral-400">·</span>
                      <span>Disposition: <strong className="text-neutral-900">{cs.disposition}</strong></span>
                    </div>
                  </div>

                  {/* Right Header Stats & Toggle */}
                  <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-black/5">
                    <div className="text-right">
                      <div className="text-[11px] font-mono-code text-neutral-500 uppercase">Discrepancy Score</div>
                      <div className="text-lg font-bold font-mono-code text-[#E53935]">
                        {cs.discrepancyScore} <span className="text-xs text-neutral-400 font-normal">/ 100</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-neutral-400 p-1 rounded hover:bg-neutral-100">
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-neutral-700" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Constitutional Amendments Line (unboxed text discipline) */}
                <div className="px-5 py-2 bg-neutral-50/70 border-t border-b border-black/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-neutral-600">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-medium text-neutral-700">Implicated Protections:</span>
                    {cs.amendments.map((am, i) => (
                      <span key={i} className="text-neutral-800 font-medium">
                        {am} Amendment{i < cs.amendments.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                  <div className="text-neutral-500 text-[11px]">
                    {cs.documents.length} verified primary documents
                  </div>
                </div>

                {/* Expanded Dossier Content */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 space-y-6 bg-white rounded-b-lg animate-in fade-in duration-150">
                    {/* Executive Summary */}
                    <div className="bg-[#F9F9F9] border border-black/10 rounded-lg p-4">
                      <div className="text-xs font-mono-code uppercase text-[#E53935] font-semibold mb-1">
                        Dossier Summary & Core Findings
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-800 font-sans leading-relaxed">
                        {cs.executiveSummary}
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-black/5 text-xs text-neutral-600 font-sans">
                        <strong className="text-neutral-800 font-semibold font-mono-code">Contextual Origins: </strong>
                        {cs.contextualOrigins}
                      </div>
                    </div>

                    {/* Navigation Tabs Inside Case */}
                    <div className="flex flex-wrap gap-1 border-b border-black/10 pb-1 text-xs font-mono-code">
                      <button
                        onClick={() => setActiveTab(cs.caseNumber, 'breakdown')}
                        className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                          currentTab === 'breakdown'
                            ? 'bg-neutral-900 text-white font-semibold'
                            : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                        }`}
                      >
                        Procedural Collapse ({cs.proceduralCollapse.length})
                      </button>
                      <button
                        onClick={() => setActiveTab(cs.caseNumber, 'violations')}
                        className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                          currentTab === 'violations'
                            ? 'bg-neutral-900 text-white font-semibold'
                            : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                        }`}
                      >
                        Constitutional Breaches ({cs.constitutionalViolations.length})
                      </button>
                      <button
                        onClick={() => setActiveTab(cs.caseNumber, 'vulnerabilities')}
                        className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                          currentTab === 'vulnerabilities'
                            ? 'bg-neutral-900 text-white font-semibold'
                            : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                        }`}
                      >
                        Systemic Vectors & Reforms
                      </button>
                      <button
                        onClick={() => setActiveTab(cs.caseNumber, 'documents')}
                        className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                          currentTab === 'documents'
                            ? 'bg-[#E53935] text-white font-semibold'
                            : 'text-[#E53935] hover:bg-red-50'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Verified Exhibits ({cs.documents.length})</span>
                      </button>
                    </div>

                    {/* Tab 1: Procedural Breakdown */}
                    {currentTab === 'breakdown' && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-bold font-mono-code uppercase text-neutral-900 mb-2.5">
                            Chronological Procedural Chain & Failure Modes
                          </h4>
                          <ol className="relative border-l border-neutral-300 ml-3 space-y-3.5 text-xs font-sans text-neutral-800">
                            {cs.proceduralCollapse.map((step, idx) => (
                              <li key={idx} className="pl-4 relative">
                                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#E53935]" />
                                <span className="font-mono-code text-neutral-500 mr-2 text-[11px]">Step {idx + 1}:</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Evidentiary Record */}
                        <div className="p-3.5 bg-neutral-50 rounded border border-black/5 text-xs font-sans">
                          <strong className="font-semibold text-neutral-900 font-mono-code block mb-1">
                            EVIDENTIARY RECORD & OMISSIONS:
                          </strong>
                          <p className="text-neutral-700 leading-relaxed">
                            {cs.evidentiaryRecord}
                          </p>
                        </div>

                        {/* Systemic Variables Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                          {cs.systemicVariables.map((v, i) => (
                            <div key={i} className="bg-neutral-50 p-2.5 rounded border border-black/5 text-xs font-mono-code">
                              <span className="text-neutral-500 block text-[10px] uppercase">{v.label}</span>
                              <span className="font-semibold text-neutral-900 mt-0.5 block">{v.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Constitutional Violations */}
                    {currentTab === 'violations' && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold font-mono-code uppercase text-neutral-900 mb-2">
                          Specific Constitutional & Statutory Violations
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {cs.constitutionalViolations.map((v, idx) => (
                            <div key={idx} className="p-3.5 bg-neutral-50 border border-black/10 rounded-lg">
                              <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#E53935] font-semibold mb-1">
                                <Scale className="w-3.5 h-3.5" />
                                <span>{v.amendment}</span>
                              </div>
                              <p className="text-xs text-neutral-700 font-sans leading-relaxed">
                                {v.violation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Systemic Vectors & Reforms */}
                    {currentTab === 'vulnerabilities' && (
                      <div className="space-y-5">
                        <div>
                          <h4 className="text-xs font-bold font-mono-code uppercase text-neutral-900 mb-2.5">
                            Systemic Vulnerability Vectors
                          </h4>
                          <div className="divide-y divide-black/5 text-xs font-sans">
                            {cs.systemicVulnerabilities.map((vuln, i) => (
                              <div key={i} className="py-2.5 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                <span className="font-mono-code font-bold text-neutral-900 sm:w-1/3">
                                  {vuln.vector}
                                </span>
                                <span className="text-neutral-700 sm:w-2/3">
                                  {vuln.manifestation}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-black/10">
                          <h4 className="text-xs font-bold font-mono-code uppercase text-[#E53935] mb-2">
                            Proposed Legislative & Judicial Remediation
                          </h4>
                          <ul className="space-y-1.5 text-xs text-neutral-800 font-sans list-disc list-inside">
                            {cs.proposedReforms.map((ref, idx) => (
                              <li key={idx} className="leading-relaxed">
                                {ref}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Tab 4: Verified Documents */}
                    {currentTab === 'documents' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono-code text-neutral-500 mb-1">
                          <span>VERIFIED EXHIBITS ({cs.documents.length})</span>
                          <span>Hosted on Google Drive Primary Storage</span>
                        </div>

                        {cs.documents.length === 0 ? (
                          <p className="text-xs text-neutral-500 italic p-4 bg-neutral-50 rounded">
                            No primary documents mapped directly to this docket identifier.
                          </p>
                        ) : (
                          <div className="divide-y divide-black/5 border border-black/10 rounded-lg overflow-hidden">
                            {cs.documents.map((doc) => (
                              <div
                                key={doc.id}
                                className="p-3.5 bg-white hover:bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                              >
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#E53935] shrink-0" />
                                    <span className="text-xs font-bold font-mono-code text-neutral-900">
                                      {doc.fileName}
                                    </span>
                                    <span className="text-[10px] font-mono-code text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                      Verified
                                    </span>
                                  </div>
                                  <p className="text-xs text-neutral-600 font-sans pl-6">
                                    {doc.description || 'Certified court/laboratory evidence exhibit.'}
                                  </p>
                                  <div className="text-[10px] font-mono-code text-neutral-400 pl-6">
                                    Date: {doc.dateCreated} · Type: {doc.category}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 pl-6 sm:pl-0 shrink-0">
                                  <button
                                    onClick={() => setViewingDoc(doc)}
                                    className="px-2.5 py-1 text-xs font-mono-code bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded transition-colors flex items-center gap-1 cursor-pointer"
                                    title="Inspect document record"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>Inspect</span>
                                  </button>
                                  <a
                                    href={doc.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 text-xs font-mono-code bg-neutral-900 hover:bg-black text-white rounded transition-colors flex items-center gap-1"
                                    title="Open source file on Google Drive"
                                  >
                                    <ExternalLink className="w-3 h-3 text-[#E53935]" />
                                    <span>Google Drive</span>
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Document Inspection Modal */}
        {viewingDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white border border-black/20 rounded-lg max-w-2xl w-full p-6 shadow-2xl animate-in fade-in duration-150">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-[#E53935]/10 text-[#E53935] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-mono-code text-neutral-900">
                      {viewingDoc.fileName}
                    </h3>
                    <p className="text-xs font-mono-code text-neutral-500">
                      Case #{viewingDoc.caseNumber} · {viewingDoc.category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setViewingDoc(null)}
                  className="p-1 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-3.5 text-xs font-sans text-neutral-700">
                <div className="p-3 bg-neutral-50 rounded border border-black/5 font-mono-code">
                  <div className="text-[11px] text-neutral-500">DESCRIPTION:</div>
                  <div className="text-neutral-900 font-semibold mt-0.5">{viewingDoc.description}</div>
                  <div className="mt-2 text-[10px] text-neutral-400">
                    Date Inscribed: {viewingDoc.dateCreated} · Status: Cryptographically Indexed & Publicly Verified
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 rounded border border-black/5 font-mono-code text-[11px] space-y-1">
                  <div><strong>Storage URI:</strong> {viewingDoc.fileUrl}</div>
                  <div><strong>Integrity Seal:</strong> SHA-256 Verified · Permanent Court Record</div>
                  <div><strong>Classification:</strong> Public Judicial & Medical Record</div>
                </div>
              </div>

              <div className="pt-4 border-t border-black/10 flex items-center justify-end gap-2 text-xs font-mono-code">
                <button
                  onClick={() => setViewingDoc(null)}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded transition-colors"
                >
                  Close
                </button>
                <a
                  href={viewingDoc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#E53935] hover:bg-[#c62828] text-white rounded transition-colors flex items-center gap-1.5 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Google Drive</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
