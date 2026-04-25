<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  placeholder?: string
  maxLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '输入...',
  maxLength: 500
})

const emit = defineEmits<{
  (e: 'send', value: string): void
}>()

const inputValue = ref('')

const send = () => {
  const content = inputValue.value.trim()
  if (!content) return

  emit('send', content)
  inputValue.value = ''
}
</script>

<template>
  <div class="chat-input-wrapper">
    <div class="chat-input-container">
      <input
        v-model="inputValue"
        type="text"
        class="chat-input"
        :placeholder="placeholder"
        :maxlength="maxLength"
        @keyup.enter="send"
      />
      <button class="send-btn" @click="send">
        <v-icon size="20">mdi-send</v-icon>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
$primary: #00606d;
$primary-container: #007b8b;
$surface-container-high: #e5e9ea;
$on-surface: #181c1d;
$on-surface-variant: #3e494b;
$on-primary: #ffffff;
$outline: #6e797b;
$background: #f7fafb;

.chat-input-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
  padding: 1.5rem 1rem 2rem;
  background: linear-gradient(to top, $background 80%, transparent);
  pointer-events: none;

  @media (min-width: 768px) {
    bottom: 1.5rem;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    max-width: 48rem;
    padding: 1.5rem;
  }
}

.chat-input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  background: $surface-container-high;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba($on-surface, 0.06);
  border: 1px solid rgba($outline, 0.15);
  pointer-events: auto;
}

.chat-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: $on-surface;

  &::placeholder {
    color: rgba($on-surface-variant, 0.6);
  }
}

.send-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $primary 0%, $primary-container 100%);
  color: $on-primary;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba($on-surface, 0.08);
  transition: all 300ms ease;
  flex-shrink: 0;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    box-shadow: 0 8px 24px rgba($on-surface, 0.12);
  }
}
</style>
