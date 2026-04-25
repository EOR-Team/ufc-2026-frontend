# 开发文档

本目录包含用于辅助 AI 代码开发的文档体系。

## 文档结构

| 文档 | 描述 |
|------|------|
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | 项目目录结构与文件职责说明 |
| [CODE_STANDARDS.md](./CODE_STANDARDS.md) | TypeScript、Vue 编码规范与最佳实践 |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | 设计系统：配色、字体、间距、组件样式 |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 架构设计：状态管理、路由、组件模式 |
| [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md) | 页面组件与 UI 组件的编写规范 |

## 技术栈

- **框架**: Vue 3 (Composition API)
- **类型**: TypeScript
- **UI 库**: Vuetify 3
- **样式**: SCSS + Tailwind CSS
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **构建工具**: Vite

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 生产构建
pnpm build

# 类型检查
pnpm build

# 代码检查与修复
pnpm lint
```

## 注意事项

1. **设计系统优先**: 所有页面和组件应遵循 [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) 中定义的设计令牌
2. **类型安全**: 避免使用 `any`，公共 API 必须显式声明类型
3. **组件组织**: 按功能/页面组织，而非按类型
4. **状态共享**: 跨页面共享的状态使用 Pinia store
