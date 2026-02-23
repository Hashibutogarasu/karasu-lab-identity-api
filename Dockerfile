# =========================================
# Stage 1: ビルド環境 (Builder)
# =========================================
FROM node:20-alpine AS builder

# 1. pnpmの有効化と必要なツールの準備
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apk add --no-cache openssl ca-certificates

WORKDIR /app

# 2. 依存関係のインストール
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma/
RUN pnpm install --frozen-lockfile

# 3. ソースコードのコピーと生成プロセス
# .dockerignore で不要なファイルを除外することを推奨
COPY . .

RUN DATABASE_URL="postgresql://build:dummy@localhost:5432/dummy" npx prisma generate

RUN pnpm run build

# 4. ランタイム用に不要なパッケージを削除
RUN pnpm prune --prod

# =========================================
# Stage 2: 実行環境 (Runner)
# =========================================
FROM node:20-alpine AS runner

ENV NODE_ENV production
WORKDIR /app

# 1. システム依存関係のインストール (実行時にも必要)
RUN apk add --no-cache openssl ca-certificates

# 2. 必要なファイルをBuilderからコピー
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# 'npm start' を実行するために package.json が必要です (コピー済み)
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma/

# 3. エントリーポイントスクリプトのコピーと権限設定
COPY scripts/docker-entrypoint.sh ./
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh

# 4. 起動設定
ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["npm", "run", "start:prod"]
