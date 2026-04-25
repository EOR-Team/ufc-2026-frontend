# Recovery Chat Specification

## Overview

Post-illness recovery assistant chat interface that displays personalized recovery plans, progress tracking, and treatment reminders.

## UI Structure

### Header
- Fixed position with backdrop-blur
- Back button (left), title "健康管家" (center), settings icon (right)
- Height: 64px, padding: 1rem 1.5rem
- Background: rgba(#f7fafb, 0.8)

### Contextual Status
- Centered badge showing "出院第 X 天"
- Uses calendar_today icon
- Rounded-full pill style with surface-container-high background

### Chat Messages

#### AI Message
- Avatar: 32x32px rounded-full, secondary-container background, health_and_safety icon
- Bubble: surface-container-highest background, 1rem padding, 1rem border-radius
- Max-width: 85% (mobile) / 80% (desktop)

#### User Message
- Bubble: primary gradient background (#00606d → #007b8b), white text
- Max-width: 85% (mobile) / 70% (desktop)
- Align right

### Custom UI Components

#### Progress Tracker Card
- Background: surface-container-lowest
- Border: 1px solid outline-variant/15
- Border-radius: 1rem
- Shadow: 0 4px 40px rgba(24,28,29,0.06)
- Contains:
  - Header: title + percentage badge (primary background, 20% opacity)
  - Progress bar: 10px height, surface-container-high track, primary fill
  - Description text: on-surface-variant color

#### Treatment Checklist Card
- Same card styling as Progress Tracker
- Contains:
  - Header with fact_check icon and title
  - Checklist items with checkbox icon, text, and timestamp
  - Done items: check_circle filled, line-through text, reduced opacity
  - Pending items: radio_button_unchecked, normal text

### Chat Input
- Fixed position above bottom nav
- Background: surface-container-high
- Rounded-full container with padding
- Text input + gradient send button (primary to primary-container)

### Bottom Navigation
- Fixed bottom, full width
- 4 tabs: 首页, 聊天 (active), 我的
- Active tab: primary background, white text, rounded-full
- Inactive tabs: on-surface-variant text

## Design Tokens

```scss
$primary: #00606d;
$primary-container: #007b8b;
$secondary-container: #8bf1e6;
$surface-container-low: #f1f4f5;
$surface-container-high: #e5e9ea;
$surface-container-highest: #e0e3e4;
$surface-container: #ebeeef;
$surface-container-lowest: #ffffff;
$on-surface: #181c1d;
$on-surface-variant: #3e494b;
$on-primary: #ffffff;
$background: #f7fafb;
$outline: #6e797b;
$secondary: #006a63;
$error: #ba1a1a;
```

## Typography

- Headlines: Manrope, 600-800 weight
- Body: Inter, 400-500 weight
- Labels: Inter, 500 weight

## Animations

- Card hover: shadow increase, 300ms duration
- Button press: scale(0.95), 200ms
- Progress bar: width transition 1000ms ease-out
- Active tab scale: scale(0.9) on press
