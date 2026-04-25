## Context

The Stitch UI HTML file `03-智能导诊导航流程.html` contains a complete mockup of the triage chat interface. The goal is 100% replication to Vue 3 with Vuetify while maintaining exact visual fidelity.

## Goals / Non-Goals

**Goals:**
- 100% visual replication of the triage chat interface from Stitch UI HTML
- Vue 3 Composition API with `<script setup>`
- Vuetify 3 components where applicable
- Tailwind CSS 4 for layout utilities (matching the HTML approach)
- SCSS for design tokens (matching existing project patterns)

**Non-Goals:**
- Backend integration (mock data only for this implementation)
- Real chat functionality (UI only)
- Dark mode support (light mode only)

## Decisions

1. **Direct HTML-to-Vue port** vs **redesign for Vue idioms**
   - Decision: Direct port, preserving exact class names, structure, and visual styling
   - Rationale: User explicitly requested "原封不动的搬运" (100% faithful port)

2. **Vuetify vs pure Tailwind**
   - Decision: Hybrid - use Vuetify for interactive elements (buttons, inputs), Tailwind for layout
   - Rationale: Project uses Vuetify globally, but the chat UI has very specific styling that's easier in Tailwind

3. **SCSS tokens matching Clinical Sanctuary palette**
   - Decision: Reuse existing `$primary`, `$secondary-container`, etc. from HomePage.vue
   - Rationale: Consistent with existing design system

## Risks / Trade-offs

- **Risk**: Tailwind + Vuetify in same component may cause style conflicts
  - **Mitigation**: Use scoped styles, Tailwind classes for layout, SCSS for precise color values

- **Risk**: Material Symbols Outlined requires CDN
  - **Mitigation**: Project already loads `@mdi/font` via Vuetify, use equivalent MDI icons instead
