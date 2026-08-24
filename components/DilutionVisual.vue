<template>
  <section class="dilution-visual" aria-label="Interactive dilution model">
    <div class="vessel-side">
      <div class="vessel" aria-label="Solution vessel with a constant number of solute particles">
        <div class="solution" :style="{ height: fillHeight }">
          <span
            v-for="dot in 12"
            :key="dot"
            class="solute-dot"
            :style="dotStyle(dot)"
          ></span>
        </div>
      </div>
      <div class="volume-controls">
        <button type="button" :disabled="level === 0" aria-label="Remove solvent" @click="level -= 1">−</button>
        <span>add or remove solvent</span>
        <button type="button" :disabled="level === states.length - 1" aria-label="Add solvent" @click="level += 1">+</button>
      </div>
    </div>

    <div class="dilution-reading" aria-live="polite">
      <p><span>moles of solute</span><strong>0.50 mol</strong><small>unchanged</small></p>
      <p><span>total volume</span><strong>{{ state.volume.toFixed(2) }} dm³</strong><small>{{ state.volumeText }}</small></p>
      <p class="result"><span>concentration</span><strong>{{ concentration.toFixed(2) }} mol dm⁻³</strong><small>c = n / V</small></p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const states = [
  { volume: 0.25, volumeText: '250 cm³', fill: '42%' },
  { volume: 0.50, volumeText: '500 cm³', fill: '62%' },
  { volume: 1.00, volumeText: '1000 cm³', fill: '86%' },
]

const level = ref(0)
const state = computed(() => states[level.value])
const concentration = computed(() => 0.5 / state.value.volume)
const fillHeight = computed(() => state.value.fill)

const positions = [
  [15, 22], [33, 18], [55, 25], [78, 19],
  [24, 45], [48, 42], [70, 48], [86, 39],
  [17, 70], [40, 68], [64, 74], [82, 66],
]

function dotStyle(index: number) {
  const [left, top] = positions[index - 1]
  return { left: `${left}%`, top: `${top}%` }
}
</script>

<style scoped>
.dilution-visual {
  align-items: stretch;
  display: grid;
  gap: 64px;
  grid-template-columns: 0.8fr 1.2fr;
  min-height: 472px;
}

.vessel-side {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.vessel {
  background: rgba(251, 250, 246, 0.7);
  border: 3px solid var(--line);
  border-top: 0;
  height: 330px;
  overflow: hidden;
  position: relative;
  width: 250px;
}

.solution {
  background: rgba(170, 206, 219, 0.48);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  transition: height 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.solute-dot {
  background: var(--accent);
  border-radius: 50%;
  height: 11px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 11px;
}

.volume-controls {
  align-items: center;
  display: flex;
  gap: 13px;
  margin-top: 0.9rem;
}

.volume-controls span {
  color: var(--muted);
  font-size: 0.9rem;
}

.volume-controls button {
  align-items: center;
  background: var(--paper-deep);
  border: 0;
  border-radius: 999px;
  color: var(--accent);
  cursor: pointer;
  display: inline-flex;
  font-size: 1.08rem;
  height: 2rem;
  justify-content: center;
  padding: 0;
  width: 2rem;
}

.volume-controls button:disabled {
  cursor: default;
  opacity: 0.28;
}

.volume-controls button:focus-visible {
  outline: 2px solid rgba(141, 63, 46, 0.45);
  outline-offset: 3px;
}

.dilution-reading {
  border-top: 2px solid var(--accent);
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
}

.dilution-reading p {
  align-items: center;
  border-bottom: 1px solid var(--line-soft);
  display: grid;
  gap: 8px 20px;
  grid-template-columns: 0.85fr 1.15fr;
  margin: 0;
  padding: 0.8rem 0;
}

.dilution-reading span {
  color: var(--muted);
  font-size: 1rem;
}

.dilution-reading strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2rem;
  font-weight: 500;
}

.dilution-reading small {
  color: var(--quiet);
  font-size: 0.86rem;
  grid-column: 2;
}

.dilution-reading .result {
  background: var(--green-field);
  margin-left: -1rem;
  padding-left: 1rem;
}

.dilution-reading .result span,
.dilution-reading .result small {
  color: var(--accent-2);
}
</style>
