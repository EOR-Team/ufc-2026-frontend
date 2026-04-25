<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

interface Props {
  items: { label: string; value: string }[]
  visible?: boolean  // If false, component takes no space
}

const props = withDefaults(defineProps<Props>(), {
  visible: true
})

// Visibility state for fade-in effect
const isVisible = ref(false)

// Typewriter state per item
interface ItemState {
  labelDisplayed: string
  valueDisplayed: string
  isLabelDone: boolean
  isValueDone: boolean
}

const itemStates = ref<ItemState[]>([])
let animationFrameId: number | null = null
let currentItemIndex = 0
let currentCharIndex = 0
let isLabelPhase = true

// Initialize all item states
const initializeItems = () => {
  itemStates.value = props.items.map(item => ({
    labelDisplayed: '',
    valueDisplayed: '',
    isLabelDone: false,
    isValueDone: false
  }))
}

// Start typewriter animation for all items sequentially
const start = (): Promise<void> => {
  return new Promise((resolve) => {
    // Initialize items state
    initializeItems()

    // Trigger fade in first
    requestAnimationFrame(() => {
      isVisible.value = true

      // Start typewriter animation after a brief delay
      setTimeout(() => {
        animateItem()
      }, 150)

      // Resolve after all items complete
      const checkComplete = setInterval(() => {
        const allDone = itemStates.value.every(
          item => item.isLabelDone && item.isValueDone
        )
        if (allDone) {
          clearInterval(checkComplete)
          resolve()
        }
      }, 50)
    })
  })
}

// Animate each character
const animateItem = () => {
  if (currentItemIndex >= props.items.length) {
    return
  }

  const item = props.items[currentItemIndex]
  const state = itemStates.value[currentItemIndex]

  if (isLabelPhase) {
    // Animate label
    if (currentCharIndex < item.label.length) {
      state.labelDisplayed = item.label.slice(0, currentCharIndex + 1)
      currentCharIndex++
      animationFrameId = window.setTimeout(animateItem, 20)
    } else {
      // Label done, switch to value
      state.isLabelDone = true
      isLabelPhase = false
      currentCharIndex = 0
      // Small pause before value
      animationFrameId = window.setTimeout(animateItem, 150)
    }
  } else {
    // Animate value
    if (currentCharIndex < item.value.length) {
      state.valueDisplayed = item.value.slice(0, currentCharIndex + 1)
      currentCharIndex++
      animationFrameId = window.setTimeout(animateItem, 20)
    } else {
      // Item done, move to next
      state.isValueDone = true
      currentItemIndex++
      isLabelPhase = true
      currentCharIndex = 0
      // Pause between items
      if (currentItemIndex < props.items.length) {
        animationFrameId = window.setTimeout(animateItem, 200)
      }
    }
  }
}

onUnmounted(() => {
  if (animationFrameId) {
    clearTimeout(animationFrameId)
  }
})

defineExpose({
  start
})
</script>

<template>
  <ul v-if="visible" class="confirmation-list" :class="{ visible: isVisible }">
    <li
      v-for="(item, i) in items"
      :key="i"
      class="confirmation-item"
      :class="{ visible: itemStates[i]?.labelDisplayed || itemStates[i]?.isLabelDone }"
    >
      <span class="label">{{ itemStates[i]?.labelDisplayed || '' }}</span>
      <span v-if="itemStates[i]?.isLabelDone" class="value">{{ itemStates[i]?.valueDisplayed || '' }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
$primary: #00606d;
$primary-container: #007b8b;
$secondary-container: #8bf1e6;
$on-surface: #181c1d;
$on-surface-variant: #3e494b;

.confirmation-list {
  list-style: disc inside;
  margin: 0.75rem 0;
  padding: 0.5rem 0;
  border-top: 1px solid rgba($on-surface, 0.08);
  border-bottom: 1px solid rgba($on-surface, 0.08);
  opacity: 0;
  transition: opacity 250ms ease;

  &.visible {
    opacity: 1;
  }
}

.confirmation-item {
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 0.25rem;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 200ms ease, transform 200ms ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .label {
    font-weight: 500;
    color: $on-surface;
  }

  .value {
    color: $on-surface-variant;
  }
}
</style>
