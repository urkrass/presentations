<script setup lang="ts">
import { computed, ref } from 'vue'

type Verdict = 'supported' | 'compatible' | 'overclaim'
const claims: { text: string; verdict: Verdict; explanation: string }[] = [
  { text: 'Organic molecules in Bennu show that life began in space.', verdict: 'overclaim', explanation: 'The sample supports extraterrestrial delivery of ingredients, not the presence or origin of a living system.' },
  { text: 'Ribozymes show that RNA can perform catalytic work.', verdict: 'supported', explanation: 'Catalytic RNA is directly observed. It supports chemical possibility without identifying the exact first replicator.' },
  { text: 'A double membrane is consistent with an engulfment origin for mitochondria.', verdict: 'compatible', explanation: 'The topology fits endosymbiosis, but ancestry is tested more directly by phylogenetic evidence.' },
  { text: 'A stromatolite-like shape alone identifies an ancient organism.', verdict: 'overclaim', explanation: 'Geology can also create layered forms. Context, chemistry, and comparison must converge.' },
]
const verdicts: Verdict[] = ['supported', 'compatible', 'overclaim']
const active = ref(0)
const choices = ref<(Verdict | null)[]>(claims.map(() => null))
const claim = computed(() => claims[active.value])
const choice = computed(() => choices.value[active.value])
function choose(verdict: Verdict) {
  const next = [...choices.value]
  next[active.value] = verdict
  choices.value = next
}
</script>

<template>
  <section class="claim-sorter">
    <div class="claim-navigation" aria-label="Choose a claim">
      <button v-for="(_,index) in claims" :key="index" type="button" :class="{ active: index === active, complete: choices[index] }" :aria-label="`Claim ${index + 1}`" :aria-pressed="index === active" @click="active = index">{{ String(index + 1).padStart(2, '0') }}</button>
    </div>
    <div class="claim-stage">
      <p class="scene-kicker">Act I checkpoint · classify the inference</p>
      <Transition name="claim-focus" mode="out-in"><h2 :key="active">{{ claim.text }}</h2></Transition>
      <div class="verdict-row">
        <button v-for="verdict in verdicts" :key="verdict" type="button" :class="{ selected: choice === verdict }" :aria-pressed="choice === verdict" @click="choose(verdict)">{{ verdict }}</button>
      </div>
      <div class="sorter-result" aria-live="polite">
        <Transition name="claim-focus" mode="out-in">
          <p v-if="choice" :key="`${active}-${choice}`" :class="{ correct: choice === claim.verdict }"><strong>{{ choice === claim.verdict ? 'Defensible classification.' : `A better classification is ${claim.verdict}.` }}</strong>{{ claim.explanation }}</p>
          <p v-else class="quiet">Commit first, then examine the scope of the evidence.</p>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.claim-sorter{display:grid;grid-template-columns:82px 1fr;gap:28px;min-height:500px;max-width:1080px;margin:auto}.claim-navigation{display:grid;align-content:center;gap:9px}.claim-navigation button{width:54px;height:54px;border:0;border-radius:50%;background:var(--paper-deep);color:var(--quiet);font:500 17px/1 Georgia,serif;cursor:pointer}.claim-navigation button.complete{color:var(--green)}.claim-navigation button.active{background:var(--charcoal);color:#fff}.claim-stage{display:grid;align-content:center;gap:22px}.claim-stage h2{min-height:132px;display:grid;align-items:center;margin:0;padding:26px 30px;border-radius:var(--radius-field);background:rgba(243,239,231,.64);font:500 39px/1.15 Georgia,serif}.verdict-row{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.verdict-row button{min-height:58px;border:0;border-radius:var(--radius-field);background:var(--soft-blue);color:var(--blue);font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;cursor:pointer}.verdict-row button:nth-child(2){background:var(--soft-green);color:var(--green)}.verdict-row button:nth-child(3){background:var(--soft-rust);color:var(--rust)}.verdict-row button.selected{background:var(--charcoal);color:#fff}.sorter-result{min-height:116px}.sorter-result p{box-sizing:border-box;min-height:116px;margin:0!important;padding:18px 20px;border-radius:var(--radius-field);background:var(--soft-rust);color:var(--muted)!important;font-size:16px!important;line-height:1.38}.sorter-result p.correct{background:var(--soft-green)}.sorter-result p.quiet{display:grid;align-items:center;background:var(--paper-deep)}.sorter-result strong{display:block;margin-bottom:6px;color:var(--rust)}.sorter-result .correct strong{color:var(--green)}.claim-focus-enter-active,.claim-focus-leave-active{transition:opacity var(--motion-reveal) var(--ease),filter var(--motion-reveal) var(--ease),transform var(--motion-reveal) var(--ease)}.claim-focus-enter-from{opacity:.18;filter:blur(7px);transform:translateY(10px)}.claim-focus-leave-to{opacity:0;filter:blur(5px);transform:translateY(-6px)}
.claim-focus-enter-active,.claim-focus-leave-active{transition-duration:var(--motion-fast)}
</style>
