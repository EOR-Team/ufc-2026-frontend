## Why

The current type system is fragmented with TypeScript interfaces defined inline within `.vue` files. Types like `Message`, `ContentBlock`, and component-exposed interfaces are not reusable, not discoverable, and tightly coupled to implementation details. Establishing a proper type architecture will improve type safety, code organization, and developer experience.

## What Changes

- Create a centralized `src/types/` directory for shared TypeScript interfaces
- Extract inline types from `.vue` files into dedicated `.ts` files
- Define a type hierarchy for chat/triage domain types
- Establish component-exposed interface patterns
- Add proper Vite environment variable types

## Capabilities

### New Capabilities

- `chat-types`: Shared TypeScript interfaces for chat messages, content blocks, and triage conversation state
- `component-interfaces`: Standardized interfaces for component refs and exposed methods
- `env-types`: Proper TypeScript types for environment variables and Vite config

### Modified Capabilities

- (none - new capabilities only)

## Impact

- **Code**: New `src/types/` directory with organized type files
- **Developer Experience**: Better IDE autocomplete, easier type imports, centralized type documentation
- **Architecture**: Clear separation between domain types and component types
