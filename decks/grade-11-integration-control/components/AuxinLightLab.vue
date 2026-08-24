<script setup lang="ts">
import { computed, ref } from 'vue'

const lightSide = ref<'left' | 'right'>('left')
const auxinSide = computed(() => lightSide.value === 'left' ? 'right' : 'left')
</script>

<template>
  <section class="auxin-lab">
    <figure class="plant-stage" :class="`light-${lightSide}`">
      <img :src="'images/onions-light.jpg'" alt="Onion shoots bending toward a directional light source" />
      <span class="light-position">{{ lightSide === 'left' ? 'LIGHT →' : '← LIGHT' }}</span>
      <figcaption>Prediction: auxin accumulates on the <strong>{{ auxinSide }}</strong>, shaded side.</figcaption>
    </figure>
    <div class="lab-copy">
      <p class="kicker">Change the light direction</p>
      <div class="light-controls">
        <button v-for="side in ['left','right']" :key="side" type="button" :class="{ active: lightSide === side }" @click="lightSide = side as any">{{ side }}</button>
      </div>
      <div class="causal-chain">
        <p><span>1</span><strong>Lateral light</strong><small>redistributes auxin toward the shaded side.</small></p>
        <p><span>2</span><strong>Differential elongation</strong><small>cells on the shaded side elongate more rapidly.</small></p>
        <p><span>3</span><strong>Curvature</strong><small>the shoot bends toward the light source.</small></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.auxin-lab { min-height: 420px; display: grid; grid-template-columns: 1fr 1.12fr; gap: 35px; }
.plant-stage { position: relative; margin: 0; overflow: hidden; border-radius: 7px; background: var(--green-field); }
.plant-stage img { width: 100%; height: 350px; object-fit: cover; object-position: center; transition: transform 280ms ease; }
.plant-stage.light-right img { transform: scaleX(-1); }
.light-position { position: absolute; top: 18px; left: 18px; padding: 9px 12px; border-radius: 4px; background: rgba(251,250,246,.92); color: var(--accent); font-size: 13px; font-weight: 800; letter-spacing: .08em; }
.light-right .light-position { left: auto; right: 18px; }
.plant-stage figcaption { min-height: 70px; margin: 0; padding: 14px 18px; color: var(--charcoal); font-size: 15px; line-height: 1.45; }
.plant-stage figcaption strong { color: var(--accent); }
.lab-copy { display: grid; align-content: center; gap: 18px; }
.kicker { margin: 0; color: var(--accent); font-size: 13px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.light-controls { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }
.light-controls button { border: 0; border-radius: 5px; padding: 14px; background: var(--paper-deep); color: var(--ink); font-weight: 800; text-transform: capitalize; cursor: pointer; }
.light-controls button.active { background: var(--accent); color: white; }
.causal-chain { display: grid; gap: 10px; }
.causal-chain p { margin: 0; min-height: 80px; padding: 14px 17px; display: grid; grid-template-columns: 28px 1fr; gap: 3px 12px; align-content: center; border-radius: 6px; background: var(--green-field); }
.causal-chain p:nth-child(2) { background: var(--warm-field); }
.causal-chain p:nth-child(3) { background: var(--blue-field); }
.causal-chain span { grid-row: 1 / span 2; color: var(--accent); font-weight: 800; }
.causal-chain strong { font: 700 20px/1.28 var(--serif); }
.causal-chain small { color: var(--muted); font-size: 14px; line-height: 1.4; }
</style>
