<script setup lang="ts">
import { computed, ref } from 'vue'

const mode = ref<'pressure-low' | 'co2-high' | 'ethylene'>('pressure-low')
const scenarios = {
  'pressure-low': { label: 'Blood pressure falls', sensor: 'Baroreceptors detect less arterial stretch', centre: 'Medulla activates sympathetic output', effector: 'Heart rate and stroke volume rise; vessels constrict', result: 'Pressure moves back toward the set range', feedback: 'negative' },
  'co2-high': { label: 'Blood CO₂ rises', sensor: 'Chemoreceptors detect CO₂ increase and pH decrease', centre: 'Ventilation centres in the medulla respond', effector: 'Diaphragm and intercostals work faster', result: 'More CO₂ is expelled; pH moves back', feedback: 'negative' },
  ethylene: { label: 'Fruit begins to ripen', sensor: 'Existing ethylene activates ripening pathways', centre: 'Fruit cells make more ethylene', effector: 'Softening, sweetening, colour and aroma increase', result: 'The response amplifies until ripening is complete', feedback: 'positive' },
} as const
const current = computed(() => scenarios[mode.value])
</script>

<template>
  <section class="feedback-lab">
    <div class="scenario-tabs">
      <button v-for="(item, key) in scenarios" :key="key" type="button" :class="{ active: mode === key }" @click="mode = key as any">{{ item.label }}</button>
    </div>
    <div class="loop-stage" :class="current.feedback">
      <div><span>change</span><strong>{{ current.label }}</strong></div>
      <b aria-hidden="true">→</b>
      <div><span>sensor</span><strong>{{ current.sensor }}</strong></div>
      <b aria-hidden="true">→</b>
      <div><span>integrator</span><strong>{{ current.centre }}</strong></div>
      <b aria-hidden="true">→</b>
      <div><span>effector</span><strong>{{ current.effector }}</strong></div>
      <p><span>{{ current.feedback }} feedback</span><strong>{{ current.result }}</strong></p>
    </div>
  </section>
</template>

<style scoped>
.feedback-lab { display: grid; gap: 16px; }
.scenario-tabs { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }.scenario-tabs button { min-height: 54px; padding: 10px 15px; border: 0; border-radius: 5px; background: var(--paper-deep); color: var(--ink); font-weight: 800; cursor: pointer; }.scenario-tabs button.active { background: var(--accent); color: white; }
.loop-stage { min-height: 335px; padding: 25px; display: grid; grid-template-columns: repeat(7,auto); gap: 10px; align-items: center; border-radius: 7px; background: var(--blue-field); }.loop-stage > div { width: 200px; min-height: 170px; padding: 18px; display: grid; align-content: center; gap: 13px; border-radius: 6px; background: rgba(255,255,255,.72); }.loop-stage > b { color: var(--accent); font: 700 26px/1 var(--serif); }.loop-stage span { color: var(--accent); font-size: 11px; font-weight: 800; letter-spacing: .11em; text-transform: uppercase; }.loop-stage strong { font: 700 17px/1.2 var(--serif); }.loop-stage > p { grid-column: 1/-1; margin: 0; min-height: 70px; padding: 15px 20px; display: grid; grid-template-columns: 170px 1fr; gap: 20px; align-items: center; border-radius: 6px; background: var(--green-field); }.loop-stage.positive > p { background: var(--warm-field); }.loop-stage > p strong { font-size: 19px; }
</style>
