# COD charges on Amazon, Meesho, Flipkart — and where GoKwik actually fits

**Scope note:** this is a standalone research memo, unrelated to the Relay
product docs (`01`–`06`). It lives here because this repo is being used as
a general research log, not because it's part of the Relay narrative.

**Caveat on data access:** this session runs in an isolated cloud
container with no browser session of yours attached — I can't log into
your Amazon Seller Central, Meesho Supplier Panel, or Flipkart Seller Hub
to pull your actual negotiated rates. None of the three marketplaces
publish a full public COD rate card; real per-order fees depend on your
category, seller tier, weight slab, pincode zone, and courier assigned to
that specific order. Treat every number below as directional (from
seller-education blogs, calculators, and vendor pages), and verify against
your own Seller Central / Supplier Panel / Seller Hub fee reports before
using them in a P&L. If you want exact figures, the fastest path is
pulling a recent settlement/invoice CSV from each panel and dropping it
in here — that's real data I can reconcile against these public numbers.

---

## 1. The core distinction that matters most

**Amazon, Meesho, and Flipkart charge sellers a COD-handling premium as
part of marketplace logistics fees.** It's baked into the order-level fee
stack alongside referral/commission, fixed/closing fee, and shipping.

**GoKwik is not a marketplace fee-reduction tool.** It doesn't touch
Amazon/Meesho/Flipkart's fee stack at all — it can't, because those
marketplaces own the checkout, not the seller. GoKwik plugs into a brand's
**own D2C website checkout** (Shopify, WooCommerce, Magento, ANS
Commerce/Kartify, custom stacks) and attacks COD's *real* cost driver on
that channel: RTO (return-to-origin) losses from fake/risky/low-intent COD
orders, plus low prepaid adoption.

So: if the COD problem you're solving is "Amazon/Meesho/Flipkart take a
cut on COD orders," GoKwik does nothing for that — it's marketplace
policy, not something a third-party checkout tool can override. If the
problem is "COD orders on our own website have high RTO / low prepaid
conversion," GoKwik (or a competitor like Shiprocket Checkout, ClickPost,
EasyRTO, etc.) is squarely the right category. Worth confirming which
problem you're actually trying to solve before evaluating GoKwik further.

---

## 2. Amazon India — COD fee structure

- COD is available via **Easy Ship** and **Amazon-fulfilled (FBA)** orders;
  Amazon settles COD cash to the seller only after the courier remits it
  back to Amazon, which adds latency vs. prepaid settlement.
- Sellers pay a **COD handling fee** on top of the base shipping fee —
  structured as a flat fee per shipment *or* a percentage of order value
  (whichever the applicable slab dictates), plus 18% GST on top.
- Reported real invoice line items (Jan/Feb 2026) show flat COD fees in
  the **₹7–₹14 per order** range for smaller shipments — but this scales
  with weight/zone like any courier fee, so it's not a fixed number across
  order sizes.
- Net effect Amazon itself advertises: COD orders carry meaningfully
  higher RTO than prepaid, because a COD buyer has made zero financial
  commitment and can refuse at the door for any reason — this compounds
  the direct fee cost with a return/reverse-logistics cost.
- Exact current slabs live behind Seller Central → **Fees & Pricing** —
  not fully public.

## 3. Meesho — COD fee structure

- Meesho's headline differentiator is **0% commission across categories**
  — unlike Amazon/Flipkart, it doesn't take a referral/commission cut.
- Seller cost is concentrated in: a **logistics/shipping fee** (~₹27–₹120,
  weight- and zone-dependent — lightweight ≤500g often ₹35–45, 1kg+
  packages ₹60–100+), a **fixed platform fee** (~₹25–30/order), GST, and a
  **payment processing fee** (~1.5–2% of order value) that effectively is
  Meesho's COD-adjacent charge since COD dominates its base.
- **Reverse logistics (RTO) charges** apply if the buyer refuses/returns —
  and these are often *higher* than the forward shipping fee, since Meesho
  is very COD-heavy and RTO rates on the platform run high.
- Meesho does **not publish a public rate card**; actual per-order charges
  in the Supplier Panel depend on pincode, assigned courier, and dynamic
  pricing — meaning two sellers shipping the same SKU can see different
  fees.
- Net despite no commission, sellers commonly report 15–35% better net
  margins than Amazon/Flipkart on comparable SKUs — but that's *before*
  RTO losses on COD are baked in, which is the platform's real profit
  killer for sellers, not the sticker fee.

## 4. Flipkart — COD fee structure

- Flipkart charges four stacked fees per order: **referral/commission**
  (category %), **fixed/closing fee** (flat, price-slab + tier dependent),
  **shipping fee** (weight/zone based; sub-500g local/zonal often free),
  and a **collection fee** — this last one is the direct COD charge.
- **Collection fee, prepaid:** ~2% of sale amount (some sources: 1.8–2%).
- **Collection fee, COD:** flat **₹15** for order value < ₹750, or **2%**
  of sale amount for orders ≥ ₹750 — with a broader range cited elsewhere
  of **2–3%** for COD vs. prepaid, i.e. a genuine COD premium.
- Important detail: the collection fee is charged on the **full order
  value including the shipping charge the customer paid**, not just the
  product price — so it's a slightly larger base than sellers sometimes
  assume.
- 18% GST stacks on top of all four fees.
- Flipkart has been revising rate policy through 2026 (see "New Rate
  Policy" seller communications) — check current Seller Hub fee sheet
  before quoting these to anyone downstream.

## 5. Side-by-side (directional, verify against your panels)

| | Amazon India | Meesho | Flipkart |
|---|---|---|---|
| Commission/referral | Category % | **0%** | Category % |
| Fixed/closing fee | Yes, slab-based | ~₹25–30 flat | Yes, slab + tier |
| Shipping fee | Weight/zone based | ~₹27–120 weight/zone | Weight/zone, <500g local often free |
| **COD-specific charge** | Flat or % (courier-set), e.g. ~₹7–14 seen on small orders | Folded into payment processing (~1.5–2%) + RTO reverse-logistics | ₹15 flat (<₹750) or 2% (≥₹750); ~2–3% vs ~2% prepaid |
| Public rate card? | Partial (Seller Central) | No | Partial (Seller Hub) |
| Where the real COD cost hides | RTO / reverse shipping | RTO / reverse shipping (often > forward fee) | Collection fee premium + RTO |

The pattern across all three: the *line-item* COD fee is usually small.
The *real* COD cost is RTO — reverse logistics, restocking, and the
working-capital drag of goods in transit both ways. That's the number
worth instrumenting per platform, not just the stated collection fee.

## 6. GoKwik — what it actually does, how it works, pricing

**Category:** checkout + RTO-intelligence layer for D2C brand-owned
storefronts (Shopify, WooCommerce, Magento, ANS Commerce/Kartify, custom).
Founded 2020.

**Mechanism:**
- Scores every COD order at checkout using 200+ signals plus a shared
  cross-brand fraud/risk network (GoKwik claims 180M+ shoppers profiled).
- Interventions available per risk tier: **COD blocking** for high-risk
  users, **COD convenience fee** (extra charge to discourage low-intent
  COD), **OTP/captcha verification** before confirming a COD order,
  **partial COD** (part prepaid, part on delivery), address-quality
  checks, cart-value/pincode-based COD limits, and repeat-offender
  blocking.
- Also runs **one-click checkout** (Kwik Checkout) and dynamic
  prepaid-discount nudges to shift order mix toward prepaid.

**Reported results (vendor case studies — treat as best-case, ask for
your-category benchmarks before trusting the headline number):**
- Up to ~40% RTO reduction cited generally.
- One brand: RTO 22.44% → 9.93% in 4 months, prepaid share +30%.
- Pepe Jeans: 40% RTO reduction, +20% prepaid share of wallet.
- Another merchant: RTO 15% → 9%, conversions +2%, orders +50%.
- Another: overall conversion +120%, prepaid conversion 1.3x.
- Separately cited platform-wide figure: ~18% average COD-RTO reduction
  and ₹130 crore saved across brands via GoKwik interventions — a more
  conservative, likely more representative number than the individual
  case studies above.

**Pricing:** not fully public. Data points found:
- Kwik Checkout app itself: free to install, free trial, "pricing on
  request" beyond that.
- One aggregator listed a low base SaaS fee (~₹1,036/month, ~₹12,432/yr)
  for a base plan — almost certainly not the real commercial model for a
  brand doing meaningful COD volume.
- A comparison source cites **2.5% flat on prepaid transactions processed
  through GoKwik**, with the **first 1,000 COD orders/month free**, and
  T+1 settlement (vs. Shiprocket's T+3). This looks like the closer-to-real
  commercial shape (payment-processing-style take rate + volume-based COD
  tier), but get it in writing from GoKwik directly — this is a
  volume/negotiated-contract business, not a published price list.

**Distribution note:** GoKwik has a distribution partnership with
Flipkart-owned **ANS Commerce (Kartify)** to bring its RTO-enabled
one-click checkout to Kartify-hosted D2C storefronts. That's still a D2C
storefront play riding on Flipkart's ownership of ANS Commerce — it is
**not** GoKwik operating inside the Flipkart marketplace itself.

**Competitors in the same category:** Shiprocket Checkout (claims up to
45% RTO reduction, COD fee ~1–2% depending on plan, T+3 settlement),
ClickPost (AI-driven NDR/reattempt agent, claims up to 54% RTO resolution,
positions as an overlay on top of your existing negotiated courier rates
rather than a checkout replacement).

## 7. Bottom line / what I'd actually do next

1. **If the goal is lowering Amazon/Meesho/Flipkart seller fees**, GoKwik
   is the wrong tool — that's a marketplace policy lever (seller tier,
   category negotiation, shifting mix toward prepaid-eligible listings,
   or Amazon/Flipkart's own opt-in "COD convenience fee to buyer" features
   where available), not something a third-party checkout can touch.
2. **If the goal is your own D2C site's COD economics**, GoKwik's category
   fit is right, but the 2.5%-of-prepaid + free-COD-tier figure and the
   RTO-reduction case studies both need direct confirmation from GoKwik's
   sales team against your actual GMV and category (fashion/beauty is
   their strongest proof-point vertical; results elsewhere may differ).
   Get a pilot/POC with your own data before signing an annual commitment.
3. **Either way, RTO — not the line-item COD fee — is the number to
   instrument.** Pull actual RTO % and reverse-logistics cost per platform
   (Amazon Easy Ship vs Meesho vs Flipkart vs your own D2C site) before
   deciding where to spend integration effort; the platform with the
   worst RTO, not the highest sticker COD fee, is usually where the money
   is actually leaking.

---

## Sources

- [Amazon Shipping India — COD vs Prepaid Shipping Cost Guide](https://shipping.amazon.in/blog/cod-vs-prepaid-shipping-cost-guide-india)
- [Amazon Seller Blog — How Cash on Delivery works](https://sell.amazon.in/seller-blog/how-cash-on-delivery-works)
- [Amazon Seller Fees India 2026 — SW Cybernetics](https://swcybernetics.in/knowledge-base/amazon-seller-fees-india-complete-breakdown)
- [Shiprocket — Meesho Shipping Charges: Slabs, RTO & Seller Profit](https://www.shiprocket.in/blog/meesho-shipping-charges/)
- [gonukkad — Meesho Commission & Seller Fees Explained](https://www.gonukkad.com/blog/meesho-commission-seller-fees)
- [SW Cybernetics — Meesho Commission Rates & Seller Fees 2026](https://swcybernetics.in/knowledge-base/meesho-commission-rates-seller-fees-2026)
- [WareIQ — Flipkart's New Rate Policy: Key Tips for Sellers](https://wareiq.com/resources/blogs/flipkarts-new-rate-policy/)
- [myHQ — Flipkart Seller Fees: Complete Guide 2026](https://myhq.in/blog/virtual-office/flipkart-seller-fees)
- [Cointab — Reconciliation of Flipkart Collection Fee](https://www.cointab.net/in/reconciliation-of-flipkart-collection-fee/)
- [GoKwik — COD by GoKwik: Expand Cash on Delivery & Reduce RTO](https://www.gokwik.co/blog/start-cod-by-gokwik)
- [GoKwik — RTO-based Payment Stack](https://www.gokwik.co/blog/gokwik-rto-based-payment-stack)
- [GoKwik — Smart COD Suite / Kwik Checkout product page](https://www.gokwik.co/product/smart-cod-suite)
- [GoKwik — Backed by Data, Driven by AI: Manage RTO](https://www.gokwik.co/blog/backed-by-data-driven-by-ai-manage-return-to-origin)
- [thebusinessrule — GoKwik vs Shiprocket: Which is Better in 2026?](https://thebusinessrule.com/gokwik-vs-shiprocket-which-is-better/)
- [Mediabrief — GoKwik joins forces with Flipkart's ANS Commerce](https://mediabrief.com/gokwik-x-flipkart-owned-ans-commerce/)
- [Techjockey — GoKwik Pricing & Reviews 2026](https://www.techjockey.com/detail/gokwik)
- [Unicommerce — India D2C Report 2026: Operations, RTO & Growth Data](https://unicommerce.com/india-d2c-report-2026-april/)
- [TrackVid — RTO in Ecommerce: Why Indian Sellers Lose ₹8,000 Crore a Year](https://trackvid.in/blogs/rto-in-ecommerce-india.html)
