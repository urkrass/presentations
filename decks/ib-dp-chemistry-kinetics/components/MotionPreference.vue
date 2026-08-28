<script setup lang="ts">
import { onMounted, ref } from 'vue'

const storageKey = 'ib-chem-kinetics-motion-reduced'
const reduced = ref(false)

function applyPreference(value: boolean) {
  reduced.value = value
  document.documentElement.classList.toggle('deck-reduced-motion', value)
  localStorage.setItem(storageKey, value ? 'true' : 'false')
  window.dispatchEvent(new CustomEvent('deck-motion-change', { detail: { reduced: value } }))
}

function toggle() {
  applyPreference(!reduced.value)
}

onMounted(() => {
  const stored = localStorage.getItem(storageKey)
  const systemReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  applyPreference(stored === null ? systemReduced : stored === 'true')
})
</script>

<template>
  <button
    class="motion-preference"
    type="button"
    :aria-pressed="reduced"
    :aria-label="reduced ? 'Use full motion' : 'Reduce motion'"
    @click.stop="toggle"
  >
    <span aria-hidden="true">{{ reduced ? '○' : '↝' }}</span>
    {{ reduced ? 'Reduced motion' : 'Full motion' }}
  </button>
</template>

<style scoped>
.motion-preference {
  position: fixed;
  z-index: 30;
  right: 14px;
  top: 12px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border: 0;
  border-radius: var(--radius-control);
  background: rgba(251, 250, 246, .86);
  color: var(--muted);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  backdrop-filter: blur(8px);
}
.motion-preference:hover { color: var(--ink); background: rgba(251, 250, 246, .96); }
.motion-preference span { color: var(--rust); font-size: 14px; }
</style>
