---
name: nav-component
description: The shared nav.js navigation — structure, design, how to edit it
metadata:
  type: project
---

Site navigation is ONE shared file: `nav.js` (a plain `<script src>`, NOT a `.dc` component). Both pages load `<script src="./nav.js" defer>` and contain an empty shell `<nav class="agn-nav" data-agn-nav aria-label="Primary"></nav>`; nav.js self-mounts into it (a MutationObserver catches the shell even after the dc-runtime renders it). Edit `nav.js` once → applies to every page. See [[azarian-site-architecture]].

WHY a plain script and not `<dc-import>`: the site is opened straight from disk (`file://`), where browsers BLOCK `fetch()` of sibling files — so a fetched `.dc` nav never loads (blank nav), while the rest of the inline page renders. Classic `<script src>` loads under both `file://` and `http://`. (An earlier `Nav.dc.html` + `<dc-import>` approach was abandoned for this reason; also note self-closing `<dc-import .../>` silently swallows all following page content — always use an explicit closing tag if ever reintroducing dc-import.) NOTE: the dc-runtime still pulls React+Babel from unpkg, so rendering the .dc.html pages needs network regardless.

Top bar (Figma 22540-5763): drop-downs **How We Help / Who We Help / Who We Are / Learn** (chevron triggers) + plain links **Growth OS**, **About Us**. No desktop "Menu" button. Liquid-glass look kept (`.agn-nav` / `.agn-nav.is-scrolled`).

Content comes from the `NAV` **tree** at the top of nav.js — single source for desktop AND the mobile drawer (recursive accordion < 960px). Node = string leaf | `['Label','href']` | `{label, href?, children?[]}`. Edit `NAV` only.

DESKTOP DROP-DOWN = a VERTICAL top-to-bottom cascade (Figma 22549-7737), opens directly BELOW the trigger and grows downward:
- **Level 1 = icon tiles** (`.agn-tile`, icon + label). Every L1 item gets an icon (map in `ICONS`, keyed by label; generic fallback). Active tile = teal border/text/icon.
- **Level 2 = tabs** (`.agn-tab`, horizontal row). Only shown when a tile has a 3rd level. Branch tabs have a chevron; leaf tabs don't (no artificial level added). Hovering a tab focuses it (teal) and DIMS the others (`opacity:.5`).
- **Level 3 = links** (`.agn-link3`) in sections (`.agn-sec`) of MAX 5 each; a new section starts beside the previous, and `.agn-linkwrap` wraps so everything stays visible. A 2-level tile (children all leaves) skips tabs and shows links directly under the tiles.
THEME ADAPTATION (bar readability): the bar auto-switches between a dark theme (light text, for dark sections behind it) and `.theme-light` (dark text + light frosted bar, for light/white sections) so its contents are always readable. `detectTheme()` samples the background luminance under the bar via `document.elementFromPoint` at 3 x-positions (temporarily setting `nav.pointer-events:none`), walking up to the first element with a real background color or gradient (`elemLum` parses gradient colour stops); >0.55 luminance → light theme. Runs rAF-throttled on scroll + on resize + a few delayed passes after mount. All bar colors are CSS variables set by `.agn-nav` (dark defaults) / `.agn-nav.theme-light`; the logo SVG is INLINED so its white "A" mark (`.agn-logo-fg`) recolors to navy on light. Raster/photo backgrounds are undetectable (keeps current theme). The dropdown box is opaque so it's always readable and is NOT themed.

Glass (dropdown box) is near-opaque (`rgb(11,27,56)` + blur) so content behind is unreadable. Menu closes 350ms after pointer leaves the nav (`CLOSE_DELAY`; `scheduleClose`/`cancelClose` on nav pointerenter/leave). Reveal uses a CSS `@keyframes agnReveal` (auto-plays on insertion — do NOT switch back to a JS `requestAnimationFrame` class toggle; that left content invisible under headless and is fragile).

`layout()` measures the active panel (`position:absolute`, `width:max-content`; `.agn-tiles` MUST stay `flex-wrap:nowrap` or the panel width collapses to 0 inside the clipped box) and sizes/positions the spring box below the trigger, clamped on-screen; it retries on the next frame if it measures 0 (pre-layout race).

Verify with headless Chrome SCREENSHOTS (not --dump-dom; dump doesn't paint so offsetWidth reads 0). A throwaway static page that includes nav.js + the shell and dispatches real `pointerenter` events on `.agn-trigger`/`.agn-tile`/`.agn-tab` (indexed) is the reliable way to capture open states; the dc-runtime pages race under headless virtual-time.
