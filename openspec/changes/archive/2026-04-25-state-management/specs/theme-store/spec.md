## ADDED Requirements

### Requirement: Theme Store Structure
The theme store SHALL manage light/dark theme state using Pinia Setup Store pattern.

#### Scenario: Default theme initialization
- **WHEN** the theme store is created
- **THEN** `isDark` is set to `false` (light theme by default)
- **AND** `currentTheme` is set to `'light'`

#### Scenario: Theme state with system preference
- **WHEN** the theme store initializes
- **THEN** it MAY respect `prefers-color-scheme` if configured
- **AND** stored theme preference takes precedence over system preference

### Requirement: Theme Actions
The theme store SHALL provide actions for changing theme.

#### Scenario: Toggle theme
- **WHEN** `toggleTheme()` action is called
- **THEN** `isDark` toggles from `true` to `false` or `false` to `true`
- **AND** `currentTheme` updates accordingly

#### Scenario: Set light theme
- **WHEN** `setLightTheme()` action is called
- **THEN** `isDark` is set to `false`
- **AND** `currentTheme` is set to `'light'`

#### Scenario: Set dark theme
- **WHEN** `setDarkTheme()` action is called
- **THEN** `isDark` is set to `true`
- **AND** `currentTheme` is set to `'dark'`

#### Scenario: Set theme by name
- **WHEN** `setTheme(theme: 'light' | 'dark')` action is called
- **THEN** `isDark` is set to `true` if theme is `'dark'`, `false` otherwise
- **AND** `currentTheme` is set to the provided theme value

### Requirement: Theme Getters
The theme store SHALL provide getters for derived theme state.

#### Scenario: Get theme name
- **WHEN** `themeName` getter is accessed
- **THEN** it returns `'light'` or `'dark'` based on `isDark`

#### Scenario: Check if dark mode
- **WHEN** `isDarkMode` getter is accessed
- **THEN** it returns the current `isDark` value

### Requirement: Vuetify Integration
The theme store SHALL sync with Vuetify theme system.

#### Scenario: Apply theme to Vuetify
- **WHEN** theme state changes
- **THEN** Vuetify theme is updated to reflect the current theme
- **AND** All components respond to theme change

#### Scenario: Theme persistence
- **WHEN** theme changes
- **THEN** the preference is saved to localStorage under key `ufc-theme`
- **AND** On app restart, saved theme preference is restored
