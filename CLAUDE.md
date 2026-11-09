# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ISTA Pro is a single-page web application for packaging test standards management. It provides ISTA (International Safe Transit Association) standard lookup, drop test calculation, vibration/pressure parameter analysis, and test report generation. The UI is Chinese (zh-CN). All content is static — open `index.html` in a browser to run.

## Architecture

Three self-contained files, no framework, no build tools, no dependencies (beyond Google Fonts):

| File | Lines | Role |
|---|---|---|
| `index.html` | ~594 | Full page structure — navigation, hero, and 6 sections: standards grid, drop calculator, vibration/pressure, comparison matrix, data schema, footer |
| `app.js` | ~2277 | All application logic — 20 ISTA standards database, UI rendering, calculators, interactive 3D canvas, report generation |
| `styles.css` | ~1555 | Complete dark-themed design system defined via CSS custom properties in `:root` |

## app.js Structure

The file is organized into clearly commented sections:

1. **Data: `ISTA_STANDARDS`** — 20 ISTA standards across 4 series:
   - Series 1 (5): 1A, 1B, 1C, 1G (random vibration, heavy), 1H (random vibration, light)
   - Series 2 (2): 2A, 2B
   - Series 3 (5): 3A (4 package types), 3B, 3E, 3H (large electronics), 3K (fast food/retail chain)
   - Series 6 (6): Amazon SIOC, Amazon Overbox, Walmart, Sam's Club, Target, FedEx, UPS
   - Series 7 (2): 7D (thermal controlled transport), 7E (thermal + reverse logistics)
   - Each entry has: `dropHeights[]` (weight→height table), `testDetails` (conditioning/drop/vib/comp/impact/altitude/thermal), `passFailCriteria`, `tags`
   - **Key detail**: ISTA 3A has a `packageTypes` field with 4 types (standard, small, flat, elongated), each with separate drop height tables

2. **Data: Supporting datasets**:
   - `DROP_SEQUENCE` — 10-step test sequence (1 corner → 3 edges → 6 faces) with color coding
   - `VIB_PARAMS` — Vibration parameters for 9 standards (ISTA1A, ISTA1H, ISTA2A, ISTA3A, AMAZON_SIOC, WALMART, FEDEX, ISTA1G, ISTA3H)
   - `MATRIX_DATA` — 14-row comparison table for standards quick reference
   - `REPORT_SCHEMA` — JSON Schema (draft/2020-12) for n8n workflow integration, includes `_n8n_meta` fields

3. **State** — `{ activeStep, currentDropHeight, currentStandard, unit }` plus canvas orbit state (`orbitX`, `orbitY`, `viewZoom`) and auto-play state (`autoPlayInterval`, `autoPlayStep`, `isAutoPlaying`)

4. **Canvas subsystem** — Interactive 3D box rendering:
   - `drawBox(activeStep)` — Uses 3D rotation matrices (`rotatePoint()`) instead of fixed isometric projection; responds to orbit state
   - `setupCanvasInteraction()` — Mouse drag (orbit), scroll wheel (zoom), double-click (reset), touch support
   - `startAutoPlay()` / `stopAutoPlay()` / `toggleAutoPlay()` — 1.2s interval step-by-step auto-play with corner pulse animation
   - `startCornerPulse()` / `stopCornerPulse()` — `requestAnimationFrame` loop for pulsing corner indicator

5. **Calculators**:
   - `getDropHeight(standard, weightKg)` — Weight→height lookup from standard's `dropHeights[]`; falls back to generic ISTA table for empty tables (thermal standards)
   - `calculateDrop()` — Orchestrates drop computation → result panel + canvas + sequence
   - `calculateCompression()` — Load = Weight × (n−1) × SF
   - `showVibParams()` — Vibration PSD parameter lookup

6. **Globals** — `window.generateReport`, `window.calculateDrop`, `window.calculateCompression`, `window.showVibParams`, `window.openStandardModal`, `window.closeModal`, `window.loadStandardToCalc`, `window.highlightStep`, `window.copySchema`, `window.downloadSchema`, `window.toggleAutoPlay`, `window.startAutoPlay`, `window.stopAutoPlay`

## Key Data Flow

```
ISTA_STANDARDS → renderStandardsGrid() → filterable/searchable cards
  → click → openStandardModal(id) → detail modal with drop height table
    → "use this standard" → loadStandardToCalc() → scrolls to calculator

calculateDrop():
  weight (kg/lb bidirectional) + standard + transport type
  → getDropHeight() → weight-based lookup
  → result panel + drawBox(0) + renderDropSequence()

Canvas interaction:
  mouse drag → orbitX/orbitY → rotatePoint() → redraw
  scroll → viewZoom → redraw
  sequence click → highlightStep(idx) → drawBox(idx) with highlighted face/edge/corner
  auto-play → 1.2s interval → cycles through all 10 steps
```

## Data Accuracy Notes

- ISTA 1A drop heights use the official 9-category lb-based table (4.5/6.8/9.1/13.6/18.1/22.7/31.8/45.4/68.0 kg)
- ISTA 3A includes all 4 package types (Standard, Small, Flat, Elongated) with independent drop height tables
- Retailer-specific standards (Walmart, Target, Sam's Club) may have supplier-specific interpretations — data is for reference
- ISTA 7D/7E thermal standards have no `dropHeights` (empty array) — drop test is optional; `getDropHeight()` uses generic fallback
- All data is reference only; formal certification requires official ISTA documentation

## No Build, No Tests

Zero-dependency static site. No `package.json`, no bundler, no test runner. Open `index.html` directly in a browser. Validate syntax with `node --check app.js`.
