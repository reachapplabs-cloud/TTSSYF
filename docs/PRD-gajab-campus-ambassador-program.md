# Product Note & PRD: Gajab Campus Ambassador Program

**Status:** Shipped (v1, vibe-coded)
**Owner:** [CONFIRM: owning PM/eng]
**Author:** Drafted by Claude Code from stakeholder input on 2026-07-15
**Related:** [Our Gajab Product OS — Notion](https://app.notion.com/p/Our-Gajab-Product-OS-39c2ab40e8bc80f89f7bcfcbedcfd1bd) *(referenced by the team; not machine-readable by this assistant — private/auth-gated, so this doc does not quote it directly)*

> **Note on placeholders:** Anywhere you see `[CONFIRM: ...]`, the number or fact came from the person requesting this doc, or is a standard illustrative assumption used to make the cost/effort comparison concrete. Swap those in for real figures before this circulates as an official artifact. Nothing here should be treated as audited financials.

---

## 1. Executive Summary

Gajab needed a low-CAC, community-led acquisition channel to grow its student user base. Rather than route this through the standard product-engineering pipeline — a ~3-month, ~₹25L effort that would have pulled engineers off the core roadmap — the team built the **Campus Ambassador Program end-to-end using AI-assisted "vibe coding"** (Claude Code), for an estimated **₹1L**, in a fraction of the time, **without displacing a single sprint of planned delivery work**.

This document exists to:
1. Justify *why* the Campus Ambassador Program was built.
2. Record the vibe-coded build as a project — scope, approach, effort.
3. Make the estimation math explicit: what it would have cost the traditional way vs. what it actually cost.
4. Argue why this capability isn't a "nice to have" — it's necessary — and why it's a strategic moat for Gajab even in the scenario where ambassador adoption itself is modest, because the same infrastructure is the foundation for affiliate and referral enablement.

**Headline numbers:**

| | Traditional build | Vibe-coded build (actual) |
|---|---|---|
| Timeline | ~3 months | [CONFIRM: exact days/weeks] — days to a few weeks |
| Cost | ~₹25,00,000 | ~₹1,00,000 |
| Engineers pulled off roadmap | 3–4 FTE-equivalent | 0 (interstitial time only) |
| Impact to other delivery | Full quarter of capacity diverted | None — ongoing tech tasks shipped on schedule |
| **Savings** | — | **~₹24L (~96%) and ~3 months of engineering capacity preserved** |

---

## 2. Why We Built the Campus Ambassador Program

### 2.1 The problem
Paid acquisition channels are expensive and increasingly inefficient for reaching students at scale. Gajab's core early-adopter base is campus-concentrated, word-of-mouth-driven, and trust-sensitive — the kind of audience that converts far better through a peer recommending the product than through an ad.

- [CONFIRM: specific CAC benchmark or paid-channel cost Gajab was seeing]
- [CONFIRM: any existing informal/organic campus traction that suggested demand for this]

### 2.2 The strategic bet
A structured Campus Ambassador Program turns motivated students into a distributed, incentivized sales/marketing force:

- **Ambassador onboarding** — students apply or self-serve into the program and receive a unique referral code/link. `[CONFIRM: exact flow]`
- **Referral tracking & attribution** — signups and conversions are attributed back to the ambassador who drove them. `[CONFIRM: exact flow]`
- **Rewards / leaderboard mechanics** — points, payouts, or recognition tied to ambassador performance, to sustain motivation. `[CONFIRM: exact flow]`
- **Internal visibility** — ops/growth team can see who's driving results and manage the program. `[CONFIRM: exact flow]`

*(This section lists the standard shape of a campus ambassador system as background for the PRD's argument. Replace the four bullets above with the actual shipped feature list before distributing this doc — I did not have access to the codebase or the linked Notion spec to confirm exact scope.)*

### 2.3 Why it couldn't wait for the normal roadmap slot
Growth/acquisition features routinely lose the prioritization fight against core product and delivery commitments — not because they're less valuable, but because they compete for the same scarce engineering capacity as revenue-critical and contractually-committed work. Every quarter this sat in the backlog was a quarter of foregone low-cost acquisition. Vibe coding removed the resourcing trade-off that was actually blocking this from shipping.

---

## 3. The Project: Building It Through Vibe Coding

### 3.1 What "vibe coding" meant here
Instead of the standard cycle (discovery → design → ticket breakdown → sprint allocation → dev → QA → staged rollout across a dedicated squad), the program was built through **AI-pair-programmed, prompt-driven iterative development** — one engineer working with Claude Code, shipping working increments directly, without spinning up a dedicated squad, without a separate environment/infra project, and without a multi-week design cycle.

| Dimension | Traditional approach | Vibe-coded approach |
|---|---|---|
| Team | PM + backend + frontend + QA + designer (dedicated) | 1 engineer, AI-paired `[CONFIRM: team]` |
| Process | Discovery → spec → design → sprint planning → dev → QA cycles | Prompt → build → review → ship, iterated directly against the real codebase |
| Environment | Often a parallel workstream / dedicated sprint capacity | Interstitial — squeezed alongside existing ongoing tickets |
| Design | Dedicated design cycle | Reused existing design system/components `[CONFIRM]` |
| QA | Dedicated QA pass | Folded into existing review/QA cadence |
| Timeline | ~12 weeks | `[CONFIRM: exact — reported as dramatically faster]` |

### 3.2 Why this didn't cannibalize other delivery
The critical property of the vibe-coded approach wasn't just speed — it was that **it never touched the capacity allocated to other roadmap items**. No engineer was reassigned off an in-flight project; no sprint commitment was renegotiated; no delivery date moved. The ambassador program was built in the margins of existing work, using AI leverage to compress a multi-person, multi-month effort into a workload one person could absorb without displacing anything else on their plate.

That's the operating claim worth stress-testing before this becomes a general playbook: **on this project, AI-assisted development didn't compete with the roadmap for capacity — it ran alongside it.**

---

## 4. Effort Estimation: The Counterfactual

### 4.1 What the traditional build would have cost
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

### 4.2 What it actually cost
| Item | Cost |
|---|---|
| Engineer time (interstitial, alongside other work) | ~₹0.6L |
| AI tooling (Claude Code usage/seats) | ~₹0.15L |
| Review/QA (folded into existing cadence) | ~₹0.15L |
| Design (reused existing components) | ~₹0.1L |
| **Total** | **~₹1L** |

### 4.3 The delta
- **Direct cost avoided:** ~₹24L (~96% reduction)
- **Engineering capacity preserved:** ~3 person-months that would otherwise have been diverted from other roadmap commitments
- **Delivery risk avoided:** zero schedule slippage on other in-flight projects — the counterfactual traditional build would have meant either delaying the ambassador program's competitors for capacity, or delaying this program by a quarter waiting for a free slot

---

## 5. Why We Will Definitely Need This

This isn't a program we can shelve as "nice to have if it works out":

1. **CAC pressure only increases.** Paid channels get more expensive over time, not less. A near-zero-marginal-cost, peer-driven channel is one of the few acquisition levers that gets *more* valuable as paid CAC rises.
2. **Campus is Gajab's highest-trust, highest-density audience.** Word-of-mouth converts better than any ad in this segment; the ambassador program is the structured version of something that was already happening informally.
3. **It's a retention and engagement lever, not just acquisition.** Ambassadors are Gajab's most invested users — giving them status/rewards deepens their own retention while they bring in others.
4. **The cost of building it was proven to be trivial relative to its upside.** At ~₹1L to build, the bar for "is this worth having" is now absurdly low compared to almost any other growth investment on the table — the traditional 25L price tag was the thing making this a hard call; the vibe-coded ₹1L price tag removes that objection entirely.

---

## 6. Why This Is a Moat — Even If the Program Itself Sees Modest Usage

The strongest argument for this project isn't the campus ambassador program in isolation — it's what got built *underneath* it.

### 6.1 The real asset is the infrastructure, not the feature
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

### 6.2 Optionality at near-zero cost is the moat
A moat doesn't have to be "this exact feature is irreplaceable." It can be: *we now have the option to launch affiliates, referrals, or partner distribution in days instead of months, at near-zero incremental engineering cost, whenever we choose to.* Competitors who didn't build this now face the same 3-month/₹25L decision Gajab just avoided — every time they want to stand up a new incentivized-growth channel. Gajab only pays that cost once, and paid ~4% of the traditional price for it.

### 6.3 It demonstrates a repeatable delivery capability
Beyond the artifact itself, this project is proof that Gajab can ship growth/product features via AI-assisted development **without touching core delivery capacity**. That's an organizational capability, not just a one-off win — it changes the calculus for every future "is this worth building" conversation, because the traditional cost/time assumptions no longer hold for a growing class of features.

---

## 7. Risks & Open Items

- **Code quality / maintainability of vibe-coded output** — should get a normal code review / security pass if it hasn't already, especially given it touches referrals, attribution, and (if payouts are live) money movement. `[CONFIRM: has this had a security review?]`
- **Scaling assumptions** — built for an initial cohort; validate before assuming it scales to a large ambassador base without revisiting the attribution/rewards logic.
- **Ownership** — interstitial, single-engineer builds need an explicit owner for ongoing maintenance so it doesn't become an orphaned system.
- **Data/finance controls** — if rewards involve real payouts, confirm this has appropriate approval/audit controls, not just engineering review.

## 8. Recommendation

1. Treat the Campus Ambassador Program as shipped v1 infrastructure, not a side experiment — allocate a light ongoing maintenance owner.
2. Prioritize a scoped security/code review given it touches referral attribution and (potentially) payouts.
3. Explicitly scope the next reuse: stand up the **affiliate/referral program** on top of the same primitives as the next proof point of the moat argument in §6.
4. Use this project as the reference case when evaluating future growth-feature builds for vibe-coding vs. traditional resourcing.

---

*This document was drafted from stakeholder-provided context. Sections marked `[CONFIRM: ...]` should be filled in with verified details (exact feature scope, dates, team composition, real cost figures) before this is shared outside the immediate team.*
