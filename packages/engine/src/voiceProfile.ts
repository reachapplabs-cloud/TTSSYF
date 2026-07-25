import { Avatar } from "./types.js";
import { splitSentences } from "./adapters/textUtils.js";

const MAX_SAMPLE_SENTENCES = 25;
const MAX_SIGNATURE_PHRASES = 10;
const MAX_INSIGHTS = 50;

/**
 * Updates a founder's avatar from the diff between what a lane generated
 * and what the founder actually approved. This only touches the voice
 * profile (style) — sentence rhythm, openers, sample sentences. It's the
 * "review teaches the engine" mechanic from the PRD, deliberately kept
 * separate from `addInsight` below, which is where substance (beliefs,
 * stories, POV) gets captured. Style compounds passively from every edit;
 * substance compounds only from what the founder explicitly says matters.
 */
export function learnFromApproval(
  avatar: Avatar,
  generatedDrafts: string[],
  approvedText: string
): Avatar {
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
    [...avatar.voiceProfile.sampleSentences, ...novelSentences],
    MAX_SAMPLE_SENTENCES
  );

  // Naive opener extraction: first 3-5 words of sentences the founder
  // repeatedly kept, used to bias future drafts' openers.
  const openers = approvedSentences
    .map((s) => s.split(" ").slice(0, 4).join(" "))
    .filter((o) => o.length > 5);

  const signaturePhrases = dedupeTail(
    [...avatar.voiceProfile.signaturePhrases, ...openers],
    MAX_SIGNATURE_PHRASES
  );

  return {
    ...avatar,
    voiceProfile: {
      ...avatar.voiceProfile,
      sampleSentences,
      signaturePhrases,
    },
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Captures an explicit insight (belief, story, POV, expertise claim) into
 * the avatar's substance bank. This is the founder actively directing/
 * teaching the avatar, as distinct from the passive style-learning above —
 * see PRD §4's distinction between Avatar insights and Voice Profile.
 */
export function addInsight(avatar: Avatar, insight: string): Avatar {
  const trimmed = insight.trim();
  if (!trimmed) return avatar;

  return {
    ...avatar,
    insights: dedupeTail([...avatar.insights, trimmed], MAX_INSIGHTS),
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
