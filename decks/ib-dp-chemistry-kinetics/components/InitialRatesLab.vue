<script setup lang="ts">
import { computed, ref } from 'vue'

const selected = ref<'A' | 'B' | null>(null)
const reveal = ref(false)
const rows = [
  { run: 1, a: 0.10, b: 0.10, rate: 2.4e-4 },
  { run: 2, a: 0.20, b: 0.10, rate: 9.6e-4 },
  { run: 3, a: 0.20, b: 0.30, rate: 2.88e-3 },
]
const prompt = computed(() => selected.value === 'A'
  ? 'Compare runs 1 and 2: [A] doubles while [B] is fixed; rate becomes four times larger.'
  : 'Compare runs 2 and 3: [B] triples while [A] is fixed; rate becomes three times larger.')
</script>

<template>
  <section class="rates-lab">
    <div class="rate-table">
      <div class="table-head"><span>Run</span><span>[A] / mol dm⁻³</span><span>[B] / mol dm⁻³</span><span>Initial rate / mol dm⁻³ s⁻¹</span></div>
      <div v-for="row in rows" :key="row.run" class="table-row"><strong>{{ row.run }}</strong><span>{{ row.a.toFixed(2) }}</span><span>{{ row.b.toFixed(2) }}</span><span>{{ row.rate.toExponential(2) }}</span></div>
    </div>
    <div class="lab-copy">
      <p class="scene-kicker">Hold one variable still</p>
      <h2>Which concentration will you isolate first?</h2>
      <div class="choice"><button type="button" :aria-pressed="selected==='A'" @click="selected='A';reveal=false">A</button><button type="button" :aria-pressed="selected==='B'" @click="selected='B';reveal=false">B</button></div>
      <p class="comparison">{{ selected ? prompt : 'Choose a pair of experiments that holds the other concentration constant.' }}</p>
      <button v-if="selected" class="reveal" type="button" @click="reveal=!reveal">{{ reveal ? 'Hide deduction' : 'Reveal deduction' }}</button>
      <div class="deduction" :class="{ available:selected, visible:reveal }" aria-live="polite"><strong>rate = k[A]²[B]</strong><span>overall order = 3</span></div>
    </div>
  </section>
</template>

<style scoped>
.rates-lab{display:grid;grid-template-columns:1.15fr .85fr;gap:42px;min-height:475px;align-items:center}.rate-table{display:grid;gap:7px}.table-head,.table-row{display:grid;grid-template-columns:.4fr .8fr .8fr 1.3fr;gap:8px;align-items:center;min-height:66px;padding:10px 15px;border-radius:var(--radius-field)}.table-head{min-height:54px;background:var(--charcoal);color:#fff;font-size:12px;font-weight:800}.table-row{background:var(--paper-deep);color:var(--charcoal);font-size:17px}.table-row:nth-child(3){background:var(--soft-green)}.table-row strong{color:var(--rust);font:500 25px/1 Georgia,serif}.lab-copy{display:grid;gap:16px}.lab-copy h2{margin:0;font:500 32px/1.13 Georgia,serif}.choice{display:grid;grid-template-columns:1fr 1fr;gap:8px}.choice button{padding:14px;border:0;border-radius:var(--radius-control);background:var(--paper-deep);color:var(--muted);font:700 18px Aptos,Arial;cursor:pointer}.choice button[aria-pressed="true"]{background:var(--blue);color:#fff}.comparison{min-height:64px;margin:0!important;color:var(--muted)!important;font-size:15px!important}.reveal{justify-self:start;padding:9px 13px;border:0;border-radius:var(--radius-control);background:var(--charcoal);color:#fff;font-weight:700;cursor:pointer}.deduction{display:grid;gap:5px;padding:16px;border-radius:var(--radius-field);background:var(--soft-rust);opacity:0;filter:blur(7px);transition:opacity var(--motion-reveal) var(--ease),filter var(--motion-reveal) var(--ease)}.deduction.available{opacity:.16}.deduction.visible{opacity:1;filter:none}.deduction strong{font:500 27px/1.1 Georgia,serif}.deduction span{color:var(--green);font-weight:750}
</style>
