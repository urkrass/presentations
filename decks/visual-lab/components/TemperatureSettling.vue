<script setup lang="ts">
import { extent, mean } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import { curveMonotoneX, line } from 'd3-shape'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{ anomalyMode?: boolean }>(), { anomalyMode: false })
const cleanReadings = [20.1, 22.8, 25.4, 27.1, 28.2, 28.8, 29.1, 29.2, 29.2, 29.2]
const anomalyIndex = 5
const anomalyValue = 33.8
const visibleCount = ref(props.anomalyMode ? cleanReadings.length : 4)
const includeAnomaly = ref(props.anomalyMode)
const showMean = ref(true)
const showVariability = ref(false)

const readings = computed(() => cleanReadings.slice(0, visibleCount.value).map((value, index) => ({
  time: index * 10,
  value: includeAnomaly.value && index === anomalyIndex ? anomalyValue : value,
  anomaly: includeAnomaly.value && index === anomalyIndex,
})))

const x = scaleLinear().domain([0, 90]).range([72, 1070])
const y = scaleLinear().domain([19, 35]).range([320, 28])
const path = computed(() => line<{ time: number, value: number }>()
  .x(d => x(d.time))
  .y(d => y(d.value))
  .curve(curveMonotoneX)(readings.value) ?? '')
const runningMean = computed(() => mean(readings.value, d => d.value) ?? 0)
const valueExtent = computed(() => extent(readings.value, d => d.value) as [number, number])
const settled = computed(() => readings.value.length >= 3
  ? Math.max(...readings.value.slice(-3).map(d => d.value)) - Math.min(...readings.value.slice(-3).map(d => d.value)) <= 0.2
  : false)

function addReading() {
  visibleCount.value = Math.min(cleanReadings.length, visibleCount.value + 1)
}

function reset() {
  visibleCount.value = props.anomalyMode ? cleanReadings.length : 4
  includeAnomaly.value = props.anomalyMode
}
</script>

<template>
  <section class="temperature-study" :aria-label="anomalyMode ? 'Temperature anomaly decision chart' : 'Temperature probe settling chart'">
    <div class="temperature-chart">
      <svg viewBox="0 0 1120 370" role="img" :aria-label="`Temperature readings from 0 to ${Math.max(0, (readings.length - 1) * 10)} seconds`">
        <rect class="plateau-band" x="72" :y="y(29.4)" width="998" :height="y(29.0) - y(29.4)" />
        <g class="chart-grid">
          <line v-for="tick in [20, 22, 24, 26, 28, 30, 32, 34]" :key="tick" x1="72" x2="1070" :y1="y(tick)" :y2="y(tick)" />
          <text v-for="tick in [20, 22, 24, 26, 28, 30, 32, 34]" :key="`label-${tick}`" x="58" :y="y(tick) + 5">{{ tick }}</text>
          <text v-for="tick in [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]" :key="`time-${tick}`" :x="x(tick)" y="344">{{ tick }}</text>
        </g>
        <line class="chart-axis" x1="72" x2="1070" y1="320" y2="320" />
        <rect
          v-if="showVariability"
          class="variability-band"
          x="72"
          :y="y(valueExtent[1])"
          :width="Math.max(0, x(readings.at(-1)?.time ?? 0) - 72)"
          :height="Math.max(2, y(valueExtent[0]) - y(valueExtent[1]))"
        />
        <line
          v-if="showMean"
          class="mean-line"
          x1="72"
          :x2="x(readings.at(-1)?.time ?? 0)"
          :y1="y(runningMean)"
          :y2="y(runningMean)"
        />
        <path class="temperature-line" :d="path" />
        <g v-for="reading in readings" :key="reading.time">
          <circle :class="['temperature-dot', { anomaly: reading.anomaly }]" :cx="x(reading.time)" :cy="y(reading.value)" r="6" />
          <text v-if="reading.anomaly" class="anomaly-label" :x="x(reading.time) + 10" :y="y(reading.value) - 10">possible handling error</text>
        </g>
        <text class="axis-label" x="18" y="22">°C</text>
        <text class="axis-label" x="1012" y="365">time / s</text>
      </svg>
    </div>

    <div class="temperature-readout">
      <div class="temperature-value">
        <span>{{ anomalyMode ? 'decision' : 'live reading' }}</span>
        <strong>{{ readings.at(-1)?.value.toFixed(1) }} °C</strong>
      </div>
      <div class="temperature-summary">
        <p v-if="showMean">mean {{ runningMean.toFixed(1) }} °C · resolution 0.1 °C</p>
        <p v-if="showVariability">observed range {{ valueExtent[0].toFixed(1) }}–{{ valueExtent[1].toFixed(1) }} °C</p>
        <p v-if="!showMean && !showVariability">resolution 0.1 °C</p>
        <p class="settling-verdict" :class="{ ready: settled }">{{ settled ? 'plateau: three readings agree within 0.2 °C' : 'still changing: wait before recording' }}</p>
      </div>
      <div class="lab-actions">
        <button v-if="!anomalyMode" class="lab-button primary" type="button" :disabled="visibleCount >= cleanReadings.length" @click="addReading">Add reading</button>
        <button v-else class="lab-button primary" type="button" @click="includeAnomaly = !includeAnomaly">{{ includeAnomaly ? 'Exclude anomaly' : 'Restore anomaly' }}</button>
        <button class="lab-button" type="button" :aria-pressed="showMean" @click="showMean = !showMean">{{ showMean ? 'Hide mean' : 'Show mean' }}</button>
        <button class="lab-button" type="button" :aria-pressed="showVariability" @click="showVariability = !showVariability">{{ showVariability ? 'Hide range' : 'Show range' }}</button>
        <button class="lab-button" type="button" @click="reset">Reset</button>
      </div>
    </div>
  </section>
</template>
