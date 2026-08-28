<script setup lang="ts">
import { onSlideEnter, onSlideLeave, useIsSlideActive } from '@slidev/client'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { Application, Ticker, UniformGroup } from 'pixi.js'
import { BoilingModel, type BoilIntensity, MAX_BOIL_OBJECTS, resolveIntensity } from '../lib/boilingModel'
import { boilingFragmentShader, boilingVertexShader } from '../lib/boilingShaders'

const props = withDefaults(defineProps<{
  debug?: boolean
  intensity?: BoilIntensity
  temperature?: number
}>(), {
  debug: false,
  intensity: undefined,
  temperature: 100,
})

const host = ref<HTMLDivElement | null>(null)
const isActive = useIsSlideActive()
const rendererState = ref<'loading' | 'ready' | 'error'>('loading')
const errorMessage = ref('')
const fps = ref(0)
const activeBubbles = ref(0)
const gasBubbles = ref(0)
const loopState = ref<'loading' | 'running' | 'paused' | 'static'>('loading')
const surfaceBursts = ref(0)
const model = new BoilingModel(props.temperature, props.intensity)
const effectiveIntensity = computed(() => resolveIntensity(props.temperature, props.intensity))
const nucleationPoints = [
  [0.24, 0.856], [0.34, 0.867], [0.47, 0.852], [0.59, 0.866], [0.72, 0.854],
  [0.184, 0.68], [0.812, 0.74],
]

let app: Application | undefined
let uniforms: UniformGroup | undefined
let disposed = false
let elapsed = 0
let fpsFrames = 0
let fpsStart = 0
let motionObserver: MutationObserver | undefined

function motionReduced() {
  return document.documentElement.classList.contains('lab-reduced-motion')
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function updateUniforms() {
  if (!uniforms) return
  uniforms.uniforms.uTime = elapsed
  uniforms.uniforms.uActivity = model.current.activity
  uniforms.uniforms.uConvection = model.current.convection
  uniforms.uniforms.uDebug = props.debug ? 1 : 0
  uniforms.uniforms.uSteam = model.current.steam
  uniforms.uniforms.uSurfaceAmplitude = model.current.surfaceAmplitude
  uniforms.uniforms.uBubbleData = model.uniformData
}

function renderStatic() {
  if (!app) return
  loopState.value = 'static'
  model.reset()
  for (let step = 0; step < 84; step += 1) model.step(1 / 60, step / 60)
  elapsed = 1.4
  updateUniforms()
  app.renderer.render(app.stage)
  activeBubbles.value = model.activeCount
  gasBubbles.value = model.gasCount
  surfaceBursts.value = model.surfaceBurstCount
  fps.value = 0
}

function tick(ticker: Ticker) {
  if (!isActive.value || motionReduced()) return
  const deltaSeconds = Math.min(ticker.deltaMS / 1000, 0.05)
  elapsed += deltaSeconds
  model.step(deltaSeconds, elapsed)
  updateUniforms()
  activeBubbles.value = model.activeCount
  gasBubbles.value = model.gasCount
  surfaceBursts.value = model.surfaceBurstCount
  fpsFrames += 1
  if (!fpsStart) fpsStart = performance.now()
  const now = performance.now()
  if (now - fpsStart >= 600) {
    fps.value = Math.round((fpsFrames * 1000) / (now - fpsStart))
    fpsFrames = 0
    fpsStart = now
  }
}

function start() {
  if (!app || rendererState.value !== 'ready') return
  if (!isActive.value) {
    app.stop()
    loopState.value = 'paused'
    return
  }
  if (motionReduced()) {
    app.stop()
    renderStatic()
    return
  }
  app.start()
  loopState.value = 'running'
}

function stop() {
  app?.stop()
  if (app && loopState.value !== 'static') loopState.value = 'paused'
}

function reset() {
  elapsed = 0
  model.reset()
  activeBubbles.value = model.activeCount
  gasBubbles.value = model.gasCount
  surfaceBursts.value = model.surfaceBurstCount
  updateUniforms()
  app?.renderer.render(app.stage)
}

function syncMotionPreference() {
  motionReduced() ? renderStatic() : start()
}

async function initialise() {
  await nextTick()
  if (!host.value || disposed) return
  try {
    const pixi = await import('pixi.js')
    if (disposed || !host.value) return
    const nextApp = new pixi.Application()
    await nextApp.init({
      antialias: true,
      autoDensity: true,
      autoStart: false,
      backgroundAlpha: 0,
      height: 500,
      powerPreference: 'high-performance',
      preference: 'webgl',
      preserveDrawingBuffer: true,
      resolution: Math.min(window.devicePixelRatio || 1, 1.5),
      width: 720,
    })
    if (disposed || !host.value) {
      nextApp.destroy({ removeView: true }, { children: true })
      return
    }
    app = nextApp
    app.canvas.className = 'boiling-webgl-canvas'
    app.canvas.setAttribute('aria-hidden', 'true')
    app.canvas.style.display = 'block'
    app.canvas.style.height = '100%'
    app.canvas.style.width = '100%'
    host.value.appendChild(app.canvas)

    const geometry = new pixi.MeshGeometry({
      indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
      positions: new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
      uvs: new Float32Array([0, 1, 1, 1, 1, 0, 0, 0]),
    })
    uniforms = new pixi.UniformGroup({
      uActivity: { value: model.current.activity, type: 'f32' },
      uBubbleData: { value: model.uniformData, type: 'vec4<f32>', size: MAX_BOIL_OBJECTS },
      uConvection: { value: model.current.convection, type: 'f32' },
      uDebug: { value: props.debug ? 1 : 0, type: 'f32' },
      uSteam: { value: model.current.steam, type: 'f32' },
      uSurfaceAmplitude: { value: model.current.surfaceAmplitude, type: 'f32' },
      uTime: { value: 0, type: 'f32' },
    })
    const shader = pixi.Shader.from({
      gl: { fragment: boilingFragmentShader, vertex: boilingVertexShader },
      resources: { boilingUniforms: uniforms },
    })
    app.stage.addChild(new pixi.Mesh({ geometry, shader }))
    app.ticker.add(tick)
    model.reset()
    updateUniforms()
    rendererState.value = 'ready'
    app.renderer.render(app.stage)
    start()
  }
  catch (error) {
    rendererState.value = 'error'
    errorMessage.value = error instanceof Error ? error.message : 'WebGL renderer unavailable'
  }
}

watch(() => [props.temperature, props.intensity] as const, ([temperature, intensity]) => {
  model.setState(temperature, intensity)
  if (motionReduced()) renderStatic()
})
watch(() => props.debug, updateUniforms)
watch(isActive, active => active ? start() : stop())
onSlideEnter(start)
onSlideLeave(stop)

onMounted(() => {
  initialise()
  window.addEventListener('visual-lab-motion-change', syncMotionPreference)
  motionObserver = new MutationObserver(syncMotionPreference)
  motionObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  disposed = true
  stop()
  motionObserver?.disconnect()
  window.removeEventListener('visual-lab-motion-change', syncMotionPreference)
  app?.destroy({ removeView: true }, { children: true })
  app = undefined
  uniforms = undefined
})

defineExpose({ reset })
</script>

<template>
  <figure
    class="boiling-beaker"
    :data-active-bubbles="activeBubbles"
    :data-debug="debug"
    :data-gas-bubbles="gasBubbles"
    :data-intensity="effectiveIntensity"
    :data-loop-state="loopState"
    :data-renderer-state="rendererState"
    :data-surface-bursts="surfaceBursts"
    :data-temperature="temperature"
    aria-label="WebGL visualization of water in a laboratory beaker"
  >
    <div ref="host" class="boiling-webgl-host" />
    <div v-if="rendererState === 'error'" class="boiling-fallback" role="status">
      <span>WebGL unavailable</span>
      <small>{{ errorMessage }}</small>
    </div>

    <svg class="boiling-glass" viewBox="0 0 720 500" aria-hidden="true">
      <defs>
        <linearGradient id="glass-edge" x1="0" x2="1">
          <stop offset="0" stop-color="#315c78" stop-opacity=".5" />
          <stop offset=".16" stop-color="#ffffff" stop-opacity=".76" />
          <stop offset=".78" stop-color="#ffffff" stop-opacity=".18" />
          <stop offset="1" stop-color="#315c78" stop-opacity=".48" />
        </linearGradient>
      </defs>
      <path class="beaker-heat" d="M154 452 Q360 486 566 452 L542 476 Q360 499 178 476 Z" />
      <path class="glass-body" d="M121 58 L124 407 Q124 437 159 448 Q360 472 561 448 Q596 437 599 407 L599 58" />
      <ellipse class="glass-rim-outer" cx="360" cy="58" rx="240" ry="18" />
      <ellipse class="glass-rim-inner" cx="360" cy="58" rx="225" ry="11" />
      <path class="glass-highlight" d="M143 84 L146 394 Q147 420 176 429" />
      <g class="beaker-graduations">
        <line v-for="(y, index) in [352, 300, 248, 196]" :key="y" x1="140" :x2="index % 2 ? 171 : 184" :y1="y" :y2="y" />
        <text x="191" y="357">100</text>
        <text x="191" y="305">200</text>
        <text x="191" y="253">300</text>
        <text x="191" y="201">400 mL</text>
      </g>
      <g v-if="debug" class="boiling-debug-svg">
        <path d="M121 58 L124 407 Q124 437 159 448 Q360 472 561 448 Q596 437 599 407 L599 58" />
        <circle v-for="([x, y], index) in nucleationPoints" :key="index" :cx="x * 720" :cy="y * 500" r="4" />
      </g>
    </svg>

    <figcaption v-if="debug" class="boiling-debug-readout" aria-live="polite">
      <span>WebGL · {{ fps || '—' }} fps</span>
      <span>{{ gasBubbles }} gas · {{ activeBubbles - gasBubbles }} splash</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.boiling-beaker {
  aspect-ratio: 720 / 500;
  isolation: isolate;
  margin: 0;
  max-height: 100%;
  overflow: visible;
  position: relative;
  width: 100%;
}

.boiling-webgl-host,
.boiling-glass,
.boiling-fallback {
  inset: 0;
  position: absolute;
}

.boiling-webgl-host {
  z-index: 1;
}

.boiling-webgl-host :deep(.boiling-webgl-canvas) {
  display: block;
  height: 100%;
  width: 100%;
}

.boiling-glass {
  height: 100%;
  overflow: visible;
  width: 100%;
  z-index: 2;
}

.glass-body,
.glass-rim-outer,
.glass-rim-inner,
.glass-highlight {
  fill: none;
  vector-effect: non-scaling-stroke;
}

.glass-body {
  stroke: url(#glass-edge);
  stroke-linecap: round;
  stroke-width: 3.2;
}

.glass-rim-outer {
  fill: rgba(255, 255, 255, 0.08);
  stroke: rgba(49, 92, 120, 0.5);
  stroke-width: 3;
}

.glass-rim-inner {
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 1.5;
}

.glass-highlight {
  stroke: rgba(255, 255, 255, 0.78);
  stroke-linecap: round;
  stroke-width: 6;
}

.beaker-heat {
  fill: rgba(155, 73, 55, 0.17);
  stroke: rgba(155, 73, 55, 0.5);
  stroke-width: 1.5;
}

.beaker-graduations {
  fill: var(--lab-muted);
  font: 600 12px/1 Inter, sans-serif;
  opacity: 0.58;
}

.beaker-graduations line {
  stroke: var(--lab-muted);
  stroke-width: 1.4;
}

.boiling-fallback {
  align-items: center;
  color: var(--lab-muted);
  display: flex;
  flex-direction: column;
  font-family: Georgia, "Times New Roman", serif;
  justify-content: center;
  z-index: 1;
}

.boiling-fallback span {
  font-size: 1.35rem;
}

.boiling-fallback small {
  font: 0.7rem Inter, sans-serif;
  margin-top: 0.5rem;
  max-width: 70%;
  text-align: center;
}

.boiling-debug-svg path {
  fill: none;
  stroke: var(--lab-rust);
  stroke-dasharray: 5 7;
  stroke-width: 1;
}

.boiling-debug-svg circle {
  fill: var(--lab-rust);
  opacity: 0.78;
}

.boiling-debug-readout {
  align-items: center;
  background: rgba(251, 250, 246, 0.88);
  bottom: 5.5%;
  color: var(--lab-muted);
  display: flex;
  font: 700 0.65rem/1 Inter, sans-serif;
  gap: 18px;
  left: 50%;
  padding: 7px 10px;
  position: absolute;
  transform: translateX(-50%);
  z-index: 4;
}

@media (prefers-reduced-motion: reduce) {
  .boiling-webgl-host :deep(canvas) {
    image-rendering: auto;
  }
}
</style>
