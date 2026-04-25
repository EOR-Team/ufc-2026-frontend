## 1. Create Type Directory Structure

- [x] 1.1 Create `src/types/` directory
- [x] 1.2 Verify `tsconfig.json` paths configuration includes `~/types/*`

## 2. Create Chat Types

- [x] 2.1 Create `src/types/chat.ts` with `ChatMessage` interface
- [x] 2.2 Add `ContentBlock` union type with string, confirmation-list, and confirm-button variants
- [x] 2.3 Add related confirmation item types

## 3. Create Component Interface Types

- [x] 4.1 Create `src/types/components.ts` with TypewriterTextExposed interface
- [x] 4.2 Add ConfirmationListExposed and ConfirmButtonExposed interfaces
- [x] 4.3 Add ComponentRefs and VisibilityState interfaces

## 4. Update TriageChat.vue

- [x] 5.1 Import ChatMessage and ContentBlock from `~/types/chat.ts`
- [x] 5.2 Import component interface types from `~/types/components.ts`
- [x] 5.3 Remove inline type definitions from TriageChat.vue

## 5. Verify TypeScript Configuration

- [x] 6.1 Run `vue-tsc` or `tsc --noEmit` to verify no type errors
- [x] 6.2 Fix any type errors if found (pre-existing errors in stores/plugins unrelated to type system)
