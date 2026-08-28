<script setup lang="ts">
import { ref } from 'vue'

const items = [
  { equation: 'N₂O₅ → NO₂ + NO₃', answer: 1, label: 'unimolecular' },
  { equation: 'NO₂ + F₂ → NO₂F + F•', answer: 2, label: 'bimolecular' },
  { equation: '2 NO + O₂ → 2 NO₂', answer: 3, label: 'termolecular only if elementary' },
]
const choices = ref<(number | null)[]>(items.map(() => null))
</script>

<template>
  <section class="molecularity-sort">
    <article v-for="(item,index) in items" :key="item.equation">
      <p class="equation">{{ item.equation }}</p>
      <div class="number-choices" :aria-label="`Choose molecularity for reaction ${index+1}`"><button v-for="n in [1,2,3]" :key="n" type="button" :aria-pressed="choices[index]===n" @click="choices[index]=n">{{ n }}</button></div>
      <p class="feedback" :class="{ shown:choices[index]!==null }">{{ choices[index]===item.answer ? item.label : choices[index]===null ? 'Choose reacting particles.' : 'Count reactant particles in this elementary step.' }}</p>
    </article>
  </section>
</template>

<style scoped>
.molecularity-sort{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;min-height:430px;align-items:center}.molecularity-sort article{display:grid;align-content:center;gap:20px;min-height:300px;padding:25px;border-radius:var(--radius-card);background:var(--paper-deep)}.molecularity-sort article:nth-child(2){background:var(--soft-green)}.molecularity-sort article:nth-child(3){background:var(--soft-blue)}.equation{margin:0!important;min-height:62px;color:var(--ink)!important;font:500 25px/1.2 Georgia,serif!important}.number-choices{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.number-choices button{padding:11px;border:0;border-radius:var(--radius-control);background:rgba(251,250,246,.76);color:var(--muted);font-weight:800;cursor:pointer}.number-choices button[aria-pressed="true"]{background:var(--charcoal);color:#fff}.feedback{min-height:58px;margin:0!important;color:var(--muted)!important;font-size:14px!important;opacity:.15;filter:blur(6px);transition:opacity var(--motion-reveal) var(--ease),filter var(--motion-reveal) var(--ease)}.feedback.shown{opacity:1;filter:none}
</style>
