<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'

const levels = [
  {
    name: 'organism',
    measure: 'whole animal',
    image: 'images/cheetah-running.jpg',
    alt: 'A cheetah running across open ground',
    claim: 'Coordinated movement belongs to the whole organism.',
  },
  {
    name: 'organ',
    measure: 'signalling centre',
    image: 'images/brain-mri.jpg',
    alt: 'Sagittal MRI image of a human brain',
    claim: 'The brain integrates signals inside a real anatomical structure.',
  },
  {
    name: 'tissue',
    measure: 'cooperating cells',
    image: 'images/neuron-culture.jpg',
    alt: 'Fluorescence micrograph of cultured cortical neurons',
    claim: 'A nervous tissue network is built from cooperating cells.',
  },
  {
    name: 'cell',
    measure: 'one signalling unit',
    image: 'images/neuron-culture.jpg',
    alt: 'Closer view of a fluorescence micrograph of cultured cortical neurons',
    claim: 'At cell scale, one signalling unit can be located inside the network.',
  },
  {
    name: 'receptor',
    measure: 'one molecular decision',
    image: 'images/neuron-culture.jpg',
    alt: 'Fluorescence micrograph of neurons used only as cellular context for a receptor-scale question',
    claim: 'The endpoint is a question, not an invented molecular picture.',
  },
]

const activeIndex = ref(0)
const inspectionWindow = ref<HTMLElement | null>(null)
let windowTween: gsap.core.Tween | null = null

const active = computed(() => levels[activeIndex.value])
const windowVisible = computed(() => activeIndex.value > 0)

function reducedMotion() {
  return document.documentElement.classList.contains('lab-reduced-motion')
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

async function selectLevel(index: number) {
  const next = Math.max(0, Math.min(levels.length - 1, index))
  if (next === activeIndex.value) return

  const wasOrganism = activeIndex.value === 0
  activeIndex.value = next
  await nextTick()

  const element = inspectionWindow.value
  if (!element) return
  windowTween?.kill()

  if (next === 0) {
    windowTween = gsap.to(element, {
      autoAlpha: 0,
      duration: reducedMotion() ? 0 : 0.24,
      ease: 'power2.in',
      scale: 0.965,
      y: 12,
    })
    return
  }

  if (reducedMotion()) {
    gsap.set(element, { autoAlpha: 1, scale: 1, y: 0 })
    return
  }

  windowTween = gsap.fromTo(
    element,
    wasOrganism
      ? { autoAlpha: 0, scale: 0.94, y: 16 }
      : { autoAlpha: 0.46, scale: 0.985, y: 0 },
    { autoAlpha: 1, duration: wasOrganism ? 0.48 : 0.3, ease: 'power3.out', scale: 1, y: 0 },
  )
}

onBeforeUnmount(() => windowTween?.kill())
</script>

<template>
  <section
    class="scale-inspector"
    :data-level="active.name"
    :data-window-state="windowVisible ? 'visible' : 'hidden'"
    aria-label="Inspect one response at five biological scales"
  >
    <figure class="scale-base">
      <img :src="levels[0].image" alt="A cheetah running across open ground" />
      <div class="scale-base-shade" aria-hidden="true" />
      <figcaption class="scale-context-caption">
        <span>context never leaves</span>
        <strong>The whole organism stays visible.</strong>
        <p>{{ activeIndex === 0 ? active.claim : `Now inspect the ${active.name} level without losing the animal.` }}</p>
      </figcaption>
    </figure>

    <nav class="scale-controls" aria-label="Choose biological scale">
      <button
        v-for="(level, index) in levels"
        :key="level.name"
        type="button"
        :class="{ active: index === activeIndex }"
        :aria-pressed="index === activeIndex"
        @click="selectLevel(index)"
      >
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ level.name }}</strong>
        <small>{{ level.measure }}</small>
      </button>
    </nav>

    <figure
      ref="inspectionWindow"
      class="scale-inspection-window"
      :class="`level-${active.name}`"
      :aria-hidden="!windowVisible"
    >
      <img :src="active.image" :alt="active.alt" />
      <div class="scale-window-shade" aria-hidden="true" />
      <figcaption>
        <span>inspection window</span>
        <strong>{{ active.name }}</strong>
        <p>{{ active.claim }}</p>
      </figcaption>
      <div v-if="active.name === 'receptor'" class="receptor-question">
        <span>conceptual endpoint</span>
        <strong>Which boundary protein converts the stimulus into a cell signal?</strong>
      </div>
    </figure>
  </section>
</template>
