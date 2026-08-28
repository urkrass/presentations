<script setup lang="ts">
import { ref } from 'vue'

const evidence = [
  { id:'DNA', prompt:'What ancestry signal is carried in organelle genes?', answer:'Phylogenetic placement', detail:'Mitochondrial genes group within alphaproteobacteria; plastid genes group within cyanobacteria.' },
  { id:'70S', prompt:'Why do bacterial-type ribosomes matter?', answer:'A retained mechanism', detail:'Organelle translation resembles bacterial translation and responds to some bacterial antibiotics.' },
  { id:'2×', prompt:'What does a double membrane predict?', answer:'Engulfment topology', detail:'An engulfed cell can retain an inner bacterial membrane while gaining an outer host-derived membrane.' },
  { id:'DIV', prompt:'Why is binary-fission-like division relevant?', answer:'Continuity of a former cell', detail:'Mitochondria and plastids grow and divide from existing organelles rather than being built de novo.' },
]
const flipped = ref(new Set<string>())
function toggle(id:string){const next=new Set(flipped.value);next.has(id)?next.delete(id):next.add(id);flipped.value=next}
</script>

<template>
  <section class="endo-evidence">
    <p class="flip-prompt"><span>retrieval</span>Predict the evidential value. Turn each clue independently.</p>
    <div class="evidence-grid">
      <button v-for="item in evidence" :key="item.id" type="button" class="evidence-flip" :class="{flipped:flipped.has(item.id)}" :aria-pressed="flipped.has(item.id)" @click="toggle(item.id)">
        <span class="flip-inner">
          <span class="face front"><b>{{ item.id }}</b><strong>{{ item.prompt }}</strong><em aria-hidden="true">+</em></span>
          <span class="face back"><b>{{ item.id }}</b><strong>{{ item.answer }}</strong><span>{{ item.detail }}</span><em aria-hidden="true">×</em></span>
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.endo-evidence{display:grid;gap:15px}.flip-prompt{margin:0;color:var(--muted);font-size:15px}.flip-prompt span{margin-right:12px;color:var(--rust);font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.evidence-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px}.evidence-flip{min-height:195px;padding:0;border:0;background:transparent;color:inherit;text-align:left;cursor:pointer;perspective:1100px}.flip-inner{position:relative;display:block;width:100%;height:100%;min-height:195px;transform-style:preserve-3d;transition:transform var(--motion-flip) var(--ease)}.flipped .flip-inner{transform:rotateY(180deg)}.face{position:absolute;inset:0;padding:22px 24px;display:grid;align-content:center;gap:11px;border-radius:var(--radius-card);backface-visibility:hidden;-webkit-backface-visibility:hidden}.front{background:var(--paper-deep)}.evidence-flip:nth-child(2) .front{background:var(--soft-blue)}.evidence-flip:nth-child(3) .front{background:var(--soft-green)}.evidence-flip:nth-child(4) .front{background:var(--soft-gold)}.back{background:var(--charcoal);color:#fff;transform:rotateY(180deg)}.face b{color:var(--rust);font:500 33px/1 Georgia,serif}.front strong,.back strong{font:500 23px/1.16 Georgia,serif}.back b{color:#e9b29b}.back strong{color:#fff}.back span{color:rgba(255,255,255,.75);font-size:15px;line-height:1.4}.face em{position:absolute;right:15px;bottom:12px;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:rgba(251,250,246,.75);color:var(--green);font:700 18px/1 Georgia,serif}.back em{background:rgba(255,255,255,.12);color:#efb79f}.evidence-flip:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}.deck-reduced-motion .flip-inner{transition-duration:1ms}
</style>
