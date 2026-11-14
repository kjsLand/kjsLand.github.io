# Portfolio Redesign Plan

**Concept: "Interference."** Kevin's research (Decoded Quantum *Interferometry*, Quantum Amplitude
Estimation) is about waves adding up. The site borrows that idea: a dark "ink" canvas, a live
wave-interference dot field in the hero that reacts to the cursor, and a violet→cyan accent gradient
used sparingly. Everything else stays calm so the content reads first.

Ground rules (from the research below):

- **Two or three signature effects, not twenty.** The signature effects are the interference field,
  scroll-linked parallax, and spotlight cards. Everything else is a subtle reveal.
- **Animate only `transform`, `opacity`, and `filter`.** These are compositor-friendly, so they stay smooth.
- **Respect `prefers-reduced-motion`.** Under it, every effect collapses to a static, fully readable page.
- **Use progressive enhancement.** CSS scroll-driven animations (`animation-timeline: view()`) run
  only inside `@supports`, and browsers without them still get a complete page.
- **Avoid animation libraries.** Effects use about 100 lines of native CSS and small client components,
  so the bundle stays small and there's nothing to keep up to date.

---

## Global

| Element | Before | Plan |
|---|---|---|
| Design tokens | Mixed light and dark colors, leftover create-next-app CSS, Tailwind v3 directives in a v4 project | One token set in `@theme` (ink, surface, line, fg, muted, violet, cyan) in `globals.css`. Remove the unused `tailwind_config.ts`. |
| Typography | Inter, plus an Arial override in the body | Boxy, squared-off type: **Chakra Petch** for UI and body text, **Oxanium** for display headings and the gold accent word in each heading, and **JetBrains Mono** for labels and dates (a developer feel). |
| Background | Flat black | Fixed aurora blobs (blurred radial gradients) that drift slowly and move with scroll parallax, a masked dot grid, and a film-grain overlay (an SVG `feTurbulence` noise tile). |
| Scroll progress | None | A 2px gradient bar at the top, driven by one rAF scroll listener. That listener also publishes `--scroll-y` for the CSS parallax. |
| Reveals | None | A `<Reveal>` component that uses `IntersectionObserver` for a fade, rise, and un-blur, with stagger delays. A `<noscript>` fallback keeps content visible without JavaScript. |
| ⌘K palette | None | A command palette (⌘K, Ctrl+K, or the navbar button). It jumps to sections, projects, papers, and links, and is built from the content files automatically. |

## Navbar

- **Before:** a full-width bar with a hard-coded link list.
- **Plan:** a floating glass pill (`backdrop-filter`). It hides on scroll down, shows on scroll up,
  and uses a scroll-spy to highlight the active section with a sliding indicator. It includes a ⌘K
  button and a hamburger menu on mobile. Links are generated from the section registry.

## Hero

- **Before:** a centered title, emoji, and four blue stat squares with hard-coded numbers.
- **Plan:**
  1. **Interference field:** a canvas grid of dots whose size and color come from two wave sources.
     One source follows the cursor. It pauses offscreen and draws a single static frame under reduced motion.
  2. **Split-text name reveal:** letters rise in with a staggered delay. This is CSS only.
  3. **Typewriter role cycler:** cycles "Software Engineer → Full-Stack Developer → Quantum Researcher".
  4. **Magnetic CTA buttons** and social links.
  5. **Stats that count up when visible.** Numbers are **derived from the content arrays**, so they
     never go stale.
  6. **Scroll-away parallax:** hero content drifts and fades as you scroll, and a scroll cue sits at the bottom.

## Skills marquee (new)

- An infinite, edge-masked marquee of every skill between the hero and Work. It pauses on hover.

## Work Experience

- **Before:** fixed-size 440×420 cards in a horizontal scroller, with bullets stored as a single string.
- **Plan:** a **vertical timeline** whose line fills with the accent gradient as you scroll
  (scroll-linked). Each entry is a spotlight card with the date range, an auto-computed duration
  ("8 mos"), role, company, bullet highlights (now an array), and tech chips. Entries reveal with a stagger.

## Education

- **Before:** white cards on a dark page, a fixed-width SVG chart, and a wrong M.S. date range.
- **Plan:** two dark spotlight cards side by side. Each has a **responsive GPA chart** with a
  gradient area fill, a line that *draws itself* when scrolled into view, and hover tooltips. A
  headline shows the "avg. term GPA". The date range is derived from the first and last term when not
  set. The M.S. focus areas appear as chips, and the honors (Dean's List, magna cum laude) appear as badges.

## Projects

- **Before:** a horizontal scroller with flat gradient blocks.
- **Plan:** a **bento grid** where featured projects take wider tiles. Spans are computed
  automatically so every row is full, however many projects you add. Each tile has:
  - a **generative cover** (hue-based mesh gradient, dot pattern, and kind label) with **in-card parallax**
    tied to scroll (`animation-timeline: view()`). An optional `image` field swaps in a real screenshot.
  - a spotlight hover glow, tech chips, and Repo/Live buttons. Private repos show a lock instead of a dead link.

## Papers

- **Before:** white cards and placeholder `xxxx` links.
- **Plan:** publication-style entries with a large display-face year, status and venue pills, and authors
  listed with Kevin highlighted. A "Lead author" badge is derived from author order. Each entry
  includes an abstract and tags. Links render only when a real URL exists.

## Skills

- **Before:** three hand-written blocks, with `<text>` elements used outside SVG.
- **Plan:** a data-driven card per group, with brand icons (`react-icons/si`) and a generic fallback.
  Adding a skill is one string.

## Contact

- **Before:** a "Link Tree" list.
- **Plan:** a large closing CTA ("Let's build something *meaningful*.") with an animated gradient
  border, a **copy-email button** with feedback, and a 2×2 grid of link cards.

## Footer

- Copyright, a "built with" note, a ⌘K hint, and a back-to-top link.

---

## Maintainability

All content now lives in `/content`. Each file is typed and starts with a copy-paste template.
Section order and nav labels live in `app/sections/index.ts`. See `README.md` → *Updating the site*.

## Research sources

- MDN: [Scroll-driven animation timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines),
  [`view()`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view)
- Chrome for Developers: [Scroll entry/exit effects](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/scroll-entry-exit-effects) (`@supports` gating)
- WebKit: [A guide to scroll-driven animations with just CSS](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/)
- Codrops: [Practical intro to scroll-driven animations](https://tympanus.net/codrops/2024/01/17/a-practical-introduction-to-scroll-driven-animations-with-css-scroll-and-view),
  [SVG `feTurbulence` textures](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/)
- Josh W. Comeau: [Scroll-driven animations](https://joshwcomeau.com/animation/scroll-driven-animations)
- web.dev: [Accessibility: Animation and motion](https://web.dev/learn/accessibility/motion)
- Frontend Masters: [CSS spotlight effect](https://frontendmasters.com/blog/css-spotlight-effect/)
- [brittanychiang.com](https://brittanychiang.com/): the reference for a content-first dev portfolio (dark, scroll-spy nav, subtle hover)
- SaaSFrame: [Designing bento grids that actually work](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide) (keep reading order, collapse to one column on mobile)
