import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Avatar, AvatarIdea } from "../lib/types";

export default function AvatarPage() {
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [insight, setInsight] = useState("");
  const [ideas, setIdeas] = useState<AvatarIdea[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [ideasLoading, setIdeasLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getAvatar().then(setAvatar).catch((e) => setError((e as Error).message));
  }, []);

  async function addInsight() {
    setError(null);
    if (insight.trim().length < 5) {
      setError("Give it a real sentence — a belief, a story, something you'd stand behind.");
      return;
    }
    setLoading(true);
    try {
      const updated = await api.addInsight(insight);
      setAvatar(updated);
      setInsight("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function generateIdeas() {
    setError(null);
    setIdeasLoading(true);
    try {
      const res = await api.avatarIdeas();
      setIdeas(res.ideas);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIdeasLoading(false);
    }
  }

  return (
    <div className="page avatar-page">
      <section className="hero">
        <h1>Your Avatar</h1>
        <p className="subhead">
          Not just a voice profile — the substance behind it. Insights compound here every time
          you direct a submission or add one directly. Once there's enough built up, ask Relay to
          propose new pieces from it — you still direct and approve everything it suggests.
        </p>
      </section>

      <section className="card">
        <h2>Add an insight directly</h2>
        <p className="subhead">
          A belief, a story, something only you'd say — this is substance, not style.
        </p>
        <textarea
          value={insight}
          onChange={(e) => setInsight(e.target.value)}
          placeholder="e.g. We only hire people who've been customers first."
          rows={3}
        />
        <button onClick={addInsight} disabled={loading}>
          {loading ? "Saving…" : "Add to my Avatar"}
        </button>
        {error && <p className="error">{error}</p>}
      </section>

      <section className="card">
        <h2>Captured insights ({avatar?.insights.length ?? 0})</h2>
        {avatar && avatar.insights.length > 0 ? (
          <ul>
            {[...avatar.insights].reverse().map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        ) : (
          <p className="subhead">
            Nothing captured yet. Direct a submission with an insight at approval time, or add one
            above.
          </p>
        )}
      </section>

      <section className="card">
        <h2>Voice profile</h2>
        {avatar && avatar.voiceProfile.signaturePhrases.length > 0 ? (
          <>
            <p className="subhead">Signature openers picked up from accepted edits:</p>
            <ul>
              {avatar.voiceProfile.signaturePhrases.slice(0, 6).map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="subhead">Nothing learned yet — approve a submission to start building it.</p>
        )}
      </section>

      <section className="card">
        <h2>Build more from your Avatar</h2>
        <p className="subhead">
          No new input required — this proposes angles from what's already captured. You still
          direct and approve anything it suggests; it never publishes on its own.
        </p>
        <button onClick={generateIdeas} disabled={ideasLoading}>
          {ideasLoading ? "Thinking…" : "Generate ideas from my Avatar"}
        </button>
        {ideas && ideas.length === 0 && (
          <p className="subhead">No insights captured yet — add one above first.</p>
        )}
        {ideas && ideas.length > 0 && (
          <div className="pieces">
            {ideas.map((idea, idx) => (
              <div className="piece" key={idx}>
                <div className="lane-label">Idea</div>
                <p>
                  <strong>{idea.headline}</strong>
                </p>
                <p className="subhead">{idea.angle}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
