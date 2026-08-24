---
theme: default
title: Particles, Equations, and Moles
info: |
  Grade 8 chemistry: a two-lesson conceptual bridge from formulae and concentration to stoichiometry.
author: Grade 8 Chemistry
class: chemistry-deck
colorSchema: light
canvasWidth: 1280
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: fade
mdc: true
---

<div class="cover-layout">
  <div class="cover-copy">
    <p class="kicker">Grade 8 chemistry · 24–28 Aug</p>
    <h1>Particles, equations,<br />and moles</h1>
    <p class="subtitle">How chemists count matter and predict reactions</p>
  </div>

  <div class="cover-portraits" aria-label="Chemists featured in the lessons">
    <figure><img :src="'images/lavoisier.jpg'" alt="Portrait of Antoine Lavoisier" /><figcaption>Lavoisier</figcaption></figure>
    <figure><img :src="'images/avogadro.jpg'" alt="Portrait of Amedeo Avogadro" /><figcaption>Avogadro</figcaption></figure>
    <figure><img :src="'images/haber.jpg'" alt="Portrait of Fritz Haber" /><figcaption>Haber</figcaption></figure>
    <figure><img :src="'images/bosch.jpg'" alt="Portrait of Carl Bosch" /><figcaption>Bosch</figcaption></figure>
  </div>
</div>

<!--
Presenter notes:
Timing: 1 minute.
Open with the title question: how can a chemist predict the amount of a product before running the reaction?
Explain that the historical figures are here because each helped chemistry move from descriptions toward quantitative prediction.
[Sources]
- Procedural and visual inspiration: https://github.com/urkrass/science-revolutions-method-slidev
- Lavoisier portrait, public domain: https://commons.wikimedia.org/wiki/File:David_-_Portrait_of_Monsieur_Lavoisier_(cropped).jpg
- Avogadro portrait, public domain: https://commons.wikimedia.org/wiki/File:Portrait_of_Amedeo_Avogadro_-_DPLA_-_7da5faaef3f7cf4a4ad788f9e7453549.jpg
- Haber and Bosch portraits: Nobel Foundation Archive, https://www.nobelprize.org/prizes/chemistry/1918/haber/facts/ and https://www.nobelprize.org/prizes/chemistry/1931/bosch/facts/
-->

---
class: statement-slide
---

# The same chemistry sits inside ordinary life

<div class="world-map">
  <div class="world-centre">
    <strong>count the particles</strong>
    <span>then keep the ratio</span>
  </div>
  <p class="world-item farm"><b>farm</b><span>ammonia for fertiliser</span></p>
  <p class="world-item road"><b>road</b><span>catalytic converters</span></p>
  <p class="world-item body"><b>body</b><span>antacid neutralisation</span></p>
  <p class="world-item building"><b>building</b><span>limestone to cement</span></p>
  <p class="world-item lab"><b>lab</b><span>solutions and dilution</span></p>
</div>

<!--
Presenter notes:
Timing: 2 minutes.
Use the examples only to establish breadth. Students will meet each case again after the underlying ideas are built.
Ask which example feels most familiar and which feels most surprising.
[Sources]
- Nobel Prize overview of ammonia and fertiliser: https://www.nobelprize.org/prizes/chemistry/2007/8923-nitrogen-becomes-artificial-fertilizer/
- Nobel Prize press release on catalytic surfaces and clean exhaust: https://www.nobelprize.org/prizes/chemistry/2007/press-release/
- OpenStax on calcium carbonate antacids: https://openstax.org/books/chemistry-2e/pages/18-6-occurrence-preparation-and-properties-of-carbonates
- USGS limestone uses: https://pubs.usgs.gov/fs/2008/3089/fs2008-3089.pdf
-->

---
class: diagnostic-slide
---

# First, show what you already know

<DiagnosticRound />

<!--
Presenter notes:
Timing: 5 minutes.
Treat this as a quick entry map, not an assessment grade. Students answer on paper while the screen advances.
Expected answers: 2.0 mol; one Ca and two Cl atoms per formula unit; 2,1,2; 2.0 mol dm^-3; 0.40 mol dm^-3; 3 mol H2 and 4 mol NH3.
Reveal only enough to identify which conceptual links need attention.
[Sources]
- IUPAC amount concentration: https://goldbook.iupac.org/terms/view/A00295
- IUPAC molar mass: https://goldbook.iupac.org/terms/view/12214
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: matrix-slide
---

# Uncertainty usually begins at one connection

<div class="diagnostic-map">
  <div><span>mass</span><strong>n = m / M</strong><small>grams become moles</small></div>
  <div><span>formula</span><strong>symbols + subscripts</strong><small>identity of the substance</small></div>
  <div><span>equation</span><strong>balanced coefficients</strong><small>atoms are conserved</small></div>
  <div><span>solution</span><strong>c = n / V</strong><small>amount per volume</small></div>
  <div><span>reaction</span><strong>mole ratio</strong><small>one substance becomes another</small></div>
</div>

<p class="quiet-prompt">Keep one uncertain connection in mind; the lesson will rebuild each one.</p>

<!--
Presenter notes:
Timing: 2 minutes.
Students mark one connection that felt secure and one that felt uncertain.
Do not correct every diagnostic item now. The next sequence explains why each relationship works.
-->

---
class: timeline-slide
---

# Chemical calculation grew from a series of counting ideas

<div class="history-timeline">
  <div><span>1789</span><strong>Lavoisier</strong><p>Measure mass before and after reaction.</p></div>
  <div><span>1803</span><strong>Dalton</strong><p>Explain matter using atoms in simple ratios.</p></div>
  <div><span>1811</span><strong>Avogadro</strong><p>Separate the ideas of atoms and molecules.</p></div>
  <div><span>1909–13</span><strong>Haber & Bosch</strong><p>Scale a mole ratio into an industry.</p></div>
  <div><span>2019</span><strong>The SI mole</strong><p>Fix one mole as an exact number of entities.</p></div>
</div>

<!--
Presenter notes:
Timing: 2 minutes.
Present this as a conceptual lineage, not a list to memorise.
The key movement is from weighing matter, to imagining particles, to counting equal collections, to controlling reactions at scale.
[Sources]
- Science History Institute on Lavoisier and mass conservation: https://www.sciencehistory.org/education/scientific-biographies/antoine-laurent-lavoisier/
- NIST history and definition of the mole: https://www.nist.gov/si-redefinition/redefining-mole and https://www.nist.gov/pml/special-publication-330/sp-330-section-2
- Nobel Prize facts for Haber and Bosch: https://www.nobelprize.org/prizes/chemistry/1918/haber/facts/ and https://www.nobelprize.org/prizes/chemistry/1931/bosch/facts/
-->

---
class: portrait-slide
---

# Balancing begins with Lavoisier’s scale

<div class="portrait-layout">
  <figure class="portrait-image tall"><img :src="'images/lavoisier.jpg'" alt="Portrait of Antoine Lavoisier" /><figcaption>Antoine Lavoisier · 1743–1794</figcaption></figure>
  <div class="portrait-argument">
    <p class="micro-kicker">Conservation of mass</p>
    <p class="portrait-claim">In a closed system, a reaction rearranges matter; it does not make matter disappear.</p>
    <div class="scale-idea" aria-label="Mass before equals mass after">
      <span>mass of reactants</span><b>=</b><span>mass of products</span>
    </div>
    <p class="support">A balanced equation is the particle-language version of that observation.</p>
  </div>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Explain that Lavoisier weighed substances carefully, including gases, and helped establish conservation of mass in chemical transformations.
Connect the physical scale to the atom count: if atoms are retained, each element must appear equally on both sides.
[Sources]
- Science History Institute biography: https://www.sciencehistory.org/education/scientific-biographies/antoine-laurent-lavoisier/
- Science History Institute on Lavoisier's instruments and closed-system measurements: https://www.sciencehistory.org/stories/magazine/revolutionary-instruments-lavoisiers-tools-as-objets-dart/
- Portrait, public domain: https://commons.wikimedia.org/wiki/File:David_-_Portrait_of_Monsieur_Lavoisier_(cropped).jpg
-->

---
class: comparison-slide
---

# A chemical formula fixes the identity of a substance

<div class="identity-comparison">
  <div class="identity-main">
    <span>water</span>
    <strong>H₂O</strong>
    <p>two H atoms for every one O atom</p>
  </div>
  <div class="identity-shift">
    <span>change the subscript</span>
    <strong>H₂O₂</strong>
    <p>hydrogen peroxide — a different substance</p>
  </div>
</div>

<div class="formula-reading">
  <p><b>CaCl₂</b><span>1 calcium : 2 chlorine</span></p>
  <p><b>Mg(OH)₂</b><span>1 magnesium : 2 oxygen : 2 hydrogen</span></p>
</div>

<!--
Presenter notes:
Timing: 2 minutes.
Distinguish a subscript from a coefficient before balancing begins.
Use Mg(OH)2 to show that a subscript outside brackets multiplies the whole group.
The visible examples are composition statements, not balancing instructions.
[Sources]
- IUPAC chemical formula definition: https://goldbook.iupac.org/terms/view/C01061
-->

---
class: comparison-slide
---

# “Particle” can mean an atom, molecule, ion, or formula unit

<div class="entity-comparison">
  <div>
    <p class="entity-symbol">He</p>
    <strong>atom</strong>
    <span>one helium atom</span>
  </div>
  <div>
    <p class="entity-symbol">O₂</p>
    <strong>molecule</strong>
    <span>two bonded oxygen atoms</span>
  </div>
  <div>
    <p class="entity-symbol">Na⁺</p>
    <strong>ion</strong>
    <span>a charged sodium particle</span>
  </div>
  <div>
    <p class="entity-symbol">NaCl</p>
    <strong>formula unit</strong>
    <span>simplest ionic ratio, not one molecule</span>
  </div>
</div>

<p class="quiet-prompt">A mole must always name the entity being counted.</p>

<!--
Presenter notes:
Timing: 2 minutes.
Stress that “one mole” is incomplete unless the counted entity is specified.
Use sodium chloride to prevent students treating every formula as a discrete molecule.
[Sources]
- NIST SI definition of amount of substance and elementary entities: https://www.nist.gov/pml/special-publication-330/sp-330-section-2
-->

---
class: portrait-slide
---

# Avogadro connected invisible particles with countable collections

<div class="portrait-layout reverse">
  <div class="portrait-argument">
    <p class="micro-kicker">A named constant, not his invention</p>
    <p class="portrait-claim">One mole contains exactly <strong>6.022 140 76 × 10²³</strong> specified entities.</p>
    <div class="count-examples">
      <span>1 mol H₂O = that many molecules</span>
      <span>1 mol NaCl = that many formula units</span>
    </div>
    <p class="support">Avogadro’s 1811 gas hypothesis helped chemists distinguish atoms from molecules; the mole was named later.</p>
  </div>
  <figure class="portrait-image paper"><img :src="'images/avogadro.jpg'" alt="Portrait of Amedeo Avogadro" /><figcaption>Amedeo Avogadro · 1776–1856</figcaption></figure>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
The exact number is useful context, but students do not need to multiply by it in today’s calculations.
Explain the everyday analogy: a dozen fixes a count of 12; a mole fixes a much larger count suitable for atoms and molecules.
[Sources]
- NIST SI definition of the mole: https://www.nist.gov/pml/special-publication-330/sp-330-section-2
- NIST history of Avogadro and the mole: https://www.nist.gov/si-redefinition/redefining-mole
- Portrait, public domain: https://commons.wikimedia.org/wiki/File:Portrait_of_Amedeo_Avogadro_-_DPLA_-_7da5faaef3f7cf4a4ad788f9e7453549.jpg
-->

---
class: formula-slide
---

# Molar mass lets a balance count moles

<div class="molar-mass-layout">
  <div class="formula-main">
    <span>amount of substance</span>
    <strong>n = m / M</strong>
    <small>mol = g ÷ g mol⁻¹</small>
  </div>
  <div class="molar-build">
    <p><span>CaCO₃</span><b>40 + 12 + (3 × 16)</b><strong>100 g mol⁻¹</strong></p>
    <p><span>25 g CaCO₃</span><b>25 ÷ 100</b><strong>0.25 mol</strong></p>
  </div>
</div>

<p class="case-note">The same formula appears in limestone and in many chewable antacids.</p>

<!--
Presenter notes:
Timing: 4 minutes.
Build the molar mass from the formula before using n=m/M. Emphasise that the formula determines which atomic masses are included.
Have students follow the units: grams cancel, leaving moles.
[Sources]
- IUPAC molar mass: https://goldbook.iupac.org/terms/view/12214
- NIST relation n = m/M: https://www.nist.gov/pml/special-publication-330/sp-330-appendix-4
- USGS on calcium carbonate in limestone and antacids: https://pubs.usgs.gov/fs/2008/3089/fs2008-3089.pdf
-->

---
class: diagram-slide
---

# An equation is a compressed story of change

<div class="equation-anatomy">
  <p class="anatomy-equation"><em>2</em>Mg<span>(s)</span> + O₂<span>(g)</span> → <em>2</em>MgO<span>(s)</span></p>
  <div class="anatomy-labels">
    <p class="coefficient-label"><strong>coefficient</strong><span>how many particles or moles</span></p>
    <p class="formula-label"><strong>formula</strong><span>which substance</span></p>
    <p class="state-label"><strong>state symbol</strong><span>solid, liquid, gas, or aqueous</span></p>
    <p class="arrow-label"><strong>reaction arrow</strong><span>reactants form products</span></p>
  </div>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Read the equation as a sentence, including the physical states.
Clarify that the arrow means “reacts to form”; it is not an equals sign.
Point out that coefficients can be changed during balancing, while formulae and state symbols describe substance identity and condition.
[Sources]
- IUPAC chemical reaction equation: https://goldbook.iupac.org/terms/view/C01034
-->

---
class: flow-slide
---

# Conservation chooses the coefficients

<div class="balance-method">
  <div><span>1</span><strong>write correct formulae</strong><p>Do not repair a wrong formula by balancing.</p></div>
  <b>→</b>
  <div><span>2</span><strong>count each element</strong><p>Compare reactant and product totals.</p></div>
  <b>→</b>
  <div><span>3</span><strong>adjust coefficients</strong><p>Change whole particles, never subscripts.</p></div>
  <b>→</b>
  <div><span>4</span><strong>recount and simplify</strong><p>Use the smallest whole-number ratio.</p></div>
</div>

<div class="balance-example">
  <span>unbalanced</span><strong>H₂ + O₂ → H₂O</strong><b>becomes</b><strong>2H₂ + O₂ → 2H₂O</strong>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Model the reasoning order. Oxygen is odd on the product side, so make two water molecules, then repair hydrogen.
Explain that 4:2:4 conserves atoms but is not the simplest coefficient set.
[Sources]
- IUPAC chemical reaction equation: https://goldbook.iupac.org/terms/view/C01034
- Science History Institute on conservation of mass: https://www.sciencehistory.org/education/scientific-biographies/antoine-laurent-lavoisier/
-->

---
class: interactive-slide
---

# Watch the atom ledger while the equation changes

<BalanceLab />

<!--
Presenter notes:
Timing: 4 minutes.
Use this as a short demonstration rather than extended practice. Invite predictions before each coefficient change.
Once 2:1:2 is reached, ask what the atom ledger proves and why the formula H2O never changed.
-->

---
class: concept-slide
---

# Concentration compares amount with occupied volume

<div class="solution-story">
  <div class="solution-vessel concentrated" aria-label="A smaller volume containing six solute particles">
    <span v-for="i in 6" :key="`c-${i}`"></span>
  </div>
  <div class="solution-language">
    <p><strong>solute</strong><span>the substance being dissolved</span></p>
    <p><strong>solvent</strong><span>the substance doing the dissolving</span></p>
    <p><strong>solution</strong><span>the uniform mixture produced</span></p>
  </div>
  <p class="concentration-claim"><strong>Concentration is not the amount itself.</strong><span>It tells how much solute is present per unit volume of solution.</span></p>
</div>

<!--
Presenter notes:
Timing: 2 minutes.
Separate three commonly confused ideas: the amount of solute, the total solution volume, and the concentration formed by comparing them.
Use the particle vessel qualitatively; no calculation yet.
[Sources]
- IUPAC amount concentration: https://goldbook.iupac.org/terms/view/A00295
-->

---
class: formula-slide
---

# The volume unit decides whether c = n / V works

<div class="concentration-layout">
  <div class="formula-main compact-formula">
    <span>amount concentration</span>
    <strong>c = n / V</strong>
    <small>mol dm⁻³ = mol ÷ dm³</small>
  </div>
  <div class="volume-story">
    <p><span>250 cm³</span><b>÷ 1000</b><strong>0.250 dm³</strong></p>
    <p><span>0.50 mol</span><b>÷ 0.250 dm³</b><strong>2.0 mol dm⁻³</strong></p>
    <small>For the same amount, a smaller volume means a larger concentration.</small>
  </div>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Pause before substitution to convert cm3 to dm3.
Use estimation: dividing by a quarter should make the numerical value four times larger.
[Sources]
- IUPAC amount concentration: https://goldbook.iupac.org/terms/view/A00295
-->

---
class: interactive-slide
---

# Dilution changes particle spacing, not solute amount

<DilutionVisual />

<!--
Presenter notes:
Timing: 3 minutes.
Use one or two clicks only. Students narrate what stays fixed and what changes.
If no solute is lost and no reaction occurs, n before = n after; therefore c1V1 = c2V2.
Connect this to real contexts such as preparing a less concentrated laboratory standard or reconstituting a drink, without turning the slide into a household chemical recipe.
[Sources]
- IUPAC amount concentration: https://goldbook.iupac.org/terms/view/A00295
-->

---
class: synthesis-slide
---

# Four quantities answer four different questions

<div class="quantity-orbit">
  <div class="quantity-centre"><strong>chemical sample</strong><span>name the substance first</span></div>
  <p class="q-mass"><b>mass</b><span>How heavy?</span><em>g</em></p>
  <p class="q-amount"><b>amount</b><span>How many mole-sized collections?</span><em>mol</em></p>
  <p class="q-volume"><b>volume</b><span>How much space?</span><em>dm³</em></p>
  <p class="q-conc"><b>concentration</b><span>How much amount per volume?</span><em>mol dm⁻³</em></p>
</div>

<!--
Presenter notes:
Timing: 1 minute.
Close lesson 1 by asking students to state which quantity each unit belongs to.
Preview lesson 2: the balanced equation will connect the amount of one substance to another.
-->

---
class: section-slide
---

<div class="section-copy">
  <span>Lesson 2</span>
  <h1>Ratios make reactions scale</h1>
  <p>How can one balanced equation predict a tablet, a car catalyst, or an industrial plant?</p>
</div>

<!--
Presenter notes:
Timing: 1 minute.
Retrieve the four lesson 1 quantities, then state today’s new bridge: the coefficient ratio connects moles of different substances.
[Sources]
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: history-case-slide
---

# Haber found the reaction; Bosch made it industrial

<div class="history-case">
  <div class="scientist-pair">
    <figure><img :src="'images/haber.jpg'" alt="Portrait of Fritz Haber" /><figcaption>Fritz Haber · laboratory synthesis</figcaption></figure>
    <figure><img :src="'images/bosch.jpg'" alt="Portrait of Carl Bosch" /><figcaption>Carl Bosch · high-pressure scale-up</figcaption></figure>
  </div>
  <div class="industrial-reaction">
    <p class="micro-kicker">Ammonia for fertiliser</p>
    <strong>N₂ + 3H₂ ⇌ 2NH₃</strong>
    <p>Every batch must respect the <b>1 : 3 : 2</b> relationship, whether the batch is measured in molecules or tonnes.</p>
  </div>
  <figure class="case-photo wide"><img :src="'images/fertilizer-works.jpg'" alt="Fertiliser works with industrial chemical equipment" /><figcaption>Industrial fertiliser works</figcaption></figure>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Explain the division of work: Haber demonstrated ammonia synthesis from nitrogen and hydrogen; Bosch developed the high-pressure industrial apparatus around 1913.
Use the case to show that stoichiometric ratios do not change with scale. Mention that industrial yield also depends on equilibrium, temperature, pressure, catalysts, and recycling, which are beyond today’s simple ratio model.
[Sources]
- Nobel Prize facts for Carl Bosch: https://www.nobelprize.org/prizes/chemistry/1931/bosch/facts/
- Nobel Prize material on Haber-Bosch and fertiliser: https://www.nobelprize.org/prizes/chemistry/2007/8923-nitrogen-becomes-artificial-fertilizer/
- Haber and Bosch portraits: Nobel Foundation Archive, https://www.nobelprize.org/prizes/chemistry/1918/haber/facts/ and https://www.nobelprize.org/prizes/chemistry/1931/bosch/facts/
- Fertiliser works photo, CC BY-SA 2.0: https://commons.wikimedia.org/wiki/File:Severnside_fertilizer_works_-_geograph.org.uk_-_189990.jpg
-->

---
class: interactive-slide
---

# One reaction can be read at three scales

<ReactionLens />

<!--
Presenter notes:
Timing: 3 minutes.
Switch once through particle, equation, and mole-ratio views.
Ask what remains invariant: two units of hydrogen react with one unit of oxygen to form two units of water.
The particle picture explains the equation; the mole ratio makes the same relationship measurable in the laboratory.
[Sources]
- IUPAC chemical reaction equation: https://goldbook.iupac.org/terms/view/C01034
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: diagram-slide
---

# Coefficients become a ratio only after balancing

<div class="ratio-derivation">
  <div class="particle-batches" aria-label="One nitrogen molecule, three hydrogen molecules, and two ammonia molecules">
    <p><span class="particle n2">N₂</span><b>1 group</b></p>
    <em>+</em>
    <p><span class="particle h2">H₂ H₂ H₂</span><b>3 groups</b></p>
    <em>→</em>
    <p><span class="particle nh3">NH₃ NH₃</span><b>2 groups</b></p>
  </div>
  <p class="ratio-equation">N₂ + 3H₂ → 2NH₃</p>
  <div class="ratio-meaning">
    <span>particle ratio <b>1 : 3 : 2</b></span>
    <span>mole ratio <b>1 : 3 : 2</b></span>
  </div>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Derive the ratio from the balanced coefficients. Do not include subscripts in the mole ratio.
Clarify that the equation can describe individual particle groups or equal mole-sized collections because both preserve proportional count.
[Sources]
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: table-slide
---

# Scaling multiplies every coefficient by the same factor

<div class="scale-table" role="table" aria-label="Scaling the ammonia reaction">
  <div role="row"><span role="columnheader">batch scale</span><strong role="columnheader">N₂</strong><strong role="columnheader">H₂</strong><strong role="columnheader">NH₃</strong></div>
  <div role="row"><span role="cell">one batch</span><b role="cell">1 mol</b><b role="cell">3 mol</b><b role="cell">2 mol</b></div>
  <div role="row"><span role="cell">ten batches</span><b role="cell">10 mol</b><b role="cell">30 mol</b><b role="cell">20 mol</b></div>
  <div role="row"><span role="cell">half a batch</span><b role="cell">0.5 mol</b><b role="cell">1.5 mol</b><b role="cell">1.0 mol</b></div>
</div>

<p class="quiet-prompt">A ratio preserves relationship, not size.</p>

<!--
Presenter notes:
Timing: 2 minutes.
Read across one row and then down one column.
Use the half-batch row to show that mole amounts need not be whole numbers even though balancing coefficients are written as smallest whole numbers.
-->

---
class: case-slide
---

# A car catalyst uses ratios to clean part of the exhaust

<div class="photo-case reverse-photo">
  <div class="case-copy">
    <p class="micro-kicker">Carbon monoxide oxidation</p>
    <p class="case-equation">2CO + O₂ → 2CO₂</p>
    <p class="case-claim">Two moles of toxic carbon monoxide require one mole of oxygen and form two moles of carbon dioxide.</p>
    <div class="case-ratio"><span>CO : O₂ : CO₂</span><strong>2 : 1 : 2</strong></div>
    <p class="support">The catalyst speeds the reaction; it does not alter the balanced ratio.</p>
  </div>
  <figure class="case-photo"><img :src="'images/catalytic-converter.jpg'" alt="Honeycomb interior of a catalytic converter" /><figcaption>Ceramic honeycomb inside a catalytic converter</figcaption></figure>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Explain that the large honeycomb surface carries catalyst material and exposes exhaust gases to reaction sites.
Keep the chemistry scoped: the slide models oxidation of CO, one of several reactions in a three-way catalytic converter.
[Sources]
- Nobel Prize press release on carbon monoxide oxidation in car catalysts: https://www.nobelprize.org/prizes/chemistry/2007/press-release/
- Catalytic converter interior photo, CC0: https://commons.wikimedia.org/wiki/File:Catalytic_Converter_Interior.jpg
-->

---
class: case-slide
---

# An antacid equation explains both bubbles and a 1 : 2 ratio

<div class="antacid-case">
  <div class="tablet-scene" aria-label="A calcium carbonate tablet reacting and releasing gas bubbles">
    <div class="glass"><span class="tablet">CaCO₃</span><i v-for="i in 9" :key="i"></i></div>
    <p>carbon dioxide bubbles</p>
  </div>
  <div class="case-copy">
    <p class="micro-kicker">Acid–carbonate reaction</p>
    <p class="case-equation compact">CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂</p>
    <p class="case-claim">One mole of calcium carbonate reacts with two moles of hydrochloric acid.</p>
    <div class="case-ratio"><span>CaCO₃ : HCl</span><strong>1 : 2</strong></div>
  </div>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Connect visible bubbles to carbon dioxide in the products.
This is a simplified chemical model of calcium carbonate reacting with hydrochloric acid; commercial antacids may contain other ingredients.
[Sources]
- OpenStax carbonate properties and antacid reaction: https://openstax.org/books/chemistry-2e/pages/18-6-occurrence-preparation-and-properties-of-carbonates
-->

---
class: case-slide
---

# Limestone links a quarry to a mass prediction

<div class="photo-case">
  <figure class="case-photo"><img :src="'images/limestone-quarry.jpg'" alt="Limestone quarry beside a cement works" /><figcaption>Limestone quarry beside a cement works</figcaption></figure>
  <div class="case-copy">
    <p class="micro-kicker">Thermal decomposition</p>
    <p class="case-equation">CaCO₃ → CaO + CO₂</p>
    <p class="case-claim">Limestone supplies calcium carbonate; heating produces calcium oxide, a material used in cement manufacture.</p>
    <div class="mass-preview"><span>100 g CaCO₃</span><b>can form</b><strong>56 g CaO</strong></div>
  </div>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
State that this is a theoretical calculation for pure calcium carbonate and complete reaction. Real rock contains impurities and real processes have losses.
The next slides explain why 100 g does not become 100 g of calcium oxide: carbon dioxide leaves as another product.
[Sources]
- USGS: limestone is mainly calcium carbonate and is a raw material for Portland cement: https://pubs.usgs.gov/fs/2008/3089/fs2008-3089.pdf
- USGS cement primer on limestone and CaO: https://pubs.usgs.gov/of/2005/1152/2005-1152.pdf
- Quarry photo, CC BY-SA 2.0: https://commons.wikimedia.org/wiki/File:Limestone_quarry,_Dunbar_Cement_Works_-_geograph.org.uk_-_6833222.jpg
-->

---
class: comparison-slide
---

# Coefficients compare moles, not equal masses

<div class="mole-mass-comparison">
  <div>
    <span>balanced equation</span>
    <strong>2H₂ + O₂ → 2H₂O</strong>
    <p>mole ratio <b>2 : 1 : 2</b></p>
  </div>
  <div>
    <span>after molar masses</span>
    <strong>4 g + 32 g → 36 g</strong>
    <p>mass relationship <b>4 : 32 : 36</b></p>
  </div>
</div>

<p class="quiet-prompt">The equation ratio works between mole amounts; molar mass converts those moles into grams.</p>

<!--
Presenter notes:
Timing: 3 minutes.
Use rounded molar masses: H2 = 2 g/mol, O2 = 32 g/mol, H2O = 18 g/mol.
Point out the conservation check: 4 g + 32 g = 36 g.
-->

---
class: flow-slide
---

# Mass–mass problems must pass through moles

<div class="generic-path" aria-label="General mass to mass stoichiometry path">
  <div><span>given</span><strong>mass A</strong><small>g</small></div>
  <b>÷ M(A)</b>
  <div><span>convert</span><strong>moles A</strong><small>mol</small></div>
  <b class="ratio-bridge">coefficient ratio</b>
  <div><span>convert</span><strong>moles B</strong><small>mol</small></div>
  <b>× M(B)</b>
  <div><span>answer</span><strong>mass B</strong><small>g</small></div>
</div>

<div class="path-questions">
  <span>Which substance do I know?</span>
  <span>Where does the equation enter?</span>
  <span>Which substance is requested?</span>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
This is the core process slide. Have students say the five-part path: grams, moles, ratio, moles, grams.
Emphasise that the chemical label changes at the ratio step while the unit remains mol.
[Sources]
- IUPAC molar mass: https://goldbook.iupac.org/terms/view/12214
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: worked-case-slide
---

# In the limestone case, the ratio step is 1 : 1

<div class="worked-limestone">
  <p class="worked-equation">CaCO₃ → CaO + CO₂</p>
  <div class="worked-steps">
    <div><span>1 · given mass</span><strong>250 g CaCO₃</strong><small>pure sample</small></div>
    <div><span>2 · moles CaCO₃</span><strong>250 ÷ 100 = 2.50 mol</strong><small>M(CaCO₃) = 100 g mol⁻¹</small></div>
    <div><span>3 · coefficient ratio</span><strong>1 : 1 → 2.50 mol CaO</strong><small>the substance changes</small></div>
    <div><span>4 · mass CaO</span><strong>2.50 × 56 = 140 g</strong><small>M(CaO) = 56 g mol⁻¹</small></div>
  </div>
  <p class="conservation-check">The remaining theoretical mass is in CO₂: 250 g = 140 g + 110 g.</p>
</div>

<!--
Presenter notes:
Timing: 4 minutes.
Work the example as a narrated case, not silent practice.
At each step, name both the unit and the substance. The 1:1 ratio leaves the numerical mole amount unchanged but changes CaCO3 to CaO.
Use the final conservation check to reconnect stoichiometry with Lavoisier.
[Sources]
- USGS limestone and cement uses: https://pubs.usgs.gov/fs/2008/3089/fs2008-3089.pdf
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: matrix-slide
---

# Different industries read different meanings from the same kind of ratio

<div class="case-matrix">
  <div><span>fertiliser</span><strong>N₂ + 3H₂ → 2NH₃</strong><p>feed gases must enter in a 1 : 3 relationship</p></div>
  <div><span>cleaner exhaust</span><strong>2CO + O₂ → 2CO₂</strong><p>one mole O₂ can oxidise two moles CO</p></div>
  <div><span>antacid</span><strong>CaCO₃ + 2HCl → …</strong><p>one mole carbonate can use two moles acid</p></div>
  <div><span>cement materials</span><strong>CaCO₃ → CaO + CO₂</strong><p>one mole limestone compound forms one mole lime</p></div>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Use this matrix to widen transfer. Students need not calculate each case; they should identify what the coefficients allow a chemist to predict.
Ask which cases have a 1:1 relationship and which contain a factor of 2 or 3.
[Sources]
- Nobel Prize material on fertiliser and clean exhaust: https://www.nobelprize.org/prizes/chemistry/2007/press-release/
- OpenStax antacid reaction: https://openstax.org/books/chemistry-2e/pages/18-6-occurrence-preparation-and-properties-of-carbonates
- USGS limestone uses: https://pubs.usgs.gov/fs/2008/3089/fs2008-3089.pdf
-->

---
class: interactive-slide
---

# A guided mole path makes every conversion visible

<MolePath />

<!--
Presenter notes:
Timing: 4 minutes.
Advance each stage only after students predict the operation.
Problem: 2Mg + O2 -> 2MgO; find the mass of MgO from 12 g Mg using M(Mg)=24 g/mol and M(MgO)=40 g/mol.
Answer: 20 g MgO. Ask where the equation is used: only between moles Mg and moles MgO.
[Sources]
- IUPAC molar mass: https://goldbook.iupac.org/terms/view/12214
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: metaphor-slide
---

# A reaction ratio behaves like a recipe with leftovers

<div class="recipe-metaphor">
  <div class="recipe-visual" aria-label="Two bread pieces and one filling make one sandwich">
    <span class="bread">bread</span><b>+</b><span class="filling">filling</span><b>+</b><span class="bread">bread</span><em>→</em><strong>one sandwich</strong>
  </div>
  <div class="recipe-lesson">
    <p><strong>The recipe sets a ratio.</strong><span>Extra bread does not create extra sandwiches without more filling.</span></p>
    <p><strong>A reaction can also run out of one reactant first.</strong><span>That reactant limits the amount of product; extra reactant remains.</span></p>
  </div>
</div>

<p class="extension-note">Today’s mass–mass examples assume the other reactant is available in excess.</p>

<!--
Presenter notes:
Timing: 3 minutes.
Introduce limiting reactant only as a conceptual boundary, not a new calculation method.
Return to 2H2 + O2: with excess H2 but no additional O2, no additional water can form.
-->

---
class: challenge-slide
---

# Case file: how much CO₂ can one mole of CO form?

<div class="single-challenge">
  <p class="case-equation">2CO + O₂ → 2CO₂</p>
  <p class="challenge-question">A catalytic converter receives <strong>28 g CO</strong> with enough oxygen. What mass of CO₂ can form?</p>
  <div class="challenge-givens"><span>M(CO) = 28 g mol⁻¹</span><span>M(CO₂) = 44 g mol⁻¹</span></div>
  <div class="challenge-reveal">
    <p v-click="1"><span>mass → moles</span><strong>28 ÷ 28 = 1.0 mol CO</strong></p>
    <p v-click="2"><span>mole ratio 2 : 2</span><strong>1.0 mol CO₂</strong></p>
    <p v-click="3"><span>moles → mass</span><strong>1.0 × 44 = 44 g CO₂</strong></p>
  </div>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
This is the only independent mass–mass check. Give about 90 seconds before revealing the first line.
Require students to label the substance after every mole value.
Discuss why product mass can exceed CO mass: oxygen contributes additional mass.
[Sources]
- Nobel Prize press release on carbon monoxide oxidation in car catalysts: https://www.nobelprize.org/prizes/chemistry/2007/press-release/
-->

---
class: final-slide
---

# A trustworthy answer tells one coherent story

<div class="final-coordination">
  <div><span>particles</span><strong>What is rearranged?</strong><p>Count each kind of atom.</p></div>
  <div><span>equation</span><strong>What relationship is conserved?</strong><p>Balance, then read coefficients.</p></div>
  <div><span>mole path</span><strong>How are measurable quantities connected?</strong><p>mass → moles → ratio → moles → mass</p></div>
  <div><span>real system</span><strong>What does the result mean?</strong><p>Name assumptions, units, and the substance.</p></div>
</div>

<p class="final-question">If one representation disagrees with the others, where will you look first?</p>

<!--
Presenter notes:
Timing: 1 minute.
Close by returning to the opening real cases. The arithmetic is credible only when the particle count, balanced equation, mole ratio, and real-world meaning agree.
Invite one sentence from students: “Next time I will check…”
[Sources]
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->
