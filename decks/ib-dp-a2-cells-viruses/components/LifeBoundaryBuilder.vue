<script setup lang="ts">
import { computed, ref } from 'vue'

type Criterion = 'metabolism' | 'compartment' | 'heredity' | 'evolution' | 'autonomy'
const criteria: { id: Criterion; label: string }[] = [
  { id: 'metabolism', label: 'sustains metabolism' },
  { id: 'compartment', label: 'maintains a boundary' },
  { id: 'heredity', label: 'carries heredity' },
  { id: 'evolution', label: 'populations evolve' },
  { id: 'autonomy', label: 'acts without a host' },
]

const specimens = [
  { id: 'bennu', name: 'Bennu organics', image: 'images/bennu-sample.jpg', alt: 'Pristine asteroid Bennu sample', properties: [] as Criterion[], note: 'Ingredients without organised activity.' },
  { id: 'bacterium', name: 'E. coli cell', image: 'images/e-coli.jpg', alt: 'Scanning electron micrograph of E. coli', properties: ['metabolism', 'compartment', 'heredity', 'evolution', 'autonomy'] as Criterion[], note: 'A cellular system that maintains itself.' },
  { id: 'virus', name: 'Variola virion', image: 'images/variola.jpg', alt: 'Transmission electron micrograph of variola virions', properties: ['heredity', 'evolution'] as Criterion[], note: 'Heritable information dependent on a host cell.' },
]

const selected = ref(new Set<Criterion>(criteria.map(item => item.id)))
function toggle(id: Criterion) {
  const next = new Set(selected.value)
  next.has(id) ? next.delete(id) : next.add(id)
  selected.value = next
}

const results = computed(() => specimens.map(specimen => ({
  ...specimen,
  score: [...selected.value].filter(criterion => specimen.properties.includes(criterion)).length,
})))
const maximum = computed(() => Math.max(0, ...results.value.map(item => item.score)))
const hasCriteria = computed(() => selected.value.size > 0)
</script>

<template>
  <section class="boundary-builder">
    <div class="criterion-field" aria-label="Choose criteria for independent life">
      <p><span>Build the definition</span>Which properties must count?</p>
      <button v-for="criterion in criteria" :key="criterion.id" type="button" :class="{ active: selected.has(criterion.id) }" :aria-pressed="selected.has(criterion.id)" @click="toggle(criterion.id)">{{ criterion.label }}</button>
    </div>
    <div class="specimen-row" aria-live="polite">
      <article v-for="item in results" :key="item.id" :class="{ leader: hasCriteria && item.score === maximum }">
        <figure><img :src="item.image" :alt="item.alt" /></figure>
        <div><span>{{ item.score }} / {{ selected.size }} criteria</span><h2>{{ item.name }}</h2><p>{{ item.note }}</p></div>
      </article>
    </div>
    <p class="boundary-question">A ranking is only as defensible as the criteria that produced it.</p>
  </section>
</template>

<style scoped>
.boundary-builder{display:grid;gap:16px}.criterion-field{display:flex;align-items:center;gap:8px;min-height:66px}.criterion-field p{min-width:220px;margin:0!important;color:var(--muted);font-size:14px}.criterion-field p span{display:block;margin-bottom:4px;color:var(--rust);font-size:10px;font-weight:800;letter-spacing:.09em;text-transform:uppercase}.criterion-field button{padding:10px 12px;border:0;border-radius:var(--radius-control);background:var(--paper-deep);color:var(--muted);font-size:12px;font-weight:750;cursor:pointer;transition:background var(--motion-fast) var(--ease),color var(--motion-fast) var(--ease)}.criterion-field button.active{background:var(--green);color:#fff}.specimen-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.specimen-row article{display:grid;grid-template-rows:210px 1fr;min-height:370px;border-radius:var(--radius-card);background:rgba(243,239,231,.58);overflow:hidden;transition:background var(--motion-reveal) var(--ease),transform var(--motion-reveal) var(--ease)}.specimen-row article.leader{background:rgba(232,241,235,.82);transform:translateY(-5px)}.specimen-row figure{margin:0;overflow:hidden}.specimen-row img{display:block;width:100%;height:100%;object-fit:cover;filter:saturate(.76)}.specimen-row article>div{display:grid;align-content:center;gap:7px;padding:18px 20px}.specimen-row span{color:var(--rust);font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.specimen-row h2{margin:0;font:500 27px/1.08 Georgia,serif}.specimen-row p{margin:0;color:var(--muted);font-size:14px;line-height:1.34}.boundary-question{margin:0!important;padding:12px 16px;border-radius:var(--radius-field);background:var(--soft-blue);color:var(--blue)!important;font-family:Georgia,serif;font-size:18px!important}
</style>
