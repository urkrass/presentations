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
  <VSwitch :at="0" :unmount="false">
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
