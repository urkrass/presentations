<script setup lang="ts">
import { computed, ref } from 'vue'

const root = ref<HTMLElement | null>(null)
const position = ref(50)
const clamp = (value: number) => Math.min(86, Math.max(14, value))

function setFromPointer(event: PointerEvent) {
  if (!root.value) return
  const rect = root.value.getBoundingClientRect()
  position.value = clamp(((event.clientX - rect.left) / rect.width) * 100)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') position.value = clamp(position.value - 4)
  else if (event.key === 'ArrowRight') position.value = clamp(position.value + 4)
  else if (event.key === 'Home') position.value = 14
  else if (event.key === 'End') position.value = 86
  else return
  event.preventDefault()
}

const sharpClip = computed(() => ({ clipPath: `inset(0 ${100 - position.value}% 0 0)` }))
const handle = computed(() => ({ left: `${position.value}%` }))
</script>

<template>
  <section class="resolution-comparison">
    <div ref="root" class="micrograph-stage" role="slider" tabindex="0" aria-label="Compare unresolved and resolved versions of the same micrograph" aria-valuemin="14" aria-valuemax="86" :aria-valuenow="Math.round(position)" @pointerdown="setFromPointer" @pointermove="event => event.buttons === 1 && setFromPointer(event)" @keydown="onKeydown">
      <img class="soft-image" :src="'images/e-coli.jpg'" alt="E. coli micrograph deliberately blurred to model poor resolution" />
      <div class="sharp-layer" :style="sharpClip"><img :src="'images/e-coli.jpg'" alt="Resolved E. coli scanning electron micrograph" /></div>
      <span class="stage-label resolved">resolved detail</span>
      <span class="stage-label unresolved">enlarged blur</span>
      <span class="comparison-handle" :style="handle" aria-hidden="true">↔</span>
    </div>
    <div class="resolution-copy">
      <p class="scene-kicker">Interactive microscopy · same size, different information</p>
      <h2>Both sides are the same size</h2>
      <p>Drag the handle. The right side is enlarged but information has been removed.</p>
      <p class="resolution-claim"><strong>Magnification</strong> changes apparent size. <strong>Resolution</strong> determines whether nearby structures remain distinguishable.</p>
    </div>
  </section>
</template>

<style scoped>
.resolution-comparison{display:grid;grid-template-columns:1.22fr .78fr;gap:42px;min-height:455px;align-items:center}.micrograph-stage{position:relative;height:440px;overflow:hidden;border-radius:var(--radius-field);background:#111;cursor:ew-resize;user-select:none}.micrograph-stage>img,.sharp-layer,.sharp-layer img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.soft-image{filter:blur(8px) saturate(.58);transform:scale(1.035)}.sharp-layer{overflow:hidden;transition:clip-path 90ms linear}.sharp-layer img{max-width:none}.stage-label{position:absolute;top:16px;padding:8px 11px;border-radius:var(--radius-control);background:rgba(12,12,12,.72);color:#fff;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.stage-label.resolved{left:16px}.stage-label.unresolved{right:16px}.comparison-handle{position:absolute;top:50%;width:46px;height:46px;display:grid;place-items:center;border-radius:50%;transform:translate(-50%,-50%);background:var(--rust);color:#fff;font:700 20px/1 Georgia,serif}.comparison-handle::before{content:"";position:absolute;top:-197px;bottom:-197px;width:2px;background:rgba(251,250,246,.86);z-index:-1}.resolution-copy{display:grid;gap:17px}.resolution-copy h2{margin:0;font:500 38px/1.08 Georgia,serif}.resolution-copy>p:not(.scene-kicker){margin:0;color:var(--muted);font-size:18px;line-height:1.44}.resolution-claim{padding:17px;border-radius:var(--radius-field);background:var(--soft-blue);color:var(--ink)!important}.resolution-claim strong{color:var(--blue)}.micrograph-stage:focus-visible{outline:4px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:4px}
</style>
