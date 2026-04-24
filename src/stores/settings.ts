import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'ufc-settings'

interface SettingsState {
  useOnlineModel: boolean
  useVoiceReading: boolean
}

function loadFromStorage(): Partial<SettingsState> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // ignore parse errors
  }
  return {}
}

function saveToStorage(settings: SettingsState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export const useSettingsStore = defineStore('settings', () => {
  const stored = loadFromStorage()

  const useOnlineModel = ref(stored.useOnlineModel ?? true)
  const useVoiceReading = ref(stored.useVoiceReading ?? false)

  watch(
    () => ({ useOnlineModel: useOnlineModel.value, useVoiceReading: useVoiceReading.value }),
    (settings) => {
      saveToStorage(settings)
    },
    { deep: true }
  )

  return {
    useOnlineModel,
    useVoiceReading,
  }
})
