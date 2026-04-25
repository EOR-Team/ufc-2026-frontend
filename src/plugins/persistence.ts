import type { PiniaPluginContext } from 'pinia'
import { watch } from 'vue'

function parseJSON<T>(value: string | null, fallback: T): T {
  try {
    if (value === null) return fallback
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export interface PersistPluginOptions {
  storageKey?: string
  storage?: Storage
}

export function createPersistencePlugin(options?: PersistPluginOptions) {
  return ({ store }: PiniaPluginContext) => {
    const storage = options?.storage ?? localStorage
    const storageKey = options?.storageKey ?? `pinia-${store.$id}`

    // Hydrate store state from storage
    const storedState = storage.getItem(storageKey)
    if (storedState) {
      const parsed = parseJSON(storedState, {})
      if (Object.keys(parsed).length > 0) {
        store.$patch(parsed)
      }
    }

    // Watch for changes and persist
    watch(
      () => store.$state,
      (state) => {
        try {
          storage.setItem(storageKey, JSON.stringify(state))
        } catch (error) {
          console.error(`[persistence] Failed to persist store ${store.$id}:`, error)
        }
      },
      { deep: true }
    )
  }
}

export const persistencePlugin = createPersistencePlugin()
