<script setup lang="ts">
import { ref, useId } from 'vue'
defineProps<{ label: string }>()
const open = ref(false)
const id = useId()
</script>

<template>
  <div class="mole-reveal" :class="{ 'is-open': open }">
    <button class="reveal-toggle" type="button" :aria-expanded="open" :aria-controls="id" @click.stop="open = !open">
      <span>{{ label }}</span><span class="reveal-cue" aria-hidden="true">{{ open ? '×' : '+' }}</span>
    </button>
    <div :id="id" class="reveal-content"><slot /></div>
  </div>
</template>

<style scoped>
.mole-reveal{background:var(--soft-green);border-radius:var(--radius-field);padding:20px 26px;color:var(--green)}
.reveal-toggle{display:flex;justify-content:space-between;align-items:center;gap:20px;width:100%;border:0;background:transparent;padding:0;color:var(--green);text-align:left;font:600 16px/1.3 var(--body);cursor:pointer}
.reveal-cue{display:grid;place-items:center;flex:0 0 27px;height:27px;border-radius:50%;background:var(--paper);font-size:23px;font-weight:400}
.reveal-content{margin-top:10px;filter:blur(7px);opacity:.18;transition:filter var(--motion-focus) var(--ease),opacity var(--motion-focus) var(--ease);font:24px/1.35 var(--serif)}
.is-open .reveal-content{filter:none;opacity:1}
:deep(p){margin:0!important;line-height:1.35!important}
@media print{.reveal-content{filter:none!important;opacity:1!important}.reveal-cue{visibility:hidden}}
:global(html.print) .reveal-content{filter:none;opacity:1}
</style>
