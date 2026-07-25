# The Roast — Why This Might Not Work

Before we build anything, here is the honest bear case for Relay, argued as
hard as we can argue it. If it survives this, it's worth building. This
document is dated and should be re-run every time the product changes
materially.

## 1. "Human-in-the-loop content" is not a gap, it's the whole market

Every serious player in this space already sells "AI drafts, human
approves." That is not a differentiator, it's table stakes:

- **Meet Sona** already does almost exactly the founder-story piece of this
  pitch — a ~10 minute voice interview becomes a LinkedIn post, newsletter,
  blog, and video script, explicitly marketed on "your real words, not a
  robot." Creator plan is $24/mo, Visionary $59/mo.
- **Supergrow, Taplio, ContentIn, PostNitro, Typeshare** all do
  blog/YouTube/PDF → LinkedIn repurposing with a human editing step.
- **OpusClip, Klap, Munch, Vizard** already do the "long video → highlight
  clips → captions → multi-platform shorts" pipeline the "extension/local
  processing" half of the pitch describes, with free tiers as the wedge.

If the pitch is "we'll combine ChatGPT ideation + Claude drafting + a human
edit + repurposing," that is a **workflow**, not a product wedge. Workflows
get cloned in a weekend by any of the incumbents above bolting on one more
model. What's defensible is never "we call two LLMs instead of one" — a
customer cannot tell or care which model produced a paragraph. What's
defensible, if anything, is the **specific niche + the specific delivery
motion** (see §5).

## 2. The Polsia comparison cuts against you as much as for you

Polsia (Ben Broca, solo founder) is real and the numbers are real: ~$10M
ARR, 7,653 companies run autonomously, $30M seed at a $250M valuation
(May 2026), backed by Sound Ventures, True Ventures, Offline Ventures,
Adjacent, Tekton Ventures, Drysdale Ventures, and VaynerFund. It creates UGC
ads and posts content end-to-end with close to zero human touch per
customer.

That is the opposite bet from what's being proposed here. Polsia's whole
pitch to investors is "no human bottleneck, agents run the company." This
plan's pitch is "a human must review every piece before it goes out." Both
can be right for different segments, but don't borrow Polsia's growth
story (raised at $250M in one funding cycle on the strength of *removing*
humans) to justify a product whose core value prop is *keeping* a human in
the loop. Pick one story. If the pitch to customers is "we're the
responsible alternative to fully autonomous slop machines like Polsia,"
that's a real, arguable position — but say that on purpose, don't back into
it.

## 3. Distribution plan is the weakest part of the actual plan, and it's the part flagged as most important

"Offer something valuable for free, get their email/Slack, upsell the full
engine" is correct in shape (see OpusClip/Klap's free-tier wedge) but as
described it has three holes:

- **No proof anyone's short-form/video-chunking tool is differentiated.**
  OpusClip and Klap already give this away free with no signup friction for
  a basic clip. If the free wedge is "we also chunk your video," you are
  competing on a commodity, day one, against funded incumbents with a
  two-year head start on the model quality for hook detection.
- **"Local install / browser extension" adds distribution friction, not
  less.** Extensions have to be discovered, installed, granted permissions,
  and (per the Chrome Web Store review process) maintained against
  policy changes. That's a heavier ask than a URL a prospect pastes into a
  web form. If the goal is minimum-friction top-of-funnel, a hosted tool
  beats an extension every time in early days — revisit the extension once
  there's a real reason (e.g. reading something only visible in an
  authenticated local session, the way Ugram's Instagram-saves problem
  actually required one).
- **No mechanism specified for who actually shows up.** "We alert them by
  email/Slack once it's processed" describes the notification, not the
  acquisition. Where do the first 100 people who submit something come from?
  This has to be answered concretely (a channel, a partnership, a founder's
  own audience) or the whole plan is a product with no visitors.

## 4. "Founder story to blog to LinkedIn to whatever" tries to serve three ICPs in v1

Founder personal brand (B2B, 1:1 voice), DTC/ecommerce brand content
(product-led, catalog-driven), and "any company that publishes blogs"
(generic B2B content ops) are three different buyers with three different
review workflows, three different success metrics, and three different
places they hang out. Building "an engine" generically for all three in
phase 1 is how you end up with a mediocre product for everyone instead of a
sharp one for someone. Pick one wedge ICP for MVP (this plan picks
solo/small-team founders — see PRD — and defers DTC/ecommerce and agencies
explicitly).

## 5. "Constant content, robotic" is a real complaint, but automation-with-review doesn't obviously fix the root cause

The actual complaint buyers have about robotic AI blogs isn't "no human
looked at it," it's "it doesn't sound like anyone in particular and it says
nothing surprising." A human clicking "approve" on an AI draft, without
real editorial teeth (a strong point of view store, a voice profile trained
on real transcripts/past writing, brand guardrails), produces the same
robotic output with an extra step. Meet Sona's bet — build the voice
profile from a voice interview, not a text prompt — is a direct answer to
this and is worth studying, not skipping past. If Relay's "human input" step
is just "edit this paragraph in a text box," it will not read as less
robotic than the incumbents. The differentiation has to live in *how much
of the person's actual voice/data gets into the pipeline before generation*,
not just in whether a human reviews after.

## 6. Team and scope risk

Two people, part-time-sounding ("planning to work on something"), scoping
a multi-model orchestration engine + a repurposing pipeline + a video
chunking pipeline + a browser extension + a full GTM motion into three
geos, in phase 1. That is 4-6 products bundled into one roadmap. Historically
this kills momentum before either of you learns whether anyone wants any of
it.

## Verdict: build it, but narrower than pitched

The idea survives the roast if — and only if — three changes are made,
which the PRD and roadmap below bake in:

1. **One ICP for v1**: solo founders / small B2B teams who already publish
   content and are tired of it sounding generic (not DTC, not agencies, not
   "any company," yet).
2. **One wedge, hosted, no install**: a single free tool that produces an
   obviously good, obviously personal artifact in under 5 minutes with just
   a URL/text paste — not a browser extension, not video processing, in v1.
3. **Voice, not just review, as the moat**: the human-in-the-loop step has
   to feed a persistent voice/brand profile the engine gets better at using,
   not a one-off edit box. That's the honest answer to "why isn't this
   robotic," and it's the thing that's actually hard to clone in a weekend.

See `02-MARKET-RESEARCH.md` for the fuller competitive landscape,
`03-PRD.md` for what v1 actually is, and `04-GTM-DISTRIBUTION.md` /
`05-ROADMAP.md` for how it ships and who owns what.

## Addendum (2026-07-25) — Aditya's correction, and why it sharpens §5 and §2

Aditya's pushback: we shouldn't capture just a "voice profile" (tone,
phrases, sentence rhythm) — we should capture an **Avatar**, the fuller
person (identity, beliefs, expertise, stories, POV), *and* the voice
profile sits inside that. The avatar is what gets replicated and extended
into new content, not just restyled input. And separately: the product
should not be pitched as automation, because automation is what cuts
creativity out of the loop — the human has to be able to actively **direct**
generation with real insight, not just approve or reject what comes out.
His framing: even Polsia, the fully-autonomous comparison this whole plan
is reacting to, can be directed/prompted by its operator — so "you can
steer this" is not something Relay gets for free by being manual instead
of autonomous. It has to be a built, visible capability.

This doesn't overturn the verdict, it makes §5's point sharper and fixes a
real gap in it:

- §5 said the moat is "how much of the person's actual voice/data gets
  into the pipeline before generation." That was still too narrow — it
  described capturing *style*, not *substance*. An avatar with insights,
  stories, and POV is capturable knowledge that can generate genuinely new
  ideas, not just restyle whatever the founder pastes in. That's a real
  answer to "robotic," stronger than a style profile alone.
- §2 said "pick one story" between Polsia's autonomy pitch and this plan's
  human-in-the-loop pitch. Aditya's point sharpens that further: the
  honest story isn't "human review vs. no human review," it's
  **"directable, on purpose, with a visible mechanism for it" vs. "runs on
  autopilot unless you go dig into settings to steer it."** Direction has
  to be a first-class step in the workflow (see PRD §4, "Direct"), not an
  implicit side effect of an edit box.

Updated verdict for point 3 above: the moat is **Avatar + Voice Profile +
explicit Direction**, not voice profile alone. See `03-PRD.md` for the
reworked core workflow and data model.
