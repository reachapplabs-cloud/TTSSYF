# PRD — Relay

**Studio**: Zo & Aadi (Zoheb + Aditya, ex-Yasity)
**Product codename**: Relay — "AI drafts, you relay your voice through it,
it relays out everywhere you publish."
**Status**: Phase 1 / MVP planning
**Owner**: Zoheb (product + engine), Aditya (distribution + GTM — see
`04-GTM-DISTRIBUTION.md`)

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
of how this person thinks.

## 2. Who this is for (v1 — one ICP only, per the Roast)

**Primary**: solo founders and 2-10 person B2B/technical startups who
already try to publish (blog + LinkedIn) and are unhappy with how
robotic/generic their AI-assisted content sounds.

Explicitly **out of scope for v1**: DTC/ecommerce brands, agencies,
enterprise content teams. Revisit in phase 2 (see Roadmap).

## 3. Product principle

> The human is not a QA checkpoint. The human is the source of the voice.
> Every review, edit, and rejection makes Relay sound more like this
> specific person next time — that's the moat, not the multi-model
> orchestration.

## 4. Core workflow (v1)

1. **Input** — founder pastes a URL, raw notes, a transcript, or a rough
   idea (one text box, no meeting/interview required to start; a guided
   voice/text interview is offered but optional, inspired by Meet Sona but
   not required to bootstrap).
2. **Multi-source ideation & drafting (visible, not hidden)** — Relay fans
   the input out to pluggable "generation lanes": a research/ideation lane
   (e.g. Perplexity-style expansion), a drafting lane (e.g. GPT-style),
   and a longform/structuring lane (e.g. Claude/Sonnet-style). All three
   outputs are shown side-by-side, labeled by source, not merged/hidden.
   This is the "see ideas from Complexity, content from ChatGPT, drafting
   from Sonnet" ask from the original brief, implemented as a transparent
   multi-pane review, not a black box.
3. **Human review pass** — founder picks/merges/edits directly in the
   pane, in one pass. Every accepted edit is diffed against the machine
   draft and stored against the founder's **voice profile** (word choices,
   sentence rhythm, things they always cut, claims they always add).
4. **One approve action → fan-out** — approving the merged draft triggers
   repurposing into the founder's configured output profile: long-form
   blog, LinkedIn post, founder-story short-form, X/Twitter thread,
   newsletter blurb — configurable per user, not fixed.
5. **Delivery** — outputs land in a review queue; founder gets a
   Slack/email notification ("your draft + 4 repurposed pieces are ready"),
   reviews the fan-out (usually just approve, occasionally light edit),
   and either publishes from Relay (where an integration exists) or
   copies out.
6. **Voice profile compounds** — over time, lane outputs are increasingly
   pre-biased toward the accumulated voice profile, so review gets faster
   and edits get smaller. This is the retention/expansion lever.

## 5. What's explicitly NOT in v1

- No browser extension, no local install (see Roast §3).
- No video ingestion/clipping (crowded, free, funded elsewhere — see
  Market Research §4).
- No DTC/ecommerce catalog-aware content (different product, phase 2+).
- No autonomous "publish without review" mode — the whole point of v1 is
  the opposite of Polsia's zero-human pitch. (A "fast lane" with lighter
  review can come later once trust in the voice profile is earned — see
  Roadmap phase 3.)
- No multi-seat/team permissions — single founder user in v1.

## 6. MVP scope (what we're actually building this session)

Given team size (2 people, part-time) and the roast's "narrow it" verdict,
the MVP is a working, demoable engine, not a production SaaS:

- Pluggable **provider adapter** interface for the three generation lanes
  (research/ideation, drafting, structuring), with mock/stub adapters that
  produce clearly-labeled, realistic sample output so the workflow is
  fully demoable without live API keys, and a documented interface for
  dropping in real Claude/OpenAI/Perplexity API calls.
- **Voice profile** store: a simple structured record per founder (tone
  notes, banned phrases, sample sentences) that seeds prompts and is
  updated from accepted edits.
- **Review UI**: web app showing input → three labeled generation panes →
  merge/edit → approve.
- **Repurposing pipeline**: approved draft → configurable output profile →
  generated variants (blog, LinkedIn, founder story, thread, newsletter),
  each editable before "publish."
- **Notification stub**: approve action logs a "notify via email/Slack"
  event (real integration deferred, interface documented).

## 7. Success metrics (phase 1)

- Time from paste-input to approved multi-format output < 10 minutes.
- % of generated output the founder accepts with zero or trivial edits
  trending up over repeated use (voice profile working).
- Free-wedge signups → activated (completed one full cycle) → converted to
  paid, tracked as a real funnel (see GTM doc).

## 8. Open questions to revisit after first 10 real users

- Does the three-lane transparency (showing model sources) actually matter
  to non-technical founders, or is it only a technical-ICP trust signal?
- Right default output profile per segment (founder vs. small B2B team).
- Whether "publish directly" integrations (LinkedIn, CMS/webhooks) are
  worth building before or after the voice-profile quality is proven.
