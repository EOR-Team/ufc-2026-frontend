## Why

The current state management implementation is minimal and ad-hoc. The `settings.ts` store has only two boolean settings with localStorage persistence, but lacks proper type safety, actions, and a scalable architecture. As the application grows, we need a robust state management layer that handles complex state, persistence strategies, and cross-store coordination.

## What Changes

- Add typed settings store with actions for settings mutations
- Add theme store for centralized theme management
- Add user session store for authentication state
- Implement proper Pinia store architecture with getters and actions
- Add persistence middleware for automatic state hydration/rehydration
- Create store registry for cross-store access

## Capabilities

### New Capabilities
- `settings-store`: Typed settings store with actions, getters, and automatic localStorage sync
- `theme-store`: Centralized theme management with light/dark mode support
- `session-store`: User authentication session state management
- `store-persistence`: Middleware for automatic state persistence with hydration
- `store-architecture`: Standardized store structure with actions/getters pattern

### Modified Capabilities
- `frontend-scaffold`: Pinia integration already exists; this enhances the store architecture pattern

## Impact

- **Stores**: New `src/stores/` structure with typed stores
- **Plugins**: New persistence plugin for Pinia
- **Types**: Shared TypeScript interfaces in `src/types/stores/`
