# 组件编写规范

## 页面组件模板

### 标准页面结构

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

// Store
const settings = useSettingsStore()
const router = useRouter()

// 状态
const messageInput = ref('')

// 方法
const goBack = () => {
  router.back()
}

const sendMessage = () => {
  if (messageInput.value.trim()) {
    // 处理逻辑
    messageInput.value = ''
  }
}
</script>

<template>
  <v-main>
    <!-- Header -->
    <header class="page-header">
      <button class="header-btn" @click="goBack">
        <v-icon size="24">mdi-arrow-left</v-icon>
      </button>
      <h1 class="header-title">页面标题</h1>
      <div class="header-spacer"></div>
    </header>

    <!-- Main Content -->
    <main class="page-main">
      <!-- 页面内容 -->
    </main>
  </v-main>
</template>

<style scoped lang="scss">
// Design Tokens
$primary: #00606d;
$primary-container: #007b8b;
$secondary-container: #8bf1e6;
$surface-container-low: #f1f4f5;
$surface-container: #ebeeef;
$surface-container-high: #e5e9ea;
$surface-container-highest: #e0e3e4;
$surface-container-lowest: #ffffff;
$on-surface: #181c1d;
$on-surface-variant: #3e494b;
$on-primary: #ffffff;
$background: #f7fafb;
$outline: #6e797b;
$secondary: #006a63;

// Header
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba($background, 0.8);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 40px rgba($on-surface, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  height: 64px;

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
    font-weight: 700;
    font-size: 1.25rem;
    color: $primary;
    letter-spacing: -0.02em;
    flex: 1;
    text-align: center;
  }

  .header-spacer {
    width: 48px;
  }
}

// Main Content
.page-main {
  padding-top: 6rem; // 64px header + 1rem spacing
  max-width: 48rem;
  margin: 0 auto;
}
</style>
```

## 聊天页面组件

### 聊天页面模板

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

const router = useRouter()
const settings = useSettingsStore()
const messageInput = ref('')

interface Message {
  type: 'bot' | 'user'
  content: string
}

const messages = ref<Message[]>([
  {
    type: 'bot',
    content: '您好！有什么我可以给您服务的吗？'
  }
])

const sendMessage = () => {
  if (messageInput.value.trim()) {
    messages.value.push({
      type: 'user',
      content: messageInput.value.trim()
    })
    messageInput.value = ''
  }
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <v-main>
    <!-- Header -->
    <header class="chat-header">
      <button class="header-btn" @click="goBack">
        <v-icon size="24">mdi-arrow-left</v-icon>
      </button>
      <h1 class="header-title">健康管家</h1>
      <router-link to="/settings">
        <button class="header-btn">
          <v-icon size="24">mdi-cog</v-icon>
        </button>
      </router-link>
    </header>

    <!-- Chat Messages -->
    <div class="chat-container">
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="['message-wrapper', msg.type === 'user' ? 'user-wrapper' : 'bot-wrapper']"
      >
        <!-- Bot Message -->
        <template v-if="msg.type === 'bot'">
          <div class="bot-avatar">
            <v-icon size="18" style="font-variation-settings: 'FILL' 1">mdi-health-and-safety</v-icon>
          </div>
          <div class="message-bubble bot-bubble">
            <p class="message-text" style="white-space: pre-line">{{ msg.content }}</p>
          </div>
        </template>

        <!-- User Message -->
        <template v-else>
          <div class="message-bubble user-bubble">
            <span class="message-text">{{ msg.content }}</span>
          </div>
        </template>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="chat-input-wrapper">
      <div class="chat-input-container">
        <input
          v-model="messageInput"
          type="text"
          class="chat-input"
          placeholder="输入你想说的..."
          @keyup.enter="sendMessage"
        />
        <button class="send-btn" @click="sendMessage">
          <v-icon size="24">mdi-send</v-icon>
        </button>
      </div>
    </div>
  </v-main>
</template>

<style scoped lang="scss">
$primary: #00606d;
$primary-container: #007b8b;
$secondary-container: #8bf1e6;
$surface-container-low: #f1f4f5;
$surface-container-high: #e5e9ea;
$surface-container-highest: #e0e3e4;
$surface-container-lowest: #ffffff;
$on-surface: #181c1d;
$on-surface-variant: #3e494b;
$on-primary: #ffffff;
$background: #f7fafb;
$outline: #6e797b;
$secondary: #006a63;

.chat-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba($background, 0.8);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  height: 64px;

  .header-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: $on-surface-variant;
    transition: all 200ms ease;

    &:hover {
      background: $surface-container;
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .header-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: 1.125rem;
    color: $primary;
  }
}

.chat-container {
  max-width: 48rem;
  margin: 0 auto;
  padding: 6rem 1rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

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
  max-width: 85%;

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

.chat-input-wrapper {
  position: fixed;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  z-index: 40;
  padding: 0 1rem;

  @media (min-width: 768px) {
    max-width: 48rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 2rem;
  }
}

.chat-input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  background: $surface-container-high;
  border-radius: 9999px;
  box-shadow: 0 4px 40px rgba($on-surface, 0.06);
  border: 1px solid rgba($outline, 0.15);
}

.chat-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  color: $on-surface;

  &::placeholder {
    color: rgba($on-surface-variant, 0.6);
  }
}

.send-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $primary 0%, $primary-container 100%);
  color: $on-primary;
  border-radius: 50%;
  transition: all 200ms ease;
  flex-shrink: 0;

  &:active {
    transform: scale(0.95);
  }
}
</style>
```

## 首页卡片组件

```vue
<template>
  <div class="page-wrapper">
    <main class="main-container">
      <!-- 欢迎区块 -->
      <section class="welcome-section">
        <h1 class="welcome-headline">
          今天 AI 能为您提供什么帮助？
        </h1>
      </section>

      <!-- 服务卡片 -->
      <section class="cards-section">
        <div class="cards-grid">
          <router-link to="/triage-chat" class="service-card">
            <div class="card-content">
              <div class="icon-container">
                <v-icon size="32" color="#006f67">mdi-medical-bag</v-icon>
              </div>
              <h2 class="card-title">智能导诊助手</h2>
              <p class="card-description">帮助您快速前往相应诊室。</p>
            </div>
            <div class="card-action">
              <v-btn icon size="48" class="arrow-btn">
                <v-icon size="24" color="white">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
$primary: #00606d;
$primary-container: #007b8b;
$secondary-container: #8bf1e6;
$surface-container-low: #f1f4f5;
$surface-container: #ebeeef;
$surface-container-lowest: #ffffff;
$on-surface: #181c1d;
$on-surface-variant: #3e494b;
$background: #f7fafb;

.page-wrapper {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.main-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem 6rem;
  flex: 1;
}

.welcome-section {
  margin-bottom: 3rem;

  @media (min-width: 960px) {
    margin-bottom: 4rem;
    margin-left: 2rem;
  }
}

.welcome-headline {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 1.2;
  color: $on-surface;
  max-width: 36rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.service-card {
  background: $surface-container;
  border-radius: 1rem;
  padding: 2rem;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    background: $surface-container-lowest;

    .arrow-btn {
      transform: scale(1.05);
    }
  }
}

.icon-container {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: $secondary-container;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.card-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: $on-surface;
  margin-bottom: 0.75rem;
}

.card-description {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  line-height: 1.6;
  color: $on-surface-variant;
}

.card-action {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.arrow-btn {
  width: 48px !important;
  height: 48px !important;
  background: linear-gradient(135deg, $primary 0%, $primary-container 100%) !important;
}
</style>
```

## 设置页面组件

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

const router = useRouter()
const settings = useSettingsStore()

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
        <!-- Section -->
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
            <label class="toggle-switch">
              <input v-model="settings.useOnlineModel" type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </section>
      </div>
    </main>
  </v-main>
</template>

<style scoped lang="scss">
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

.settings-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba($background, 0.8);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;

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
    flex: 1;
    text-align: center;
  }

  .header-spacer {
    width: 48px;
  }
}

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

.section-title {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  color: $primary;
  padding-left: 0.5rem;
}

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
}
</style>
```

## 常见模式

### 消息内容渲染

```vue
<!-- 支持换行 -->
<p class="message-text" style="white-space: pre-line">{{ msg.content }}</p>
```

### 条件渲染

```vue
<!-- Bot 消息带仪表盘 -->
<template v-if="msg.type === 'bot'">
  <div class="bot-avatar">...</div>
  <div class="message-bubble bot-bubble">
    <p>{{ msg.content }}</p>
    <div v-if="msg.hasDashboard" class="recovery-dashboard">
      <!-- 仪表盘内容 -->
    </div>
  </div>
</template>
```

### 列表渲染

```vue
<ul class="checklist">
  <li
    v-for="(item, i) in msg.checklist"
    :key="i"
    :class="['checklist-item', item.done ? 'done' : 'pending']"
  >
    <v-icon size="20">
      {{ item.done ? 'mdi-check-circle' : 'mdi-radio-button-unchecked' }}
    </v-icon>
    <div class="checklist-content">
      <span class="checklist-text">{{ item.text }}</span>
    </div>
  </li>
</ul>
```

## 响应式断点

| 断点 | 宽度 | 典型用途 |
|------|------|----------|
| Mobile | `< 600px` | 手机竖屏 |
| Tablet | `600px - 960px` | 平板、手机横屏 |
| Desktop | `>= 960px` | 桌面 |

### 响应式文本

```scss
.welcome-headline {
  font-size: 2.5rem;

  @media (min-width: 600px) {
    font-size: 2.75rem;
  }

  @media (min-width: 1280px) {
    font-size: 3rem;
  }
}
```

## 过渡动画

### 按钮交互

```scss
.button {
  transition: all 300ms ease;

  &:hover {
    box-shadow: 0 8px 24px rgba($on-surface, 0.12);
  }

  &:active {
    transform: scale(0.95);
  }
}
```

### 卡片悬停

```scss
.card {
  transition: all 300ms ease;

  &:hover {
    background: $surface-container-lowest;
    box-shadow: 0 8px 50px rgba($on-surface, 0.08);
  }
}
```

## 状态类

| 状态 | 使用场景 | 样式特征 |
|------|----------|----------|
| Default | 正常状态 | 基础样式 |
| Hover | 鼠标悬停 | 轻微阴影、背景变化 |
| Active/Pressed | 点击按压 | scale(0.95)、背景加深 |
| Disabled | 禁用状态 | opacity: 0.5、cursor: not-allowed |
| Loading | 加载中 | 禁用交互、显示加载指示 |
| Focus | 键盘焦点 | outline: 2px solid $primary |
