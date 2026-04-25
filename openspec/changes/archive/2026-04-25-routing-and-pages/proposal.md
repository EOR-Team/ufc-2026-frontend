## Why

The UFC 2026 frontend application has a basic routing structure established, but several routes have placeholder or incomplete implementations. The `About.vue` page is a minimal stub, and there's no formal specification documenting the routing architecture and page responsibilities. This creates ambiguity about the purpose and scope of each route.

## What Changes

- Document the existing routing structure and page responsibilities
- Formally specify route definitions, naming conventions, and navigation patterns
- Update the `About` page from placeholder stub to meaningful content
- Establish routing conventions for future pages (lazy loading, naming, path structure)
- Document the relationship between routes and the design system

## Capabilities

### New Capabilities

- `routing-conventions`: Document conventions for route definitions, naming patterns, lazy loading strategy, and navigation patterns across the application
- `about-page`: Replace placeholder About page with meaningful content about the UFC 2026 health assistant application

### Modified Capabilities

- `frontend-scaffold`: The existing Vue Router Configuration requirement covers basic routing but does not specify conventions for route naming, path structure, or lazy loading strategy. This proposal extends those requirements with documented conventions.

## Impact

- **Code**: `src/router/index.ts`, `src/pages/*.vue`, `src/App.vue`
- **Documentation**: New routing conventions specification, About page content
- **Dependencies**: No new dependencies required
