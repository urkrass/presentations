<script setup lang="ts">
import { computed, ref } from 'vue'

const time = ref(24)
const mode = ref<'average' | 'instant'>('average')

const W = 720
const H = 390
const left = 70
const top = 28
const plotW = 610
const plotH = 300

function volume(t: number) {
  return 72 * (1 - Math.exp(-t / 18))
}

const points = computed(() => Array.from({ length: 61 }, (_, index) => {
  const t = index
  const v = volume(t)
  return {
    t,
    v,
    x: left + (t / 60) * plotW,
    y: top + plotH - (v / 75) * plotH,
  }
}))

const curve = computed(() => points.value.map((point, index) => `${index ? 'L' : 'M'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' '))
const current = computed(() => points.value[time.value])
const averageRate = computed(() => volume(time.value) / time.value)
const instantRate = computed(() => (72 / 18) * Math.exp(-time.value / 18))
const tangent = computed(() => {
  const slope = -(instantRate.value * plotH / 75) / (plotW / 60)
  const dx = 76
  return {
    x1: current.value.x - dx,
    y1: current.value.y - slope * dx,
    x2: current.value.x + dx,
    y2: current.value.y + slope * dx,
  }
})
</script>

<template>
  <section class="rate-explorer">
    <div class="plot-shell">
      <svg viewBox="0 0 720 390" role="img" aria-labelledby="rate-title rate-desc">
        <title id="rate-title">Product volume against time</title>
        <desc id="rate-desc">A measured curve rises rapidly and approaches a plateau. A movable time marker supports average and instantaneous rate readings.</desc>
        <text class="axis-title y-title" x="22" y="180" transform="rotate(-90 22 180)">product volume / cm³</text>
        <text class="axis-title" x="320" y="380">time / s</text>
        <g class="tick-labels">
          <text v-for="tick in [0,15,30,45,60]" :key="`x-${tick}`" :x="left + tick / 60 * plotW" y="350" text-anchor="middle">{{ tick }}</text>
          <text v-for="tick in [0,25,50,75]" :key="`y-${tick}`" x="54" :y="top + plotH - tick / 75 * plotH + 4" text-anchor="end">{{ tick }}</text>
        </g>
        <path :d="curve" class="rate-curve" />
        <g class="observations">
          <circle v-for="point in points.filter((_, index) => index % 5 === 0)" :key="point.t" :cx="point.x" :cy="point.y" r="3.5" />
        </g>
        <line class="time-marker" :x1="current.x" :x2="current.x" :y1="top" :y2="top + plotH" />
        <line v-if="mode === 'average'" class="analysis-line" :x1="left" :y1="top + plotH" :x2="current.x" :y2="current.y" />
        <line v-else class="analysis-line" v-bind="tangent" />
        <circle class="focus-point" :cx="current.x" :cy="current.y" r="7" />
      </svg>
    </div>
    <div class="rate-readout">
      <p class="scene-kicker">Rate is a slope</p>
      <div class="mode-switch" aria-label="Choose rate type">
        <button type="button" :aria-pressed="mode === 'average'" @click="mode = 'average'">Average</button>
        <button type="button" :aria-pressed="mode === 'instant'" @click="mode = 'instant'">Instantaneous</button>
      </div>
      <label>Read at <strong>{{ time }} s</strong><input v-model.number="time" type="range" min="6" max="54" step="1" /></label>
      <output>
        <span>{{ mode === 'average' ? 'ΔV ÷ Δt' : 'tangent slope' }}</span>
        <strong>{{ (mode === 'average' ? averageRate : instantRate).toFixed(2) }} cm³ s⁻¹</strong>
      </output>
      <p>{{ mode === 'average' ? 'One interval compresses everything that happened inside it.' : 'The tangent asks how quickly the system is changing at one moment.' }}</p>
    </div>
  </section>
</template>

<style scoped>
.rate-explorer{display:grid;grid-template-columns:1.35fr .65fr;gap:34px;min-height:480px;align-items:center}.plot-shell{padding:18px 14px 8px;border-radius:var(--radius-field);background:var(--paper-deep)}svg{display:block;width:100%;height:auto}.axis-title{fill:var(--muted);font:700 13px Aptos,Arial,sans-serif;letter-spacing:.04em}.tick-labels text{fill:var(--quiet);font:12px Aptos,Arial,sans-serif}.rate-curve{fill:none;stroke:var(--blue);stroke-width:2.4;stroke-linecap:round}.observations circle{fill:var(--paper);stroke:var(--blue);stroke-width:1.8}.time-marker{stroke:rgba(112,109,102,.35);stroke-width:1;stroke-dasharray:4 6}.analysis-line{stroke:var(--rust);stroke-width:1.7;stroke-linecap:round}.focus-point{fill:var(--paper);stroke:var(--rust);stroke-width:3}.rate-readout{display:grid;gap:18px}.mode-switch{display:grid;grid-template-columns:1fr 1fr;gap:7px}.mode-switch button{padding:10px;border:0;border-radius:var(--radius-control);background:var(--paper-deep);color:var(--muted);font-weight:750;cursor:pointer}.mode-switch button[aria-pressed="true"]{background:var(--charcoal);color:#fff}.rate-readout label{display:grid;gap:10px;color:var(--muted);font-size:15px}.rate-readout input{width:100%;accent-color:var(--rust)}output{display:grid;gap:5px;padding:18px;border-radius:var(--radius-field);background:var(--soft-rust)}output span{color:var(--rust);font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}output strong{font:500 29px/1.1 Georgia,serif}.rate-readout>p:last-child{margin:0;color:var(--muted);font-size:15px}
output span{text-transform:none;letter-spacing:.02em;font-size:12px}
</style>
