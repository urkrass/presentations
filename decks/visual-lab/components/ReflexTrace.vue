<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { gsap } from 'gsap'
import { computed, ref } from 'vue'
import { useGsapSlideTimeline } from '../composables/useGsapSlideTimeline'

const root = ref<HTMLElement | null>(null)
const { $clicks } = useSlideContext()
const stage = computed(() => Math.max(0, Math.min(4, Number($clicks.value) || 0)))

const stages = [
  { heading: 'ready', copy: 'Begin with the complete sourced figure visible.' },
  { heading: 'sensory input', copy: 'The afferent nerve carries information from the skin toward the spinal cord.' },
  { heading: 'spinal relay', copy: 'The spinal cord connects sensory input to a rapid motor output.' },
  { heading: 'motor output', copy: 'The efferent nerve carries the command toward the muscle.' },
  { heading: 'brain informed', copy: 'Other neurons also carry information upward after the spinal response has begun.' },
]

useGsapSlideTimeline({
  root,
  steps: 4,
  build: () => {
    gsap.set('.reflex-source', { x: 0, y: 0, scale: 1, transformOrigin: 'center center' })
    return gsap.timeline({ paused: true, defaults: { duration: 0.72, ease: 'power2.inOut' } })
      .addLabel('step-0', 0)
      .to('.reflex-source', { x: 24, y: 12, scale: 1.08 })
      .addLabel('step-1')
      .to('.reflex-source', { x: -24, y: 0, scale: 1.08 })
      .addLabel('step-2')
      .to('.reflex-source', { x: 16, y: -12, scale: 1.08 })
      .addLabel('step-3')
      .to('.reflex-source', { x: 0, y: 0, scale: 1 })
      .addLabel('step-4')
  },
})
</script>

<template>
  <section ref="root" class="reflex-trace" :data-stage="stage" aria-label="Reflex arc image-focus sequence">
    <figure class="reflex-figure">
      <div class="reflex-image-window">
        <img class="reflex-source" :src="'images/reflex-arc-en.svg'" alt="Scientific diagram of afferent and efferent neurons forming a reflex arc through the spinal cord" />
      </div>
      <figcaption class="reflex-readout">
        <div>
          <span>stage {{ stage }} / 4</span>
          <strong>{{ stages[stage].heading }}</strong>
        </div>
        <p>{{ stages[stage].copy }}</p>
        <ol class="reflex-sequence" aria-label="Reflex stages">
          <li v-for="(item, index) in stages.slice(1)" :key="item.heading" :class="{ reached: stage >= index + 1 }">{{ item.heading }}</li>
        </ol>
      </figcaption>
    </figure>
  </section>
</template>
