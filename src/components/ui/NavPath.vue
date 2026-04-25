<script setup lang="ts">
interface PathStep {
  name: string
  isHighlighted?: boolean
  isSecondary?: boolean
}

interface Props {
  steps: PathStep[]
}

defineProps<Props>()
</script>

<template>
  <div class="nav-path">
    <template v-for="(step, i) in steps" :key="i">
      <span
        :class="[
          'path-step',
          step.isHighlighted ? 'highlight' : '',
          step.isSecondary ? 'secondary' : ''
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
.nav-path {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
}

.path-step {
  color: var(--color-on-surface-variant);

  &.highlight {
    color: var(--color-primary);
    font-weight: 500;
  }

  &.secondary {
    color: var(--color-secondary);
    font-weight: 500;
  }
}

.path-arrow {
  display: flex;
  align-items: center;
}
</style>
