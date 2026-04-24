# 架构设计

## 应用架构

```
┌─────────────────────────────────────────────────────────────┐
│                         App.vue                              │
│                    (根组件，v-app)                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      router-view                             │
│                  (路由视图出口)                               │
└─────────────────────────────────────────────────────────────┘
          │              │              │              │
          ▼              ▼              ▼              ▼
    ┌──────────┐  ┌──────────────┐  ┌──────────┐  ┌──────────┐
    │HomePage  │  │ TriageChat   │  │Recovery   │  │Settings   │
    │          │  │              │  │ChatPage   │  │Page       │
    └──────────┘  └──────────────┘  └──────────┘  └──────────┘
                        │   │
                        ▼   ▼
                  ┌─────────────┐
                  │  settings   │  ← Pinia Store (共享)
                  │   Store     │
                  └─────────────┘
```

## 状态管理

### Pinia Store 结构

**设计原则**:
- 跨页面共享的状态放入 Store
- 页面私有状态使用 `ref`/`reactive`
- Store 包含持久化逻辑

### Settings Store (已实现)

```typescript
// stores/settings.ts
interface SettingsState {
  useOnlineModel: boolean   // 在线模型开关
  useVoiceReading: boolean  // 语音朗读开关
}
```

**Store 职责**:
- 存储用户偏好设置
- 持久化到 localStorage
- 提供响应式状态供组件访问

**数据流**:

```
SettingsPage → settingsStore → TriageChat
                              → RecoveryChatPage
```

### 状态类型定义

```typescript
// stores/settings.ts
interface SettingsState {
  useOnlineModel: boolean
  useVoiceReading: boolean
}

// 扩展：未来可添加
interface ChatMessage {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: number
}

interface ChatState {
  messages: ChatMessage[]
  isLoading: boolean
}
```

## 路由设计

### 路由配置

```typescript
// router/index.ts
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/triage-chat',
    name: 'triage-chat',
    component: () => import('@/pages/TriageChat.vue'),
  },
  {
    path: '/recovery-chat',
    name: 'recovery-chat',
    component: () => import('@/pages/RecoveryChatPage.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/pages/SettingsPage.vue'),
  },
]
```

### 路由特性

| 特性 | 实现 |
|------|------|
| 懒加载 | `component: () => import(...)` |
| 路由命名 | `name: 'triage-chat'` |
| 路由参数 | 通过 URL query 或 params |
| 导航守卫 | 可添加 `beforeEach` |

### 导航模式

```typescript
// 编程式导航
const router = useRouter()

// 跳转
router.push('/settings')

// 返回
router.back()
```

## 组件分层

### 页面组件 (Pages)

**职责**: 页面级布局、业务流程协调

```
pages/
├── HomePage.vue          # 首页，路由导航
├── TriageChat.vue        # 导诊聊天，消息处理
├── RecoveryChatPage.vue  # 恢复聊天，进度追踪
├── SettingsPage.vue      # 设置，状态更新
└── About.vue
```

**页面组件特征**:
- 使用 `<script setup lang="ts">`
- 包含业务逻辑和状态
- 引用 UI 组件和 Store
- 管理页面生命周期

### UI 组件模式

**当前项目 UI 组件直接内联在页面中**

如需提取公共 UI 组件，建议结构：

```
components/
├── ui/
│   ├── HeaderBar.vue      # 通用 Header
│   ├── ChatBubble.vue     # 聊天消息气泡
│   ├── ChatInput.vue      # 聊天输入框
│   └── ToggleSwitch.vue   # 开关控件
└── feature/
    ├── ServiceCard.vue    # 首页服务卡片
    ├── ProgressTracker.vue # 恢复进度追踪
    └── Checklist.vue      # 治疗清单
```

## 数据流

### 消息数据流 (聊天页面)

```
用户输入 → sendMessage() → messages.push() → Vue 响应式更新 → UI 渲染
```

**消息状态**:

```typescript
interface Message {
  type: 'bot' | 'user'
  content?: string
  hasDashboard?: boolean        // RecoveryChat 特有
  progressPercent?: number
  progressTitle?: string
  checklist?: ChecklistItem[]
  hasPath?: boolean             // TriageChat 特有
  pathSteps?: string[]
  pathHighlights?: number[]
}
```

### 设置数据流

```
SettingsPage → settingsStore.useOnlineModel → TriageChat/RecoveryChatPage 读取
```

## 插件系统

### Vuetify 插件

```typescript
// plugins/vuetify.ts
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#00606d',
          // ...
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})
```

**全局组件**: `v-app`, `v-main`, `v-btn`, `v-icon`

## 样式架构

### 样式组织

1. **设计令牌** (`$primary`, `$surface-container-low` 等)
2. **组件样式** (`.class` 选择器)
3. **响应式变体** (`@media` 查询)

### 样式隔离

- `<style scoped>` 限制样式作用域
- 跨组件共享使用 CSS 变量或全局类
- Vuetify 组件样式覆盖使用 `!important` 谨慎

## 模块导入路径

| 路径别名 | 实际路径 |
|----------|----------|
| `@/` | `src/` |
| `@/pages/` | `src/pages/` |
| `@/stores/` | `src/stores/` |
| `@/router/` | `src/router/` |
| `@/components/` | `src/components/` |

**Vite 配置**:

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
},
```

## 扩展架构

### 添加新的 Store

```typescript
// stores/chat.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const isLoading = ref(false)

  return { messages, isLoading }
})
```

### 添加新页面

1. 在 `src/pages/` 创建组件
2. 在 `router/index.ts` 添加路由
3. 导航到页面测试

### 添加新的设置项

1. 更新 `stores/settings.ts` 的接口和状态
2. 更新 `SettingsPage.vue` 添加 UI
3. 需要使用设置的页面通过 store 访问

## 性能优化

### 懒加载页面

```typescript
// ✅ 正确：懒加载所有页面
component: () => import('@/pages/TriageChat.vue')

// ❌ 错误：同步加载
component: TriageChat
```

### 响应式计算

```typescript
// ✅ 正确：使用 computed 缓存
const filteredMessages = computed(() =>
  messages.value.filter(m => m.type === 'bot')
)

// ❌ 错误：每次访问重新计算
const hasMessages = messages.value.length > 0
```

### 大列表处理

聊天消息列表建议使用 `v-virtual-scroller` 如果消息量超过 100 条。
