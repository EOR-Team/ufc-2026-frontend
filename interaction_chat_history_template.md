# interaction chat history template

## Chat History 标记格式

bot 消息使用 ContentBlock 数组格式表示：

```
bot: ("文本1", <component1 />, "文本2", <component2 />, ...)
```

**格式规则：**
- 使用圆括号 `()` 包裹整个 ContentBlock 数组
- 文本用引号 `"..."` 表示
- 组件用尖括号 `<tag-name prop=value prop=value />` 表示
- 元素之间用逗号 `,` 分隔
- 文本内使用 `\n` 表示换行

**ContentBlock 类型：**
| 类型 | 示例 | 说明 |
|------|------|------|
| 文本 | `"请确认您的状况"` | 普通文本，可含 `\n` |
| confirmation-list | `<confirmation-list 键=值 键=值 />` | 确认列表组件 |
| confirm-button | `<confirm-button />` | 确认按钮 |
| nav-path | `<nav-path route=节点1+节点2+... />` | 导航路径 |
| highlight | `highlight("文本")` | 高亮文本（内联） |

---

## Chat History

> **交互模拟说明：**
> - user 消息不显示在聊天记录中，仅作为触发下一条 bot 消息的"开关"
> - 用户在网页端发送任意内容 → 触发下一条 bot 消息 → 仅显示 bot 消息
> - **Message 1**：页面加载时**自动触发**打字机动画
> - **Message 2+**：用户发送消息推进到下一阶段时，按顺序触发每个 content block 的动画
> - 动画完成后等待 100ms 再触发下一个 content block 的动画
> - 重点在于展示 bot 消息的动画效果（打字机、confirmation-list、nav-path 等）
>
> **实际 ContentBlock 结构说明：**
> - 包含 `\n` 换行符的长文本在 Message 2 中按 `\n` **分割为多个独立字符串**
> - 每个独立字符串作为独立的动画单元，可单独控制打字机动画
>
> 下面文字中包含的 `highlight("文本")` 和 `<tag-name prop=value />` 是特殊标记，需要根据语义和上下文解析出他们的含义。

### Message 1

```
bot: ("您好，我是您的智能导诊助手！为了给您提供更加准确的导诊服务，请您先描述一下自己前来就诊的原因、当前的感受等信息哦！")
```

### Message 2

```
bot: ("我明白你的意思了！", <confirmation-list 不适部位=头部疼痛；发烧 严重程度=轻微 持续时间=两三天 具体描述=一直不是特别舒服 其他信息=暂无 />, "请确认你的当前状况，这有助于我们对您的病情进行建模。\n如果觉得没问题，直接确认就行；\n如果觉得和你的感觉不同，就进行更改，直到完全符合你的感觉。", <confirm-button />)
```

### Message 3

```
bot: ("我明白了！您说 highlight("持续时间是三四天")。所以当前状况应该是：", <confirmation-list 不适部位=头部疼痛；发烧 严重程度=轻微 持续时间=三四天 具体描述=一直不是特别输出 其他信息=暂无 />, "\n还有什么问题吗？", <confirm-button />)
```

### Message 4

```
bot: ("好的！分析完您的病情后，为您选择了前往 highlight("急诊诊室") 就诊！\n这是您的行进路程：\n", <nav-path route=入口（当前地点）+挂号处+急诊诊室+缴费处+药房+出口 />, "\n有什么想修改的吗？直接说就好！\n如果没有，就确认吧！\n", <confirm-button />)
```

### Message 5

```
bot: ("我明白你的意思了！现在是新的行进路径：\n", <nav-path route=入口+挂号处+急诊诊室+缴费处+药房+洗手间+出口 />, "\n还想修改什么吗？\n", <confirm-button />)
```

### Message 6

```
bot: ("好的！现在开始导航！")
```
