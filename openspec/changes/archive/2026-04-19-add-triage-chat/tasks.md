## 1. Project Setup

- [x] 1.1 Add route `/triage-chat` pointing to `TriageChat.vue` in `router/index.ts`
- [x] 1.2 Verify `@mdi/font` icons available for Material Symbols equivalents

## 2. Create TriageChat.vue Component

- [x] 2.1 Create `src/pages/TriageChat.vue` with `<script setup lang="ts">`
- [x] 2.2 Implement reactive window width tracking for mobile detection
- [x] 2.3 Define mock messages array with bot/user exchanges matching HTML

## 3. Header Implementation

- [x] 3.1 Implement fixed header with `backdrop-blur-xl` styling
- [x] 3.2 Add back button with `arrow_back` icon
- [x] 3.3 Add centered title "健康管家" in Manrope font
- [x] 3.4 Add settings button with `settings` icon

## 4. Chat Message List

- [x] 4.1 Create scrollable message container with `pt-24 pb-32 px-4` padding
- [x] 4.2 Implement bot message component with avatar circle and `robot_2` icon
- [x] 4.3 Implement user message component with primary background
- [x] 4.4 Add message list display matching mockup order and content

## 5. Bottom Navigation Bar

- [x] 5.1 Implement fixed bottom nav with `rounded-t-[2.5rem]` top corners
- [x] 5.2 Add 首页, 聊天 (active), 我的 nav items
- [x] 5.3 Apply blur backdrop and shadow styling
- [x] 5.4 Set `display: none` for desktop (md:hidden)

## 6. Chat Input Area

- [x] 6.1 Implement fixed input area above bottom nav
- [x] 6.2 Add gradient fade-out effect from surface background
- [x] 6.3 Create rounded-full container with surface-container-high background
- [x] 6.4 Add text input with placeholder "输入你想说的..."
- [x] 6.5 Add send button with gradient `from-primary to-primary-container` styling

## 7. Integration with HomePage

- [x] 7.1 Add router-link on "智能导诊助手" card to navigate to `/triage-chat`
