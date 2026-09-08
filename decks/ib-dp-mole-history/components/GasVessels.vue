<template>
  <div class="gas-vessels" aria-label="Equal-volume vessels: six hydrogen molecules and six oxygen molecules, at the same temperature and pressure. Schematic, not actual particle counts or sizes.">
    <div v-for="gas in ['H','O']" :key="gas" class="vessel" :class="gas === 'O' ? 'oxygen' : 'hydrogen'">
      <span class="vessel-label">{{ gas }}₂</span>
      <div class="molecules" aria-hidden="true"><span v-for="i in 6" :key="i" class="molecule"><i>{{ gas }}</i><i>{{ gas }}</i></span></div>
    </div>
  </div>
</template>
<style scoped>
.gas-vessels{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:24px 0}
.vessel{height:220px;border-radius:14px;background:var(--soft-blue);padding:20px 22px;color:var(--blue)}.oxygen{background:var(--soft-rust);color:var(--rust)}
.vessel-label{font:30px var(--serif)}.molecules{display:grid;grid-template-columns:repeat(3,1fr);gap:23px 10px;margin-top:20px}
.molecule{display:flex;justify-content:center}.molecule i{font:14px var(--body);width:29px;height:29px;border-radius:50%;background:var(--blue);color:white;display:grid;place-items:center;font-style:normal}.molecule i+i{margin-left:-2px}.oxygen .molecule i{background:var(--rust)}
</style>
