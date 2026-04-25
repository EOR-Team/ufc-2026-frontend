## Why

The application needs a settings page for configuring AI triage assistant options. Users need control over whether to use online AI models and voice reading features. This provides user autonomy and a more personalized experience.

## What Changes

- Add new Settings page (`/settings` route)
- Display two setting sections: 模型设置 (Model Settings) and 语音设置 (Voice Settings)
- Each setting has a toggle switch to enable/disable the feature
- Implement fixed header with back navigation and page title
- Mobile-first design with desktop max-width constraint

## Capabilities

### New Capabilities
- `settings-panel`: Settings page with model and voice toggles

### Modified Capabilities
- None

## Impact
- New page: `src/pages/SettingsPage.vue`
- New route: `/settings` in router
- No backend changes required (client-side toggles only)
