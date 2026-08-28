<script setup lang="ts">
import { computed, ref } from 'vue'

const states = [
  {label:'rapidly growing host · low coinfection', outcome:'Lytic development becomes more likely', detail:'λ genes are expressed, genomes are copied, virions assemble, and the host lyses. “More likely” matters: this is a probabilistic regulatory decision.'},
  {label:'starved host · several phages enter', outcome:'Lysogeny becomes more likely', detail:'The λ genome integrates as a prophage and is copied with the host chromosome. High multiplicity of infection and poor host growth favour this route.'},
  {label:'DNA damage in a lysogen', outcome:'The prophage can be induced into lytic development', detail:'Host DNA-damage signalling removes repression of the lytic program. A stable state is reversible when the environment changes.'},
]
const active=ref(0)
const state=computed(()=>states[active.value])
</script>

<template>
  <section class="lambda-scene">
    <figure><img :src="'images/phages.jpg'" alt="Transmission electron micrograph of bacteriophages attached to a bacterium" /><figcaption>Real phages on a bacterial cell wall</figcaption></figure>
    <div class="lambda-copy">
      <p class="scene-kicker">λ is a genetic switch, not a two-arrow cartoon</p>
      <div class="lambda-outcome" aria-live="polite">
        <Transition name="state-focus" mode="out-in">
          <div :key="active" class="lambda-state">
            <span>{{ String(active + 1).padStart(2, '0') }} · environmental state</span>
            <h2>{{ state.outcome }}</h2>
            <p>{{ state.detail }}</p>
          </div>
        </Transition>
      </div>
      <div class="lambda-switcher" aria-label="Choose host and infection conditions"><button v-for="(item,index) in states" :key="item.label" type="button" :class="{active:index===active}" :aria-pressed="index===active" @click="active=index"><b>{{ index + 1 }}</b><span>{{ item.label }}</span></button></div>
    </div>
  </section>
</template>

<style scoped>
.lambda-scene{display:grid;grid-template-columns:1.16fr .84fr;gap:42px;min-height:500px}.lambda-scene figure{position:relative;margin:0;height:500px;overflow:hidden;background:#151515;border-radius:var(--radius-field)}.lambda-scene img{width:100%;height:100%;object-fit:cover;object-position:center}.lambda-scene figcaption{position:absolute;left:18px;bottom:15px;border-radius:var(--radius-control);background:rgba(0,0,0,.67);color:#fff;padding:8px 11px;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.lambda-copy{display:grid;align-content:center;gap:16px}.lambda-outcome{min-height:238px;display:grid;align-items:center;padding:24px;border-radius:var(--radius-field);background:rgba(243,239,231,.64);overflow:hidden}.lambda-state{display:grid;gap:13px}.lambda-state>span{color:var(--rust);font-size:11px;font-weight:800;letter-spacing:.09em;text-transform:uppercase}.lambda-state h2{margin:0;font:500 34px/1.14 Georgia,serif;color:var(--ink)}.lambda-state p{margin:0;color:var(--muted);font-size:17px;line-height:1.42}.lambda-switcher{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.lambda-switcher button{min-height:84px;padding:10px 9px;border:0;border-radius:var(--radius-field);background:rgba(229,239,244,.55);color:var(--muted);text-align:left;cursor:pointer;transition:background var(--motion-fast) var(--ease),color var(--motion-fast) var(--ease)}.lambda-switcher button b{display:block;margin-bottom:6px;color:var(--rust);font:500 19px/1 Georgia,serif}.lambda-switcher button span{font-size:11px;line-height:1.25}.lambda-switcher button.active{background:var(--rust);color:#fff}.lambda-switcher button.active b{color:#f1c5b3}.state-focus-enter-active,.state-focus-leave-active{transition:opacity var(--motion-reveal) var(--ease),filter var(--motion-reveal) var(--ease),transform var(--motion-reveal) var(--ease)}.state-focus-enter-from{opacity:.2;filter:blur(7px);transform:translateY(12px)}.state-focus-leave-to{opacity:0;filter:blur(5px);transform:translateY(-8px)}button:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}
</style>
