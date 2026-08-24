<script setup lang="ts">
import { computed, ref } from 'vue'

const minute = ref(0)
const state = computed(() => minute.value < 2 ? 'rest' : minute.value < 7 ? 'exercise' : 'recovery')
const heart = computed(() => state.value === 'rest' ? 68 : state.value === 'exercise' ? 142 : 92)
const ventilation = computed(() => state.value === 'rest' ? 8 : state.value === 'exercise' ? 31 : 14)
</script>

<template>
  <section class="exercise-trace">
    <figure>
      <svg viewBox="0 0 1040 350" role="img" aria-label="Conceptual time traces of heart rate, ventilation, and carbon dioxide disturbance during exercise and recovery">
        <rect x="250" y="28" width="490" height="260" rx="3" class="work" />
        <line x1="82" y1="288" x2="982" y2="288" class="axis" />
        <line x1="82" y1="28" x2="82" y2="288" class="axis" />
        <path d="M82 238 C165 238 205 239 250 235 C300 215 324 125 385 107 C470 82 620 88 710 98 C750 107 765 181 830 211 C885 234 935 237 982 238" class="heart" />
        <path d="M82 258 C175 258 210 258 250 254 C300 235 338 164 402 151 C490 128 626 132 710 143 C760 154 782 210 836 237 C886 255 936 257 982 258" class="vent" />
        <path d="M82 188 C184 188 225 189 250 188 C293 163 320 154 355 164 C405 177 471 187 710 188 C790 188 840 188 982 188" class="co2" />
        <line :x1="82 + minute * 90" y1="28" :x2="82 + minute * 90" y2="288" class="cursor" />
        <text x="90" y="322">rest</text><text x="430" y="322">working muscle</text><text x="805" y="322">recovery</text>
        <text x="14" y="170" transform="rotate(-90 14 170)">relative response</text>
      </svg>
      <figcaption><span class="heart-key"></span> heart rate <span class="vent-key"></span> ventilation <span class="co2-key"></span> CO₂ disturbance · normalised conceptual traces</figcaption>
    </figure>
    <div class="scrub-row">
      <input v-model.number="minute" type="range" min="0" max="10" step="1" aria-label="Move through exercise and recovery" />
      <strong>{{ state }}</strong>
      <span>heart ≈ {{ heart }} beats min⁻¹</span>
      <span>ventilation ≈ {{ ventilation }} L min⁻¹</span>
    </div>
    <p>CO₂ first disturbs blood chemistry; chemoreceptor feedback raises ventilation while circulation delivers O₂ and removes CO₂.</p>
  </section>
</template>

<style scoped>
.exercise-trace{min-height:430px;display:grid;gap:14px}figure{margin:0;padding:12px 22px 9px;border-radius:5px;background:var(--blue-field)}svg{width:100%;height:330px}.work{fill:rgba(154,73,56,.08)}.axis{stroke:var(--muted);stroke-width:2}.heart,.vent,.co2{fill:none;stroke-width:7;stroke-linecap:round}.heart{stroke:var(--accent)}.vent{stroke:var(--accent-3)}.co2{stroke:var(--accent-2);stroke-dasharray:10 8}.cursor{stroke:var(--ink);stroke-width:2;stroke-dasharray:5 5}text{fill:var(--muted);font:13px var(--sans)}figcaption{color:var(--muted);font-size:12px;text-align:center}.heart-key,.vent-key,.co2-key{display:inline-block;width:22px;height:4px;margin:0 6px 2px 14px;background:var(--accent)}.vent-key{background:var(--accent-3)}.co2-key{background:var(--accent-2)}.scrub-row{display:grid;grid-template-columns:1fr 100px 190px 210px;gap:18px;align-items:center}.scrub-row input{width:100%;accent-color:var(--accent)}.scrub-row strong{color:var(--accent);text-transform:uppercase}.scrub-row span{color:var(--muted);font-size:14px}.exercise-trace>p{margin:0;color:var(--ink);font:700 19px/1.35 var(--serif);text-align:center}
</style>
