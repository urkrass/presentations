# Online worksheet standard

Applies to newly created online worksheets in this repository. Established 18 September 2026.

## One viewport, no scrolling

- Every teaching screen, question, answer tool and menu must fit the available viewport. Navigation stays visible. No page scrolling or nested scrolling is needed to reach content or controls.
- Split material into short activities. If a reading exceeds its available height, paginate it at paragraph, word or table-row boundaries. Never hide required content with clipping or an overflow rule.
- On smaller or shorter viewports, separate reading and answering into accessible views. The full prompt must remain reachable in the reading view. Keep ordinary text at a readable size.
- Long written answers must flow into navigable pages without dropping characters. Resizing a window must preserve every answer. Do not impose a tiny response limit just to make a text box fit.
- Drawings scale with the work area and remain editable with mouse, touch or stylus. Expanded drawing mode must also fit the viewport.
- Test all activities and their continuation pages at laptop and phone sizes. Check visible element bounds and scroll dimensions, not just the document's hidden scrollbars. Include a short landscape viewport, menus, equations and long responses.

## Learning and submissions

- Mix concise theory, worked examples, guided questions and independent practice. Retain the source's learning objectives while writing original instructional copy.
- Check scientific statements for overgeneralisations. Clearly identify invented teaching data and distinguish evidence from inference.
- Use sharp scientific vector diagrams. Keep teacher solutions separate from public student material.
- Preserve text, equations, chemical formulae and sketches in one response. Do not lose a mode's work when switching tools.
- Autosave on the device, report failures, and prevent one tab from silently replacing another tab's work.
- Provide a validated editable backup and a self-contained submission. Include student identity, prompts, answers and diagrams in printable exports. State clearly how students hand in work.
- Do not describe local storage as a teacher submission system. No account or student-data transmission is needed for the static workflow.

## Robust simulations

- Add a model only when its rules and limits can be stated accurately. Distinguish qualitative concept models from measured or predictive simulations.
- A dynamic simulation must evolve continuously under explicit model rules; swapping diagrams or dragging schematic objects alone is not a dynamic model. Use a locally bundled engine when it materially improves interaction and rendering.
- Keep numerical rules separate from rendering. Use a fixed timestep and seeded randomness; frame rate and playback speed must not change the result at a given model tick. Prevent impossible states, bound populations/history, and offer a repeatable reset.
- Provide Play/Pause and pause when the document is hidden or a separate notes/results view is opened. Reset or a change of conditions must be explicit. State invented rates and omitted biology.
- Lazy-load heavier engines, provide a supported rendering fallback, release scenes when closed, and make loading/rendering failures visible without losing written answers.
- Use native keyboard- and touch-accessible controls. No animation or timing race may determine a student's result.
- Preserve model state through reloads and validated backups. Let students record an observation without overwriting their answer; include a self-contained static result plot or snapshot, conditions and model limits in printable submissions.
- Keep model notes paginated and all controls within one viewport. Test model invariants and parameter boundaries, including conservation/segment identity where applicable. Verify moving frames, pause/reset, saved replay, renderer fallback, repeated open/close, short landscape and small phones in a browser.

Reference implementation: `site/ib-dp/viruses/`.
