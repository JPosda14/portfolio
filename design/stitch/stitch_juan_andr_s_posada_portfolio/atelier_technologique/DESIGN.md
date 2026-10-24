---
name: Atelier Technologique
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c4c5da'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8e8fa3'
  outline-variant: '#434657'
  surface-tint: '#b9c3ff'
  primary: '#b9c3ff'
  on-primary: '#00228a'
  primary-container: '#0047ff'
  on-primary-container: '#d4d9ff'
  inverse-primary: '#0046fa'
  secondary: '#a4c9ff'
  on-secondary: '#00315d'
  secondary-container: '#0267b8'
  on-secondary-container: '#d6e5ff'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#00688d'
  on-tertiary-container: '#b5e2ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b9c3ff'
  on-primary-fixed: '#001257'
  on-primary-fixed-variant: '#0033c0'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004883'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
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

This design system establishes an editorial-engineering duality for Juan Andrés Posada’s portfolio. It balances the literary gravitas of an architect’s monograph with the surgical precision of an enterprise systems engineer. The aesthetic bridges classic typography and modular digital craftsmanship.

### Aesthetic Pillars
- **Editorial Distinction:** High-contrast serif headlines featuring italic flourishes convey discernment, craft, and intellectual depth.
- **Bento Geometry:** Dense, structured information architecture packaged in soft, tactile bento cells with micro-containers and calibrated padding.
- **Electric Precision:** High-voltage royal blue accents against deep slate and luminous paper grounds, avoiding decorative excess in favor of functional clarity.

## Colors

The palette operates in a default dark mode representing technical depth, backed by a high-contrast light mode that resembles archival paper. 

### Palette Application
- **Primary (`#0047FF`):** Reserved for focal calls-to-action, primary metric callouts, and key active states. Never used for massive field fills without purpose.
- **Secondary (`#60A5FA`):** Used for subtle tag accents, secondary links, and selected states in dark mode to ensure accessible contrast.
- **Tertiary (`#38BDF8`):** Applied exclusively to micro-indicators, code syntax highlights, and active pipeline statuses.
- **Neutral Dark Canvas (`#090D16` to `#0F172A`):** Deep cobalt-tinged charcoal layers that eliminate harsh pitch-black contrast while maintaining deep value steps.
- **Light Mode Counterpart:** Pure mineral white (`#F8FAFC`) with borders tinted in cool slate (`#E2E8F0`) and text rendered in deep slate carbon (`#0F172A`).

## Typography

The typography pairs expressive, literary serif headings with strict, high-legibility sans-serif copy and monospace technical indicators.

### Stylistic Directives
- **Serif Contrast:** Display headers in `Playfair Display` should lean into italic cuts for emphasized verbs or conceptual nouns (e.g., *Crafting* Scalable Architectures).
- **Body Neutrality:** `Inter` handles long-form engineering write-ups, case studies, and specs without calling attention away from the content.
- **Monospace Rigor:** `JetBrains Mono` handles metadata, tags, time logs, and system metrics. All caps monospace is tracked out with `0.08em` for crisp rendering at tiny scales.

## Layout & Spacing

The layout is built around a flexible 12-column bento grid engineered to display asymmetric project metrics, code snippets, visual artifacts, and architectural diagrams.

### Grid & Adaptation
- **Desktop (1024px+):** 12-column layout with `1.5rem` gutters and a maximum canvas constraint of `1280px`. Bento modules span varying configurations (4-col, 8-col, 6-col, or full width).
- **Tablet (768px - 1023px):** 8-column layout. 4-column cards shift to 4-column halves; 8-column elements stretch to full width.
- **Mobile (< 768px):** Single-column stacked stream with `1rem` gutters and `1.25rem` horizontal margins. Bento cards collapse into vertical sequence cards.

## Elevation & Depth

Visual hierarchy relies on tonal layering and luminous translucent outlines rather than diffuse, muddy drop shadows.

### Surface Tiers
- **Base Canvas:** The deepest layer (`#090D16`), strictly grounded.
- **Bento Cells (Surface Level 1):** Background `#0F172A` with a micro-border of `1px solid rgba(255, 255, 255, 0.08)`.
- **Nested Micro-Containers (Surface Level 2):** Inset badges, icon wrappers, and code blocks set to `#1E293B` with `1px solid rgba(255, 255, 255, 0.05)`.
- **Hover & Active Glare:** Bento cards introduce an ambient blue glow on hover (`box-shadow: 0 0 30px -10px rgba(0, 71, 255, 0.25)`) coupled with a border transition to `rgba(96, 165, 250, 0.3)`.

## Shapes

The interface balances generous macro-containers with tight, structured micro-elements to preserve an architectural feel.

### Geometric Scale
- **Bento Cards & Outer Panels:** Use `rounded-xl` (`1.5rem` / `24px`) for generous, soft containment of technical information.
- **Buttons, Code Previews, and Media Frames:** Use `rounded-lg` (`1rem` / `16px`).
- **Badges, Micro-Icons, and Filter Chips:** Use standard `rounded` (`0.5rem` / `8px`) or fully circular pills for status pips.

## Components

### Bento Cards
- Enclosed with a `1.5rem` radius and internal padding of `space-xl` (`2.5rem`) on desktop, scaling down to `space-lg` (`1.5rem`) on mobile.
- Cards feature an isolated header grouping: micro-icon container on the left, monospace classification tag on the right, followed by a serif project title.

### Buttons & Interactive Controls
- **Primary Action:** Solid electric royal blue (`#0047FF`) with white typography (`Inter` semi-bold, `0.9375rem`), radius `0.75rem`, padding `0.75rem 1.5rem`. Hover triggers a brightness shift and subtle translation upward (`-1px`).
- **Secondary Ghost:** Transparent background, `1px solid rgba(255, 255, 255, 0.15)`, text in light slate. On hover, background shifts to `rgba(255, 255, 255, 0.05)` and border transitions to `rgba(0, 71, 255, 0.5)`.

### Icon Wrappers & Badges
- Micro-icons sit inside uniform `2.25rem x 2.25rem` square containers with `0.5rem` corner radius, using surface level 2 background (`#1E293B`) and crisp hairline borders.
- Badges feature `JetBrains Mono` uppercase labels (`label-caps`), enclosed with `0.25rem 0.5rem` padding, neutral backgrounds, and tinted accent dots.

### Input Fields & Terminal Emulators
- Form controls use flat slate backgrounds (`#0F172A`), `1px solid rgba(255, 255, 255, 0.1)`, `0.75rem` radius, and monospace input typography for an engineer-centric feel. Focus shifts the border to `#0047FF` with a subtle `2px` focus ring glow (`rgba(0, 71, 255, 0.35)`).

### Engineering Metrics & Spec Sheets
- Key-value pairs stacked inside bento cells: metric labels rendered in `label-code` muted text, with values rendered in `Playfair Display` serif numerals for an editorial finish.