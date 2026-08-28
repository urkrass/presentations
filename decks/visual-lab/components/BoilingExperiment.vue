<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BoilIntensity } from '../lib/boilingModel'

type Preset = { label: string; temperature: number; intensity?: BoilIntensity }

const presets: Preset[] = [
  { label: '20°C', temperature: 20, intensity: 'still' },
  { label: '60°C', temperature: 60, intensity: 'still' },
  { label: '90°C', temperature: 90, intensity: 'near-boil' },
  { label: '100°C gentle', temperature: 100, intensity: 'gentle' },
  { label: 'rolling', temperature: 100, intensity: 'rolling' },
]

const temperature = ref(100)
const intensity = ref<BoilIntensity | undefined>('rolling')
const debug = ref(false)
const selectedLabel = computed(() => presets.find(preset => preset.temperature === temperature.value && preset.intensity === intensity.value)?.label ?? 'custom')

function selectPreset(preset: Preset) {
  temperature.value = preset.temperature
  intensity.value = preset.intensity
}

function setTemperature(value: number) {
  temperature.value = value
  intensity.value = undefined
}
</script>

<template>
  <section class="boiling-experiment" :data-selected-state="selectedLabel">
    <div class="boiling-focus">
      <BoilingBeaker :debug="debug" :intensity="intensity" :temperature="temperature" />
    </div>
    <div class="boiling-controls" aria-label="Boiling state controls">
      <div class="boiling-presets">
        <button
          v-for="preset in presets"
          :key="preset.label"
          type="button"
          :aria-pressed="selectedLabel === preset.label"
          :class="{ active: selectedLabel === preset.label }"
          @click="selectPreset(preset)"
        >
          {{ preset.label }}
        </button>
      </div>
      <label class="boiling-slider">
        <span>Temperature</span>
        <input
          aria-label="Temperature"
          type="range"
          min="20"
          max="100"
          step="1"
          :value="temperature"
          @input="setTemperature(Number(($event.target as HTMLInputElement).value))"
        >
        <output>{{ temperature }}°C</output>
      </label>
      <button class="boiling-debug-toggle" type="button" :aria-pressed="debug" @click="debug = !debug">
        {{ debug ? 'Hide model' : 'Inspect model' }}
      </button>
    </div>
  </section>
</template>
