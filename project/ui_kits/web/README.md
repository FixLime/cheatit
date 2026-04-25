# CHEATIT — Web UI Kit

A high-fidelity recreation of the CHEATIT web app, modeled 1:1 on FACEIT's UI patterns.

## Screens included

- **Login** — Steam OAuth + invite-code path. Dark hero with orange spotlight.
- **Profile** — hero band with hexagonal level badge, stats grid, recent matches strip, declared cheat panel, friends online.
- **Play** — mode tabs, big PLAY button, queue state, declared-cheat picker, region selector.
- **Leaderboard** — top 10 players in CS2 EU with regional filters.
- **Tournaments** — featured CHEATIT MAJOR hero card + grid of weekly cups.
- **Shop** — cheat-subscription cards (NIXWARE / NEVERLOSE / FATALITY / MIDNIGHT / MEMESENSE / ONETAP).

## Files

- `index.html` — interactive shell, nav rail bottom-center to switch screens.
- `Common.jsx` — shared components: `TopBar`, `Avatar`, `Level`, `Button`, `Card`, `Pill`, `Eyebrow`, `SectionTitle`, `Icon`.
- `Login.jsx`, `Profile.jsx`, `Play.jsx`, `Leaderboard.jsx`, `Tournaments.jsx`, `Shop.jsx` — one screen per file. Each registers itself on `window`.

## Design notes

- All copy is RU primary; translatable to EN by swapping label literals.
- Level badges use `assets/level-badges.css` (hexagonal CSS clip-path, 10 tiers).
- The brand-orange "queue glow" appears only on the active PLAY button.
- The cheat-disclaimer (sanctions for undeclared software) is mandatory in `Profile`, `Play`, `Shop`.
