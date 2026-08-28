<script setup lang="ts">
import { computed, ref } from 'vue'

type CriterionKey = 'cellular' | 'metabolism' | 'reproduction' | 'evolution'

const criteria = [
  { key: 'cellular' as CriterionKey, label: 'cellular organisation' },
  { key: 'metabolism' as CriterionKey, label: 'independent metabolism' },
  { key: 'reproduction' as CriterionKey, label: 'independent reproduction' },
  { key: 'evolution' as CriterionKey, label: 'population evolution' },
]

const cases = [
  { name: 'virus', marks: { cellular: false, metabolism: false, reproduction: false, evolution: true }, note: 'Viral populations evolve, but a virion has no cell, metabolism, or independent reproduction.' },
  { name: 'bacterium', marks: { cellular: true, metabolism: true, reproduction: true, evolution: true }, note: 'A bacterium satisfies all four criteria when conditions allow growth.' },
  { name: 'dormant spore', marks: { cellular: true, metabolism: false, reproduction: false, evolution: true }, note: 'Dormancy suspends activity without erasing cellular organisation or evolutionary history.' },
  { name: 'sterile worker ant', marks: { cellular: true, metabolism: true, reproduction: false, evolution: true }, note: 'The individual cannot reproduce, yet belongs to an evolving reproductive population.' },
  { name: 'fire', marks: { cellular: false, metabolism: false, reproduction: false, evolution: false }, note: 'Fire spreads and consumes fuel, but it lacks cells, regulated metabolism, heredity, and Darwinian populations.' },
]

const active = ref<CriterionKey[]>(criteria.map(({ key }) => key))
const selected = ref(0)

function toggle(key: CriterionKey) {
  active.value = active.value.includes(key)
    ? active.value.filter(item => item !== key)
    : [...active.value, key]
}

const score = (index: number) => active.value.filter(key => cases[index].marks[key]).length
const verdict = computed(() => {
  if (!active.value.length) return 'With no criteria selected, the definition classifies nothing.'
  const count = score(selected.value)
  if (count === active.value.length) return 'This case passes your current rule—but the rule still needs testing against the others.'
  return `This case matches ${count} of ${active.value.length} selected criteria. The mismatch exposes what your definition excludes.`
})
</script>

<template>
  <section class="definition-stress">
    <header>
      <div><p class="scene-kicker">TOK workbench · category boundaries</p><h2>Build a definition, then try to break it</h2></div>
      <p>A useful rule should survive difficult cases—not merely fit the example that inspired it.</p>
    </header>

    <div class="criterion-row" aria-label="Definition criteria">
      <button v-for="criterion in criteria" :key="criterion.key" type="button" :aria-pressed="active.includes(criterion.key)" @click="toggle(criterion.key)">
        <span>{{ active.includes(criterion.key) ? 'included' : 'excluded' }}</span>{{ criterion.label }}
      </button>
    </div>

    <div class="case-row" aria-label="Cases used to stress-test the definition">
      <button v-for="(item, index) in cases" :key="item.name" type="button" :class="{ selected: selected === index }" :aria-pressed="selected === index" @click="selected = index">
        <span>{{ score(index) }}/{{ active.length }}</span><strong>{{ item.name }}</strong>
      </button>
    </div>

    <div class="definition-reading" aria-live="polite">
      <Transition name="definition-focus" mode="out-in">
        <div :key="`${selected}-${active.join('-')}`">
          <p class="reading-label">counterexample under inspection</p>
          <h3>{{ cases[selected].name }}</h3>
          <p>{{ cases[selected].note }}</p>
          <p class="verdict">{{ verdict }}</p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.definition-stress{display:grid;align-content:center;gap:17px;min-height:560px}.definition-stress header{display:grid;grid-template-columns:1.15fr .85fr;align-items:end;gap:50px}.definition-stress h2{max-width:720px;margin:0;font:500 40px/1.06 Georgia,serif}.definition-stress header>p{margin:0 0 3px!important;color:var(--muted)!important;font-size:17px!important}.criterion-row{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.criterion-row button{display:grid;gap:7px;min-height:72px;padding:12px 14px;border:0;border-radius:var(--radius-field);background:var(--paper-deep);color:var(--muted);font-weight:750;text-align:left;cursor:pointer;transition:background var(--motion-fast) var(--ease),color var(--motion-fast) var(--ease)}.criterion-row button span{color:var(--quiet);font-size:10px;letter-spacing:.08em;text-transform:uppercase}.criterion-row button[aria-pressed="true"]{background:var(--soft-green);color:var(--green)}.criterion-row button[aria-pressed="true"] span{color:var(--green)}.case-row{display:grid;grid-template-columns:repeat(5,1fr);gap:9px}.case-row button{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:48px;padding:9px 12px;border:0;border-radius:var(--radius-control);background:transparent;color:var(--muted);cursor:pointer;transition:background var(--motion-fast) var(--ease),color var(--motion-fast) var(--ease)}.case-row button span{font:500 18px/1 Georgia,serif}.case-row button strong{font-size:12px}.case-row button.selected{background:var(--charcoal);color:#fff}.definition-reading{min-height:190px}.definition-reading>div>div{box-sizing:border-box;min-height:190px;padding:22px 26px;border-radius:var(--radius-card);background:var(--soft-blue)}.reading-label{margin:0 0 6px!important;color:var(--blue)!important;font-size:10px!important;font-weight:800;letter-spacing:.09em;text-transform:uppercase}.definition-reading h3{margin:0 0 5px;font:500 31px/1 Georgia,serif;text-transform:capitalize}.definition-reading p{margin:0!important;color:var(--muted)!important;font-size:16px!important}.definition-reading .verdict{margin-top:13px!important;color:var(--ink)!important;font-family:Georgia,serif;font-size:18px!important}.definition-focus-enter-active,.definition-focus-leave-active{transition:opacity var(--motion-reveal) var(--ease),filter var(--motion-reveal) var(--ease),transform var(--motion-reveal) var(--ease)}.definition-focus-enter-from{opacity:.2;filter:blur(7px);transform:translateY(10px)}.definition-focus-leave-to{opacity:0;filter:blur(4px);transform:translateY(-6px)}
.definition-focus-enter-active,.definition-focus-leave-active{transition-duration:var(--motion-fast)}
.case-row button.selected strong,.case-row button.selected span{color:#fff!important}
.definition-reading>div{box-sizing:border-box;min-height:190px;padding:22px 26px;border-radius:var(--radius-card);background:var(--soft-blue)}
</style>
