# 设计系统

## 设计理念

**Clinical Sanctuary** — 医疗健康类应用设计，强调：
- 信任感与专业性
- 清晰的信息层级
- 柔和的视觉触感
- 无障碍可读性

## 色彩系统

### 主色板

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `$primary` | `#00606d` | 主色调：按钮、链接、强调元素 |
| `$primary-container` | `#007b8b` | 主色容器：渐变、hover 状态 |
| `$secondary` | `#006a63` | 次强调色：图标、徽章 |

### 表面色

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `$surface-container-lowest` | `#ffffff` | 最亮表面：卡片背景 |
| `$surface-container-low` | `#f1f4f5` | 低表面：设置卡片背景 |
| `$surface-container` | `#ebeeef` | 默认表面：首页卡片 |
| `$surface-container-high` | `#e5e9ea` | 高表面：输入框背景 |
| `$surface-container-highest` | `#e0e3e4` | 最高表面：气泡消息背景 |

### 功能色

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `$on-surface` | `#181c1d` | 主文本色 |
| `$on-surface-variant` | `#3e494b` | 次要文本色 |
| `$on-primary` | `#ffffff` | 主色上的文本 |
| `$background` | `#f7fafb` | 页面背景色 |
| `$outline` | `#6e797b` | 边框、分割线 |
| `$secondary-container` | `#8bf1e6` | 次要容器背景 |
| `$error` | `#ba1a1a` | 错误状态 |

### 使用方式

```scss
// 组件中使用
.button {
  background: linear-gradient(135deg, $primary 0%, $primary-container 100%);
  color: $on-primary;
}

.card {
  background: $surface-container-low;
  border: 1px solid rgba($outline, 0.15);
}

.text {
  color: $on-surface;
  &.muted {
    color: $on-surface-variant;
  }
}
```

## 字体系统

### 字体栈

| 用途 | 字体 | 回退 |
|------|------|------|
| 中文/标题 | `Manrope` | `sans-serif` |
| 英文/正文 | `Inter` | `system-ui` |

### 字号规范

| 用途 | 字号 | 行高 |
|------|------|------|
| Hero 标题 | `clamp(3rem, 1rem + 7vw, 8rem)` | 1.2 |
| 页面标题 | `2.5rem - 3rem` | 1.2 |
| 卡片标题 | `1.5rem` | 1.3 |
| 章节标题 | `1.125rem` | 1.4 |
| 正文 | `1rem` | 1.6 |
| 小文本 | `0.875rem` | 1.5 |
| 辅助文本 | `0.75rem` | 1.4 |

### 字体权重

| 用途 | 权重 |
|------|------|
| 普通文本 | 400 |
| 中等文本 | 500 |
| 标题 | 600 |
| 强调标题 | 700-800 |

```scss
.heading {
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
}

.body {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
}
```

## 间距系统

### 基础单位

`4px` — 所有间距基于 4 的倍数

### 间距规范

| 名称 | 值 | 用途 |
|------|------|------|
| `xxs` | `0.125rem (2px)` | 图标与文字间距 |
| `xs` | `0.25rem (4px)` | 紧凑元素间距 |
| `sm` | `0.5rem (8px)` | 小元素间距 |
| `md` | `1rem (16px)` | 默认间距 |
| `lg` | `1.5rem (24px)` | 卡片内间距 |
| `xl` | `2rem (32px)` | 区块间距 |
| `2xl` | `3rem (48px)` | 大区块间距 |
| `3xl` | `4rem (64px)` | 页面区块间距 |

### 页面边距

| 设备 | 边距 |
|------|------|
| Mobile | `1rem (16px)` |
| Tablet | `1.5rem (24px)` |
| Desktop | `2rem (32px)` |

### 容器最大宽度

| 容器类型 | 最大宽度 |
|----------|----------|
| 页面容器 | `1280px` |
| 内容容器 | `48rem (768px)` |
| 聊天容器 | `48rem (768px)` |

## 圆角系统

| 用途 | 圆角值 |
|------|--------|
| 按钮、输入框 | `9999px` (全圆角) |
| 卡片 | `1rem` |
| 消息气泡 | `1rem` |
| 图标容器 | `50%` (圆形) |
| 页面容器 | `0` (直角) |

```scss
.card {
  border-radius: 1rem;
}

.button {
  border-radius: 9999px;
}

.avatar {
  border-radius: 50%;
}
```

## 阴影系统

### 阴影层级

| 层级 | 用途 | 数值 |
|------|------|------|
| 轻微 | 页面元素 | `0 4px 12px rgba($on-surface, 0.06)` |
| 中等 | 卡片 hover | `0 8px 24px rgba($on-surface, 0.08)` |
| 强 | 弹窗、浮层 | `0 8px 50px rgba($on-surface, 0.12)` |

### 阴影使用

```scss
.card {
  box-shadow: 0 4px 40px rgba($on-surface, 0.06);
  transition: box-shadow 300ms ease;

  &:hover {
    box-shadow: 0 8px 50px rgba($on-surface, 0.08);
  }
}

.header {
  box-shadow: 0 4px 40px rgba($on-surface, 0.06);
}
```

## 动效系统

### 时间

| 用途 | 时长 |
|------|------|
| 微交互 | `150ms` |
| 默认过渡 | `200ms - 300ms` |
| 页面过渡 | `300ms - 500ms` |
| 进度条 | `1000ms` |

### 缓动函数

| 用途 | 缓动 |
|------|------|
| 默认 | `ease` |
| 强调 | `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) |
| 按压 | `ease-in-out` |

### 使用场景

```scss
// 默认交互
.element {
  transition: all 300ms ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

// 按钮点击
.button {
  transition: all 200ms ease;

  &:active {
    transform: scale(0.95);
  }
}

// 输入框
.input {
  transition: border-color 200ms ease, box-shadow 200ms ease;
}
```

## 图标系统

使用 **Material Design Icons** (`@mdi/font`)

### 常用图标

| 用途 | 图标名 |
|------|--------|
| 返回 | `mdi-arrow-left` |
| 设置 | `mdi-cog` |
| 发送 | `mdi-send` |
| 导诊机器人 | `mdi-robot` |
| 健康 | `mdi-health-and-safety` |
| 医疗包 | `mdi-medical-bag` |
| 医院 | `mdi-hospital-box` |
| 勾选 | `mdi-check-circle` |
| 待办 | `mdi-radio-button-unchecked` |
| 语音 | `mdi-record-voice-over` |
| 同步 | `mdi-cloud-sync` |

### 图标尺寸

| 用途 | 尺寸 |
|------|------|
| 内联图标 | `16px - 20px` |
| 按钮图标 | `24px` |
| 功能图标 | `32px` |
| 大图标 | `48px - 64px` |

```vue
<v-icon size="24">mdi-arrow-left</v-icon>
```

## Header 设计

### 固定 Header 模板

```scss
.header {
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
    width: 40-48px;
    height: 40-48px;
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
    font-weight: 600-700;
    font-size: 1.125rem;
    color: $primary;
    letter-spacing: -0.02em;
    flex: 1;
    text-align: center;
  }
}
```

## 聊天界面设计

### 消息气泡

```scss
.message-bubble {
  padding: 1rem;
  border-radius: 1rem;
  max-width: 80-85%;

  &.bot-bubble {
    background: $surface-container-highest;
    color: $on-surface;
    box-shadow: 0 4px 40px rgba($on-surface, 0.06);
  }

  &.user-bubble {
    background: linear-gradient(135deg, $primary 0%, $primary-container 100%);
    color: $on-primary;
  }
}
```

### 聊天容器

```scss
.chat-container {
  max-width: 48rem;
  margin: 0 auto;
  padding: 6-7rem 1rem 8-10rem; // top=header+间距, bottom=输入框
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
```

### 输入框

```scss
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

.send-btn {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, $primary 0%, $primary-container 100%);
  color: $on-primary;
  border-radius: 50%;
}
```

## 响应式断点

| 名称 | 宽度 | 用途 |
|------|------|------|
| Mobile | `< 600px` | 手机 |
| Tablet | `600px - 960px` | 平板 |
| Desktop | `>= 960px` | 桌面 |

```scss
// 响应式布局
.cards-grid {
  grid-template-columns: 1fr;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

// 响应式间距
.container {
  padding: 1rem;

  @media (min-width: 960px) {
    padding: 2rem 2rem;
  }
}
```

## 可访问性

### 颜色对比度

- 主文本: `$on-surface` (#181c1d) on `$surface-container-low` (#f1f4f5) — 满足 WCAG AA
- 次要文本: `$on-surface-variant` (#3e494b) on `$surface-container-low` — 满足 WCAG AA

### 触摸目标

- 最小触摸目标: `44px × 44px`
- 按钮最小尺寸: `48px × 48px`

### 焦点状态

```scss
.button:focus {
  outline: 2px solid $primary;
  outline-offset: 2px;
}
```
