<script setup lang="ts">
import { computed, ref } from 'vue'
import { formulaCases, calculateRatio } from '../lib/ratios'
const selected = ref(0)
const scale = ref(1)
const step = ref(0)
const sample = computed(() => formulaCases[selected.value])
const result = computed(() => calculateRatio(sample.value, scale.value))
const fmt = (n: number) => Number(n.toPrecision(4)).toString()
function reset() { selected.value = 0; scale.value = 1; step.value = 0 }
</script>
<template>
  <section class="empirical-workbench" aria-label="Mass to empirical formula workbench" @keydown.stop @keyup.stop>
    <div class="bench-controls">
      <label>Teaching sample<select v-model.number="selected" @change="step=0"><option v-for="(item,i) in formulaCases" :key="item.name" :value="i">{{ item.name }}</option></select></label>
      <label>Sample size<select v-model.number="scale"><option :value="0.5">Half</option><option :value="1">Original</option><option :value="2">Double</option></select></label>
    </div>
    <table class="bench-table" aria-label="Calculation steps">
      <thead><tr><th scope="col">Quantity</th><th v-for="element in sample.elements" :key="element" scope="col">{{ element }}</th></tr></thead>
      <tbody>
        <tr><th scope="row">Mass / g</th><td v-for="(mass,i) in result.masses" :key="i">{{ fmt(mass) }}</td></tr>
        <tr><th scope="row">M / g mol⁻¹</th><td v-for="(mass,i) in sample.atomicMasses" :key="i">{{ mass }}</td></tr>
        <tr :class="{ 'step-concealed': step < 1 }"><th scope="row">Moles: m ÷ M</th><td v-for="(n,i) in result.moles" :key="i">{{ step < 1 ? '?' : fmt(n) }}</td></tr>
        <tr :class="{ 'step-concealed': step < 2 }"><th scope="row">Divide by smallest</th><td v-for="(n,i) in result.ratio" :key="i">{{ step < 2 ? '?' : fmt(n) }}</td></tr>
      </tbody>
    </table>
    <div class="bench-conclusion" aria-live="polite">
      <template v-if="step === 3"><strong>{{ sample.formula }}</strong><span>{{ sample.multiplier === 2 ? 'Multiply the entire ratio by 2: 2 : 3.' : 'The ratio is already whole and simplest.' }} Sample size changes the masses—not the formula.</span></template>
      <template v-else><strong>{{ ['Mass','Moles','Ratio'][step] }}</strong><span>{{ ['Predict: if this sample doubles, will its formula change?','These amounts count atoms on the same scale.','Keep a 1.5 ratio for now. Do not round it to 2.'][step] }}</span></template>
    </div>
    <div class="ratio-actions">
      <button type="button" :disabled="step===3" @click.stop="step++">Next step</button>
      <button type="button" :disabled="step===0" @click.stop="step--">Previous step</button>
      <button type="button" class="reset-action" @click.stop="reset">Reset</button>
    </div>
  </section>
  <div class="static-only"><h2>Same method, different compounds</h2><p>Mg: 0.24 ÷ 24 = 0.010 mol. O: 0.16 ÷ 16 = 0.010 mol. Ratio 1 : 1 → MgO.</p><p>Fe: 5.6 ÷ 56 = 0.100 mol. O: 2.4 ÷ 16 = 0.150 mol. Ratio 1 : 1.5 → 2 : 3 → Fe₂O₃.</p><p>Doubling every mass doubles every amount; the ratio stays unchanged.</p></div>
</template>
