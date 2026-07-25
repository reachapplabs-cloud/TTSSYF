import test from "node:test";
import assert from "node:assert/strict";
import { RelayPipeline } from "../pipeline.js";
import { allMockAdapters, mockRepurposeAdapter } from "../adapters/mockAdapters.js";
import { consoleNotifier } from "../notify.js";
import { emptyAvatar, LANES } from "../types.js";
import { runVoiceSample } from "../voiceSample.js";
import { addInsight, learnFromApproval } from "../voiceProfile.js";
import { generateIdeasFromAvatar } from "../avatarIdeas.js";

test("submit runs all three lanes and returns labeled results", async () => {
  const pipeline = new RelayPipeline({
    adapters: allMockAdapters,
    repurposeAdapter: mockRepurposeAdapter,
    notifier: consoleNotifier,
  });
  const avatar = emptyAvatar("founder-1");

  const submission = await pipeline.submit(
    "founder-1",
    "We shipped a feature nobody asked for and it became our most used one. The lesson: users can't request what they've never seen.",
    avatar
  );

  assert.equal(submission.status, "in_review");
  assert.equal(submission.laneResults.length, LANES.length);
  for (const lane of LANES) {
    assert.ok(submission.laneResults.some((r) => r.lane === lane.id));
  }
});

test("a direction note steers the lanes instead of being silently ignored", async () => {
  const pipeline = new RelayPipeline({
    adapters: allMockAdapters,
    repurposeAdapter: mockRepurposeAdapter,
    notifier: consoleNotifier,
  });
  const avatar = emptyAvatar("founder-direction");
  const direction = "Make the contrarian case, this is for investors not customers.";

  const submission = await pipeline.submit(
    "founder-direction",
    "We raised less than everyone told us to and it forced better decisions.",
    avatar,
    direction
  );

  assert.equal(submission.direction, direction);
  assert.ok(
    submission.laneResults.some((r) => r.content.includes(direction)),
    "at least one lane should visibly incorporate the direction, not just the raw input"
  );
});

test("approve fans out into the requested output formats and updates the avatar's voice profile", async () => {
  const pipeline = new RelayPipeline({
    adapters: allMockAdapters,
    repurposeAdapter: mockRepurposeAdapter,
    notifier: consoleNotifier,
  });
  const avatar = emptyAvatar("founder-2");

  const submission = await pipeline.submit(
    "founder-2",
    "Most onboarding flows fail for one reason: they explain the product instead of getting the user to a result.",
    avatar
  );

  const merged =
    "Most onboarding flows fail for one reason: they explain the product instead of getting the user to a result. Skip the tour. Get them to one real result in the first sixty seconds.";

  const { submission: approved, updatedAvatar } = await pipeline.approve(
    submission.id,
    merged,
    avatar,
    ["linkedin", "founderStory"]
  );

  assert.equal(approved.status, "approved");
  assert.equal(approved.pieces?.length, 2);
  assert.ok(approved.pieces?.some((p) => p.format === "linkedin"));
  assert.ok(approved.pieces?.some((p) => p.format === "founderStory"));
  assert.ok(
    updatedAvatar.voiceProfile.sampleSentences.length > avatar.voiceProfile.sampleSentences.length,
    "voice profile should learn a new sample sentence from the founder's edit"
  );
});

test("approving with an explicit insight grows the avatar's substance, not just its style", async () => {
  const pipeline = new RelayPipeline({
    adapters: allMockAdapters,
    repurposeAdapter: mockRepurposeAdapter,
    notifier: consoleNotifier,
  });
  const avatar = emptyAvatar("founder-insight");

  const submission = await pipeline.submit(
    "founder-insight",
    "We cut our onboarding flow in half last quarter.",
    avatar
  );

  const { updatedAvatar } = await pipeline.approve(
    submission.id,
    "We cut our onboarding flow in half last quarter and activation doubled.",
    avatar,
    ["linkedin"],
    "The real insight: most onboarding failures are editorial, not technical."
  );

  assert.deepEqual(updatedAvatar.insights, [
    "The real insight: most onboarding failures are editorial, not technical.",
  ]);
});

test("approving unknown submission throws", async () => {
  const pipeline = new RelayPipeline({
    adapters: allMockAdapters,
    repurposeAdapter: mockRepurposeAdapter,
    notifier: consoleNotifier,
  });
  await assert.rejects(() =>
    pipeline.approve("does-not-exist", "text", emptyAvatar("founder-3"))
  );
});

test("voice sample produces observations and a rewritten proof piece from one input", () => {
  const result = runVoiceSample(
    "I don't believe in overnight success. Every launch we've had was the fifth attempt wearing a new coat of paint."
  );
  assert.ok(result.observations.length > 0);
  assert.ok(result.rewritten.length > 0);
});

test("learnFromApproval captures sentences the founder added that no lane generated", () => {
  const avatar = emptyAvatar("founder-4");
  const generated = ["A generic AI sentence about productivity."];
  const approved =
    "A generic AI sentence about productivity. Also, we almost killed this feature twice before it worked.";

  const updated = learnFromApproval(avatar, generated, approved);
  assert.ok(
    updated.voiceProfile.sampleSentences.some((s) =>
      s.includes("we almost killed this feature twice before it worked")
    )
  );
});

test("addInsight ignores blank input and dedupes repeats", () => {
  const avatar = emptyAvatar("founder-5");
  const withBlank = addInsight(avatar, "   ");
  assert.equal(withBlank.insights.length, 0);

  const once = addInsight(avatar, "We only hire people who've been customers first.");
  const twice = addInsight(once, "We only hire people who've been customers first.");
  assert.equal(twice.insights.length, 1);
});

test("generateIdeasFromAvatar returns nothing for an avatar with no captured insight", () => {
  const avatar = emptyAvatar("founder-6");
  assert.deepEqual(generateIdeasFromAvatar(avatar), []);
});

test("generateIdeasFromAvatar proposes ideas from accumulated insights without new input", () => {
  let avatar = emptyAvatar("founder-7");
  avatar = addInsight(avatar, "Most churn happens in week one, not month three.");
  avatar = addInsight(avatar, "We ship broken things on purpose to see who complains.");

  const ideas = generateIdeasFromAvatar(avatar, 2);
  assert.equal(ideas.length, 2);
  assert.ok(ideas.every((idea) => idea.headline.length > 0 && idea.angle.length > 0));
});
