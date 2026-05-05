#!/bin/bash
set -euo pipefail
sudo systemctl start fsapp-9081 fsapp-8081 fsapp-7081 fsemail-6080
sudo systemctl status --no-pager fsapp-9081 fsapp-8081 fsapp-7081 fsemail-6080
