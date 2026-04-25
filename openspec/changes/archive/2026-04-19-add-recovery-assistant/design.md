## Context

The recovery assistant page replicates the stitch-ui HTML design (02-病后恢复建议助手.html) into Vue 3 Composition API with Vuetify. The design is a chat-based interface with custom recovery dashboard components embedded within AI message bubbles.

## Goals / Non-Goals

**Goals:**
- 100% visual replication of the stitch-ui design
- Vue 3 Composition API with `<script setup lang="ts">`
- Vuetify 3 components where applicable
- Clinical Sanctuary design tokens in SCSS

**Non-Goals:**
- Backend integration (mock data only)
- Real-time data sync with wearable devices
- Authentication flow changes

## Decisions

1. **Single Page Implementation**
   - All UI components in one `RecoveryChatPage.vue` file
   - Follows same pattern as existing `TriageChat.vue`

2. **CSS Toggle Switch for Checkboxes**
   - Use CSS `peer-checked` pattern for checklist items instead of Vuetify switch
   - Matches exact visual appearance from HTML design

3. **Header Pattern**
   - Reuse same fixed header with backdrop-blur pattern from TriageChat
   - Settings icon links to `/settings`

4. **Bottom Navigation**
   - Matches HomePage bottom nav styling
   - "聊天" tab active state

## Risks / Trade-offs

- **Risk**: Custom checkbox styling may not match Vuetify theme
  - **Mitigation**: Pure CSS implementation matching HTML exactly

- **Risk**: Progress bar animation
  - **Mitigation**: CSS `transition-all duration-1000 ease-out` on width property
