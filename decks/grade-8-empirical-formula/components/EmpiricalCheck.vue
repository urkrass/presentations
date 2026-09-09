<script setup lang="ts">
import MoleCheck from '../../ib-dp-mole-history/components/MoleCheck.vue'
const props = defineProps<{ label: string; question: string; options: string[]; answer: number; explanation: string }>()
</script>
<template><MoleCheck v-bind="props" /></template>
