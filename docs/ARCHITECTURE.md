# Architecture

## Components

```
┌─────────────────────┐        ┌──────────────────────┐
│  Chrome Extension    │        │   Web Dashboard        │
│  (packages/extension) │        │   (packages/web)       │
│                      │        │                        │
│  • popup UI          │        │  • login               │
│  • background worker │        │  • item grid           │
│  • content script    │        │  • boards / categories │
│    (instagram.com)   │        │                        │
└──────────┬───────────┘        └───────────┬────────────┘
           │  HTTPS (JWT)                    │  HTTPS (JWT)
           ▼                                 ▼
                 ┌───────────────────────────────┐
                 │       API Server               │
                 │       (packages/server)        │
                 │                                │
                 │  /api/auth        Google OAuth │
                 │  /api/youtube     sync          │
                 │  /api/instagram   sync          │
                 │  /api/items       list/update   │
                 │  /api/categories  CRUD          │
                 └───────────────┬────────────────┘
                                 │
                                 ▼
                          ┌─────────────┐
                          │   Database   │
                          │ (Prisma/SQL) │
                          └─────────────┘
```

## Data flow

### YouTube (official API)

1. The extension's background worker launches a Google OAuth consent
   screen (`chrome.identity.launchWebAuthFlow`) requesting the
   `youtube.readonly` scope, plus basic profile/email.
2. The returned authorization code is POSTed to `POST /api/auth/google/callback`.
3. The server exchanges the code for an access + refresh token
   (`google-auth-library`), creates/updates the `User` row, and stores the
   refresh token so it can sync in the background later without the
   extension being open.
4. `POST /api/youtube/sync` uses the stored refresh token to call the
   **YouTube Data API v3** (`playlists.list`, `playlistItems.list`), plus
   the user's "Liked videos" playlist, and upserts each video into
   `SavedItem` (`source = YOUTUBE`).

Note: YouTube's "Watch Later" playlist is not accessible via the public API
(Google deprecated third-party access to it), so it's intentionally
excluded — regular/custom playlists and Liked videos are fully supported.

### Instagram (no public "saved posts" API)

Meta's Graph API / Basic Display API does not expose a user's saved
collection to third-party apps — there is no legitimate API endpoint for
this. Since the extension runs inside the user's own authenticated browser
session, it reads the data the same way the user's browser already does:

1. The user opens `instagram.com/<username>/saved/all-posts/` (the
   extension can open this tab for them).
2. `content-scripts/instagram-saved.js` runs in that page, scrolls to load
   saved posts, and reads post metadata straight out of the rendered DOM
   (permalink, thumbnail, caption preview, author).
3. It de-duplicates against what's already been sent and posts the batch to
   the background worker, which forwards it to `POST /api/instagram/sync`.
4. The server upserts each post into `SavedItem` (`source = INSTAGRAM`).

This only ever reads the signed-in user's own saved posts, on their own
device, with their own session — the same trust boundary as any bookmark
manager or "save to X" extension.

### Storage model (Prisma)

- `User` — identity + stored Google refresh token.
- `SavedItem` — one row per saved video/post, `source` enum
  (`YOUTUBE`/`INSTAGRAM`), unique on `(userId, source, externalId)` so
  re-syncing is idempotent.
- `Category` — user-defined boards (phase 2), `SavedItem.categoryId` is
  nullable ("Uncategorized" until sorted).

### Phase 2 — categorization

`services/categorize.service.ts` ships a simple keyword-rule categorizer
that runs automatically after every sync and assigns a best-guess category
(e.g. "Food & Recipes", "Fitness & Health", "Travel"). It's intentionally
simple (string matching against title/caption) so it's cheap to run inline
on every sync; swapping in an embeddings/LLM-based classifier later is a
drop-in replacement for `suggestCategory()` — the API shape
(`items → categoryId`) doesn't change. The web dashboard lets users
override the suggestion by dragging items between board columns.

## Auth model

The server issues its own short-lived JWT after the Google OAuth exchange;
the extension and web dashboard both send it as `Authorization: Bearer
<token>`. Instagram is not a separate login — saved posts scraped by the
extension are just attached to whichever Ugram account (i.e. Google
identity) is currently signed in.
