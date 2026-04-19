# UFC 2026 Frontend - SSL Nginx Deployment Guide

This guide covers deploying the UFC 2026 frontend with SSL-enabled Nginx serving production build on port 8000 and proxying the dev server on port 8001.

## Overview

```
                        ┌─────────────────────────────────────┐
                        │           Nginx (SSL)               │
                        │                                     │
  HTTPS ────► 8000     │──► Serve dist/ (production build)   │
  HTTPS ────► 8001     │──► Proxy to Vite :5173 (dev)        │
                        └─────────────────────────────────────┘

  Port 8000: Production build (requires npm run build first)
  Port 8001: Development server proxy (requires npm run dev)
```

## Prerequisites

- Ubuntu/Debian-based system (or any Linux with build tools)
- OpenSSL
- curl (for downloading sources)
- make, gcc (for building Nginx from source)
- Node.js 18+ (for building and dev server)

> **No sudo required**: This project builds Nginx from source and installs to `vendor/nginx/`.
> The `scripts/build-nginx.sh` automatically downloads and builds PCRE2 and Nginx.

## Complete Deployment Workflow

### Step 1: Build Nginx from Source

```bash
./scripts/build-nginx.sh
```

This script will:
- Download PCRE2 10.44 and Nginx 1.30.0 to `/tmp`
- Build PCRE2 and install to temp directory
- Build Nginx with SSL, HTTP/2, and realip modules
- Install to `vendor/nginx/`

**Build time**: ~2-3 minutes on a typical machine

### Step 2: Generate SSL Certificates

```bash
mkdir -p nginx/ssl

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/nginx.key \
  -out nginx/ssl/nginx.crt \
  -subj "/C=US/ST=State/L=City/O=UFC2026/CN=localhost"

chmod 600 nginx/ssl/nginx.key
chmod 644 nginx/ssl/nginx.crt
```

### Step 3: Build Production Assets

```bash
npm run build
```

This creates the `dist/` directory with static files.

### Step 4: Start Services

**Terminal 1 - Vite Dev Server:**
```bash
npm run dev
```

**Terminal 2 - Nginx:**
```bash
./nginx/start.sh
```

Expected output:
```
Testing Nginx configuration...
nginx: the configuration file .../nginx/ufc-frontend.conf syntax is ok
nginx: configuration file .../nginx/ufc-frontend.conf test is successful
Starting Nginx...
Nginx started successfully
Production build: https://localhost:8000
Dev server proxy: https://localhost:8001 (requires Vite dev server running)
```

### Step 5: Trust the Self-Signed Certificate (Browser)

Since we're using a self-signed certificate, browsers will show SSL warnings.

**Option A: Chrome DevTools Workaround (Quick)**
1. Open Chrome to the SSL error page
2. Type `#invalid-cert-accept` at the end of the URL and press Enter
3. Page will load with SSL bypassed

**Option B: System Trust (Permanent)**

```bash
# Copy certificate to system trust store
sudo cp nginx/ssl/nginx.crt /usr/local/share/ca-certificates/ufc-local.crt
sudo update-ca-certificates
```

Or for WSL/Chrome specifically:
1. Visit `chrome://settings/manageCertificates`
2. Authorities → Import → Select `nginx/ssl/nginx.crt`
3. Trust for websites

### Step 6: Verify Deployment

```bash
# Test production (port 8000)
curl -k https://localhost:8000/ | head -5

# Test dev proxy (port 8001)
curl -k https://localhost:8001/ | head -5

# Test SPA routing
curl -k https://localhost:8000/any/route | grep "<title>"
```

## Nginx Commands

| Command | Description |
|---------|-------------|
| `./nginx/start.sh` | Start Nginx |
| `./nginx/stop.sh` | Stop Nginx |
| `./vendor/nginx/sbin/nginx -t -c nginx/ufc-frontend.conf` | Test configuration |
| `pkill -f nginx` | Force kill all Nginx processes |

## Port Configuration

| Port | Service | SSL | Purpose |
|------|---------|-----|---------|
| 8000 | Nginx | Yes | Production build (dist/) |
| 8001 | Nginx | Yes | Proxy to Vite dev server |
| 5173 | Vite | No | Dev server (behind Nginx proxy) |

### Changing Ports

Edit `nginx/ufc-frontend.conf`:
```nginx
listen 8000 ssl;   # Change 8000 to your port
listen 8001 ssl;   # Change 8001 to your port
```

Also update `proxy_pass http://localhost:5173;` in the dev server block if Vite runs on a different port.

## Directory Structure

```
ufc-2026-frontend/
├── nginx/
│   ├── ufc-frontend.conf   # Nginx configuration (SSL, ports 8000/8001)
│   ├── start.sh            # Start script
│   ├── stop.sh             # Stop script
│   └── ssl/
│       ├── nginx.crt       # SSL certificate
│       └── nginx.key       # SSL private key (chmod 600)
├── vendor/nginx/            # Locally-built Nginx (gitignored)
│   └── sbin/nginx
├── scripts/
│   └── build-nginx.sh      # Build Nginx + PCRE2 from source
├── dist/                   # Production build output (gitignored)
└── docs/
    └── BUILD_SSL_NGINX.md  # This file
```

## Troubleshooting

### "nginx: command not found" after build

The build script installs to `vendor/nginx/`. Use the full path:
```bash
./vendor/nginx/sbin/nginx
```

### Port already in use

```bash
# Find what's using the port
lsof -i :8000
lsof -i :8001

# Kill the process or change ports in nginx/ufc-frontend.conf
```

### Port 8001 shows "Bad Gateway"

- Ensure Vite dev server is running: `npm run dev`
- Check Vite is on port 5173: `lsof -i :5173`

### SSL certificate errors in browser

1. Click "Advanced" → "Proceed to localhost" (Chrome)
2. Or use the Chrome DevTools bypass: visit `https://localhost:8000/#invalid-cert-accept`
3. Or add cert to system trust store (see Step 5 above)

### Nginx not built (vendor/nginx doesn't exist)

```bash
./scripts/build-nginx.sh
```

## Replicate on Another Machine

1. Clone the repository
2. Run `./scripts/build-nginx.sh` (builds Nginx from source, no sudo needed)
3. Generate SSL: `openssl req -x509 -nodes -days 365...` (see Step 2 above)
4. Build: `npm run build`
5. Start: `./nginx/start.sh && npm run dev`

## Let's Encrypt (Production)

For production with a real domain:

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate (requires domain DNS pointing to server)
sudo certbot --nginx -d yourdomain.com
```

Then update `nginx/ufc-frontend.conf` to use Let's Encrypt certs:
```nginx
ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
```
