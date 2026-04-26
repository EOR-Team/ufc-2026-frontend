## Why

The current TriageChat page uses hardcoded bot messages to simulate a medical triage conversation. This "dumb" chatbot can't actually process user input or connect to the backend triager API. To make the导诊 (triage guidance) feature functional, we need to wire TriageChat to the real API endpoints and implement proper message handling logic.

## What Changes

- Replace hardcoded `botMessagesData` with dynamic responses from the backend triager API
- Implement user input collection flow: condition description → clinic selection → route confirmation
- Connect ChatInput to send user messages and display real bot responses
- Add API service layer for `/triager/*` endpoints
- Add loading states and error handling for API calls
- Support voice input via STT API and voice output via TTS API (future)

## Capabilities

### New Capabilities

- `triage-api-integration`: Connect TriageChat to backend `/triager/*` endpoints, replacing hardcoded message sequences with dynamic API-driven conversation flow
- `triage-conversation-state`: Manage conversation state machine (collecting condition → selecting clinic → confirming route → navigating)
- `chat-api-service`: TypeScript service layer for calling backend APIs with proper error handling and response parsing

### Modified Capabilities

- `chat-types`: The existing `ContentBlock` type may need extension to support dynamic content from API responses (e.g., `nav-path` block already exists but needs backend data)
- `typewriter-animation`: No change needed - existing animation system should work with dynamic content

## Impact

- **Files modified**: `src/pages/TriageChat.vue`, new API service file
- **Backend APIs used**: `/triager/collect_condition`, `/triager/select_clinic`, `/triager/collect_requirement`, `/triager/patch_route`
- **New dependencies**: None (using existing `$fetch` or `axios` pattern)
- **Stores affected**: May need a conversation state store or extend existing session store
