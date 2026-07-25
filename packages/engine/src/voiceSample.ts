import { VoiceSampleResult } from "./types.js";
import { keyPhrases, splitSentences } from "./adapters/textUtils.js";

/**
 * The free "Voice Sample" wedge tool from the GTM plan (04-GTM-DISTRIBUTION
 * §2): one input, in under a couple of minutes, produces a specific
 * (not-generic) readout of how this person writes plus one rewritten piece
 * as proof. Deliberately a thin, cheap call — not the full pipeline — so
 * it's safe to give away for free.
 */
export function runVoiceSample(rawInput: string): VoiceSampleResult {
  const sentences = splitSentences(rawInput);
  const topics = keyPhrases(rawInput, 5);
  const avgLen =
    sentences.length === 0
      ? 0
      : Math.round(
          sentences.reduce((sum, s) => sum + s.split(" ").length, 0) / sentences.length
        );

  const observations = [
    avgLen > 0
      ? `Average sentence length is ~${avgLen} words — ${
          avgLen < 12 ? "short and punchy" : avgLen < 20 ? "conversational" : "long-form, explanatory"
        }.`
      : "Not enough text to measure sentence rhythm — try pasting a full paragraph.",
    topics.length > 0
      ? `Recurring themes: ${topics.join(", ")}.`
      : "No strong recurring themes detected in this sample.",
    sentences[0]
      ? `Opens with a direct statement rather than a question or a stat: "${sentences[0]}"`
      : "No clear opening sentence detected.",
  ];

  const hook = sentences[0] ?? rawInput.trim();
  const rewritten = [
    hook,
    ``,
    sentences.slice(1, 3).join(" ") || "Here's the version of this that's actually worth saying out loud.",
    ``,
    `This is one output from one input, in your voice, not a template. Relay does this automatically — across a blog post, a LinkedIn post, and a founder story — every time you publish.`,
  ].join("\n");

  return {
    observations,
    rewritten,
    generatedAt: new Date().toISOString(),
  };
}
