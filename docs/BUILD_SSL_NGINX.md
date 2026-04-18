# UFC 2026 Frontend - SSL Nginx Deployment Guide

This guide covers deploying the UFC 2026 frontend with SSL-enabled Nginx serving production build on port 8000 and proxying the dev server on port 8001.

## Prerequisites

- Ubuntu/Debian-based system (or any Linux with build tools)
- OpenSSL
- PCRE2 library (or use the build script below)
- Node.js 18+ (for building and dev server)

> **Note**: This project includes a local Nginx build script that downloads and compiles
> Nginx from source along with required dependencies (PCRE2). This avoids needing sudo
> to install Nginx system-wide.

## Architecture

```
                    ┌─────────────────────────────────────┐
                    │           Nginx (SSL)               │
                    │                                     │
  HTTPS ────► 8000 │──► Serve dist/ (production build)   │
  HTTPS ────► 8001 │──► Proxy to Vite :5173 (dev)        │
                    └─────────────────────────────────────┘

  Port 8000: Production build (requires npm run build first)
  Port 8001: Development server proxy (requires npm run dev)
```

## Quick Start

```bash
# 1. Build Nginx from source (no sudo required)
./scripts/build-nginx.sh

# 2. Generate SSL certificates (self-signed)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/nginx.key \
  -out nginx/ssl/nginx.crt \
  -subj "/C=US/ST=State/L=City/O=UFC2026/CN=localhost"

# 3. Set secure permissions on private key
chmod 600 nginx/ssl/nginx.key
chmod 644 nginx/ssl/nginx.crt

# 4. Build production assets
npm run build

# 5. Start dev server (in separate terminal)
npm run dev

# 6. Start Nginx
./nginx/start.sh
```

## SSL Certificate Generation

### Self-Signed Certificate (Development/Local)

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/nginx.key \
  -out nginx/ssl/nginx.crt \
  -subj "/C=US/ST=State/L=City/O=UFC2026/CN=localhost"
```

### Let's Encrypt (Production)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate (requires domain pointing to server)
sudo certbot --nginx -d yourdomain.com
```

## Nginx Commands

| Command | Description |
|---------|-------------|
| `./nginx/start.sh` | Start Nginx with UFC frontend config |
| `./nginx/stop.sh` | Stop Nginx |
| `./nginx/start.sh` | Reload config (after changes) |
| `./vendor/nginx/sbin/nginx -t -c nginx/ufc-frontend.conf` | Test configuration syntax |

## Port Configuration

| Port | Service | SSL | Purpose |
|------|---------|-----|---------|
| 8000 | Nginx | Yes | Production build (dist/) |
| 8001 | Nginx | Yes | Proxy to Vite dev server |
| 5173 | Vite | No | Dev server (default) |

### Changing Ports

Edit `nginx/ufc-frontend.conf`:
- Change `listen 8000 ssl;` and `listen 8001 ssl;` to desired ports
- Update port references in documentation

## Directory Structure

```
ufc-2026-frontend/
├── nginx/
│   ├── ufc-frontend.conf   # Nginx configuration
│   ├── start.sh            # Startup script
│   ├── stop.sh             # Stop script
│   └── ssl/
│       ├── nginx.crt       # SSL certificate
│       └── nginx.key       # SSL private key
├── vendor/nginx/            # Locally-built Nginx (gitignored)
│   └── sbin/nginx
├── scripts/
│   └── build-nginx.sh      # Build script for Nginx from source
├── dist/                   # Production build output
│   ├── index.html
│   └── assets/
└── docs/
    └── BUILD_SSL_NGINX.md  # This file
```

## Vite Configuration (Optional)

The default Vite dev server port is 5173. If you need to change it:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    port: 5173,  // Change if needed, update nginx proxy_pass accordingly
  },
})
```

## Security Notes

- Self-signed certificates will trigger browser warnings
- To trust the certificate locally:
  - **Chrome**: Visit `chrome://flags/#allow-insecure-localhost` or click "Advanced" → "Proceed to localhost"
  - **Firefox**: Click "Advanced" → "Accept the Risk and Continue"

- For production, always use Let's Encrypt or a proper CA certificate

## Troubleshooting

### Nginx won't start

```bash
# Check if port is already in use
lsof -i :8000
lsof -i :8001

# Test configuration
./vendor/nginx/sbin/nginx -t -c nginx/ufc-frontend.conf
```

### Port 8001 shows "Bad Gateway"

- Ensure Vite dev server is running: `npm run dev`
- Check Vite is on port 5173: `lsof -i :5173`

### SSL certificate errors

- Ensure certificate and key paths are correct in nginx config
- Check file permissions (key should be 600, cert 644)

### Nginx not built

```bash
# If vendor/nginx doesn't exist, run:
./scripts/build-nginx.sh
```

## Extracting Configuration for Other Servers

To deploy on a different machine:

1. Copy the `nginx/` directory
2. Copy the `scripts/build-nginx.sh` for building Nginx
3. Copy the `dist/` directory (or rebuild with `npm run build`)
4. Copy `docs/BUILD_SSL_NGINX.md` for reference
5. Run `./scripts/build-nginx.sh` to build Nginx from source
6. Generate SSL certificates
7. Adjust paths in `nginx/ufc-frontend.conf` for new environment
