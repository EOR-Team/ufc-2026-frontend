# 任务清单

> 生成日期：2026-04-24
> 状态：待执行

---

## 任务 1：提取 UI 组件库

### 目标
建立 `src/components/ui/` 目录，逐步提取内联在页面中的通用 UI 组件。

### 组件设计

#### 1.1 AppHeader.vue
通用页面 Header，适用于所有子页面。

```typescript
interface Props {
  title: string           // 页面标题
  showBack?: boolean      // 显示返回按钮，默认 true
  backRoute?: string      // 返回路由，默认 router.back()
  showSettings?: boolean  // 显示设置按钮，默认 true
}
```

**插槽：**
- `#leading` — 左侧自定义内容（替代默认返回按钮）
- `#trailing` — 右侧自定义内容（替代默认设置按钮）

**样式：**
- 固定顶部，`z-index: 50`
- 毛玻璃背景 `backdrop-filter: blur(20px)`
- 高度 `64px`
- 标题居中，Manrope 字体，600-700 weight

#### 1.2 ChatBubble.vue
聊天气泡组件。

```typescript
interface Props {
  type: 'bot' | 'user'           // 消息类型
  content: string                  // 消息内容
  showAvatar?: boolean             // 显示头像，默认 true（仅 bot 显示）
  avatarIcon?: string             // 头像图标，默认 'mdi-robot'
  timestamp?: string               // 可选时间戳
}
```

**样式：**
- Bot: 灰白背景 `$surface-container-highest`，左侧
- User: 渐变背景 `linear-gradient(135deg, $primary 0%, $primary-container 100%)`，右侧
- 圆角 `1rem`，最大宽度 `80-85%`

#### 1.3 ChatInput.vue
聊天输入框组件。

```typescript
interface Props {
  placeholder?: string     // 占位文本，默认 '输入...'
  maxLength?: number      // 最大字符数
}

interface Emits {
  (e: 'send', value: string): void   // 发送消息
  (e: 'input', value: string): void  // 输入变化
}
```

**样式：**
- 固定底部容器
- 输入框左对齐，发送按钮右侧圆形渐变
- 毛玻璃底部渐变遮罩

#### 1.4 NavPath.vue
导诊路径显示组件（TriageChat 专用）。

```typescript
interface PathStep {
  name: string
  isHighlighted?: boolean
  isSecondary?: boolean
}

interface Props {
  steps: PathStep[]
}
```

**样式：**
- Flex wrap 布局，步骤名 + 箭头
- 高亮步骤使用 primary 色
- 间距 `0.5rem`

#### 1.5 ProgressCard.vue
恢复进度卡片组件（RecoveryChat 专用）。

```typescript
interface Props {
  title: string           // 进度标题
  percent: number         // 百分比 0-100
  description?: string   // 进度描述
}
```

**样式：**
- 白色卡片背景，`1rem` 圆角
- 标题 + 百分比徽章
- 进度条轨道 + 填充动画

#### 1.6 ChecklistCard.vue
治疗清单卡片组件（RecoveryChat 专用）。

```typescript
interface ChecklistItem {
  text: string
  subtext: string
  done: boolean
  urgent?: boolean
}

interface Props {
  title: string
  icon?: string          // 默认 'mdi-fact-check'
  items: ChecklistItem[]
}

interface Emits {
  (e: 'toggle', index: number): void   // 勾选切换
}
```

**样式：**
- 卡片头部带图标 + 标题
- 列表项可点击切换状态
- 已完成项删除线 + 透明度降低
- 紧急未完成项红色高亮

---

### 提取顺序

1. `AppHeader.vue` — 最高复用，所有子页面都需要
2. `ChatInput.vue` — 两个聊天页共用
3. `ChatBubble.vue` — 两个聊天页共用
4. `NavPath.vue` — TriageChat 专用
5. `ProgressCard.vue` — RecoveryChat 专用
6. `ChecklistCard.vue` — RecoveryChat 专用

### 执行步骤

- [ ] 创建 `src/components/ui/` 目录
- [ ] 实现 AppHeader.vue 并替换 TriageChat.vue
- [ ] 实现 AppHeader.vue 并替换 RecoveryChatPage.vue
- [ ] 实现 ChatInput.vue 并替换 TriageChat.vue
- [ ] 实现 ChatInput.vue 并替换 RecoveryChatPage.vue
- [ ] 实现 ChatBubble.vue 并替换 TriageChat.vue
- [ ] 实现 ChatBubble.vue 并替换 RecoveryChatPage.vue
- [ ] 实现 NavPath.vue 并替换 TriageChat.vue
- [ ] 实现 ProgressCard.vue 并替换 RecoveryChatPage.vue
- [ ] 实现 ChecklistCard.vue 并替换 RecoveryChatPage.vue
- [ ] 删除被掏空的页面中冗余样式（保留业务逻辑）
- [ ] 运行 `pnpm build` 验证无错误

---

## 任务 2：移除 Tailwind CSS

### 目标
从项目中完全移除 Tailwind CSS 依赖和相关配置，简化构建。

### 执行步骤

- [ ] 从 `package.json` 中删除：
  - `tailwindcss`
  - `@tailwindcss/postcss`
  - `@tailwindcss/vite`
  - `autoprefixer`
- [ ] 删除 `tailwind.config.js`（若存在）
- [ ] 检查 `postcss.config.js`，移除 tailwind 引用
- [ ] 检查 `vite.config.ts`，移除 `@tailwindcss/vite` 插件
- [ ] 删除 `src/styles/` 中与 tailwind 相关的文件（若存在）
- [ ] 运行 `pnpm install` 更新 lockfile
- [ ] 运行 `pnpm build` 验证无错误

### 验证清单

- [ ] `package.json` 不包含 tailwindcss
- [ ] `pnpm build` 成功
- [ ] 所有页面样式正常渲染
