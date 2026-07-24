# Build from the repo root: docker build -f packages/server/Dockerfile .
# (needs the root context because this is an npm workspace).
FROM node:20-alpine

WORKDIR /app

# Copy just the package manifests first so `npm ci` is cached unless a
# dependency actually changed.
COPY package.json package-lock.json ./
COPY packages/server/package.json packages/server/package.json
COPY packages/web/package.json packages/web/package.json
RUN npm ci

COPY packages/server ./packages/server
RUN npm run db:generate --workspace=packages/server
RUN npm run build --workspace=packages/server

ENV NODE_ENV=production
EXPOSE 4000
WORKDIR /app/packages/server

# Applies any pending migrations, then starts the compiled server. Point
# DATABASE_URL at a path outside this directory (see docker-compose.yml) so
# it doesn't collide with the baked-in prisma/migrations folder.
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
