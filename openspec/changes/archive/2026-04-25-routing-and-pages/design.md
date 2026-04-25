## Context

The UFC 2026 frontend uses Vue Router with lazy-loaded page components. The current router configuration (`src/router/index.ts`) defines five routes:

| Path | Name | Component |
|------|------|-----------|
| `/` | `home` | `HomePage.vue` |
| `/triage-chat` | `triage-chat` | `TriageChat.vue` |
| `/settings` | `settings` | `SettingsPage.vue` |
| `/recovery-chat` | `recovery-chat` | `RecoveryChatPage.vue` |
| `/about` | `about` | `About.vue` |

The `About.vue` page is a minimal placeholder. The routing structure follows Vue Router best practices (lazy loading via dynamic imports), but no formal conventions document exists.

## Goals / Non-Goals

**Goals:**
- Document routing conventions for path naming, route naming, and lazy loading patterns
- Define the About page purpose and content scope
- Establish a pattern for future page additions

**Non-Goals:**
- This is not a refactor of the existing router implementation (it already follows good patterns)
- No new route additions beyond the About page update
- No changes to authentication, guards, or route-level code splitting strategies

## Decisions

### Decision 1: Route Path Conventions

**Chosen:** kebab-case paths (e.g., `/triage-chat`, `/recovery-chat`)

**Rationale:** The existing codebase already uses kebab-case consistently. This matches Vue Router conventions and is readable.

**Alternatives considered:**
- camelCase (e.g., `/triageChat`): Less readable in URLs
- PascalCase (e.g., `/TriageChat`): Unusual for URLs

### Decision 2: Route Naming Conventions

**Chosen:** kebab-case route names (e.g., `triage-chat`, `recovery-chat`)

**Rationale:** Route names should match their path for consistency. Vue Router treats names as strings, so kebab-case is the most readable option.

### Decision 3: Lazy Loading Strategy

**Chosen:** All page components use dynamic imports (lazy loading)

**Rationale:** The codebase already follows this pattern. All routes use `() => import('@/pages/XXX.vue')` which provides automatic code splitting.

**Alternatives considered:**
- Eager loading: Would increase initial bundle size unnecessarily
- Route groups: Not needed given current page count

### Decision 4: About Page Content

**Chosen:** About page will contain:
- Application name and purpose ("健康管家" - Health Butler)
- Brief description of AI-powered medical consultation features
- Version or build information
- Credit/attribution section

**Rationale:** The existing placeholder provides no value. An About page for a medical assistant app should communicate trust and capability without overwhelming the user.

## Risks / Trade-offs

- [Risk] About page may need internationalization later → **Mitigation**: Keep content simple and text-based for easy translation
- [Risk] No formal route validation testing → **Mitigation**: Manual testing of each route is feasible given small route count

## Open Questions

- Should the About page link to any external resources (privacy policy, terms of service)?
- Is there a need for a `/profile` or `/history` route that isn't currently defined?
