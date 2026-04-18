## 1. SSL Certificate Setup

- [x] 1.1 Generate self-signed SSL certificate and private key using OpenSSL
- [x] 1.2 Store certificates in `nginx/ssl/` directory
- [x] 1.3 Set appropriate file permissions (600 for private key)

## 2. Nginx Configuration

- [x] 2.1 Create Nginx config file with two server blocks (ports 8000 and 8001)
- [x] 2.2 Configure port 8000 to serve `dist/` static files with SSL
- [x] 2.3 Configure port 8001 to proxy to Vite dev server at `http://localhost:5173`
- [x] 2.4 Enable WebSocket proxy support for Vite HMR
- [x] 2.5 Add SPA routing fallback (`try_files $uri $uri/ /index.html`)
- [x] 2.6 Install Nginx config (via startup script, not system symlink)
- [x] 2.7 Test Nginx configuration syntax (`nginx -t`)

## 3. Build and Documentation

- [x] 3.1 Run `npm run build` to create production `dist/` directory
- [x] 3.2 Create `docs/BUILD_SSL_NGINX.md` with complete deployment guide
- [x] 3.3 Include certificate generation commands in documentation
- [x] 3.4 Document Nginx commands (start, stop, reload, test)

## 4. Verification

- [x] 4.1 Start Nginx and verify port 8000 serves the built application
- [x] 4.2 Start Vite dev server and verify port 8001 proxies correctly
- [x] 4.3 Test SPA routing from port 8000
- [x] 4.4 Verify SSL connection works (accept self-signed cert warning)
