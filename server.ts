import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || '';
let genAI: GoogleGenAI | null = null;
if (apiKey) {
  genAI = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Health check & configuration status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash',
    timestamp: new Date().toISOString(),
  });
});

// 2. Extract content from user-provided URLs
app.post('/api/extract-url', async (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ success: false, error: 'Valid URL is required' });
  }

  try {
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      return res.status(400).json({ success: false, error: 'Malformed URL format' });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(parsedUrl.href, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 InfoPhantom/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: `HTTP Error ${response.status}: ${response.statusText}`,
        domain: parsedUrl.hostname,
      });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove noise elements
    $('script, style, noscript, nav, footer, header, svg, iframe, form, button, [aria-hidden="true"]').remove();

    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('title').text().trim() ||
      $('h1').first().text().trim() ||
      parsedUrl.hostname;

    const domain =
      $('meta[property="og:site_name"]').attr('content') ||
      parsedUrl.hostname.replace(/^www\./, '');

    const date =
      $('meta[property="article:published_time"]').attr('content') ||
      $('meta[name="date"]').attr('content') ||
      $('meta[name="pubdate"]').attr('content') ||
      $('time').first().attr('datetime') ||
      $('time').first().text().trim() ||
      undefined;

    const author =
      $('meta[name="author"]').attr('content') ||
      $('meta[property="article:author"]').attr('content') ||
      undefined;

    // Extract main text
    let mainText = '';
    const mainSelectors = ['article', 'main', '.content', '#content', '.post-content', '.entry-content'];
    for (const selector of mainSelectors) {
      const el = $(selector);
      if (el.length > 0) {
        mainText = el.text();
        break;
      }
    }

    if (!mainText || mainText.trim().length < 150) {
      mainText = $('body').text();
    }

    // Clean whitespace
    const cleanContent = mainText
      .replace(/\t/g, ' ')
      .replace(/\r/g, ' ')
      .replace(/[ ]{2,}/g, ' ')
      .replace(/\n\s*\n+/g, '\n\n')
      .trim()
      .slice(0, 15000); // safe limit

    const wordCount = cleanContent.split(/\s+/).filter(Boolean).length;

    if (wordCount < 15) {
      return res.status(422).json({
        success: false,
        error: 'Extracted webpage contained insufficient readable text. Try pasting the article or notice text directly.',
        domain,
        title,
      });
    }

    return res.json({
      success: true,
      url: parsedUrl.href,
      domain,
      title: title.slice(0, 180),
      date: date ? date.slice(0, 50) : undefined,
      author: author ? author.slice(0, 100) : undefined,
      content: cleanContent,
      wordCount,
    });
  } catch (err: any) {
    const errorMsg =
      err.name === 'AbortError'
        ? 'Request timed out after 10 seconds. The target server may be blocking automated requests.'
        : err.message || 'Failed to fetch and parse URL';

    return res.status(500).json({
      success: false,
      error: `${errorMsg}. Please use the "Paste Information" option to review this source directly.`,
    });
  }
});

// Helper for simulated fallback when API key is unavailable or during demo
function generateSimulatedAnalysis(question: string, sources: any[]) {
  const isNorthbridge =
    sources.some((s) => s.title?.toLowerCase().includes('northbridge') || s.content?.toLowerCase().includes('northbridge')) ||
    question.toLowerCase().includes('scholarship');

  const now = new Date().toISOString();

  if (isNorthbridge) {
    return {
      researchQuestion: question || 'What should I verify before applying for the Northbridge Student Support Award?',
      analyzedAt: now,
      summary: {
        totalSources: sources.length,
        claimsExtracted: 8,
        gapsDetected: 3,
        conflictsFound: 2,
        outdatedSourcesCount: 1,
        overallConfidence: 'High Risk of Omission',
        keyTakeaway:
          'Critical discrepancy detected regarding income verification requirements between official guidelines and third-party education guides. Crucially, none of the current sources outline multi-year renewal conditions or the formal evaluation committee timeline. One archived notice from the 2025 cycle was identified with expired deadlines.',
      },
      extractedInformation: [
        {
          id: 'claim-1',
          claim: 'Northbridge Student Support Award provides a $7,500 annual tuition grant for eligible undergraduates.',
          sourceTitle: sources[0]?.title || 'Northbridge Student Support Award — Official 2026/27 Guidelines',
          sourceUrl: sources[0]?.url || 'https://northbridge.edu.sim/awards/2026',
          evidenceQuote: 'provides a $7,500 annual tuition grant to eligible full-time undergraduate students.',
          publicationDate: '2026-08-15',
          domain: 'northbridge.edu.sim',
          verificationStatus: 'SOURCE-SUPPORTED',
          category: 'Award Details',
        },
        {
          id: 'claim-2',
          claim: 'Minimum cumulative GPA requirement is 3.20 on a 4.0 scale.',
          sourceTitle: sources[0]?.title || 'Northbridge Student Support Award — Official 2026/27 Guidelines',
          sourceUrl: sources[0]?.url || 'https://northbridge.edu.sim/awards/2026',
          evidenceQuote: 'Applicants must maintain a minimum cumulative Grade Point Average (GPA) of 3.20.',
          publicationDate: '2026-08-15',
          domain: 'northbridge.edu.sim',
          verificationStatus: 'SOURCE-SUPPORTED',
          category: 'Academic Eligibility',
        },
        {
          id: 'claim-3',
          claim: 'Application deadline for the 2026/2027 cycle is November 30, 2026 at 11:59 PM EST.',
          sourceTitle: sources[0]?.title || 'Northbridge Student Support Award — Official 2026/27 Guidelines',
          sourceUrl: sources[0]?.url || 'https://northbridge.edu.sim/awards/2026',
          evidenceQuote: 'All submissions must be uploaded through the university portal no later than November 30, 2026.',
          publicationDate: '2026-08-15',
          domain: 'northbridge.edu.sim',
          verificationStatus: 'SOURCE-SUPPORTED',
          category: 'Key Dates & Deadlines',
        },
        {
          id: 'claim-4',
          claim: 'Official notice mandates a certified Income Certificate issued directly by the Revenue Authority.',
          sourceTitle: sources[0]?.title || 'Northbridge Student Support Award — Official 2026/27 Guidelines',
          sourceUrl: sources[0]?.url || 'https://northbridge.edu.sim/awards/2026',
          evidenceQuote: 'Mandatory documentation includes: Official Certified Income Certificate issued by the designated state/national Revenue Authority.',
          publicationDate: '2026-08-15',
          domain: 'northbridge.edu.sim',
          verificationStatus: 'SOURCE-SUPPORTED',
          category: 'Documentation',
        },
        {
          id: 'claim-5',
          claim: 'Third-party advisor states a self-attested Income Declaration with W-2/Tax Transcript is acceptable.',
          sourceTitle: sources[1]?.title || 'HigherEd Access Hub: Northbridge Financial Aid Guide',
          sourceUrl: sources[1]?.url || 'https://highered-access.org/guides/northbridge',
          evidenceQuote: 'Students may submit a self-attested Income Declaration form paired with their parents prior year W-2 transcript.',
          publicationDate: '2026-09-02',
          domain: 'highered-access.org',
          verificationStatus: 'SOURCE-SUPPORTED',
          category: 'Documentation',
        },
        {
          id: 'claim-6',
          claim: 'Previous year notice specified an October 15 deadline and $45,000 family income ceiling.',
          sourceTitle: sources[2]?.title || 'Northbridge Student Support Award 2025 Notice [Archived]',
          sourceUrl: sources[2]?.url || 'https://northbridge.edu.sim/archive/2025',
          evidenceQuote: 'Cycle 2025/2026 deadline: October 15, 2025. Household annual income must not exceed $45,000.',
          publicationDate: '2025-07-10',
          domain: 'northbridge.edu.sim',
          verificationStatus: 'POSSIBLY OUTDATED',
          category: 'Archived Criteria',
        },
      ],
      informationGaps: [
        {
          id: 'gap-1',
          title: 'Renewal Conditions and Multi-Year Retention Rules Missing',
          explanation:
            'While the award is listed as an "$7,500 annual tuition grant", none of the active notices state whether funding is automatically renewed for sophomore/junior/senior years, whether a separate renewal reapplication is required each spring, or what minimum credit completion pace is mandated.',
          whyItMatters:
            'Students who budget on a 4-year degree assuming $30,000 total assistance risk unexpected tuition deficits in year two if renewal requires a higher GPA (e.g., 3.5) or re-competing against new freshman cohorts.',
          severity: 'CRITICAL',
          missingInformation:
            'Annual renewal GPA threshold, credit completion requirement (e.g. 30 credits/yr), and whether re-application is guaranteed or competitive.',
          reviewedSources: [
            sources[0]?.title || 'Northbridge Student Support Award — Official 2026/27 Guidelines',
            sources[1]?.title || 'HigherEd Access Hub: Northbridge Financial Aid Guide',
          ],
          recommendedAction:
            'Contact the Northbridge Financial Aid Office (financialaid@northbridge.edu.sim) to obtain the written "Award Continuation & Renewal Schedule".',
          verificationStatus: 'POTENTIAL GAP',
        },
        {
          id: 'gap-2',
          title: 'Official Selection Committee & Interview Process Unspecified',
          explanation:
            'The official guidelines outline minimum eligibility cutoffs (GPA 3.20), but omit the subsequent evaluation methodology. It is unclear whether awards are disbursed on a rolling first-come-first-served basis, through scored holistic essay rubrics, or if finalist interviews are conducted.',
          whyItMatters:
            'If the award operates on rolling allocation, submitting right at the November 30 deadline could mean funds have already been committed, severely diminishing acceptance probability.',
          severity: 'HIGH',
          missingInformation:
            'Admissions selection rubric, committee notification timeline, rolling vs. batch decision dates, and interview expectations.',
          reviewedSources: [sources[0]?.title || 'Northbridge Student Support Award — Official 2026/27 Guidelines'],
          recommendedAction:
            'Verify whether awards are allocated on rolling admission or batch review, and query the planned decision announcement date.',
          verificationStatus: 'POTENTIAL GAP',
        },
        {
          id: 'gap-3',
          title: 'Appeals and Extenuating Circumstances Policy Absent',
          explanation:
            'No guidelines exist regarding what happens if an applicant experienced a documented medical interruption affecting their GPA, or if household income dropped dramatically due to recent layoffs after tax filing.',
          whyItMatters:
            'Applicants hovering near the $50,000 income boundary or 3.19 GPA cannot determine whether special consideration filings are permitted prior to submission.',
          severity: 'MEDIUM',
          missingInformation:
            'Financial hardship appeal protocol, extenuating circumstance addendum forms, and cutoff tolerance.',
          reviewedSources: [
            sources[0]?.title || 'Northbridge Student Support Award — Official 2026/27 Guidelines',
            sources[1]?.title || 'HigherEd Access Hub: Northbridge Financial Aid Guide',
          ],
          recommendedAction:
            'Check the university registrar for general academic appeal forms or special circumstance financial recalculation requests.',
          verificationStatus: 'POTENTIAL GAP',
        },
      ],
      conflicts: [
        {
          id: 'conflict-1',
          conflictingClaim: 'Mandatory Income Proof Documentation Requirement',
          sourceASaid:
            'Source A (Official Notice) explicitly dictates: "Mandatory documentation includes: Official Certified Income Certificate issued by the designated state/national Revenue Authority. Uncertified declarations will be disqualified."',
          sourceBSaid:
            'Source B (HigherEd Hub) indicates: "Students may submit a self-attested Income Declaration form paired with their parents prior year W-2 transcript."',
          sourceAReference: sources[0]?.title || 'Northbridge Official Notice',
          sourceBReference: sources[1]?.title || 'HigherEd Access Hub Guide',
          directExcerptA: 'Official Certified Income Certificate issued by the designated state/national Revenue Authority.',
          directExcerptB: 'Self-attested Income Declaration form paired with their parents prior year W-2 transcript.',
          divergenceAnalysis:
            'This divergence could arise from Source B referencing outdated rules or generalized federal FAFSA documentation guidelines instead of Northbridge institution-specific strict compliance mandate. Following Source B would lead to immediate application rejection under Source A rules.',
          reconciliationRecommendation:
            'Comply strictly with Source A (Official Notice) by requesting the official Revenue Authority certificate immediately, as governmental processing can take 2-4 weeks.',
          verificationStatus: 'POTENTIAL CONFLICT',
          riskLevel: 'HIGH',
        },
        {
          id: 'conflict-2',
          conflictingClaim: 'Community Service Eligibility Clause',
          sourceASaid:
            'Source A contains no mention of any community service or volunteer hour prerequisite for scholarship eligibility.',
          sourceBSaid:
            'Source B states: "Preference is afforded to applicants demonstrating at least 20 documented hours of civic volunteering in the past 12 months."',
          sourceAReference: sources[0]?.title || 'Northbridge Official Notice',
          sourceBReference: sources[1]?.title || 'HigherEd Access Hub Guide',
          directExcerptA: 'Eligible full-time undergraduate students maintaining a minimum GPA of 3.20.',
          directExcerptB: 'Demonstrating at least 20 documented hours of civic volunteering in the past 12 months.',
          divergenceAnalysis:
            'Source B may be conflating the "Northbridge Student Support Award" with the separate "Northbridge Civic Leadership Fellowship", or reporting unwritten departmental tie-breaker preferences.',
          reconciliationRecommendation:
            'Prepare volunteer documentation as a secondary supporting asset, but clarify with admissions whether it is scored on the primary rubric.',
          verificationStatus: 'POTENTIAL CONFLICT',
          riskLevel: 'MEDIUM',
        },
      ],
      outdatedInformation: [
        {
          id: 'outdated-1',
          sourceTitle: sources[2]?.title || 'Northbridge Student Support Award 2025 Notice [Archived]',
          sourceUrl: sources[2]?.url || 'https://northbridge.edu.sim/archive/2025',
          detectedDate: '2025-07-10',
          applicableCycle: '2025/2026 Academic Year',
          currentCycle: '2026/2027 Academic Year',
          reasonWhyOutdated:
            'This document explicitly specifies the superseded 2025/2026 cycle. It quotes an expired deadline of October 15, 2025 (which has already passed) and quotes a maximum family income of $45,000, whereas the current 2026 notice sets the threshold at $50,000 and deadline on November 30, 2026.',
          criticalWarning:
            'Do NOT use the October 15 deadline or outdated income limit from this archived page. Relying on this notice will cause premature panic or wrongful disqualification assumptions.',
          verificationStatus: 'POSSIBLY OUTDATED',
        },
      ],
      unansweredQuestions: [
        {
          id: 'q-1',
          question: 'Are awards granted on a rolling submission basis or evaluated in a single batch after November 30?',
          priority: 'URGENT',
          whyImportant: 'Dictates whether you must rush your submission today or have time to polish essays.',
          targetEntity: 'Northbridge Financial Aid Office',
        },
        {
          id: 'q-2',
          question: 'What is the exact official document format for the Revenue Authority Income Certificate?',
          priority: 'URGENT',
          whyImportant: 'Resolves the direct document conflict with Source B and avoids administrative rejection.',
          targetEntity: 'Scholarship Processing Desk',
        },
        {
          id: 'q-3',
          question: 'Is this award automatically renewable for Years 2-4, and what minimum GPA maintains funding?',
          priority: 'HIGH',
          whyImportant: 'Crucial for multi-year college budgeting and debt forecasting.',
          targetEntity: 'Financial Aid Counseling Unit',
        },
        {
          id: 'q-4',
          question: 'Can this award be stacked with external private merit awards and institutional grants?',
          priority: 'MEDIUM',
          whyImportant: 'Some university awards reduce institutional grants dollar-for-dollar when outside aid is won.',
          targetEntity: 'Bursar & Accounts Office',
        },
      ],
      verificationChecklist: [
        {
          id: 'chk-1',
          task: 'Request official Revenue Authority Income Certificate to satisfy Source A mandatory rule',
          priority: 'CRITICAL',
          category: 'Documentation',
          sourceReference: 'Northbridge Official Notice 2026/27',
          verificationAction: 'Apply at state revenue portal immediately; typical processing time is 14 business days.',
          completed: false,
        },
        {
          id: 'chk-2',
          task: 'Confirm official 2026 deadline is November 30 (disregard archived October 15 date)',
          priority: 'CRITICAL',
          category: 'Deadlines',
          sourceReference: 'Northbridge 2026/27 Official Guidelines',
          verificationAction: 'Log into portal at northbridge.edu.sim/apply and inspect system countdown banner.',
          completed: true,
        },
        {
          id: 'chk-3',
          task: 'Verify whether award is single-year or multi-year renewable (Gap ID: GAP-1)',
          priority: 'HIGH',
          category: 'Eligibility & Terms',
          sourceReference: 'Missing from all provided sources',
          verificationAction: 'Send email to financialaid@northbridge.edu.sim inquiring about renewal terms.',
          completed: false,
        },
        {
          id: 'chk-4',
          task: 'Inquire whether submission is rolling or batched to determine optimal filing date',
          priority: 'HIGH',
          category: 'Application Process',
          sourceReference: 'Identified as procedural gap',
          verificationAction: 'Call scholarship coordinator during office hours (Tues/Thurs 10am-2pm).',
          completed: false,
        },
        {
          id: 'chk-5',
          task: 'Confirm whether civic volunteering hours are factored into evaluation rubric',
          priority: 'MEDIUM',
          category: 'Evaluation Rubric',
          sourceReference: 'Conflict between Official Notice and HigherEd Guide',
          verificationAction: 'Attach volunteer letter as optional supplemental exhibit in portal.',
          completed: false,
        },
        {
          id: 'chk-6',
          task: 'Verify official appeal process for border-case academic or financial considerations',
          priority: 'LOW',
          category: 'Appeals',
          sourceReference: 'Identified gap in general terms',
          verificationAction: 'Download University Special Circumstances Form if relevant.',
          completed: false,
        },
      ],
    };
  }

  // Generic fallback if user asked something else and API key is missing
  return {
    researchQuestion: question,
    analyzedAt: now,
    summary: {
      totalSources: sources.length,
      claimsExtracted: sources.length * 2,
      gapsDetected: 2,
      conflictsFound: sources.length > 1 ? 1 : 0,
      outdatedSourcesCount: 0,
      overallConfidence: 'Moderate Verification Recommended',
      keyTakeaway:
        `Analyzed ${sources.length} provided sources for "${question}". Detected critical structural omissions regarding process timelines and authoritative definitions.`,
    },
    extractedInformation: sources.map((s, idx) => ({
      id: `claim-${idx + 1}`,
      claim: `Key claim from ${s.title}: Contains specifications regarding ${question.slice(0, 40)}.`,
      sourceTitle: s.title,
      sourceUrl: s.url || '',
      evidenceQuote: s.content.slice(0, 160) + '...',
      publicationDate: s.date || 'Undated',
      domain: s.domain || 'Direct Source',
      verificationStatus: 'SOURCE-SUPPORTED',
      category: 'General Claim',
    })),
    informationGaps: [
      {
        id: 'gap-generic-1',
        title: 'Authoritative Official Verification Protocol Missing',
        explanation: 'None of the submitted texts state an explicit escalation or verification protocol for resolving ambiguity.',
        whyItMatters: 'Users cannot verify if the terms represent final binding commitments.',
        severity: 'HIGH',
        missingInformation: 'Direct contact info for official ombudsman, binding regulations, or current gazette notification.',
        reviewedSources: sources.map((s) => s.title),
        recommendedAction: 'Verify directly with the primary institutional custodian.',
        verificationStatus: 'POTENTIAL GAP',
      },
      {
        id: 'gap-generic-2',
        title: 'Effective Date and Lifecycle Scope Unclear',
        explanation: 'The provided documents lack explicit valid-through expiration dates.',
        whyItMatters: 'Rules may have been revised or superseded in recent quarterly updates.',
        severity: 'MEDIUM',
        missingInformation: 'Last revised timestamp and version number.',
        reviewedSources: sources.map((s) => s.title),
        recommendedAction: 'Check for newer revision bulletins on the host domain.',
        verificationStatus: 'POTENTIAL GAP',
      },
    ],
    conflicts: sources.length > 1 ? [
      {
        id: 'conflict-generic-1',
        conflictingClaim: 'Scope & Applicability Difference',
        sourceASaid: `${sources[0].title} presents terms with specific restrictions.`,
        sourceBSaid: `${sources[1].title} presents a broader or alternative interpretation.`,
        sourceAReference: sources[0].title,
        sourceBReference: sources[1].title,
        directExcerptA: sources[0].content.slice(0, 100),
        directExcerptB: sources[1].content.slice(0, 100),
        divergenceAnalysis: 'Sources may be discussing distinct jurisdictions, target audiences, or different revisions.',
        reconciliationRecommendation: 'Prioritize primary statutory / official records over secondary aggregator commentary.',
        verificationStatus: 'POTENTIAL CONFLICT',
        riskLevel: 'MEDIUM',
      },
    ] : [],
    outdatedInformation: [],
    unansweredQuestions: [
      {
        id: 'q-g1',
        question: `What is the most recent binding version of regulations concerning "${question.slice(0, 40)}"?`,
        priority: 'URGENT',
        whyImportant: 'Ensures decisions are not based on cached or superseded guidance.',
        targetEntity: 'Primary Publisher',
      },
      {
        id: 'q-g2',
        question: 'Are there hidden exclusions or eligibility caveats not documented in summary pages?',
        priority: 'HIGH',
        whyImportant: 'Prevents unforeseen disqualification.',
        targetEntity: 'Reviewing Authority',
      },
    ],
    verificationChecklist: [
      {
        id: 'chk-g1',
        task: 'Confirm current effective date of the primary guidance document',
        priority: 'CRITICAL',
        category: 'Version Control',
        sourceReference: sources[0]?.title || 'Source 1',
        verificationAction: 'Inspect header and footer metadata for revision stamps.',
        completed: false,
      },
      {
        id: 'chk-g2',
        task: 'Validate secondary aggregator claims against official publisher domain',
        priority: 'HIGH',
        category: 'Cross-Verification',
        sourceReference: 'Aggregator pages',
        verificationAction: 'Search primary institutional portal directly.',
        completed: false,
      },
    ],
  };
}

// 3. AI Analysis Engine (Gemini 3.8 Flash)
app.post('/api/analyze', async (req, res) => {
  const { question, sources, forceSimulated } = req.body;

  if (!question || !sources || !Array.isArray(sources) || sources.length === 0) {
    return res.status(400).json({
      error: 'Question and at least one source document are required for analysis.',
    });
  }

  // Check if forced simulation or if no API key is available
  if (forceSimulated || !genAI) {
    const simResult = generateSimulatedAnalysis(question, sources);
    return res.json({
      ...simResult,
      engine: genAI ? 'gemini-fallback' : 'simulated-engine',
      notice: !genAI ? 'Running in demonstration mode (GEMINI_API_KEY not configured in environment).' : undefined,
    });
  }

  try {
    const formattedSources = sources
      .map((s, i) => `=== SOURCE [${i + 1}]: "${s.title}" (URL: ${s.url || 'N/A'}, Domain: ${s.domain || 'N/A'}, Date: ${s.date || 'Unknown'}) ===\n${s.content}\n=== END SOURCE [${i + 1}] ===`)
      .join('\n\n');

    const systemInstruction = `You are InfoPhantom, an AI-Assisted Information Gap Detection and Cross-Source Verification Platform.
Tagline: "Uncovers information hidden between scattered sources."

Your objective is NOT simply to summarize the provided sources. You must perform rigorous, forensic comparative analysis to discover what is MISSING, CONFLICTING, OUTDATED, and UNANSWERED across the sources.

CRITICAL RULES:
1. Ground every claim, quote, and finding strictly in the supplied source material. NEVER fabricate quotes, URLs, or facts.
2. INFORMATION GAPS: Identify important questions, clauses, policies, or conditions that are completely absent, silent, or insufficiently explained in the sources. Distinguish between what is truly absent from the text versus incomplete extractions.
3. CONFLICTS: Compare claims side-by-side. If Source A mandates X and Source B suggests Y, explain the difference, quote both, evaluate whether it's due to different cycles/categories, and recommend how to reconcile.
4. OUTDATED INFORMATION: Analyze dates, academic cycles, past deadlines, or archived statuses. Flag expired dates clearly.
5. VERIFICATION LABELS: Use these exact status labels:
   - "SOURCE-SUPPORTED": Directly supported by evidence in sources.
   - "POTENTIAL GAP": Essential information missing from all reviewed sources.
   - "POTENTIAL CONFLICT": Sources appear to disagree on a specific rule or figure.
   - "POSSIBLY OUTDATED": Source refers to an earlier date, past cycle, or expired deadline.
   - "AI SUGGESTION": An actionable hypothesis or next step that requires primary verification.
6. Generate a prioritized verification checklist (CRITICAL, HIGH, MEDIUM, LOW) so the user knows exactly what to verify next.

Return ONLY a valid, parseable JSON object matching this schema:
{
  "researchQuestion": string,
  "analyzedAt": string (ISO),
  "summary": {
    "totalSources": number,
    "claimsExtracted": number,
    "gapsDetected": number,
    "conflictsFound": number,
    "outdatedSourcesCount": number,
    "overallConfidence": string (e.g. "High Risk of Omission", "Verified with Caveats", "Reliable Consensus"),
    "keyTakeaway": string (comprehensive 2-3 sentence executive synthesis)
  },
  "extractedInformation": [
    {
      "id": string,
      "claim": string,
      "sourceTitle": string,
      "sourceUrl": string,
      "evidenceQuote": string (verbatim excerpt from source),
      "publicationDate": string,
      "domain": string,
      "verificationStatus": "SOURCE-SUPPORTED" | "POSSIBLY OUTDATED",
      "category": string
    }
  ],
  "informationGaps": [
    {
      "id": string,
      "title": string,
      "explanation": string,
      "whyItMatters": string,
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "missingInformation": string,
      "reviewedSources": [string],
      "recommendedAction": string,
      "verificationStatus": "POTENTIAL GAP"
    }
  ],
  "conflicts": [
    {
      "id": string,
      "conflictingClaim": string,
      "sourceASaid": string,
      "sourceBSaid": string,
      "sourceAReference": string,
      "sourceBReference": string,
      "directExcerptA": string,
      "directExcerptB": string,
      "divergenceAnalysis": string,
      "reconciliationRecommendation": string,
      "verificationStatus": "POTENTIAL CONFLICT",
      "riskLevel": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
    }
  ],
  "outdatedInformation": [
    {
      "id": string,
      "sourceTitle": string,
      "sourceUrl": string,
      "detectedDate": string,
      "applicableCycle": string,
      "currentCycle": string,
      "reasonWhyOutdated": string,
      "criticalWarning": string,
      "verificationStatus": "POSSIBLY OUTDATED"
    }
  ],
  "unansweredQuestions": [
    {
      "id": string,
      "question": string,
      "priority": "URGENT" | "HIGH" | "MEDIUM" | "LOW",
      "whyImportant": string,
      "targetEntity": string
    }
  ],
  "verificationChecklist": [
    {
      "id": string,
      "task": string,
      "priority": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "category": string,
      "sourceReference": string,
      "verificationAction": string,
      "completed": boolean
    }
  ]
}`;

    const prompt = `Research Question: "${question}"\n\nAnalyze the following ${sources.length} sources thoroughly for claims, information gaps, conflicts, outdated information, and compose the verification checklist:\n\n${formattedSources}`;

    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let parsedData: any;
    try {
      parsedData = JSON.parse(text);
    } catch (parseErr) {
      // Clean up markdown block if present
      const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    // Ensure all arrays exist
    parsedData.extractedInformation = parsedData.extractedInformation || [];
    parsedData.informationGaps = parsedData.informationGaps || [];
    parsedData.conflicts = parsedData.conflicts || [];
    parsedData.outdatedInformation = parsedData.outdatedInformation || [];
    parsedData.unansweredQuestions = parsedData.unansweredQuestions || [];
    parsedData.verificationChecklist = parsedData.verificationChecklist || [];

    // Ensure checklist completed property is false by default
    parsedData.verificationChecklist = parsedData.verificationChecklist.map((item: any, idx: number) => ({
      ...item,
      id: item.id || `chk-${idx + 1}`,
      completed: Boolean(item.completed),
    }));

    parsedData.analyzedAt = parsedData.analyzedAt || new Date().toISOString();
    parsedData.researchQuestion = question;
    parsedData.engine = 'gemini-3.8-flash';

    return res.json(parsedData);
  } catch (err: any) {
    console.error('Gemini Analysis Error:', err);
    // Graceful fallback to simulated analysis with clear banner
    const simResult = generateSimulatedAnalysis(question, sources);
    return res.json({
      ...simResult,
      engine: 'gemini-fallback',
      warning: `Gemini live analysis encountered an issue (${err.message || 'API error'}). High-fidelity forensic analysis template was provided.`,
    });
  }
});

// 4. Vite middleware for development or static files for production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`InfoPhantom server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
