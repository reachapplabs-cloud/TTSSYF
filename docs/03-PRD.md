# PRD — Relay

**Studio**: Zo & Aadi (Zoheb + Aditya, from Yescity)
**Product codename**: Relay — "AI drafts, you relay your voice through it,
it relays out everywhere you publish."
**Status**: Phase 1 / MVP planning
**Owner**: Zoheb (product + engine), Aditya (distribution + GTM — see
`04-GTM-DISTRIBUTION.md`)

**Revision note (2026-07-25)**: reworked §3 and §4 after Aditya's
correction — the product captures an **Avatar** (identity, beliefs,
expertise, stories), not just a voice profile, and the human's role is to
**direct** generation with real insight, not just approve or reject it.
See `01-ROAST.md`'s 2026-07-25 addendum for the reasoning.

## 1. Problem

Founders and small B2B/DTC teams know they should publish constantly
(blog, LinkedIn, founder story, newsletter) but in practice either:

- don't publish at all (no time, no writer), or
- publish AI-generated content that reads as generic/robotic and gets
  ignored or actively hurts credibility.

Existing AI writing tools either (a) require the founder to prompt and
babysit every piece (still feels like a chore), or (b) fully automate and
lose the founder's actual voice (feels robotic, exactly what's being
complained about), or (c) require a fresh 10-minute interview every time
new content is needed (Meet Sona) instead of accumulating a durable sense
of how this person thinks — and none of them let the founder actively
steer *what the machine builds next* the way they'd direct a ghostwriter.

## 2. Who this is for (v1 — one ICP only, per the Roast)

**Primary**: solo founders and 2-10 person B2B/technical startups who
already try to publish (blog + LinkedIn) and are unhappy with how
robotic/generic their AI-assisted content sounds.

Explicitly **out of scope for v1**: DTC/ecommerce brands, agencies,
enterprise content teams. Revisit in phase 2 (see Roadmap).

## 3. Product principle

> Relay is not automation — automation is what cuts creativity out of the
> loop. Relay is a **directable** engine: the human supplies insight and
> direction, the machine builds around it, fast. The human is not a QA
> checkpoint approving or rejecting a finished thing; the human is the
> source of the Avatar (who this person is, what they believe, the stories
> only they can tell) and the one steering where each piece goes before it
> ever gets generated.
>
> Even the most autonomous competitor in this space — Polsia, effectively
> zero-human — can still be directed by its operator. Relay makes that
> steering the explicit, central mechanic instead of a buried setting: you
> can always tell it where to go, not just clean up where it went.

## 4. Data model: Avatar, Voice Profile, and Direction

Three distinct things get captured, and the distinction matters:

- **Avatar** — the person: identity (name, role, company), accumulated
  **insights** (beliefs, POV, stories, expertise, claims they stand
  behind). This is *substance*, not style. It's what makes new content
  genuinely theirs instead of generic-but-restyled. It's captured once and
  reused/extended across every future piece — "replicate and build more,"
  not just repurpose one input.
- **Voice Profile** — how they write: tone, signature phrases, sentence
  rhythm, sample sentences. This lives inside the Avatar. It governs
  *style*, not substance.
- **Direction** — a per-submission steering note the founder can give
  *before* generation runs: "make the contrarian case," "focus on the
  pricing decision, not the launch," "this is for investors, not
  customers." This is the explicit answer to "even Polsia you can direct
  it" — Relay surfaces this as a first-class input, not an implicit side
  effect of editing output afterward.

Style (Voice Profile) still compounds from accepted edits, same as before.
Substance (Avatar insights) compounds from two places: explicit insight
notes the founder adds directly, and direction notes given per submission
that turn out to carry a durable belief worth keeping, not just a one-off
instruction.

## 5. Core workflow (v1)

1. **Input** — founder pastes a URL, raw notes, a transcript, or a rough
   idea (one text box, no meeting/interview required to start).
2. **Direct (optional, but the point of the product)** — before
   generation runs, the founder can add a direction note: what angle to
   take, who it's for, what to lead with. Leaving it blank is fine — Relay
   falls back to the Avatar's accumulated insights — but the option to
   steer is always visible, not hidden behind an "advanced" toggle.
3. **Multi-source ideation & drafting (visible, not hidden)** — Relay fans
   the input + direction out to pluggable "generation lanes": a
   research/ideation lane (e.g. Perplexity-style expansion), a drafting
   lane (e.g. GPT-style), and a longform/structuring lane (e.g.
   Claude/Sonnet-style). All three outputs are shown side-by-side, labeled
   by source, not merged/hidden. This is the "see ideas from Complexity,
   content from ChatGPT, drafting from Sonnet" ask from the original
   brief, implemented as a transparent multi-pane review, not a black box.
4. **Human review pass** — founder picks/merges/edits directly in the
   pane, in one pass. Every accepted edit is diffed against the machine
   draft and folded into the Voice Profile (style). The founder can also
   attach an explicit insight at this point ("the real point here is
   ___") that gets folded into the Avatar (substance), separate from
   style learning.
5. **One approve action → fan-out** — approving the merged draft triggers
   repurposing into the founder's configured output profile: long-form
   blog, LinkedIn post, founder-story short-form, X/Twitter thread,
   newsletter blurb — configurable per user, not fixed.
6. **Delivery** — outputs land in a review queue; founder gets a
   Slack/email notification ("your draft + 4 repurposed pieces are ready"),
   reviews the fan-out (usually just approve, occasionally light edit),
   and either publishes from Relay (where an integration exists) or
   copies out.
7. **Avatar compounds, on both axes** — style gets more accurate (Voice
   Profile) and substance gets deeper (Avatar insights) with every use.
   Once there's enough of an Avatar built up, the founder can also ask
   Relay to **propose new pieces directly from the Avatar** — no fresh
   input required — as a "build more" capability: new angles on
   insights/stories already captured, which the founder still directs and
   approves. This is explicitly not autonomous publishing (see §6) — it's
   the Avatar being a reusable asset instead of a one-shot profile.

## 6. What's explicitly NOT in v1

- No browser extension, no local install (see Roast §3).
- No video ingestion/clipping (crowded, free, funded elsewhere — see
  Market Research §4).
- No DTC/ecommerce catalog-aware content (different product, phase 2+).
- No autonomous "publish without review" mode — the whole point of v1 is
  the opposite of Polsia's zero-human pitch, and generating ideas straight
  from the Avatar (§5.7) still ends at a human approval, same as any other
  submission. (A "fast lane" with lighter review can come later once trust
  in the Avatar is earned — see Roadmap phase 3.)
- No multi-seat/team permissions — single founder user in v1.
- No visual/media avatar (photo, video likeness, voice clone). "Avatar"
  here means captured identity + insights, a data/knowledge model, not a
  synthetic media asset. Revisit only if a real use case demands it —
  don't build it speculatively.

## 7. MVP scope (what we're actually building this session)

Given team size (2 people, part-time) and the roast's "narrow it" verdict,
the MVP is a working, demoable engine, not a production SaaS:

- Pluggable **provider adapter** interface for the three generation lanes
  (research/ideation, drafting, structuring), with mock/stub adapters that
  produce clearly-labeled, realistic sample output so the workflow is
  fully demoable without live API keys, and a documented interface for
  dropping in real Claude/OpenAI/Perplexity API calls.
- **Avatar store**: identity + Voice Profile (tone notes, signature
  phrases, sample sentences) + insights bank, per founder. Voice Profile
  updates from accepted edits; insights update from explicit notes.
- **Direction**: an optional per-submission steering field, passed into
  every generation lane.
- **Review UI**: web app showing direction input → three labeled
  generation panes → merge/edit → approve, with an optional insight note
  at approval time.
- **Repurposing pipeline**: approved draft → configurable output profile →
  generated variants (blog, LinkedIn, founder story, thread, newsletter),
  each editable before "publish."
- **Generate-from-Avatar**: a lightweight endpoint/UI action that proposes
  new content ideas from the accumulated Avatar alone, demonstrating
  "replicate and build more" without requiring fresh input every time.
- **Notification stub**: approve action logs a "notify via email/Slack"
  event (real integration deferred, interface documented).

## 8. Success metrics (phase 1)

- Time from paste-input to approved multi-format output < 10 minutes.
- % of generated output the founder accepts with zero or trivial edits
  trending up over repeated use (Voice Profile working).
- % of submissions that include a direction note, and whether directed
  submissions need fewer edit rounds than undirected ones (tests whether
  directability is actually valued, not just available).
- Free-wedge signups → activated (completed one full cycle) → converted to
  paid, tracked as a real funnel (see GTM doc).

## 9. Open questions to revisit after first 10 real users

- Does the three-lane transparency (showing model sources) actually matter
  to non-technical founders, or is it only a technical-ICP trust signal?
- Right default output profile per segment (founder vs. small B2B team).
- Whether "publish directly" integrations (LinkedIn, CMS/webhooks) are
  worth building before or after the Avatar quality is proven.
- Whether generate-from-Avatar should be gated behind a minimum amount of
  captured insight (to avoid generic output from a near-empty Avatar) —
  needs real usage data to set a sane threshold.
