export type VerificationStatus =
  | 'SOURCE-SUPPORTED'
  | 'POTENTIAL GAP'
  | 'POTENTIAL CONFLICT'
  | 'POSSIBLY OUTDATED'
  | 'AI SUGGESTION';

export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface Source {
  id: string;
  title: string;
  url?: string;
  domain?: string;
  date?: string;
  author?: string;
  content: string;
  wordCount?: number;
  isSimulated?: boolean;
  status?: 'ready' | 'extracting' | 'failed';
  errorMessage?: string;
}

export interface ExtractedClaim {
  id: string;
  claim: string;
  sourceTitle: string;
  sourceUrl?: string;
  evidenceQuote: string;
  publicationDate?: string;
  domain?: string;
  verificationStatus: 'SOURCE-SUPPORTED' | 'POSSIBLY OUTDATED';
  category?: string;
}

export interface InformationGap {
  id: string;
  title: string;
  explanation: string;
  whyItMatters: string;
  severity: Priority;
  missingInformation: string;
  reviewedSources: string[];
  recommendedAction: string;
  verificationStatus: 'POTENTIAL GAP';
}

export interface Conflict {
  id: string;
  conflictingClaim: string;
  sourceASaid: string;
  sourceBSaid: string;
  sourceAReference: string;
  sourceBReference: string;
  directExcerptA: string;
  directExcerptB: string;
  divergenceAnalysis: string;
  reconciliationRecommendation: string;
  verificationStatus: 'POTENTIAL CONFLICT';
  riskLevel: Priority;
}

export interface OutdatedInfo {
  id: string;
  sourceTitle: string;
  sourceUrl?: string;
  detectedDate: string;
  applicableCycle: string;
  currentCycle: string;
  reasonWhyOutdated: string;
  criticalWarning: string;
  verificationStatus: 'POSSIBLY OUTDATED';
}

export interface UnansweredQuestion {
  id: string;
  question: string;
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
  whyImportant: string;
  targetEntity?: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  priority: Priority;
  category: string;
  sourceReference: string;
  verificationAction: string;
  completed: boolean;
  notes?: string;
}

export interface ResearchSummary {
  totalSources: number;
  claimsExtracted: number;
  gapsDetected: number;
  conflictsFound: number;
  outdatedSourcesCount: number;
  overallConfidence: string;
  keyTakeaway: string;
}

export interface AnalysisResult {
  researchQuestion: string;
  analyzedAt: string;
  summary: ResearchSummary;
  extractedInformation: ExtractedClaim[];
  informationGaps: InformationGap[];
  conflicts: Conflict[];
  outdatedInformation: OutdatedInfo[];
  unansweredQuestions: UnansweredQuestion[];
  verificationChecklist: ChecklistItem[];
  engine?: string;
  warning?: string;
  isSimulatedDemo?: boolean;
}

export interface ResearchSession {
  id: string;
  title: string;
  question: string;
  createdAt: string;
  updatedAt: string;
  sources: Source[];
  result?: AnalysisResult;
  isSimulatedDemo?: boolean;
}
