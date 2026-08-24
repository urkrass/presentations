<script setup lang="ts">
const stages = [
  { label: 'detect', copy: 'A receptor changes when the stimulus crosses a threshold.' },
  { label: 'relay', copy: 'The signal travels along a defined pathway.' },
  { label: 'respond', copy: 'An effector produces a measurable change.' },
]
</script>

<template>
  <section class="native-baseline" aria-label="Native Slidev signal pathway experiment">
    <div class="native-path" aria-hidden="true">
      <div
        v-for="(stage, index) in stages"
        :key="stage.label"
        v-click="index + 1"
        v-motion
        :initial="{ opacity: 0.2, y: 12 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: index * 80 } }"
        class="native-node"
      >
        <span>{{ index + 1 }}</span>
        <strong>{{ stage.label }}</strong>
      </div>
      <i class="native-signal" />
    </div>

    <VSwitch :at="0" :unmount="false" class="native-copy">
      <template #0><p>Start with the whole route visible but quiet.</p></template>
      <template #1><p><b>Detect:</b> {{ stages[0].copy }}</p></template>
      <template #2><p><b>Relay:</b> {{ stages[1].copy }}</p></template>
      <template #3><p><b>Respond:</b> {{ stages[2].copy }}</p></template>
    </VSwitch>
  </section>
</template>
