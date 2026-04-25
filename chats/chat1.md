# Cheat marketplace UI

_Started 2026-04-18 04:58 UTC_

---

## User



## Assistant

I'll start by exploring what we have to work with, then ask some clarifying questions before building the design system.

_[tool: list_files]_

_[tool: update_todos]_

Empty project — and the brief is "FACEIT for cheaters, looks like FACEIT, named CHEATIT." Before I build, I need to understand the tone and scope. Let me ask.

_[tool: questions_v2]_

## User

Questions answered:
- color_direction: 0
- concept_tone: Plays it 100% straight — looks identical to FACEIT, just rebranded as CHEATIT
- language: Both (RU primary, EN fallback)
- game_focus: CS2 / Counter-Strike (FACEIT's main game)
- level_system: сделай прям как там
- logo_treatment: Mark + wordmark — small icon (skull, crosshair, mask) next to wordmark
- extras: сделай выбор читов типа ну там популярные по типу NIXWARE FATALITY XONE NEVERLOSE MIDNIGHT MEMESENSE и так далее в основном лучше HvH читы напшии что важно для подроба а также что в случае выявления другого чита могут применяться санкции
- products: Web app — Profile / dashboard (Elo, level, stats — like FACEIT profile), ну сделай прям все как на фейсит и турниры тоже добавь

## Assistant

Got it. Building a straight FACEIT-style design system rebranded as CHEATIT — dark UI, orange accent, 10-level system, RU primary copy, with HvH cheat catalog and tournaments. Let me start.

_[tool: set_project_title]_

_[tool: update_todos]_

Now let me set up the foundation — fonts, colors, and the core structure. FACEIT uses a custom font but I'll match with similar Google Fonts.

_[tool: write_file]_

Now I'll create a logo SVG, key icon assets, and the README. Let me start in parallel.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

Now the FACEIT-style level badges (10 tiers). These are core to the brand.

_[tool: write_file]_

_[tool: write_file]_

Now let me build the preview cards. I'll create a base shared CSS for the cards, then build them in batches.

_[tool: write_file]_

_[tool: snip]_

Now I'll create all the preview cards in batches. Let me start with colors, type, and brand.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

## Assistant

_[tool: snip]_

_[tool: write_file]_

## Assistant

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: register_assets]_

_[tool: snip]_

Now the UI kit. Let me build the React components for the web app.

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: snip]_

_[tool: get_webview_logs]_

_[tool: snip]_

_[tool: save_screenshot]_

_[tool: snip]_

_[tool: view_image]_

_[tool: snip]_

_[tool: register_assets]_

Now let me finish: SKILL.md, update README index, then call done.

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Готово. Дизайн-система CHEATIT собрана: токены, лого, 10 уровней, 21 preview-карточка и UI-kit на 6 экранов (Login / Profile / Play / Tournaments / Leaderboard / Shop) с RU-копирайтом.

**Caveats:**
- Шрифт **Russo One** (Google) — заместитель FACEIT-овского proprietary `PlayFair`. Если есть оригинальные TTF — закинь в `fonts/`, я заменю переменную.
- Иконки — нарисованы вручную в Lucide-стиле (без CDN-зависимости). При желании подключу настоящий Lucide.
- Лого CHEATIT — мой набросок (шестиугольник со «слэшем»). Это первая итерация, не финальный знак.
- Бренды читов (NIXWARE, NEVERLOSE и т.д.) — только текстовые чипы, без копирования их реальных логотипов.

**Итерация — что от тебя:**
1. **Лого:** оставляем slashed-shield или хочешь череп / маску / прицел вместо? Покажу 3 варианта.
2. **Зелёно-оранжевая палитра:** оранжевый `#FF5500` 1-в-1 с FACEIT — оставить или сдвинуть в более «тёмный/кислотный» оттенок, чтобы отличаться?
3. **Каких экранов не хватает?** Match-summary (после матча), team page, hub-страница, чат, настройки профиля — могу добавить.
4. Хочешь, чтобы я добавил **анимированную очередь** (пульс на PLAY, бегущая полоса поиска) на Play-экране?

## User

Regenerate "Cheat-brand chips": не очень выбор надо сделать как карточки типа

## Assistant

_[tool: snip]_

_[tool: write_file]_

_[tool: register_assets]_

_[tool: show_to_user]_

_[tool: snip]_

Переделал «Выбор софта» в карточки: иконка + название + тир (HVH · TIER S/A/B) + цена. Состояния: default, selected (оранжевая подсветка + ✓), top (ленточка TOP), disabled.

## User

Regenerate "Cheat-brand chips": у нас не продажа чита у нас просто выбор чита

## Assistant

_[tool: snip]_

_[tool: write_file]_

_[tool: register_assets]_

_[tool: show_to_user]_

_[tool: snip]_

Убрал упоминания цены и тиров — теперь это просто выбор софта перед матчем: иконка + название + статус (HVH / ЗАЯВЛЕН / НЕ УСТАНОВЛЕН). Состояния: default, hover, selected, disabled.

## User

Regenerate "Web UI kit — CHEATIT app": убери магазин читов а также сделай карточку бана как она будет выглядеть ну как на фейсите желательно

## Assistant

_[tool: snip]_

_[tool: read_file]_

I need to remove the Shop screen and add a Ban card. Let me first remove the shop references, then create a Ban screen.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: delete_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: show_to_user]_

_[tool: snip]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: snip]_

I see "МАГАЗИН" is still showing in the topbar — need to fix that too.

_[tool: snip]_

_[tool: read_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: show_to_user]_

_[tool: snip]_

Готово. Магазин убран отовсюду (и из топбара, и из нав-рейла), на его место — экран **БАН** в стиле FACEIT: красный градиент сверху, череп в красной рамке, mono-блок с обнаруженным расхождением (запущен ≠ заявлен), сетка мета (выдан / срок / потеряно ELO), список заблокированного и кнопка апелляции.

## User

Regenerate "Web UI kit — CHEATIT app": я про профиль убери эту штуку ты просто когда матч запускаешь ток тогда будет ошибка если бан будет

## Assistant

_[tool: snip]_

_[tool: grep]_

_[tool: snip]_

_[tool: read_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: show_to_user]_

_[tool: snip]_

Убрал карточку «Заявленный софт» из профиля — теперь дисклеймер про санкции появляется только при запуске матча на экране Play.

