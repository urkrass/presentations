<script setup lang="ts">
import { computed, ref } from 'vue'

const mode = ref<'pressure-low' | 'co2-high' | 'ethylene'>('pressure-low')
const scenarios = {
  'pressure-low': { label: 'Blood pressure falls', sensor: 'Baroreceptors detect less arterial stretch', centre: 'Medulla increases sympathetic output', effector: 'Heart output rises and vessels constrict', result: 'Pressure moves back toward its set range', feedback: 'negative' },
  'co2-high': { label: 'Blood CO₂ rises', sensor: 'Chemoreceptors detect CO₂ increase and pH decrease', centre: 'Ventilation centres in the medulla respond', effector: 'Respiratory muscles work faster', result: 'More CO₂ is expelled; pH moves back', feedback: 'negative' },
  ethylene: { label: 'Fruit begins to ripen', sensor: 'Ethylene activates ripening pathways', centre: 'Fruit cells produce more ethylene', effector: 'Softening, sweetening, colour and aroma increase', result: 'The response amplifies until ripening is complete', feedback: 'positive' },
} as const
const current = computed(() => scenarios[mode.value])
</script>

<template>
  <section class="feedback-lab">
    <div class="scenario-tabs" aria-label="Choose a biological feedback case">
      <button v-for="(item, key) in scenarios" :key="key" type="button" :class="{ active: mode === key }" @click="mode = key as any">{{ item.label }}</button>
    </div>
    <div class="loop-field" :class="current.feedback">
      <div class="loop-steps">
        <article><span>1 · disturbance</span><strong>{{ current.label }}</strong></article>
        <b aria-hidden="true">→</b>
        <article><span>2 · detection</span><strong>{{ current.sensor }}</strong></article>
        <b aria-hidden="true">→</b>
        <article><span>3 · integration</span><strong>{{ current.centre }}</strong></article>
        <b aria-hidden="true">→</b>
        <article><span>4 · response</span><strong>{{ current.effector }}</strong></article>
      </div>
      <div class="return-path">
        <span>{{ current.feedback }} feedback</span>
        <strong>{{ current.result }}</strong>
        <i aria-hidden="true">{{ current.feedback === 'negative' ? 'response opposes disturbance ↶' : 'response reinforces disturbance ↻' }}</i>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feedback-lab{display:grid;gap:24px}.scenario-tabs{display:flex;gap:28px}.scenario-tabs button{padding:8px 0;border:0;border-bottom:3px solid transparent;background:transparent;color:var(--muted);font-weight:800;cursor:pointer}.scenario-tabs button.active{color:var(--accent);border-color:var(--accent)}.loop-field{min-height:345px;padding:38px 34px 28px;display:grid;grid-template-rows:1fr auto;gap:25px;border-radius:5px;background:var(--blue-field)}.loop-field.positive{background:var(--warm-field)}.loop-steps{display:grid;grid-template-columns:repeat(7,auto);gap:14px;align-items:center}.loop-steps article{width:225px;display:grid;gap:13px}.loop-steps span,.return-path span{color:var(--accent);font-size:11px;font-weight:800;letter-spacing:.11em;text-transform:uppercase}.loop-steps strong{font:700 21px/1.25 var(--serif)}.loop-steps>b{color:var(--accent);font:700 27px/1 var(--serif)}.return-path{padding-top:19px;display:grid;grid-template-columns:165px 1fr auto;gap:22px;align-items:center}.return-path strong{font:700 21px/1.2 var(--serif)}.return-path i{color:var(--accent-2);font-size:14px;font-style:normal;font-weight:800}.positive .return-path i{color:var(--accent)}
</style>
