<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  visible?: boolean
}>()

defineEmits<{
  click: []
}>()

const isVisible = ref(false)

const start = (): Promise<void> => {
  return new Promise((resolve) => {
    // Trigger fade in animation
    requestAnimationFrame(() => {
      isVisible.value = true
      // Animation duration: 250ms
      setTimeout(() => {
        resolve()
      }, 250)
    })
  })
}

// Expose start method for external control
defineExpose({
  start
})
</script>

<template>
  <button v-if="visible !== false" class="confirm-btn" :class="{ visible: isVisible }" @click="$emit('click')">
    确认
  </button>
</template>

<style scoped lang="scss">
$primary: #00606d;
$primary-container: #007b8b;
$on-primary: #ffffff;
$on-surface: #181c1d;

.confirm-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  background: linear-gradient(135deg, $primary 0%, $primary-container 100%);
  color: $on-primary;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba($on-surface, 0.08);
  transition: all 300ms ease;
  margin-top: 1rem;
  opacity: 0;
  transform: translateY(8px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    box-shadow: 0 8px 24px rgba($on-surface, 0.12);
  }
}
</style>
