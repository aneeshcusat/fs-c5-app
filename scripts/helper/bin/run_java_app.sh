#!/bin/bash
set -euo pipefail

CONFIG_FILE="$1"

if [ -z "$CONFIG_FILE" ] || [ ! -f "$CONFIG_FILE" ]; then
  echo "Usage: $0 /path/to/app.env"
  exit 1
fi

source "$CONFIG_FILE"

: "${APP_NAME:?APP_NAME is required}"
: "${APP_JAR:?APP_JAR is required}"
: "${JAVA_OPTS:?JAVA_OPTS is required}"

if [ ! -f "$APP_JAR" ]; then
  echo "Jar file not found: $APP_JAR"
  exit 2
fi

exec java $JAVA_OPTS -jar "$APP_JAR"
