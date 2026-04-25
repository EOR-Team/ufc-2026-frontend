# interaction tech specs

> **SUPERSEDED**: This document is superseded by the formal OpenSpec animation system specs at `openspec/specs/animation-system/`. The authoritative specifications for `typewriter-animation`, `confirmation-list-animation`, `confirm-button-animation`, `nav-path-animation`, and `animation-orchestration` are now maintained in `openspec/changes/animation-system/specs/`. This file is retained for reference only and may be removed in a future release.

## ContentBlock 类型定义

```typescript
type ContentBlock =
  | string
  | { type: 'confirmation-list'; items: { label: string; value: string }[] }
  | { type: 'confirm-button' }
  | { type: 'nav-path'; route: string }

interface Message {
  type: 'bot' | 'user'
  content: ContentBlock[]
}
```

---

## Animation

### 动画触发机制

**核心设计：动画触发统一由 TriageChat 控制，各组件只暴露 `start()` 方法**

**动画触发流程：**
```
页面加载 → DOM 更新完成
    ↓
TriageChat 调用 playAnimationSequence(0) 触发 Message 1
    ↓
playAnimationSequence 内部按顺序调用各 block 的 start()
    ↓
前一个动画完成后，等待 100ms，触发下一个
    ↓
所有 content block 动画完成后，等待下一轮用户输入
```

**Message 1 特殊处理：**
- Message 1 在页面加载后由 TriageChat 手动触发
- 通过 `onMounted` + `nextTick` + `playAnimationSequence(0)` 实现
- 无需各组件内部自动触发

**Message 2+ 触发机制：**
- 用户输入消息后触发 `sendMessage`
- `sendMessage` 调用 `playAnimationSequence(displayedBotIndex)`
- 由 `playAnimationSequence` 统一按顺序调用各 block 的 `start()`

**ContentBlock 动画类型：**
| 类型 | 动画方式 | 触发方式 |
|------|----------|----------|
| 文本（TypewriterText） | 逐字 fade-in（每字 180ms） | 手动调用 start() |
| confirmation-list | 逐项显示（label + value 打字机效果） | 手动调用 start()，条件渲染 |
| confirm-button | fade in 250ms | 手动调用 start()，条件渲染 |
| nav-path | fade in 250ms + 节点依次显示 | 手动调用 start() |
| highlight | 打字机效果 | 随文本一起触发 |

**组件条件渲染（visibility 控制）：**
- `ConfirmationList` 和 `ConfirmButton` 在动画开始前不占据布局空间
- 通过 `visible` prop 控制：`visible=false` 时组件使用 `v-if` 不渲染
- 动画开始时通过 `visibilityMap` 设置 `visible=true`，组件才开始渲染并触发动画
- 避免组件以透明/占位状态提前占据空间影响布局美观

**顺序动画序列示例（Message 2）：**
```
content: [
  "我明白你的意思了！",           // → TypewriterText.start()
  <confirmation-list />,         // → 等待前一个完成 + 100ms → ConfirmationList.start()
  "请确认你的当前状况，",         // → 等待前一个完成 + 100ms → TypewriterText.start()
  "如果觉得没问题，",             // → 等待前一个完成 + 100ms → TypewriterText.start()
  "直接确认就行；",               // → 等待前一个完成 + 100ms → TypewriterText.start()
  "如果觉得和你的感觉不同，",     // → 等待前一个完成 + 100ms → TypewriterText.start()
  "就进行更改，直到完全符合你的感觉。", // → 等待前一个完成 + 100ms → TypewriterText.start()
  <confirm-button />             // → 等待前一个完成 + 100ms → ConfirmButton.start()
]
```

**注：** 包含 `\n` 换行符的文本块在数据层按换行**分割为多个独立字符串**，确保每行可作为独立的动画单元。实际实现中 Message 2 的长文本按 `\n` 分割为多个 Block，而非保持为一个 Block。

**实际 Message 2 ContentBlock 结构：**
```
[
  "我明白你的意思了！",           // Block 1
  { type: 'confirmation-list', items: [...] },  // Block 2
  "请确认你的当前状况，这有助于我们对您的病情进行建模。",  // Block 3
  "如果觉得没问题，直接确认就行；",  // Block 4
  "如果觉得和你的感觉不同，就进行更改，直到完全符合你的感觉。",  // Block 5
  { type: 'confirm-button' }         // Block 6
]
```

---

### 用户消息展示

**设计：**
- 用户输入后立即显示在聊天区域，无需动画
- 使用 `user-bubble` 样式（渐变背景：primary → primary-container）
- 消息内容为纯文本，无富组件

**数据结构：**
```typescript
interface Message {
  type: 'bot' | 'user'
  content: ContentBlock[]  // user 消息的 content 为 string[]
}

// user 消息示例
{
  type: 'user',
  content: ['我头疼还发烧']
}
```

**渲染逻辑：**
- 遍历 `displayedMessages`，根据 `msg.type` 渲染不同样式
- `bot` 消息：左侧头像 + bot-bubble
- `user` 消息：右侧 user-bubble，无头像

**关键接口设计：**
```typescript
// 所有需要动画的组件统一暴露 start() 方法
interface AnimatableComponent {
  start: () => Promise<void>  // 动画完成后 resolve
}

// TriageChat 维护动画队列
const animationQueue = [
  () => typewriterText1.start(),
  () => confirmationList.start(),
  () => typewriterText2.start(),
  () => confirmButton.start(),
]

// 顺序执行动画
const runAnimationSequence = async () => {
  for (const animate of animationQueue) {
    await animate()
    await delay(100)  // 100ms 间隔
  }
}
```

---

### 逐字 Fade-in 效果

**效果描述：**

bot 消息的文字逐字显示，每个字符以 fade-in 效果出现（180ms）。

**实现原理：**
- 每个字符作为独立 `<span>` 渲染
- 新字符添加 `fade-in` class，触发 CSS animation
- 动画完成后移除 `fade-in` class，保持完全显示
- 无宽度/高度动态变化，容器自然跟随内容撑开

**效果示意：**
```
状态 1：第 1 字 fade-in 完成
[我]

状态 2：第 2 字 fade-in 完成
[我很]

状态 3：第 3 字 fade-in 完成
[我很荣]

...

状态 N：所有字显示完成
[我很荣幸为您服务]
```

**关键点：**
- 每字 180ms fade-in 动画
- 无光标效果（已移除）
- 容器宽度自然跟随内容增长
- CSS animation 实现，性能良好

### CSS Animation 方案

**技术实现要点：**
- 使用 CSS `@keyframes char-fade-in` 实现逐字淡入
- 每个字符独立 animation，不相互干扰
- `animation-fill-mode: forwards` 保持最终状态

```
┌─────────────────────────────────────┐
│  .typewriter-container             │
│  ┌───────────────────────────────┐ │
│  │  width: fit-content          │ │
│  │  ┌─────┬─────┬─────┬─────┐   │ │
│  │  │ 我  │ 很  │ 荣  │ 幸  │   │ │
│  │  │ opacity: 1 │opacity: 1│   │ │
│  │  └─────┴─────┴─────┴─────┘   │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘

@keyframes char-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### 响应式处理

```typescript
// 获取当前 maxWidth（响应式）
const getMaxWidth = (element: HTMLElement) => {
  const parentWidth = element.parentElement?.offsetWidth || 768
  return parentWidth * 0.8  // 像素值
}

// 监听窗口大小变化
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  const newMaxWidth = getMaxWidth(bubbleElement)
  if (Math.abs(maxWidth - newMaxWidth) > 10) {
    maxWidth = newMaxWidth
    // 重新计算当前 scale
    currentScale = currentContentWidth / maxWidth
  }
}
```

---

## 关键组件技术规格

### TypewriterText

**组件接口：**
```typescript
interface Props {
  content: string  // 要显示的文本内容
}

interface Emits {
  (e: 'start'): void  // 动画开始
  (e: 'complete'): void  // 动画完成
}

interface Expose {
  start: () => Promise<void>  // 手动触发动画，动画完成后 resolve
}
```

**消息特征：**
| 属性 | 值 |
|------|-----|
| 类型 | 纯文本 |
| 行数 | 单行 |
| 字符数 | 约 42 个中文字符 |
| 特殊标记 | 无 |
| 特殊组件 | 无 |

**动画实现：**
- **默认状态**：组件挂载后不自动播放动画，等待外部调用 `start()`
- **手动触发**：通过调用 `start()` 方法启动动画，动画完成后 resolve
- **动画周期**：30-45ms/字（浮动随机值）
- 阶段一（宽度动态增长）：每字触发宽度过渡 + 打字
- 阶段二（换行后）：固定宽度，仅高度随行数增加

**关键实现点：**

1. **字符宽度测量**
   - 使用 Canvas `measureText()` 测量每个字符的实际宽度
   ```javascript
   const measureCharWidth = (char: string, font: string): number => {
     const canvas = document.createElement('canvas')
     const ctx = canvas.getContext('2d')
     ctx.font = font
     return ctx.measureText(char).width
   }
   ```

2. **宽度计算**
   ```javascript
   const padding = 16 * 2  // 左右各 16px
   const charWidth = measureCharWidth('您', '14px Inter')  // 约 14px（中文等宽）
   const currentWidth = padding + displayedCharCount * charWidth
   const maxWidth = containerWidth * 0.8  // 38.4rem 转换为 px
   ```

3. **动画时序**
   ```javascript
   const ANIMATION_DURATION = {
     min: 30,  // ms
     max: 45   // ms
   }

   const getRandomDuration = (): number => {
     return Math.random() * (ANIMATION_DURATION.max - ANIMATION_DURATION.min)
       + ANIMATION_DURATION.min
   }
   ```

4. **状态追踪**
   ```typescript
   interface TypewriterState {
     displayedText: string      // 当前显示的文本
     currentWidth: number       // 当前 bubble 宽度
     charWidths: number[]      // 每个字符的宽度数组
     transitionDuration: number // 当前过渡动画时长
     isAnimating: boolean       // 是否正在动画中
     currentLine: number        // 当前行号（1 或之后）
   }
   ```

5. **阶段判断**
   - **阶段一（第 1 行）**：宽度动态增长
     - 条件：`currentLine === 1 && !hasReachedMaxWidth`
     - 动作：每字触发宽度过渡 + 打字
   - **阶段二（换行后）**：仅高度增长
     - 条件：`currentLine > 1 || hasReachedMaxWidth`
     - 动作：固定宽度，仅高度随行数增加

### ConfirmationList

**组件接口：**
```typescript
interface Props {
  items: { label: string; value: string }[]
}

interface Expose {
  start: () => Promise<void>  // 触发 fade in 动画，动画完成后 resolve
}
```

**数据结构：**
```typescript
interface Props {
  items: { label: string; value: string }[]
}
```

**ContentBlock 标记：**
```
<confirmation-list 不适部位=头部疼痛；发烧 严重程度=轻微 持续时间=两三天 具体描述=一直不是特别舒服 其他信息=暂无 />
```

**动画效果：**
- **默认状态**：组件挂载后显示静态内容，不自动播放动画
- **手动触发**：通过调用 `start()` 方法启动逐项显示动画
- **动画序列**：
  1. 整体 fade in（opacity: 0 → 1，250ms）
  2. 等待 150ms
  3. 第一项 label 逐字显示（20ms/字）
  4. label 完成，等待 150ms
  5. 第一项 value 逐字显示（20ms/字）
  6. value 完成，等待 200ms
  7. 进入下一项，重复步骤 3-6

**状态管理：**
```typescript
interface ItemState {
  labelDisplayed: string    // 当前已显示的 label 文字
  valueDisplayed: string    // 当前已显示的 value 文字
  isLabelDone: boolean      // label 是否已完成
  isValueDone: boolean      // value 是否已完成
}
```

### ConfirmButton

**组件接口：**
```typescript
interface Expose {
  start: () => Promise<void>  // 触发 fade in 动画，动画完成后 resolve
}
```

**动画效果：**
- **默认状态**：组件挂载后显示静态内容，不自动播放动画
- **手动触发**：通过调用 `start()` 方法启动 fade in 动画（250ms）
- **点击交互**：用户点击按钮触发后续流程

### highlight

**高亮文本数据结构：**
```typescript
interface HighlightSegment {
  type: 'highlight'
  content: string  // "持续时间是三四天"
}
```

**CSS：**
```scss
.highlight-inline {
  color: $primary;  /* #00606d */
  font-weight: 500;
}
```

**动画效果：**
- 文字内容采用**打字机效果**逐字显示
- 样式与路径节点高亮一致：`color: $primary`, `font-weight: 500`

### nav-path

**组件接口：**
```typescript
interface Props {
  route: string  // "入口（当前地点）+挂号处+急诊诊室+缴费处+药房+出口"
  visible?: boolean  // 可见性控制
}

interface Expose {
  start: () => Promise<void>  // 触发动画，动画完成后 resolve
}
```

**ContentBlock 标记：**
```
<nav-path route=入口（当前地点）+挂号处+急诊诊室+缴费处+药房+出口 />
```

**解析逻辑：**
- `route` 字符串按 `+` 分割为节点数组
- 节点名为 `急诊诊室` 的自动高亮
- 高亮样式：`color: $primary`, `font-weight: 500`

**渲染结构：**
```vue
<div class="nav-path">
  <template v-for="(step, i) in steps" :key="i">
    <span :class="['path-step', step.isHighlighted ? 'highlight' : '']">
      {{ step.name }}
    </span>
    <span v-if="i < steps.length - 1" class="path-arrow">
      <v-icon size="12" color="#6e797b">mdi-arrow-right</v-icon>
    </span>
  </template>
</div>
```

**样式：**
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
    color: $on-surface-variant;  // #3e494b

    &.highlight {
      color: $primary;  // #00606d
      font-weight: 500;
    }
  }

  .path-arrow {
    display: flex;
    align-items: center;
  }
}
```

**动画效果：**
- **默认状态**：组件挂载后显示静态内容，不自动播放动画
- **手动触发**：通过调用 `start()` 方法启动动画
- **动画序列**：
  1. 整体容器淡入：opacity 0→1, 250ms
  2. 50ms 后开始节点动画
  3. 每个节点依次出现：scale(0.8→1) + opacity(0→1), 200ms
  4. 节点间隔：250ms
  5. 所有节点完成后，等待 200ms resolve
- 节点高亮样式（`急诊诊室`）在显示时直接应用
- 箭头直接跟随容器可见，无需单独动画

**状态管理：**
```typescript
interface ItemState {
  visible: boolean    // 节点是否已显示
}
```

**CSS 动画：**
```scss
.nav-path {
  opacity: 0;
  transition: opacity 250ms ease;

  &.visible {
    opacity: 1;
  }
}

.path-step {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 200ms ease, transform 200ms ease;

  &.step-visible {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## 消息序列技术总结

**所有消息概览：**

| 消息 | 类型 | 特殊组件 | 触发方式 | 动画复杂度 |
|------|------|----------|----------|------------|
| Message 1 | 纯文本 | 无 | 页面加载（自动） | 低（单行） |
| Message 2 | 文本+组件 | confirmation-list, confirm-button | 用户输入 | 高（4段） |
| Message 3 | 文本+高亮+组件 | highlight, confirmation-list, confirm-button | confirm-button 点击 | 高 |
| Message 4 | 文本+高亮+组件 | highlight, nav-path, confirm-button | confirm-button 点击 | 高 |
| Message 5 | 文本+组件 | nav-path, confirm-button | 用户输入 | 中 |
| Message 6 | 纯文本 | 无 | confirm-button 点击 | 低（单行） |

**消息触发逻辑：**
- `sendMessage`：用户输入时调用，推进到下一条 bot 消息
- `handleConfirmClick`：confirm-button 点击时调用，**仅在 currentBotIndex >= 5 时推进消息**
- 这意味着：
  - Message 2 由 `sendMessage` 推进（currentBotIndex 0 → 1）
  - Message 3-4 由 `handleConfirmClick` 推进（currentBotIndex 1→2, 2→3, 3→4）
  - Message 5 由 `sendMessage` 推进（currentBotIndex 4 → 5）
  - Message 6 由 `handleConfirmClick` 推进（currentBotIndex 5 → 6）

**关键组件动画总结：**

| 组件 | 默认状态 | 触发方式 | 动画效果 |
|------|----------|----------|----------|
| TypewriterText | 静态显示 | 手动调用 start() | 打字机效果 |
| confirmation-list | 静态显示 | 手动调用 start() | 逐项显示（label + value 打字机效果） |
| confirm-button | 静态显示 | 手动调用 start() | fade in 250ms |
| nav-path | 静态显示 | 手动调用 start() | fade in + 节点依次显示 |
| highlight() | 无 | 随文本一起触发 | 打字机效果（作为文本的一部分） |

**动画触发时序：**
```
用户输入消息或点击 confirm-button
    ↓
显示下一条 bot 消息（静态，无动画）
    ↓
按顺序执行 content block 动画：
  Block 1 动画 → 等待 100ms → Block 2 动画 → 等待 100ms → ...
    ↓
所有动画完成，等待下一轮用户输入
``` |

---

## 待确认事项（已解决）

- [x] `pretext` 库用途 → **文本布局引擎（非逐字测量）**
  - 用途：给定宽度，计算文本高度/行数
  - 不提供逐字宽度 API，底层用 canvas measureText
  - 打字机逐字宽度仍需自己用 canvas measureText
- [x] 宽度过渡方案 → **`scaleX` + `overflow: hidden`**
  - 性能更优，仅触发重绘不触发布局
  - GPU 加速，动画更流畅
- [x] 容器最大宽度像素值计算 → **响应式计算**
  - 使用 `parentElement.offsetWidth * 0.8` 获取像素值
  - 监听 `resize` 事件动态更新
  - 当变化超过 10px 时重新计算
