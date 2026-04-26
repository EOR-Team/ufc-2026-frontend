## Context

The TriageChat page currently uses hardcoded message sequences (`botMessagesData`) to simulate a medical triage conversation. The conversation flows through 6 fixed bot messages, with user input only triggering pre-determined next steps.

The backend provides `/triager/*` API endpoints that can actually:
1. Parse user-described conditions into structured symptoms
2. Select appropriate clinic based on symptoms
3. Collect routing requirements (e.g., language preferences)
4. Generate navigation routes

The frontend needs to connect to these APIs while preserving the existing animation system and UI components.

## Goals / Non-Goals

**Goals:**
- Replace hardcoded message sequences with API-driven dynamic responses
- Implement proper conversation state management
- Maintain existing animation/UI system (TypewriterText, ConfirmationList, NavPath, ConfirmButton)
- Add loading states and error handling for API calls
- Keep voice input/output as future work (out of scope for this change)

**Non-Goals:**
- Modifying existing UI components' animation behavior
- Implementing voice STT/TTS (separate feature)
- Creating a generic chatbot framework
- Adding offline support

## Decisions

### Decision 1: API Service Layer Location

**Choice:** Create `src/services/triageApi.ts` as a dedicated service module.

**Rationale:** Following the Repository/Service pattern keeps API logic separate from UI code. The `src/services/` directory doesn't exist yet, so we'll create it. This makes the API testable and reusable.

**Alternative considered:** Putting API calls directly in TriageChat.vue. Rejected - would mix concerns and make testing harder.

### Decision 2: State Management Approach

**Choice:** Use `src/stores/session.ts` (extend existing) or a new `conversation.ts` store with Pinia.

**Rationale:** The project already uses Pinia for settings/theme stores. Adding conversation state to an existing store or creating a focused conversation store maintains consistency.

**Alternative considered:** Local component state with `ref()`. Rejected - conversation state may need to persist across page visits or be shared with other components.

### Decision 3: Conversation State Machine

**Choice:** Implement a simple state machine with these states:
- `COLLECTING_CONDITION` - Waiting for user to describe symptoms
- `CONFIRMING_CONDITION` - Showing parsed condition for confirmation
- `SELECTING_CLINIC` - API selected clinic, showing nav path
- `CONFIRMING_ROUTE` - User can modify route
- `NAVIGATING` - Route confirmed, showing final navigation

**Rationale:** Each state maps to a distinct API call and UI display pattern. The flow matches the existing hardcoded message sequence.

### Decision 4: Message Rendering

**Choice:** Keep existing `ContentBlock` types but extend `ChatMessage` to optionally include API response metadata.

**Rationale:** The existing TypeScript types in `chat.ts` already support `string`, `confirmation-list`, `confirm-button`, and `nav-path` blocks. API responses map directly to these structures.

### Decision 5: API Error Handling

**Choice:** Show user-friendly error messages inline in the chat, with retry capability.

**Rationale:** Chat applications are forgiving - if an API call fails, we show an error bubble and let the user retry. No blocking modal dialogs.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Backend API not ready | Mock responses during development, feature flag to toggle |
| Long API response times | Show "typing..." indicator, implement timeout (30s) |
| Complex state transitions | Use explicit state enum, add state transition logging in dev |
| API response format mismatch | Add type validation on API responses, log mismatches |

## Open Questions

1. **Should we cache conversation state?** If user refreshes page, should we restore the triage session or start fresh?
2. **What happens on page navigation?** Should TriageChat be the only entry point, or can users enter from other pages?
3. **Do we need WebSocket for real-time updates?** Current API is request-response. Should we poll or use SSE for longer operations?
