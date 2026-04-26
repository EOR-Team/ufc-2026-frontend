## ADDED Requirements

### Requirement: TriageChat SHALL send user condition descriptions to the backend triager API

The system SHALL forward user-inputted condition descriptions to the `/triager/collect_condition` endpoint for natural language processing.

#### Scenario: User submits condition description
- **WHEN** user types "I've had fever for 3 days with cough" and sends
- **THEN** the system SHALL POST to `/triager/collect_condition` with `{ "description_from_user": "I've had fever for 3 days with cough" }`
- **AND** the response SHALL contain structured condition data with `symptoms`, `duration`, and `severity`

#### Scenario: API returns error
- **WHEN** the `/triager/collect_condition` API returns an error
- **THEN** the system SHALL display an error message in the chat bubble
- **AND** the user SHALL be able to retry the message

### Requirement: TriageChat SHALL request clinic selection after condition confirmation

After the user confirms their condition, the system SHALL call `/triager/select_clinic` to determine the appropriate clinic.

#### Scenario: Request clinic selection after confirmation
- **WHEN** user confirms their condition via ConfirmButton
- **THEN** the system SHALL POST to `/triager/select_clinic` with body parts, duration, severity, and description
- **AND** the response SHALL contain `clinic_id` and `clinic_name`
- **AND** the system SHALL display the selected clinic with a NavPath component

#### Scenario: Clinic selection returns different clinic
- **WHEN** the `/triager/select_clinic` API returns a clinic different from default
- **THEN** the NavPath SHALL highlight the selected clinic as the destination

### Requirement: TriageChat SHALL support route patching based on user requirements

The system SHALL allow users to modify the navigation route by calling `/triager/patch_route`.

#### Scenario: User requests language requirement
- **WHEN** user says "I need a doctor who speaks English"
- **THEN** the system SHALL POST to `/triager/collect_requirement` with the user's requirement
- **AND** then SHALL call `/triager/patch_route` with the updated requirements

### Requirement: TriageChat SHALL handle loading states during API calls

The system SHALL provide visual feedback during API operations.

#### Scenario: API call in progress
- **WHEN** a triager API call is pending
- **THEN** the system SHALL display a "typing..." or loading indicator in the chat
- **AND** the ChatInput SHALL be disabled

#### Scenario: API call completes
- **WHEN** the API call completes successfully
- **THEN** the loading indicator SHALL be replaced with the bot response
- **AND** the ChatInput SHALL be re-enabled
