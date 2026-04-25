## ADDED Requirements

### Requirement: Session Store Structure
The session store SHALL manage user authentication session state using Pinia Setup Store pattern.

#### Scenario: Session initialization
- **WHEN** the session store is created
- **THEN** `isAuthenticated` is set to `false`
- **AND** `user` is set to `null`
- **AND** `sessionToken` is set to `null`

#### Scenario: Session restoration from storage
- **WHEN** the session store initializes and valid session data exists
- **THEN** `isAuthenticated` MAY be restored to `true` if token is valid
- **AND** `user` MAY be restored from stored user data
- **AND** `sessionToken` MAY be restored if using token-based auth

### Requirement: Session Actions
The session store SHALL provide actions for managing authentication state.

#### Scenario: Login action
- **WHEN** `login(user: User, token: string)` action is called
- **THEN** `user` is set to the provided user object
- **AND** `sessionToken` is set to the provided token
- **AND** `isAuthenticated` is set to `true`

#### Scenario: Logout action
- **WHEN** `logout()` action is called
- **THEN** `user` is set to `null`
- **AND** `sessionToken` is set to `null`
- **AND** `isAuthenticated` is set to `false`
- **AND** session storage is cleared

#### Scenario: Update user profile
- **WHEN** `updateUser(updates: Partial<User>)` action is called
- **THEN** existing user data is merged with updates
- **AND** `user` reflects the updated profile

### Requirement: Session Getters
The session store SHALL provide getters for session state.

#### Scenario: Get user email
- **WHEN** `userEmail` getter is accessed
- **THEN** it returns the user's email or `null` if not authenticated

#### Scenario: Get user display name
- **WHEN** `displayName` getter is accessed
- **THEN** it returns the user's display name or `'Guest'` if not authenticated

#### Scenario: Check authentication status
- **WHEN** `isLoggedIn` getter is accessed
- **THEN** it returns `true` if authenticated, `false` otherwise

### Requirement: Session Persistence
The session store SHALL handle session data securely.

#### Scenario: Token persistence
- **WHEN** user logs in successfully
- **THEN** session token MAY be stored in sessionStorage (not localStorage)
- **AND** token is not persisted across browser restarts for security

#### Scenario: Guest mode
- **WHEN** user has not logged in
- **THEN** session state reflects guest/anonymous user
- **AND** no sensitive data is stored
