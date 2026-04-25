## 1. Migrate ChatBubble.vue to CSS Custom Properties

- [x] 1.1 Remove local SCSS variables ($primary, $primary-container, $secondary-container, $secondary, $surface-container-highest, $on-surface, $on-primary)
- [x] 1.2 Replace color references with var(--color-*) format
- [x] 1.3 Replace rgba($on-surface, 0.06) with var(--shadow-md)
- [x] 1.4 Verify gradient syntax works with CSS custom properties

## 2. Migrate ChatInput.vue to CSS Custom Properties

- [x] 2.1 Remove local SCSS variables ($primary, $primary-container, $surface-container-high, $on-surface, $on-surface-variant, $on-primary, $outline, $background)
- [x] 2.2 Replace color references with var(--color-*) format
- [x] 2.3 Replace rgba($on-surface, 0.06/0.08/0.12) with appropriate var(--shadow-*) tokens

## 3. Migrate AppHeader.vue to CSS Custom Properties

- [x] 3.1 Remove local SCSS variables ($primary, $surface-container-low, $on-surface)
- [x] 3.2 Replace color references with var(--color-*) format
- [x] 3.3 Replace rgba($on-surface, 0.06) with var(--shadow-md)
- [x] 3.4 Note: background uses rgba(#f7fafb, 0.8) - kept as rgba(var(--color-surface), 0.8) for backdrop effect

## 4. Migrate NavPath.vue to CSS Custom Properties

- [x] 4.1 Remove local SCSS variables ($primary, $secondary, $on-surface, $on-surface-variant, $outline)
- [x] 4.2 Replace color references with var(--color-*) format

## 5. Migrate ProgressCard.vue to CSS Custom Properties

- [x] 5.1 Remove local SCSS variables ($primary, $surface-container-lowest, $on-surface, $surface-container-high, $outline)
- [x] 5.2 Replace color references with var(--color-*) format
- [x] 5.3 Replace rgba($on-surface, 0.06/0.08) with var(--shadow-md/lg)

## 6. Migrate ChecklistCard.vue to CSS Custom Properties

- [x] 6.1 Remove local SCSS variables ($secondary, $surface-container-low, $surface-container, $surface-container-lowest, $on-surface, $on-surface-variant, $outline, $error)
- [x] 6.2 Replace color references with var(--color-*) format
- [x] 6.3 Replace rgba($outline, 0.15) with rgba(var(--color-outline), 0.15)
- [x] 6.4 Replace rgba($on-surface, 0.06/0.08) with var(--shadow-md/lg)

## 7. Migrate ConfirmationList.vue to CSS Custom Properties

- [x] 7.1 Remove local SCSS variables ($primary, $primary-container, $secondary-container, $on-surface, $on-surface-variant)
- [x] 7.2 Replace color references with var(--color-*) format
- [x] 7.3 Replace rgba($on-surface, 0.08) with rgba(var(--color-on-surface), 0.08)

## 8. Migrate ConfirmButton.vue to CSS Custom Properties

- [x] 8.1 Remove local SCSS variables ($primary, $primary-container, $on-primary, $on-surface)
- [x] 8.2 Replace color references with var(--color-*) format
- [x] 8.3 Replace rgba($on-surface, 0.08/0.12) with var(--shadow-md/lg)

## 9. Migrate TypewriterText.vue to CSS Custom Properties

- [x] 9.1 Remove local SCSS variable ($on-surface)
- [x] 9.2 Replace color reference with var(--color-on-surface)
- [x] 9.3 Note: JS hardcoded color was unused - removed the unused $onSurface variable

## 10. Verification

- [x] 10.1 Run dev server and verify all components render correctly
- [x] 10.2 Test dark mode toggle and verify all components respond to theme changes
- [x] 10.3 Check browser console for any CSS custom property warnings
