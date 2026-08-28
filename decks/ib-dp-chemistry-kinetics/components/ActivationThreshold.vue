<script setup lang="ts">
import { computed, ref } from 'vue'

const temperature = ref(320)
const barrier = ref(52)
const W = 760
const H = 360

const values = computed(() => {
  const scale = temperature.value / 300
  return Array.from({ length: 121 }, (_, i) => {
    const energy = i * .75
    const yRaw = Math.sqrt(Math.max(energy, .01)) * Math.exp(-energy / (16 * scale))
    return { energy, yRaw }
  })
})
const maxY = computed(() => Math.max(...values.value.map(d => d.yRaw)))
const points = computed(() => values.value.map(d => ({
  ...d,
  x: 56 + d.energy / 90 * 660,
  y: 300 - d.yRaw / maxY.value * 245,
})))
const curve = computed(() => points.value.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '))
const barrierX = computed(() => 56 + barrier.value / 90 * 660)
const fraction = computed(() => 100 * Math.exp(-barrier.value / (8.314e-3 * temperature.value)))
const fractionText = computed(() => fraction.value >= 1 ? fraction.value.toFixed(1) : fraction.value >= .01 ? fraction.value.toFixed(2) : fraction.value.toExponential(1))
</script>

<template>
  <section class="activation-stage">
    <div class="energy-plot">
      <svg viewBox="0 0 760 360" role="img" aria-labelledby="energy-title energy-desc">
        <title id="energy-title">Molecular energy distribution and activation threshold</title>
        <desc id="energy-desc">The distribution broadens as temperature rises. A vertical activation energy threshold identifies the fraction of molecules with sufficient energy.</desc>
        <defs><clipPath id="above-threshold"><rect :x="barrierX" y="0" :width="716 - barrierX" height="320" /></clipPath></defs>
        <path :d="curve" class="distribution" />
        <path :d="`${curve} L 716 300 L 56 300 Z`" class="activated-area" clip-path="url(#above-threshold)" />
        <line :x1="barrierX" :x2="barrierX" y1="42" y2="301" class="barrier" />
        <text :x="barrierX + 8" y="58" class="barrier-label">Eₐ = {{ barrier }} kJ mol⁻¹</text>
        <text x="317" y="344" class="axis-title">molecular energy</text>
        <text x="20" y="190" transform="rotate(-90 20 190)" class="axis-title">relative number</text>
      </svg>
    </div>
    <div class="energy-controls">
      <p class="scene-kicker">Not every collision can react</p>
      <label>Temperature <strong>{{ temperature }} K</strong><input v-model.number="temperature" type="range" min="260" max="600" step="10" /></label>
      <label>Activation energy <strong>{{ barrier }} kJ mol⁻¹</strong><input v-model.number="barrier" type="range" min="25" max="80" step="1" /></label>
      <output><span>Above the barrier</span><strong>{{ fractionText }}%</strong></output>
      <p>A warmer distribution does not shift every molecule equally; it increases the high-energy tail disproportionately.</p>
    </div>
  </section>
</template>

<style scoped>
.activation-stage{display:grid;grid-template-columns:1.32fr .68fr;gap:38px;min-height:480px;align-items:center}.energy-plot{padding:16px;border-radius:var(--radius-field);background:var(--paper-deep)}svg{display:block;width:100%;height:auto}.distribution{fill:none;stroke:var(--blue);stroke-width:2.3}.activated-area{fill:rgba(141,63,46,.22);stroke:none}.barrier{stroke:var(--rust);stroke-width:1.6;stroke-dasharray:5 5}.barrier-label{fill:var(--rust);font:800 13px Aptos,Arial,sans-serif}.axis-title{fill:var(--muted);font:700 13px Aptos,Arial,sans-serif;letter-spacing:.03em}.energy-controls{display:grid;gap:18px}.energy-controls label{display:grid;gap:8px;color:var(--muted);font-size:14px}.energy-controls input{width:100%;accent-color:var(--rust)}output{display:grid;gap:5px;padding:18px;border-radius:var(--radius-field);background:var(--soft-rust)}output span{color:var(--rust);font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}output strong{font:500 34px/1 Georgia,serif}.energy-controls>p:last-child{margin:0;color:var(--muted);font-size:15px}
</style>
