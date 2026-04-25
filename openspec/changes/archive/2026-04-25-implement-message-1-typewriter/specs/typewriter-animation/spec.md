## ADDED Requirements

### Requirement: Character-by-character typewriter reveal
The system SHALL display text one character at a time with a randomized delay between 35-60ms per character to create an organic, human-like typing feel.

#### Scenario: Single character reveal
- **WHEN** the component receives text content
- **THEN** it SHALL reveal exactly one character at a time
- **AND** the delay between each character SHALL be a random value between 35ms and 60ms

#### Scenario: Chinese character support
- **WHEN** the text contains Chinese characters (e.g., "您好")
- **THEN** each Chinese character SHALL be measured with Canvas measureText using the same font specification
- **AND** the character SHALL be revealed after the width transition completes

---

### Requirement: Dynamic bubble width animation via scaleX (line 1 only)
The system SHALL animate bubble width dynamically during line 1 using scaleX transformation. The bubble width SHALL grow from minWidth (1 character) to maxWidth (80% of container) as characters are revealed.

#### Scenario: Width grows with each character on line 1
- **WHEN** characters are being revealed
- **AND** the current line has not reached maxWidth
- **THEN** before each character appears, the bubble width SHALL transition to accommodate that character
- **AND** the transition SHALL use scaleX transformation with overflow: hidden

#### Scenario: Width locks after line 1
- **WHEN** the text wraps to line 2
- **OR** line 1 reaches maxWidth
- **THEN** the scaleX value SHALL be locked at 1.0 (full width)
- **AND** no further width animation SHALL occur for subsequent characters

#### Scenario: GPU-accelerated rendering
- **WHEN** scaleX animation is running
- **THEN** the transform property SHALL be used (not width property)
- **AND** the animation SHALL NOT trigger layout reflow (only repaint)

---

### Requirement: Bubble height growth for subsequent lines
The system SHALL allow the bubble height to grow as text wraps to new lines, without any width animation.

#### Scenario: Height increases with each new line
- **WHEN** text wraps to a new line
- **THEN** the bubble container SHALL expand its height to accommodate the new line
- **AND** the width SHALL remain fixed at maxWidth

---

### Requirement: Responsive max-width calculation
The system SHALL calculate maxWidth as 80% of the parent container width, and SHALL recalculate when the viewport is resized.

#### Scenario: Initial max-width calculation
- **WHEN** the component mounts
- **THEN** maxWidth SHALL be calculated as `parentElement.offsetWidth * 0.8`

#### Scenario: Resize handling
- **WHEN** the window is resized
- **AND** the new maxWidth differs from the current by more than 10px
- **THEN** the component SHALL update maxWidth
- **AND** SHALL recalculate the current scaleX value

---

### Requirement: Character width measurement
The system SHALL measure each character's width individually using Canvas measureText API to determine the bubble width for each step.

#### Scenario: Chinese character width measurement
- **WHEN** measuring a Chinese character like "您"
- **THEN** the width SHALL be measured using `ctx.measureText("您").width`
- **AND** the font SHALL match the bubble's actual font (Inter 14px)

#### Scenario: Mixed content width
- **WHEN** text contains both Chinese and Latin characters (e.g., "Hello您好")
- **THEN** each character SHALL be measured individually
- **AND** the total width SHALL be the sum of all character widths

---

### Requirement: Animation lifecycle states
The system SHALL manage animation through distinct states: typing, width-transition, and done.

#### Scenario: Initial state
- **WHEN** the component starts
- **THEN** the state SHALL be "typing"
- **AND** displayedText SHALL be empty

#### Scenario: Animation completion
- **WHEN** all characters have been revealed
- **THEN** the state SHALL be "done"
- **AND** displayedText SHALL equal the full text content
- **AND** scaleX SHALL be 1.0
