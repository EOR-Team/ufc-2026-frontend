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
$primary: #00606d;
$surface-container-lowest: #ffffff;
$on-surface: #181c1d;
$surface-container-high: #e5e9ea;
$outline: #6e797b;

.dashboard-card {
  background: $surface-container-lowest;
  border: 1px solid rgba($outline, 0.15);
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 4px 40px rgba($on-surface, 0.06);
  transition: box-shadow 300ms ease;

  &:hover {
    box-shadow: 0 8px 50px rgba($on-surface, 0.08);
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
  color: $on-surface;
}

.progress-badge {
  background: rgba($primary, 0.2);
  color: $primary;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
}

.progress-bar-track {
  width: 100%;
  height: 10px;
  background: $surface-container-high;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: $primary;
  border-radius: 9999px;
  transition: width 1000ms ease-out;
}

.progress-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: $on-surface;
  margin-top: 0.75rem;
}
</style>
