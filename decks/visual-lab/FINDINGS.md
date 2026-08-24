# Visual experiments laboratory — technical findings

## Decision

After visual review, promote two techniques into a first production trial:

1. **The Canvas diffusion system** when a lesson genuinely depends on hundreds of simultaneous particles.
2. **The persistent scale scene** when students must retain organism-level context while moving toward cellular detail.

They were the strongest combinations of one dominant visual subject, purposeful interaction and restrained supporting text. Native Slidev remains the default for simpler sequences. The limited 3D study is visually successful but should remain specialist because of its bundle cost. GSAP and D3 remain useful technical proofs, but their production use should wait for a lesson whose causal objects or changing evidence cannot be taught as clearly with a quieter medium.

For scientific geometry, the selection order is now explicit: **sourced figure or domain-specific renderer first; general animation may focus or sequence it, but must not invent the figure.**

## What was tested

| Study | Communication job | Technique | Result |
| --- | --- | --- | --- |
| 01 | Follow a causal signal inside one continuous photograph | Native `v-motion` + `$clicks` | Reliable baseline; reverse navigation restores emphasis without replacing the scene |
| 02 | Replace a question with its answer in one anchored field | `VSwitch` + `v-click` | Reliable, compact and export-friendly |
| 03 | Audit backward restoration without a comparison grid | Native motion/CSS | One image and one verdict make the technical result legible |
| 04 | Balance a molecular equation and audit atom conservation | SmilesDrawer reaction renderer + staged reaction SMILES | Every click asks the domain renderer to redraw a meaningful equation candidate; no mechanism or geometry is invented |
| 05 | Distinguish rapid spinal response from later brain information | Sourced reflex anatomy + GSAP image focus | The source arrows remain unaltered; no authored line overlay is used |
| 06 | Decide when a temperature reading has settled | D3 scale/shape/array + Vue state | The graph is the dominant object; readout and controls share one baseline |
| 07 | Make retain/exclude anomaly judgement visible | D3 + reversible Vue controls | Summary and judgement change together without hiding data |
| 08 | See a concentration gradient change as a many-body system | Seeded Canvas, 1,000 particles | Smooth on the validation machine; deterministic reset |
| 09 | Stress the same explanation at 500–2,000 particles | Seeded Canvas + live FPS | 1,000 is the sensible classroom default; performance remains device-specific |
| 10 | Move organism → organ without losing location | Shared scale scene + sourced MRI | Direct navigation reconstructs the requested level around one anatomical image |
| 11 | Move tissue → cell while preserving context | Shared scale scene + sourced micrograph | Refresh and middle-slide entry are deterministic |
| 12 | Reach receptor scale without inventing a scientific figure | Shared scale scene + sourced images | Conceptual endpoint is honest; a real receptor micrograph would be needed for production |
| 13 | Compare linear, bent and tetrahedral geometry | Dynamically loaded TresJS/Three.js | Useful only when 3D geometry is the concept; fixed views plus keyboard-accessible rotation clarify the comparison |
| 14 | Compare value, cost, export and use | Annotated editorial sequence | Clear synthesis without a dashboard or comparison matrix |

## Reliability and lifecycle

- The shared GSAP helper creates one scoped `gsap.context`, builds a paused labelled timeline, maps the current Slidev click count to exact labels, handles decreasing counts, pauses on slide leave and kills both timeline and context on teardown.
- Native and GSAP sequences were exercised forwards and backwards. SmilesDrawer produces five distinct rendered balancing states, then reconstructs the opening candidate when the sequence reverses.
- The Canvas loop stops when its slide is inactive, restarts when active, and uses a seeded generator for the same reset state.
- The 3D scene is dynamically imported, renders on demand, observes Slidev activity and supplies a textual non-WebGL fallback.
- A persistent deck-level control stores reduced-motion preference. With motion disabled, click states jump to their destinations and no claim depends on movement alone.
- Direct navigation to all 14 studies passed. Overview and presenter routes rendered correctly. Middle-scale slides reconstruct from their `stage` prop rather than depending on a previous slide.

## Browser and classroom checks

Automated checks used Chromium at exactly **1366×768** and **1920×1080**. All 14 slides fit their 16:9 stage without layout overflow. Every slide retained the reduced-motion state. Browser checks also covered distinct and reversible SmilesDrawer reaction states, 3D molecule/view controls, overview and presenter mode, and failed on console or page errors.

The review screenshots are direct 1366×768 browser captures of each opening state. They preserve the deck motion control but omit surrounding browser chrome:

| 01–07 | 08–14 |
| --- | --- |
| [01 native pathway](findings/screenshots/study-01.jpg) | [08 Canvas, 1,000 particles](findings/screenshots/study-08.jpg) |
| [02 state replacement](findings/screenshots/study-02.jpg) | [09 Canvas, 2,000 particles](findings/screenshots/study-09.jpg) |
| [03 native verdict](findings/screenshots/study-03.jpg) | [10 organism → organ](findings/screenshots/study-10.jpg) |
| [04 reaction renderer](findings/screenshots/study-04.jpg) | [11 tissue → cell](findings/screenshots/study-11.jpg) |
| [05 reflex trace](findings/screenshots/study-05.jpg) | [12 receptor focus](findings/screenshots/study-12.jpg) |
| [06 temperature plateau](findings/screenshots/study-06.jpg) | [13 molecular geometry](findings/screenshots/study-13.jpg) |
| [07 anomaly decision](findings/screenshots/study-07.jpg) | [14 comparison](findings/screenshots/study-14.jpg) |

## Build and bundle observations

The native-only experimental scaffold built to 42 files / **792,449 B** total (**569,624 B JS**, **124,745 B CSS**). The revised 14-study route builds to 66 files / **3,234,829 B** total (**1,731,859 B JS**, **137,794 B CSS**, **1,361,236 B images**). The increase comes from the sourced reflex/MRI assets and the isolated chemistry renderer used to replace authored scientific geometry.

The deliberately isolated 3D chunk is **776,405 B raw / 202.24 kB gzip**. It is loaded only when the molecular-geometry study is requested. SmilesDrawer is isolated at **190,946 B raw / 56.32 kB gzip**; the GSAP-enabled reflex slide is **73.62 kB raw / 29.09 kB gzip**; the D3 component is **28.34 kB raw / 11.18 kB gzip**; the Canvas component is **3.75 kB raw / 1.79 kB gzip**.

The production-route outputs were unchanged before and after the experiment integration:

| Production route | Total | JavaScript | CSS |
| --- | ---: | ---: | ---: |
| Grade 7 | 23,893,271 B | 672,465 B | 166,671 B |
| Grade 8 | 2,377,524 B | 648,382 B | 161,126 B |
| Grade 11 | 3,698,654 B | 705,475 B | 186,197 B |

## Export findings

The click-state export produced a **28-page, 14,479,578-byte PDF**. It uses the built static route, Playwright Chromium and pdf-lib so every deterministic click state is captured after the slide settles. This avoids blank pages, half-transitions and dependence on a running Canvas loop. The molecular-geometry page exports a labelled deterministic view; its essential geometry description is textual and does not depend on WebGL.

The stock Slidev dev and export commands were not reliable in this Windows/Vite 8 workspace: they duplicated the absolute Windows path while resolving the deck-local conditional stylesheet. The repository development command builds and serves the isolated route on port 3060; the export script captures that same built route and still implements the requested click-state semantics.

## Boundaries and unresolved limitations

- The 3D chunk is large even when isolated. Keep it experimental unless fixed 2D views fail to teach the geometry.
- Canvas FPS is browser- and hardware-specific. The live value is evidence for the current machine, not a universal benchmark.
- PDF captures Canvas and 3D as static teaching states; it cannot reproduce continuous motion or free rotation.
- The receptor endpoint is conceptual and uses sourced cellular context. It deliberately does not pretend to be a receptor micrograph or an authored molecular diagram.
- The scale journey reconstructs deterministically but does not yet share one physically persistent DOM object across page transitions; it proves visual continuity, not a public persistence abstraction.
- The experimental route is intentionally absent from the grade-first public menu and has not been deployed.

## Third-party note

SmilesDrawer, TresJS and Three.js are MIT. GSAP 3 uses the [GSAP standard no-charge license](https://gsap.com/standard-license/). `d3-array`, `d3-scale` and `d3-shape` are ISC. Playwright Chromium is Apache-2.0 and pdf-lib is MIT. These packages are experiment or validation/export dependencies; no full D3 bundle or Motion Vue dependency was added, and ScrollTrigger is not used.
