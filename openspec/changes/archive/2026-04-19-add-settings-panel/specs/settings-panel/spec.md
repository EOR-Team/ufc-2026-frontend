## ADDED Requirements

### Requirement: Settings Page Display
The system SHALL display a settings page with fixed header and scrollable content area.

#### Scenario: Settings page renders header
- **WHEN** user navigates to `/settings`
- **THEN** header shows back arrow (arrow_back icon), center title "通用设置"
- **AND** header has backdrop-blur effect with semi-transparent background

### Requirement: Model Settings Toggle
The system SHALL display a model settings toggle with icon, title, and description.

#### Scenario: Model settings displays correctly
- **WHEN** settings page loads
- **THEN** show "模型设置" section header
- **AND** display card with cloud_sync icon, "使用在线模型" title
- **AND** description text "开启后可获得最新的 AI 智能分析结果。"
- **AND** toggle switch on the right side

#### Scenario: Model toggle is interactive
- **WHEN** user toggles the model switch
- **THEN** toggle state changes visually
- **AND** preference is saved to localStorage

### Requirement: Voice Settings Toggle
The system SHALL display a voice settings toggle with icon, title, and description.

#### Scenario: Voice settings displays correctly
- **WHEN** settings page loads
- **THEN** show "语音设置" section header
- **AND** display card with record_voice_over icon, "使用语音朗读" title
- **AND** description text "自动朗读助手的回复内容。"
- **AND** toggle switch on the right side

#### Scenario: Voice toggle is interactive
- **WHEN** user toggles the voice switch
- **THEN** toggle state changes visually
- **AND** preference is saved to localStorage

### Requirement: Settings Card Hover Effect
The system SHALL display hover effects on settings cards.

#### Scenario: Card hover effect
- **WHEN** user hovers over a settings card
- **THEN** card background changes from surface-container-low to surface-container-lowest
- **AND** subtle shadow appears

### Requirement: Route Navigation
The system SHALL support navigation to settings page via route `/settings`.

#### Scenario: Settings route accessible
- **WHEN** user navigates to `/settings`
- **THEN** SettingsPage component renders
- **AND** back button returns to previous page
