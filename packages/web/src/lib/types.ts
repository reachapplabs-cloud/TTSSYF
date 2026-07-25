/**
 * Mirrors the shapes in @relay/engine's types.ts. Kept as plain local types
 * (not a runtime import of the engine package) so the web dev server never
 * depends on the engine's build step — see packages/web/README section in
 * the root README for why.
 */
export type LaneId = "research" | "draft" | "structure";

export interface LaneDefinition {
  id: LaneId;
  label: string;
  sourceDescription: string;
}

export interface GenerationResult {
  lane: LaneId;
  providerLabel: string;
  content: string;
  generatedAt: string;
}

export type OutputFormatId = "blog" | "linkedin" | "founderStory" | "twitterThread" | "newsletter";

export interface OutputFormatDefinition {
  id: OutputFormatId;
  label: string;
  description: string;
}

export interface RepurposedPiece {
  format: OutputFormatId;
  content: string;
  generatedAt: string;
}

export type SubmissionStatus = "generating" | "in_review" | "approved";

export interface Submission {
  id: string;
  founderId: string;
  rawInput: string;
  direction?: string;
  laneResults: GenerationResult[];
  status: SubmissionStatus;
  mergedDraft?: string;
  approvalInsight?: string;
  approvedAt?: string;
  pieces?: RepurposedPiece[];
  createdAt: string;
}

export interface VoiceSampleResult {
  observations: string[];
  rewritten: string;
  generatedAt: string;
}

export interface VoiceProfile {
  toneNotes: string[];
  signaturePhrases: string[];
  bannedPhrases: string[];
  sampleSentences: string[];
}

export interface AvatarIdentity {
  name?: string;
  role?: string;
  company?: string;
}

export interface Avatar {
  founderId: string;
  identity: AvatarIdentity;
  voiceProfile: VoiceProfile;
  insights: string[];
  updatedAt: string;
}

export interface AvatarIdea {
  headline: string;
  angle: string;
  generatedAt: string;
}
