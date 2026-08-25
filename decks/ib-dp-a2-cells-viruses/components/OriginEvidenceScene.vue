<script setup lang="ts">
import { computed, ref } from 'vue'

type Setting = {
  id: string
  image: string
  alt: string
  label: string
  title: string
  detail: string
  limit: string
  fit?: 'cover' | 'contain'
}

const settings: Setting[] = [
  {
    id: 'delivery',
    image: 'images/bennu-sample.jpg',
    alt: 'Pristine asteroid Bennu sample in a laboratory tray',
    label: 'extraterrestrial delivery',
    title: 'Meteorites can widen the chemical inventory',
    detail: 'Organic molecules arriving from space could supplement compounds formed on Earth.',
    limit: 'A pantry of ingredients is not evidence of a self-maintaining system.',
  },
  {
    id: 'vents',
    image: 'images/black-smoker.jpg',
    alt: 'A black-smoker hydrothermal vent on the East Pacific Rise',
    label: 'mineral and energy gradients',
    title: 'Vents create persistent chemical disequilibria',
    detail: 'Hot, reduced fluids meeting cooler ocean water produce steep gradients and mineral surfaces.',
    limit: 'Modern black smokers are analogues, not photographs of the origin of life.',
  },
  {
    id: 'models',
    image: 'images/miller-urey.png',
    alt: 'Sourced diagram of the Miller–Urey apparatus',
    label: 'controlled model systems',
    title: 'Experiments isolate a possible chemical step',
    detail: 'A chosen gas mixture, circulating water, and electrical discharge generated organic products.',
    limit: 'The result tests possibility under specified conditions, not a complete historical pathway.',
    fit: 'contain',
  },
]

const active = ref(0)
const setting = computed(() => settings[active.value])
</script>

<template>
  <section class="origin-evidence">
    <figure :class="{ contain: setting.fit === 'contain' }">
      <img :src="setting.image" :alt="setting.alt" />
      <figcaption>{{ setting.label }}</figcaption>
    </figure>
    <div class="origin-copy">
      <p class="scene-kicker">Three settings · three different questions</p>
      <h2>{{ setting.title }}</h2>
      <p>{{ setting.detail }}</p>
      <p class="origin-limit"><strong>What it cannot establish</strong>{{ setting.limit }}</p>
      <div class="origin-switcher" aria-label="Choose an origin-of-life evidence setting">
        <button v-for="(item, index) in settings" :key="item.id" type="button" :class="{ active: active === index }" @click="active = index">
          <span>0{{ index + 1 }}</span>{{ item.id }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.origin-evidence{display:grid;grid-template-columns:1.2fr .8fr;gap:46px;min-height:500px}.origin-evidence figure{position:relative;margin:0;height:500px;overflow:hidden;background:#111}.origin-evidence img{width:100%;height:100%;object-fit:cover}.origin-evidence figure.contain img{object-fit:contain;background:#fff}.origin-evidence figcaption{position:absolute;left:18px;bottom:16px;padding:8px 11px;background:rgba(14,14,14,.72);color:#fff;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.origin-copy{display:grid;align-content:center;gap:18px}.origin-copy h2{margin:0;font:500 36px/1.12 Georgia,serif}.origin-copy>p:not(.scene-kicker){margin:0;color:var(--muted);font-size:18px;line-height:1.43}.origin-limit{display:grid;gap:6px;padding:15px 17px;background:var(--paper-deep)}.origin-limit strong{color:var(--rust);font-size:11px;letter-spacing:.1em;text-transform:uppercase}.origin-switcher{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.origin-switcher button{min-height:54px;padding:9px 10px;border:0;background:var(--paper-deep);color:var(--muted);font-weight:750;text-align:left;cursor:pointer;text-transform:capitalize}.origin-switcher button span{display:block;margin-bottom:4px;color:var(--rust);font-size:10px;letter-spacing:.08em}.origin-switcher button.active{background:var(--blue);color:#fff}.origin-switcher button.active span{color:#dce9f1}button:focus-visible{outline:3px solid color-mix(in srgb,var(--blue) 48%,transparent);outline-offset:3px}
</style>
