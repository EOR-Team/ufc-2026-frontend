## 1. Store Infrastructure

- [x] 1.1 Create `src/stores/index.ts` with store registry and exports
- [x] 1.2 Create `src/plugins/persistence.ts` for Pinia persistence plugin
- [x] 1.3 Register persistence plugin in `src/main.ts`

## 2. Settings Store Enhancement

- [x] 2.1 Refactor `src/stores/settings.ts` to use Setup Store pattern with actions and getters
- [x] 2.2 Add `toggleOnlineModel()` and `setOnlineModel()` actions
- [x] 2.3 Add `toggleVoiceReading()` and `setVoiceReading()` actions
- [x] 2.4 Add `isOnlineModelUsed` and `isVoiceReadingEnabled` getters
- [x] 2.5 Add persistence configuration (`persist: true`)

## 3. Theme Store

- [x] 3.1 Create `src/stores/theme.ts` with Setup Store pattern
- [x] 3.2 Add `isDark`, `currentTheme` state
- [x] 3.3 Add `toggleTheme()`, `setLightTheme()`, `setDarkTheme()`, `setTheme()` actions
- [x] 3.4 Add `themeName` and `isDarkMode` getters
- [x] 3.5 Add persistence configuration (`persist: true`)
- [x] 3.6 Integrate with Vuetify theme system

## 4. Session Store

- [x] 4.1 Create `src/stores/session.ts` with Setup Store pattern
- [x] 4.2 Add `isAuthenticated`, `user`, `sessionToken` state
- [x] 4.3 Add `login(user, token)`, `logout()`, `updateUser(updates)` actions
- [x] 4.4 Add `userEmail`, `displayName`, `isLoggedIn` getters
- [x] 4.5 Configure sessionStorage for token persistence (security)

## 5. Type Definitions

- [x] 5.1 Create `src/types/stores/index.ts` for shared store types
- [x] 5.2 Define `User` interface for session store
- [x] 5.3 Define `SettingsState` interface
- [x] 5.4 Define `ThemeState` interface

## 6. Testing

- [ ] 6.1 Add unit tests for settings store actions and getters (SKIPPED - no test framework installed)
- [ ] 6.2 Add unit tests for theme store actions and getters (SKIPPED - no test framework installed)
- [ ] 6.3 Add unit tests for session store actions and getters (SKIPPED - no test framework installed)
- [ ] 6.4 Add integration tests for persistence plugin (SKIPPED - no test framework installed)
