<script setup lang="ts">
import { onMounted, ref } from 'vue'

const storageKey = 'visual-lab-motion-reduced'
const reduced = ref(false)

function applyPreference(value: boolean) {
  reduced.value = value
  document.documentElement.classList.toggle('lab-reduced-motion', value)
  localStorage.setItem(storageKey, value ? 'true' : 'false')
  window.dispatchEvent(new CustomEvent('visual-lab-motion-change', { detail: { reduced: value } }))
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
