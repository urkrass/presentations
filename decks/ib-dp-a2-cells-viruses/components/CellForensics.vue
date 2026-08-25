<script setup lang="ts">
import { computed, ref } from 'vue'

const specimens = [
  { id:'A', image:'images/e-coli.jpg', prompt:'No nucleus is visible. The cells are rods, each a few micrometres long.', answer:'prokaryote', reason:'Small size and absence of a membrane-bound nucleus fit a bacterium. The image is an SEM, so it gives surface form—not internal proof.' },
  { id:'B', image:'images/hela.jpg', prompt:'DNA, microtubules, and Golgi-associated protein have been selectively labelled.', answer:'eukaryote', reason:'A nucleus and membrane-bound Golgi system are eukaryotic. Fluorescence identifies chosen molecules rather than showing natural colour.' },
  { id:'C', image:'images/paramecium.jpg', prompt:'One cell changes state under dehydration while nearby bacteria remain much smaller.', answer:'eukaryote', reason:'A Paramecium is a single eukaryotic cell that coordinates many life processes and can form a protective cyst.' },
]
const index = ref(0)
const choice = ref<string | null>(null)
const item = computed(() => specimens[index.value])
function selectSpecimen(next:number){index.value=next;choice.value=null}
</script>

<template>
  <section class="forensics">
    <figure><img :src="item.image" :alt="`Unknown specimen ${item.id}`" /><figcaption>Unknown {{ item.id }}</figcaption></figure>
    <div class="forensics-copy">
      <p class="scene-kicker">Cell forensics · evidence before category</p>
      <h2>{{ item.prompt }}</h2>
      <div class="scene-switcher"><button v-for="(specimen,i) in specimens" :key="specimen.id" type="button" :class="{active:index===i}" @click="selectSpecimen(i)">unknown {{ specimen.id }}</button></div>
      <div class="forensic-choice"><button v-for="option in ['prokaryote','eukaryote','not enough evidence']" :key="option" type="button" :class="{active:choice===option}" @click="choice=option">{{ option }}</button></div>
      <p v-if="choice" class="forensic-result"><strong>{{ choice===item.answer ? 'Best-supported claim.' : 'The image supports a stronger claim.' }}</strong>{{ item.reason }}</p>
    </div>
  </section>
</template>

<style scoped>
.forensics{display:grid;grid-template-columns:1.08fr .92fr;gap:46px;min-height:500px}.forensics figure{position:relative;margin:0;height:500px;overflow:hidden;background:#171717}.forensics figure img{width:100%;height:100%;object-fit:cover}.forensics figcaption{position:absolute;left:18px;top:16px;color:#fff;background:rgba(0,0,0,.65);padding:7px 10px;font-weight:800;letter-spacing:.08em}.forensics-copy{display:grid;align-content:center;gap:18px}.forensics h2{margin:0;font:500 31px/1.16 Georgia,serif}.scene-switcher,.forensic-choice{display:flex;gap:8px;flex-wrap:wrap}.scene-switcher button,.forensic-choice button{padding:10px 13px;border:0;background:var(--paper-deep);color:var(--muted);font-weight:750;cursor:pointer}.scene-switcher button.active{background:var(--blue);color:#fff}.forensic-choice button.active{background:var(--rust);color:#fff}.forensic-result{margin:0!important;padding:15px 17px;background:var(--paper-deep);color:var(--muted)!important}.forensic-result strong{display:block;color:var(--green);margin-bottom:5px}button:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}
</style>
