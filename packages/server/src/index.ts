import express from "express";
import cors from "cors";
import {
  RelayPipeline,
  allMockAdapters,
  mockRepurposeAdapter,
  consoleNotifier,
  runVoiceSample,
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

app.get("/api/voice-profile", (_req, res) => {
  res.json(store.getVoiceProfile(DEMO_FOUNDER_ID));
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
  if (!rawInput || rawInput.trim().length < 10) {
    return res.status(400).json({ error: "rawInput must be at least 10 characters" });
  }
  const voiceProfile = store.getVoiceProfile(DEMO_FOUNDER_ID);
  const submission = await pipeline.submit(DEMO_FOUNDER_ID, rawInput, voiceProfile);
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
  if (!mergedDraft || mergedDraft.trim().length < 10) {
    return res.status(400).json({ error: "mergedDraft must be at least 10 characters" });
  }
  const outputProfile = store.getOutputProfile(DEMO_FOUNDER_ID);
  const voiceProfile = store.getVoiceProfile(DEMO_FOUNDER_ID);

  try {
    const { submission, updatedVoiceProfile } = await pipeline.approve(
      req.params.id,
      mergedDraft,
      voiceProfile,
      outputProfile
    );
    store.setVoiceProfile(DEMO_FOUNDER_ID, updatedVoiceProfile);
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
