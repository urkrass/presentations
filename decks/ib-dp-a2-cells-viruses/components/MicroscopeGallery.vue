<script setup lang="ts">
import { computed, ref } from 'vue'

const scenes = [
  { id:'hooke', label:'1665 · compound light microscope', image:'images/hooke-cork.jpg', fit:'contain', title:'A pattern of empty compartments', detail:'Hooke saw dead cork walls and coined “cells.” The instrument made a new object of study possible, but not the modern cell theory.', limit:'No membranes, organelles, or living processes were visible.' },
  { id:'sem', label:'SEM · surface electrons', image:'images/e-coli.jpg', fit:'cover', title:'Three-dimensional surface evidence', detail:'Scanning electrons show rod form and surface texture at far higher resolution than visible light.', limit:'The colour is added; the specimen is not alive.' },
  { id:'fluor', label:'fluorescence · selected molecules', image:'images/hela.jpg', fit:'cover', title:'A molecular map, not natural colour', detail:'Fluorescent tags reveal DNA, microtubules, and Golgi location in cultured HeLa cells.', limit:'What is visible depends on what the investigator chose to label.' },
]
const active = ref(0)
const scene = computed(() => scenes[active.value])
</script>

<template>
  <section class="instrument-scene">
    <figure class="instrument-image">
      <img :src="scene.image" :alt="scene.title" :style="{ objectFit: scene.fit as any }" />
      <figcaption>{{ scene.label }}</figcaption>
    </figure>
    <div class="instrument-copy">
      <p class="scene-kicker">Seeing is an instrument-mediated inference</p>
      <h2>{{ scene.title }}</h2>
      <p>{{ scene.detail }}</p>
      <p class="instrument-limit"><strong>Interpretive limit</strong>{{ scene.limit }}</p>
      <div class="scene-switcher" aria-label="Choose a microscopy scene">
        <button v-for="(item,index) in scenes" :key="item.id" type="button" :class="{active:active===index}" @click="active=index">{{ item.id === 'hooke' ? 'Hooke' : item.id === 'sem' ? 'SEM' : 'fluorescence' }}</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.instrument-scene{display:grid;grid-template-columns:1.18fr .82fr;gap:46px;min-height:500px;align-items:stretch}.instrument-image{position:relative;margin:0;height:500px;overflow:hidden;background:#151515}.instrument-image img{width:100%;height:100%;object-position:center;filter:saturate(.9);transition:opacity .25s ease}.instrument-image figcaption{position:absolute;left:20px;bottom:16px;padding:8px 11px;background:rgba(18,18,18,.76);color:#fff;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}.instrument-copy{display:grid;align-content:center;gap:18px}.instrument-copy h2{margin:0;font:500 34px/1.12 Georgia,serif}.instrument-copy>p:not(.scene-kicker){margin:0;color:var(--muted);font-size:18px;line-height:1.45}.instrument-limit{display:grid;gap:5px;padding:16px 17px;background:var(--paper-deep);color:var(--ink)!important}.instrument-limit strong{color:var(--rust);font-size:12px;letter-spacing:.1em;text-transform:uppercase}.scene-switcher{display:flex;gap:8px}.scene-switcher button{padding:10px 14px;border:0;background:var(--paper-deep);color:var(--muted);font-weight:750;cursor:pointer;text-transform:capitalize}.scene-switcher button.active{background:var(--blue);color:#fff}button:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}
</style>
