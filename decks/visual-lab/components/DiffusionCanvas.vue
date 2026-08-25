<script setup lang="ts">
import { onSlideEnter, onSlideLeave, useIsSlideActive } from '@slidev/client'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{ initialCount?: number }>(), { initialCount: 1000 })
type Particle = { x: number, y: number, vx: number, vy: number, group: 0 | 1 }

const canvas = ref<HTMLCanvasElement | null>(null)
const isActive = useIsSlideActive()
const count = ref(props.initialCount)
const running = ref(true)
const status = ref('gradient relaxing')
const fps = ref(0)
let particles: Particle[] = []
let frame = 0
let seed = 0x61c88647
let lastFrame = 0
let fpsFrames = 0
let fpsWindow = 0

function random() {
  seed ^= seed << 13
  seed ^= seed >>> 17
  seed ^= seed << 5
  return (seed >>> 0) / 4294967296
}

function dimensions() {
  return { width: 820, height: 350 }
}

function seedParticles(equilibrium = false) {
  seed = 0x61c88647
  const { width, height } = dimensions()
  particles = Array.from({ length: count.value }, (_, index) => {
    const group = (index % 2) as 0 | 1
    const halfX = group === 0 ? random() * width * 0.43 : width * 0.57 + random() * width * 0.43
    return {
      x: equilibrium ? random() * width : halfX,
      y: random() * height,
      vx: (random() - 0.5) * 0.78,
      vy: (random() - 0.5) * 0.78,
      group,
    }
  })
  status.value = equilibrium ? 'equilibrium sample' : 'gradient relaxing'
  running.value = !equilibrium
  draw()
  start()
}

function prepareCanvas() {
  if (!canvas.value) return
  const ratio = Math.min(window.devicePixelRatio || 1, 2)
  const { width, height } = dimensions()
  canvas.value.width = width * ratio
  canvas.value.height = height * ratio
  canvas.value.style.aspectRatio = `${width} / ${height}`
  canvas.value.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0)
}

function draw() {
  const context = canvas.value?.getContext('2d')
  if (!context) return
  const { width, height } = dimensions()
  context.clearRect(0, 0, width, height)
  context.fillStyle = '#f2eee5'
  context.fillRect(0, 0, width, height)
  context.fillStyle = 'rgba(155, 73, 55, 0.72)'
  for (const particle of particles) {
    if (particle.group !== 0) continue
    context.beginPath()
    context.arc(particle.x, particle.y, 2.25, 0, Math.PI * 2)
    context.fill()
  }
  context.fillStyle = 'rgba(49, 92, 120, 0.72)'
  for (const particle of particles) {
    if (particle.group !== 1) continue
    context.beginPath()
    context.arc(particle.x, particle.y, 2.25, 0, Math.PI * 2)
    context.fill()
  }
}

function tick(time: number) {
  frame = 0
  if (!running.value || !isActive.value || document.documentElement.classList.contains('lab-reduced-motion')) {
    draw()
    return
  }
  const { width, height } = dimensions()
  for (const particle of particles) {
    particle.vx = particle.vx * 0.985 + (random() - 0.5) * 0.18
    particle.vy = particle.vy * 0.985 + (random() - 0.5) * 0.18
    particle.x += particle.vx
    particle.y += particle.vy
    if (particle.x < 0 || particle.x > width) particle.vx *= -1
    if (particle.y < 0 || particle.y > height) particle.vy *= -1
    particle.x = Math.max(0, Math.min(width, particle.x))
    particle.y = Math.max(0, Math.min(height, particle.y))
  }
  draw()
  fpsFrames += 1
  if (!fpsWindow) fpsWindow = time
  if (time - fpsWindow >= 500) {
    fps.value = Math.round((fpsFrames * 1000) / (time - fpsWindow))
    fpsFrames = 0
    fpsWindow = time
  }
  lastFrame = time
  frame = requestAnimationFrame(tick)
}

function start() {
  if (frame || !running.value || !isActive.value) return
  fpsFrames = 0
  fpsWindow = 0
  frame = requestAnimationFrame(tick)
}

function stop() {
  if (frame) cancelAnimationFrame(frame)
  frame = 0
  draw()
}

function toggle() {
  running.value = !running.value
  status.value = running.value ? 'gradient relaxing' : 'paused sample'
  running.value ? start() : stop()
}

function setCount(value: number) {
  count.value = value
  seedParticles(false)
}

function onMotionChange() {
  document.documentElement.classList.contains('lab-reduced-motion') ? stop() : start()
}

onMounted(async () => {
  await nextTick()
  prepareCanvas()
  seedParticles(false)
  window.addEventListener('resize', prepareCanvas)
  window.addEventListener('visual-lab-motion-change', onMotionChange)
})
watch(isActive, active => active ? start() : stop())
onSlideEnter(start)
onSlideLeave(stop)
onUnmounted(() => {
  stop()
  window.removeEventListener('resize', prepareCanvas)
  window.removeEventListener('visual-lab-motion-change', onMotionChange)
})
</script>

<template>
  <section class="diffusion-study" aria-label="Seeded particle diffusion simulation">
    <div class="diffusion-canvas-wrap">
      <canvas ref="canvas" aria-label="Red and blue particles diffuse from separate regions toward an even distribution" />
      <span class="diffusion-side left">high red concentration</span>
      <span class="diffusion-side right">high blue concentration</span>
    </div>
    <div class="diffusion-readout">
      <span>seeded canvas</span>
      <strong>{{ count.toLocaleString() }} particles</strong>
      <p>{{ status }} · {{ fps || '—' }} fps</p>
      <div class="particle-count" aria-label="Particle count">
        <button v-for="option in [500, 1000, 2000]" :key="option" type="button" :class="{ active: count === option }" @click="setCount(option)">{{ option }}</button>
      </div>
      <div class="lab-actions">
        <button class="lab-button primary" type="button" @click="toggle">{{ running ? 'Pause' : 'Resume' }}</button>
        <button class="lab-button" type="button" @click="seedParticles(false)">Gradient</button>
        <button class="lab-button" type="button" @click="seedParticles(true)">Equilibrium</button>
      </div>
    </div>
  </section>
</template>
