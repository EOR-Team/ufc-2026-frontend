# 代码规范

## TypeScript 规范

### 类型声明

**公共 API 必须显式声明类型**:

```typescript
// ✅ 正确：显式声明
export function formatMessage(content: string): string {
  return content.trim()
}

// ❌ 错误：隐式 any
export function formatMessage(content) {
  return content.trim()
}
```

**接口与类型别名**:

```typescript
// 接口用于对象结构
interface Message {
  type: 'bot' | 'user'
  content: string
}

// 类型别名用于联合类型、工具类型
type MessageType = 'bot' | 'user'
```

### 避免 any

```typescript
// ✅ 正确：unknown + 类型守卫
function handleError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'Unknown error'
}

// ❌ 错误：any 丢失类型安全
function handleError(error: any): string {
  return error.message
}
```

### Vue 组件中的 TypeScript

```typescript
<script setup lang="ts">
// ✅ 正确：定义接口
interface ChecklistItem {
  text: string
  subtext: string
  done: boolean
  urgent?: boolean
}

const items = ref<ChecklistItem[]>([])
</script>
```

## Vue 3 Composition API 规范

### Script Setup 结构

```vue
<script setup lang="ts">
// 1. 导入
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

// 2. Store 使用
const settings = useSettingsStore()

// 3. 响应式状态
const messageInput = ref('')

// 4. 计算属性
const isValid = computed(() => messageInput.value.trim().length > 0)

// 5. 方法
const sendMessage = () => {
  // ...
}

// 6. 生命周期
onMounted(() => {
  // ...
})
</script>
```

### Props 与 Emits

```typescript
// Props 定义
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Emits 定义
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'delete'): void
}>()
```

## Pinia Store 规范

```typescript
// stores/settings.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'ufc-settings'

// 状态
export const useSettingsStore = defineStore('settings', () => {
  const useOnlineModel = ref(true)
  const useVoiceReading = ref(false)

  // 持久化
  watch(
    () => ({ useOnlineModel: useOnlineModel.value, useVoiceReading: useVoiceReading.value }),
    (settings) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    },
    { deep: true }
  )

  return {
    useOnlineModel,
    useVoiceReading,
  }
})
```

**使用 Store**:

```typescript
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()
// 直接访问
settings.useOnlineModel
```

## 样式规范

### SCSS 结构

```scss
<style scoped lang="scss">
// 1. 设计令牌（必须）
$primary: #00606d;
$surface-container-low: #f1f4f5;

// 2. 布局类
.container {
  // ...
}

// 3. 元素类
.element {
  // ...
}

// 4. 状态类
.active {
  // ...
}

// 5. 响应式
@media (min-width: 768px) {
  // ...
}
</style>
```

### 设计令牌使用

**必须从 DESIGN_SYSTEM.md 导入颜色变量**:

```scss
// ✅ 正确：使用设计令牌
background: $surface-container-low;
color: $primary;

// ❌ 错误：硬编码颜色
background: #f1f4f5;
color: #00606d;
```

### 嵌套与选择器

```scss
// ✅ 正确：合理嵌套（不超过 3 层）
.card {
  .header {
    .title {
      font-size: 1rem;
    }
  }
}

// ❌ 错误：过度嵌套
.card {
  .header {
    .title {
      .text {
        span {
          // ...
        }
      }
    }
  }
}
```

## 路由规范

```typescript
// router/index.ts
const routes: RouteRecordRaw[] = [
  {
    path: '/triage-chat',
    name: 'triage-chat',
    component: () => import('@/pages/TriageChat.vue'), // 懒加载
  },
]
```

**页面间导航**:

```typescript
// ✅ 使用 router-link（模板中）
<router-link to="/settings">
  <button>设置</button>
</router-link>

// ✅ 使用 useRouter（脚本中）
const router = useRouter()
router.push('/settings')
router.back()
```

## 错误处理

```typescript
// ✅ 正确：async/await + try/catch
async function fetchMessages() {
  try {
    const response = await api.getMessages()
    return response.data
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return []
  }
}

// ❌ 错误：隐式错误丢弃
async function fetchMessages() {
  const response = await api.getMessages()
  return response.data
}
```

## 代码格式

| 规则 | 说明 |
|------|------|
| 缩进 | 2 空格 |
| 引号 | 单引号 |
| 分号 | 不使用 |
| 换行 | 80 字符限制 |
| 末尾逗号 |trailing comma |

## 提交规范

```
feat: 添加导诊导航路径显示
fix: 修复聊天消息发送失败问题
refactor: 重构设置页面状态管理
docs: 更新开发文档
```

## 禁止事项

1. **禁止 console.log**: 使用日志库或调试工具
2. **禁止 any**: 使用 unknown + 类型守卫
3. **禁止内联样式**: 使用 SCSS 类
4. **禁止硬编码颜色**: 使用设计令牌变量
5. **禁止魔数**: 使用命名常量
