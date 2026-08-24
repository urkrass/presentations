<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'

const { $clicks } = useSlideContext()
const stage = computed(() => Math.max(0, Math.min(3, Number($clicks.value) || 0)))

const stages = [
  { label: 'detect', copy: 'A receptor changes when the stimulus crosses a threshold.' },
  { label: 'relay', copy: 'The signal travels along a defined pathway.' },
  { label: 'respond', copy: 'An effector produces a measurable change.' },
]
</script>

<template>
  <section class="native-baseline" :style="{ '--native-progress': stage }" aria-label="Native Slidev signal pathway experiment">
    <div class="native-path" aria-hidden="true">
      <div
        v-for="(item, index) in stages"
        :key="item.label"
        v-motion
        :initial="{ opacity: 0.2, y: 12 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: index * 80 } }"
        class="native-node"
        :class="{ active: stage >= index + 1 }"
      >
        <span>{{ index + 1 }}</span>
        <strong>{{ item.label }}</strong>
      </div>
      <i class="native-signal" />
    </div>

    <VSwitch :at="1" :unmount="false" class="native-copy">
      <template #0><p>Start with the whole route visible but quiet.</p></template>
      <template #1><p><b>Detect:</b> {{ stages[0].copy }}</p></template>
      <template #2><p><b>Relay:</b> {{ stages[1].copy }}</p></template>
      <template #3><p><b>Respond:</b> {{ stages[2].copy }}</p></template>
    </VSwitch>
  </section>
</template>
