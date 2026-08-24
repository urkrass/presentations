<script setup>
import { computed, ref } from 'vue'

const cards = [
  { text: 'Bubbles appear around the tablet.', kind: 'observation' },
  { text: 'The temperature falls from 22 °C to 17 °C.', kind: 'measurement' },
  { text: 'A gas is being produced.', kind: 'inference' },
  { text: 'The tablet is smaller after 30 seconds.', kind: 'observation' },
  { text: 'The change takes in thermal energy from the water.', kind: 'inference' },
  { text: 'The tablet disappears after 84 s.', kind: 'measurement' },
]

const index = ref(0)
const choice = ref(null)
const score = ref(0)
const finished = computed(() => index.value >= cards.length)
const current = computed(() => cards[index.value])

function sort(kind) {
  if (choice.value || finished.value) return
  choice.value = kind
  if (kind === current.value.kind) score.value += 1
}

function next() {
  index.value += 1
  choice.value = null
}

function reset() {
  index.value = 0
  choice.value = null
  score.value = 0
}
</script>

<template>
  <section class="evidence-sort" aria-live="polite">
    <template v-if="!finished">
      <div class="sort-card">
        <span>Statement {{ index + 1 }} of {{ cards.length }}</span>
        <strong>{{ current.text }}</strong>
      </div>
      <div class="sort-targets">
        <button v-for="kind in ['observation', 'measurement', 'inference']" :key="kind" type="button" :class="{ selected: choice === kind, answer: choice && current.kind === kind }" @click="sort(kind)">
          {{ kind }}
        </button>
      </div>
      <div v-if="choice" class="sort-feedback">
        <strong>{{ choice === current.kind ? 'Yes.' : `This is ${current.kind}.` }}</strong>
        <p>{{ current.kind === 'observation' ? 'It describes a directly noticed feature.' : current.kind === 'measurement' ? 'It records a number with a unit or time.' : 'It explains what the evidence may mean.' }}</p>
        <button type="button" @click="next">Next statement</button>
      </div>
    </template>
    <div v-else class="sort-result">
      <span>Evidence language</span>
      <strong>{{ score }} / {{ cards.length }}</strong>
      <p>A strong conclusion keeps observations, measurements, and inferences connected but distinct.</p>
      <button type="button" @click="reset">Sort again</button>
    </div>
  </section>
</template>

<style scoped>
.evidence-sort { min-height: 390px; display: grid; align-content: center; gap: 18px; }
.sort-card { min-height: 150px; border-radius: 6px; background: var(--paper-deep); padding: 28px 34px; display: grid; align-content: center; gap: 10px; }
.sort-card span { color: var(--accent); text-transform: uppercase; letter-spacing: .12em; font-weight: 800; font-size: 14px; }
.sort-card strong { font: 700 34px/1.2 var(--serif); }
.sort-targets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
button { border: 0; border-radius: 5px; padding: 17px; background: var(--blue-field); color: var(--ink); font: 800 17px/1 var(--sans); text-transform: capitalize; cursor: pointer; }
button.selected { background: var(--red-field); }
button.answer { background: var(--green-field); }
button:focus-visible { outline: 4px solid color-mix(in srgb, var(--accent) 48%, transparent); outline-offset: 3px; }
.sort-feedback { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 5px 20px; padding: 18px 22px; background: var(--warm-field); border-radius: 6px; }
.sort-feedback strong { color: var(--accent-2); }
.sort-feedback p { margin: 0; }
.sort-feedback button { grid-column: 2; grid-row: 1 / span 2; background: var(--accent); color: white; }
.sort-result { min-height: 330px; display: grid; place-items: center; align-content: center; gap: 12px; background: var(--paper-deep); border-radius: 6px; text-align: center; }
.sort-result span { color: var(--accent); text-transform: uppercase; letter-spacing: .12em; font-weight: 800; }
.sort-result strong { font: 700 80px/1 var(--serif); }
.sort-result p { max-width: 640px; margin: 0 0 8px; }
.sort-result button { background: var(--accent); color: white; }
</style>
