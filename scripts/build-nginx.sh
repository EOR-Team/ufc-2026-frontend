#!/bin/bash
# Build Nginx from source for UFC 2026 Frontend
# This script downloads, builds, and installs Nginx to vendor/nginx/
# Run this once to set up the local Nginx build

set -e

NGINX_VERSION="1.30.0"
NGINX_URL="https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz"
PCRE2_VERSION="10.44"
PCRE2_URL="https://github.com/PCRE2Project/pcre2/releases/download/pcre2-${PCRE2_VERSION}/pcre2-${PCRE2_VERSION}.tar.gz"
BUILD_DIR="/tmp"
INSTALL_PREFIX="$(pwd)/vendor/nginx"

echo "=== Building Nginx ${NGINX_VERSION} from source ==="

# Create temp directory
TMP_DIR=$(mktemp -d)
cd "$TMP_DIR"

# Download and build PCRE2
echo ">> Downloading PCRE2 ${PCRE2_VERSION}..."
curl -LO "$PCRE2_URL"
tar -xzf "pcre2-${PCRE2_VERSION}.tar.gz"
cd "pcre2-${PCRE2_VERSION}"

echo ">> Configuring PCRE2..."
./configure --prefix="$TMP_DIR/pcre2-build" > /dev/null 2>&1

echo ">> Building PCRE2..."
make -j$(nproc) > /dev/null 2>&1

echo ">> Installing PCRE2..."
make install > /dev/null 2>&1

# Download and build Nginx
cd "$TMP_DIR"
echo ">> Downloading Nginx ${NGINX_VERSION}..."
curl -LO "$NGINX_URL"
tar -xzf "nginx-${NGINX_VERSION}.tar.gz"
cd "nginx-${NGINX_VERSION}"

echo ">> Configuring Nginx..."
./configure \
  --prefix="$INSTALL_PREFIX" \
  --with-http_ssl_module \
  --with-http_v2_module \
  --with-http_realip_module \
  --with-pcre="$TMP_DIR/pcre2-${PCRE2_VERSION}" \
  > /dev/null 2>&1

echo ">> Building Nginx..."
make -j$(nproc) > /dev/null 2>&1

echo ">> Installing Nginx..."
make install > /dev/null 2>&1

# Cleanup
cd /
rm -rf "$TMP_DIR"

echo ""
echo "=== Nginx built successfully ==="
echo "Binary: $INSTALL_PREFIX/sbin/nginx"
echo ""
echo "Next steps:"
echo "  1. Generate SSL: openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx/ssl/nginx.key -out nginx/ssl/nginx.crt -subj \"/C=US/ST=State/L=City/O=UFC2026/CN=localhost\""
echo "  2. Start Nginx: ./nginx/start.sh"
