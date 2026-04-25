## 1. Setup and File Structure

- [x] 1.1 Create `src/components/ui/TypewriterText.vue` component file
- [x] 1.2 Add design tokens reference (from TriageChat.vue SCSS)

## 2. Character Width Measurement

- [x] 2.1 Implement `measureCharWidth(char, font)` function using Canvas measureText
- [x] 2.2 Implement `measureTextWidth(text, font)` to sum all character widths
- [x] 2.3 Add font specification constant (Inter 14px per TriageChat.vue)

## 3. TypewriterText Component Props and State

- [x] 3.1 Define `content` prop (string) for text to display
- [x] 3.2 Define `font` prop (string, default: '14px Inter')
- [x] 3.3 Define `animationDuration` prop (object with min/max ms)
- [x] 3.4 Define internal state: `displayedText`, `currentWidth`, `scaleX`, `isAnimating`, `hasReachedMaxWidth`

## 4. Animation Logic

- [x] 4.1 Implement `getRandomDuration()` function (35-60ms range)
- [x] 4.2 Implement `startTyping()` function to begin animation loop
- [x] 4.3 Implement typing tick: reveal one character, update width/scaleX
- [x] 4.4 Implement width transition: calculate next width, apply scaleX
- [x] 4.5 Implement line-wrap detection: lock scaleX to 1.0 after line 1

## 5. Template and Styles

- [x] 5.1 Create container with `overflow: hidden` and `max-width`
- [x] 5.2 Create inner content with `white-space: pre-wrap` and `transform: scaleX()`
- [x] 5.3 Add CSS transition for smooth width animation
- [x] 5.4 Apply typography styles matching TriageChat.vue (font-size, line-height)

## 6. Responsive Handling

- [x] 6.1 Add `onMounted` resize listener
- [x] 6.2 Implement `handleResize()` to recalculate maxWidth
- [x] 6.3 Add `onUnmounted` cleanup for resize listener

## 7. Integration with TriageChat

- [x] 7.1 Wrap Message 1 bot text content with `<TypewriterText>`
- [ ] 7.2 Verify animation plays correctly for Message 1
- [ ] 7.3 Confirm no regressions in existing message layout
