FROM node:22-bookworm-slim AS builder
LABEL version="0.0.1"
LABEL x-release-please-version="2.1.4"

RUN corepack enable && corepack prepare pnpm@10.27.0 --activate
RUN npm install -g bun
RUN apt-get update && apt-get install -y openssl ca-certificates git build-essential python3 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/common/package.json ./packages/common/package.json
COPY packages/yultyyev/better-auth-firebase-auth/package.json ./packages/yultyyev/better-auth-firebase-auth/package.json

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

COPY packages/common ./packages/common
COPY packages/yultyyev ./packages/yultyyev

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

RUN pnpm --filter="@hashibutogarasu/common" run build
RUN pnpm --filter="better-auth-firebase-auth" run build

COPY prisma ./prisma/
RUN DATABASE_URL="postgresql://build:dummy@localhost:5432/dummy" npx prisma generate

COPY . .

RUN pnpm run build

RUN CI=true pnpm prune --prod --ignore-scripts

FROM node:22-bookworm-slim AS runner

RUN corepack enable && corepack prepare pnpm@10.27.0 --activate

ENV NODE_ENV=production
WORKDIR /app

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/prisma.config.js ./

COPY scripts/docker-entrypoint.sh ./
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["pnpm", "run", "start:prod"]
