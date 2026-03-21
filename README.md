<div align="center">

# OSINT Toolkit

> A curated, searchable collection of 186+ OSINT tools and resources, organised by category with instant filtering.

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![In Project Eyrie](https://img.shields.io/badge/IN-PROJECT%20EYRIE-b45309?style=for-the-badge&labelColor=0f172a)](https://github.com/Project-Eyrie)
![WEB](https://img.shields.io/badge/TYPE-WEB-0369a1?style=for-the-badge&labelColor=0f172a)

</div>

---

## Overview

**OSINT Utility Stack** is a web-based bookmark directory built for investigators, analysts, and researchers. It presents a large collection of OSINT tools in a fast, filterable interface so you can find what you need without scrolling through browser bookmark folders.

---

## Features

- **186+ curated tools** - covering search engines, image analysis, geolocation, social media, domain intel, and more
- **Instant search** - filter across tool names, descriptions, domains, and categories as you type
- **Category filtering** - 16 categories with pill-style filter buttons for quick navigation
- **Monospace design** - clean, light UI using JetBrains Mono throughout
- **Responsive** - works on desktop and mobile
- **Zero dependencies at runtime** - static SvelteKit site deployed on Vercel

---

## How to Use

### About the App

The page loads all 186+ bookmarks organised into 16 categories. Use the search bar or category pills to narrow down tools. Each tile links directly to the external tool in a new tab. Tools requiring an account are tagged accordingly.

### Interface

| Area | Description |
|------|-------------|
| **Header** | Title, attribution links, and "Make your own" link to Marksmith |
| **Search bar** | Sticky search that filters across names, descriptions, domains, and categories |
| **Category pills** | Filter buttons to show a single category at a time |
| **Tile grid** | Responsive grid of bookmark cards with favicon, name, and description |
| **Back to top** | Appears after scrolling, smooth-scrolls to the top |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus the search bar |
| `Escape` | Clear search and unfocus |

### Categories

| Category | Tools |
|----------|-------|
| Search & Discovery | 9 |
| Image Analysis | 11 |
| Geolocation & Mapping | 19 |
| Email Intelligence | 11 |
| Username Search | 5 |
| Social Media Intelligence | 55 |
| Domain & Network Intelligence | 18 |
| People & Identity Search | 7 |
| Phone Number Intelligence | 6 |
| Web Archiving & Preservation | 3 |
| Transportation & Tracking | 6 |
| Australian Vehicle Registration | 8 |
| Cryptocurrency & Currency | 4 |
| Business & Corporate Intelligence | 5 |
| Utilities & Tools | 11 |
| OSINT Resources & Guides | 8 |

## Notes

- **Static site** - no backend, no database, all data is embedded in the build
- **Favicons** - loaded from Google's favicon service; falls back to initials on failure
- **Build your own** - use [Marksmith](https://marksmith.notalex.sh) to create your own bookmark stack

---

<div align="center">
  Part of <a href="https://eyrie.notalex.sh">Project Eyrie</a> - by <a href="https://notalex.sh">notalex.sh</a>
</div>
