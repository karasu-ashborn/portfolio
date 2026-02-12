# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Static HTML/CSS/JS portfolio website for Boubacar Coulibaly (BTS SIO SISR student). The site showcases infrastructure, networking, and cybersecurity skills with an Apple-inspired dark theme design.

## Development

No build tools, bundlers, or package managers. Open HTML files directly in a browser or use any static server:

```powershell
python -m http.server 8000
```

## Architecture

### Pages
- `index.html` - Homepage with hero, animated story section, highlights, and CTA
- `projet.html` - Projects page (stub)
- `competances.html` - Skills page (stub)
- `contacts.html` - Contact page (stub)

### Styling (`assets/css/style.css`)
- CSS custom properties in `:root` define the color palette (violet/white/gray on dark)
- Glass morphism effects using `backdrop-filter: blur()` and semi-transparent backgrounds
- Responsive breakpoints at 980px and 560px
- BEM-lite naming: `.component`, `.component-element`, `.is-state`

### JavaScript (`js/story.js`)
- Scroll-driven animation using `IntersectionObserver`
- Syncs `.step` articles with `.screen-slide` phone mockup content
- Uses `rootMargin` for center-of-viewport activation threshold

## Navigation Note

Links in `index.html` use `competences.html` and `contact.html` (singular), but actual files are `competances.html` and `contacts.html` (plural). These need to be aligned.
