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
$primary: #00606d;
$primary-container: #007b8b;
$secondary-container: #8bf1e6;
$secondary: #006a63;
$surface-container-highest: #e0e3e4;
$on-surface: #181c1d;
$on-primary: #ffffff;

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
  background: $secondary-container;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 0.25rem;

  .v-icon {
    color: $secondary;
  }
}

.message-bubble {
  padding: 1rem;
  border-radius: 1rem;
  max-width: 80%;

  &.bot-bubble {
    background: $surface-container-highest;
    color: $on-surface;
    box-shadow: 0 4px 40px rgba($on-surface, 0.06);
  }

  &.user-bubble {
    background: linear-gradient(135deg, $primary 0%, $primary-container 100%);
    color: $on-primary;
    box-shadow: 0 4px 40px rgba($on-surface, 0.06);
  }
}

.message-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.6;
}
</style>
