## Context

The `src/components/ui/` directory contains 9 Vue 3 components with inconsistent architectural patterns. Components like `TypewriterText` (atomic, single responsibility) are mixed with `ConfirmationList` (business logic, animation orchestration). There is no documented convention for component classification, prop interfaces, or animation control.

## Goals / Non-Goals

**Goals:**
- Define clear component tier classification (atomic, business, layout)
- Standardize animation control via `start()` method pattern
- Document component design conventions in SPEC.md
- Create architectural guidance for future component development

**Non-Goals:**
- Refactoring existing components (no breaking changes)
- Creating new components
- Modifying component implementations
- Establishing cross-component state management

## Decisions

**1. Component Tier Classification**

Three tiers established:
- **Atomic**: Single responsibility UI primitives (TypewriterText, ChatBubble)
- **Business**: Domain-specific with state/animations (ConfirmationList, ChecklistCard, ProgressCard)
- **Layout**: Structural organization (AppHeader, NavPath)

Rationale: Provides immediate understanding of component scope and responsibilities without over-engineering.

**2. Animation Control Convention**

All animated components expose `start(): Promise<void>` method.

```typescript
interface Animatable {
  start(): Promise<void>
}
```

Rationale: Async pattern allows orchestration (sequential/parallel playback) and clear completion signaling. Alternative considered: callbacks (callback hell), event emitters (implicit flow), v-model (unnecessary complexity).

**3. Prop Interface Patterns**

- Atomic: Simple, typed props with clear defaults
- Business: Props interface defined with `interface Props`
- Layout: Props with router/ navigation dependencies

## Risks / Trade-offs

[Risk] Inconsistent adoption → Mitigation: Document in SPEC.md, enforce via code review checklist

[Risk] Over-engineering simple components → Mitigation: Three tiers only; atomic components can remain simple
