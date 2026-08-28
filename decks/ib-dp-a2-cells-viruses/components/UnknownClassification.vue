<script setup lang="ts">
import { gsap } from 'gsap'
import { ref } from 'vue'
import { useGsapSlideTimeline } from '../../../composables/useGsapSlideTimeline'

const root = ref<HTMLElement | null>(null)

useGsapSlideTimeline({
  root,
  steps: 3,
  build: () => {
    const timeline = gsap.timeline({ paused: true })
    const claim = root.value!.querySelector('[data-claim]')!
    const limit = root.value!.querySelector('[data-limit]')!
    const next = root.value!.querySelector('[data-next]')!
    timeline.set([claim, limit, next], { autoAlpha: 0, y: 14, filter: 'blur(7px)' })
    timeline.addLabel('step-0', 0)
    timeline.to(claim, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .58, ease: 'power2.out' })
    timeline.addLabel('step-1')
    timeline.to(limit, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .58, ease: 'power2.out' })
    timeline.addLabel('step-2')
    timeline.to(next, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .58, ease: 'power2.out' })
    timeline.addLabel('step-3')
    return timeline
  },
})
</script>

<template>
  <section ref="root" class="unknown-classification">
    <div class="unknown-brief">
      <p class="scene-kicker">Unknown X · classify from converging evidence</p>
      <h2>It crosses a 0.2 μm filter, contains RNA and protein, evolves in culture, and produces copies only in living cells.</h2>
      <div class="observations" aria-label="Observed properties">
        <span>filterable</span><span>RNA + protein</span><span>population evolves</span><span>host-dependent copying</span>
      </div>
    </div>
    <div class="reasoning-field" aria-live="polite">
      <article data-claim><span>leading claim</span><strong>Virus is the strongest current classification.</strong><p>Host-dependent reproduction, heritable RNA, and evolving populations converge.</p></article>
      <article data-limit><span>caveat</span><strong>Size is not decisive.</strong><p>Some bacteria are tiny; some viruses are giant. The filter result is supportive, not diagnostic.</p></article>
      <article data-next><span>next discriminating tests</span><strong>Capsid · host range · genome · translation dependence</strong><p>The classification remains provisional until independent observations agree.</p></article>
    </div>
    <span v-click aria-hidden="true" class="click-marker" /><span v-click aria-hidden="true" class="click-marker" /><span v-click aria-hidden="true" class="click-marker" />
  </section>
</template>

<style scoped>
.unknown-classification{display:grid;grid-template-columns:.9fr 1.1fr;gap:28px;min-height:485px}.unknown-brief{display:grid;align-content:center;gap:18px;padding:32px;border-radius:var(--radius-field);background:rgba(232,241,235,.59)}.unknown-brief h2{margin:0;font:500 34px/1.14 Georgia,serif}.observations{display:flex;flex-wrap:wrap;gap:8px}.observations span{padding:8px 11px;border-radius:var(--radius-control);background:rgba(251,250,246,.82);color:var(--green);font-size:12px;font-weight:750}.reasoning-field{display:grid;align-content:center;gap:10px}.reasoning-field article{display:grid;gap:7px;min-height:126px;padding:19px 21px;border-radius:var(--radius-field);background:var(--paper-deep);opacity:0;visibility:hidden;filter:blur(7px);transform:translateY(14px)}.reasoning-field article:nth-child(2){background:var(--soft-rust)}.reasoning-field article:nth-child(3){background:var(--soft-blue)}.reasoning-field span{color:var(--rust);font-size:10px;font-weight:800;letter-spacing:.09em;text-transform:uppercase}.reasoning-field strong{font:500 23px/1.14 Georgia,serif}.reasoning-field p{margin:0;color:var(--muted);font-size:15px;line-height:1.35}.click-marker{position:absolute;width:1px;height:1px;overflow:hidden;opacity:0}@media print{.reasoning-field article{opacity:1!important;visibility:visible!important;filter:none!important;transform:none!important}}
</style>
