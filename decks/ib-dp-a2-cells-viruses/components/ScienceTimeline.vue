<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type TimelineMode = 'cell-theory' | 'endosymbiosis'
type Event = { date: string; name: string; image: string; alt: string; title: string; detail: string; consequence: string; fit?: 'cover' | 'contain'; position?: string }

const props = defineProps<{ mode: TimelineMode }>()
const active = ref(0)

const banks: Record<TimelineMode, Event[]> = {
  'cell-theory': [
    { date:'1665', name:'Hooke', image:'images/hooke-cork.jpg', alt:'Robert Hooke’s engraved cork micrograph', title:'A new word arrived before the modern theory', detail:'Hooke described repeated empty compartments in dead cork and named them cells.', consequence:'Observation created the category; it did not yet establish cells as living units.', fit:'contain' },
    { date:'1838–39', name:'Schleiden + Schwann', image:'images/cell-theory-portraits.jpg', alt:'Historical portraits including Matthias Schleiden and Theodor Schwann', title:'Plant and animal observations were joined', detail:'Schleiden and Schwann generalised cellular organisation across plants and animals.', consequence:'A cross-kingdom pattern became a unifying biological model.', position:'left center' },
    { date:'1850s', name:'Remak + Virchow', image:'images/virchow.jpg', alt:'Historical portrait of Rudolf Virchow', title:'Cell continuity replaced spontaneous cell formation', detail:'Robert Remak documented cell division; Virchow helped popularise the claim that cells come from pre-existing cells.', consequence:'The theory became causal—but still did not explain the first cells.' },
  ],
  endosymbiosis: [
    { date:'1905', name:'Mereschkowski', image:'images/mereschkowski.jpg', alt:'Portrait of Konstantin Mereschkowski', title:'Plastids were proposed as former symbionts', detail:'Mereschkowski argued that chloroplast ancestry involved once-independent organisms.', consequence:'The central idea appeared decades before molecular evidence could test it.' },
    { date:'1967', name:'Margulis', image:'images/lynn-margulis.jpg', alt:'Portrait of evolutionary biologist Lynn Margulis', title:'A scattered idea became a testable synthesis', detail:'Lynn Sagan, later Lynn Margulis, integrated cytology, microbiology, and evolution into serial endosymbiosis.', consequence:'A marginal proposal returned as a research programme rather than a historical curiosity.' },
    { date:'today', name:'phylogenomics', image:'images/mitochondria-tem.jpg', alt:'Transmission electron micrograph of a mitochondrion', title:'Genes now identify the bacterial relatives', detail:'Mitochondrial genes group with alphaproteobacteria; plastid genes group with cyanobacteria.', consequence:'Independent molecular and structural evidence converges on organelle ancestry.' },
  ],
}

const events = computed(() => banks[props.mode])
const event = computed(() => events.value[active.value])
watch(() => props.mode, () => { active.value = 0 })
</script>

<template>
  <section class="science-timeline">
    <figure :class="{ contain: event.fit === 'contain' }">
      <Transition name="image-focus" mode="out-in">
        <img :key="event.image" :src="event.image" :alt="event.alt" :style="{ objectPosition: event.position || 'center' }" />
      </Transition>
      <Transition name="caption-focus" mode="out-in"><figcaption :key="event.date">{{ event.date }} · {{ event.name }}</figcaption></Transition>
    </figure>
    <div class="timeline-copy">
      <p class="scene-kicker">History as accumulating evidence</p>
      <div class="timeline-state" aria-live="polite">
        <Transition name="copy-focus" mode="out-in">
          <div :key="event.date">
            <h2>{{ event.title }}</h2>
            <p>{{ event.detail }}</p>
            <p class="consequence">{{ event.consequence }}</p>
          </div>
        </Transition>
      </div>
      <div class="timeline-dates" role="list" aria-label="Choose a historical stage">
        <button v-for="(item,index) in events" :key="item.date" type="button" :class="{active:index===active}" :aria-pressed="index===active" @click="active=index">
          <strong>{{ item.date }}</strong><span>{{ item.name }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.science-timeline{display:grid;grid-template-columns:1.12fr .88fr;gap:46px;min-height:500px}.science-timeline figure{position:relative;margin:0;height:500px;overflow:hidden;border-radius:var(--radius-field);background:#161616}.science-timeline img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.82)}.science-timeline figure.contain img{object-fit:contain;background:#efe6d3}.science-timeline figcaption{position:absolute;left:18px;bottom:16px;padding:8px 11px;border-radius:var(--radius-control);background:rgba(12,12,12,.72);color:#fff;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.timeline-copy{display:grid;align-content:center;gap:15px}.timeline-state{min-height:280px;display:grid;align-items:center}.timeline-state>div>div{display:grid;gap:15px}.timeline-copy h2{margin:0;font:500 35px/1.12 Georgia,serif}.timeline-state p{margin:0;color:var(--muted);font-size:17px;line-height:1.44}.timeline-state .consequence{padding:15px 17px;border-radius:var(--radius-field);background:var(--soft-green);color:var(--green)!important;font-family:Georgia,serif;font-size:19px!important}.timeline-dates{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.timeline-dates button{min-height:68px;padding:11px 10px;border:0;border-radius:var(--radius-field);background:var(--paper-deep);color:var(--muted);text-align:left;cursor:pointer;transition:background var(--motion-fast) var(--ease),color var(--motion-fast) var(--ease)}.timeline-dates button strong,.timeline-dates button span{display:block}.timeline-dates button strong{color:var(--rust);font:500 19px/1 Georgia,serif}.timeline-dates button span{margin-top:6px;font-size:11px;font-weight:800;text-transform:uppercase}.timeline-dates button.active{background:var(--ink);color:#fff}.timeline-dates button.active strong{color:#efb79f}.image-focus-enter-active,.image-focus-leave-active,.copy-focus-enter-active,.copy-focus-leave-active,.caption-focus-enter-active,.caption-focus-leave-active{transition:opacity var(--motion-reveal) var(--ease),filter var(--motion-reveal) var(--ease),transform var(--motion-reveal) var(--ease)}.image-focus-enter-from,.copy-focus-enter-from,.caption-focus-enter-from{opacity:.15;filter:blur(7px);transform:translateY(10px)}.image-focus-leave-to,.copy-focus-leave-to,.caption-focus-leave-to{opacity:0;filter:blur(4px);transform:translateY(-6px)}button:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}
</style>
