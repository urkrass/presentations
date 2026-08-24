<script setup>
import { computed, ref } from 'vue'

const questions = [
  {
    label: 'Unit conversion',
    prompt: 'A sample has a mass of 0.125 kg. What is this in grams?',
    choices: ['12.5 g', '125 g', '1 250 g'],
    answer: 1,
    explanation: '1 kg = 1 000 g, so 0.125 × 1 000 = 125 g.',
  },
  {
    label: 'Mass by difference',
    prompt: 'Container + sand = 58.2 g. Empty container = 32.0 g. What is the sand’s mass?',
    choices: ['26.2 g', '26 g', '90.2 g'],
    answer: 0,
    explanation: '58.2 − 32.0 = 26.2 g. Keep the decimal place supported by both readings.',
  },
  {
    label: 'Mean',
    prompt: 'Three temperatures are 21.4 °C, 21.6 °C and 21.5 °C. What is the mean?',
    choices: ['21.0 °C', '21.5 °C', '21.6 °C'],
    answer: 1,
    explanation: '(21.4 + 21.6 + 21.5) ÷ 3 = 21.5 °C.',
  },
  {
    label: 'Apparatus choice',
    prompt: 'Which tool is the better choice for measuring about 18 mL of water?',
    choices: ['100 mL beaker', '25 mL measuring cylinder', '250 mL flask'],
    answer: 1,
    explanation: 'The 25 mL cylinder has a suitable range and finer scale divisions.',
  },
]

const index = ref(0)
const selected = ref(null)
const score = ref(0)
const finished = ref(false)
const current = computed(() => questions[index.value])

function choose(choice) {
  if (selected.value !== null) return
  selected.value = choice
  if (choice === current.value.answer) score.value += 1
}

function next() {
  if (index.value === questions.length - 1) {
    finished.value = true
    return
  }
  index.value += 1
  selected.value = null
}

function reset() {
  index.value = 0
  selected.value = null
  score.value = 0
  finished.value = false
}
</script>

<template>
  <section class="entry-check" aria-live="polite">
    <template v-if="!finished">
      <div class="entry-meta">
        <span>{{ current.label }}</span>
        <span>{{ index + 1 }} / {{ questions.length }}</span>
      </div>
      <p class="entry-prompt">{{ current.prompt }}</p>
      <div class="entry-options">
        <button
          v-for="(choice, choiceIndex) in current.choices"
          :key="choice"
          type="button"
          :class="{
            chosen: selected === choiceIndex,
            correct: selected !== null && choiceIndex === current.answer,
            incorrect: selected === choiceIndex && choiceIndex !== current.answer,
          }"
          @click="choose(choiceIndex)"
        >
          {{ choice }}
        </button>
      </div>
      <div v-if="selected !== null" class="entry-feedback">
        <strong>{{ selected === current.answer ? 'Secure connection' : 'Connection to revisit' }}</strong>
        <p>{{ current.explanation }}</p>
        <button type="button" class="entry-next" @click="next">
          {{ index === questions.length - 1 ? 'See result' : 'Next check' }}
        </button>
      </div>
    </template>
    <div v-else class="entry-result">
      <span>Diagnostic snapshot</span>
      <strong>{{ score }} / {{ questions.length }}</strong>
      <p>This is a starting point, not a grade. Note which connection needs evidence today.</p>
      <button type="button" @click="reset">Run again</button>
    </div>
  </section>
</template>

<style scoped>
.entry-check { min-height: 380px; display: grid; align-content: start; gap: 20px; }
.entry-meta { display: flex; justify-content: space-between; color: var(--accent); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; font-size: 14px; }
.entry-prompt { margin: 0; max-width: 940px; font: 600 29px/1.25 var(--sans); color: var(--ink); }
.entry-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
button { border: 0; border-radius: 6px; padding: 18px 20px; background: var(--blue-field); color: var(--ink); font: 700 18px/1.2 var(--sans); cursor: pointer; text-align: left; transition: transform .15s ease, background .15s ease; }
button:hover { transform: translateY(-2px); }
button:focus-visible { outline: 4px solid color-mix(in srgb, var(--accent) 48%, transparent); outline-offset: 3px; }
button.correct { background: var(--green-field); }
button.incorrect { background: var(--red-field); }
.entry-feedback { display: grid; grid-template-columns: 1fr auto; gap: 6px 24px; align-items: center; padding: 18px 20px; background: var(--paper-deep); border-radius: 6px; }
.entry-feedback strong { color: var(--accent-2); font-size: 19px; }
.entry-feedback p { margin: 0; font-size: 16px; }
.entry-next { grid-column: 2; grid-row: 1 / span 2; background: var(--accent); color: white; text-align: center; min-width: 144px; }
.entry-result { min-height: 360px; display: grid; place-items: center; align-content: center; gap: 12px; text-align: center; background: var(--paper-deep); border-radius: 6px; }
.entry-result span { color: var(--accent); text-transform: uppercase; letter-spacing: .12em; font-weight: 800; }
.entry-result strong { font: 700 82px/1 var(--serif); }
.entry-result p { max-width: 620px; margin: 0 0 10px; }
.entry-result button { background: var(--accent); color: white; text-align: center; }
</style>
