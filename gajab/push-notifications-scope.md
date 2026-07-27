# Gajab — Push Notifications: Tech Scope

**From:** Zo
**To:** Gajab Dev (Vanitha)
**Date:** 2026-07-27

Ready-to-build scope, split into phases. Phase 1 is this sprint's assignment.
Every item below is spelled out in full — no shorthand, so there's nothing
left to interpret.

---

## Phase 1 — This Sprint

### A. Manual notifications (admin composes and sends by hand)

This is the simple case: a person on the admin side writes a message and
sends it to a group of buyers they pick. Nothing automatic here.

**What the admin needs to be able to enter when composing a message:**
- A title (short headline, shows as the bold line of the push notification).
- A body (the longer message text underneath the title).
- Optionally, an image to attach to the notification.
- Optionally, a deep link — meaning when the buyer taps the notification,
  it opens directly to a specific product page, a category page, a seller's
  page, or some other specific screen in the app, instead of just opening
  the app's home screen.
- A choice of "send immediately" or "schedule for a specific future date
  and time."

**Who the message goes to (the admin picks one of these groups):**
- Every buyer on the platform.
- Buyers located in a specific city or region.
- Buyers who have previously bought from a specific seller, or bought
  something in a specific category before (e.g. "everyone who's bought
  electronics").
- Buyers who currently have something sitting in their cart or wishlist
  but haven't completed a purchase recently.
- Buyers who signed up within the last however-many days (a "new users"
  group).
- Buyers who haven't opened the app or done anything on it in however-many
  days (an "inactive users" group).

**A record of what was sent:** every manual message that goes out gets
logged somewhere the admin can look back at later — what the message said,
which group it went to, and when it was sent.

**Limits on manual sending (so buyers don't get spammed):** there's a cap
on how many notifications one buyer can receive in a single day, the system
respects it if a buyer has turned off notifications, and messages aren't
sent late at night / early morning in the buyer's local time.

### B. Automated notifications (the system sends these on its own, no admin action needed)

These are messages that go out automatically the moment something specific
happens in the app — the admin doesn't write or click send for each one;
they just turn the feature on and the system handles it from then on for
every buyer it applies to.

**The four automated notifications to build first, explained one at a time:**

1. **Order status change.** Every time an order moves from one stage to the
   next — it gets placed, it ships, it's out for delivery, it's delivered,
   it gets cancelled, or a refund is issued — the buyer who placed that
   specific order automatically gets a notification telling them so. For
   example: the moment an order is marked "shipped" in the system, that
   buyer gets "Your order has shipped" without anyone having to send it
   manually.

2. **Abandoned cart.** If a buyer adds something to their cart and then
   doesn't complete the checkout within a set number of hours (this number
   is something we choose — e.g. 6 hours, or 24 hours), the system
   automatically sends that one buyer a reminder about the item still
   sitting in their cart.

3. **Wishlist-to-cart follow-through.** This is a more specific version of
   the above: if a buyer had something in their wishlist, then moved it
   into their cart, but still didn't buy it after a set number of hours,
   they get a reminder specifically calling that out (since it's a stronger
   signal of intent than a random cart item).

4. **Back-in-stock.** If a product was out of stock and a buyer had
   wishlisted it, the moment that product becomes available again in
   inventory, every buyer who wishlisted it automatically gets notified
   that it's back.

**The admin screen needed to control these four (this is the part that
needs spelling out):**

Think of this as one settings page in the admin panel, with each of the
four triggers above listed as its own row. For each row/trigger, the admin
needs to be able to do three separate things:

- **Turn it on or off.** A simple switch per trigger. For example, the
  admin could switch off "abandoned cart" reminders during a big sale
  event (so people aren't nagged about carts they're about to buy from
  anyway) while leaving "order status" notifications running as normal.
  Each trigger is switched independently — turning one off doesn't affect
  the others.

- **Edit the wording of the message, without needing a developer.**
  Right now if we hardcode the text "Your order has shipped" into the app's
  code, changing that wording later means asking a developer to change code
  and redeploy. Instead, the admin panel should let someone type the
  message text directly, with placeholders in it that the system fills in
  automatically for each buyer. For example, the admin could write the
  template `Your order {order_id} has shipped` and the system replaces
  `{order_id}` with the buyer's actual order number (like "Your order
  #48213 has shipped") when it actually sends it. Same idea for
  back-in-stock: the admin writes `{item_name} is back in stock` as the
  template, and the system fills in the real product name for each buyer
  who gets it.

- **Adjust the timing/condition that decides when it fires.** For the
  abandoned-cart and wishlist-to-cart triggers specifically, "how many
  hours of inactivity counts as abandoned" shouldn't be a fixed number
  buried in code — the admin should be able to change it from a settings
  field (e.g. change it from 6 hours to 12 hours) if we learn the timing
  isn't working well, again without needing a developer to make a code
  change.

**One combined record of everything sent, manual and automated together:**

Right now the manual messages have their own log (described above). The
automated ones need to show up in that *same* log, not a separate one. So
if someone looks at the notification history, they see one single
chronological list that includes both: "Sale announcement — sent to all
Chennai buyers — by admin — 2pm" sitting right alongside "Order #48213
shipped — sent to buyer X — automated — 2:15pm." The reason this matters:
if we kept two separate logs, checking "what has this specific buyer
received recently" or "did we send too much yesterday" would mean checking
two different places every time. One combined log means one place to look.

**Limits so a buyer doesn't get too many messages, explained with an
example:**

- **The daily cap is shared between manual and automated, not counted
  separately.** Say we decide a buyer should get at most 3 notifications
  in one day. If a buyer already received 2 automated ones today (their
  order shipped, and something they wishlisted came back in stock), and
  then an admin sends out a manual sale announcement to everyone, that
  buyer is already at 2 of their 3 allowed for the day — the manual send
  counts against the same limit, it isn't a separate "manual bucket." If
  they were already at their cap of 3, the system needs to either skip
  that buyer for the new message or hold it until the next day (this
  behavior is a decision to make when building it, but the key point is
  the cap counts both kinds of message together, not one cap for manual and
  a separate cap for automated).

- **When two automated triggers would fire for the same buyer around the
  same time, one needs to "win" over the other.** Example: a buyer
  abandons a cart (triggering the abandoned-cart reminder) on the same day
  one of their orders gets marked as delivered (triggering the order-status
  notification). If sending both would push the buyer over their daily
  cap, or if we simply don't want to send two things back-to-back, the
  order-status notification should be the one that actually goes out and
  the cart-reminder should be the one that gets skipped or delayed — because
  order status is about something the buyer already paid for and is
  waiting on, while a cart reminder is closer to a marketing nudge. So the
  priority order, highest to lowest, is: order status first, then the
  cart-related nudges (abandoned cart, wishlist-to-cart) after.

---

## Phase 2 — Fast Follow

Three more automated triggers, same pattern as the four above (each is its
own on/off toggle, editable message template, and a place in the same
unified log and shared daily cap):

- **Price drop.** If the price of something in a buyer's cart or wishlist
  goes down, that buyer gets notified of the new lower price.
- **Payment failed.** If a buyer's payment doesn't go through at checkout,
  they get a nudge to try again and complete the order.
- **Low-stock urgency.** If something in a buyer's cart or wishlist drops
  to a low quantity left in inventory (e.g. "only 2 left"), that buyer gets
  notified to create urgency before it sells out.

**Delivery analytics:** on top of the send log, start tracking whether each
notification was actually opened by the buyer, and whether tapping it led
to a click-through (e.g. did they open the product page it linked to).
This turns the log from just "what did we send" into "did it actually
work" — how many people opened it, how many acted on it.

---

## Phase 3 — Backlog

- **Browse abandonment.** If a buyer looks at the same product more than
  once but never adds it to their cart, after a set number of hours they
  get a "still interested?" nudge about it.
- **Post-delivery review reminder.** A set number of days after an order is
  marked delivered, the buyer gets asked to leave a review for what they
  bought.
- **Inactive-buyer re-engagement.** If a buyer hasn't opened the app or done
  anything on it in a set number of days, they get a "here's what's new"
  message to try to bring them back.
- **Web push.** Everything above is mobile-app push only for now; sending
  the same notifications to a buyer's browser (web push) is additive work
  for later, not required for Phase 1–2.
- **A/B testing of notification content.** Being able to send two different
  versions of the same message to different buyers to see which performs
  better — not needed until there's enough volume for it to be worth
  measuring.
- **AI/ML-driven send-time optimization or personalized copy.** Automatically
  choosing the best time to send to each individual buyer, or writing
  personalized message copy per buyer, using a model rather than the fixed
  rules above — a later refinement once the basic system is working and we
  have data to learn from.

---

## Summary Table

| Phase | Scope |
|---|---|
| **1 — This sprint** | Manual compose + 4 core automated triggers (order status, abandoned cart, wishlist-to-cart, back-in-stock), with a shared control screen, one combined log, and one shared daily limit |
| **2 — Fast follow** | Price drop, payment failed, low-stock urgency triggers; open/click tracking on the log |
| **3 — Backlog** | Browse abandonment, review reminder, re-engagement, web push, A/B testing, send-time AI |
