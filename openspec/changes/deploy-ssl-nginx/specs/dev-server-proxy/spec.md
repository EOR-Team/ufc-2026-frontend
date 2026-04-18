## ADDED Requirements

### Requirement: Dev server proxy forwards WebSocket connections

The system SHALL forward WebSocket connections through the Nginx proxy to enable Vite HMR (Hot Module Replacement).

#### Scenario: WebSocket upgrade is proxied
- **WHEN** the Vite dev server initiates a WebSocket upgrade
- **THEN** Nginx SHALL forward the WebSocket upgrade headers
- **AND** the WebSocket connection SHALL be maintained between client and Vite

### Requirement: Proxy preserves original request headers

The system SHALL preserve the original Host header and other important headers when proxying requests to the Vite dev server.

#### Scenario: Host header is preserved
- **WHEN** a request is made to `https://localhost:8001`
- **THEN** Nginx SHALL forward the `Host: localhost:8001` header to Vite
- **AND** Vite SHALL see the original host, not `localhost:5173`
