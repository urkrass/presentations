<script setup lang="ts">
import { computed, ref } from 'vue'
import { reactions, predictProduct, formatQuantity as fmt } from '../lib/stoichiometry'
const selected = ref(0)
const mass = ref('2.431')
const reaction = computed(() => reactions[selected.value]!)
const valid = computed(() => Number.isFinite(Number(mass.value)) && Number(mass.value) > 0)
const result = computed(() => {
  const r = reaction.value
  return valid.value ? predictProduct(Number(mass.value),r.reactantM,r.a,r.b,r.productM) : null
})
function reset() { selected.value=0;mass.value='2.431' }
</script>

<template>
  <section class="product-explorer" aria-label="Theoretical product mass explorer" @keydown.stop>
    <div class="quantity-controls">
      <label>Reaction and starting substance<select v-model.number="selected"><option v-for="(item,i) in reactions" :key="item.name" :value="i">{{ item.name }}</option></select></label>
      <label>Starting mass / g<input v-model="mass" type="number" min="0" step="any" :aria-invalid="!valid" /></label>
      <button class="quiet-action" type="button" @click.stop="reset">Reset</button>
    </div>
    <p class="explorer-equation"><MoleMath :tex="reaction.equation" /></p>
    <p class="caption">{{ reaction.assumption }} M: reactant {{ reaction.reactantM.toFixed(2) }}; product {{ reaction.productM.toFixed(2) }} g mol⁻¹.</p>
    <div class="product-argument" aria-live="polite" aria-atomic="true">
      <template v-if="result">
        <div class="argument-row"><span class="small-label">1 · Divide by M</span><MoleMath :tex="`n(\\mathrm{${reaction.given}})=\\frac{${Number(mass)}}{${reaction.reactantM.toFixed(2)}}=${fmt(result.reactantAmount)}\\ \\mathrm{mol}`" /></div>
        <div class="argument-row"><span class="small-label">2 · Use the ratio</span><MoleMath :tex="`n(\\mathrm{${reaction.product}})=n(\\mathrm{${reaction.given}})\\times\\frac{${reaction.b}}{${reaction.a}}=${fmt(result.productAmount)}\\ \\mathrm{mol}`" /></div>
        <div class="argument-row result-row"><span class="small-label">3 · Multiply by M</span><MoleMath :tex="`m(\\mathrm{${reaction.product}})=n(\\mathrm{${reaction.product}})\\times ${reaction.productM.toFixed(2)}=${fmt(result.productMass)}\\ \\mathrm g`" /></div>
      </template>
      <p v-else>Enter a positive starting mass to calculate.</p>
    </div>
    <p class="caption">Four-significant-figure display; unrounded intermediates. Predict: if the input doubles, what changes?</p>
  </section>
</template>
