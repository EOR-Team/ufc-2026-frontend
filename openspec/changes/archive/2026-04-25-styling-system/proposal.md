## Why

The project has a well-defined design token system in `tokens.scss` (CSS custom properties for colors, typography, spacing, shadows), but UI components are using local SCSS variables that duplicate these values. This creates maintenance inconsistencies - tokens like `$primary: #00606d` are defined locally in every component instead of consuming the centralized system.

## What Changes

- Migrate all UI components to consume CSS custom properties from `tokens.scss` instead of local SCSS variables
- Remove duplicate token definitions from component scoped styles
- Ensure dark mode support works consistently across all components
- Establish consistent shadow and transition values from the token system

## Capabilities

### New Capabilities

- `styling-system`: Centralize component styles to use CSS custom properties from `tokens.scss`

### Modified Capabilities

- (none)

## Impact

- **Files affected**: All component files in `src/components/ui/*.vue`
- **Design system**: `src/styles/tokens.scss` remains the single source of truth
- **Breaking changes**: None - purely internal refactoring for consistency
