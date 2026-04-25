## ADDED Requirements

### Requirement: Route Path Naming
Route paths SHALL use kebab-case (e.g., `/triage-chat`, `/recovery-chat`).

#### Scenario: Route path follows kebab-case
- **WHEN** a developer defines a new route
- **THEN** the path uses kebab-case with hyphen separators
- **AND** the path begins with a forward slash `/`

### Requirement: Route Naming
Route names SHALL use kebab-case matching their path (e.g., `triage-chat`).

#### Scenario: Route name matches path
- **WHEN** a developer defines a new route
- **THEN** the route name is identical to the path segment after `/`

### Requirement: Lazy Loading
All page components SHALL be lazy-loaded using dynamic imports.

#### Scenario: Page component is lazy-loaded
- **WHEN** Vue Router initializes
- **THEN** all page components use the pattern `() => import('@/pages/XXX.vue')`
- **AND** no page component is eagerly imported

### Requirement: Route Definition Structure
Route definitions SHALL include `path`, `name`, and `component` properties.

#### Scenario: Route has required properties
- **WHEN** a developer defines a route
- **THEN** the route includes `path` (string), `name` (string), and `component` (lazy import)
- **AND** the component path uses the `@/pages/` alias

### Requirement: Router Export
The router module SHALL export the router instance as the default export.

#### Scenario: Router is properly exported
- **WHEN** other modules import from `@/router`
- **THEN** they receive the configured Vue Router instance
