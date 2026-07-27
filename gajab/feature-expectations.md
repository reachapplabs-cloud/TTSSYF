# Gajab — Feature Expectations Brief

**From:** Zo
**To:** Vanitha (Gajab Dev)
**Date:** 2026-07-27
**Purpose:** High-level expectations for two active items, for the dev team to
elaborate into a frozen technical scope. This is intentionally written at the
"what we need and why" level — implementation detail (data model, API shape,
infra) is for the dev team to define.

---

## 1. Push Notifications — Admin → Buyer

**Priority:** High. Needed to unblock scope-freeze and developer assignment.

### Goal
Let admin send a **custom notification to a selected user base** of buyers —
not a blast to everyone, not an automated trigger. A human on the admin side
picks who hears about what, and sends it.

### Who triggers it
- Manual only for v1. Admin composes and sends/schedules from the admin
  panel. No automated/event-based triggers (e.g. abandoned cart, back-in-stock,
  price drop) in this phase — that's a logical v2 and should be called out as
  out-of-scope now so it doesn't creep into the estimate.

### Audience targeting ("selected user base")
This is the part that decides the mechanism, so it needs to be pinned down
first. Proposed v1 segment options — confirm/trim before Vanitha scopes:
- All buyers
- Buyers in a location/city/region
- Buyers who've purchased from a given seller/category before
- Buyers with items in cart/wishlist but no recent purchase
- New signups in the last N days
- Inactive buyers (no activity in last N days)

Ship with a **usable subset** of these (e.g. location + category/seller +
all-buyers) rather than blocking v1 on every segment being possible.

### Message content
- Title + body (text)
- Optional image
- Optional deep link — to a product, category, seller, or a specific
  in-app screen
- Send now, or schedule for a future time

### Guardrails (expect Vanitha to push back/refine these)
- Rate limit: cap on notifications a single buyer receives per day, to avoid
  spam complaints
- Respect any existing opt-out/notification-preference setting
- No silent-hours override (don't send outside a reasonable local time window)

### Admin-side deliverable
- Compose screen: message, image, audience selector, deep link, schedule
- Send history/log: what was sent, to how many, when
- Basic delivery stats: sent count, open rate, click-through (nice-to-have
  for v1, can slip to v1.1 if it threatens the scope-freeze deadline)

### Explicitly out of scope for v1
- Automated/triggered notifications (cart, stock, price)
- Web push (mobile app push only, unless Vanitha flags this as trivial given
  existing infra)
- A/B testing of notification content

### Open questions for Vanitha to close out when drafting the frozen scope
1. Which of the audience segments above are realistic for v1 given current
   user data we actually capture?
2. Push infra already in place (FCM/APNs or similar) — confirm nothing new
   needs provisioning.
3. Any existing notification-preference/opt-out setting to respect, or does
   that need to be built too?
4. Estimate + earliest slot for developer assignment, given the widget/
   performance work below is also competing for the same dev time.

---

## 2. Widget Bulk Import — Home Screen Performance & Scale

**Priority:** High — blocking Monday's planned deploy; needed for Kavish.

### Context
- Original scope assumed 20–25 products per widget.
- Seller team is now planning 100+ products per widget.
- Bulk import itself is built and ready.
- Gap: **rendering that volume back on the home screen** — both Website and
  mobile app — hasn't been performance-checked or optimized for it.

### What's needed
- Performance test the home screen with widgets carrying 100+ products each,
  on both Website and mobile.
- Optimize rendering so it doesn't degrade home-screen load time — likely
  candidates for Vanitha's team to evaluate: pagination/"load more",
  infinite scroll, or virtualized/windowed rendering of the widget's product
  list; image lazy-loading; response caching.
- Confirm this covers the realistic case of **multiple** large widgets
  stacked on one home screen, not just one widget in isolation.

### Expectation on the Monday deploy
- Confirm explicitly whether this performance/optimization work is:
  (a) part of Monday's deploy (i.e. Monday slips), or
  (b) shipped Monday for the 20–25 case as originally scoped, with the
  100+ optimization following as a fast-follow.
- Whichever it is, say so directly — Kavish needs a real date, not an
  implied one.

### Open questions for Vanitha
1. What's the realistic upper bound to design for — is "100+" actually
   ~100-150, or could sellers push further (500+)? Designing for the wrong
   ceiling wastes effort either direction.
2. Does the performance issue affect only the home screen, or do
   category/search listings pull from the same widget data and need the
   same fix?
3. Any early read on whether this is a home-screen rendering fix only, or
   whether the bulk-import → home-screen data pipeline itself needs
   changes to support the volume?

---

## How to use this doc
Both sections are written as **expectations to elaborate from**, not final
specs. Vanitha: please turn each into a scoped requirements doc (or flag
back here if something above is unrealistic) so we can freeze and assign.
