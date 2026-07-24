# Deploying

This covers self-hosting the API server with Docker, and hosting the web
dashboard as a static site. Neither the extension nor the dashboard need a
server beyond the API — the extension ships from the Chrome Web Store (or
loaded unpacked), and the dashboard is a static build.

> **Every step verified, but not the container build itself.** This sandbox
> has no Docker daemon, so `docker build`/`docker compose up` couldn't be
> run directly. Instead every step the Dockerfile performs was run by hand
> in the exact same order — `npm ci` against just the workspace manifests,
> `prisma generate`, `tsc` build, `prisma migrate deploy` against an
> absolute-path SQLite file, then booting the compiled server and hitting
> `/api/health` — and all of it worked. Still worth one real
> `docker compose up --build` before relying on it in production, since a
> layer-cache or base-image quirk is always possible.

## API server (Docker)

```bash
# from the repo root
cat > .env <<'EOF'
JWT_SECRET=<a long random string>
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
CLIENT_ORIGIN=https://your-dashboard-domain.example
EOF

docker compose up --build
```

This builds `packages/server/Dockerfile` (multi-package-aware — it's built
from the repo root because the server is an npm workspace member), runs
`prisma migrate deploy` on container start, and persists the SQLite file in
a named Docker volume (`server_data`, mounted at `/data`) so it survives
container restarts.

SQLite is fine for a single-container deployment. For anything with more
than one server instance or real concurrent load, switch to Postgres:
change `DATABASE_URL` to a `postgresql://...` connection string and
`provider = "sqlite"` to `provider = "postgresql"` in
`packages/server/prisma/schema.prisma`, then rerun migrations.

## Web dashboard (static hosting)

```bash
cd packages/web
VITE_API_BASE_URL=https://your-api-domain.example \
VITE_GOOGLE_CLIENT_ID=<same Google client ID as the server> \
npm run build
```

`dist/` is a plain static site — deploy it to any static host (Vercel,
Netlify, Cloudflare Pages, an S3 bucket + CDN, or nginx). It's a
single-page app, so the host needs to serve `index.html` for unknown paths
(SPA fallback) so `/oauth/callback` resolves correctly.

## After deploying

- Add the dashboard's deployed origin to `CLIENT_ORIGIN` on the server, and
  add `https://your-dashboard-domain.example/oauth/callback` as an
  authorized redirect URI on the Google OAuth client (see
  [`SETUP.md`](SETUP.md)).
- The extension's `lib/config.js` `API_BASE_URL` needs to point at the
  deployed server before publishing it to the Chrome Web Store.
