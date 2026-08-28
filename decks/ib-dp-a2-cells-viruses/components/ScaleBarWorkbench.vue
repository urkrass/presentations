<script setup lang="ts">
import { computed, ref } from 'vue'

const imageBarMm = ref(42)
const actualBarUm = ref(2)
const cellImageMm = ref(29)
const revealed = ref(false)

const magnification = computed(() => actualBarUm.value > 0 ? imageBarMm.value * 1000 / actualBarUm.value : 0)
const actualCell = computed(() => magnification.value > 0 ? cellImageMm.value * 1000 / magnification.value : 0)
function calculate() { revealed.value = true }
function reset() { imageBarMm.value = 42; actualBarUm.value = 2; cellImageMm.value = 29; revealed.value = false }
</script>

<template>
  <section class="scale-workbench">
    <figure><img :src="'images/e-coli.jpg'" alt="Scanning electron micrograph of E. coli used for a scale calculation" /><figcaption>Measure the displayed image—not the organism directly</figcaption></figure>
    <div class="scale-copy">
      <p class="scene-kicker">Scale-bar workbench · keep every unit visible</p>
      <h2>Use the bar before estimating the cell</h2>
      <div class="measurement-fields">
        <label><span>image scale bar</span><b><input v-model.number="imageBarMm" type="number" min="0.1" step="0.1" @input="revealed=false" /> mm</b></label>
        <label><span>actual scale bar</span><b><input v-model.number="actualBarUm" type="number" min="0.1" step="0.1" @input="revealed=false" /> μm</b></label>
        <label><span>cell on image</span><b><input v-model.number="cellImageMm" type="number" min="0.1" step="0.1" @input="revealed=false" /> mm</b></label>
      </div>
      <div class="scale-actions"><button type="button" @click="calculate">Calculate</button><button type="button" @click="reset">Reset</button></div>
      <div class="scale-result" aria-live="polite">
        <Transition name="measure-focus" mode="out-in">
          <div v-if="revealed" key="result"><span>magnification</span><strong>{{ Math.round(magnification).toLocaleString('en-US') }}×</strong><span>actual cell length</span><strong>{{ actualCell.toPrecision(2) }} μm</strong></div>
          <p v-else key="prompt">Convert millimetres to micrometres before dividing.</p>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scale-workbench{display:grid;grid-template-columns:1.05fr .95fr;gap:42px;min-height:500px}.scale-workbench figure{position:relative;margin:0;height:500px;border-radius:var(--radius-field);background:#151515;overflow:hidden}.scale-workbench img{display:block;width:100%;height:100%;object-fit:cover}.scale-workbench figcaption{position:absolute;left:17px;bottom:14px;padding:7px 10px;border-radius:var(--radius-control);background:rgba(10,10,10,.72);color:#fff;font-size:10px;font-weight:750;letter-spacing:.06em;text-transform:uppercase}.scale-copy{display:grid;align-content:center;gap:14px}.scale-copy h2{margin:0;font:500 34px/1.1 Georgia,serif}.measurement-fields{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.measurement-fields label{display:grid;gap:7px;padding:12px 13px;border-radius:var(--radius-field);background:var(--paper-deep)}.measurement-fields span{color:var(--rust);font-size:10px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.measurement-fields b{display:flex;align-items:baseline;gap:5px;color:var(--muted);font-size:13px}.measurement-fields input{width:100%;min-width:0;padding:0;border:0;background:transparent;color:var(--ink);font:500 28px/1 Georgia,serif;outline:0}.measurement-fields label:focus-within{background:var(--soft-blue)}.scale-actions{display:flex;gap:8px}.scale-actions button{padding:10px 16px;border:0;border-radius:var(--radius-control);background:var(--rust);color:#fff;font-weight:750;cursor:pointer}.scale-actions button:last-child{background:var(--paper-deep);color:var(--muted)}.scale-result{min-height:118px}.scale-result>div>div{min-height:118px;display:grid;grid-template-columns:1fr 1fr;align-content:center;gap:7px 14px;padding:15px 18px;border-radius:var(--radius-field);background:var(--soft-green)}.scale-result span{color:var(--green);font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.scale-result strong{font:500 27px/1.1 Georgia,serif}.scale-result p{min-height:118px;box-sizing:border-box;display:grid;align-items:center;margin:0!important;padding:15px 18px;border-radius:var(--radius-field);background:var(--paper-deep);color:var(--muted)!important;font-family:Georgia,serif;font-size:18px!important}.measure-focus-enter-active,.measure-focus-leave-active{transition:opacity var(--motion-reveal) var(--ease),filter var(--motion-reveal) var(--ease),transform var(--motion-reveal) var(--ease)}.measure-focus-enter-from{opacity:.2;filter:blur(7px);transform:translateY(10px)}.measure-focus-leave-to{opacity:0;filter:blur(4px);transform:translateY(-6px)}
.measure-focus-enter-active,.measure-focus-leave-active{transition-duration:var(--motion-fast)}
.scale-result>div{box-sizing:border-box;min-height:118px;display:grid;grid-template-columns:1fr 1fr;align-content:center;gap:7px 14px;padding:15px 18px;border-radius:var(--radius-field);background:var(--soft-green)}
</style>
