<script setup lang="ts">
import { computed, ref } from 'vue'

const catalyst = ref(false)
const multistep = ref(false)

const path = computed(() => {
  if (multistep.value) {
    return catalyst.value
      ? 'M 62 276 C 130 276 145 170 220 170 C 285 170 300 236 357 236 C 420 236 430 138 500 138 C 570 138 588 225 672 225'
      : 'M 62 276 C 135 276 148 112 220 112 C 290 112 300 236 357 236 C 428 236 438 82 505 82 C 576 82 590 225 672 225'
  }
  return catalyst.value
    ? 'M 62 276 C 210 276 230 145 365 145 C 500 145 520 225 672 225'
    : 'M 62 276 C 205 276 232 78 365 78 C 498 78 525 225 672 225'
})

const peaks = computed(() => multistep.value ? (catalyst.value ? ['Eₐ₁','Eₐ₂'] : ['Eₐ₁','Eₐ₂']) : ['Eₐ'])
</script>

<template>
  <section class="profile-lab">
    <div class="profile-plot">
      <svg viewBox="0 0 740 370" role="img" aria-labelledby="profile-title profile-desc">
        <title id="profile-title">Reaction energy profile</title>
        <desc id="profile-desc">A reaction coordinate plot compares a single or multistep pathway, with or without a catalyst.</desc>
        <path :d="path" class="profile" />
        <circle cx="62" cy="276" r="5" /><circle cx="672" cy="225" r="5" />
        <text x="70" y="300" class="state-label">reactants</text><text x="600" y="250" class="state-label">products</text>
        <text v-if="!multistep" x="355" :y="catalyst ? 126 : 59" class="peak-label">{{ peaks[0] }}</text>
        <template v-else><text x="204" :y="catalyst ? 151 : 93" class="peak-label">Eₐ₁</text><text x="486" :y="catalyst ? 119 : 63" class="peak-label">Eₐ₂</text><text x="320" y="259" class="intermediate-label">intermediate</text></template>
        <text x="307" y="351" class="axis-title">reaction coordinate</text><text x="22" y="205" transform="rotate(-90 22 205)" class="axis-title">potential energy</text>
      </svg>
    </div>
    <div class="profile-controls">
      <p class="scene-kicker">Read the pathway</p>
      <div class="switches"><button type="button" :aria-pressed="!multistep" @click="multistep=false">One step</button><button type="button" :aria-pressed="multistep" @click="multistep=true">Several steps</button></div>
      <label><input v-model="catalyst" type="checkbox" />Lower-barrier catalytic route</label>
      <div class="profile-claim"><span>{{ multistep ? 'Peaks' : 'Peak' }}</span><strong>{{ multistep ? 'transition states' : 'transition state' }}</strong></div>
      <div v-if="multistep" class="profile-claim green"><span>Valley</span><strong>reaction intermediate</strong></div>
      <p>The vertical scale is energy. The horizontal direction is progress—not clock time.</p>
    </div>
  </section>
</template>

<style scoped>
.profile-lab{display:grid;grid-template-columns:1.3fr .7fr;gap:38px;min-height:475px;align-items:center}.profile-plot{padding:18px;border-radius:var(--radius-field);background:var(--paper-deep)}svg{display:block;width:100%;height:auto}.profile{fill:none;stroke:var(--rust);stroke-width:2.4;stroke-linecap:round}.profile-plot circle{fill:var(--paper);stroke:var(--rust);stroke-width:2}.axis-title,.state-label{fill:var(--muted);font:700 13px Aptos,Arial}.peak-label{fill:var(--rust);font:800 13px Aptos,Arial}.intermediate-label{fill:var(--green);font:800 12px Aptos,Arial}.profile-controls{display:grid;gap:14px}.switches{display:grid;grid-template-columns:1fr 1fr;gap:7px}.switches button{padding:10px;border:0;border-radius:var(--radius-control);background:var(--paper-deep);color:var(--muted);font-weight:750;cursor:pointer}.switches button[aria-pressed="true"]{background:var(--charcoal);color:#fff}.profile-controls label{display:flex;gap:9px;align-items:center;color:var(--charcoal);font-size:14px}.profile-controls input{accent-color:var(--rust)}.profile-claim{display:grid;gap:3px;padding:14px 16px;border-radius:var(--radius-field);background:var(--soft-rust)}.profile-claim.green{background:var(--soft-green)}.profile-claim span{color:var(--rust);font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.profile-claim.green span{color:var(--green)}.profile-claim strong{font:500 22px/1.1 Georgia,serif}.profile-controls>p:last-child{margin:0;color:var(--muted);font-size:14px}
</style>
