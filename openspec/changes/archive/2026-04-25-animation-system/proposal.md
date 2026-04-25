## Why

The TriageChat page implements a sophisticated sequential animation system for bot messages, but the animation patterns and component interfaces are documented only in `interaction_tech_specs.md` — a plain markdown file with no formal spec structure. This makes it difficult to reason about animation capabilities as a coherent system, track changes, or extend the system with new animatable components.

## What Changes

- Create formal OpenSpec specs for the animation system with structured requirements
- Document the `AnimatableComponent` interface pattern
- Specify animation behavior for TypewriterText, ConfirmationList, ConfirmButton, NavPath, and Highlight components
- Create implementation tasks to validate the specs against current behavior

## Capabilities

### New Capabilities

- `typewriter-animation`: Character-by-character fade-in text animation with configurable speed (30-45ms per character), exposing a `start()` method that returns a Promise resolving when animation completes
- `confirmation-list-animation`: Sequential item reveal animation combining fade-in (250ms) with per-character typewriter effect for labels and values, exposing `start()` method
- `confirm-button-animation`: Fade-in animation (250ms) with translateY transform, exposing `start()` method
- `nav-path-animation`: Sequential path node reveal with fade-in and typewriter effects, exposing `start()` method
- `animation-orchestration`: Centralized orchestration pattern where TriageChat coordinates sequential playback of multiple animatable components via `playAnimationSequence()`

### Modified Capabilities

- (none — this is a net-new formalization)

## Impact

- **Files**: `interaction_tech_specs.md` will be superseded by formal specs under `openspec/specs/`
- **Components**: TypewriterText, ConfirmationList, ConfirmButton, and any future NavPath — all currently expose `start()` but lack formal interface definition
- **Orchestration**: TriageChat's `playAnimationSequence()` is the central coordinator; this pattern should be formally specified
