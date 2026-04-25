## Context

The UFC 2026 Frontend is a Vue 3 application using Vite as the build tool. It uses TypeScript for type safety, Vuetify 3 for UI components, and Sass for styling. The build mechanism must support:

- Fast development with HMR
- Type-safe TypeScript compilation
- Auto-imported Vuetify components and styles
- Path aliases (@/) for cleaner imports
- Production optimization and minification

## Goals / Non-Goals

**Goals:**
- Document the complete build configuration stack
- Explain the purpose of each build-related file
- Clarify the relationship between tsconfig.json, tsconfig.node.json, and vite.config.ts
- Document build commands and their execution order

**Non-Goals:**
- This is a documentation/spec change only
- No modifications to actual build configuration
- No performance optimizations at this stage

## Decisions

### Decision: Vite 6 over alternatives (webpack, parcel)

**Rationale:** Vite provides superior DX with native ESM, fast HMR, and optimized production builds. The Vue ecosystem (vue-cli deprecated) recommends Vite as the standard.

**Alternatives considered:**
- webpack: Heavier configuration, slower HMR
- parcel: Less Vue-specific integration

### Decision: vue-tsc for type checking

**Rationale:** `vue-tsc` wraps the TypeScript compiler to type-check `.vue` files. Running it before `vite build` catches type errors before they reach production.

**Execution:** `vue-tsc --noEmit && vite build` ensures type safety without emitting files.

### Decision: vite-plugin-vuetify with autoImport

**Rationale:** The Vuetify Vite plugin automatically imports Vuetify styles and components, reducing manual setup and bundle size by tree-shaking unused components.

### Decision: Sass with modern-compiler API

**Rationale:** Using `api: 'modern-compiler'` leverages the faster Dart Sass compiler via Vite's built-in support.

### Decision: Path alias @/ maps to ./src

**Rationale:** The `@/` alias provides cleaner imports (`@/components/Button`) versus relative paths (`../../components/Button`).

## Risks / Trade-offs

[Risk] Type checking slows down builds → [Mitigation] Only runs on production builds; dev server skips type checking for speed
[Risk] Auto-import may include unused Vuetify components → [Mitigation] Vuetify plugin handles tree-shaking during build
