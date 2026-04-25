<script setup lang="ts">
interface Props {
  type: 'bot' | 'user'
  content: string
  showAvatar?: boolean
  avatarIcon?: string
}

withDefaults(defineProps<Props>(), {
  showAvatar: true,
  avatarIcon: 'mdi-robot'
})
</script>

<template>
  <div :class="['message-wrapper', type === 'user' ? 'user-wrapper' : 'bot-wrapper']">
    <!-- Bot Message -->
    <template v-if="type === 'bot'">
      <div v-if="showAvatar" class="bot-avatar">
        <v-icon size="16" style="font-variation-settings: 'FILL' 1">{{ avatarIcon }}</v-icon>
      </div>
      <div class="message-bubble bot-bubble">
        <span class="message-text" style="white-space: pre-line">{{ content }}</span>
      </div>
    </template>

    <!-- User Message -->
    <template v-else>
      <div class="message-bubble user-bubble">
        <span class="message-text">{{ content }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.message-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;

  &.user-wrapper {
    justify-content: flex-end;
  }
}

.bot-wrapper {
  flex-direction: row;
}

.user-wrapper {
  flex-direction: row;
}

.bot-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-secondary-container);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 0.25rem;

  .v-icon {
    color: var(--color-secondary);
  }
}

.message-bubble {
  padding: 1rem;
  border-radius: 1rem;
  max-width: 80%;

  &.bot-bubble {
    background: var(--color-surface-container-highest);
    color: var(--color-on-surface);
    box-shadow: var(--shadow-md);
  }

  &.user-bubble {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-container) 100%);
    color: var(--color-on-primary);
    box-shadow: var(--shadow-md);
  }
}

.message-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.6;
}
</style>
