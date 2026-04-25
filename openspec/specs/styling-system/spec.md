# styling-system Specification

## Purpose
TBD - created by archiving change styling-system. Update Purpose after archive.
## Requirements
### Requirement: Components use CSS custom properties from design tokens

All UI components in `src/components/ui/*.vue` SHALL use CSS custom properties from `src/styles/tokens.scss` instead of local SCSS variable definitions for colors, shadows, and transitions.

### Requirement: Token mapping consistency

Components SHALL use the following CSS custom property mappings:

| SCSS Variable | CSS Custom Property |
|----------------|---------------------|
| `$primary` | `var(--color-primary)` |
| `$primary-container` | `var(--color-primary-container)` |
| `$secondary-container` | `var(--color-secondary-container)` |
| `$secondary` | `var(--color-secondary)` |
| `$surface-container-highest` | `var(--color-surface-container-highest)` |
| `$surface-container-high` | `var(--color-surface-container-high)` |
| `$surface-container-lowest` | `var(--color-surface-container-lowest)` |
| `$on-surface` | `var(--color-on-surface)` |
| `$on-surface-variant` | `var(--color-on-surface-variant)` |
| `$on-primary` | `var(--color-on-primary)` |
| `$outline` | `var(--color-outline)` |
| `$background` | `var(--color-background)` |

Shadow tokens:
| SCSS Variable | CSS Custom Property |
|----------------|---------------------|
| `rgba($on-surface, 0.06)` | `var(--shadow-md)` |
| `rgba($on-surface, 0.08)` | `var(--shadow-lg)` |
| `rgba($on-surface, 0.12)` | `var(--shadow-xl)` |

### Requirement: Dark mode compatibility

Components SHALL render correctly in dark mode by consuming CSS custom properties that are overridden in `[data-theme="dark"]` within `tokens.scss`.

### Requirement: Gradients preserved

Components using linear gradients with SCSS variables SHALL convert to CSS custom properties while preserving the gradient direction and color stops.

#### Scenario: Gradient conversion
- **WHEN** a component uses `background: linear-gradient(135deg, $primary 0%, $primary-container 100%)`
- **THEN** it SHALL be converted to `background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-container) 100%)`

#### Scenario: Bot chat bubble renders in dark mode
- **WHEN** dark mode is active (`[data-theme="dark"]`)
- **AND** a bot chat bubble is displayed
- **THEN** it SHALL use `var(--color-surface-container-highest)` which resolves to `#3e4647` in dark mode

#### Scenario: User chat bubble renders in dark mode
- **WHEN** dark mode is active
- **AND** a user chat bubble is displayed
- **THEN** it SHALL use `var(--color-primary)` which resolves to `#8bf1e6` in dark mode

#### Scenario: Confirm button renders in dark mode
- **WHEN** dark mode is active
- **AND** a confirm button is displayed
- **THEN** it SHALL use `var(--color-primary)` for gradient which resolves to `#8bf1e6` in dark mode

