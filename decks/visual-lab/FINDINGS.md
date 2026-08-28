# Visual experiments laboratory — technical findings

## Decision

After visual review, promote three techniques into a first production trial:

1. **The Canvas diffusion system** when a lesson genuinely depends on hundreds of simultaneous particles.
2. **The persistent scale inspector** when students must retain organism-level context while moving toward cellular detail.
3. **The hybrid SVG + PixiJS liquid field** when the scientific meaning depends on bubbles sharing and disturbing one liquid surface.

They were the strongest combinations of one dominant visual subject, purposeful interaction and restrained supporting text. Native Slidev remains the default for simpler sequences. The limited 3D study is visually successful but should remain specialist because of its bundle cost. GSAP and D3 remain useful technical proofs, but their production use should wait for a lesson whose causal objects or changing evidence cannot be taught as clearly with a quieter medium.

For scientific geometry, the selection order is now explicit: **sourced figure or domain-specific renderer first; general animation may focus or sequence it, but must not invent the figure.**

## What was tested

| Study | Communication job | Technique | Result |
| --- | --- | --- | --- |
| 01 | Follow a causal signal inside one continuous photograph | Native `v-motion` + `$clicks` | Reliable baseline; reverse navigation restores emphasis without replacing the scene |
| 02 | Replace a question with its answer in one anchored field | `VSwitch` + `v-click` | Reliable, compact and export-friendly |
| 03 | Audit backward restoration without a comparison grid | Native motion/CSS | One image and one verdict make the technical result legible |
| 04 | Balance a molecular equation and audit atom conservation | SmilesDrawer reaction renderer + staged reaction SMILES | Every click asks the domain renderer to redraw a meaningful equation candidate; no mechanism or geometry is invented |
| 05 | Distinguish rapid spinal response from later brain information | Sourced reflex SVG + GSAP visibility sequencing | Clicks reveal the three original source-path groups; the image never pans and no route is overlaid |
| 06 | Decide when a temperature reading has settled | D3 scales/array + time-positioned dot plot | Individual observations accumulate without a connecting trace; a shaded band carries the plateau judgement |
| 07 | Make retain/exclude anomaly judgement visible | D3 dot plot + reversible Vue controls | Exclusion changes the summary while the suspected observation remains visible |
| 08 | See a concentration gradient change as a many-body system | Seeded Canvas, 1,000 particles | Smooth on the validation machine; deterministic reset |
| 09 | Stress the same explanation at 500–2,000 particles | Seeded Canvas + live FPS | 1,000 is the sensible classroom default; performance remains device-specific |
| 10 | Move organism → organ → tissue → cell → receptor without losing location | One fixed source photograph + animated inspection window + direct level controls | The base scene never changes; only the inspection window appears or changes, and the receptor endpoint remains explicitly conceptual |
| 11 | Compare linear, bent and tetrahedral geometry | Dynamically loaded TresJS/Three.js | Useful only when 3D geometry is the concept; fixed views plus keyboard-accessible rotation clarify the comparison |
| 12 | Compare value, cost, export and use | Annotated editorial sequence | Clear synthesis without a dashboard or comparison matrix |
| 13 | Distinguish still, near-boil, gentle and rolling boiling | SVG glass + PixiJS v8 mesh + custom GLSL metaball field | The same vessel interpolates between five states; bubbles grow, detach, deform, rupture the surface and eject bounded droplets |
| 14 | Decide whether WebGL meaningfully improves the prior SVG treatment | Sourced SVG reference beside the shader scene | The SVG preserves source fidelity; the WebGL version adds shared deformation, depth and a reacting interface rather than merely moving marks |
| 15 | Separate model problems from rendering problems | Deterministic debug overlay | Nucleation points, particle centres, clip bounds, FPS and gas/splash populations remain inspectable without changing the phenomenon |

## Reliability and lifecycle

- The reflex study creates one scoped `gsap.context` and changes visibility only for the source SVG's existing `path261`, `path257` and `path259` groups. Decreasing click counts reconstruct earlier visibility states and teardown reverts the context.
- Native and GSAP sequences were exercised forwards and backwards. SmilesDrawer produces five distinct rendered balancing states, then reconstructs the opening candidate when the sequence reverses.
- The Canvas loop stops when its slide is inactive, restarts when active, and uses a seeded generator for the same reset state.
- The 3D scene is dynamically imported, renders on demand, observes Slidev activity and supplies a textual non-WebGL fallback.
- The scale inspector is one persistent DOM scene. Direct controls select every level; the cheetah source remains fixed while GSAP animates only the inspection window. Reduced motion replaces that animation with an immediate state change.
- The boiling model uses seeded state, a capped 40-object uniform buffer and explicit gas/splash lifecycles. Attachment lifetime never deletes a detached bubble: at 90°C it continues under buoyancy until surface contact, while cooling invokes a separate visibly gradual dissolution path. Its Pixi ticker pauses off-slide, resumes on return, tears down on unmount and renders a deterministic static state when motion is reduced.
- A persistent deck-level control stores reduced-motion preference. With motion disabled, click states jump to their destinations and no claim depends on movement alone.
- Direct navigation to all 15 studies passed. Overview and presenter routes rendered correctly. Refresh restores the scale inspector to its labelled organism-level opening state.

## Browser and classroom checks

Automated checks used Chromium at exactly **1366×768** and **1920×1080**. All 15 slides fit their 16:9 stage without layout overflow. Every slide retained the reduced-motion state. Browser checks also covered distinct and reversible SmilesDrawer reaction states, source-SVG reflex reveals, dot-plot plateau/anomaly decisions, fixed-context scale switching, 3D molecule/view controls, WebGL presets/slider/debug and pause/resume lifecycle, overview and presenter mode, and failed on console or page errors.

The review screenshots are direct 1366×768 browser captures of stable teaching states. They preserve the deck motion control but omit surrounding browser chrome:

| 01–06 | 07–12 |
| --- | --- |
| [01 native pathway](findings/screenshots/study-01.jpg) | [07 anomaly decision](findings/screenshots/study-07.jpg) |
| [02 state replacement](findings/screenshots/study-02.jpg) | [08 Canvas, 1,000 particles](findings/screenshots/study-08.jpg) |
| [03 native verdict](findings/screenshots/study-03.jpg) | [09 Canvas, 2,000 particles](findings/screenshots/study-09.jpg) |
| [04 reaction renderer](findings/screenshots/study-04.jpg) | [10 persistent scale inspector](findings/screenshots/study-10.jpg) |
| [05 reflex trace](findings/screenshots/study-05.jpg) | [11 molecular geometry](findings/screenshots/study-11.jpg) |
| [06 temperature plateau](findings/screenshots/study-06.jpg) | [12 editorial decision](findings/screenshots/study-12.jpg) |

| 13–15 |
| --- |
| [13 interactive boiling field](findings/screenshots/study-13.jpg) |
| [14 SVG versus WebGL](findings/screenshots/study-14.jpg) |
| [15 deterministic debug view](findings/screenshots/study-15.jpg) |

## Build and bundle observations

The native-only experimental scaffold built to 42 files / **792,449 B** total (**569,624 B JS**, **124,745 B CSS**). The revised 12-study route builds to 64 files / **3,229,098 B** total (**1,725,309 B JS**, **138,613 B CSS**, **1,361,236 B images**). The increase comes from the sourced reflex/MRI assets and the isolated chemistry renderer used to replace authored scientific geometry.

The deliberately isolated 3D chunk is **776,405 B raw / 202.24 kB gzip**. It is loaded only when the molecular-geometry study is requested. SmilesDrawer is isolated at **190,946 B raw / 56.32 kB gzip**; the shared GSAP chunk is **69.58 kB raw / 27.28 kB gzip**; the D3 dot-plot component is **23.48 kB raw / 9.64 kB gzip**; the Canvas component is **3.75 kB raw / 1.79 kB gzip**.

PixiJS is dynamically isolated from the earlier studies. Its shared renderer chunk is approximately **625.01 kB raw / 176.34 kB gzip**; the boiling component and shader/model wrapper add approximately **18.70 kB raw / 7.13 kB gzip**. The live debug view sustained roughly **80–92 FPS** in the in-app Chromium review at 1280×720; this is evidence for the current machine, not a universal benchmark.

The production-route outputs were unchanged before and after the experiment integration:

| Production route | Total | JavaScript | CSS |
| --- | ---: | ---: | ---: |
| Grade 7 | 23,893,271 B | 672,465 B | 166,671 B |
| Grade 8 | 2,377,524 B | 648,382 B | 161,126 B |
| Grade 11 | 3,698,654 B | 705,475 B | 186,197 B |

## Export findings

The click-state export produced a **30-page, 17,483,787-byte PDF**. It includes the organism opening state and all four directly selected inspection-window levels. The exporter uses the built static route, Playwright Chromium and pdf-lib so every deterministic click state is captured after the slide settles. This avoids blank pages, half-transitions and dependence on a running Canvas loop. The molecular-geometry page exports a labelled deterministic view; its essential geometry description is textual and does not depend on WebGL.

The stock Slidev dev and export commands were not reliable in this Windows/Vite 8 workspace: they duplicated the absolute Windows path while resolving the deck-local conditional stylesheet. The repository development command builds and serves the isolated route on port 3060; the export script captures that same built route and still implements the requested click-state semantics.

## Boundaries and unresolved limitations

- The 3D chunk is large even when isolated. Keep it experimental unless fixed 2D views fail to teach the geometry.
- The Pixi renderer is also a substantial specialist dependency. The hybrid approach is reusable when shared-liquid behaviour is the teaching point, but unjustified for a few independent bubbles.
- The shader is a convincing visual model, not CFD. Its crown/depression and droplet breakup communicate a surface rupture, but they do not calculate viscosity, pressure or heat transfer.
- Steam remains deliberately faint so it does not obscure the interface; a lesson about condensation would need a separate, more explicit vapour model.
- Canvas FPS is browser- and hardware-specific. The live value is evidence for the current machine, not a universal benchmark.
- PDF captures Canvas and 3D as static teaching states; it cannot reproduce continuous motion or free rotation.
- The receptor endpoint is conceptual and uses sourced cellular context. It deliberately does not pretend to be a receptor micrograph or an authored molecular diagram.
- The cell and receptor levels reuse a sourced neuron-culture micrograph as context. A production lesson should replace that reuse when a suitable level-specific source image is available.
- The experimental route is intentionally absent from the grade-first public menu and has not been deployed.

## Third-party note

SmilesDrawer, TresJS and Three.js are MIT. GSAP 3 uses the [GSAP standard no-charge license](https://gsap.com/standard-license/). `d3-array` and `d3-scale` are ISC. Playwright Chromium is Apache-2.0 and pdf-lib is MIT. These packages are experiment or validation/export dependencies; no full D3 bundle or Motion Vue dependency was added, and ScrollTrigger is not used.
