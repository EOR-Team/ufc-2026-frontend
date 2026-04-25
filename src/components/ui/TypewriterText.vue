<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  content: string
  font?: string
  animationDuration?: {
    min: number
    max: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  font: '14px Inter',
  animationDuration: () => ({ min: 30, max: 45 })
})

const emit = defineEmits<{
  complete: []
}>()

interface CharState {
  text: string
  fading: boolean
}

const displayedChars = ref<CharState[]>([])
const isAnimating = ref(false)

// Refs for DOM elements
const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

// Animation state
let animationFrameId: number | null = null
let charIndex = 0

// Font for canvas measurement
const FONT_SPEC = '14px Inter'

// Design tokens
const $onSurface: string = '#181c1d'

// Random duration between min and max
const getRandomDuration = (): number => {
  const { min, max } = props.animationDuration
  return Math.random() * (max - min) + min
}

// Start the typing animation - returns promise that resolves when animation completes
const start = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!props.content) {
      displayedChars.value = []
      isAnimating.value = false
      resolve()
      return
    }

    charIndex = 0
    displayedChars.value = []
    isAnimating.value = true

    const onComplete = () => {
      isAnimating.value = false
      emit('complete')
      resolve()
    }

    typeNextChar(onComplete)
  })
}

// Initialize component
const initialize = () => {
  if (!props.content) {
    displayedChars.value = []
  } else {
    displayedChars.value = []
  }
}

// Type next character with fade-in effect
const typeNextChar = (onComplete?: () => void) => {
  if (charIndex >= props.content.length) {
    isAnimating.value = false
    onComplete?.()
    return
  }

  const char = props.content[charIndex]

  // Add new character with fading state
  displayedChars.value.push({
    text: char,
    fading: true
  })

  charIndex++

  // Schedule next character
  const duration = getRandomDuration()
  animationFrameId = window.setTimeout(() => {
    typeNextChar(onComplete)
  }, duration)
}

// Handle window resize
const handleResize = () => {
  // No-op for fade-based implementation
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  initialize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrameId) {
    clearTimeout(animationFrameId)
  }
})

defineExpose({
  start
})
</script>

<template>
  <div ref="containerRef" class="typewriter-container">
    <span
      v-for="(char, i) in displayedChars"
      :key="i"
      class="typewriter-char"
      :class="{ 'fade-in': char.fading }"
      @animationend="char.fading = false"
    >{{ char.text }}</span>
  </div>
</template>

<style scoped lang="scss">
$on-surface: #181c1d;

.typewriter-container {
  overflow: hidden;
  width: fit-content;
}

.typewriter-char {
  display: inline-block;
  opacity: 1;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
  color: $on-surface;
}

.fade-in {
  animation: char-fade-in 180ms ease-out forwards;
}

@keyframes char-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>