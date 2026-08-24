<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type Check = {
  label: string
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

const props = defineProps<{ mode: 'centres' | 'neurons' | 'coordination' | 'autonomic' | 'ratio' }>()

const checks: Record<string, Check> = {
  centres: {
    label: 'Test 1 · control centre',
    prompt: 'A hand withdraws from a hot surface before the person reports pain. Which structure initiates the immediate motor response?',
    options: ['Cerebrum', 'Spinal cord', 'Pineal gland'],
    answer: 1,
    explanation: 'The spinal cord integrates the withdrawal reflex. The brain is informed, but conscious interpretation follows the first motor response.',
  },
  neurons: {
    label: 'Test 2 · pathway order',
    prompt: 'Which sequence correctly carries information from a skin receptor to a skeletal muscle?',
    options: [
      'sensory neuron → CNS → motor neuron',
      'motor neuron → CNS → sensory neuron',
      'CNS → sensory neuron → motor neuron',
    ],
    answer: 0,
    explanation: 'Afferent sensory input arrives at the CNS. Efferent motor output exits toward the effector.',
  },
  coordination: {
    label: 'Test 3 · apply the evidence',
    prompt: 'A gymnast can start a movement, but timing and balance corrections are poor. Which region is most directly implicated?',
    options: ['Cerebellum', 'Spinal cord', 'Pineal gland'],
    answer: 0,
    explanation: 'The cerebellum compares intended movement with sensory feedback and continuously adjusts timing, force, posture, and balance.',
  },
  autonomic: {
    label: 'Test 4 · predict the correction',
    prompt: 'Arterial pressure rises above its working range. Which autonomic change helps return it toward the set range?',
    options: [
      'Increase sympathetic output',
      'Increase parasympathetic and reduce sympathetic output',
      'Increase both outputs equally',
    ],
    answer: 1,
    explanation: 'Reduced sympathetic drive and increased parasympathetic drive slow the heart and help lower arterial pressure: negative feedback.',
  },
  ratio: {
    label: 'Test 5 · predict from a ratio',
    prompt: 'A plant tissue culture is exposed to high auxin relative to cytokinin. What outcome is most likely?',
    options: ['Root formation', 'Shoot formation', 'No cell division'],
    answer: 0,
    explanation: 'High auxin : low cytokinin favours root formation. Reversing the ratio favours shoots; a more balanced ratio favours callus.',
  },
}

const selected = ref<number | null>(null)
const current = computed(() => checks[props.mode])
const isCorrect = computed(() => selected.value === current.value.answer)

watch(() => props.mode, () => { selected.value = null })
</script>

<template>
  <section class="quick-check" aria-live="polite">
    <p class="check-label">{{ current.label }}</p>
    <h2>{{ current.prompt }}</h2>
    <div class="check-options">
      <button
        v-for="(option, index) in current.options"
        :key="option"
        type="button"
        :class="{ selected: selected === index, correct: selected !== null && index === current.answer, incorrect: selected === index && !isCorrect }"
        @click="selected = index"
      >
        <span>{{ String.fromCharCode(65 + index) }}</span>
        <strong>{{ option }}</strong>
      </button>
    </div>
    <p v-if="selected === null" class="check-result neutral">Commit to one answer, then discuss your reason.</p>
    <p v-else class="check-result" :class="isCorrect ? 'right' : 'try-again'">
      <strong>{{ isCorrect ? 'Correct.' : 'Reconsider the pathway.' }}</strong>
      {{ current.explanation }}
    </p>
  </section>
</template>

<style scoped>
.quick-check { min-height: 425px; display: grid; grid-template-rows: auto auto 1fr auto; gap: 20px; align-content: center; }
.check-label { margin: 0; color: var(--accent); font-size: 13px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.quick-check h2 { max-width: 1040px; margin: 0; color: var(--ink); font: 700 31px/1.22 var(--serif); }
.check-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; align-items: stretch; }
.check-options button { min-height: 155px; padding: 24px; display: grid; grid-template-columns: 42px 1fr; gap: 15px; align-items: center; border: 0; border-radius: 7px; background: var(--paper-deep); color: var(--ink); cursor: pointer; text-align: left; }
.check-options button:nth-child(2) { background: var(--blue-field); }
.check-options button:nth-child(3) { background: var(--green-field); }
.check-options button.selected { box-shadow: inset 0 0 0 4px var(--accent-3); }
.check-options button.correct { background: #d6e8dc; box-shadow: inset 0 0 0 4px var(--accent-2); }
.check-options button.incorrect { background: var(--red-field); box-shadow: inset 0 0 0 4px var(--accent); }
.check-options span { color: var(--accent); font: 700 31px/1 var(--serif); }
.check-options strong { font: 700 21px/1.34 var(--serif); }
.check-result { min-height: 74px; margin: 0; padding: 16px 20px; border-radius: 6px; background: var(--green-field); color: var(--charcoal); font-size: 17px; line-height: 1.45; }
.check-result strong { color: var(--accent-2); }
.check-result.neutral { display: grid; align-items: center; background: var(--warm-field); color: var(--muted); }
.check-result.try-again { background: var(--red-field); }
.check-result.try-again strong { color: var(--accent); }
</style>
