export type CaseJurisdiction = 'Seattle Municipal Court' | 'King County Superior Court' | 'Federal / Other';

export type ConstitutionalAmendment = '4th' | '5th' | '6th' | '8th' | '14th' | 'Medical Rights' | 'Equal Protection' | 'Evidence Integrity';

export interface DocumentItem {
  id: string;
  caseNumber: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  dateCreated: string;
  category: 'Court Docket' | 'Medical / Lab' | 'Police / Incident' | 'Personal Narrative' | 'Legal Motion' | 'Audit / Synthesis';
  description?: string;
  verified: boolean;
}

export interface CaseStudy {
  caseNumber: string;
  title: string;
  court: CaseJurisdiction;
  cause: string;
  dates: string;
  judge: string;
  disposition: string;
  status: string;
  discrepancyScore: number;
  amendments: ConstitutionalAmendment[];
  executiveSummary: string;
  contextualOrigins: string;
  proceduralCollapse: string[];
  keyProceduralFailures: string[];
  evidentiaryRecord: string;
  constitutionalViolations: {
    amendment: string;
    violation: string;
  }[];
  systemicVulnerabilities: {
    vector: string;
    manifestation: string;
  }[];
  proposedReforms: string[];
  systemicVariables: {
    label: string;
    value: string;
  }[];
  documents: DocumentItem[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  caseNumber?: string;
  title: string;
  category: 'Municipal' | 'Felony' | 'Medical' | 'Civil/Housing' | 'Origin & Breach' | 'Restoration';
  summary: string;
  details: string;
  statuteOrQuote?: string;
  deepLinkDocument?: string;
  deepLinkCase?: string;
  tags: string[];
  discrepancyFlag?: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  category: 'Case' | 'Agency' | 'FailureMode' | 'Reform';
  shape: 'circle' | 'square' | 'triangle' | 'hexagon';
  degree: number;
  betweenness?: number;
  closeness?: number;
  reach?: number;
  reachEfficiency?: number;
  inDegree?: number;
  outDegree?: number;
  description: string;
  highlightCategory?: string;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type: 'Involves entity' | 'Exposes systemic flaw' | 'Suffers procedural breakdown' | 'Sustains structural gap' | 'Remedied by' | 'Root cause mechanism';
  description?: string;
}

export interface ClientDocument {
  id: string;
  title: string;
  referenceNumber: string;
  classification: 'CONFIDENTIAL' | 'RESTRICTED' | 'EVIDENTIARY' | 'ATTORNEY-CLIENT';
  caseRef: string;
  dateAdded: string;
  fileSize: string;
  checksumSha256: string;
  description: string;
  tags: string[];
  verifiedChainOfCustody: boolean;
  downloadUrl?: string;
  uploadedBy: string;
}
