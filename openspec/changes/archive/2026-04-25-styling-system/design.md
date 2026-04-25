## Context

The project uses Vue 3 with scoped SCSS styles. Design tokens are defined in `src/styles/tokens.scss` as CSS custom properties (variables) in `:root` and `[data-theme="dark"]` blocks. However, each component defines local SCSS variables (e.g., `$primary: #00606d`) instead of consuming the centralized tokens.

**Current State:**
- `src/styles/tokens.scss` - CSS custom properties for colors, typography, spacing, shadows, transitions
- `src/styles/main.scss` - Global base styles
- Components in `src/components/ui/*.vue` - Use local SCSS variables duplicating tokens

**Affected Components:**
- `AppHeader.vue`
- `ChatInput.vue`
- `ChatBubble.vue`
- `NavPath.vue`
- `ProgressCard.vue`
- `ChecklistCard.vue`
- `ConfirmationList.vue`
- `ConfirmButton.vue`
- `TypewriterText.vue`

## Goals / Non-Goals

**Goals:**
- Migrate all UI components to use CSS custom properties from `tokens.scss`
- Remove duplicate SCSS variable definitions from component scoped styles
- Ensure dark mode support works consistently via the existing `[data-theme="dark"]` token overrides

**Non-Goals:**
- Not changing any design tokens values themselves
- Not restructuring the component architecture
- Not adding new CSS custom properties
- Not changing any component logic or behavior

## Decisions

**Decision 1: Use CSS Custom Properties instead of SCSS variables**

SCSS variables (`$primary`) are compile-time constants. CSS custom properties (`var(--color-primary)`) are runtime variables that:
- Can be overridden by dark mode via `[data-theme="dark"]`
- Can be inspected in browser devtools
- Provide consistent cascade behavior

**Alternative considered:** Continue using SCSS variables with a shared `_variables.scss` import
- **Rejected**: SCSS variables don't respond to runtime theme changes (dark mode)

**Decision 2: Replace local SCSS variables with CSS custom properties**

Each component currently has local SCSS variables like:
```scss
$primary: #00606d;
$surface-container-highest: #e0e3e4;
```

These will be replaced with CSS custom property usage:
```scss
background: var(--color-surface-container-highest);
```

## Risks / Trade-offs

**[Risk]** Browser support for CSS custom properties
- **Mitigation**: CSS custom properties have 97%+ browser support. This is a modern Vue 3 project.

**[Risk]** SCSS color functions won't work with CSS custom properties
- **Mitigation**: The current code doesn't use SCSS color functions (like `darken($primary, 10%)`). It uses direct color values, so migration is straightforward.

## Migration Plan

1. For each component file:
   - Remove local SCSS variable definitions
   - Replace `$variable-name` with `var(--color-variable-name)`
   - Use exact mapping: `$primary` → `var(--color-primary)`, etc.
2. No token value changes - dark mode works via existing `[data-theme="dark"]` overrides
3. No rollback needed - SCSS variables are removed but design is unchanged
