#!/bin/sh

docker kill karasu-lab-api || true
docker rm karasu-lab-api || true
docker pull hashibutogarasu/karasu-lab-api
docker run -d -p 8083:8083 \
  --env-file .env.production \
  --name karasu-lab-api \
  hashibutogarasu/karasu-lab-api
