<script setup lang="ts">
import { computed, ref } from 'vue'
import { commonFactor } from '../lib/ratios'
const counts = ref([6,12,6])
const factor = computed(() => commonFactor(counts.value))
const divide = (by: number) => { if (counts.value.every(n => n % by === 0)) counts.value = counts.value.map(n => n / by) }
const reset = () => { counts.value = [6,12,6] }
</script>
<template>
  <section class="ratio-reducer" aria-label="Reduce glucose's atom ratio" @keydown.stop @keyup.stop>
    <p class="caption">The molecule stays C₆H₁₂O₆. Only our ratio notation changes.</p>
    <div class="ratio-columns" aria-live="polite">
      <div v-for="(element,i) in ['C','H','O']" :key="element"><span>{{ element }}</span><strong>{{ counts[i] }}</strong></div>
    </div>
    <div class="ratio-actions">
      <button v-for="by in [2,3,6]" :key="by" type="button" :disabled="!counts.every(n => n % by === 0)" @click.stop="divide(by)">Divide all by {{ by }}</button>
      <button type="button" class="reset-action" @click.stop="reset">Reset</button>
    </div>
    <p class="ratio-verdict" aria-live="polite">{{ factor === 1 ? '1 : 2 : 1 — empirical formula CH₂O. The molecule has not changed.' : 'Still reducible. Find a factor shared by every number.' }}</p>
  </section>
  <p class="static-only">6 : 12 : 6 ÷ 6 = 1 : 2 : 1. Empirical formula: CH₂O. Molecular formula: C₆H₁₂O₆.</p>
</template>
