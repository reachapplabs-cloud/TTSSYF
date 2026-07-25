import express from "express";
import cors from "cors";
import {
  RelayPipeline,
  allMockAdapters,
  mockRepurposeAdapter,
  consoleNotifier,
  runVoiceSample,
  addInsight,
  generateIdeasFromAvatar,
  OUTPUT_FORMATS,
  LANES,
  OutputFormatId,
} from "@relay/engine";
import { store, DEMO_FOUNDER_ID } from "./store.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const pipeline = new RelayPipeline({
  adapters: allMockAdapters,
  repurposeAdapter: mockRepurposeAdapter,
  notifier: consoleNotifier,
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/lanes", (_req, res) => {
  res.json({ lanes: LANES });
});

app.get("/api/output-formats", (_req, res) => {
  res.json({ formats: OUTPUT_FORMATS });
});

app.get("/api/avatar", (_req, res) => {
  res.json(store.getAvatar(DEMO_FOUNDER_ID));
});

// Explicit insight capture — the founder directly teaching the avatar's
// substance (beliefs, stories, POV), independent of any one submission.
// See docs/03-PRD.md §4.
app.post("/api/avatar/insights", (req, res) => {
  const insight = req.body?.insight as string | undefined;
  if (!insight || insight.trim().length < 5) {
    return res.status(400).json({ error: "insight must be at least 5 characters" });
  }
  const avatar = store.getAvatar(DEMO_FOUNDER_ID);
  const updated = addInsight(avatar, insight);
  store.setAvatar(DEMO_FOUNDER_ID, updated);
  res.status(201).json(updated);
});

// "Replicate and build more" (PRD §5.7): propose new ideas straight from
// the accumulated avatar, no fresh input required. Still ends at human
// direction/approval — this only proposes, it never auto-publishes.
app.get("/api/avatar/ideas", (_req, res) => {
  const avatar = store.getAvatar(DEMO_FOUNDER_ID);
  res.json({ ideas: generateIdeasFromAvatar(avatar) });
});

app.get("/api/output-profile", (_req, res) => {
  res.json({ formats: store.getOutputProfile(DEMO_FOUNDER_ID) });
});

app.post("/api/output-profile", (req, res) => {
  const formats = req.body?.formats as OutputFormatId[] | undefined;
  if (!Array.isArray(formats) || formats.length === 0) {
    return res.status(400).json({ error: "formats must be a non-empty array" });
  }
  const valid = formats.every((f) => OUTPUT_FORMATS.some((of) => of.id === f));
  if (!valid) {
    return res.status(400).json({ error: "unknown format id in list" });
  }
  store.setOutputProfile(DEMO_FOUNDER_ID, formats);
  res.json({ formats });
});

app.post("/api/submissions", async (req, res) => {
  const rawInput = req.body?.rawInput as string | undefined;
  const direction = req.body?.direction as string | undefined;
  if (!rawInput || rawInput.trim().length < 10) {
    return res.status(400).json({ error: "rawInput must be at least 10 characters" });
  }
  const avatar = store.getAvatar(DEMO_FOUNDER_ID);
  const submission = await pipeline.submit(
    DEMO_FOUNDER_ID,
    rawInput,
    avatar,
    direction?.trim() || undefined
  );
  res.status(201).json(submission);
});

app.get("/api/submissions", (_req, res) => {
  res.json({ submissions: pipeline.list(DEMO_FOUNDER_ID) });
});

app.get("/api/submissions/:id", (req, res) => {
  const submission = pipeline.get(req.params.id);
  if (!submission) return res.status(404).json({ error: "not found" });
  res.json(submission);
});

app.post("/api/submissions/:id/approve", async (req, res) => {
  const mergedDraft = req.body?.mergedDraft as string | undefined;
  const insight = req.body?.insight as string | undefined;
  if (!mergedDraft || mergedDraft.trim().length < 10) {
    return res.status(400).json({ error: "mergedDraft must be at least 10 characters" });
  }
  const outputProfile = store.getOutputProfile(DEMO_FOUNDER_ID);
  const avatar = store.getAvatar(DEMO_FOUNDER_ID);

  try {
    const { submission, updatedAvatar } = await pipeline.approve(
      req.params.id,
      mergedDraft,
      avatar,
      outputProfile,
      insight?.trim() || undefined
    );
    store.setAvatar(DEMO_FOUNDER_ID, updatedAvatar);
    res.json(submission);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
});

// The free wedge tool from docs/04-GTM-DISTRIBUTION.md §2 — no auth, no
// persistence, deliberately cheap/stateless.
app.post("/api/voice-sample", (req, res) => {
  const rawInput = req.body?.rawInput as string | undefined;
  if (!rawInput || rawInput.trim().length < 10) {
    return res.status(400).json({ error: "rawInput must be at least 10 characters" });
  }
  res.json(runVoiceSample(rawInput));
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Relay API listening on http://localhost:${port}`);
});
