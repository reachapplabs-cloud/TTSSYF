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
Two trigger types, both in scope, both landing as a push to the buyer:

- **Manual** — a human on the admin side composes and sends to a chosen
  buyer segment, ad hoc.
- **Automated** — the system fires a notification on a defined event
  (order state change, cart sitting idle, stock/price change, etc.),
  no human in the loop per send.

They share the same delivery pipeline (title/body/image/deep link) and the
same guardrails. What differs is who/what starts the send, and that's the
main thing this section needs to pin down before Vanitha scopes it.

### Trigger Type A — Manual (Admin-initiated)

Admin composes and sends/schedules from the admin panel to a chosen segment.

**Use cases:**
| # | Trigger | Audience | Example copy |
|---|---|---|---|
| 1 | Business decides to run a sale | All buyers, or region-specific | "Independence Day Sale — flat 30% off, today only." |
| 2 | New seller/category goes live | Buyers with browse/purchase history in that category | "New arrivals from [Seller] just landed." |
| 3 | City/region launch or local promo | Buyers in that city/region | "Gajab is now live in Chennai — 10% off your first order." |
| 4 | Seller needs to clear inventory | Buyers who viewed/wishlisted that category | "Clearance on [Category] — up to 50% off, limited stock." |
| 5 | Platform feature/policy update | All buyers | "New: track your order in real time." |

**Audience targeting ("selected user base")** — proposed v1 segments,
confirm/trim before scoping:
- All buyers
- Buyers in a location/city/region
- Buyers who've purchased from a given seller/category before
- Buyers with items in cart/wishlist but no recent purchase
- New signups in the last N days
- Inactive buyers (no activity in last N days)

Ship with a **usable subset** of these (e.g. location + category/seller +
all-buyers) rather than blocking v1 on every segment being possible.

### Trigger Type B — Automated (Event-triggered)

System-fired on a defined event, no manual send required.

**Use cases:**
| # | Trigger event | Audience | Example copy |
|---|---|---|---|
| 1 | Item(s) left in cart, no checkout after X hours | That buyer | "Still thinking it over? Your cart's waiting — [item]." |
| 2 | Item was wishlisted, then moved to cart, but never purchased after X hours | That buyer | "Your wishlist pick is in your cart — grab it before it's gone." |
| 3 | Wishlisted/out-of-stock item becomes available | Buyers who wishlisted it | "[Item] is back in stock." |
| 4 | Price drop on a wishlist/cart item | That buyer | "Price drop! [Item] is now ₹X." |
| 5 | Order state changes (placed / shipped / out for delivery / delivered / cancelled / refund initiated) | Buyer on that order | "Your order #1234 has shipped." |
| 6 | Payment fails at checkout | That buyer | "Payment didn't go through — complete your order." |
| 7 | Product viewed repeatedly, no cart action in X hours | That buyer | "Still interested in [item]?" |
| 8 | Stock crosses a low threshold on a wishlisted/cart item | That buyer | "Only 2 left — [item]." |
| 9 | N days after delivery | That buyer | "How was your [item]? Leave a review." |
| 10 | No app activity in N days | Inactive segment | "We miss you — here's what's new." |

That's ten candidate triggers — too many to build at once. **Suggested v1
priority:** order status updates (#5), abandoned cart (#1), wishlist-to-cart
follow-through (#2), and back-in-stock (#3) — these are the highest-value
and likely the least new plumbing, since order state is already core to the
app and wishlist/cart state is closely related to abandoned-cart tracking.
The rest (#4, #6–10) are reasonable fast-follows once the trigger pipeline
exists.

### Shared mechanics (both types)
- Same delivery pipeline: title/body/image/deep link, mobile push.
- Automated triggers need an **event pipeline** wired to real system events
  (order state, cart state, wishlist state, stock level). This is the actual
  cost driver — see open questions below.
- Admin needs **one unified history/log** covering manual sends and
  automated fires together, plus a per-trigger on/off toggle for automated
  ones (e.g. disable "abandoned cart" without touching "order status").
- Per-trigger message templates need variables (e.g. `{item_name}`,
  `{order_id}`) rather than hardcoded copy.

### Message content
- Title + body (text)
- Optional image
- Optional deep link — to a product, category, seller, or a specific
  in-app screen
- Manual: send now or schedule for later. Automated: fires on the event,
  with a configurable delay (e.g. cart abandonment "X hours").

### Guardrails (expect Vanitha to push back/refine these)
- **Combined** daily send cap per buyer across manual + automated together
  — a buyer shouldn't get an abandoned-cart ping and a browse-abandonment
  ping the same day.
- Dedup/priority rules when multiple automated triggers fire close together
  for the same buyer (e.g. order-status wins over browse-abandonment).
- Respect any existing opt-out/notification-preference setting.
- No sends outside a reasonable local time window.

### Admin-side deliverable
- Manual compose screen: message, image, audience selector, deep link, schedule.
- Automated trigger config screen: per-trigger on/off, message template with
  variables, per-trigger condition tuning (e.g. the "X hours" cart threshold).
- Unified send history/log for both types.
- Basic delivery stats: sent count, open rate, click-through (nice-to-have
  for v1, can slip to v1.1 if it threatens the scope-freeze deadline).

### Explicitly out of scope for v1
- Web push (mobile app push only, unless Vanitha flags this as trivial given
  existing infra).
- A/B testing of notification content.
- AI/ML-driven send-time optimization or personalized copy.

### Open questions for Vanitha to close out when drafting the frozen scope
1. Which automated triggers already have real system events to hook into
   today (order status almost certainly does) vs. need new instrumentation
   (cart idle-time, wishlist stock/price watch, browse-repeat tracking)?
2. Given #1, does the suggested v1 priority (order status, abandoned cart,
   back-in-stock) still hold, or does the data say a different set is cheaper?
3. Which of the manual-segment options are realistic for v1 given current
   user data we actually capture?
4. Push infra already in place (FCM/APNs or similar) — confirm nothing new
   needs provisioning.
5. Any existing notification-preference/opt-out setting to respect, or does
   that need to be built too?
6. Estimate + earliest slot for developer assignment, given the widget/
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
