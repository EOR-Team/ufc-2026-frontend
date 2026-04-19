<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify'

const theme = useTheme()
</script>

<template>
  <v-app>
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title>UFC 2026</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" variant="text">Home</v-btn>
      <v-btn to="/about" variant="text">About</v-btn>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <v-footer color="grey-darken-3" class="text-center d-flex flex-column">
      <div class="text-body-2 text-medium-emphasis">
        UFC 2026 - Ultimate Fighting Championship Tracker
      </div>
    </v-footer>
  </v-app>
</template>

<style>
html {
  overflow-y: auto;
}
</style>
