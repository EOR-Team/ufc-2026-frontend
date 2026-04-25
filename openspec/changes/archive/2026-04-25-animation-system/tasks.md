## 1. Validate typewriter-animation spec

- [x] 1.1 Verify TypewriterText.vue exposes `start()` via `defineExpose()` returning `Promise<void>`
- [x] 1.2 Verify component does NOT auto-start on mount (animation only begins when `start()` is called)
- [x] 1.3 Verify fade-in animation duration is 180ms per character using CSS `@keyframes`
- [x] 1.4 Verify `animationDuration` prop with `min`/`max` controls per-character timing
- [x] 1.5 Verify `complete` event is emitted when all characters are displayed

## 2. Validate confirmation-list-animation spec

- [x] 2.1 Verify ConfirmationList.vue exposes `start()` via `defineExpose()` returning `Promise<void>`
- [x] 2.2 Verify `visible` prop controls `v-if` rendering (component takes no space when invisible)
- [x] 2.3 Verify list fades in over 250ms before typewriter animation begins
- [x] 2.4 Verify label typewriter at 20ms per character
- [x] 2.5 Verify 150ms pause between label completion and value start
- [x] 2.6 Verify 200ms pause between items
- [x] 2.7 Verify Promise resolves only when all items are fully displayed

## 3. Validate confirm-button-animation spec

- [x] 3.1 Verify ConfirmButton.vue exposes `start()` via `defineExpose()` returning `Promise<void>`
- [x] 3.2 Verify `visible` prop controls `v-if` rendering
- [x] 3.3 Verify fade-in with translateY(8px) animation over 250ms
- [x] 3.4 Verify `click` event emission works
- [x] 3.5 Verify scale(0.95) on active state

## 4. Validate nav-path-animation spec

- [x] 4.1 Check if NavPath.vue component exists in the codebase (exists at src/components/ui/NavPath.vue)
- [x] 4.2 If exists: verify `start()` method, fade-in, typewriter, and highlight styling (GAP: component is static, no `start()` method)
- [x] 4.3 If not exists: mark as planned/future work in the spec (N/A - component exists but does not conform to spec; NavPath spec should be marked as planned implementation)

## 5. Validate animation-orchestration spec

- [x] 5.1 Verify TriageChat.vue has `playAnimationSequence()` function
- [x] 5.2 Verify 100ms delay between content blocks
- [x] 5.3 Verify `componentRefsMap` tracks refs by message index
- [x] 5.4 Verify `visibilityMap` controls ConfirmationList and ConfirmButton visibility
- [x] 5.5 Verify `isAnimating` state blocks user input during animation
- [x] 5.6 Verify Message 1 auto-plays on mount via `onMounted` + `nextTick` + `playAnimationSequence(0)`
- [x] 5.7 Verify user input triggers next message animation via `sendMessage`

## 6. Archival and cleanup

- [x] 6.1 Mark `interaction_tech_specs.md` as superseded by OpenSpec formalization
- [x] 6.2 Ensure all spec files follow correct header formatting (#### for scenarios)
- [x] 6.3 Verify all spec scenarios use 4 hashtags and WHEN/THEN format
