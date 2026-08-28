<script setup lang="ts">
import { ref } from 'vue'

const step = ref(0)
const stages = [
  { label: 'Overall observation', equation: '2 NO₂ + F₂ → 2 NO₂F', note: 'The overall equation hides the sequence.' },
  { label: 'Elementary step 1 · slow', equation: 'NO₂ + F₂ → NO₂F + F•', note: 'This bottleneck predicts rate ∝ [NO₂][F₂].' },
  { label: 'Elementary step 2 · fast', equation: 'NO₂ + F• → NO₂F', note: 'The reactive intermediate F• is consumed.' },
  { label: 'Mechanism test', equation: 'steps added → overall equation', note: 'Intermediates cancel; the predicted rate law can be tested.' },
]
</script>

<template>
  <section class="mechanism-stage">
    <div class="mechanism-focus" aria-live="polite">
      <p class="scene-kicker">{{ stages[step].label }}</p>
      <div class="equation">{{ stages[step].equation }}</div>
      <p>{{ stages[step].note }}</p>
      <div class="step-dots" aria-hidden="true"><span v-for="(_,index) in stages" :key="index" :class="{ active:index===step }" /></div>
    </div>
    <div class="mechanism-controls">
      <button v-for="(stage,index) in stages" :key="stage.label" type="button" :aria-pressed="index===step" @click="step=index"><span>0{{ index + 1 }}</span>{{ stage.label }}</button>
    </div>
  </section>
</template>

<style scoped>
.mechanism-stage{display:grid;grid-template-columns:1.25fr .75fr;gap:34px;min-height:470px;align-items:stretch}.mechanism-focus{display:grid;align-content:center;gap:24px;padding:45px;border-radius:var(--radius-field);background:var(--charcoal);color:#fff}.mechanism-focus .equation{font:500 45px/1.15 Georgia,serif;letter-spacing:.01em}.mechanism-focus>p:not(.scene-kicker){margin:0;color:rgba(255,255,255,.7);font-size:19px}.step-dots{display:flex;gap:7px}.step-dots span{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.18)}.step-dots .active{background:#e5ae94}.mechanism-controls{display:grid;gap:8px;align-content:center}.mechanism-controls button{display:grid;grid-template-columns:44px 1fr;gap:12px;align-items:center;min-height:72px;padding:13px 16px;border:0;border-radius:var(--radius-field);background:var(--paper-deep);color:var(--muted);font-weight:700;text-align:left;cursor:pointer}.mechanism-controls button[aria-pressed="true"]{background:var(--soft-rust);color:var(--ink)}.mechanism-controls span{color:var(--rust);font:500 21px/1 Georgia,serif}
</style>
