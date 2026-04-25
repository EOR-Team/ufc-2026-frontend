<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  title: string
  showBack?: boolean
  showSettings?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBack: true,
  showSettings: true
})

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <header class="app-header">
    <button
      v-if="showBack"
      class="header-btn back-btn"
      @click="goBack"
    >
      <v-icon size="24">mdi-arrow-left</v-icon>
    </button>
    <div v-else class="header-spacer" />

    <h1 class="header-title">{{ title }}</h1>

    <router-link v-if="showSettings" to="/settings">
      <button class="header-btn settings-btn">
        <v-icon size="24">mdi-cog</v-icon>
      </button>
    </router-link>
    <div v-else class="header-spacer" />
  </header>
</template>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(var(--color-surface), 0.8);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  height: 64px;
}

.header-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--color-primary);
  transition: all 200ms ease;

  &:hover {
    background: var(--color-surface-container-low);
  }

  &:active {
    transform: scale(0.95);
  }
}

.header-spacer {
  width: 40px;
  height: 40px;
}

.header-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-primary);
  letter-spacing: -0.02em;
  flex: 1;
  text-align: center;
}
</style>
