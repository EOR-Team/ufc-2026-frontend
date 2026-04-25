## ADDED Requirements

### Requirement: Homepage renders with correct layout and styling
The homepage SHALL display with pixel-perfect fidelity to the stitch-ui design at `stitch-ui/html/04-首页Home.html`, including correct colors, typography, spacing, and component structure.

#### Scenario: Desktop viewport shows header, content, and no bottom nav
- **WHEN** user views homepage on viewport ≥ 600px
- **THEN** page displays desktop header with navigation links
- **AND** main content area with welcome section and service cards
- **AND** no bottom navigation bar is visible

#### Scenario: Mobile viewport shows mobile header, content, and bottom nav
- **WHEN** user views homepage on viewport < 600px
- **THEN** page displays simplified mobile header with logo only
- **AND** main content area with welcome section and service cards
- **AND** bottom navigation bar is visible with 3 items (首页, 问诊, 我的)

### Requirement: Header displays with correct styling and behavior
The header SHALL display with the Clinical Sanctuary design system styling.

#### Scenario: Desktop header shows logo, nav links, and settings icon
- **WHEN** user is on desktop viewport
- **THEN** header shows "健康管家" logo in primary color (#00606d)
- **AND** navigation links: 首页 (active), 问诊, 健康, 我的 in muted color
- **AND** settings icon (gear) on the right side
- **AND** header has surface-container-low background with shadow

#### Scenario: Navigation link hover state
- **WHEN** user hovers over a navigation link
- **THEN** link background changes to surface-container-high
- **AND** transition duration is 300ms

#### Scenario: Active navigation link styling
- **WHEN** user is on the homepage
- **THEN** "首页" link displays in primary color (#00606d) instead of muted color
- **AND** link has subtle background highlight

### Requirement: Welcome section displays with correct typography
The welcome section SHALL display the headline in Manrope font at correct size.

#### Scenario: Welcome headline renders correctly
- **WHEN** homepage loads
- **THEN** headline "今天 AI 能为您提供什么帮助？" displays in Manrope font
- **AND** font size is 4rem (mobile) to 2.75rem (desktop) using responsive sizing
- **AND** font weight is bold (700)
- **AND** text color is on-surface (#181c1d)
- **AND** margin-bottom is 1rem (16px)

### Requirement: Service cards display with correct styling and interactions
The service cards SHALL display in a 2-column grid on desktop, single column on mobile, with hover effects.

#### Scenario: Service cards layout
- **WHEN** homepage loads
- **THEN** cards display in grid layout (2 columns on desktop, 1 column on mobile)
- **AND** gap between cards is 1.5rem (24px)
- **AND** card background is surface-container-low (#ebeeef)
- **AND** card border-radius is 1rem (16px)
- **AND** card padding is 2rem (32px)

#### Scenario: Service card content structure
- **WHEN** card is displayed
- **THEN** card contains circular icon container (64x64px) with secondary-container background
- **AND** icon inside uses material-symbols style (medical_services or health_and_safety)
- **AND** card title in Manrope font, 2xl size, bold
- **AND** card description in Inter font, lg size, on-surface-variant color

#### Scenario: Card hover effect
- **WHEN** user hovers over a card
- **THEN** card background transitions to surface-container-lowest
- **AND** transition duration is 300ms
- **AND** arrow button scales to 1.05x

#### Scenario: Card arrow button
- **WHEN** card is displayed
- **THEN** arrow button (48x48px) appears in bottom-right corner
- **AND** button has gradient background (primary to primary-container)
- **AND** icon is arrow_forward in white

### Requirement: Bottom navigation displays on mobile
The bottom navigation bar SHALL display only on mobile viewports.

#### Scenario: Bottom nav visible on mobile
- **WHEN** user is on mobile viewport (< 600px)
- **THEN** bottom nav bar is visible at bottom of screen
- **AND** bar has surface background with blur effect
- **AND** rounded top corners (2rem radius)
- **AND** shadow on top edge

#### Scenario: Bottom nav items
- **WHEN** bottom nav is visible
- **THEN** displays 3 items: 首页 (home_health icon), 问诊 (chat_bubble icon), 我的 (person icon)
- **AND** "首页" item has primary background with white text
- **AND** other items have muted text color
- **AND** icons use filled style for active, outlined for inactive

#### Scenario: Bottom nav item interaction
- **WHEN** user taps a bottom nav item
- **THEN** item scales down briefly (active:scale-90)
- **AND** transition duration is 300ms

### Requirement: Typography uses correct fonts
The page SHALL use the Clinical Sanctuary typography system.

#### Scenario: Font families applied
- **WHEN** homepage loads
- **THEN** headline text (h1, h2) uses Manrope font
- **AND** body text uses Inter font
- **AND** font-display is swap for performance

### Requirement: Colors match Clinical Sanctuary design
The page SHALL use exact color values from the Clinical Sanctuary design system.

#### Scenario: Color values verified
- **WHEN** homepage loads
- **THEN** primary color is #00606d
- **AND** secondary-container is #8bf1e6
- **AND** surface is #f7fafb
- **AND** surface-container-low is #f1f4f5
- **AND** surface-container is #ebeeef
- **AND** on-surface is #181c1d
- **AND** on-surface-variant is #3e494b
- **AND** background is #f7fafb
