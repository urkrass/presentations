<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'

const { $clicks } = useSlideContext()
const stage = computed(() => Math.max(0, Math.min(3, Number($clicks.value) || 0)))

const stages = [
  { label: 'detect', copy: 'The eyes register a changing position.' },
  { label: 'relay', copy: 'Sensory information reaches the nervous system.' },
  { label: 'respond', copy: 'Muscles adjust stride before the next landing.' },
]
</script>

<template>
  <section class="native-baseline" :style="{ '--native-progress': stage, '--native-image': `url('images/cheetah-running.jpg')` }" :data-stage="stage" aria-label="Native Slidev signal pathway experiment">
    <figure class="native-field">
      <img :src="'images/cheetah-running.jpg'" alt="A cheetah suspended above the ground while running" />
      <div class="native-field-shade" />
      <VSwitch :at="1" :unmount="false" class="native-copy">
        <template #0><p>One still image. Three causal steps.</p></template>
        <template #1><p><b>Detect:</b> {{ stages[0].copy }}</p></template>
        <template #2><p><b>Relay:</b> {{ stages[1].copy }}</p></template>
        <template #3><p><b>Respond:</b> {{ stages[2].copy }}</p></template>
      </VSwitch>
      <div class="native-path" aria-label="Causal stages">
        <div
          v-for="(item, index) in stages"
          :key="item.label"
          v-motion
          :initial="{ opacity: 0.2, y: 12 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: index * 80 } }"
          class="native-node"
          :class="{ active: stage >= index + 1 }"
        >
          <span>0{{ index + 1 }}</span>
          <strong>{{ item.label }}</strong>
        </div>
        <i class="native-signal" />
      </div>
    </figure>
  </section>
</template>
