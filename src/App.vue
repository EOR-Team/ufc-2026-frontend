<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import vuetify from '@/plugins/vuetify'

const themeStore = useThemeStore()

// Apply saved theme on mount
onMounted(() => {
  themeStore.applyToVuetify(vuetify.theme)
})
</script>

<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<style>
html {
  overflow-y: auto;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #f7fafb;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Manrope', sans-serif;
}
</style>
