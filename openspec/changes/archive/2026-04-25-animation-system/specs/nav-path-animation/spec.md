# nav-path-animation

## ADDED Requirements

### Requirement: Path node sequential reveal
The system SHALL display navigation path nodes sequentially, where each node (and its connecting arrow) appears one at a time.

#### Scenario: Entire path container fades in first
- **WHEN** `start()` is called
- **THEN** the path container fades in over 250ms before individual nodes appear

#### Scenario: Nodes appear one at a time
- **WHEN** the container fade-in completes
- **THEN** each path node (and its arrow) appears sequentially, one unit at a time

### Requirement: Node content typewriter effect
The system SHALL display each path node's text using a typewriter effect before the connecting arrow fades in.

#### Scenario: Node text types in character by character
- **WHEN** a path node begins to appear
- **THEN** the node text appears using a typewriter effect

#### Scenario: Arrow fades in after node text completes
- **WHEN** the node text has fully appeared
- **THEN** the connecting arrow fades in

### Requirement: Highlighted nodes styled distinctly
The system SHALL apply a highlighted style (primary color, bold weight) to nodes specified in the `highlights` array.

#### Scenario: Highlighted nodes are visually distinct
- **WHEN** a node index is in the `highlights` array
- **THEN** that node displays with `color: $primary` and `font-weight: 500`

#### Scenario: Non-highlighted nodes use default styling
- **WHEN** a node index is not in the `highlights` array
- **THEN** that node displays with `color: $on-surface-variant`

### Requirement: Exposed start() method
The component SHALL expose a `start()` method via `defineExpose()` that returns a `Promise<void>` resolving when all nodes and arrows have been displayed.

#### Scenario: start() resolves when animation sequence completes
- **WHEN** the parent component calls `start()`
- **THEN** the Promise resolves only after all path nodes and arrows have finished their animations

### Requirement: Props interface
The component SHALL accept `route`, `steps`, and `highlights` props.

#### Scenario: Route string is parsed into steps
- **WHEN** `route` prop is provided (e.g., "入口+挂号处+急诊诊室")
- **THEN** it is parsed into an array of step strings by splitting on the `+` delimiter

#### Scenario: Steps array overrides parsed route
- **WHEN** both `route` and `steps` props are provided
- **THEN** `steps` takes precedence for rendering

#### Scenario: Highlights array marks nodes for special styling
- **WHEN** `highlights` is provided as `[0, 2, 5]`
- **THEN** nodes at indices 0, 2, and 5 are rendered with highlight styling
