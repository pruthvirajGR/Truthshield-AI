export type RiskLevel = 'LOW_RISK' | 'INCONCLUSIVE' | 'SUSPICIOUS';

export interface ForensicScoreDetail {
  score: number;
  status: 'clean' | 'warning' | 'critical';
  details: string;
}

export interface AnnotatedRegion {
  label: string;
  severity: 'warning' | 'critical' | 'info';
  description: string;
  box_2d?: [number, number, number, number] | null; // [ymin, xmin, ymax, xmax] normalized 0-1000
}

export interface ForensicReport {
  riskLevel: RiskLevel;
  confidenceScore: number;
  verdictTitle: string;
  verdictSummary: string;
  primaryFlags: string[];
  forensicBreakdown: {
    facialArtifacts: ForensicScoreDetail;
    lightingAndShadows: ForensicScoreDetail;
    backgroundAndEdges: ForensicScoreDetail;
    metadataIntegrity: ForensicScoreDetail;
    impersonationScamCues: ForensicScoreDetail;
  };
  annotatedRegions?: AnnotatedRegion[];
  uncertaintyNotice: string;
  karnatakaCyberAdvice: {
    immediateAction: string;
    scamPatternIdentified: string;
    legalRelevantSections: string[];
    evidencePreservationSteps: string[];
  };
  sha256Hash: string;
  analyzedAt: string;
  fileName: string;
  fileSize: number;
  extractedFrames?: string[];
  selectedModel?: string;
  modelName?: string;
}

export interface MediaMetadata {
  fileName: string;
  fileSize: number;
  fileType: string;
  dimensions?: { width: number; height: number };
  duration?: number;
  hasAudio?: boolean;
  exifData?: Record<string, string>;
  c2paDetected?: boolean;
  sha256?: string;
}

export interface VideoFrameSample {
  id: number;
  base64: string;
  timestamp: number;
  label: string;
}

export type Language = 'en' | 'kn';

export interface SampleMediaItem {
  id: string;
  title: string;
  titleKn: string;
  category: 'fake_police' | 'deepfake_face' | 'authentic';
  description: string;
  descriptionKn: string;
  thumbnail: string;
  mediaUrl: string;
  mediaType: 'image' | 'video_call';
  context: string;
}
