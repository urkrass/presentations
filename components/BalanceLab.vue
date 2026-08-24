<template>
  <section class="balance-lab" aria-label="Interactive equation balancing lab">
    <div class="equation-stage">
      <CoefficientControl label="hydrogen coefficient" :value="h2" @change="h2 = $event" />
      <span class="species">H<sub>2</sub></span>
      <b>+</b>
      <CoefficientControl label="oxygen coefficient" :value="o2" @change="o2 = $event" />
      <span class="species">O<sub>2</sub></span>
      <b>→</b>
      <CoefficientControl label="water coefficient" :value="h2o" @change="h2o = $event" />
      <span class="species">H<sub>2</sub>O</span>
    </div>

    <div class="atom-ledger" :class="{ balanced }">
      <div>
        <span>hydrogen</span>
        <strong>{{ leftHydrogen }}</strong>
        <b :class="{ match: leftHydrogen === rightHydrogen }">{{ leftHydrogen === rightHydrogen ? '=' : '≠' }}</b>
        <strong>{{ rightHydrogen }}</strong>
      </div>
      <div>
        <span>oxygen</span>
        <strong>{{ leftOxygen }}</strong>
        <b :class="{ match: leftOxygen === rightOxygen }">{{ leftOxygen === rightOxygen ? '=' : '≠' }}</b>
        <strong>{{ rightOxygen }}</strong>
      </div>
    </div>

    <p class="status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, ref } from 'vue'

const h2 = ref(1)
const o2 = ref(1)
const h2o = ref(1)

const leftHydrogen = computed(() => h2.value * 2)
const rightHydrogen = computed(() => h2o.value * 2)
const leftOxygen = computed(() => o2.value * 2)
const rightOxygen = computed(() => h2o.value)
const balanced = computed(() => leftHydrogen.value === rightHydrogen.value && leftOxygen.value === rightOxygen.value)
const simplest = computed(() => h2.value === 2 && o2.value === 1 && h2o.value === 2)
const status = computed(() => {
  if (simplest.value) return 'Balanced in the smallest whole-number ratio: 2 : 1 : 2.'
  if (balanced.value) return 'Balanced. Can the coefficients be reduced?'
  return 'Adjust coefficients until both atom counts match.'
})

const CoefficientControl = defineComponent({
  props: {
    label: { type: String, required: true },
    value: { type: Number, required: true },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const update = (next: number) => emit('change', Math.min(6, Math.max(1, next)))
    return () => h('span', { class: 'coefficient-control' }, [
      h('button', {
        type: 'button',
        'aria-label': `Decrease ${props.label}`,
        disabled: props.value <= 1,
        onClick: () => update(props.value - 1),
      }, '−'),
      h('strong', { 'aria-live': 'polite' }, String(props.value)),
      h('button', {
        type: 'button',
        'aria-label': `Increase ${props.label}`,
        disabled: props.value >= 6,
        onClick: () => update(props.value + 1),
      }, '+'),
    ])
  },
})
</script>

<style scoped>
.balance-lab {
  display: grid;
  grid-template-rows: 1fr auto auto;
  min-height: 480px;
}

.equation-stage {
  align-items: center;
  background: var(--warm-field);
  border-radius: var(--field-radius);
  display: flex;
  justify-content: center;
  min-height: 245px;
  padding: 1.5rem;
}

.species {
  color: var(--ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 3.55rem;
  line-height: 1;
}

.equation-stage > b {
  color: var(--accent);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2.3rem;
  font-weight: 500;
  margin: 0 1.2rem;
}

:deep(.coefficient-control) {
  align-items: center;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.18rem;
  margin-right: 0.18rem;
}

:deep(.coefficient-control strong) {
  color: var(--accent);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 3.55rem;
  font-weight: 500;
  line-height: 1;
}

:deep(.coefficient-control button) {
  align-items: center;
  background: rgba(251, 250, 246, 0.78);
  border: 0;
  border-radius: 999px;
  color: var(--accent);
  cursor: pointer;
  display: inline-flex;
  font-size: 0.98rem;
  height: 1.45rem;
  justify-content: center;
  line-height: 1;
  padding: 0;
  width: 1.45rem;
}

:deep(.coefficient-control button:disabled) {
  opacity: 0.25;
}

:deep(.coefficient-control button:focus-visible) {
  outline: 2px solid rgba(141, 63, 46, 0.45);
  outline-offset: 2px;
}

.atom-ledger {
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1.15rem;
}

.atom-ledger > div {
  align-items: center;
  border-left: 1px solid var(--line-soft);
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr auto auto auto;
  min-height: 78px;
  padding: 0 1.2rem;
}

.atom-ledger > div:first-child {
  border-left: 0;
}

.atom-ledger span {
  color: var(--muted);
  font-size: 1rem;
}

.atom-ledger strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.65rem;
  font-weight: 500;
}

.atom-ledger b {
  color: var(--accent);
  font-size: 1.2rem;
}

.atom-ledger b.match {
  color: var(--accent-2);
}

.status {
  color: var(--muted) !important;
  font-size: 1.02rem !important;
  margin: 0.8rem 0 0 !important;
  text-align: center;
}

.balanced + .status {
  color: var(--accent-2) !important;
}
</style>
