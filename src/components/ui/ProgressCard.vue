<script setup lang="ts">
interface Props {
  title: string
  percent: number
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="dashboard-card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
      <span class="progress-badge">{{ percent }}%</span>
    </div>
    <div class="progress-bar-track">
      <div class="progress-bar-fill" :style="{ width: percent + '%' }"></div>
    </div>
    <p v-if="description" class="progress-description">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">
.dashboard-card {
  background: var(--color-surface-container-lowest);
  border: 1px solid rgba(var(--color-outline), 0.15);
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: var(--shadow-md);
  transition: box-shadow 300ms ease;

  &:hover {
    box-shadow: var(--shadow-lg);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.card-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-on-surface);
}

.progress-badge {
  background: rgba(var(--color-primary), 0.2);
  color: var(--color-primary);
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
}

.progress-bar-track {
  width: 100%;
  height: 10px;
  background: var(--color-surface-container-high);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 9999px;
  transition: width 1000ms ease-out;
}

.progress-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--color-on-surface);
  margin-top: 0.75rem;
}
</style>
