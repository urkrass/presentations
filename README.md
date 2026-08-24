# Science presentations

A single Grade 7–11 presentation site with a grade-first menu and three complete Slidev decks.

## Routes

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

Run the visual laboratory on its own at `http://localhost:3060`:

```bash
npm run dev:experiments
```

## Validate and build

```bash
npm run validate:deck-style
npm run build
npm run validate:site
npm run validate:experiments
npm run export:experiments
```

The combined build compiles all three production decks and the isolated experiment deck into `dist/`, then adds the root grade menu. The experiment route is direct-access only and is not shown to students on the menu.

## Design

The menu follows the decks’ warm-paper editorial system: one grade choice, one visible presentation, generous typography, restrained color, and no dashboard-style chrome.
