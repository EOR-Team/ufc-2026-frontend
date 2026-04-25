## Why

The project has a completed homepage design in `stitch-ui/html/04-首页Home.html` that implements the "Clinical Sanctuary" design system. This design needs to be faithfully reproduced in Vue 3 + Vuetify to establish the production frontend.

## What Changes

- Replace current `src/pages/HomePage.vue` with the stitch-ui homepage design
- Implement responsive header with desktop navigation and mobile header
- Implement service cards section with hover effects and arrow buttons
- Implement mobile bottom navigation bar
- Apply exact color tokens from the design (primary #00606d, secondary-container #8bf1e6, etc.)
- Use exact typography: Manrope for headlines, Inter for body
- Use Material Symbols Outlined icons via Vuetify/MDI integration

## Capabilities

### New Capabilities

- `homepage`: Homepage page implementing the stitch-ui homepage design with full responsive behavior

### Modified Capabilities

- `design-tokens`: May need verification that all tokens from the HTML design exist in `src/styles/tokens.scss`

## Impact

- Files changed: `src/pages/HomePage.vue` (full replacement)
- Dependencies: Vuetify MDI icons, Tailwind CSS, design tokens
- No API changes
- Design system consistency with stitch-ui design
