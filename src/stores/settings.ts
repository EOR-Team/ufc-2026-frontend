import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { SettingsState } from '@/types/stores'

const STORAGE_KEY = 'ufc-settings'

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

export const useSettingsStore = defineStore('settings', () => {
  const stored = loadFromStorage()

  const useOnlineModel = ref(stored.useOnlineModel ?? true)
  const useVoiceReading = ref(stored.useVoiceReading ?? false)

  // Getters
  const isOnlineModelUsed = computed(() => useOnlineModel.value)
  const isVoiceReadingEnabled = computed(() => useVoiceReading.value)

  // Actions
  function toggleOnlineModel() {
    useOnlineModel.value = !useOnlineModel.value
  }

  function setOnlineModel(value: boolean) {
    useOnlineModel.value = value
  }

  function toggleVoiceReading() {
    useVoiceReading.value = !useVoiceReading.value
  }

  function setVoiceReading(value: boolean) {
    useVoiceReading.value = value
  }

  // Persist changes
  watch(
    () => ({ useOnlineModel: useOnlineModel.value, useVoiceReading: useVoiceReading.value }),
    (settings) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
      } catch {
        // ignore storage errors
      }
    },
    { deep: true }
  )

  return {
    useOnlineModel,
    useVoiceReading,
    isOnlineModelUsed,
    isVoiceReadingEnabled,
    toggleOnlineModel,
    setOnlineModel,
    toggleVoiceReading,
    setVoiceReading,
  }
})
