<script setup>
import { computed, ref } from 'vue'

const stage = ref(0)
const containerMass = 18.6
const sampleMass = 7.4

const reading = computed(() => {
  if (stage.value === 0) return '0.0'
  if (stage.value === 1) return containerMass.toFixed(1)
  if (stage.value === 2) return '0.0'
  return sampleMass.toFixed(1)
})

const message = computed(() => [
  'Check that the pan is empty and the display reads zero.',
  'The container has mass too. Do not call this the sample mass.',
  'Tare subtracts the container before the sample is added.',
  'Record 7.4 g: number, unit, and the balance resolution.',
][stage.value])

function advance() {
  if (stage.value < 3) stage.value += 1
}

function reset() {
  stage.value = 0
}
</script>

<template>
  <section class="mass-station">
    <div class="balance-visual" aria-label="Interactive digital balance">
      <div class="balance-pan">
        <div v-if="stage >= 1" class="weigh-boat" aria-label="White folded weighing boat">
          <i class="fold fold-left"></i>
          <i class="fold fold-right"></i>
          <div v-if="stage === 3" class="granular-sample" aria-label="Small mound of dry sand">
            <i></i><i></i><i></i><i></i><i></i><i></i>
          </div>
        </div>
      </div>
      <div class="balance-body">
        <span class="display">{{ reading }} <small>g</small></span>
        <button type="button" :disabled="stage === 3" @click="advance">
          {{ ['Place container', 'Tare', 'Add sample', 'Complete'][stage] }}
        </button>
        <button type="button" class="quiet" @click="reset">Reset</button>
      </div>
    </div>
    <div class="station-note" aria-live="polite">
      <span>Step {{ stage + 1 }}</span>
      <strong>{{ message }}</strong>
      <p v-if="stage === 3">Smallest display step: 0.1 g</p>
    </div>
  </section>
</template>

<style scoped>
.mass-station { display: grid; grid-template-columns: 1.05fr .95fr; gap: 38px; align-items: center; min-height: 390px; }
.balance-visual { display: grid; justify-items: center; }
.balance-pan { width: 390px; height: 76px; border-radius: 50%; background: radial-gradient(ellipse at 50% 38%, #d8d6d0 0 46%, #b4b2ac 48% 72%, #92908b 73%); box-shadow: 0 8px 12px rgba(31,35,33,.18), inset 0 -8px 0 #8f8d88; display: grid; place-items: center; }
.weigh-boat { position: relative; width: 222px; height: 64px; background: linear-gradient(155deg, #fff 0 52%, #eceae3 53%); clip-path: polygon(12% 0,88% 0,100% 100%,0 100%); display: grid; place-items: center; filter: drop-shadow(0 5px 4px rgba(35,36,34,.18)); overflow: hidden; }
.fold { position: absolute; top: 4px; width: 2px; height: 72px; background: #d9d7d0; opacity: .8; }
.fold-left { left: 32px; transform: rotate(-18deg); }
.fold-right { right: 32px; transform: rotate(18deg); }
.granular-sample { position: relative; width: 136px; height: 40px; margin-top: 10px; clip-path: polygon(2% 92%,11% 73%,25% 67%,36% 39%,48% 20%,61% 30%,71% 49%,90% 65%,100% 92%); background: radial-gradient(circle at 18% 72%, #d6b27e 0 2px, transparent 3px), radial-gradient(circle at 42% 48%, #7a5431 0 2px, transparent 3px), radial-gradient(circle at 70% 67%, #e0bf88 0 2px, transparent 3px), linear-gradient(150deg, #c6985d, #8f6038); box-shadow: inset 0 -7px 9px rgba(87,52,27,.2); }
.granular-sample > i { position: absolute; width: 5px; height: 4px; border-radius: 45%; background: #6f4b2e; transform: rotate(18deg); }
.granular-sample > i:nth-child(1) { left: 24px; top: 26px; }
.granular-sample > i:nth-child(2) { left: 48px; top: 17px; background: #e4c594; }
.granular-sample > i:nth-child(3) { left: 67px; top: 11px; }
.granular-sample > i:nth-child(4) { left: 83px; top: 22px; background: #e1bd85; }
.granular-sample > i:nth-child(5) { left: 103px; top: 29px; }
.granular-sample > i:nth-child(6) { left: 59px; top: 30px; background: #5f4027; }
.balance-body { margin-top: -4px; width: 470px; min-height: 220px; border-radius: 26px 26px 10px 10px; background: var(--charcoal); display: grid; grid-template-columns: 1fr 1fr; gap: 14px; padding: 34px; }
.display { grid-column: 1 / -1; background: #dce5d0; color: #23301e; font: 700 56px/1 var(--mono); padding: 18px 22px; border-radius: 5px; text-align: right; }
.display small { font-size: 22px; }
button { border: 0; border-radius: 5px; padding: 14px 18px; background: var(--accent); color: white; font: 800 16px/1 var(--sans); cursor: pointer; }
button.quiet { background: #5a5d59; }
button:disabled { opacity: .55; cursor: default; }
button:focus-visible { outline: 4px solid #f3d38b; outline-offset: 3px; }
.station-note { background: var(--paper-deep); padding: 30px; border-radius: 6px; display: grid; gap: 14px; }
.station-note span { color: var(--accent); font-size: 14px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.station-note strong { font: 700 26px/1.25 var(--serif); }
.station-note p { margin: 0; color: var(--muted); font-weight: 700; }
</style>
