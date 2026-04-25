# UI Component Library Specification

## Overview

The `src/components/ui/` directory contains Vue 3 components organized into three architectural tiers. This document defines the classification, conventions, and design patterns for all UI components.

---

## Component Tiers

### Atomic Tier

Pure UI primitives with single responsibilities. No external dependencies, business logic, or complex state management.

**Characteristics:**
- Single visual or behavioral purpose
- Simple prop interfaces (primitive types or plain objects)
- No side effects or state mutations
- No animation orchestration

**Examples:**
- `TypewriterText.vue` - Character-by-character text animation
- `ChatBubble.vue` - Message bubble rendering with type-based styling

### Business Tier

Domain-specific components that manage complex state, coordinate animations, and handle application logic.

**Characteristics:**
- Domain-specific responsibility (checklists, confirmations, progress)
- State management and event emission
- Animation orchestration via `start()` method
- May coordinate child components

**Examples:**
- `ConfirmationList.vue` - Animated label-value pair display
- `ChecklistCard.vue` - Interactive checklist with toggle state
- `ProgressCard.vue` - Progress visualization with percentage
- `ConfirmButton.vue` - Animated confirmation button

### Layout Tier

Structural components that provide page organization, navigation, and composition.

**Characteristics:**
- Navigation and routing concerns
- Page-level composition
- Router dependencies

**Examples:**
- `AppHeader.vue` - Page header with back navigation
- `NavPath.vue` - Breadcrumb navigation path

---

## Animatable Interface

Components that perform animations implement the `Animatable` interface:

```typescript
interface Animatable {
  start(): Promise<void>
}
```

**Contract:**
- `start()` triggers the animation sequence
- Returns a `Promise<void>` that resolves when all animations complete
- Components initialize in a non-visible state and transition when `start()` is called

**Implementation Status:**

| Component | start() | Notes |
|-----------|---------|-------|
| TypewriterText | Yes | Sequential character animation |
| ConfirmationList | Yes | Sequential label-value animation |
| ConfirmButton | Yes | Fade-in with translateY |

---

## Prop Interface Conventions

### Atomic Components

```typescript
interface Props {
  // Direct value props
  content: string
  type: 'bot' | 'user'

  // Optional configuration
  showAvatar?: boolean
  animationDuration?: { min: number; max: number }
}
```

- Use `withDefaults(defineProps<Props>(), {...})` for optional props
- Keep prop surfaces minimal
- Avoid callback or event-emitting props

### Business Components

```typescript
interface Props {
  // Data props
  items: { label: string; value: string }[]

  // Optional configuration
  visible?: boolean
}

const emit = defineEmits<{
  (e: 'event', payload: PayloadType): void
}>()

// Expose animation control
defineExpose({
  start
})
```

- Define `Props` interface explicitly
- Use `defineEmits` for event emission
- Use `defineExpose` for animation control methods

### Layout Components

- Accept routing/navigation dependencies
- Use Vue Router composables for navigation

---

## Animation Control Patterns

### Sequential Animation

For list items that animate sequentially (like ConfirmationList):

```typescript
const start = (): Promise<void> => {
  return new Promise((resolve) => {
    // Initialize state
    // Trigger fade-in
    // Start sequential animation
    const checkComplete = setInterval(() => {
      if (allItemsDone) {
        clearInterval(checkComplete)
        resolve()
      }
    }, 50)
  })
}
```

### Simple Fade Animation

For single-element animations (like ConfirmButton):

```typescript
const start = (): Promise<void> => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      isVisible.value = true
      setTimeout(() => resolve(), 250)
    })
  })
}
```

### Orchestration

Call `start()` on multiple components in sequence or parallel:

```typescript
// Sequential
await componentA.start()
await componentB.start()

// Parallel
await Promise.all([componentA.start(), componentB.start()])
```

---

## Design Tokens

Components use Material Design 3-inspired tokens:

```scss
$primary: #00606d;
$primary-container: #007b8b;
$secondary: #006a63;
$secondary-container: #8bf1e6;
$surface-container-highest: #e0e3e4;
$on-surface: #181c1d;
$on-surface-variant: #3e494b;
$outline: #6e797b;
```

---

## Future Component Checklist

When adding new components:

- [ ] Which tier does this component belong to?
- [ ] If animated, does it expose `start(): Promise<void>`?
- [ ] Does it follow the appropriate prop interface convention?
- [ ] Are design tokens used instead of hardcoded colors?
- [ ] Is the component's responsibility single and clear?
