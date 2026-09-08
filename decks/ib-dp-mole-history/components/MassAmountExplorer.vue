<script setup lang="ts">
import { computed, ref } from 'vue'
import { amountToMass, massToAmount, molarMass, substances, formatQuantity } from '../lib/stoichiometry'
const selected = ref(0)
const mode = ref<'mass' | 'amount'>('mass')
const input = ref('2.431')
const substance = computed(() => substances[selected.value]!)
const M = computed(() => molarMass(substance.value.atoms))
const valid = computed(() => Number.isFinite(Number(input.value)) && Number(input.value) > 0)
const result = computed(() => valid.value ? (mode.value === 'mass' ? massToAmount(Number(input.value), M.value) : amountToMass(Number(input.value), M.value)) : null)
function reverse() { if (result.value !== null) input.value = String(result.value); mode.value = mode.value === 'mass' ? 'amount' : 'mass' }
function reset() { selected.value = 0; mode.value = 'mass'; input.value = '2.431' }
</script>

<template>
  <section class="quantity-explorer" aria-label="Mass and amount explorer" @keydown.stop>
    <div class="quantity-controls">
      <label>Substance<select v-model.number="selected"><option v-for="(item,i) in substances" :key="item.symbol" :value="i">{{ item.name }}</option></select></label>
      <label>{{ mode === 'mass' ? 'Known mass / g' : 'Known amount / mol' }}<input v-model="input" type="number" min="0" step="any" :aria-invalid="!valid" /></label>
      <button class="quiet-action" type="button" @click.stop="reverse">Reverse direction</button>
    </div>
    <p class="caption">Molar mass: {{ M.toFixed(2) }} g mol⁻¹. Predict before changing the input.</p>
    <div class="quantity-result" aria-live="polite" aria-atomic="true">
      <template v-if="result !== null">
        <span class="small-label">{{ mode === 'mass' ? 'Mass → amount' : 'Amount → mass' }}</span>
        <MoleMath :tex="mode === 'mass' ? `n=\\frac{${Number(input)}\\ \\mathrm g}{${M.toFixed(2)}\\ \\mathrm{g\\,mol^{-1}}}=${formatQuantity(result)}\\ \\mathrm{mol}` : `m=${Number(input)}\\ \\mathrm{mol}\\times ${M.toFixed(2)}\\ \\mathrm{g\\,mol^{-1}}=${formatQuantity(result)}\\ \\mathrm g`" />
      </template>
      <p v-else>Enter a positive number to calculate.</p>
    </div>
    <div class="quantity-footer"><p class="caption">Calculator view: 4 significant figures. Match your final answer to the precision of the input data.</p><button class="quiet-action" type="button" @click.stop="reset">Reset</button></div>
  </section>
</template>
