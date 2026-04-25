## ADDED Requirements

### Requirement: Design token colors
The system SHALL provide design token colors matching the Stitch "Ethereal Precision" clinical sanctuary palette.

#### Scenario: Light mode primary colors
- **WHEN** components render in light mode
- **THEN** they use primary color #00606d, primary container #007b8b, secondary container #8bf1e6

#### Scenario: Surface hierarchy colors
- **WHEN** components render surface backgrounds
- **THEN** they use surface (#f7fafb), surface-container-low (#f1f4f5), surface-container-lowest (#ffffff)

#### Scenario: Text colors
- **WHEN** components render text
- **THEN** they use on-surface (#181c1d) for primary text, on-surface-variant (#3e494b) for secondary text

### Requirement: Design token typography
The system SHALL provide typography tokens with Manrope for headlines and Inter for body text.

#### Scenario: Headline font
- **WHEN** headline elements (h1, h2, h3) render
- **THEN** they use Manrope font family at appropriate weights (600, 700, 800)

#### Scenario: Body font
- **WHEN** body text renders
- **THEN** it uses Inter font family at weights 400, 500, 600

### Requirement: Design token spacing
The system SHALL provide spacing tokens following the design system's 8px base grid.

#### Scenario: Standard spacing
- **WHEN** spacing tokens are applied
- **THEN** they use multiples of 8px (4, 8, 16, 24, 32, 48px)

### Requirement: Design token border radius
The system SHALL provide border radius tokens following the design system.

#### Scenario: Border radius tokens
- **WHEN** border radius is applied
- **THEN** DEFAULT=16px (1rem), lg=32px (2rem), xl=48px (3rem), full=9999px
