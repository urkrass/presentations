<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{ mode: 'centres' | 'neurons' | 'coordination' | 'autonomic' | 'ratio' }>()

const selected = ref<string | null>(null)
const pathway = ['receptor', 'sensory neuron', 'CNS', 'motor neuron', 'effector']
const pathwayBank = ['motor neuron', 'receptor', 'effector', 'CNS', 'sensory neuron']
const picked = ref<string[]>([])
const sympathetic = ref<'increase' | 'decrease' | null>(null)
const parasympathetic = ref<'increase' | 'decrease' | null>(null)
const checkedAutonomic = ref(false)
const ratio = ref(0)
const ratioCommitted = ref(false)

const pathwayComplete = computed(() => picked.value.length === pathway.length)
const pathwayCorrect = computed(() => pathwayComplete.value && picked.value.every((item, index) => item === pathway[index]))
const autonomicCorrect = computed(() => sympathetic.value === 'decrease' && parasympathetic.value === 'increase')
const ratioOutcome = computed(() => ratio.value < -30 ? 'roots' : ratio.value > 30 ? 'shoots' : 'callus')

function choosePath(item: string) {
  if (!picked.value.includes(item) && !pathwayComplete.value) picked.value.push(item)
}

function reset() {
  selected.value = null
  picked.value = []
  sympathetic.value = null
  parasympathetic.value = null
  checkedAutonomic.value = false
  ratio.value = 0
  ratioCommitted.value = false
}

watch(() => props.mode, reset)
</script>

<template>
  <section class="quick-check" aria-live="polite">
    <template v-if="props.mode === 'centres'">
      <div class="centres-layout">
        <figure class="centre-map">
          <img :src="'images/nervous-system.svg'" alt="Human nervous system diagram" />
          <button class="hotspot brain" type="button" aria-label="Choose the brain" @click="selected = 'brain'"><span>brain</span></button>
          <button class="hotspot cord" type="button" aria-label="Choose the spinal cord" @click="selected = 'cord'"><span>spinal cord</span></button>
        </figure>
        <div class="centres-copy">
          <p class="check-label">Test 1 · locate the integrator</p>
          <h2>A hand withdraws before pain is consciously reported. Tap where the immediate motor response is integrated.</h2>
          <p v-if="selected === null" class="quiet-result">Commit to a location, then explain why awareness comes later.</p>
          <p v-else class="result-sentence" :class="selected === 'cord' ? 'right' : 'wrong'">
            <strong>{{ selected === 'cord' ? 'Spinal cord.' : 'Look lower.' }}</strong>
            The withdrawal reflex is integrated in the spinal cord; sensory information also travels to the brain for conscious interpretation.
          </p>
        </div>
      </div>
    </template>

    <template v-else-if="props.mode === 'neurons'">
      <p class="check-label">Test 2 · build the route</p>
      <h2 class="route-question">Build the information pathway from a skin stimulus to a contracting muscle.</h2>
      <div class="route-track" aria-label="Your pathway">
        <template v-for="index in pathway.length" :key="index">
          <button v-if="picked[index - 1]" type="button" @click="picked.splice(index - 1)">{{ picked[index - 1] }}</button>
          <span v-else>{{ index }}</span>
          <b v-if="index < pathway.length" aria-hidden="true">→</b>
        </template>
      </div>
      <div class="word-bank">
        <button v-for="item in pathwayBank" :key="item" type="button" :disabled="picked.includes(item)" @click="choosePath(item)">{{ item }}</button>
      </div>
      <p v-if="!pathwayComplete" class="quiet-result">Select each term once. Tap a placed term to rewind from that point.</p>
      <p v-else class="result-sentence" :class="pathwayCorrect ? 'right' : 'wrong'">
        <strong>{{ pathwayCorrect ? 'Signal direction is correct.' : 'The route needs one correction.' }}</strong>
        {{ pathwayCorrect ? 'Afferent input reaches the CNS; efferent output then reaches the effector.' : 'Start at detection, enter the CNS through a sensory neuron, then leave through a motor neuron.' }}
      </p>
    </template>

    <template v-else-if="props.mode === 'coordination'">
      <div class="evidence-test">
        <figure><img :src="'images/balance-beam.jpg'" alt="Gymnast balancing on a narrow beam" /></figure>
        <div>
          <p class="check-label">Test 3 · infer from performance</p>
          <h2>Movement begins, but timing and balance corrections are poor. Which region best fits the evidence?</h2>
          <div class="inline-choices">
            <button v-for="item in ['cerebrum', 'cerebellum', 'spinal cord']" :key="item" type="button" :class="{ active: selected === item }" @click="selected = item">{{ item }}</button>
          </div>
          <p v-if="selected === null" class="quiet-result">Use the symptom, not word association.</p>
          <p v-else class="result-sentence" :class="selected === 'cerebellum' ? 'right' : 'wrong'">
            <strong>{{ selected === 'cerebellum' ? 'Cerebellum.' : 'Reconsider the evidence.' }}</strong>
            The cerebellum compares intended movement with sensory feedback and adjusts timing, force, posture, and balance.
          </p>
        </div>
      </div>
    </template>

    <template v-else-if="props.mode === 'autonomic'">
      <p class="check-label">Test 4 · tune the controller</p>
      <div class="pressure-test">
        <div class="pressure-trace" aria-label="Blood pressure rises above its working range and needs correction">
          <svg viewBox="0 0 660 270" role="img" aria-label="Arterial pressure rises above the working range">
            <rect x="42" y="102" width="580" height="64" rx="3" class="range" />
            <path d="M42 142 C120 142 165 143 230 140 C275 137 286 38 338 48 C398 59 430 86 472 112 C520 139 568 142 622 142" class="trace" />
            <line x1="42" y1="166" x2="622" y2="166" class="axis" />
            <text x="48" y="96">working range</text><text x="245" y="30">pressure rises</text><text x="478" y="205">correction</text>
          </svg>
        </div>
        <div class="controller">
          <h2>Pressure rises. Set the two autonomic outputs that return it toward range.</h2>
          <div class="control-row"><span>Sympathetic output</span><button v-for="value in ['increase','decrease']" :key="value" type="button" :aria-label="`Set sympathetic output to ${value}`" :class="{ active: sympathetic === value }" @click="sympathetic = value as any">{{ value }}</button></div>
          <div class="control-row"><span>Parasympathetic output</span><button v-for="value in ['increase','decrease']" :key="value" type="button" :aria-label="`Set parasympathetic output to ${value}`" :class="{ active: parasympathetic === value }" @click="parasympathetic = value as any">{{ value }}</button></div>
          <button class="commit" type="button" :disabled="!sympathetic || !parasympathetic" @click="checkedAutonomic = true">Check correction</button>
        </div>
      </div>
      <p v-if="checkedAutonomic" class="result-sentence" :class="autonomicCorrect ? 'right' : 'wrong'"><strong>{{ autonomicCorrect ? 'Correction selected.' : 'That would not lower pressure.' }}</strong> Reduce sympathetic drive and increase parasympathetic drive to slow the heart and oppose the disturbance.</p>
    </template>

    <template v-else>
      <p class="check-label">Test 5 · place the ratio</p>
      <div class="ratio-test">
        <div class="ratio-copy">
          <h2>Move the hormone balance to the region most likely to produce roots.</h2>
          <p>Outcome depends on relative concentration—not on whether one hormone is merely present.</p>
        </div>
        <div class="ratio-control">
          <div class="outcome-word">{{ ratioOutcome }}</div>
          <input v-model.number="ratio" type="range" min="-100" max="100" step="1" aria-label="Auxin to cytokinin balance" @input="ratioCommitted = false" />
          <div class="ratio-labels"><span>high auxin</span><span>balanced</span><span>high cytokinin</span></div>
          <button type="button" @click="ratioCommitted = true">Commit position</button>
        </div>
      </div>
      <p v-if="ratioCommitted" class="result-sentence" :class="ratioOutcome === 'roots' ? 'right' : 'wrong'"><strong>{{ ratioOutcome === 'roots' ? 'Root region.' : 'Move toward higher auxin.' }}</strong> High auxin relative to cytokinin favours root formation; high cytokinin favours shoots, while a more balanced ratio favours callus.</p>
    </template>
  </section>
</template>

<style scoped>
.quick-check{min-height:440px;display:grid;align-content:center;gap:18px}.check-label{margin:0;color:var(--accent);font-size:13px;font-weight:800;letter-spacing:.13em;text-transform:uppercase}.quick-check h2{margin:0;color:var(--ink);font:700 30px/1.2 var(--serif)}button{border:0;cursor:pointer}.quiet-result,.result-sentence{margin:0;padding:14px 0;color:var(--muted);font-size:16px}.result-sentence{padding:14px 18px;background:var(--green-field);border-radius:4px}.result-sentence strong{color:var(--accent-2)}.result-sentence.wrong{background:var(--red-field)}.result-sentence.wrong strong{color:var(--accent)}
.centres-layout{display:grid;grid-template-columns:430px 1fr;gap:58px;align-items:center}.centre-map{position:relative;height:455px;margin:0;display:grid;place-items:center;background:var(--blue-field);border-radius:5px}.centre-map img{height:430px}.hotspot{position:absolute;width:20px;height:20px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 10px rgba(154,73,56,.18)}.hotspot span{position:absolute;left:28px;top:-4px;width:115px;color:var(--ink);font-size:13px;font-weight:800;text-align:left}.hotspot.brain{left:203px;top:29px}.hotspot.cord{left:206px;top:142px}.centres-copy{display:grid;gap:24px}.centres-copy h2{font-size:34px}
.route-question{max-width:900px}.route-track{height:150px;display:grid;grid-template-columns:repeat(9,auto);gap:12px;align-items:center;justify-content:center}.route-track>span,.route-track>button{width:165px;min-height:82px;padding:12px;display:grid;place-items:center;border-radius:4px;background:var(--blue-field);color:var(--ink);font-weight:800;text-align:center}.route-track>span{background:var(--paper-deep);color:var(--quiet);font:700 26px/1 var(--serif)}.route-track>b{color:var(--accent);font:700 24px/1 var(--serif)}.word-bank{display:flex;justify-content:center;gap:16px;flex-wrap:wrap}.word-bank button{padding:10px 5px;background:transparent;color:var(--accent-3);font-weight:800;border-bottom:3px solid var(--accent-3)}.word-bank button:disabled{opacity:.25}
.evidence-test{display:grid;grid-template-columns:430px 1fr;gap:48px;align-items:center}.evidence-test figure{height:420px;margin:0;overflow:hidden;border-radius:5px}.evidence-test img{width:100%;height:100%;object-fit:cover;object-position:center 32%}.evidence-test>div{display:grid;gap:22px}.inline-choices{display:flex;gap:26px;flex-wrap:wrap}.inline-choices button{padding:7px 0;background:transparent;color:var(--muted);font:700 21px/1.2 var(--serif);border-bottom:3px solid transparent;text-transform:capitalize}.inline-choices button.active{color:var(--accent);border-color:var(--accent)}
.pressure-test{display:grid;grid-template-columns:1.08fr .92fr;gap:40px;align-items:center}.pressure-trace{background:var(--blue-field);border-radius:5px}.pressure-trace svg{width:100%;height:310px}.pressure-trace .range{fill:rgba(63,107,94,.18)}.pressure-trace .trace{fill:none;stroke:var(--accent);stroke-width:7;stroke-linecap:round}.pressure-trace .axis{stroke:var(--muted);stroke-width:2}.pressure-trace text{fill:var(--muted);font:14px var(--sans)}.controller{display:grid;gap:18px}.control-row{display:grid;grid-template-columns:1fr 112px 112px;gap:8px;align-items:center}.control-row span{font-weight:800}.control-row button{padding:11px;background:var(--paper-deep);color:var(--muted);font-weight:800}.control-row button.active{background:var(--accent-3);color:white}.controller .commit,.ratio-control>button{justify-self:start;padding:12px 18px;background:var(--accent);color:white;font-weight:800}.controller .commit:disabled{opacity:.35}
.ratio-test{min-height:330px;display:grid;grid-template-columns:.8fr 1.2fr;gap:55px;align-items:center}.ratio-copy{display:grid;gap:18px}.ratio-copy p{margin:0;color:var(--muted)}.ratio-control{display:grid;gap:22px}.outcome-word{color:var(--accent-2);text-align:center;font:700 68px/1 var(--serif);text-transform:uppercase}.ratio-control input{width:100%;accent-color:var(--accent)}.ratio-labels{display:flex;justify-content:space-between;color:var(--muted);font-size:13px;font-weight:800;text-transform:uppercase}.ratio-control>button{justify-self:center}
</style>
