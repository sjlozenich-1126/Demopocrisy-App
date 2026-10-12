import { NetworkNode, NetworkEdge } from '../types';

export const SYSTEMIC_DISCREPANCY_METRICS = {
  headlineScore: 89.75,
  scale: '0–100',
  classification: 'Extreme Systemic Discrepancy Intensity',
  jurisdiction: 'King County / Seattle, Washington (2021–2026)',
  components: [
    {
      name: 'Procedural Gaps',
      score: 32.4,
      maxWeight: 35.0,
      description: 'No-complaint detentions, pre-signed restoration orders, lack of counsel at arraignments/transfers, and unexecuted court orders.',
      impact: 'Terminal break in the chain of due process in 4 of 8 proceedings.'
    },
    {
      name: 'Diagnostic & Medical Gaps',
      score: 21.8,
      maxWeight: 25.0,
      description: 'Harborview CSF discordance (95% neutrophils contradicting neurosyphilis), missing confirmatory HIV testing, forced antipsychotics without consent.',
      impact: 'Medicalization pipeline deployed to bypass evidentiary trials and sustain custodial hold.'
    },
    {
      name: 'Evidentiary Gaps',
      score: 18.6,
      maxWeight: 20.0,
      description: 'Central alleged threats (Gov. Inslee voicemail audio/transcripts) unproduced across 1,300+ days; unverified 911 third-party callers.',
      impact: 'Defendants held without discovery or factual substrate for multi-year periods.'
    },
    {
      name: 'Database & Identity Lag',
      score: 11.2,
      maxWeight: 12.0,
      description: '48-hour municipal-to-county CAD sync delay keeping expired protective orders active; automated tactical arrests triggered by clerical errors.',
      impact: 'Technical database residue converted into permanent civilian arrest records.'
    },
    {
      name: 'Temporal & Speedy Trial Nullification',
      score: 5.75,
      maxWeight: 8.0,
      description: '283-day single-cause loops; 365+ cumulative days in pretrial custody without ever reaching a trial, plea deal, or jury verdict.',
      impact: 'CrR 3.3 speedy trial clocks suspended recursively via RCW 10.77 restoration churn.'
    }
  ]
};

export const CSF_LAB_AUDIT_DATA = {
  patient: 'Shane J. Lozenich',
  facility: 'Harborview Medical Research Center',
  period: 'March 27 – April 7, 2021',
  diagnosticFlags: [
    { parameter: 'CSF VDRL', value: 'Positive (Titer 1:4)', norm: 'Negative', matchStatus: 'Ambiguous / Contradictory', note: 'Lab warning: "Antibodies may reflect blood contamination or blood-brain barrier disruption, not true CNS infection."' },
    { parameter: 'FTA-ABS in CSF', value: 'Reactive', norm: 'Non-reactive', matchStatus: 'Ambiguous / Contradictory', note: 'Treponemal antibody present, but cannot distinguish active neurosyphilis from previous exposure or barrier leak.' },
    { parameter: 'CSF Nucleated Cells', value: '87 cells/uL', norm: '0–5 cells/uL', matchStatus: 'Severe Mismatch', note: 'Markedly elevated pleocytosis.' },
    { parameter: 'Cell Differential', value: '95% Neutrophils', norm: '<5% Neutrophils (>90% Lymphocytes expected in neurosyphilis)', matchStatus: 'Acute Discordance', note: 'KEY FINDING: Neutrophilic predominance indicates bacterial meningitis or traumatic puncture, directly contradicting neurosyphilis norm.' },
    { parameter: 'CSF Protein', value: '47 mg/dL', norm: '15–45 mg/dL', matchStatus: 'Mild Elevation', note: 'Only borderline elevated, inconsistent with severe acute neuro-infectious inflammation.' },
    { parameter: 'CSF Glucose', value: '62 mg/dL', norm: '40–70 mg/dL', matchStatus: 'Normal (Contradicts Bacterial Meningitis)', note: 'Normal glucose argues strongly against active bacterial meningitis, leaving the 95% neutrophils clinically unexplained.' },
    { parameter: 'TB PCR / AFB Cultures', value: 'Negative', norm: 'Negative', matchStatus: 'Negative', note: 'Prompted by unexplained chest X-ray; ruled out tuberculosis.' },
    { parameter: 'Viral PCR (HSV-1, HSV-2, VZV)', value: 'Negative (None detected)', norm: 'Negative', matchStatus: 'Negative', note: 'All viral encephalitis panels returned negative.' },
    { parameter: 'HIV Confirmatory Panel', value: 'Not Performed in Record', norm: 'Negative', matchStatus: 'Diagnostic Inflation', note: '"AIDS" placed on Problem List despite absence of ELISA/Western Blot, viral load, or CD4 count.' },
    { parameter: 'White Blood Cell (WBC)', value: '4.7 → 6.6 K/uL', norm: '4.0–11.0 K/uL', matchStatus: 'Normal (Contradicts Sepsis)', note: '"Sepsis, unknown source" diagnosed despite completely normal WBC count and negative cultures.' }
  ],
  medicationsAdministered: [
    { drug: 'Penicillin G Potassium', dosage: '500 mL IV every 4 hours', justification: 'Neurosyphilis treatment plan', consent: 'None / Given under physical restraint' },
    { drug: 'Haloperidol (Haldol)', dosage: '5 mg twice daily + IM PRN', justification: 'Presumed psychosis / agitation', consent: 'Explicit refusal overridden by officers' },
    { drug: 'Risperidone (Risperdal)', dosage: 'Co-administered oral/injectable', justification: 'Psychotropic stabilization', consent: 'None / Triggered acute dystonia' },
    { drug: 'Benztropine (Cogentin)', dosage: 'IM / Oral', justification: 'Counteract severe extrapyramidal dystonic muscle spasm', consent: 'Administered for adverse reaction' },
    { drug: 'Dolutegravir / Truvada', dosage: 'Antiretroviral therapy', justification: 'Unconfirmed AIDS problem list entry', consent: 'No confirmatory testing in record' }
  ],
  clinicalConclusions: [
    'Diagnostic Inflation: Severe psychiatric and infectious labels were assigned based on conflicting lab differentials.',
    'Administrative Containment: Clinical hold functioned as a seamless continuation of detention after municipal court charges were dismissed.',
    'Apple Health Insurance Conflict: Insurer recommended discharge on April 5; hospital detained patient until April 15 without judicial re-authorization.'
  ]
};

export const SNA_NODES: NetworkNode[] = [
  // Cases (Circles)
  { id: 'case-658931', label: 'Case 658931', category: 'Case', shape: 'circle', degree: 9, closeness: 0.179, reach: 0.204, reachEfficiency: 0.020, description: 'SMC: Domestic violence NCO; dismissed with no complaint filed; 24h detention.' },
  { id: 'case-658959', label: 'Case 658959', category: 'Case', shape: 'circle', degree: 11, closeness: 0.245, reach: 0.296, reachEfficiency: 0.025, inDegree: 0, outDegree: 11, description: 'SMC: Competency bypass; 22-day undocumented Harborview medical transfer; highest reach efficiency (29.6%).' },
  { id: 'case-660121', label: 'Case 660121', category: 'Case', shape: 'circle', degree: 9, closeness: 0.179, reach: 0.204, reachEfficiency: 0.020, description: 'SMC: Expired protective order CAD sync lag; unexecuted Mental Health Court referral.' },
  { id: 'case-664676', label: 'Case 664676', category: 'Case', shape: 'circle', degree: 12, closeness: 0.245, reach: 0.278, reachEfficiency: 0.021, description: 'SMC: Disregarded victim consent; police union recruitment bonus timing; sole root cause link.' },
  { id: 'case-21-1', label: 'Case 21-1-04347-2 SEA', category: 'Case', shape: 'circle', degree: 15, closeness: 0.311, reach: 0.352, reachEfficiency: 0.022, description: 'KCSC: Diagnostic epicenter; 45-day restoration order without counsel/evaluation; restored Feb 2026.' },
  { id: 'case-22-1', label: 'Case 22-1-04242-3 SEA', category: 'Case', shape: 'circle', degree: 11, closeness: 0.236, reach: 0.278, reachEfficiency: 0.023, description: 'KCSC: Gov. Inslee speech docket; 10 months pretrial detention; missing voicemail discovery void.' },
  { id: 'case-25-2', label: 'Case 25-2-17456-5 SEA', category: 'Case', shape: 'circle', degree: 7, closeness: 0.132, reach: 0.148, reachEfficiency: 0.019, description: 'Housing Court: SCIDpda Bush Hotel unlawful detainer; isolated structural island; settled Jan 2026.' },

  // Key Agencies (Squares)
  { id: 'spd', label: 'Seattle Police Department', category: 'Agency', shape: 'square', degree: 9, betweenness: 0.0040, closeness: 0.057, inDegree: 6, outDegree: 3, description: 'Sole structural bridge in network; connects case intake to downstream prosecutorial and court nodes.' },
  { id: 'kc-jail', label: 'King County Jail', category: 'Agency', shape: 'square', degree: 6, betweenness: 0.0007, closeness: 0.019, inDegree: 5, outDegree: 1, description: 'Pre-hearing holding chokepoint and detention gateway.' },
  { id: 'smc', label: 'Seattle Municipal Court', category: 'Agency', shape: 'square', degree: 4, closeness: 0.019, inDegree: 4, outDegree: 0, description: 'Municipal misdemeanor adjudication venue.' },
  { id: 'kc-superior', label: 'King County Superior Court', category: 'Agency', shape: 'square', degree: 4, betweenness: 0.0004, closeness: 0.019, inDegree: 3, outDegree: 1, description: 'Felony-level court connecting cases to competency pipelines.' },
  { id: 'kc-prosecutor', label: 'KC Prosecutor Office', category: 'Agency', shape: 'square', degree: 3, inDegree: 3, outDegree: 0, description: 'Prosecutorial node with high intake non-filing rates.' },
  { id: 'harborview', label: 'Harborview Medical Center', category: 'Agency', shape: 'square', degree: 2, inDegree: 2, outDegree: 0, description: 'Public trauma hospital executing involuntary holds post-dismissal.' },
  { id: 'western-state', label: 'Western State Hospital', category: 'Agency', shape: 'square', degree: 2, inDegree: 2, outDegree: 0, description: 'State psychiatric facility for RCW 10.77 inpatient restoration.' },
  { id: 'ocrp', label: 'OCRP (Outpatient Program)', category: 'Agency', shape: 'square', degree: 3, inDegree: 3, outDegree: 0, description: 'State outpatient competency monitoring extending pretrial supervision.' },
  { id: 'scidpda', label: 'SCIDpda (Public Dev Authority)', category: 'Agency', shape: 'square', degree: 2, inDegree: 1, outDegree: 1, description: 'Quasi-governmental housing authority managing Bush Hotel.' },
  { id: 'telecare', label: 'Telecare Corp.', category: 'Agency', shape: 'square', degree: 2, inDegree: 2, outDegree: 0, description: 'Certified third-party rent relief and case management provider.' },
  { id: 'opa', label: 'Office of Police Accountability', category: 'Agency', shape: 'square', degree: 1, inDegree: 1, outDegree: 0, description: 'Investigated Jan 6 SPD officer attendance and record resistance.' },
  { id: 'governor-office', label: "Governor's Office Detail", category: 'Agency', shape: 'square', degree: 2, inDegree: 2, outDegree: 0, description: 'Executive security detail initiating threat dockets.' },
  { id: 'spog', label: 'Seattle Police Guild (SPOG)', category: 'Agency', shape: 'square', degree: 1, inDegree: 1, outDegree: 0, description: 'Police labor union negotiating recruitment bonuses during arrest spikes.' },
  { id: 'dshs', label: 'DSHS Forensic Services', category: 'Agency', shape: 'square', degree: 2, inDegree: 2, outDegree: 0, description: 'State evaluations determining competency status.' },
  { id: 'apple-health', label: 'Apple Health (Medicaid)', category: 'Agency', shape: 'square', degree: 1, inDegree: 1, outDegree: 0, description: 'Insurance authority recommending April 5 discharge from Harborview.' },
  { id: 'state-auditor', label: 'WA State Auditor Office', category: 'Agency', shape: 'square', degree: 1, inDegree: 1, outDegree: 0, description: 'Origin of 1.6M citizen data breach.' },
  { id: 'port-seattle', label: 'Port of Seattle', category: 'Agency', shape: 'square', degree: 1, inDegree: 1, outDegree: 0, description: 'Maritime infrastructure authority and Majorat ROFR holder.' },
  { id: 'kcrha', label: 'KCRHA Regional Authority', category: 'Agency', shape: 'square', degree: 1, inDegree: 1, outDegree: 0, description: 'Subject of April 2026 $13M forensic audit and dissolution resolution.' },

  // Failure Modes (Triangles)
  { id: 'fm-opacity', label: 'Institutional Opacity', category: 'FailureMode', shape: 'triangle', degree: 3, inDegree: 3, outDegree: 0, description: 'Cross-cutting failure mode across 3 tracks: unidentified arresting agents, sealed records, non-disclosure.' },
  { id: 'fm-substitution', label: 'Administrative Substitution', category: 'FailureMode', shape: 'triangle', degree: 3, inDegree: 3, outDegree: 0, description: 'Competency frameworks substituted for adversarial evidentiary hearings in 3 cases.' },
  { id: 'fm-no-complaint', label: 'No Complaint Filed', category: 'FailureMode', shape: 'triangle', degree: 2, inDegree: 2, outDegree: 0, description: 'Arrest and jail booking executed without formal criminal complaint ever drafted.' },
  { id: 'fm-coord-breakdown', label: 'Procedural Breakdown', category: 'FailureMode', shape: 'triangle', degree: 2, inDegree: 2, outDegree: 0, description: 'Complete lack of inter-agency verification between SPD and court queues.' },
  { id: 'fm-diag-looping', label: 'Diagnostic Looping', category: 'FailureMode', shape: 'triangle', degree: 2, inDegree: 2, outDegree: 0, description: 'Archival research re-coded as psychiatric delusion to perpetuate state supervision.' },
  { id: 'fm-weaponized-nco', label: 'Weaponization of Orders', category: 'FailureMode', shape: 'triangle', degree: 2, inDegree: 2, outDegree: 0, description: 'Low-threshold ex-parte orders enforced mechanically, overriding consensual contact.' },
  { id: 'fm-tech-harassment', label: 'Technological Harassment (V2K)', category: 'FailureMode', shape: 'triangle', degree: 2, inDegree: 2, outDegree: 0, description: 'Reports of acoustic/RF harassment pre-emptively dismissed without forensic check.' },
  { id: 'fm-due-process-vacuum', label: 'Due-Process Vacuum', category: 'FailureMode', shape: 'triangle', degree: 2, inDegree: 2, outDegree: 0, description: 'Civilian held in custody without active charge, counsel, or probable cause hearing.' },
  { id: 'fm-db-lag', label: 'CAD Database Sync Lag', category: 'FailureMode', shape: 'triangle', degree: 1, inDegree: 1, outDegree: 0, description: 'Expired protective order remained active in CAD dispatch, triggering tactical arrest.' },
  { id: 'fm-presigned-order', label: 'Pre-Signed Restoration Order', category: 'FailureMode', shape: 'triangle', degree: 1, inDegree: 1, outDegree: 0, description: 'Restoration commitment signed prior to scheduled judicial hearing.' },
  { id: 'fm-discovery-void', label: 'The Discovery Void', category: 'FailureMode', shape: 'triangle', degree: 1, inDegree: 1, outDegree: 0, description: '1,300+ days without state producing foundational audio or transcript of alleged threat.' },
  { id: 'fm-economic-root', label: 'Economic Incentivization (ROOT)', category: 'FailureMode', shape: 'triangle', degree: 1, inDegree: 1, outDegree: 0, description: 'CRITICAL ROOT CAUSE: Detention data harvested for union negotiations and recruitment bonuses.' },

  // Reform Nodes (Hexagons)
  { id: 'rf-competency', label: 'Competency Oversight Reform', category: 'Reform', shape: 'hexagon', degree: 3, inDegree: 3, outDegree: 0, description: 'P1 CRITICAL: Mandatory live judicial signatures & counsel; competency cannot suspend CrR 3.3 or discovery.' },
  { id: 'rf-realtime-tracking', label: 'Real-Time Booking Tracking', category: 'Reform', shape: 'hexagon', degree: 2, inDegree: 2, outDegree: 0, description: 'P1 CRITICAL: Digital linkage between jail bookings and prosecutor intake with auto-release triggers.' },
  { id: 'rf-human-in-loop', label: 'Human-in-the-Loop Verification', category: 'Reform', shape: 'hexagon', degree: 2, inDegree: 2, outDegree: 0, description: 'P1 CRITICAL: Mandatory human verification before arrests on automated protective order flags.' },
  { id: 'rf-db-purge', label: 'Cross-Database Purge Protocol', category: 'Reform', shape: 'hexagon', degree: 2, inDegree: 2, outDegree: 0, description: 'P2 HIGH: Automatic synchronization to purge false arrest records upon case dismissal.' },
  { id: 'rf-transparency', label: 'Transparency Safeguards', category: 'Reform', shape: 'hexagon', degree: 2, inDegree: 2, outDegree: 0, description: 'P2 HIGH: Mandatory release of body-cam and dispatch records for all dismissed cases.' },
  { id: 'rf-digital-evidence', label: 'Digital Evidence Protocols', category: 'Reform', shape: 'hexagon', degree: 2, inDegree: 2, outDegree: 0, description: 'P2 HIGH: Mandatory warrants for device seizures and chain-of-custody verification.' },
  { id: 'rf-judicial-transfer', label: 'Judicial Transfer Orders', category: 'Reform', shape: 'hexagon', degree: 1, inDegree: 1, outDegree: 0, description: 'P3 MODERATE: Written judicial order required for any inter-agency medical transfer post-dismissal.' },
  { id: 'rf-pda-oversight', label: 'PDA Legislative Oversight', category: 'Reform', shape: 'hexagon', degree: 1, inDegree: 1, outDegree: 0, description: 'P3 MODERATE: Bar summary unlawful detainer for PDAs; mandate third-party relief acceptance.' },
  { id: 'rf-protected-party', label: 'Protected-Party Accountability', category: 'Reform', shape: 'hexagon', degree: 1, inDegree: 1, outDegree: 0, description: 'P3 MODERATE: Judicial review when public officials or mayors invoke protected-party status.' },
  { id: 'rf-economic-decoupling', label: 'Economic Detention Decoupling', category: 'Reform', shape: 'hexagon', degree: 0, inDegree: 0, outDegree: 0, description: 'P4 ROOT GAP: Explicit statutory ban on using booking volume metrics for union bargaining and bonuses.' }
];

export const SNA_EDGES: NetworkEdge[] = [
  // Case to Agency edges
  { id: 'e1', source: 'case-658931', target: 'spd', type: 'Involves entity' },
  { id: 'e2', source: 'case-658931', target: 'kc-jail', type: 'Involves entity' },
  { id: 'e3', source: 'case-658931', target: 'smc', type: 'Involves entity' },
  { id: 'e4', source: 'case-658931', target: 'state-auditor', type: 'Involves entity' },

  { id: 'e5', source: 'case-658959', target: 'spd', type: 'Involves entity' },
  { id: 'e6', source: 'case-658959', target: 'kc-jail', type: 'Involves entity' },
  { id: 'e7', source: 'case-658959', target: 'smc', type: 'Involves entity' },
  { id: 'e8', source: 'case-658959', target: 'harborview', type: 'Involves entity' },
  { id: 'e9', source: 'case-658959', target: 'apple-health', type: 'Involves entity' },

  { id: 'e10', source: 'case-660121', target: 'spd', type: 'Involves entity' },
  { id: 'e11', source: 'case-660121', target: 'kc-jail', type: 'Involves entity' },
  { id: 'e12', source: 'case-660121', target: 'smc', type: 'Involves entity' },
  { id: 'e13', source: 'case-660121', target: 'opa', type: 'Involves entity' },

  { id: 'e14', source: 'case-664676', target: 'spd', type: 'Involves entity' },
  { id: 'e15', source: 'case-664676', target: 'kc-jail', type: 'Involves entity' },
  { id: 'e16', source: 'case-664676', target: 'smc', type: 'Involves entity' },
  { id: 'e17', source: 'case-664676', target: 'spog', type: 'Involves entity' },

  { id: 'e18', source: 'case-21-1', target: 'spd', type: 'Involves entity' },
  { id: 'e19', source: 'case-21-1', target: 'kc-jail', type: 'Involves entity' },
  { id: 'e20', source: 'case-21-1', target: 'kc-superior', type: 'Involves entity' },
  { id: 'e21', source: 'case-21-1', target: 'western-state', type: 'Involves entity' },
  { id: 'e22', source: 'case-21-1', target: 'dshs', type: 'Involves entity' },
  { id: 'e23', source: 'case-21-1', target: 'ocrp', type: 'Involves entity' },

  { id: 'e24', source: 'case-22-1', target: 'spd', type: 'Involves entity' },
  { id: 'e25', source: 'case-22-1', target: 'governor-office', type: 'Involves entity' },
  { id: 'e26', source: 'case-22-1', target: 'kc-superior', type: 'Involves entity' },
  { id: 'e27', source: 'case-22-1', target: 'ocrp', type: 'Involves entity' },

  { id: 'e28', source: 'case-25-2', target: 'scidpda', type: 'Involves entity' },
  { id: 'e29', source: 'case-25-2', target: 'telecare', type: 'Involves entity' },

  // Agency Inter-connections (Friction)
  { id: 'e30', source: 'spd', target: 'kc-prosecutor', type: 'Suffers procedural breakdown' },
  { id: 'e31', source: 'spd', target: 'smc', type: 'Suffers procedural breakdown' },
  { id: 'e32', source: 'kc-jail', target: 'kc-prosecutor', type: 'Sustains structural gap' },
  { id: 'e33', source: 'kc-superior', target: 'ocrp', type: 'Sustains structural gap' },
  { id: 'e34', source: 'scidpda', target: 'telecare', type: 'Suffers procedural breakdown' },

  // Case to Failure Modes
  { id: 'e35', source: 'case-658931', target: 'fm-no-complaint', type: 'Exposes systemic flaw' },
  { id: 'e36', source: 'case-658931', target: 'fm-coord-breakdown', type: 'Exposes systemic flaw' },
  { id: 'e37', source: 'case-658931', target: 'fm-due-process-vacuum', type: 'Exposes systemic flaw' },

  { id: 'e38', source: 'case-658959', target: 'fm-substitution', type: 'Exposes systemic flaw' },
  { id: 'e39', source: 'case-658959', target: 'fm-tech-harassment', type: 'Exposes systemic flaw' },

  { id: 'e40', source: 'case-660121', target: 'fm-db-lag', type: 'Exposes systemic flaw' },
  { id: 'e41', source: 'case-660121', target: 'fm-weaponized-nco', type: 'Exposes systemic flaw' },

  { id: 'e42', source: 'case-664676', target: 'fm-no-complaint', type: 'Exposes systemic flaw' },
  { id: 'e43', source: 'case-664676', target: 'fm-due-process-vacuum', type: 'Exposes systemic flaw' },
  { id: 'e44', source: 'case-664676', target: 'fm-economic-root', type: 'Root cause mechanism' },

  { id: 'e45', source: 'case-21-1', target: 'fm-opacity', type: 'Exposes systemic flaw' },
  { id: 'e46', source: 'case-21-1', target: 'fm-substitution', type: 'Exposes systemic flaw' },
  { id: 'e47', source: 'case-21-1', target: 'fm-diag-looping', type: 'Exposes systemic flaw' },
  { id: 'e48', source: 'case-21-1', target: 'fm-presigned-order', type: 'Exposes systemic flaw' },

  { id: 'e49', source: 'case-22-1', target: 'fm-opacity', type: 'Exposes systemic flaw' },
  { id: 'e50', source: 'case-22-1', target: 'fm-substitution', type: 'Exposes systemic flaw' },
  { id: 'e51', source: 'case-22-1', target: 'fm-discovery-void', type: 'Exposes systemic flaw' },

  { id: 'e52', source: 'case-25-2', target: 'fm-opacity', type: 'Exposes systemic flaw' },
  { id: 'e53', source: 'case-25-2', target: 'fm-weaponized-nco', type: 'Exposes systemic flaw' },

  // Case to Reforms
  { id: 'e54', source: 'case-658931', target: 'rf-realtime-tracking', type: 'Remedied by' },
  { id: 'e55', source: 'case-658931', target: 'rf-db-purge', type: 'Remedied by' },

  { id: 'e56', source: 'case-658959', target: 'rf-competency', type: 'Remedied by' },
  { id: 'e57', source: 'case-658959', target: 'rf-judicial-transfer', type: 'Remedied by' },
  { id: 'e58', source: 'case-658959', target: 'rf-digital-evidence', type: 'Remedied by' },

  { id: 'e59', source: 'case-660121', target: 'rf-human-in-loop', type: 'Remedied by' },
  { id: 'e60', source: 'case-660121', target: 'rf-db-purge', type: 'Remedied by' },

  { id: 'e61', source: 'case-664676', target: 'rf-realtime-tracking', type: 'Remedied by' },
  { id: 'e62', source: 'case-664676', target: 'rf-human-in-loop', type: 'Remedied by' },

  { id: 'e63', source: 'case-21-1', target: 'rf-competency', type: 'Remedied by' },
  { id: 'e64', source: 'case-21-1', target: 'rf-digital-evidence', type: 'Remedied by' },
  { id: 'e65', source: 'case-21-1', target: 'rf-transparency', type: 'Remedied by' },
  { id: 'e66', source: 'case-21-1', target: 'rf-protected-party', type: 'Remedied by' },

  { id: 'e67', source: 'case-22-1', target: 'rf-competency', type: 'Remedied by' },
  { id: 'e68', source: 'case-22-1', target: 'rf-transparency', type: 'Remedied by' },

  { id: 'e69', source: 'case-25-2', target: 'rf-pda-oversight', type: 'Remedied by' }
];

export const STRATIGRAPHIC_LAYERS = [
  {
    layerNumber: 6,
    name: 'Public Counter-Archive',
    epoch: 'Present (2026)',
    content: 'Demopocrisy & Clarion Sentinel forensic synthesis, whistleblower ingestion, public dockets preservation, and civil filings.',
    systemicFunction: 'Converts subject from passive object of processing into active producer of empirical proof and legal counter-precedent.'
  },
  {
    layerNumber: 5,
    name: 'Hardened Administrative Dogma',
    epoch: '2022–2025',
    content: 'Consecutive RCW 10.77 restoration orders treated as permanent status; unexecuted "Dismiss and Refer" orders lingering in police CAD databases.',
    systemicFunction: 'Judges, defenders, and prosecutors treat prior un-adjudicated entries as verified truth, bypassing independent evidentiary inquiry.'
  },
  {
    layerNumber: 4,
    name: 'Institutional Amplification',
    epoch: 'Late 2021–2022',
    content: 'The "Extraction Bridge": unfiled municipal bookings imported across jurisdictions to justify elevated bail in King County Superior Court; pre-signed restoration templates.',
    systemicFunction: 'Inter-agency momentum compounds procedural error across municipal, county, and state tiers without a single trial.'
  },
  {
    layerNumber: 3,
    name: 'Diagnostic Substitution',
    epoch: 'Spring 2021',
    content: 'Harborview Hospital CSF spinal fluid panel: 87 nucleated cells, 95% neutrophils (acute bacterial/trauma profile) overridden by speculative neurosyphilis narrative.',
    systemicFunction: 'Criminal proceedings dismissed and immediately substituted with non-consensual psychiatric medication and confinement.'
  },
  {
    layerNumber: 2,
    name: 'Database Fossilization',
    epoch: 'Spring 2021',
    content: '48-hour municipal-to-county sync lag leaves expired civil orders active in CAD/LE dispatch systems; identity discrepancies of neighbors never investigated.',
    systemicFunction: 'Automated data feeds trigger tactical multi-vehicle arrests of citizens holding contemporaneous consent.'
  },
  {
    layerNumber: 1,
    name: 'Foundational Fracture (Origin Bedrock)',
    epoch: '2020–Early 2021',
    content: 'State Auditor\'s Office 1.6M-record Accellion data breach; unfiled 911 domestic abuse calls during COVID-19 precinct closures; first no-complaint arrest (Case 658931).',
    systemicFunction: 'The baseline fissure where administrative non-responsiveness and data breach vulnerability established the procedural template.'
  }
];

export const INSTITUTIONAL_PROCESSING_CYCLE = [
  { step: 1, name: 'Dissonance (Element)', description: 'Generative friction: Accellion 1.6M-record breach, reported digital/frequency stalking, pandemic lockdown collapse. System cannot process claims without self-implication.' },
  { step: 2, name: 'Legitimation', description: 'Institutional non-response normalized as standard procedure via precinct closures, remote video arraignments, and mechanical protective-order enforcement.' },
  { step: 3, name: 'Disqualification by Hegemony', description: 'Structural exclusion + epistemic invalidation: factual reports of hardware and data breaches are reclassified as psychiatric "delusional themes".' },
  { step: 4, name: 'Mediation (Reactive)', description: 'Extreme outdegree asymmetry: overnight bookings without filed complaints, rotating public defenders, unexecuted Mental Health Court referrals.' },
  { step: 5, name: 'Dissonance (Failure Mode)', description: 'Pretrial incarceration without trial (10 months), forced antipsychotics without consent, competency restoration orders signed before open hearings.' },
  { step: 6, name: 'Precedent (Counter-Archive)', description: 'Demopocrisy counter-archive utilizes the system\'s own public records and lab data to prevent institutional erasure.' },
  { step: 7, name: 'Reclamation', description: 'System-side: clinical co-optation ("Restored Competency"). Subject-side: civil rights filing (3 causes of action) and independent sovereign trust architectures.' }
];

export const DEFENSE_LOOP_PHASES = [
  { phase: 1, title: 'Trigger Event', detail: 'Low-threshold 911 call or automated CAD database flag misclassifying expired order as active.' },
  { phase: 2, title: 'Extraction Bridge', detail: 'Unfiled municipal arrest imported across jurisdictions to inflate risk profile in Superior Court.' },
  { phase: 3, title: 'Competency Funnel', detail: 'Defense counsel or court raises RCW 10.77; restoration orders signed prior to hearing.' },
  { phase: 4, title: 'Clock Reset', detail: 'Speedy trial rights (CrR 3.3) nullified; case suspended in continuous 283-day continuances.' },
  { phase: 5, title: 'Narrative Inversion', detail: 'Defendant\'s empirical hardware evidence and records reframed as psychiatric delusion.' },
  { phase: 6, title: 'Residual Stigma', detail: 'Charges dismissed without prejudice, yet un-adjudicated arrest records persist in state databases to trigger next cycle.' }
];

export const EPISTEMIC_INVERSION_COMPARISON = {
  institutionalSide: {
    title: 'Operating System (Institutional Reality)',
    authorityLevel: 'High / Treated as Self-Authenticating & Unimpeachable',
    points: [
      'Automated CAD dispatch alerts treated as actionable warrants without human check',
      'Clinical chart working hypotheses (neurosyphilis, AIDS, psychosis) treated as established legal fact',
      'Unfiled municipal bookings imported to establish criminal propensity in felony court',
      'Revolving-door public defenders defaulting to competency to clear caseloads',
      'Law enforcement officers seeking Supreme Court anonymity while executing civilian arrests'
    ]
  },
  defendantSide: {
    title: 'Operating Subject (Empirical Grounding)',
    authorityLevel: 'Low / Systematically Pathologized as Hallucination',
    points: [
      'Documented 1.6M-record Washington State Auditor / Accellion data breach',
      'Contemporaneous text messages and written consent from protected party in possession',
      'Harborview CSF lab results showing 95% neutrophils directly contradicting neurosyphilis',
      'Valid money-order payment receipts and third-party rent assistance commitments',
      'Photocopied passports belonging to third parties inserted into arrest belongings'
    ]
  }
};

export const REFORM_MATRIX_TIERS = [
  {
    tier: 'P1 — Critical Priority',
    color: '#E53935',
    reforms: [
      {
        title: 'Real-Time Booking-to-Prosecutor Tracking',
        driver: 'No-Complaint Detention (4 of 8 Cases)',
        statutoryRemedy: 'Implement mandatory digital linkage between jail booking systems and prosecutor intake queues with automated dismissal & immediate release if no formal complaint is filed within 24 hours.',
        amendments: '4th & 14th Amendments'
      },
      {
        title: 'Human-in-the-Loop CAD Verification',
        driver: 'Database Lag & Expired CAD Flags (Case 660121)',
        statutoryRemedy: 'Mandatory human verification of court docket status before executing custodial actions on automated protective-order flags; prohibition on automated warrant triggers.',
        amendments: '4th Amendment'
      },
      {
        title: 'Competency Restoration Live Judicial Hearing Mandate',
        driver: 'Competency-as-Bypass & 283-Day Loops (Cases 21-1, 22-1, 658959)',
        statutoryRemedy: 'Require mandatory live judicial signatures with counsel present for all RCW 10.77 orders; explicit statutory prohibition on competency proceedings suspending discovery or CrR 3.3 speedy trial clocks.',
        amendments: '6th & 14th Amendments'
      }
    ]
  },
  {
    tier: 'P2 — High Priority',
    color: '#D32F2F',
    reforms: [
      {
        title: 'Automatic Cross-Database Purge Protocol',
        driver: 'Residual Record Stigma & Expungement Vacuum',
        statutoryRemedy: 'Automatic cross-database synchronization upon case dismissal to purge arrest entries from public repositories, preventing un-adjudicated data from polluting subsequent bail decisions.',
        amendments: 'Record Integrity'
      },
      {
        title: 'Digital Device Seizure & Chain-of-Custody Warrants',
        driver: 'Warrantless Device Confiscation (Case 21-1)',
        statutoryRemedy: 'Codify strict warrant prerequisites for mobile device seizures during arrests and chain-of-custody audits for personal documents entered into police evidence.',
        amendments: '4th Amendment'
      },
      {
        title: 'Mandatory Disclosure of Body-Cam and Dispatch Logs',
        driver: 'Institutional Opacity & Evidence Suppression',
        statutoryRemedy: 'Automatic release of unredacted body-worn camera footage, 911 audio recordings, and CAD dispatch logs for all dismissed matters within 30 days of case closure.',
        amendments: 'Transparency & 6th Amendment'
      }
    ]
  },
  {
    tier: 'P3 — Moderate Priority',
    color: '#F57C00',
    reforms: [
      {
        title: 'Judicial Orders for Inter-Agency Medical Transfers',
        driver: 'Undocumented Harborview Transfer (Case 658959)',
        statutoryRemedy: 'Require signed, reviewable judicial transfer orders before any individual released from jail custody is transported to psychiatric or medical facilities; enforce strict informed consent standards.',
        amendments: 'Medical Rights & 4th Amendment'
      },
      {
        title: 'Public Development Authority (PDA) Eviction Bar',
        driver: 'Retaliatory Unlawful Detainer (Case 25-2)',
        statutoryRemedy: 'Prohibit PDAs from utilizing summary Unlawful Detainer without prior administrative fact-finding; mandate acceptance of certified third-party rental relief funds.',
        amendments: 'Fair Housing & Due Process'
      },
      {
        title: 'Protected-Party Official Transparency',
        driver: 'Protected-Party Designation Abuse (Case 21-1)',
        statutoryRemedy: 'Judicial review required when government officials or mayors invoke protected-party status, preventing institutional shielding during civilian prosecutions.',
        amendments: '1st & 6th Amendments'
      }
    ]
  },
  {
    tier: 'P4 — Root Cause Reform Gap',
    color: '#7B1FA2',
    reforms: [
      {
        title: 'Economic Detention Decoupling (Root Cause Remediation)',
        driver: 'Detention Data Harvested for Police-Union Bargaining & Recruitment Bonuses',
        statutoryRemedy: 'Currently ZERO corresponding reform nodes in existing state code. Enact explicit statutory ban on using booking and detention-volume data in collective bargaining negotiations, police-union arbitration, or officer recruitment bonus milestones.',
        amendments: 'Structural Justice & Equal Protection'
      }
    ]
  }
];

export const SPECIAL_INVESTIGATIVE_SERIES = [
  {
    id: 'series-01',
    number: '01',
    title: 'Civil Rights & Anonymity: The Inversion of Transparency',
    kicker: 'POLICE ACCOUNTABILITY & PROCEDURAL ASYMMETRY',
    summary: 'Examining the stark institutional contrast between Seattle police officers petitioning the Washington Supreme Court and U.S. Supreme Court for anonymity regarding January 6 attendance, while civilian arrests were executed by unidentified agents operating without badges or visible insignia from unmarked vehicles.',
    metrics: ['6 Officers Investigated', '2 Fired for Trespass', '1 Warrantless Arrest by Plainclothes Units'],
    caseRefs: ['Case 21-1-04347-2 SEA', 'Case 660121']
  },
  {
    id: 'series-02',
    number: '02',
    title: 'The Discovery Void: 1,300+ Days of Prosecution Without Proof',
    kicker: 'SPEEDY TRIAL VIOLATIONS & EVIDENTIARY VACUUM',
    summary: 'An investigative audit into how the State maintained an executive-level threat prosecution against Governor Jay Inslee for more than three years without ever producing or transcribing the central voicemail recording, utilizing competency churn to insulate weak charges from judicial review.',
    metrics: ['10 Months Incarceration', '0 Voicemail Recordings Produced', '4 Public Defender Rotations'],
    caseRefs: ['Case 22-1-04242-3 SEA', 'Case 22-1-04247-3 SEA']
  },
  {
    id: 'series-03',
    number: '03',
    title: 'Zoned for Erasure: The Midvale Ave N Redevelopment Cluster',
    kicker: 'DISAPPEARED NEIGHBORS & DEED ALTERATION AUDIT',
    summary: 'Cross-referencing emergency response logs, neighbor disappearances, and unfiled 911 calls across two city blocks. Investigates the correlation between uninvestigated civilian distress calls, expedited property sales, zoning conversions to multi-family condos, and county deed modifications.',
    metrics: ['2 Residential Blocks Mapped', '911 Emergency Spike', '100% Parcel Turnover to Condos'],
    caseRefs: ['Case 658931', 'Case 660121']
  },
  {
    id: 'series-04',
    number: '04',
    title: 'Digital Breach & Institutional Deafness: The Accellion Fallout',
    kicker: 'STATE DATA COMPROMISE & TECHNICAL STALKING',
    summary: 'Contextualizing the 2021 Washington State Auditor / Accellion breach that compromised 1.6 million residents. Traces how reported digital intrusions, spoofed phone numbers, and physical hardware stalking were uniformly dismissed as psychiatric symptoms rather than investigated forensically.',
    metrics: ['1.6M Resident Records Leaked', '0 Technical Forensic Inquiries', '2 Involuntary Holds'],
    caseRefs: ['Case 658931', 'Case 658959', 'Case 21-1-04347-2 SEA']
  }
];

export const CIVIL_ACTION_2026 = {
  filingTitle: 'Procedural and Institutional Audit Report 2021–2026',
  court: 'King County Superior Court',
  caseNumber: 'No. 21-1-04347-2SEA / 22-1-04242-3SEA',
  dateFiled: 'June 09, 2026 at 09:00 AM',
  petitioner: 'Shane Jonathan Lozenich, Defendant / Petitioner Pro Se',
  causesOfAction: [
    {
      number: 'Cause 01',
      title: 'Due Process & Constitutional Violations',
      claims: 'Custodial detentions executed without formal criminal complaints (Cases 658931, 664676); mechanical deployment of competency proceedings under RCW 10.77 to bypass evidentiary testing; execution of a 45-day restoration order by Judge Melinda Young lacking both defense counsel representation and prior clinical evaluation; systemic denial of speedy trial rights under CrR 3.3.'
    },
    {
      number: 'Cause 02',
      title: 'Medical Battery & Civil Rights Infringements',
      claims: 'Documented pattern of forced psychiatric medication (Haloperidol, Risperdal) and invasive medical interventions (lumbar spinal puncture) conducted without informed consent or express judicial authorization during an un-ordered inter-agency transfer from jail to Harborview Medical Center; detention extended 10 days beyond insurer release recommendation.'
    },
    {
      number: 'Cause 03',
      title: 'Administrative Infrastructure & Data Failures',
      claims: 'Unlawful custodial seizures triggered by automated database misclassifications of expired protective orders (Case 660121); retaliatory eviction initiated by Public Development Authority following protected public news interview (Case 25-2-17456-5); systemic exclusion of recorded property covenants and title records under quasi-governmental immunity shields.'
    }
  ],
  reliefSought: [
    'Declaratory judgment establishing systemic constitutional breaches across King County municipal and superior court proceedings.',
    'Permanent expungement of un-adjudicated database records and false arrest traces from municipal and state law enforcement repositories.',
    'Structural administrative oversight reforms including real-time booking-to-prosecutor tracking and mandatory judicial signatures for medical transfers.'
  ]
};
