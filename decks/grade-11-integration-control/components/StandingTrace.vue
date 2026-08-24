<template>
  <section class="standing-trace">
    <figure>
      <svg viewBox="0 0 1060 350" role="img" aria-label="Conceptual arterial pressure trace after standing, followed by baroreflex recovery">
        <rect x="80" y="82" width="900" height="85" rx="3" class="range" />
        <line x1="80" y1="285" x2="980" y2="285" class="axis" />
        <line x1="80" y1="35" x2="80" y2="285" class="axis" />
        <path d="M80 125 C185 125 258 125 328 125 C348 127 365 239 430 239 C505 239 514 180 575 151 C655 116 788 126 980 125" class="pressure" />
        <line x1="330" y1="42" x2="330" y2="285" class="event" />
        <text x="275" y="28">stands up</text><text x="82" y="75">working range</text><text x="355" y="270">brief fall</text><text x="630" y="106">recovery</text>
        <text x="14" y="185" transform="rotate(-90 14 185)">arterial pressure</text><text x="895" y="320">time →</text>
      </svg>
      <figcaption>Qualitative trace: the size and duration of the dip vary; this is a mechanism model, not a diagnostic record.</figcaption>
    </figure>
    <div class="response-sequence">
      <p><span>detect</span><strong>less arterial stretch</strong></p><b>→</b>
      <p><span>integrate</span><strong>medulla shifts autonomic output</strong></p><b>→</b>
      <p><span>correct</span><strong>heart output rises; vessels constrict</strong></p>
    </div>
  </section>
</template>

<style scoped>
.standing-trace{min-height:425px;display:grid;gap:18px}figure{margin:0;padding:15px 24px 10px;border-radius:5px;background:var(--blue-field)}svg{width:100%;height:340px}.range{fill:rgba(63,107,94,.16)}.axis{stroke:var(--muted);stroke-width:2}.pressure{fill:none;stroke:var(--accent);stroke-width:7;stroke-linecap:round}.event{stroke:var(--accent-3);stroke-width:3;stroke-dasharray:8 6}text{fill:var(--muted);font:13px var(--sans)}figcaption{color:var(--muted);font-size:12px;text-align:center}.response-sequence{display:grid;grid-template-columns:1fr auto 1.25fr auto 1.35fr;gap:16px;align-items:center}.response-sequence p{margin:0;display:grid;gap:4px}.response-sequence span{color:var(--accent);font-size:11px;font-weight:800;letter-spacing:.11em;text-transform:uppercase}.response-sequence strong{font:700 18px/1.2 var(--serif)}.response-sequence b{color:var(--accent);font:700 24px/1 var(--serif)}
</style>
