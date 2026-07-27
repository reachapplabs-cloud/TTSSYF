# Gajab — Push Notifications: Tech Scope

**From:** Zo
**To:** Gajab Dev (Vanitha)
**Date:** 2026-07-27

Ready-to-build scope, split into phases. Phase 1 is this sprint's assignment.

---

## Phase 1 — This Sprint

### Manual (Admin → Buyer)
- Compose screen: title, body, optional image, optional deep link
  (product / category / seller / in-app screen).
- Send now, or schedule for later.
- Audience segments: all buyers · location/city/region · buyers with
  purchase history in a seller/category · buyers with items in cart/
  wishlist but no recent purchase · new signups (last N days) · inactive
  buyers (no activity in last N days).
- Send history/log: what was sent, to which segment, when.
- Guardrails: daily send cap per buyer, respect opt-out/notification
  preference, no sends outside a reasonable local time window.

### Automated (core 4 triggers)
- **Order status change** — placed / shipped / out for delivery /
  delivered / cancelled / refund initiated → buyer on that order.
- **Abandoned cart** — item(s) left in cart, no checkout after X hours →
  that buyer.
- **Wishlist-to-cart follow-through** — item wishlisted, moved to cart,
  never purchased after X hours → that buyer.
- **Back-in-stock** — wishlisted/out-of-stock item becomes available →
  buyers who wishlisted it.
- Admin trigger config screen: per-trigger on/off, message template with
  variables (`{item_name}`, `{order_id}`), per-trigger condition tuning
  (e.g. the "X hours" threshold).
- One unified send history/log covering manual sends and automated fires
  together.
- Guardrails: combined daily send cap across manual + automated for the
  same buyer; dedup/priority when triggers overlap (order-status wins over
  cart nudges).

---

## Phase 2 — Fast Follow

- **Price drop** on a wishlist/cart item → that buyer.
- **Payment failed** at checkout → that buyer (retry nudge).
- **Low-stock urgency** — stock crosses a low threshold on a
  wishlisted/cart item → that buyer.
- Delivery analytics: sent / opened / click-through stats on the
  notification log.

---

## Phase 3 — Backlog

- **Browse abandonment** — product viewed repeatedly, no cart action in X
  hours → that buyer.
- **Post-delivery review reminder** — N days after delivery → that buyer.
- **Inactive-buyer re-engagement** — no app activity in N days → inactive
  segment.
- Web push (mobile app push covers Phase 1–2; web is additive).
- A/B testing of notification content.
- AI/ML-driven send-time optimization or personalized copy.

---

## Summary Table

| Phase | Scope |
|---|---|
| **1 — This sprint** | Manual compose + 4 core automated triggers (order status, abandoned cart, wishlist-to-cart, back-in-stock) |
| **2 — Fast follow** | Price drop, payment failed, low-stock urgency; delivery analytics |
| **3 — Backlog** | Browse abandonment, review reminder, re-engagement, web push, A/B testing, send-time AI |
