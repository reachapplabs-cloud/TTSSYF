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
- Worth noting: 0% commission doesn't mean Meesho is giving up revenue —
  it monetizes instead through logistics margins (it marks up courier
  rates), ads, and financial services, so the "free commission" framing
  undersells what sellers actually pay in aggregate.

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

## 7. Razorpay Magic Checkout — the other name in this category

**Category:** same as GoKwik — a D2C checkout layer with COD intelligence,
except Razorpay is coming at it from its position as India's largest
payment gateway rather than as a checkout-first specialist. Ships as part
of a broader "D2C Suite" (7 products) Razorpay launched to bundle
payments, checkout, and post-payment tooling for direct-to-consumer
brands.

**Mechanism (same shape as GoKwik, different branding):**
- **COD Intelligence** analyzes shopper history and address quality to
  risk-score COD orders in real time.
- High-risk shoppers → COD blocked outright; medium-risk → nudged to
  prepay or charged a differential COD fee; users with a history of
  failed/refused deliveries → COD disabled for them specifically.
- Configurable **allowlist/blocklist** for COD by shopper/pincode/order
  attributes (Razorpay's official docs cover this directly under
  Magic Checkout → RTO Reduction).
- Also functions as a one-click checkout (auto-filled address/payment
  from Razorpay's own stored-shopper network — claimed 100M+ profiles,
  smaller than GoKwik's claimed 200M+).

**Reported results:**
- **Borosil:** RTO cut by 36.36%, prepaid order share up 70% — Razorpay's
  own published case study, comparable in shape to GoKwik's individual
  case studies (i.e., a best-case vendor number, not a platform average).
- No independent platform-wide average (like GoKwik's ~18%) was found in
  public sources — Razorpay's public results are single-brand case
  studies only, which makes them harder to generalize from.

**Pricing:** not published for Magic Checkout specifically. Razorpay's
standard payment-gateway pricing is ~2% per transaction; Magic Checkout
appears to ride on top of that same transaction-fee model rather than
having a separate published rate — but this needs direct confirmation,
same as GoKwik's number.

**GoKwik vs. Razorpay Magic Checkout, practically:**
- If you already process payments through Razorpay and want COD/RTO
  tooling as one more line item on an existing vendor relationship (fewer
  contracts, one dashboard), Razorpay is the lower-friction add-on.
- If checkout conversion and COD/RTO management specifically are the
  primary problem (not just a nice-to-have on top of payments), GoKwik is
  the more specialized tool, with a larger claimed shopper network for
  address auto-fill and a slightly more mature RTO feature set (partial
  COD, captcha-based COD verification) based on what's publicly
  documented.
- Neither company publishes a directly comparable RTO-reduction average
  — the case studies from both are vendor-selected, so a short pilot on
  your own traffic is the only way to actually compare them for your
  catalog/geography mix.

## 8. Bottom line / what I'd actually do next

1. **If the goal is lowering Amazon/Meesho/Flipkart seller fees**, GoKwik
   is the wrong tool — that's a marketplace policy lever (seller tier,
   category negotiation, shifting mix toward prepaid-eligible listings,
   or Amazon/Flipkart's own opt-in "COD convenience fee to buyer" features
   where available), not something a third-party checkout can touch.
2. **If the goal is your own D2C site's COD economics**, GoKwik's category
   fit is right, and Razorpay Magic Checkout is the direct alternative
   worth quoting side by side — especially if you already run payments
   through Razorpay. Get the 2.5%-of-prepaid + free-COD-tier figure (or
   Razorpay's equivalent) confirmed directly from sales against your
   actual GMV and category, and run a pilot/POC with your own traffic
   before signing an annual commitment on either.
3. **Either way, RTO — not the line-item COD fee — is the number to
   instrument.** Pull actual RTO % and reverse-logistics cost per platform
   (Amazon Easy Ship vs Meesho vs Flipkart vs your own D2C site) before
   deciding where to spend integration effort; the platform with the
   worst RTO, not the highest sticker COD fee, is usually where the money
   is actually leaking.

---

## 9. Video references

I installed `yt-dlp` (pulled fresh from its GitHub source, `pip install
git+https://github.com/yt-dlp/yt-dlp.git`) specifically to pull real
transcripts instead of relying on search-snippet titles. It's confirmed
working (`yt_dlp` v2026.07.04). But this session's outbound network
policy explicitly blocks `youtube.com` at the proxy level — every request
came back `gateway answered 403 to CONNECT ... policy denial`, logged
under `/__agentproxy/status`. Per this environment's own proxy docs, a
403 policy denial is something to report, not route around, so I didn't
try mirrors/alternate hosts to bypass it. Net effect: the tool is in
place, but this cloud container genuinely cannot reach YouTube to pull a
transcript. Titles/descriptions below are still search-metadata only,
not watched/read end-to-end.

**If you want real transcript text**, the fastest path is running this
on your own device (has YouTube access) and pasting the output back to
me:

```
pip install "git+https://github.com/yt-dlp/yt-dlp.git"
yt-dlp --skip-download --write-auto-sub --sub-lang en --sub-format vtt \
  -o "%(id)s.%(ext)s" "https://www.youtube.com/watch?v=aV8lZ21g6EM"
```

Swap in any of the video URLs below. VTT output is plain text with
timestamps — good enough to paste directly.

**Podcast-length sources (better signal than product-demo videos, still
not transcript-verified):**
- [Z47 (formerly Matrix Partners India) podcast — "Democratizing the e-shopping experience with GoKwik"](https://z47.com/podcast/democratizing-the-e-shopping-experience-with-gokwik) — GoKwik co-founder Chirag Taneja on the founding thesis and RTO/COD problem framing.
- [YourStory — Matrix Moments: How GoKwik is democratising online shopping for D2C brands](https://yourstory.com/2021/10/matrix-moments-ecommerce-startup-gokwik-online-d2c-brands)
- [YourStory — How Razorpay's Magic Checkout is unlocking growth for D2C businesses](https://yourstory.com/2022/02/razorpays-magic-checkout-unlocking-growth-d2c-businesses)

**Product-demo / setup videos:**

- ["Industry's First Partial COD — Reduces RTOs by over 55%" (GoKwik)](https://www.youtube.com/watch?v=aV8lZ21g6EM)
  — GoKwik's own explainer on its Partial COD feature.
- ["GoKwik's Checkout Solution | Helping eCommerce Brands Unlock Growth"](https://www.youtube.com/watch?v=H_FWyeexv3k)
- ["GoKwik Streamlines Checkout and Detects Fraud with AI on AWS" (AWS channel)](https://www.youtube.com/watch?v=ssO4kWYBs2g)
  — third-party (AWS) framing of the same product, likely more technical/architecture-focused than GoKwik's own marketing.
- ["How to Integrate GoKwik in Shopify (Easy 2025 Guide)"](https://www.youtube.com/watch?v=LlpFqg98erg) —
  practical setup walkthrough if you're evaluating implementation effort.
- ["Introducing Razorpay Magic Checkout | Improve Conversions for your business"](https://www.youtube.com/watch?v=TdZa73eheww)
- ["Watch how Magic Checkout Works | Razorpay Magic Checkout"](https://www.youtube.com/watch?v=JoWsLfety5s)
- ["Integrate Razorpay Magic Checkout with Shopify Website"](https://www.youtube.com/watch?v=Cr9IdCU5o8Q)
  — setup walkthrough, comparable use to the GoKwik Shopify guide above.

No independent (non-vendor) YouTube video comparing GoKwik vs. Razorpay
Magic Checkout head-to-head turned up in search — the written comparisons
in the Sources list below (thebusinessrule, arulmjoseph, binaryic) are the
closest thing to a neutral side-by-side currently available online, and
even those read as SEO/affiliate content rather than independent
benchmarking. I'd weight vendor demo videos as "how the UI looks," not as
evidence for RTO-reduction claims.

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
- [Razorpay — Magic Checkout to Boost Conversions and Reduce RTOs](https://razorpay.com/magic/)
- [Razorpay — Magic Checkout Case Study: Borosil Cuts RTO by 36.36%](https://razorpay.com/blog/magic-checkout-case-study-borosil/)
- [Razorpay Docs — Block or Allow COD Orders (Magic Checkout RTO Reduction)](https://razorpay.com/docs/payments/magic-checkout/rto-reduction/allowlist-blocklist/)
- [Razorpay Docs — Magic Checkout Features](https://razorpay.com/docs/payments/magic-checkout/features/)
- [Razorpay Newsroom — Razorpay Unveils D2C Suite, Launches 7 Products](https://razorpay.com/newsroom/razorpay-unveils-d2c-suite-launches-7-products-set-to-increase-revenue-for-businesses-by-50/)
- [arulmjoseph — Shiprocket Checkout vs Razorpay Magic Checkout vs GoKwik (2026)](https://arulmjoseph.com/shiprocket-checkout-vs-razorpay-magic-checkout-vs-gokwik)
- [thebusinessrule — GoKwik vs Razorpay: Which is Better for Your Business in 2026?](https://thebusinessrule.com/gokwik-vs-razorpay-which-is-better-for-your-business/)
- [binaryic — D2C Checkout Flow Comparison: Razorpay, GoKwik & Shiprocket](https://binaryic.com/d2c-checkout-flow-comparison-razorpay-gokwik-shiprocket/)
- [Z47 (Matrix Partners India) — Democratizing the e-shopping experience with GoKwik (podcast)](https://z47.com/podcast/democratizing-the-e-shopping-experience-with-gokwik)
- [YourStory — Matrix Moments: How GoKwik is democratising online shopping for D2C brands](https://yourstory.com/2021/10/matrix-moments-ecommerce-startup-gokwik-online-d2c-brands)
- [YourStory — How Razorpay's Magic Checkout is unlocking growth for D2C businesses](https://yourstory.com/2022/02/razorpays-magic-checkout-unlocking-growth-d2c-businesses)
- [betatoalpha (Substack) — Meesho charges sellers zero commission. So where's the ₹1,000 crore in cash coming from?](https://betatoalpha.substack.com/p/meesho-charges-sellers-zero-commission)
