---
theme: default
title: How can a balance reveal a formula?
titleTemplate: '%s · Grade 8 empirical formula'
info: |
  Grade 8 chemistry. Two 45-minute lessons.
  Simplest atom ratios, mass-to-mole reasoning, experimental evidence and percentage composition.
canvasWidth: 1280
drawings:
  persist: false
transition: fade-out
mdc: false
fonts:
  sans: Aptos
  serif: Georgia
  mono: Consolas
---

<div class="cover-layout empirical-cover">
<div><p class="kicker">Grade 8 · Chemistry · Lesson 1</p>

# How can a balance reveal a formula?

<p class="lede">Empirical formula.<br>A small ratio hidden inside a sample.</p>
<p class="caption">Two 45-minute lessons<br>Read a formula · interpret masses · defend a ratio</p></div>
<figure><img class="cover-art" :src="'images/copper-oxide.jpg'" alt="Black copper(II) oxide powder on a watch glass." /><figcaption class="photo-caption">A powder gives us mass. How can we infer an atom ratio?<br><a href="image-credits.html" target="_blank" rel="noopener" @click.stop>Adam Rędzikowski · CC BY-SA 3.0</a></figcaption></figure>
</div>

<!--
L1 · 2 min. Ask: What can a balance tell us? Can it distinguish copper atoms from oxygen atoms? Collect hypotheses, not a formula yet. Prerequisites: element symbols, subscripts, dividing ratios; the mole conversion is retaught on slide 9. Equipment: calculator, paper, periodic table. Students should explain each step, not only obtain a subscript.
Photograph: Adam Rędzikowski, Copper(II) oxide sample, 2014. https://commons.wikimedia.org/wiki/File:Copper(II)_oxide_sample.jpg . CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/ . Original file unchanged, displayed with a crop. It is not the specimen used to produce our constructed teaching data. Credits also accessible from the image link.
Scientific reference for this unit: https://openstax.org/books/chemistry-2e/pages/3-2-determining-empirical-and-molecular-formulas . All questions and datasets are newly authored for this lesson.
-->

---

<EmpiricalCheck label="Starting check · explain your choice" question="One H₂O₂ molecule contains…" :options="['1 H atom and 2 O atoms','2 H atoms and 2 O atoms','2 H₂O molecules','4 H atoms and 4 O atoms']" :answer="1" explanation="A subscript counts atoms of the element just before it. H₂O₂ has two of each: H : O = 2 : 2. We have not yet simplified that ratio." />

<!--
L1 · 2 min. Vote individually before selecting. Invite one student to distinguish a subscript from a coefficient. If students choose water, explain that H2O and H2O2 are different compounds; formula symbols carry meaning.
-->

---

<p class="kicker">The central idea</p>

# The simplest whole-number ratio of atoms.

<p class="lede">That is what an <strong>empirical formula</strong> tells us.</p>
<div class="ratio-path"><div><span>Molecular formula of glucose</span><strong>C₆H₁₂O₆</strong></div><div v-click><span>Divide every count by 6</span><strong>1 : 2 : 1</strong></div><div v-click><span>Empirical formula</span><strong>CH₂O</strong></div></div>
<p class="claim-field">The ratio becomes simpler. The actual molecule does not get smaller.</p>

<!--
L1 · 3 min. Read the element order C, H, O throughout. Reveal the ratio, then its formula. Explain the invisible subscript 1. Empirical comes from evidence/experiment; it is not a guessed molecular structure. A molecular formula reports the actual atom counts in one molecule. Glucose's molecular formula is C6H12O6, not CH2O.
Reference: https://openstax.org/books/chemistry/pages/2-4-chemical-formulas .
-->

---

<p class="kicker">Try it · reduce the notation, not the molecule</p>

# Can you reach the smallest ratio in two ways?

<RatioReducer />

<!--
L1 · 3 min. Have pairs predict then operate. Route A: divide all by 6. Route B: divide all by 2, then all by 3 (or reverse). Ask why dividing only the middle number changes the ratio. Buttons disable invalid whole-number division. Reset and invite a second method. Printed output contains the final argument.
-->

---

<p class="kicker">Two questions · two kinds of formula</p>

# Actual counts—or the simplest relationship?

<div class="split top"><div class="soft-field blue-field"><h2>Molecular formula</h2><p>How many atoms are in <strong>one molecule</strong>?</p><p class="formula-hero">H₂O₂</p><p>Hydrogen peroxide: 2 H and 2 O.</p></div><div class="soft-field green-field"><h2>Empirical formula</h2><p>What is the <strong>simplest ratio</strong>?</p><p class="formula-hero">HO</p><p>H : O = 1 : 1.</p></div></div>

<!--
L1 · 3 min. We are not renaming hydrogen peroxide as a substance consisting of HO molecules. Its empirical formula is HO; its molecular formula remains H2O2. Water H2O is already simplest, so its two formulas coincide. Do not infer identical properties from similar formulas. No peroxide practical is proposed.
-->

---

<p class="kicker">Exercise 1 · write first, then turn</p>

# Which subscripts can be simplified?

<EmpiricalCards :cards="[{front:'C₂H₆',back:'CH₃. Divide both counts by 2: 2 : 6 becomes 1 : 3.',tone:'blue'},{front:'N₂O₄',back:'NO₂. Divide both counts by 2: 2 : 4 becomes 1 : 2.',tone:'green'},{front:'H₂O',back:'H₂O. The implied 1 on oxygen prevents further reduction.',tone:'rust'}]" />
<p class="caption">For each answer, name the common divisor. Remember the unwritten 1.</p>

<!--
L1 · 3 min. Require written answers and reasoning before using the + cue. Students should not reduce H2O to HO. Challenge: Can the empirical formula ever have more atoms written in it than the molecular formula? Not when it is correctly reduced from that molecular formula.
-->

---

<p class="kicker">Back to a real material</p>

# A formula does not always describe a molecule.

<div class="reaction-story"><figure><img class="reaction-photo" :src="'images/copper-oxide.jpg'" alt="Copper(II) oxide, a black ionic solid." /><figcaption>Black copper(II) oxide · CuO</figcaption></figure><div><p class="formula-hero">Cu : O = 1 : 1</p><p>In this solid, copper and oxygen form an extended ionic structure.</p><EmpiricalReveal label="So what does CuO tell us?">The simplest ratio is one copper to one oxygen. It does <strong>not</strong> mean the solid consists of separate CuO molecules.</EmpiricalReveal></div></div>

<!--
L1 · 2 min. Keep lattice theory light: an extended repeating structure, not isolated little molecules. Formula unit is optional vocabulary. Empirical formulas describe elemental ratios in both molecular compounds and ordinary fixed-composition ionic compounds.
Image credit and license: https://commons.wikimedia.org/wiki/File:Copper(II)_oxide_sample.jpg ; Adam Rędzikowski, CC BY-SA 3.0; image-credits.html. Chemistry: https://openstax.org/books/chemistry/pages/2-4-chemical-formulas .
-->

---

<p class="kicker">Joseph Proust · composition as evidence</p>

# A bigger sample. The same mass proportions.

<p class="lede">Proust’s experiments supported the law of definite proportions: a pure compound has a fixed composition by mass.</p>
<table class="data-table"><thead><tr><th>Magnesium oxide</th><th>Mg mass</th><th>O mass</th><th>Mass ratio Mg : O</th></tr></thead><tbody><tr><td>Sample A</td><td>1.20 g</td><td>0.80 g</td><td>3 : 2</td></tr><tr v-click><td>Sample B</td><td>2.40 g</td><td>1.60 g</td><td>3 : 2</td></tr></tbody></table>
<p class="caption">Designed modern teaching data—not Proust’s original measurements.</p>

<!--
L1 · 2 min. Ask what changes when sample A doubles and what stays fixed. This is a historical bridge to our mass method, not a chronology lesson. Important limit: the same composition does not necessarily identify a unique substance.
Historical source: https://openstax.org/books/chemistry/pages/2-1-early-ideas-in-atomic-theory . Proust's experiments and definite proportions are discussed there. The MgO numbers here use rounded atomic masses Mg24 and O16.
-->

---

<p class="kicker">Why the balance needs a translation</p>

# Equal masses do not mean equal atom counts.

<div class="split top"><div><p>A mole counts the same number of atoms of any element.</p><p><strong>Molar mass, M</strong>, is the mass of one mole.</p><p class="major"><EmpiricalMath tex="n=\frac{m}{M}" /></p><p class="caption">m in g · M in g mol⁻¹ · n in mol<br>We compare moles of atoms—not their masses.</p></div><div class="soft-field blue-field"><h2>Magnesium and oxygen</h2><p>1 mol Mg atoms: <strong>24 g</strong><br>1 mol O atoms: <strong>16 g</strong></p><p><EmpiricalMath tex="\frac{2.4}{24}=0.10\ \mathrm{mol\ Mg}" /></p><p><EmpiricalMath tex="\frac{1.6}{16}=0.10\ \mathrm{mol\ O}" /></p><p class="worked-note">Mass ratio 3 : 2.<br>Atom ratio 1 : 1.</p></div></div>

<!--
L1 · 5 min. This is the conceptual bottleneck: pause and work with students. A mole is a counting unit; its exact enormous count is unnecessary here because it cancels in a ratio. Heavier atoms give fewer atoms per gram. Model substitution with units: g divided by g/mol leaves mol. Use rounded school atomic molar masses throughout this deck, not high-precision values from a different table. Check: 12 g Mg is 0.50 mol; 8 g O atoms is also 0.50 mol. If pupils have never encountered moles, use this time plus the first practice question as supported instruction.
-->

---

<p class="kicker">Worked example · from a sample to its formula</p>

# 6.4 g copper. 1.6 g oxygen. What ratio?

<p class="caption">A compound contains only Cu and O. Use M(Cu) = 64 and M(O) = 16 g mol⁻¹.</p>
<div class="working"><div><span class="small-label">Mass → moles</span><EmpiricalMath tex="n(\mathrm{Cu})=\frac{6.4}{64}=0.10\qquad n(\mathrm{O})=\frac{1.6}{16}=0.10" /></div><div v-click><span class="small-label">Divide by 0.10</span><EmpiricalMath tex="\mathrm{Cu:O}=\frac{0.10}{0.10}:\frac{0.10}{0.10}=1:1" /></div><div v-click><span class="small-label">Write the ratio</span><strong class="major">CuO</strong></div></div>
<p class="claim-field">The masses are different because the atoms have different masses.</p>

<!--
L1 · 4 min. Designed mass-composition data. Write Cu and O column headings first. The smallest amount is 0.10 mol; divide both amounts by it. Ask why Cu4O from the gram ratio is incorrect. Students annotate the method with reasons: divide by M to count on the same scale, then divide by the smallest to compare.
-->

---

<p class="kicker">Exercise 2 · supported calculation</p>

# Find the formula from 0.72 g Mg and 0.48 g O.

<p class="lede">Only these two elements are present. Use Mg = 24, O = 16 g mol⁻¹.</p>
<div class="ratio-path"><div><span>1 · Convert each mass</span><strong>m ÷ M</strong></div><div><span>2 · Compare the amounts</span><strong>÷ smallest</strong></div><div><span>3 · Write the formula</span><strong>Mg…O…</strong></div></div>
<EmpiricalReveal label="Check the working—not just the formula">Mg: 0.72 ÷ 24 = 0.030 mol. O: 0.48 ÷ 16 = 0.030 mol.<br>0.030 : 0.030 = 1 : 1, so <strong>MgO</strong>.</EmpiricalReveal>

<!--
L1 · 4 min. Give two minutes individually, one minute partner comparison, one minute feedback. This is the same compound as before but a new batch size. Look for incorrect division by total sample mass. Extension: double both masses and explain without repeating every calculation why MgO remains correct.
-->

---

<p class="kicker">Exercise 3 · transfer the method</p>

# A compound contains 1.20 g C and 0.40 g H.

<p class="lede">These are its only elements. Use C = 12, H = 1 g mol⁻¹.</p>
<p class="formula-hero">C : H = ?</p>
<EmpiricalReveal label="From two masses to a simplest ratio">C: 1.20 ÷ 12 = 0.10 mol. H: 0.40 ÷ 1 = 0.40 mol.<br>Divide both by 0.10: <strong>1 : 4</strong>. Empirical formula: <strong>CH₄</strong>.</EmpiricalReveal>
<p class="caption">The larger carbon mass does not mean there are more carbon atoms.</p>

<!--
L1 · 3 min. Students complete without column prompts. Ask which element is more numerous and which contributes more mass. CH4 is methane's molecular and empirical formula, but our immediate inference from composition is the empirical ratio. These are constructed data.
-->

---

<EmpiricalCheck label="Error clinic · choose the valid reasoning" question="A sample contains 2.30 g Na and 3.55 g Cl. Which reasoning gives its empirical formula?" :options="['Use 2.30 : 3.55 directly as atom counts','Round both masses to whole numbers','Divide by 23 and 35.5: 0.10 : 0.10 → NaCl','Divide both masses by 23 → NaCl₂']" :answer="2" explanation="Each element has its own molar mass. Equal amounts, 0.10 mol each, give a 1 : 1 atom ratio. Mass ratios cannot be copied straight into formula subscripts." />

<!--
L1 · 3 min. Use Na23 and Cl35.5 g/mol. Ask students why one universal divisor cannot convert different elements' masses to amounts. Sodium chloride is an ionic solid; use atom ratio or formula unit, not a NaCl molecule. No sodium/chlorine demonstration is implied.
-->

---

<p class="kicker">What the ratio cannot tell us</p>

# One empirical formula can fit different substances.

<div class="split"><div><p class="small-label">Glucose</p><p class="formula-hero">C₆H₁₂O₆</p><p>6 : 12 : 6 → 1 : 2 : 1</p></div><div><p class="small-label">Ethanoic acid</p><p class="formula-hero">C₂H₄O₂</p><p>2 : 4 : 2 → 1 : 2 : 1</p></div></div>
<p class="claim-field">Both have empirical formula CH₂O. That does not make them the same chemical.</p>
<p class="caption">Ratio alone does not reveal molecular size or how atoms are connected.</p>

<!--
L1 · 3 min. Ethanoic acid is the acid in vinegar; vinegar itself is a mixture, not pure C2H4O2. Ask: If a laboratory reports CH2O, is “we have identified glucose” justified? No. Additional evidence is needed. A molecular molar mass can help determine the molecular formula; structure needs more evidence still. This is a short nature-of-science prompt, not an advanced calculation requirement.
-->

---

<p class="kicker">Lesson 1 · exit ticket</p>

# Three answers. Three reasons.

<div class="exit-grid"><EmpiricalReveal label="1 · Simplify N₂H₄">NH₂. Divide both subscripts by 2.</EmpiricalReveal><EmpiricalReveal label="2 · 0.10 mol N : 0.20 mol O">1 : 2, so NO₂. Mole ratios match atom ratios.</EmpiricalReveal><EmpiricalReveal label="3 · Why not use grams as subscripts?">Atoms of different elements have different masses. Convert each mass to moles before comparing counts.</EmpiricalReveal></div>

<!--
L1 · 3 min. Collect individual answers before opening any fields. Use question 3 diagnostically: a correct formula with no explanation may conceal a method-only understanding. Lesson 1 totals 45 minutes. Before lesson 2, reteach n=m/M for learners unable to explain the conversion.
-->

---
class: lesson-break photo-act
---

<figure><img :src="'images/magnesium-burning.jpg'" alt="A magnesium ribbon burning with a brilliant white light." /><figcaption class="photo-caption">Magnesium reacting in air.<br><a href="image-credits.html" target="_blank" rel="noopener" @click.stop>Capt. John Yossarian · CC BY-SA 3.0</a></figcaption></figure>
<div><p class="kicker">Lesson 2 · Let the evidence speak</p>

# What joined the metal?

<p class="lede">The product is heavier.<br>The extra mass can help reveal its formula.</p><p class="caption">A photograph and data investigation—not instructions for a classroom flame experiment.</p></div>

<!--
L2 · 1 min. Predict whether the retained product will be heavier or lighter than magnesium. Save explanations for the mass ledger. Do not direct pupils to stare at burning magnesium. No student practical is required; use supplied paper data. Any live demonstration needs the school's risk assessment and a qualified teacher.
Photo: Capt. John Yossarian, Magnesium ribbon burning. https://commons.wikimedia.org/wiki/File:Magnesium_ribbon_burning.jpg ; CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/ . Original file reused unchanged, displayed with crop. Experiment context: https://edu.rsc.org/balanced-chemical-equations/the-change-in-mass-when-magnesium-burns/718.article .
-->

---

<p class="kicker">Evidence log · designed classroom data</p>

# The balance weighs the container too.

<div class="experiment-log"><span>Empty crucible and lid</span><strong>20.00 g</strong><span>Crucible, lid and magnesium</span><strong>20.24 g</strong><span>Crucible, lid and final oxide</span><strong>20.40 g</strong></div>
<p class="lede">The same crucible and lid are used each time.</p>
<p class="claim-field">What must be subtracted before we can compare elements?</p>

<!--
L2 · 2 min. Ask learners to label what each measurement includes. Crucible: a heat-resistant container; its lid is part of every reading. Assumptions for this ideal dataset: pure magnesium, complete formation of oxide, no product lost, unchanged dry container. Actual burning in air can involve side products; we are not pretending these are unprocessed real lab measurements.
-->

---

<p class="kicker">Build the mass account</p>

# The oxygen was not weighed separately.

<div class="working"><div><span class="small-label">Magnesium</span><EmpiricalMath tex="20.24-20.00=0.24\ \mathrm{g}" /></div><div v-click><span class="small-label">Total oxide</span><EmpiricalMath tex="20.40-20.00=0.40\ \mathrm{g}" /></div><div v-click><span class="small-label">Oxygen gained</span><EmpiricalMath tex="0.40-0.24=0.16\ \mathrm{g}" /></div></div>
<p class="claim-field">0.24 g metal + 0.16 g oxygen = 0.40 g oxide.</p>
<p class="caption">Oxygen entered from the air. No mass had to be created.</p>

<!--
L2 · 3 min. Reveal one subtraction at a time after pupils propose it. The 0.40 g is compound mass, not oxygen mass. Ask whether the apparatus plus air is a closed accounting system. The observed sample gains mass because its boundary allows oxygen in.
-->

---

<p class="kicker">The experiment becomes a formula</p>

# Equal moles of Mg atoms and O atoms.

<div class="working"><div><span class="small-label">Convert</span><EmpiricalMath tex="\frac{0.24}{24}=0.010\ \mathrm{mol\ Mg}\qquad\frac{0.16}{16}=0.010\ \mathrm{mol\ O}" /></div><div v-click><span class="small-label">Compare</span><strong class="major">1 : 1 → MgO</strong></div><div v-click><span class="small-label">Actual reaction</span><EmpiricalMath tex="2\mathrm{Mg(s)}+\mathrm{O_2(g)}\longrightarrow2\mathrm{MgO(s)}" /></div></div>
<p class="caption">The reaction takes in O₂ molecules. The formula records the ratio of Mg to O atoms.</p>

<!--
L2 · 3 min. Explain state symbols s solid, g gas if new. Ask students to count Mg and O atoms on both sides. Emphasize the balanced equation and the empirical formula answer different questions. Simplified ideal reaction assumes oxide formation only; not a full mechanism for magnesium reacting with all components of air.
-->

---

<EmpiricalCheck label="Checkpoint · atoms or molecules?" question="Why did we divide the oxygen mass by 16—not 32—to find MgO?" :options="['We compare moles of O atoms with moles of Mg atoms','Oxygen gas is made of single O atoms','O₂ has a molar mass of 16 g mol⁻¹','The smaller divisor always gives the correct formula']" :answer="0" explanation="The formula compares elemental atom counts. O atoms have a molar mass of 16 g mol⁻¹; O₂ molecules have 32 g mol⁻¹. Using O₂ is possible only if you then convert each mole of O₂ to two moles of O atoms." />

<!--
L2 · 2 min. Give thinking time before voting. Extension for quick pupils: 0.16/32=0.005 mol O2, which contains 0.010 mol O atoms. Both routes agree when the counted entity is kept clear.
-->

---

<p class="kicker">Investigation · can we trust the final mass?</p>

# “The balance gave a number” is not enough.

<table class="data-table"><thead><tr><th>Same crucible, lid and product</th><th>Reading</th></tr></thead><tbody><tr><td>After first heating and cooling</td><td>20.36 g</td></tr><tr><td>After second heating and cooling</td><td>20.38 g</td></tr><tr><td>After third and fourth cycles</td><td>20.40 g, 20.40 g</td></tr></tbody></table>
<p>Which reading would you use—and why? What if some powder escaped?</p>
<EmpiricalReveal label="Defend a choice, then expose its limitation">The stable 20.40 g is better evidence of completion. Lost powder would make oxygen gain appear too small. Constant mass alone does not prove purity or that nothing was lost.</EmpiricalReveal>

<!--
L2 · 5 min. Paper investigation, constructed dataset. Pairs get two minutes to choose a result and predict the direction of error. Whole class: using 20.36 gives Mg0.24g, O0.12g, so .010:.0075 rather than 1:1; do not force awkward results to the expected formula. Why cool? Comparable weighing conditions and instrument protection. Why repeat? Check whether mass is still changing. Constant means indistinguishable at the balance's resolution, not infinitely precise equality. Extension: a second group sees powder escape and final20.38; more heating cannot restore lost material. NOS: what evidence would make you reject your expected formula?
Safety/context: https://edu.rsc.org/balanced-chemical-equations/the-change-in-mass-when-magnesium-burns/718.article . No live procedure is prescribed here.
-->

---

<p class="kicker">A different way of reporting the same evidence</p>

# Percentages can become convenient masses.

<p class="lede">Suppose a compound is 60% Mg and 40% O <strong>by mass</strong>.</p>
<div class="ratio-path"><div><span>Imagine a 100 g sample</span><strong>60 g Mg</strong></div><div><span>Its remaining mass</span><strong>40 g O</strong></div><div><span>Then use the same method</span><strong>m ÷ M</strong></div></div>
<EmpiricalReveal label="Must the laboratory really weigh out 100 g?">No. The 100 g sample is a calculation convenience. Any sample size gives the same ratio: 60 ÷ 24 : 40 ÷ 16 = 2.5 : 2.5 = 1 : 1.</EmpiricalReveal>

<!--
L2 · 2 min. By mass is essential: 60% of the mass is not 60% of the atoms. Define percent as per hundred. The sample contains only the listed elements; percentages total100. Refer back to Proust and the reducer: scaling all parts preserves a ratio.
-->

---

<p class="kicker">Worked percentage example · three elements</p>

# 40.0% C, 6.7% H, 53.3% O.

<table class="data-table"><thead><tr><th>Step</th><th>C</th><th>H</th><th>O</th></tr></thead><tbody><tr><td>Mass in 100 g</td><td>40.0 g</td><td>6.7 g</td><td>53.3 g</td></tr><tr v-click><td>Divide by M</td><td>40.0 ÷ 12</td><td>6.7 ÷ 1</td><td>53.3 ÷ 16</td></tr><tr v-click><td>Amount / mol</td><td>3.333…</td><td>6.7</td><td>3.33125</td></tr><tr v-click><td>÷ smallest; approximately</td><td>1</td><td>2</td><td>1</td></tr></tbody></table>
<p class="worked-note">CH₂O fits the rounded composition. This does not identify glucose.</p>

<!--
L2 · 4 min. Constructed rounded mass percentages, elements limited to C,H,O. Divide by3.33125 gives1.0006:2.0113:1, consistent with1:2:1 at the supplied precision. Keep calculator digits until the final ratio. Discuss why 6.7 rather than6.666... introduces small differences. Use approximate signs in explanations, not an assertion of exact equality.
-->

---

<p class="kicker">The step that cannot be skipped</p>

# 1 : 1.5 is not “nearly 1 : 2”.

<p class="formula-hero">1 : 1.5 <span class="rust">× 2</span> = 2 : 3</p>
<p class="lede">Multiply <strong>every part</strong> by the same number.</p>
<EmpiricalReveal label="Why is 1 : 3 also wrong?">It doubles only one part. The ratio changes. A whole-number ratio must preserve the original relationship.</EmpiricalReveal>
<p class="caption">Final empirical formulas use whole-number subscripts. Keep a meaningful half until you can clear it.</p>

<!--
L2 · 3 min. Use a numerical check:1/1.5=2/3, but1/2 and1/3 differ. Do not write FeO1.5 as the final empirical formula. For this lesson halves are core; thirds are an optional stretch on slide27.
-->

---

<p class="kicker">Exercise 4 · a formula from iron-oxide composition</p>

# 70.0% Fe. 30.0% O. Find the formula.

<p class="lede">Only Fe and O are present. Use Fe = 56 and O = 16 g mol⁻¹.</p>
<div class="ratio-path"><div><span>Choose 100 g</span><strong>70 : 30</strong></div><div><span>Convert to moles</span><strong>? : ?</strong></div><div><span>Smallest whole ratio</span><strong>? : ?</strong></div></div>
<EmpiricalReveal label="Check the half-integer step">70 ÷ 56 = 1.25 mol Fe; 30 ÷ 16 = 1.875 mol O.<br>Divide by 1.25: 1 : 1.5. Multiply both by 2: <strong>2 : 3 → Fe₂O₃</strong>.</EmpiricalReveal>

<!--
L2 · 4 min. Two minutes independent then pair-check. Fe2O3 is the formula of hematite, an important iron-ore mineral. Avoid calling all rust pure Fe2O3: rust commonly includes hydrated oxides and hydroxides. Our ideal composition is a teaching example, not an analysis of an ore with impurities. For simpler support, supply the1.25 and1.875 mol values and ask only for the ratio step.
-->

---

<p class="kicker">Calculation workbench · predict before advancing</p>

# Does doubling the sample change the formula?

<EmpiricalWorkbench />

<!--
L2 · 4 min. Pick the iron-oxide example after one MgO run. Students predict each step before the next button. Double the sample before and after revealing the ratio; the absolute amounts double but their ratio is unchanged. Previous step is reversible; reset restores original sample. All examples use designed masses and rounded molar masses, not a universal empirical-formula fitting engine. Printed mode shows two complete stable examples.
-->

---

<p class="kicker">Rounding clinic · evidence first</p>

# Small measurement differences are not half-atoms.

<EmpiricalCards :cards="[{front:'1 : 1.02',back:'May support 1 : 1 if the stated measurement precision allows it. Check the data before rounding.',tone:'blue'},{front:'1 : 1.50',back:'Keep the half. Multiply all parts by 2 to obtain 2 : 3.',tone:'green'},{front:'1 : 1.33…',back:'Stretch: near 1 : 4/3. Multiply all parts by 3 to obtain 3 : 4, if the data justify it.',tone:'rust'}]" />
<p class="caption">If no small whole-number ratio fits, inspect the measurements and assumptions.</p>

<!--
L2 · 3 min. This is not a rule that any value within0.02 automatically rounds. Precision and uncertainty matter. Use first two cards for all students; third is optional extension within the allocated time. Do not add subscripts to arbitrary unverified data just to obtain a familiar compound.
-->

---

<p class="kicker">Exercise 5 · independent percentage problem</p>

# 52.2% C, 13.0% H, 34.8% O.

<p class="lede">Find the empirical formula. Show your masses, moles and ratio.<br>Use C = 12, H = 1, O = 16 g mol⁻¹.</p>
<EmpiricalReveal label="Amounts first">In 100 g: 52.2 ÷ 12 = 4.35 mol C; 13.0 ÷ 1 = 13.0 mol H; 34.8 ÷ 16 = 2.175 mol O.</EmpiricalReveal>
<EmpiricalReveal label="Then the ratio and formula">Divide by 2.175: 2 : 5.977… : 1 ≈ <strong>2 : 6 : 1</strong>.<br>Empirical formula: <strong>C₂H₆O</strong>. The implied 1 means it cannot be reduced further.</EmpiricalReveal>

<!--
L2 · 4 min. Three minutes individually, then feedback. These three elements account for the whole sample; percentages are rounded teaching values. Do not assume this proves the sample is ethanol: ethanol and dimethyl ether share this formula but different structures. Keep that point as extension, not an organic-chemistry prerequisite. Mark method separately from arithmetic.
-->

---

<p class="kicker">Lesson 2 · exit ticket</p>

# Can you calculate—and justify—the ratio?

<div class="exit-grid"><EmpiricalReveal label="1 · 5.6 g Fe and 2.4 g O; use 56 and 16">0.10 : 0.15 mol = 1 : 1.5 = 2 : 3. Empirical formula Fe₂O₃.</EmpiricalReveal><EmpiricalReveal label="2 · Is Na₂O already empirical?">Yes. 2 : 1 has no common whole-number divisor greater than 1.</EmpiricalReveal><EmpiricalReveal label="3 · “Its empirical formula is CH₂O, so it must be glucose.”">Not justified. Several compounds share that simplest ratio. More evidence is needed to identify the substance.</EmpiricalReveal></div>

<!--
L2 · 3 min. Collect before revealing. Success: students convert by the correct atomic molar masses, handle1.5 by scaling all entries, and distinguish composition from identity. An answer of FeO2 flags premature rounding; Fe7O3 flags using the gram ratio. Lesson 2 closes with a two-minute synthesis next.
-->

---

<p class="kicker">Return to the question</p>

# A balance gives masses. Reasoning gives a ratio.

<div class="method-steps"><div><span>01 · Evidence</span><strong>Mass</strong><p>Separate each element’s contribution.</p></div><div><span>02 · Count scale</span><strong>Moles</strong><p>Divide each mass by its own M.</p></div><div><span>03 · Compare</span><strong>Ratio</strong><p>Divide by the smallest. Clear fractions.</p></div><div><span>04 · Explain</span><strong>Formula</strong><p>Write the simplest whole-number subscripts.</p></div></div>
<p class="claim-field">An empirical formula is the simplest atom ratio consistent with the evidence.</p>
<p class="caption">It does not, by itself, reveal the whole molecular story.<br><a href="image-credits.html" target="_blank" rel="noopener" @click.stop>Image credits and teaching sources</a></p>

<!--
L2 · 2 min. Ask one student to narrate the four stages without looking at working. Return to the black CuO powder: if6.4g copper accompanies1.6g oxygen, which reasoning is now possible that was not available at the opening? Two lessons total90 minutes. Optional follow-up, not extra required time: distinguish molecular formula using an independently measured molar mass.
Source overview: https://openstax.org/books/chemistry-2e/pages/3-2-determining-empirical-and-molecular-formulas ; https://openstax.org/books/chemistry/pages/2-4-chemical-formulas ; historical context https://openstax.org/books/chemistry/pages/2-1-early-ideas-in-atomic-theory ; RSC magnesium mass-gain experiment https://edu.rsc.org/balanced-chemical-equations/the-change-in-mass-when-magnesium-burns/718.article . Original pedagogical structure, examples and investigation prompts. Presenter notes identify assumptions and designed data.
-->
