<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { computed, ref } from 'vue'
import { useGsapSlideTimeline } from '../composables/useGsapSlideTimeline'

gsap.registerPlugin(MotionPathPlugin)

const root = ref<HTMLElement | null>(null)
const { $clicks } = useSlideContext()
const stage = computed(() => Math.max(0, Math.min(4, Number($clicks.value) || 0)))
const stageCopy = computed(() => [
  'The balanced equation is a promise: every atom must still exist after the reaction.',
  'Count first. Four hydrogen atoms and two oxygen atoms enter the ledger.',
  'Collision changes neighbours, not identity. Watch the same six atoms converge.',
  'Bonds rearrange. No atom appears, disappears, or changes element.',
  'Two water molecules leave: H = 4 and O = 2 on both sides.',
][stage.value])

const atoms = [
  { id: 'h1', symbol: 'H', kind: 'hydrogen' },
  { id: 'h2', symbol: 'H', kind: 'hydrogen' },
  { id: 'h3', symbol: 'H', kind: 'hydrogen' },
  { id: 'h4', symbol: 'H', kind: 'hydrogen' },
  { id: 'o1', symbol: 'O', kind: 'oxygen' },
  { id: 'o2', symbol: 'O', kind: 'oxygen' },
]

const reactants: Record<string, [number, number]> = {
  h1: [78, 78], h2: [132, 78], h3: [78, 244], h4: [132, 244], o1: [410, 146], o2: [482, 146],
}
const collision: Record<string, [number, number]> = {
  h1: [258, 104], h2: [316, 138], h3: [270, 216], h4: [335, 225], o1: [324, 78], o2: [372, 188],
}
const products: Record<string, [number, number]> = {
  h1: [340, 106], h2: [430, 106], o1: [385, 158], h3: [490, 228], h4: [580, 228], o2: [535, 280],
}

useGsapSlideTimeline({
  root,
  steps: 4,
  build: () => {
    for (const atom of atoms) {
      const [x, y] = reactants[atom.id]
      gsap.set(`[data-atom="${atom.id}"]`, { x, y, scale: 1, opacity: 1 })
    }
    gsap.set('.product-halo', { opacity: 0, scale: 0.8 })
    const timeline = gsap.timeline({ paused: true, defaults: { duration: 0.6, ease: 'power2.inOut' } })
    timeline.addLabel('step-0', 0)
    timeline.to('.atom-disc', { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, stagger: 0.04 })
    timeline.addLabel('step-1')
    for (const atom of atoms) {
      const [x, y] = collision[atom.id]
      timeline.to(`[data-atom="${atom.id}"]`, {
        motionPath: { path: [{ x: reactants[atom.id][0], y: reactants[atom.id][1] }, { x, y }], curviness: 1.4 },
      }, '<')
    }
    timeline.addLabel('step-2')
    timeline.to('.atom-disc', { scale: 0.94, duration: 0.16, yoyo: true, repeat: 1, stagger: 0.025 })
    timeline.addLabel('step-3')
    for (const atom of atoms) {
      const [x, y] = products[atom.id]
      timeline.to(`[data-atom="${atom.id}"]`, { x, y, scale: 1 }, '<')
    }
    timeline.to('.product-halo', { opacity: 1, scale: 1, duration: 0.35 }, '<0.25')
    timeline.addLabel('step-4')
    return timeline
  },
})
</script>

<template>
  <section ref="root" class="particle-ledger" aria-label="Persistent atom ledger for the formation of water">
    <div class="reaction-stage">
      <div class="reaction-zones" aria-hidden="true">
        <span>reactants</span><span>products</span>
      </div>
      <i class="product-halo halo-one" /><i class="product-halo halo-two" />
      <div
        v-for="atom in atoms"
        :key="atom.id"
        class="atom-disc"
        :class="atom.kind"
        :data-atom="atom.id"
        :aria-label="`${atom.symbol} atom ${atom.id.slice(1)}`"
      >{{ atom.symbol }}</div>
    </div>

    <div class="ledger-copy">
      <p class="equation">2 H₂ + O₂ → 2 H₂O</p>
      <p class="stage-copy">{{ stageCopy }}</p>
      <div class="atom-count" aria-label="Atom conservation ledger">
        <span>hydrogen <b>4 → 4</b></span>
        <span>oxygen <b>2 → 2</b></span>
      </div>
      <p class="click-cue">click {{ stage }} / 4 · move backward to audit restoration</p>
    </div>
  </section>
</template>
