# Setup

## 1. Prerequisites

- Node.js 18+
- A Google Cloud project with the **YouTube Data API v3** enabled

## 2. Create Google OAuth credentials

1. In [Google Cloud Console](https://console.cloud.google.com/), create an
   **OAuth 2.0 Client ID**.
   - For the extension, add a **Chrome App** client (or a **Web** client —
     both work with `chrome.identity.launchWebAuthFlow`), and add
     `https://<YOUR_EXTENSION_ID>.chromiumapp.org/` as an authorized
     redirect URI once you know the extension's ID (visible in
     `chrome://extensions` after loading it unpacked).
   - Add the `.../auth/youtube.readonly`,
     `.../auth/userinfo.email`, and `.../auth/userinfo.profile` scopes.
2. Note the **Client ID** and **Client Secret** — the extension needs the
   client ID, the server needs both (to exchange the auth code for tokens).

## 3. Backend server

```bash
cd packages/server
cp .env.example .env
```

Fill in `.env`:

```
PORT=4000
DATABASE_URL="file:./dev.db"
JWT_SECRET=<any long random string>
GOOGLE_CLIENT_ID=<from step 2>
GOOGLE_CLIENT_SECRET=<from step 2>
CLIENT_ORIGIN=http://localhost:5173
```

Then:

```bash
npm install
npm run db:migrate
npm run dev
```

The API listens on `http://localhost:4000` by default. `GET /api/health`
should return `{ "ok": true }`.

## 4. Extension

1. Open `packages/extension/lib/config.js` and set `API_BASE_URL` (defaults
   to `http://localhost:4000`) and `GOOGLE_CLIENT_ID` (from step 2).
2. In Chrome, go to `chrome://extensions`, enable **Developer mode**, click
   **Load unpacked**, and select `packages/extension/`.
3. Copy the extension's ID from that page and add
   `https://<ID>.chromiumapp.org/` as a redirect URI on the OAuth client
   from step 2 (Google won't allow the flow to complete without it).
4. Click the Ugram icon → **Connect YouTube** → sign in → **Sync now**.
5. Click **Connect Instagram** → this opens your Instagram saved-posts page
   in a new tab; the content script reads it automatically and reports back
   to the popup once it's done.

## 5. Web dashboard (boards UI)

```bash
cd packages/web
npm install
npm run dev
```

Open the printed local URL, sign in with the same Google account you used
in the extension, and your synced items/boards will show up.

## 6. Database

Prisma with SQLite is the default (zero setup, file-based, good for local
dev and small deployments). To point at Postgres instead, change
`DATABASE_URL` in `packages/server/.env` and `provider = "sqlite"` to
`provider = "postgresql"` in `packages/server/prisma/schema.prisma`, then
re-run `npm run db:migrate`.
