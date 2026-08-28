<script setup lang="ts">
import { onSlideEnter, onSlideLeave, useIsSlideActive } from '@slidev/client'
import { gsap } from 'gsap'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import millerUreySource from '../../ib-dp-a2-cells-viruses/assets/miller-urey.svg?raw'

const svgMarkup = millerUreySource.replace(/^<\?xml[^>]+>\s*/, '')
const root = ref<HTMLDivElement | null>(null)
const isActive = useIsSlideActive()
let context: gsap.Context | undefined
let timeline: gsap.core.Timeline | undefined

function reduced() {
  return document.documentElement.classList.contains('lab-reduced-motion')
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function prepare() {
  const svg = root.value?.querySelector('svg')
  if (!(svg instanceof SVGSVGElement)) return
  svg.setAttribute('viewBox', '420 365 190 195')
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  svg.querySelectorAll('text').forEach(label => label.setAttribute('display', 'none'))
  const bubbleIds = ['path4205', 'path4203', 'path4201', 'path4199', 'path3227']
  const bubbles = bubbleIds.map(id => svg.querySelector(`#${id}`)).filter((node): node is SVGGraphicsElement => node instanceof SVGGraphicsElement)
  context?.revert()
  context = gsap.context(() => {
    timeline = gsap.timeline({ paused: true, repeat: -1 })
    bubbles.forEach((bubble, index) => {
      timeline!.fromTo(
        bubble,
        { opacity: 0, y: 12 + index * 3 },
        { opacity: 0.88, y: -36 - index * 8, duration: 0.72 + index * 0.08, ease: 'power1.out' },
        index * 0.18,
      )
      timeline!.to(bubble, { opacity: 0, duration: 0.08 }, index * 0.18 + 0.64)
    })
  }, svg)
  if (reduced()) timeline?.progress(0.58).pause()
  else if (isActive.value) timeline?.play(0)
}

function start() {
  if (reduced()) timeline?.progress(0.58).pause()
  else timeline?.play()
}

function stop() {
  timeline?.pause()
}

onMounted(async () => {
  await nextTick()
  prepare()
})
watch(isActive, active => active ? start() : stop())
onSlideEnter(start)
onSlideLeave(stop)
onUnmounted(() => {
  timeline?.kill()
  context?.revert()
})
</script>

<template>
  <figure class="legacy-svg-boiling" aria-label="Prior SVG boiling experiment using translated source bubbles">
    <div ref="root" class="legacy-svg-source" v-html="svgMarkup" />
    <figcaption>Existing source SVG · separate marks translate upward</figcaption>
  </figure>
</template>
