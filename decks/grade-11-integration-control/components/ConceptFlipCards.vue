<script setup lang="ts">
import { computed, ref } from 'vue'

type Card = { id: string; title: string; short: string; backTitle: string; detail: string }

const props = withDefaults(defineProps<{ mode?: 'receptors' | 'hormones' | 'memory' }>(), { mode: 'receptors' })
const flipped = ref(new Set<string>())

const banks: Record<string, Card[]> = {
  receptors: [
    { id: '01', title: 'Mechanoreceptor', short: 'stretch · pressure · sound', backTitle: 'Physical deformation', detail: 'Includes baroreceptors for arterial stretch and proprioceptors for body position.' },
    { id: '02', title: 'Chemoreceptor', short: 'molecules · pH · gases', backTitle: 'Chemical concentration', detail: 'Detects odours and internal changes such as CO₂, O₂ and blood pH.' },
    { id: '03', title: 'Thermoreceptor', short: 'heat · cold', backTitle: 'Temperature change', detail: 'Free nerve endings in skin and deeper tissues signal warming or cooling.' },
    { id: '04', title: 'Nociceptor', short: 'potential damage', backTitle: 'Pain warning', detail: 'Initiates protective responses when tissue-damaging stimuli are detected.' },
    { id: '05', title: 'Photoreceptor', short: 'light', backTitle: 'Electromagnetic energy', detail: 'Retinal cells convert light into signals that the nervous system can process.' },
  ],
  hormones: [
    { id: '01', title: 'Auxin', short: 'elongation · apical dominance', backTitle: 'Growth direction', detail: 'Uneven auxin distribution drives tropisms; a high auxin ratio favours roots.' },
    { id: '02', title: 'Cytokinin', short: 'division · differentiation', backTitle: 'New tissues', detail: 'Made mainly in roots; promotes cell division, shoot formation and delays senescence.' },
    { id: '03', title: 'Gibberellin', short: 'germination · shoot growth', backTitle: 'Release growth', detail: 'Promotes stem elongation, germination, flowering and fruit maturation.' },
    { id: '04', title: 'Abscisic acid', short: 'stress · dormancy', backTitle: 'Conserve resources', detail: 'Rises during water stress, inhibits growth and helps maintain seed dormancy.' },
    { id: '05', title: 'Ethylene', short: 'ripening · abscission', backTitle: 'A gaseous signal', detail: 'Accelerates fruit ripening through positive feedback and promotes organ shedding.' },
  ],
  memory: [
    { id: '01', title: 'Learning', short: 'a change in neural networks', backTitle: 'Plasticity', detail: 'Repeated use can form, strengthen or remove synaptic connections.' },
    { id: '02', title: 'Memory', short: 'storage and retrieval', backTitle: 'Distributed record', detail: 'Memories are stored across interconnected brain regions, not one single site.' },
    { id: '03', title: 'Explicit memory', short: 'facts and events', backTitle: 'Conscious recall', detail: 'Recalling an equation, a capital city or a personal event is declarative memory.' },
    { id: '04', title: 'Implicit memory', short: 'skills and routines', backTitle: 'Performance without recall', detail: 'Riding a bicycle or brushing teeth can be guided by previous experience automatically.' },
  ],
}

const cards = computed(() => banks[props.mode])

function toggle(id: string) {
  const next = new Set(flipped.value)
  next.has(id) ? next.delete(id) : next.add(id)
  flipped.value = next
}
</script>

<template>
  <section class="flip-section">
    <p class="flip-prompt"><span>interaction</span>Click a card to reveal the mechanism.</p>
    <div class="flip-grid" :class="`cards-${cards.length}`">
      <button v-for="card in cards" :key="card.id" type="button" class="flip-card" :class="{ flipped: flipped.has(card.id) }" :aria-pressed="flipped.has(card.id)" @click="toggle(card.id)">
        <span class="flip-inner">
          <span class="face front">
            <span class="number">{{ card.id }}</span>
            <strong>{{ card.title }}</strong>
            <span class="short">{{ card.short }}</span>
            <span class="action" aria-hidden="true">+</span>
          </span>
          <span class="face back">
            <span class="number">{{ card.id }}</span>
            <strong>{{ card.backTitle }}</strong>
            <span class="detail">{{ card.detail }}</span>
            <span class="action" aria-hidden="true">×</span>
          </span>
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.flip-section { display: grid; gap: 10px; }
.flip-prompt { margin: 0; display: flex; align-items: center; gap: 11px; color: var(--muted); font-size: 15px; }
.flip-prompt span { color: var(--accent); font-size: 12px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.flip-grid { display: grid; grid-template-columns: repeat(6, minmax(0,1fr)); gap: 14px; }
.flip-card { grid-column: span 2; min-height: 174px; appearance: none; padding: 0; border: 0; background: transparent; color: inherit; cursor: pointer; text-align: left; }
.cards-5 .flip-card:nth-child(4), .cards-5 .flip-card:nth-child(5) { grid-column: span 3; }
.cards-4 .flip-card { grid-column: span 3; }
.flip-card:focus-visible { outline: 4px solid color-mix(in srgb, var(--accent) 38%, transparent); outline-offset: 4px; }
.flip-inner { position: relative; display: block; width: 100%; min-height: 174px; }
.face { position: absolute; inset: 0; min-height: 174px; padding: 18px 20px 28px; display: flex; flex-direction: column; border-radius: 7px; transition: opacity 160ms ease, visibility 160ms ease; }
.front { background: var(--paper-deep); }
.back { background: var(--green-field); opacity: 0; visibility: hidden; }
.flipped .front { opacity: 0; visibility: hidden; }
.flipped .back { opacity: 1; visibility: visible; }
.number, .action { color: var(--accent); font-size: 11px; font-weight: 800; letter-spacing: .1em; }
.face strong { margin-top: 13px; color: var(--ink); font: 700 22px/1.23 var(--serif); }
.short, .detail { margin-top: 9px; color: var(--muted); font-size: 14px; line-height: 1.42; }
.detail { color: var(--charcoal); }
.action { position: absolute; right: 13px; bottom: 12px; width: 24px; height: 24px; display: grid; place-items: center; border-radius: 50%; background: rgba(255,255,255,.62); color: var(--accent-2); font: 700 18px/1 var(--serif); }
</style>
