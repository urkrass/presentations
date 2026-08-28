<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useIsSlideActive, useNav } from '@slidev/client'

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; kind: 0 | 1 }

const canvas = ref<HTMLCanvasElement | null>(null)
const temperature = ref(340)
const concentration = ref(1)
const orientation = ref(true)
const isActive = useIsSlideActive()
const { isPrintMode } = useNav()
let frame = 0
let particles: Particle[] = []
let last = 0
let successful = 0
let attempted = 0
let reduced = false

const energyFraction = computed(() => Math.min(.92, Math.exp(-4200 / (8.314 * temperature.value))))
const successRate = computed(() => Math.round(100 * energyFraction.value * (orientation.value ? .58 : 1)))

function random(seed: number) {
  let value = seed >>> 0
  return () => {
    value ^= value << 13; value ^= value >>> 17; value ^= value << 5
    return (value >>> 0) / 4294967296
  }
}

function reset() {
  cancelAnimationFrame(frame)
  const rand = random(2202 + Math.round(concentration.value * 100))
  const number = Math.round(28 + concentration.value * 22)
  particles = Array.from({ length: number }, (_, index) => {
    const angle = rand() * Math.PI * 2
    const speed = (.35 + rand() * .42) * Math.sqrt(temperature.value / 300)
    return { x: 25 + rand() * 650, y: 25 + rand() * 330, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, radius: index % 2 ? 7 : 9, kind: index % 2 ? 1 : 0 }
  })
  successful = 0
  attempted = 0
  draw()
}

function draw(now = 0) {
  const target = canvas.value
  if (!target) return
  const ctx = target.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, 700, 380)
  ctx.fillStyle = '#f3efe7'
  ctx.fillRect(0, 0, 700, 380)
  ctx.fillStyle = 'rgba(49,91,125,.055)'
  ctx.fillRect(18, 18, 664, 344)
  for (const p of particles) {
    const gradient = ctx.createRadialGradient(p.x - 3, p.y - 3, 1, p.x, p.y, p.radius)
    if (p.kind === 0) { gradient.addColorStop(0, '#d9e8ee'); gradient.addColorStop(1, '#315b7d') }
    else { gradient.addColorStop(0, '#f2d0c4'); gradient.addColorStop(1, '#8d3f2e') }
    ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fillStyle = gradient; ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.font = '700 8px Aptos, Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.kind === 0 ? 'A' : 'B', p.x, p.y + .5)
  }
  ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#706d66'; ctx.font = '700 12px Aptos, Arial'; ctx.fillText('seeded particle model · same starting state after reset', 28, 346)
  if (!reduced && isActive.value && !isPrintMode.value) frame = requestAnimationFrame(step)
  last = now
}

function step(now: number) {
  cancelAnimationFrame(frame)
  const scale = Math.min(2, (now - last || 16) / 16)
  particles.forEach((p) => {
    p.x += p.vx * scale; p.y += p.vy * scale
    if (p.x < 22 + p.radius || p.x > 678 - p.radius) p.vx *= -1
    if (p.y < 22 + p.radius || p.y > 350 - p.radius) p.vy *= -1
  })
  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i]; const b = particles[j]
      if (a.kind === b.kind) continue
      const dx = a.x - b.x; const dy = a.y - b.y
      if (dx * dx + dy * dy < (a.radius + b.radius) ** 2) {
        attempted += 1
        const gate = ((i * 31 + j * 17 + attempted * 13) % 100) / 100
        if (gate < energyFraction.value * (orientation.value ? .58 : 1)) successful += 1
        const tvx = a.vx; const tvy = a.vy; a.vx = b.vx; a.vy = b.vy; b.vx = tvx; b.vy = tvy
      }
    }
  }
  draw(now)
}

function motionChange(event: Event) {
  reduced = Boolean((event as CustomEvent<{ reduced?: boolean }>).detail?.reduced)
  cancelAnimationFrame(frame)
  draw()
}

watch([temperature, concentration, orientation], reset)
watch(isActive, (active) => { cancelAnimationFrame(frame); if (active) draw() })
onMounted(async () => { await nextTick(); reduced = document.documentElement.classList.contains('deck-reduced-motion'); window.addEventListener('deck-motion-change', motionChange); reset() })
onUnmounted(() => { cancelAnimationFrame(frame); window.removeEventListener('deck-motion-change', motionChange) })
</script>

<template>
  <section class="collision-lab" :data-animation-state="isActive && !isPrintMode && !reduced ? 'running' : 'paused'">
    <div class="chamber"><canvas ref="canvas" width="700" height="380" aria-label="Particle collision simulation" /></div>
    <div class="controls">
      <p class="scene-kicker">Collision chamber</p>
      <label>Temperature <strong>{{ temperature }} K</strong><input v-model.number="temperature" type="range" min="260" max="700" step="20" /></label>
      <label>Relative concentration <strong>{{ concentration.toFixed(1) }}×</strong><input v-model.number="concentration" type="range" min="0.5" max="2" step="0.1" /></label>
      <label class="orientation"><input v-model="orientation" type="checkbox" />Require a suitable orientation</label>
      <div class="collision-result"><span>Modelled successful fraction</span><strong>{{ successRate }}%</strong><small>Energy and orientation gates are independent.</small></div>
      <button type="button" @click="reset">Reset the seeded scene</button>
    </div>
  </section>
</template>

<style scoped>
.collision-lab{display:grid;grid-template-columns:1.35fr .65fr;gap:34px;min-height:485px;align-items:center}.chamber{overflow:hidden;border-radius:var(--radius-field);background:var(--paper-deep)}canvas{display:block;width:100%;height:auto}.controls{display:grid;gap:16px}.controls label:not(.orientation){display:grid;gap:7px;color:var(--muted);font-size:14px}.controls input[type="range"]{width:100%;accent-color:var(--rust)}.orientation{display:flex;gap:9px;align-items:center;color:var(--charcoal);font-size:14px}.orientation input{accent-color:var(--green)}.collision-result{display:grid;gap:4px;padding:17px;border-radius:var(--radius-field);background:var(--soft-green)}.collision-result span{color:var(--green);font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.collision-result strong{font:500 34px/1 Georgia,serif}.collision-result small{color:var(--muted)}.controls>button{justify-self:start;padding:10px 14px;border:0;border-radius:var(--radius-control);background:var(--charcoal);color:#fff;font-weight:750;cursor:pointer}
</style>
