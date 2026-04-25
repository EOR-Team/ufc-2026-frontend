## Context

Two CSS/layout issues in TriageChat.vue need fixing:
1. User messages should be right-aligned but are left-aligned
2. Bottom navigation overlaps the chat input on mobile

## Goals / Non-Goals

**Goals:**
- User message bubbles right-aligned with flex-end
- Bottom nav hidden on TriageChat page
- Input area has proper bottom spacing

**Non-Goals:**
- No changes to HomePage bottom nav
- No changes to message content or logic

## Decisions

1. **Hide bottom nav completely** on TriageChat (not just on mobile)
2. **User wrapper uses `justify-content: flex-end`** for right-alignment
