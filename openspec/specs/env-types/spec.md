# env-types Specification

## Purpose
TBD - created by archiving change type-system. Update Purpose after archive.
## Requirements
### Requirement: ImportMetaEnv interface SHALL define Vite environment variables

The system SHALL extend Vite's `ImportMetaEnv` interface with project-specific environment variables.

#### Scenario: Accessing app title
- **WHEN** code accesses `import.meta.env.VITE_APP_TITLE`
- **THEN** it SHALL be typed as `string` and readonly

### Requirement: Vue module declaration SHALL support Vue single-file components

The system SHALL provide a module declaration for `*.vue` files with proper Vue component typing.

#### Scenario: Importing Vue component
- **WHEN** a `.vue` file is imported in TypeScript
- **THEN** it SHALL be typed as `DefineComponent<{}, {}, any>`

