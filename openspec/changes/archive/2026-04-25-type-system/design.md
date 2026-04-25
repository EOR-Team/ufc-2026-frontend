## Context

The project uses Vue 3 + TypeScript + Vite. Currently, TypeScript types are scattered:

- `src/env.d.ts` - Vite environment types (adequate)
- `src/shims-vue.d.ts` - Vue module shims (adequate)
- Inline types in `TriageChat.vue` - `Message`, `ContentBlock`, component refs

The inline types in `.vue` files are not reusable across components, difficult to discover, and mix domain types with component implementation details.

## Goals / Non-Goals

**Goals:**
- Create `src/types/` directory with organized type files
- Extract chat/triage domain types to `src/types/chat.ts`
- Extract component interface types to `src/types/components.ts`
- Maintain backward compatibility with existing code

**Non-Goals:**
- Adding runtime validation (Zod schemas)
- Changing component implementation logic
- Creating a full type-checking infrastructure

## Decisions

### 1. Directory Structure

**Decision:** Create `src/types/` with the following structure:
```
src/types/
├── chat.ts      # Message, ContentBlock, TriageMessage
└── components.ts # ComponentExposed interfaces
```

**Rationale:** Simple, flat structure suitable for a small project. Types are grouped by domain (chat) rather than technical category (interfaces vs types).

### 2. Type Naming Conventions

**Decision:** Use descriptive names with domain prefixes:
- `ChatMessage` instead of `Message` (avoids collision with other Message types)
- `ContentBlock` remains (already descriptive and scoped to chat)
- `ConfirmationListExposed` (already has component-specific naming)

**Rationale:** Prevents naming collisions in larger codebase while keeping names readable.

### 3. Keep env.d.ts and shims-vue.d.ts As-Is

**Decision:** These files are already properly structured for Vite + Vue projects.

**Rationale:** No value in refactoring working infrastructure code.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Import path changes break existing code | Use path alias `~/types/` for clean imports |
| Type conflicts with existing inline types | Rename types with domain prefix (e.g., `ChatMessage`) |
| Migration requires updating multiple files | Provide clear import instructions in documentation |

## Open Questions

- Should we use `interface` or `type` for object shapes? (Use `interface` for extensibility as per project TypeScript conventions)
- Do component ref types belong in `components.ts` or in component files? (Centralize in `components.ts` for shared patterns)
