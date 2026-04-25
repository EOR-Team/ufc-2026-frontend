# TriageChat 文档预想实现文档

## 概述

本文档描述 TriageChat 智能导诊聊天页面的**预想实现规范**，涵盖 ContentBlock 架构设计、动画系统、组件接口、消息序列等技术规格。

---

## 1. 架构设计

### 1.1 核心概念：ContentBlock

ContentBlock 是消息内容的原子单元，联合类型定义为：

```typescript
type ContentBlock =
  | string                                    // 普通文本（含 \n 换行）
  | { type: 'confirmation-list'; items: { label: string; value: string }[] }
  | { type: 'confirm-button' }
  | { type: 'nav-path'; route: string; steps: string[]; highlights: number[] }
  | { type: 'highlight'; content: string }

interface Message {
  type: 'bot' | 'user'
  content: ContentBlock[]
}
```

**设计意图**：将消息从单一字符串扩展为内容块数组，支持混合多种内容类型，每种类型对应独立渲染组件。

### 1.2 Chat History 标记格式

bot 消息使用特殊标记格式：

```
bot: ("文本1", <component1 prop=value prop=value />, "文本2", <component2 />, ...)
```

**格式规则：**
- 圆括号 `()` 包裹 ContentBlock 数组
- 文本用引号 `"..."` 表示
- 组件用尖括号 `<tag-name prop=value />` 表示
- 元素之间用逗号 `,` 分隔

**示例：**
```
bot: ("我明白你的意思了！", <confirmation-list 不适部位=头部疼痛 严重程度=轻微 />, "请确认", <confirm-button />)
```

### 1.3 组件层级

```
TriageChat.vue (页面容器)
├── AppHeader.vue              # 顶部导航栏
├── ChatInput.vue              # 底部消息输入框
└── 内容块渲染层
    ├── TypewriterText.vue     # 文本（打字机效果）
    ├── ConfirmationList.vue  # 确认列表（逐项显示）
    ├── ConfirmButton.vue      # 确认按钮（fade-in）
    ├── NavPath.vue            # 导航路径（节点依次显示）
    └── HighlightText.vue      # 内联高亮文本
```

---

## 2. 动画系统

### 2.1 核心设计原则

**所有动画由用户输入触发，而非自动播放**

**触发流程：**
```
页面加载 → bot 消息静态显示（无动画）
    ↓
用户输入任意消息推进阶段
    ↓
按顺序触发当前 bot 消息的每个 content block 动画
    ↓
前一个动画完成后，等待 100ms，触发下一个
    ↓
所有 content block 动画完成后，等待下一轮用户输入
```

### 2.2 ContentBlock 动画类型

| 类型 | 动画方式 | 触发方式 |
|------|----------|----------|
| 文本（TypewriterText） | 逐字 fade-in（每字 180ms） | 手动调用 `start()` |
| confirmation-list | 逐项显示（label + value 打字机效果） | 手动调用 `start()`，条件渲染 |
| confirm-button | fade in 250ms | 手动调用 `start()`，条件渲染 |
| nav-path | fade in 250ms + 节点依次显示 | 手动调用 `start()` |
| highlight | 打字机效果 | 随文本一起触发 |

### 2.3 条件渲染机制

**问题**：动画组件在开始前不应占据布局空间（避免透明占位影响布局美观）。

**解决方案**：通过 `visible` prop + `v-if` 控制。

```typescript
// 初始状态：visible = false，组件不渲染
// 动画开始时：visible = true，组件渲染并触发动画

interface Props {
  visible?: boolean  // 默认 true（向后兼容）
}
```

**visibilityMap 模式**：
```typescript
// TriageChat 维护 visibilityMap
const visibilityMap = ref<Map<msgIdx, VisibilityState>>(new Map())

interface VisibilityState {
  confirmationList: boolean
  confirmButton: boolean
  navPath: boolean
}

const setVisibility = (msgIdx: number, state: VisibilityState) => {
  visibilityMap.value.set(msgIdx, state)
}
```

---

## 3. 组件接口规范

### 3.1 统一动画接口

所有需要动画的组件统一暴露 `start()` 方法：

```typescript
interface AnimatableComponent {
  start: () => Promise<void>  // 动画完成后 resolve
}
```

### 3.2 TypewriterText

**职责**：字符级打字机动画，逐字 fade-in 显示。

**Props**：
```typescript
interface Props {
  content: string           // 要显示的文本
  font?: string            // 默认 '14px Inter'
  animationDuration?: { min: number; max: number }  // 30-45ms 随机
  skipAnimation?: boolean  // 跳过动画（首条消息使用）
}
```

**Emits**：
```typescript
interface Emits {
  (e: 'start'): void
  (e: 'complete'): void
}
```

**动画实现**：
- 使用 CSS `@keyframes char-fade-in` 实现逐字淡入
- 每个字符作为独立 `<span>` 渲染
- 新字符添加 `fade-in` class，触发 180ms 动画
- 动画完成后移除 class，保持完全显示
- `animation-fill-mode: forwards` 保持最终状态

**状态追踪**：
```typescript
interface TypewriterState {
  displayedText: string
  currentWidth: number
  charWidths: number[]
  transitionDuration: number
  isAnimating: boolean
  currentLine: number
}
```

### 3.3 ConfirmationList

**职责**：确认列表，带逐项 label + value 打字机效果。

**Props**：
```typescript
interface Props {
  items: { label: string; value: string }[]
  visible?: boolean
}
```

**动画流程**：
1. 整体 fade in（opacity: 0 → 1，250ms）
2. 等待 150ms
3. 第一项 label 逐字显示（20ms/字）
4. label 完成，等待 150ms
5. 第一项 value 逐字显示（20ms/字）
6. value 完成，等待 200ms
7. 进入下一项，重复步骤 3-6

**状态管理**：
```typescript
interface ItemState {
  labelDisplayed: string
  valueDisplayed: string
  isLabelDone: boolean
  isValueDone: boolean
}
```

### 3.4 ConfirmButton

**职责**：确认按钮，fade + translate 进场。

**Props**：
```typescript
interface Props {
  visible?: boolean
}
```

**动画效果**：
- 整体 fade in（opacity: 0 → 1，250ms）
- 同时 translateY(8px → 0)

**CSS**：
```scss
.confirm-btn {
  opacity: 0;
  transform: translateY(8px);
  transition: all 250ms ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 3.5 highlight

**职责**：内联高亮文本，样式标记。

**数据结构**：
```typescript
interface HighlightSegment {
  type: 'highlight'
  content: string  // "持续时间是三四天"
}
```

**CSS**：
```scss
.highlight-inline {
  color: $primary;    // #00606d
  font-weight: 500;
}
```

**动画**：随父文本打字机一起触发，无独立动画。

### 3.6 NavPath

**职责**：导航路径显示，带节点依次出现效果。

**Props**：
```typescript
interface Props {
  route: string           // "入口+挂号处+急诊诊室+..."
  steps?: string[]       // 解析后的节点数组
  highlights?: number[]  // 高亮的节点索引
  visible?: boolean
}
```

**ContentBlock 标记**：
```
<nav-path route=入口（当前地点）+挂号处+急诊诊室+缴费处+药房+出口 />
```

**解析后**：
```typescript
const navPathData = {
  route: "入口（当前地点）+挂号处+急诊诊室+缴费处+药房+出口",
  steps: ["入口（当前地点）", "挂号处", "急诊诊室", "缴费处", "药房", "出口"],
  highlights: [0, 2, 5]  // 入口、急诊诊室、出口 高亮
}
```

**渲染结构**：
```vue
<div class="nav-path">
  <template v-for="(step, i) in steps" :key="i">
    <span :class="['path-step', highlights.includes(i) ? 'highlight' : '']">
      {{ step }}
    </span>
    <span v-if="i < steps.length - 1" class="path-arrow">
      <v-icon size="12" color="#6e797b">mdi-arrow-right</v-icon>
    </span>
  </template>
</div>
```

**样式**：
```scss
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
  }
}
```

**动画流程**：
1. 整体骨架屏 fade in：250ms
2. 路径节点和箭头依次显示（每个节点 + 箭头作为一个单元）
3. 每个单元内部：先显示节点文字（打字机效果），然后箭头 fade in

---

## 4. 消息序列规范

### 4.1 消息概览

| 消息 | 类型 | 特殊组件 | 动画复杂度 |
|------|------|----------|------------|
| Message 1 | 纯文本 | 无 | 低（单行） |
| Message 2 | 文本+组件 | confirmation-list, confirm-button | 高（4段） |
| Message 3 | 文本+高亮+组件 | highlight, confirmation-list, confirm-button | 高 |
| Message 4 | 文本+高亮+组件 | highlight, nav-path, confirm-button | 高 |
| Message 5 | 文本+组件 | nav-path, confirm-button | 中 |
| Message 6 | 纯文本 | 无 | 低（单行） |

### 4.2 Message 1

```
bot: ("您好，我是您的智能导诊助手！为了给您提供更加准确的导诊服务，请您先描述一下自己前来就诊的原因、当前的感受等信息哦！")
```

**ContentBlock 数量**：1 个（纯文本）

### 4.3 Message 2

```
bot: ("我明白你的意思了！", <confirmation-list 不适部位=头部疼痛；发烧 严重程度=轻微 持续时间=两三天 具体描述=一直不是特别舒服 其他信息=暂无 />, "请确认你的当前状况，这有助于我们对您的病情进行建模。\n如果觉得没问题，直接确认就行；\n如果觉得和你的感觉不同，就进行更改，直到完全符合你的感觉。", <confirm-button />)
```

**ContentBlock 数量**：4 个

**顺序动画序列**：
```
Block 1: "我明白你的意思了！" → TypewriterText.start()
    ↓ 等待 100ms
Block 2: <confirmation-list /> → ConfirmationList.start()
    ↓ 等待 100ms
Block 3: "请确认你的当前状况..." → TypewriterText.start()
    ↓ 等待 100ms
Block 4: "如果觉得没问题..." → TypewriterText.start()
    ↓ 等待 100ms
Block 5: "直接确认就行；" → TypewriterText.start()
    ↓ 等待 100ms
Block 6: "如果觉得和你的感觉不同..." → TypewriterText.start()
    ↓ 等待 100ms
Block 7: "就进行更改..." → TypewriterText.start()
    ↓ 等待 100ms
Block 8: <confirm-button /> → ConfirmButton.start()
```

**注**：包含 `\n` 的文本按换行分割为多个独立字符串。

### 4.4 Message 3

```
bot: ("我明白了！您说 highlight("持续时间是三四天")。所以当前状况应该是：", <confirmation-list 不适部位=头部疼痛；发烧 严重程度=轻微 持续时间=三四天 具体描述=一直不是特别输出 其他信息=暂无 />, "\n还有什么问题吗？", <confirm-button />)
```

**ContentBlock 数量**：4 个（含 highlight）

### 4.5 Message 4

```
bot: ("好的！分析完您的病情后，为您选择了前往 highlight("急诊诊室") 就诊！\n这是您的行进路程：\n", <nav-path route=入口（当前地点）+挂号处+急诊诊室+缴费处+药房+出口 />, "\n有什么想修改的吗？直接说就好！\n如果没有，就确认吧！\n", <confirm-button />)
```

**ContentBlock 数量**：4 个（含 nav-path + highlight）

### 4.6 Message 5

```
bot: ("我明白你的意思了！现在是新的行进路径：\n", <nav-path route=入口+挂号处+急诊诊室+缴费处+药房+洗手间+出口 />, "\n还想修改什么吗？\n", <confirm-button />)
```

### 4.7 Message 6

```
bot: ("好的！现在开始导航！")
```

---

## 5. 动画编排机制

### 5.1 playAnimationSequence 算法

```typescript
const playAnimationSequence = async (displayedBotIndex: number) => {
  isAnimating.value = true

  const message = displayedMessages.value[displayedBotIndex]

  for (let i = 0; i < message.content.length; i++) {
    const block = message.content[i]

    if (typeof block === 'string') {
      await typewriterRef.start()
    } else if (block.type === 'confirmation-list') {
      setVisibility(displayedBotIndex, { confirmationList: true })
      await refs.confirmationList.start()
    } else if (block.type === 'confirm-button') {
      setVisibility(displayedBotIndex, { confirmButton: true })
      await refs.confirmButton.start()
    } else if (block.type === 'nav-path') {
      setVisibility(displayedBotIndex, { navPath: true })
      await refs.navPath.start()
    }

    // 块间 100ms 间隔
    if (i < message.content.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  isAnimating.value = false
}
```

### 5.2 状态管理

| 状态 | 类型 | 用途 |
|------|------|------|
| `displayedMessages` | `ref<Message[]>` | 已解锁并显示的消息 |
| `currentBotIndex` | `ref<number>` | 当前播放到第几个 bot 消息 |
| `isAnimating` | `ref<boolean>` | 动画序列是否正在播放 |
| `componentRefsMap` | `ref<Map>` | 存储各消息的子组件引用 |
| `visibilityMap` | `ref<Map>` | 控制各组件的可见性 |

### 5.3 响应式宽度处理

```typescript
const getMaxWidth = (element: HTMLElement) => {
  const parentWidth = element.parentElement?.offsetWidth || 768
  return parentWidth * 0.8  // 80% 宽度
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
```

---

## 6. 用户交互流程

```
1. 页面加载 → 显示 Message 1（静态，无动画）
2. 用户发送任意消息 → 解锁 Message 2
3. playAnimationSequence(Message 2)
   - 顺序触发 8 个 content block 动画
   - 每个动画完成后等待 100ms
4. 所有动画完成 → isAnimating = false
5. 用户点击 ConfirmButton 或发送新消息
6. 解锁 Message 3 → 重复步骤 3-5
7. ... 直到 Message 6
```

---

## 7. 技术决策记录

### 7.1 scaleX vs width 动画方案

**决策**：选择 `scaleX` + `overflow: hidden` 方案

| 方面 | width 方案 | scaleX 方案 |
|------|------------|--------------|
| 布局触发 | 重排 (reflow) | 仅重绘 (repaint) |
| 性能 | 较差 | 较好（GPU 加速） |
| 兼容性 | 100% | 100% |

### 7.2 打字机动画周期

**决策**：30-45ms/字（浮动随机值）

**原因**：
- 太快看不清打字效果
- 太慢让用户不耐烦
- 随机浮动模拟真实打字节奏

### 7.3 ConfirmationList 逐项显示 vs 一次性显示

**决策**：逐项顺序显示（每项先 label 后 value，逐项展开）

| 方面 | 一次性显示 | 逐项顺序显示 |
|------|------------|--------------|
| 用户体验 | 信息量大，难快速扫描 | 有节奏感，便于逐项确认 |
| 视觉焦点 | 全部内容同时出现 | 单项聚焦，注意力集中 |
| 交互清晰度 | 需要用户自己区分主次 | label 引导理解 value 含义 |

### 7.4 typewriter-container 右侧空白问题

**问题**：打字动画完成后，气泡右侧存在大片空白。

**根本原因**：`max-width: 80%` 限制了容器宽度为气泡可容宽度的 80%。

**解决方案**：
```scss
.typewriter-container {
  overflow: hidden;
  width: fit-content;  // 替换 max-width: 80%
}
```

---

## 8. 待实现组件

| 组件 | 状态 | 说明 |
|------|------|------|
| TypewriterText | ✅ 已实现 | 字符 fade-in 打字机 |
| ConfirmationList | ✅ 已实现 | 逐项 label + value 显示 |
| ConfirmButton | ✅ 已实现 | fade + translate 进场 |
| NavPath | 🔜 待实现 | 节点依次显示动画 |
| HighlightText | 🔜 待实现 | 内联高亮样式标记 |

---

## 9. 文档索引

| 文档 | 内容 |
|------|------|
| `interaction_simulation.md` | 交互模拟规范总览 |
| `interaction_tech_specs.md` | 技术规格、动画原理、组件定义 |
| `interaction_chat_history_template.md` | Chat History 标记格式与对话内容模板 |
| `interaction_implement_history.md` | 实现历程、踩坑记录、技术决策 |
