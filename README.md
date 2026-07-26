# Relay

**By Zo & Aadi** (Zoheb + Aditya, from Yescity).

Relay is a **directable** content engine, not an automation tool —
automation is what cuts creativity out of the loop. It captures an
**Avatar** (your identity, beliefs, expertise, stories) and a **Voice
Profile** (how you actually write), and lets you **direct** it before it
generates, not just approve or edit after: paste an idea, transcript, or
note; optionally tell it the angle to take; three labeled generation lanes
draft it in parallel; you merge/edit into one approved piece; one approval
fans out into every format you publish (blog, LinkedIn, founder story,
thread, newsletter). Every edit teaches Relay your style, every insight you
add teaches it your substance, and once there's enough Avatar built up you
can ask it to propose new pieces on its own — always something you still
direct and approve, never autopilot. See
[`docs/01-ROAST.md`](docs/01-ROAST.md) (and its 2026-07-25 addendum) for
why "AI + human review" alone isn't a differentiator, and why
directability — not just automation-with-a-checkbox — is.

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
6. [`docs/06-POLSIA-PLAYBOOK-AND-GTM-V2.md`](docs/06-POLSIA-PLAYBOOK-AND-GTM-V2.md)
   — **read this one alongside #4, it supersedes the acquisition-motion
   part of it**: a research guide for studying Polsia without taking it at
   face value, a hard roast of the plan as it stood after Zo/Aditya's own
   working thread, a QA pass on what survives, and a Reforge-style GTM
   restart — concierge-first (Phase 0), using the two companies who
   already have this problem, before any self-serve wedge tool.

## Monorepo layout

```
relay/
├── packages/
│   ├── engine/   Core TS library: generation lanes, Avatar (identity +
│   │             voice profile + insights), Direction input, repurposing
│   │             pipeline, generate-from-Avatar, the free Voice Sample
│   │             tool. Framework-free, fully unit tested, no API keys
│   │             required to run (mock provider adapters — see engine
│   │             README).
│   ├── server/   Express API wrapping the engine (in-memory store, no
│   │             auth — single demo founder, matches MVP scope in PRD §7).
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
