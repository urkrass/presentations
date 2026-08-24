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
      <h2>{{ state.outcome }}</h2>
      <p>{{ state.detail }}</p>
      <div class="lambda-switcher"><button v-for="(item,index) in states" :key="item.label" type="button" :class="{active:index===active}" @click="active=index">{{ index + 1 }} · {{ item.label }}</button></div>
    </div>
  </section>
</template>

<style scoped>
.lambda-scene{display:grid;grid-template-columns:1.12fr .88fr;gap:45px;min-height:500px}.lambda-scene figure{position:relative;margin:0;height:500px;overflow:hidden;background:#151515}.lambda-scene img{width:100%;height:100%;object-fit:cover;object-position:center}.lambda-scene figcaption{position:absolute;left:18px;bottom:15px;background:rgba(0,0,0,.67);color:#fff;padding:8px 11px;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.lambda-copy{display:grid;align-content:center;gap:19px}.lambda-copy h2{margin:0;font:500 34px/1.14 Georgia,serif;color:var(--ink)}.lambda-copy>p:not(.scene-kicker){margin:0;color:var(--muted);font-size:18px;line-height:1.45}.lambda-switcher{display:grid;gap:6px}.lambda-switcher button{padding:12px 0;border:0;border-bottom:2px solid color-mix(in srgb,var(--ink) 13%,transparent);background:transparent;color:var(--muted);font-weight:700;text-align:left;cursor:pointer}.lambda-switcher button.active{color:var(--rust);border-color:var(--rust)}button:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}
</style>
