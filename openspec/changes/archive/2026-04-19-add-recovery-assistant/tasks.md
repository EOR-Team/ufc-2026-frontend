## 1. Project Setup

- [x] 1.1 Add route `/recovery-chat` pointing to `RecoveryChatPage.vue` in `router/index.ts`
- [x] 1.2 Verify `@mdi/font` icons available (health_and_safety, fact_check, check_circle, radio_button_unchecked, calendar_today, send)

## 2. Create RecoveryChatPage.vue Component

- [x] 2.1 Create `src/pages/RecoveryChatPage.vue` with `<script setup lang="ts">`
- [x] 2.2 Implement fixed header with backdrop-blur, back button, title "健康管家", settings link
- [x] 2.3 Add contextual status badge "出院第 X 天" with calendar icon
- [x] 2.4 Implement chat message structure (AI and user bubbles)

## 3. Chat Messages Implementation

- [x] 3.1 Add AI avatar component (32x32, secondary-container, health_and_safety icon)
- [x] 3.2 Implement AI message bubble with surface-container-highest background
- [x] 3.3 Implement user message bubble with primary gradient background
- [x] 3.4 Add message data structure with mock conversation

## 4. Custom UI Components

- [x] 4.1 Create Progress Tracker card with title, percentage badge, progress bar, description
- [x] 4.2 Create Treatment Checklist card with icon header and checkbox items
- [x] 4.3 Implement done/pending checkbox states with CSS styling
- [x] 4.4 Add card hover effects (shadow transition)

## 5. Chat Input and Navigation

- [x] 5.1 Implement floating chat input with rounded-full container
- [x] 5.2 Add gradient send button matching design
- [x] 5.3 Implement bottom navigation with 4 tabs (首页, 聊天, 我的)
- [x] 5.4 Add active state styling for "聊天" tab

## 6. Integration with HomePage

- [x] 6.1 Verify "病后恢复助手" card links to `/recovery-chat`
