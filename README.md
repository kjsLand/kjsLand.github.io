# kjsLand.github.io

Personal portfolio for Kevin Land, built with Next.js 16 (static export), Tailwind CSS v4, and TypeScript.
It deploys to GitHub Pages on every push to `main`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

---

## Updating the site

**All content lives in [`/content`](content).** You almost never need to touch a component.
Every file has a copy-paste template at the top.

| I want to… | Edit | Notes |
|---|---|---|
| Add a job | [`content/experience.ts`](content/experience.ts) | Newest first. `end: "Present"` works, and the duration ("1 yr 2 mos") is computed for you. |
| Add a project | [`content/projects.ts`](content/projects.ts) | Projects fill the home page grid in file order. `hue` (0–360) colors the generated cover. To use a screenshot, put it in `public/projects/` and set `image: "/projects/name.png"`. |
| Publish a paper link | [`content/papers.ts`](content/papers.ts) | Add `links: { paper, pdf, code }`. Buttons only appear for links that exist. |
| Make a private repo public | [`content/projects.ts`](content/projects.ts) | Remove `private: true`. |
| Add a degree / term GPA | [`content/education.ts`](content/education.ts) | Each term becomes a point on the chart. |
| Add a skill | [`content/skills.ts`](content/skills.ts) | Not shown on the site right now (the Skills section and marquee are off the home page). For a brand icon, add it to [`SkillIcon.tsx`](app/components/ui/SkillIcon.tsx). |
| Change name, roles, tagline, or links | [`content/site.ts`](content/site.ts) | `roles` feeds the hero typewriter. `socials` are shown once on the home page, in the hero. Set `availability` to show a green "open to work" pill, and `resumeUrl` to show a Résumé button. |
| Add, remove, or reorder a section | [`app/sections/index.ts`](app/sections/index.ts) | Updates the page order, the navbar, the ⌘K palette, and the 01/02/03 numbering. |

The hero stats (work experiences, projects, degrees, papers) are **counted from these files**, so they never go stale.

### Adding a brand-new section

1. Copy [`app/sections/Skills.tsx`](app/sections/Skills.tsx) to e.g. `app/sections/Talks.tsx`.
   Wrap the content in `<Section id="talks" eyebrow="Talks" title="Things I've" accent="said">`.
2. Optionally create `content/talks.ts` for its data.
3. Register it in [`app/sections/index.ts`](app/sections/index.ts).

### Reusable building blocks (`app/components/ui`)

- `Section`: section shell with an eyebrow, a heading with a serif accent word, and a drifting ghost title
- `Reveal`: fades and lifts its children in when scrolled into view (`delay` staggers them)
- `SpotlightCard`: card with a glow and border that follow the cursor
- `Tag`: mono chip (`tone="default" | "accent" | "mint"`)
- `MagneticLink`: button-link that leans toward the cursor
- `CountUp`, `Typewriter`, `SplitText`: hero text effects

### Theme

Colors, fonts, and animations are tokens at the top of [`app/globals.css`](app/globals.css) (`@theme`).
Change `--color-violet` and `--color-cyan` to re-skin the whole site.

### Motion and accessibility

Every effect respects `prefers-reduced-motion`. With reduced motion on, the page is static and fully readable.
CSS scroll-driven animations (`animation-timeline: view()`) are progressive enhancements, so browsers without them still get a complete page.
See [`docs/REDESIGN_PLAN.md`](docs/REDESIGN_PLAN.md) for the design rationale and research sources.
