<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { computed, ref } from 'vue'
import { useGsapSlideTimeline } from '../composables/useGsapSlideTimeline'

gsap.registerPlugin(DrawSVGPlugin)

const root = ref<HTMLElement | null>(null)
const { $clicks } = useSlideContext()
const stage = computed(() => Math.max(0, Math.min(4, Number($clicks.value) || 0)))
const labels = ['ready', 'receptor fires', 'spinal relay', 'muscle withdraws', 'brain receives']

useGsapSlideTimeline({
  root,
  steps: 4,
  build: () => gsap.timeline({ paused: true })
    .set('.trace-path', { drawSVG: '0%' })
    .set('.trace-node', { scale: 0.82, transformOrigin: 'center' })
    .addLabel('step-0', 0)
    .to('.node-receptor', { scale: 1.18, duration: 0.22, yoyo: true, repeat: 1 })
    .to('.trace-sensory', { drawSVG: '100%', duration: 0.7, ease: 'none' }, '<')
    .addLabel('step-1')
    .to('.node-spine', { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1 })
    .to('.trace-inter', { drawSVG: '100%', duration: 0.38, ease: 'none' }, '<')
    .addLabel('step-2')
    .to('.trace-motor', { drawSVG: '100%', duration: 0.68, ease: 'none' })
    .to('.node-muscle', { scale: 1.18, duration: 0.2, yoyo: true, repeat: 1 }, '<0.52')
    .addLabel('step-3')
    .to('.trace-brain', { drawSVG: '100%', duration: 0.95, ease: 'none' })
    .to('.node-brain', { scale: 1.18, duration: 0.2, yoyo: true, repeat: 1 }, '<0.78')
    .addLabel('step-4'),
})
</script>

<template>
  <section ref="root" class="reflex-trace" aria-label="Reflex arc signal trace">
    <svg viewBox="0 0 830 390" role="img" aria-label="Signal travels from skin receptor to spinal cord, then to muscle before the later branch reaches the brain">
      <path class="trace-guide" d="M90 270 C200 180 285 190 365 242" />
      <path class="trace-guide" d="M365 242 C500 310 620 315 744 254" />
      <path class="trace-guide" d="M365 242 C430 178 500 100 611 72" />
      <path class="trace-path trace-sensory" d="M90 270 C200 180 285 190 365 242" />
      <path class="trace-path trace-inter" d="M365 242 C392 232 412 238 430 254" />
      <path class="trace-path trace-motor" d="M430 254 C540 318 650 305 744 254" />
      <path class="trace-path trace-brain" d="M365 242 C430 178 500 100 611 72" />

      <g class="trace-node node-receptor" transform="translate(86 270)"><circle r="30" /><text y="5">1</text></g>
      <g class="trace-node node-spine" transform="translate(397 247)"><circle r="42" /><text y="5">2</text></g>
      <g class="trace-node node-muscle" transform="translate(750 250)"><circle r="34" /><text y="5">3</text></g>
      <g class="trace-node node-brain" transform="translate(622 69)"><circle r="38" /><text y="5">4</text></g>

      <text class="trace-label" x="38" y="335">skin receptor</text>
      <text class="trace-label" x="335" y="330">spinal cord</text>
      <text class="trace-label" x="690" y="326">arm muscle</text>
      <text class="trace-label" x="565" y="20">brain</text>
      <text class="trace-note" x="515" y="360">withdrawal pathway</text>
      <text class="trace-note" x="452" y="120">later ascending branch</text>
    </svg>
    <div class="reflex-readout">
      <span>signal state</span>
      <strong>{{ labels[stage] }}</strong>
      <p v-if="stage < 3">The response pathway is still being assembled.</p>
      <p v-else-if="stage === 3">The spinal route can initiate withdrawal before conscious awareness.</p>
      <p v-else>The ascending branch informs the brain after the rapid protective route is already active.</p>
    </div>
  </section>
</template>
