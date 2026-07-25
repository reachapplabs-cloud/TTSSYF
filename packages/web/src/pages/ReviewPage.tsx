import { useState } from "react";
import { api } from "../lib/api";
import { Submission } from "../lib/types";

const LANE_ORDER: Record<string, number> = { research: 0, draft: 1, structure: 2 };

export default function ReviewPage() {
  const [rawInput, setRawInput] = useState("");
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [mergedDraft, setMergedDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    if (rawInput.trim().length < 10) {
      setError("Give it at least a sentence or two to work with.");
      return;
    }
    setLoading(true);
    try {
      const sub = await api.submit(rawInput);
      setSubmission(sub);
      const draftLane = sub.laneResults.find((r) => r.lane === "draft");
      setMergedDraft(draftLane?.content ?? sub.laneResults[0]?.content ?? "");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove() {
    if (!submission) return;
    setError(null);
    if (mergedDraft.trim().length < 10) {
      setError("Merge/edit the draft into at least a sentence or two before approving.");
      return;
    }
    setApproving(true);
    try {
      const approved = await api.approve(submission.id, mergedDraft);
      setSubmission(approved);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setApproving(false);
    }
  }

  function reset() {
    setSubmission(null);
    setMergedDraft("");
    setRawInput("");
  }

  return (
    <div className="page review-page">
      <section className="hero">
        <h1>The engine</h1>
        <p className="subhead">
          Paste a topic, transcript, or rough note. Three lanes generate in parallel, each
          labeled by source. Merge/edit into one draft, approve, and it fans out into every
          format you've configured.
        </p>
      </section>

      {!submission && (
        <section className="card">
          <textarea
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="What do you want to write about? Paste notes, a transcript, or a rough idea."
            rows={6}
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Generating across three lanes…" : "Generate"}
          </button>
          {error && <p className="error">{error}</p>}
        </section>
      )}

      {submission && submission.status === "in_review" && (
        <>
          <section className="lanes">
            {[...submission.laneResults]
              .sort((a, b) => (LANE_ORDER[a.lane] ?? 99) - (LANE_ORDER[b.lane] ?? 99))
              .map((r) => (
                <div className="card lane-card" key={r.lane}>
                  <div className="lane-label">{r.providerLabel}</div>
                  <pre className="draft-content">{r.content}</pre>
                  <button
                    className="secondary"
                    onClick={() => setMergedDraft((prev) => `${prev}\n\n${r.content}`.trim())}
                  >
                    Append to merged draft
                  </button>
                </div>
              ))}
          </section>

          <section className="card">
            <h2>Merged draft — edit freely, this is what gets approved</h2>
            <textarea
              value={mergedDraft}
              onChange={(e) => setMergedDraft(e.target.value)}
              rows={10}
            />
            <div className="actions">
              <button onClick={handleApprove} disabled={approving}>
                {approving ? "Approving & fanning out…" : "Approve & generate all formats"}
              </button>
              <button className="secondary" onClick={reset}>
                Start over
              </button>
            </div>
            {error && <p className="error">{error}</p>}
          </section>
        </>
      )}

      {submission && submission.status === "approved" && (
        <section className="card result">
          <h2>Approved draft</h2>
          <pre className="draft-content">{submission.mergedDraft}</pre>

          <h2>Repurposed for every format</h2>
          <div className="pieces">
            {submission.pieces?.map((p) => (
              <div className="piece" key={p.format}>
                <div className="lane-label">{p.format}</div>
                <pre className="draft-content">{p.content}</pre>
              </div>
            ))}
          </div>

          <button className="secondary" onClick={reset}>
            Start a new submission
          </button>
        </section>
      )}
    </div>
  );
}
