<script setup lang="ts">
import { ref } from 'vue'
import { scaleLinear } from 'd3-scale'
const stage = ref(0)
const height = scaleLinear().domain([5.8,7.2]).range([205,20])
const events = [
  { year:'1900',name:'Planck',value:6.175,caption:'6.175 × 10²³' },
  { year:'1905',name:'Einstein',value:null,caption:'Brownian-motion route' },
  { year:'1909',name:'Perrin',value:7,caption:'about 7 × 10²³' },
  { year:'2019',name:'Exact SI value',value:6.02214076,caption:'6.022 140 76 × 10²³' },
]
</script>
<template>
  <div class="estimate-scene">
    <div class="estimate-label">Particle count per mole-sized batch, in ×10²³</div>
    <div class="estimate-chart" role="img" aria-label="Historical estimates: Planck 1900, 6.175 times ten to the 23; Einstein 1905, a new measurement route, no estimate plotted; Perrin 1909, about 7 times ten to the 23; the exact 2019 count is 6.02214076 times ten to the 23. Years are ordered, not equally spaced in time.">
      <div class="scale-labels" aria-hidden="true"><span v-for="n in [6,6.5,7]" :key="n" :style="{top:height(n)+'px'}">{{ n.toFixed(1) }}</span></div>
      <div v-for="(event,i) in events" :key="event.year" class="estimate-column" :class="{ pending:i>stage }">
        <div v-if="event.value !== null" class="estimate-point" :style="{top:height(event.value)+'px'}"><i/><strong>{{ event.caption }}</strong></div>
        <div v-else class="no-estimate">A different route.<br>No value plotted.</div>
        <div class="estimate-year"><strong>{{ event.year }}</strong><span>{{ event.name }}</span></div>
      </div>
    </div>
    <div class="estimate-controls"><span>Historical estimates, not a precision trend. Years are ordered, not time-scaled.</span><button type="button" aria-label="Previous historical estimate" :disabled="stage===0" @click.stop="stage--">←</button><button type="button" aria-label="Next historical estimate" :disabled="stage===3" @click.stop="stage++">→</button></div>
  </div>
</template>
<style scoped>
.estimate-scene{margin:25px 0}.estimate-label{font-size:16px;color:var(--muted);margin-bottom:20px}.estimate-chart{display:grid;grid-template-columns:60px repeat(4,1fr);height:310px;gap:18px}.scale-labels,.estimate-column{position:relative}.scale-labels span{position:absolute;left:0;font-size:17px;color:var(--muted)}.estimate-column{transition:opacity var(--motion-focus) var(--ease),filter var(--motion-focus) var(--ease)}.pending{opacity:.09;filter:blur(7px)}.estimate-point{position:absolute;left:10px;right:0;display:grid;gap:10px}.estimate-point i{width:12px;height:12px;background:var(--rust);border-radius:50%}.estimate-point strong{font:22px/1.2 var(--serif);white-space:nowrap}.estimate-column:last-child .estimate-point{left:0}.estimate-column:last-child .estimate-point i{background:var(--green)}.estimate-column:last-child .estimate-point strong{font-size:19px;color:var(--green)}.no-estimate{position:absolute;top:90px;font:22px/1.4 var(--serif);color:var(--muted)}.estimate-year{position:absolute;bottom:0;display:grid;gap:5px}.estimate-year strong{font:30px var(--serif)}.estimate-year span{font-size:18px;color:var(--muted)}.estimate-controls{display:flex;align-items:center;gap:12px;margin-top:20px}.estimate-controls span{margin-right:auto;font-size:16px;color:var(--muted)}.estimate-controls button{border:0;background:var(--paper-deep);color:var(--ink);width:36px;height:36px;border-radius:50%;font-size:23px;cursor:pointer}.estimate-controls button:disabled{opacity:.25}
@media print{.pending{opacity:1;filter:none}.estimate-controls button{display:none}}
</style>
