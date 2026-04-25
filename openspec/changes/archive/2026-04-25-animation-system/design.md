## Context

The TriageChat page (`src/pages/TriageChat.vue`) orchestrates sequential animations for bot messages using multiple animatable components. The current implementation follows a convention where each component exposes a `start()` method returning a `Promise<void>` that resolves when the animation completes. TriageChat calls these methods sequentially via `playAnimationSequence()`.

**Existing components:**
- `TypewriterText.vue` — character-by-character fade-in text
- `ConfirmationList.vue` — sequential item reveal with label/value typewriter
- `ConfirmButton.vue` — fade-in with translateY transform

**Animation trigger flow:**
```
onMounted → playAnimationSequence(0) → typewriter.start() → wait 100ms → confirmationList.start() → ...
```

The `interaction_tech_specs.md` contains detailed technical specifications but is not structured as formal OpenSpec capability specs.

## Goals / Non-Goals

**Goals:**
- Formalize the `AnimatableComponent` interface pattern as the standard for all animated components
- Create OpenSpec capability specs for each animation type
- Document the orchestration contract between TriageChat and child components
- Validate existing implementations against formal specs

**Non-Goals:**
- Modifying existing component implementations (this is a documentation/formalization effort)
- Adding new animation types beyond what currently exists
- Implementing the animations themselves — they already work

## Decisions

### 1. Standardize `AnimatableComponent` interface

**Decision:** Every animatable component must expose a typed `start(): Promise<void>` method via `defineExpose()`.

**Rationale:** TriageChat's `playAnimationSequence()` expects all animated components to resolve when their animation completes. The Promise-based interface allows sequential await without callbacks or event listeners. The current implementations already follow this pattern.

**Alternatives considered:**
- Callback-based (`onComplete` prop): Callback hell with nested callbacks; harder to compose
- Event-based (`@complete` emit): Requires the parent to listen and manage state; more ceremony
- `async/await` with `Animation` Web API: Browser support is good but adds complexity for simple fade effects

### 2. `visible` prop for space-taking components

**Decision:** Components like `ConfirmationList` and `ConfirmButton` use a `visible` prop to control `v-if` rendering. Animation begins only after the component is visible.

**Rationale:** Animating an invisible element (opacity: 0, no space) differs from animating a visible element. Using `v-if` ensures the component does not occupy DOM space before animation, preventing layout shift. The current `ConfirmationList` and `ConfirmButton` already implement this via `visible` prop + `v-if`.

**Alternatives considered:**
- `opacity: 0` without `v-if`: Component still occupies space — causes layout shift
- CSS `visibility: hidden`: Still occupies space; awkward to animate out

### 3. 100ms inter-block delay between animations

**Decision:** `playAnimationSequence()` waits 100ms between calling each component's `start()` method.

**Rationale:** Provides a perceptual gap between sequential animations, making the sequence feel deliberate rather than a rapid fire of effects. This is hardcoded in the current implementation.

**Alternatives considered:**
- No delay: Too abrupt; animations feel like they pile on top of each other
- Longer delay (200-300ms): Slower than necessary for simple sequential reveals

## Risks / Trade-offs

- [Risk] `interaction_tech_specs.md` becomes stale after formalization → **Mitigation**: Mark it as legacy and redirect future docs to OpenSpec specs
- [Risk] Formal specs may reveal gaps between documented and actual behavior → **Mitigation**: This is a documentation-only change; implementation is assumed correct unless a bug is found
- [Risk] Adding `NavPath` spec when component may not exist yet → **Mitigation**: Include it as a forward-looking spec; it can be marked `status: planned` until implemented

## Open Questions

1. Should `Highlight` inline text be its own capability spec, or folded into `typewriter-animation` since it uses the same mechanism?
2. Is there a need for an `AnimationController` utility that encapsulates the 100ms delay pattern, or is `playAnimationSequence()` sufficient as a one-off orchestrator?
