<div align="center">

<img src="logo.png" alt="OSINT Toolkit" width="80" />

# OSINT Toolkit

> A curated, searchable collection of 190+ OSINT tools and resources, organised by category with instant filtering and an interactive graph view.

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![In Project Eyrie](https://img.shields.io/badge/IN-PROJECT%20EYRIE-b45309?style=for-the-badge&labelColor=0f172a)](https://github.com/Project-Eyrie)
![WEB](https://img.shields.io/badge/TYPE-WEB-0369a1?style=for-the-badge&labelColor=0f172a)

</div>

---

## Overview

**OSINT Toolkit** is a web-based bookmark directory built for investigators, analysts, and researchers. It presents a large collection of OSINT tools in a fast, filterable interface so you can find what you need without scrolling through browser bookmark folders. All bookmarks are stored in a single Netscape HTML file (`toolkit.html`) for easy maintenance and browser import.

---

## Features

- **190+ curated tools** covering search engines, image analysis, geolocation, social media, domain intel, and more
- **Instant search** filters across tool names, descriptions, domains, and categories as you type
- **Category filtering** with 16 categories via pill buttons (desktop) or dropdown (mobile)
- **Graph view** interactive horizontal tree visualisation inspired by OSINT Framework, with pan, zoom, and smooth animations
- **Download & install** export the full bookmark collection as an HTML file and import into any browser
- **Monospace design** clean, light UI using JetBrains Mono throughout
- **Responsive** works on desktop and mobile
- **Zero dependencies at runtime** static SvelteKit site deployed on Vercel

---

## How to Use

### About the App

The page loads all bookmarks organised into 16 categories. Use the search bar or category pills to narrow down tools. Toggle to Graph View for an interactive tree. Each tile links directly to the external tool in a new tab. Tools requiring an account are tagged accordingly.

### Interface

| Area | Description |
|------|-------------|
| **Header** | Title, attribution links, view toggle, download, and "Make your own" link |
| **Search bar** | Sticky search that filters across names, descriptions, domains, and categories |
| **Category pills** | Filter buttons (desktop) or dropdown (mobile) to show a single category |
| **Tile grid** | Responsive grid of bookmark cards with favicon, name, and description |
| **Graph view** | Interactive horizontal tree with expand/collapse, pan, zoom, and smooth animations |
| **Back to top** | Appears after scrolling, smooth-scrolls to the top |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus the search bar |
| `Escape` | Clear search and unfocus |

---

## Notes

- **Single source of truth** all bookmarks live in `static/toolkit.html` as a standard Netscape bookmark file
- **Favicons** loaded from Google's favicon service; falls back to initials on failure
- **Build your own** use [Marksmith](https://marksmith.notalex.sh) to create your own bookmark stack

---

<div align="center">
  Part of <a href="https://eyrie.notalex.sh">Project Eyrie</a> - by <a href="https://notalex.sh">notalex.sh</a>
</div>
