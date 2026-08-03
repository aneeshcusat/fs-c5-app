#!/usr/bin/env bash
set -euo pipefail

PACKAGE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

sudo apt update
sudo apt install -y nginx snapd

# Official Certbot snap installation approach.
sudo snap install core
sudo snap refresh core
sudo apt remove -y certbot || true
sudo snap install --classic certbot
sudo ln -sf /snap/bin/certbot /usr/bin/certbot

sudo cp "$PACKAGE_DIR/snippets/security-headers.conf" /etc/nginx/snippets/
sudo cp "$PACKAGE_DIR/snippets/websocket-map.conf" /etc/nginx/conf.d/00-websocket-map.conf
sudo cp "$PACKAGE_DIR/sites-available/"*.conf /etc/nginx/sites-available/

# Deploy starter static websites under /etc/inflecaapp/<domain>/current.
sudo mkdir -p /etc/inflecaapp
if [ -d "$PACKAGE_DIR/static-sites" ]; then
  sudo cp -a "$PACKAGE_DIR/static-sites/." /etc/inflecaapp/
fi

# Nginx normally runs as www-data on Ubuntu/Debian.
sudo chown -R root:www-data /etc/inflecaapp
sudo find /etc/inflecaapp -type d -exec chmod 755 {} \;
sudo find /etc/inflecaapp -type f -exec chmod 644 {} \;

for file in "$PACKAGE_DIR/sites-available/"*.conf; do
  name="$(basename "$file")"
  sudo ln -sfn "/etc/nginx/sites-available/$name" "/etc/nginx/sites-enabled/$name"
done

sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx

echo "Nginx installed and HTTP configurations enabled."
echo "Point DNS first, then run the Certbot commands from README.md."
