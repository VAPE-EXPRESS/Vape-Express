# Design System & Aesthetic Reference

This document serves as a comprehensive reference for the visual language, color palettes, and UI patterns used across the project.

## 🎨 Color Palette

| Name | Hex | Description |
| :--- | :--- | :--- |
| **Primary** | `#f27f0d` | Vibrant orange used for focus, buttons, and accents. |
| **Background Dark** | `#0a0a0a` | Global background color. |
| **Background Base** | `#030303` | Ultra-dark base for high-contrast gradients. |
| **Card Dark** | `#141414` | Secondary background for panels and cards. |
| **Border Dark** | `#2a2a2a` | Default border color for interactive elements. |
| **Apple Gray** | `#F5F5F7` | Neutral gray inspired by Apple for text and labels. |
| **Primary Glow** | `rgba(242, 127, 13, 0.15)` | Subtle ambient glow utility. |

---

## 🖋️ Typography & "CloudPro Crisp" Text Effect

To achieve the ultra-clean, Apple-like retina-ready premium typography (often referenced as the "CloudPro Coils" text aesthetic), you **must** implement a specific combination of font-stack configuration, aggressive CSS `-webkit-font-smoothing`, and precise utility sizing.

### 1. Global Tailwind Configuration
Always ensure the Tailwind config overrides the default sans font with the native system UI display stack. This forces Mac/iOS devices to use `SF Pro Display` and Windows devices to use crisp `Segoe UI`.

```javascript
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                "display": ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Arial", "sans-serif"]
            },
        },
    },
}
```

### 2. The `<body` Tag Setup (CRITICAL FIX)
You **must** apply the `antialiased` Tailwind class globally to the `<body>` element. This triggers `-webkit-font-smoothing: antialiased;` and `-moz-osx-font-smoothing: grayscale;`. Without this, fonts will appear jagged or overly thick against dark glass backgrounds.

```html
<!-- CORRECT: Crisp, thin, Apple-like font rendering -->
<body class="bg-background-dark font-display antialiased text-apple-gray">
```

### 3. Component Level Label Pattern
When creating small, highly legible table data or widget labels like "CloudPro Coils":

```html
<!-- Example of the exact text treatment -->
<span class="text-[11px] font-bold text-white tracking-wide">CloudPro Coils</span>
```

**Key Typography Rules:**
- **Size**: Use precise arbitrary fragment sizes like `text-[10px]` or `text-[11px]` on heavy data tables rather than relying purely on the default `text-xs`.
- **Color Contrast**: Always map primary list text to pure `#ffffff` (`text-white`) or Apple-gray (`#F5F5F7`), contrasted tightly against a dark `#0a0a0a` or `.glass-card` background.
- **Weights**: 400 (Regular) for body paragraphs, 700 (Bold) for data lists or labels.

---

## ✨ Core Aesthetic: "Premium Tech / Glassmorphism"

The design follows a "Dark Premium" aesthetic characterized by high-end glass effects, 3D interactions, and iridescent accents.

### 🔳 UI Styling Patterns
- **Glass Cards**:
  - `background: rgba(15, 15, 15, 0.35)`
  - `backdrop-filter: blur(5px)`
  - `border: 1px solid rgba(255, 255, 255, 0.04)`
  - **Reactive Shimmer**: A mouse-tracked radial gradient on the border (`opacity: 0` to `1` on hover).
- **Glass Tags**:
  - `background: rgba(30, 30, 35, 0.4)`
  - `backdrop-filter: blur(12px)`
  - `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5)`
- **Border Radius**:
  - Small/Default: `4px` (0.25rem)
  - Components (Inputs/Buttons): `12px` (xl)
  - Cards: `5px` (custom defined for specific card layouts)

---

## 🌌 Background & Layers

### **The "Metallic Dot" Layer**
A signature background effect using a tiny repeating dot pattern masked with multi-layered gradients.
- **Dots Mask**: `radial-gradient(circle at 35% 35%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 0.5px, transparent 1px)`
- **Dot Size**: `10px 10px`
- **Gradient Composition**:
  - **Metallic Beam**: Top-left linear gradient (White to transparent).
  - **Ambient Orange**: Bottom-right radial gradient (`#ff8c00`).
  - **Orange Core**: Center radial glow (`#f27f0d`).

---

## 🌀 Interactive Effects

### **1. 3D Tilt & Magnetic Repulsion**
- Used on floating product images (Vapes).
- **Repulsion**: Moves elements away from the cursor based on distance.
- **Tilt**: Rotates elements (RotateX/Y) toward the cursor for a 3D perspective feel.

### **2. Iridescent Borders**
- Used in the "Magic Tooltip" and PFP component.
- **CSS**: `conic-gradient` using HSL values (`hsl(280, 100%, 78%)`, `hsl(200, 100%, 72%)`, etc.).
- **Animation**: Spinning (`pfpSpin`) or proximity-driven (`--t-mx`).

### **3. Glows (Mobile & Desktop)**
- **Touch Glow**: A diffused white light that follows touches on mobile.
- **Ambient Glow**: Large, blurred background blobs (`blur(80px)`) in primary colors.

---

## 📑 Functional UI Guidelines

### **1. Button Hierarchy**

| Type | Visual Style | Usage |
| :--- | :--- | :--- |
| **Action (Primary)** | `bg-primary` (#f27f0d), `text-dark`, bold | Main call-to-action (e.g., "Log In", "Create Account"). |
| **Social (Google)** | `bg-white`, `text-black`, bold | Third-party authentication for Google. |
| **Social (Glass)** | `bg-white/5`, `border-white/10`, `text-white` | Third-party authentication for Apple or secondary options. |
| **Text Link** | `text-primary`, no background | Auxiliary actions like "Forgot Password?" or "Create now". |

---

### **2. Typography & Color Usage**

- **Main Component Headings**: 
  - Color: `#ffffff` (White)
  - Style: **Uppercase, Bold, text-xl**.
  - Usage: Card titles, main headers.
- **Section Labels & Metadata**:
  - Color: `Apple Gray` (#F5F5F7) at **50% - 60% opacity**.
  - Size: `text-[10px]`.
  - Style: Uppercase (for labels) or Normal (for helper text).
- **Body / Placeholder Text**:
  - Color: `Apple Gray` at **40% opacity**.
  - Size: `text-xs`.
- **Alerts & Validation**:
  - Color: `Primary` (#f27f0d).
  - Style: Normal weight, `text-[9px]`.

---

### **3. Form Element Patterns**

- **Input Fields**:
  - Background: `rgba(255, 255, 255, 0.05)` (White/5).
  - Border: `1px solid rgba(255, 255, 255, 0.05)`.
  - Shape: `rounded-xl` (12px).
  - **Interaction**:
    - Hover: Border increases to `White/20`.
    - Focus: `ring-1 ring-primary/40` and `border-primary/50`.

---

### **4. Profile Picture (PFP) Specification**

The PFP is a central interactive element following these states:
- **Structure**: `80px x 80px` circle.
- **Static State**: 
  - User image or Outlined SVG silhouette (`opacity 40%`).
  - **Outer Border**: `2px dashed rgba(255, 255, 255, 0.25)`.
- **Hover State**:
  - **Dashed Border**: Fades to `opacity 0`.
  - **Iridescent Ring**: Fades to `opacity 1` (spinning animation).
  - **Glass Overlay**: `rgba(10, 10, 10, 0.5)` background with `6px` blur.
  - **Center Icon**: White upload arrow (scales from 0.7 to 1.0).
- **Modification State**:
  - **Remove Button**: Small black circle with white "✕" at the top-right corner, appearing only when a custom image is present.

