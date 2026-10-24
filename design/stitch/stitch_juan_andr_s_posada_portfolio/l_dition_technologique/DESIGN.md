---
name: L'Édition Technologique
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434656'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004ced'
  primary: '#003ec7'
  on-primary: '#ffffff'
  primary-container: '#0052ff'
  on-primary-container: '#dfe3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#2243b2'
  on-tertiary: '#ffffff'
  tertiary-container: '#405dcc'
  on-tertiary-container: '#e0e3ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001452'
  on-primary-fixed-variant: '#0038b6'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#dde1ff'
  tertiary-fixed-dim: '#b8c4ff'
  on-tertiary-fixed: '#001453'
  on-tertiary-fixed-variant: '#173bab'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
  canvas-base: '#FFFFFF'
  surface-card: '#F8FAFC'
  surface-card-hover: '#F1F5F9'
  border-subtle: '#E2E8F0'
  text-primary: '#0F172A'
  text-secondary: '#475569'
  text-muted: '#64748B'
  brand-electric-hover: '#0047E0'
  badge-blue-bg: '#EFF6FF'
  badge-blue-border: '#DBEAFE'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 4.5rem
    fontWeight: '400'
    lineHeight: 5rem
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 2.75rem
    fontWeight: '400'
    lineHeight: 3.25rem
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 3rem
    fontWeight: '400'
    lineHeight: 3.5rem
    letterSpacing: -0.015em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 2rem
    fontWeight: '400'
    lineHeight: 2.5rem
  headline-md:
    fontFamily: Playfair Display
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: 2.25rem
  headline-italic:
    fontFamily: Playfair Display
    fontSize: 1.75rem
    fontWeight: '400'
    lineHeight: 2.25rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.04em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system forms the luminous light-mode counterpart to an architectural portfolio and technical monograph. It articulates an editorial-engineering duality where literary gravity meets the clarity of systematic digital craft. 

The aesthetic synthesizes:
- **Editorial High-Contrast:** Stately serif titles rendered in deep obsidian set against crisp, luminous canvas tones.
- **Architectural Bento Structure:** Deliberate containment of complex engineering artifacts, data metrics, and project narratives into tactile, rounded module cards.
- **Electric Royal Accents:** Vivid cobalt and electric blues injecting intentional focus without overwhelming the pristine, gallery-grade white space.

## Colors

The light palette transitions from technical shadow to bright archival print, maintaining rigorous contrast ratios compliant with WCAG AAA standards for text.

### Palette Directives
- **Canvas Base (`#FFFFFF`):** The primary view background, clean and clinical.
- **Surface Layering (`#F8FAFC` & `#F1F5F9`):** Neutral slate tints define distinct module cards and elevated elements without relying on heavy structural outlines.
- **Borders & Dividers (`#E2E8F0`):** Crisp, subtle 1px delineations that preserve structure across white-on-light interfaces.
- **Text Hierarchies:** Obsidian carbon (`#0F172A`) commands high authority on titles and primary body, shifting to refined slate (`#475569`) and steel (`#64748B`) for secondary prose and technical micro-labels.
- **Vibrant Blue Triad (`#0052FF`, `#2563EB`, `#1E40AF`):** Precision instruments of attention reserved for active buttons, inline links, technical status indicators, and selected state rings.

## Typography

The pairing anchors an intellectual, literary identity to a systematic technical core.

- **Editorial Serifs (`Playfair Display`):** Emphasize thoughtful prose and architectural scope. Italic styles are applied intentionally to operative verbs, project taxonomy, or quote segments.
- **Neutral Systemic Sans (`Inter`):** Handles dense project descriptions, documentation, and user interfaces with neutral optical rhythm.
- **Monospaced Instrumentation (`JetBrains Mono`):** Standardizes all engineering telemetry, timestamps, commit hashes, system tags, and key-value pairings.

## Layout & Spacing

A responsive 12-column bento system with dynamic modular flow governs spatial distribution.

- **Canvas Constraints:** Desktop views are anchored to a maximum content container of `1280px` with `3rem` canvas margins.
- **Breakpoints & Fluid Adaptability:**
  - **Desktop (1024px+):** 12-column layout with `1.5rem` gutters. Bento modules flex across 4, 6, 8, or 12 columns.
  - **Tablet (768px - 1023px):** 8-column layout. Quadrant cards split evenly into 4-column halves; hero modules span full width.
  - **Mobile (< 768px):** Single-column stacked stream with `1rem` gutters and `1.25rem` outer margins. Bento cells preserve internal visual balance by downscaling padding to `space-lg`.

## Elevation & Depth

Visual hierarchy does not depend on dark or heavy shadows, opting instead for tonal boundaries, layered cool gray volumes, and luminous hairline borders.

### Surface Elevation Levels
- **Canvas Base (Level 0):** Pure `#FFFFFF`, grounding the broader layout.
- **Bento Modules (Level 1):** `#F8FAFC` background coupled with a clean `1px solid #E2E8F0` hairline border.
- **Nested Insets (Level 2):** `#FFFFFF` or `#F1F5F9` surfaces for sub-panels, metrics, or code preview zones, bordered by `1px solid #E2E8F0`.
- **Card Interactive State:** On hover, bento cards smoothly elevate with a crisp, low-diffusion ambient shadow (`box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.04), 0 8px 10px -6px rgba(15, 23, 42, 0.02)`) and a border shift toward `#0052FF`.

## Shapes

The design uses an intentional contrast between generous, soft exterior containers and balanced interior controls.

- **Macro Containers (Bento Cards & Outer Panels):** Rendered with `rounded-2xl` (`1.5rem` / `24px`) to `rounded-3xl` (`2rem` / `32px`) to emphasize a tactile, modern product feel.
- **Interactive Controls (Buttons, Inputs, Inset Cards):** Rendered using standard `rounded-lg` (`0.75rem` / `12px` to `1rem` / `16px`).
- **Micro Tags & Status Badges:** Rendered with `rounded-md` (`0.375rem` to `0.5rem`) or fully circular pills for status pips.

## Components

### Bento Cards
- Enclosed with a `1.5rem` to `2rem` border radius, `#F8FAFC` background, and `1px solid #E2E8F0` border.
- Internal padding is set to `2.5rem` (`space-xl`) on desktop, gracefully stepping down to `1.5rem` (`space-lg`) on mobile devices.
- Module headers feature a 3-part layout: micro-icon indicator wrapped in white slate, followed by title and category metadata in `label-caps`.

### Buttons & Interactive Controls
- **Primary Action:** Solid electric royal blue (`#0052FF`) fill with `#FFFFFF` text (`Inter`, weight 600, `0.9375rem`), `rounded-lg`, and `0.75rem 1.5rem` padding. On hover, background shifts to `#0047E0` with a subtle `-1px` vertical translation.
- **Secondary / Subtle:** Surface `#FFFFFF` with `1px solid #E2E8F0` border and `#0F172A` text. On hover, background shifts to `#F1F5F9` and the border darkens to `#CBD5E1`.
- **Ghost Action:** Transparent background with `#0052FF` text; hover state introduces a light cobalt tint (`#EFF6FF`).

### Tags, Chips & Badges
- Micro-labels set in `JetBrains Mono` (`label-caps`), letter-spaced at `0.08em`.
- Feature a `#EFF6FF` soft blue container with a `1px solid #DBEAFE` border and `#1E40AF` text.
- Live status indicators contain a `0.5rem` solid electric blue circular pip with an optional pulsing outer halo.

### Form Inputs & Terminal Panels
- Inputs feature a crisp `#FFFFFF` background, `1px solid #E2E8F0` perimeter, and obsidian typography (`#0F172A`).
- Active focus state applies a `1px solid #0052FF` border and an ambient `3px` focus ring tinted in `rgba(0, 82, 255, 0.15)`.
- Terminal snippets sit in a nested `#F1F5F9` sub-card with `label-code` typography, syntax tokens highlighted in `#0052FF` and `#1E40AF`.

### Engineering Metrics & Data Displays
- Metric blocks consist of uppercase `label-caps` in muted slate (`#64748B`) followed by prominent numerals set in `Playfair Display` serif (`headline-xl` or `headline-md`) in obsidian `#0F172A`.