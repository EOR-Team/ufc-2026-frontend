## Why

The UI component library lacks clear architectural boundaries between atomic primitives, business components, and layout components. This creates inconsistency in component design patterns, animation control conventions, and prop interfaces. The codebase would benefit from explicit component classification with documented conventions.

## What Changes

- Establish component tier classification (atomic, business, layout)
- Define prop interface conventions for each tier
- Standardize animation control via `start()` method pattern
- Document component design patterns in SPEC.md
- Create component health checklist for future development

## Capabilities

### New Capabilities

- `component-taxonomy`: Defines component classification tiers with clear responsibilities and boundaries for UI components
- `atomic-components`: Pure UI primitives (TypewriterText, ChatBubble) with simple props and no external dependencies
- `business-components`: Domain-specific components (ConfirmationList, ChecklistCard, ProgressCard) with complex state and animations
- `animation-control-convention`: Standardized `start()` method pattern for animation triggering across components

## Impact

- `/src/components/ui/*.vue` - Reorganized documentation and SPEC.md per component category
- No breaking changes to existing component implementations
- Future components will follow new conventions
