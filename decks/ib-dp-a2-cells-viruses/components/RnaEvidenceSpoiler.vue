<script setup lang="ts">
import { ref } from 'vue'

const rows = [
  { id: '01', claim: 'Catalytic capacity', trace: 'Ribozymes catalyse cleavage, ligation, and the central peptide-bond reaction of modern translation.', status: 'direct evidence', tone: 'green' },
  { id: '02', claim: 'Evolvability', trace: 'Laboratory selection enriches RNA sequences with improved binding or catalytic activity.', status: 'proof of principle', tone: 'blue' },
  { id: '03', claim: 'Historical transition', trace: 'Long, accurate, self-sustaining RNA copying under realistic early-Earth conditions remains unresolved.', status: 'open gap', tone: 'rust' },
]

const revealed = ref(new Set<string>())
function toggle(id: string) {
  const next = new Set(revealed.value)
  next.has(id) ? next.delete(id) : next.add(id)
  revealed.value = next
}
</script>

<template>
  <section class="prediction-spoiler" aria-label="RNA world evidence and limitations">
    <div class="spoiler-head"><span>question</span><span>empirical trace or limitation</span></div>
    <div v-for="row in rows" :key="row.id" class="spoiler-row">
      <div class="claim-cell"><b>{{ row.id }}</b><strong>{{ row.claim }}</strong></div>
      <button type="button" :class="['trace-cell', row.tone, { revealed: revealed.has(row.id) }]" :aria-pressed="revealed.has(row.id)" @click="toggle(row.id)">
        <span>{{ row.trace }}</span><em>{{ row.status }}</em>
      </button>
    </div>
    <p class="spoiler-question">Which row supports chemical possibility—and which row still blocks a historical conclusion?</p>
  </section>
</template>

<style scoped>
.prediction-spoiler{display:grid;gap:8px;margin-top:14px}.spoiler-head,.spoiler-row{display:grid;grid-template-columns:.72fr 1.28fr;gap:8px}.spoiler-head{padding:0 18px 7px;color:var(--muted);font-size:11px;font-weight:800;letter-spacing:.09em;text-transform:uppercase}.spoiler-row{min-height:112px}.claim-cell{display:grid;grid-template-columns:42px 1fr;align-items:center;padding:20px;border-radius:var(--radius-field);background:rgba(243,239,231,.64)}.claim-cell b{color:var(--rust);font:500 22px/1 Georgia,serif}.claim-cell strong{font:500 24px/1.15 Georgia,serif}.trace-cell{position:relative;display:grid;align-content:center;gap:8px;padding:20px 22px;border:0;border-radius:var(--radius-field);background:rgba(232,241,235,.57);color:var(--ink);text-align:left;cursor:pointer}.trace-cell.blue{background:rgba(229,239,244,.62)}.trace-cell.rust{background:rgba(245,236,232,.69)}.trace-cell span{font-size:17px;line-height:1.35;opacity:.28;filter:blur(7px);transform:scale(.99);transition:opacity var(--motion-reveal) var(--ease),filter var(--motion-reveal) var(--ease),transform var(--motion-reveal) var(--ease)}.trace-cell em{color:var(--green);font-size:10px;font-style:normal;font-weight:800;letter-spacing:.08em;text-transform:uppercase;opacity:.42;filter:blur(5px);transition:opacity var(--motion-reveal) var(--ease),filter var(--motion-reveal) var(--ease)}.trace-cell.blue em{color:var(--blue)}.trace-cell.rust em{color:var(--rust)}.trace-cell.revealed span,.trace-cell.revealed em{opacity:1;filter:none;transform:none}.spoiler-question{margin:8px 0 0!important;padding:13px 16px;border-radius:var(--radius-field);background:var(--paper-deep);color:var(--green)!important;font-family:Georgia,serif;font-size:18px!important}@media print{.trace-cell span,.trace-cell em{opacity:1!important;filter:none!important;transform:none!important}}
</style>
