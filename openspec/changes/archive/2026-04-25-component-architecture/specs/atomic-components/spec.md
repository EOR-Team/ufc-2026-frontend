## ADDED Requirements

### Requirement: Atomic Component Definition

Atomic components SHALL be pure UI primitives that focus on single visual/behavioral responsibilities without external dependencies or business logic.

#### Scenario: Single responsibility
- **WHEN** examining an atomic component
- **THEN** it SHALL have one clear purpose (e.g., text animation, chat bubble rendering)

#### Scenario: Simple prop interfaces
- **WHEN** defining props for an atomic component
- **THEN** props SHALL be primitive types or simple objects with clear defaults

### Requirement: Atomic Component Examples

The following existing components are classified as atomic:

#### Scenario: TypewriterText classification
- **WHEN** analyzing TypewriterText
- **THEN** it SHALL be classified atomic because it handles only text animation with configurable duration

#### Scenario: ChatBubble classification
- **WHEN** analyzing ChatBubble
- **THEN** it SHALL be classified atomic because it renders message bubbles with type-based styling
