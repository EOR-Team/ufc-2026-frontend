#!/bin/bash
# Nginx startup script for UFC 2026 Frontend
# Uses locally-built Nginx from vendor/nginx/

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
NGINX="$PROJECT_ROOT/vendor/nginx/sbin/nginx"
NGINX_CONF="$PROJECT_ROOT/nginx/ufc-frontend.conf"

# Check if nginx binary exists
if [ ! -f "$NGINX" ]; then
    echo "Error: Nginx binary not found at $NGINX"
    echo "Build Nginx first using: ./scripts/build-nginx.sh"
    exit 1
fi

# Check if SSL certificates exist
if [ ! -f "$SCRIPT_DIR/ssl/nginx.crt" ] || [ ! -f "$SCRIPT_DIR/ssl/nginx.key" ]; then
    echo "Error: SSL certificates not found in $SCRIPT_DIR/ssl/"
    echo "Generate with: openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx/ssl/nginx.key -out nginx/ssl/nginx.crt -subj \"/C=US/ST=State/L=City/O=UFC2026/CN=localhost\""
    exit 1
fi

# Test nginx configuration
echo "Testing Nginx configuration..."
$NGINX -t -c "$NGINX_CONF"

# Reload or start nginx
if pgrep -f "nginx.*$NGINX_CONF" > /dev/null; then
    echo "Reloading Nginx..."
    $NGINX -s reload -c "$NGINX_CONF"
else
    echo "Starting Nginx..."
    $NGINX -c "$NGINX_CONF"
fi

echo "Nginx started successfully"
echo "Production build: https://localhost:8000"
echo "Dev server proxy: https://localhost:8001 (requires Vite dev server running)"
