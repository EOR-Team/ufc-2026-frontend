import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { ThemeState } from '@/types/stores'

const THEME_STORAGE_KEY = 'ufc-theme'

function loadThemeFromStorage(): Partial<ThemeState> {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // ignore parse errors
  }
  return {}
}

export const useThemeStore = defineStore('theme', () => {
  const stored = loadThemeFromStorage()

  const isDark = ref(stored.isDark ?? false)
  const currentTheme = ref<'light' | 'dark'>(stored.currentTheme ?? 'light')

  // Getters
  const themeName = computed(() => currentTheme.value)
  const isDarkMode = computed(() => isDark.value)

  // Apply theme to Vuetify
  function applyToVuetify(vuetifyTheme: { global: { name: { value: string } } }) {
    vuetifyTheme.global.name.value = currentTheme.value
  }

  // Actions
  function toggleTheme() {
    isDark.value = !isDark.value
    currentTheme.value = isDark.value ? 'dark' : 'light'
  }

  function setLightTheme() {
    isDark.value = false
    currentTheme.value = 'light'
  }

  function setDarkTheme() {
    isDark.value = true
    currentTheme.value = 'dark'
  }

  function setTheme(theme: 'light' | 'dark') {
    isDark.value = theme === 'dark'
    currentTheme.value = theme
  }

  // Persist theme changes
  watch(
    () => ({ isDark: isDark.value, currentTheme: currentTheme.value }),
    (themeState) => {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeState))
      } catch {
        // ignore storage errors
      }
    },
    { deep: true }
  )

  return {
    isDark,
    currentTheme,
    themeName,
    isDarkMode,
    applyToVuetify,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setTheme,
  }
})
