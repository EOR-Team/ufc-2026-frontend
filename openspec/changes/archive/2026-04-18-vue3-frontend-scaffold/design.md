## Context

UFC 2026 前端项目需要统一的技术栈脚手架。项目需集成 Vue 3 + Vuetify 3 + Tailwind CSS 4 + Vite 7 + Vue Router 5 + Pinia 3 + @mdi/font。

当前状态：无前端项目结构，需要从头初始化。

## Goals / Non-Goals

**Goals:**
- 建立可运行的基础 Vue 3 项目
- 集成所有指定依赖并确保版本兼容性
- 配置开发服务器热重载
- 配置生产构建优化
- 支持本地开发调试

**Non-Goals:**
- UI 设计和业务功能实现
- 复杂的路由配置
- 状态管理复杂用例
- SSR/SSG 配置

## Decisions

### 1. 项目结构
采用标准 Vite + Vue 3 项目结构：
```
src/
├── assets/         # 静态资源
├── components/      # 通用组件
├── layouts/         # 布局组件
├── pages/           # 页面组件
├── router/          # 路由配置
├── stores/          # Pinia stores
├── styles/          # 全局样式
├── App.vue
└── main.ts
```
**Why**: 社区广泛验证的 Vue 3 项目结构，与 Vite 生态无缝集成。

### 2. Vuetify 3 集成
- 使用 `vite-plugin-vuetify` 简化配置
- 采用 Material Design 3 主题
- 启用 Tree-shaking 优化
**Why**: Vuetify 3 提供成熟 Material Design 组件，Tree-shaking 减少打包体积。

### 3. Tailwind CSS 4 集成
- 使用 `@tailwindcss/vite` 插件
- 配置 `@mdi/font` 作为图标字体
**Why**: Tailwind 4 改进性能，与 Vuetify 的 utility 类互补。

### 4. 本地开发策略
- 开发环境：本地 `vite dev`
- 生产构建：`vite build`
- 输出目录：`dist/`
**Why**: 简单的本地开发流程，无需配置复杂的部署环境。

## Risks / Trade-offs

- **[Risk]** Tailwind CSS 4 与 Vuetify 样式可能冲突
  → **Mitigation**: 使用 Vuetify 的 utility classes 优先，或使用 Tailwind 的 `@apply` 避免冲突
- **[Risk]** 多依赖版本兼容性
  → **Mitigation**: 锁定主版本号，使用 `npm-check` 定期检查
