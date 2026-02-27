#!/bin/sh

docker kill karasu-lab-identity-api
docker rm karasu-lab-identity-api
docker pull hashibutogarasu/karasu-lab-identity-api
docker run -d -p 8083:8083 --env-file .env.production --name karasu-lab-identity-api hashibutogarasu/karasu-lab-identity-api
