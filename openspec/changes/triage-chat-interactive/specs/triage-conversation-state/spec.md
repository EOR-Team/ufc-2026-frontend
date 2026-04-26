## ADDED Requirements

### Requirement: Conversation state SHALL track the current phase of the triage flow

The system SHALL maintain a state machine with distinct phases for the triage conversation.

#### Scenario: Initial state on page load
- **WHEN** user navigates to TriageChat page
- **THEN** the conversation state SHALL be `COLLECTING_CONDITION`
- **AND** the bot SHALL display a greeting message requesting symptom description

#### Scenario: Transition to confirming condition
- **WHEN** user submits a condition description and API responds
- **THEN** the state SHALL transition to `CONFIRMING_CONDITION`
- **AND** the bot SHALL display a ConfirmationList with parsed symptoms

#### Scenario: Transition to selecting clinic
- **WHEN** user confirms the condition via ConfirmButton
- **THEN** the state SHALL transition to `SELECTING_CLINIC`
- **AND** the system SHALL call the clinic selection API

#### Scenario: Transition to confirming route
- **WHEN** clinic is selected and nav path is displayed
- **THEN** the state SHALL transition to `CONFIRMING_ROUTE`
- **AND** user SHALL be able to request route modifications

#### Scenario: Transition to navigating
- **WHEN** user confirms the route
- **THEN** the state SHALL transition to `NAVIGATING`
- **AND** the final navigation path SHALL be displayed

### Requirement: State transitions SHALL be explicit and logged in development mode

The system SHALL provide debug logging for state transitions during development.

#### Scenario: State transition occurs
- **WHEN** a state transition is triggered
- **THEN** in development mode, the system SHALL log `[TriageState] {oldState} -> {newState}`
- **AND** the transition SHALL only occur if the transition is valid from the current state

### Requirement: Invalid state transitions SHALL be rejected

The system SHALL NOT allow transitions that violate the state machine rules.

#### Scenario: Attempting invalid transition
- **WHEN** user tries to confirm route while in `COLLECTING_CONDITION` state
- **THEN** the system SHALL ignore the confirm action
- **AND** in development mode, SHALL log a warning about invalid transition
