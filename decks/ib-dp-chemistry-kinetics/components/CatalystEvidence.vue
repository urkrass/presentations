<script setup lang="ts">
import { ref } from 'vue'

const cards = [
  { front: 'A faster reaction', back: 'A catalyst increases rate by offering an alternative pathway with a lower activation energy.', tone: 'rust' },
  { front: 'Same equilibrium position', back: 'Forward and reverse routes are accelerated. The equilibrium constant is unchanged at fixed temperature.', tone: 'green' },
  { front: 'Recovered after reaction', back: 'It participates in elementary steps, but is regenerated. “Not used up” does not mean “does nothing.”', tone: 'blue' },
]
const flipped = ref(cards.map(() => false))
</script>

<template>
  <section class="flip-row" aria-label="Catalyst evidence cards">
    <button v-for="(card,index) in cards" :key="card.front" type="button" class="flip-card" :class="`tone-${card.tone}`" :aria-pressed="flipped[index]" @click="flipped[index] = !flipped[index]">
      <span class="flip-inner">
        <span class="face front"><span class="cue">+</span><strong>{{ card.front }}</strong><small>What must the evidence mean?</small></span>
        <span class="face back"><span class="cue">×</span><strong>{{ card.back }}</strong></span>
      </span>
    </button>
  </section>
</template>

<style scoped>
.flip-row{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;min-height:410px;align-items:center;perspective:1400px}.flip-card{min-height:310px;padding:0;border:0;border-radius:var(--radius-card);background:transparent;cursor:pointer;perspective:1000px;text-align:left}.flip-inner{position:relative;display:block;width:100%;height:310px;transform-style:preserve-3d;transition:transform var(--motion-flip) var(--ease)}.flip-card[aria-pressed="true"] .flip-inner{transform:rotateY(180deg)}.face{position:absolute;inset:0;display:grid;align-content:center;gap:15px;padding:28px;border-radius:var(--radius-card);backface-visibility:hidden;-webkit-backface-visibility:hidden}.front{background:var(--paper-deep)}.back{transform:rotateY(180deg);background:var(--charcoal);color:#fff}.tone-rust .front{background:var(--soft-rust)}.tone-green .front{background:var(--soft-green)}.tone-blue .front{background:var(--soft-blue)}.face strong{font:500 30px/1.13 Georgia,serif}.back strong{color:#fff;font-size:23px;line-height:1.28}.face small{color:var(--muted);font-size:15px}.cue{position:absolute;right:18px;bottom:15px;display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:rgba(251,250,246,.8);color:var(--rust);font-size:20px;line-height:1}.back .cue{background:rgba(255,255,255,.1);color:#fff}.flip-card:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:5px}
</style>
