<template>
  <section class="mole-path" aria-label="Guided magnesium to magnesium oxide mass path">
    <div class="path-header">
      <p>2Mg + O₂ → 2MgO</p>
      <span>M(Mg) = 24 g mol⁻¹ · M(MgO) = 40 g mol⁻¹</span>
    </div>

    <div class="path-track">
      <template v-for="(item, index) in steps" :key="item.label">
        <div
          class="path-step"
          :class="{ visible: index <= activeStep, current: index === activeStep }"
          :aria-hidden="index > activeStep"
        >
          <span>{{ item.label }}</span>
          <strong v-html="item.value"></strong>
          <small v-html="item.operation"></small>
        </div>
        <b v-if="index < steps.length - 1" :class="{ visible: index < activeStep }">→</b>
      </template>
    </div>

    <div class="path-controls">
      <button type="button" :disabled="activeStep === 0" @click="activeStep = 0">Reset</button>
      <p aria-live="polite">{{ prompt }}</p>
      <button type="button" :disabled="activeStep === steps.length - 1" @click="activeStep += 1">Next step</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const steps = [
  { label: 'given mass', value: '12 g Mg', operation: 'start' },
  { label: 'moles Mg', value: '0.50 mol', operation: '12 ÷ 24' },
  { label: 'moles MgO', value: '0.50 mol', operation: '2 : 2 ratio' },
  { label: 'mass MgO', value: '20 g', operation: '0.50 × 40' },
]

const prompts = [
  'First move: turn the given grams into moles.',
  'Now use the Mg : MgO coefficient ratio.',
  'Convert the product moles back into grams.',
  'The path is complete: 12 g Mg forms 20 g MgO.',
]

const activeStep = ref(0)
const prompt = computed(() => prompts[activeStep.value])
</script>

<style scoped>
.mole-path {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 485px;
}

.path-header {
  align-items: baseline;
  background: var(--paper-deep);
  border-radius: var(--field-radius);
  display: flex;
  justify-content: space-between;
  padding: 0.72rem 0.9rem;
}

.path-header p {
  color: var(--ink) !important;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.8rem !important;
  margin: 0 !important;
}

.path-header span {
  color: var(--muted);
  font-size: 0.92rem;
}

.path-track {
  align-items: stretch;
  display: grid;
  grid-template-columns: 1fr 44px 1fr 44px 1fr 44px 1fr;
  padding: 2.2rem 0 1.5rem;
}

.path-step {
  background: var(--warm-field);
  border-radius: var(--field-radius);
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0.17;
  padding: 1.3rem;
  transition: opacity 180ms ease-out, background 180ms ease-out;
}

.path-step.visible {
  opacity: 1;
}

.path-step.current {
  background: var(--green-field);
}

.path-step span {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.path-step strong {
  display: block;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.05;
  margin-top: 0.72rem;
}

.path-step small {
  color: var(--muted);
  font-size: 0.88rem;
  margin-top: 0.72rem;
}

.path-track > b {
  align-items: center;
  color: var(--line);
  display: flex;
  font-size: 1.25rem;
  font-weight: 500;
  justify-content: center;
  opacity: 0.3;
}

.path-track > b.visible {
  color: var(--accent);
  opacity: 1;
}

.path-controls {
  align-items: center;
  display: grid;
  gap: 18px;
  grid-template-columns: 90px 1fr 110px;
  padding-top: 0.45rem;
}

.path-controls p {
  color: var(--muted) !important;
  font-size: 0.96rem !important;
  margin: 0 !important;
  text-align: center;
}

.path-controls button {
  background: transparent;
  border: 0;
  color: var(--accent);
  cursor: pointer;
  font-size: 0.92rem;
  padding: 0.55rem 0.65rem;
}

.path-controls button:last-child {
  background: var(--paper-deep);
  border-radius: var(--field-radius);
}

.path-controls button:disabled {
  cursor: default;
  opacity: 0.28;
}

.path-controls button:focus-visible {
  outline: 2px solid rgba(141, 63, 46, 0.45);
  outline-offset: 3px;
}
</style>
