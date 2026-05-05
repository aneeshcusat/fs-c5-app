#!/bin/bash
set -euo pipefail
sudo systemctl status --no-pager fsapp-9081 fsapp-8081 fsapp-7081 fsemail-6080
