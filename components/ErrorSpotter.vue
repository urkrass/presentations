<template>
  <section class="error-spotter" aria-label="Find the first error in a stoichiometry solution">
    <div class="broken-work">
      <p class="problem">For 2Mg + O₂ → 2MgO, a student starts with 12 g Mg.</p>
      <button
        v-for="line in lines"
        :key="line.id"
        type="button"
        :class="{ selected: selected === line.id }"
        :aria-pressed="selected === line.id"
        @click="selected = line.id"
      >
        <span>{{ line.id }}</span>
        <strong v-html="line.text"></strong>
      </button>
    </div>

    <div class="diagnosis" aria-live="polite">
      <template v-if="activeLine">
        <span>{{ activeLine.id === '01' ? 'first invalid step' : 'what this line tells us' }}</span>
        <strong>{{ activeLine.title }}</strong>
        <p>{{ activeLine.feedback }}</p>
        <button type="button" class="repair-button" :aria-pressed="repairVisible" @click="repairVisible = !repairVisible">
          {{ repairVisible ? 'Hide repair' : 'Show repair' }}
        </button>
        <p v-if="repairVisible" class="repair">12 ÷ 24 = 0.50 mol Mg → 0.50 mol MgO → <strong>20 g MgO</strong></p>
      </template>
      <template v-else>
        <span>your diagnosis</span>
        <strong>Which line breaks the mole path first?</strong>
        <p>Click a line. Check both the reasoning and the units.</p>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const lines = [
  {
    id: '01',
    text: '2 Mg : 2 MgO, so <strong>12 g Mg : 12 g MgO</strong>',
    title: 'The ratio was applied to grams.',
    feedback: 'Coefficients compare mole amounts. Convert 12 g Mg into moles before using 2 : 2.',
  },
  {
    id: '02',
    text: 'M(MgO) = <strong>40 g mol<sup>−1</sup></strong>',
    title: 'The molar mass is usable data.',
    feedback: 'This value is correct, but it must multiply moles of MgO—not grams of Mg.',
  },
  {
    id: '03',
    text: 'm(MgO) = 12 × 40 = <strong>480 g</strong>',
    title: 'The units expose another problem.',
    feedback: 'g × g mol⁻¹ does not produce g. The missing mole conversion caused this error.',
  },
]

const selected = ref('')
const repairVisible = ref(false)
const activeLine = computed(() => lines.find((line) => line.id === selected.value))

watch(selected, () => {
  repairVisible.value = false
})
</script>

<style scoped>
.error-spotter {
  align-items: stretch;
  display: grid;
  gap: 38px;
  grid-template-columns: 1.06fr 0.94fr;
  min-height: 470px;
}

.broken-work {
  border-top: 2px solid var(--accent);
  display: grid;
  grid-template-rows: auto repeat(3, minmax(0, 1fr));
}

.problem {
  color: var(--muted) !important;
  font-size: 1rem !important;
  margin: 0 !important;
  padding: 0.9rem 0;
}

.broken-work > button {
  align-items: center;
  background: transparent;
  border: 0;
  border-top: 1px solid var(--line-soft);
  color: inherit;
  cursor: pointer;
  display: grid;
  gap: 18px;
  grid-template-columns: 42px 1fr;
  padding: 0.9rem 0.8rem;
  text-align: left;
}

.broken-work > button.selected {
  background: var(--rose-field);
}

.broken-work > button span {
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 800;
}

.broken-work > button strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.28rem;
  font-weight: 500;
  line-height: 1.18;
}

.broken-work > button:focus-visible,
.repair-button:focus-visible {
  outline: 2px solid rgba(141, 63, 46, 0.45);
  outline-offset: -2px;
}

.diagnosis {
  background: var(--green-field);
  border-radius: var(--field-radius);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
}

.diagnosis > span {
  color: var(--accent-2);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.diagnosis > strong {
  display: block;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.12;
  margin-top: 1rem;
}

.diagnosis > p {
  color: var(--muted) !important;
  font-size: 1rem !important;
  margin: 1rem 0 0 !important;
}

.repair-button {
  align-self: flex-start;
  background: rgba(251, 250, 246, 0.7);
  border: 0;
  border-radius: var(--field-radius);
  color: var(--accent-2);
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 1.15rem;
  padding: 0.55rem 0.75rem;
}

.diagnosis .repair {
  border-top: 1px solid rgba(73, 107, 90, 0.22);
  color: var(--ink) !important;
  margin-top: 1rem !important;
  padding-top: 0.9rem;
}
</style>
