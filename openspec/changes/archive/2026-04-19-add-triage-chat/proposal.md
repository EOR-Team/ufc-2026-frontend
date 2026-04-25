## Why

The healthcare app "健康管家" needs an intelligent triage chat feature to guide patients through the hospital visit process. Based on the existing Stitch UI design, this feature provides AI-powered navigation that helps patients understand where to go and what to do during their visit.

## What Changes

- Add new `TriageChat` page component mirroring the Stitch UI design
- Integrate chat-based navigation flow with bot/user message exchange
- Implement header with back button, title, and settings icon
- Implement bottom navigation bar (mobile only)
- Implement chat input area with send button
- Include message bubbles with bot avatar and user messages
- Add route navigation to TriageChat from HomePage "智能导诊助手" card

## Capabilities

### New Capabilities

- `triage-chat`: Full chat-based triage navigation interface with message history, input field, and hospital navigation path display

## Impact

- New page: `src/pages/TriageChat.vue`
- Route addition: `/triage-chat` path
- HomePage link from "智能导诊助手" service card
