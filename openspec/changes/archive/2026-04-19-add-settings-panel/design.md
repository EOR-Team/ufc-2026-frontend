## Context

Settings page for AI triage assistant. Based on stitch-ui HTML design using Clinical Sanctuary design tokens. Uses Vue 3 + Vuetify 3 + SCSS.

## Goals / Non-Goals

**Goals:**
- 100% visual replication of stitch-ui settings design
- Two setting toggles: online model and voice reading
- Fixed header with back navigation
- Mobile-first responsive design

**Non-Goals:**
- No backend API integration (localStorage for now)
- No user authentication required

## Decisions

1. **Route: `/settings`**
   - Consistent with other pages in the application
   - Accessible from header settings icon on main pages

2. **Toggle Switch Implementation**
   - Pure CSS toggle using Vuetify's v-switch or custom CSS
   - Based on peer-checked pattern from original HTML
   - Binds to localStorage for persistence

3. **Section Cards**
   - Each setting in a card with hover effect
   - Icon + title + description layout
   - Toggle aligned to right side

## Risks / Trade-offs

- Pure client-side state is simple but not synced across devices
- Future: could integrate with user preferences API
