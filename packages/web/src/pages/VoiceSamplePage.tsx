import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { VoiceSampleResult } from "../lib/types";

const PLACEHOLDER =
  "Paste something you've already written — a LinkedIn post, an email, a Slack message, a transcript of you talking.";

export default function VoiceSamplePage() {
  const [rawInput, setRawInput] = useState("");
  const [result, setResult] = useState<VoiceSampleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setError(null);
    if (rawInput.trim().length < 10) {
      setError("Paste at least a sentence or two — the shorter the input, the weaker the read.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.voiceSample(rawInput);
      setResult(res);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page voice-sample-page">
      <section className="hero">
        <h1>Free: see what your writing actually sounds like.</h1>
        <p className="subhead">
          Paste one thing you've written. In under two minutes you get a specific,
          non-generic readout of your voice — and one piece rewritten in it, as proof.
          No signup required to see it.
        </p>
      </section>

      <section className="card">
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={8}
        />
        <button onClick={run} disabled={loading}>
          {loading ? "Reading your voice…" : "Run my Voice Sample — free"}
        </button>
        {error && <p className="error">{error}</p>}
      </section>

      {result && (
        <section className="card result">
          <h2>What your voice actually sounds like</h2>
          <ul>
            {result.observations.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>

          <h2>Rewritten in your voice</h2>
          <pre className="draft-content">{result.rewritten}</pre>

          <div className="cta">
            <p>
              This is one output from one input. Relay does this automatically — a blog
              post, a LinkedIn post, a founder story, all in your voice — every time you
              publish.
            </p>
            <Link to="/engine" className="button-link">
              Try the full engine →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
