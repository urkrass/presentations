# The mole and its history

IB DP Year 1 chemistry, English, **two 45-minute lessons**. A separate deck at `/ib-dp/mole-history/`, listed under IB DP on the shared site. The old `/grade-8/mole-history/` links redirect here, preserving slide numbers and query state. The existing Grade 8 stoichiometry deck is unchanged.

Audience: beginning DP chemistry. The five practice moments check prior fluency with units and entity counting; the history, dimensional reasoning, exact definitions versus measured quantities, and NOS prompts develop the DP-level argument. Preserve the accessible opening rather than assuming all students already understand amount of substance.

Core argument: chemists could weigh reproducible batches before they could count atoms. The historic mole connected relative particle masses to gram-scale masses. The exact modern count preserves that bridge.

## Teaching route

| Lesson 1: the count came later | Slides | Minutes |
| --- | --- | ---: |
| Counting problem and counting units | 1–2 | 6 |
| Mass evidence, Dalton, units exercise | 3–5 | 10 |
| Avogadro and gas-count exercise | 6–7 | 7 |
| Cannizzaro, gram-molecule, batch-ratio exercise | 8–10 | 9 |
| Estimates, independent evidence | 11–12 | 5 |
| Washer investigation and retrieval | 13–14 | 8 |
| **Total** | **1–14** | **45** |

| Lesson 2: the scale factor | Slides | Minutes |
| --- | --- | ---: |
| Pivot, u-to-gram scale, historical carbon-12 calculation | 15–17 | 10 |
| Micro/macro mapping and molar-mass exercise | 18–19 | 7 |
| Why not 10²⁴? Old/new SI definition | 20–21 | 7 |
| Silicon sphere and measurement versus definition | 22–23 | 5 |
| Worked water example and entity-count exercise | 24–25 | 9 |
| CO₂ transfer, exit ticket, synthesis | 26–28 | 7 |
| **Total** | **15–28** | **45** |

The five mandatory practice moments are slides **5, 7, 10, 19 and 25**. Slides 13, 14, 26 and 27 add investigation/transfer/retrieval. The previously optional round-number and silicon-sphere topics are included in the main two-lesson route. All 28 slides have timed presenter notes, prompts and solutions.

Preparation: calculators and paper. Slide 13 works as a paper investigation with explicitly constructed data. Optionally prepare ten identical washers, another batch, a balance and a tared container; replace the example readings with actual measured values. No chemical experiment is required.

## Controls and visual language

- Slidev arrows/Space own lecture sequencing. Slides 8, 16, 17 and 18 have two reveals; slide 24 has one. Backward navigation and direct `?clicks=2` routes work.
- Flip-card buttons: Enter/Space or click. Genuine CSS 3D, lower-right +/×, no front/back labels. In print, claim and explanation are both shown.
- Green evidence fields: click the heading/+ or use Enter. Independent answers reveal without moving the layout. Blur changes meaning, not page geometry.
- The particle field on slide 2 resolves into an exact count when activated. The drawing is symbolic, not literally a mole.
- Slide 11 has previous/next controls. D3 calculates the numerical vertical scale. Years are ordered categories, **not** proportional time spacing. Einstein is a measurement route, not an invented numerical point. No connecting trend line or fabricated error bars.
- Quizzes directly reuse the established IB `QuickCheck.vue`, wrapped with larger copy, fixed geometry and print answers. No changes to the original component or other decks.
- Warm paper, Georgia headings, desaturated rust/green/blue, purposeful rounded fields. No decorative rules, line animations, added animation library, ambient motion or generated scientific geometry.
- System reduced-motion preference is respected. No continuous simulation or off-slide loops exist in this deck.

## Scientific guardrails

- Avogadro proposed the 1811 gas-volume hypothesis; he did **not** measure the named number.
- Dalton's displayed 1, 12, 16 values are explicitly modern rounded illustrations, not his original table. Token sizes do not represent atomic radii or quantitative mass areas.
- The historical carbon-12 definition is visibly labelled before 2019. Since 2019, `N_A = 6.022 140 76 × 10²³ mol⁻¹` is exact. Avogadro number is the numerical value; constant includes mol⁻¹.
- The u-to-g/mol correspondence is extraordinarily close but no longer exact by definition. Water and CO₂ values are natural-isotope average molecular masses; carbon-12 is the specified isotope.
- Rounded atomic masses explain the magnitude and convenient size, not every digit of the exact chosen value. The 2019 value preserves continuity with prior measurement.
- The 9.0 g water example reports 0.50 mol and 3.0 × 10²³ molecules, while retaining the calculator intermediate separately. The exact constant does not erase sample uncertainty.
- The 2 g + 16 g = 18 g display is explicitly a mass ledger, not an unbalanced chemical equation.

## Sources and image credits

URLs are in presenter notes, not in visible slide copy. Core sources:

- BIPM, [History of the mole](https://www.bipm.org/en/history-si/mole).
- BIPM, [26th CGPM Resolution 1 (2018)](https://www.bipm.org/en/committees/cg/cgpm/26-2018/resolution-1), effective 20 May 2019.
- Roberto Marquardt, *The mole and IUPAC: a brief history*, Chemistry International July 2019, print p. 50 onward, [IUPAC issue PDF](https://iupac.org/wp-content/uploads/sites/4/2020/01/Chem-Int-JULY_2019-IYPT.pdf).
- Science History Institute, [Lavoisier](https://www.sciencehistory.org/education/scientific-biographies/antoine-laurent-lavoisier/), [Cannizzaro](https://www.sciencehistory.org/education/scientific-biographies/stanislao-cannizzaro/), [Setting the Table](https://www.sciencehistory.org/stories/magazine/setting-the-table/).
- NIST, [Silicon spheres and the International Avogadro Project](https://www.nist.gov/si-redefinition/kilogram/kilogram-silicon-spheres-and-international-avogadro-project), and [2015 measurement](https://www.nist.gov/publications/improved-result-measurement-avogadro-constant-28si-crystal).

Local assets in `public/images/`:

- `lavoisier.jpg`: reused original Grade 8 asset; Jacques-Louis David, public-domain painting. Source page in slide 3 notes.
- `avogadro.jpg`: reused original Grade 8 public-domain portrait; source page in slide 6 notes.
- `dalton.jpg`: Thomas Phillips, 1835, public-domain painting, National Portrait Gallery, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:John_Dalton_by_Thomas_Phillips,_1835.jpg).
- `silicon-sphere.png`: NIST photograph; source page above and direct image URL in slide 22 notes. NIST-authored work, public domain in the United States; see [NIST copyright policy](https://www.nist.gov/copyrights-disclaimers).
- `analytical-balance.jpg`: Sarcyn, *Detail of antique analytical balance*, 26 June 2009, [Wikimedia Commons source](https://commons.wikimedia.org/wiki/File:Analyticalbalance2.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The original photograph is reproduced without alteration, scaled by the browser. It is not attributed to Lavoisier and does not show the lesson's hypothetical 18 g water sample.

No AI-generated image assets are used in this deck. The former generated cover has been removed from the source and published build; it remains recoverable in Git history. The replacement is used on slides 1 and 28 and the IB DP menu entry. [Published image credits](public/image-credits.html) are linked from both slides and the menu, so attribution is available without opening presenter notes. All source and licence pages were checked on 8 September 2026.

## Build and validation

```sh
npm run build:mole
npm run validate:mole
npm run dev:mole
```

Local preview: `http://127.0.0.1:3090/ib-dp/mole-history/1`; Lesson 2 starts at `/15`.

The browser validator extends the repository's `startStaticSite` + Playwright approach. It checks all 28 slides at 1366×768 and 1920×1080, initial/open layouts, missing images, raw math, keyboard flips, quiz explanations/layout stability, blur state, lecture steps forward/back/direct/refresh, reduced motion, console/page errors and all print states. Screenshots and a 28-page raster teacher-answer PDF are generated **outside the repository** under the OS temp directory, overridable with `MOLE_SCREENSHOTS`. The PDF is a review aid, not an accessible substitute for Slidev's MathML content.

Browser plugin availability: absent in this session; regular Playwright used. Validation follows the frontend-testing skill. The native production build omits `/print` unless auto PDF download is enabled, so the validator follows the existing `export-experiments.mjs` final-state screenshot export pattern instead. No browser dependency or PDF generation added to the production build.

On this Windows host, npm's child shell may not resolve Node even with PATH prepended. Equivalent qualified commands:

```powershell
& 'C:/Program Files/nodejs/node.exe' scripts/build-mole.mjs
& 'C:/Program Files/nodejs/node.exe' node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p decks/ib-dp-mole-history/tsconfig.json
& 'C:/Program Files/nodejs/node.exe' scripts/validate-mole.mjs
$env:MOLE_SKIP_BUILD='1'
& 'C:/Program Files/nodejs/node.exe' scripts/validate-mole-browser.mjs
& 'C:/Program Files/nodejs/node.exe' scripts/serve-mole.mjs
```

For the complete site: `npm run build` then `npm run validate:site`. The existing GitHub Pages workflow builds with `SITE_BASE=/presentations`; the new route is registered in the build, landing menu, 404 route recovery, local server and Vercel config. No existing production deck is redesigned by this addition.

Implementation note: this deck uses standard Slidev Markdown (`mdc:false`). Inline math within HTML compositions goes through a small KaTeX/MathML component; display calculations use native Slidev KaTeX. This avoids the installed MDC renderer's async-inline rule error without changing repository dependencies.
