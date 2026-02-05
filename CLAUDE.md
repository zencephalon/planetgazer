# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Planetgazer is an astrology/horoscope chart visualization web application built with Next.js and React. It generates natal horoscope charts with interactive date/time input and astronomical calculations.

## Development Commands

```bash
yarn dev      # Start development server
yarn build    # Production build
yarn start    # Start production server
yarn lint     # Run ESLint
```

Use yarn (not npm) for package management.

## Architecture

**Tech Stack:** Next.js 12, React 17, TypeScript (strict mode), Luxon for dates, chrono-node for natural language date parsing, circular-natal-horoscope-js for horoscope calculations.

**Directory Structure:**
- `pages/` - Next.js pages and API routes
- `c/` - React components
- `lib/` - Utility libraries (astrochart.js rendering, chartDataFromDt.js calculations)
- `styles/` - CSS (modules + globals)

**Data Flow:**
```
DateInput (user selects date/time via ValidatingInput + chrono parsing)
    ↓
ControlledChart (state container)
    ↓
Chart → chartDataFromDt (Luxon DateTime → horoscope calculation)
    ↓
Astro.Chart (SVG rendering to #chart div)
```

**Key Patterns:**
- ValidatingInput uses render-props pattern for reusable input validation
- Container/presentational component separation (ControlledChart holds state)
- Path alias `~/` maps to project root for imports

## Important Files

- `lib/astrochart.js` - 5000+ line chart rendering library
- `lib/chartDataFromDt.js` - Converts DateTime to horoscope data (fixed location: 40.0°N, 70.0°W)
- `c/ValidatingInput.tsx` - Generic validation wrapper, reusable for any parse/format/render combination
