# @relay/engine

Framework-free core of Relay: generation lanes, voice profile learning, the
repurposing pipeline, and the free Voice Sample tool. No API keys required
— ships with rule-based mock adapters so the full workflow is demoable and
testable end-to-end (`npm run test:engine`).

## Wiring in a real model provider

Every generation lane and the repurposing step go through one interface
each (`src/adapters/types.ts`):

```ts
export interface GenerationAdapter {
  lane: LaneId;
  providerLabel: string;
  generate(input: GenerationInput): Promise<GenerationResult>;
}
```

To replace a mock lane with a real provider:

1. Create a new file, e.g. `src/adapters/claudeDraftAdapter.ts`, that
   implements `GenerationAdapter` and calls the real API (read the key
   from `process.env`, per the repo's `.env.example` pattern once one
   exists — do not hardcode credentials).
2. Swap it into `allMockAdapters` (or build a new array) wherever the
   pipeline is constructed — currently `packages/server/src/index.ts`.
3. Nothing else changes: the pipeline, voice profile learning, review UI,
   and repurposing pipeline are all provider-agnostic by design.

Same pattern for `RepurposeAdapter` (`mockRepurposeAdapter` in
`src/adapters/mockAdapters.ts`) — swap it for a real drafting-model call
when ready.

Per [`docs/03-PRD.md`](../../docs/03-PRD.md) §6, phase 1 plans to wire
exactly one real adapter (the drafting lane) before spending on the other
two — validate the workflow with a live model before paying for three.
