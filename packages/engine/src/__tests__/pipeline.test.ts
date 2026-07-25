import test from "node:test";
import assert from "node:assert/strict";
import { RelayPipeline } from "../pipeline.js";
import { allMockAdapters, mockRepurposeAdapter } from "../adapters/mockAdapters.js";
import { consoleNotifier } from "../notify.js";
import { emptyVoiceProfile, LANES } from "../types.js";
import { runVoiceSample } from "../voiceSample.js";
import { learnFromApproval } from "../voiceProfile.js";

test("submit runs all three lanes and returns labeled results", async () => {
  const pipeline = new RelayPipeline({
    adapters: allMockAdapters,
    repurposeAdapter: mockRepurposeAdapter,
    notifier: consoleNotifier,
  });
  const voiceProfile = emptyVoiceProfile("founder-1");

  const submission = await pipeline.submit(
    "founder-1",
    "We shipped a feature nobody asked for and it became our most used one. The lesson: users can't request what they've never seen.",
    voiceProfile
  );

  assert.equal(submission.status, "in_review");
  assert.equal(submission.laneResults.length, LANES.length);
  for (const lane of LANES) {
    assert.ok(submission.laneResults.some((r) => r.lane === lane.id));
  }
});

test("approve fans out into the requested output formats and updates voice profile", async () => {
  const pipeline = new RelayPipeline({
    adapters: allMockAdapters,
    repurposeAdapter: mockRepurposeAdapter,
    notifier: consoleNotifier,
  });
  const voiceProfile = emptyVoiceProfile("founder-2");

  const submission = await pipeline.submit(
    "founder-2",
    "Most onboarding flows fail for one reason: they explain the product instead of getting the user to a result.",
    voiceProfile
  );

  const merged =
    "Most onboarding flows fail for one reason: they explain the product instead of getting the user to a result. Skip the tour. Get them to one real result in the first sixty seconds.";

  const { submission: approved, updatedVoiceProfile } = await pipeline.approve(
    submission.id,
    merged,
    voiceProfile,
    ["linkedin", "founderStory"]
  );

  assert.equal(approved.status, "approved");
  assert.equal(approved.pieces?.length, 2);
  assert.ok(approved.pieces?.some((p) => p.format === "linkedin"));
  assert.ok(approved.pieces?.some((p) => p.format === "founderStory"));
  assert.ok(
    updatedVoiceProfile.sampleSentences.length > voiceProfile.sampleSentences.length,
    "voice profile should learn a new sample sentence from the founder's edit"
  );
});

test("approving unknown submission throws", async () => {
  const pipeline = new RelayPipeline({
    adapters: allMockAdapters,
    repurposeAdapter: mockRepurposeAdapter,
    notifier: consoleNotifier,
  });
  await assert.rejects(() =>
    pipeline.approve("does-not-exist", "text", emptyVoiceProfile("founder-3"))
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
  const profile = emptyVoiceProfile("founder-4");
  const generated = ["A generic AI sentence about productivity."];
  const approved =
    "A generic AI sentence about productivity. Also, we almost killed this feature twice before it worked.";

  const updated = learnFromApproval(profile, generated, approved);
  assert.ok(
    updated.sampleSentences.some((s) =>
      s.includes("we almost killed this feature twice before it worked")
    )
  );
});
