# Empirical formula — Grade 8

Two 45-minute lessons, 30 slides. Lesson 1 starts at slide 1; lesson 2 at slide 16.

Lesson 1 develops formula reading, simplest ratios, molecular versus empirical formulas, fixed composition, and the mass-to-mole translation. Lesson 2 uses magnesium-oxide mass-gain evidence, critiques experimental data, introduces percentages and half-integer ratios, and ends with independent transfer.

Bring calculators, paper and a periodic table. This is a data-based lesson, not an instruction sheet for a student flame practical. A live demonstration requires local risk assessment and a qualified teacher. Notes include timing, questions, solutions, likely misconceptions, differentiation and source URLs. All numerical experimental datasets are explicitly designed teaching data.

Rounded atomic molar masses used here (g mol⁻¹): H 1, C 12, N 14, O 16, Na 23, Mg 24, Cl 35.5, Fe 56, Cu 64. Do not silently substitute a different table mid-example.

## Interaction and design

- The existing warm-paper typography, image-led act break, CSS 3D cards, independent blurred disclosures and anchored quiz explanations are reused, not reimplemented.
- RatioReducer changes only ratio notation; the actual molecular formula remains visible.
- EmpiricalWorkbench has native sample/size selectors and reversible calculation steps. Its small curated dataset is not a general-purpose formula inference engine.
- Print output includes stable complete workbench/reducer arguments and readable explanations. Motion respects the inherited reduced-motion preference.
- No decorative horizontal rules, invented scientific geometry or AI-generated imagery. Photograph originals are unchanged; their on-slide crops are identified in public credits and notes.

## Commands

Run from repository root:

```sh
npm run build:empirical
npm run validate:empirical
npm run dev:empirical
```

Local route: http://127.0.0.1:3091/grade-8/empirical-formula/1

The combined site build includes this deck under Grade 8. GitHub Pages subpath and deep-link recovery use the existing site pipeline. Creating this deck does not itself publish it.

Credits and scientific sources are also shipped at `image-credits.html`. Build/browser validation extends the repository's existing scripts and static-site helper. Screenshots and print PDF are written outside the repository, normally to the OS temporary directory.
