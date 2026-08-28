<script setup lang="ts">
import { onSlideEnter, onSlideLeave } from '@slidev/client'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { BoilingModel, MAX_BOIL_OBJECTS } from '../../visual-lab/lib/boilingModel'
import { millerUreyBoilingFragmentShader, millerUreyBoilingVertexShader } from '../lib/millerUreyBoilingShaders'

const props = defineProps<{
  boundaryPath: string
  enabled: boolean
  staticState?: boolean
}>()
const emit = defineEmits<{ ready: [] }>()

const host = ref<HTMLDivElement | null>(null)
const rendererState = ref<'loading' | 'ready' | 'error'>('loading')
const boundaryMaskState = ref<'loading' | 'ready' | 'error'>('loading')
const boundaryContainsFlask = ref(false)
const loopState = ref<'running' | 'paused' | 'static'>('paused')
const gasBubbles = ref(0)
const activeBubbles = ref(0)
const surfaceBursts = ref(0)
const model = new BoilingModel(100, 'rolling')
const MILLER_WATER_LEVEL_OFFSET = 0.11
const shiftedBubbleData = new Float32Array(MAX_BOIL_OBJECTS * 4)

let app: import('pixi.js').Application | undefined
let uniforms: import('pixi.js').UniformGroup | undefined
let elapsed = 0
let lastFrame = 0
let disposed = false

const shouldRun = computed(() => props.enabled && !props.staticState)

function applyBoundaryMask() {
  if (!host.value || !props.boundaryPath) {
    boundaryMaskState.value = 'error'
    return
  }
  try {
    const maskCanvas = document.createElement('canvas')
    maskCanvas.width = 652
    maskCanvas.height = 607
    const context = maskCanvas.getContext('2d')
    if (!context) throw new Error('2D mask context unavailable')
    const sourcedPath = new Path2D(props.boundaryPath)
    boundaryContainsFlask.value = context.isPointInPath(sourcedPath, 486, 450, 'nonzero')
    context.fillStyle = '#ffffff'
    context.fill(sourcedPath, 'nonzero')
    const maskUrl = `url("${maskCanvas.toDataURL('image/png')}")`
    host.value.style.maskImage = maskUrl
    host.value.style.webkitMaskImage = maskUrl
    boundaryMaskState.value = 'ready'
  }
  catch (error) {
    boundaryMaskState.value = 'error'
    console.error('Miller–Urey source boundary mask failed', error)
  }
}

function updateUniforms() {
  if (!uniforms) return
  uniforms.uniforms.uTime = elapsed
  uniforms.uniforms.uActivity = model.current.activity
  uniforms.uniforms.uConvection = model.current.convection
  // The source flask occupies only ~90 px on the projected slide, so preserve
  // the same physics but slightly amplify its surface displacement for legibility.
  uniforms.uniforms.uSurfaceAmplitude = model.current.surfaceAmplitude * 1.35
  shiftedBubbleData.set(model.uniformData)
  for (let index = 0; index < MAX_BOIL_OBJECTS; index++) {
    const dataOffset = index * 4
    if (shiftedBubbleData[dataOffset + 2] > 0.0001)
      shiftedBubbleData[dataOffset + 1] += MILLER_WATER_LEVEL_OFFSET
  }
  uniforms.uniforms.uBubbleData = shiftedBubbleData
  gasBubbles.value = model.gasCount
  activeBubbles.value = model.activeCount
  surfaceBursts.value = model.surfaceBurstCount
}

function renderStatic() {
  if (!app || rendererState.value !== 'ready') return
  app.stop()
  model.reset()
  model.step(0.05, 1.25)
  elapsed = 1.25
  updateUniforms()
  app.renderer.render(app.stage)
  loopState.value = 'static'
}

function start() {
  if (!app || rendererState.value !== 'ready') return
  if (!shouldRun.value) {
    props.staticState ? renderStatic() : stop()
    return
  }
  lastFrame = performance.now()
  app.start()
  loopState.value = 'running'
}

function stop() {
  app?.stop()
  if (app && loopState.value !== 'static') loopState.value = 'paused'
}

function reset() {
  elapsed = 0
  lastFrame = performance.now()
  model.reset()
  updateUniforms()
  app?.renderer.render(app.stage)
  if (shouldRun.value) start()
}

function tick() {
  const now = performance.now()
  const deltaSeconds = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 1 / 60
  lastFrame = now
  elapsed += deltaSeconds
  model.step(deltaSeconds, elapsed)
  updateUniforms()
}

async function initialise() {
  await nextTick()
  if (!host.value || disposed) return
  applyBoundaryMask()
  try {
    const pixi = await import('pixi.js')
    if (!host.value || disposed) return
    const nextApp = new pixi.Application()
    await nextApp.init({
      antialias: true,
      autoDensity: true,
      autoStart: false,
      backgroundAlpha: 0,
      height: 607,
      powerPreference: 'high-performance',
      preference: 'webgl',
      preserveDrawingBuffer: true,
      resolution: Math.min(window.devicePixelRatio || 1, 1.5),
      width: 652,
    })
    if (!host.value || disposed) {
      nextApp.destroy({ removeView: true }, { children: true })
      return
    }
    app = nextApp
    app.canvas.className = 'miller-boiling-canvas'
    app.canvas.setAttribute('aria-hidden', 'true')
    host.value.appendChild(app.canvas)

    const geometry = new pixi.MeshGeometry({
      indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
      positions: new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
      uvs: new Float32Array([0, 1, 1, 1, 1, 0, 0, 0]),
    })
    uniforms = new pixi.UniformGroup({
      uActivity: { value: model.current.activity, type: 'f32' },
      uBubbleData: { value: shiftedBubbleData, type: 'vec4<f32>', size: MAX_BOIL_OBJECTS },
      uConvection: { value: model.current.convection, type: 'f32' },
      uSurfaceAmplitude: { value: model.current.surfaceAmplitude, type: 'f32' },
      uTime: { value: 0, type: 'f32' },
    })
    const shader = pixi.Shader.from({
      gl: { fragment: millerUreyBoilingFragmentShader, vertex: millerUreyBoilingVertexShader },
      resources: { boilingUniforms: uniforms },
    })
    app.stage.addChild(new pixi.Mesh({ geometry, shader }))
    app.ticker.add(tick)
    model.reset()
    updateUniforms()
    rendererState.value = 'ready'
    emit('ready')
    app.renderer.render(app.stage)
    props.staticState ? renderStatic() : start()
  }
  catch (error) {
    rendererState.value = 'error'
    console.error('Miller–Urey boiling renderer failed', error)
  }
}

watch(() => [props.enabled, props.staticState] as const, () => props.staticState ? renderStatic() : start())
watch(() => props.boundaryPath, applyBoundaryMask, { flush: 'post' })
onSlideEnter(start)
onSlideLeave(stop)

onMounted(initialise)
onUnmounted(() => {
  disposed = true
  stop()
  app?.destroy({ removeView: true }, { children: true })
  app = undefined
  uniforms = undefined
})

defineExpose({ reset })
</script>

<template>
  <svg
    class="miller-boiling"
    viewBox="0 0 652 607"
    preserveAspectRatio="xMidYMid meet"
    :data-active-bubbles="activeBubbles"
    :data-gas-bubbles="gasBubbles"
    :data-boundary-mask-state="boundaryMaskState"
    :data-boundary-contains-flask="boundaryContainsFlask"
    :data-loop-state="loopState"
    :data-renderer-state="rendererState"
    :data-surface-bursts="surfaceBursts"
    aria-hidden="true"
  >
    <foreignObject x="0" y="0" width="652" height="607">
      <div ref="host" class="miller-boiling-host" :data-boundary-length="boundaryPath.length" data-source-boundary="path5114-outer" xmlns="http://www.w3.org/1999/xhtml" />
    </foreignObject>
  </svg>
</template>

<style scoped>
.miller-boiling {
  display: block;
  height: 100%;
  inset: 0;
  pointer-events: none;
  position: absolute;
  width: 100%;
  z-index: 2;
}

.miller-boiling-host {
  height: 607px;
  mask-position: 0 0;
  mask-repeat: no-repeat;
  mask-size: 652px 607px;
  -webkit-mask-position: 0 0;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 652px 607px;
  width: 652px;
}

.miller-boiling :deep(.miller-boiling-canvas) {
  display: block;
  height: 607px !important;
  max-width: none;
  width: 652px !important;
}
</style>
