import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, SessionState } from '@/types/stores'

const SESSION_TOKEN_KEY = 'ufc-session-token'

function loadSessionFromStorage(): Partial<SessionState> {
  try {
    const token = sessionStorage.getItem(SESSION_TOKEN_KEY)
    if (token) {
      return {
        isAuthenticated: true,
        sessionToken: token,
        user: null,
      }
    }
  } catch {
    // ignore parse errors
  }
  return {
    isAuthenticated: false,
    sessionToken: null,
    user: null,
  }
}

export const useSessionStore = defineStore('session', () => {
  const stored = loadSessionFromStorage()

  const isAuthenticated = ref(stored.isAuthenticated ?? false)
  const user = ref<User | null>(stored.user ?? null)
  const sessionToken = ref<string | null>(stored.sessionToken ?? null)

  // Getters
  const userEmail = computed(() => user.value?.email ?? null)
  const displayName = computed(() => user.value?.displayName ?? 'Guest')
  const isLoggedIn = computed(() => isAuthenticated.value)

  // Actions
  function login(userData: User, token: string) {
    user.value = userData
    sessionToken.value = token
    isAuthenticated.value = true
    try {
      sessionStorage.setItem(SESSION_TOKEN_KEY, token)
    } catch {
      // ignore storage errors
    }
  }

  function logout() {
    user.value = null
    sessionToken.value = null
    isAuthenticated.value = false
    try {
      sessionStorage.removeItem(SESSION_TOKEN_KEY)
    } catch {
      // ignore storage errors
    }
  }

  function updateUser(updates: Partial<User>) {
    if (user.value) {
      user.value = { ...user.value, ...updates }
    }
  }

  return {
    isAuthenticated,
    user,
    sessionToken,
    userEmail,
    displayName,
    isLoggedIn,
    login,
    logout,
    updateUser,
  }
})
