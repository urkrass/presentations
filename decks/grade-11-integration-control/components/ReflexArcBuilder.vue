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
    <figure class="case-diagram">
      <img :src="'images/reflex-arc-en.jpg'" alt="Scientific diagram of a reflex arc linking skin receptor, spinal cord, and muscle" />
      <figcaption>{{ active >= 5 ? 'The spinal route has already initiated withdrawal.' : 'Trace the pathway from receptor to muscle.' }}</figcaption>
    </figure>
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
.case-diagram { margin: 0; padding: 18px; display: grid; grid-template-rows: 1fr auto; gap: 14px; overflow: hidden; border-radius: 7px; background: var(--warm-field); }
.case-diagram img { width: 100%; height: 285px; object-fit: contain; mix-blend-mode: multiply; }
.case-diagram figcaption { color: var(--accent); font-size: 14px; font-weight: 800; line-height: 1.4; }
.reflex-workbench { display: grid; grid-template-rows: 1fr auto; gap: 15px; }
.pathway { display: grid; gap: 9px; }
.path-step { min-height: 63px; padding: 12px 16px; display: grid; grid-template-columns: 30px 150px 1fr; gap: 13px; align-items: center; border-radius: 6px; background: var(--paper-deep); opacity: .48; }
.path-step.current { opacity: .8; background: var(--blue-field); }
.path-step.revealed { opacity: 1; background: var(--green-field); }
.path-step span { color: var(--accent); font-weight: 800; }.path-step strong { font: 700 18px/1.3 var(--serif); }.path-step small { color: var(--muted); font-size: 14px; line-height: 1.38; }
.controls { display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: center; }
.controls p { margin: 0; color: var(--muted); }.controls strong { color: var(--accent-2); }
.controls button { border: 0; border-radius: 5px; padding: 14px 21px; background: var(--accent); color: white; font-weight: 800; cursor: pointer; }
</style>
