## Context

The project uses Vue 3 + Pinia for state management with a minimal settings store. The current `settings.ts` has only two boolean refs with localStorage sync via watch. As the app grows beyond triage chat features, we need a scalable store architecture.

**Current State:**
- `src/stores/settings.ts` - Basic store with no actions, no getters, just refs
- No centralized theme management (theme is in `plugins/vuetify.ts`)
- No session/user authentication state
- Manual localStorage handling without error boundaries

## Goals / Non-Goals

**Goals:**
- Typed store interfaces with proper TypeScript coverage
- Actions for state mutations instead of direct ref manipulation
- Getters for derived state
- Centralized persistence with hydration/dehydration support
- Store composition for cross-store access
- Centralized theme state synced with Vuetify

**Non-Goals:**
- Backend integration (API calls belong in services, not stores)
- Complex caching strategies (this is a frontend-only state management refactor)
- Authentication flow implementation (only session state, not auth logic)

## Decisions

### Decision 1: Store Structure Pattern

**Choice:** Actions + Getters pattern with Setup Stores

**Rationale:** Pinia's Setup Stores offer better TypeScript inference, smaller bundles, and composition capabilities. We will structure each store with:
- `state`: Reactive refs (internally)
- `getters`: Computed properties
- `actions`: Explicit mutation methods

**Alternative:** Options API stores were considered but Setup Stores offer better type inference with less boilerplate.

### Decision 2: Persistence Strategy

**Choice:** Pinia plugin with `persistedstate` pattern + manual hydration

**Rationale:** Instead of a 3rd-party library, implement a simple persistence middleware that:
- Saves specified stores to localStorage on change
- Hydrates stores on app initialization
- Handles parse errors gracefully with fallback defaults

**Alternative:** Using `pinia-plugin-persistedstate` was considered but adds a dependency for simple needs.

### Decision 3: Theme Store Architecture

**Choice:** Dedicated `themeStore` that owns `isDark` state and applies to Vuetify

**Rationale:** Theme is global UI state that affects all components. A dedicated store with `toggleTheme()` and `setTheme(theme)` actions provides a clear API. The Vuetify plugin subscribes to theme changes.

**Alternative:** Putting theme in settings store was rejected - theme is independent of user preferences like voice reading.

### Decision 4: Store Directory Structure

**Choice:**
```
src/stores/
├── index.ts           # Store registry and exports
├── settings.ts        # User preferences (online model, voice)
├── theme.ts           # Theme state (light/dark)
├── session.ts         # User session state
└── persistence.ts     # Persistence plugin
```

**Rationale:** Flat structure with single-responsibility stores. Index.ts provides unified access pattern.

## Risks / Trade-offs

- **Risk:** Multiple stores create coordination complexity
  - **Mitigation:** Store index.ts provides single import point; cross-store needs use composables

- **Risk:** localStorage has size limits (~5MB)
  - **Mitigation:** Only persist essential user preferences; session data stays in memory

- **Risk:** Hydration race conditions if stores are async
  - **Mitigation:** App mount waits for store hydration before rendering

## Open Questions

1. Should we use `sessionStorage` for session store instead of memory?
2. Do we need store devtools integration for debugging?
