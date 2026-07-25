# Roadmap & Ownership

## Phase 0 — Now (this repo state)

- [x] Roast / bear case (`01-ROAST.md`)
- [x] Market research (`02-MARKET-RESEARCH.md`)
- [x] PRD (`03-PRD.md`)
- [x] GTM & distribution plan (`04-GTM-DISTRIBUTION.md`)
- [x] MVP engine scaffold: adapters, voice profile, review UI, repurposing
      pipeline (see `packages/`)

## Phase 1 — Prove the wedge (target: 4-6 weeks)

Owner split:

- **Zoheb — product/engine**
  - Wire one real provider adapter per lane (start with one real API key,
    e.g. Claude for drafting; keep the other two lanes as high-quality
    mocks until there's usage to justify the spend)
  - Ship the Voice Sample wedge as a standalone hosted page (uses the
    ideation lane only, one input → one output, per GTM doc §2)
  - Instrument the funnel events Aditya needs (§5 of GTM doc)
  - Get one real founder (not Zoheb or Aditya) through a full
    input → review → fan-out cycle and fix whatever breaks

- **Aditya — distribution**
  - Ship Voice Sample copy/positioning and the upgrade CTA
  - Run channels 1-3 from GTM doc (own network, build-in-public, Yasity
    warm outreach) — target: 100 Voice Samples run, 20 signups, 3 people
    through a full paid-consideration conversation
  - Own weekly funnel number reporting back to Zoheb

**Exit criteria for phase 1**: funnel numbers from GTM §5 hit their
thresholds with at least 20 non-founder users, and at least 3 people have
said "I'd pay for this" unprompted. If not hit in 6 weeks, revisit the
wedge/ICP before building more product.

## Phase 2 — Expand ICP + monetize (after phase 1 exit criteria met)

- Real billing (Stripe), real pricing validated against §6 of GTM doc
- Add DTC/ecommerce as a second ICP with a catalog-aware output profile
  (product story, ad copy variants) — separate onboarding flow, not a
  bolt-on to the founder flow
- Direct-publish integrations (LinkedIn API, CMS webhooks) once voice
  profile quality is proven, not before (per PRD open questions)
- Revisit whether video/short-form repurposing is worth entering, only if
  a clear differentiated angle emerges (per Market Research §4) — default
  is still no

## Phase 3 — Agencies / B2B (explicitly deferred, no commitment yet)

- Multi-client seats, agency-facing dashboard
- Only after phase 2 monetization is proven on direct-to-founder — this
  is a different sales motion (per Roast §4) and shouldn't dilute focus
  before then

## Non-negotiables carried from the Roast (re-check every phase)

1. Stay one ICP at a time — don't widen until the current one converts.
2. The wedge stays hosted, no-install, one input → one clear output.
3. Every phase, the honest test is: "does the human-in-the-loop step make
   this measurably less robotic than a fully autonomous competitor?" If
   the answer stops being yes, the product has drifted from its reason to
   exist.
