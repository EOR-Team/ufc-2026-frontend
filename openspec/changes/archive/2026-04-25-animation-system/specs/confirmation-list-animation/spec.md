# confirmation-list-animation

## ADDED Requirements

### Requirement: Sequential item reveal animation
The system SHALL animate the reveal of each confirmation list item sequentially, where each item's label and value are displayed using a typewriter effect.

#### Scenario: Entire list fades in before typewriter begins
- **WHEN** `start()` is called
- **THEN** the entire list container fades in over 250ms before the typewriter animation begins

#### Scenario: Items animate one at a time in sequence
- **WHEN** the fade-in animation completes
- **THEN** each item is animated one at a time in the order they appear in the `items` array

### Requirement: Label typewriter animation
The system SHALL display each item's label character-by-character using a typewriter effect at 20ms per character.

#### Scenario: Label characters appear sequentially
- **WHEN** an item's label animation begins
- **THEN** each character of the label is added with 20ms delay between characters

#### Scenario: Label completes before value animation starts
- **WHEN** all characters of the label have been displayed
- **THEN** the value animation begins after a 150ms pause

### Requirement: Value typewriter animation
The system SHALL display each item's value character-by-character using a typewriter effect at 20ms per character.

#### Scenario: Value characters appear sequentially
- **WHEN** the label animation completes
- **THEN** each character of the value is added with 20ms delay between characters

#### Scenario: Pause between items
- **WHEN** an item's value animation completes
- **THEN** the next item begins after a 200ms pause

### Requirement: Exposed start() method
The component SHALL expose a `start()` method via `defineExpose()` that returns a `Promise<void>` resolving when all items have been fully displayed.

#### Scenario: start() resolves when all items complete
- **WHEN** the parent component calls `start()`
- **THEN** the Promise resolves only after all items (labels and values) have been fully animated

### Requirement: visible prop controls rendering
The component SHALL use a `visible` prop to control whether it renders in the DOM via `v-if`.

#### Scenario: Component does not render when visible is false
- **WHEN** `visible` is `false`
- **THEN** the component does not occupy DOM space

#### Scenario: Component renders when visible is true
- **WHEN** `visible` is `true`
- **THEN** the component renders and animation can begin when `start()` is called

### Requirement: Completion polling
The system SHALL use a polling mechanism to detect when all items have completed animation.

#### Scenario: Promise resolves when all items done
- **WHEN** `start()` is called
- **THEN** a polling interval checks every 50ms whether all items have `isLabelDone` and `isValueDone` set to true
- **AND** the Promise resolves when all items are done
