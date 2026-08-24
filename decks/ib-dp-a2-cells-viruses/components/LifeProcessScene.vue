<script setup lang="ts">
import { computed, ref } from 'vue'

const processes = [
  {name:'nutrition', evidence:'Food vacuoles form around engulfed particles; enzymes digest their contents.'},
  {name:'homeostasis', evidence:'Contractile vacuoles collect and expel excess water entering by osmosis.'},
  {name:'response', evidence:'Cilia change their beating pattern when the cell meets an obstacle or chemical cue.'},
  {name:'reproduction', evidence:'Binary fission copies one coordinated cell into two descendants.'},
]
const active=ref(0)
const process=computed(()=>processes[active.value])
</script>

<template>
  <section class="life-scene">
    <figure><img :src="'images/paramecium.jpg'" alt="Light micrograph of a Paramecium undergoing cyst formation" /><figcaption>The same cell, four questions</figcaption></figure>
    <div class="life-copy">
      <p class="scene-kicker">A cell is not merely a bag of parts</p>
      <h2>{{ process.name }}</h2>
      <p>{{ process.evidence }}</p>
      <div class="process-switcher"><button v-for="(item,index) in processes" :key="item.name" type="button" :class="{active:index===active}" @click="active=index">{{ item.name }}</button></div>
      <p class="life-claim">One membrane-bound system coordinates metabolism, excretion, response, growth, and reproduction.</p>
    </div>
  </section>
</template>

<style scoped>
.life-scene{display:grid;grid-template-columns:1.2fr .8fr;gap:48px;min-height:500px}.life-scene figure{position:relative;margin:0;height:500px;overflow:hidden;background:#191919}.life-scene img{width:100%;height:100%;object-fit:cover;object-position:center}.life-scene figcaption{position:absolute;left:18px;bottom:15px;background:rgba(0,0,0,.67);color:#fff;padding:8px 11px;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.life-copy{display:grid;align-content:center;gap:19px}.life-copy h2{margin:0;color:var(--green);font:500 58px/1 Georgia,serif;text-transform:capitalize}.life-copy>p:not(.scene-kicker){margin:0;color:var(--muted);font-size:18px;line-height:1.44}.process-switcher{display:flex;gap:20px;flex-wrap:wrap}.process-switcher button{padding:8px 0;border:0;border-bottom:3px solid transparent;background:transparent;color:var(--muted);font-weight:750;cursor:pointer}.process-switcher button.active{color:var(--blue);border-color:var(--blue)}.life-claim{padding:16px 0;color:var(--ink)!important;font-family:Georgia,serif!important;font-size:20px!important}button:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}
</style>
