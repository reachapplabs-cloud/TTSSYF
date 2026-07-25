/**
 * Core domain types for the Relay content engine.
 *
 * Vocabulary:
 * - "lane"      = one generation source shown to the human (research/
 *                 ideation, drafting, structuring). Each lane is backed by
 *                 a pluggable GenerationAdapter so a real model API can
 *                 replace the mock without touching anything downstream.
 * - "avatar"    = the person: identity + accumulated insights (beliefs,
 *                 POV, stories, expertise) plus the voice profile below.
 *                 Substance, not style — captured once, reused/extended
 *                 across every future piece (PRD §4).
 * - "voice profile" = how the person writes (tone, phrases, rhythm) —
 *                 lives inside the avatar, governs style, not substance.
 * - "direction" = an optional per-submission steering note the founder
 *                 gives *before* generation runs — the explicit mechanic
 *                 that makes Relay directable rather than automated
 *                 (PRD §3-4).
 * - "draft"     = the human-approved, merged output of a submission.
 * - "piece"     = one repurposed output derived from an approved draft
 *                 (a LinkedIn post, a founder story, etc).
 */

export type LaneId = "research" | "draft" | "structure";

export interface LaneDefinition {
  id: LaneId;
  label: string;
  /** Human-readable description of what this lane is "standing in for" — shown in the UI so the review stays transparent about where each option came from. */
  sourceDescription: string;
}

export const LANES: LaneDefinition[] = [
  {
    id: "research",
    label: "Research & Ideation",
    sourceDescription:
      "Broad idea expansion and supporting facts/angles (the 'Complexity/Perplexity-style' lane).",
  },
  {
    id: "draft",
    label: "Draft",
    sourceDescription:
      "A fast, complete first-pass draft (the 'ChatGPT-style' lane).",
  },
  {
    id: "structure",
    label: "Structure & Longform",
    sourceDescription:
      "A more deliberate, structured long-form pass (the 'Claude/Sonnet-style' lane).",
  },
];

export interface VoiceProfile {
  /** Free-text notes accumulated about how this person actually writes. */
  toneNotes: string[];
  /** Phrases/openers this person is known to use often — biases generation toward them. */
  signaturePhrases: string[];
  /** Phrases/patterns to avoid — accumulated from things the founder always cuts. */
  bannedPhrases: string[];
  /** Raw sentence-level examples pulled from accepted edits, used to few-shot future generations. */
  sampleSentences: string[];
}

function emptyVoiceProfile(): VoiceProfile {
  return {
    toneNotes: [],
    signaturePhrases: [],
    bannedPhrases: [],
    sampleSentences: [],
  };
}

export interface AvatarIdentity {
  name?: string;
  role?: string;
  company?: string;
}

/**
 * The person: identity + voice profile (style) + insights (substance —
 * beliefs, POV, stories, expertise this founder wants replicated and
 * extended, not just restyled). Captured once, reused and grown across
 * every submission — see PRD §4.
 */
export interface Avatar {
  founderId: string;
  identity: AvatarIdentity;
  voiceProfile: VoiceProfile;
  /** Beliefs, POV, stories, claims — the substance to build new content from, distinct from style. */
  insights: string[];
  updatedAt: string;
}

export function emptyAvatar(founderId: string, identity: AvatarIdentity = {}): Avatar {
  return {
    founderId,
    identity,
    voiceProfile: emptyVoiceProfile(),
    insights: [],
    updatedAt: new Date().toISOString(),
  };
}

export interface GenerationInput {
  /** Raw text, transcript, or notes the founder pasted in. */
  rawInput: string;
  avatar: Avatar;
  /** Optional per-submission steering note — how the founder directs this specific piece before generation runs. */
  direction?: string;
}

export interface GenerationResult {
  lane: LaneId;
  /** Name of the underlying provider/model this lane is configured to use — shown in the UI. */
  providerLabel: string;
  content: string;
  generatedAt: string;
}

export type OutputFormatId =
  | "blog"
  | "linkedin"
  | "founderStory"
  | "twitterThread"
  | "newsletter";

export interface OutputFormatDefinition {
  id: OutputFormatId;
  label: string;
  description: string;
}

export const OUTPUT_FORMATS: OutputFormatDefinition[] = [
  {
    id: "blog",
    label: "Blog post",
    description: "Full long-form article for the company/founder blog.",
  },
  {
    id: "linkedin",
    label: "LinkedIn post",
    description: "Short-form, hook-first post sized for LinkedIn.",
  },
  {
    id: "founderStory",
    label: "Founder story",
    description: "First-person narrative framing, for about pages / press / investor updates.",
  },
  {
    id: "twitterThread",
    label: "X/Twitter thread",
    description: "3-6 tweet thread breaking the idea into a sequence.",
  },
  {
    id: "newsletter",
    label: "Newsletter blurb",
    description: "Short blurb sized for a founder's own email newsletter.",
  },
];

/** Which output formats a founder wants generated on every approval — configurable per PRD §4/§6. */
export type OutputProfile = OutputFormatId[];

export const DEFAULT_OUTPUT_PROFILE: OutputProfile = [
  "linkedin",
  "founderStory",
  "twitterThread",
];

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
  /** The steering note the founder gave before generation ran, if any — see PRD §5.2. */
  direction?: string;
  laneResults: GenerationResult[];
  status: SubmissionStatus;
  mergedDraft?: string;
  /** Explicit insight the founder attached at approval time — folds into the avatar's insights bank, distinct from style learning. */
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

export interface AvatarIdea {
  headline: string;
  angle: string;
  generatedAt: string;
}
