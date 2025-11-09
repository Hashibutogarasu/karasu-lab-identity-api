#!/bin/sh
set -e

if [ -n "$DATABASE_URL" ]; then
  echo "DATABASE_URL=\"$DATABASE_URL\"" > .env
  echo ".env file generated from environment variables."
fi

exec "$@"