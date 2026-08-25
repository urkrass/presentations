<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'

const reactionSvg = ref<SVGSVGElement | null>(null)
const renderState = ref<'loading' | 'ready' | 'error'>('loading')
const renderedStage = ref(-1)
const renderError = ref('')
const drawer = shallowRef<{
  draw: (
    smiles: string,
    target: SVGSVGElement,
    theme: string,
    success: () => void,
    error: (error: Error) => void,
  ) => void
} | null>(null)
const { $clicks } = useSlideContext()
const stage = computed(() => Math.max(0, Math.min(4, Number($clicks.value) || 0)))

// These are equation-balancing candidates, not frames of a reaction mechanism.
// Only the final state uses atom mapping because only that state conserves every atom.
const reactionStages = [
  {
    smiles: '[H][H].[O]=[O]>>[H][O][H]',
    theme: 'neutral',
    heading: 'start with a candidate',
    copy: 'One H₂ and one O₂ cannot make one H₂O without losing an oxygen atom.',
    hydrogen: '2 → 2',
    oxygen: '2 → 1',
    mismatch: 'oxygen',
  },
  {
    smiles: '[H][H].[O]=[O]>>[H][O][H]',
    theme: 'oxygen',
    heading: 'find the first mismatch',
    copy: 'SmilesDrawer recolours oxygen: two O atoms enter, but only one appears in the candidate product.',
    hydrogen: '2 → 2',
    oxygen: '2 → 1',
    mismatch: 'oxygen',
  },
  {
    smiles: '[H][H].[O]=[O]>>[H][O][H].[H][O][H]',
    theme: 'hydrogen',
    heading: 'add a second water',
    copy: 'Oxygen now balances, but the new candidate demands four H atoms while only two enter.',
    hydrogen: '2 → 4',
    oxygen: '2 → 2',
    mismatch: 'hydrogen',
  },
  {
    smiles: '[H:1][H:2].[H:3][H:4].[O:5]=[O:6]>>[H:1][O:5][H:2].[H:3][O:6][H:4]',
    theme: 'neutral',
    heading: 'add a second hydrogen',
    copy: 'The renderer adds another H₂ molecule. Both sides now contain four H atoms and two O atoms.',
    hydrogen: '4 → 4',
    oxygen: '2 → 2',
    mismatch: '',
  },
  {
    smiles: '[H:1][H:2].[H:3][H:4].[O:5]=[O:6]>>[H:1][O:5][H:2].[H:3][O:6][H:4]',
    theme: 'audit',
    heading: 'audit complete',
    copy: 'The final mapped reaction accounts for every atom. Coefficients changed; formulas did not.',
    hydrogen: '4 → 4',
    oxygen: '2 → 2',
    mismatch: '',
  },
]

const current = computed(() => reactionStages[stage.value])

function drawStage() {
  if (!drawer.value || !reactionSvg.value) return

  const requestedStage = stage.value
  renderState.value = 'loading'
  renderError.value = ''
  drawer.value.draw(
    current.value.smiles,
    reactionSvg.value,
    current.value.theme,
    () => {
      renderedStage.value = requestedStage
      renderState.value = 'ready'
    },
    (error: Error) => {
      renderState.value = 'error'
      renderError.value = error.message
    },
  )
}

watch(stage, drawStage)

onMounted(async () => {
  if (!reactionSvg.value) return

  try {
    const { default: SmilesDrawer } = await import('smiles-drawer')
    drawer.value = new SmilesDrawer.SmiDrawer({
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
        neutral: {
          FOREGROUND: '#514f49', BACKGROUND: '#f3f0e8', C: '#514f49', O: '#514f49', H: '#514f49',
        },
        oxygen: {
          FOREGROUND: '#918c82', BACKGROUND: '#f3f0e8', C: '#918c82', O: '#a84a36', H: '#918c82',
        },
        hydrogen: {
          FOREGROUND: '#918c82', BACKGROUND: '#f3f0e8', C: '#918c82', O: '#918c82', H: '#2f6080',
        },
        audit: {
          FOREGROUND: '#252421', BACKGROUND: '#f3f0e8', C: '#252421', O: '#a84a36', H: '#2f6080',
        },
      },
    }, {
      scale: 1.35,
      spacing: 24,
      plus: { size: 14, thickness: 1.4 },
      arrow: { length: 190, headSize: 8, thickness: 1.4, margin: 5 },
    })

    drawStage()
  }
  catch (error) {
    renderState.value = 'error'
    renderError.value = error instanceof Error ? error.message : 'The chemistry renderer could not load.'
  }
})
</script>

<template>
  <section
    class="chemistry-renderer"
    :data-stage="stage"
    :data-renderer-stage="renderedStage"
    :data-renderer-state="renderState"
    aria-label="SmilesDrawer balancing sequence for forming water"
  >
    <div class="chemistry-source">
      <span>equation candidate {{ stage + 1 }} of 5</span>
      <strong>Balancing edits coefficients—not an atom-by-atom mechanism.</strong>
    </div>

    <svg ref="reactionSvg" class="chemistry-reaction" role="img" :aria-label="current.copy" />
    <p v-if="renderState === 'error'" class="chemistry-error">{{ renderError }}</p>

    <div class="chemistry-reading">
      <div>
        <span>click {{ stage }} / 4</span>
        <strong>{{ current.heading }}</strong>
      </div>
      <p>{{ current.copy }}</p>
      <div class="chemistry-count" aria-label="Atom conservation count">
        <span :class="{ mismatch: current.mismatch === 'hydrogen' }">hydrogen <b>{{ current.hydrogen }}</b></span>
        <span :class="{ mismatch: current.mismatch === 'oxygen' }">oxygen <b>{{ current.oxygen }}</b></span>
      </div>
    </div>
  </section>
</template>
