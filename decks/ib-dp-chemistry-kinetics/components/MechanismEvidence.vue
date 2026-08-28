<script setup lang="ts">
import { ref } from 'vue'

const evidence = [
  { label: 'Rate law', hidden: 'rate = k[NO₂][F₂]', meaning: 'Matches the reactants in the proposed slow elementary step.' },
  { label: 'Intermediate', hidden: 'F• detected transiently', meaning: 'Supports a species made in one step and consumed in another.' },
  { label: 'Overall equation', hidden: '2 NO₂ + F₂ → 2 NO₂F', meaning: 'Recovered only after the elementary equations are added.' },
]
const open = ref(evidence.map(() => false))
</script>

<template>
  <section class="evidence-spoiler">
    <article v-for="(row,index) in evidence" :key="row.label">
      <header><span>{{ row.label }}</span><button type="button" :aria-pressed="open[index]" @click="open[index]=!open[index]">{{ open[index] ? '×' : '+' }}</button></header>
      <div class="trace" :class="{ open:open[index] }"><strong>{{ row.hidden }}</strong><p>{{ row.meaning }}</p></div>
    </article>
  </section>
</template>

<style scoped>
.evidence-spoiler{display:grid;gap:11px;min-height:440px;align-content:center}.evidence-spoiler article{display:grid;grid-template-columns:200px 1fr;gap:24px;align-items:center;min-height:116px;padding:16px 20px;border-radius:var(--radius-field);background:var(--paper-deep)}.evidence-spoiler article:nth-child(2){background:var(--soft-green)}.evidence-spoiler article:nth-child(3){background:var(--soft-blue)}header{display:flex;align-items:center;justify-content:space-between;color:var(--rust);font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}header button{display:grid;place-items:center;width:28px;height:28px;border:0;border-radius:50%;background:rgba(251,250,246,.8);color:var(--rust);font-size:20px;cursor:pointer}.trace{display:grid;grid-template-columns:.72fr 1.28fr;gap:24px;align-items:center;opacity:.16;filter:blur(7px);transition:opacity var(--motion-reveal) var(--ease),filter var(--motion-reveal) var(--ease)}.trace.open{opacity:1;filter:none}.trace strong{font:500 23px/1.15 Georgia,serif}.trace p{margin:0!important;color:var(--muted)!important;font-size:15px!important}
</style>
