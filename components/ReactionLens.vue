<template>
  <section class="reaction-lens" aria-label="Three coordinated representations of water formation">
    <nav aria-label="Choose a reaction representation">
      <button
        v-for="view in views"
        :key="view.id"
        type="button"
        :class="{ active: active === view.id }"
        :aria-pressed="active === view.id"
        @click="active = view.id"
      >
        {{ view.label }}
      </button>
    </nav>

    <div class="lens-stage" aria-live="polite">
      <div v-if="active === 'particles'" class="particle-equation">
        <div class="molecule-set" aria-label="two hydrogen molecules">
          <div v-for="number in 2" :key="`h2-${number}`" class="molecule">
            <span class="atom hydrogen">H</span><span class="atom hydrogen">H</span>
          </div>
        </div>
        <b>+</b>
        <div class="molecule-set" aria-label="one oxygen molecule">
          <div class="molecule">
            <span class="atom oxygen">O</span><span class="atom oxygen">O</span>
          </div>
        </div>
        <b>→</b>
        <div class="molecule-set" aria-label="two water molecules">
          <div v-for="number in 2" :key="`h2o-${number}`" class="molecule water">
            <span class="atom hydrogen">H</span><span class="atom oxygen">O</span><span class="atom hydrogen">H</span>
          </div>
        </div>
      </div>

      <div v-else-if="active === 'equation'" class="symbolic-view">
        <span>balanced equation</span>
        <strong>2H₂ + O₂ → 2H₂O</strong>
        <p>Four H atoms and two O atoms on each side.</p>
      </div>

      <div v-else class="symbolic-view ratio-view">
        <span>coefficient ratio</span>
        <strong>2 : 1 : 2</strong>
        <p>2 mol H₂ + 1 mol O₂ → 2 mol H₂O</p>
      </div>
    </div>

    <p class="lens-caption">Same relationship. Different scale.</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const views = [
  { id: 'particles', label: 'Particle view' },
  { id: 'equation', label: 'Equation view' },
  { id: 'ratio', label: 'Mole-ratio view' },
]

const active = ref('particles')
</script>

<style scoped>
.reaction-lens {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 482px;
}

nav {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 0.55rem;
}

nav button {
  background: transparent;
  border: 0;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.92rem;
  padding: 0.72rem 1rem;
}

nav button.active {
  background: var(--paper-deep);
  color: var(--accent);
}

nav button:focus-visible {
  outline: 2px solid rgba(141, 63, 46, 0.45);
  outline-offset: -2px;
}

.lens-stage {
  align-items: center;
  background: var(--warm-field);
  border-radius: var(--field-radius);
  display: flex;
  justify-content: center;
  min-height: 375px;
  overflow: hidden;
  padding: 1.5rem;
}

.particle-equation {
  align-items: center;
  display: flex;
  gap: 26px;
  justify-content: center;
  width: 100%;
}

.particle-equation > b {
  color: var(--accent);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2.15rem;
  font-weight: 500;
}

.molecule-set {
  align-items: center;
  display: flex;
  gap: 16px;
}

.molecule {
  align-items: center;
  display: flex;
  padding: 12px 2px;
}

.atom {
  align-items: center;
  border-radius: 50%;
  display: inline-flex;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.12rem;
  height: 52px;
  justify-content: center;
  position: relative;
  width: 52px;
  z-index: 1;
}

.atom + .atom {
  margin-left: 12px;
}

.atom + .atom::before {
  background: var(--line);
  content: '';
  height: 3px;
  left: -14px;
  position: absolute;
  top: calc(50% - 1px);
  width: 16px;
  z-index: -1;
}

.hydrogen {
  background: rgba(229, 239, 244, 0.98);
  color: var(--accent-3);
}

.oxygen {
  background: rgba(245, 218, 211, 0.96);
  color: var(--accent);
}

.water .atom {
  height: 48px;
  width: 48px;
}

.water .hydrogen {
  height: 42px;
  width: 42px;
}

.symbolic-view {
  text-align: center;
}

.symbolic-view > span {
  color: var(--accent);
  display: block;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.09em;
  margin-bottom: 1.25rem;
  text-transform: uppercase;
}

.symbolic-view strong {
  display: block;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 4rem;
  font-weight: 500;
  line-height: 1;
}

.symbolic-view p {
  color: var(--muted) !important;
  font-size: 1.2rem !important;
  margin-top: 1.3rem !important;
}

.ratio-view strong {
  color: var(--accent);
  font-size: 5.1rem;
}

.lens-caption {
  color: var(--muted) !important;
  font-size: 0.96rem !important;
  margin: 0.7rem 0 0 !important;
  text-align: center;
}
</style>
