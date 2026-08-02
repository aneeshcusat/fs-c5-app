#!/usr/bin/env bash
set -euo pipefail
sudo nginx -t
sudo systemctl reload nginx
sudo certbot renew --dry-run
