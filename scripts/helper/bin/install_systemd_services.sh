#!/bin/bash
set -euo pipefail

BASE_DIR=/home/famstack-app/common
SYSTEMD_DIR=/etc/systemd/system

mkdir -p "$BASE_DIR/bin" "$BASE_DIR/env"

cp -f "$BASE_DIR/source/bin/run_java_app.sh" "$BASE_DIR/bin/run_java_app.sh"
chmod +x "$BASE_DIR/bin/run_java_app.sh"

cp -f "$BASE_DIR/source/env/"*.env "$BASE_DIR/env/"
cp -f "$BASE_DIR/source/systemd/"*.service "$SYSTEMD_DIR/"

systemctl daemon-reload
systemctl enable fsapp-9081.service fsapp-8081.service fsapp-7081.service fsemail-6080.service

echo "Installed and enabled systemd services."
echo "Start all with: sudo systemctl start fsapp-9081 fsapp-8081 fsapp-7081 fsemail-6080"
