# Production Nginx + Let's Encrypt Package

## All domains route `/api/` to a backend

Every configured hostname now has a backend mapping. This applies to apex domains, `www`, `app`, `api`, `demo`, and `emailservice` hostnames.

Examples:

```text
https://infleca.com/api/users
https://www.neethumohanan.com/api/profile
https://whaatsit.com/api/search
https://app.docqex.com/api/documents
https://demo.tracopus.com/api/projects
```

For every hostname:

- `/api` redirects to `/api/`.
- `/api/...` is proxied to that hostname's configured backend.
- The original `/api/...` URI is preserved.
- Non-API paths continue serving the static frontend, except `api.*` and `emailservice.*`, which return `404` outside `/api/`.

The complete hostname-to-port mapping is in `backend-ports.json`. Update the generated ports before production deployment if your applications use different ports.


This package targets Ubuntu/Debian with Nginx and Certbot. It creates one Nginx file per apex domain and groups its subdomains in that file.

## Important corrections and assumptions

1. Your list contains `humanalyz.com` followed by `api.humanlyz.com`. That API hostname belongs to the other domain. This package configures both:
   - `api.humanlyz.com`
   - `api.humanalyz.com`
2. `aneeshkumarps.com` can only be configured if you control DNS for the `ps.com` zone or the owner delegates that hostname to you.
3. Root and `www` hostnames are configured as static/SPAs under `/etc/inflecaapp/<apex>/current`.
4. `app`, `api`, `demo`, and `emailservice` hostnames proxy to local application ports.
5. Change ports and `127.0.0.1` to private backend IPs as needed before deployment.


## Static website directory structure

Each static apex domain and its `www` hostname share the same document root:

```text
/etc/inflecaapp/<apex-domain>/current
```

Examples:

```text
/etc/inflecaapp/infleca.com/current/index.html
/etc/inflecaapp/tracopus.com/current/index.html
/etc/inflecaapp/docqex.com/current/index.html
```

API, app, demo, and email-service subdomains remain reverse proxies and do not use these static directories.


## Mandatory `/api/` backend routing

All backend requests are accepted only when the request URI starts with `/api/`.

Examples:

```text
https://tracopus.com/api/users
https://app.tracopus.com/api/auth/login
https://demo.tracopus.com/api/projects
https://api.tracopus.com/api/health
```

Requests outside `/api/` are handled as follows:

- Apex, `www`, `app`, and `demo` hostnames serve static frontend files.
- `api.*` and `emailservice.*` hostnames return `404` outside `/api/`.
- `/api` is redirected permanently to `/api/`.
- The `/api/` prefix is preserved when forwarding to the backend.

The generated Nginx form is:

```nginx
location = /api {
    return 308 /api/;
}

location ^~ /api/ {
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host  $host;
    proxy_set_header X-Forwarded-Port  $server_port;

    proxy_pass http://backend;
}
```

Because `proxy_pass` has no trailing slash, a request for `/api/users` reaches the backend as `/api/users`.

If your backend expects `/users` instead, change it to:

```nginx
proxy_pass http://backend/;
```

## Default reverse-proxy assignments

| Hostname | Backend |
|---|---|
| `demo.tracopus.com` | `127.0.0.1:4101` |
| `api.tracopus.com` | `127.0.0.1:4102` |
| `app.tracopus.com` | `127.0.0.1:4103` |
| `emailservice.tracopus.com` | `127.0.0.1:4104` |
| `app.tecopus.com` | `127.0.0.1:4201` |
| `app.skillprepiq.com` | `127.0.0.1:4301` |
| `api.retropus.com` | `127.0.0.1:4401` |
| `api.noteztore.com` | `127.0.0.1:4501` |
| `api.klaritiq.com` | `127.0.0.1:4601` |
| `api.humanlyz.com` | `127.0.0.1:4701` |
| `api.humanalyz.com` | `127.0.0.1:4801` |
| `app.docqstack.com` | `127.0.0.1:4901` |
| `api.docqstack.com` | `127.0.0.1:4902` |
| `app.docqex.com` | `127.0.0.1:5001` |
| `api.docqex.com` | `127.0.0.1:5002` |
| `demo.docqex.com` | `127.0.0.1:5003` |
| `app.tradenearn.com` | `127.0.0.1:5101` |
| `api.tradenearn.com` | `127.0.0.1:5102` |

## DNS records

Every requested hostname must resolve publicly to the Nginx server before Let's Encrypt validation.

| Hostname | Record | Value |
|---|---|---|
| `aneeshkumarps.com` | A/AAAA | Your Nginx public IP |
| `neethumohanan.com` | A/AAAA | Your Nginx public IP |
| `www.neethumohanan.com` | A/AAAA | Your Nginx public IP |
| `myprofile360.com` | A/AAAA | Your Nginx public IP |
| `www.myprofile360.com` | A/AAAA | Your Nginx public IP |
| `infleca.com` | A/AAAA | Your Nginx public IP |
| `www.infleca.com` | A/AAAA | Your Nginx public IP |
| `credencia.in` | A/AAAA | Your Nginx public IP |
| `www.credencia.in` | A/AAAA | Your Nginx public IP |
| `tracopus.com` | A/AAAA | Your Nginx public IP |
| `www.tracopus.com` | A/AAAA | Your Nginx public IP |
| `demo.tracopus.com` | A/AAAA | Your Nginx public IP |
| `api.tracopus.com` | A/AAAA | Your Nginx public IP |
| `app.tracopus.com` | A/AAAA | Your Nginx public IP |
| `emailservice.tracopus.com` | A/AAAA | Your Nginx public IP |
| `tecopus.com` | A/AAAA | Your Nginx public IP |
| `www.tecopus.com` | A/AAAA | Your Nginx public IP |
| `app.tecopus.com` | A/AAAA | Your Nginx public IP |
| `skillprepiq.com` | A/AAAA | Your Nginx public IP |
| `www.skillprepiq.com` | A/AAAA | Your Nginx public IP |
| `app.skillprepiq.com` | A/AAAA | Your Nginx public IP |
| `retropus.com` | A/AAAA | Your Nginx public IP |
| `www.retropus.com` | A/AAAA | Your Nginx public IP |
| `api.retropus.com` | A/AAAA | Your Nginx public IP |
| `noteztore.com` | A/AAAA | Your Nginx public IP |
| `www.noteztore.com` | A/AAAA | Your Nginx public IP |
| `api.noteztore.com` | A/AAAA | Your Nginx public IP |
| `klaritiq.com` | A/AAAA | Your Nginx public IP |
| `www.klaritiq.com` | A/AAAA | Your Nginx public IP |
| `api.klaritiq.com` | A/AAAA | Your Nginx public IP |
| `humanlyz.com` | A/AAAA | Your Nginx public IP |
| `www.humanlyz.com` | A/AAAA | Your Nginx public IP |
| `api.humanlyz.com` | A/AAAA | Your Nginx public IP |
| `humanalyz.com` | A/AAAA | Your Nginx public IP |
| `www.humanalyz.com` | A/AAAA | Your Nginx public IP |
| `api.humanalyz.com` | A/AAAA | Your Nginx public IP |
| `docqstack.com` | A/AAAA | Your Nginx public IP |
| `www.docqstack.com` | A/AAAA | Your Nginx public IP |
| `app.docqstack.com` | A/AAAA | Your Nginx public IP |
| `api.docqstack.com` | A/AAAA | Your Nginx public IP |
| `docqex.com` | A/AAAA | Your Nginx public IP |
| `www.docqex.com` | A/AAAA | Your Nginx public IP |
| `app.docqex.com` | A/AAAA | Your Nginx public IP |
| `api.docqex.com` | A/AAAA | Your Nginx public IP |
| `demo.docqex.com` | A/AAAA | Your Nginx public IP |
| `whaatsit.com` | A/AAAA | Your Nginx public IP |
| `www.whaatsit.com` | A/AAAA | Your Nginx public IP |
| `tradenearn.com` | A/AAAA | Your Nginx public IP |
| `www.tradenearn.com` | A/AAAA | Your Nginx public IP |
| `app.tradenearn.com` | A/AAAA | Your Nginx public IP |
| `api.tradenearn.com` | A/AAAA | Your Nginx public IP |

For `www`, a CNAME to the apex is also acceptable. If using Cloudflare, temporarily disable proxying during initial certificate issuance if HTTP validation fails.

## Installation

```bash
unzip nginx-production-package.zip
cd nginx-production-package
chmod +x scripts/*.sh
./scripts/install-nginx.sh
```

Before running the installer, edit the port or IP in each file under `sites-available/`.

Static pages are included in the package under `static-sites/`. The installation script copies them to:

```text
/etc/inflecaapp/<domain>/current/index.html
```

To deploy a replacement build manually:

```bash
sudo mkdir -p /etc/inflecaapp/example.com/current
sudo rsync -a --delete ./dist/ /etc/inflecaapp/example.com/current/
sudo chown -R root:www-data /etc/inflecaapp/example.com
sudo find /etc/inflecaapp/example.com -type d -exec chmod 755 {} \;
sudo find /etc/inflecaapp/example.com -type f -exec chmod 644 {} \;
sudo nginx -t
sudo systemctl reload nginx
```

## Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Do not expose application ports such as 4101 or 5002 publicly. Bind applications to `127.0.0.1`, or firewall them so only the Nginx server can connect.

## Obtain SSL certificates

Replace `support@infleca.com` first. Run one command at a time after DNS propagation:

```bash
sudo certbot --nginx -d aneeshkumarps.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d neethumohanan.com -d www.neethumohanan.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d myprofile360.com -d www.myprofile360.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d infleca.com -d www.infleca.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d credencia.in -d www.credencia.in --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d tracopus.com -d www.tracopus.com -d demo.tracopus.com -d api.tracopus.com -d app.tracopus.com -d emailservice.tracopus.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d tecopus.com -d www.tecopus.com -d app.tecopus.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d skillprepiq.com -d www.skillprepiq.com -d app.skillprepiq.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d retropus.com -d www.retropus.com -d api.retropus.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d noteztore.com -d www.noteztore.com -d api.noteztore.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d klaritiq.com -d www.klaritiq.com -d api.klaritiq.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d humanlyz.com -d www.humanlyz.com -d api.humanlyz.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d humanalyz.com -d www.humanalyz.com -d api.humanalyz.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d docqstack.com -d www.docqstack.com -d app.docqstack.com -d api.docqstack.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d docqex.com -d www.docqex.com -d app.docqex.com -d api.docqex.com -d demo.docqex.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d whaatsit.com -d www.whaatsit.com --email support@infleca.com --agree-tos --no-eff-email --redirect
sudo certbot --nginx -d tradenearn.com -d www.tradenearn.com -d app.tradenearn.com -d api.tradenearn.com --email support@infleca.com --agree-tos --no-eff-email --redirect
```

Certbot's Nginx plugin obtains the certificate, edits the Nginx server blocks, and enables HTTP-to-HTTPS redirects.

## Verify renewal

```bash
sudo systemctl status snap.certbot.renew.timer
sudo certbot certificates
sudo certbot renew --dry-run
```

## Validate after every change

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Backend health checks

```bash
curl -I http://127.0.0.1:4102
curl -I http://api.tracopus.com
curl -I https://api.tracopus.com
```

A `502 Bad Gateway` normally means the backend process is stopped, listening on another port/interface, or blocked by a firewall.

## Production notes

- Keep databases and application ports private.
- Use systemd, Docker Compose, Kubernetes, or a process manager to restart backend services.
- Back up `/etc/nginx`, `/etc/letsencrypt`, and application environment files.
- Add application-specific CORS in the backend rather than broadly in Nginx.
- Add HSTS only after every required hostname works reliably over HTTPS.
- If uploads exceed 25 MB, adjust `client_max_body_size` in `security-headers.conf`.


## Applying the revised configuration

```bash
sudo cp snippets/websocket-map.conf /etc/nginx/conf.d/00-websocket-map.conf
sudo cp snippets/security-headers.conf /etc/nginx/snippets/
sudo cp sites-available/*.conf /etc/nginx/sites-available/
sudo nginx -t
sudo systemctl reload nginx
```

Test both accepted and rejected paths:

```bash
curl -I https://tracopus.com/api/health
curl -I https://api.tracopus.com/api/health
curl -I https://api.tracopus.com/health
```

The final command should return `404` because it does not begin with `/api/`.
