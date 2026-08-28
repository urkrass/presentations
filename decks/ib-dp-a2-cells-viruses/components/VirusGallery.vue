<script setup lang="ts">
import { computed, ref } from 'vue'

const viruses = [
  {name:'variola', image:'images/variola.jpg', genome:'dsDNA', form:'complex poxvirus particle', host:'humans', point:'Smallpox was eradicated by interrupting transmission—not by making the virus less dependent on cells.'},
  {name:'influenza A', image:'images/influenza.jpg', genome:'segmented ssRNA', form:'enveloped, pleomorphic virion', host:'birds and mammals', point:'Its segmented genome makes reassortment possible when two strains infect the same cell.'},
  {name:'bacteriophage', image:'images/phages.jpg', genome:'often dsDNA', form:'capsid and attachment apparatus', host:'bacteria', point:'Attachment structures fit a particular host surface; infection begins with molecular recognition.'},
  {name:'mimivirus', image:'images/mimivirus.jpg', genome:'large dsDNA', form:'giant fibrous capsid', host:'amoebae', point:'Size and gene repertoire blur old rules, but it still lacks independent translation and reproduction.'},
]
const active=ref(0)
const virus=computed(()=>viruses[active.value])
</script>

<template>
  <section class="virus-gallery">
    <figure><img :src="virus.image" :alt="`${virus.name} micrograph`" /><figcaption>{{ virus.name }}</figcaption></figure>
    <div class="virus-copy">
      <p class="scene-kicker">One category, radically different architectures</p>
      <h2>{{ virus.name }}</h2>
      <dl><div><dt>genome</dt><dd>{{ virus.genome }}</dd></div><div><dt>particle</dt><dd>{{ virus.form }}</dd></div><div><dt>host</dt><dd>{{ virus.host }}</dd></div></dl>
      <p>{{ virus.point }}</p>
      <div class="virus-switcher"><button v-for="(item,index) in viruses" :key="item.name" type="button" :class="{active:index===active}" @click="active=index">{{ item.name }}</button></div>
    </div>
  </section>
</template>

<style scoped>
.virus-gallery{display:grid;grid-template-columns:1.16fr .84fr;gap:46px;min-height:500px}.virus-gallery figure{position:relative;margin:0;height:500px;overflow:hidden;border-radius:var(--radius-field);background:#111}.virus-gallery img{width:100%;height:100%;object-fit:cover}.virus-gallery figcaption{position:absolute;left:18px;bottom:15px;border-radius:var(--radius-control);background:rgba(0,0,0,.67);color:#fff;padding:8px 11px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.virus-copy{display:grid;align-content:center;gap:17px}.virus-copy h2{margin:0;font:500 44px/1 Georgia,serif;text-transform:capitalize}.virus-copy dl{margin:0;display:grid;gap:8px}.virus-copy dl div{display:grid;grid-template-columns:86px 1fr;gap:14px;padding:7px 0}.virus-copy dt{color:var(--rust);font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.virus-copy dd{margin:0;color:var(--ink);font-weight:700}.virus-copy>p:not(.scene-kicker){margin:0;padding:15px 17px;border-radius:var(--radius-field);background:var(--paper-deep);color:var(--muted);font-size:17px;line-height:1.42}.virus-switcher{display:flex;gap:8px;flex-wrap:wrap}.virus-switcher button{padding:10px 12px;border:0;border-radius:var(--radius-control);background:var(--paper-deep);color:var(--muted);font-weight:700;cursor:pointer}.virus-switcher button.active{background:var(--blue);color:#fff}button:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}
</style>
