<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed, onMounted, ref } from 'vue'

const reactionSvg = ref<SVGSVGElement | null>(null)
const renderState = ref<'loading' | 'ready' | 'error'>('loading')
const renderError = ref('')
const { $clicks } = useSlideContext()
const stage = computed(() => Math.max(0, Math.min(4, Number($clicks.value) || 0)))

const reactionSmiles = '[H:1][H:2].[H:3][H:4].[O:5]=[O:6]>>[H:1][O:5][H:2].[H:3][O:6][H:4]'
const stages = [
  { heading: 'read the reaction', copy: 'The mapped reaction string is the source of truth for every atom and bond.' },
  { heading: 'count the reactants', copy: 'Two hydrogen molecules contain four H atoms; one oxygen molecule contains two O atoms.' },
  { heading: 'compare connectivity', copy: 'The renderer derives the molecular bonds from the reaction SMILES instead of using positioned CSS shapes.' },
  { heading: 'count the products', copy: 'Two water molecules contain the same four H atoms and two O atoms.' },
  { heading: 'audit complete', copy: 'Hydrogen is 4 → 4 and oxygen is 2 → 2. The balanced equation conserves both elements.' },
]

onMounted(async () => {
  if (!reactionSvg.value) return

  try {
    const { default: SmilesDrawer } = await import('smiles-drawer')
    const drawer = new SmilesDrawer.SmiDrawer({
      width: 1040,
      height: 280,
      bondLength: 54,
      bondThickness: 1.6,
      bondSpacing: 8,
      fontSizeLarge: 18,
      fontSizeSmall: 6,
      padding: 24,
      compactDrawing: false,
      explicitHydrogens: true,
      themes: {
        lab: {
          FOREGROUND: '#252421',
          BACKGROUND: '#f3f0e8',
          C: '#252421',
          O: '#a84a36',
          N: '#2f6080',
          F: '#486b58',
          CL: '#486b58',
          BR: '#a8732a',
          I: '#6c557b',
          P: '#a8732a',
          S: '#a8732a',
          B: '#a8732a',
          SI: '#6e6a62',
          H: '#2f6080',
        },
      },
    }, {
      scale: 1.35,
      spacing: 24,
      plus: { size: 14, thickness: 1.4 },
      arrow: { length: 190, headSize: 8, thickness: 1.4, margin: 5 },
    })

    drawer.draw(
      reactionSmiles,
      reactionSvg.value,
      'lab',
      () => { renderState.value = 'ready' },
      (error: Error) => {
        renderState.value = 'error'
        renderError.value = error.message
      },
    )
  }
  catch (error) {
    renderState.value = 'error'
    renderError.value = error instanceof Error ? error.message : 'The chemistry renderer could not load.'
  }
})
</script>

<template>
  <section class="chemistry-renderer" :data-stage="stage" :data-renderer-state="renderState" aria-label="Library-rendered balanced reaction for forming water">
    <div class="chemistry-source">
      <span>mapped reaction SMILES</span>
      <code>{{ reactionSmiles }}</code>
    </div>

    <svg ref="reactionSvg" class="chemistry-reaction" role="img" aria-label="Two hydrogen molecules and one oxygen molecule form two water molecules" />
    <p v-if="renderState === 'error'" class="chemistry-error">{{ renderError }}</p>

    <div class="chemistry-reading">
      <div>
        <span>click {{ stage }} / 4</span>
        <strong>{{ stages[stage].heading }}</strong>
      </div>
      <p>{{ stages[stage].copy }}</p>
      <div class="chemistry-count" aria-label="Atom conservation count">
        <span>hydrogen <b>4 → 4</b></span>
        <span>oxygen <b>2 → 2</b></span>
      </div>
    </div>
  </section>
</template>
