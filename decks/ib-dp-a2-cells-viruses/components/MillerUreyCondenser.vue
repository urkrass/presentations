<script setup lang="ts">
import { onSlideEnter, onSlideLeave } from '@slidev/client'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  MAX_CONDENSATE_DROPS,
  MAX_DETACHED_DROPS,
  MAX_RIVULET_TRAIL_SEGMENTS,
  MillerUreyCondensationModel,
  TRAP_SURFACE_SAMPLE_COUNT,
} from '../lib/millerUreyCondensationModel'
import {
  condenserWallA,
  condenserWallB,
  millerUreyCondenserPath,
  surfacePositionAt,
  type CondenserSurfaceSide,
} from '../lib/millerUreyCondenserPath'
import { millerUreyCondenserFragmentShader, millerUreyCondenserVertexShader } from '../lib/millerUreyCondenserShaders'

const props = defineProps<{
  boundaryPath: string
  debug?: boolean
  enabled: boolean
  frontGlassPath: string
  staticState?: boolean
  trapLiquidPath: string
}>()
const emit = defineEmits<{ ready: [] }>()

const FIXED_STEP = 1 / 60
const MAX_SUBSTEPS = 6

const host = ref<HTMLDivElement | null>(null)
const debugCanvas = ref<HTMLCanvasElement | null>(null)
const rendererState = ref<'loading' | 'ready' | 'error'>('loading')
const boundaryMaskState = ref<'loading' | 'ready' | 'error'>('loading')
const boundaryContainsCondenser = ref(false)
const loopState = ref<'running' | 'paused' | 'settled' | 'static'>('paused')
const debugRequested = ref(false)
const activeDrops = ref(0)
const pinnedDrops = ref(0)
const slidingDrops = ref(0)
const pooledDrops = ref(0)
const coalescences = ref(0)
const feedEvents = ref(0)
const wetRegionAbsorptions = ref(0)
const poolEvents = ref(0)
const drainEvents = ref(0)
const detachmentEvents = ref(0)
const constraintViolations = ref(0)
const trailPoints = ref(0)
const collectedFraction = ref(0)
const rivuletState = ref('inactive')
const rivuletHeadProgress = ref(0)
const rivuletHeadVisible = ref(false)
const rivuletFormations = ref(0)
const trapMergeProgress = ref(0)
const trapMassBalanceError = ref(0)
const trapPoolActive = ref(false)
const trapPoolActivity = ref(0)
const trapPoolMaximumDisplacement = ref(0)
const trapPoolReceivedMass = ref(0)
const lifecycleState = ref('condensing')
const systemMassBalanceError = ref(0)
const renderedTrapLiquidPath = ref('')
const maximumTrailSpan = ref(0)
const maximumTrailChordError = ref(0)
const renderedSurfaceDropSlots = ref(0)
const renderedTrailSegments = ref(0)
const rejectedTrailSegments = ref(0)
const wetRegionStart = ref(0)
const wetRegionEnd = ref(0)
const wetRegionSurface = ref('none')
const terminalWallADrains = ref(0)
const terminalWallBDrains = ref(0)
const model = new MillerUreyCondensationModel()

let app: import('pixi.js').Application | undefined
let uniforms: import('pixi.js').UniformGroup | undefined
let elapsed = 0
let accumulator = 0
let lastFrame = 0
let disposed = false

const shouldRun = computed(() => props.enabled && !props.staticState)
const debugEnabled = computed(() => Boolean(props.debug || debugRequested.value))

const TRAP_SURFACE_PREFIX_TOKEN = 'L 273.280762 496.156219'

function updateRenderedTrapLiquidPath() {
  const source = props.trapLiquidPath
  const surfaceStart = source.lastIndexOf(TRAP_SURFACE_PREFIX_TOKEN)
  if (!source || surfaceStart < 0) {
    renderedTrapLiquidPath.value = source
    return
  }

  const prefix = source.slice(0, surfaceStart + TRAP_SURFACE_PREFIX_TOKEN.length)
  const points = Array.from({ length: TRAP_SURFACE_SAMPLE_COUNT }, (_, index) => {
    const sourceIndex = TRAP_SURFACE_SAMPLE_COUNT - 1 - index
    const offset = sourceIndex * 4
    return {
      x: model.trapSurfaceData[offset],
      y: model.trapSurfaceData[offset + 1],
    }
  })
  let surface = ''
  for (let index = 0; index < points.length - 1; index += 1) {
    const before = points[Math.max(0, index - 1)]
    const current = points[index]
    const next = points[index + 1]
    const after = points[Math.min(points.length - 1, index + 2)]
    const control1 = {
      x: current.x + (next.x - before.x) / 6,
      y: current.y + (next.y - before.y) / 6,
    }
    const control2 = {
      x: next.x - (after.x - current.x) / 6,
      y: next.y - (after.y - current.y) / 6,
    }
    surface += ` C ${control1.x.toFixed(4)} ${control1.y.toFixed(4)} ${control2.x.toFixed(4)} ${control2.y.toFixed(4)} ${next.x.toFixed(4)} ${next.y.toFixed(4)}`
  }
  renderedTrapLiquidPath.value = `${prefix}${surface} Z`
}

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
    boundaryContainsCondenser.value = context.isPointInPath(sourcedPath, 186, 380, 'nonzero')
    context.fillStyle = '#ffffff'
    context.fill(sourcedPath, 'nonzero')
    const maskUrl = `url("${maskCanvas.toDataURL('image/png')}")`
    host.value.style.maskImage = maskUrl
    host.value.style.webkitMaskImage = maskUrl
    boundaryMaskState.value = 'ready'
  }
  catch (error) {
    boundaryMaskState.value = 'error'
    console.error('Miller–Urey condenser source boundary mask failed', error)
  }
}

function drawDebug() {
  const canvas = debugCanvas.value
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return
  context.clearRect(0, 0, canvas.width, canvas.height)
  if (!debugEnabled.value) return

  const snapshot = model.getDebugSnapshot()
  context.save()
  context.font = '10px ui-monospace, SFMono-Regular, Consolas, monospace'
  context.lineCap = 'round'
  context.lineJoin = 'round'

  const region = snapshot.wetRegion
  context.fillStyle = 'rgba(251, 250, 246, .90)'
  context.fillRect(6, 6, 238, 58)
  context.fillStyle = 'rgba(23, 23, 23, .92)'
  context.fillText(`active ${snapshot.drops.length} · pooled ${model.pooledCount} · absorbed ${snapshot.absorbedDropCount}`, 12, 22)
  context.fillText(
    region ? `wet ${region.surface} ${region.startS.toFixed(1)}–${region.endS.toFixed(1)}` : 'wet none',
    12,
    38,
  )
  context.fillText(
    `head ${snapshot.rivulet?.headS.toFixed(1) ?? 'none'} · receiver ${snapshot.trapPool.active ? 'yes' : 'no'}`,
    12,
    54,
  )

  if (region) {
    const start = surfacePositionAt(region.startS, region.surface)
    const end = surfacePositionAt(region.endS, region.surface)
    for (const [point, label] of [[start, 'wet start'], [end, 'wet end']] as const) {
      context.beginPath()
      context.arc(point.x, point.y, 3.4, 0, Math.PI * 2)
      context.fillStyle = 'rgba(167, 72, 48, .94)'
      context.fill()
      context.fillText(label, point.x + 5, point.y + 3)
    }
  }

  context.beginPath()
  for (let s = 0; s <= millerUreyCondenserPath.length; s += 2.5) {
    const point = millerUreyCondenserPath.pointAt(s)
    if (s === 0) context.moveTo(point.x, point.y)
    else context.lineTo(point.x, point.y)
  }
  const pathEnd = millerUreyCondenserPath.pointAt(millerUreyCondenserPath.length)
  context.lineTo(pathEnd.x, pathEnd.y)
  context.strokeStyle = 'rgba(31, 150, 176, .92)'
  context.lineWidth = 1.25
  context.stroke()

  const wallColours: Record<CondenserSurfaceSide, string> = {
    'wall-a': 'rgba(178, 91, 58, .92)',
    'wall-b': 'rgba(100, 79, 145, .92)',
  }
  for (const surface of [condenserWallA, condenserWallB]) {
    context.beginPath()
    for (let s = 0; s <= surface.length; s += 2.5) {
      const point = surface.pointAt(s)
      if (s === 0) context.moveTo(point.x, point.y)
      else context.lineTo(point.x, point.y)
    }
    const end = surface.pointAt(surface.length)
    context.lineTo(end.x, end.y)
    context.strokeStyle = wallColours[surface.side]
    context.lineWidth = 1
    context.stroke()
  }

  for (let s = 0; s <= millerUreyCondenserPath.length; s += 24) {
    const point = millerUreyCondenserPath.pointAt(s)
    const tangent = millerUreyCondenserPath.tangentAt(s)
    const normal = millerUreyCondenserPath.normalAt(s)
    context.beginPath()
    context.moveTo(point.x, point.y)
    context.lineTo(point.x + tangent.x * 10, point.y + tangent.y * 10)
    context.strokeStyle = 'rgba(35, 102, 142, .72)'
    context.lineWidth = 0.8
    context.stroke()
    context.beginPath()
    context.moveTo(point.x - normal.x * 6, point.y - normal.y * 6)
    context.lineTo(point.x + normal.x * 6, point.y + normal.y * 6)
    context.strokeStyle = 'rgba(112, 109, 102, .68)'
    context.stroke()
    context.fillStyle = 'rgba(35, 102, 142, .88)'
    context.fillText(`g·t ${tangent.y.toFixed(2)}`, point.x + 5, point.y - 5)
  }

  if (snapshot.trail.length > 1) {
    context.beginPath()
    snapshot.trail.forEach((trailPoint, index) => {
      const point = surfacePositionAt(trailPoint.s, trailPoint.surface)
      if (index === 0) context.moveTo(point.x, point.y)
      else context.lineTo(point.x, point.y)
    })
    context.strokeStyle = 'rgba(49, 91, 125, .88)'
    context.lineWidth = 1
    context.stroke()
    context.fillStyle = 'rgba(49, 91, 125, .88)'
    snapshot.trail.forEach((trailPoint) => {
      const point = surfacePositionAt(trailPoint.s, trailPoint.surface)
      context.beginPath()
      context.arc(point.x, point.y, Math.max(1, trailPoint.width), 0, Math.PI * 2)
      context.fill()
    })
  }

  const stateColours = {
    pinned: '#c58a35',
    pooled: '#875b91',
    sliding: '#3f7a61',
  }
  snapshot.drops.forEach((drop) => {
    context.beginPath()
    context.arc(drop.position.x, drop.position.y, Math.max(2.2, drop.radius), 0, Math.PI * 2)
    context.strokeStyle = wallColours[drop.surface]
    context.lineWidth = 1.15
    context.stroke()
    context.fillStyle = stateColours[drop.state]
    context.fillText(`${drop.surface.slice(-1)} ${drop.state[0]} s=${drop.s.toFixed(0)}`, drop.position.x + 5, drop.position.y - 4)
    context.beginPath()
    context.moveTo(drop.position.x, drop.position.y)
    context.lineTo(drop.position.x + drop.normal.x * 7, drop.position.y + drop.normal.y * 7)
    context.strokeStyle = wallColours[drop.surface]
    context.stroke()
  })

  if (snapshot.rivulet) {
    const head = snapshot.rivulet
    context.beginPath()
    context.arc(head.position.x, head.position.y, 4.5, 0, Math.PI * 2)
    context.fillStyle = wallColours[head.surface]
    context.fill()
    context.fillText(`${head.surface} ${head.state} s=${head.headS.toFixed(0)}`, head.position.x + 7, head.position.y - 7)
  }

  if (snapshot.trapPool.active) {
    context.beginPath()
    snapshot.trapPool.samples.forEach((sample, index) => {
      if (index === 0) context.moveTo(sample.x, sample.y)
      else context.lineTo(sample.x, sample.y)
    })
    context.strokeStyle = 'rgba(73, 107, 90, .96)'
    context.lineWidth = 1.4
    context.stroke()
    context.fillStyle = 'rgba(73, 107, 90, .96)'
    snapshot.trapPool.samples.forEach((sample) => {
      context.beginPath()
      context.arc(sample.x, sample.y, 1.25, 0, Math.PI * 2)
      context.fill()
    })
    const receiver = snapshot.trapPool.samples[Math.floor(snapshot.trapPool.samples.length / 2)]
    context.fillText(
      `receive ${(snapshot.trapPool.transferProgress * 100).toFixed(0)}% · Δm ${snapshot.trapPool.massBalanceError.toExponential(1)}`,
      receiver.x + 8,
      receiver.y + 20,
    )
  }

  context.beginPath()
  context.arc(snapshot.detachmentPoint.x, snapshot.detachmentPoint.y, 4, 0, Math.PI * 2)
  context.strokeStyle = snapshot.outletMode === 'detach' ? '#a33f32' : '#496b5a'
  context.lineWidth = 1.4
  context.stroke()
  context.fillStyle = context.strokeStyle
  context.fillText(snapshot.outletMode === 'detach' ? 'detachment' : 'trap pool', snapshot.detachmentPoint.x + 7, snapshot.detachmentPoint.y + 12)
  context.restore()
}

function updateUniforms() {
  if (uniforms) {
    // Pixi may retain an array-backed uniform when its typed-array identity does
    // not change. Fresh buffers guarantee that absorbed/cleared drop slots and
    // wall-changing trail samples are uploaded together. Otherwise a new sample
    // can be joined to stale coordinates from the previous wall and briefly draw
    // an impossible cross-lumen stream.
    const surfaceDropData = model.activeCount === 0
      ? new Float32Array(MAX_CONDENSATE_DROPS * 4)
      : new Float32Array(model.surfaceDropData)
    const surfaceDropShape = model.activeCount === 0
      ? new Float32Array(MAX_CONDENSATE_DROPS * 4)
      : new Float32Array(model.surfaceDropShape)
    const trailSegmentStartData = model.trailSegmentCount === 0
      ? new Float32Array(MAX_RIVULET_TRAIL_SEGMENTS * 4)
      : new Float32Array(model.trailSegmentStartData)
    const trailSegmentEndData = model.trailSegmentCount === 0
      ? new Float32Array(MAX_RIVULET_TRAIL_SEGMENTS * 4)
      : new Float32Array(model.trailSegmentEndData)
    uniforms.uniforms.uActivity = 1
    uniforms.uniforms.uCollection = model.collectedFraction
    uniforms.uniforms.uSurfaceDropData = surfaceDropData
    uniforms.uniforms.uSurfaceDropShape = surfaceDropShape
    uniforms.uniforms.uTrailSegmentStartData = trailSegmentStartData
    uniforms.uniforms.uTrailSegmentEndData = trailSegmentEndData
    uniforms.uniforms.uTrailCount = model.trailSegmentCount
    uniforms.uniforms.uHeadData = model.headData
    uniforms.uniforms.uHeadShape = model.headShape
    uniforms.uniforms.uTrapPoolData = model.trapPoolData
    uniforms.uniforms.uTrapSurfaceData = model.trapSurfaceData
    uniforms.uniforms.uDetachedData = model.detachedData
    uniforms.uniforms.uTime = elapsed
    renderedSurfaceDropSlots.value = Array.from({ length: MAX_CONDENSATE_DROPS })
      .filter((_, index) => surfaceDropData[index * 4 + 2] > 0).length
  }
  activeDrops.value = model.activeCount
  pinnedDrops.value = model.pinnedCount
  slidingDrops.value = model.slidingCount
  pooledDrops.value = model.pooledCount
  coalescences.value = model.coalescenceCount
  feedEvents.value = model.condensationFeedCount
  wetRegionAbsorptions.value = model.wetRegionAbsorptionCount
  poolEvents.value = model.poolEventCount
  drainEvents.value = model.drainEventCount
  detachmentEvents.value = model.detachmentCount
  constraintViolations.value = model.constraintViolationCount
  trailPoints.value = model.trailCount
  renderedTrailSegments.value = model.trailSegmentCount
  rejectedTrailSegments.value = model.rejectedTrailSegmentCount
  collectedFraction.value = model.collectedFraction
  rivuletState.value = model.rivuletState
  rivuletHeadProgress.value = model.rivuletHeadS / model.pathLength
  rivuletHeadVisible.value = model.rivuletHeadVisible
  rivuletFormations.value = model.rivuletFormationCount
  trapMergeProgress.value = model.trapMergeProgress
  trapMassBalanceError.value = model.trapMassBalanceError
  trapPoolActive.value = model.trapPoolActive
  trapPoolActivity.value = model.trapPoolActivity
  trapPoolMaximumDisplacement.value = model.trapPoolMaximumDisplacement
  trapPoolReceivedMass.value = model.trapPoolReceivedMass
  lifecycleState.value = model.lifecycleState
  systemMassBalanceError.value = model.systemMassBalanceError
  const region = model.wetRegion
  wetRegionStart.value = region?.startS ?? 0
  wetRegionEnd.value = region?.endS ?? 0
  wetRegionSurface.value = region?.surface ?? 'none'
  terminalWallADrains.value = model.terminalDrainCountWallA
  terminalWallBDrains.value = model.terminalDrainCountWallB
  updateRenderedTrapLiquidPath()
  maximumTrailSpan.value = model.maximumTrailSpan
  maximumTrailChordError.value = model.maximumTrailChordError
  drawDebug()
}

function renderStatic() {
  if (!app || rendererState.value !== 'ready') return
  app.stop()
  model.createStaticFinalState()
  elapsed = 0
  accumulator = 0
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
  if (model.settled) {
    app.stop()
    loopState.value = 'settled'
    app.renderer.render(app.stage)
    return
  }
  lastFrame = performance.now()
  accumulator = 0
  app.start()
  loopState.value = 'running'
}

function stop() {
  app?.stop()
  if (app && loopState.value !== 'static') loopState.value = 'paused'
}

function reset() {
  elapsed = 0
  accumulator = 0
  lastFrame = performance.now()
  model.reset()
  updateUniforms()
  app?.renderer.render(app.stage)
  if (shouldRun.value) start()
}

function tick() {
  const now = performance.now()
  const frameSeconds = lastFrame ? Math.min((now - lastFrame) / 1000, FIXED_STEP * MAX_SUBSTEPS) : FIXED_STEP
  lastFrame = now
  accumulator += frameSeconds
  let substeps = 0
  while (accumulator >= FIXED_STEP && substeps < MAX_SUBSTEPS) {
    model.step(FIXED_STEP)
    elapsed += FIXED_STEP
    accumulator -= FIXED_STEP
    substeps += 1
  }
  if (substeps >= MAX_SUBSTEPS) accumulator = 0
  updateUniforms()
  if (model.settled) {
    app?.stop()
    loopState.value = 'settled'
  }
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
    app.canvas.className = 'miller-condenser-canvas'
    app.canvas.setAttribute('aria-hidden', 'true')
    host.value.appendChild(app.canvas)

    const geometry = new pixi.MeshGeometry({
      indices: new Uint32Array([0, 1, 2, 0, 2, 3]),
      positions: new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
      uvs: new Float32Array([0, 1, 1, 1, 1, 0, 0, 0]),
    })
    uniforms = new pixi.UniformGroup({
      uActivity: { value: 1, type: 'f32' },
      uCollection: { value: 0, type: 'f32' },
      uDetachedData: { value: model.detachedData, type: 'vec4<f32>', size: MAX_DETACHED_DROPS },
      uHeadData: { value: model.headData, type: 'vec4<f32>' },
      uHeadShape: { value: model.headShape, type: 'vec4<f32>' },
      uSurfaceDropData: { value: model.surfaceDropData, type: 'vec4<f32>', size: MAX_CONDENSATE_DROPS },
      uSurfaceDropShape: { value: model.surfaceDropShape, type: 'vec4<f32>', size: MAX_CONDENSATE_DROPS },
      uTrapPoolData: { value: model.trapPoolData, type: 'vec4<f32>' },
      uTrapSurfaceData: { value: model.trapSurfaceData, type: 'vec4<f32>', size: TRAP_SURFACE_SAMPLE_COUNT },
      uTime: { value: 0, type: 'f32' },
      uTrailCount: { value: 0, type: 'f32' },
      uTrailSegmentStartData: { value: model.trailSegmentStartData, type: 'vec4<f32>', size: MAX_RIVULET_TRAIL_SEGMENTS },
      uTrailSegmentEndData: { value: model.trailSegmentEndData, type: 'vec4<f32>', size: MAX_RIVULET_TRAIL_SEGMENTS },
    })
    const shader = pixi.Shader.from({
      gl: { fragment: millerUreyCondenserFragmentShader, vertex: millerUreyCondenserVertexShader },
      resources: { condenserUniforms: uniforms },
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
    console.error('Miller–Urey condenser renderer failed', error)
  }
}

watch(() => [props.enabled, props.staticState] as const, () => props.staticState ? renderStatic() : start())
watch(() => props.boundaryPath, applyBoundaryMask, { flush: 'post' })
watch(() => props.trapLiquidPath, updateRenderedTrapLiquidPath, { flush: 'post' })
watch(debugEnabled, drawDebug, { flush: 'post' })
onSlideEnter(start)
onSlideLeave(stop)

onMounted(() => {
  debugRequested.value = new URLSearchParams(window.location.search).get('condenserDebug') === '1'
  initialise()
})
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
    class="miller-condenser"
    viewBox="0 0 652 607"
    preserveAspectRatio="xMidYMid meet"
    :data-active-drops="activeDrops"
    :data-boundary-contains-condenser="boundaryContainsCondenser"
    :data-boundary-mask-state="boundaryMaskState"
    :data-coalescences="coalescences"
    :data-collected-fraction="collectedFraction.toFixed(3)"
    :data-constraint-violations="constraintViolations"
    :data-debug-mode="debugEnabled ? 'on' : 'off'"
    :data-detachment-events="detachmentEvents"
    :data-drain-events="drainEvents"
    :data-feed-events="feedEvents"
    :data-wet-region-absorptions="wetRegionAbsorptions"
    :data-lifecycle-state="lifecycleState"
    :data-loop-state="loopState"
    :data-maximum-trail-chord-error="maximumTrailChordError.toFixed(3)"
    :data-maximum-trail-span="maximumTrailSpan.toFixed(3)"
    :data-pinned-drops="pinnedDrops"
    :data-pool-events="poolEvents"
    :data-pooled-drops="pooledDrops"
    :data-renderer-state="rendererState"
    :data-rivulet-head="rivuletHeadProgress.toFixed(3)"
    :data-rivulet-head-visible="rivuletHeadVisible"
    :data-rivulet-formations="rivuletFormations"
    :data-rivulet-state="rivuletState"
    :data-rendered-surface-drop-slots="renderedSurfaceDropSlots"
    :data-rendered-trail-segments="renderedTrailSegments"
    :data-rejected-trail-segments="rejectedTrailSegments"
    :data-sliding-drops="slidingDrops"
    :data-trail-points="trailPoints"
    :data-trap-mass-balance-error="trapMassBalanceError.toExponential(2)"
    :data-trap-merge-progress="trapMergeProgress.toFixed(3)"
    :data-trap-pool-active="trapPoolActive"
    :data-trap-pool-activity="trapPoolActivity.toFixed(3)"
    :data-trap-pool-max-displacement="trapPoolMaximumDisplacement.toFixed(3)"
    :data-trap-pool-received-mass="trapPoolReceivedMass.toFixed(3)"
    :data-system-mass-balance-error="systemMassBalanceError.toExponential(2)"
    :data-terminal-wall-a-drains="terminalWallADrains"
    :data-terminal-wall-b-drains="terminalWallBDrains"
    :data-wet-region-end="wetRegionEnd.toFixed(3)"
    :data-wet-region-start="wetRegionStart.toFixed(3)"
    :data-wet-region-surface="wetRegionSurface"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="miller-trap-liquid-gradient" x1="329.374504" y1="575.843714" x2="329.374504" y2="447.146844" gradientUnits="userSpaceOnUse">
        <stop offset="0.00001" stop-color="#8f9cf4" />
        <stop offset="1" stop-color="#8f9cf4" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path
      v-if="renderedTrapLiquidPath"
      class="miller-trap-liquid"
      :d="renderedTrapLiquidPath"
      fill="url(#miller-trap-liquid-gradient)"
      fill-rule="evenodd"
      data-source-liquid="path10175"
    />
    <foreignObject x="0" y="0" width="652" height="607">
      <div class="miller-condenser-layer" xmlns="http://www.w3.org/1999/xhtml">
        <div ref="host" class="miller-condenser-host" :data-boundary-length="boundaryPath.length" data-source-boundary="path5114-inner-lumen" />
        <canvas
          v-show="debugEnabled"
          ref="debugCanvas"
          class="miller-condenser-debug"
          data-debug-surface-path="true"
          width="652"
          height="607"
        />
      </div>
    </foreignObject>
    <path
      v-if="frontGlassPath"
      class="miller-condenser-front-glass"
      :d="frontGlassPath"
      fill="none"
      stroke="#000"
      stroke-linejoin="round"
      data-source-front-glass="path5114"
    />
  </svg>
</template>

<style scoped>
.miller-condenser {
  display: block;
  height: 100%;
  inset: 0;
  pointer-events: none;
  position: absolute;
  width: 100%;
  z-index: 2;
}

.miller-condenser-layer {
  height: 607px;
  position: relative;
  width: 652px;
}

.miller-trap-liquid {
  pointer-events: none;
}

.miller-condenser-front-glass {
  pointer-events: none;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.miller-condenser-host {
  height: 607px;
  inset: 0;
  mask-position: 0 0;
  mask-repeat: no-repeat;
  mask-size: 652px 607px;
  position: absolute;
  -webkit-mask-position: 0 0;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: 652px 607px;
  width: 652px;
}

.miller-condenser :deep(.miller-condenser-canvas),
.miller-condenser-debug {
  display: block;
  height: 607px !important;
  inset: 0;
  max-width: none;
  position: absolute;
  width: 652px !important;
}

.miller-condenser-debug {
  z-index: 2;
}
</style>
