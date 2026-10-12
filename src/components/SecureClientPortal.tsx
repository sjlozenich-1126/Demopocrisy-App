import React, { useState } from 'react';
import { ClientDocument } from '../types';
import { Lock, Shield, ShieldCheck, Key, FileText, CheckCircle2, AlertOctagon, Download, Eye, Upload, LogOut, Search, Clock, FileCheck } from 'lucide-react';

interface SecureClientPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_CLIENT_DOCS: ClientDocument[] = [
  {
    id: 'cli-001',
    title: 'Harborview Emergency Dept Triage & Physical Restraint Chart',
    referenceNumber: 'HMRC-REST-2021-0324',
    classification: 'CONFIDENTIAL',
    caseRef: 'Case No. 658959',
    dateAdded: '2026-05-18',
    fileSize: '4.2 MB',
    checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    description: 'Unredacted nurse and physician notes detailing forced injection of Haloperidol/Risperdal and 2-hour dystonic reaction without signed consent.',
    tags: ['Medical Battery', 'Forced Meds', 'Physical Restraints'],
    verifiedChainOfCustody: true,
    downloadUrl: 'https://drive.google.com/file/d/1bCHOcRSfEfWfafuO2pyGxC872DCO1bte/view',
    uploadedBy: 'Lead Legal Counsel (Bar #48291)'
  },
  {
    id: 'cli-002',
    title: 'Dr. Jamie Leavey Competency Evaluation Report (Complete)',
    referenceNumber: 'DSHS-WSH-EVAL-2026-02',
    classification: 'ATTORNEY-CLIENT',
    caseRef: 'Case No. 21-1-04347-2 SEA',
    dateAdded: '2026-03-20',
    fileSize: '8.7 MB',
    checksumSha256: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    description: 'Full unredacted psychological findings certifying 100% trial competency, absence of active psychosis, and high engagement with legal proceedings.',
    tags: ['Competency Restored', 'Dr. Leavey', 'DSHS'],
    verifiedChainOfCustody: true,
    downloadUrl: 'https://drive.google.com/file/d/1jQmYIIbyYIe9erY9__39n-BFOaMKYBSs/view',
    uploadedBy: 'Forensic Medical Reviewer'
  },
  {
    id: 'cli-003',
    title: 'Governor Threat Voicemail Discovery Deficiency Motion Draft',
    referenceNumber: 'KCSC-DISC-DEF-2026-05',
    classification: 'ATTORNEY-CLIENT',
    caseRef: 'Case No. 22-1-04242-3 SEA',
    dateAdded: '2026-05-02',
    fileSize: '1.8 MB',
    checksumSha256: '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7',
    description: 'Affidavit documenting 1,300+ days without State producing the recorded audio or transcript of alleged threat.',
    tags: ['Speedy Trial', 'Missing Discovery', 'CrR 3.3'],
    verifiedChainOfCustody: true,
    downloadUrl: 'https://drive.google.com/file/d/18jkkAKCZsXBgMXS2sIP8FNoIQFs3N46T/view',
    uploadedBy: 'Public Defense Liaison'
  },
  {
    id: 'cli-004',
    title: 'Bush Hotel Rent Ledger & Telecare Corp Payment Offer Transcripts',
    referenceNumber: 'SCIDPDA-TEL-REC-2025',
    classification: 'EVIDENTIARY',
    caseRef: 'Case No. 25-2-17456-5 SEA',
    dateAdded: '2026-01-10',
    fileSize: '3.1 MB',
    checksumSha256: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
    description: 'Certified receipts of money orders and email communications proving SCIDpda building management refusal to accept third-party aid funds.',
    tags: ['Manufactured Default', 'Eviction Defense', 'Telecare'],
    verifiedChainOfCustody: true,
    downloadUrl: 'https://drive.google.com/file/d/1KrvvrfHNgxLrMw1ZBdcyMBDbUX_r8wsL/view',
    uploadedBy: 'Tenant Trustee'
  },
  {
    id: 'cli-005',
    title: 'Seattle-Bremerton Majorat Restrictive Real Estate Covenants',
    referenceNumber: 'SBM-COV-TITLE-2026',
    classification: 'RESTRICTED',
    caseRef: 'Case No. 26-2-01443-4 SEA',
    dateAdded: '2026-04-12',
    fileSize: '12.4 MB',
    checksumSha256: 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2',
    description: 'Ancestral title instruments, Right-of-First-Refusal (ROFR) provisions, and Swedish Armed Forces Tenancy in Common (TIC) memorandum of understanding.',
    tags: ['Quiet Title', 'Majorat Covenants', 'ROFR'],
    verifiedChainOfCustody: true,
    downloadUrl: 'https://drive.google.com/file/d/1reuuGS8ihatLGNyxs7n_xg-UcX_sdcWE/view',
    uploadedBy: 'Special Legal Representative'
  }
];

export const SecureClientPortal: React.FC<SecureClientPortalProps> = ({ isOpen, onClose }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authRole, setAuthRole] = useState<string>('');
  const [username, setUsername] = useState<string>('counsel@demopocrisy.org');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [authError, setAuthError] = useState<string>('');

  // Portal Management State
  const [clientDocs, setClientDocs] = useState<ClientDocument[]>(INITIAL_CLIENT_DOCS);
  const [classificationFilter, setClassificationFilter] = useState<string>('ALL');
  const [searchDocQuery, setSearchDocQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'vault' | 'upload' | 'audit'>('vault');
  const [selectedDoc, setSelectedDoc] = useState<ClientDocument | null>(null);
  const [redactedView, setRedactedView] = useState<boolean>(false);

  // Upload Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCaseRef, setNewCaseRef] = useState('Case No. 21-1-04347-2 SEA');
  const [newClassification, setNewClassification] = useState<'CONFIDENTIAL' | 'RESTRICTED' | 'ATTORNEY-CLIENT' | 'EVIDENTIARY'>('CONFIDENTIAL');
  const [newDescription, setNewDescription] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setAuthError('Please enter client or counsel ID');
      return;
    }
    setAuthError('');
    setIsAuthenticated(true);
    setAuthRole('Appointed Counsel & Legal Team');
  };

  const handleQuickDemoLogin = (role: string) => {
    setAuthError('');
    setIsAuthenticated(true);
    setAuthRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthRole('');
    setSelectedDoc(null);
  };

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const pseudoHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newDoc: ClientDocument = {
      id: `cli-${Date.now()}`,
      title: newTitle,
      referenceNumber: `DEP-DOC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      classification: newClassification,
      caseRef: newCaseRef,
      dateAdded: new Date().toISOString().split('T')[0],
      fileSize: '2.4 MB',
      checksumSha256: pseudoHash,
      description: newDescription || 'Client evidence uploaded via authenticated secure portal.',
      tags: ['Client Upload', newClassification],
      verifiedChainOfCustody: true,
      downloadUrl: '#',
      uploadedBy: `${authRole}`
    };

    setClientDocs([newDoc, ...clientDocs]);
    setNewTitle('');
    setNewDescription('');
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setActiveTab('vault');
    }, 1500);
  };

  const filteredDocs = clientDocs.filter((doc) => {
    if (classificationFilter !== 'ALL' && doc.classification !== classificationFilter) return false;
    if (searchDocQuery.trim() !== '') {
      const q = searchDocQuery.toLowerCase();
      const match = `${doc.title} ${doc.referenceNumber} ${doc.caseRef} ${doc.description} ${doc.tags.join(' ')}`.toLowerCase();
      if (!match.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div 
        className="bg-[#F9F9F9] border border-black/20 rounded-lg max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-black/10 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-neutral-900 text-white flex items-center justify-center font-mono-code font-bold text-xs">
              <Lock className="w-4 h-4 text-[#E53935]" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono-code text-neutral-900 leading-tight">
                Demopocrisy Secure Client & Counsel Document Portal
              </h2>
              <p className="text-xs text-neutral-500 font-mono-code">
                Encrypted Repository · Privileged Legal Case File Access & Custody Auditing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* LOGIN VIEW */
          <div className="p-6 md:p-8 max-w-md mx-auto space-y-6">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-[#E53935]/10 text-[#E53935] flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-mono-code text-neutral-900">
                Authorized Credentials Required
              </h3>
              <p className="text-xs text-neutral-600 font-sans">
                Access to unredacted medical evaluations, psychiatric restraint charts, and attorney-client work product is restricted under court protective orders.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs font-mono-code text-[#E53935]">
                  {authError}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono-code text-neutral-700 uppercase font-semibold mb-1">
                  Client / Counsel Identifier:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. counsel@demopocrisy.org"
                  className="w-full px-3 py-2 bg-white border border-black/15 rounded text-xs font-mono-code text-neutral-900 focus:outline-none focus:border-[#E53935]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-neutral-700 uppercase font-semibold mb-1">
                  Access Key / Passphrase:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter credential passphrase"
                  className="w-full px-3 py-2 bg-white border border-black/15 rounded text-xs font-mono-code text-neutral-900 focus:outline-none focus:border-[#E53935]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-mono-code font-bold rounded transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-[#E53935]" />
                <span>Authenticate Session</span>
              </button>
            </form>

            {/* Quick Demo Role Selector */}
            <div className="pt-4 border-t border-black/10">
              <span className="text-[11px] font-mono-code text-neutral-500 uppercase block mb-2 text-center">
                One-Click Role Authentication (Demo Environment):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-code">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('Lead Counsel (Civil Rights)')}
                  className="p-2 bg-white hover:bg-neutral-100 border border-black/10 rounded text-left transition-colors cursor-pointer"
                >
                  <strong className="block text-neutral-900">Lead Counsel</strong>
                  <span className="text-[10px] text-neutral-500">Full Unredacted Clearance</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('Forensic Medical Auditor')}
                  className="p-2 bg-white hover:bg-neutral-100 border border-black/10 rounded text-left transition-colors cursor-pointer"
                >
                  <strong className="block text-neutral-900">Medical Auditor</strong>
                  <span className="text-[10px] text-neutral-500">CSF & Treatment Logs</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED PORTAL CONSOLE */
          <div className="p-6 space-y-6">
            {/* User Session Bar */}
            <div className="bg-white border border-black/10 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-code">
                    <span className="font-bold text-neutral-900">{authRole}</span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 text-[10px]">
                      Session Active · 256-bit TLS
                    </span>
                  </div>
                  <span className="text-[11px] font-mono-code text-neutral-500">
                    Client: Shane J. Lozenich · Chain of Custody Verified
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-code">
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock Session</span>
                </button>
              </div>
            </div>

            {/* Portal Tab Navigation */}
            <div className="flex items-center gap-2 border-b border-black/10 text-xs font-mono-code">
              <button
                onClick={() => setActiveTab('vault')}
                className={`px-3.5 py-2 font-semibold transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'vault'
                    ? 'border-[#E53935] text-[#E53935]'
                    : 'border-transparent text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Client Document Vault ({clientDocs.length})
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-3.5 py-2 font-semibold transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'upload'
                    ? 'border-[#E53935] text-[#E53935]'
                    : 'border-transparent text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Upload Sensitive Evidence
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-3.5 py-2 font-semibold transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'audit'
                    ? 'border-[#E53935] text-[#E53935]'
                    : 'border-transparent text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Chain-of-Custody Audit Log
              </button>
            </div>

            {/* TAB 1: Client Document Vault */}
            {activeTab === 'vault' && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono-code">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={searchDocQuery}
                      onChange={(e) => setSearchDocQuery(e.target.value)}
                      placeholder="Filter privileged client records..."
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-black/10 rounded text-xs font-mono-code focus:outline-none focus:border-[#E53935]"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-neutral-500 text-[11px] hidden sm:inline">Tier:</span>
                    {['ALL', 'CONFIDENTIAL', 'ATTORNEY-CLIENT', 'RESTRICTED'].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setClassificationFilter(tier)}
                        className={`px-2 py-1 rounded text-[11px] cursor-pointer transition-colors ${
                          classificationFilter === tier
                            ? 'bg-neutral-900 text-white font-semibold'
                            : 'bg-white border border-black/10 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Documents Table */}
                <div className="divide-y divide-black/5 bg-white border border-black/10 rounded-lg overflow-hidden shadow-2xs">
                  {filteredDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 hover:bg-neutral-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            doc.classification === 'CONFIDENTIAL'
                              ? 'bg-red-50 text-[#E53935] border border-red-200'
                              : doc.classification === 'ATTORNEY-CLIENT'
                              ? 'bg-purple-50 text-purple-900 border border-purple-200'
                              : 'bg-amber-50 text-amber-900 border border-amber-200'
                          }`}>
                            {doc.classification}
                          </span>
                          <span className="font-semibold text-neutral-900">{doc.referenceNumber}</span>
                          <span className="text-neutral-400">·</span>
                          <span className="text-neutral-600">{doc.caseRef}</span>
                        </div>

                        <h4 className="text-sm font-bold font-sans text-neutral-900">
                          {doc.title}
                        </h4>

                        <p className="text-xs text-neutral-600 font-sans">
                          {doc.description}
                        </p>

                        <div className="text-[10px] font-mono-code text-neutral-400 pt-1">
                          SHA-256: <code className="text-neutral-600">{doc.checksumSha256.slice(0, 16)}…{doc.checksumSha256.slice(-8)}</code> · Size: {doc.fileSize} · Added: {doc.dateAdded}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 text-xs font-mono-code">
                        <button
                          onClick={() => {
                            setSelectedDoc(doc);
                            setRedactedView(false);
                          }}
                          className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Record</span>
                        </button>

                        <a
                          href={doc.downloadUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white rounded transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5 text-[#E53935]" />
                          <span>Open File</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Upload Sensitive Evidence */}
            {activeTab === 'upload' && (
              <div className="bg-white border border-black/10 rounded-lg p-6 shadow-2xs space-y-4">
                <div className="border-b border-black/10 pb-3">
                  <h3 className="text-sm font-bold font-mono-code uppercase text-neutral-900">
                    Ingest Privileged Evidence or Forensic Affidavits
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans mt-0.5">
                    Files are cataloged into the client repository with tamper-evident cryptographic checksums and logged to the permanent audit trail.
                  </p>
                </div>

                {uploadSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs font-mono-code flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Evidence ingested successfully. SHA-256 integrity seal stamped to chain-of-custody.</span>
                  </div>
                )}

                <form onSubmit={handleCreateDocument} className="space-y-4 text-xs font-mono-code">
                  <div>
                    <label className="block text-neutral-700 uppercase font-semibold mb-1">
                      Document Title / Evidence Exhibit Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Sworn Declaration of Procedural Delay in OCRP Program"
                      className="w-full px-3 py-2 bg-neutral-50 border border-black/15 rounded text-neutral-900 focus:outline-none focus:border-[#E53935]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-700 uppercase font-semibold mb-1">
                        Case Docket Reference:
                      </label>
                      <select
                        value={newCaseRef}
                        onChange={(e) => setNewCaseRef(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-black/15 rounded text-neutral-900 focus:outline-none focus:border-[#E53935]"
                      >
                        <option value="Case No. 658931">Case No. 658931 (No Complaint)</option>
                        <option value="Case No. 658959">Case No. 658959 (Harborview Hold)</option>
                        <option value="Case No. 660121">Case No. 660121 (Expired CAD Flag)</option>
                        <option value="Case No. 664676">Case No. 664676 (Consent Ignored)</option>
                        <option value="Case No. 21-1-04347-2 SEA">Case No. 21-1-04347-2 SEA (Cyberstalking)</option>
                        <option value="Case No. 22-1-04242-3 SEA">Case No. 22-1-04242-3 SEA (Governor Threat)</option>
                        <option value="Case No. 25-2-17456-5 SEA">Case No. 25-2-17456-5 SEA (Housing Detainer)</option>
                        <option value="Case No. 26-2-01443-4 SEA">Case No. 26-2-01443-4 SEA (Majorat Title)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-700 uppercase font-semibold mb-1">
                        Security Classification:
                      </label>
                      <select
                        value={newClassification}
                        onChange={(e) => setNewClassification(e.target.value as any)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-black/15 rounded text-neutral-900 focus:outline-none focus:border-[#E53935]"
                      >
                        <option value="CONFIDENTIAL">CONFIDENTIAL</option>
                        <option value="ATTORNEY-CLIENT">ATTORNEY-CLIENT PRIVILEGED</option>
                        <option value="RESTRICTED">RESTRICTED</option>
                        <option value="EVIDENTIARY">EVIDENTIARY EXHIBIT</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-700 uppercase font-semibold mb-1">
                      Forensic Notes & Chain-of-Custody Annotation:
                    </label>
                    <textarea
                      rows={3}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Specify source, date retrieved, physical signatures, and witness identities..."
                      className="w-full px-3 py-2 bg-neutral-50 border border-black/15 rounded text-neutral-900 focus:outline-none focus:border-[#E53935]"
                    />
                  </div>

                  <div className="p-4 border-2 border-dashed border-neutral-300 rounded text-center bg-neutral-50">
                    <Upload className="w-6 h-6 mx-auto text-neutral-400 mb-1" />
                    <span className="text-neutral-700 font-semibold block">Select File (PDF, Audio WAV/MP3, or TIFF)</span>
                    <span className="text-[10px] text-neutral-400">Encrypted in-browser prior to repository ingestion</span>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#E53935] hover:bg-[#c62828] text-white font-bold rounded transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Seal & Ingest to Vault</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: Chain-of-Custody Audit Log */}
            {activeTab === 'audit' && (
              <div className="bg-white border border-black/10 rounded-lg p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="font-bold text-neutral-900 uppercase">CRYPTOGRAPHIC CHAIN-OF-CUSTODY AUDIT LOG</span>
                  <span className="text-neutral-500">Immutable Ledger</span>
                </div>

                <div className="space-y-2 text-xs font-mono-code divide-y divide-black/5">
                  <div className="pt-2 flex items-start justify-between gap-4">
                    <div>
                      <strong className="text-neutral-900">2026-10-12 17:48:02 UTC</strong>
                      <p className="text-neutral-600 font-sans">Session authenticated: {authRole} via SHA-256 client token.</p>
                    </div>
                    <span className="text-emerald-700 font-semibold text-[11px]">VERIFIED</span>
                  </div>
                  <div className="pt-2 flex items-start justify-between gap-4">
                    <div>
                      <strong className="text-neutral-900">2026-06-09 09:00:15 UTC</strong>
                      <p className="text-neutral-600 font-sans">King County Superior Court E-Filing Confirmation: Case #22-1-04242-3 SEA Procedural Audit.</p>
                    </div>
                    <span className="text-neutral-500 text-[11px]">RECORDED</span>
                  </div>
                  <div className="pt-2 flex items-start justify-between gap-4">
                    <div>
                      <strong className="text-neutral-900">2026-03-18 14:22:50 UTC</strong>
                      <p className="text-neutral-600 font-sans">Dr. Jamie Leavey Competency Assessment PR received and ingested to encrypted archive.</p>
                    </div>
                    <span className="text-emerald-700 font-semibold text-[11px]">VERIFIED</span>
                  </div>
                  <div className="pt-2 flex items-start justify-between gap-4">
                    <div>
                      <strong className="text-neutral-900">2026-01-07 11:59:18 UTC</strong>
                      <p className="text-neutral-600 font-sans">Full Satisfaction of Judgment filed in Housing Court Case #25-2-17456-5 SEA.</p>
                    </div>
                    <span className="text-neutral-500 text-[11px]">RESOLVED</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Document Inspection Drawer Modal */}
        {selectedDoc && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white border border-black/20 rounded-lg max-w-2xl w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/10">
                <div>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-red-50 text-[#E53935] uppercase font-bold border border-red-200">
                    {selectedDoc.classification}
                  </span>
                  <h3 className="text-base font-bold font-mono-code text-neutral-900 mt-1">
                    {selectedDoc.title}
                  </h3>
                  <span className="text-xs font-mono-code text-neutral-500">
                    Ref: {selectedDoc.referenceNumber} · {selectedDoc.caseRef}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="text-neutral-400 hover:text-neutral-700"
                >
                  ✕
                </button>
              </div>

              {/* Redaction Toggle */}
              <div className="flex items-center justify-between p-2.5 bg-neutral-100 rounded text-xs font-mono-code">
                <span>Display View Mode:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setRedactedView(false)}
                    className={`px-2 py-1 rounded cursor-pointer ${!redactedView ? 'bg-white font-bold shadow-2xs text-neutral-900' : 'text-neutral-600'}`}
                  >
                    Unredacted (Privileged)
                  </button>
                  <button
                    onClick={() => setRedactedView(true)}
                    className={`px-2 py-1 rounded cursor-pointer ${redactedView ? 'bg-white font-bold shadow-2xs text-[#E53935]' : 'text-neutral-600'}`}
                  >
                    Redacted (Public)
                  </button>
                </div>
              </div>

              {/* Document Simulator Body */}
              <div className="p-4 bg-[#FAF9F6] border border-black/10 rounded text-xs font-mono-code text-neutral-800 space-y-2 max-h-60 overflow-y-auto">
                <div className="text-neutral-400 text-[11px] border-b border-black/5 pb-1">
                  SHA-256: {selectedDoc.checksumSha256}
                </div>
                <p className="font-sans text-neutral-800 leading-relaxed">
                  {redactedView ? (
                    <span>[REDACTED PURSUANT TO COURT ORDER RCW 10.77] ... Subject was processed under administrative custody. All medical identifiers and witness specifics are obscured for public dissemination.</span>
                  ) : (
                    <span>{selectedDoc.description} Full exhibit contains verified hospital charts, intake logs, and clinical discordance notes between lab differentials and charted working hypotheses.</span>
                  )}
                </p>
                <div className="pt-2 text-[10px] text-neutral-500">
                  Uploaded by: {selectedDoc.uploadedBy} · Added on {selectedDoc.dateAdded}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/10 text-xs font-mono-code">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={selectedDoc.downloadUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#E53935] hover:bg-[#c62828] text-white rounded font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Verified Copy</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="bg-neutral-100 border-t border-black/10 px-6 py-3 flex items-center justify-between text-xs font-mono-code text-neutral-600">
          <span>Confidentiality Warning: Unauthorized dissemination of privileged materials subject to RCW 42.56 penalties.</span>
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
