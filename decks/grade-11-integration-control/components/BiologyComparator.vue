<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  leftLabel: string
  leftTitle: string
  leftBody: string
  leftDetail?: string
  rightLabel: string
  rightTitle: string
  rightBody: string
  rightDetail?: string
  hinge?: string
}>(), {
  leftDetail: '',
  rightDetail: '',
  hinge: 'compare',
})

const root = ref<HTMLElement | null>(null)
const position = ref(50)
const clamp = (value: number) => Math.min(82, Math.max(18, value))

function setFromPointer(event: PointerEvent) {
  if (!root.value) return
  const rect = root.value.getBoundingClientRect()
  position.value = clamp(((event.clientX - rect.left) / rect.width) * 100)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') position.value = clamp(position.value - 4)
  else if (event.key === 'ArrowRight') position.value = clamp(position.value + 4)
  else if (event.key === 'Home') position.value = 18
  else if (event.key === 'End') position.value = 82
  else return
  event.preventDefault()
}

const leftClip = computed(() => ({ clipPath: `inset(0 ${100 - position.value}% 0 0)` }))
const divider = computed(() => ({ left: `${position.value}%` }))
const valueText = computed(() => `${props.leftLabel} ${Math.round(position.value)} percent, ${props.rightLabel} ${Math.round(100 - position.value)} percent`)
</script>

<template>
  <section
    ref="root"
    class="biology-comparator"
    role="slider"
    tabindex="0"
    aria-valuemin="18"
    aria-valuemax="82"
    :aria-valuenow="Math.round(position)"
    :aria-valuetext="valueText"
    :aria-label="`Compare ${leftLabel} and ${rightLabel}`"
    @pointerdown="setFromPointer"
    @pointermove="event => event.buttons === 1 && setFromPointer(event)"
    @keydown="onKeydown"
  >
    <div class="comparison-window">
      <div class="comparison-layer right-layer">
        <div class="comparison-copy right-copy">
          <span>{{ rightLabel }}</span>
          <strong>{{ rightTitle }}</strong>
          <p>{{ rightBody }}</p>
          <small v-if="rightDetail">{{ rightDetail }}</small>
        </div>
      </div>
      <div class="comparison-layer left-layer" :style="leftClip">
        <div class="comparison-copy left-copy">
          <span>{{ leftLabel }}</span>
          <strong>{{ leftTitle }}</strong>
          <p>{{ leftBody }}</p>
          <small v-if="leftDetail">{{ leftDetail }}</small>
        </div>
      </div>
    </div>
    <div class="comparison-divider" :style="divider" aria-hidden="true">
      <div class="comparison-handle"><span>hinge</span><strong>{{ hinge }}</strong></div>
    </div>
  </section>
</template>

<style scoped>
.biology-comparator { height: 350px; margin-top: 18px; position: relative; cursor: ew-resize; user-select: none; }
.biology-comparator:focus-visible { outline: 4px solid color-mix(in srgb, var(--accent) 38%, transparent); outline-offset: 6px; }
.comparison-window { position: absolute; inset: 0; overflow: hidden; border-radius: 7px; background: var(--green-field); }
.comparison-layer { position: absolute; inset: 0; }
.right-layer { background: radial-gradient(circle at 82% 50%, rgba(49,95,122,.14), transparent 38%), var(--blue-field); }
.left-layer { background: radial-gradient(circle at 18% 50%, rgba(154,73,56,.12), transparent 38%), var(--warm-field); transition: clip-path 80ms ease-out; }
.comparison-copy { position: absolute; top: 0; width: 46%; height: 100%; padding: 40px 44px; display: flex; flex-direction: column; justify-content: center; }
.left-copy { left: 0; }
.right-copy { right: 0; }
.comparison-copy span, .comparison-handle span { color: var(--accent); font: 800 13px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; }
.comparison-copy strong { display: block; margin-top: 15px; color: var(--ink); font: 700 35px/1.16 var(--serif); }
.comparison-copy p { margin: 16px 0 0; color: var(--charcoal); font-size: 18px; line-height: 1.46; }
.comparison-copy small { margin-top: 12px; color: var(--muted); font-size: 14px; line-height: 1.45; }
.comparison-divider { position: absolute; top: 0; bottom: 0; width: 2px; background: rgba(154,73,56,.22); transform: translateX(-50%); transition: left 80ms ease-out; }
.comparison-divider::before, .comparison-divider::after { content: ''; position: absolute; top: 0; height: 100%; width: 34px; }
.comparison-divider::before { right: 2px; background: linear-gradient(to right, transparent, rgba(154,73,56,.08)); }
.comparison-divider::after { left: 2px; background: linear-gradient(to right, rgba(49,95,122,.08), transparent); }
.comparison-handle { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); min-width: 124px; padding: 12px 15px 14px; display: grid; gap: 5px; place-items: center; border-radius: 999px; background: #a06a5e; color: white; }
.comparison-handle span { color: rgba(255,255,255,.78); font-size: 10px; }
.comparison-handle strong { color: white; font: 700 17px/1 var(--serif); white-space: nowrap; }
</style>
