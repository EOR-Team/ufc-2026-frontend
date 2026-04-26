## 1. API Service Layer

- [x] 1.1 Create `src/services/` directory
- [x] 1.2 Create `src/services/triageApi.ts` with typed interfaces for all triager endpoints
- [x] 1.3 Implement `collectCondition()` function calling POST `/triager/collect_condition`
- [x] 1.4 Implement `selectClinic()` function calling POST `/triager/select_clinic`
- [x] 1.5 Implement `collectRequirement()` function calling POST `/triager/collect_requirement`
- [x] 1.6 Implement `patchRoute()` function calling POST `/triager/patch_route`
- [x] 1.7 Add consistent error handling and response validation

## 2. Conversation State Machine

- [x] 2.1 Create `src/types/conversation.ts` with `ConversationState` enum
- [x] 2.2 Define state values: COLLECTING_CONDITION, CONFIRMING_CONDITION, SELECTING_CLINIC, CONFIRMING_ROUTE, NAVIGATING
- [x] 2.3 Create state transition validation logic
- [x] 2.4 Add development mode logging for state transitions

## 3. TriageChat Integration

- [x] 3.1 Remove hardcoded `botMessagesData` array from TriageChat.vue
- [x] 3.2 Add conversation state ref to TriageChat.vue
- [x] 3.3 Implement `handleUserMessage()` to route based on current state
- [x] 3.4 Implement `handleConfirmClick()` to transition states and call APIs
- [x] 3.5 Add loading state indicator during API calls
- [x] 3.6 Add error message display with retry capability

## 4. Message Rendering Updates

- [x] 4.1 Update `sendMessage()` to use API responses instead of hardcoded data
- [x] 4.2 Map API responses to `ContentBlock[]` structures (confirmation-list, nav-path)
- [x] 4.3 Ensure TypewriterText animation works with dynamic content
- [x] 4.4 Handle the case when API returns different clinic than expected

## 5. Environment Configuration

- [x] 5.1 Add `VITE_API_BASE_URL` to environment type definitions
- [x] 5.2 Update `.env.example` with the new variable
- [x] 5.3 Use base URL from env var in API service

## 6. Testing & Verification

- [ ] 6.1 Test conversation flow end-to-end (condition → clinic → route)
- [ ] 6.2 Test error handling when API is unavailable
- [ ] 6.3 Verify animations still work with dynamic content
- [ ] 6.4 Test state transition validation
