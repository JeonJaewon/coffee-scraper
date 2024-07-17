FROM node:18-alpine AS base
RUN corepack enable pnpm

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY ./coffee-finder-frontend/package.json ./coffee-finder-frontend/package.json
COPY ./coffee-scraper ./coffee-scraper
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm i --frozen-lockfile;

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm -F coffee-finder-frontend build;


FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/coffee-finder-frontend/public ./coffee-finder-frontend/public


# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=nextjs:nodejs /app/node_modules  ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/coffee-finder-frontend/node_modules  ./coffee-finder-frontend/node_modules
COPY --from=builder --chown=nextjs:nodejs /app/coffee-finder-frontend/package.json  ./coffee-finder-frontend/package.json
COPY --from=builder --chown=nextjs:nodejs /app/coffee-finder-frontend/next.config.mjs  ./coffee-finder-frontend/next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/coffee-finder-frontend/.next  ./coffee-finder-frontend/.next
COPY --from=builder --chown=nextjs:nodejs /app/coffee-finder-frontend/.next/static ./coffee-finder-frontend/.next/static

# Set the correct permission for prerender cache
# RUN mkdir .next
RUN chown nextjs:nodejs ./coffee-finder-frontend/.next

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
# CMD HOSTNAME="0.0.0.0" node server.js
CMD ["pnpm", "-F", "coffee-finder-frontend", "start"]
