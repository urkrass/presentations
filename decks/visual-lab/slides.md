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

<p class="lab-kicker">Study 01 · native Slidev baseline</p>

# A signal should read as a journey, not three cards

<p class="lab-lede">Advance three clicks, then move backward. The whole route remains legible while emphasis follows the explanation.</p>

<NativeBaseline />

<!--
[Sources]
- No external source. The content is an original generic signal-path example.
[/Sources]
-->

---

<p class="lab-kicker">Study 02 · state replacement</p>

# One canvas can change its question without moving the audience

<div class="native-audit">
  <VSwitch :at="1" :unmount="false">
    <template #0><blockquote>What changes first: the stimulus, the receptor, or the response?</blockquote></template>
    <template #1><blockquote>The stimulus changes first. The receptor detects that change.</blockquote></template>
    <template #2><blockquote>The useful sequence is causal: change → detection → signal → response.</blockquote></template>
  </VSwitch>
  <ul>
    <li v-click="1">The title stays fixed, so attention has an anchor.</li>
    <li v-click="2">VSwitch replaces the claim instead of stacking more boxes.</li>
    <li v-click="3">Back navigation restores the earlier question exactly.</li>
  </ul>
</div>

<!--
[Sources]
- No external source. This is an original interaction and layout study.
[/Sources]
-->

---

<p class="lab-kicker">Study 03 · baseline verdict</p>

# Native motion is enough when the learning object is already simple

<div class="native-audit">
  <blockquote v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }">Use the quietest motion that makes causality easier to see.</blockquote>
  <ul>
    <li>Excellent export reliability</li>
    <li>Deterministic backward restoration</li>
    <li>No extra runtime weight</li>
    <li>Limited for persistent scientific objects and continuous paths</li>
  </ul>
</div>

<!--
[Sources]
- No external source. The verdict is scoped to this repository experiment.
[/Sources]
-->

---

<p class="lab-kicker">Study 04 · GSAP persistent objects</p>

# The atoms are actors, not replacement illustrations

<p class="lab-lede">Advance four clicks. Each H and O keeps its identity as the equation moves from inventory to collision to products.</p>

<ParticleLedger />
<div class="click-register" aria-hidden="true"><span v-click="1" /><span v-click="2" /><span v-click="3" /><span v-click="4" /></div>

<!--
[Sources]
- https://chem.libretexts.org/Bookshelves/Introductory_Chemistry/Introductory_Chemistry_(CK-12)/11%3A_Chemical_Reactions/11.03%3A_Balancing_Equations — atom conservation and balancing context.
[/Sources]
-->

---

<p class="lab-kicker">Study 05 · GSAP path drawing</p>

# A reflex protects first and informs the brain on a later branch

<p class="lab-lede">Follow the numbered signal. The spinal route closes the protective loop before the ascending branch finishes.</p>

<ReflexTrace />
<div class="click-register" aria-hidden="true"><span v-click="1" /><span v-click="2" /><span v-click="3" /><span v-click="4" /></div>

<!--
[Sources]
- https://drive.google.com/file/d/1XDRgXlcAEV1Vh5yriGBf7VVqNlumAagu/view — C3.1 nervous system and reflex arc source used by the Grade 11 deck.
[/Sources]
-->

---

<p class="lab-kicker">Study 06 · D3 evidence sequence</p>

# A temperature is ready when the graph reaches a plateau

<p class="lab-lede">Add readings until three consecutive values agree within 0.2 °C. The claim emerges from the trace, not from a text instruction.</p>

<TemperatureSettling />

<!--
[Sources]
- No external data. The deterministic dataset was created for this interaction study and is labelled as simulated.
[/Sources]
-->

---

<p class="lab-kicker">Study 07 · D3 decision stress test</p>

# One anomalous reading should change the conversation, not silently vanish

<p class="lab-lede">Toggle the suspected handling error. The line, scale, mean, and judgement update together.</p>

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
