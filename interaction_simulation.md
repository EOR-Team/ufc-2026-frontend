# Interaction Simulation

本项目定义了智能导诊聊天交互的动画效果、内容结构和技术实现规范。

---

## 文档索引

| 文档 | 内容 |
|------|------|
| [`interaction_chat_history_template.md`](./interaction_chat_history_template.md) | Chat History 标记格式与对话内容模板 |
| [`interaction_tech_specs.md`](./interaction_tech_specs.md) | 技术规格、动画原理、组件定义 |
| [`interaction_implement_history.md`](./interaction_implement_history.md) | 实现历程、踩坑记录、技术决策 |

---

## 核心概念

### ContentBlock

消息内容由 ContentBlock 数组组织，支持多种类型：

```
bot: ("文本", <component />, "文本", ...)
```

| 类型 | 说明 |
|------|------|
| 文本 | 普通字符串，支持 `\n` 换行 |
| confirmation-list | 确认列表组件 |
| confirm-button | 确认按钮 |
| nav-path | 导航路径组件 |
| highlight | 内联高亮文本 |

详见：[`interaction_tech_specs.md`](./interaction_tech_specs.md#contentblock-类型定义)

### 动画系统

**核心设计：所有动画由用户输入触发，而非自动播放**

**触发流程：**
```
页面加载 → Message 1 自动触发动画（打字机效果）
    ↓
用户输入任意消息推进阶段
    ↓
按顺序触发当前 bot 消息的每个 content block 动画
    ↓
前一个动画完成后，等待 100ms，触发下一个
    ↓
所有 content block 动画完成后，等待下一轮用户输入
```

**Message 1 特殊处理：**
- Message 1 在页面加载时自动触发动画，无需用户输入
- 其余消息（Message 2+）保持原有触发机制：用户输入后触发

**ContentBlock 动画类型：**
| 类型 | 动画方式 | 触发方式 |
|------|----------|----------|
| 文本 | 打字机效果 | 手动调用 start() |
| confirmation-list | fade in 250ms | 手动调用 start() |
| confirm-button | fade in 250ms | 手动调用 start() |
| nav-path | fade in + 节点依次显示 | 手动调用 start() |
| highlight | 打字机效果 | 随文本一起触发 |

详见：[`interaction_tech_specs.md`](./interaction_tech_specs.md#动画触发机制)

---

## 实现状态

| Message | 状态 | 说明 |
|---------|------|------|
| Message 1 | ✅ 已实现 | 纯文本打字机效果，**页面加载时自动触发** |
| Message 2 | ✅ 已实现 | ContentBlock 架构 + confirmation-list + confirm-button，**文本按 `\n` 分割为多个 Block** |
| Message 3-6 | 🔜 待实现 | nav-path、highlight 等组件 |

---

## 相关文件

**Vue 组件：**
- `src/pages/TriageChat.vue` - 主页面
- `src/components/ui/TypewriterText.vue` - 打字机文本组件
- `src/components/ui/ConfirmationList.vue` - 确认列表组件
- `src/components/ui/ConfirmButton.vue` - 确认按钮组件
