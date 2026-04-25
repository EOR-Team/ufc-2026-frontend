<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppHeader from '@/components/ui/AppHeader.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <v-main>
    <AppHeader title="健康管家" />

    <div class="about-container">
      <div class="about-card">
        <div class="app-icon">
          <v-icon size="48" color="#006a63">mdi-health-and-safety</v-icon>
        </div>

        <h1 class="app-name">健康管家</h1>
        <p class="app-tagline">您的 AI 智能健康助手</p>

        <div class="divider"></div>

        <section class="about-section">
          <h2 class="section-title">关于应用</h2>
          <p class="section-text">
            健康管家是一款基于人工智能的健康咨询应用，旨在为用户提供便捷、专业的健康指导服务。通过智能导诊和个性化康复计划，帮助您更好地管理健康。
          </p>
        </section>

        <section class="about-section">
          <h2 class="section-title">核心功能</h2>
          <ul class="feature-list">
            <li class="feature-item">
              <v-icon size="20" color="#006a63" class="feature-icon">mdi-medical-bag</v-icon>
              <span>智能导诊 - 快速了解您的就诊需求</span>
            </li>
            <li class="feature-item">
              <v-icon size="20" color="#006a63" class="feature-icon">mdi-hospital-box</v-icon>
              <span>康复计划 - 个性化病后恢复指导</span>
            </li>
            <li class="feature-item">
              <v-icon size="20" color="#006a63" class="feature-icon">mdi-robot</v-icon>
              <span>AI 驱动 - 智能分析提供精准建议</span>
            </li>
          </ul>
        </section>

        <div class="divider"></div>

        <section class="about-section">
          <h2 class="section-title">版本信息</h2>
          <p class="version-text">版本 1.0.0</p>
        </section>
      </div>

      <button class="home-btn" @click="goHome">
        <v-icon size="20">mdi-home</v-icon>
        <span>返回首页</span>
      </button>
    </div>
  </v-main>
</template>

<style scoped lang="scss">
$primary: #00606d;
$primary-container: #007b8b;
$secondary-container: #8bf1e6;
$surface-container-low: #f1f4f5;
$surface-container-high: #e5e9ea;
$surface-container: #ebeeef;
$surface-container-lowest: #ffffff;
$on-surface: #181c1d;
$on-surface-variant: #3e494b;
$on-primary: #ffffff;
$background: #f7fafb;
$outline: #6e797b;
$secondary: #006a63;

.about-container {
  max-width: 48rem;
  margin: 0 auto;
  padding: 6rem 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-card {
  width: 100%;
  background: $surface-container-low;
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.app-icon {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: $secondary-container;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.app-name {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: $on-surface;
  margin-bottom: 0.5rem;
}

.app-tagline {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: $on-surface-variant;
  margin-bottom: 0;
}

.divider {
  width: 100%;
  height: 1px;
  background: rgba($outline, 0.15);
  margin: 2rem 0;
}

.about-section {
  width: 100%;
  text-align: left;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: $primary;
  margin-bottom: 0.75rem;
}

.section-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: $on-surface-variant;
  margin: 0;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  color: $on-surface;
}

.feature-icon {
  flex-shrink: 0;
}

.version-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: $on-surface-variant;
  margin: 0;
}

.home-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, $primary 0%, $primary-container 100%);
  color: $on-primary;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 300ms ease;
  box-shadow: 0 4px 20px rgba($primary, 0.25);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba($primary, 0.35);
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
