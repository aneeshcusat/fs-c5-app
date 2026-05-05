#!/bin/bash
set -euo pipefail
echo "=== journalctl ==="
sudo journalctl -u fsapp-9081 -u fsapp-8081 -u fsapp-7081 -u fsemail-6080 -n 200 --no-pager
