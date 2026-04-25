## ADDED Requirements

### Requirement: ChatMessage type SHALL define the structure for chat messages

The system SHALL provide a `ChatMessage` TypeScript interface with `type` and `content` properties.

#### Scenario: Bot message structure
- **WHEN** a bot message is created
- **THEN** it SHALL have `type: 'bot'` and `content` as an array of ContentBlocks

#### Scenario: User message structure
- **WHEN** a user message is created
- **THEN** it SHALL have `type: 'user'` and `content` as an array containing only strings

### Requirement: ContentBlock type SHALL support multiple content types

The system SHALL provide a `ContentBlock` union type supporting string content and structured blocks.

#### Scenario: String content block
- **WHEN** a message contains plain text
- **THEN** it SHALL be represented as a plain string in the content array

#### Scenario: Confirmation list block
- **WHEN** a message contains a confirmation list
- **THEN** it SHALL be an object with `type: 'confirmation-list'` and `items` array containing `{ label: string; value: string }`

#### Scenario: Confirm button block
- **WHEN** a message contains a confirmation action
- **THEN** it SHALL be an object with `type: 'confirm-button'`
