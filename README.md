# Science presentations

A single Grade 7–11 presentation site with a grade-first menu and three complete Slidev decks.

## Routes

- `/ib-dp/rate-expressions/` — **Rate expressions and experimental determination**: fillable Grade 11 Chemistry HL workbook, with all G1–G8 and P1–P5 tasks, equation/chemistry editors, drawing tools, local autosave and submission/backup downloads.
- `/` — grade menu
- `/grade-7/lab-measurement/` — **Safe first. Then trustworthy evidence.** (45 slides, two 45-minute lessons)
- `/grade-8/stoichiometry/` — **Particles, equations, and moles.** (33 slides, two 45-minute lessons)
- `/grade-11/integration-control/` — **Signals, coordination, and control.** (54 slides, three 45-minute lessons plus an investigation extension)
- `/experiments/visual-lab/` — isolated visual experimentation laboratory (review route; deliberately absent from the public grade menu)

The Grade 8 deck remains at the repository root. The Grade 7 and Grade 11 decks live under `decks/`; their source notes record the material used to develop them.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3030`.

Build and preview the visual laboratory on its own at `http://localhost:3060/experiments/visual-lab/`:

```bash
npm run dev:experiments
```

This command uses the validated static build route so it also works around Slidev/Vite's Windows conditional-style path issue in deeply nested workspaces.

The combined static build exposes the same deck at `http://localhost:3030/experiments/visual-lab/`. The experiment remains deliberately absent from the grade selector.

## Validate and build

```bash
npm run validate:deck-style
npm run build
npm run validate:site
npm run validate:experiments
npm run export:experiments
```

The combined build compiles all three production decks and the isolated experiment deck into `dist/`, then adds the root grade menu. The experiment route is direct-access only and is not shown to students on the menu.

## Visual laboratory notes

[Technical findings](decks/visual-lab/FINDINGS.md) records the 14 studies, browser checks, screenshots, bundle comparison, PDF behaviour and production recommendations. `npm run export:experiments` produces `output/visual-lab-with-clicks.pdf`; each deterministic click state becomes a separate page.

Experiment-only dependencies are GSAP 3 (its [standard no-charge license](https://gsap.com/standard-license/)), the ISC-licensed D3 array/scale/shape modules, MIT-licensed TresJS and Three.js, Apache-2.0 Playwright Chromium, and MIT-licensed pdf-lib. They are used only by the isolated deck or its validation/export tooling. The large TresJS/Three.js scene is dynamically imported and does not enter the Grade 7, 8 or 11 bundles.

## Interactive chemistry workbook

The self-contained static app is in `site/ib-dp/rate-expressions/`. The existing build copies it into the published site on both Vercel and GitHub Pages. All app resources use relative paths, including vendored KaTeX 0.18.7 with mhchem and the licensed IBM Plex Sans fonts; no third-party runtime CDN or student database is required.

Student answers remain in this browser's local storage. Each response retains text, equations, chemistry and drawings together. A JSON backup can be imported on another device. A self-contained HTML submission includes the questions, typed responses, MathML equations and inline SVG drawings; its print view uses separate landscape graph pages. Print / Save PDF opens the browser's print dialogue. The public app does not upload or publish student answers. Sending the worksheet link does not share a student's work: send the downloaded submission or PDF instead.

Preview only the workbook with `python3 -m http.server 8765 --directory site` and open `/ib-dp/rate-expressions/`. Run `node --test scripts/rate-workbook.test.mjs` for backup validation and preservation checks. No additional package installation or build step is needed for this app. The underlying content follows the 18 September 2026 student workbook; the separate teacher key is not included.

## Design

The menu follows the decks’ warm-paper editorial system: one grade choice, one visible presentation, generous typography, restrained color, and no dashboard-style chrome.
