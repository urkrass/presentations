<script setup lang="ts">
import { ref } from 'vue'
const condensed = ref(false)
</script>
<template>
  <div class="count-word">
    <div class="dozen-field"><div class="twelve" aria-label="Twelve objects"><span v-for="i in 12" :key="i" /></div><p>1 dozen = 12 objects</p></div>
    <button type="button" class="many-field" :aria-pressed="condensed" @click.stop="condensed = !condensed" aria-label="Represent the particle field as an exact numerical count">
      <div class="particle-field" :class="{ condensed }" aria-hidden="true"><span v-for="i in 240" :key="i" /></div>
      <div class="count-number" :class="{ shown: condensed }"><strong>6.022 140 76 × 10<sup>23</sup></strong><span>entities in 1 mol · exactly</span></div>
      <span class="count-control">{{ condensed ? '×' : '+' }}</span>
    </button>
  </div>
</template>
<style scoped>
.count-word{display:grid;grid-template-columns:.8fr 1.6fr;gap:35px;margin:38px 0}
.dozen-field,.many-field{height:248px;border-radius:var(--radius-field);background:var(--paper-deep);position:relative;padding:28px}.dozen-field{display:grid;align-content:center;justify-items:center}.twelve{display:grid;grid-template-columns:repeat(4,19px);gap:17px}.twelve span{width:19px;height:19px;border-radius:50%;background:var(--rust)}.dozen-field p{margin:25px 0 0!important;font:25px var(--serif)}
.many-field{border:0;cursor:pointer;background:var(--soft-blue);overflow:hidden;color:var(--blue)}.particle-field{display:grid;grid-template-columns:repeat(24,1fr);gap:10px;transition:opacity var(--motion-focus) var(--ease),filter var(--motion-focus) var(--ease);opacity:.7}.particle-field span{width:5px;height:5px;border-radius:50%;background:var(--blue)}.particle-field.condensed{filter:blur(8px);opacity:.04}.count-number{position:absolute;inset:0;display:grid;align-content:center;gap:16px;opacity:0;filter:blur(7px);transition:opacity var(--motion-focus) var(--ease),filter var(--motion-focus) var(--ease)}.count-number.shown{opacity:1;filter:none}.count-number strong{font:35px var(--serif)}.count-number span{font:19px var(--body)}.count-control{position:absolute;right:19px;bottom:15px;width:26px;height:26px;border-radius:50%;background:var(--paper);font-size:23px}
@media print{.particle-field{opacity:.04}.count-number{opacity:1;filter:none}.count-control{display:none}}
</style>
