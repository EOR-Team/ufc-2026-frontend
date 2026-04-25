# component-taxonomy Specification

## Purpose
TBD - created by archiving change component-architecture. Update Purpose after archive.
## Requirements
### Requirement: Component Tier Classification

The UI component library SHALL organize components into three distinct architectural tiers based on their responsibilities and complexity.

#### Scenario: Atomic tier classification
- **WHEN** a component has single responsibility, no external dependencies, and simple props
- **THEN** it SHALL be classified as atomic (e.g., TypewriterText, ChatBubble)

#### Scenario: Business tier classification
- **WHEN** a component manages domain-specific state, orchestrates animations, or coordinates child components
- **THEN** it SHALL be classified as business (e.g., ConfirmationList, ChecklistCard, ProgressCard)

#### Scenario: Layout tier classification
- **WHEN** a component provides structural organization, navigation, or page-level composition
- **THEN** it SHALL be classified as layout (e.g., AppHeader, NavPath)

### Requirement: Tier Documentation

Each component tier SHALL be documented with its responsibilities, examples, and design conventions.

#### Scenario: Atomic tier documentation
- **WHEN** reviewing atomic components
- **THEN** documentation SHALL clarify they are pure UI primitives with no business logic

#### Scenario: Business tier documentation
- **WHEN** reviewing business components
- **THEN** documentation SHALL clarify they handle domain logic and animation orchestration

#### Scenario: Layout tier documentation
- **WHEN** reviewing layout components
- **THEN** documentation SHALL clarify they provide structural/navigation concerns

