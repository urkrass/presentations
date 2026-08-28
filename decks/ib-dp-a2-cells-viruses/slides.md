---
theme: default
title: The Boundary of Life
titleTemplate: '%s · IB DP Biology A2.1–A2.3'
info: |
  IB DP Biology SL/HL
  A2.1 Origins of cells · A2.2 Cell structure · A2.3 Viruses
  A modular unit deck with investigations, retrieval, and TOK/NOS prompts
class: cover-slide
canvasWidth: 1280
drawings:
  persist: false
transition: fade-out
mdc: true
fonts:
  sans: Aptos
  serif: Georgia
  mono: Consolas
---

<div class="cover-scene">
  <img :src="'images/stromatolites.jpg'" alt="Living stromatolites at Shark Bay" />
  <div class="cover-wash"></div>
  <div class="cover-copy">
    <p class="eyebrow">IB DP Biology · A2.1–A2.3 · SL/HL</p>
    <h1>The boundary of life</h1>
    <p>How chemistry became cells—and how viruses learned to live at their edge.</p>
  </div>
  <div class="cover-index"><span>origins</span><span>cells</span><span>viruses</span></div>
</div>

<!--
[Timing] 2 minutes
[Teacher prompt] Do not define life yet. Ask students to name one thing a living system must do that a stone cannot.
[Sources]
- https://commons.wikimedia.org/wiki/File:Shark_Bay_stromatolites.jpg — photograph, Alicejmichel, CC BY-SA 4.0.
[/Sources]
-->

---
class: thesis-slide
---

<p class="eyebrow">The question that survives all three topics</p>

# When does organised chemistry become a living system?

<p class="thesis">The boundary is not a single structure. It is a combination of <strong>compartment, information, catalysis, energy transfer, and evolution</strong>.</p>
<p class="thesis-foot">We will test every claim against what the evidence can actually show.</p>

<!--
[Timing] 3 minutes
[Teacher prompt] Students choose the most essential term, then defend it. Record disagreements for the final slide.
[Sources]
- D:\IB DP\The big picture _ IB DP Biology SL_HL FE2028.pdf — supplied unit framing.
- https://www.ncbi.nlm.nih.gov/books/NBK26876/ — Alberts et al., cells as the fundamental units of life.
[/Sources]
-->

---

# Entry diagnostic: which is closest to independently alive?

<LifeBoundaryBuilder />

<!--
[Timing] 5 minutes
[Teacher prompt] Students rank the three, then write the criterion that controlled their ranking. Do not reveal a single official definition.
[Sources]
- https://www.nasa.gov/news-release/nasas-asteroid-bennu-sample-reveals-mix-of-lifes-ingredients/ — Bennu sample findings.
- https://commons.wikimedia.org/wiki/File:Escherichia_coli_(SEM).jpg — CDC image, public domain.
- https://wwwn.cdc.gov/phil/Details.aspx?pid=2291 — variola TEM, public domain.
[/Sources]
-->

---

# The unit moves through three kinds of evidence

<div class="sequence">
  <div class="sequence-step"><span class="index">01</span><h2>Origins</h2><p>Reconstruct a past no one observed directly.</p><em>models + geochemistry</em></div>
  <div class="sequence-step"><span class="index">02</span><h2>Cells</h2><p>Infer architecture from instrument-produced images.</p><em>microscopy + measurement</em></div>
  <div class="sequence-step"><span class="index">03</span><h2>Viruses</h2><p>Explain a system whose activity exists only inside another.</p><em>genetics + host dependence</em></div>
  <div class="sequence-step"><span class="index">04</span><h2>Synthesis</h2><p>Build a defensible boundary of life.</p><em>argument + uncertainty</em></div>
</div>

<!--
[Timing] 2 minutes
[Teacher prompt] Point out that the method of knowing changes across the unit. This is the learning map, not a syllabus list.
[Sources]
- D:\IB DP\A2.1, A2.2 and A2.3 checklists — supplied sequence and learning outcomes.
[/Sources]
-->

---
class: act-slide
---

<div class="act-scene">
  <img :src="'images/bennu-sample.jpg'" alt="Pristine Bennu sample" />
  <div class="act-copy"><p class="eyebrow">Act I · A2.1 · HL</p><h1>Ingredients are not ancestors</h1><p>Origins research asks how ordinary chemistry crossed several thresholds without smuggling life into the explanation.</p></div>
</div>

<!--
[Timing] 1 minute
[Teacher prompt] Read only the final sentence. The distinction between ingredients and systems anchors the act.
[Sources]
- https://www.nasa.gov/news-release/nasas-asteroid-bennu-sample-reveals-mix-of-lifes-ingredients/
[/Sources]
-->

---

<OriginEvidenceScene />

<!--
[Timing] 7 minutes
[Teacher prompt] Switch settings only after students predict what each can test. End by asking why the three settings need not be mutually exclusive.
[Sources]
- https://pmc.ncbi.nlm.nih.gov/articles/PMC2944365/ — review of early atmosphere and origin-of-life environments.
- https://commons.wikimedia.org/wiki/File:BlackSmoker.jpg — East Pacific Rise black smoker, USGS, public domain.
- https://commons.wikimedia.org/wiki/File:OSIRIS-REx_Bennu_Sample_Arrives_at_NASA_Goddard_(DSCN0120).jpg — NASA Bennu sample, public domain.
- https://commons.wikimedia.org/wiki/File:Miller-Urey_experiment-en.svg — sourced apparatus diagram, CC BY-SA 3.0.
- D:\IB DP\Conditions on early Earth (HL) _ IB DP Biology SL_HL FE2028.pdf — supplied conceptual sequence.
[/Sources]
-->

---

<div class="image-story">
  <figure><img :src="'images/bennu-sample.jpg'" alt="OSIRIS-REx Bennu sample arriving at NASA Goddard" /><figcaption>NASA · pristine sample returned in 2023</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">Real case · Bennu, 2025 analyses</p><h2>Space delivered a chemical pantry</h2><p>The sample contained 14 of the 20 amino acids used in proteins and all five nucleobases used in DNA and RNA.</p><p class="claim"><strong>But NASA reported no evidence of life.</strong> Ingredients widen the plausible chemistry; they do not solve organisation, heredity, or replication.</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Students complete: “This evidence supports ___, but not ___.”
[Sources]
- https://www.nasa.gov/news-release/nasas-asteroid-bennu-sample-reveals-mix-of-lifes-ingredients/ — NASA summary and contamination-controlled sample context.
- https://commons.wikimedia.org/wiki/File:OSIRIS-REx_Bennu_Sample_Arrives_at_NASA_Goddard_(DSCN0120).jpg — NASA photograph, public domain.
[/Sources]
-->

---

# A credible origin account must cross several thresholds

<div class="evidence-columns">
  <div class="evidence-column"><span class="big-number">1</span><h2>Concentrate</h2><p>Useful molecules must meet often enough to react despite dilution and degradation.</p><span class="status">chemistry problem</span></div>
  <div class="evidence-column"><span class="big-number">2</span><h2>Compartmentalise</h2><p>A boundary keeps a reaction network together while still exchanging matter and energy.</p><span class="status">system problem</span></div>
  <div class="evidence-column"><span class="big-number">3</span><h2>Inherit with variation</h2><p>Information must persist, copy imperfectly, and affect survival so evolution can begin.</p><span class="status gap">historical gap</span></div>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Ask which threshold Bennu addresses most directly. Answer: supplies/concentration of ingredients, not inheritance.
[Sources]
- https://pmc.ncbi.nlm.nih.gov/articles/PMC2890201/ — protocell compartments and early replication review.
[/Sources]
-->

---

<MillerUreyAssumptions />

<!--
[Timing] 6 minutes
[Teacher prompt] Read the apparatus as a model: identify the Earth feature represented by each physical component.
[Sources]
- https://www.science.org/doi/10.1126/science.117.3046.528 — Miller, 1953 original report.
- https://commons.wikimedia.org/wiki/File:Miller-Urey_experiment-en.svg — apparatus diagram by YassineMrabet, CC BY-SA 3.0; original vector elements modified locally for motion.
- https://codepen.io/uchardon/pen/WaYmjR — visual reference for liquid detachment; the deck uses a separate seeded particle model and custom shader fitted to the sourced flask.
[/Sources]
-->

---

<QuickCheck
  label="Test 1 · claim discipline"
  question="Which conclusion is best supported by the Miller–Urey experiment?"
  :options="['Life commonly begins after lightning storms','Amino acids require existing organisms','Abiotic chemistry can produce some biological building blocks under chosen conditions','Early Earth definitely had Miller’s gas mixture']"
  :answer="2"
  explanation="The experiment is evidence for chemical possibility under a modelled set of conditions—not for spontaneous cells or a uniquely correct atmosphere."
/>

<!--
[Timing] 3 minutes
[Teacher prompt] Require students to explain why option D is too strong.
[Sources]
- https://www.science.org/doi/10.1126/science.117.3046.528
[/Sources]
-->

---

<div class="tok-layout">
  <div class="tok-mark">NOS</div>
  <div class="tok-copy"><p class="eyebrow">Models can succeed without being literal copies</p><h1>Can a model be scientifically useful if one assumption is probably wrong?</h1><p class="tok-question">Judge Miller–Urey by prediction, control, and generative power—not by visual resemblance to a young planet.</p><p>Rewrite the conclusion if the atmosphere were less reducing. Which part survives?</p></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Think–pair–share. A useful answer separates “organic synthesis is possible” from “this exact mixture was global.”
[Sources]
- https://pmc.ncbi.nlm.nih.gov/articles/PMC2944365/ — uncertainty about early atmospheric composition.
[/Sources]
-->

---

# A boundary matters because it changes which chemistry persists

<CompartmentSimulation />

<!--
[Timing] 8 minutes
[Teacher prompt] Run the selective state, predict the damaged state, then switch. Treat the particles as a qualitative model: the causal claim is retention, not the exact percentage.
[Sources]
- https://pmc.ncbi.nlm.nih.gov/articles/PMC2890201/ — fatty-acid vesicle formation and protocell models.
- No external data. The seeded particle field is an explicitly labelled qualitative model of solute retention and leakage.
[/Sources]
-->

---

# Investigation: stress-test a protocell analogue

<div class="investigation-layout">
  <div class="investigation-brief"><p class="scene-kicker">Student-designed · quantitative · model-aware</p><h2>How robust is a membrane-free compartment?</h2><p>Create coacervate droplets from oppositely charged polymers, then test one environmental stress. The droplets model concentration—not a complete ancestral cell.</p></div>
  <div class="investigation-method">
    <div class="method-row"><strong>change one</strong><span>pH, NaCl concentration, or temperature</span></div>
    <div class="method-row"><strong>measure</strong><span>median droplet diameter and number per fixed microscope field</span></div>
    <div class="method-row"><strong>control</strong><span>polymer concentration, mixing time, sample depth, magnification</span></div>
    <div class="method-row"><strong>repeat</strong><span>at least five fields per treatment; report spread, not only a mean</span></div>
    <div class="method-row"><strong>conclude</strong><span>“supports a compartment property” — never “creates life”</span></div>
  </div>
</div>

<!--
[Timing] 12 minutes planning; practical can occupy a separate lesson.
[Teacher prompt] Approve only designs with a measurable dependent variable and a fixed imaging rule.
[Safety] Use classroom-approved polymer solutions; handle stains and pH solutions according to local risk assessment.
[Sources]
- https://pmc.ncbi.nlm.nih.gov/articles/PMC7587743/ — coacervates as protocell models.
- D:\IB DP\Investigation into the origins of cells (HL) _ IB DP Biology SL_HL FE2028.pdf — replaced with a more quantitative model investigation.
[/Sources]
-->

---

# Pilot data: one result, three interpretations

<div class="data-stage">
  <div class="bar-plot" aria-label="Hypothetical coacervate droplet counts after exposure to salt">
    <div class="bar-row"><span>0.00 M NaCl</span><div class="bar-track"><div class="bar-fill" style="width:92%"></div></div><b>184</b></div>
    <div class="bar-row"><span>0.15 M</span><div class="bar-track"><div class="bar-fill" style="width:66%"></div></div><b>131</b></div>
    <div class="bar-row"><span>0.50 M</span><div class="bar-track"><div class="bar-fill" style="width:24%"></div></div><b>47</b></div>
  </div>
  <div class="data-copy"><p class="scene-kicker">Hypothetical pilot · droplets per five fields</p><h2>Salt destabilised this model system</h2><p>The pattern supports an effect of ionic environment on droplet persistence.</p><p class="question">What observation would distinguish droplets dissolving from droplets merging?</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Students propose an additional measurement: size distribution or time-lapse count. State explicitly that these are hypothetical teaching data.
[Sources]
- https://pmc.ncbi.nlm.nih.gov/articles/PMC7587743/ — physical behaviour of coacervate compartments.
[/Sources]
-->

---

# RNA is unusual because one polymer can store and act

<div class="concept-map">
  <div class="concept-node"><span class="node-label">information</span><h2>Sequence can be copied</h2><p>Complementary base pairing offers a route to heredity and variation.</p></div>
  <div class="concept-node center"><span class="node-label">RNA-world hypothesis</span><h2>Genotype and catalytic phenotype in one molecule</h2><p>Ribozymes show that RNA is not only a passive messenger.</p></div>
  <div class="concept-node"><span class="node-label">catalysis</span><h2>Folded RNA can accelerate reactions</h2><p>Modern ribosomes still use ribosomal RNA at the catalytic centre of peptide-bond formation.</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Ask why “RNA came first” is a hypothesis rather than a preserved historical recording.
[Sources]
- https://www.nobelprize.org/prizes/chemistry/1989/press-release/ — catalytic RNA and the 1989 Nobel Prize.
- https://pmc.ncbi.nlm.nih.gov/articles/PMC2890201/ — RNA-first and protocell integration review.
[/Sources]
-->

---

# Evidence for an RNA world is strong—and incomplete

<RnaEvidenceSpoiler />

<!--
[Timing] 4 minutes
[Teacher prompt] Students identify the difference between evidence that a mechanism can work and evidence that it historically did work.
[Sources]
- https://www.nobelprize.org/prizes/chemistry/1989/press-release/
- https://www.nature.com/articles/s41586-024-07814-x — current work on non-enzymatic RNA copying.
[/Sources]
-->

---

# LUCA was not the first life

<div class="claim-ladder">
  <div class="claim-step"><span class="tag">term</span><h2>Last universal common ancestor</h2><p>The most recent ancestral population from which all sampled cellular life descends.</p></div>
  <div class="claim-step"><span class="tag">inference</span><h2>Shared molecular machinery</h2><p>Genetic code, ribosomes, ATP chemistry, and homologous genes reveal deep common ancestry.</p></div>
  <div class="claim-step"><span class="tag">do not infer</span><h2>A single “first cell” in a single place</h2><p>Earlier lineages may have existed and vanished; horizontal gene transfer complicates a simple tree.</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Replace the phrase “LUCA was the first organism” whenever students use it. Population is safer than a single named individual.
[Sources]
- https://pubmed.ncbi.nlm.nih.gov/27562259/ — Weiss et al., genomic reconstruction of LUCA.
[/Sources]
-->

---

# 6.1 million genes were filtered to 355 candidate families

<div class="data-stage">
  <div class="bar-plot" aria-label="Reduction from sampled genes to candidate LUCA protein families">
    <div class="bar-row"><span>genes</span><div class="bar-track"><div class="bar-fill" style="width:100%"></div></div><b>6.1m</b></div>
    <div class="bar-row"><span>clusters</span><div class="bar-track"><div class="bar-fill" style="width:48%"></div></div><b>286k</b></div>
    <div class="bar-row"><span>LUCA set</span><div class="bar-track"><div class="bar-fill" style="width:8%"></div></div><b>355</b></div>
  </div>
  <div class="data-copy"><p class="scene-kicker">Weiss et al. · 2016</p><h2>LUCA is reconstructed by a filter, not excavated as a fossil</h2><p>Researchers searched for gene families distributed across bacteria and archaea, then tried to exclude later horizontal transfers.</p><p class="question">How would a flawed transfer filter change the portrait of LUCA?</p></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Treat the short bar for 355 as selectivity, not insignificance. Discuss how methods shape inferred ancestors.
[Sources]
- https://pubmed.ncbi.nlm.nih.gov/27562259/ — Weiss et al., Nature Microbiology 2016.
[/Sources]
-->

---

<div class="image-story">
  <figure><img :src="'images/stromatolites.jpg'" alt="Modern living stromatolites at Shark Bay" /><figcaption>Living analogue · not an Archean fossil</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">Reading deep time carefully</p><h2>Layered rocks can preserve biological pattern</h2><p>Ancient stromatolites are layered structures consistent with microbial communities, but shape alone is not enough: geology can also organise minerals.</p><p class="claim">The strongest argument combines <strong>morphology, sediment context, chemistry, and comparison</strong> with living systems.</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Ask why a modern stromatolite is an analogue rather than direct evidence of the exact ancient organisms.
[Sources]
- https://www.nature.com/articles/nature19355 — 3.7-billion-year-old putative stromatolite evidence and debate context.
- https://commons.wikimedia.org/wiki/File:Shark_Bay_stromatolites.jpg — image, CC BY-SA 4.0.
[/Sources]
-->

---

<ClaimDisciplineSorter />

<!--
[Timing] 4 minutes
[Teacher prompt] Students annotate each rejected option with the overclaim it makes.
[Sources]
- https://pubmed.ncbi.nlm.nih.gov/27562259/
[/Sources]
-->

---
class: act-slide
---

<div class="act-scene">
  <img :src="'images/hooke-cork.jpg'" alt="Robert Hooke's cork cells from Micrographia" />
  <div class="act-copy"><p class="eyebrow">Act II · A2.2 · SL + HL</p><h1>Every cell image is an argument</h1><p>Instruments reveal different structures, at different scales, through different physical signals.</p></div>
</div>

<!--
[Timing] 1 minute
[Teacher prompt] Ask what Hooke saw and what students are tempted to imagine that he did not see.
[Sources]
- https://commons.wikimedia.org/wiki/File:Robert_Hooke,_Micrographia,_cork._Wellcome_M0010579.jpg — Wellcome Collection, CC BY 4.0.
[/Sources]
-->

---

<ScienceTimeline mode="cell-theory" />

<!--
[Timing] 9 minutes
[Teacher prompt] Students predict what each historical stage adds and what it still cannot explain. Credit Remak’s division evidence rather than attributing the whole continuity claim to Virchow.
[Sources]
- https://digital.sciencehistory.org/works/fx719n66r — Micrographia scan.
- https://commons.wikimedia.org/wiki/File:Robert_Hooke,_Micrographia,_cork._Wellcome_M0010579.jpg — image licence.
- https://commons.wikimedia.org/wiki/File:Schleiden,_Schwann,_Schultze_-_Some_apostles_of_physiology.jpg — historical portrait plate, public domain.
- https://commons.wikimedia.org/wiki/File:Portrait_of_Rudolf_Ludwig_Karl_Virchow_(1821-1902),_Medical_Scientist_and_Anthropologist_(2552818237).jpg — Smithsonian portrait, no known copyright restrictions.
- https://www.ncbi.nlm.nih.gov/books/NBK26876/ — historical development and modern cell-theory framing.
[/Sources]
-->

---

# Cell theory is a model with productive exceptions

<div class="evidence-columns">
  <div class="evidence-column"><span class="big-number">01</span><h2>Living organisms are composed of cells</h2><p>Cells establish the recurring structural unit across enormous diversity.</p><span class="status">core claim</span></div>
  <div class="evidence-column"><span class="big-number">02</span><h2>The cell is the smallest self-sustaining unit</h2><p>Organelles and viruses lack the full independent network of life processes.</p><span class="status">functional claim</span></div>
  <div class="evidence-column"><span class="big-number">03</span><h2>Cells arise from pre-existing cells</h2><p>Modern cell continuity does not itself explain the first cellular systems.</p><span class="status gap">origin exception</span></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Ask why giant muscle fibres, aseptate hyphae, and multinucleate cells stretch “one cell = one nucleus” without destroying cell theory.
[Sources]
- D:\IB DP\Prokaryotic and eukaryotic cells _ IB DP Biology SL_HL FE2028.pdf — supplied cell-theory sequence.
- https://www.ncbi.nlm.nih.gov/books/NBK26876/ — modern cell-biology framing.
[/Sources]
-->

---

<MicroscopeGallery />

<!--
[Timing] 8 minutes
[Teacher prompt] Switch scenes only after students predict what each method can and cannot reveal.
[Sources]
- https://commons.wikimedia.org/wiki/File:Robert_Hooke,_Micrographia,_cork._Wellcome_M0010579.jpg
- https://commons.wikimedia.org/wiki/File:Escherichia_coli_(SEM).jpg — CDC, public domain.
- https://commons.wikimedia.org/wiki/File:HeLa-I.jpg — NIH, public domain.
[/Sources]
-->

---

# Magnification changes size. Resolution changes information.

<ResolutionComparator />

<!--
[Timing] 7 minutes
[Teacher prompt] Let students drag once, then freeze the handle. Ask why an enlarged unresolved image cannot support a stronger structural claim.
[Sources]
- D:\IB DP\Using microscopes _ IB DP Biology SL_HL FE2028.pdf — calibration and magnification sequence.
- https://commons.wikimedia.org/wiki/File:Escherichia_coli_(SEM).jpg — source micrograph, CDC, public domain. The blurred layer is an explicitly altered copy used to demonstrate information loss.
[/Sources]
-->

---

# One scale bar can expose a false impression

<ScaleBarWorkbench />

<!--
[Timing] 6 minutes
[Teacher prompt] Answer: about 1.38 μm, sensibly reported as 1.4 μm. Students must show the unit conversion.
[Sources]
- D:\IB DP\Using microscopes _ IB DP Biology SL_HL FE2028.pdf — magnification method.
[/Sources]
-->

---

<CellForensics />

<!--
[Timing] 9 minutes
[Teacher prompt] For each unknown, require: claim, two observations, microscopy limitation. The component changes the specimen without moving to a new slide.
[Sources]
- https://commons.wikimedia.org/wiki/File:Escherichia_coli_(SEM).jpg
- https://commons.wikimedia.org/wiki/File:HeLa-I.jpg
- https://commons.wikimedia.org/wiki/File:Paramecium_undergoing_Cyst_Formation.jpg — CC BY-SA 4.0.
[/Sources]
-->

---

# All cells solve four architectural problems

<div class="sequence">
  <div class="sequence-step"><span class="index">01</span><h2>Boundary</h2><p>A plasma membrane controls exchange and maintains a distinct internal environment.</p><em>selective permeability</em></div>
  <div class="sequence-step"><span class="index">02</span><h2>Information</h2><p>DNA stores instructions; expression connects sequence to cell behaviour.</p><em>continuity + variation</em></div>
  <div class="sequence-step"><span class="index">03</span><h2>Translation</h2><p>Ribosomes build proteins from mRNA using a nearly universal code.</p><em>shared ancestry</em></div>
  <div class="sequence-step"><span class="index">04</span><h2>Metabolism</h2><p>Cytosol and membranes organise reaction networks and energy transfer.</p><em>self-maintenance</em></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Students add one named process to each architectural problem.
[Sources]
- D:\IB DP\Prokaryotic and eukaryotic cells _ IB DP Biology SL_HL FE2028.pdf.
- https://www.ncbi.nlm.nih.gov/books/NBK26876/
[/Sources]
-->

---

<div class="image-story">
  <figure><img :src="'images/e-coli.jpg'" alt="Scanning electron micrograph of Escherichia coli" /><figcaption>SEM · E. coli · surface form</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">Prokaryotic economy</p><h2>Small does not mean structurally simple</h2><p>A nucleoid holds the main DNA molecule; 70S ribosomes occupy the cytoplasm; the membrane and cell wall organise exchange and shape.</p><p class="claim">Without membrane-bound organelles, <strong>location still matters</strong>: DNA compaction, membrane regions, enzymes, and cytoskeletal proteins create spatial order.</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Challenge the phrase “prokaryotes have no internal organisation.” Replace it with “no membrane-bound nucleus or organelles.”
[Sources]
- https://commons.wikimedia.org/wiki/File:Escherichia_coli_(SEM).jpg — image, public domain.
- https://www.ncbi.nlm.nih.gov/books/NBK26876/ — cell organisation.
[/Sources]
-->

---

<div class="image-story reverse">
  <figure><img :src="'images/hela.jpg'" alt="Fluorescence micrograph of HeLa cells showing DNA, microtubules, and Golgi" /><figcaption>NIH · fluorescence · selected structures</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">Eukaryotic logistics</p><h2>Compartmentalisation lets incompatible work coexist</h2><p>A nucleus separates much DNA processing from translation. Endomembranes create reaction spaces and traffic proteins. Mitochondria couple membranes to ATP production.</p><p class="claim">An organelle list becomes explanatory only when it shows <strong>how matter and information move through the cell</strong>.</p></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Trace one secreted protein verbally: DNA → nuclear RNA → ribosome/RER → Golgi → vesicle → membrane. Do not overlay authored arrows.
[Sources]
- https://commons.wikimedia.org/wiki/File:HeLa-I.jpg — NIH image, public domain.
- D:\IB DP\Animal, plant and fungal cells _ IB DP Biology SL_HL FE2028.pdf.
[/Sources]
-->

---

<LifeProcessScene />

<!--
[Timing] 8 minutes
[Teacher prompt] Switch processes. Students name the observation that would count as evidence for each process in a living Paramecium.
[Sources]
- https://commons.wikimedia.org/wiki/File:Paramecium_undergoing_Cyst_Formation.jpg — image, CC BY-SA 4.0.
- D:\IB DP\Processes of life in unicellular organisms _ IB DP Biology SL_HL FE2028.pdf.
[/Sources]
-->

---

# Plant, fungal, and animal cells share a plan—not a parts list

<div class="matrix">
  <div class="matrix-head">feature</div><div class="matrix-head">plant</div><div class="matrix-head">fungus</div><div class="matrix-head">animal</div>
  <div class="matrix-label">outer support</div><div class="yes">cellulose wall</div><div class="yes">chitin wall</div><div class="no">no cell wall</div>
  <div class="matrix-label">photosynthesis</div><div class="yes">chloroplasts in photosynthetic tissue</div><div class="no">absent</div><div class="no">absent</div>
  <div class="matrix-label">storage</div><div>starch</div><div>glycogen</div><div>glycogen</div>
  <div class="matrix-label">large vacuole</div><div class="yes">often central and persistent</div><div>variable</div><div class="no">small vesicles instead</div>
  <div class="matrix-label">shared core</div><div>nucleus, ribosomes, mitochondria, membrane</div><div>nucleus, ribosomes, mitochondria, membrane</div><div>nucleus, ribosomes, mitochondria, membrane</div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Ask why “all plant cells have chloroplasts” is false. Use root cells as the counterexample.
[Sources]
- D:\IB DP\Animal, plant and fungal cells _ IB DP Biology SL_HL FE2028.pdf.
[/Sources]
-->

---

# Atypical cells reveal what a generalisation hides

<div class="evidence-columns">
  <div class="evidence-column"><span class="big-number">0</span><h2>Mammalian red blood cell nuclei</h2><p>Loss of the nucleus increases space and flexibility for haemoglobin, but prevents division and repair.</p><span class="status">specialised trade-off</span></div>
  <div class="evidence-column"><span class="big-number">many</span><h2>Nuclei in skeletal muscle fibres</h2><p>Cell fusion produces a long syncytium able to coordinate a huge contractile volume.</p><span class="status">scale solution</span></div>
  <div class="evidence-column"><span class="big-number">∞?</span><h2>Fungal hypha compartments</h2><p>Some hyphae are aseptate, creating continuous cytoplasm across long distances.</p><span class="status gap">boundary stretched</span></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Students choose whether each is an exception to “cells have nuclei” or to cell theory itself.
[Sources]
- D:\IB DP\Animal, plant and fungal cells _ IB DP Biology SL_HL FE2028.pdf — atypical cells.
[/Sources]
-->

---

<ScienceTimeline mode="endosymbiosis" />

<!--
[Timing] 9 minutes
[Teacher prompt] Move through the dates as an evidence story. Correct the shortcut “Margulis invented endosymbiosis”; her contribution was a powerful modern synthesis and research programme.
[Sources]
- https://pmc.ncbi.nlm.nih.gov/articles/PMC5426843/ — historical and evidential review of endosymbiotic theory.
- https://commons.wikimedia.org/wiki/File:Konstantin_Mereschkowski.jpg — portrait, public domain.
- https://commons.wikimedia.org/wiki/File:Lynn_Margulis.jpg — portrait by Javier Pedreira, CC BY-SA 2.5.
- https://commons.wikimedia.org/wiki/File:Mitochondria_-_TEM.jpg — mitochondrial TEM by Louisa Howard, public domain.
[/Sources]
-->

---

# Four independent clues converge on bacterial ancestry

<EndosymbiosisEvidence />

<!--
[Timing] 8 minutes
[Teacher prompt] Students state the predicted evidential value before each reveal, then rank the four clues by independence.
[Sources]
- https://pmc.ncbi.nlm.nih.gov/articles/PMC5426843/
[/Sources]
-->

---

<QuickCheck
  label="Test 2 · evolutionary evidence"
  question="Which observation most directly tests the ancestry of mitochondria?"
  :options="['Mitochondria make ATP','Mitochondria have two membranes','Mitochondrial gene sequences group with alphaproteobacterial sequences','Mitochondria are visible by electron microscopy']"
  :answer="2"
  explanation="Phylogenetic grouping directly tests descent. The other observations are compatible with endosymbiosis but are less specific about ancestry."
/>

<!--
[Timing] 3 minutes
[Teacher prompt] Ask why double membranes are supportive but not decisive alone.
[Sources]
- https://pmc.ncbi.nlm.nih.gov/articles/PMC5426843/
[/Sources]
-->

---

<div class="image-story">
  <figure><img :src="'images/volvox.jpg'" alt="Light micrograph of Volvox globator colony" /><figcaption>Volvox · one colony, differentiated cell roles</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">Transition case · multicellularity</p><h2>Cooperation changes what a cell can afford to stop doing</h2><p>In Volvox, small somatic cells provide movement while larger reproductive cells produce offspring. Division of labour increases performance.</p><p class="claim">The benefit is not “more cells.” It is <strong>specialisation coordinated across cells</strong>—with the cost that individual cells lose autonomy.</p></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Ask what conflicts could arise between somatic and reproductive cells, then connect to regulation and programmed cell death.
[Sources]
- https://commons.wikimedia.org/wiki/File:Volvox_globator.jpg — image, CC BY-SA 4.0.
- https://pmc.ncbi.nlm.nih.gov/articles/PMC3404089/ — evolution of multicellularity and differentiation in volvocine algae.
[/Sources]
-->

---

# Differentiation changes expression, not the inherited genome

<div class="concept-map">
  <div class="concept-node"><span class="node-label">same DNA</span><h2>Shared sequence</h2><p>Most cells in an organism inherit the same genome after mitosis.</p></div>
  <div class="concept-node center"><span class="node-label">different environment</span><h2>Signals stabilise different gene-expression programs</h2><p>Transcription factors, chromatin state, and cell interactions make histories persistent.</p></div>
  <div class="concept-node"><span class="node-label">different phenotype</span><h2>Specialised proteome</h2><p>Neurons, muscle cells, and secretory cells build different structures and perform different work.</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Ask why a nucleus from a differentiated cell can still contain genes that cell never expresses.
[Sources]
- D:\IB DP\Endosymbiosis, cell differentiation and the evolution of multicellular organisms (HL) _ IB DP Biology SL_HL FE2028.pdf.
- https://www.nobelprize.org/prizes/medicine/2012/press-release/ — reprogramming mature cells to pluripotency.
[/Sources]
-->

---

<div class="tok-layout">
  <div class="tok-mark">TOK</div>
  <div class="tok-copy"><p class="eyebrow">HeLa cells · knowledge, consent, and benefit</p><h1>Who should control a biological sample after it leaves the body?</h1><p class="tok-question">Henrietta Lacks did not consent to the 1951 culture that became HeLa, yet the line transformed biomedical research.</p><p>In 2013, NIH and the Lacks family agreed on controlled access to whole-genome data. Does later governance repair an original absence of consent?</p></div>
</div>

<!--
[Timing] 10 minutes
[Teacher prompt] Separate scientific value from ethical legitimacy; do not force a single “correct” TOK answer.
[Sources]
- https://osp.od.nih.gov/hela-cells/ — NIH history and 2013 genomic data agreement.
- https://commons.wikimedia.org/wiki/File:HeLa-I.jpg — NIH HeLa image, public domain.
[/Sources]
-->

---

# Investigation: build a micrograph evidence dossier

<div class="investigation-layout">
  <div class="investigation-brief"><p class="scene-kicker">Practical · calibration + inference</p><h2>Identify an unknown without drawing label lines</h2><p>Each group receives three real micrographs and the method metadata. Your product is a one-page evidence dossier, not a copied cell diagram.</p></div>
  <div class="investigation-method">
    <div class="method-row"><strong>measure</strong><span>calibrate with the scale bar; report three actual dimensions with sensible precision</span></div>
    <div class="method-row"><strong>identify</strong><span>cell type and microscopy method; cite visible evidence</span></div>
    <div class="method-row"><strong>limit</strong><span>state one feature the image cannot establish</span></div>
    <div class="method-row"><strong>compare</strong><span>choose a second method that could test your unresolved claim</span></div>
    <div class="method-row"><strong>defend</strong><span>claim → observation → method limit → next test</span></div>
  </div>
</div>

<!--
[Timing] 35–45 minutes
[Teacher prompt] Use teacher-selected public-domain micrographs with intact scale bars. Reward disciplined uncertainty.
[Sources]
- https://www.nigms.nih.gov/image-gallery — NIH/NIGMS biomedical image collection.
- https://wwwn.cdc.gov/phil/ — CDC Public Health Image Library.
- D:\IB DP\Investigation 2 into cell structure _ IB DP Biology SL_HL FE2028.pdf — weak drawing task replaced by evidence dossier.
[/Sources]
-->

---

<div class="checkpoint">
  <div class="checkpoint-number">02</div>
  <div class="checkpoint-copy"><p class="eyebrow">Act II checkpoint · 8 minutes</p><h1>Retrieve the architecture</h1><ol><li>Explain why fluorescence colour is evidence chosen by an investigator.</li><li>Calculate actual size from an image and a scale bar.</li><li>Name four features shared by every cell.</li><li>Give two independent lines of evidence for endosymbiosis.</li><li>Explain differentiation without saying that cells “lose genes.”</li></ol></div>
</div>

<!--
[Timing] 8 minutes, then 4-minute peer correction.
[Teacher prompt] Use as a low-stakes closed-note retrieval pause.
[Sources]
- D:\IB DP\Checklist_ Cell structure _ IB DP Biology SL_HL FE2028.pdf — outcomes sampled.
[/Sources]
-->

---
class: act-slide
---

<div class="act-scene">
  <img :src="'images/phages.jpg'" alt="Bacteriophages attached to a bacterial cell wall" />
  <div class="act-copy"><p class="eyebrow">Act III · A2.3 · HL</p><h1>A genome that borrows a life</h1><p>Viruses expose which cellular functions cannot be reduced to information alone.</p></div>
</div>

<!--
[Timing] 1 minute
[Teacher prompt] Ask: what exactly is the phage borrowing from the bacterium in this image?
[Sources]
- https://commons.wikimedia.org/wiki/File:Phage.jpg — Graham Beards, CC BY-SA 3.0.
[/Sources]
-->

---

<VirusGallery />

<!--
[Timing] 9 minutes
[Teacher prompt] Switch among real virions. Students identify the invariant features and the variable features.
[Sources]
- https://wwwn.cdc.gov/phil/Details.aspx?pid=2291 — variola, public domain.
- https://wwwn.cdc.gov/phil/Details.aspx?pid=10072 — influenza, public domain.
- https://commons.wikimedia.org/wiki/File:Phage.jpg — bacteriophages, CC BY-SA 3.0.
- https://commons.wikimedia.org/wiki/File:Mimivirus.jpg — mimivirus image.
[/Sources]
-->

---

# Every virion packages information for entry into a host

<div class="evidence-columns">
  <div class="evidence-column"><span class="big-number">1</span><h2>Genome</h2><p>DNA or RNA, single- or double-stranded, linear, circular, or segmented.</p><span class="status">heritable information</span></div>
  <div class="evidence-column"><span class="big-number">2</span><h2>Capsid</h2><p>Protein protects the genome and often helps deliver it to a compatible host.</p><span class="status">protective architecture</span></div>
  <div class="evidence-column"><span class="big-number">±</span><h2>Envelope and accessory proteins</h2><p>Some viruses leave with host-derived membrane carrying viral entry proteins.</p><span class="status gap">not universal</span></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Ask why “all viruses have an envelope” fails, and why “all have a capsid” survives.
[Sources]
- https://www.ncbi.nlm.nih.gov/books/NBK21523/ — NCBI Medical Microbiology, viral structure.
- D:\IB DP\Viral structure (HL) _ IB DP Biology SL_HL FE2028.pdf.
[/Sources]
-->

---

# A virion carries a program but not the factory

<div class="matrix">
  <div class="matrix-head">function</div><div class="matrix-head">cell</div><div class="matrix-head">virion outside host</div><div class="matrix-head">virus inside host system</div>
  <div class="matrix-label">ATP production</div><div class="yes">maintains metabolism</div><div class="no">none</div><div>uses host energy</div>
  <div class="matrix-label">translation</div><div class="yes">ribosomes + tRNAs</div><div class="no">no ribosomes</div><div>redirects host translation</div>
  <div class="matrix-label">genome copying</div><div class="yes">cellular enzymes</div><div class="no">inactive particle</div><div>viral and/or host enzymes</div>
  <div class="matrix-label">evolution</div><div class="yes">populations evolve</div><div>virions do not change individually</div><div class="yes">viral populations evolve across infections</div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Clarify levels: evolution belongs to populations, not a single particle deciding to adapt.
[Sources]
- https://www.ncbi.nlm.nih.gov/books/NBK21523/
[/Sources]
-->

---

<DefinitionStressTest />

<!--
[Timing] 8 minutes
[Teacher prompt] Ask students to test any proposed definition against a virus, a spore, a sterile organism, and fire.
[Sources]
- https://plato.stanford.edu/entries/life/ — philosophical analysis of definitions of life.
[/Sources]
-->

---

# Esther Lederberg found a virus hiding in plain sight

<div class="image-story">
  <figure><img :src="'images/esther-lederberg.jpg'" alt="Esther Lederberg working in her Stanford laboratory" /><figcaption>Esther Lederberg · Stanford laboratory · 1977</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">Historical figure · 1951</p><h2>λ could remain silent inside E. coli</h2><p>Esther Lederberg discovered bacteriophage lambda and published the first report in 1951. Its temperate life cycle made it a model for recombination and gene regulation.</p><p class="claim">A phage that does not immediately destroy its host revealed that infection can be a <strong>stable inherited state</strong>.</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Note how scientific credit can be compressed or lost when a tool becomes more famous than its discoverer.
[Sources]
- https://med.stanford.edu/news/all-news/2006/11/esther-lederberg-pioneer-in-microbial-genetics-dies-at-stanford-at-83.html — Stanford history of Lederberg and λ.
- https://commons.wikimedia.org/wiki/File:Esther_Lab.jpg — laboratory photograph, attribution permitted.
[/Sources]
-->

---

<LambdaDecision />

<!--
[Timing] 10 minutes
[Teacher prompt] Students predict before each state is selected. Use “more likely,” not deterministic arrows.
[Sources]
- https://pmc.ncbi.nlm.nih.gov/articles/PMC8590857/ — historical and quantitative review of λ decision-making.
- https://www.annualreviews.org/doi/10.1146/annurev.genet.39.073003.113656 — λ genetic switch and induction.
- https://commons.wikimedia.org/wiki/File:Phage.jpg — image.
[/Sources]
-->

---

<QuickCheck
  label="Test 3 · switch the fate"
  question="A stable λ lysogen is exposed to DNA-damaging UV. Which outcome is most plausible?"
  :options="['The prophage must remain permanently silent','The phage immediately becomes a cellular organelle','DNA-damage signalling can induce a switch toward lytic development','The bacterium gains a nucleus']"
  :answer="2"
  explanation="DNA damage can destabilise repression of the lytic program, allowing an integrated prophage to re-enter productive infection."
/>

<!--
[Timing] 3 minutes
[Teacher prompt] Ask why “can induce” is scientifically better than “always causes.”
[Sources]
- https://www.annualreviews.org/doi/10.1146/annurev.genet.39.073003.113656
[/Sources]
-->

---

# Viruses probably do not have one origin story

<div class="claim-ladder">
  <div class="claim-step"><span class="tag">escape</span><h2>Mobile genes acquired transmission</h2><p>Plasmids or transposable elements could gain capsids and movement between cells.</p></div>
  <div class="claim-step"><span class="tag">reduction</span><h2>Cellular parasites lost autonomy</h2><p>Progressive dependence could leave genomes and particles with few independent functions.</p></div>
  <div class="claim-step"><span class="tag">virus-first</span><h2>Replicators predated modern cells</h2><p>Some viral lineages may preserve features of a pre-cellular genetic world.</p></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Assign each hypothesis one observation it explains well and one difficulty. End with the possibility of multiple origins.
[Sources]
- https://www.nature.com/scitable/topicpage/the-origins-of-viruses-14398218/ — overview of three origin hypotheses.
- https://pmc.ncbi.nlm.nih.gov/articles/PMC12736012/ — recent review and unresolved plurality of viral origins.
[/Sources]
-->

---

<div class="image-story reverse">
  <figure><img :src="'images/mimivirus.jpg'" alt="Electron micrograph of Mimivirus particles" /><figcaption>Mimivirus · giant dsDNA virus</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">Boundary-breaker · first seen in 1992, recognised as a virus in 2003</p><h2>It was mistaken for a bacterium because the old category used size</h2><p>Mimivirus particles are roughly 0.75 μm across and its genome is about 1.2 million base pairs—larger than some cellular genomes.</p><p class="claim">It encodes unusual translation-related components, yet still lacks a complete independent translation system. <strong>Large is not autonomous.</strong></p></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Ask which definition of virus Mimivirus challenges and which dependency it retains.
[Sources]
- https://pmc.ncbi.nlm.nih.gov/articles/PMC7096837/ — giant-virus review.
- https://pubmed.ncbi.nlm.nih.gov/16469402/ — Mimivirus size and genome complexity.
- https://commons.wikimedia.org/wiki/File:Mimivirus.jpg — image.
[/Sources]
-->

---

# Rapid evolution combines error, selection, and population size

<div class="sequence">
  <div class="sequence-step"><span class="index">01</span><h2>Variation</h2><p>Replication errors, recombination, and reassortment generate genetic diversity.</p></div>
  <div class="sequence-step"><span class="index">02</span><h2>Selection</h2><p>Host immunity, receptors, drugs, and transmission routes change reproductive success.</p></div>
  <div class="sequence-step"><span class="index">03</span><h2>Amplification</h2><p>Large viral populations and short generation times make rare variants visible quickly.</p></div>
  <div class="sequence-step"><span class="index">04</span><h2>Constraint</h2><p>Most changes are neutral or harmful; essential structures cannot vary without cost.</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Reject “viruses mutate because they need to escape.” Mutation is not directed by need; selection changes frequencies.
[Sources]
- https://www.cdc.gov/flu/php/viruses/change.html — antigenic drift and shift.
- D:\IB DP\The origins and evolution of viruses (HL) _ IB DP Biology SL_HL FE2028.pdf.
[/Sources]
-->

---

<div class="image-story">
  <figure><img :src="'images/influenza.jpg'" alt="Colourised transmission electron micrograph of influenza virus particles" /><figcaption>Influenza virions · CDC TEM</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">Case study · segmented genomes</p><h2>Influenza can change by drift—or reshuffle by reassortment</h2><p>Small accumulated mutations alter antigens gradually. If two influenza A viruses infect one cell, genome segments can be packaged in new combinations.</p><p class="claim">Reassortment can produce a large genetic change in one event, but <strong>emergence still depends on viability and transmission</strong>.</p></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Students compare drift with reassortment in mechanism and scale of change.
[Sources]
- https://www.cdc.gov/flu/php/viruses/change.html — CDC explanation of drift and shift.
- https://wwwn.cdc.gov/phil/Details.aspx?pid=10072 — influenza TEM, public domain.
[/Sources]
-->

---

# Smallpox disappeared because transmission was made to fail everywhere

<div class="dated-case">
  <figure><img :src="'images/variola.jpg'" alt="Transmission electron micrograph of variola virus particles" /><figcaption>Variola virus · CDC TEM</figcaption></figure>
  <div class="dated-events">
    <article><span>1967</span><div><h2>Intensified eradication</h2><p>Surveillance, containment, and vaccination targeted every remaining chain.</p></div></article>
    <article><span>1977</span><div><h2>Last natural case</h2><p>Ali Maow Maalin in Somalia became the last person known to acquire smallpox naturally.</p></div></article>
    <article><span>1980</span><div><h2>WHO declared eradication</h2><p>Natural circulation ended without eliminating every laboratory sample.</p></div></article>
  </div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Ask which viral properties made eradication feasible: no non-human reservoir, recognisable disease, effective vaccine, coordinated surveillance.
[Sources]
- https://www.who.int/emergencies/situations/smallpox — WHO history and dates.
- https://www.cdc.gov/smallpox/about/history.html — Ali Maow Maalin and eradication history.
[/Sources]
-->

---

<PhageTherapyMatcher />

<!--
[Timing] 7 minutes
[Teacher prompt] Students identify the therapeutic advantage (specific killing) and the same property as a limitation (narrow host range).
[Sources]
- https://health.ucsd.edu/news/press-releases/2022-06-09-unprecedented-case-series-advances-promise-of-phage-therapy/ — UC San Diego case history and later series.
- https://wwwn.cdc.gov/phil/Details.aspx?pid=10095 — A. baumannii SEM, public domain.
- The host-range assay is an explicitly labelled qualitative teaching scenario, not Patterson's laboratory dataset.
[/Sources]
-->

---

# Cumulative challenge: classify the unknown system

<UnknownClassification />

<!--
[Timing] 8 minutes
[Teacher prompt] Hide the right column initially with a sheet of paper or presenter crop; groups produce their own dossier first.
[Sources]
- https://www.ncbi.nlm.nih.gov/books/NBK21523/ — viral properties and classification.
[/Sources]
-->

---

<div class="checkpoint">
  <div class="checkpoint-number">10</div>
  <div class="checkpoint-copy"><p class="eyebrow">Final assessment · 15 minutes</p><h1>Ten marks across the boundary</h1><ol><li><strong>2</strong> Explain why Bennu organics do not demonstrate life.</li><li><strong>2</strong> Distinguish magnification from resolution with one microscopy example.</li><li><strong>2</strong> Explain two independent lines of evidence for endosymbiosis.</li><li><strong>2</strong> Predict λ fate in a starved cell at high multiplicity of infection, using probabilistic language.</li><li><strong>2</strong> Evaluate the claim “viruses are alive.” Use two criteria and one counterexample.</li></ol></div>
</div>

<!--
[Timing] 15 minutes individual, 10 minutes whole-class key.
[Teacher prompt] Mark argument quality as well as vocabulary. Accept defensible virus-life positions if criteria are explicit and consistently applied.
[Sources]
- D:\IB DP\A2.1–A2.3 checklists — learning outcomes sampled.
[/Sources]
-->

---
class: closing-slide
---

<div class="closing-scene">
  <img :src="'images/stromatolites.jpg'" alt="Living stromatolites at Shark Bay" />
  <div class="closing-copy"><p class="eyebrow">Return to the boundary</p><h1>Life is not one molecule or one shape. It is sustained organisation that can inherit, vary, and evolve.</h1><p>Cells carry that organisation. Viruses borrow it. Origins research asks how the first version became possible.</p></div>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Return to the entry diagnostic. Students revise their original criterion for life in one sentence and name the evidence that changed it.
[Sources]
- https://commons.wikimedia.org/wiki/File:Shark_Bay_stromatolites.jpg — image, CC BY-SA 4.0.
[/Sources]
-->
