# Relay

**By Zo & Aadi** (Zoheb + Aditya, ex-Yasity).

Relay is a human-in-the-loop content automation engine: paste an idea,
transcript, or note; three labeled generation lanes draft it in parallel;
you merge/edit into one approved piece; one approval fans out into every
format you publish (blog, LinkedIn, founder story, thread, newsletter).
Every edit you make teaches Relay your voice, so review gets faster and
output gets less generic over time — that's the whole bet, see
[`docs/01-ROAST.md`](docs/01-ROAST.md) for why "AI + human review" alone
isn't a differentiator without it.

## Start here

Read in this order — each doc was written to survive the one before it:

1. [`docs/01-ROAST.md`](docs/01-ROAST.md) — the bear case, argued hard, and
   what changed about the plan because of it.
2. [`docs/02-MARKET-RESEARCH.md`](docs/02-MARKET-RESEARCH.md) — the
   competitive landscape, including the real numbers behind the Polsia
   comparison that inspired this.
3. [`docs/03-PRD.md`](docs/03-PRD.md) — what Relay actually is, for whom,
   and what's explicitly out of scope for v1.
4. [`docs/04-GTM-DISTRIBUTION.md`](docs/04-GTM-DISTRIBUTION.md) — **Aditya
   owns this** — the free wedge tool, channels, funnel, US/EU/AUS focus.
5. [`docs/05-ROADMAP.md`](docs/05-ROADMAP.md) — phases, ownership split,
   exit criteria for phase 1.

## Monorepo layout

```
relay/
├── packages/
│   ├── engine/   Core TS library: generation lanes, voice profile,
│   │             repurposing pipeline, the free Voice Sample tool.
│   │             Framework-free, fully unit tested, no API keys required
│   │             to run (mock provider adapters — see engine README).
│   ├── server/   Express API wrapping the engine (in-memory store, no
│   │             auth — single demo founder, matches MVP scope in PRD §6).
│   └── web/      React + Vite UI: the free Voice Sample landing page and
│                 the full review/approve/repurpose engine UI.
└── docs/         Roast, market research, PRD, GTM, roadmap (see above).
```

## Quick start

```bash
npm install
npm run build:engine   # engine must be built once before the server runs

# Terminal 1
npm run dev:server     # http://localhost:4000

# Terminal 2
npm run dev:web        # http://localhost:5173 (proxies /api to the server)
```

Open `http://localhost:5173/` for the free Voice Sample wedge tool, or
`http://localhost:5173/engine` for the full review → approve → repurpose
workflow.

Run the engine's test suite with `npm run test:engine`.

## Status

Phase 0 (this commit): docs complete, MVP engine scaffolded end-to-end with
mock generation adapters (no API keys needed to demo the full workflow) —
see [`packages/engine/README.md`](packages/engine/README.md) for how to
wire in a real Claude/OpenAI/Perplexity call per lane. Phase 1 (wedge
validation) is scoped in [`docs/05-ROADMAP.md`](docs/05-ROADMAP.md).
