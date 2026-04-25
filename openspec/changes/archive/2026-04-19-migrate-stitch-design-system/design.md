## Context

The Stitch project defines a "clinical sanctuary" design system ("Ethereal Precision") for a hospital AI assistant. The Vue frontend currently uses default Vuetify Material Design 3 theme, disconnected from the Stitch designs. This design bridges that gap by:

- Defining design tokens for colors, typography, spacing, and elevation
- Configuring Vuetify with the custom "Healing Blues" palette
- Setting up Tailwind with Stitch color tokens for utility classes
- Creating CSS custom properties for runtime theme access

**Current State**: Default Vuetify MD3 theme with generic colors (#1976D2 primary)
**Target State**: Custom clinical sanctuary theme (Primary: #00606d)

## Goals / Non-Goals

**Goals:**
- Provide complete design token system matching Stitch "Ethereal Precision" aesthetic
- Enable Tailwind utility classes with design token colors
- Support both light/dark mode via Vuetify theme system
- Minimize duplication between Vuetify config and Tailwind config

**Non-Goals:**
- Rebuilding all pages (that's a subsequent change)
- Adding new component libraries
- Changing routing or state management architecture

## Decisions

### Decision 1: Dual-Token Architecture (Vuetify + Tailwind)

**Choice**: Maintain design tokens in both Vuetify config and Tailwind config, with CSS custom properties as the source of truth.

**Rationale**: Vuetify components use internal theme system; Tailwind utilities need direct token access. CSS custom properties bridge both.

**Alternatives**:
- Single source with JS token objects → Requires runtime resolution complexity
- CSS variables only → Vuetify doesn't auto-consume CSS variables for theme

### Decision 2: Tailwind Extended Theme over CSS Variables

**Choice**: Extend Tailwind config with Stitch colors as direct values.

**Rationale**: Tailwind JIT mode compiles unused tokens; direct values are more performant than CSS variable lookups.

**Alternatives**:
- CSS variable approach → Slight perf overhead, more complex setup
- PostCSS plugin → Adds build complexity for marginal benefit

### Decision 3: Keep Existing Vuetify Theme Structure

**Choice**: Extend existing `vuetify.ts` theme config rather than replacing entirely.

**Rationale**: Vuetify's theme system is already wired to components. Adding custom colors is additive, not destructive.

## Risks / Trade-offs

[Risk] Design system divergence → **Mitigation**: Central token documentation in `src/styles/tokens.scss`

[Risk] Dark mode colors not specified in Stitch designs → **Mitigation**: Create dark mode palette based on Stitch "dark" class colors in HTML (#181c1d surface)

[Risk] Font loading performance → **Mitigation**: Use `display=swap` and preload only essential weights

## Migration Plan

1. Add Google Fonts link to `index.html`
2. Create `src/styles/tokens.scss` with CSS custom properties
3. Update `vite.config.ts` to add Tailwind extended theme with Stitch colors
4. Update `src/plugins/vuetify.ts` with custom color palette
5. Verify pages still render correctly with new theme
6. Test both light/dark mode toggles

## Open Questions

- Should we keep Vuetify's default MD3 components or override with custom styled versions?
- Do we need to support dynamic theme switching at runtime, or just build-time light/dark?
