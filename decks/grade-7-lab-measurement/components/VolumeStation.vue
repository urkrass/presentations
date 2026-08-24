<script setup>
import { computed, ref } from 'vue'

const eye = ref('high')
const readings = { high: 34, level: 36, low: 38 }
const reading = computed(() => readings[eye.value])
</script>

<template>
  <section class="volume-station">
    <div class="cylinder-scene">
      <div class="eye" :class="eye"><i><b></b></i><span>eye line</span></div>
      <div class="cylinder-assembly">
        <div class="cylinder-rim"><i></i></div>
        <div class="cylinder">
          <div class="scale-labels"><span>40</span><span>30</span><span>20</span><span>10</span></div>
          <div class="ticks"></div>
          <div class="glass-highlight"></div>
          <div class="liquid"><div class="meniscus"></div></div>
        </div>
        <div class="cylinder-stem"></div>
        <div class="cylinder-base"></div>
      </div>
    </div>
    <div class="volume-controls">
      <span>Change eye position</span>
      <div class="position-buttons">
        <button type="button" :class="{ active: eye === 'high' }" @click="eye = 'high'">Too high</button>
        <button type="button" :class="{ active: eye === 'level' }" @click="eye = 'level'">Eye level</button>
        <button type="button" :class="{ active: eye === 'low' }" @click="eye = 'low'">Too low</button>
      </div>
      <div class="volume-reading">
        <strong>{{ reading }} mL</strong>
        <p>{{ eye === 'level' ? 'Read the bottom of the meniscus at eye level.' : 'Parallax shifts the apparent reading.' }}</p>
      </div>
      <p class="resolution">Smallest scale division: 2 mL</p>
    </div>
  </section>
</template>

<style scoped>
.volume-station { display: grid; grid-template-columns: .9fr 1.1fr; gap: 44px; align-items: center; min-height: 410px; }
.cylinder-scene { position: relative; height: 410px; display: grid; place-items: center; }
.cylinder-assembly { position: relative; width: 206px; height: 408px; display: grid; justify-items: center; align-content: start; }
.cylinder-rim { position: relative; z-index: 6; width: 202px; height: 22px; margin-bottom: -8px; border: 5px solid #7896a2; border-radius: 50%; background: rgba(255,255,255,.72); box-shadow: inset 0 4px 0 rgba(255,255,255,.8); }
.cylinder-rim i { position: absolute; right: 10px; top: -5px; width: 34px; height: 14px; background: var(--paper); clip-path: polygon(0 0,100% 0,74% 100%,12% 100%); }
.cylinder { position: relative; width: 178px; height: 338px; border: 5px solid #7896a2; border-top: 0; border-radius: 0 0 18px 18px; overflow: hidden; background: linear-gradient(90deg, rgba(255,255,255,.72), rgba(218,235,241,.38) 52%, rgba(255,255,255,.65)); }
.liquid { position: absolute; inset: 92px 0 0; background: #82bfd0; opacity: .86; }
.meniscus { position: absolute; top: -13px; left: -3px; width: 174px; height: 28px; border-radius: 0 0 50% 50%; background: #82bfd0; box-shadow: inset 0 5px 0 rgba(255,255,255,.35); }
.ticks { position: absolute; inset: 18px 0 18px 78px; z-index: 3; background: repeating-linear-gradient(to bottom, #3e555d 0 2px, transparent 2px 16px); }
.scale-labels { position: absolute; inset: 29px auto 18px 24px; z-index: 4; display: flex; flex-direction: column; justify-content: space-between; color: #344a52; font: 700 15px/1 var(--mono); }
.glass-highlight { position: absolute; z-index: 4; left: 18px; top: 18px; width: 13px; height: 290px; border-radius: 8px; background: rgba(255,255,255,.55); }
.cylinder-stem { width: 32px; height: 17px; background: #91a8b1; }
.cylinder-base { width: 190px; height: 18px; border-radius: 50%; background: linear-gradient(#a9bbc1,#728b95); box-shadow: 0 7px 9px rgba(42,58,61,.16); }
.eye { position: absolute; z-index: 7; left: -2px; width: 190px; display: flex; align-items: center; gap: 9px; color: var(--accent); transition: top .2s ease; }
.eye::after { content: ''; position: absolute; left: 54px; top: 17px; width: 154px; height: 2px; background: color-mix(in srgb, var(--accent) 55%, transparent); }
.eye > i { position: relative; z-index: 2; width: 52px; height: 30px; border-radius: 60% 40% 60% 40%; border: 3px solid var(--accent); background: var(--paper); transform: rotate(-2deg); }
.eye > i::before { content: ''; position: absolute; left: 17px; top: 4px; width: 15px; height: 15px; border-radius: 50%; background: #8f6a4f; }
.eye > i b { position: absolute; left: 22px; top: 9px; width: 6px; height: 6px; border-radius: 50%; background: #18201f; }
.eye span { z-index: 2; padding: 4px 5px; background: var(--paper); font: 800 12px/1 var(--sans); text-transform: uppercase; letter-spacing: .1em; }
.eye.high { top: 56px; }
.eye.level { top: 116px; }
.eye.low { top: 174px; }
.volume-controls { display: grid; gap: 18px; }
.volume-controls > span { color: var(--accent); font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; }
.position-buttons { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
button { border: 0; border-radius: 5px; padding: 14px; background: var(--blue-field); color: var(--ink); font: 800 16px/1 var(--sans); cursor: pointer; }
button.active { background: var(--accent); color: white; }
button:focus-visible { outline: 4px solid color-mix(in srgb, var(--accent) 48%, transparent); outline-offset: 3px; }
.volume-reading { padding: 24px; border-radius: 6px; background: var(--paper-deep); }
.volume-reading strong { font: 700 54px/1 var(--serif); color: var(--accent-3); }
.volume-reading p { margin: 10px 0 0; font-size: 18px; }
.resolution { margin: 0; color: var(--muted); font-weight: 800; }
</style>
