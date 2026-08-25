<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { gsap } from 'gsap'
import { computed, onUnmounted, ref, watch } from 'vue'

const sourceObject = ref<HTMLObjectElement | null>(null)
const sourcePaths = ref<HTMLElement[]>([])
const sourceReady = ref(false)
const { $clicks } = useSlideContext()
const stage = computed(() => Math.max(0, Math.min(4, Number($clicks.value) || 0)))
let context: gsap.Context | null = null

const stages = [
  { heading: 'complete anatomy', copy: 'Begin with the sourced anatomy before following any route.' },
  { heading: 'sensory input', copy: 'The source figure reveals its afferent pathway from skin toward the spinal cord.' },
  { heading: 'rapid motor output', copy: 'The source figure next reveals the efferent pathway from spinal cord to muscle.' },
  { heading: 'brain informed', copy: 'A third source pathway carries information upward after the spinal response begins.' },
  { heading: 'whole reflex arc', copy: 'All three original pathways remain visible together; no route has been redrawn.' },
]

const opacityByStage = [
  [0, 0, 0],
  [1, 0, 0],
  [0.34, 1, 0],
  [0.34, 0.34, 1],
  [1, 1, 1],
]

function applyStage() {
  if (sourcePaths.value.length !== 3) return

  context?.revert()
  const duration = document.documentElement.classList.contains('lab-reduced-motion') ? 0 : 0.38
  context = gsap.context(() => {
    sourcePaths.value.forEach((path, index) => {
      gsap.to(path, {
        opacity: opacityByStage[stage.value][index],
        duration,
        ease: 'power1.out',
        overwrite: true,
      })
    })
  })
}

function prepareSource() {
  const sourceDocument = sourceObject.value?.contentDocument
  if (!sourceDocument) return

  // These are the three magenta pathways already authored in the sourced SVG.
  // Their order is afferent, efferent, then the brainward branch.
  const paths = ['path261', 'path257', 'path259']
    .map(id => sourceDocument.getElementById(id))
    .filter((path): path is HTMLElement => Boolean(path))

  if (paths.length !== 3) return
  sourcePaths.value = paths
  sourceReady.value = true
  applyStage()
}

watch(stage, applyStage)
onUnmounted(() => context?.revert())
</script>

<template>
  <section class="reflex-trace" :data-stage="stage" :data-source-ready="sourceReady" aria-label="Reflex arc source-path reveal sequence">
    <figure class="reflex-figure">
      <div class="reflex-image-window">
        <object
          ref="sourceObject"
          class="reflex-source"
          :data="'images/reflex-arc-en.svg'"
          type="image/svg+xml"
          aria-label="Scientific diagram of afferent and efferent neurons forming a reflex arc through the spinal cord"
          @load="prepareSource"
        >
          <img :src="'images/reflex-arc-en.svg'" alt="Scientific diagram of a reflex arc through the spinal cord">
        </object>
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
