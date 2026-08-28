<script setup lang="ts">
import { computed, ref } from 'vue'

const temperature = ref(320)
const ea = ref(58)
const A = 2.2e10
const k = computed(() => A * Math.exp(-(ea.value * 1000) / (8.314 * temperature.value)))
const xMin = 2.5
const xMax = 3.75
const yMin = -5
const yMax = 10
const mapPoint = (T: number) => {
  const reciprocal = 1000 / T
  const lnK = Math.log(A) - (ea.value * 1000) / (8.314 * T)
  return { T, reciprocal, lnK, x: 80 + (reciprocal - xMin) / (xMax - xMin) * 600, y: 300 - (lnK - yMin) / (yMax - yMin) * 235 }
}
const point = computed(() => mapPoint(temperature.value))
const observations = computed(() => [280, 300, 320, 350, 380].map(mapPoint))
const trend = computed(() => {
  const p1 = mapPoint(400)
  const p2 = mapPoint(270)
  return { x1:p1.x,y1:p1.y,x2:p2.x,y2:p2.y }
})
</script>

<template>
  <section class="arrhenius-stage">
    <div class="arrhenius-plot">
      <svg viewBox="0 0 740 370" role="img" aria-label="Arrhenius plot of natural log rate constant against reciprocal temperature">
        <line v-bind="trend" class="trend" />
        <circle v-for="sample in observations" :key="sample.T" class="observation" :cx="sample.x" :cy="sample.y" r="3.5" />
        <circle class="focus" :cx="point.x" :cy="point.y" r="7" />
        <g class="tick-labels"><text v-for="tick in [2.5,3,3.5]" :key="`x-${tick}`" :x="80 + (tick - xMin) / (xMax - xMin) * 600" y="324" text-anchor="middle">{{ tick.toFixed(1) }}</text><text v-for="tick in [-5,0,5,10]" :key="`y-${tick}`" x="62" :y="300 - (tick - yMin) / (yMax - yMin) * 235 + 4" text-anchor="end">{{ tick }}</text></g>
        <text x="294" y="352" class="axis-title">1/T / 10⁻³ K⁻¹</text><text x="22" y="195" transform="rotate(-90 22 195)" class="axis-title">ln k</text>
        <text :x="point.x + 12" :y="point.y - 10" class="point-label">{{ temperature }} K</text>
      </svg>
    </div>
    <div class="arrhenius-copy">
      <p class="scene-kicker formula-kicker">ln k = ln A − Eₐ/RT</p>
      <label>Temperature <strong>{{ temperature }} K</strong><input v-model.number="temperature" type="range" min="270" max="400" step="2" /></label>
      <label>Activation energy <strong>{{ ea }} kJ mol⁻¹</strong><input v-model.number="ea" type="range" min="30" max="85" step="1" /></label>
      <output><span>Predicted rate constant</span><strong>{{ k.toExponential(2) }}</strong></output>
      <p>The slope is <strong>−Eₐ/R</strong>. A steeper negative slope means greater temperature sensitivity.</p>
    </div>
  </section>
</template>

<style scoped>
.arrhenius-stage{display:grid;grid-template-columns:1.3fr .7fr;gap:38px;min-height:480px;align-items:center}.arrhenius-plot{padding:17px;border-radius:var(--radius-field);background:var(--paper-deep)}svg{display:block;width:100%;height:auto}.trend{stroke:var(--blue);stroke-width:1.8}.arrhenius-plot .observation{fill:var(--paper);stroke:var(--blue);stroke-width:1.7}.arrhenius-plot .focus{fill:var(--paper);stroke:var(--rust);stroke-width:3}.tick-labels text{fill:var(--quiet);font:12px Aptos,Arial}.axis-title{fill:var(--muted);font:700 13px Aptos,Arial}.point-label{fill:var(--rust);font:800 13px Aptos,Arial}.arrhenius-copy{display:grid;gap:16px}.arrhenius-copy label{display:grid;gap:7px;color:var(--muted);font-size:14px}.arrhenius-copy input{width:100%;accent-color:var(--rust)}output{display:grid;gap:4px;padding:17px;border-radius:var(--radius-field);background:var(--soft-rust)}output span{color:var(--rust);font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}output strong{font:500 28px/1.1 Georgia,serif}.arrhenius-copy>p:last-child{margin:0;color:var(--muted);font-size:15px}
.arrhenius-copy .formula-kicker{text-transform:none;letter-spacing:.02em}
</style>
