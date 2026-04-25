## Why

The healthcare app needs a post-illness recovery assistant chat interface that provides patients with personalized recovery plans, progress tracking, and treatment reminders after discharge. This feature helps patients monitor their recovery progress and follow prescribed treatment plans.

## What Changes

- Add new `/recovery-chat` route pointing to `RecoveryChatPage.vue`
- Create a chat-based recovery assistant UI with:
  - Fixed header with back button, title, and settings link
  - Contextual status indicator showing days since discharge
  - AI/user message bubbles with clinical sanctuary design tokens
  - Custom recovery dashboard components (progress tracker, treatment checklist)
  - Floating chat input with gradient send button
  - Bottom navigation matching home page style
- Integrate with HomePage "病后恢复助手" service card

## Capabilities

### New Capabilities
- `recovery-chat`: Post-illness recovery assistant chat interface with progress tracking and treatment plan display

### Modified Capabilities
- None

## Impact

- New page: `src/pages/RecoveryChatPage.vue`
- Route addition: `/recovery-chat` in `router/index.ts`
- HomePage card navigation link to `/recovery-chat`
