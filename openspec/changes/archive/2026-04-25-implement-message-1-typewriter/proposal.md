## Why

The triage-chat page needs a signature animation effect where bot messages appear character-by-character (typewriter effect) while the bubble's width dynamically grows during line 1 using scaleX transformation. This creates a fluid, organic feel of text "flowing" from the top-left, distinguishing the product's personality from generic chat interfaces.

## What Changes

- Implement `TypewriterText` Vue component with per-character reveal (35-60ms random interval)
- Implement dynamic bubble width animation using `scaleX` + `overflow: hidden` (only for line 1)
- Implement bubble height growth for multi-line content (after line 1)
- Add character width measurement via Canvas `measureText()`
- Add responsive max-width calculation with `resize` listener
- Integrate typewriter effect into existing TriageChat.vue message flow

## Capabilities

### New Capabilities

- `typewriter-animation`: Core animation system for character-by-character text reveal with dynamic bubble sizing
  - `text-measurement`: Canvas-based character width measurement for Chinese and Latin characters
  - `scaleX-width-animation`: Dynamic width growth using scaleX transformation (GPU-accelerated, no reflow)
  - `height-animation`: Bubble height growth as text wraps to subsequent lines
  - `animation-state-machine`: Typing/width-transition/done states with proper transitions

### Modified Capabilities

- `triage-chat-messages`: Add typewriter animation to existing message rendering pipeline

## Impact

- **Code**: New `TypewriterText.vue` component; modifications to `TriageChat.vue`
- **Dependencies**: None (using native Canvas API for measurement)
- **Performance**: scaleX approach ensures GPU-accelerated animation (repaint only, no reflow)
