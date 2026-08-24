<script setup lang="ts">
import { useIsSlideActive } from '@slidev/client'
import { defineAsyncComponent, onMounted, ref } from 'vue'

type MoleculeName = 'CO2' | 'H2O' | 'CH4'
type ViewName = 'front' | 'oblique' | 'top'

const isActive = useIsSlideActive()
const molecule = ref<MoleculeName>('H2O')
const view = ref<ViewName>('front')
const rotationX = ref(0)
const rotationY = ref(0)
const supported = ref<boolean | null>(null)
const sceneError = ref(false)

const MoleculeGeometryScene = defineAsyncComponent({
  loader: () => import('./MoleculeGeometryScene.vue'),
  delay: 120,
  timeout: 10000,
  onError: (_error, _retry, fail) => {
    sceneError.value = true
    fail()
  },
})

onMounted(() => {
  const probe = document.createElement('canvas')
  supported.value = Boolean(probe.getContext('webgl2') || probe.getContext('webgl'))
})

function reset() {
  molecule.value = 'H2O'
  view.value = 'front'
  rotationX.value = 0
  rotationY.value = 0
}

function chooseView(option: ViewName) {
  view.value = option
  rotationX.value = 0
  rotationY.value = 0
}
</script>

<template>
  <section class="molecule-study" aria-label="On-demand 3D molecular geometry comparison">
    <div class="molecule-stage">
      <Suspense v-if="supported && !sceneError && isActive">
        <MoleculeGeometryScene :molecule="molecule" :view="view" :rotation-x="rotationX" :rotation-y="rotationY" @error="sceneError = true" />
        <template #fallback><div class="webgl-fallback">Loading the on-demand 3D scene…</div></template>
      </Suspense>
      <div v-else class="webgl-fallback">
        <strong>{{ supported === false || sceneError ? '3D unavailable' : '3D preview paused' }}</strong>
        <p>CO₂ is linear · H₂O is bent · CH₄ is tetrahedral</p>
      </div>
    </div>

    <div class="molecule-controls">
      <span>molecule</span>
      <div class="molecule-options">
        <button v-for="option in (['CO2', 'H2O', 'CH4'] as MoleculeName[])" :key="option" type="button" :class="{ active: molecule === option }" @click="molecule = option">{{ option === 'CO2' ? 'CO₂' : option === 'H2O' ? 'H₂O' : 'CH₄' }}</button>
      </div>
      <strong>{{ molecule === 'CO2' ? 'linear · 180°' : molecule === 'H2O' ? 'bent · 104.5°' : 'tetrahedral · 109.5°' }}</strong>
      <span>fixed viewpoint</span>
      <div class="molecule-options">
        <button v-for="option in (['front', 'oblique', 'top'] as ViewName[])" :key="option" type="button" :class="{ active: view === option }" @click="chooseView(option)">{{ option }}</button>
      </div>
      <span class="rotation-heading">user rotation</span>
      <div class="rotation-controls">
        <label><span>tilt {{ rotationX }}°</span><input v-model.number="rotationX" type="range" min="-60" max="60" step="10" aria-label="Tilt molecule" /></label>
        <label><span>turn {{ rotationY }}°</span><input v-model.number="rotationY" type="range" min="-180" max="180" step="15" aria-label="Turn molecule" /></label>
      </div>
      <button class="lab-button" type="button" @click="reset">Reset view</button>
      <p>Render mode: on demand. The WebGL scene is dynamically loaded only on this study.</p>
    </div>
  </section>
</template>
