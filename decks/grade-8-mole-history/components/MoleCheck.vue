<script setup lang="ts">
// Preserve the established calm selection + anchored explanation interaction.
import QuickCheck from '../../ib-dp-a2-cells-viruses/components/QuickCheck.vue'
const props = defineProps<{ label: string; question: string; options: string[]; answer: number; explanation: string }>()
</script>
<template>
  <div class="mole-check">
    <QuickCheck v-bind="props" />
    <p class="print-answer">Answer: {{ options[answer] }}. {{ explanation }}</p>
  </div>
</template>
<style scoped>
.print-answer{display:none}
:deep(.quick-check){min-height:565px;align-content:start;grid-template-rows:22px 140px 190px 140px;gap:20px}
:deep(.scene-kicker){margin:0;font:600 14px/1.3 var(--body);color:var(--rust);text-transform:uppercase;letter-spacing:.115em}
:deep(.quick-check h2){align-self:center}
:deep(.quick-options button){font-size:20px;line-height:1.3}
:deep(.answer-slot){min-height:140px}
:deep(.check-answer),:deep(.quiet-answer){font-size:20px!important;line-height:1.35!important;min-height:140px}
@media print{.print-answer{display:block;font-size:20px!important;background:var(--soft-green);padding:16px;border-radius:8px}:deep(.answer-slot){display:none}:deep(.quick-check){min-height:0;grid-template-rows:22px 120px 180px;gap:20px}}
</style>
