<script setup>
import { computed, ref } from 'vue'

const step = ref(0)
const readings = [21.0, 29.8, 33.9, 34.6, 34.6]
const times = [0, 10, 20, 30, 40]
const yTicks = [20, 24, 28, 32, 36]
const reading = computed(() => readings[step.value])
const stable = computed(() => step.value >= 4)
const visibleReadings = computed(() => readings.slice(0, step.value + 1))

function pointX(index) {
  return 62 + index * 116
}

function pointY(value) {
  return 214 - ((value - 20) / 16) * 176
}

const plotPoints = computed(() => visibleReadings.value
  .map((value, index) => `${pointX(index)},${pointY(value)}`)
  .join(' '))

function sample() {
  if (step.value < readings.length - 1) step.value += 1
}

function reset() {
  step.value = 0
}
</script>

<template>
  <section class="temperature-station">
    <div class="probe-scene">
      <div class="digital-probe">
        <div class="probe-handle"><span>TEMP</span></div>
        <div class="probe-stem"><i></i></div>
      </div>
      <div class="beaker-water">
        <div class="beaker-rim"><i></i></div>
        <div class="beaker-highlight"></div>
        <div class="beaker-marks"><i></i><i></i><i></i><i></i></div>
        <div class="water"><i></i></div>
      </div>
      <div class="probe-display">{{ reading.toFixed(1) }} <small>°C</small></div>
    </div>
    <div class="temperature-work">
      <div class="graph-heading">
        <div>
          <span>Live readings</span>
          <strong>Temperature against time</strong>
        </div>
        <p>{{ stable ? 'A plateau means the reading has settled.' : 'Add readings until the line becomes flat.' }}</p>
      </div>

      <div class="temperature-graph">
        <svg viewBox="0 0 590 270" role="img" aria-label="Line graph of temperature rising with time and settling at 34.6 degrees Celsius">
          <g class="graph-grid">
            <template v-for="tick in yTicks" :key="`y-${tick}`">
              <line x1="62" x2="526" :y1="pointY(tick)" :y2="pointY(tick)" />
              <text x="49" :y="pointY(tick) + 5" text-anchor="end">{{ tick }}</text>
            </template>
            <template v-for="(time, index) in times" :key="`x-${time}`">
              <line :x1="pointX(index)" :x2="pointX(index)" y1="38" y2="214" />
              <text :x="pointX(index)" y="237" text-anchor="middle">{{ time }}</text>
            </template>
          </g>
          <line class="graph-axis" x1="62" x2="526" y1="214" y2="214" />
          <line class="graph-axis" x1="62" x2="62" y1="38" y2="214" />
          <polyline class="temperature-line" :points="plotPoints" />
          <g v-for="(value, index) in visibleReadings" :key="`point-${index}`">
            <circle class="temperature-point" :cx="pointX(index)" :cy="pointY(value)" r="6" />
            <text
              v-if="index === visibleReadings.length - 1"
              class="temperature-label"
              :x="pointX(index)"
              :y="pointY(value) - 14"
              text-anchor="middle"
            >{{ value.toFixed(1) }} °C</text>
          </g>
          <text class="axis-title" x="294" y="263" text-anchor="middle">time / s</text>
          <text class="axis-title" x="17" y="126" text-anchor="middle" transform="rotate(-90 17 126)">temperature / °C</text>
        </svg>
      </div>

      <div class="temperature-footer">
        <div class="temperature-message">
          <span>{{ stable ? 'Stable reading' : 'Reading is changing' }}</span>
          <strong>{{ stable ? 'Record 34.6 °C' : 'Wait and sample again.' }}</strong>
          <small>Keep the sensor in the liquid without touching the glass.</small>
        </div>
        <div class="temperature-actions">
          <button type="button" :disabled="stable" @click="sample">Add reading</button>
          <button type="button" class="quiet" @click="reset">Reset</button>
        </div>
      </div>
      <p class="temperature-resolution">Display resolution: 0.1 °C</p>
    </div>
  </section>
</template>

<style scoped>
.temperature-station { display: grid; grid-template-columns: 390px 1fr; gap: 42px; align-items: center; min-height: 430px; }
.probe-scene { position: relative; height: 430px; display: grid; place-items: end center; }
.beaker-water { width: 310px; height: 270px; border: 6px solid #7896a2; border-top: 0; border-radius: 0 0 25px 25px; overflow: visible; position: relative; background: linear-gradient(90deg, rgba(255,255,255,.7), rgba(220,237,242,.32), rgba(255,255,255,.64)); box-shadow: 0 8px 10px rgba(55,75,79,.12); }
.beaker-rim { position: absolute; z-index: 5; left: -14px; top: -13px; width: 314px; height: 22px; border: 5px solid #7896a2; border-radius: 50%; background: rgba(255,255,255,.66); }
.beaker-rim i { position: absolute; right: -4px; top: -5px; width: 50px; height: 17px; background: var(--paper); clip-path: polygon(0 0,100% 0,60% 100%,10% 100%); }
.beaker-highlight { position: absolute; z-index: 4; left: 22px; top: 20px; width: 14px; height: 235px; border-radius: 8px; background: rgba(255,255,255,.52); }
.beaker-marks { position: absolute; z-index: 4; right: 18px; top: 55px; display: grid; gap: 32px; }
.beaker-marks i { width: 45px; height: 3px; background: #66828e; }
.beaker-marks i:nth-child(even) { width: 29px; justify-self: end; }
.water { position: absolute; z-index: 2; inset: 76px 0 0; overflow: hidden; border-radius: 0 0 18px 18px; background: linear-gradient(90deg,#a5d1da,#83bcc9 68%,#9ccbd5); }
.water i { position: absolute; left: -3px; top: -13px; width: 304px; height: 28px; border-radius: 0 0 50% 50%; background: #91c6d1; box-shadow: inset 0 5px 0 rgba(255,255,255,.3); }
.digital-probe { position: absolute; z-index: 7; top: 0; left: 50%; width: 64px; height: 325px; transform: translateX(-50%); display: grid; justify-items: center; align-content: start; }
.probe-handle { width: 54px; height: 106px; border-radius: 15px 15px 8px 8px; background: linear-gradient(90deg,#303936,#56605c 48%,#282f2d); box-shadow: 4px 6px 8px rgba(39,45,43,.2); display: grid; place-items: center; }
.probe-handle span { color: #d9e0dc; font: 800 10px/1 var(--sans); letter-spacing: .12em; writing-mode: vertical-rl; }
.probe-stem { position: relative; width: 8px; height: 220px; background: linear-gradient(90deg,#8b9698,#edf0ef 48%,#6d7a7c); }
.probe-stem i { position: absolute; left: -1px; bottom: -10px; width: 10px; height: 24px; border-radius: 0 0 7px 7px; background: linear-gradient(90deg,#687577,#d7dddc 48%,#586466); }
.probe-display { position: absolute; right: 0; top: 18px; background: var(--charcoal); color: #dce5d0; padding: 16px 20px; border-radius: 5px; font: 700 34px/1 var(--mono); }
.probe-display small { font-size: 18px; }
.temperature-work { display: grid; gap: 8px; align-content: center; }
.graph-heading { display: flex; align-items: end; justify-content: space-between; gap: 28px; }
.graph-heading div { display: grid; gap: 3px; }
.graph-heading span,
.temperature-message span { color: var(--accent); text-transform: uppercase; letter-spacing: .12em; font-size: 12px; font-weight: 800; }
.graph-heading strong { font: 700 27px/1.1 var(--serif); }
.graph-heading p { width: 235px; margin: 0 0 2px; color: var(--muted); font-size: 15px; font-weight: 700; text-align: right; }
.temperature-graph { height: 280px; }
.temperature-graph svg { width: 100%; height: 100%; overflow: visible; }
.graph-grid line { stroke: #d9d7cf; stroke-width: 1; }
.graph-grid text { fill: var(--muted); font: 700 13px/1 var(--sans); }
.graph-axis { stroke: var(--charcoal); stroke-width: 2.5; }
.temperature-line { fill: none; stroke: var(--accent); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }
.temperature-point { fill: var(--paper); stroke: var(--accent); stroke-width: 4; }
.temperature-label { fill: var(--accent-2); font: 800 14px/1 var(--sans); }
.axis-title { fill: var(--charcoal); font: 800 14px/1 var(--sans); }
.temperature-footer { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: end; }
.temperature-message { display: grid; gap: 3px; }
.temperature-message strong { font: 700 24px/1.12 var(--serif); }
.temperature-message small { color: var(--muted); font-size: 14px; }
.temperature-actions { display: grid; grid-template-columns: 135px 88px; gap: 9px; }
button { border: 0; border-radius: 5px; padding: 13px 14px; background: var(--accent); color: white; font: 800 15px/1 var(--sans); cursor: pointer; }
button.quiet { background: var(--charcoal); }
button:disabled { opacity: .55; cursor: default; }
button:focus-visible { outline: 4px solid color-mix(in srgb, var(--accent) 48%, transparent); outline-offset: 3px; }
.temperature-resolution { margin: 0; color: var(--muted); font-weight: 800; font-size: 13px !important; text-align: right; }
</style>
