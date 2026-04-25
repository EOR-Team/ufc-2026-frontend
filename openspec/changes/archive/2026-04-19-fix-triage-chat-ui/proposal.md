## Why

The TriageChat page has two UI issues that break the expected chat UX: user messages are left-aligned instead of right-aligned, and the input box is obscured by the mobile bottom navigation bar.

## What Changes

- Fix user message bubble alignment to be right-aligned
- Hide bottom navigation bar on TriageChat page
- Adjust chat input area to use full bottom space when bottom nav is hidden

## Capabilities

### Modified Capabilities

- `triage-chat`: Fix user message alignment and remove bottom nav obstruction

## Impact

- Modified: `src/pages/TriageChat.vue`
