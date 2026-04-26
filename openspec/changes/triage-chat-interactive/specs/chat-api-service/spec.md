## ADDED Requirements

### Requirement: API service SHALL provide typed interfaces for all triager endpoints

The system SHALL provide TypeScript interfaces matching the API request/response shapes.

#### Scenario: Interface for collect_condition
- **WHEN** the API service is used
- **THEN** there SHALL be a `CollectConditionRequest` interface with `description_from_user: string`
- **AND** a `CollectConditionResponse` interface with `structured_condition: { symptoms: string[]; duration: string; severity: string }`

#### Scenario: Interface for select_clinic
- **WHEN** the API service is used
- **THEN** there SHALL be a `SelectClinicRequest` interface with body parts, duration, severity, description, and other_relevant_info
- **AND** a `SelectClinicResponse` interface with `clinic_id: string` and `clinic_name: string`

### Requirement: API service SHALL use consistent error handling

All API calls SHALL catch errors and return a consistent error shape.

#### Scenario: API call fails with network error
- **WHEN** an API call fails due to network issues
- **THEN** the service SHALL return `{ success: false, error: string }`
- **AND** the error message SHALL be user-friendly (not raw network message)

#### Scenario: API call fails with server error
- **WHEN** an API call returns a non-2xx status
- **THEN** the service SHALL return `{ success: false, error: "Server error" }`
- **AND** SHALL log the full error for debugging

### Requirement: API service SHALL use the base URL from environment configuration

The system SHALL read the backend API URL from environment variables.

#### Scenario: Base URL configuration
- **WHEN** the API service makes a request
- **THEN** the base URL SHALL be read from `import.meta.env.VITE_API_BASE_URL`
- **OR** default to `http://localhost:8000` if not set

### Requirement: API responses SHALL be validated before returning

The service SHALL validate API responses match expected shapes.

#### Scenario: Response validation passes
- **WHEN** API returns a valid response matching the expected interface
- **THEN** the service SHALL return the typed response to the caller

#### Scenario: Response validation fails
- **WHEN** API returns unexpected data structure
- **THEN** the service SHALL return `{ success: false, error: "Invalid response from server" }`
- **AND** SHALL log the unexpected response for debugging
