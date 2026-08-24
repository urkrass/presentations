<script setup lang="ts">
import { computed, ref } from 'vue'

const steps = [
  { label: 'receptor', detail: 'nociceptor detects damaging heat' },
  { label: 'sensory neuron', detail: 'afferent impulse enters the spinal cord' },
  { label: 'interneuron', detail: 'relay inside the spinal cord' },
  { label: 'motor neuron', detail: 'efferent impulse exits the spinal cord' },
  { label: 'effector', detail: 'skeletal muscle contracts; hand withdraws' },
]

const active = ref(0)
const complete = computed(() => active.value >= steps.length)
function next() { if (!complete.value) active.value += 1 }
function reset() { active.value = 0 }
</script>

<template>
  <section class="reflex-builder" aria-live="polite">
    <div class="case-visual" aria-label="A hand approaching a hot surface">
      <div class="hot-pan"><span></span></div>
      <div class="hand" :class="{ withdrawn: active >= 5 }"><i></i><b></b></div>
      <p>{{ active >= 5 ? 'withdrawal before conscious pain' : 'damaging heat' }}</p>
    </div>
    <div class="reflex-workbench">
      <div class="pathway">
        <div v-for="(step, index) in steps" :key="step.label" class="path-step" :class="{ revealed: index < active, current: index === active && !complete }">
          <span>{{ index + 1 }}</span><strong>{{ step.label }}</strong><small>{{ index < active ? step.detail : '…' }}</small>
        </div>
      </div>
      <div class="controls">
        <p v-if="!complete">Build the reflex in signal order.</p>
        <p v-else><strong>The brain is informed, but the spinal cord can initiate withdrawal.</strong></p>
        <button v-if="!complete" type="button" @click="next">Reveal next link</button>
        <button v-else type="button" @click="reset">Build again</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reflex-builder { min-height: 400px; display: grid; grid-template-columns: 310px 1fr; gap: 34px; align-items: stretch; }
.case-visual { position: relative; overflow: hidden; border-radius: 7px; background: var(--warm-field); }
.case-visual p { position: absolute; left: 22px; bottom: 15px; margin: 0; color: var(--accent); font-weight: 800; }
.hot-pan { position: absolute; left: 42px; bottom: 92px; width: 132px; height: 56px; border-radius: 50% 50% 10px 10px; background: #555a55; }
.hot-pan::after { content: ''; position: absolute; left: 116px; top: 20px; width: 115px; height: 16px; border-radius: 0 10px 10px 0; background: #555a55; transform: rotate(-9deg); transform-origin: left center; }
.hot-pan span, .hot-pan span::before, .hot-pan span::after { position: absolute; content: ''; width: 22px; height: 56px; border-radius: 50%; border-left: 4px solid rgba(154,73,56,.65); top: -70px; }
.hot-pan span { left: 36px; }.hot-pan span::before { left: 34px; top: -4px; }.hot-pan span::after { left: 68px; top: 4px; }
.hand { position: absolute; right: 18px; top: 92px; width: 155px; height: 78px; border-radius: 46px 18px 28px 46px; background: #d7a885; transform: rotate(-18deg); transition: transform 260ms ease, top 260ms ease; }
.hand::before { content: ''; position: absolute; left: -82px; top: 17px; width: 110px; height: 45px; border-radius: 28px 0 0 28px; background: #d7a885; }
.hand i, .hand b { position: absolute; right: 5px; width: 75px; height: 17px; border-radius: 12px; background: #d7a885; transform-origin: left center; }
.hand i { top: -3px; transform: rotate(-14deg); }.hand b { bottom: -2px; transform: rotate(15deg); }
.hand.withdrawn { top: 35px; transform: translateX(70px) rotate(-42deg); }
.reflex-workbench { display: grid; grid-template-rows: 1fr auto; gap: 15px; }
.pathway { display: grid; gap: 9px; }
.path-step { min-height: 63px; padding: 12px 16px; display: grid; grid-template-columns: 30px 150px 1fr; gap: 13px; align-items: center; border-radius: 6px; background: var(--paper-deep); opacity: .48; }
.path-step.current { opacity: .8; background: var(--blue-field); }
.path-step.revealed { opacity: 1; background: var(--green-field); }
.path-step span { color: var(--accent); font-weight: 800; }.path-step strong { font: 700 18px/1.1 var(--serif); }.path-step small { color: var(--muted); font-size: 14px; }
.controls { display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: center; }
.controls p { margin: 0; color: var(--muted); }.controls strong { color: var(--accent-2); }
.controls button { border: 0; border-radius: 5px; padding: 14px 21px; background: var(--accent); color: white; font-weight: 800; cursor: pointer; }
</style>
