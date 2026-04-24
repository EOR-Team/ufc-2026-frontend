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
  hasPath?: boolean
  pathSteps?: string[]
  pathHighlights?: number[]
  showContinueBtn?: boolean
  isConfirmationList?: boolean
  listItems?: { label: string; value: string }[]
}

const messages = ref<Message[]>([
  {
    type: 'bot',
    content: '您好，我是您的智能导诊助手！为了给您提供更加准确的导诊服务，请您先描述一下自己前来就诊的原因、当前的感受等信息哦！'
  },
  {
    type: 'user',
    content: '我有点轻微头疼和发烧，两三天了，一直不是特别舒服所以来看病了。'
  },
  {
    type: 'bot',
    content: '我明白你的意思了！请确认一下您的当前状况，这有助于我们对您的病情进行建模：',
    isConfirmationList: true,
    listItems: [
      { label: '不适部位：', value: '头部疼痛；发烧' },
      { label: '严重程度：', value: '轻微' },
      { label: '持续时间：', value: '两三天' },
      { label: '具体描述：', value: '一直不是特别舒服' },
      { label: '其他信息：', value: '暂无' }
    ]
  },
  {
    type: 'user',
    content: '确认'
  },
  {
    type: 'bot',
    content: '好的！分析完您的病情后，为您选择了前往急诊诊室就诊！\n\n这是您的行进路程：',
    hasPath: true,
    pathSteps: ['入口（当前地点）', '挂号处', '急诊诊室', '缴费处', '药房', '出口'],
    pathHighlights: [0, 2, 5]
  },
  {
    type: 'user',
    content: '拿完药之后去上个洗手间。'
  },
  {
    type: 'bot',
    content: '我明白你的意思了！现在是新的行进路径：',
    hasPath: true,
    pathSteps: ['入口', '挂号处', '急诊诊室', '缴费处', '药房', '洗手间', '出口'],
    pathHighlights: [0, 2, 5, 6],
    showContinueBtn: true
  },
  {
    type: 'user',
    content: '确认'
  },
  {
    type: 'bot',
    content: '好的！开始导航！... 到达第一个目的地：挂号处！如果要继续导航，点击下方继续按钮！',
    showContinueBtn: true
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
    <header class="triage-header">
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
            <v-icon size="16" style="font-variation-settings: 'FILL' 1">mdi-robot</v-icon>
          </div>
          <div class="message-bubble bot-bubble">
            <p v-if="msg.content" class="message-text" style="white-space: pre-line">{{ msg.content }}</p>

            <!-- Confirmation List -->
            <ul v-if="msg.isConfirmationList && msg.listItems" class="confirmation-list">
              <li v-for="(item, i) in msg.listItems" :key="i">
                <span class="label">{{ item.label }}</span>
                <span class="value">{{ item.value }}</span>
              </li>
            </ul>

            <!-- Navigation Path -->
            <div v-if="msg.hasPath && msg.pathSteps" class="nav-path">
              <template v-for="(step, i) in msg.pathSteps" :key="i">
                <span
                  :class="['path-step', msg.pathHighlights?.includes(i) ? 'highlight' : '', i === 5 ? 'secondary' : '']"
                >
                  {{ step }}
                </span>
                <span v-if="i < msg.pathSteps.length - 1" class="path-arrow">
                  <v-icon size="12" color="#6e797b">mdi-arrow-right</v-icon>
                </span>
              </template>
            </div>

            <!-- Continue Button -->
            <button v-if="msg.showContinueBtn" class="continue-btn">
              <span>继续</span>
              <v-icon size="16">mdi-arrow-right</v-icon>
            </button>
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
          <v-icon size="20">mdi-send</v-icon>
        </button>
      </div>
    </div>
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
.triage-header {
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
  font-weight: 800;
  font-size: 1.25rem;
  color: $primary;
  letter-spacing: -0.02em;
  flex: 1;
  text-align: center;
}

// Chat Container
.chat-container {
  max-width: 48rem;
  margin: 0 auto;
  padding: 6rem 1rem 8rem;
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
    color: $primary;
  }
}

// Message Bubbles
.message-bubble {
  padding: 1rem;
  border-radius: 1rem;
  max-width: 80%;

  &.bot-bubble {
    background: $surface-container-highest;
    color: $on-surface;
    box-shadow: 0 8px 24px rgba($on-surface, 0.04);
  }

  &.user-bubble {
    background: linear-gradient(135deg, $primary 0%, $primary-container 100%);
    color: $on-primary;
    box-shadow: 0 8px 24px rgba($on-surface, 0.04);
  }
}

.message-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
}

// Confirmation List
.confirmation-list {
  list-style: disc inside;
  margin: 0.75rem 0;
  padding: 0.5rem 0;
  border-top: 1px solid rgba($on-surface, 0.08);
  border-bottom: 1px solid rgba($on-surface, 0.08);

  li {
    font-size: 0.875rem;
    line-height: 1.6;
    margin-bottom: 0.25rem;

    .label {
      font-weight: 500;
      color: $on-surface;
    }

    .value {
      color: $on-surface-variant;
    }
  }
}

// Navigation Path
.nav-path {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  padding: 0.5rem 0;
  margin-top: 0.5rem;

  .path-step {
    color: $on-surface-variant;

    &.highlight {
      color: $primary;
      font-weight: 500;
    }

    &.secondary {
      color: $secondary;
      font-weight: 500;
    }
  }

  .path-arrow {
    display: flex;
    align-items: center;
  }
}

// Continue Button
.continue-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  background: linear-gradient(135deg, $primary 0%, $primary-container 100%);
  color: $on-primary;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba($on-surface, 0.08);
  transition: all 300ms ease;
  margin-top: 1rem;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    box-shadow: 0 8px 24px rgba($on-surface, 0.12);
  }
}

// Chat Input
.chat-input-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
  padding: 1.5rem 1rem 2rem;
  background: linear-gradient(to top, $background 80%, transparent);
  pointer-events: none;

  @media (min-width: 768px) {
    bottom: 1.5rem;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    max-width: 48rem;
    padding: 1.5rem;
  }
}

.chat-input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  background: $surface-container-high;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba($on-surface, 0.06);
  border: 1px solid rgba($outline, 0.15);
  pointer-events: auto;
}

.chat-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
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
  box-shadow: 0 4px 12px rgba($on-surface, 0.08);
  transition: all 300ms ease;
  flex-shrink: 0;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    box-shadow: 0 8px 24px rgba($on-surface, 0.12);
  }
}
</style>
