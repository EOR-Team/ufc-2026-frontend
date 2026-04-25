## ADDED Requirements

### Requirement: Triage Chat Interface Display
The system SHALL display a chat interface with bot and user messages, featuring avatar icons, message bubbles with rounded corners, and proper spacing between messages.

#### Scenario: Bot message displays with avatar
- **WHEN** bot sends a message
- **THEN** display message aligned left with secondary-container background avatar circle containing robot_2 icon

#### Scenario: User message displays right-aligned
- **WHEN** user sends a message
- **THEN** display message aligned right with primary background and on-primary text

#### Scenario: Message list scrolls independently
- **WHEN** messages exceed viewport height
- **THEN** scrollable area shall be above input area with pt-24 pb-32 padding

### Requirement: Chat Header
The system SHALL display a fixed header with back button, title "健康管家", and settings icon.

#### Scenario: Header renders correctly
- **WHEN** TriageChat page loads
- **THEN** header shows back arrow (arrow_back icon), center title, and settings icon
- **AND** header has backdrop-blur effect with semi-transparent background

### Requirement: Bottom Navigation Bar (Mobile Only)
The system SHALL display fixed bottom navigation with 首页, 聊天, and 我的 links when viewport is mobile-width.

#### Scenario: Bottom nav displays on mobile
- **WHEN** viewport width < 768px
- **THEN** show fixed bottom nav with rounded top corners and blur backdrop
- **AND** 聊天 tab shows active state (bg highlight)

### Requirement: Chat Input Area
The system SHALL display a sticky input area with text field and send button positioned above bottom navigation.

#### Scenario: Input area renders above nav
- **WHEN** TriageChat page loads
- **THEN** input area is fixed at bottom with gradient fade-out effect
- **AND** rounded-full container with surface-container-high background
- **AND** send button has gradient primary to primary-container styling

#### Scenario: Send button triggers message
- **WHEN** user types text and clicks send
- **THEN** user message appears in chat list

### Requirement: Hospital Navigation Path Display
The system SHALL display multi-step navigation path with arrow separators between waypoints.

#### Scenario: Path displays with highlights
- **WHEN** bot displays navigation path
- **THEN** show waypoint names separated by arrow_forward icons
- **AND** first/last waypoints show in primary color
- **AND** intermediate waypoints show in default color
- **AND** alternative waypoints (e.g., 洗手间) show in secondary color

### Requirement: Confirmation Actions
The system SHALL display inline confirmation buttons within bot messages when user confirmation is needed.

#### Scenario: Continue button displays in message
- **WHEN** bot requests confirmation to proceed
- **THEN** display rounded-full button with gradient background
- **AND** button text "继续" with arrow_forward icon
