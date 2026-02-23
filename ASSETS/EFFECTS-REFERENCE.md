# ✦ VAPE EXPRESS — Interactive Effects Reference Guide

> **Purpose**: A comprehensive, copy-paste-ready prompt for recreating all the premium interactive effects used in the VAPE EXPRESS Login page. Covers iridescent borders, magnetic repulsion, 3D tilt, glass morphism, reactive shimmer, proximity-driven reveals, and mobile touch glow.

---

## Table of Contents

1. [Effect #1 — Reactive Shimmer Border (Glass Card)](#1-reactive-shimmer-border-glass-card)
2. [Effect #2 — Iridescent Rainbow Border (Proximity-Driven)](#2-iridescent-rainbow-border-proximity-driven)
3. [Effect #3 — Magnetic Repulsion (Elements Evade the Cursor)](#3-magnetic-repulsion-elements-evade-the-cursor)
4. [Effect #4 — 3D Tilt on Mouse Proximity](#4-3d-tilt-on-mouse-proximity)
5. [Effect #5 — Proximity Reveal (Fade In/Out by Distance)](#5-proximity-reveal-fade-inout-by-distance)
6. [Effect #6 — Tooltip with Countdown Timer + Shape Morph](#6-tooltip-with-countdown-timer--shape-morph)
7. [Effect #7 — Mobile Touch Glow](#7-mobile-touch-glow)
8. [Effect #8 — Mobile Auto-Scanning Flashlight](#8-mobile-auto-scanning-flashlight)
9. [Effect #9 — Organic Float Animation](#9-organic-float-animation)
10. [Master Prompt (Copy-Paste for AI)](#master-prompt)

---

## 1. Reactive Shimmer Border (Glass Card)

**What it does**: A white shimmer light follows the mouse along the card's border. Only the border glows — not the inside of the card. The effect is like a flashlight beam tracing the edges of frosted glass.

### Core Technique
A `::after` pseudo-element covers the card with a `radial-gradient` centered at the mouse position. A CSS `mask` trick punches out the interior, leaving only the border visible.

### CSS
```json
{
  "component": "glass-card",
  "base_styles": {
    "background": "rgba(15, 15, 15, 0.35)",
    "backdrop-filter": "blur(5px)",
    "-webkit-backdrop-filter": "blur(5px)",
    "border": "1px solid rgba(255, 255, 255, 0.04)",
    "position": "relative"
  },
  "pseudo_after": {
    "purpose": "Shimmer border that follows mouse",
    "content": "''",
    "position": "absolute",
    "inset": "0",
    "border-radius": "inherit",
    "padding": "1px",
    "pointer-events": "none",
    "z-index": "50",
    "background": "radial-gradient(500px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255, 255, 255, 0.6), transparent 40%)",
    "mask_trick": {
      "-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      "mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      "-webkit-mask-composite": "destination-out",
      "mask-composite": "exclude",
      "explanation": "Two identical masks — one for content-box, one for border-box. mask-composite: exclude punches out the interior, leaving only the 'padding' region (the 1px border) visible."
    },
    "transition": "opacity 0.5s ease"
  },
  "hover_rule": {
    "selector": ".glass-card:hover::after",
    "opacity": "1",
    "explanation": "Only show the shimmer on hover"
  }
}
```

### JavaScript
```json
{
  "event": "mousemove",
  "target": "document",
  "logic": {
    "step_1": "Get the card's bounding rect",
    "step_2": "Compute mouse position relative to the card: x = e.clientX - rect.left, y = e.clientY - rect.top",
    "step_3": "Set CSS custom properties on the card element",
    "code": "card.style.setProperty('--mouse-x', `${x}px`); card.style.setProperty('--mouse-y', `${y}px`);"
  }
}
```

### How to tune
| Parameter | Default | Effect |
|---|---|---|
| `radial-gradient size` | `500px circle` | Larger = bigger glow footprint |
| `rgba(255,255,255,0.6)` | White 60% | Controls shimmer brightness |
| `transparent 40%` | 40% falloff | How quickly the glow fades out |
| `padding` | `1px` | Thickness of the shimmer border |

---

## 2. Iridescent Rainbow Border (Proximity-Driven)

**What it does**: A rainbow-colored arc appears on the border of an element, positioned wherever the mouse is. The further the mouse gets from the element, the fainter it becomes. The arc sweeps through violet → cyan → mint → gold → pink.

### CSS
```json
{
  "component": "glass-tag or tooltip-content",
  "pseudo_after": {
    "purpose": "Iridescent arc that follows mouse along the border",
    "content": "''",
    "position": "absolute",
    "inset": "0",
    "border-radius": "inherit",
    "padding": "1px",
    "pointer-events": "none",
    "background": {
      "type": "radial-gradient",
      "size": "100px circle",
      "position": "var(--tag-mx, -200px) var(--tag-my, -200px)",
      "color_stops": [
        "hsl(280, 100%, 78%)    /* violet */",
        "hsl(200, 100%, 72%) 20%  /* cyan */",
        "hsl(160, 100%, 68%) 38%  /* mint */",
        "hsl(50,  100%, 78%) 58%  /* gold */",
        "hsl(330, 100%, 78%) 78%  /* pink */",
        "transparent 92%"
      ]
    },
    "mask_trick": {
      "-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      "mask-composite": "exclude",
      "explanation": "Same punch-out technique as shimmer — only the border padding zone is visible"
    },
    "opacity": "var(--tag-iri, 0)",
    "transition": "opacity 0.6s ease"
  }
}
```

### JavaScript
```json
{
  "event": "mousemove",
  "target": "document",
  "per_element_logic": {
    "step_1": "For each tag element, get its bounding rect",
    "step_2": "Compute relative mouse position for gradient centering",
    "step_3": "Calculate distance from mouse to center of tag",
    "step_4": "Map distance to opacity (0–1) using linear fade between min/max thresholds",
    "code": [
      "const tRect = tag.getBoundingClientRect();",
      "const tx = e.clientX - tRect.left;",
      "const ty = e.clientY - tRect.top;",
      "tag.style.setProperty('--tag-mx', `${tx}px`);",
      "tag.style.setProperty('--tag-my', `${ty}px`);",
      "",
      "// Distance from mouse to centre of tag",
      "const tagCx = tRect.left + tRect.width / 2;",
      "const tagCy = tRect.top + tRect.height / 2;",
      "const tagDist = Math.sqrt((e.clientX - tagCx)**2 + (e.clientY - tagCy)**2);",
      "",
      "// Proximity opacity: fully bright at 60px, gone at 250px",
      "const iriMax = 250;",
      "const iriMin = 60;",
      "let iri = 0;",
      "if (tagDist < iriMin) iri = 1;",
      "else if (tagDist < iriMax) iri = 1 - ((tagDist - iriMin) / (iriMax - iriMin));",
      "tag.style.setProperty('--tag-iri', iri);"
    ]
  }
}
```

### How to tune
| Parameter | Default | Effect |
|---|---|---|
| Gradient circle size | `100px` | Larger = wider iridescent arc |
| `iriMin` | `60px` | Distance at full brightness |
| `iriMax` | `250px` | Distance where effect disappears |
| HSL colors | violet→pink | Edit to change the rainbow palette |
| `padding` | `1px` | Arc thickness |

---

## 3. Magnetic Repulsion (Elements Evade the Cursor)

**What it does**: Elements gently float away from the cursor, as if magnetically repelled. The closer the mouse, the stronger the push. Creates an organic, alive feeling.

### CSS
```json
{
  "component": "vape-wrapper (or any repellable element)",
  "transform": "translate(var(--repel-x, 0px), var(--repel-y, 0px))",
  "transition": "transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)",
  "explanation": "The slow cubic-bezier transition makes the push feel organic — it overshoots slightly and settles."
}
```

### JavaScript
```json
{
  "event": "mousemove",
  "algorithm": {
    "step_1": "Calculate center of element",
    "step_2": "Calculate distance from mouse to center",
    "step_3": "If within repelRadius, compute push direction and strength",
    "step_4": "Push direction = unit vector from mouse → center",
    "step_5": "Strength = linear falloff × maxRepel",
    "parameters": {
      "repelRadius": 300,
      "maxRepel": 7.7,
      "explanation": "repelRadius is how close mouse must be to trigger push. maxRepel is max displacement in pixels."
    },
    "code": [
      "const wRect = wrapper.getBoundingClientRect();",
      "const centerX = wRect.left + wRect.width / 2;",
      "const centerY = wRect.top + wRect.height / 2;",
      "const dist = Math.sqrt((e.clientX - centerX)**2 + (e.clientY - centerY)**2);",
      "",
      "if (dist > 0 && dist < repelRadius) {",
      "    const strength = (1 - dist / repelRadius) * maxRepel;",
      "    const dx = (centerX - e.clientX) / dist;  // unit vector",
      "    const dy = (centerY - e.clientY) / dist;",
      "    wrapper.style.setProperty('--repel-x', `${dx * strength}px`);",
      "    wrapper.style.setProperty('--repel-y', `${dy * strength}px`);",
      "} else {",
      "    wrapper.style.setProperty('--repel-x', '0px');",
      "    wrapper.style.setProperty('--repel-y', '0px');",
      "}"
    ]
  }
}
```

### Variant: Tooltip Magnetic Evasion (Angle-Based)
For the tooltip, a different formula is used — it computes the angle from mouse → tooltip and pushes along that vector:

```json
{
  "variant": "tooltip-evasion",
  "code": [
    "const dist = Math.sqrt((e.clientX - tooltipAbsX)**2 + (e.clientY - tooltipAbsY)**2);",
    "const repelRadius = 300;",
    "if (dist < repelRadius) {",
    "    const force = (repelRadius - dist) / repelRadius;",
    "    const angle = Math.atan2(tooltipAbsY - e.clientY, tooltipAbsX - e.clientX);",
    "    targetX += Math.cos(angle) * force * 15;",
    "    targetY += Math.sin(angle) * force * 15;",
    "}"
  ],
  "note": "force * 15 gives up to 15px displacement at closest approach."
}
```

---

## 4. 3D Tilt on Mouse Proximity

**What it does**: When the mouse is near an element, it tilts in 3D as if physically reacting to the cursor's position. Creates a premium, tactile feeling.

### CSS
```json
{
  "component": "vape-wrapper",
  "transform": "translate(var(--repel-x, 0px), var(--repel-y, 0px)) perspective(600px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
  "transform-style": "preserve-3d",
  "transition": "transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)",
  "note": "perspective(600px) is applied inline so it scopes the 3D to this element only. 600px gives moderate depth."
}
```

### JavaScript
```json
{
  "algorithm": {
    "step_1": "Calculate distance from mouse to element center",
    "step_2": "Only activate within tiltRadius (400px)",
    "step_3": "Normalise mouse offset to [-1, +1] range based on element size",
    "step_4": "Apply maxTilt * falloff",
    "parameters": {
      "tiltRadius": 400,
      "maxTilt": 13,
      "explanation": "maxTilt is the maximum rotation in degrees. 13° is clearly visible but not exaggerated."
    },
    "code": [
      "const tiltRadius = 400;",
      "const maxTilt = 13;",
      "if (dist < tiltRadius) {",
      "    const falloff = 1 - dist / tiltRadius;",
      "    const normX = (e.clientX - centerX) / (wRect.width / 2);",
      "    const normY = (e.clientY - centerY) / (wRect.height / 2);",
      "    // rotateY for left/right, rotateX for up/down (inverted)",
      "    const tiltY = normX * maxTilt * falloff;",
      "    const tiltX = -normY * maxTilt * falloff;",
      "    wrapper.style.setProperty('--tilt-x', `${tiltX}deg`);",
      "    wrapper.style.setProperty('--tilt-y', `${tiltY}deg`);",
      "} else {",
      "    wrapper.style.setProperty('--tilt-x', '0deg');",
      "    wrapper.style.setProperty('--tilt-y', '0deg');",
      "}"
    ],
    "key_insight": "rotateX tilts the top/bottom edge toward you. Moving the mouse UP (-Y) should tilt the top away, so we negate: tiltX = -normY. rotateY tilts left/right — direct mapping from normX."
  }
}
```

---

## 5. Proximity Reveal (Fade In/Out by Distance)

**What it does**: Elements (glass tags, labels) smoothly fade in as the mouse gets closer and fade out when it moves away. Creates a sense of discovery.

### CSS
```json
{
  "component": "glass-tag",
  "opacity": "var(--tag-opacity, 0)",
  "transition": "opacity 0.15s ease-out",
  "hover_override": {
    "selector": ".vape-wrapper:hover .glass-tag",
    "opacity": "1 !important",
    "explanation": "Hovering the parent image forces all its tags to full opacity"
  }
}
```

### JavaScript
```json
{
  "algorithm": {
    "parameters": {
      "maxDist": 400,
      "minDist": 150,
      "explanation": "Fully visible within 150px, starts fading in at 400px, invisible beyond."
    },
    "code": [
      "let op = 0;",
      "if (dist < minDist) {",
      "    op = 1;",
      "} else if (dist < maxDist) {",
      "    op = 1 - ((dist - minDist) / (maxDist - minDist));",
      "}",
      "wrapper.style.setProperty('--tag-opacity', op);"
    ]
  }
}
```

---

## 6. Tooltip with Countdown Timer + Shape Morph

**What it does**: A dark glass sphere appears near the logo on hover. It shows a countdown (3s → 2s → 1s), then morphs into a rounded pill shape with a "Click me!" CTA. The sphere has a spinning dashed border and an iridescent proximity arc.

### HTML Structure
```json
{
  "structure": {
    "wrapper": "#logo-tooltip .logo-tooltip",
    "inner": ".tooltip-content (the sphere/pill)",
    "timer_layer": "#tooltip-timer .timer-circle → contains .dashed-border + #timer-text span",
    "message_layer": "#tooltip-message → contains <a> link"
  }
}
```

### CSS — Shape Morph
```json
{
  "sphere_state": {
    "border-radius": "50%",
    "width": "100%",
    "height": "100%",
    "background": "radial-gradient(circle at 30% 30%, #2a2a2a 0%, #0a0a0a 100%)",
    "box-shadow": "0 10px 20px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1)"
  },
  "pill_state": {
    "selector": ".tooltip-content.message-mode",
    "border-radius": "100px",
    "width": "90px",
    "height": "35px"
  },
  "transition": "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "explanation": "The bouncy cubic-bezier gives the morph a satisfying overshoot."
}
```

### CSS — Spinning Dashed Border
```json
{
  "selector": ".dashed-border",
  "position": "absolute",
  "inset": "4px",
  "border": "1.5px dashed rgba(255, 255, 255, 0.4)",
  "border-radius": "50%",
  "animation": "spin 8s linear infinite",
  "keyframes": {
    "from": "rotate(0deg)",
    "to": "rotate(360deg)"
  }
}
```

### JavaScript — Timer Logic
```json
{
  "trigger": "mouseenter on logo",
  "countdown": {
    "duration": 3,
    "interval": "setInterval every 1000ms",
    "during_countdown": {
      "tooltip_class": "countdown-active",
      "cursor": "not-allowed",
      "shows": "timer-text with '3s', '2s', '1s'"
    },
    "on_complete": {
      "tooltip_class": "clickable-active",
      "cursor": "pointer",
      "shows": "tooltip-message with 'Click me!' link",
      "action": "window.open(URL, '_blank') on click anywhere on the tooltip"
    }
  },
  "reset": "mouseleave on logo → clearInterval, remove classes, hide tooltip"
}
```

### Click Handler — Entire Pill Clickable
```json
{
  "key_technique": "JS click handler on the tooltip wrapper, not the tiny <a> tag",
  "code": [
    "tooltip.addEventListener('click', (e) => {",
    "    if (tooltip.classList.contains('clickable-active')) {",
    "        e.preventDefault();",
    "        e.stopPropagation();",
    "        window.open(PORTFOLIO_URL, '_blank');",
    "    }",
    "});"],
  "css_requirements": {
    "wrapper_expansion": "When clickable-active, the wrapper matches the pill size (width: 90px, height: 35px) so the entire bounding box is clickable",
    "overflow": "overflow: visible on the wrapper so the pill isn't clipped during sphere state"
  }
}
```

---

## 7. Mobile Touch Glow

**What it does**: On mobile, tapping the glass card creates a diffused white glow that blooms and slowly fades — like pressing a torch under frosted glass.

### CSS
```json
{
  "component": "touch-glow",
  "inactive": {
    "width": "220px",
    "height": "220px",
    "border-radius": "50%",
    "background": "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.07) 45%, transparent 70%)",
    "opacity": "0",
    "filter": "blur(18px)",
    "transition": "opacity 1.5s ease-out, width 0.25s ease, height 0.25s ease"
  },
  "active": {
    "opacity": "1",
    "width": "280px",
    "height": "280px",
    "transition": "opacity 0.1s ease-in",
    "explanation": "Quick appear (0.1s), slow disappear (1.5s from inactive state)"
  }
}
```

### JavaScript
```json
{
  "event": "touchstart on card",
  "guard": "Only activate if touch target is the bare card, not buttons/inputs/links",
  "code": [
    "const touch = e.touches[0];",
    "const rect = card.getBoundingClientRect();",
    "touchGlow.style.left = `${touch.clientX - rect.left}px`;",
    "touchGlow.style.top = `${touch.clientY - rect.top}px`;",
    "touchGlow.classList.remove('active');",
    "void touchGlow.offsetWidth; // force reflow",
    "touchGlow.classList.add('active');",
    "",
    "// Also trigger shimmer border",
    "card.style.setProperty('--mouse-x', `${x}px`);",
    "card.style.setProperty('--mouse-y', `${y}px`);",
    "",
    "// Auto-fade after 900ms",
    "setTimeout(() => touchGlow.classList.remove('active'), 900);"
  ]
}
```

---

## 8. Mobile Auto-Scanning Flashlight

**What it does**: On mobile, the shimmer border light automatically traces the card's perimeter in a slow loop — giving the card a living, breathing quality without any interaction.

### JavaScript
```json
{
  "trigger": "window.innerWidth <= 768 or Android UA",
  "technique": "requestAnimationFrame loop that traces the card perimeter",
  "parameters": {
    "loop_duration_ms": 5500,
    "explanation": "One full perimeter trace every 5.5 seconds"
  },
  "code": [
    "let startT = null;",
    "function autoFlashlight(time) {",
    "    if (!startT) startT = time;",
    "    const progress = ((time - startT) % 5500) / 5500;  // 0..1",
    "    const w = card.offsetWidth;",
    "    const h = card.offsetHeight;",
    "    const perimeter = 2 * (w + h);",
    "    let dist = progress * perimeter;",
    "    let rx, ry;",
    "",
    "    if (dist <= w)           { rx = dist;             ry = 0; }",
    "    else if (dist <= w + h)  { rx = w;                ry = dist - w; }",
    "    else if (dist <= 2*w + h){ rx = w - (dist-(w+h)); ry = h; }",
    "    else                     { rx = 0;                ry = h-(dist-(2*w+h)); }",
    "",
    "    card.style.setProperty('--mouse-x', `${rx}px`);",
    "    card.style.setProperty('--mouse-y', `${ry}px`);",
    "    requestAnimationFrame(autoFlashlight);",
    "}",
    "requestAnimationFrame(autoFlashlight);"
  ],
  "key_insight": "Uses the same --mouse-x/--mouse-y variables as the desktop shimmer. The CSS doesn't know or care if a real mouse is driving it."
}
```

---

## 9. Organic Float Animation

**What it does**: Elements drift in a slow, organic 8-directional pattern (up-right, down-left, up-left) creating a floating-in-space feel.

### CSS
```json
{
  "keyframes": {
    "name": "ultraSlowFloat",
    "0%_100%": "translate(0, 0)",
    "25%": "translate(8px, -15px)",
    "50%": "translate(-5px, 15px)",
    "75%": "translate(-10px, -8px)"
  },
  "usage": {
    "animation": "ultraSlowFloat 45s ease-in-out infinite",
    "explanation": "45 seconds per cycle makes it almost imperceptible — just enough to feel alive."
  },
  "variant_tags": {
    "float_1": "floatTagY 6s + floatTagX 8s (dual-axis micro-float)",
    "float_2": "floatTagY 7s reverse + floatTagX 9s (offset timing creates variety)"
  }
}
```

---

## 🧩 CSS Mask Trick — The Core Pattern

This is the **single most important technique** shared by ALL border effects (shimmer, iridescent, tooltip arc). Understanding it unlocks everything:

```json
{
  "name": "Border-Only Gradient via Mask Exclusion",
  "how_it_works": {
    "step_1": "Create a ::after pseudo-element covering the entire element (inset: 0)",
    "step_2": "Give it a padding (e.g. 1px) — this defines the visible border thickness",
    "step_3": "Apply your gradient (radial for mouse-following, linear for static) as background",
    "step_4": "Apply TWO identical masks: one for content-box, one for border-box",
    "step_5": "mask-composite: exclude — this subtracts the inner mask from the outer mask",
    "result": "Only the padding zone (the 1px border ring) shows the gradient. Interior is fully transparent."
  },
  "css_template": [
    "element::after {",
    "    content: '';",
    "    position: absolute;",
    "    inset: 0;",
    "    border-radius: inherit;",
    "    padding: 1px; /* BORDER THICKNESS */",
    "    background: /* YOUR GRADIENT HERE */;",
    "    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);",
    "    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);",
    "    -webkit-mask-composite: destination-out;",
    "    mask-composite: exclude;",
    "    pointer-events: none;",
    "}"
  ],
  "critical_note": "Do NOT forget -webkit- prefix. Safari/iOS requires -webkit-mask-composite: destination-out (not exclude)."
}
```

---

## Master Prompt

Copy and paste this prompt to recreate all effects from scratch:

---

> **PROMPT**: Build a dark glassmorphism UI with the following premium interactive effects. All effects are driven by a single `document.addEventListener('mousemove')` handler for performance:
>
> **1. REACTIVE SHIMMER BORDER**: On the main card, add a `::after` pseudo-element with `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.6), transparent 40%)`. Use the `mask-composite: exclude` trick (two identical `linear-gradient(#fff 0 0)` masks — one `content-box`, one default) with `padding: 1px` to make ONLY the border glow. JS sets `--mouse-x` and `--mouse-y` from `e.clientX - rect.left`.
>
> **2. IRIDESCENT RAINBOW BORDER**: On smaller elements, add a `::after` with `radial-gradient(100px circle at var(--mx) var(--my), hsl(280,100%,78%), hsl(200,100%,72%) 20%, hsl(160,100%,68%) 38%, hsl(50,100%,78%) 58%, hsl(330,100%,78%) 78%, transparent 92%)`. Same mask trick. JS updates `--mx`/`--my` from mouse-to-element-relative coords, plus `--iri` opacity (0→1) based on distance (fully bright at 60px, gone at 250px).
>
> **3. MAGNETIC REPULSION**: For each interactive element, calculate distance from mouse to element center. Within 300px, compute unit vector from mouse→center and multiply by `(1 - dist/300) * 7.7` to get displacement in pixels. Apply via CSS custom properties `--repel-x`/`--repel-y` with `transform: translate(var(--repel-x), var(--repel-y))` and `transition: 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)` for organic feel.
>
> **4. 3D TILT**: Within 400px of element center, normalise mouse offset to [-1,+1] range, multiply by 13° max tilt with distance-based falloff. `rotateY` from horizontal offset, `rotateX` from inverted vertical offset. Apply `perspective(600px)` on the element (not parent).
>
> **5. PROXIMITY REVEAL**: Elements have `opacity: var(--tag-opacity, 0)`. JS maps distance to opacity: 1 at <150px, linear fade from 150→400px, 0 beyond 400px.
>
> **6. TOOLTIP SYSTEM**: Glass sphere (50×50, radial-gradient for 3D depth, spinning dashed border inside) appears on logo hover. 3s countdown → sphere morphs to 100px-radius pill via `border-radius: 100px; width: 90px; height: 35px` with `cubic-bezier(0.175, 0.885, 0.32, 1.275)` bounce. During countdown: `cursor: not-allowed`. After: `cursor: pointer`, entire pill clickable via JS `window.open()`. Tooltip has own magnetic evasion (15px max displacement, angle-based).
>
> **7. MOBILE TOUCH GLOW**: On `touchstart`, place a 220px blurred white radial-gradient circle at touch point, bloom to 280px with `0.1s ease-in`, fade over `1.5s ease-out`. Only triggers on bare card surface (not child inputs/buttons).
>
> **8. MOBILE AUTO-FLASHLIGHT**: On small screens, `requestAnimationFrame` loop traces `--mouse-x`/`--mouse-y` around the card perimeter over 5.5s, reusing the same shimmer CSS.

---

*Document created: 2026-02-22 — Reference for VAPE EXPRESS login page effects.*
