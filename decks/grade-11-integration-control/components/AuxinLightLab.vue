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
      <figcaption>Light is on the <strong>{{ lightSide }}</strong>; auxin accumulates on the <strong>{{ auxinSide }}</strong>, shaded side.</figcaption>
    </figure>
    <div class="lab-copy">
      <div class="lab-heading">
        <p class="kicker">Reverse the stimulus</p>
        <div class="light-controls" aria-label="Choose light direction">
          <button v-for="side in ['left','right']" :key="side" type="button" :class="{ active: lightSide === side }" @click="lightSide = side as any">light from {{ side }}</button>
        </div>
      </div>
      <div class="causal-path">
        <div><span>01</span><p><strong>Lateral light</strong><small>is detected at the shoot tip.</small></p></div>
        <b aria-hidden="true">↓</b>
        <div><span>02</span><p><strong>Auxin redistributes</strong><small>toward the shaded side—rather than simply being made there.</small></p></div>
        <b aria-hidden="true">↓</b>
        <div><span>03</span><p><strong>Unequal elongation</strong><small>makes the shaded side grow faster, curving the shoot toward light.</small></p></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.auxin-lab{min-height:430px;display:grid;grid-template-columns:1.02fr .98fr;gap:44px}.plant-stage{position:relative;height:430px;margin:0;overflow:hidden;border-radius:5px;background:var(--green-field)}.plant-stage img{width:100%;height:100%;object-fit:cover;object-position:center;transition:transform 280ms ease}.plant-stage.light-right img{transform:scaleX(-1)}.light-position{position:absolute;top:18px;left:18px;padding:9px 12px;border-radius:3px;background:rgba(251,250,246,.92);color:var(--accent);font-size:13px;font-weight:800;letter-spacing:.08em}.light-right .light-position{left:auto;right:18px}.plant-stage figcaption{position:absolute;left:0;right:0;bottom:0;margin:0;padding:15px 18px;background:rgba(24,32,31,.82);color:white;font-size:14px}.plant-stage figcaption strong{color:#f5cfad}.lab-copy{display:grid;align-content:center;gap:30px}.lab-heading{display:grid;gap:13px}.kicker{margin:0;color:var(--accent);font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.light-controls{display:flex;gap:22px}.light-controls button{padding:8px 0;border:0;border-bottom:3px solid transparent;background:transparent;color:var(--muted);font-weight:800;text-transform:capitalize;cursor:pointer}.light-controls button.active{color:var(--accent);border-color:var(--accent)}.causal-path{display:grid;gap:5px}.causal-path>div{display:grid;grid-template-columns:56px 1fr;gap:18px;align-items:start}.causal-path span{color:var(--accent);font:700 30px/1 var(--serif)}.causal-path p{margin:0;display:grid;gap:4px}.causal-path strong{font:700 25px/1.14 var(--serif)}.causal-path small{color:var(--muted);font-size:15px;line-height:1.4}.causal-path>b{margin-left:16px;color:var(--accent-2);font:700 23px/1 var(--serif)}
</style>
