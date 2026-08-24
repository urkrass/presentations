<script setup lang="ts">
import { computed, ref } from 'vue'

const day = ref<1 | 3 | 5>(1)
const shift = computed(() => day.value === 1 ? 0 : day.value === 3 ? 145 : 280)
</script>

<template>
  <section class="jetlag-visual">
    <div class="arrival-days" aria-label="Days since arrival">
      <button v-for="value in [1,3,5]" :key="value" type="button" :class="{ active: day === value }" @click="day = value as any">day {{ value }}</button>
    </div>
    <figure>
      <svg viewBox="0 0 1040 360" role="img" aria-label="Internal melatonin rhythm gradually shifts toward the new local night">
        <rect x="640" y="35" width="300" height="250" rx="4" class="night" />
        <text x="700" y="63" class="night-label">new local night</text>
        <line x1="70" y1="285" x2="970" y2="285" class="axis" />
        <line x1="70" y1="35" x2="70" y2="285" class="axis" />
        <path d="M70 268 C160 266 205 255 246 204 C282 158 310 82 360 70 C415 58 450 137 485 206 C515 260 550 267 645 268" class="target" />
        <path d="M70 268 C160 266 205 255 246 204 C282 158 310 82 360 70 C415 58 450 137 485 206 C515 260 550 267 645 268" class="internal" :transform="`translate(${shift},0)`" />
        <text x="73" y="320">arrival morning</text><text x="430" y="320">local evening</text><text x="805" y="320">next morning</text>
        <text x="18" y="182" transform="rotate(-90 18 182)">relative melatonin</text>
      </svg>
      <figcaption><span class="old-key"></span> current internal rhythm <span class="new-key"></span> arrival-day reference · qualitative model</figcaption>
    </figure>
    <p><strong>{{ day === 1 ? 'Mismatch is largest.' : day === 3 ? 'Light cues are shifting the clock.' : 'The rhythm approaches local time.' }}</strong> Repeated light–dark information gradually re-entrains the circadian centre.</p>
  </section>
</template>

<style scoped>
.jetlag-visual{min-height:420px;display:grid;grid-template-columns:105px 1fr;gap:12px 28px;align-items:center}.arrival-days{display:grid;gap:24px}.arrival-days button{padding:8px 0;border:0;border-left:4px solid transparent;background:transparent;color:var(--muted);font-weight:800;text-transform:uppercase;cursor:pointer}.arrival-days button.active{border-color:var(--accent);color:var(--accent)}figure{margin:0;padding:18px 20px 10px;border-radius:5px;background:var(--blue-field)}svg{width:100%;height:340px}.night{fill:rgba(49,95,122,.12)}.night-label{fill:var(--accent-3);font:800 14px var(--sans)}.axis{stroke:var(--muted);stroke-width:2}.target,.internal{fill:none;stroke-width:7;stroke-linecap:round}.target{stroke:var(--accent-2);stroke-dasharray:12 10}.internal{stroke:var(--accent);transition:transform 500ms ease}text{fill:var(--muted);font:13px var(--sans)}figcaption{color:var(--muted);font-size:12px;text-align:center}.old-key,.new-key{display:inline-block;width:22px;height:4px;margin:0 6px 2px 14px;background:var(--accent)}.new-key{background:var(--accent-2)}.jetlag-visual>p{grid-column:2;margin:0;color:var(--muted);font-size:16px}.jetlag-visual>p strong{color:var(--ink)}
</style>
