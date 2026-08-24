<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  label?: string
  question: string
  options: string[]
  answer: number
  explanation: string
}>()

const selected = ref<number | null>(null)
watch(() => props.question, () => { selected.value = null })
</script>

<template>
  <section class="quick-check" aria-live="polite">
    <p class="scene-kicker">{{ label || 'Retrieval check' }}</p>
    <h2>{{ question }}</h2>
    <div class="quick-options">
      <button
        v-for="(option, index) in options"
        :key="option"
        type="button"
        :class="{ selected: selected === index }"
        @click="selected = index"
      >
        <span>{{ String.fromCharCode(65 + index) }}</span>{{ option }}
      </button>
    </div>
    <p v-if="selected === null" class="quiet-answer">Choose first. Explain before you reveal.</p>
    <p v-else class="check-answer" :class="selected === answer ? 'correct' : 'revise'">
      <strong>{{ selected === answer ? 'Yes.' : 'Reconsider.' }}</strong> {{ explanation }}
    </p>
  </section>
</template>

<style scoped>
.quick-check{min-height:510px;display:grid;align-content:center;gap:22px;max-width:1080px;margin:auto}.quick-check h2{margin:0;max-width:980px;font:500 38px/1.16 Georgia,serif;color:var(--ink)}.quick-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 34px}.quick-options button{display:flex;align-items:baseline;gap:13px;padding:17px 0;border:0;border-bottom:2px solid color-mix(in srgb,var(--ink) 14%,transparent);background:transparent;color:var(--muted);font:650 18px/1.25 Arial,sans-serif;text-align:left;cursor:pointer}.quick-options button:hover,.quick-options button.selected{color:var(--ink);border-color:var(--blue)}.quick-options span{color:var(--rust);font:800 12px/1 Arial,sans-serif;letter-spacing:.08em}.quiet-answer,.check-answer{min-height:56px;margin:2px 0 0!important;padding:15px 18px;color:var(--muted)!important;background:var(--paper-deep);font-size:17px!important}.check-answer.correct{background:var(--soft-green)}.check-answer.revise{background:var(--soft-rust)}.check-answer strong{color:var(--green)}.check-answer.revise strong{color:var(--rust)}button:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}
</style>
