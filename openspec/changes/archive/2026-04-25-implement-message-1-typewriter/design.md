## Context

The triage-chat page displays bot messages with a special animation effect where text appears character-by-character (typewriter effect) while the bubble width dynamically grows only during the first line. This effect creates a "flowing water" sensation from top-left to bottom-right.

**Current state:** TriageChat.vue renders messages statically without animation.

**Constraints:**
- Must use `scaleX` + `overflow: hidden` for width animation (GPU-accelerated)
- Animation cycle: 35-60ms per character (randomized for organic feel)
- max-width: 80% of container (responsive)
- Font: Inter 14px, line-height: 1.6

## Goals / Non-Goals

**Goals:**
- Implement typewriter effect with per-character reveal (35-60ms/char random)
- Implement scaleX-based width animation for line 1 only
- Implement height growth animation for subsequent lines
- Measure character widths using Canvas `measureText()`
- Support responsive viewport changes via `resize` listener

**Non-Goals:**
- Multi-message orchestration (Message 2-6)
- Integration with confirmation-list, nav-path, confirm_button components
- User message animations

## Decisions

### Decision 1: Character Width Measurement

**Choice:** Canvas `measureText()` API

**Rationale:** Chinese characters and mixed Latin/CJK content require accurate per-character width measurement. The `pretext` library is a text layout engine, not a per-character measurement tool — it uses canvas measureText internally but doesn't expose per-character width APIs.

**Implementation:**
```typescript
const measureCharWidth = (char: string, font: string): number => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.font = font
  return ctx.measureText(char).width
}
```

### Decision 2: Width Animation — scaleX over width

**Choice:** `scaleX` + `overflow: hidden`

**Rationale:**
| Aspect | width transition | scaleX |
|--------|------------------|--------|
| Layout trigger | Reflow | Repaint only |
| Performance | Slower (layout recalc per char) | Faster (GPU-accelerated) |
| Compatibility | 100% | 100% |

scaleX is a transform property that doesn't affect document layout — only compositing.

**Implementation structure:**
```vue
<div class="typewriter-container" :style="{ maxWidth: maxWidth + 'px' }">
  <div class="typewriter-content" :style="contentStyle">
    {{ displayedText }}
  </div>
</div>
```

```scss
.typewriter-container {
  overflow: hidden;
  max-width: 80%;
}

.typewriter-content {
  white-space: pre-wrap;
  transform-origin: left center;
  transform: scaleX(v-bind(scaleX));
}
```

### Decision 3: Animation Phases

**Phase 1 (Line 1):** Width dynamic growth + typing
- Before each character: bubble width transitions to next width
- Width transition completes → character appears
- Continues until line 1 reaches maxWidth

**Phase 2 (Line 2+):** Height growth only
- Width fixed at maxWidth
- Each new line increases bubble height
- Typing continues without width animation

### Decision 4: Responsive max-width Calculation

**Choice:** `parentElement.offsetWidth * 0.8` with resize listener

```typescript
const getMaxWidth = (element: HTMLElement): number => {
  const parentWidth = element.parentElement?.offsetWidth || 768
  return parentWidth * 0.8
}

window.addEventListener('resize', handleResize)

const handleResize = () => {
  const newMaxWidth = getMaxWidth(bubbleElement)
  if (Math.abs(maxWidth - newMaxWidth) > 10) {
    maxWidth = newMaxWidth
    currentScale = currentContentWidth / maxWidth
  }
}
```

## Risks / Trade-offs

[Risk: CJK character widths vary by font] → Mitigation: Measure each character individually with exact font specification

[Risk: scaleX animation may have subpixel rendering issues] → Mitigation: Use transform with will-change: transform for GPU compositing

[Risk: Long messages may cause performance issues] → Mitigation: Animation uses requestAnimationFrame, not setInterval

## Open Questions

- Should the typewriter speed vary based on message length (slower for longer messages)?
- Is there a need for a "skip animation" button for users who have seen the animation before?
