# Learnings & Open Questions So Far

A single-page summary of everything decided, learned, and still unresolved
across `01-ROAST.md` through `06-POLSIA-PLAYBOOK-AND-GTM-V2.md`. Read those
for full reasoning — this is the condensed version.

## What Relay is

A **directable** content engine for solo founders / small B2B teams who
already publish (blog, LinkedIn) but hate how robotic their AI-assisted
content sounds. Not automation — the human supplies insight and direction
before generation, not just approval after.

Three things get captured, kept distinct:
- **Avatar** — the person: identity, beliefs, expertise, stories. Substance.
- **Voice Profile** — tone, phrasing, rhythm. Style. Lives inside the Avatar.
- **Direction** — a per-submission steering note given *before* generation.

## Key learnings

1. **"AI drafts, human approves" is table stakes, not a wedge.** Meet Sona,
   Supergrow, Taplio, ContentIn, OpusClip, Klap, Munch all already do some
   version of this. Calling two LLMs instead of one isn't defensible either
   — customers can't tell or care which model wrote a paragraph.
2. **Don't borrow Polsia's growth story to sell the opposite pitch.** Polsia
   ($10M ARR, ~7,653 companies, $30M raise at $250M, May 2026) sells "zero
   human bottleneck." Relay sells "a human must be in the loop." Pick one
   story on purpose — the credible version is "the responsible alternative
   to autonomous slop machines," stated explicitly.
3. **Video chunking, browser extensions, and DTC/agency ICPs are all
   commoditized, high-friction, or out-of-scope distractions for v1.**
   Deferred, not banned — revisit only with a specific differentiated
   reason.
4. **The real moat isn't "human reviewed it," it's how much of the person's
   actual substance gets into the pipeline before generation.** A style
   profile alone (tone, phrasing) still produces generic-but-restyled
   output. Capturing an Avatar (identity, beliefs, stories, POV) is what
   lets the engine generate genuinely new, personal ideas — not just
   reword whatever's pasted in.
5. **Directability has to be a first-class, visible input, not a buried
   setting.** Even Polsia, the fully autonomous comparison, can be steered
   by its operator — so "you can direct this" isn't something Relay gets
   for free by being manual. It has to be a built, visible step (the
   Direction field) before generation runs.
6. **Nobody in the competitive set sells any of**: a durable voice profile
   that compounds across every piece (not just one interview, like Meet
   Sona); edits feeding back into a visible, persistent style model;
   multi-model transparency (showing which lane produced what); a
   founder-configurable output-format list; async "submit once, get
   pinged" as the wedge combined with a voice/brand data capture behind
   it; or explicit directability as the headline pitch. These are the open
   gaps Relay is betting on.
7. **Team/scope risk is real.** Two people, part-time, originally scoping a
   multi-model engine + repurposing + video chunking + a browser extension
   + a 3-geo GTM motion in phase 1 — that's 4-6 products bundled into one
   roadmap. Narrowed to: one ICP (solo/small B2B founders), one wedge
   (hosted, no install), voice+substance+direction as the moat.
8. **The self-serve wedge tool was sequenced too early.** Per Reforge's
   Product–Channel/Channel–Model fit logic, a self-serve tool needs a
   proven manual motion behind it first. GTM v2 inserts a **concierge
   Phase 0.5** (Zo + Aditya manually run ~15 real people, including two
   already-confirmed dogfood targets — Zo's own company and Yescity —
   through the actual engine by hand, no signup, no public tool) ahead of
   building the "Voice Sample" wedge.
9. **Studying Polsia's playbook has a survivorship-bias problem.** His
   unfair advantages (Columbia engineering, Barclays quant background, a
   CloudKitchens operating role, an SF network that reshares and funds
   people like him) are exactly the parts of his growth that don't
   transfer. The research task was reframed from "copy his cadence" to
   "find falsifiable hypotheses about what caused the first engagement
   spike, and state explicitly how much is (a) posting tactic vs. (b)
   timing against a model-capability jump vs. (c) pre-existing network vs.
   (d) survivorship bias." Only (a) is actually transferable.
10. **A second, unrelated distribution bet ("iamacockroach" — a GenZ
    audience-repurposing channel) surfaced alongside Relay's own GTM before
    Relay had run a single real cycle.** Flagged as scope risk (same
    critique as #7, now doubled), a legal/brand risk (repurposing another
    account's content without a stated license/attribution approach), and
    an unresolved values disagreement between Zo and Aditya on content
    sourcing. Decoupled from Relay's core motion: allowed to proceed only
    with its own success metric, not counted toward Relay's funnel numbers.
11. **The concierge instinct ("reach out directly, no product yet, service
    people by hand") was the single strongest idea in the founders' own
    thread and the least developed one.** Promoted from a passing comment
    to the actual Phase 0 motion, with a concrete exit bar: 8-10 of ~15
    people say it's clearly better/faster, 3+ say "I'd pay for this"
    unprompted.
12. **Phase 0 engine scaffold is built.** Provider-adapter interface, Avatar
    store (identity + voice profile + insights), Direction input, review
    UI, repurposing pipeline, and a generate-from-Avatar action all exist
    in `packages/` with mock adapters — fully demoable without live API
    keys.

## Everything still open

### Product (from the PRD, revisit after first 10 real users)
- Does showing which model/lane produced what (three-lane transparency)
  actually matter to non-technical founders, or is it only a trust signal
  for a technical ICP?
- What's the right default output profile per segment (solo founder vs.
  small B2B team)?
- Should "publish directly" integrations (LinkedIn, CMS/webhooks) be built
  before or after Avatar quality is proven?
- Should generate-from-Avatar be gated behind a minimum amount of captured
  insight, to avoid generic output from a near-empty Avatar? Needs real
  usage data to set a sane threshold.

### GTM / distribution
- Is Voice Sample → contact-info capture ≥ ~40%? (If not, the tool itself
  isn't compelling enough yet — fix before spending on more channels.)
- Is contact → signup ≥ ~15%? (If not, it's a CTA/pricing/positioning
  problem, not a distribution-volume problem.)
- What's the actual pricing? Placeholder is $29/mo starter, $79/mo full —
  explicitly unvalidated until real paying-customer conversations happen.
- Model–Market fit (pricing/willingness-to-pay) is currently the lowest-
  confidence hypothesis in the Four Fits table — entirely unverified until
  Phase 0 produces real conversations.

### Polsia research (Aditya's assignment, still to be delivered)
- What was the actual first post/moment that produced a noticeably-larger-
  than-baseline engagement spike — a number, a demo, a claim, a reply to
  someone bigger?
- What's the ratio/sequence of his early story types (personal narrative
  vs. raw metrics vs. product demo vs. philosophy/thesis posts)?
- Explicit breakdown: how much of his outcome is (a) posting tactic vs.
  (b) timing against Opus 4.5's release vs. (c) pre-existing
  network/pedigree vs. (d) survivorship bias?
- The transferable version of the mechanic, scaled to a 2-person team with
  zero audience and none of his pedigree.

### Open decisions for the next meet
- Resolve the content-sourcing disagreement on the "iamacockroach" GenZ
  channel explicitly — "whatever works" is not a decision.
- Confirm Yescity's actual current relationship to the project (dogfood
  customer? source of the first case study? something else?).
- Decide who runs the Phase 0 concierge delivery hands-on — both founders,
  or split by company — before the outreach list goes out.
- Get the named list of 10-15 real people for Phase 0 concierge outreach,
  plus a one-paragraph "quick win" offer per person/company (Aditya's
  committed deliverable, still outstanding as of this doc).

### Standing checks (re-run every planning cycle, not one-time questions)
- Re-run the Roast whenever the product changes materially.
- Re-run the competitive/market-research scan before every planning cycle
  — the category moves fast.
- Every phase: "does the human-in-the-loop step make this measurably less
  robotic than a fully autonomous competitor?" If the answer stops being
  yes, the product has drifted from its reason to exist.
