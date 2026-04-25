## ADDED Requirements

### Requirement: Service card component
The system SHALL provide service cards with clinical sanctuary styling for navigation to major features.

#### Scenario: Service card renders with surface-container-low background
- **WHEN** service card renders
- **THEN** it uses bg-surface-container-low (#f1f4f5) background
- **AND** rounded-xl (16px) border radius

#### Scenario: Service card icon container
- **WHEN** service card renders icon
- **THEN** icon is inside circular bg-secondary-container (#8bf1e6) with 64x64px dimensions

#### Scenario: Service card hover state
- **WHEN** user hovers over service card
- **THEN** background shifts to surface-container-lowest (#ffffff)
- **AND** transition duration is 300ms

### Requirement: Chat bubble component
The system SHALL provide chat bubbles following clinical sanctuary styling.

#### Scenario: AI response bubble
- **WHEN** AI response bubble renders
- **THEN** it uses bg-surface-container-highest (#e0e3e4)
- **AND** max-width of 80%
- **AND** rounded corners: DEFAULT (16px) except bottom-left is 8px

#### Scenario: User input bubble
- **WHEN** user input bubble renders
- **THEN** it uses bg-primary (#00606d)
- **AND** text color is on-primary (#ffffff)
- **AND** max-width of 70%
- **AND** rounded corners: DEFAULT (16px) except bottom-right is 8px

### Requirement: Primary button gradient
The system SHALL provide primary buttons with the signature 135-degree gradient.

#### Scenario: Primary button gradient
- **WHEN** primary button renders
- **THEN** it uses linear-gradient from primary (#00606d) to primary-container (#007b8b) at 135 degrees
- **AND** rounded-full (9999px) border radius

### Requirement: Glassmorphism navigation bar
The system SHALL provide navigation bars with glassmorphism effect.

#### Scenario: Navigation bar backdrop
- **WHEN** navigation bar renders
- **THEN** it uses backdrop-blur-lg (20px blur)
- **AND** semi-transparent background with bg-surface at 80% opacity
- **AND** subtle shadow with 40px blur and 6% opacity using on-surface color
