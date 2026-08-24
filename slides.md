---
theme: default
title: Particles, Equations, and Moles
info: |
  Grade 8 entry diagnostic and stoichiometry bridge for two 45-minute lessons.
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

<div class="cover-grid">
  <div>
    <p class="kicker">Grade 8 chemistry · 24–28 Aug</p>
    <h1>Particles, equations,<br />and moles</h1>
    <p class="subtitle">Entry diagnostic + first mass–mass stoichiometry</p>
  </div>

  <div class="cover-triad" aria-label="Three coordinated ways to read a reaction">
    <div><span>particles</span><strong>●● + ● → ●●</strong></div>
    <div><span>equation</span><strong>2H₂ + O₂ → 2H₂O</strong></div>
    <div><span>mole ratio</span><strong>2 : 1 : 2</strong></div>
  </div>
</div>

<!--
Presenter notes:
Timing: 2 minutes.
Welcome students and frame this as a low-stakes diagnostic followed by a bridge into stoichiometry.
Say: "We are going to keep asking whether the particles, the equation, and the mole calculation tell the same story."
Do not pre-teach every formula on the opening slide.
[Sources]
- Procedural and visual inspiration: https://github.com/urkrass/science-revolutions-method-slidev
-->

---
class: statement-slide
---

# One reaction speaks three languages

<div class="opening-layout">
  <div class="opening-claim">
    <p class="micro-kicker">Central idea</p>
    <p>Trust the calculation when all three representations agree.</p>
  </div>

  <div class="representation-list">
    <div><span>01</span><strong>particles</strong><small>what is rearranged</small></div>
    <div><span>02</span><strong>equation</strong><small>what is conserved</small></div>
    <div><span>03</span><strong>mole path</strong><small>how quantities connect</small></div>
  </div>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Core claim: the same reaction should be coherent at particle, equation, and mole scales.
Ask for one example of a representation students have used before.
Transition: "First we need an honest map of what is already secure and what needs rebuilding."
[Sources]
- IUPAC chemical reaction equation: https://goldbook.iupac.org/terms/view/C01034
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: diagnostic-intro-slide
---

# Show your starting point

<div class="diagnostic-brief">
  <p class="diagnostic-time">12 minutes</p>
  <p class="diagnostic-question">Six short questions. Show enough working that someone else can follow your choice.</p>
  <div class="diagnostic-rules">
    <span>Work independently</span>
    <span>Calculator optional</span>
    <span>Use units</span>
  </div>
  <p class="support">An unsure answer is useful evidence. Do not erase your first attempt.</p>
</div>

<!--
Presenter notes:
Timing: 2 minutes for instructions, then move directly to the diagnostic slide.
Keep the tone low stakes. Students should record answers on paper because the on-screen component advances one question at a time.
Collect evidence about method, not only final answers.
-->

---
class: diagnostic-slide
---

# Six quick checks

<DiagnosticRound />

<!--
Presenter notes:
Timing: 12 minutes, then 5 minutes to reveal and discuss selected answers.
Expected answers: 2.0 mol; one Ca and two Cl atoms per formula unit; 2,1,2; 2.0 mol dm^-3; 0.40 mol dm^-3; 3 mol H2 and 4 mol NH3.
Use Previous/Next to pace. Reveal answers only after students commit to paper.
Note whether errors come from formula choice, units, balancing, or ratio direction.
[Sources]
- IUPAC amount concentration: https://goldbook.iupac.org/terms/view/A00295
- IUPAC molar mass: https://goldbook.iupac.org/terms/view/12214
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: synthesis-slide
---

# The diagnostic is a map, not a mark

<div class="audit-layout">
  <p class="lead">Circle the first place where your reasoning became uncertain.</p>
  <div class="audit-lines">
    <p><span>mass → moles</span><strong>n = m / M</strong></p>
    <p><span>chemical language</span><strong>formulae + balancing</strong></p>
    <p><span>solution amount</span><strong>c = n / V</strong></p>
    <p><span>reaction amount</span><strong>coefficient ratio</strong></p>
  </div>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Ask students to identify one secure link and one link to watch.
Use responses to decide how slowly to take the next six slides.
No public ranking or score is needed.
-->

---
class: formula-slide
---

# Mass becomes amount through molar mass

<div class="formula-focus">
  <div class="formula-main">
    <span>amount</span>
    <strong>n = m / M</strong>
    <small>mol = g ÷ g mol⁻¹</small>
  </div>
  <div class="worked-line">
    <span>36 g H₂O</span>
    <b>÷</b>
    <span>18 g mol⁻¹</span>
    <b>=</b>
    <strong>2.0 mol H₂O</strong>
  </div>
</div>

<!--
Presenter notes:
Timing: 4 minutes.
Name every symbol and unit. Emphasize that molar mass is the bridge between grams and moles.
Ask: "What must happen to the grams in the units?" The grams cancel.
[Sources]
- IUPAC molar mass: https://goldbook.iupac.org/terms/view/12214
- IUPAC mole: https://goldbook.iupac.org/terms/view/M03980
-->

---
class: comparison-slide
---

# Formulae count atoms; coefficients count particles

<div class="formula-comparison">
  <div class="formula-field warm-field">
    <span>inside one molecule</span>
    <strong>H₂O</strong>
    <p>2 H atoms + 1 O atom</p>
  </div>
  <div class="formula-field green-field">
    <span>number of molecules</span>
    <strong>2H₂O</strong>
    <p>4 H atoms + 2 O atoms</p>
  </div>
</div>

<p class="support">A subscript changes the substance. A coefficient changes the amount.</p>

<!--
Presenter notes:
Timing: 4 minutes.
Have students say aloud what the 2 means in each position.
Contrast 2H2O with H2O2: the latter is hydrogen peroxide, not balanced water.
Transition: "Balancing is allowed to change only the number in front."
[Sources]
- IUPAC chemical reaction equation: https://goldbook.iupac.org/terms/view/C01034
-->

---
class: statement-slide
---

# Balance atoms without changing identities

<div class="balance-rule">
  <div>
    <span>allowed</span>
    <strong>2H₂ + O₂ → 2H₂O</strong>
    <p>Change coefficients.</p>
  </div>
  <div>
    <span>not allowed</span>
    <strong>H₂ + O₂ → H₂O₂</strong>
    <p>Do not change formulae to force a match.</p>
  </div>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
Connect balancing to conservation of atoms: atoms are rearranged, not created or deleted.
Ask which version still describes making water.
[Sources]
- IUPAC chemical reaction equation: https://goldbook.iupac.org/terms/view/C01034
-->

---
class: interactive-slide
---

# Can you balance water?

<BalanceLab />

<!--
Presenter notes:
Timing: 7 minutes.
Invite one student to control each coefficient while the class watches the H and O counts.
Efficient reasoning: balance oxygen with 2H2O, then balance hydrogen with 2H2.
Correct coefficients: 2, 1, 2.
Ask why 4, 2, 4 is balanced but not simplest.
-->

---
class: formula-slide
---

# Concentration needs volume in dm³

<div class="concentration-layout">
  <div class="formula-main compact-formula">
    <span>amount concentration</span>
    <strong>c = n / V</strong>
    <small>mol dm⁻³ = mol ÷ dm³</small>
  </div>
  <div class="unit-conversion">
    <p><span>250 cm³</span><b>÷ 1000</b><strong>0.250 dm³</strong></p>
    <p><span>0.50 mol</span><b>÷ 0.250 dm³</b><strong>2.0 mol dm⁻³</strong></p>
  </div>
</div>

<!--
Presenter notes:
Timing: 5 minutes.
Pause on the unit conversion before substitution.
Ask students to estimate: dividing by a quarter should make the numerical result four times larger.
[Sources]
- IUPAC amount concentration: https://goldbook.iupac.org/terms/view/A00295
-->

---
class: interactive-slide
---

# Dilution spreads the same amount through more volume

<DilutionVisual />

<!--
Presenter notes:
Timing: 5 minutes.
Use the plus button to add solvent. Students should narrate what stays fixed and what changes.
Core relation: before and after dilution, moles of solute are the same, so c1V1 = c2V2.
Ask for a qualitative prediction before each click.
[Sources]
- IUPAC amount concentration: https://goldbook.iupac.org/terms/view/A00295
-->

---
class: exit-slide
---

# Lesson 1 exit: explain the reason

<div class="exit-prompts">
  <p><span>01</span><strong>Why must balancing leave subscripts unchanged?</strong></p>
  <p><span>02</span><strong>What stays constant when a solution is diluted?</strong></p>
  <p><span>03</span><strong>Convert 80 cm³ into dm³.</strong></p>
</div>

<!--
Presenter notes:
Timing: 4 minutes.
Expected ideas: changing subscripts changes chemical identity; moles of solute stay constant; 0.080 dm3.
Collect as an exit ticket. Use the answers to decide where lesson 2 needs a one-minute repair.
-->

---
class: section-slide
---

<div class="section-number">Lesson 2</div>

# Coefficients become mole ratios

<p class="section-question">How does a balanced equation turn one known amount into another?</p>

<!--
Presenter notes:
Timing: 2 minutes.
Reopen the central idea: particle counts, equation coefficients, and mole ratios must coordinate.
Ask students to retrieve the water equation before showing it again.
[Sources]
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: recall-slide
---

# Start with one clean recall

<div class="recall-sequence">
  <p><span>mass → moles</span><strong>n = m / M</strong></p>
  <p v-click="1"><span>moles → concentration</span><strong>c = n / V</strong></p>
  <p v-click="2"><span>balance water</span><strong>2H₂ + O₂ → 2H₂O</strong></p>
</div>

<p v-click="3" class="support">Today we use the coefficients as a bridge between substances.</p>

<!--
Presenter notes:
Timing: 4 minutes.
Reveal one line only after students supply it orally or on mini-whiteboards.
Repair unit errors quickly, but keep the main focus on the new ratio bridge.
-->

---
class: interactive-slide
---

# Read the same reaction three ways

<ReactionLens />

<!--
Presenter notes:
Timing: 7 minutes.
Switch among Particle, Equation, and Mole ratio views.
Require the class to narrate what stays invariant: 2 units of hydrogen react with 1 of oxygen to form 2 of water.
Clarify that particle drawings show molecule counts while coefficients scale to mole amounts.
[Sources]
- IUPAC chemical reaction equation: https://goldbook.iupac.org/terms/view/C01034
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: ratio-slide
---

# The balanced equation contains the ratio

<div class="ratio-focus">
  <p class="reaction-equation"><b>2</b>H₂ + <b>1</b>O₂ → <b>2</b>H₂O</p>
  <p class="ratio-line"><span>H₂</span><strong>2</strong><i>:</i><span>O₂</span><strong>1</strong><i>:</i><span>H₂O</span><strong>2</strong></p>
  <p class="ratio-reading">2 mol H₂ react with 1 mol O₂ to form 2 mol H₂O.</p>
</div>

<!--
Presenter notes:
Timing: 4 minutes.
Point only to coefficients; subscripts do not enter the mole ratio.
Ask three directional questions: H2 to O2, O2 to H2O, and H2 to H2O.
[Sources]
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: scaling-slide
---

# Ratios scale; the relationship does not

<div class="ratio-scale">
  <p><span>small batch</span><strong>2 : 1 : 2</strong></p>
  <p v-click="1"><span>double batch</span><strong>4 : 2 : 4</strong></p>
  <p v-click="2"><span>five batches</span><strong>10 : 5 : 10</strong></p>
</div>

<p v-click="3" class="big-question">If H₂ doubles, what else must double?</p>

<!--
Presenter notes:
Timing: 3 minutes.
Students should say both the oxygen used and water formed.
Connect the scaled numbers back to identical collections of particle groups.
-->

---
class: warning-slide
---

# Coefficients compare moles, not grams

<div class="mass-mole-contrast">
  <div>
    <span>mole ratio</span>
    <strong>2 : 1 : 2</strong>
    <p>H₂ : O₂ : H₂O</p>
  </div>
  <div>
    <span>matching masses</span>
    <strong>4 g : 32 g : 36 g</strong>
    <p>moles × molar mass</p>
  </div>
</div>

<p class="support">Move through moles before you apply a coefficient ratio.</p>

<!--
Presenter notes:
Timing: 4 minutes.
Use rounded molar masses H2 = 2 g/mol, O2 = 32 g/mol, H2O = 18 g/mol.
Ask why the mass ratio is not 2:1:2 even though the mole ratio is.
Transition: "That is why mass–mass problems need a path."
-->

---
class: path-slide
---

# Mass–mass problems travel through moles

<div class="generic-path" aria-label="General mass to mass stoichiometry path">
  <div><span>given</span><strong>mass A</strong><small>g</small></div>
  <b>÷ M</b>
  <div><span>convert</span><strong>moles A</strong><small>mol</small></div>
  <b class="ratio-bridge">use ratio</b>
  <div><span>convert</span><strong>moles B</strong><small>mol</small></div>
  <b>× M</b>
  <div><span>answer</span><strong>mass B</strong><small>g</small></div>
</div>

<p class="path-mantra">grams → moles → ratio → moles → grams</p>

<!--
Presenter notes:
Timing: 4 minutes.
This is the main process slide. Have students copy the five-word path.
Emphasize that the ratio bridge sits between mole amounts, never directly between grams.
[Sources]
- IUPAC molar mass: https://goldbook.iupac.org/terms/view/12214
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: interactive-slide
---

# Walk the path: magnesium to magnesium oxide

<MolePath />

<!--
Presenter notes:
Timing: 8 minutes.
Problem: 2Mg + O2 -> 2MgO. Find mass of MgO from 12 g Mg using M(Mg)=24 g/mol and M(MgO)=40 g/mol.
Advance one step only after the class predicts the operation.
Answer: 20 g MgO.
Ask students to point to the exact moment the balanced equation is used.
[Sources]
- IUPAC molar mass: https://goldbook.iupac.org/terms/view/12214
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->

---
class: statement-slide
---

# The ratio changed the substance, not the unit

<div class="ratio-explanation">
  <p class="reaction-equation">2Mg + O₂ → 2MgO</p>
  <div class="ratio-transfer">
    <span>0.50 mol Mg</span>
    <b>2 : 2</b>
    <strong>0.50 mol MgO</strong>
  </div>
  <p class="support">Both sides are still in moles. Only the chemical label changes.</p>
</div>

<!--
Presenter notes:
Timing: 3 minutes.
This slide isolates the most conceptually important step from the worked example.
Ask: "Why did the number stay 0.50?" Because 2:2 simplifies to 1:1.
-->

---
class: practice-slide
---

# Your turn: oxygen to magnesium oxide

<div class="practice-problem">
  <p class="reaction-equation">2Mg + O₂ → 2MgO</p>
  <p>What mass of MgO forms from <strong>16 g O₂</strong>?</p>
  <div class="given-strip">
    <span>M(O₂) = 32 g mol⁻¹</span>
    <span>M(MgO) = 40 g mol⁻¹</span>
  </div>
  <p v-click="1" class="answer-path">16 ÷ 32 = 0.50 mol O₂ → 1.0 mol MgO → <strong>40 g MgO</strong></p>
</div>

<!--
Presenter notes:
Timing: 6 minutes.
Give students 3 minutes before revealing.
Key ratio step: 1 mol O2 produces 2 mol MgO, so 0.50 mol produces 1.0 mol.
Diagnose whether errors occur at molar mass, ratio direction, or final mass conversion.
-->

---
class: interactive-slide
---

# Diagnose the broken solution

<ErrorSpotter />

<!--
Presenter notes:
Timing: 5 minutes.
The broken solution applies the coefficient ratio directly to grams.
Students should identify line 1 as the first invalid step, then repair the whole solution through moles.
Correct result for 12 g Mg is 20 g MgO.
-->

---
class: challenge-slide
---

# Final challenge combines the whole path

<div class="challenge-layout">
  <p class="reaction-equation">2Na + Cl₂ → 2NaCl</p>
  <p class="challenge-question">What mass of NaCl forms from <strong>11.5 g Na</strong>?</p>
  <div class="given-strip">
    <span>M(Na) = 23 g mol⁻¹</span>
    <span>M(NaCl) = 58.5 g mol⁻¹</span>
  </div>
  <div class="challenge-reveal">
    <p v-click="1">11.5 ÷ 23 = <strong>0.50 mol Na</strong></p>
    <p v-click="2">2 : 2 gives <strong>0.50 mol NaCl</strong></p>
    <p v-click="3">0.50 × 58.5 = <strong>29.25 g NaCl</strong></p>
  </div>
</div>

<!--
Presenter notes:
Timing: 5 minutes.
Ask students to solve independently before revealing each line.
Accept 29.3 g if rounding to three significant figures is expected.
Require units at every stage.
-->

---
class: exit-slide
---

# Exit ticket: coordinate all three views

<div class="exit-workbench">
  <p class="reaction-equation">Mg + O₂ → MgO</p>
  <div class="exit-steps">
    <p><span>01</span><strong>Balance the equation.</strong></p>
    <p><span>02</span><strong>Sketch or describe the particle counts.</strong></p>
    <p><span>03</span><strong>State the Mg : MgO mole ratio.</strong></p>
    <p><span>04</span><strong>From 0.75 mol Mg, find mol MgO.</strong></p>
  </div>
</div>

<!--
Presenter notes:
Timing: 5 minutes.
Expected: 2Mg + O2 -> 2MgO; two Mg atoms plus one O2 molecule form two MgO formula units; ratio 2:2 or 1:1; 0.75 mol MgO.
Use this as evidence for whether the class is ready for independent mass–mass practice.
-->

---
class: final-slide
---

# The reliable move is always the same

<div class="final-path">
  <p><span>1</span>balance</p>
  <b>→</b>
  <p><span>2</span>convert</p>
  <b>→</b>
  <p><span>3</span>use ratio</p>
  <b>→</b>
  <p><span>4</span>convert</p>
</div>

<p class="final-question">Which step will you check twice next time?</p>

<!--
Presenter notes:
Timing: 2 minutes.
Close by returning to the central idea: a trustworthy answer agrees with the particles, the balanced equation, and the mole path.
Invite a one-sentence personal checkpoint rather than a generic summary.
[Sources]
- IUPAC stoichiometry: https://goldbook.iupac.org/terms/view/S06026
-->
