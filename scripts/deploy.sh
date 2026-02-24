#!/bin/bash
set -e

# Load environment variables from .env.production if it exists
if [ -f ".env.production" ]; then
  # Read while handling CRLF and comments
  while IFS='=' read -r key value || [ -n "$key" ]; do
    # Skip empty lines and comments
    [[ "$key" =~ ^#.*$ ]] && continue
    [ -z "$key" ] && continue
    
    # Remove CR from value and whitespace from key
    key=$(echo "$key" | tr -d '\r ' )
    value=$(echo "$value" | tr -d '\r' | sed 's/^ *//;s/ *$//')
    
    if [ -n "$key" ]; then
      export "$key=$value"
    fi
  done < ".env.production"
fi

# Configuration/Defaults
REMOTE_HOST="${REMOTE_HOST}"
REMOTE_DIR="${REMOTE_DIR}"

if [ -z "$REMOTE_HOST" ] || [ -z "$REMOTE_DIR" ]; then
  echo "❌ Error: REMOTE_HOST or REMOTE_DIR is not set."
  echo "Please set them in your environment or add them to .env.production."
  exit 1
fi

echo "🚀 Starting deployment..."

# 1. Sync .env.production to remote
if [ -f ".env.production" ]; then
  echo "📝 Syncing .env.production..."
  scp .env.production "${REMOTE_HOST}:${REMOTE_DIR}/.env.production"
else
  echo "⚠️ .env.production not found. Skipping sync."
fi

# 2. Push to GitHub
echo "⬆️ Pushing to GitHub..."
git add .
if ! git diff-index --quiet HEAD --; then
  git commit -m "deploy: update $(date +%Y%m%d%H%M%S)"
  git push origin main
else
  echo "✅ No changes to commit."
  # Optionally trigger workflow manually if needed
fi

echo "✨ Deployment triggered! GH Actions will build and notify the server."
