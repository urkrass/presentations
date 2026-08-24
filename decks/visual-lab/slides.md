---
theme: default
title: Visual Experiments Laboratory
titleTemplate: '%s - Slidev'
info: |
  Isolated visual studies for the science presentation system.
  Direct-access review route; not part of the public grade selector.
class: visual-lab-deck
canvasWidth: 1280
drawings:
  persist: false
transition: fade-out
wakeLock: false
mdc: true
fonts:
  sans: Inter
  serif: Georgia
  mono: Consolas
---

<p class="lab-kicker">Study 01 · native Slidev · three-click sequence</p>

# Can a still photograph carry a causal sequence?

<p class="lab-lede">Advance three clicks, then rewind. The image stays continuous while the explanation moves from detection to response.</p>

<NativeBaseline />

<!--
[Sources]
- https://commons.wikimedia.org/wiki/File:Namibia_Otjiwarongo_Cheetah_Conservation_Fund_Cheetah_Jumping_While_Running.jpg — cheetah photograph, CC BY 4.0.
[/Sources]
-->

---

<p class="lab-kicker">Study 02 · native Slidev · state replacement</p>

# Keep the scene stable while the question changes

<div class="native-question-stage">
  <img :src="'images/cheetah-running.jpg'" alt="A running cheetah used as one continuous visual anchor" />
  <div class="native-question-shade" />
  <VSwitch :at="1" :unmount="false" class="native-question-copy">
    <template #0><blockquote>What changes first: the animal’s position, its sensory input, or its stride?</blockquote></template>
    <template #1><blockquote>Position changes first. Sensory systems detect that change.</blockquote></template>
    <template #2><blockquote>The causal route is position → detection → signal → muscular adjustment.</blockquote></template>
    <template #3><blockquote>Rewind restores the earlier question exactly, without rebuilding the scene.</blockquote></template>
  </VSwitch>
  <ol class="native-question-rail">
    <li v-click="1">observe</li>
    <li v-click="2">explain</li>
    <li v-click="3">audit</li>
  </ol>
</div>

<!--
[Sources]
- https://commons.wikimedia.org/wiki/File:Namibia_Otjiwarongo_Cheetah_Conservation_Fund_Cheetah_Jumping_While_Running.jpg — cheetah photograph, CC BY 4.0.
[/Sources]
-->

---

<p class="lab-kicker">Study 03 · native Slidev · restoration audit</p>

# Rewind should restore meaning, not merely reverse decoration

<div class="native-verdict-stage">
  <img :src="'images/cheetah-running.jpg'" alt="A running cheetah held as one continuous scene during the restoration test" />
  <div class="native-verdict-shade" />
  <blockquote v-motion :initial="{ opacity: 0, y: 18 }" :enter="{ opacity: 1, y: 0 }">Every click restores.<br>Nothing has to be rebuilt.</blockquote>
  <div class="native-verdict-measures">
    <span><b>exact</b> state</span>
    <span><b>clear</b> print</span>
    <span><b>zero</b> extra runtime</span>
  </div>
</div>

<!--
[Sources]
- https://commons.wikimedia.org/wiki/File:Namibia_Otjiwarongo_Cheetah_Conservation_Fund_Cheetah_Jumping_While_Running.jpg — cheetah photograph, CC BY 4.0.
[/Sources]
-->

---

<p class="lab-kicker">Study 04 · SmilesDrawer · mapped reaction SMILES</p>

# The atom count must survive the reaction

<p class="lab-lede">Advance four clicks. An established chemistry renderer—not positioned CSS shapes—derives the structures and bonds from a mapped reaction string.</p>

<ParticleLedger />
<div class="click-register" aria-hidden="true"><span v-click="1" /><span v-click="2" /><span v-click="3" /><span v-click="4" /></div>

<!--
[Sources]
- https://chem.libretexts.org/Bookshelves/Introductory_Chemistry/Introductory_Chemistry_(CK-12)/11%3A_Chemical_Reactions/11.03%3A_Balancing_Equations — atom conservation and balancing context.
- https://reymond-group.github.io/smilesDrawer/getting-started/ — reaction SMILES rendering and Vue integration pattern.
- https://doi.org/10.1021/acs.jcim.7b00425 — SmilesDrawer method paper.
[/Sources]
-->

---

<p class="lab-kicker">Study 05 · GSAP image focus · sourced anatomy</p>

# The hand can begin to withdraw before the brain receives the news

<p class="lab-lede">The source arrows remain untouched. The camera follows the existing anatomy, then returns to the complete figure.</p>

<ReflexTrace />
<div class="click-register" aria-hidden="true"><span v-click="1" /><span v-click="2" /><span v-click="3" /><span v-click="4" /></div>

<!--
[Sources]
- https://commons.wikimedia.org/wiki/File:Afferent_and_efferent_neurons.svg — two-neuron reflex arc, CC BY-SA 4.0.
- https://openstax.org/books/concepts-biology/pages/16-6-nervous-system — reflexes use local synaptic connections while information also travels to the brain.
[/Sources]
-->

---

<p class="lab-kicker">Study 06 · D3 · evidence accumulating</p>

# The reading is not ready until the curve stops climbing

<p class="lab-lede">Add readings. The shaded band marks the settling zone; three consecutive values within 0.2 °C turn the trace into evidence.</p>

<TemperatureSettling />

<!--
[Sources]
- No external data. The deterministic dataset was created for this interaction study and is labelled as simulated.
[/Sources]
-->

---

<p class="lab-kicker">Study 07 · D3 · anomaly decision</p>

# One high point changes the mean—and demands a reason

<p class="lab-lede">Retain or exclude the suspected handling error. The point never disappears without the summary changing in public.</p>

<TemperatureSettling anomaly-mode />

<!--
[Sources]
- No external data. The deterministic anomaly was created to test reversible analytical decisions.
[/Sources]
-->

---

<p class="lab-kicker">Study 08 · Canvas system</p>

# Diffusion becomes visible when hundreds of particles move together

<p class="lab-lede">Pause, reset the gradient, or jump to an equilibrium sample. The seeded run returns to the same opening state.</p>

<DiffusionCanvas :initial-count="1000" />

<!--
[Sources]
- No external source. This is a qualitative, seeded diffusion model rather than measured molecular data.
[/Sources]
-->

---

<p class="lab-kicker">Study 09 · Canvas performance stress</p>

# The same explanation must survive a fourfold particle increase

<p class="lab-lede">Switch between 500 and 2,000 particles. The readout reports live frame rate and the simulation stops when the slide is inactive.</p>

<DiffusionCanvas :initial-count="2000" />

<!--
[Sources]
- No external source. Performance is measured live in the current browser and is not a universal benchmark.
[/Sources]
-->

---

<p class="lab-kicker">Study 10 · persistent scale scene · organ</p>

# The brain becomes meaningful only after the whole animal sets the context

<p class="lab-lede">The scale rail preserves location while the scientific image changes from organism to a real anatomical section.</p>

<ScaleJourney :stage="1" />

<!--
[Sources]
- https://commons.wikimedia.org/wiki/File:Namibia_Otjiwarongo_Cheetah_Conservation_Fund_Cheetah_Jumping_While_Running.jpg — cheetah photograph, CC BY 4.0.
- https://commons.wikimedia.org/wiki/File:MRI_brain_sagittal_section.jpg — sagittal MRI image, CC BY-SA 2.0.
[/Sources]
-->

---

<p class="lab-kicker">Study 11 · persistent scale scene · cell</p>

# At cell scale, a network resolves into individual signalling units

<p class="lab-lede">The same micrograph now answers a narrower question: where does one cell sit inside the connected tissue?</p>

<ScaleJourney :stage="3" />

<!--
[Sources]
- https://commons.wikimedia.org/wiki/File:Rat_primary_cortical_neuron_culture,_deconvolved_z-stack_overlay_(30614937102).jpg — cortical neuron culture micrograph, CC BY 2.0.
[/Sources]
-->

---

<p class="lab-kicker">Study 12 · persistent scale scene · receptor</p>

# At receptor scale, the organism is still the context

<p class="lab-lede">The final focus is deliberately conceptual: no invented receptor drawing, only the question that links a boundary protein back to the whole response.</p>

<ScaleJourney :stage="4" />

<!--
[Sources]
- https://commons.wikimedia.org/wiki/File:Rat_primary_cortical_neuron_culture,_deconvolved_z-stack_overlay_(30614937102).jpg — cortical neuron culture micrograph, CC BY 2.0; used as cellular context, not as a receptor micrograph.
[/Sources]
-->

---

<p class="lab-kicker">Study 13 · dynamically loaded TresJS / Three.js</p>

# Three dimensions earn their weight when geometry is the idea

<p class="lab-lede">Compare linear, bent, and tetrahedral molecules from fixed viewpoints, then test controlled rotation. The scene renders on demand and falls back to structural text.</p>

<MoleculeGeometry />

<!--
[Sources]
- https://chem.libretexts.org/Bookshelves/General_Chemistry/Chemistry_1e_(OpenSTAX)/07%3A_Chemical_Bonding_and_Molecular_Geometry/7.06%3A_Molecular_Structure_and_Polarity — standard VSEPR geometries and ideal bond angles.
[/Sources]
-->

---

<p class="lab-kicker">Study 14 · editorial decision</p>

# Use the quietest engine that makes the phenomenon visible

<div class="technique-sequence" aria-label="Editorial comparison of visual techniques">
  <div><span>01</span><strong>Native</strong><p>high value · low build · excellent export · excellent performance</p><em>default for short sequences</em></div>
  <div class="promoted"><span>02</span><strong>Domain renderer</strong><p>high correctness · low authored geometry · deterministic export</p><em>scientific structures before generic drawing</em></div>
  <div><span>03</span><strong>D3</strong><p>high value · medium build · good export · excellent performance</p><em>evidence that changes under a decision</em></div>
  <div class="promoted"><span>04</span><strong>Canvas</strong><p>high value · medium build · snapshot export · good at 2,000 particles</p><em>many-body systems</em></div>
  <div class="promoted"><span>05</span><strong>Scale scene</strong><p>high value · low build · excellent export · excellent performance</p><em>nested biological context</em></div>
  <div><span>06</span><strong>3D</strong><p>targeted value · high build · fallback export · on-demand performance</p><em>spatial geometry only</em></div>
</div>

<!--
[Sources]
- No external source. Ratings summarise validation performed in this repository and are documented in FINDINGS.md.
[/Sources]
-->
