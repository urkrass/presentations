---
theme: default
title: The Hidden Clock of Reactions
titleTemplate: '%s · IB DP Chemistry Reactivity 2.2'
info: |
  IB DP Chemistry Grade 11 · SL/HL
  Reactivity 2.2.1–2.2.13 · kinetics and rates of reaction
  A narrative unit with investigations, data work, retrieval, and TOK/NOS prompts
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

<div class="cover-scene kinetics-cover">
  <img :src="'images/iodine-clock.jpg'" alt="Dark blue iodine clock reaction in a laboratory flask" />
  <div class="cover-wash"></div>
  <div class="cover-copy">
    <p class="eyebrow">IB DP Chemistry · Reactivity 2.2 · SL/HL</p>
    <h1>The hidden clock of reactions</h1>
    <p>How chemists turn change into rate, mechanism, and prediction.</p>
  </div>
  <div class="cover-index"><span>measure</span><span>explain</span><span>predict</span></div>
</div>

<!--
[Timing] 2 minutes
[Teacher prompt] Ask: what changed before this flask became blue, even though we could not see it?
[Sources]
- https://commons.wikimedia.org/wiki/File:Iodine-C_Clock_experiment.jpg — Daniel J. Lulu, CC BY-SA 4.0.
[/Sources]
-->

---
class: thesis-slide
---

<p class="eyebrow">The question beneath every kinetics problem</p>

# What controls when chemistry happens?

<p class="thesis">A balanced equation tells us <strong>what can change</strong>. Kinetics asks how quickly, by which route, and under which conditions.</p>
<p class="thesis-foot">Rate is observed. Mechanism is inferred. Prediction connects them.</p>

<!--
[Timing] 3 minutes
[Teacher prompt] Contrast thermodynamic possibility with kinetic accessibility. A spontaneous process need not be fast.
[Sources]
- https://goldbook.iupac.org/terms/view/R05156 — IUPAC definition of reaction rate.
[/Sources]
-->

---

<QuickCheck
  label="Entry diagnostic"
  question="A reaction releases energy but is extremely slow at room temperature. Which statement is best?"
  :options="['It cannot be spontaneous', 'Its activation barrier may be large', 'Its products must have more energy', 'Its equation must be unbalanced']"
  :answer="1"
  explanation="Thermodynamic favourability and reaction rate answer different questions. A large activation barrier can make a favourable change imperceptibly slow."
/>

<!--
[Timing] 4 minutes
[Teacher prompt] Require a reason before selection. Use answers to diagnose confusion between energetics and kinetics.
-->

---

# The unit follows one object: a changing chemical system

<div class="unit-arc">
  <article><span>01</span><h2>Observe</h2><p>Choose a measurable trace and define rate.</p></article>
  <article><span>02</span><h2>Explain</h2><p>Test collisions, energy, and orientation.</p></article>
  <article><span>03</span><h2>Control</h2><p>Alter barriers with catalysts and conditions.</p></article>
  <article><span>04</span><h2>Infer</h2><p>Use rate evidence to constrain mechanisms.</p></article>
  <article><span>05</span><h2>Predict</h2><p>Build rate laws and temperature models.</p></article>
</div>

<!--
[Timing] 2 minutes
[Teacher prompt] Tell students the same system will be revisited as data, particles, energy, and equations.
-->

---
class: act-slide
---

<div class="act-scene">
  <img :src="'images/elephant-toothpaste.jpg'" alt="Rapid catalytic decomposition of hydrogen peroxide producing foam" />
  <div class="act-copy"><p class="eyebrow">Act I · Observe</p><h1>Change leaves a trace</h1><p>Rate begins with a quantity we can measure repeatedly.</p></div>
</div>

<!--
[Timing] 2 minutes
[Teacher prompt] Ask which quantities could be recorded without judging the amount of foam by eye.
[Sources]
- https://commons.wikimedia.org/wiki/File:Elephant_Toothpaste_Denver_JDS_Labs.jpg — eigenadam, CC BY-SA 2.0.
[/Sources]
-->

---
class: thesis-slide
---

<p class="eyebrow">Reactivity 2.2.1 · Reaction rate</p>

# Rate is change divided by time.

<p class="thesis formula-thesis">rate = <span>change in a measurable quantity</span> / <span>time taken</span></p>
<p class="thesis-foot">The quantity must track reaction progress.</p>

<!--
[Timing] 3 minutes
[Teacher prompt] Students propose one observable for a gas-forming, colour-changing, and precipitate-forming reaction.
[Sources]
- https://goldbook.iupac.org/terms/view/R05156 — IUPAC reaction rate.
[/Sources]
-->

---

# The reaction is invisible. Its traces are not.

<div class="trace-fields">
  <article class="gas"><p class="scene-kicker">Gas formed</p><strong>volume ↑</strong><span>gas syringe · pressure sensor · mass loss</span></article>
  <article class="colour"><p class="scene-kicker">Colour changes</p><strong>absorbance Δ</strong><span>colorimeter · spectrophotometer</span></article>
  <article class="ions"><p class="scene-kicker">Ions change</p><strong>conductivity Δ</strong><span>conductivity probe · pH probe</span></article>
  <article class="solid"><p class="scene-kicker">Solid appears</p><strong>transmission ↓</strong><span>light sensor · timed threshold</span></article>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] For each trace, ask what hidden chemical change it represents and one confounding variable.
-->

---

# One curve contains two meanings of rate

<RateCurveExplorer />

<!--
[Timing] 7 minutes
[Teacher prompt] Move the time marker. Compare average and instantaneous rate at early and late times. Ask why the curve approaches a plateau.
[Sources]
- https://goldbook.iupac.org/terms/view/R05156 — rate as derivative with respect to time.
[/Sources]
-->

---

# Average rate depends on the interval you choose

<div class="calculation-stage">
  <div class="calculation-data"><span>At 10 s</span><strong>V = 30 cm³</strong><span>At 30 s</span><strong>V = 54 cm³</strong></div>
  <div class="calculation-work"><p class="scene-kicker">Between 10 and 30 s</p><div class="big-equation">rate = (54 − 30) / (30 − 10)</div><div class="answer">1.2 cm³ s⁻¹</div><p>The unit belongs to the measured trace—not automatically mol dm⁻³ s⁻¹.</p></div>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Students calculate. Then ask whether this value represents the rate at 20 s exactly.
-->

---

# Instantaneous rate is the slope at one moment

<div class="split-claim">
  <article class="soft-blue"><p class="scene-kicker">Graphically</p><h2>Draw a tangent</h2><p>Its gradient estimates the rate at that time.</p><strong>steeper tangent → faster change</strong></article>
  <article class="soft-rust"><p class="scene-kicker">Mathematically</p><h2>Take a derivative</h2><p>For concentration of product P:</p><strong>rate = d[P] / dt</strong></article>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Emphasize that a tangent is a local linear approximation, not a new data series.
-->

---

# Reactants disappear; products appear

<div class="sign-stage">
  <div class="sign-object reactant"><span>reactant A</span><strong>d[A]/dt &lt; 0</strong><p>Concentration falls.</p></div>
  <div class="sign-object rate"><span>reported rate</span><strong>−d[A]/dt &gt; 0</strong><p>The minus sign makes reaction rate positive.</p></div>
  <div class="sign-object product"><span>product P</span><strong>d[P]/dt &gt; 0</strong><p>Concentration rises.</p></div>
</div>

<!--
[Timing] 3 minutes
[Teacher prompt] Ask why negative reaction rates would be inconvenient when comparing conditions.
-->

---

# Stoichiometry makes every species report the same reaction rate

<div class="stoich-rate">
  <div class="reaction-equation">2 N₂O₅(g) → 4 NO₂(g) + O₂(g)</div>
  <div class="rate-equalities"><span>−½ d[N₂O₅]/dt</span><strong>=</strong><span>¼ d[NO₂]/dt</span><strong>=</strong><span>d[O₂]/dt</span></div>
  <p>NO₂ appears four times as quickly as reaction events occur. Divide by its coefficient before comparing.</p>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Give d[O2]/dt = 0.020 mol dm−3 s−1. Students determine d[NO2]/dt and d[N2O5]/dt.
[Sources]
- https://goldbook.iupac.org/terms/view/R05156 — stoichiometrically normalized rate definition.
[/Sources]
-->

---

<div class="image-story">
  <figure><img :src="'images/iodine-clock.jpg'" alt="Blue iodine clock reaction mixture" /><figcaption>Iodine clock · visible endpoint</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">A clock with no hands</p><h2>The colour waits—then arrives almost at once.</h2><p>Iodine is produced from the beginning, but thiosulfate removes it. Blue starch–iodine appears only after that scavenger is exhausted.</p><p class="claim"><strong>Clock time is a threshold measurement</strong>, not the complete concentration–time curve.</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Ask students to distinguish reaction start, iodine production, thiosulfate exhaustion, and visible endpoint.
[Sources]
- https://commons.wikimedia.org/wiki/File:Iodine_clock_-_persulphate.ogv — iodine clock description and kinetics use.
[/Sources]
-->

---

# When does 1/time represent rate?

<div class="reasoning-chain">
  <article><span>fixed threshold</span><strong>the same amount of iodine is needed each trial</strong></article>
  <article><span>measured time</span><strong>faster production reaches that amount sooner</strong></article>
  <article><span>rate proxy</span><strong>relative rate ∝ 1 / clock time</strong></article>
</div>
<p class="caveat">If the threshold changes, the reciprocal comparison fails.</p>

<!--
[Timing] 4 minutes
[Teacher prompt] Have students state every assumption behind using 1/t. Do not let “rate = 1/t” become a universal formula.
-->

---

# Investigation I · make a rate visible

<div class="investigation-layout">
  <div class="investigation-brief"><p class="scene-kicker">Sodium thiosulfate + acid</p><h2>How does concentration affect clock time?</h2><p>A sulfur precipitate gradually hides a printed mark beneath the flask.</p><p><strong>Design tension:</strong> simple apparatus, subjective endpoint.</p></div>
  <div class="investigation-method"><div class="method-row"><strong>change</strong><span>thiosulfate concentration by dilution</span></div><div class="method-row"><strong>measure</strong><span>time until the same mark is no longer visible</span></div><div class="method-row"><strong>control</strong><span>total volume, acid concentration, temperature, vessel, observer</span></div><div class="method-row"><strong>process</strong><span>plot relative rate 1/t against concentration</span></div><div class="method-row"><strong>safety</strong><span>small scale, goggles, ventilation, local risk assessment</span></div></div>
</div>

<!--
[Timing] 8 minutes planning; practical time set by teacher
[Teacher prompt] Groups specify dilution volumes before collecting data. Use a light sensor if available to replace the human endpoint.
[Sources]
- https://edu.rsc.org/experiments/disappearing-cross/ — Royal Society of Chemistry practical guidance.
[/Sources]
-->

---

# The neatest table can still hide weak evidence

<div class="data-critique">
  <table><thead><tr><th>[S₂O₃²⁻] / mol dm⁻³</th><th>time / s</th><th>1/t / s⁻¹</th></tr></thead><tbody><tr><td>0.040</td><td>22.1</td><td>0.0452</td></tr><tr><td>0.030</td><td>29.0</td><td>0.0345</td></tr><tr><td>0.020</td><td>45.8</td><td>0.0218</td></tr><tr><td>0.010</td><td>101.4</td><td>0.00986</td></tr></tbody></table>
  <div class="critique-prompts"><p class="scene-kicker">Interrogate the method</p><h2>What is missing?</h2><p v-click>Repeat trials and spread.</p><p v-click>Uncertainty in volumes and timing.</p><p v-click>A check that temperature stayed constant.</p><p v-click>An operational definition of “disappeared.”</p></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Students rank the missing items by impact on the conclusion.
-->

---

<div class="tok-layout"><div class="tok-mark">NOS</div><div class="tok-copy"><p class="eyebrow">Observation is designed</p><h1>Is an endpoint a fact—or a decision?</h1><p class="tok-question">The precipitate is real. “No longer visible” depends on the observer, lighting, geometry, and criterion.</p><p>Scientific objectivity is strengthened by shared procedures, calibration, automation, repeats, and transparent uncertainty—not by pretending observers are absent.</p></div></div>

<!--
[Timing] 6 minutes
[Teacher prompt] Ask whether replacing the eye with a sensor removes all judgement. Identify the new decisions introduced by the sensor.
-->

---

<QuickCheck
  label="Checkpoint 1"
  question="For 2 A → B, [A] falls by 0.060 mol dm⁻³ in 30 s. What is the normalized reaction rate?"
  :options="['1.0 × 10⁻³ mol dm⁻³ s⁻¹', '2.0 × 10⁻³ mol dm⁻³ s⁻¹', '4.0 × 10⁻³ mol dm⁻³ s⁻¹', '−2.0 × 10⁻³ mol dm⁻³ s⁻¹']"
  :answer="0"
  explanation="Disappearance of A is 0.060/30 = 2.0 × 10⁻³. Divide by its coefficient 2 to obtain 1.0 × 10⁻³ mol dm⁻³ s⁻¹."
/>

<!-- [Timing] 4 minutes -->

---
class: act-slide
---

<div class="act-scene">
  <img :src="'images/cold-storage.jpg'" alt="Produce stored in a refrigerated horticultural facility" />
  <div class="act-copy"><p class="eyebrow">Act II · Explain</p><h1>Conditions change the encounter</h1><p>Concentration, pressure, surface area, and temperature alter collision opportunities or collision success.</p></div>
</div>

<!--
[Timing] 2 minutes
[Teacher prompt] Ask why cooling slows many unwanted reactions without making their products impossible.
[Sources]
- https://commons.wikimedia.org/wiki/File:Cold_Storage_in_Horticulture_(32778116712).jpg — photograph, Wikimedia Commons.
[/Sources]
-->

---
class: thesis-slide
---

<p class="eyebrow">Reactivity 2.2.2 · Collision theory</p>

# Most collisions do not become reactions.

<p class="thesis">A successful event needs particles to <strong>meet</strong>, carry enough relative energy, and approach with a suitable orientation.</p>
<p class="thesis-foot">Frequency matters. Fraction successful matters more.</p>

<!--
[Timing] 3 minutes
[Teacher prompt] Ask students to identify which factor changes frequency, energy distribution, or both.
[Sources]
- https://goldbook.iupac.org/terms/view/C01170 — IUPAC collision theory entry.
[/Sources]
-->

---

# A collision model needs two gates

<CollisionChamber />

<!--
[Timing] 8 minutes
[Teacher prompt] Change one control at a time. The model is conceptual: the percentage is illustrative, while the independent energy and orientation requirements are chemically meaningful.
-->

---

# Collision frequency is not the same as reaction rate

<div class="gate-model">
  <div class="gate-source"><strong>all A–B collisions</strong><span>many encounters</span></div>
  <div class="gate-column"><article v-click><span>energy gate</span><strong>E ≥ Eₐ</strong></article><article v-click><span>orientation gate</span><strong>reactive geometry</strong></article></div>
  <div class="gate-result" v-click><strong>successful collisions</strong><span>a smaller subset</span></div>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Ask whether doubling collisions must double reaction rate. Students identify assumptions.
-->

---

# Concentration changes how crowded the reacting volume is

<div class="split-claim">
  <article class="soft-blue"><p class="scene-kicker">Lower concentration</p><h2>More distance between particles</h2><p>Fewer A–B encounters per unit time and volume.</p><strong>collision frequency ↓</strong></article>
  <article class="soft-green"><p class="scene-kicker">Higher concentration</p><h2>More possible partners nearby</h2><p>More A–B encounters per unit time and volume.</p><strong>collision frequency ↑</strong></article>
</div>

<!-- [Timing] 3 minutes -->

---

# Gas pressure is a concentration change in disguise

<div class="pressure-stage">
  <div class="volume-state"><span>same amount of gas</span><strong>larger volume</strong><p>lower partial pressures</p></div>
  <div class="volume-state compressed"><span>same amount of gas</span><strong>smaller volume</strong><p>higher partial pressures</p></div>
  <div class="pressure-rule"><p class="scene-kicker">Only for gases</p><h2>Compression increases collision frequency.</h2><p>Always specify which gas and whether temperature is controlled.</p></div>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Challenge the claim “pressure speeds every reaction.” What if only an inert gas is added at constant volume?
-->

---

# Surface area exposes more reaction sites

<div class="surface-stage">
  <article><div class="surface-object block">CaCO₃</div><h2>One large chip</h2><p>Less surface is in contact with acid at once.</p></article>
  <article><div class="surface-object grains"><span v-for="n in 16" :key="n">CaCO₃</span></div><h2>Many small grains</h2><p>The same mass presents more accessible surface.</p></article>
  <aside><p class="scene-kicker">Keep constant</p><strong>mass, composition, acid concentration, temperature</strong><p>Otherwise “surface area” is not isolated.</p></aside>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] This uses aligned boxes as abstract sample representations, not molecular geometry. Ask what measurement would show the faster initial rate.
-->

---

# Temperature changes the high-energy tail

<ActivationThreshold />

<!--
[Timing] 8 minutes
[Teacher prompt] Increase temperature in small steps. Students describe the distribution without saying “all molecules now have the same higher energy.”
[Sources]
- https://goldbook.iupac.org/terms/view/A00093 — activation energy.
[/Sources]
-->

---

<QuickCheck
  label="Test · the 10-degree shortcut"
  question="A reaction roughly doubles in rate from 20 °C to 30 °C. What can we safely conclude?"
  :options="['Every reaction doubles for every 10 °C', 'Its k increased under these conditions', 'Its activation energy doubled', 'Its equilibrium constant is unchanged']"
  :answer="1"
  explanation="The observation supports an increase in the rate constant for this reaction over this interval. The “doubling rule” is an approximation, not a law."
/>

<!-- [Timing] 4 minutes -->

---
class: thesis-slide
---

<p class="eyebrow">Reactivity 2.2.4 · Activation energy</p>

# The barrier is not energy “used up” by the reaction.

<p class="thesis">Eₐ characterizes the pathway from reactants toward a transition state. Products may release or absorb energy afterward.</p>
<p class="thesis-foot">Barrier height and overall enthalpy change are different quantities.</p>

<!--
[Timing] 4 minutes
[Teacher prompt] Ask students to sketch two reactions with the same ΔH but different Eₐ, then explain the consequences.
-->

---

<p class="eyebrow">Reactivity 2.2.3 · Factors influencing reaction rate</p>

# Each factor changes a different part of the model

<div class="factor-map">
  <article><span>concentration / pressure</span><strong>collision frequency</strong><p>more encounters per time and volume</p></article>
  <article><span>surface area</span><strong>accessible sites</strong><p>more solid–fluid encounters</p></article>
  <article><span>temperature</span><strong>frequency + energy tail</strong><p>more collisions; much larger successful fraction</p></article>
  <article><span>catalyst</span><strong>alternative pathway</strong><p>lower activation barrier</p></article>
</div>

<!-- [Timing] 5 minutes -->

---

<QuickCheck
  label="Checkpoint 2"
  question="Powdered magnesium reacts faster than the same mass of ribbon in excess acid. Which explanation is most complete?"
  :options="['The powder has more magnesium atoms', 'The powder has a lower activation energy', 'More magnesium surface is accessible to acid', 'Each powder collision has more energy']"
  :answer="2"
  explanation="The amount and particle energies can be unchanged. Dividing the solid exposes more sites, increasing the number of acid–metal encounters."
/>

<!-- [Timing] 4 minutes -->

---
class: act-slide
---

<div class="act-scene">
  <img :src="'images/catalytic-converter.jpg'" alt="Cutaway catalytic converter showing its internal structure" />
  <div class="act-copy"><p class="eyebrow">Act III · Control</p><h1>Change the route, not the destination</h1><p>Catalysts participate in a mechanism, lower barriers, and return.</p></div>
</div>

<!--
[Timing] 2 minutes
[Teacher prompt] Ask why a converter contains a structured support rather than a lump of platinum-group metal.
[Sources]
- https://commons.wikimedia.org/wiki/File:Catalytic_Converter_(7097580697).jpg — Tino Rossini, CC BY 2.0.
[/Sources]
-->

---

<div class="image-story reverse">
  <figure><img :src="'images/catalytic-converter.jpg'" alt="Automotive catalytic converter" /><figcaption>Automotive exhaust catalyst</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">A surface engineered for encounters</p><h2>CO, hydrocarbons, and nitrogen oxides meet catalytic sites.</h2><p>A high-area support carries small amounts of platinum-group metals. Adsorption, surface reaction, and desorption create a lower-barrier route.</p><p class="claim">The catalyst changes <strong>how fast products form</strong>, not which equilibrium is thermodynamically favoured.</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Separate support, active metal, reactants, and products. Do not imply that the converter simply “filters” pollutants.
[Sources]
- https://www.epa.gov/greenvehicles/learn-about-green-vehicles — U.S. EPA vehicle emissions context.
[/Sources]
-->

---

<p class="eyebrow">Reactivity 2.2.5 · Catalysts</p>

# Three claims a catalyst must satisfy

<CatalystEvidence />

<!--
[Timing] 7 minutes
[Teacher prompt] Students predict the reverse of each card before flipping. Keyboard operation: Tab and Enter/Space.
-->

---

# A catalyst edits the energy profile

<EnergyProfileLab />

<!--
[Timing] 8 minutes
[Teacher prompt] Toggle catalyst first, then multiple steps. Ask which quantities do and do not change: Eₐ, ΔH, equilibrium constant, mechanism.
-->

---

# Heterogeneous catalysis is a cycle of local events

<div class="catalyst-cycle">
  <article v-click><span>01</span><h2>Adsorb</h2><p>Reactants bind at active sites.</p></article>
  <article v-click><span>02</span><h2>Activate</h2><p>Bonds weaken; species are oriented.</p></article>
  <article v-click><span>03</span><h2>React</h2><p>Surface species cross smaller barriers.</p></article>
  <article v-click><span>04</span><h2>Desorb</h2><p>Products leave; sites become available.</p></article>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Ask where catalyst poisoning would interrupt the cycle.
-->

---

<div class="image-story">
  <figure><img :src="'images/ammonia-reactor.jpg'" alt="Historic high-pressure ammonia reactor under assembly" /><figcaption>Oppau · first industrial ammonia reactor</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">1913 · Haber–Bosch at scale</p><h2>A catalyst made an industrial compromise workable.</h2><p>High pressure favours ammonia yield. Moderate high temperature keeps production acceptably fast. An iron catalyst accelerates approach to equilibrium.</p><p class="claim">The catalyst does <strong>not</strong> move the equilibrium position.</p></div>
</div>

<!--
[Timing] 7 minutes
[Teacher prompt] Distinguish Haber’s laboratory synthesis from Bosch’s high-pressure industrial engineering. Discuss fertilizer benefits and wartime consequences.
[Sources]
- https://commons.wikimedia.org/wiki/File:Ammoniak-Reaktor_1913_Oppau_(retuschiert).jpg — BASF historic reactor, CC BY-SA 3.0.
- https://www.nobelprize.org/prizes/chemistry/1918/haber/facts/ — Nobel Prize biography.
[/Sources]
-->

---

# Catalyst, equilibrium, and yield are often confused

<div class="equilibrium-contrast">
  <article><p class="scene-kicker">Catalyst changes</p><strong>rates of forward and reverse reactions</strong><span>equilibrium is reached sooner</span></article>
  <article><p class="scene-kicker">Catalyst does not change</p><strong>K, ΔG°, or equilibrium composition</strong><span>at the same temperature</span></article>
  <article><p class="scene-kicker">Industry still changes</p><strong>temperature, pressure, separation, recycle</strong><span>because productivity is a system property</span></article>
</div>

<!-- [Timing] 5 minutes -->

---

# Enzymes make selectivity part of the pathway

<div class="enzyme-scene">
  <div class="enzyme-focus"><p class="scene-kicker">Catalase</p><strong>2 H₂O₂ → 2 H₂O + O₂</strong><p>An active site binds particular substrates and stabilizes a lower-energy route.</p></div>
  <div class="enzyme-conditions"><article><span>temperature</span><strong>changes k and protein stability</strong></article><article><span>pH</span><strong>changes ionization and structure</strong></article><article><span>inhibitor</span><strong>can block or alter binding</strong></article></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Avoid the lock-and-key model as literal rigid geometry. Emphasize dynamic binding and transition-state stabilization.
-->

---

# Investigation II · compare catalytic pathways

<div class="investigation-layout">
  <div class="investigation-brief"><p class="scene-kicker">Hydrogen peroxide decomposition</p><h2>How should catalytic activity be compared?</h2><p>Measure oxygen production with catalase-containing tissue or an inorganic catalyst under controlled conditions.</p><p><strong>Design for an initial rate</strong>, not only final gas volume.</p></div>
  <div class="investigation-method"><div class="method-row"><strong>measure</strong><span>oxygen volume or pressure at short fixed intervals</span></div><div class="method-row"><strong>normalize</strong><span>per mass, exposed area, or enzyme amount</span></div><div class="method-row"><strong>control</strong><span>[H₂O₂], total volume, temperature, pH, mixing</span></div><div class="method-row"><strong>check</strong><span>leaks, oxygen background, repeatability</span></div><div class="method-row"><strong>safety</strong><span>dilute reagent, eye protection, heat awareness, local risk assessment</span></div></div>
</div>

<!--
[Timing] 10 minutes planning; practical time set by teacher
[Teacher prompt] Students defend the normalization denominator before seeing data.
-->

---

<div class="tok-layout"><div class="tok-mark">TOK</div><div class="tok-copy"><p class="eyebrow">A catalyst changes what is practicable</p><h1>When does a faster route become a new technology?</h1><p class="tok-question">Haber–Bosch altered food production and warfare; catalytic converters altered urban air chemistry.</p><p>Scientific knowledge describes pathways. Engineering, economics, policy, and values determine which pathways become infrastructures.</p></div></div>

<!-- [Timing] 7 minutes -->

---

<QuickCheck
  label="Checkpoint 3"
  question="Which quantity is changed directly when a catalyst is added at constant temperature?"
  :options="['The equilibrium constant', 'The reaction enthalpy', 'The activation energy of the pathway', 'The energy of the products']"
  :answer="2"
  explanation="A catalyst provides another mechanism with a lower activation barrier. Reactant and product state energies—and therefore ΔH and K at fixed temperature—are unchanged."
/>

<!-- [Timing] 4 minutes -->

---
class: act-slide
---

<div class="act-scene">
  <img :src="'images/ammonia-reactor.jpg'" alt="Historic multi-part high-pressure chemical reactor" />
  <div class="act-copy"><p class="eyebrow">Act IV · Infer · HL</p><h1>The overall equation hides the route</h1><p>Mechanisms turn one observed change into a sequence of elementary events.</p></div>
</div>

<!-- [Timing] 2 minutes -->

---
class: thesis-slide
---

<p class="eyebrow">Reactivity 2.2.6 · Stepwise reactions · HL</p>

# A mechanism is a testable proposal, not a slowed-down movie.

<p class="thesis">Elementary steps must add to the overall equation and generate kinetic predictions consistent with experiment.</p>
<p class="thesis-foot">Many imaginable routes fit an equation. Evidence eliminates most of them.</p>

<!--
[Timing] 4 minutes
[Teacher prompt] Ask why atom conservation alone cannot establish a mechanism.
[Sources]
- https://goldbook.iupac.org/terms/view/R05162 — IUPAC reaction mechanism.
[/Sources]
-->

---

# Follow one proposed mechanism without moving the scene

<MechanismStepper />

<!--
[Timing] 8 minutes
[Teacher prompt] Add steps aloud. Identify F radical as an intermediate and the first step as rate-determining in the simplified model.
-->

---

# Intermediate and transition state are not synonyms

<div class="split-claim">
  <article class="soft-green"><p class="scene-kicker">Intermediate</p><h2>A valley on the profile</h2><p>Formed in one step, consumed in another; may sometimes be detected.</p><strong>finite lifetime · local minimum</strong></article>
  <article class="soft-rust"><p class="scene-kicker">Transition state</p><h2>A peak on the profile</h2><p>An activated configuration at the barrier; not isolated as a bottleable species.</p><strong>‡ · local maximum</strong></article>
</div>

<!-- [Timing] 5 minutes -->

---

<p class="eyebrow">Reactivity 2.2.7 · Energy profiles · HL</p>

# Peaks and valleys reveal a stepwise route

<EnergyProfileLab />

<!--
[Timing] 8 minutes
[Teacher prompt] In multistep mode, count steps, transition states, and intermediates. Identify the largest barrier from the preceding valley.
-->

---

# The slow step can control the observed rate law

<div class="bottleneck-stage">
  <div class="bottleneck-rate"><p class="scene-kicker">Proposed slow step</p><strong>NO₂ + F₂ → NO₂F + F•</strong></div>
  <div class="bottleneck-prediction"><span>elementary-step prediction</span><strong>rate = k[NO₂][F₂]</strong></div>
  <p>If experiment disagrees, this mechanism—or the assumption that this is the controlling step—must be revised.</p>
</div>

<!-- [Timing] 5 minutes -->

---
class: thesis-slide
---

<p class="eyebrow">Reactivity 2.2.8 · Molecularity · HL</p>

# Molecularity belongs to an elementary step.

<p class="thesis">It counts the reacting particles in that event: unimolecular, bimolecular, or rarely termolecular.</p>
<p class="thesis-foot">Do not assign molecularity to an overall multistep equation.</p>

<!--
[Timing] 3 minutes
[Sources]
- https://goldbook.iupac.org/terms/view/M03984 — IUPAC molecularity.
[/Sources]
-->

---

# Count participants—but first ask whether the step is elementary

<MolecularitySort />

<!--
[Timing] 6 minutes
[Teacher prompt] The third equation is termolecular only if independently established as one elementary event; overall stoichiometry alone is insufficient.
-->

---

# Three traces can support one mechanism

<MechanismEvidence />

<!--
[Timing] 7 minutes
[Teacher prompt] Reveal independently. For each trace ask: supports, proves, or merely remains consistent with?
-->

---

<QuickCheck
  label="Checkpoint 4 · HL"
  question="A proposed mechanism contains two elementary steps and one intermediate. What must be true?"
  :options="['The overall reaction is bimolecular', 'The intermediate appears in the overall equation', 'The energy profile has two maxima', 'Both steps have the same activation energy']"
  :answer="2"
  explanation="Each elementary step passes through a transition state, producing one maximum per step. An intermediate cancels from the summed overall equation."
/>

<!-- [Timing] 4 minutes -->

---
class: act-slide
---

<div class="act-scene arrhenius-act">
  <img :src="'images/arrhenius.jpg'" alt="Portrait of physical chemist Svante Arrhenius" />
  <div class="act-copy"><p class="eyebrow">Act V · Predict · HL</p><h1>Extract the law from the data</h1><p>Orders describe concentration dependence; Arrhenius connects the rate constant to temperature.</p></div>
</div>

<!--
[Timing] 2 minutes
[Sources]
- https://commons.wikimedia.org/wiki/File:Portrait_of_Svante_Arrhenius_(1859-1927),_Chemist_and_Physicist_(2536015089)_(cropped).jpg — Smithsonian Institution, no known copyright restrictions.
[/Sources]
-->

---
class: thesis-slide
---

<p class="eyebrow">Reactivity 2.2.9 · Rate equations · HL</p>

# The rate law is experimental evidence.

<p class="thesis formula-thesis">rate = k[A]<sup>m</sup>[B]<sup>n</sup></p>
<p class="thesis-foot">Orders m and n are measured. They usually cannot be copied from the overall equation.</p>

<!--
[Timing] 4 minutes
[Sources]
- https://goldbook.iupac.org/terms/view/R05141 — IUPAC rate law.
[/Sources]
-->

---

# Initial rates isolate one concentration at a time

<InitialRatesLab />

<!--
[Timing] 9 minutes
[Teacher prompt] Students must name the paired experiments before deducing each exponent. Then calculate k and its units.
-->

---

<p class="eyebrow">Reactivity 2.2.10 · Order of reaction · HL</p>

# Order is a response, not a coefficient

<div class="order-response">
  <article><span>zero order</span><strong>doubling [A] → rate ×1</strong><p>rate independent of [A]</p></article>
  <article><span>first order</span><strong>doubling [A] → rate ×2</strong><p>rate proportional to [A]</p></article>
  <article><span>second order</span><strong>doubling [A] → rate ×4</strong><p>rate proportional to [A]²</p></article>
</div>
<p class="caveat">Orders may be zero, positive, negative, or fractional. The simple cases are starting points.</p>

<!-- [Timing] 5 minutes -->

---

# Concentration–time traces carry order signatures

<OrderTrace />

<!--
[Timing] 8 minutes
[Teacher prompt] Compare curve shape, linearizing transform, and half-life behaviour. Do not identify order from appearance alone when data are noisy.
-->

---

<p class="eyebrow">Reactivity 2.2.11 · Rate constant · HL</p>

# Units of k repair the dimensions

<div class="units-stage">
  <div class="unit-rule"><p class="scene-kicker">Overall order = m + n</p><strong>[k] = (mol dm⁻³)<sup>1−order</sup> s⁻¹</strong></div>
  <div class="unit-cases"><article><span>zero</span><strong>mol dm⁻³ s⁻¹</strong></article><article><span>first</span><strong>s⁻¹</strong></article><article><span>second</span><strong>dm³ mol⁻¹ s⁻¹</strong></article><article><span>third</span><strong>dm⁶ mol⁻² s⁻¹</strong></article></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Derive rather than memorize. Start with rate units and divide by concentration terms.
-->

---

# Integrated forms turn rate laws into testable straight-line plots

<div class="integrated-laws">
  <article><p class="scene-kicker">zero order</p><strong>[A] = [A]₀ − kt</strong><span>plot [A] vs t</span></article>
  <article><p class="scene-kicker">first order</p><strong>ln[A] = ln[A]₀ − kt</strong><span>plot ln[A] vs t</span></article>
  <article><p class="scene-kicker">second order</p><strong>1/[A] = 1/[A]₀ + kt</strong><span>plot 1/[A] vs t</span></article>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Students identify slope and intercept for each form. Discuss why linearization can distort uncertainty.
-->

---

# Half-life is diagnostic only when its behaviour is understood

<div class="half-life-stage">
  <div class="half-life-focus"><span>first order</span><strong>t½ = ln 2 / k</strong><p>independent of starting concentration</p></div>
  <div class="half-life-contrast"><article><span>zero order</span><strong>t½ grows with [A]₀</strong></article><article><span>second order</span><strong>t½ shrinks as [A]₀ grows</strong></article></div>
</div>

<!-- [Timing] 5 minutes -->

---

# From observation to law: a short data test

<div class="data-critique compact-test">
  <table><thead><tr><th>t / s</th><th>[A] / mol dm⁻³</th><th>ln[A]</th></tr></thead><tbody><tr><td>0</td><td>0.800</td><td>−0.223</td></tr><tr><td>20</td><td>0.566</td><td>−0.569</td></tr><tr><td>40</td><td>0.400</td><td>−0.916</td></tr><tr><td>60</td><td>0.283</td><td>−1.263</td></tr></tbody></table>
  <div class="critique-prompts"><p class="scene-kicker">Test before reveal</p><h2>What order is supported?</h2><p v-click><strong>First order:</strong> ln[A] falls by approximately 0.347 every 20 s.</p><p v-click><strong>k ≈ 0.0173 s⁻¹</strong></p><p v-click><strong>t½ ≈ 40 s</strong></p></div>
</div>

<!-- [Timing] 7 minutes -->

---

<div class="image-story">
  <figure class="portrait"><img :src="'images/arrhenius.jpg'" alt="Svante Arrhenius portrait" /><figcaption>Svante Arrhenius · 1859–1927</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">1889 · temperature becomes an equation</p><h2>Arrhenius connected k to an exponential barrier.</h2><p>Building on physical chemistry developed by van ’t Hoff and others, Arrhenius proposed the temperature dependence now written:</p><p class="claim formula-card"><strong>k = A e<sup>−Eₐ/RT</sup></strong></p></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Explain why an exponential relationship makes modest temperature changes chemically important.
[Sources]
- https://www.nobelprize.org/prizes/chemistry/1903/arrhenius/biographical/ — Nobel biography.
- https://commons.wikimedia.org/wiki/File:Portrait_of_Svante_Arrhenius_(1859-1927),_Chemist_and_Physicist_(2536015089)_(cropped).jpg — image provenance.
[/Sources]
-->

---

# Five moments in the making of chemical kinetics

<div class="dated-events kinetics-history">
  <article><span>1850</span><div><h2>Wilhelmy</h2><p>Quantitative concentration–time study of sucrose inversion.</p></div></article>
  <article><span>1884</span><div><h2>van ’t Hoff</h2><p>Systematic studies of reaction rate and temperature.</p></div></article>
  <article><span>1889</span><div><h2>Arrhenius</h2><p>Exponential temperature dependence of rate constants.</p></div></article>
  <article><span>1913</span><div><h2>Michaelis & Menten</h2><p>Mechanistic kinetics of enzyme-catalysed reactions.</p></div></article>
  <article><span>1935</span><div><h2>Eyring, Evans & Polanyi</h2><p>Transition-state theory links rates to activated complexes.</p></div></article>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] This is a chronology of models and measurements, not a lone-genius story. Ask what instruments and mathematical ideas each step required.
[Sources]
- https://www.sciencehistory.org/historical-profile/svante-arrhenius/ — Science History Institute.
[/Sources]
-->

---

<p class="eyebrow">Reactivity 2.2.12 · Arrhenius equation · HL</p>

# Arrhenius turns a curve into a slope

<ArrheniusExplorer />

<!--
[Timing] 9 minutes
[Teacher prompt] Change Eₐ and describe the slope. Change T and describe motion along one line. Distinguish these two operations.
-->

---
class: thesis-slide
---

<p class="eyebrow">Reactivity 2.2.13 · Arrhenius factor · HL</p>

# A is not merely “collision frequency.”

<p class="thesis">The pre-exponential factor gathers encounter frequency and the probability that molecular configuration is suitable for reaction.</p>
<p class="thesis-foot">Its interpretation depends on the kinetic model.</p>

<!--
[Timing] 4 minutes
[Teacher prompt] Connect A to the orientation gate from Act II, while noting that transition-state theory gives a different but related formulation.
[Sources]
- https://goldbook.iupac.org/terms/view/P04806 — pre-exponential factor.
[/Sources]
-->

---

<div class="image-story reverse">
  <figure><img :src="'images/cold-storage.jpg'" alt="Food stored in a refrigerated facility" /><figcaption>Cold chain · kinetics at scale</figcaption></figure>
  <div class="story-copy"><p class="scene-kicker">A real Arrhenius decision</p><h2>A few degrees can change shelf life.</h2><p>Microbial growth, oxidation, enzymatic browning, and nutrient loss each have their own temperature dependence.</p><p class="claim">A cold chain is an attempt to keep many unwanted <strong>rate constants small</strong> from producer to consumer.</p></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Ask why one universal “shelf-life activation energy” is scientifically suspect for a complex food.
[Sources]
- https://commons.wikimedia.org/wiki/File:Cold_Storage_in_Horticulture_(32778116712).jpg — photograph.
- https://www.fda.gov/consumers/consumer-updates/are-you-storing-food-safely — FDA cold-storage guidance.
[/Sources]
-->

---

# Synthesis · every representation answers a different question

<div class="synthesis-stage">
  <article><span>trace</span><strong>How fast?</strong><p>concentration, volume, absorbance, pressure</p></article>
  <article><span>particles</span><strong>Why does a factor matter?</strong><p>encounters, energy, orientation, accessible sites</p></article>
  <article><span>profile</span><strong>Which pathway?</strong><p>barriers, transition states, intermediates</p></article>
  <article><span>rate law</span><strong>What does data demand?</strong><p>orders, k, mechanism constraints</p></article>
  <article><span>Arrhenius</span><strong>How does T change k?</strong><p>Eₐ, A, reciprocal-temperature plot</p></article>
</div>

<!--
[Timing] 7 minutes
[Teacher prompt] Give one unfamiliar reaction scenario. Students choose which representation they need first and defend the choice.
-->

---

<QuickCheck
  label="Exit test · integrate the unit"
  question="A catalyst is added and temperature is then increased. Which pair of model changes is correct?"
  :options="['Lower ΔH; larger equilibrium constant', 'Lower pathway Eₐ; larger k', 'Higher product energy; larger A only', 'Lower collision frequency; smaller k']"
  :answer="1"
  explanation="The catalyst supplies a lower-barrier pathway. Increasing temperature increases k according to Arrhenius behaviour. Neither statement requires a change in ΔH."
/>

<!--
[Timing] 5 minutes
[Teacher prompt] Require students to connect their choice to an energy profile and to the Arrhenius equation.
-->

---
class: closing-slide
---

<div class="closing-scene"><img :src="'images/iodine-clock.jpg'" alt="Dark blue iodine clock reaction" /><div class="closing-copy"><p class="eyebrow">Reactivity 2.2 · complete</p><h1>A rate is not just a number. It is evidence about a hidden route.</h1><p>Measure carefully. Change one condition. Let the mechanism earn its place.</p></div></div>

<!-- [Timing] 2 minutes -->
