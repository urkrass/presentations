<script setup lang="ts">
import { computed, ref } from 'vue'

const order = ref<0 | 1 | 2>(1)
const W = 730
const labels = { 0: 'zero order', 1: 'first order', 2: 'second order' }
const transforms = { 0: '[A] vs t', 1: 'ln[A] vs t', 2: '1/[A] vs t' }

const points = computed(() => Array.from({ length: 41 }, (_, index) => {
  const t = index / 40 * 10
  const a = order.value === 0 ? Math.max(.08, 1 - .085 * t) : order.value === 1 ? Math.exp(-.26 * t) : 1 / (1 + .42 * t)
  return { t, a, x: 65 + t / 10 * 610, y: 300 - a * 235 }
}))
const curve = computed(() => points.value.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '))
</script>

<template>
  <section class="order-stage">
    <div class="order-plot">
      <svg viewBox="0 0 730 350" role="img" :aria-label="`${labels[order]} concentration trace`">
        <path :d="curve" class="order-curve" />
        <circle v-for="point in points.filter((_,i)=>i%4===0)" :key="point.t" :cx="point.x" :cy="point.y" r="3.4" />
        <text x="330" y="338" class="axis-title">time</text><text x="22" y="188" transform="rotate(-90 22 188)" class="axis-title">[A]</text>
      </svg>
    </div>
    <div class="order-copy">
      <p class="scene-kicker">Concentration–time signatures</p>
      <div class="order-buttons"><button v-for="n in [0,1,2]" :key="n" type="button" :aria-pressed="order===n" @click="order=n as 0|1|2">{{ n }}</button></div>
      <h2>{{ labels[order] }}</h2>
      <p>Linear test: <strong>{{ transforms[order] }}</strong></p>
      <div class="half-life"><span>Half-life</span><strong>{{ order === 0 ? 'shrinks' : order === 1 ? 'constant' : 'grows' }}</strong></div>
    </div>
  </section>
</template>

<style scoped>
.order-stage{display:grid;grid-template-columns:1.3fr .7fr;gap:38px;min-height:475px;align-items:center}.order-plot{padding:18px;border-radius:var(--radius-field);background:var(--paper-deep)}svg{display:block;width:100%;height:auto}.order-curve{fill:none;stroke:var(--blue);stroke-width:2.3;stroke-linecap:round}.order-plot circle{fill:var(--paper);stroke:var(--blue);stroke-width:1.7}.axis-title{fill:var(--muted);font:700 13px Aptos,Arial}.order-copy{display:grid;gap:15px}.order-buttons{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.order-buttons button{padding:11px;border:0;border-radius:var(--radius-control);background:var(--paper-deep);color:var(--muted);font-weight:800;cursor:pointer}.order-buttons button[aria-pressed="true"]{background:var(--charcoal);color:#fff}.order-copy h2{margin:0;font:500 37px/1.1 Georgia,serif}.order-copy>p:not(.scene-kicker){margin:0;color:var(--muted);font-size:17px}.half-life{display:grid;gap:4px;padding:16px;border-radius:var(--radius-field);background:var(--soft-green)}.half-life span{color:var(--green);font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.half-life strong{font:500 27px/1 Georgia,serif}
</style>
