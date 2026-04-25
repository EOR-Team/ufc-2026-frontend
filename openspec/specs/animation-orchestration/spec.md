# animation-orchestration Specification

## Purpose
TBD - created by archiving change animation-system. Update Purpose after archive.
## Requirements
### Requirement: Centralized animation coordination
The system SHALL use a single orchestrator function (`playAnimationSequence`) to coordinate sequential playback of all animated components within a bot message.

#### Scenario: Animation sequence plays in content order
- **WHEN** `playAnimationSequence()` is called for a message
- **THEN** each content block's `start()` method is awaited in the order they appear in `message.content`

#### Scenario: 100ms delay between content blocks
- **WHEN** one content block's animation completes
- **THEN** the next content block's animation begins after a 100ms delay

### Requirement: Component refs registration
The orchestrator SHALL maintain a map of component refs keyed by message index so that `start()` can be called on the correct component instances.

#### Scenario: Refs are registered when components mount
- **WHEN** an animated component mounts
- **THEN** it registers itself with its parent via a template ref callback

#### Scenario: Refs map is keyed by message index
- **WHEN** components for message N register
- **THEN** they are stored under the key N in the `componentRefsMap`

### Requirement: Visibility state management
The orchestrator SHALL manage a `visibilityMap` that controls when `ConfirmationList` and `ConfirmButton` components are allowed to render.

#### Scenario: Components are hidden until animation begins
- **WHEN** `playAnimationSequence()` starts
- **THEN** the visibility state for that message index is initialized with `confirmationList: false` and `confirmButton: false`

#### Scenario: Components become visible before animation starts
- **WHEN** the orchestrator reaches a confirmation-list block
- **THEN** visibility state is set to `confirmationList: true` before calling `confirmationList.start()`

#### Scenario: Components remain hidden if no animation triggered
- **WHEN** a message has a confirmation-list but `playAnimationSequence()` is not called
- **THEN** the confirmation-list remains invisible (hidden by `v-if` via `visible` prop)

### Requirement: Animation state tracking
The orchestrator SHALL track whether an animation sequence is currently in progress using an `isAnimating` state variable.

#### Scenario: isAnimating is true during animation sequence
- **WHEN** `playAnimationSequence()` begins
- **THEN** `isAnimating` is set to `true`

#### Scenario: isAnimating is false after animation completes
- **WHEN** `playAnimationSequence()` finishes all content blocks
- **THEN** `isAnimating` is set to `false`

#### Scenario: User input blocked during animation
- **WHEN** `isAnimating` is `true`
- **THEN** the `sendMessage` handler returns early without processing the input

### Requirement: Message 1 auto-plays on page load
The system SHALL automatically trigger the animation sequence for Message 1 when the page mounts.

#### Scenario: Page load triggers Message 1 animation
- **WHEN** the TriageChat component mounts
- **THEN** `playAnimationSequence(0)` is called after `nextTick()` to ensure DOM is ready

### Requirement: User input triggers next message animation
The system SHALL trigger the animation sequence for the next bot message when the user sends a message.

#### Scenario: User message causes next bot message to animate
- **WHEN** the user sends a message
- **THEN** the next bot message is added to `displayedMessages`
- **AND** `playAnimationSequence()` is called for the new message index

### Requirement: AnimatableComponent interface contract
All animated components SHALL conform to the `AnimatableComponent` interface.

#### Scenario: Components expose start() returning Promise<void>
- **WHEN** an animated component is created
- **THEN** it MUST expose a `start(): Promise<void>` method via `defineExpose()`

#### Scenario: start() resolves when animation completes
- **WHEN** `start()` is called on any animatable component
- **THEN** the returned Promise resolves only when the animation has fully completed

