## Context

The stitch-ui design at `stitch-ui/html/04-首页Home.html` provides a complete homepage mockup using raw HTML + Tailwind CSS. The target implementation is Vue 3 + Vuetify 3 with the same "Clinical Sanctuary" design tokens.

**Current State:**
- `src/pages/HomePage.vue` has minimal placeholder content (just a headline)
- Design tokens exist in `src/styles/tokens.scss` and `src/styles/main.scss`
- Vuetify is configured with MDI icons in `src/plugins/vuetify.ts`

**Constraints:**
- Must achieve 100% visual fidelity with the stitch-ui design
- Use Vuetify components where possible; Tailwind utility classes for fine-tuning
- Responsive: desktop shows header nav + content; mobile shows mobile header + bottom nav

## Goals / Non-Goals

**Goals:**
- Pixel-perfect reproduction of the homepage layout and styling
- Responsive behavior matching the design (desktop vs mobile breakpoints)
- All colors, typography, spacing matching the Clinical Sanctuary design system
- Interactive hover states and transitions matching the original

**Non-Goals:**
- No authentication or data fetching - static UI only
- No dark mode implementation (light theme only for this change)
- No routing to other pages (links are placeholders)
- No mobile menu drawer - bottom nav is sufficient per design

## Decisions

**1. Icon Library: Vuetify MDI vs Material Symbols**

Decision: Use Vuetify's built-in MDI icons via `v-icon` component.

Rationale: The design uses Material Symbols Outlined. Vuetify includes MDI icons (`@mdi/font`) which are already installed. While MDI and Material Symbols have slight visual differences, they are functionally equivalent for this implementation. The simpler integration outweighs the minor style difference.

Alternative: Could import Material Symbols directly, but adds complexity without clear benefit.

**2. Styling Approach: Scoped SCSS + Vuetify Props vs Tailwind**

Decision: Use Vuetify's built-in styling system + scoped SCSS for custom styles.

Rationale: The project uses Vuetify which provides component-level theming. The design tokens are already defined in SCSS. Mixing Tailwind would add redundancy and potential conflicts with Vuetify's styling system.

The HTML uses Tailwind because it was a quick prototype. The production Vue version should use Vue/Vuetify patterns.

**3. Color Implementation**

Decision: Use design token CSS variables from `src/styles/tokens.scss` via Vuetify theme.

Colors needed:
- Primary: `#00606d`
- Secondary Container: `#8bf1e6`
- Surface Container Low: `#f1f4f5`
- On Surface: `#181c1d`
- On Surface Variant: `#3e494b`
- Background: `#f7fafb`

These are already defined in `src/styles/tokens.scss` but need verification they match Vuetify theme config.

**4. Responsive Breakpoints**

Decision: Match Vuetify default breakpoints.
- Mobile: < 600px (default Vuetify `smAndDown`)
- Desktop: ≥ 600px (`smAndUp`)

The design uses `md:` prefix in Tailwind (meaning ≥768px). Vuetify's breakpoint is slightly different but acceptable for this implementation.

**5. Header Implementation**

Desktop header:
- `v-app-bar` with `color="surface-container-low"` and elevation
- Flex layout with logo, nav links, settings icon
- Sticky positioning with backdrop blur

Mobile header:
- Simplified `v-app-bar` with only logo
- Different styling than desktop header

**6. Card Hover Effects**

Decision: Use CSS transitions + Tailwind classes converted to SCSS.

The cards have:
- `hover:bg-surface-container-lowest` (background change)
- `transition-all duration-300` (smooth transition)
- Button: `group-hover:scale-105` (button scales on card hover)

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Color token mismatch between HTML Tailwind and Vuetify theme | Verify all colors in Vuetify theme match the HTML |
| MDI icon style differs from Material Symbols | Accept minor style difference; icons are functionally equivalent |
| Responsive behavior differs from design | Test at multiple viewport widths; adjust breakpoint if needed |
| Hover state timing differs | Match CSS transition duration (300ms) exactly |

## Open Questions

1. Should the bottom nav "问诊" and "健康" links be implemented or left as placeholder `#` hrefs?
   - Recommendation: Leave as `#` placeholders since those pages don't exist yet.

2. Is the "健康" (Health) section in the bottom nav meant to be a tab under "我的" or a separate nav item?
   - Recommendation: Implement as separate nav item per the design.

3. Should the cards link to specific routes or just be visual?
   - Recommendation: Make cards visually interactive but only link to `/` for now since destination pages don't exist.
