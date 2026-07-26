# GTM & Distribution Plan

**Owner: Aditya.** Zoheb owns the product/engine (PRD, roadmap); Aditya
owns everything in this document — the wedge tool's execution, channel
work, outreach, and the funnel metrics below. Treat this doc as Aditya's
scope of responsibility for phase 1, to be revised by Aditya as he runs it.

**Update (2026-07-26)**: the self-serve wedge tool below is now **Phase 1**,
not Phase 0 — see
[`docs/06-POLSIA-PLAYBOOK-AND-GTM-V2.md`](06-POLSIA-PLAYBOOK-AND-GTM-V2.md)
§5 for why (Reforge's Product–Channel/Channel–Model fit logic: a
self-serve tool needs a proven manual motion behind it first). Everything
below is still the plan for once that Phase 0 concierge motion has signal
— read doc 06 first.

## 1. Geography

Primary: **US and EU** (paying-customer priority, English-first content
GTM, developer/founder ecosystems concentrated on X/LinkedIn/Product
Hunt/Indie Hackers). Secondary: **Australia** (same language/timezone-
adjacent-enough, strong indie founder community, smaller volume).

Do not spend phase-1 effort on geos outside these three.

## 2. Wedge: one free tool, not the full product

Per the Roast, the free wedge must NOT be video clipping (commoditized) or
require an install (friction). Instead:

**"Voice Sample" — a free, single-use tool.**
Founder pastes one thing they've already written (a LinkedIn post, an
email, a Slack message, a transcript) or a link to something they said.
Relay's ideation lane analyzes it and returns, free, in under 2 minutes:

1. A short, specific readout of their actual voice (3-5 concrete
   observations — not generic "confident and clear" flattery, actual
   pattern-matching: sentence length habits, favorite openers, what they
   never say).
2. **One rewritten piece of content in their voice** (their choice of
   founder-story snippet, LinkedIn post, or blog intro) as a live proof
   point — not a template, a piece that reads like *them*, delivered async
   with an email/Slack ping when ready ("your voice sample is ready").
3. A single clear CTA: "This is one output from one input, and you didn't
   have to tell it what to do — imagine what it builds once you actually
   direct it. Relay does this automatically, in 5 formats, every time you
   publish, and you're always the one steering it. Want it running on your
   content?"

This is deliberately narrow, fast to build, fast to try, and produces a
personal, screenshot-able artifact people want to share (which is itself a
distribution loop — a good voice readout is the kind of thing founders
post about).

**Positioning note (added 2026-07-25, per Aditya):** the wedge sells the
*style* proof (it sounds like you) cheaply and fast, but the CTA should
plant the *substance + directability* pitch — "an engine you can actually
steer" — as the reason to come back for the full product, not just "more
formats." That's the differentiator from both the generic AI-writer
category and from fully autonomous players like Polsia (see
`01-ROAST.md`'s addendum and `03-PRD.md` §3-4). Don't let the wedge's copy
imply "hands-off automation" — that undersells the actual product and
invites exactly the "robotic" comparison Relay exists to avoid.

## 3. Why this wedge specifically

- Costs us one generation call, not a heavy pipeline — cheap to give away.
- The "proof" is the product itself in miniature — no credibility gap
  between what's free and what's paid, unlike a lead magnet unrelated to
  the core value.
- Shareable output (a good, accurate voice readout is flattering and
  specific enough that people repost it) — free acquisition loop.
- Directly discredits the "robotic AI content" complaint the whole product
  is a reaction to, in the first 2 minutes of contact.

## 4. Channels (phase 1, ranked by cost/speed to first signal)

1. **Founder's own + Aditya's own network and audience** — post the Voice
   Sample tool directly, ask 20-30 founders in network to try it this
   week. Cheapest, fastest signal, zero CAC.
2. **Indie Hackers / X (build-in-public)** — document the build (roast →
   PRD → MVP → wedge) publicly; the meta-story ("we built a tool that
   proves your content sounds robotic, then fixes it") is itself
   distribution content. Consistent with "constantly publish" being the
   product's own pitch — dogfood it visibly.
2a. Cross-post the same build-in-public thread to LinkedIn (higher density
   of the actual ICP — B2B/technical founders — than X for this specific
   audience).
3. **Warm outreach to Yescity's existing network** — Aditya's company
   relationships are a pre-qualified list of founders/operators; direct
   1:1 outreach with the Voice Sample link, not a cold pitch.
4. **Product Hunt launch** — once the wedge + upgrade funnel is proven on
   channels 1-3 (don't launch cold with zero validated funnel numbers).
5. **Communities**: relevant Slack/Discord founder communities (On Deck,
   Lenny's, indie SaaS groups) — share the tool where sharing free value
   is the norm, not a sales pitch.

Explicitly deferred to phase 2: paid ads, SEO content play (ironic given
the product, but SEO is a 6+ month game and phase 1 needs faster signal),
outbound to DTC/ecommerce (different ICP, not v1).

## 5. Funnel & metrics Aditya owns

```
Voice Sample tried (free, no signup required to see result)
   → email/Slack captured for delivery of the async result
      → CTA clicked ("want this running on your content")
         → signed up for Relay (free trial or paid, TBD pricing)
            → completed one full input→approve→fan-out cycle
               → paid conversion
```

Track weekly, starting week 1:
- Voice Samples run
- % that provide contact info to receive the result
- % that click through to sign up
- % that complete one full cycle
- % that convert to paid

If Voice Sample → contact-info capture is under ~40%, the tool itself
isn't compelling enough — fix the tool before spending on more channels.
If contact → signup is under ~15%, the CTA/pricing/positioning is the
problem, not distribution volume.

## 6. Pricing (placeholder, to validate not assume)

Anchor below Meet Sona ($24-59/mo) and above pure repurposing tools
(ContentIn ~$15/mo), reflecting the added voice-profile/multi-lane value:
propose **$29/mo starter, $79/mo for full output-profile customization +
priority processing**, single-user. Revisit after first 20 paying
customers — do not treat this as fixed.

## 7. Division of responsibility (phase 1)

| Area | Owner |
|---|---|
| Voice Sample wedge tool spec + copy/positioning | Aditya |
| Engine (adapters, voice profile, review UI, repurposing pipeline) | Zoheb |
| Outreach, community, build-in-public content, PH launch | Aditya |
| Pricing experiment design, funnel instrumentation | Aditya (with Zoheb on tracking implementation) |
| Product roadmap, technical architecture | Zoheb |

Weekly sync on the funnel numbers in §5 — distribution is the thing to
correct fastest if it's not working, per the original brief ("main thing
to crack is distribution").
