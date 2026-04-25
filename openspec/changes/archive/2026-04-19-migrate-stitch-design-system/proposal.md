## Why

The Stitch AI project "医院智能对话助手" has a well-defined clinical sanctuary design system ("Ethereal Precision") with specific colors, typography, and spacing. Migrating this design system to the Vue frontend ensures UI consistency between design and implementation, eliminates design debt, and provides a professional medical AI interface aesthetic.

## What Changes

- Replace Vuetify's default Material Design 3 theme with custom clinical sanctuary theme
- Configure Tailwind CSS with Stitch design tokens (colors, border-radius, fonts)
- Create CSS custom properties for design tokens in `src/styles/`
- Update `vuetify.ts` plugin with new color palette and typography
- Add design token SCSS variables for consistent spacing and elevation
- Configure Vite to load Google Fonts (Manrope, Inter) for typography system

## Capabilities

### New Capabilities

- `design-system-tokens`: Core design tokens including colors, typography scale, spacing, and elevation based on the Stitch "Ethereal Precision" philosophy
- `hospital-ui-components`: Hospital-specific UI components (service cards, chat bubbles, bottom navigation) using design tokens
- `mobile-navigation`: Mobile-first bottom navigation with glassmorphism backdrop

### Modified Capabilities

- `frontend-scaffold`: Extend Vuetify integration to use custom theme instead of default MD3

## Impact

- **Design**: Complete redesign of UI with clinical sanctuary aesthetic
- **Styling**: Vuetify theme config, Tailwind extended theme, new SCSS token files
- **Dependencies**: Manrope and Inter Google Fonts added to index.html
- **Components**: All existing pages need style updates to match new design system
