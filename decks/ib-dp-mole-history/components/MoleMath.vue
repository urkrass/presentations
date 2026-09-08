<script setup lang="ts">
import { computed } from 'vue'
import { renderToString } from 'katex'
const props = defineProps<{ tex: string }>()
// KaTeX's default HTML + MathML output preserves screen-reader mathematics.
// Explicit rendering also works inside HTML composition blocks in Slidev.
const html = computed(() => renderToString(props.tex, { throwOnError: true, trust: false, output: 'htmlAndMathml' }))
</script>
<template><span class="mole-math" v-html="html" /></template>
