# Ugram (YouGram)

Ugram connects your **YouTube** and **Instagram** accounts, pulls in everything
you've saved (YouTube playlists, Instagram saved posts), and gives you one
organized place to browse it — with Pinterest-style boards to sort saves into
categories.

## How it works

1. **Connect** — Install the Ugram Chrome extension and authorize it against
   your YouTube (Google OAuth) and Instagram accounts.
2. **Fetch** — The extension pulls your YouTube playlists (via the official
   YouTube Data API) and your Instagram saved posts (read directly from your
   authenticated browser session, since Instagram's public API does not
   expose saved posts), and syncs them to your Ugram account.
3. **Organize** *(phase 2)* — Saved items are auto-sorted into suggested
   categories and you can drag them into custom boards, similar to Pinterest
   interest boards.

## Why a browser extension

YouTube exposes playlists (and "Liked videos") through the official
**YouTube Data API v3**, so the extension/server can fetch those with a
standard OAuth flow. Instagram has **no public API for a user's saved
posts** — Meta doesn't expose that endpoint to third parties — so the only
way to read your own saved posts is from inside an authenticated browser
session on instagram.com, which is exactly what a browser extension is for.
A companion mobile app could do the same by embedding a webview, but the
extension is the fastest path to a working v1, so that's phase 1.

## Monorepo layout

```
ugram/
├── packages/
│   ├── server/      Express + TypeScript + Prisma API (auth, sync, storage)
│   ├── extension/   Chrome extension (Manifest V3) — connect + fetch
│   └── web/         React dashboard — phase 2 boards UI
└── docs/
    ├── ARCHITECTURE.md
    ├── ROADMAP.md
    └── SETUP.md
```

## Quick start

See [`docs/SETUP.md`](docs/SETUP.md) for full local setup (Google OAuth
credentials, env vars, running each package), or [`docs/DEPLOY.md`](docs/DEPLOY.md)
for self-hosting the server with Docker. The short version:

```bash
npm install

# Backend API
cp packages/server/.env.example packages/server/.env   # fill in the values
npm run db:migrate
npm run dev:server

# Web dashboard (phase 2 boards UI)
npm run dev:web

# Extension: chrome://extensions → Developer mode → Load unpacked →
# select packages/extension/
```

## Status

Phase 1 (connect + fetch) is scaffolded end-to-end: OAuth, YouTube sync,
Instagram scrape-and-sync, and storage. Phase 2 (categorization/boards) has
a working rule-based auto-categorizer and a boards UI to build on top of —
see [`docs/ROADMAP.md`](docs/ROADMAP.md).
