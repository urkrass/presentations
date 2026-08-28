<script setup lang="ts">
import { computed, ref } from 'vue'

const candidates = [
  { id: 'A', result: 'clear lysis', active: true },
  { id: 'B', result: 'no lysis', active: false },
  { id: 'C', result: 'partial / turbid', active: false },
  { id: 'D', result: 'clear lysis', active: true },
]

const selected = ref<string[]>([])

function toggle(id: string) {
  selected.value = selected.value.includes(id)
    ? selected.value.filter(item => item !== id)
    : [...selected.value, id]
}

const reading = computed(() => {
  if (!selected.value.length) return { title: 'No cocktail selected', body: 'Choose candidates using the assay evidence, then defend what the assay cannot establish.' }
  const strong = candidates.filter(item => item.active && selected.value.includes(item.id)).map(item => item.id)
  const weak = candidates.filter(item => !item.active && selected.value.includes(item.id)).map(item => item.id)
  if (strong.length === 2 && weak.length === 0) return { title: 'A + D is the strongest assay-led choice', body: 'Two independently active phages broaden the cocktail, but this plate cannot establish safety, dosing, tissue access, or clinical benefit.' }
  if (strong.length && !weak.length) return { title: `${strong.join(' + ')} shows activity`, body: 'The choice is defensible but narrow. A single active phage may leave more opportunity for resistant variants.' }
  if (!strong.length) return { title: 'The selected phages lack clear activity', body: 'No lysis or turbid growth is weak evidence for treating this target isolate.' }
  return { title: 'The cocktail mixes strong and weak candidates', body: `Keep the clear-lysis evidence; justify why ${weak.join(' + ')} should remain despite limited activity.` }
})
</script>

<template>
  <section class="phage-matcher">
    <figure>
      <img :src="'images/acinetobacter.jpg'" alt="Scanning electron micrograph of Acinetobacter baumannii" />
      <figcaption>Acinetobacter baumannii · CDC SEM</figcaption>
    </figure>

    <div class="phage-copy">
      <p class="scene-kicker">Real case · Tom Patterson · 2016</p>
      <h2>Host specificity is both the promise and the constraint</h2>
      <p>Patterson received an emergency intravenous cocktail matched to a multidrug-resistant <em>A. baumannii</em> infection. Recovery made the case influential, not universally predictive.</p>

      <div class="assay">
        <div class="assay-heading"><strong>Choose a cocktail for this isolate</strong><span>qualitative teaching assay · not Patterson’s dataset</span></div>
        <div class="candidate-row">
          <button v-for="candidate in candidates" :key="candidate.id" type="button" :aria-pressed="selected.includes(candidate.id)" @click="toggle(candidate.id)">
            <span>phage {{ candidate.id }}</span><strong>{{ candidate.result }}</strong>
          </button>
        </div>
      </div>

      <div class="match-reading" aria-live="polite">
        <Transition name="match-focus" mode="out-in">
          <div :key="selected.slice().sort().join('-')"><strong>{{ reading.title }}</strong><p>{{ reading.body }}</p></div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.phage-matcher{display:grid;grid-template-columns:1.03fr .97fr;gap:42px;min-height:560px}.phage-matcher figure{position:relative;margin:0;height:560px;border-radius:var(--radius-field);overflow:hidden;background:#101815}.phage-matcher img{display:block;width:100%;height:100%;object-fit:cover}.phage-matcher figcaption{position:absolute;left:16px;bottom:14px;padding:7px 10px;border-radius:var(--radius-control);background:rgba(12,12,12,.72);color:#fff;font-size:10px;font-weight:750;letter-spacing:.06em;text-transform:uppercase}.phage-copy{display:grid;align-content:center;gap:12px}.phage-copy h2{margin:0;font:500 34px/1.08 Georgia,serif}.phage-copy>p:not(.scene-kicker){margin:0!important;color:var(--muted)!important;font-size:15px!important}.assay{display:grid;gap:9px;margin-top:3px}.assay-heading{display:flex;align-items:end;justify-content:space-between;gap:12px}.assay-heading strong{font:500 16px/1.2 Georgia,serif}.assay-heading span{max-width:175px;color:var(--quiet);font-size:10px;font-weight:800;letter-spacing:.07em;text-align:right;text-transform:uppercase}.candidate-row{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.candidate-row button{display:grid;gap:6px;min-height:70px;padding:10px 9px;border:0;border-radius:var(--radius-field);background:var(--paper-deep);color:var(--muted);text-align:left;cursor:pointer;transition:background var(--motion-fast) var(--ease),color var(--motion-fast) var(--ease),transform var(--motion-fast) var(--ease)}.candidate-row button span{font-size:10px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.candidate-row button strong{font-size:11px;line-height:1.2}.candidate-row button[aria-pressed="true"]{background:var(--blue);color:#fff;transform:translateY(-2px)}.match-reading{min-height:116px}.match-reading>div>div{box-sizing:border-box;min-height:116px;padding:15px 17px;border-radius:var(--radius-card);background:var(--soft-green)}.match-reading strong{font:500 19px/1.15 Georgia,serif}.match-reading p{margin:7px 0 0!important;color:var(--muted)!important;font-size:13px!important}.match-focus-enter-active,.match-focus-leave-active{transition:opacity var(--motion-reveal) var(--ease),filter var(--motion-reveal) var(--ease),transform var(--motion-reveal) var(--ease)}.match-focus-enter-from{opacity:.2;filter:blur(7px);transform:translateY(10px)}.match-focus-leave-to{opacity:0;filter:blur(4px);transform:translateY(-6px)}
.match-focus-enter-active,.match-focus-leave-active{transition-duration:var(--motion-fast)}
.candidate-row button[aria-pressed="true"] strong,.candidate-row button[aria-pressed="true"] span{color:#fff!important}
.match-reading>div{box-sizing:border-box;min-height:116px;padding:15px 17px;border-radius:var(--radius-card);background:var(--soft-green)}
</style>
