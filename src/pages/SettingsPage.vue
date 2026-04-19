<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const useOnlineModel = ref(true)
const useVoiceReading = ref(true)

const goBack = () => {
  router.back()
}
</script>

<template>
  <v-main>
    <!-- Header -->
    <header class="settings-header">
      <button class="header-btn" @click="goBack">
        <v-icon size="24">mdi-arrow-left</v-icon>
      </button>
      <h1 class="header-title">通用设置</h1>
      <div class="header-spacer"></div>
    </header>

    <!-- Main Content -->
    <main class="settings-main">
      <div class="settings-container">
        <!-- Section: 模型设置 -->
        <section class="settings-section">
          <h3 class="section-title">模型设置</h3>
          <div class="settings-card">
            <div class="card-content">
              <div class="card-header">
                <div class="icon-container">
                  <v-icon size="20" color="#006a63">mdi-cloud-sync</v-icon>
                </div>
                <h4 class="card-title">使用在线模型</h4>
              </div>
              <p class="card-description">开启后可获得最新的 AI 智能分析结果。</p>
            </div>
            <!-- Toggle Switch -->
            <label class="toggle-switch">
              <input v-model="useOnlineModel" type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </section>

        <!-- Section: 语音设置 -->
        <section class="settings-section">
          <h3 class="section-title">语音设置</h3>
          <div class="settings-card">
            <div class="card-content">
              <div class="card-header">
                <div class="icon-container">
                  <v-icon size="20" color="#006a63">mdi-record-voice-over</v-icon>
                </div>
                <h4 class="card-title">使用语音朗读</h4>
              </div>
              <p class="card-description">自动朗读助手的回复内容。</p>
            </div>
            <!-- Toggle Switch -->
            <label class="toggle-switch">
              <input v-model="useVoiceReading" type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </section>
      </div>
    </main>
  </v-main>
</template>

<style scoped lang="scss">
// Clinical Sanctuary Design Tokens
$primary: #00606d;
$primary-container: #007b8b;
$secondary-container: #8bf1e6;
$surface-container-low: #f1f4f5;
$surface-container-high: #e5e9ea;
$surface-container-highest: #e0e3e4;
$surface-container: #ebeeef;
$surface-container-lowest: #ffffff;
$on-surface: #181c1d;
$on-surface-variant: #3e494b;
$on-primary: #ffffff;
$background: #f7fafb;
$outline: #6e797b;
$secondary: #006a63;

// Header
.settings-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(#f7fafb, 0.8);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 40px rgba($on-surface, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
}

.header-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: $primary;
  transition: all 300ms ease;

  &:hover {
    background: $surface-container-low;
  }

  &:active {
    transform: scale(0.95);
  }
}

.header-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  color: $primary;
  letter-spacing: -0.02em;
  flex: 1;
  text-align: center;
}

.header-spacer {
  width: 48px;
}

// Main Content
.settings-main {
  padding: 6rem 1.5rem 2rem;
  max-width: 48rem;
  margin: 0 auto;
}

.settings-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  color: $primary;
  padding-left: 0.5rem;
}

// Settings Card
.settings-card {
  background: $surface-container-low;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  transition: all 300ms ease;

  &:hover {
    background: $surface-container-lowest;
    box-shadow: 0 8px 24px rgba($on-surface, 0.04);
  }
}

.card-content {
  flex: 1;
  padding-right: 1rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.icon-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: $secondary-container;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: $on-surface;
}

.card-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  color: $on-surface-variant;
  padding-left: calc(40px + 0.75rem);
}

// Toggle Switch
.toggle-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-top: 0.5rem;

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-slider {
    width: 44px;
    height: 24px;
    background: $surface-container-high;
    border-radius: 9999px;
    position: relative;
    transition: all 300ms ease;

    &::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      border: 1px solid $outline;
      transition: all 300ms ease;
    }
  }

  input:checked + .toggle-slider {
    background: $primary;

    &::before {
      transform: translateX(20px);
      border-color: white;
    }
  }

  input:focus + .toggle-slider {
    outline: none;
  }
}
</style>
