import { AnalysisResult, Source } from '../types';

export const SIMULATION_DISCLAIMER =
  'SIMULATED DEMONSTRATION DATA — NOT A REAL SCHOLARSHIP OR OFFICIAL NOTICE.';

export const NORTHBRIDGE_SOURCES: Source[] = [
  {
    id: 'demo-source-a',
    title: 'Northbridge Student Support Award — Official 2026/27 Guidelines',
    url: 'https://northbridge.edu.sim/financial-aid/awards/2026-guidelines',
    domain: 'northbridge.edu.sim',
    date: '2026-08-15',
    author: 'Northbridge Financial Aid & Scholarship Committee',
    wordCount: 412,
    isSimulated: true,
    status: 'ready',
    content: `[SIMULATED DEMONSTRATION DATA — NOT A REAL SCHOLARSHIP OR OFFICIAL NOTICE]

NORTHBRIDGE UNIVERSITY — STUDENT SUPPORT AWARD (ACADEMIC YEAR 2026/2027)
Official Notice & Application Guidelines | Document Ref: NU-SFA-2026-B4

1. PROGRAM PURPOSE
The Northbridge Student Support Award provides a $7,500 annual tuition grant to eligible full-time undergraduate students who demonstrate academic merit and verified financial need.

2. ELIGIBILITY REQUIREMENTS
- Enrollment: Applicants must be enrolled or accepted for full-time undergraduate study (minimum 12 credit hours per semester) at Northbridge University for Fall 2026.
- Academic Merit: Applicants must maintain a minimum cumulative Grade Point Average (GPA) of 3.20 on a 4.0 scale (or equivalent). High school seniors must submit official transcripts through Semester 7.
- Financial Need Ceiling: Total household taxable income must not exceed $50,000 for the preceding tax year.

3. REQUIRED DOCUMENTATION
Mandatory documentation includes:
- Completed Online Student Financial Aid Form (Form SF-101).
- Official Certified Income Certificate issued by the designated state/national Revenue Authority. Uncertified declarations or unverified tax transcripts will be disqualified automatically.
- Two academic faculty recommendation letters submitted through the secure institutional portal.

4. APPLICATION DEADLINE
All submissions must be uploaded through the university portal no later than November 30, 2026 at 11:59 PM EST. Incomplete or late packets cannot be reviewed under any circumstances.

[Note: Document ends without discussing sophomore renewal thresholds, multi-year guarantees, evaluation rubric weighting, or appeal procedures.]`,
  },
  {
    id: 'demo-source-b',
    title: 'HigherEd Access Hub: Northbridge Financial Aid Guide',
    url: 'https://highered-access.org/scholarships/northbridge-award-guide',
    domain: 'highered-access.org',
    date: '2026-09-02',
    author: 'Marcus Vance, Senior Education Financing Analyst',
    wordCount: 368,
    isSimulated: true,
    status: 'ready',
    content: `[SIMULATED DEMONSTRATION DATA — NOT A REAL SCHOLARSHIP OR OFFICIAL NOTICE]

HIGHERED ACCESS HUB — INDEPENDENT STUDENT AID ANALYSIS
Guide to the Northbridge Student Support Award (Updated September 2026)

Overview:
Northbridge University offers its flagship $7,500 annual award to help offset rising undergraduate STEM and liberal arts tuition costs.

Key Eligibility Criteria & Community Service Preference:
To qualify, candidates must maintain a 3.20 GPA and meet income requirements. Additionally, preference is afforded to applicants demonstrating at least 20 documented hours of civic volunteering in the past 12 months with a registered 501(c)(3) nonprofit or community organization.

Documentation Requirements:
Students may submit a self-attested Income Declaration form paired with their parents' prior year W-2 transcript or 1040 schedule. According to regional guidance, state-issued certified revenue certificates are optional unless selected for formal federal verification audit.

Application Tips:
Submit early through the financial aid portal. The university traditionally considers applicants on a rolling priority wave before the November cutoff.`,
  },
  {
    id: 'demo-source-c',
    title: 'Northbridge Student Support Award 2025 Notice [Archived]',
    url: 'https://northbridge.edu.sim/archive/2025/scholarships/support-award',
    domain: 'northbridge.edu.sim',
    date: '2025-07-10',
    author: 'Office of Student Grants (Archive)',
    wordCount: 310,
    isSimulated: true,
    status: 'ready',
    content: `[SIMULATED DEMONSTRATION DATA — NOT A REAL SCHOLARSHIP OR OFFICIAL NOTICE]

NORTHBRIDGE UNIVERSITY — STUDENT SUPPORT AWARD [ARCHIVED 2025/2026 CYCLE]
Notice ID: NU-SFA-2025-ARCHIVED

Applicable Academic Cycle: 2025/2026 Academic Year
This document is preserved for historical auditing purposes.

Terms & Conditions for 2025:
- Award Value: $6,500 tuition credit.
- Academic Threshold: Minimum cumulative GPA 3.00.
- Income Ceiling: Household annual income must not exceed $45,000.
- Application Deadline: Cycle 2025/2026 deadline: October 15, 2025. Applications received after 5:00 PM October 15, 2025 were rejected.
- Submission Format: Physical paper submission delivered to Hall Hall Room 204 or scanned PDF email.

Status: SUPERSEDED. Do not rely on 2025 parameters for subsequent academic years.`,
  },
];

export const NORTHBRIDGE_ANALYSIS_RESULT: AnalysisResult = {
  researchQuestion:
    'What should I verify before applying for the Northbridge Student Support Award?',
  analyzedAt: new Date().toISOString(),
  isSimulatedDemo: true,
  summary: {
    totalSources: 3,
    claimsExtracted: 8,
    gapsDetected: 3,
    conflictsFound: 2,
    outdatedSourcesCount: 1,
    overallConfidence: 'High Risk of Omission',
    keyTakeaway:
      'A severe document requirement conflict exists between the official guidelines (mandating a state Revenue Authority Certified Income Certificate) and secondary guides (suggesting a self-attested declaration). Crucially, none of the current notices state whether the $7,500 grant is renewable past Year 1. Additionally, an archived 2025 notice lists an obsolete October 15 deadline and superseded $45k income ceiling.',
  },
  extractedInformation: [
    {
      id: 'claim-1',
      claim:
        'Northbridge Student Support Award provides a $7,500 annual tuition grant to eligible full-time undergraduates.',
      sourceTitle: 'Northbridge Student Support Award — Official 2026/27 Guidelines',
      sourceUrl: 'https://northbridge.edu.sim/financial-aid/awards/2026-guidelines',
      evidenceQuote:
        'provides a $7,500 annual tuition grant to eligible full-time undergraduate students who demonstrate academic merit and verified financial need.',
      publicationDate: '2026-08-15',
      domain: 'northbridge.edu.sim',
      verificationStatus: 'SOURCE-SUPPORTED',
      category: 'Award Value',
    },
    {
      id: 'claim-2',
      claim: 'Minimum academic eligibility requires a cumulative GPA of 3.20 on a 4.0 scale.',
      sourceTitle: 'Northbridge Student Support Award — Official 2026/27 Guidelines',
      sourceUrl: 'https://northbridge.edu.sim/financial-aid/awards/2026-guidelines',
      evidenceQuote:
        'Applicants must maintain a minimum cumulative Grade Point Average (GPA) of 3.20 on a 4.0 scale (or equivalent).',
      publicationDate: '2026-08-15',
      domain: 'northbridge.edu.sim',
      verificationStatus: 'SOURCE-SUPPORTED',
      category: 'Academic Merit',
    },
    {
      id: 'claim-3',
      claim:
        'The official 2026/2027 application deadline is November 30, 2026 at 11:59 PM EST via online portal.',
      sourceTitle: 'Northbridge Student Support Award — Official 2026/27 Guidelines',
      sourceUrl: 'https://northbridge.edu.sim/financial-aid/awards/2026-guidelines',
      evidenceQuote:
        'All submissions must be uploaded through the university portal no later than November 30, 2026 at 11:59 PM EST.',
      publicationDate: '2026-08-15',
      domain: 'northbridge.edu.sim',
      verificationStatus: 'SOURCE-SUPPORTED',
      category: 'Deadlines',
    },
    {
      id: 'claim-4',
      claim:
        'Official notice mandates an Official Certified Income Certificate issued by the designated state/national Revenue Authority.',
      sourceTitle: 'Northbridge Student Support Award — Official 2026/27 Guidelines',
      sourceUrl: 'https://northbridge.edu.sim/financial-aid/awards/2026-guidelines',
      evidenceQuote:
        'Official Certified Income Certificate issued by the designated state/national Revenue Authority. Uncertified declarations or unverified tax transcripts will be disqualified automatically.',
      publicationDate: '2026-08-15',
      domain: 'northbridge.edu.sim',
      verificationStatus: 'SOURCE-SUPPORTED',
      category: 'Required Documents',
    },
    {
      id: 'claim-5',
      claim:
        'Educational guide claims a self-attested Income Declaration paired with W-2/Tax Transcript is sufficient.',
      sourceTitle: 'HigherEd Access Hub: Northbridge Financial Aid Guide',
      sourceUrl: 'https://highered-access.org/scholarships/northbridge-award-guide',
      evidenceQuote:
        'Students may submit a self-attested Income Declaration form paired with their parents prior year W-2 transcript or 1040 schedule.',
      publicationDate: '2026-09-02',
      domain: 'highered-access.org',
      verificationStatus: 'SOURCE-SUPPORTED',
      category: 'Required Documents',
    },
    {
      id: 'claim-6',
      claim:
        'Archived 2025 notice specifies an expired deadline of October 15, 2025 and lower $45,000 income ceiling.',
      sourceTitle: 'Northbridge Student Support Award 2025 Notice [Archived]',
      sourceUrl: 'https://northbridge.edu.sim/archive/2025/scholarships/support-award',
      evidenceQuote:
        'Cycle 2025/2026 deadline: October 15, 2025. Household annual income must not exceed $45,000.',
      publicationDate: '2025-07-10',
      domain: 'northbridge.edu.sim',
      verificationStatus: 'POSSIBLY OUTDATED',
      category: 'Archived Criteria',
    },
  ],
  informationGaps: [
    {
      id: 'gap-1',
      title: 'Renewal Terms & Multi-Year Continuation Rules Completely Absent',
      explanation:
        'While the award is described as an "$7,500 annual tuition grant", none of the active sources specify whether the grant automatically renews for subsequent sophomore/junior/senior years, requires annual reapplication, or enforces a higher GPA retention benchmark (e.g. 3.50).',
      whyItMatters:
        'Undergraduates budgeting for a 4-year degree risk assuming $30,000 in total aid when they may only be guaranteed Year 1 funding, leading to sudden out-of-pocket tuition debt in Year 2.',
      severity: 'CRITICAL',
      missingInformation:
        'Renewal eligibility thresholds, annual credit progression requirements (e.g. 30 credit hours), renewal application window, and multi-year funding guarantees.',
      reviewedSources: [
        'Northbridge Student Support Award — Official 2026/27 Guidelines',
        'HigherEd Access Hub: Northbridge Financial Aid Guide',
      ],
      recommendedAction:
        'Contact Northbridge Financial Aid Office (financialaid@northbridge.edu.sim) to request the official "Scholarship Retention & Renewal Bylaws".',
      verificationStatus: 'POTENTIAL GAP',
    },
    {
      id: 'gap-2',
      title: 'Selection Evaluation Rubric & Allocation Methodology Unspecified',
      explanation:
        'The guidelines specify minimum qualifying benchmarks (GPA 3.20, income <$50k) but leave the selection process silent: are awards disbursed on a rolling first-come-first-served basis, ranked strictly by financial need, or evaluated via competitive essay scoring?',
      whyItMatters:
        'If funds are disbursed on a rolling first-come basis, applying on the November 30 deadline day may result in rejection due to fund exhaustion despite meeting all eligibility criteria.',
      severity: 'HIGH',
      missingInformation:
        'Selection committee timeline, rolling vs. batch decision dates, essay rubric weightings, and whether finalist interviews are conducted.',
      reviewedSources: ['Northbridge Student Support Award — Official 2026/27 Guidelines'],
      recommendedAction:
        'Confirm with the admissions office whether scholarship funds are disbursed on a rolling review timeline or evaluated in a single post-deadline batch.',
      verificationStatus: 'POTENTIAL GAP',
    },
    {
      id: 'gap-3',
      title: 'Appeals Protocol for Extenuating Circumstances Missing',
      explanation:
        'Neither source provides instructions for students whose family experienced sudden income loss (e.g. medical emergency or layoff) after filing their previous year taxes, or whose GPA temporarily slipped due to documented illness.',
      whyItMatters:
        'Applicants on the borderline of the $50,000 cutoff or 3.19 GPA cannot determine whether special circumstance petition letters will be considered.',
      severity: 'MEDIUM',
      missingInformation:
        'Professional judgment review process, income adjustment petition forms, and academic appeal deadlines.',
      reviewedSources: [
        'Northbridge Student Support Award — Official 2026/27 Guidelines',
        'HigherEd Access Hub: Northbridge Financial Aid Guide',
      ],
      recommendedAction:
        'Check the Northbridge Registrar portal for general University Special Consideration & Financial Appeal forms.',
      verificationStatus: 'POTENTIAL GAP',
    },
  ],
  conflicts: [
    {
      id: 'conflict-1',
      conflictingClaim: 'Mandatory Income Documentation Format',
      sourceASaid:
        'Official Notice mandates: "Official Certified Income Certificate issued by the designated state/national Revenue Authority. Uncertified declarations or unverified tax transcripts will be disqualified automatically."',
      sourceBSaid:
        'HigherEd Access Hub claims: "Students may submit a self-attested Income Declaration form paired with their parents prior year W-2 transcript or 1040 schedule."',
      sourceAReference: 'Northbridge Student Support Award — Official 2026/27 Guidelines',
      sourceBReference: 'HigherEd Access Hub: Northbridge Financial Aid Guide',
      directExcerptA:
        'Official Certified Income Certificate issued by the designated state/national Revenue Authority. Uncertified declarations or unverified tax transcripts will be disqualified automatically.',
      directExcerptB:
        'Students may submit a self-attested Income Declaration form paired with their parents prior year W-2 transcript or 1040 schedule.',
      divergenceAnalysis:
        'Source B appears to conflate standard federal FAFSA documentation with Northbridge University’s stricter institutional mandate. Following Source B’s advice would trigger automatic application disqualification under Section 3 of the official rules.',
      reconciliationRecommendation:
        'Follow Source A (Official Notice) unconditionally. Order your certified Revenue Authority certificate immediately, as official government certification typically takes 2-3 weeks.',
      verificationStatus: 'POTENTIAL CONFLICT',
      riskLevel: 'CRITICAL',
    },
    {
      id: 'conflict-2',
      conflictingClaim: 'Civic Volunteering Requirement / Preference',
      sourceASaid:
        'Official Guidelines make zero mention of community service or volunteer hour quotas in the eligibility or documentation sections.',
      sourceBSaid:
        'HigherEd Guide asserts: "Preference is afforded to applicants demonstrating at least 20 documented hours of civic volunteering in the past 12 months."',
      sourceAReference: 'Northbridge Student Support Award — Official 2026/27 Guidelines',
      sourceBReference: 'HigherEd Access Hub: Northbridge Financial Aid Guide',
      directExcerptA:
        'Applicants must be enrolled or accepted for full-time undergraduate study... minimum cumulative GPA 3.20... total household taxable income not exceed $50,000.',
      directExcerptB:
        'Preference is afforded to applicants demonstrating at least 20 documented hours of civic volunteering in the past 12 months with a registered 501(c)(3) nonprofit.',
      divergenceAnalysis:
        'The third-party author may be referencing an unwritten tie-breaking policy, or confusing this award with the distinct Northbridge Civic Leadership Fellowship.',
      reconciliationRecommendation:
        'Prepare 20 hours of volunteer documentation as an optional supplemental exhibit, but contact admissions to clarify whether it is an evaluated rubric criteria.',
      verificationStatus: 'POTENTIAL CONFLICT',
      riskLevel: 'MEDIUM',
    },
  ],
  outdatedInformation: [
    {
      id: 'outdated-1',
      sourceTitle: 'Northbridge Student Support Award 2025 Notice [Archived]',
      sourceUrl: 'https://northbridge.edu.sim/archive/2025/scholarships/support-award',
      detectedDate: '2025-07-10',
      applicableCycle: '2025/2026 Academic Year',
      currentCycle: '2026/2027 Academic Year',
      reasonWhyOutdated:
        'This notice explicitly applies to the previous 2025/2026 academic cycle. It lists an expired deadline of October 15, 2025 (over a year ago), quotes a lower award amount ($6,500 vs $7,500), and quotes a superseded $45,000 income ceiling.',
      criticalWarning:
        'DISREGARD October 15 deadline and $45k ceiling. Relying on this archived notice could lead an applicant to mistakenly believe they are disqualified or miss the current November 30, 2026 portal deadline.',
      verificationStatus: 'POSSIBLY OUTDATED',
    },
  ],
  unansweredQuestions: [
    {
      id: 'q-1',
      question:
        'Is the $7,500 award renewable for Years 2-4, and what minimum collegiate GPA is required to maintain funding?',
      priority: 'URGENT',
      whyImportant:
        'Critical for 4-year financial planning; without renewal terms, student debt projections cannot be verified.',
      targetEntity: 'Northbridge Financial Aid Office',
    },
    {
      id: 'q-2',
      question:
        'What specific Revenue Authority form code satisfies the Certified Income Certificate mandate?',
      priority: 'URGENT',
      whyImportant:
        'Directly resolves the critical conflict with third-party guides and prevents procedural disqualification.',
      targetEntity: 'Scholarship Processing Desk',
    },
    {
      id: 'q-3',
      question:
        'Are applications evaluated on rolling submission waves or in a single batch after November 30?',
      priority: 'HIGH',
      whyImportant:
        'Determines whether the applicant must submit immediately or can take extra weeks to polish recommendation letters.',
      targetEntity: 'Admissions & Awards Committee',
    },
    {
      id: 'q-4',
      question:
        'Are external merit scholarships or federal Pell grants deducted from the $7,500 institutional award?',
      priority: 'MEDIUM',
      whyImportant:
        'Some universities practice scholarship displacement, reducing institutional aid when private grants are won.',
      targetEntity: 'Bursar & Student Accounts',
    },
  ],
  verificationChecklist: [
    {
      id: 'chk-1',
      task: 'Obtain official Revenue Authority Certified Income Certificate (satisfies Source A mandatory rule)',
      priority: 'CRITICAL',
      category: 'Documentation',
      sourceReference: 'Northbridge Official Notice 2026/27 (Sec 3)',
      verificationAction:
        'Request certified tax summary from state tax portal; allow 10-15 business days for certified seal.',
      completed: false,
      notes: 'Prioritized over self-attested form based on conflict analysis.',
    },
    {
      id: 'chk-2',
      task: 'Verify official 2026 deadline is November 30 at 11:59 PM EST (disregard archived Oct 15 date)',
      priority: 'CRITICAL',
      category: 'Deadlines',
      sourceReference: 'Northbridge 2026/27 Official Guidelines (Sec 4)',
      verificationAction:
        'Log in to northbridge.edu.sim portal and verify active system submission countdown timer.',
      completed: true,
      notes: 'Confirmed in university portal banner.',
    },
    {
      id: 'chk-3',
      task: 'Confirm whether the $7,500 grant is single-year only or renewable for sophomore through senior years',
      priority: 'HIGH',
      category: 'Retention & Renewal',
      sourceReference: 'Detected Dark Spot: Missing from all provided sources',
      verificationAction:
        'Email financialaid@northbridge.edu.sim inquiring about multi-year continuation criteria.',
      completed: false,
    },
    {
      id: 'chk-4',
      task: 'Inquire whether selection is rolling or batched to determine optimal submission date',
      priority: 'HIGH',
      category: 'Selection Process',
      sourceReference: 'Detected Dark Spot: Evaluation rubric missing',
      verificationAction:
        'Contact Financial Aid counseling desk via phone or chat during scheduled office hours.',
      completed: false,
    },
    {
      id: 'chk-5',
      task: 'Check if 20 hours of volunteer service is officially scored or merely a third-party recommendation',
      priority: 'MEDIUM',
      category: 'Eligibility Verification',
      sourceReference: 'HigherEd Access Hub Guide vs Official Guidelines',
      verificationAction:
        'Prepare supervisor verification letter as optional upload in portal supplemental section.',
      completed: false,
    },
    {
      id: 'chk-6',
      task: 'Inspect institutional Special Circumstances appeal policy for recent income changes or borderline GPA',
      priority: 'LOW',
      category: 'Appeals',
      sourceReference: 'Identified procedural gap in official guidelines',
      verificationAction:
        'Download university Special Consideration petition in case tax year does not reflect current reality.',
      completed: false,
    },
  ],
};
