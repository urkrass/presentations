<script setup lang="ts">
import MoleMath from '../../ib-dp-mole-history/components/MoleMath.vue'
import 'katex/dist/katex.min.css'
defineProps<{ tex: string }>()
</script>
<template><MoleMath :tex="tex" /></template>
