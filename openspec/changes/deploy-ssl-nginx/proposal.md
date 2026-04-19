## Why

The UFC 2026 frontend application needs a production-ready SSL-enabled Nginx deployment configuration. This enables secure HTTPS access with a reverse proxy that serves the built application on port 8000 and forwards development server traffic on port 8001. Documenting this setup ensures reproducibility for future deployments.

## What Changes

- Add Nginx configuration with SSL support for serving production build
- Configure port 8000 to serve the built static assets from `dist/`
- Configure port 8001 to forward to the Vite dev server (`npm run dev`)
- Add SSL certificate configuration (self-signed or Let's Encrypt)
- Create comprehensive deployment documentation at `docs/BUILD_SSL_NGINX.md`

## Capabilities

### New Capabilities

- `ssl-nginx-deployment`: Full Nginx + SSL deployment configuration for serving Vue production build and proxying dev server
- `dev-server-proxy`: Reverse proxy configuration to forward port 8001 to Vite dev server

### Modified Capabilities

<!-- No existing capabilities are being modified -->

## Impact

- New files: Nginx site configuration, SSL certificate paths, documentation
- Build output (`dist/`) will be served via Nginx on port 8000
- Dev workflow: `npm run dev` remains unchanged; accessed via port 8001 through Nginx proxy
- No changes to application source code
