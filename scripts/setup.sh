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

echo "🛠️ Setting up production environment..."

# 1. Sync configuration
scp docker-compose.yml "${REMOTE_HOST}:${REMOTE_DIR}/docker-compose.yml"
if [ -f ".env.production" ]; then
  scp .env.production "${REMOTE_HOST}:${REMOTE_DIR}/.env.production"
fi

# 2. Extract Token
TOKEN=$(grep WATCHTOWER_HTTP_API_TOKEN .env.production | cut -d '=' -f2)
if [ -z "$TOKEN" ]; then
  echo "❌ Error: WATCHTOWER_HTTP_API_TOKEN not found in .env.production"
  exit 1
fi

# 3. Setup Watchtower
echo "🐳 Configuring Watchtower (Webhook mode)..."
ssh "${REMOTE_HOST}" "docker rm -f watchtower-webhook || true"
ssh "${REMOTE_HOST}" "docker run -d \
  --name watchtower-webhook \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e WATCHTOWER_HTTP_API_TOKEN=${TOKEN} \
  -e WATCHTOWER_HTTP_API_UPDATE=true \
  -p 8082:8080 \
  containrrr/watchtower \
  --http-api-update \
  karasu-lab-identity-api"

# 4. Setup API Container
echo "🚢 Pulling latest image and starting API..."
ssh "${REMOTE_HOST}" "cd ${REMOTE_DIR} && docker compose pull && docker compose up -d"

echo "✅ Setup complete!"
echo "Webhook URL: http://${REMOTE_HOST}:8082/v1/update"
echo "Webhook Token: ${TOKEN}"
echo "API Port: 8083"
