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
  highlighted: boolean
}

// Parse content with {{highlight}}...{{/highlight}} markers
const parseHighlightedText = (content: string): { text: string; highlighted: boolean }[] => {
  const segments: { text: string; highlighted: boolean }[] = []
  const regex = /\{\{highlight\}\}(.*?)\{\{\/highlight\}\}/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(content)) !== null) {
    // Add text before the highlight marker
    if (match.index > lastIndex) {
      segments.push({
        text: content.slice(lastIndex, match.index),
        highlighted: false
      })
    }
    // Add the highlighted text
    segments.push({
      text: match[1],
      highlighted: true
    })
    lastIndex = regex.lastIndex
  }

  // Add remaining text after last highlight marker
  if (lastIndex < content.length) {
    segments.push({
      text: content.slice(lastIndex),
      highlighted: false
    })
  }

  return segments
}

const displayedChars = ref<CharState[]>([])
const parsedSegments = ref<{ text: string; highlighted: boolean }[]>([])
const isAnimating = ref(false)

// Refs for DOM elements
const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

// Animation state
let animationFrameId: number | null = null
let charIndex = 0
let segmentIndex = 0
let currentSegmentCharIndex = 0

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
    parsedSegments.value = parseHighlightedText(props.content)
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
  // Find the next character to display
  while (segmentIndex < parsedSegments.value.length) {
    const segment = parsedSegments.value[segmentIndex]
    if (currentSegmentCharIndex < segment.text.length) {
      // We have a character to display in the current segment
      const char = segment.text[currentSegmentCharIndex]

      displayedChars.value.push({
        text: char,
        fading: true,
        highlighted: segment.highlighted
      })

      currentSegmentCharIndex++

      // Schedule next character
      const duration = getRandomDuration()
      animationFrameId = window.setTimeout(() => {
        typeNextChar(onComplete)
      }, duration)
      return
    } else {
      // Move to next segment
      segmentIndex++
      currentSegmentCharIndex = 0
    }
  }

  // All characters have been displayed
  isAnimating.value = false
  onComplete?.()
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
      :class="{ 'fade-in': char.fading, 'highlight-inline': char.highlighted }"
      @animationend="char.fading = false"
    >{{ char.text }}</span>
  </div>
</template>

<style scoped lang="scss">
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
  color: var(--color-on-surface);
}

.fade-in {
  animation: char-fade-in 180ms ease-out forwards;
}

.highlight-inline {
  color: #00606d;
  font-weight: 500;
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