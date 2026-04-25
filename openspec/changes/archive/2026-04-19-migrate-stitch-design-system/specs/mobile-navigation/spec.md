## ADDED Requirements

### Requirement: Bottom navigation bar (mobile only)
The system SHALL provide a fixed bottom navigation bar visible only on mobile viewports.

#### Scenario: Bottom nav visibility
- **WHEN** viewport width is less than md (768px)
- **THEN** bottom navigation bar is visible
- **AND** positioned fixed at bottom of viewport

#### Scenario: Bottom nav hidden on desktop
- **WHEN** viewport width is md or greater
- **THEN** bottom navigation bar is hidden

### Requirement: Bottom navigation items
The system SHALL provide three navigation items: Home, Consultation (问诊), Profile (我的).

#### Scenario: Navigation items structure
- **WHEN** bottom nav renders
- **THEN** it contains three items: 首页, 问诊, 我的
- **AND** each item has icon and label

#### Scenario: Active navigation item
- **WHEN** user is on home page
- **THEN** home item shows active state with bg-primary (#00606d) and white text
- **AND** other items show inactive state with on-surface-variant (#3e494b) text

### Requirement: Bottom nav glassmorphism styling
The system SHALL style the bottom navigation with glassmorphism effects.

#### Scenario: Bottom nav backdrop
- **WHEN** bottom nav renders
- **THEN** it uses backdrop-blur-2xl
- **AND** bg-surface (#f7fafb) at 90% opacity
- **AND** rounded-t-[2rem] (32px) top corners
- **AND** shadow at top edge using outline-variant at 15% opacity

### Requirement: Navigation item interaction
The system SHALL provide tactile feedback on navigation item tap.

#### Scenario: Item tap feedback
- **WHEN** user taps navigation item
- **THEN** item scales to 0.9 (active:scale-90)
- **AND** transition duration is 300ms
