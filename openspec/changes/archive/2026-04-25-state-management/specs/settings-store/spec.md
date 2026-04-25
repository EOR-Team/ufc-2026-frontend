## ADDED Requirements

### Requirement: Settings Store Structure
The settings store SHALL provide typed state management for user preferences using Pinia Setup Store pattern with actions and getters.

#### Scenario: Store initialization with defaults
- **WHEN** the settings store is first created
- **THEN** `useOnlineModel` is set to `true`
- **AND** `useVoiceReading` is set to `false`

#### Scenario: Store initialization with stored values
- **WHEN** the settings store is created and localStorage has saved values
- **THEN** stored values override defaults
- **AND** `useOnlineModel` reflects stored `useOnlineModel`
- **AND** `useVoiceReading` reflects stored `useVoiceReading`

### Requirement: Settings Actions
The settings store SHALL provide explicit actions for updating settings state.

#### Scenario: Toggle online model
- **WHEN** `toggleOnlineModel()` action is called
- **THEN** `useOnlineModel` toggles from `true` to `false` or `false` to `true`

#### Scenario: Set online model
- **WHEN** `setOnlineModel(value: boolean)` action is called
- **THEN** `useOnlineModel` is set to the provided value

#### Scenario: Toggle voice reading
- **WHEN** `toggleVoiceReading()` action is called
- **THEN** `useVoiceReading` toggles from `true` to `false` or `false` to `true`

#### Scenario: Set voice reading
- **WHEN** `setVoiceReading(value: boolean)` action is called
- **THEN** `useVoiceReading` is set to the provided value

### Requirement: Settings Getters
The settings store SHALL provide getters for derived state.

#### Scenario: Get online model status
- **WHEN** `isOnlineModelUsed` getter is accessed
- **THEN** it returns the current `useOnlineModel` value

#### Scenario: Get voice reading status
- **WHEN** `isVoiceReadingEnabled` getter is accessed
- **THEN** it returns the current `useVoiceReading` value

### Requirement: Settings Persistence
The settings store SHALL automatically persist to localStorage when state changes.

#### Scenario: Persist on change
- **WHEN** any settings state is modified via action
- **THEN** the entire settings object is saved to localStorage under key `ufc-settings`

#### Scenario: Handle parse errors
- **WHEN** localStorage contains invalid JSON for settings
- **THEN** the store initializes with defaults
- **AND** no error is thrown to the user

#### Scenario: Hydration on startup
- **WHEN** `loadFromStorage()` is called
- **THEN** it returns parsed settings from localStorage or empty object if none exist
