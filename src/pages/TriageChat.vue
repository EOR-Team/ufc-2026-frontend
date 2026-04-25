<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import AppHeader from '@/components/ui/AppHeader.vue'
import ChatInput from '@/components/ui/ChatInput.vue'
import TypewriterText from '@/components/ui/TypewriterText.vue'
import ConfirmationList from '@/components/ui/ConfirmationList.vue'
import ConfirmButton from '@/components/ui/ConfirmButton.vue'
import NavPath from '@/components/ui/NavPath.vue'
import type { ChatMessage } from '~/types/chat'
import type { ComponentRefs, VisibilityState, ConfirmationListExposed, ConfirmButtonExposed, NavPathExposed } from '~/types/components'

const settings = useSettingsStore()

// Bot messages data
const botMessagesData: ChatMessage[] = [
  {
    type: 'bot',
    content: ['您好，我是您的智能导诊助手！为了给您提供更加准确的导诊服务，请您先描述一下自己前来就诊的原因、当前的感受等信息哦！']
  },
  {
    type: 'bot',
    content: [
      '我明白你的意思了！',
      { type: 'confirmation-list', items: [
        { label: '不适部位：', value: '头部疼痛；发烧' },
        { label: '严重程度：', value: '轻微' },
        { label: '持续时间：', value: '两三天' },
        { label: '具体描述：', value: '一直不是特别舒服' },
        { label: '其他信息：', value: '暂无' }
      ]},
      '请确认你的当前状况，这有助于我们对您的病情进行建模。',
      '如果觉得没问题，直接确认就行；',
      '如果觉得和你的感觉不同，就进行更改，直到完全符合你的感觉。',
      { type: 'confirm-button' }
    ]
  },
  {
    type: 'bot',
    content: [
      '我明白了！您说 {{highlight}}三四天{{/highlight}}。所以当前状况应该是：',
      { type: 'confirmation-list', items: [
        { label: '不适部位：', value: '头部疼痛；发烧' },
        { label: '严重程度：', value: '轻微' },
        { label: '持续时间：', value: '三四天' },
        { label: '具体描述：', value: '一直不是特别舒服' },
        { label: '其他信息：', value: '暂无' }
      ]},
      '还有什么问题吗？',
      { type: 'confirm-button' }
    ]
  },
  {
    type: 'bot',
    content: [
      '好的！分析完您的病情后，为您选择了前往 {{highlight}}急诊诊室{{/highlight}} 就诊！\n这是您的行进路程：\n',
      { type: 'nav-path', route: '入口（当前地点）+挂号处+急诊诊室+缴费处+药房+出口' },
      '\n有什么想修改的吗？直接说就好！\n如果没有，就确认吧！\n',
      { type: 'confirm-button' }
    ]
  },
  {
    type: 'bot',
    content: [
      '我明白你的意思了！现在是新的行进路径：\n',
      { type: 'nav-path', route: '入口+挂号处+急诊诊室+缴费处+药房+洗手间+出口' },
      '\n还想修改什么吗？\n',
      { type: 'confirm-button' }
    ]
  },
  {
    type: 'bot',
    content: ['好的！现在开始导航！']
  }
]

// Messages to display (only bot messages that have been "unlocked")
const displayedMessages = ref<ChatMessage[]>([botMessagesData[0]])

// Current bot message index (which bot message we're on)
const currentBotIndex = ref(0)

// Animation state
const isAnimating = ref(false)

// Auto-play animation for Message 1 on page load
onMounted(async () => {
  await nextTick()
  await playAnimationSequence(0)
})

// Component refs organized by message index
const componentRefsMap = ref<Map<number, ComponentRefs>>(new Map())
const visibilityMap = ref<Map<number, VisibilityState>>(new Map())

// Set visibility state for a message index
const setVisibility = (msgIdx: number, state: VisibilityState) => {
  visibilityMap.value.set(msgIdx, state)
}

// Get visibility state for a message index
const getVisibility = (msgIdx: number): VisibilityState => {
  return visibilityMap.value.get(msgIdx) || { confirmationList: false, confirmButton: false, navPath: false }
}

// Send message handler
const sendMessage = async (content: string) => {
  try {
    if (!content || isAnimating.value) return

    // Add user message
    displayedMessages.value.push({
      type: 'user',
      content: [content]
    })

    // Move to next bot message
    const nextBotIndex = currentBotIndex.value + 1

    // If there are more bot messages
    if (nextBotIndex < botMessagesData.length) {
      // Show the next bot message first (without animation)
      displayedMessages.value.push(botMessagesData[nextBotIndex])
      currentBotIndex.value = nextBotIndex

      // Wait for DOM update
      await nextTick()

      // Start animation sequence (use displayedMessages length - 1 as the key)
      const displayedBotIndex = displayedMessages.value.length - 1
      await playAnimationSequence(displayedBotIndex)
    }
  } catch (error) {
    console.error('Failed to send message:', error)
  }
}

// Set component refs for a specific message index
const setComponentRefs = (msgIndex: number, refs: ComponentRefs) => {
  componentRefsMap.value.set(msgIndex, refs)
}

// Get component refs for a specific message index
const getComponentRefs = (msgIndex: number): ComponentRefs | undefined => {
  return componentRefsMap.value.get(msgIndex)
}

// Play animation sequence for a specific bot message
const playAnimationSequence = async (displayedBotIndex: number) => {
  isAnimating.value = true

  const refs = getComponentRefs(displayedBotIndex)

  if (!refs) {
    isAnimating.value = false
    return
  }

  // Initialize visibility state - all components hidden initially
  setVisibility(displayedBotIndex, { confirmationList: false, confirmButton: false, navPath: false })

  // Get the actual message from displayedMessages
  const message = displayedMessages.value[displayedBotIndex]
  if (!message || message.type !== 'bot') {
    isAnimating.value = false
    return
  }

  let typewriterIdx = 0

  for (let i = 0; i < message.content.length; i++) {
    const block = message.content[i]

    if (typeof block === 'string') {
      // TypewriterText animation
      const typewriterRef = refs.typewriters[typewriterIdx]
      if (typewriterRef) {
        await typewriterRef.start()
      }
      typewriterIdx++
    } else if (block.type === 'confirmation-list') {
      // Set visibility to true before starting animation
      const currentVis = getVisibility(displayedBotIndex)
      setVisibility(displayedBotIndex, { ...currentVis, confirmationList: true })
      if (refs.confirmationList) {
        await refs.confirmationList.start()
      }
    } else if (block.type === 'confirm-button') {
      // Set visibility to true before starting animation
      const currentVis = getVisibility(displayedBotIndex)
      setVisibility(displayedBotIndex, { ...currentVis, confirmButton: true })
      if (refs.confirmButton) {
        await refs.confirmButton.start()
      }
    } else if (block.type === 'nav-path') {
      // Set visibility to true before starting animation
      const currentVis = getVisibility(displayedBotIndex)
      setVisibility(displayedBotIndex, { ...currentVis, navPath: true })
      if (refs.navPath) {
        await refs.navPath.start()
      }
    }

    // Wait 100ms before next animation (except for the last block)
    if (i < message.content.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  isAnimating.value = false
}

// Check if content should use typewriter (string-only message)
const shouldUseTypewriter = (msg: ChatMessage): boolean => {
  return msg.type === 'bot' && msg.content.every(block => typeof block === 'string')
}

// Handle confirm button click
// Only advances to next message when currentBotIndex >= 5 (i.e., on Message 5+)
const handleConfirmClick = async (msgIdx: number) => {
  try {
    if (isAnimating.value) return

    // Add user confirmation message
    displayedMessages.value.push({
      type: 'user',
      content: ['确认']
    })

    // Only advance to next bot message when on Message 5 or later
    // This allows user input to trigger Message 5, while confirm button triggers Message 6
    if (currentBotIndex.value >= 5) {
      const nextBotIndex = currentBotIndex.value + 1

      if (nextBotIndex < botMessagesData.length) {
        // Show the next bot message first (without animation)
        displayedMessages.value.push(botMessagesData[nextBotIndex])
        currentBotIndex.value = nextBotIndex

        // Wait for DOM update
        await nextTick()

        // Start animation sequence (use displayedMessages length - 1 as the key)
        const displayedBotIndex = displayedMessages.value.length - 1
        await playAnimationSequence(displayedBotIndex)
      }
    }
  } catch (error) {
    console.error('Failed to handle confirm:', error)
  }
}
</script>

<template>
  <v-main>
    <!-- Header -->
    <AppHeader title="健康管家" />

    <!-- Chat Messages -->
    <div class="chat-container">
      <template v-for="(msg, idx) in displayedMessages" :key="idx">
        <!-- Bot message -->
        <div
          v-if="msg.type === 'bot'"
          class="message-wrapper bot-wrapper"
        >
          <div class="bot-avatar">
            <v-icon size="16" style="font-variation-settings: 'FILL' 1">mdi-robot</v-icon>
          </div>
          <div class="message-bubble bot-bubble">
            <!-- Simple text-only message: use typewriter for full content -->
            <template v-if="shouldUseTypewriter(msg)">
              <TypewriterText
                :ref="el => {
                  if (el) {
                    const refs = getComponentRefs(idx) || { typewriters: [], confirmationList: null, confirmButton: null, navPath: null }
                    refs.typewriters = [el as InstanceType<typeof TypewriterText>]
                    setComponentRefs(idx, refs)
                  }
                }"
                :content="(msg.content as string[]).join('')"
              />
            </template>
            <!-- Rich content: render each block -->
            <template v-else>
              <template v-for="(block, bIdx) in msg.content" :key="bIdx">
                <!-- String: render as typewriter text -->
                <TypewriterText
                  v-if="typeof block === 'string'"
                  :ref="el => {
                    if (el) {
                      const refs = getComponentRefs(idx) || { typewriters: [], confirmationList: null, confirmButton: null, navPath: null }
                      refs.typewriters.push(el as InstanceType<typeof TypewriterText>)
                      setComponentRefs(idx, refs)
                    }
                  }"
                  :content="block"
                />
                <!-- Confirmation List -->
                <ConfirmationList
                  v-else-if="block.type === 'confirmation-list'"
                  :ref="el => {
                    if (el) {
                      const refs = getComponentRefs(idx) || { typewriters: [], confirmationList: null, confirmButton: null, navPath: null }
                      refs.confirmationList = el as unknown as ConfirmationListExposed
                      setComponentRefs(idx, refs)
                    }
                  }"
                  :items="block.items"
                  :visible="getVisibility(idx).confirmationList"
                />
                <!-- Confirm Button -->
                <ConfirmButton
                  v-else-if="block.type === 'confirm-button'"
                  :ref="el => {
                    if (el) {
                      const refs = getComponentRefs(idx) || { typewriters: [], confirmationList: null, confirmButton: null, navPath: null }
                      refs.confirmButton = el as unknown as ConfirmButtonExposed
                      setComponentRefs(idx, refs)
                    }
                  }"
                  :visible="getVisibility(idx).confirmButton"
                  @click="handleConfirmClick(idx)"
                />
                <!-- Nav Path -->
                <NavPath
                  v-else-if="block.type === 'nav-path'"
                  :ref="el => {
                    if (el) {
                      const refs = getComponentRefs(idx) || { typewriters: [], confirmationList: null, confirmButton: null, navPath: null }
                      refs.navPath = el as unknown as NavPathExposed
                      setComponentRefs(idx, refs)
                    }
                  }"
                  :route="block.route"
                  :visible="getVisibility(idx).navPath"
                />
              </template>
            </template>
          </div>
        </div>
        <!-- User message -->
        <div
          v-else
          class="message-wrapper user-wrapper"
        >
          <div class="message-bubble user-bubble">
            <span class="user-message-text">{{ (msg.content as string[]).join('') }}</span>
          </div>
        </div>
      </template>
    </div>

    <!-- Chat Input -->
    <ChatInput
      placeholder="输入你想说的..."
      @send="sendMessage"
    />
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

.user-message-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
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
</style>
