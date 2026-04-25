## 1. Project Setup

- [x] 1.1 Add route `/settings` pointing to `SettingsPage.vue` in `router/index.ts`
- [x] 1.2 Verify `@mdi/font` icons available (cloud_sync, record_voice_over)

## 2. Create SettingsPage.vue Component

- [x] 2.1 Create `src/pages/SettingsPage.vue` with `<script setup lang="ts">`
- [x] 2.2 Implement fixed header with backdrop-blur and back button
- [x] 2.3 Add page title "通用设置" in Manrope font
- [x] 2.4 Implement settings sections container with max-width constraint

## 3. Model Settings Section

- [x] 3.1 Add "模型设置" section header
- [x] 3.2 Create settings card with icon (cloud_sync), title, description
- [x] 3.3 Implement toggle switch with CSS peer-checked pattern
- [x] 3.4 Add hover effect on card

## 4. Voice Settings Section

- [x] 4.1 Add "语音设置" section header
- [x] 4.2 Create settings card with icon (record_voice_over), title, description
- [x] 4.3 Implement toggle switch with same pattern as model settings
- [x] 4.4 Add hover effect on card

## 5. Integration with HomePage

- [x] 5.1 Add router-link on settings icon to navigate to `/settings`
