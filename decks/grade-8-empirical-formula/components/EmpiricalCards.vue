<script setup lang="ts">
import MoleFlipCards from '../../ib-dp-mole-history/components/MoleFlipCards.vue'
defineProps<{ cards: { front: string; back: string; tone?: string }[] }>()
</script>
<template><MoleFlipCards :cards="cards" /></template>
