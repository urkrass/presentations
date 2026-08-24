<script setup lang="ts">
import { computed, ref } from 'vue'

const lightSide = ref<'left' | 'overhead' | 'right'>('left')
const bend = computed(() => lightSide.value === 'left' ? '-16deg' : lightSide.value === 'right' ? '16deg' : '0deg')
const auxinSide = computed(() => lightSide.value === 'left' ? 'right' : lightSide.value === 'right' ? 'left' : 'both sides')
</script>

<template>
  <section class="auxin-lab">
    <div class="plant-stage" :class="`light-${lightSide}`">
      <div class="light-source"><span></span><i v-for="n in 8" :key="n" :style="{ transform: `rotate(${n * 45}deg)` }"></i></div>
      <div class="plant">
        <div class="pot"></div>
        <div class="lower-stem"></div>
        <div class="upper-plant" :style="{ transform: `rotate(${bend})` }">
          <div class="stem"></div><span class="leaf one"></span><span class="leaf two"></span><span class="tip"></span>
          <div class="auxin-dots" :class="`auxin-${auxinSide.replace(' ','-')}`"><b v-for="n in 12" :key="n"></b></div>
        </div>
      </div>
      <p>More auxin accumulates on the <strong>{{ auxinSide }}</strong>.</p>
    </div>
    <div class="lab-copy">
      <p class="kicker">Change the light direction</p>
      <div class="light-controls">
        <button v-for="side in ['left','overhead','right']" :key="side" type="button" :class="{ active: lightSide === side }" @click="lightSide = side as any">{{ side }}</button>
      </div>
      <div class="causal-chain">
        <p><span>1</span><strong>Lateral light</strong><small>redistributes auxin toward the shaded side.</small></p>
        <p><span>2</span><strong>Differential elongation</strong><small>cells on the shaded side elongate more rapidly.</small></p>
        <p><span>3</span><strong>Curvature</strong><small>the shoot bends toward the light source.</small></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.auxin-lab { min-height: 420px; display: grid; grid-template-columns: 1fr 1.12fr; gap: 35px; }
.plant-stage { position: relative; overflow: hidden; border-radius: 7px; background: linear-gradient(#e6eef1 0 72%, #d6c3a4 72%); }
.plant-stage > p { position: absolute; left: 20px; right: 20px; bottom: 13px; margin: 0; text-align: center; color: var(--charcoal); font-size: 14px; }.plant-stage > p strong { color: var(--accent); }
.light-source { position: absolute; top: 55px; left: 42px; width: 58px; height: 58px; border-radius: 50%; background: #dfbd58; transition: left 220ms ease, top 220ms ease; }
.light-overhead .light-source { left: calc(50% - 29px); top: 24px; }.light-right .light-source { left: calc(100% - 100px); }
.light-source span { position: absolute; inset: 10px; border-radius: 50%; background: #f6db83; }.light-source i { position: absolute; left: 27px; top: -13px; width: 4px; height: 12px; border-radius: 3px; background: #c7942a; transform-origin: 2px 42px; }
.plant { position: absolute; left: 50%; bottom: 37px; width: 170px; height: 320px; transform: translateX(-50%); }
.pot { position: absolute; left: 35px; bottom: 0; width: 100px; height: 80px; background: #a96846; clip-path: polygon(5% 0,95% 0,82% 100%,18% 100%); }
.lower-stem { position: absolute; left: 81px; bottom: 76px; width: 8px; height: 105px; border-radius: 5px; background: #3d7355; }
.upper-plant { position: absolute; left: 85px; bottom: 174px; width: 8px; height: 132px; transform-origin: 4px 132px; transition: transform 300ms ease; }
.stem { position: absolute; inset: 0; border-radius: 5px; background: #3d7355; }.tip { position: absolute; left: -5px; top: -8px; width: 18px; height: 21px; border-radius: 70% 70% 45% 45%; background: #5f914f; }
.leaf { position: absolute; width: 58px; height: 28px; background: #699b63; }.leaf.one { left: -54px; top: 48px; border-radius: 70% 10% 70% 10%; transform: rotate(15deg); }.leaf.two { left: 5px; top: 80px; border-radius: 10% 70% 10% 70%; transform: rotate(-15deg); }
.auxin-dots { position: absolute; inset: 0; }.auxin-dots b { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: #b44f38; opacity: .78; }
.auxin-dots b:nth-child(1){top:14px;left:-2px}.auxin-dots b:nth-child(2){top:28px;left:5px}.auxin-dots b:nth-child(3){top:42px;left:-2px}.auxin-dots b:nth-child(4){top:56px;left:5px}.auxin-dots b:nth-child(5){top:70px;left:-2px}.auxin-dots b:nth-child(6){top:84px;left:5px}.auxin-dots b:nth-child(7){top:98px;left:-2px}.auxin-dots b:nth-child(8){top:112px;left:5px}.auxin-dots b:nth-child(9){top:34px;left:5px}.auxin-dots b:nth-child(10){top:66px;left:-2px}.auxin-dots b:nth-child(11){top:93px;left:5px}.auxin-dots b:nth-child(12){top:120px;left:-2px}
.auxin-left b:nth-child(odd), .auxin-right b:nth-child(even) { opacity: .14; transform: scale(.65); }.auxin-both-sides b { opacity: .62; }
.lab-copy { display: grid; align-content: center; gap: 18px; }.kicker { margin: 0; color: var(--accent); font-size: 13px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.light-controls { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }.light-controls button { border: 0; border-radius: 5px; padding: 14px; background: var(--paper-deep); color: var(--ink); font-weight: 800; text-transform: capitalize; cursor: pointer; }.light-controls button.active { background: var(--accent); color: white; }
.causal-chain { display: grid; gap: 10px; }.causal-chain p { margin: 0; min-height: 80px; padding: 14px 17px; display: grid; grid-template-columns: 28px 1fr; gap: 3px 12px; align-content: center; border-radius: 6px; background: var(--green-field); }.causal-chain p:nth-child(2){background:var(--warm-field)}.causal-chain p:nth-child(3){background:var(--blue-field)}.causal-chain span{grid-row:1/span 2;color:var(--accent);font-weight:800}.causal-chain strong{font:700 20px/1.1 var(--serif)}.causal-chain small{color:var(--muted);font-size:14px}
</style>
