#!/bin/sh

if [ -f .env.production ]; then
    export $(cat .env.production | grep -v '#' | awk '/=/ {print $1}')
fi

docker kill watchtower-webhook || true
docker rm watchtower-webhook || true
docker pull containrrr/watchtower

docker run -d \
  --name watchtower-webhook \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 8082:8080 \
  containrrr/watchtower \
  --http-api-update \
  --http-api-token "${WATCHTOWER_HTTP_API_TOKEN}" \
  karasu-lab-identity-api
