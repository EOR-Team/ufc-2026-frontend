## ADDED Requirements

### Requirement: Nginx serves production build on port 8000 with SSL

The system SHALL configure Nginx to serve static files from the `dist/` directory on port 8000 with SSL encryption enabled.

#### Scenario: Production build is served securely
- **WHEN** a user accesses `https://localhost:8000`
- **THEN** Nginx SHALL return the `dist/index.html` file
- **AND** all static assets (JS, CSS, images) SHALL be served from the `dist/` directory
- **AND** the connection SHALL use SSL encryption

#### Scenario: SPA routing works correctly
- **WHEN** a user navigates to `https://localhost:8000/sub-route`
- **THEN** Nginx SHALL serve `index.html` (SPA fallback)
- **AND** Vue Router SHALL handle the `/sub-route` client-side

#### Scenario: SSL certificate is configured
- **WHEN** Nginx starts on port 8000
- **THEN** Nginx SHALL use a valid SSL certificate
- **AND** Nginx SHALL use the corresponding private key

### Requirement: Port 8001 forwards to Vite dev server

The system SHALL configure Nginx to forward all requests on port 8001 to the Vite development server running on port 5173.

#### Scenario: Dev server is proxied through Nginx
- **WHEN** a user accesses `https://localhost:8001`
- **THEN** Nginx SHALL forward the request to `http://localhost:5173`
- **AND** the Vite dev server SHALL handle hot module replacement
- **AND** the response SHALL be returned through Nginx to the user

#### Scenario: Vite dev server handles API requests
- **WHEN** the Vue app makes a request to `/api` on port 8001
- **THEN** Nginx SHALL forward the request to the Vite dev server
- **AND** Vite's proxy configuration (if any) SHALL be respected
