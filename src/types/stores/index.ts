export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
}

export interface SettingsState {
  useOnlineModel: boolean
  useVoiceReading: boolean
}

export interface ThemeState {
  isDark: boolean
  currentTheme: 'light' | 'dark'
}

export interface SessionState {
  isAuthenticated: boolean
  user: User | null
  sessionToken: string | null
}

export interface PersistOptions {
  enabled: boolean
  storageKey?: string
  storage?: Storage
}
