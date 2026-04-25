## 1. Verification & Setup

- [x] 1.1 Verify design tokens in tokens.scss match all colors from stitch-ui HTML
- [x] 1.2 Verify Vuetify theme configuration has all required colors
- [x] 1.3 Verify @mdi/font icons are properly configured in vuetify.ts and main.ts

## 2. Implement Desktop Header Component

- [x] 2.1 Create responsive header using v-app-bar with surface-container-low background
- [x] 2.2 Add logo "健康管家" with primary color and Manrope font
- [x] 2.3 Add navigation links (首页, 问诊, 健康, 我的) with hover states
- [x] 2.4 Style "首页" link as active (primary color)
- [x] 2.5 Add settings icon (mdi-cog) on the right side
- [x] 2.6 Apply backdrop blur and shadow styling

## 3. Implement Mobile Header Component

- [x] 3.1 Create mobile-only header visible on smAndDown viewport
- [x] 3.2 Display simplified header with logo only
- [x] 3.3 Apply same backdrop blur styling as desktop header

## 4. Implement Welcome Section

- [x] 4.1 Add main container with max-width and padding
- [x] 4.2 Implement headline "今天 AI 能为您提供什么帮助？" with correct typography
- [x] 4.3 Apply Manrope font, bold weight, responsive font size

## 5. Implement Service Cards Section

- [x] 5.1 Create grid layout (2 columns desktop, 1 column mobile)
- [x] 5.2 Implement first card: 智能导诊助手 with medical_services icon
- [x] 5.3 Implement second card: 病后恢复助手 with health_and_safety icon
- [x] 5.4 Add circular icon containers with secondary-container background
- [x] 5.5 Style card titles, descriptions, and arrow buttons
- [x] 5.6 Implement hover effects (background change, button scale)
- [x] 5.7 Add transition duration (300ms) to all interactive elements

## 6. Implement Mobile Bottom Navigation

- [x] 6.1 Create bottom nav visible only on mobile (smAndDown)
- [x] 6.2 Add 3 nav items: 首页 (home icon, filled when active), 问诊 (chat icon), 我的 (person icon)
- [x] 6.3 Style active item with primary background and white text
- [x] 6.4 Style inactive items with muted text color
- [x] 6.5 Add rounded top corners and shadow
- [x] 6.6 Implement tap scale animation (90%)

## 7. Responsive Testing & Polish

- [x] 7.1 Test on mobile viewport (< 600px) - verify mobile header and bottom nav
- [x] 7.2 Test on desktop viewport (≥ 600px) - verify desktop header
- [x] 7.3 Verify all colors match Clinical Sanctuary design exactly
- [x] 7.4 Verify typography (Manrope headlines, Inter body)
- [x] 7.5 Verify hover transitions and animations
- [x] 7.6 Compare with stitch-ui HTML screenshot for visual fidelity

## 8. Build Verification

- [x] 8.1 Run `pnpm build` to verify no TypeScript or build errors
- [x] 8.2 Verify production build output in dist/
