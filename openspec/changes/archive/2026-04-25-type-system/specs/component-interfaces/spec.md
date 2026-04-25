## ADDED Requirements

### Requirement: ComponentExposed interfaces SHALL define component ref patterns

The system SHALL provide interfaces for component refs used in animation sequences.

#### Scenario: TypewriterText ref
- **WHEN** a TypewriterText component is used
- **THEN** it SHALL expose a `start()` method returning `Promise<void>`

#### Scenario: ConfirmationList ref
- **WHEN** a ConfirmationList component is used
- **THEN** it SHALL expose a `start()` method returning `Promise<void>`

#### Scenario: ConfirmButton ref
- **WHEN** a ConfirmButton component is used
- **THEN** it SHALL expose a `start()` method returning `Promise<void>`

### Requirement: ComponentRefs interface SHALL organize component refs by message index

The system SHALL provide a `ComponentRefs` interface grouping typewriters, confirmationList, and confirmButton refs.

#### Scenario: Grouping refs by message
- **WHEN** refs are set for a message index
- **THEN** they SHALL be stored in a Map with the message index as key

### Requirement: VisibilityState interface SHALL track component visibility

The system SHALL provide a `VisibilityState` interface with boolean flags for `confirmationList` and `confirmButton`.

#### Scenario: Initial visibility state
- **WHEN** a message is first displayed
- **THEN** all visibility flags SHALL be `false`

#### Scenario: Updated visibility state
- **WHEN** a component animation starts
- **THEN** the corresponding visibility flag SHALL be set to `true`
