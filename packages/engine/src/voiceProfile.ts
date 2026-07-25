import { VoiceProfile } from "./types.js";
import { splitSentences } from "./adapters/textUtils.js";

const MAX_SAMPLE_SENTENCES = 25;
const MAX_SIGNATURE_PHRASES = 10;

/**
 * Updates a founder's voice profile from the diff between what a lane
 * generated and what the founder actually approved. This is the "voice
 * profile compounds" mechanic from the PRD: every review makes future
 * generations sound more like this person, not just less wrong.
 */
export function learnFromApproval(
  profile: VoiceProfile,
  generatedDrafts: string[],
  approvedText: string
): VoiceProfile {
  const approvedSentences = splitSentences(approvedText);
  const generatedSentences = new Set(
    generatedDrafts.flatMap((d) => splitSentences(d))
  );

  // Sentences the founder wrote/kept that did NOT come from any lane verbatim
  // are the strongest signal of their actual voice — capture them as samples.
  const novelSentences = approvedSentences.filter(
    (s) => !generatedSentences.has(s) && s.length > 15
  );

  const sampleSentences = dedupeTail(
    [...profile.sampleSentences, ...novelSentences],
    MAX_SAMPLE_SENTENCES
  );

  // Naive opener extraction: first 3-5 words of sentences the founder
  // repeatedly kept, used to bias future drafts' openers.
  const openers = approvedSentences
    .map((s) => s.split(" ").slice(0, 4).join(" "))
    .filter((o) => o.length > 5);

  const signaturePhrases = dedupeTail(
    [...profile.signaturePhrases, ...openers],
    MAX_SIGNATURE_PHRASES
  );

  return {
    ...profile,
    sampleSentences,
    signaturePhrases,
    updatedAt: new Date().toISOString(),
  };
}

function dedupeTail(items: string[], max: number): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    if (!seen.has(item)) {
      seen.add(item);
      out.unshift(item);
    }
    if (out.length >= max) break;
  }
  return out;
}
