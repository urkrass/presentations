<template>
  <section class="diagnostic-round" aria-label="Six-question chemistry entry diagnostic">
    <header>
      <span>{{ current.skill }}</span>
      <strong>{{ activeIndex + 1 }} / {{ questions.length }}</strong>
    </header>

    <div class="question-stage">
      <p class="question-number">Question {{ activeIndex + 1 }}</p>
      <p class="question-copy" v-html="current.prompt"></p>
      <p v-if="current.given" class="given" v-html="current.given"></p>
      <div class="answer-space" :class="{ visible: answerVisible }" aria-live="polite">
        <span>answer</span>
        <strong v-html="current.answer"></strong>
        <p v-html="current.method"></p>
      </div>
    </div>

    <footer>
      <button type="button" :disabled="activeIndex === 0" @click="move(-1)">Previous</button>
      <button
        type="button"
        class="reveal"
        :aria-pressed="answerVisible"
        @click="answerVisible = !answerVisible"
      >
        {{ answerVisible ? 'Hide answer' : 'Show answer' }}
      </button>
      <button type="button" :disabled="activeIndex === questions.length - 1" @click="move(1)">Next</button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const questions = [
  {
    skill: 'mass → moles',
    prompt: 'How many moles are in <strong>36 g H<sub>2</sub>O</strong>?',
    given: 'M(H<sub>2</sub>O) = 18 g mol<sup>−1</sup>',
    answer: '2.0 mol H<sub>2</sub>O',
    method: 'n = m / M = 36 / 18',
  },
  {
    skill: 'formulae',
    prompt: 'What does <strong>CaCl<sub>2</sub></strong> say about the atoms in one formula unit?',
    given: '',
    answer: '1 Ca atom and 2 Cl atoms',
    method: 'A missing subscript means 1; the 2 belongs only to Cl.',
  },
  {
    skill: 'balancing',
    prompt: 'Choose the smallest coefficients: <strong>__ H<sub>2</sub> + __ O<sub>2</sub> → __ H<sub>2</sub>O</strong>',
    given: '',
    answer: '2, 1, 2',
    method: '2H₂ + O₂ → 2H₂O gives 4 H and 2 O atoms on each side.',
  },
  {
    skill: 'concentration',
    prompt: '<strong>0.50 mol NaCl</strong> is dissolved to make <strong>0.25 dm<sup>3</sup></strong>. Find c.',
    given: 'c = n / V',
    answer: '2.0 mol dm<sup>−3</sup>',
    method: '0.50 / 0.25 = 2.0',
  },
  {
    skill: 'dilution',
    prompt: '<strong>100 cm<sup>3</sup></strong> of 2.0 mol dm<sup>−3</sup> solution is diluted to <strong>500 cm<sup>3</sup></strong>. Find the new c.',
    given: 'c₁V₁ = c₂V₂',
    answer: '0.40 mol dm<sup>−3</sup>',
    method: '2.0 × 100 = c₂ × 500',
  },
  {
    skill: 'simple ratios',
    prompt: 'N<sub>2</sub> + 3H<sub>2</sub> → 2NH<sub>3</sub>. How much H<sub>2</sub> reacts with <strong>1 mol N<sub>2</sub></strong>? What can <strong>6 mol H<sub>2</sub></strong> form?',
    given: '',
    answer: '3 mol H₂; 4 mol NH₃',
    method: 'Use 1 : 3 : 2, then scale the complete ratio by 2.',
  },
]

const activeIndex = ref(0)
const answerVisible = ref(false)
const current = computed(() => questions[activeIndex.value])

function move(direction: number) {
  activeIndex.value = Math.min(questions.length - 1, Math.max(0, activeIndex.value + direction))
  answerVisible.value = false
}
</script>

<style scoped>
.diagnostic-round {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 486px;
}

header {
  align-items: center;
  background: var(--paper-deep);
  border-radius: var(--field-radius);
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 0.9rem;
}

header span {
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

header strong {
  color: var(--quiet);
  font-size: 0.92rem;
}

.question-stage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.3rem 0;
}

.question-number {
  color: var(--quiet) !important;
  font-size: 0.9rem !important;
  font-weight: 750;
  letter-spacing: 0.07em;
  margin-bottom: 0.85rem !important;
  text-transform: uppercase;
}

.question-copy {
  color: var(--ink) !important;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2.42rem !important;
  line-height: 1.15 !important;
  margin: 0 !important;
  max-width: 1080px;
}

.given {
  color: var(--muted) !important;
  font-size: 1.16rem !important;
  margin-top: 1rem !important;
}

.answer-space {
  background: var(--green-field);
  border-radius: var(--field-radius);
  margin-top: 1.25rem;
  min-height: 105px;
  opacity: 0;
  padding: 0.9rem 1.2rem;
  transition: opacity 180ms ease-out;
  visibility: hidden;
}

.answer-space.visible {
  opacity: 1;
  visibility: visible;
}

.answer-space span {
  color: var(--accent-2);
  display: block;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.answer-space strong {
  display: block;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.55rem;
  font-weight: 500;
  margin-top: 0.25rem;
}

.answer-space p {
  color: var(--muted) !important;
  font-size: 0.96rem !important;
  margin: 0.25rem 0 0 !important;
}

footer {
  align-items: center;
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr auto 1fr;
  padding-top: 0.45rem;
}

button {
  background: transparent;
  border: 0;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.94rem;
  padding: 0.55rem 0.7rem;
}

button:first-child { justify-self: start; }
button:last-child { justify-self: end; }

button.reveal {
  background: var(--paper-deep);
  border-radius: var(--field-radius);
  color: var(--accent);
  min-width: 142px;
}

button:disabled {
  cursor: default;
  opacity: 0.32;
}

button:focus-visible {
  outline: 2px solid rgba(141, 63, 46, 0.45);
  outline-offset: 3px;
}
</style>
