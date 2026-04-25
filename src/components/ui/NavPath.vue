<script setup lang="ts">
import { ref, computed } from 'vue'

interface PathStep {
  name: string
  isHighlighted?: boolean
  isSecondary?: boolean
}

interface ItemState {
  visible: boolean
}

interface Props {
  route: string
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false
})

const isVisible = ref(false)
const itemStates = ref<ItemState[]>([])
let animationTimeoutId: ReturnType<typeof setTimeout> | null = null

// Initialize all item states
const initializeItems = () => {
  itemStates.value = steps.value.map(() => ({
    visible: false
  }))
}

// Start sequential step animation
const start = (): Promise<void> => {
  return new Promise((resolve) => {
    initializeItems()

    requestAnimationFrame(() => {
      isVisible.value = true

      // Start animating steps sequentially
      let currentIndex = 0
      const animateStep = () => {
        if (currentIndex < itemStates.value.length) {
          itemStates.value[currentIndex].visible = true
          currentIndex++
          if (currentIndex < itemStates.value.length) {
            animationTimeoutId = setTimeout(animateStep, 250)
          } else {
            // All steps done, resolve after last animation
            animationTimeoutId = setTimeout(resolve, 200)
          }
        }
      }

      // Start first step after container fade-in
      animationTimeoutId = setTimeout(animateStep, 50)
    })
  })
}

// Expose start method for external control
defineExpose({
  start
})

// Parse route string into PathStep[]
// Format: "入口（当前地点）+挂号处+急诊诊室+缴费处+药房+出口"
// Highlight: 急诊诊室
const steps = computed<PathStep[]>(() => {
  const parts = props.route.split('+').map(part => part.trim())
  return parts.map(part => ({
    name: part,
    isHighlighted: part === '急诊诊室',
    isSecondary: false
  }))
})
</script>

<template>
  <div v-if="visible !== false" class="nav-path" :class="{ visible: isVisible }">
    <template v-for="(step, i) in steps" :key="i">
      <span
        :class="[
          'path-step',
          step.isHighlighted ? 'highlight' : '',
          step.isSecondary ? 'secondary' : '',
          itemStates[i]?.visible ? 'step-visible' : ''
        ]"
      >
        {{ step.name }}
      </span>
      <span v-if="i < steps.length - 1" class="path-arrow">
        <v-icon size="12" color="#6e797b">mdi-arrow-right</v-icon>
      </span>
    </template>
  </div>
</template>

<style scoped lang="scss">
$primary: #00606d;
$secondary: #006a63;
$on-surface-variant: #3e494b;

.nav-path {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  opacity: 0;
  transition: opacity 250ms ease;

  &.visible {
    opacity: 1;
  }
}

.path-step {
  color: $on-surface-variant;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 200ms ease, transform 200ms ease;

  &.step-visible {
    opacity: 1;
    transform: scale(1);
  }

  &.highlight {
    color: $primary;
    font-weight: 500;
  }

  &.secondary {
    color: $secondary;
    font-weight: 500;
  }
}

.path-arrow {
  display: flex;
  align-items: center;
}
</style>
