## 1. Setup - Google Fonts & CSS Variables

- [x] 1.1 Add Google Fonts link to index.html (Manrope 400/600/800, Inter 400/500/600)
- [x] 1.2 Create src/styles/tokens.scss with CSS custom properties for all design tokens
- [x] 1.3 Import tokens.scss in src/styles/main.scss

## 2. Vuetify Theme Configuration

- [x] 2.1 Update src/plugins/vuetify.ts with Stitch color palette
- [x] 2.2 Configure light theme colors: primary (#00606d), secondary (#006a63), surface variants
- [x] 2.3 Configure dark theme colors: primary (#8bf1e6), surface (#181c1d), on-surface variants
- [x] 2.4 Set default theme to 'light'

## 3. Tailwind CSS Extended Theme

- [x] 3.1 Update vite.config.ts tailwindcss plugin to include extended colors
- [x] 3.2 Add all Stitch colors to Tailwind theme (primary, secondary, surface variants, etc.)
- [x] 3.3 Add border-radius tokens: DEFAULT (1rem), lg (2rem), xl (3rem), full (9999px)
- [x] 3.4 Add fontFamily: headline (Manrope), body (Inter), label (Inter)

## 4. Typography Base Styles

- [x] 4.1 Update src/styles/main.scss with base typography styles
- [x] 4.2 Set body font-family to Inter
- [x] 4.3 Set headline (h1-h6) font-family to Manrope
- [x] 4.4 Add font-display: swap for Google Fonts

## 5. Verification

- [x] 5.1 Run npm run dev and verify page loads without errors
- [x] 5.2 Verify colors match Stitch design (primary #00606d visible)
- [x] 5.3 Verify Manrope font loads for headlines
- [x] 5.4 Verify service cards render with correct background (#f1f4f5)
