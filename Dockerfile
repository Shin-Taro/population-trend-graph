FROM node:20.14.0-bullseye-slim AS installer

WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./

RUN apt-get update \
  && apt-get install -y \
    python3 \
    build-essential \
    libnss3-tools curl

# yarn のバージョンを固定
RUN corepack enable yarn
RUN yarn set version 4.2.2

RUN yarn install --immutable

#
# Rebuild the source code only when needed
#
FROM node:20.14.0-bullseye-slim AS builder

RUN apt-get update
RUN apt-get install -y make

WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY . .

# disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# yarn のバージョンを固定
RUN corepack enable yarn
RUN yarn set version 4.2.2

RUN NODE_OPTIONS=--max_old_space_size=2048 yarn build

#
# Production image, copy all the files and run next
#
FROM node:20.14.0-alpine AS runner

RUN apk add --no-cache libc6-compat jq python3 make g++

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/package.json /app/yarn.lock ./

COPY --from=builder --chown=nextjs:nodejs /app/public/ ./public

# .next/standalone 配下をパッケージルートに展開 (https://nextjs.org/docs/advanced-features/output-file-tracing)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static/ ./.next/static/

EXPOSE 3000

USER nextjs

CMD ["node", "server.js"]
