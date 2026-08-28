<template>
  <section class="boiling-comparison" aria-label="Comparison of SVG and WebGL boiling renderers">
    <article class="boiling-comparison-side legacy">
      <header><span>SVG version</span><strong>Objects move through water</strong></header>
      <LegacySvgBoiling />
      <p>Clear source fidelity, but bubbles remain independent symbols and the surface does not react.</p>
    </article>
    <article class="boiling-comparison-side shader">
      <header><span>WebGL version</span><strong>The liquid becomes the renderer</strong></header>
      <BoilingBeaker :temperature="100" intensity="rolling" />
      <p>Metaballs merge and separate; nearby bubbles deform one field and disturb the local surface.</p>
    </article>
  </section>
</template>
