# typewriter-animation

## ADDED Requirements

### Requirement: Character-by-character fade-in animation
The system SHALL display text content using a character-by-character fade-in effect where each character transitions from opacity 0 to opacity 1.

#### Scenario: Single character fade-in completes
- **WHEN** the `start()` method is called
- **THEN** each character in `content` is added sequentially with a fade-in animation of 180ms duration

#### Scenario: Animation duration varies per character
- **WHEN** characters are being animated
- **THEN** each character's animation duration is a random value between 30ms and 45ms (inclusive)

#### Scenario: Empty content resolves immediately
- **WHEN** `content` is an empty string
- **THEN** `start()` resolves immediately without animation

#### Scenario: Animation emits completion signal
- **WHEN** the animation finishes displaying all characters
- **THEN** a `complete` event is emitted and the Promise returned by `start()` resolves

### Requirement: Exposed start() method
The component SHALL expose a `start()` method via `defineExpose()` that returns a `Promise<void>`.

#### Scenario: start() is called externally
- **WHEN** an external parent component calls the exposed `start()` method
- **THEN** the animation begins and the Promise resolves when all characters have been displayed

#### Scenario: Component does not auto-start on mount
- **WHEN** the component is mounted
- **THEN** no animation begins automatically; animation only starts when `start()` is called

### Requirement: Configurable animation speed
The component SHALL accept an `animationDuration` prop with `min` and `max` properties to configure character animation speed.

#### Scenario: Custom animation duration is applied
- **WHEN** `animationDuration` prop is provided with `{ min: 20, max: 30 }`
- **THEN** each character's animation duration is a random value between 20ms and 30ms

### Requirement: CSS-based fade-in implementation
The component SHALL use CSS `@keyframes` for the fade-in animation rather than JavaScript-driven opacity changes.

#### Scenario: Fade-in uses CSS animation
- **WHEN** a character is added to the display
- **THEN** it receives a `fade-in` class that triggers a CSS animation from opacity 0 to opacity 1
