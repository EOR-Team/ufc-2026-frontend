## Context

The UFC 2026 frontend is a Vue 3 + Vite + Vuetify + TailwindCSS SPA. The deployment requires:

- Port **8000**: Serves production build (`dist/`) via Nginx with SSL
- Port **8001**: Proxies to Vite dev server running on its default port (5173)

This design enables both local development with hot-reload and production serving from the same machine with SSL encryption.

## Goals / Non-Goals

**Goals:**
- Serve production build on port 8000 with self-signed SSL
- Forward port 8001 to Vite dev server (port 5173)
- Create reusable documentation for future deployments
- No application code changes

**Non-Goals:**
- Let's Encrypt certificate provisioning (self-signed only for now)
- Docker containerization
- CI/CD pipeline integration

## Decisions

### 1. Self-signed SSL Certificates

**Decision:** Use self-signed certificates for immediate deployment
**Rationale:** No external dependency, works immediately, can be replaced with Let's Encrypt later
**Alternative:** Let's Encrypt (requires domain + public exposure)

### 2. Nginx Configuration Structure

**Decision:** Single Nginx config file with two `server` blocks
**Rationale:** Simple, single point of management, easy to understand
**Alternative:** Separate config files per port (overhead for simple setup)

### 3. Dev Server Proxy

**Decision:** Proxy pass from port 8001 to Vite on port 5173
**Rationale:** Vite's default dev port, avoids conflicting with production ports
**Alternative:** Run Vite on port 8001 directly (requires Vite config change)

### 4. SPA Routing

**Decision:** Use `try_files $uri $uri/ /index.html` for SPA routing
**Rationale:** Vue Router history mode requires server-side fallback to index.html
**Alternative:** Hash mode routing (SEO/unfriendly, not used)

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Self-signed SSL causes browser warnings | Document how to trust the cert, or use Let's Encrypt for production |
| Vite dev server must be running for port 8001 to work | Add health check or error page |
| Build output `dist/` must exist before Nginx starts | Add check in deployment script |

## Migration Plan

1. Generate SSL certificates
2. Install Nginx config
3. Test port 8000 serves `dist/` (or create it via `npm run build`)
4. Start Vite dev server in background
5. Test port 8001 proxies to dev server
6. Document full process in `docs/BUILD_SSL_NGINX.md`

## Open Questions

- Should the dev server proxy require authentication?
- Should we auto-generate certificates via Let's Encrypt in production?
