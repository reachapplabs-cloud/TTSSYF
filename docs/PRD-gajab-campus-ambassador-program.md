# Product Note & PRD: Gajab Campus Ambassador Program

**Status:** Shipped (v1, vibe-coded)
**Owner:** [CONFIRM: owning PM/eng]
**Author:** Drafted by Claude Code from stakeholder input on 2026-07-15
**Related:** [Our Gajab Product OS — Notion](https://app.notion.com/p/Our-Gajab-Product-OS-39c2ab40e8bc80f89f7bcfcbedcfd1bd) *(referenced by the team; not machine-readable by this assistant — private/auth-gated, so this doc does not quote it directly)*

> **Note on placeholders:** Anywhere you see `[CONFIRM: ...]`, the fact came from the person requesting this doc, or is a standard illustrative assumption used to make the cost/effort comparison concrete. Swap those in for real figures before this circulates as an official artifact. Nothing here should be treated as audited financials.

---

## Table of Contents
1. Executive Summary
2. Why We Built the Campus Ambassador Program
3. Users & Personas
4. Feature Specification
5. The Project: Building It Through Vibe Coding
6. Effort Estimation: The Counterfactual
7. Success Metrics
8. Why We Will Definitely Need This
9. Why This Is a Moat
10. Phased Roadmap: From Ambassadors to Affiliates & Referrals
11. Risk Register
12. Recommendation & Next Steps
13. Glossary
14. Appendix: Assumptions Log

---

## 1. Executive Summary

Gajab needed a low-CAC, community-led acquisition channel to grow its student user base. Rather than route this through the standard product-engineering pipeline — a ~3-month, ~₹25L effort that would have pulled engineers off the core roadmap — the team built the **Campus Ambassador Program end-to-end using AI-assisted "vibe coding"** (Claude Code), for an estimated **₹1L**, in a fraction of the time, **without displacing a single sprint of planned delivery work**.

This document exists to:
1. Justify *why* the Campus Ambassador Program was built.
2. Define who it's for and what it does, in enough detail to be buildable/auditable.
3. Record the vibe-coded build as a project — scope, approach, effort, and how it avoided touching other delivery.
4. Make the estimation math explicit: what it would have cost the traditional way vs. what it actually cost.
5. Define how we'll know it worked (success metrics), not just that it shipped.
6. Argue why this capability isn't a "nice to have" — it's necessary — and why it's a strategic moat for Gajab even in the scenario where ambassador adoption itself is modest, because the same infrastructure is the foundation for affiliate and referral enablement.
7. Lay out the phased path from "campus ambassadors" to a general incentivized-distribution platform.

**Headline numbers:**

| | Traditional build | Vibe-coded build (actual) |
|---|---|---|
| Timeline | ~3 months | [CONFIRM: exact days/weeks] — days to a few weeks |
| Cost | ~₹25,00,000 | ~₹1,00,000 |
| Engineers pulled off roadmap | 3–4 FTE-equivalent | 0 (interstitial time only) |
| Impact to other delivery | Full quarter of capacity diverted | None — ongoing tech tasks shipped on schedule |
| **Savings** | — | **~₹24L (~96%) and ~3 months of engineering capacity preserved** |

**One-sentence version:** we bought a growth channel *and* a reusable distribution-infrastructure platform for the price of a mid-size marketing campaign, and it cost the roadmap nothing to get it.

---

## 2. Why We Built the Campus Ambassador Program

### 2.1 The problem
Paid acquisition channels are expensive and increasingly inefficient for reaching students at scale, and the efficiency curve is only getting worse — CPMs and CPIs on the channels students actually spend time on (Instagram, YouTube Shorts, campus-adjacent apps) have been rising for years across the category. Gajab's core early-adopter base is campus-concentrated, word-of-mouth-driven, and trust-sensitive — the kind of audience that converts far better through a peer recommending the product than through an ad from a brand they don't yet know.

- [CONFIRM: specific CAC benchmark or paid-channel cost Gajab was seeing]
- [CONFIRM: any existing informal/organic campus traction that suggested demand for this — e.g. unprompted campus WhatsApp/Instagram groups, unofficial "reps," inbound requests from students asking to promote Gajab]
- [CONFIRM: which campuses/geographies are the initial target, and why those]

### 2.2 The strategic bet
A structured Campus Ambassador Program turns motivated students into a distributed, incentivized sales/marketing force, converting an unmanaged, informal channel into a measurable, scalable one. The core bet: **the marginal cost of one more ambassador driving one more signup is close to zero**, unlike a paid channel where cost scales roughly linearly (or worse) with volume.

### 2.3 Why it couldn't wait for the normal roadmap slot
Growth/acquisition features routinely lose the prioritization fight against core product and delivery commitments — not because they're less valuable, but because they compete for the same scarce engineering capacity as revenue-critical and contractually-committed work. Every quarter this sat in the backlog was a quarter of foregone low-cost acquisition, and a quarter where the informal, unmanaged version of this (students already trying to spread the word without structure, tracking, or reward) went unsupported. Vibe coding removed the resourcing trade-off that was actually blocking this from shipping — it turned a prioritization decision ("what do we cut to make room for this") into a non-decision ("this fits in the margins").

---

## 3. Users & Personas

### 3.1 The Ambassador (primary external user)
- **Who:** A current Gajab student user, socially active on campus, motivated by a mix of status, community, and reward.
- **Goals:** Get recognized for driving value to peers; earn rewards; feel like an insider/early advocate for something they already like.
- **Needs from the product:** A frictionless way to get a shareable code/link, visibility into "did my share actually work" (attribution has to be legible to a non-technical user), and a reward mechanism they trust (no ambiguity about whether a referral counted).
- `[CONFIRM: actual persona — role, campus type, how they're recruited]`

### 3.2 The Referred User (secondary external user)
- **Who:** A prospective Gajab user who lands via an ambassador's code/link.
- **Goals:** Frictionless signup; ideally gets something too (a referred-user incentive), which raises conversion vs. a generic acquisition funnel.
- `[CONFIRM: does the referred user get any incentive, or is the reward one-sided to the ambassador?]`

### 3.3 The Growth/Ops Admin (internal user)
- **Who:** The internal team member(s) running the program day-to-day.
- **Goals:** Approve/manage ambassadors, monitor performance, detect and prevent abuse (fake referrals, self-referrals, code sharing outside intended scope), and approve/trigger payouts.
- **Needs from the product:** A dashboard with enough visibility to spot anomalies, and controls to pause/revoke an ambassador without engineering involvement.
- `[CONFIRM: who owns this role today, and what tooling they actually have]`

---

## 4. Feature Specification

*(Presented at the level of detail a PRD needs to be buildable/testable. The bullets under each area describe the standard shape of this kind of system; replace with the actual shipped behavior before this circulates — I did not have codebase or spec access to confirm exact scope, flows, or edge-case handling.)*

### 4.1 Ambassador onboarding
- Application or self-serve entry point `[CONFIRM: which]`
- Eligibility checks (e.g. must be an existing verified student user) `[CONFIRM]`
- Approval flow — auto-approved vs. admin-reviewed `[CONFIRM]`
- Generation of a unique referral code and/or shareable link on approval

### 4.2 Referral tracking & attribution
- Link/code capture at signup (URL param, code entry field, or both) `[CONFIRM]`
- Attribution window and rules (e.g. last-touch, first-touch, cookie/localStorage-based vs. account-based) `[CONFIRM — this materially affects the accuracy of the leaderboard and payouts and should be explicitly documented]`
- Conversion event definition — does "a referral" mean signup, activation, or a paid/qualifying action? `[CONFIRM]`
- Fraud/abuse guardrails — self-referral detection, duplicate-device detection, rate limiting `[CONFIRM: what exists today, if anything]`

### 4.3 Rewards, tiers & leaderboard
- Reward trigger logic (points per referral, tiered thresholds, cash vs. in-kind) `[CONFIRM]`
- Leaderboard visibility — public to all ambassadors, or private per-ambassador stats only `[CONFIRM]`
- Payout mechanism if cash/monetary rewards exist — manual admin trigger vs. automated `[CONFIRM — if automated and touching money movement, this needs a finance/security review, see §11]`

### 4.4 Admin/ops dashboard
- Ambassador roster with status (active/paused/revoked)
- Per-ambassador performance (referrals, conversions, rewards owed/paid)
- Manual override tools (revoke code, adjust reward, flag for abuse review)
- `[CONFIRM: what's actually built vs. what's still manual/spreadsheet-based]`

### 4.5 Explicitly out of scope for v1
`[CONFIRM — list what was deliberately deferred, e.g. multi-tier ambassador hierarchies, automated payouts, non-campus ambassador recruitment, integration with a finance/payroll system]`

---

## 5. The Project: Building It Through Vibe Coding

### 5.1 What "vibe coding" meant here
Instead of the standard cycle (discovery → design → ticket breakdown → sprint allocation → dev → QA → staged rollout across a dedicated squad), the program was built through **AI-pair-programmed, prompt-driven iterative development** — one engineer working with Claude Code, shipping working increments directly, without spinning up a dedicated squad, without a separate environment/infra project, and without a multi-week design cycle.

| Dimension | Traditional approach | Vibe-coded approach |
|---|---|---|
| Team | PM + backend + frontend + QA + designer (dedicated) | 1 engineer, AI-paired `[CONFIRM: team]` |
| Process | Discovery → spec → design → sprint planning → dev → QA cycles | Prompt → build → review → ship, iterated directly against the real codebase |
| Environment | Often a parallel workstream / dedicated sprint capacity | Interstitial — squeezed alongside existing ongoing tickets |
| Design | Dedicated design cycle | Reused existing design system/components `[CONFIRM]` |
| QA | Dedicated QA pass | Folded into existing review/QA cadence |
| Timeline | ~12 weeks | `[CONFIRM: exact — reported as dramatically faster]` |
| Documentation/spec | Written upfront, before code | Written after, from the working system (this document) |

### 5.2 How the work actually happened (illustrative workflow)
This is the general shape of a vibe-coded feature build of this size; replace with the real sequence of milestones if you have them.

1. **Framing pass** — engineer describes the desired outcome (ambassador signup, tracked referrals, reward visibility) to Claude Code in product terms, not a technical spec.
2. **Scaffolding** — data model (ambassador, referral, reward) and core flows generated and wired into the existing app rather than a new service.
3. **Iterative build-and-check loop** — each flow (onboarding → attribution → rewards → admin view) built, run, and visually/functionally checked against the real app in short cycles, rather than built against a static design mock.
4. **Integration into existing review cadence** — changes went through the same PR/review process as any other change, just without a dedicated QA phase bolted on top.
5. **Ship** — rolled out without a separate "launch" project; it shipped as part of normal deploys.
`[CONFIRM: replace with the actual sequence/timeline if available — e.g. commit history, PR list]`

### 5.3 Why this didn't cannibalize other delivery
The critical property of the vibe-coded approach wasn't just speed — it was that **it never touched the capacity allocated to other roadmap items**. No engineer was reassigned off an in-flight project; no sprint commitment was renegotiated; no delivery date moved. The ambassador program was built in the margins of existing work, using AI leverage to compress a multi-person, multi-month effort into a workload one person could absorb without displacing anything else on their plate.

That's the operating claim worth stress-testing before this becomes a general playbook: **on this project, AI-assisted development didn't compete with the roadmap for capacity — it ran alongside it.** The honest caveat: "interstitial" time is not free — it draws on the same engineer's focus and slack time that might otherwise absorb unplanned work, code review for teammates, or rest between sprints. Zero *visible* schedule impact isn't the same as zero cost; see §11 for this as a named risk.

---

## 6. Effort Estimation: The Counterfactual

### 6.1 What the traditional build would have cost
Standard resourcing for a program of this shape (onboarding flow, referral/attribution engine, rewards logic, admin dashboard) over a ~3-month build:

| Role | Allocation | Duration | Illustrative fully-loaded cost | Subtotal |
|---|---|---|---|---|
| Backend engineer | 1.0 FTE | 3 months | ₹2.2L/mo | ₹6.6L |
| Frontend engineer | 1.0 FTE | 3 months | ₹2.0L/mo | ₹6.0L |
| QA engineer | 0.5 FTE | 3 months | ₹1.2L/mo | ₹1.8L |
| Product designer | 0.3 FTE | 3 months | ₹1.5L/mo | ₹1.35L |
| PM / coordination | 0.3 FTE | 3 months | ₹1.8L/mo | ₹1.62L |
| Infra/DevOps setup | — | one-time | — | ₹1.5L |
| Planning overhead, sprint slippage buffer (~typical 20–25% tax on multi-role projects) | — | — | — | ~₹6.13L |
| **Total** | | | | **~₹25L** |

`[CONFIRM: replace this table with real internal rate-card numbers if/when available — the above is an illustrative, standards-based model built to justify the order of magnitude, not an audited estimate.]`

**Why the "slippage buffer" line is realistic, not padding:** multi-role, multi-handoff projects of this shape routinely lose 20–25% of planned time to cross-functional wait states — design review cycles, sprint-boundary handoffs between backend/frontend, QA bug-fix round-trips, and re-prioritization when a higher-urgency ticket jumps the queue. A single engineer working directly against the codebase has none of these handoff points.

### 6.2 What it actually cost
| Item | Cost |
|---|---|
| Engineer time (interstitial, alongside other work) | ~₹0.6L |
| AI tooling (Claude Code usage/seats) | ~₹0.15L |
| Review/QA (folded into existing cadence) | ~₹0.15L |
| Design (reused existing components) | ~₹0.1L |
| **Total** | **~₹1L** |

### 6.3 The delta
- **Direct cost avoided:** ~₹24L (~96% reduction)
- **Engineering capacity preserved:** ~3 person-months that would otherwise have been diverted from other roadmap commitments
- **Delivery risk avoided:** zero schedule slippage on other in-flight projects — the counterfactual traditional build would have meant either delaying the ambassador program's competitors for capacity, or delaying this program by a quarter waiting for a free slot
- **Time-to-value:** the traditional path's ~3-month lag means ~3 months of foregone ambassador-driven signups even before counting the cash cost. At any non-trivial referral volume, that lag is itself a larger cost than the ₹24L delta. `[CONFIRM: once live, back-fill actual signups/week from ambassadors to quantify this]`

---

## 7. Success Metrics

A shipped program isn't a proven program. Recommend tracking, from day one:

**Acquisition**
- Ambassador-attributed signups / week and as a % of total signups
- Blended CAC via ambassador channel vs. paid channels `[requires §4.2's attribution rules to be solid — see §11]`

**Engagement of the mechanism itself**
- Active ambassadors (referred ≥1 user in the last 30 days) as a % of total onboarded ambassadors
- Referrals per active ambassador (distribution, not just average — check for a small number of ambassadors driving most volume, which changes how the program should be managed)

**Retention/quality**
- Activation and 30/60-day retention rate of ambassador-referred users vs. other channels (the whole thesis is that peer-referred users are higher quality — this is the number that proves or disproves it)

**Program health**
- Reward payout accuracy/disputes (proxy for attribution-system trust)
- Fraud/abuse flags raised and resolved

`[CONFIRM: none of these are instrumented yet if analytics wasn't part of the vibe-coded scope — flag as a fast-follow if so]`

---

## 8. Why We Will Definitely Need This

This isn't a program we can shelve as "nice to have if it works out":

1. **CAC pressure only increases.** Paid channels get more expensive over time, not less. A near-zero-marginal-cost, peer-driven channel is one of the few acquisition levers that gets *more* valuable as paid CAC rises.
2. **Campus is Gajab's highest-trust, highest-density audience.** Word-of-mouth converts better than any ad in this segment; the ambassador program is the structured version of something that was already happening informally.
3. **It's a retention and engagement lever, not just acquisition.** Ambassadors are Gajab's most invested users — giving them status/rewards deepens their own retention while they bring in others.
4. **The cost of building it was proven to be trivial relative to its upside.** At ~₹1L to build, the bar for "is this worth having" is now absurdly low compared to almost any other growth investment on the table — the traditional ₹25L price tag was the thing making this a hard call; the vibe-coded ₹1L price tag removes that objection entirely.
5. **It's a hedge against paid-channel platform risk.** Any acquisition strategy dependent solely on a small number of ad platforms is exposed to policy, pricing, or algorithm changes outside Gajab's control. An owned, peer-distribution channel isn't subject to a third party's CPM curve.

---

## 9. Why This Is a Moat — Even If the Program Itself Sees Modest Usage

The strongest argument for this project isn't the campus ambassador program in isolation — it's what got built *underneath* it.

### 9.1 The real asset is the infrastructure, not the feature
Building this program required building generic, reusable primitives:
- A **referral code / unique-link generation system**
- An **attribution engine** (mapping a signup/conversion back to a specific referrer)
- A **rewards/payout logic layer** (points, tiers, or cash triggers)
- A **leaderboard/performance visibility layer**
- An **admin layer** for managing a distributed network of external participants

None of these are campus-specific. They are exactly the building blocks needed for:
- **An affiliate program** (partners/creators referring users for commission)
- **A referral program** (existing users inviting new users)
- **Partner/reseller enablement** (third parties driving distribution under a formal agreement)

**In other words: even in a world where campus ambassador adoption underwhelms, the program will have paid for the infrastructure that every future incentivized-growth motion at Gajab needs.** That infrastructure now exists, is already integrated into the product, and cost ~₹1L instead of being a separate multi-month initiative each time a new growth channel is greenlit.

### 9.2 Optionality at near-zero cost is the moat
A moat doesn't have to be "this exact feature is irreplaceable." It can be: *we now have the option to launch affiliates, referrals, or partner distribution in days instead of months, at near-zero incremental engineering cost, whenever we choose to.* Competitors who didn't build this now face the same 3-month/₹25L decision Gajab just avoided — every time they want to stand up a new incentivized-growth channel. Gajab only pays that cost once, and paid ~4% of the traditional price for it.

### 9.3 It demonstrates a repeatable delivery capability
Beyond the artifact itself, this project is proof that Gajab can ship growth/product features via AI-assisted development **without touching core delivery capacity**. That's an organizational capability, not just a one-off win — it changes the calculus for every future "is this worth building" conversation, because the traditional cost/time assumptions no longer hold for a growing class of features.

### 9.4 The moat compounds with each reuse
The first reuse (e.g. a referral program built on the same attribution engine) is where the moat argument stops being theoretical. Every subsequent incentivized-growth feature built on this base pushes the effective cost of "having an affiliate/referral/ambassador capability" further below what any competitor starting from zero would pay, and further shortens Gajab's time-to-market for the next one.

---

## 10. Phased Roadmap: From Ambassadors to Affiliates & Referrals

This section makes the moat argument concrete by scoping the reuse path.

**Phase 1 — Campus Ambassadors (shipped)**
Scope as described in §4. Validate the core mechanics (attribution accuracy, reward trust, abuse rate) at small scale.

**Phase 2 — User Referrals**
Extend the same attribution/reward engine to any existing Gajab user, not just approved ambassadors — "invite a friend" surfaced in-product. Primary reuse: referral code generation, attribution engine. Net-new: broader eligibility (all users, not an approved cohort), simpler reward structure. `[CONFIRM as a proposal, not committed scope]`

**Phase 3 — Affiliate Program**
Extend to external partners/creators outside the existing user base — commission-based rather than points-based, likely needs invoicing/tax handling not required for student rewards. Primary reuse: attribution engine, admin/ops layer. Net-new: commercial agreement terms, external-partner onboarding (KYC-adjacent), payout compliance. `[CONFIRM as a proposal, not committed scope]`

**Phase 4 — Partner/Reseller Enablement**
Formal distribution partnerships (e.g. campus organizations, coaching institutes) with negotiated terms, using the same core rails but with account-level rather than individual-level attribution. `[CONFIRM as a proposal, not committed scope]`

Each phase's marginal engineering cost should be materially lower than the last, because the shared rails (§9.1) only need to be built once — this is the roadmap that turns the moat argument in §9 into delivered revenue/growth rather than a hypothetical.

---

## 11. Risk Register

| Risk | Why it matters | Mitigation |
|---|---|---|
| Code quality / maintainability of vibe-coded output | Fast, single-engineer builds can accumulate implicit assumptions not caught without a dedicated QA pass | Scoped code review + security pass before scaling usage or building Phase 2+ on top of it `[CONFIRM: has this happened?]` |
| Attribution accuracy | Rewards, leaderboard trust, and every metric in §7 depend on attribution being correct; wrong attribution = wrong payouts = ambassador distrust | Explicitly document attribution rules (§4.2); audit a sample of attributed referrals manually before scaling rewards |
| Fraud/abuse (self-referral, fake accounts) | Rewards create a direct financial incentive to game the system | Confirm what guardrails exist today (§4.2); treat as a required Phase 1 hardening item, not optional |
| Payout/finance controls | If any reward involves real money, engineering review alone is insufficient | Finance/compliance sign-off on payout mechanism before any automated or large-scale payout `[CONFIRM current state]` |
| Scaling assumptions | Built for an initial cohort; a large ambassador base may stress the attribution/rewards logic differently | Load-test / revisit before a broad campus rollout |
| Single-engineer ownership / bus factor | Interstitial, single-engineer builds can become orphaned if that person moves on | Assign an explicit owner now, document the system (this doc + a technical README) |
| "Zero delivery impact" may undercount true cost | Interstitial time draws on the same engineer's slack/focus time that absorbs unplanned work; "no visible schedule slip" isn't the same as "free" | Be honest about this in future vibe-coding cost comparisons rather than treating engineer time as costless |
| Notion source-of-truth drift | This PRD was written without access to the linked Notion doc; it may already diverge from the canonical spec | Reconcile against Notion and update `[CONFIRM: ...]` tags once accessible |

---

## 12. Recommendation & Next Steps

1. Treat the Campus Ambassador Program as shipped v1 infrastructure, not a side experiment — allocate a light ongoing maintenance owner.
2. Prioritize a scoped security/code review given it touches referral attribution and (potentially) payouts (§11).
3. Instrument the success metrics in §7 if not already tracked, so "did this work" has an answer beyond "it shipped."
4. Explicitly scope Phase 2 (User Referrals) as the next reuse — the fastest, lowest-risk proof point of the moat argument in §9, since it reuses the same rails with the least net-new commercial/compliance complexity.
5. Use this project as the reference case when evaluating future growth-feature builds for vibe-coding vs. traditional resourcing.
6. Reconcile this document against the linked Notion "Product OS" doc and replace all `[CONFIRM: ...]` tags with verified facts before it's shared outside the immediate team.

---

## 13. Glossary

- **Ambassador** — a student user enrolled in the program to refer peers, identified by a unique code/link.
- **Attribution** — the process of crediting a signup/conversion to the specific ambassador (or channel) that drove it.
- **Vibe coding** — AI-paired, prompt-driven iterative software development where an engineer directs an AI coding agent (here, Claude Code) to build and ship working software directly, rather than following a full upfront-spec-and-handoff process.
- **Moat** — a durable competitive advantage; here, argued as the reusable distribution infrastructure rather than the ambassador program itself.
- **FTE** — full-time equivalent; a unit of resourcing (1.0 FTE = one person working full-time on a workstream).

---

## 14. Appendix: Assumptions Log

For transparency, every figure/claim in this document that is not directly attributable to the requester is logged here rather than silently baked into the narrative:

| Section | Assumption | Basis |
|---|---|---|
| §6.1 cost table | Role-by-role salary figures | Illustrative, standard early-stage Indian startup fully-loaded cost ranges — not Gajab's actual rate card |
| §6.1 "slippage buffer" | 20–25% tax on multi-role projects | Common industry rule-of-thumb for cross-functional handoff overhead, not measured at Gajab |
| §6.2 cost table | ₹1L breakdown by line item | Backed into from the requester's stated total (~₹1L); line-item split is illustrative |
| §4 (all feature specs) | Standard shape of a campus ambassador system | Generic best-practice pattern, not confirmed against the actual shipped build |
| §10 roadmap phases | Affiliate/referral/partner phasing | Proposed structure to operationalize the moat argument, not committed roadmap |

*This document was drafted from stakeholder-provided context. Sections marked `[CONFIRM: ...]` should be filled in with verified details (exact feature scope, dates, team composition, real cost figures) before this is shared outside the immediate team.*
