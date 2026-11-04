# Orchard Kitchen — whole-ingredient pickup site (demo)

Next.js 16 + Tailwind v4 + GSAP. Run it with `npm run dev` and open http://localhost:3000.

## Design notes

**Direction:** a market-sticker poster look — giant condensed black caps with a brush-script
signature overlapping the foot of the word, dog-eared cards, ticket cards with side notches,
rotating scalloped stamps, and rounded pill buttons.

**Palette (Orchard Kitchen brand, from the logo and Instagram):**

| Token | Hex | Use |
| --- | --- | --- |
| `cream` | `#FEF6DE` | page ground (with a faint grid, `.paper-grid`) |
| `forest` | `#D94F3A` | brand coral: headings, coloured bands, step cards |
| `forest-deep` / `ink` | `#2A1A14` | logo-tree brown: text, hero scrim, footer |
| `lime` | `#FFD66B` | butter action colour: buttons, stickers, strips |
| `orange` | `#EE8A2B` | autumn orange: script signatures, stamps |

Token names (`forest`, `lime`) are kept from the first pass so classes stay stable; only the
values in `src/app/globals.css` changed. Swap them there to re-theme everything.

**Type:** Archivo (variable, `wdth` axis). `.wide` = wdth 62 / 900 for giant words,
`.wide-medium` for smaller headings, `.font-display` for card titles. Kaushan Script for the
`.font-script` signatures. The dashboard scopes a tighter, non-uppercase cut (`.dash`).

**Buttons:** `.btn` + `.btn-lime | .btn-forest | .btn-ghost | .btn-ghost-light`, optional
`.btn-sm`; wrap the label in `.roll` (two spans) for the rolling hover.

## Motion (GSAP + ScrollTrigger + SplitText, Lenis smooth scroll)

- **Preloader** (`src/components/Preloader.tsx`, home only, once per session): a coral cover
  with "UNPROCESSED" cut out of it; the letters fill with the hero photo bottom-up while a
  counter runs 000→100, then the camera dives through the stem of the "P" and the photo becomes
  the hero. Replay with `sessionStorage.clear()` and a reload.
- Hero word rises letter by letter, script wipes in, stamp spins in; scroll pushes the photo in.
- Section titles (`BigTitle`) split-reveal on scroll; how-it-works photo opens from a window;
  mission principles are stacking sticky cards; statement words light up as you scroll;
  footer wordmark rises.
- Everything sits inside `gsap.matchMedia()`; `prefers-reduced-motion: reduce` just shows content.

## Photos

All food photography is **placeholder stock from Unsplash** (credited in the footer):

- per-dish photos: `visual.imageSrc` on each item in `src/data/mockData.ts`
- hero and section photos: `SITE_PHOTOS` in the same file

To use Orchard Kitchen's own photos, drop files into `public/images/` and point those
paths at them (e.g. `'/images/lomo-saltado.jpg'`).
