# 项目结构

## 目录结构

```
ufc-2026-frontend/
├── src/                          # 源代码目录
│   ├── App.vue                   # 根组件
│   ├── main.ts                   # 应用入口
│   ├── env.d.ts                  # TypeScript 环境声明
│   ├── router/
│   │   └── index.ts              # 路由配置
│   ├── stores/                   # Pinia 状态管理
│   │   └── settings.ts           # 设置状态（模型选择、语音开关）
│   ├── plugins/                  # 插件配置
│   │   └── vuetify.ts            # Vuetify 主题配置
│   ├── pages/                    # 页面组件（路由视图）
│   │   ├── HomePage.vue          # 首页（服务入口）
│   │   ├── TriageChat.vue        # 智能导诊聊天页
│   │   ├── RecoveryChatPage.vue  # 病后恢复聊天页
│   │   ├── SettingsPage.vue      # 通用设置页
│   │   └── About.vue             # 关于页
│   └── styles/                   # 全局样式
├── docs/                         # 开发文档
├── openspec/                     # 变更管理
├── index.html                    # HTML 入口
├── vite.config.ts               # Vite 配置
├── tsconfig.json                # TypeScript 配置
└── package.json
```

## 文件职责

### 入口文件

| 文件 | 职责 |
|------|------|
| `index.html` | 应用 HTML 入口，Vite 挂载点 |
| `src/main.ts` | Vue 应用初始化、全局插件注册 |
| `src/App.vue` | 根组件，提供全局布局如 `v-app` |

### 路由层

| 文件 | 职责 |
|------|------|
| `src/router/index.ts` | 路由配置，定义所有页面路径与懒加载 |

**路由定义示例**:

```typescript
{
  path: '/triage-chat',
  name: 'triage-chat',
  component: () => import('@/pages/TriageChat.vue'),
}
```

**页面与路由映射**:

| 路径 | 页面 | 功能 |
|------|------|------|
| `/` | HomePage | 首页服务入口卡片 |
| `/triage-chat` | TriageChat | 智能导诊对话 |
| `/recovery-chat` | RecoveryChatPage | 病后恢复指导 |
| `/settings` | SettingsPage | 通用设置 |
| `/about` | About | 关于页面 |

### 状态管理层

| 文件 | 职责 |
|------|------|
| `src/stores/settings.ts` | 共享设置状态，使用 Pinia |

**Store 设计**:

```typescript
// 设置项
interface SettingsState {
  useOnlineModel: boolean   // 在线模型开关（默认 true）
  useVoiceReading: boolean  // 语音朗读开关（默认 false）
}
```

> **重要**: TriageChat 和 RecoveryChatPage 都使用 `useSettingsStore` 共享设置

### UI 层

| 文件 | 职责 |
|------|------|
| `src/plugins/vuetify.ts` | Vuetify 主题配置，包含颜色、设计令牌 |
| `src/pages/*.vue` | 页面组件，包含业务逻辑和样式 |

## 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 页面组件 | PascalCase | `TriageChat.vue` |
| 业务组件 | PascalCase | `ServiceCard.vue` |
| 工具函数 | camelCase | `formatDate()` |
| Store | camelCase | `useSettingsStore` |
| 路由名称 | kebab-case | `'triage-chat'` |
| SCSS 变量 | kebab-case | `$surface-container-low` |
| CSS 类名 | kebab-case | `.chat-container` |

## 组件层级

```
App.vue (根组件)
└── router-view (页面渲染)
    ├── HomePage.vue
    │   └── router-link → /triage-chat, /recovery-chat
    ├── TriageChat.vue (聊天界面)
    ├── RecoveryChatPage.vue (恢复指导界面)
    ├── SettingsPage.vue
    └── About.vue
```

## 外部依赖

| 依赖 | 用途 |
|------|------|
| `@mdi/font` | Material Design Icons 图标 |
| `vuetify` | UI 组件库 |
| `pinia` | 状态管理 |
| `vue-router` | 路由 |
| `tailwindcss` | 工具类 CSS |
