<script setup lang="ts">
import MoleReveal from '../../ib-dp-mole-history/components/MoleReveal.vue'
defineProps<{ label: string }>()
</script>
<template><MoleReveal :label="label"><slot /></MoleReveal></template>
