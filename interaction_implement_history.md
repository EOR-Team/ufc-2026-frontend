# interaction implement history

每个 Message Unit 的实现历程记录。主要内容包括 ContentBlock 架构设计、组件创建过程、技术决策等。

---

## Message 2 Unit 实现历程

<details>
<summary><strong>Message 2 实现概要</strong></summary>

### ContentBlock 架构设计

**设计动机：**
最初使用字符串解析方式组织消息内容，但存在以下问题：
- 复杂的正则解析逻辑导致第二个 typewriter-text 消失
- 文本被不必要地割裂

**解决方案：**
采用 ContentBlock 数组格式替代字符串解析：
```typescript
type ContentBlock =
  | string
  | { type: 'confirmation-list'; items: { label: string; value: string }[] }
  | { type: 'confirm-button' }

interface Message {
  type: 'bot' | 'user'
  content: ContentBlock[]
}
```

**ContentBlock 结构（Message 2 实际实现）：**
| 顺序 | ContentBlock | 类型 | 渲染组件 |
|------|--------------|------|----------|
| 1 | `"我明白你的意思了！"` | 文本 | TypewriterText |
| 2 | `<confirmation-list .../>` | 组件 | ConfirmationList |
| 3 | `"请确认你的当前状况..."` | 文本（第一行） | TypewriterText |
| 4 | `"如果觉得没问题..."` | 文本（第二行） | TypewriterText |
| 5 | `"如果觉得和你的感觉不同..."` | 文本（第三行） | TypewriterText |
| 6 | `<confirm-button />` | 组件 | ConfirmButton |

**注**：长文本按 `\n` 分割为多个独立 Block，每个 Block 可独立控制动画，实现更细粒度的动画序列控制。

</details>

---

## Message 1 Unit 实现历程

<details>
<summary><strong>Message 1 实现概要</strong></summary>

### typewriter-container 右侧空白问题

**问题描述：**
打字动画完成后，消息气泡右侧存在大片空白区域，`typewriter-container` 未能填满气泡内部可用宽度。

**问题定位：**
- `message-bubble` 设置 `padding: 16px`（四边）
- `typewriter-container` 设置 `max-width: 80%`
- 测量结果：`bubbleWidth: 415px`, `typewriterWidth: 383px`, `gap: 32px`
- **gap 正好等于气泡的左右 padding (16px + 16px = 32px)**

**根本原因：**
`max-width: 80%` 限制了容器宽度为气泡可容宽度的 80%，而剩余 20% 就成了右侧空白。

**解决过程：**

| 步骤 | 操作 | 结果 |
|------|------|------|
| 1 | 分析 DevTools 测量数据 | 发现 gap = padding 匹配 |
| 2 | 定位到 `max-width: 80%` 是元凶 | 移除该限制 |
| 3 | 改为 `width: fit-content` | 容器由内容撑开，自然贴合 |

**最终实现：**

```scss
.typewriter-container {
  overflow: hidden;
  width: fit-content;  // 替换原来的 max-width: 80%
}
```

**验证结果：**
- `bubbleWidth: 415px` = `typewriterWidth + gap` = `383px + 32px`
- 右侧空白 = 气泡 padding，**这是预期行为**
- `fit-content` 让容器按内容实际宽度撑开，文字自然贴合右边缘

**技术决策：**
- 选择 `fit-content` 而非撑满气泡宽度，因为 bubble 本身有 `max-width: 80%`，再次让 typewriter 填满会破坏原有的设计意图
- 当前效果：内容宽度 = 实际文字宽度，气泡宽度 = padding + 内容宽度，视觉上左右对称

### ConfirmationList 逐项显示 vs 一次性显示

**决策：**
选择 **逐项顺序显示**（每项先 label 后 value，逐项展开）

**原因：**
| 方面 | 一次性显示 | 逐项顺序显示 |
|------|------------|--------------|
| 用户体验 | 信息量大，难快速扫描 | 有节奏感，便于逐项确认 |
| 视觉焦点 | 全部内容同时出现 | 单项聚焦，注意力集中 |
| 交互清晰度 | 需要用户自己区分主次 | label 引导理解 value 含义 |

**时序设计：**
- 20ms/字：打字机效果
- 150ms：label → value 之间的停顿
- 200ms：项与项之间的间隔

</details>

---

## 技术决策记录

<details>
<summary><strong>技术决策概要</strong></summary>

### scaleX vs width 方案选择

**决策：**
选择 **`scaleX` + `overflow: hidden`** 方案

**原因：**
| 方面 | width 方案 | scaleX 方案 |
|------|-------------|--------------|
| 布局触发 | 重排 (reflow) | 仅重绘 (repaint) |
| 性能 | 较差（每字触发布局） | 较好（GPU 加速） |
| 兼容性 | 100% | 100% |

### 动画周期选择

**决策：**
打字动画周期使用 **30-45ms/字**（浮动随机值）

**原因：**
- 太快会看不清打字效果
- 太慢会让用户不耐烦
- 随机浮动模拟真实打字节奏

</details>

---

## 组件实现记录

<details>
<summary><strong>组件实现概要</strong></summary>

### ConfirmationList 组件

**创建日期：** 2026-04-25

**Props：**
```typescript
interface Props {
  items: { label: string; value: string }[]
}
```

**样式特点：**
- 使用 `list-style: disc inside` 显示项目符号
- 上下边框分隔内容区域
- label 使用 `font-weight: 500`，value 使用 `$on-surface-variant` 颜色

### ConfirmationList 逐项显示功能

**实现日期：** 2026-04-25

**功能描述：**
为确认列表中的每个项目添加逐项显示的打字机效果，每项先显示 label，再显示 value。

**实现原理：**
```
第一项: "不适部位：" → "头部疼痛；发烧"
第二项: "严重程度：" → "轻微"
第三项: "持续时间：" → "两三天"
...
```

**状态管理：**
```typescript
interface ItemState {
  labelDisplayed: string    // 当前已显示的 label 文字
  valueDisplayed: string    // 当前已显示的 value 文字
  isLabelDone: boolean      // label 是否已完成
  isValueDone: boolean      // value 是否已完成
}
```

**动画流程：**
1. 触发 fade-in（opacity: 0 → 1）
2. 等待 150ms
3. 第一项 label 逐字显示（20ms/字）
4. label 完成，等待 150ms
5. 第一项 value 逐字显示（20ms/字）
6. value 完成，等待 200ms
7. 进入下一项...

**遇到的问题及解决方案：**

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| TypeScript 错误：`Property 'start' does not exist` | Vue ref 类型推断问题，TypeScript 不认可 `defineExpose` 的方法 | 定义显式接口 `ConfirmationListExposed`，使用 `as unknown as` 类型转换 |
| `start is not a function` 错误 | 在重构过程中丢失了 `defineExpose({ start })` | 添加 `defineExpose` 导出 start 方法 |
| 列表项未正确显示 | `visible` class 条件判断逻辑错误 | 简化为 `itemStates[i]?.labelDisplayed \|\| itemStates[i]?.isLabelDone` |

**关键代码：**
```typescript
// 动画状态机
let currentItemIndex = 0    // 当前处理的项目索引
let currentCharIndex = 0    // 当前项目的字符索引
let isLabelPhase = true     // 当前阶段：true=label, false=value

const animateItem = () => {
  if (currentItemIndex >= props.items.length) return

  const item = props.items[currentItemIndex]
  const state = itemStates.value[currentItemIndex]

  if (isLabelPhase) {
    // 逐字显示 label...
    state.labelDisplayed = item.label.slice(0, currentCharIndex + 1)
    if (currentCharIndex < item.label.length) {
      currentCharIndex++
      animationFrameId = window.setTimeout(animateItem, 20)
    } else {
      // 切换到 value 阶段
      state.isLabelDone = true
      isLabelPhase = false
      currentCharIndex = 0
      animationFrameId = window.setTimeout(animateItem, 150)
    }
  } else {
    // 逐字显示 value...
    state.valueDisplayed = item.value.slice(0, currentCharIndex + 1)
    if (currentCharIndex < item.value.length) {
      currentCharIndex++
      animationFrameId = window.setTimeout(animateItem, 20)
    } else {
      // 进入下一项
      state.isValueDone = true
      currentItemIndex++
      isLabelPhase = true
      currentCharIndex = 0
      if (currentItemIndex < props.items.length) {
        animationFrameId = window.setTimeout(animateItem, 200)
      }
    }
  }
}
```

### ConfirmButton 组件

**创建日期：** 2026-04-25

**特点：**
- 渐变背景：`linear-gradient(135deg, $primary 0%, $primary-container 100%)`
- 圆角：`border-radius: 9999px`
- 过渡动画：`transition: all 300ms ease`
- 点击缩放：`transform: scale(0.95)`

### NavPath 组件

**创建日期：** 2026-04-25

**功能描述：**
显示就诊路径导航，逐节点亮动画。

**ContentBlock 结构：**
```typescript
{ type: 'nav-path'; route: string }
```

**Props：**
```typescript
interface Props {
  route: string                    // 路径字符串，用 + 分隔
  visible?: boolean               // 可见性控制
}
```

**动画设计决策：**

| 方案 | 描述 | 选择原因 |
|------|------|----------|
| 打字机效果 | 逐字显示节点名 | 不适合，节点名非自然语言 |
| 逐节点亮 | scale(0.8→1) + opacity(0→1) | **采用**，空间离散感更强 |
| 整体淡入 | 一闪而过 |太平淡|

**时序设计：**
- 容器淡入：50ms 延迟
- 节点间隔：250ms/节点
- 单节点动画：200ms (scale + opacity)
- 最终延迟：200ms

**状态管理：**
```typescript
interface ItemState {
  visible: boolean    // 节点是否已显示
}
```

**高亮节点：**
- `急诊诊室` 自动高亮（`isHighlighted: true`）
- 高亮样式：`color: $primary; font-weight: 500;`

**关键代码：**
```typescript
const start = (): Promise<void> => {
  return new Promise((resolve) => {
    initializeItems()
    requestAnimationFrame(() => {
      isVisible.value = true
      let currentIndex = 0
      const animateStep = () => {
        if (currentIndex < itemStates.value.length) {
          itemStates.value[currentIndex].visible = true
          currentIndex++
          if (currentIndex < itemStates.value.length) {
            animationTimeoutId = setTimeout(animateStep, 250)
          } else {
            animationTimeoutId = setTimeout(resolve, 200)
          }
        }
      }
      animationTimeoutId = setTimeout(animateStep, 50)
    })
  })
}
```

**CSS 动画：**
```scss
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

### Message 4 实现

**创建日期：** 2026-04-25

**触发条件：** 用户点击 Message 3 的 confirm-button

**ContentBlock 结构：**
```typescript
{
  type: 'bot',
  content: [
    '好的！分析完您的病情后，为您选择了前往 {{highlight}}急诊诊室{{/highlight}} 就诊！\n这是您的行进路程：\n',
    { type: 'nav-path', route: '入口（当前地点）+挂号处+急诊诊室+缴费处+药房+出口' },
    '\n有什么想修改的吗？直接说就好！\n如果没有，就确认吧！\n',
    { type: 'confirm-button' }
  ]
}
```

**处理流程：**
1. 用户点击 confirm-button
2. `handleConfirmClick()` 添加用户"确认"消息
3. `currentBotIndex++`，显示下一条 bot message
4. `playAnimationSequence()` 依次播放各 block 动画

**类型扩展：**
- `ContentBlock` 添加 `nav-path` 类型
- `ComponentRefs` 添加 `navPath` 字段
- `VisibilityState` 添加 `navPath` 字段

### Message 5 实现

**创建日期：** 2026-04-25

**触发条件：** 用户在输入框输入任意内容（不是点击 confirm-button）

**触发流程：**
```
Message 4 显示 → 用户输入任意内容 → Message 5 显示
```

**ContentBlock 结构：**
```typescript
{
  type: 'bot',
  content: [
    '我明白你的意思了！现在是新的行进路径：\n',
    { type: 'nav-path', route: '入口+挂号处+急诊诊室+缴费处+药房+洗手间+出口' },
    '\n还想修改什么吗？\n',
    { type: 'confirm-button' }
  ]
}
```

**Message 5 vs Message 4 对比：**

| 特征 | Message 4 | Message 5 |
|------|----------|-----------|
| nav-path 节点数 | 6 个 | 7 个（增加洗手间） |
| highlight | 有 `{{highlight}}` | 无 |
| 文本内容 | 告知就诊选择+行进路程 | 确认修改+新路径 |
| 触发方式 | 用户输入 | 用户输入 |
| 后续操作 | 点击 confirm-button → Message 6 | 用户输入 → 重新显示 Message 5 |

**技术要点：**
- 与 Message 4 共用相同的组件和动画机制
- 路由节点更多（7个），NavPath 动画总时长约 = 50ms + 250ms * 6 + 200ms ≈ 1.75s
- 无需高亮解析，ContentBlock 更简单
- `sendMessage` 推进到下一条消息（currentBotIndex 4 → 5）
- `handleConfirmClick` 在 currentBotIndex < 5 时不推进消息

### Message 6 实现

**创建日期：** 2026-04-25

**触发条件：** 用户点击 Message 5 的 confirm-button

**ContentBlock 结构：**
```typescript
{
  type: 'bot',
  content: ['好的！现在开始导航！']
}
```

**技术要点：**
- 纯文本消息，无特殊组件
- Message 6 是对话序列的最后一条
- `handleConfirmClick` 在 currentBotIndex >= 5 时推进消息（currentBotIndex 5 → 6）

**完整对话流程：**
```
页面加载 → Message 1 (自动)
用户输入 → Message 2
点击 confirm-button → Message 3
点击 confirm-button → Message 4
用户输入 → Message 5 (修改路径)
点击 confirm-button → Message 6 (开始导航)
```

</details>
