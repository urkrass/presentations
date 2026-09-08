<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ cards: { front: string; back: string; tone?: string }[] }>()
const flipped = ref<Record<number, boolean>>({})
</script>

<template>
  <div class="mole-flips">
    <button v-for="(card,i) in cards" :key="card.front" type="button" class="mole-flip" :class="`tone-${card.tone || 'blue'}`" :aria-pressed="!!flipped[i]" @click.stop="flipped[i] = !flipped[i]">
      <span class="flip-inner">
        <span class="flip-face flip-front" :aria-hidden="!!flipped[i]"><strong>{{ card.front }}</strong><span class="flip-cue" aria-hidden="true">+</span></span>
        <span class="flip-face flip-back" :aria-hidden="!flipped[i]"><strong>{{ card.back }}</strong><span class="flip-cue" aria-hidden="true">×</span></span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.mole-flips{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin:36px 0;perspective:1400px}
.mole-flip{height:295px;padding:0;border:0;background:transparent;border-radius:var(--radius-card);perspective:1100px;cursor:pointer;text-align:left}
.flip-inner{display:block;position:relative;height:100%;width:100%;transform-style:preserve-3d;transition:transform var(--motion-flip) var(--ease)}
.mole-flip[aria-pressed=true] .flip-inner{transform:rotateY(180deg)}
.flip-face{position:absolute;inset:0;display:grid;align-content:center;padding:30px 28px 48px;border-radius:var(--radius-card);backface-visibility:hidden;-webkit-backface-visibility:hidden}
.flip-face strong{font:400 30px/1.23 var(--serif)}
.flip-front{background:var(--soft-blue);color:var(--blue)}.tone-rust .flip-front{background:var(--soft-rust);color:var(--rust)}.tone-green .flip-front{background:var(--soft-green);color:var(--green)}
.flip-back{background:var(--charcoal);color:var(--paper);transform:rotateY(180deg)}.flip-back strong{font-size:24px;line-height:1.35}
.flip-cue{position:absolute;bottom:18px;right:20px;border-radius:50%;display:grid;place-items:center;width:27px;height:27px;background:rgba(251,250,246,.65);color:var(--rust);font:22px var(--body)}
@media print{.mole-flip{height:330px}.flip-inner{transform:none!important;transform-style:flat}.flip-front{position:relative;height:110px;padding:16px;background:var(--paper-deep)!important}.flip-front strong{font-size:22px}.flip-back{inset:110px 0 0;transform:none;background:var(--soft-green);color:var(--ink);padding:20px}.flip-back strong{font-size:21px}.flip-cue{display:none}}
</style>
