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
  <section class="quick-check">
    <p class="scene-kicker">{{ label || 'Retrieval check' }}</p>
    <h2>{{ question }}</h2>
    <div class="quick-options">
      <button
        v-for="(option, index) in options"
        :key="option"
        type="button"
        :class="{ selected: selected === index }"
        :aria-pressed="selected === index"
        @click="selected = index"
      >
        <span>{{ String.fromCharCode(65 + index) }}</span>{{ option }}
      </button>
    </div>
    <div class="answer-slot" aria-live="polite">
      <p v-if="selected === null" class="quiet-answer">Choose first. Explain before you reveal.</p>
      <p v-else class="check-answer" :class="selected === answer ? 'correct' : 'revise'">
        <strong>{{ selected === answer ? 'Supported.' : 'Reconsider.' }}</strong> {{ explanation }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.quick-check{min-height:510px;display:grid;align-content:center;gap:20px;max-width:1080px;margin:auto}.quick-check h2{margin:0;max-width:980px;font:500 38px/1.16 Georgia,serif;color:var(--ink)}.quick-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.quick-options button{display:flex;align-items:baseline;gap:13px;min-height:74px;padding:16px 18px;border:0;border-radius:var(--radius-field);background:rgba(243,239,231,.68);color:var(--muted);font:650 18px/1.25 "Aptos","Segoe UI",Arial,sans-serif;text-align:left;cursor:pointer;transition:background var(--motion-fast) var(--ease),color var(--motion-fast) var(--ease),transform var(--motion-fast) var(--ease)}.quick-options button:nth-child(2),.quick-options button:nth-child(3){background:rgba(232,241,235,.54)}.quick-options button:hover{background:var(--soft-blue);color:var(--ink);transform:translateY(-2px)}.quick-options button.selected{background:var(--blue);color:#fff;transform:none}.quick-options span{color:var(--rust);font:800 12px/1 "Aptos","Segoe UI",Arial,sans-serif;letter-spacing:.08em}.quick-options button.selected span{color:#f1c5b3}.answer-slot{min-height:82px}.quiet-answer,.check-answer{min-height:82px;box-sizing:border-box;margin:0!important;padding:16px 18px;border-radius:var(--radius-field);color:var(--muted)!important;background:rgba(243,239,231,.65);font-size:17px!important;animation:answer-focus var(--motion-reveal) var(--ease) both}.check-answer.correct{background:var(--soft-green)}.check-answer.revise{background:var(--soft-rust)}.check-answer strong{color:var(--green)}.check-answer.revise strong{color:var(--rust)}button:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}@keyframes answer-focus{from{opacity:.25;filter:blur(7px);transform:translateY(10px)}to{opacity:1;filter:blur(0);transform:none}}
</style>
