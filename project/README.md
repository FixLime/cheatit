# CHEATIT — Design System

> ⚠️ **CHEATIT is a parody / fictional concept** — "FACEIT for cheaters." The brand is a 1:1 visual rebrand of FACEIT's competitive matchmaking platform, used here as a design exercise. None of the materials are affiliated with or endorsed by FACEIT Ltd.

CHEATIT is a fictional CS2 matchmaking platform aimed at HvH ("Hack vs Hack") players, where everyone runs cheats and the goal is to outplay other cheaters. The visual identity directly mirrors FACEIT — dark UI, signature **orange** accent (`#FF5500`), and the same competitive Elo / 10-level skill ladder — but the iconography, copy, and product feature set are flipped to embrace the cheating context.

---

## Sources & inputs

- **No design files attached.** This system was built from the user's verbal brief plus general knowledge of FACEIT's UI patterns.
- Brief notes (paraphrased from user, RU): "FACEIT for cheaters, name CHEATIT, design like FACEIT 1:1, Steam login, profile with Elo and level exactly like FACEIT, tournaments. Cheat-selection menu featuring popular HvH brands (NIXWARE, FATALITY, XONE, NEVERLOSE, MIDNIGHT, MEMESENSE, etc). Important: include warning that running an undeclared cheat results in sanctions."
- **Primary language:** Russian. **Fallback:** English.
- **Tone:** Plays it 100% straight — looks identical to FACEIT, just rebranded. No winks-to-camera in the chrome itself.

---

## Index

Root files:
- `README.md` — this file.
- `colors_and_type.css` — design tokens (colors, type, spacing, motion). Loaded via Google Fonts; no font binaries shipped.
- `SKILL.md` — Claude Skill manifest (compatible with Claude Code if downloaded).
- `assets/` — logos (`logo-wordmark.svg`, `logo-mark.svg`, `logo-wordmark-mono.svg`) + `level-badges.css` (10-tier hex badges).
- `preview/` — 21 design-system tab cards covering colors, type, spacing, components, brand.
- `ui_kits/web/` — full UI kit: `index.html` is an interactive shell with bottom nav-rail switching between Login / Profile / Play / Tournaments / Leaderboard / Shop. See `ui_kits/web/README.md`.
- `screenshots/` — preview images.

---

## CONTENT FUNDAMENTALS

**Voice.** Direct, competitive, terse. Russian primary; English fallback uses the same compactness. Reads like a sportsbook crossed with esports broadcast chrome — never marketing-fluffy.

**Pronouns.** "Ты" (informal "you", singular) in RU. "You" in EN. Never "вы" — this is a gamer audience and the platform is peer-to-peer.

**Casing.** Display headings, primary buttons, tab labels, level/elo numbers, and section titles are in **ALL CAPS**. Body and meta text is sentence case. UI labels never use Title Case.

**Numbers.** Tabular figures everywhere. Elo, K/D, win rate, HS%, level — all rendered with `font-variant-numeric: tabular-nums` so they line up in tables and stat strips.

**Examples** (use these as voice anchors when generating copy):

| Context | RU | EN |
|---|---|---|
| Queue CTA | `ИГРАТЬ` | `PLAY` |
| Profile stat | `СРЕДНИЙ K/D` | `AVG K/D` |
| Match result | `ПОБЕДА` / `ПОРАЖЕНИЕ` | `WIN` / `LOSS` |
| Eyebrow | `АКТИВНЫЙ МАТЧ` | `LIVE MATCH` |
| Cheat pick | `ВЫБЕРИ СОФТ` | `PICK YOUR CHEAT` |
| Sanctions | `ИСПОЛЬЗОВАНИЕ НЕЗАЯВЛЕННОГО ЧИТА — БАН` | `RUNNING UNDECLARED SOFTWARE → BAN` |
| Lobby ready | `ГОТОВ` | `READY` |
| Empty state | `ПОКА НИЧЕГО` | `NOTHING YET` |

**Cheat-context disclaimer (must appear in shop / lobby / pick screen):**
> RU: «Заявленный софт должен совпадать с фактически запущенным. Использование незаявленного чита — мгновенный бан без возврата средств.»
> EN: "The cheat you declare must match the cheat you run. Running undeclared software results in an immediate, non-refundable ban."

**Don't:**
- No emoji in chrome. (Flag/badge SVGs only.)
- No exclamation marks in UI labels.
- No "сделай это легко" / "easy as 1-2-3" marketing prose.
- No "we" / "мы" — speak from product, not founder.

---

## VISUAL FOUNDATIONS

**Overall vibe.** Esports broadcast chrome. Dark, dense, modular. Information-rich without feeling cluttered, because everything snaps to a tight 4px grid and sits on flat panels separated by thin borders rather than shadows.

**Color.** Near-black surfaces (`#0D0D0F` page, `#1C1C1F` cards, `#26262A` raised) with **one** signature accent — orange `#FF5500`. Orange is reserved for: primary CTAs, level-up / earned-elo positive signals, the active state of nav, and the brand mark itself. Semantic colors (success green, danger red, warning yellow, info blue) are muted and only used for genuine status signals (win/loss, online/offline, ready/not-ready). The 10-tier level ramp goes grey → green → yellow → orange → red, matching FACEIT.

**Type.** Display family is **Russo One** (a free Google Fonts stand-in for FACEIT's proprietary "PlayFair"; flagged below). Body is **Inter**. Mono is **JetBrains Mono**. Display is reserved for: section headings, large stats, level numbers, and brand wordmark — always uppercase, tight tracking. Body copy is 14px with 1.4 line-height. Eyebrows are 11px, uppercase, +0.08em tracking, in `--fg-3`.

**Spacing.** 4px base. Card padding is typically 16px or 24px. Section gaps are 32–48px. Inline rhythm is 8–12px between related items.

**Backgrounds.** Mostly flat dark. **No** decorative gradients on surfaces. The one exception: a subtle radial / spotlight at the top of hero panels (profile header, tournament hero) using `radial-gradient(ellipse at top, rgba(255,85,0,0.12), transparent 60%)`. Imagery (map thumbnails, agent splashes) is full-bleed inside a card with a dark bottom-gradient scrim for legibility. Cool color grade — never warm/orange-tinted photography.

**Animation.** Restrained. `--dur-base: 180ms` with `cubic-bezier(0.2, 0.8, 0.2, 1)` (ease-out) is the default. No bouncing, no spring. Things that animate: nav-tab underline, button hover/press, modal fade+rise, queue-pulse on the PLAY button, elo-bar fill on stat changes. Loading uses a subtle horizontal shimmer, never spinners on full-page contexts.

**Hover states.** Surfaces lighten by one step (`bg-1` → `bg-2`). Buttons lighten by ~6% (orange `#FF5500` → `#FF6A1F`). Borders go from `--border-default` to `--border-strong`. Never opacity-only hovers.

**Press states.** Slight darken (`#E64D00` for primary), no scale transform. Nav items get a 2px orange underline that animates in over 120ms.

**Borders.** Hairline `1px` borders in `rgba(255,255,255,0.10)` are the primary divider. Dividers, table rows, card outlines — all the same value. Strong borders (`0.18`) only on focused inputs and active selections.

**Shadows.** Used sparingly. Cards are flat by default. Modal/menu pop uses `0 12px 40px rgba(0,0,0,0.6)`. The brand "orange glow" `0 0 24px rgba(255,85,0,0.35)` appears only on: the PLAY button while queueing, an active live-match pulse, and the hover state of the level badge in the profile header.

**Corner radii.** Tight. `--radius-sm: 4px` is the default for buttons, inputs, badges. Cards are `--radius-md: 6px` or `--radius-lg: 8px`. Pills (filter chips, ready-toggle) are full pill. Avatars are square with 4px radius — **never** circular for player avatars (FACEIT pattern).

**Cards.** `bg-1` fill, hairline border, no shadow. Inner padding 16px or 24px. Cards never use a "colored left border accent" pattern. Nested raised content inside a card sits on `bg-2` with the same hairline border.

**Transparency / blur.** Used on: full-screen modal backdrop (`rgba(0,0,0,0.6)` + `backdrop-filter: blur(8px)`), and the sticky topbar when the page scrolls (`bg-0` at `0.85` opacity + 12px blur). Never on cards in the resting state.

**Imagery palette.** Cool, slightly desaturated, often near-monochrome with orange highlights composited in. Map thumbnails: original screenshots tinted toward blue-grey. Tournament cards: high-contrast B&W player photography with brand orange used as a single graphic element.

**Layout rules.** Fixed topbar (56px), optional left sidebar (240px) on app routes, max content width 1280px. Marketing pages drop the sidebar and go full-bleed. Profile uses a wide hero band followed by a 12-column stats grid.

**FACEIT motifs preserved 1:1:**
- Hexagonal level badge silhouette
- Orange-on-black brand stamp
- Top-right currency / points pill in topbar
- "PLAY" giant button as the matchmaking CTA
- Match-summary horizontal team cards with player rows

---

## TYPOGRAPHY — substitutions

**FACEIT proprietary fonts are not used.** Substitutions:

| Original (FACEIT) | Used here | Rationale |
|---|---|---|
| `PlayFair` (display) | `Russo One` (Google) | Same heavy, geometric, all-caps display character; free. |
| `Play` / `Inter` (body) | `Inter` (Google) | Already FACEIT's body font on web. |
| Mono (system) | `JetBrains Mono` (Google) | Game-friendly tabular mono for stats. |

🚩 **If you have access to FACEIT-style proprietary display fonts, drop them into `fonts/` and update `--font-display` in `colors_and_type.css`.**

---

## ICONOGRAPHY

**Approach.** Solid-fill or single-stroke geometric icons at 16px / 20px / 24px. No 3D, no skeuomorphism, no emoji in chrome. Icons are monochrome (`--fg-2` resting, `--fg-1` hover/active) — never multicolor. The only exception is the **level badge** which uses the tier color from the `--lvl-N` ramp.

**Source.** No proprietary icon set was provided, so this kit uses **Lucide** via CDN (`https://unpkg.com/lucide@latest`) — clean, geometric, free, matches FACEIT's stroke style well. 🚩 If you have FACEIT's actual icon SVGs, drop them into `assets/icons/` and prefer those.

**Brand-specific glyphs** (drawn into `assets/`):
- `logo-mark.svg` — hexagonal shield with diagonal slash. The slash is the "cheat" cut.
- `logo-wordmark.svg` / `-mono.svg` — wordmark with mark.
- `level-badges.css` — pure-CSS hexagonal level badges, levels 1–10, sized sm/md/lg/xl.

**Cheat-brand chips.** Cheat options (NIXWARE, FATALITY, XONE, NEVERLOSE, MIDNIGHT, MEMESENSE, etc) render as text wordmarks in monospace caps inside hairline-bordered chips — **not** with logos, since these are real third-party brands and recreating their marks would be unauthorized.

**Emoji.** Never in chrome. Allowed only in user-generated chat content.

**Unicode glyphs.** Used sparingly: `›` for breadcrumbs, `•` for separators, `↗` for external links.

---

## At-a-glance token reference

```
COLOR
  surface     bg-0 #0D0D0F → bg-4 #3A3A40
  text        fg-1 #FFF → fg-4 #5A5A62
  brand       orange-500 #FF5500
  semantic    success #32D74B / danger #FF453A / warning #FFD60A / info #0A84FF
  level ramp  grey → green → yellow → orange → red (10 tiers)

TYPE
  display     Russo One, uppercase, tight tracking
  body        Inter 14/1.4
  mono        JetBrains Mono, tabular nums

RADII
  sm 4 / md 6 / lg 8 / pill 999

SHADOWS
  sm/md/lg + brand orange glow (queueing only)

MOTION
  180ms ease-out default; no bounces
```
