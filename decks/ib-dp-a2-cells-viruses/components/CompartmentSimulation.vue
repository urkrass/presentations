<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

type Particle = { x:number; y:number; vx:number; vy:number }

const canvas = ref<HTMLCanvasElement | null>(null)
const root = ref<HTMLElement | null>(null)
const visible = ref(true)
const running = ref(true)
const mode = ref<'selective' | 'damaged'>('selective')
const retained = ref(100)
const count = 240
const width = 780
const height = 385
const cx = 385
const cy = 192
const radius = 136
let particles: Particle[] = []
let frame = 0
let seed = 0x6a09e667
let sampleFrames = 0
let observer: IntersectionObserver | null = null

const modeCopy = computed(() => mode.value === 'selective'
  ? 'Low permeability preserves a concentrated internal mixture while matter still moves.'
  : 'Higher permeability dissipates the concentration advantage.'
)

function random() {
  seed ^= seed << 13
  seed ^= seed >>> 17
  seed ^= seed << 5
  return (seed >>> 0) / 4294967296
}

function reset() {
  seed = 0x6a09e667
  particles = Array.from({ length: count }, (_, index) => {
    const angle = random() * Math.PI * 2
    const beginsOutside = mode.value === 'damaged' && index % 8 === 0
    const distance = beginsOutside ? radius + 24 + random() * 72 : Math.sqrt(random()) * (radius - 16)
    return { x: cx + Math.cos(angle) * distance, y: cy + Math.sin(angle) * distance, vx: (random() - .5) * 1.05, vy: (random() - .5) * 1.05 }
  })
  retained.value = Math.round(particles.filter(p => Math.hypot(p.x - cx, p.y - cy) <= radius).length / count * 100)
  running.value = true
  draw()
  start()
}

function prepareCanvas() {
  if (!canvas.value) return
  const ratio = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = width * ratio
  canvas.value.height = height * ratio
  canvas.value.style.aspectRatio = `${width} / ${height}`
  canvas.value.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0)
}

function draw() {
  const context = canvas.value?.getContext('2d')
  if (!context) return
  context.clearRect(0, 0, width, height)
  context.fillStyle = '#f1ede4'
  context.fillRect(0, 0, width, height)
  context.beginPath()
  context.arc(cx, cy, radius + 13, 0, Math.PI * 2)
  context.fillStyle = mode.value === 'selective' ? 'rgba(72,107,88,.7)' : 'rgba(155,73,55,.55)'
  context.fill()
  context.beginPath()
  context.arc(cx, cy, radius - 7, 0, Math.PI * 2)
  context.fillStyle = '#fbfaf6'
  context.fill()
  context.fillStyle = 'rgba(49,92,120,.72)'
  for (const particle of particles) {
    context.beginPath()
    context.arc(particle.x, particle.y, 2.65, 0, Math.PI * 2)
    context.fill()
  }
}

function tick() {
  frame = 0
  if (!running.value || !visible.value) { draw(); return }
  const permeability = mode.value === 'selective' ? .0016 : .032
  for (const particle of particles) {
    particle.vx = particle.vx * .987 + (random() - .5) * .17
    particle.vy = particle.vy * .987 + (random() - .5) * .17
    const oldX = particle.x
    const oldY = particle.y
    const before = Math.hypot(oldX - cx, oldY - cy) <= radius
    particle.x += particle.vx
    particle.y += particle.vy
    const after = Math.hypot(particle.x - cx, particle.y - cy) <= radius
    if (before !== after && random() > permeability) {
      particle.x = oldX
      particle.y = oldY
      const dx = oldX - cx
      const dy = oldY - cy
      const length = Math.max(1, Math.hypot(dx, dy))
      const nx = dx / length
      const ny = dy / length
      const dot = particle.vx * nx + particle.vy * ny
      particle.vx -= 2 * dot * nx
      particle.vy -= 2 * dot * ny
    }
    if (particle.x < 3 || particle.x > width - 3) particle.vx *= -1
    if (particle.y < 3 || particle.y > height - 3) particle.vy *= -1
    particle.x = Math.max(3, Math.min(width - 3, particle.x))
    particle.y = Math.max(3, Math.min(height - 3, particle.y))
  }
  sampleFrames += 1
  if (sampleFrames % 10 === 0) retained.value = Math.round(particles.filter(p => Math.hypot(p.x - cx, p.y - cy) <= radius).length / count * 100)
  draw()
  frame = requestAnimationFrame(tick)
}

function start() { if (!frame && running.value && visible.value) frame = requestAnimationFrame(tick) }
function stop() { if (frame) cancelAnimationFrame(frame); frame = 0; draw() }
function toggle() { running.value = !running.value; running.value ? start() : stop() }
function setMode(next:'selective'|'damaged') { mode.value = next; reset() }

onMounted(async () => {
  await nextTick()
  prepareCanvas()
  reset()
  observer = new IntersectionObserver(([entry]) => {
    visible.value = entry.isIntersecting
    visible.value ? start() : stop()
  }, { threshold: .25 })
  if (root.value) observer.observe(root.value)
  window.addEventListener('resize', prepareCanvas)
})
onUnmounted(() => { stop(); observer?.disconnect(); window.removeEventListener('resize', prepareCanvas) })
</script>

<template>
  <section ref="root" class="compartment-simulation">
    <div class="canvas-wrap"><canvas ref="canvas" aria-label="Qualitative particle model of solute retention by a membrane-bounded compartment" /><span class="model-note">qualitative model · not measured data</span></div>
    <div class="simulation-copy">
      <p class="scene-kicker">Particle model · retention under changing permeability</p>
      <h2>{{ retained }}% retained</h2>
      <p>{{ modeCopy }}</p>
      <div class="membrane-modes" aria-label="Choose membrane state">
        <button type="button" :class="{active:mode==='selective'}" @click="setMode('selective')">selective boundary</button>
        <button type="button" :class="{active:mode==='damaged'}" @click="setMode('damaged')">damaged boundary</button>
      </div>
      <div class="simulation-actions"><button type="button" @click="toggle">{{ running ? 'Pause' : 'Resume' }}</button><button type="button" @click="reset">Reset</button></div>
      <p class="simulation-claim">A compartment becomes biologically interesting when its permeability changes which reaction networks persist.</p>
    </div>
  </section>
</template>

<style scoped>
.compartment-simulation{display:grid;grid-template-columns:1.22fr .78fr;gap:42px;min-height:470px;align-items:center}.canvas-wrap{position:relative;height:450px;display:grid;place-items:center;background:var(--paper-deep);overflow:hidden}.canvas-wrap canvas{width:100%;height:auto;display:block}.model-note{position:absolute;left:16px;bottom:14px;padding:7px 9px;background:rgba(251,250,246,.88);color:var(--muted);font-size:10px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.simulation-copy{display:grid;gap:16px}.simulation-copy h2{margin:0;color:var(--green);font:500 54px/1 Georgia,serif}.simulation-copy>p:not(.scene-kicker){margin:0;color:var(--muted);font-size:17px;line-height:1.43}.membrane-modes{display:grid;grid-template-columns:1fr 1fr;gap:8px}.membrane-modes button,.simulation-actions button{border:0;background:var(--paper-deep);color:var(--muted);font-weight:750;cursor:pointer}.membrane-modes button{min-height:55px;padding:10px}.membrane-modes button.active{background:var(--blue);color:#fff}.simulation-actions{display:flex;gap:8px}.simulation-actions button{padding:11px 16px}.simulation-actions button:first-child{background:var(--rust);color:#fff}.simulation-claim{padding:15px 17px;background:var(--soft-green);color:var(--ink)!important;font-family:Georgia,serif;font-size:18px!important}button:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}
</style>
