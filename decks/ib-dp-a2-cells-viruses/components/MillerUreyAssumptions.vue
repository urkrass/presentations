<script setup lang="ts">
import { onSlideEnter, onSlideLeave, useIsSlideActive, useNav } from '@slidev/client'
import { gsap } from 'gsap'
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import millerUreySource from '../assets/miller-urey.svg?raw'

const millerUreyMarkup = millerUreySource.replace(/^<\?xml[^>]+>\s*/, '')

const state = reactive({ atmosphere: 0, energy: 0, system: 0 })
const assumptions = [
  { key: 'atmosphere' as const, label: 'atmosphere', options: ['chosen reducing gases', 'less reducing atmosphere'] },
  { key: 'energy' as const, label: 'energy', options: ['electrical sparks', 'UV or mineral gradients'] },
  { key: 'system' as const, label: 'system', options: ['closed circulation', 'open changing environment'] },
]

const apparatus = ref<HTMLDivElement | null>(null)
const boilingPhysics = ref<{ reset: () => void } | null>(null)
const condenserPhysics = ref<{ reset: () => void } | null>(null)
const physicsReady = ref(false)
const condenserReady = ref(false)
const boilingBoundaryPath = ref('')
const condenserBoundaryPath = ref('')
const frontGlassPath = ref('')
const trapLiquidPath = ref('')
const svgReady = ref(false)
const running = ref(false)
const deckReducedMotion = ref(false)
const systemReducedMotion = ref(false)
const printMediaActive = ref(false)
const cycleCount = ref(0)
const animatedTargetCount = ref(0)
const isActive = useIsSlideActive()
const { isPrintMode } = useNav()
let svgRoot: SVGSVGElement | null = null
let context: gsap.Context | undefined
let timeline: gsap.core.Timeline | undefined
let motionClassObserver: MutationObserver | undefined
let reducedMotionMedia: MediaQueryList | undefined
let printMedia: MediaQueryList | undefined

const changed = computed(() => Object.values(state).filter(Boolean).length)
const scope = computed(() => changed.value === 0
  ? 'This is the 1953 model: chosen gases, spark energy, and recirculating water test one route to abiotic organic synthesis.'
  : `${changed.value} assumption${changed.value === 1 ? '' : 's'} now differ from the 1953 apparatus. The original result cannot answer this revised model directly.`)
const limitation = computed(() => state.atmosphere
  ? 'A less reducing atmosphere changes the chemistry and requires new evidence; it does not make every abiotic pathway impossible.'
  : 'Even a productive reducing mixture does not establish that the entire early atmosphere had that composition.')
const reducedMotion = computed(() => deckReducedMotion.value || systemReducedMotion.value)
const canAnimate = computed(() => isActive.value && !isPrintMode.value && !printMediaActive.value && !reducedMotion.value)
const staticPhysics = computed(() => isPrintMode.value || printMediaActive.value || reducedMotion.value)
const animationState = computed(() => {
  if (isPrintMode.value || printMediaActive.value || reducedMotion.value) return 'static'
  if (!isActive.value) return 'paused'
  return running.value ? 'running' : 'settled'
})

function stopAndRestore() {
  running.value = false
  timeline?.kill()
  timeline = undefined
  context?.revert()
  context = undefined
}

function buildTimeline() {
  if (!svgRoot) return
  stopAndRestore()
  const doc = svgRoot.ownerDocument
  const pick = (id: string) => doc.getElementById(id) as SVGElement | null
  const compact = (items: Array<SVGElement | null>) => items.filter((item): item is SVGElement => Boolean(item))
  const heater = pick('path18224')
  const trapLiquid = pick('path10175')
  const droplets = compact(['path5191', 'path5187', 'path4207'].map(pick))
  const coolantJacket = pick('rect5129')
  const coolantGradient = pick('linearGradient1')
  const coolantInlet = pick('path21158')
  const coolantOutlet = pick('path22229')
  const arrows = compact(['path8237', 'path9216', 'path9218', 'path21168'].map(pick))
  const spark = compact(['path17286', 'path14099', 'path13101'].map(pick))
  const all = compact([heater, trapLiquid, ...droplets, coolantJacket, coolantInlet, coolantOutlet, ...arrows, ...spark])
  const transformed = compact([coolantInlet, coolantOutlet, ...arrows, ...spark])
  animatedTargetCount.value = all.length

  context = gsap.context(() => {
    timeline = gsap.timeline({
      paused: true,
      defaults: { ease: 'power1.inOut' },
      onStart: () => { running.value = true },
      onComplete: () => { running.value = false; cycleCount.value += 1 },
    })
    timeline.set(transformed, { transformBox: 'fill-box', transformOrigin: '50% 50%' }, 0)
    if (heater) timeline.fromTo(heater, { opacity: .42 }, { opacity: 1, duration: .46, repeat: 5, yoyo: true }, 0)
    if (arrows[0]) timeline.fromTo(arrows[0], { y: 9, opacity: .16 }, { y: 0, opacity: 1, duration: .5 }, .72)
    if (arrows[1]) timeline.fromTo(arrows[1], { y: 9, opacity: .16 }, { y: 0, opacity: 1, duration: .5 }, 1.06)
    if (arrows[2]) timeline.fromTo(arrows[2], { x: 10, opacity: .16 }, { x: 0, opacity: 1, duration: .5 }, 1.4)
    if (arrows[3]) timeline.fromTo(arrows[3], { y: -9, opacity: .16 }, { y: 0, opacity: 1, duration: .5 }, 1.74)
    if (state.energy === 0) {
      if (spark[0]) timeline.fromTo(spark[0], { opacity: .16, scale: .94 }, { opacity: .94, scale: 1.04, duration: .11, repeat: 9, yoyo: true, ease: 'none' }, 1.65)
      timeline.fromTo(spark.slice(1), { opacity: .38, filter: 'drop-shadow(0 0 0 rgba(255,174,52,0))' }, { opacity: 1, filter: 'drop-shadow(0 0 5px rgba(255,174,52,.92))', duration: .09, repeat: 9, yoyo: true, ease: 'none' }, 1.65)
    }
    // The condenser is a heat exchanger: coolant enters at the lower port,
    // travels upward through the jacket, then leaves at the upper port.
    if (coolantInlet) timeline.fromTo(coolantInlet, { x: -8, opacity: .16, fill: '#706d66' }, { x: 0, opacity: 1, fill: '#315b7d', duration: .34, repeat: 1, yoyo: true, ease: 'power1.inOut' }, 2.18)
    if (coolantJacket) timeline.fromTo(coolantJacket, { opacity: .62 }, { opacity: 1, duration: 1.12, ease: 'power1.inOut' }, 2.26)
    if (coolantGradient) {
      timeline.fromTo(
        coolantGradient,
        { attr: { y1: 410, y2: 523 } },
        { attr: { y1: 344.499964, y2: 457.249964 }, duration: 1.12, ease: 'power1.inOut' },
        2.26,
      )
    }
    if (coolantOutlet) timeline.fromTo(coolantOutlet, { x: 8, opacity: .16, fill: '#706d66' }, { x: 0, opacity: 1, fill: '#315b7d', duration: .34, repeat: 1, yoyo: true, ease: 'power1.inOut' }, 3.05)

    // Condensate forms on the cold inner wall. The sourced droplets nucleate
    // where they are drawn instead of being translated down the condenser.
    timeline.set(droplets, { opacity: .08, fill: '#dce2ff' }, 0)
    droplets.forEach((droplet, index) => {
      const nucleateAt = 2.72 + index * .29
      timeline!.to(droplet, { opacity: 1, fill: '#8f9cf4', duration: .32, ease: 'power2.out' }, nucleateAt)
    })
    if (trapLiquid) timeline.fromTo(trapLiquid, { opacity: .48 }, { opacity: 1, duration: .78 }, 3.36)
    timeline.addLabel('settled', 4.28).set(all, { clearProps: 'transform,transformOrigin,opacity,filter,fill' }, 'settled')
    if (coolantGradient) timeline.set(coolantGradient, { attr: { y1: 344.499964, y2: 457.249964 } }, 'settled')
  }, svgRoot)
}

function replay() {
  if (!svgReady.value || !svgRoot || !canAnimate.value) {
    stopAndRestore()
    return
  }
  boilingPhysics.value?.reset()
  condenserPhysics.value?.reset()
  buildTimeline()
  timeline?.restart(true)
}

function deriveCondenserChannelPath(apparatusBoundary: string) {
  // path5114 is one sourced compound path: its outer contour contains the
  // left condenser wall and its inner contour contains the matching right
  // wall. Extract those authored spans and close them at the receiver surface.
  // This keeps the WebGL mask exact without maintaining a second hand-drawn
  // version of the apparatus geometry.
  const outerOrigin = 'M 180.624496 302.156219'
  const outerStart = 'L 180.624496 368.062469'
  const outerStop = 'L 263.874512 533.624939'
  const innerStart = 'L 273.718262 496.156219'
  const innerStop = 'L 191.093246 302.031219'
  const outerStartIndex = apparatusBoundary.indexOf(outerStart)
  const outerStopIndex = apparatusBoundary.indexOf(outerStop, outerStartIndex)
  const innerStartIndex = apparatusBoundary.indexOf(innerStart, outerStopIndex)
  const innerStopIndex = apparatusBoundary.indexOf(innerStop, innerStartIndex)
  if ([outerStartIndex, outerStopIndex, innerStartIndex, innerStopIndex].some(index => index < 0)) return ''
  const outerWall = `${outerOrigin} ${apparatusBoundary.slice(outerStartIndex, outerStopIndex).trim()}`
  const innerWall = apparatusBoundary.slice(innerStartIndex, innerStopIndex + innerStop.length).trim()
  return `${outerWall} ${innerWall} Z`
}

function initialiseSvg() {
  const root = apparatus.value?.querySelector('svg')
  if (!(root instanceof SVGSVGElement)) return
  root.setAttribute('aria-hidden', 'true')
  root.setAttribute('focusable', 'false')
  svgRoot = root
  const apparatusBoundary = root.querySelector('#path5114')?.getAttribute('d') || ''
  const firstClosedSubpath = apparatusBoundary.indexOf('Z')
  boilingBoundaryPath.value = firstClosedSubpath >= 0 ? apparatusBoundary.slice(0, firstClosedSubpath + 1).trim() : ''
  condenserBoundaryPath.value = deriveCondenserChannelPath(apparatusBoundary)
  frontGlassPath.value = apparatusBoundary
  trapLiquidPath.value = root.querySelector('#path10175')?.getAttribute('d') || ''
  // The source liquid and bubbles remain available as a no-WebGL fallback.
  // Once the calibrated renderer is ready, CSS hides them without altering the SVG geometry.
  root.querySelector('#linearGradient1')?.setAttribute('data-miller-condenser-flow', '')
  root.querySelector('#path21158')?.setAttribute('data-miller-coolant-inlet', '')
  root.querySelector('#path22229')?.setAttribute('data-miller-coolant-outlet', '')
  root.querySelector('#rect5129')?.setAttribute('data-miller-coolant-jacket', '')
  animatedTargetCount.value = root.querySelectorAll('#path18224, #path10175, #path3227, #path4199, #path4201, #path4203, #path4205, #path5191, #path5187, #path4207, #rect5129, #path21158, #path22229, #path8237, #path9216, #path9218, #path21168, #path17286, #path14099, #path13101').length
  svgReady.value = true
  replay()
}

function onMotionPreference(event: Event) {
  deckReducedMotion.value = Boolean((event as CustomEvent<{ reduced?: boolean }>).detail?.reduced)
  canAnimate.value ? replay() : stopAndRestore()
}

function syncMotionClass() {
  const next = document.documentElement.classList.contains('deck-reduced-motion')
  if (next === deckReducedMotion.value) return
  deckReducedMotion.value = next
  canAnimate.value ? replay() : stopAndRestore()
}

function onSystemMotionPreference(event: MediaQueryListEvent) {
  systemReducedMotion.value = event.matches
  canAnimate.value ? replay() : stopAndRestore()
}

function onPrintMedia(event: MediaQueryListEvent) {
  printMediaActive.value = event.matches
  canAnimate.value ? replay() : stopAndRestore()
}

onMounted(async () => {
  await nextTick()
  deckReducedMotion.value = document.documentElement.classList.contains('deck-reduced-motion')
  reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
  printMedia = window.matchMedia('print')
  systemReducedMotion.value = reducedMotionMedia.matches
  printMediaActive.value = printMedia.matches
  window.addEventListener('deck-motion-change', onMotionPreference)
  reducedMotionMedia.addEventListener('change', onSystemMotionPreference)
  printMedia.addEventListener('change', onPrintMedia)
  motionClassObserver = new MutationObserver(syncMotionClass)
  motionClassObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  initialiseSvg()
})
watch(() => state.energy, replay)
watch(isPrintMode, print => print ? stopAndRestore() : replay())
onSlideEnter(replay)
onSlideLeave(stopAndRestore)
onUnmounted(() => {
  window.removeEventListener('deck-motion-change', onMotionPreference)
  reducedMotionMedia?.removeEventListener('change', onSystemMotionPreference)
  printMedia?.removeEventListener('change', onPrintMedia)
  reducedMotionMedia = undefined
  printMedia = undefined
  motionClassObserver?.disconnect()
  motionClassObserver = undefined
  stopAndRestore()
  svgRoot = null
})
</script>

<template>
  <section class="miller-workbench" :data-animation-state="animationState" :data-cycle-count="cycleCount" :data-svg-targets="animatedTargetCount" :data-energy-mode="state.energy === 0 ? 'spark' : 'alternative'" :data-boiling-ready="physicsReady" :data-condenser-ready="condenserReady">
    <figure class="apparatus-stage" :class="{ 'physics-ready': physicsReady, 'condenser-ready': condenserReady }">
      <div ref="apparatus" class="apparatus-art" role="img" aria-label="Animated sourced diagram of the Miller–Urey apparatus" v-html="millerUreyMarkup" />
      <MillerUreyBoiling ref="boilingPhysics" :boundary-path="boilingBoundaryPath" :enabled="canAnimate" :static-state="staticPhysics" @ready="physicsReady = true" />
      <MillerUreyCondenser ref="condenserPhysics" :boundary-path="condenserBoundaryPath" :enabled="canAnimate" :front-glass-path="frontGlassPath" :static-state="staticPhysics" :trap-liquid-path="trapLiquidPath" @ready="condenserReady = true" />
      <figcaption>Miller–Urey apparatus · 1953</figcaption>
      <button class="apparatus-replay" type="button" aria-label="Replay the apparatus cycle" :disabled="!svgReady || !canAnimate" @click="replay"><span aria-hidden="true">↻</span></button>
      <span class="sr-only" aria-live="polite">{{ running ? 'Apparatus cycle running' : 'Apparatus cycle settled' }}</span>
    </figure>
    <div class="model-copy">
      <p class="scene-kicker">A planet became a controlled model</p>
      <h2>Change an assumption; change the question</h2>
      <div class="assumption-list">
        <div v-for="assumption in assumptions" :key="assumption.key">
          <span>{{ assumption.label }}</span>
          <button v-for="(option,index) in assumption.options" :key="option" type="button" :class="{ active: state[assumption.key] === index }" :aria-pressed="state[assumption.key] === index" @click="state[assumption.key] = index">{{ option }}</button>
        </div>
      </div>
      <div class="model-reading" aria-live="polite"><strong>{{ changed ? 'Revised model' : 'Original model' }}</strong><p>{{ scope }}</p><p>{{ limitation }}</p></div>
    </div>
  </section>
</template>

<style scoped>
.miller-workbench{display:grid;grid-template-columns:1.05fr .95fr;gap:42px;min-height:500px}.apparatus-stage{isolation:isolate;position:relative;margin:0;height:500px;border-radius:var(--radius-field);background:#fff;overflow:hidden}.apparatus-art{position:relative;z-index:1;width:100%;height:100%;pointer-events:none}.apparatus-art :deep(svg){display:block;width:100%;height:100%}.apparatus-stage.physics-ready .apparatus-art :deep(#rect16274),.apparatus-stage.physics-ready .apparatus-art :deep(#path3227),.apparatus-stage.physics-ready .apparatus-art :deep(#path4199),.apparatus-stage.physics-ready .apparatus-art :deep(#path4201),.apparatus-stage.physics-ready .apparatus-art :deep(#path4203),.apparatus-stage.physics-ready .apparatus-art :deep(#path4205){opacity:0!important}.apparatus-stage.condenser-ready .apparatus-art :deep(#path10175),.apparatus-stage.condenser-ready .apparatus-art :deep(#path5191),.apparatus-stage.condenser-ready .apparatus-art :deep(#path5187),.apparatus-stage.condenser-ready .apparatus-art :deep(#path4207){opacity:0!important}.apparatus-stage figcaption{position:absolute;z-index:3;left:17px;bottom:14px;padding:7px 10px;border-radius:var(--radius-control);background:rgba(23,23,23,.76);color:#fff;font-size:11px;font-weight:750;letter-spacing:.07em;text-transform:uppercase}.apparatus-replay{position:absolute;z-index:3;right:15px;bottom:13px;display:grid;place-items:center;width:34px;height:34px;padding:0;border:0;border-radius:50%;background:rgba(23,23,23,.76);color:#fff;font:500 19px/1 Georgia,serif;cursor:pointer;transition:background var(--motion-fast) var(--ease),transform var(--motion-fast) var(--ease)}.apparatus-replay:hover,.apparatus-replay:focus-visible{background:var(--blue);transform:translateY(-2px)}.apparatus-replay:disabled{opacity:.36;cursor:default;transform:none}.model-copy{display:grid;align-content:center;gap:15px}.model-copy h2{margin:0;font:500 35px/1.1 Georgia,serif}.assumption-list{display:grid;gap:8px}.assumption-list>div{display:grid;grid-template-columns:82px 1fr 1fr;gap:7px;align-items:center}.assumption-list span{color:var(--rust);font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.assumption-list button{min-height:50px;padding:8px 10px;border:0;border-radius:var(--radius-field);background:var(--paper-deep);color:var(--muted);font-size:12px;font-weight:700;cursor:pointer}.assumption-list button.active{background:var(--blue);color:#fff}.model-reading{min-height:152px;display:grid;align-content:center;gap:7px;padding:17px 19px;border-radius:var(--radius-field);background:var(--soft-green)}.model-reading strong{color:var(--green);font-family:Georgia,serif;font-size:21px;font-weight:500}.model-reading p{margin:0;color:var(--muted);font-size:14px;line-height:1.35}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media print{.apparatus-replay{display:none}}
</style>
