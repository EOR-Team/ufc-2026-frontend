# TriageChat 深入实现文档

## 概述

TriageChat 是智能导诊聊天页面，采用 Vue 3 Composition API + TypeScript 实现。核心功能是模拟 AI 导诊助手与用户的对话交互，支持多内容块（text、confirmation-list、confirm-button）的顺序动画展示。

---

## 1. 架构设计

### 1.1 组件层级

```
TriageChat.vue (页面容器)
├── AppHeader.vue         # 顶部导航栏
├── ChatInput.vue        # 底部消息输入框
└── 动态内容块
    ├── TypewriterText.vue    # 打字机文本
    ├── ConfirmationList.vue # 确认列表
    └── ConfirmButton.vue    # 确认按钮
```

### 1.2 核心概念：ContentBlock

TriageChat 定义了一个联合类型 `ContentBlock` 来表示消息内的多种内容形态：

```typescript
type ContentBlock =
  | string                           // 普通文本
  | { type: 'confirmation-list'; items: { label: string; value: string }[] }
  | { type: 'confirm-button' }
```

**设计意图**：将消息内容从单一字符串扩展为内容块数组，支持混合多种内容类型。

### 1.3 数据流

```
botMessagesData (静态数据)
    ↓ (用户发送消息后解锁)
displayedMessages (响应式显示状态)
    ↓
playAnimationSequence() (顺序动画控制)
    ↓
各子组件 .start() (触发动画)
```

### 1.4 状态管理

| 状态 | 类型 | 用途 |
|------|------|------|
| `displayedMessages` | `ref<Message[]>` | 已解锁并显示的消息 |
| `currentBotIndex` | `ref<number>` | 当前播放到第几个 bot 消息 |
| `isAnimating` | `ref<boolean>` | 动画序列是否正在播放 |
| `componentRefsMap` | `ref<Map>` | 存储各消息的子组件引用 |
| `visibilityMap` | `ref<Map>` | 控制 confirmation-list 和 confirm-button 的可见性 |

---

## 2. 核心模块详解

### 2.1 TypewriterText.vue

**职责**：字符级打字机动画，带淡入效果。

**Props**：
```typescript
interface Props {
  content: string           // 要显示的文本
  font?: string             // 字体配置，默认 '14px Inter'
  animationDuration?: { min: number; max: number }  // 字符间隔，随机 30-45ms
  skipAnimation?: boolean   // 跳过动画（首条欢迎消息使用）
}
```

**核心机制**：
- `displayedChars`: `CharState[]` 数组，每个字符跟踪 `{ text: string, fading: boolean }`
- 每个新字符以 `fading: true` 入场，触发 180ms CSS 淡入动画
- 动画结束后 `fading: false`，字符保持显示
- 使用 `setTimeout` + 随机间隔实现不均匀打字节奏

**Expose**：
```typescript
defineExpose({ start })  // 外部控制开始动画
```

### 2.2 ConfirmationList.vue

**职责**：带打字机效果的确认列表，label + value 逐字显示。

**Props**：
```typescript
interface Props {
  items: { label: string; value: string }[]
  visible?: boolean  // 控制组件是否占据空间，默认为 true
}
```

**动画流程**：
1. **Fade-in**：`isVisible.value = true`，250ms 过渡
2. **逐项打字**：
   - 每个 item：label 逐字 → 150ms 停顿 → value 逐字 → 200ms 停顿 → 下一项
   - 字符间隔 20ms

**状态跟踪**：
```typescript
interface ItemState {
  labelDisplayed: string
  valueDisplayed: string
  isLabelDone: boolean
  isValueDone: boolean
}
```

**Expose**：`{ start }` — 返回 Promise，动画全部完成后 resolve。

### 2.3 ConfirmButton.vue

**职责**：简单确认按钮，带 fade + translate 进场动画。

**Props**：
```typescript
interface Props {
  visible?: boolean  // 是否显示
}
```

**动画**：250ms opacity 0→1 + translateY(8px→0)。

**Expose**：`{ start }` — 返回 Promise，250ms 后 resolve。

---

## 3. 动画序列编排

### 3.1 playAnimationSequence()

这是核心编排函数，按顺序触发每个 ContentBlock 的动画：

```typescript
const playAnimationSequence = async (displayedBotIndex: number) => {
  isAnimating.value = true

  const message = displayedMessages.value[displayedBotIndex]

  for (let i = 0; i < message.content.length; i++) {
    const block = message.content[i]

    if (typeof block === 'string') {
      // TypewriterText 动画
      await typewriterRef.start()
    } else if (block.type === 'confirmation-list') {
      // 设置可见性 + 动画
      setVisibility(msgIdx, { ...vis, confirmationList: true })
      await refs.confirmationList.start()
    } else if (block.type === 'confirm-button') {
      // 设置可见性 + 动画
      setVisibility(msgIdx, { ...vis, confirmButton: true })
      await refs.confirmButton.start()
    }

    // 块间 100ms 间隔
    if (i < message.content.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  isAnimating.value = false
}
```

### 3.2 组件 Ref 注册机制

通过模板 `ref` 回调动态注册组件引用：

```typescript
:ref="el => {
  if (el) {
    const refs = getComponentRefs(idx) || { typewriters: [], confirmationList: null, confirmButton: null }
    refs.typewriters.push(el as InstanceType<typeof TypewriterText>)
    setComponentRefs(idx, refs)
  }
}"
```

**设计意图**：避免预先静态定义 ref 数组，支持动态内容块数量。

### 3.3 VisibilityMap

`visibilityMap` 解决「组件渲染但不可见」的需求：

```typescript
// 初始：全部隐藏
setVisibility(displayedBotIndex, { confirmationList: false, confirmButton: false })

// 当需要显示 confirmation-list 时
setVisibility(displayedBotIndex, { ...currentVis, confirmationList: true })
```

这使得组件先渲染到 DOM（能被 ref 捕获），但视觉上保持隐藏，直到动画开始。

---

## 4. 消息数据结构

### 4.1 Message 接口

```typescript
interface Message {
  type: 'bot' | 'user'
  content: ContentBlock[]
}
```

### 4.2 静态数据定义

```typescript
const botMessagesData: Message[] = [
  {
    type: 'bot',
    content: ['您好，我是您的智能导诊助手！...']  // 纯文本
  },
  {
    type: 'bot',
    content: [
      '我明白你的意思了！',                            // string
      { type: 'confirmation-list', items: [...] },   // confirmation-list
      '请确认你的当前状况...',                         // string
      '如果觉得没问题...',                             // string
      '如果觉得和你的感觉不同...',                     // string
      { type: 'confirm-button' }                      // confirm-button
    ]
  }
]
```

---

## 5. 用户交互流程

```
1. 用户输入消息 → sendMessage()
2. 添加 user message 到 displayedMessages
3. 解锁下一个 bot message
4. 触发 playAnimationSequence()
5. 顺序动画：每 block .start()，块间 100ms
6. 全部完成后 isAnimating = false
7. 用户可输入下一条消息
```

---

## 6. UI 样式体系

### 6.1 设计令牌

```scss
$primary: #00606d;           // 主色
$primary-container: #007b8b; // 主色容器
$secondary-container: #8bf1e6;
$surface-container-highest: #e0e3e4;
$on-surface: #181c1d;
$on-surface-variant: #3e494b;
$background: #f7fafb;
```

### 6.2 布局特点

- **Header**: 固定顶部，backdrop-filter 毛玻璃效果
- **Chat Container**: `max-width: 48rem`，垂直弹性布局
- **Message Bubble**: `max-width: 80%`，圆角阴影
- **User Bubble**: 渐变背景（primary → primary-container）
- **Bot Bubble**: 纯色背景 + 微妙阴影
- **Input**: 固定底部，透明渐变遮罩向上渐变

---

## 7. 技术细节

### 7.1 Template Ref 动态注册

使用 `getComponentRefs(idx)` + `setComponentRefs(idx, refs)` 模式在每次渲染时增量构建 ref 集合：

```typescript
const getComponentRefs = (msgIndex: number): ComponentRefs | undefined => {
  return componentRefsMap.value.get(msgIndex)
}

const setComponentRefs = (msgIndex: number, refs: ComponentRefs) => {
  componentRefsMap.value.set(msgIndex, refs)
}
```

### 7.2 shouldUseTypewriter 判断

```typescript
const shouldUseTypewriter = (msg: Message): boolean => {
  return msg.type === 'bot' && msg.content.every(block => typeof block === 'string')
}
```

**用途**：纯字符串消息用单一 TypewriterText 包裹；混合内容用循环渲染。

### 7.3 nextTick 确保 DOM 就绪

```typescript
displayedMessages.value.push(botMessagesData[nextBotIndex])
await nextTick()  // 确保新消息渲染到 DOM
await playAnimationSequence(displayedBotIndex)
```

---

## 8. 依赖关系

```
TriageChat.vue
├── useSettingsStore (Pinia settings)
├── AppHeader.vue
├── ChatInput.vue
├── TypewriterText.vue
│   └── (独立，无依赖)
├── ConfirmationList.vue
│   └── (独立，无依赖)
└── ConfirmButton.vue
    └── (独立，无依赖)
```

---

## 9. 当前限制与待优化点

1. **Ref 泄漏**：componentRefsMap 在消息切换时不会清理，但当前场景只有 2 条消息，影响可忽略
2. **无真正后端集成**：botMessagesData 是硬编码静态数据
3. **无错误边界**：网络/API 错误未被处理
4. **打字机性能**：长文本时 `displayedChars` 数组持续增长，可考虑虚拟滚动
