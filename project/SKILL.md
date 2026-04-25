---
name: cheatit-design
description: Use this skill to generate well-branded interfaces and assets for CHEATIT (a fictional FACEIT-style competitive matchmaking platform for CS2 HvH players), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- **Tokens:** `colors_and_type.css` — import this first.
- **Level badges:** `assets/level-badges.css` — `<span class="lvl lvl-7">7</span>`, sizes `lvl-sm` / `lvl-lg` / `lvl-xl`.
- **Logos:** `assets/logo-wordmark.svg`, `assets/logo-mark.svg`, `assets/logo-wordmark-mono.svg`.
- **Components:** `ui_kits/web/Common.jsx` — TopBar, Avatar, Level, Button, Card, Pill, Eyebrow, Icon.
- **Screen recipes:** `ui_kits/web/{Login,Profile,Play,Leaderboard,Tournaments,Shop}.jsx`.

## Brand essentials

- Dark surfaces (`#0D0D0F` page) + single orange accent (`#FF5500`).
- Display: Russo One (uppercase, tight tracking). Body: Inter. Mono: JetBrains Mono.
- 10-tier level ramp (grey → green → yellow → orange → red), hexagonal badges.
- RU primary, EN fallback. ALL CAPS for chrome (buttons, tabs, headings); sentence case for body.
- Mandatory disclaimer in any cheat-purchase / cheat-pick context: declared software must match what's running, otherwise instant ban.
- Cheat brands referenced as monospace wordmark chips, never with their real logos.
