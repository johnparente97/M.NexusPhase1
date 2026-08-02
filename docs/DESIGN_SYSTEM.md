# Nexus Design System & Motion Guidelines

## Visual Direction
- **Calm, Minimal & Refined**: Inspired by Apple's Human Interface Guidelines and Codex-style focused workspace environments.
- **Color Palette**:
  - Dark Neutral Foundation: `#05050A`, `#0A0A14`, `#0F0F1D`
  - Text Hierarchy: `#F8F9FE` (primary), `#A0A5C0` (secondary), `#646888` (muted)
  - Nexus Primary Accent: **Spectral Indigo** (`#6366F1` / `#818CF8`)
  - Semantic Colors: Success (`#10B981`), Warning (`#F59E0B`), Error (`#EF4444`), Info (`#3B82F6`), Neutral (`#64748B`).
- **Typography Stack**:
  ```css
  font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  ```
- **Radius System**:
  - `8px`: Compact controls & badges
  - `12px`: Standard inputs & buttons
  - `16px`: Content cards
  - `20px`: Large panels
  - `24px`: Modals & hero banners
- **Motion Durations**:
  - Hover feedback: `100ms – 140ms`
  - Small control transitions: `140ms – 180ms`
  - Panel transitions: `180ms – 240ms`
  - Modal transitions: `200ms – 260ms`
  - Page transitions: `Subtle fade + 4-8px vertical slide`
  - `prefers-reduced-motion` fully supported.
