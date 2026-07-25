import { GenerationAdapter, RepurposeAdapter } from "./types.js";
import { GenerationInput, VoiceProfile } from "../types.js";
import { keyPhrases, titleCase, truncate, splitSentences } from "./textUtils.js";

/**
 * These are deliberately rule-based, not real model calls: they let the
 * whole workflow (three labeled lanes -> merge -> voice profile -> fan-out)
 * be demoed and tested with zero API keys. Each one implements the same
 * GenerationAdapter interface a real Claude/GPT/Perplexity call would, so
 * swapping in a live provider is a one-file change — see README in this
 * package for the wiring point.
 */

function voicePrefix(voiceProfile: VoiceProfile): string {
  if (voiceProfile.signaturePhrases.length === 0) return "";
  return voiceProfile.signaturePhrases[0];
}

export const mockResearchAdapter: GenerationAdapter = {
  lane: "research",
  providerLabel: "Research Lane (mock — wire to Perplexity/web-research API)",
  async generate(input: GenerationInput) {
    const topics = keyPhrases(input.rawInput, 4);
    const angles = [
      `What's the contrarian take on ${topics[0] ?? "this"} that most people in the space won't say out loud?`,
      `A concrete example or number that makes "${topics[1] ?? "the claim"}" believable instead of generic.`,
      `Who specifically is this for, and who should explicitly ignore it?`,
      `What changes for the reader in the next 30 days if they act on this?`,
    ];
    const content = [
      `Angles worth drafting from:`,
      ...angles.map((a, i) => `${i + 1}. ${a}`),
      ``,
      `Key themes detected in the input: ${topics.join(", ") || "(none detected — input may be too short)"}.`,
    ].join("\n");

    return {
      lane: "research",
      providerLabel: mockResearchAdapter.providerLabel,
      content,
      generatedAt: new Date().toISOString(),
    };
  },
};

export const mockDraftAdapter: GenerationAdapter = {
  lane: "draft",
  providerLabel: "Draft Lane (mock — wire to a fast drafting model API)",
  async generate(input: GenerationInput) {
    const prefix = voicePrefix(input.voiceProfile);
    const body = [
      truncate(prefix ? `${prefix} ${input.rawInput}` : input.rawInput, 600),
      ``,
      `Here's the takeaway: most people overcomplicate this. Start with the smallest true version of the idea, say it plainly, and let the specifics do the convincing.`,
    ].join("\n");

    return {
      lane: "draft",
      providerLabel: mockDraftAdapter.providerLabel,
      content: body,
      generatedAt: new Date().toISOString(),
    };
  },
};

export const mockStructureAdapter: GenerationAdapter = {
  lane: "structure",
  providerLabel: "Structure Lane (mock — wire to a long-form reasoning model API)",
  async generate(input: GenerationInput) {
    const topics = keyPhrases(input.rawInput, 3);
    const title = titleCase(topics.join(" ")) || "Untitled";
    const sentences = splitSentences(input.rawInput);
    const content = [
      `# ${title || "Working Title"}`,
      ``,
      `## Why this matters`,
      sentences[0] ?? input.rawInput,
      ``,
      `## The core idea`,
      sentences.slice(1, 3).join(" ") || "(expand from the raw input)",
      ``,
      `## What to do with it`,
      `Concrete next step for the reader, stated as a single sentence, not a list of five things.`,
    ].join("\n");

    return {
      lane: "structure",
      providerLabel: mockStructureAdapter.providerLabel,
      content,
      generatedAt: new Date().toISOString(),
    };
  },
};

export const allMockAdapters: GenerationAdapter[] = [
  mockResearchAdapter,
  mockDraftAdapter,
  mockStructureAdapter,
];

export const mockRepurposeAdapter: RepurposeAdapter = {
  providerLabel: "Repurpose Lane (mock — wire to a drafting model API)",
  async repurpose({ approvedDraft, formatId }) {
    const sentences = splitSentences(approvedDraft);
    const hook = sentences[0] ?? approvedDraft;

    switch (formatId) {
      case "linkedin": {
        const bullets = sentences.slice(1, 4).map((s) => `→ ${s}`).join("\n");
        return [hook, ``, bullets, ``, `What's worked for you here?`].join("\n");
      }
      case "founderStory": {
        return [
          `I didn't plan to write about this, but here's what's true:`,
          ``,
          approvedDraft,
          ``,
          `If you're figuring out something similar right now — that's exactly who this is for.`,
        ].join("\n");
      }
      case "twitterThread": {
        const chunks = sentences.slice(0, 6);
        return chunks
          .map((s, i) => `${i + 1}/${chunks.length} ${s}`)
          .join("\n\n");
      }
      case "newsletter": {
        return [`This week: ${hook}`, ``, truncate(approvedDraft, 400)].join("\n");
      }
      case "blog":
      default: {
        return approvedDraft;
      }
    }
  },
};
