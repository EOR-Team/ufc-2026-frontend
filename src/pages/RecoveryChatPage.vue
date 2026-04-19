<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const messageInput = ref('')
const dischargeDay = ref(4)

interface ChecklistItem {
  text: string
  subtext: string
  done: boolean
  urgent?: boolean
}

interface Message {
  type: 'bot' | 'user'
  content?: string
  hasDashboard?: boolean
  progressPercent?: number
  progressTitle?: string
  progressDescription?: string
  checklist?: ChecklistItem[]
}

const checklistItems = ref<ChecklistItem[]>([
  { text: '阿莫西林 (500mg)', subtext: '已于上午 8:00 服用', done: true },
  { text: '喝 240ml 温茶/汤', subtext: '现在建议服用', done: false, urgent: true },
  { text: '呼吸练习 (10 分钟)', subtext: '预约下午 2:00', done: false }
])

const messages = ref<Message[]>([
  {
    type: 'bot',
    content: '早上好。我正在查看您可穿戴设备的生命体征数据。您的静息心率已经趋于稳定。与昨天相比，您今天感觉如何？'
  },
  {
    type: 'user',
    content: '我觉得更有精神了一点。咳嗽还在，但没再发烧了。'
  },
  {
    type: 'bot',
    content: '这是非常棒的进展。不发烧是一个非常积极的信号。由于您仍在咳嗽，请记得多喝温水，今天继续休息以积蓄康复所需的能量。我已经更新了您的每日仪表盘。',
    hasDashboard: true,
    progressPercent: 65,
    progressTitle: '呼吸系统康复',
    progressDescription: '炎症正在消退。预计 3-5 天内完全好转。',
    checklist: checklistItems.value
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
    <header class="recovery-header">
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

    <!-- Contextual Status Badge -->
    <div class="status-badge-container">
      <span class="status-badge">
        <v-icon size="14">mdi-calendar-today</v-icon>
        出院第 {{ dischargeDay }} 天
      </span>
    </div>

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
            <p v-if="msg.content" class="message-text" style="white-space: pre-line">{{ msg.content }}</p>

            <!-- Recovery Dashboard -->
            <div v-if="msg.hasDashboard" class="recovery-dashboard">
              <!-- Progress Tracker Card -->
              <div class="dashboard-card">
                <div class="card-header">
                  <h3 class="card-title">{{ msg.progressTitle }}</h3>
                  <span class="progress-badge">{{ msg.progressPercent }}%</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" :style="{ width: msg.progressPercent + '%' }"></div>
                </div>
                <p class="progress-description">{{ msg.progressDescription }}</p>
              </div>

              <!-- Treatment Checklist Card -->
              <div class="dashboard-card">
                <div class="checklist-header">
                  <v-icon size="20" color="#006a63">mdi-fact-check</v-icon>
                  <h3 class="card-title">今日治疗计划</h3>
                </div>
                <ul class="checklist">
                  <li
                    v-for="(item, i) in msg.checklist"
                    :key="i"
                    :class="['checklist-item', item.done ? 'done' : 'pending']"
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
            </div>
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
          placeholder="回复助手..."
          @keyup.enter="sendMessage"
        />
        <button class="send-btn" @click="sendMessage">
          <v-icon size="24" style="font-variation-settings: 'FILL' 1">mdi-send</v-icon>
        </button>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <button class="nav-item">
        <v-icon size="24">mdi-home-health</v-icon>
        <span>首页</span>
      </button>
      <button class="nav-item active">
        <v-icon size="24" style="font-variation-settings: 'FILL' 1">mdi-chat</v-icon>
        <span>聊天</span>
      </button>
      <button class="nav-item">
        <v-icon size="24">mdi-person</v-icon>
        <span>我的</span>
      </button>
    </nav>
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
$error: #ba1a1a;

// Header
.recovery-header {
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
  height: 64px;
}

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
  letter-spacing: -0.02em;
}

// Status Badge
.status-badge-container {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  z-index: 40;
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: $surface-container-high;
  color: $on-surface-variant;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
}

// Chat Container
.chat-container {
  max-width: 48rem;
  margin: 0 auto;
  padding: 7rem 1rem 10rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

// Message Wrappers
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

// Bot Avatar
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

// Message Bubbles
.message-bubble {
  padding: 1rem;
  border-radius: 1rem;
  max-width: 85%;

  @media (min-width: 768px) {
    max-width: 80%;
  }

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

// Recovery Dashboard
.recovery-dashboard {
  margin-top: 1rem;
  padding-left: 2.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

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
  color: $on-surface-variant;
  margin-top: 0.75rem;
}

.checklist-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
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
  background: $surface-container-low;
  transition: all 200ms ease;
  cursor: pointer;

  &:hover {
    background: $surface-container;
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
      color: $on-surface;
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
  color: $on-surface;
}

.checklist-subtext {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: $on-surface-variant;
  margin-top: 0.125rem;

  &.urgent {
    color: $error;
    font-weight: 500;
  }
}

// Chat Input
.chat-input-wrapper {
  position: fixed;
  bottom: 88px;
  left: 0;
  right: 0;
  z-index: 40;
  padding: 0 1rem 1rem;

  @media (min-width: 768px) {
    max-width: 48rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 2rem 1rem;
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
  box-shadow: 0 4px 40px rgba($on-surface, 0.06);
  transition: all 200ms ease;
  flex-shrink: 0;

  &:active {
    transform: scale(0.95);
  }
}

// Bottom Navigation
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.75rem 1rem 1.5rem;
  background: rgba(#f7fafb, 0.9);
  backdrop-filter: blur(20px);
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  box-shadow: 0 -1px 0 rgba(189, 200, 203, 0.15), 0 -8px 30px rgba(0, 0, 0, 0.04);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $on-surface-variant;
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  min-width: 4rem;
  transition: all 300ms ease;

  .v-icon {
    margin-bottom: 0.25rem;
  }

  span {
    margin-top: 0.25rem;
  }

  &.active {
    color: white;
    background: $primary;
  }

  &:active {
    transform: scale(0.9);
  }
}
</style>
