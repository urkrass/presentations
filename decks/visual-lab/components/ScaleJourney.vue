<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ stage: number }>()

const levels = [
  { name: 'organism', measure: 'whole animal', image: 'images/cheetah-running.jpg', alt: 'A cheetah running across open ground', claim: 'Coordinated movement belongs to the whole organism.' },
  { name: 'organ', measure: 'signalling centre', image: 'images/brain-mri.jpg', alt: 'Sagittal MRI image of a human brain', claim: 'The nervous system integrates signals inside a real anatomical structure.' },
  { name: 'tissue', measure: 'cooperating cells', image: 'images/neuron-culture.jpg', alt: 'Fluorescence micrograph of cultured cortical neurons', claim: 'Tissue behaviour emerges from connected cells.' },
  { name: 'cell', measure: 'one signalling unit', image: 'images/neuron-culture.jpg', alt: 'Fluorescence micrograph of cultured cortical neurons', claim: 'At cell scale, one signalling unit becomes distinguishable inside the network.' },
  { name: 'receptor', measure: 'one molecular decision', image: 'images/neuron-culture.jpg', alt: 'Fluorescence micrograph of cultured neurons used as context for a conceptual receptor-scale question', claim: 'A receptor-scale event can alter the behaviour of the entire pathway.' },
]

const active = computed(() => levels[Math.max(0, Math.min(4, props.stage))])
</script>

<template>
  <section class="scale-journey" :class="stage === 4 ? 'scale-receptor' : 'scale-cinema'" :data-stage="stage" :aria-label="`Cross-scale journey focused on ${active.name}`">
    <div class="scale-rail" aria-label="Scale context">
      <div v-for="(level, index) in levels" :key="level.name" :class="{ active: index === stage, passed: index < stage }">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ level.name }}</strong>
        <small>{{ level.measure }}</small>
      </div>
    </div>

    <figure class="scale-window" :class="`stage-${stage}`">
      <img :src="active.image" :alt="active.alt" />
      <figcaption>
        <span>current window</span>
        <strong>{{ active.name }}</strong>
        <p>{{ active.claim }}</p>
      </figcaption>
      <div v-if="stage === 4" class="receptor-question">
        <span>conceptual final focus</span>
        <strong>Which boundary protein converts the stimulus into a cell signal?</strong>
      </div>
    </figure>
  </section>
</template>
