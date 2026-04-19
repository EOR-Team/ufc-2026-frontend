#!/bin/bash
# Nginx stop script for UFC 2026 Frontend
# Uses locally-built Nginx from vendor/nginx/

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
NGINX="$PROJECT_ROOT/vendor/nginx/sbin/nginx"
NGINX_CONF="$PROJECT_ROOT/nginx/ufc-frontend.conf"

if pgrep -f "nginx.*$NGINX_CONF" > /dev/null; then
    echo "Stopping Nginx..."
    $NGINX -s stop -c "$NGINX_CONF" 2>/dev/null || pkill -f "nginx.*$NGINX_CONF"
    echo "Nginx stopped"
else
    echo "Nginx is not running"
fi
