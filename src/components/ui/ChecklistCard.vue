<script setup lang="ts">
export interface ChecklistItem {
  text: string
  subtext: string
  done: boolean
  urgent?: boolean
}

interface Props {
  title: string
  icon?: string
  items: ChecklistItem[]
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'mdi-fact-check'
})

const emit = defineEmits<{
  (e: 'toggle', index: number): void
}>()

const toggle = (index: number) => {
  emit('toggle', index)
}
</script>

<template>
  <div class="dashboard-card">
    <div class="checklist-header">
      <v-icon size="20" color="#006a63">{{ icon }}</v-icon>
      <h3 class="card-title">{{ title }}</h3>
    </div>
    <ul class="checklist">
      <li
        v-for="(item, i) in items"
        :key="i"
        :class="['checklist-item', item.done ? 'done' : 'pending']"
        @click="toggle(i)"
      >
        <v-icon
          size="20"
          :color="item.done ? '#006a63' : '#6e797b'"
          :style="item.done ? 'font-variation-settings: \'FILL\' 1' : ''"
        >
          {{ item.done ? 'mdi-check-circle' : 'mdi-radio-button-unchecked' }}
        </v-icon>
        <div class="checklist-content">
          <span class="checklist-text">{{ item.text }}</span>
          <span class="checklist-subtext" :class="{ urgent: item.urgent && !item.done }">
            {{ item.subtext }}
          </span>
        </div>
      </li>
    </ul>
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

.checklist-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.card-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-on-surface);
}

.checklist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: var(--color-surface-container-low);
  transition: all 200ms ease;
  cursor: pointer;

  &:hover {
    background: var(--color-surface-container);
  }

  &.done {
    .checklist-text {
      text-decoration: line-through;
      opacity: 0.7;
    }
    .checklist-subtext {
      opacity: 0.7;
    }
  }

  &.pending {
    .checklist-text {
      color: var(--color-on-surface);
    }
  }
}

.checklist-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.checklist-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-on-surface);
}

.checklist-subtext {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: var(--color-on-surface-variant);
  margin-top: 0.125rem;

  &.urgent {
    color: var(--color-error);
    font-weight: 500;
  }
}
</style>
