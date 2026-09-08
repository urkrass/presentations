---
theme: default
title: How do you count what you cannot see?
titleTemplate: '%s · The mole and its history'
info: |
  IB DP Year 1 chemistry. Four 45-minute lessons.
  History, the atomic-mass bridge, particle calculations, grams and moles, reactions and theoretical yield.
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

<div class="cover-layout">
<div>
<p class="kicker">IB DP Year 1 · Chemistry</p>

# How do you count what you cannot see?

<p class="lede">The strange history of the mole and <MoleMath tex="6.022\times10^{23}" />.</p>
<p class="caption">Lesson 1 · The count came later<br>Mole · Avogadro constant · microscopic ↔ macroscopic</p>
</div>
<figure class="balance-photo"><img class="cover-art" :src="'images/analytical-balance.jpg'" alt="Photograph of an antique analytical balance with two suspended pans inside a glass case." /><figcaption>Mass was measurable before atoms were countable.<br><a href="image-credits.html" target="_blank" rel="noopener" @click.stop>Photograph: Sarcyn · CC BY-SA 3.0</a></figcaption></figure>
</div>

<!--
L1 · 3 min · cumulative 3/45.
Ask: Suppose I give you 18 g of water. Can you find the number of water molecules without seeing even one? Collect proposals, do not give the answer yet. Prerequisite: formula subscripts and simple mass ratios; scientific notation will be supported.
Photograph: Sarcyn, Detail of antique analytical balance, 26 June 2009. https://commons.wikimedia.org/wiki/File:Analyticalbalance2.jpg ; CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/ . Original photograph reproduced without alteration. This is an illustrative historical instrument, not an instrument attributed to Lavoisier or a photographed 18 g water sample. Full downloadable-image credits: image-credits.html.
Learning destinations: explain why the count is enormous; explain why it is this count; distinguish relative mass, molar mass and amount; calculate specified entities.
-->

---

<p class="kicker">A counting word · a much harder question</p>

# A mole is a count. But why this count?

<CountWord />

<MoleReveal label="What is easy—and what needs explaining?">
The easy part: a mole is a counting unit.<br>The interesting part: why did chemistry choose <strong>this</strong> enormous count?
</MoleReveal>

<p class="caption">Always name the entities: atoms, molecules, ions—or something else.</p>

<!--
L1 · 3 min · cumulative 6/45.
Ask for familiar counting units; stop the analogy at dozen. Click the dense field: the notation replaces an uncountable drawing. The dots are symbolic; there are only 240 drawn dots, not a literal mole. Then open the evidence field. Have students read the exponent aloud. 10^23 means a 1 followed by 23 zeros; scientific notation counts powers of ten, not decimal places.
Exact modern definition: https://www.bipm.org/en/history-si/mole . One mole contains exactly 6.02214076×10^23 specified elementary entities.
-->

---

<p class="kicker">Late 1700s · quantitative chemistry</p>

# The balance came first.<br>The particle count came later.

<div class="portrait-scene" style="grid-template-columns:190px 1fr">
<figure><img class="portrait-small" :src="'images/lavoisier.jpg'" alt="Portrait of Antoine Lavoisier" /><figcaption>Antoine Lavoisier<br>Mass as evidence</figcaption></figure>
<div>
<div class="open-ledger">
<div><strong>2 g</strong><span>hydrogen</span></div><b>+</b><div><strong>16 g</strong><span>oxygen</span></div><b>=</b><div><strong>18 g</strong><span>water formed</span></div>
</div>
<p class="caption">An ideal mass ledger, using rounded values—not coefficients in a chemical equation.</p>
<p class="major">How much by mass ≠ how many particles.</p>
</div>
</div>

<!--
L1 · 3 min · cumulative 9/45.
Ask which part the balance can directly tell us. Conservation of mass in a closed system, followed by fixed/multiple proportions, made particle-based explanations plausible. Do not attribute all these laws to Lavoisier.
The mass ledger assumes complete reaction with no excess; numbers use school atomic masses H=1, O=16. If writing the chemical equation use 2H2 + O2 → 2H2O, not H2 + O2 → H2O. No live hydrogen demonstration is implied.
Source: https://www.sciencehistory.org/education/scientific-biographies/antoine-laurent-lavoisier/
Portrait reused from Grade 8: Jacques-Louis David, public-domain painting, https://commons.wikimedia.org/wiki/File:David_-_Portrait_of_Monsieur_Lavoisier_(cropped).jpg
-->

---

<p class="kicker">1803–1808 · John Dalton</p>

# A mass ratio could become an atomic idea.

<div class="portrait-scene">
<figure><img class="portrait" :src="'images/dalton.jpg'" alt="John Dalton, painted by Thomas Phillips in 1835" /><figcaption>John Dalton<br>Atoms combine in whole-number ratios.</figcaption></figure>
<div>
<p class="lede">Different atoms have different masses. Compare them against a reference.</p>
<div class="unit-tokens"><div class="unit-token"><strong>H</strong><small>≈ 1</small></div><div class="unit-token"><strong>C</strong><small>≈ 12</small></div><div class="unit-token"><strong>O</strong><small>≈ 16</small></div></div>
<p class="caption">Modern rounded relative masses illustrating the idea—not Dalton’s original values. Token sizes are symbolic.</p>
<p class="major">Ratios. Not grams.</p>
</div>
</div>

<!--
L1 · 4 min · cumulative 13/45.
Ask: if oxygen's relative atomic mass is about 16, does one O atom weigh 16 g? Insist on distinguishing a ratio from a gram mass.
Dalton's early formula assumptions gave some incorrect atomic weights (notably water treated as HO). The displayed values are modern approximate values on the carbon-12-based scale, not a reconstruction of his table or an exact hydrogen reference. Atomic mass scale history: https://www.bipm.org/en/history-si/mole
Portrait: Thomas Phillips, 1835, public-domain painting, National Portrait Gallery, https://commons.wikimedia.org/wiki/File:John_Dalton_by_Thomas_Phillips,_1835.jpg
-->

---

<p class="kicker">Exercise 1 · commit before you turn a card</p>

# Which claims survive a units check?

<MoleFlipCards :cards="[
{ front: 'One oxygen atom has a mass of 16 g.', back: 'No. A typical oxygen atom has a mass of about 16 u. A gram-scale oxygen sample contains an enormous number of atoms.', tone: 'rust' },
{ front: 'Relative atomic mass is a ratio, with no unit.', back: 'Yes. It compares the average atomic mass with one twelfth of the mass of a carbon-12 atom.', tone: 'green' },
{ front: 'An O atom is about 16 times as massive as an H atom.', back: 'Yes, as a rounded comparison. The actual natural-isotope averages are not exactly 16 and 1.', tone: 'blue' }
]" />

<p class="lede">Write true or false. Correct each false statement using the right unit.</p>

<!--
L1 · 3 min · cumulative 16/45. Mandatory exercise 1.
45 seconds individual commitment, 45 seconds pair justification, then reveal cards independently (mouse, Enter or Space). Answers: false, true, approximately true. Diagnostic: a student who says 16 g is thinking of molar mass, not one particle.
Definitions/reference scale: https://www.bipm.org/en/history-si/mole . u is introduced as the atomic mass unit, with quantitative definition deferred to Lesson 2.
-->

---

<p class="kicker">1811 · Amedeo Avogadro</p>

# Same gas volume. Same molecular count.

<div class="portrait-scene" style="grid-template-columns:230px 1fr;gap:42px">
<figure><img class="portrait" style="width:230px;height:330px" :src="'images/avogadro.jpg'" alt="Portrait of Amedeo Avogadro" /><figcaption>A relation between volume<br>and number—not the number itself.</figcaption></figure>
<div>
<p class="lede">At the same temperature and pressure, ideal gases have equal numbers of molecules in equal volumes.</p>
<GasVessels />
<MoleReveal label="Did Avogadro know the numerical count?">No. He did not measure <MoleMath tex="6.022\times10^{23}" />.</MoleReveal>
</div>
</div>

<!--
L1 · 4 min · cumulative 20/45.
Write V1=V2, T1=T2, P1=P2 ⇒ N1=N2 for ideal gases. Ask students to count six pairs in each vessel. Each pair denotes ONE diatomic molecule; icons are schematic, not molecular sizes or actual concentration.
Avogadro proposed his hypothesis in 1811; it supported separating atoms and molecules. The constant was later named in his honour. https://www.nist.gov/si-redefinition/kilogram/kilogram-silicon-spheres-and-international-avogadro-project
Portrait reused from Grade 8, public domain: https://commons.wikimedia.org/wiki/File:Portrait_of_Amedeo_Avogadro_-_DPLA_-_7da5faaef3f7cf4a4ad788f9e7453549.jpg
-->

---

<MoleCheck label="Exercise 2 · predict, then explain" question="Equal volumes of H₂ and O₂, at the same temperature and pressure. What is equal?" :options="['Number of molecules—and total mass', 'Number of molecules, but not total mass', 'Total mass, but not number of molecules', 'Neither mass nor number of molecules']" :answer="1" explanation="The ideal-gas comparison gives equal molecular counts. An O₂ molecule has about 16 times the mass of an H₂ molecule, so the oxygen sample has about 16 times the mass. Same count is not same mass." />

<!--
L1 · 3 min · cumulative 23/45. Mandatory exercise 2.
Students choose B and justify using H2≈2u, O2≈32u. Then ask: what if one vessel is hotter? Equal volume alone no longer guarantees equal count. In the picture, molecule count not atom count is the direct use of the law (both happen to have two atoms per molecule).
Source for historical relation: https://www.nist.gov/si-redefinition/kilogram/kilogram-silicon-spheres-and-international-avogadro-project
-->

---

<p class="kicker">1811 → 1860 · an idea needs a shared language</p>

# Why did the idea take decades to matter?

<div class="time-sequence">
<div class="time-event"><span class="year">1811</span><div><h2>Avogadro proposes the hypothesis.</h2><p>“Atom”, “molecule” and atomic weights remain disputed.</p></div></div>
<div class="time-event" v-click><span class="year">1858</span><div><h2>Cannizzaro makes the distinction useful.</h2><p>Gas-volume reasoning helps organize consistent atomic masses.</p></div></div>
<div class="time-event" v-click><span class="year">1860</span><div><h2>Karlsruhe Congress</h2><p>The argument circulates. A common atomic-mass language becomes possible.</p></div></div>
</div>

<p class="caption">A timeline of acceptance—not three isolated discoveries.</p>

<!--
L1 · 3 min · cumulative 26/45. Two lecture clicks, reversible.
Cannizzaro outlined the argument in his 1858 Sunto di un corso di filosofia chimica. Copies circulated at/after the 1860 Karlsruhe Congress. Consensus did not appear instantly at a single meeting. Ask why better vocabulary can change what evidence means.
Sources: https://www.sciencehistory.org/education/scientific-biographies/stanislao-cannizzaro/ and https://www.sciencehistory.org/stories/magazine/setting-the-table/
-->

---

<p class="kicker">1890s · Wilhelm Ostwald and the practical “Mol”</p>

# Put the molecular-weight number on a balance.

<div class="mapping-head"><span>Molecule</span><span>Relative molecular mass</span><span></span><span>“Gram-molecule” batch</span></div>
<div class="mapping">
<div class="mapping-row"><span class="chem">H₂O</span><span class="value">≈ 18</span><span class="arrow">→</span><span class="value macro">≈ 18 g</span></div>
<div class="mapping-row"><span class="chem">CO₂</span><span class="value">≈ 44</span><span class="arrow">→</span><span class="value macro">≈ 44 g</span></div>
</div>

<p class="claim-field">Why should these different masses contain the same number of molecules?</p>

<!--
L1 · 3 min · cumulative 29/45.
The practical idea was to express the molecular-weight number in grams. It predates accurate determination of the particle count; don't project the exact 2019 definition onto Ostwald. “Mol” introduced probably 1893, not a securely exact date.
Source: Roberto Marquardt, The mole and IUPAC: a brief history, Chemistry International July 2019, print p50ff: https://iupac.org/wp-content/uploads/sites/4/2020/01/Chem-Int-JULY_2019-IYPT.pdf
Mass values rounded for first teaching. CO2 here is a weighed sample in a container, not a liquid beaker at ordinary room conditions.
-->

---

<p class="kicker">Exercise 3 · equal counts do not need equal masses</p>

# Which batch matches 18 g of water?

<p class="lede">Use rounded particle masses: H₂O ≈ 18 u; CO₂ ≈ 44 u.<br>Choose the CO₂ sample with the same number of molecules.</p>

<div class="open-ledger" style="grid-template-columns:1fr 1fr 1fr;margin:42px 0">
<div><span>A</span><strong>18 g</strong><span>CO₂</span></div><div><span>B</span><strong>22 g</strong><span>CO₂</span></div><div><span>C</span><strong>44 g</strong><span>CO₂</span></div>
</div>

<MoleReveal label="Give the ratio argument before checking.">C. A CO₂ molecule is about <MoleMath tex="44/18" /> times as massive, so the same count needs <MoleMath tex="44/18" /> times as much mass.</MoleReveal>

<!--
L1 · 3 min · cumulative 32/45. Mandatory exercise 3.
Individual choice, then ratio explanation. Answer C. Stretch: 9g water matches22g CO2 (half of each batch); equal18g samples do not match counts. We have not used a memorized NA value to reason this out.
Source of practical gram-molecule history: Marquardt2019 https://iupac.org/wp-content/uploads/sites/4/2020/01/Chem-Int-JULY_2019-IYPT.pdf
-->

---

<p class="kicker">1900 onward · measuring the count</p>

# Now: how many particles are in that batch?

<MoleEstimates />

<p class="claim-field">The chemical batch existed before its count was accurately known.</p>

<!--
L1 · 3 min · cumulative 35/45.
Click the right arrow to reveal Einstein, Perrin, then exact2019 value; left arrow reverses. Y-position uses a linear numerical scale. X is ordered historical categories, explicitly NOT a linear time axis. No connecting trend line, fabricated error bars or numerical Einstein point.
Planck1900 estimated6.175×10^23; Einstein1905 provided a Brownian-motion route; Perrin1909 approximately70×10^22. Estimates should not be interpreted as comparable modern uncertainty measurements. The2019 point is exact by definition, NOT another empirical estimate.
Source: Marquardt2019, The mole and IUPAC: a brief history, https://iupac.org/wp-content/uploads/sites/4/2020/01/Chem-Int-JULY_2019-IYPT.pdf
-->

---

<p class="kicker">Nature of science · different routes to one scale</p>

# Why trust a number you cannot count out?

<p class="thesis">A theory of invisible particles becomes stronger when independent measurements agree.</p>

<MoleReveal label="What makes agreement persuasive?">Different methods have different possible errors. Convergence is more informative than repeating the same assumption—but it is not proof that every assumption is right.</MoleReveal>

<!--
L1 · 2 min · cumulative 37/45.
Turn-and-talk: would two balances checked against the same faulty standard be truly independent? Relate to Brownian motion, radiation/Planck, and later crystal methods. Agreement can test a model; definitions themselves are a separate matter, revisited in Lesson2.
Historical routes: Marquardt2019 https://iupac.org/wp-content/uploads/sites/4/2020/01/Chem-Int-JULY_2019-IYPT.pdf
-->

---

<p class="kicker">Investigation · a count hidden inside a mass</p>

# Can a balance count identical objects?

<div class="investigation">
<div class="soft-field blue-field"><p class="small-label">Calibration sample</p><p>10 identical washers</p><p class="mass-readout">12.0 g</p><p class="caption">Container tared. Mass is for the washers only.</p></div>
<div><p class="small-label">Unknown batch · same type of washer</p><p class="mass-readout">36.0 g</p><ol class="task-list"><li>Infer the mass per washer.</li><li>Predict the number in the unknown batch.</li><li>Name one assumption that could fail.</li></ol></div>
</div>

<MoleReveal label="Compare your inference with the model."><MoleMath tex="12.0/10=1.20" /> g per washer; <MoleMath tex="36.0/1.20=30" /> washers. Different washer masses or an untared container would undermine the inference.</MoleReveal>

<!--
L1 · 5 min · cumulative 42/45. Paper investigation, or optional teacher-prepared real washers and balance. The values are constructed teaching data, not reported measurements. Count10 representative washers, tare container, determine mean mass, predict unknown count, then open/count to check. No chemical handling.
Ask if using one washer versus10 changes confidence: averaging a representative sample reduces relative weighing error but does not correct a biased sample. For the paper problem assume identical masses and negligible uncertainty. Real batches yield an estimate near an integer, requiring checking.
Transfer: atoms are too small to weigh this way individually; a calibrated atomic-mass scale lets the same logic operate indirectly. Do not imply washers explain the exact chosen mole value.
-->

---

<p class="kicker">Lesson 1 · stop and retrieve</p>

# We know the batch. We still need the bridge.

<MoleFlipCards :cards="[
{front:'Did Avogadro measure the famous number?',back:'No. In 1811 he linked equal gas volumes at the same temperature and pressure to equal molecular counts.',tone:'rust'},
{front:'Why can 18 g and 44 g contain equal counts?',back:'If each CO₂ molecule is 44/18 times as massive as H₂O, the same number of molecules needs 44/18 times the sample mass.',tone:'blue'},
{front:'What remains unexplained?',back:'Why a particle mass near 18 u becomes a molar mass near 18 g/mol—and why the required count is about 6.022 × 10²³.',tone:'green'}
]" />

<p class="caption">Next lesson: the distance between an atomic mass unit and a gram.</p>

<!--
L1 · 3 min · cumulative45/45. End lesson here.
Students write a two-sentence explanation before revealing. Use misconceptions to decide how much of slide16 to model next time. Home retrieval optional: explain same count/different mass with a dozen apples versus a dozen cherries, without introducing unsourced giant-scale analogies.
Historical fact sources repeated in slides6,9 and11 notes.
-->

---
class: lesson-break
---

<p class="kicker">Lesson 2 · the scale factor</p>

# Why does 18 u per molecule<br>become about 18 g per mole?

<p class="lede">The answer lies between an atomic mass unit and a gram.</p>

<div class="bridge-pair"><span>18 u</span><span class="missing">× ?</span><span>18 g</span></div>

<!--
L2 · 2 min · cumulative2/45.
Opening retrieval: same molecular count, different masses; Avogadro did not measure the count. Now ask what units the missing multiplier must carry: molecules per batch. The18 values are deliberately rounded. This is a sparse conceptual act break, not a new chemical mechanism diagram.
Reference: https://www.bipm.org/en/history-si/mole
-->

---

<p class="kicker">Atomic mass unit → gram</p>

# The gram is enormous beside an atom.

<div class="formula-stage">
<div class="formula-step"><span class="small-label">One unit</span><div>

$$1\,u\approx1.66054\times10^{-24}\ \mathrm{g}$$

</div></div>
<div class="formula-step" v-click><span class="small-label">Scale factor</span><div>

$$\frac{1\ \mathrm{g}}{1.66054\times10^{-24}\ \mathrm{g}}\approx6.022\times10^{23}$$

</div></div>
<div class="formula-step" v-click><span class="small-label">Practical bridge</span><div>

$$1\,u\text{ per particle}\ \longleftrightarrow\ \approx1\ \mathrm{g\,mol^{-1}}$$

</div></div>
</div>

<p class="claim-field">The huge count comes from a huge difference in mass scale.</p>

<!--
L2 · 4 min · cumulative6/45. Two lecture clicks; have students estimate the exponent before the second line appears. Work through 1/1.66054≈0.6022 and10^24, then normalize to6.022×10^23. Grams cancel in the scale-factor division.
Define1u as one twelfth of the mass of an unbound neutral carbon-12 atom at rest in its ground state. After2019 the molar mass constant is no longer exactly1g/mol; the correspondence here is extraordinarily close, hence≈.
Source: https://www.bipm.org/en/history-si/mole ; atomic mass constant: https://physics.nist.gov/cuu/Constants/Table/allascii.txt (2022 CODATA table). The rounded 1.66054×10^-24 g is adequate for this explanation.
-->

---

<p class="kicker">Historical logic · before 20 May 2019</p>

# Carbon-12 anchored both sides of the bridge.

<div class="formula-stage">
<div class="formula-step"><span class="small-label">Reference atom</span><div>

$$m({}^{12}\mathrm C)=12u\approx1.99265\times10^{-23}\ \mathrm{g}$$

</div></div>
<div class="formula-step" v-click><span class="small-label">12 g sample</span><div>

$$N=\frac{12\ \mathrm{g}}{1.99265\times10^{-23}\ \mathrm{g\,atom^{-1}}}$$

</div></div>
<div class="formula-step" v-click><span class="small-label">Count the atoms</span><div>

$$N\approx6.02214\times10^{23}\text{ atoms}$$

</div></div>
</div>

<p class="caption">An explanation of the historical scale—not today’s definition of <MoleMath tex="N_A" />.</p>

<!--
L2 · 4 min · cumulative10/45. Two lecture clicks. Students verify12×1.66054×10^-24g≈1.99265×10^-23g. Show that the12 in the sample and in the atomic reference cancel in the underlying algebra: the factor comes from u versus grams, not a mysterious property of carbon.
The old1971 SI definition fixed one mole as as many entities as atoms in0.012kg carbon-12. NA was measured. Today its value is fixed, so do not describe this as the present definition. With rounded denominator, the displayed final digits are approximate.
Source: https://www.bipm.org/en/history-si/mole
-->

---

<p class="kicker">Pattern recognition · microscopic → laboratory scale</p>

# The same number reappears on the balance.

<div class="mapping-head"><span>Entity</span><span>Particle mass</span><span></span><span>Molar mass</span></div>
<div class="mapping">
<div class="mapping-row"><span class="chem">¹²C atom</span><span class="value">12 u</span><span class="arrow">→</span><span class="value macro">≈ 12 g mol⁻¹</span></div>
<div class="mapping-row" v-click><span class="chem">H₂O</span><span class="value">≈ 18.015 u</span><span class="arrow">→</span><span class="value macro">≈ 18.015 g mol⁻¹</span></div>
<div class="mapping-row" v-click><span class="chem">CO₂</span><span class="value">≈ 44.01 u</span><span class="arrow">→</span><span class="value macro">≈ 44.01 g mol⁻¹</span></div>
</div>

<p class="claim-field">The mole bridges particle mass and laboratory mass.</p>

<!--
L2 · 3 min · cumulative13/45. Two lecture clicks. Ask which sample has more molecules:18.015g water or44.01g CO2? Approximately the same count, one mole each.
For H2O and CO2 the values are average molecular masses for typical natural isotope composition, not exact masses of every individual molecule. Carbon-12 isotope mass is exactly12u by definition; its molar mass is now measured and extraordinarily close to12g/mol. All listed school molar masses rounded.
Reference scale: https://www.bipm.org/en/history-si/mole
-->

---

<p class="kicker">Exercise 4 · from a formula to a weighed batch</p>

# Find the molar mass. Then halve the batch.

<p class="lede">Use H = 1, C = 12, O = 16. Work independently first.</p>

<MoleFlipCards :cards="[
{front:'O₂: mass of 1 mol? Mass of 0.50 mol?',back:'M = 2 × 16 = 32 g/mol. One mole: 32 g. Half a mole: 16 g.',tone:'blue'},
{front:'CO₂: mass of 1 mol? Mass of 0.50 mol?',back:'M = 12 + 2 × 16 = 44 g/mol. One mole: 44 g. Half a mole: 22 g.',tone:'green'},
{front:'Why do 16 g O₂ and 22 g CO₂ match?',back:'Both are half-mole samples: equal numbers of molecules. Their molecular masses differ, so their sample masses differ.',tone:'rust'}
]" />

<!--
L2 · 4 min · cumulative17/45. Mandatory exercise4.
First two minutes silent calculations, then pairs compare units and logic. Reveal independently; add the stretch: same molecular count does not mean same total atom count (O2 has2 atoms/molecule, CO2 has3). Avoid using atom counts until molecule counts are secure.
These are rounded school atomic masses; M is mass per mole, not a bare ratio.
-->

---

<p class="kicker">Thought experiment · why not a round number?</p>

# A <MoleMath tex="10^{24}" />-particle unit would work.<br>It would lose the convenient bridge.

<div class="split">
<div class="soft-field green-field"><p class="small-label">Our mole</p><h2>18.015 u per molecule</h2><p class="major">≈ 18.015 g per mol</p><p class="caption">Same numerical value, different scale.</p></div>
<div class="soft-field blue-field"><p class="small-label">A pretend “10²⁴-mole”</p><h2>18.015 u per molecule</h2><p class="major blue">≈ 29.9 g per batch</p><p class="caption">A valid counting unit. A less convenient mapping.</p></div>
</div>

<MoleReveal label="Where does 29.9 g come from?" style="margin-top:28px"><MoleMath tex="18.015\times1.66054\times10^{-24}\times10^{24}\ \mathrm{g}\approx29.9\ \mathrm{g}" />.</MoleReveal>

<!--
L2 · 3 min · cumulative20/45. Formerly optional enrichment; now in the full two-lesson route.
Let students propose1e24 as an easier count. It is a perfectly legitimate invented unit, but1u×1e24≈1.66054g, not1g. Calculate before opening. Nothing in nature forbids the alternate unit; the choice preserves a useful measurement convention.
u reference and SI background: https://www.bipm.org/en/history-si/mole
-->

---

<p class="kicker">20 May 2019 · a definition reverses direction</p>

# First we measured the count.<br>Now we fix it exactly.

<div class="split top">
<div class="soft-field rust-field"><p class="small-label">Before 20 May 2019</p><h2>12 g of carbon-12<br>→ number of atoms</h2><p>One mole matched the number of atoms in 0.012 kg of carbon-12.</p><p class="rust"><MoleMath tex="N_A" /> was experimentally determined.</p></div>
<div class="soft-field green-field"><p class="small-label">Since 20 May 2019</p><h2>An exact count<br>→ one mole</h2><p style="font-size:25px"><MoleMath tex="N_A=6.022\,140\,76\times10^{23}\ \mathrm{mol^{-1}}" /></p><p class="green">Exactly. No measurement uncertainty in this defined constant.</p></div>
</div>

<p class="caption">Avogadro <strong>constant</strong>: <MoleMath tex="N_A" />, with unit mol⁻¹. Avogadro <strong>number</strong>: its numerical value.</p>

<!--
L2 · 4 min · cumulative24/45.
Scientists selected the fixed value to preserve continuity with the best established measurements; the new mole stayed essentially the same size. The scale explanation tells us why6.022e23, but cannot derive all exact chosen digits from rounded atomic masses.
After2019 the molar mass of carbon-12 is no longer exactly12g/mol by definition. Its measured value is extremely close. Don't imply atom masses became exact in grams, or that experiments now determine the exact NA value.
Sources: https://www.bipm.org/en/history-si/mole ; 26thCGPM Resolution1(2018), effective20May2019, https://www.bipm.org/en/committees/cg/cgpm/26-2018/resolution-1
-->

---

<p class="kicker">Modern measurement · the silicon-sphere route</p>

# Count atoms without counting them one by one.

<div class="silicon-layout">
<figure><img class="silicon-image" :src="'images/silicon-sphere.png'" alt="Mirror-like silicon sphere used for precision measurements of atoms in a crystal" /><figcaption>One crystal connects atomic spacing to a macroscopic volume.</figcaption></figure>
<div><ol class="task-list"><li>Grow an extremely pure, enriched ²⁸Si crystal.</li><li>Measure its atomic lattice spacing.</li><li>Form a sphere; measure its volume and mass.</li><li>Infer the atom count from the crystal structure.</li></ol><p class="caption">These measurements helped establish the value fixed in 2019.</p></div>
</div>

<!--
L2 · 3 min · cumulative27/45. Formerly optional, now core in90min.
Prompt: if you know a repeating unit's volume and the whole crystal volume, how can you infer the number of units? Silicon has8 atoms per conventional cubic unit cell: N≈8V/a^3, with rigorous corrections for surface layers, defects and isotope composition. This formula is teacher enrichment, not required calculation.
Volume and lattice spacing give atom count; mass and molar mass connect that count to NA. The measurement had uncertainty before NA was fixed. For example2015 result6.02214075(12)e23, not exactly the final2019 number.
Photo and educational source, credit NIST: https://www.nist.gov/si-redefinition/kilogram/kilogram-silicon-spheres-and-international-avogadro-project ; image https://www.nist.gov/sites/default/files/images/2018/05/14/siliconsphere-closeup-800_1.png
Measurement: https://www.nist.gov/publications/improved-result-measurement-avogadro-constant-28si-crystal
-->

---

<p class="kicker">Nature of science · evidence or agreement?</p>

# Can a definition be “more accurate”?

<p class="thesis">We measure how nature behaves.<br>We agree how to name a unit.</p>

<MoleReveal label="What became exact in 2019—and what did not?">The count defining one mole became exact. Measuring a real sample’s mass, purity and amount still has uncertainty.</MoleReveal>

<!--
L2 · 2 min · cumulative29/45.
TOK/NOS: distinguish empirical claim from convention. Ask whether fixing a unit can make a dirty sample pure. No: the definition improves the foundation of measurement; it does not abolish practical error. Why preserve continuity rather than choose a radically different size?
Definition source: https://www.bipm.org/en/history-si/mole
-->

---

<p class="kicker">Worked example · a balance becomes a particle counter</p>

# How many molecules are in 9.0 g of water?

<p class="caption"><MoleMath tex="n" /> = amount (mol) · <MoleMath tex="m" /> = mass (g) · <MoleMath tex="M" /> = molar mass (g mol⁻¹) · <MoleMath tex="N" /> = entity count</p>

<div class="formula-stage" style="gap:20px;margin:25px 0">
<div class="formula-step"><span class="small-label">Mass → amount</span><div>

$$n=\frac{m}{M}=\frac{9.0\ \mathrm g}{18.0\ \mathrm{g\,mol^{-1}}}=0.50\ \mathrm{mol}$$

</div></div>
<div class="formula-step" v-click><span class="small-label">Amount → count</span><div>

$$N=nN_A=0.50(6.022\times10^{23})\approx3.0\times10^{23}$$

</div></div>
</div>

<MoleReveal label="How many hydrogen atoms does that water contain?">Two H atoms per molecule: about <MoleMath tex="6.0\times10^{23}" /> H atoms, or <strong>1.0 mol of H atoms</strong>.</MoleReveal>

<p class="caption">Calculator intermediate: <MoleMath tex="3.011\times10^{23}" /> molecules. Report <MoleMath tex="3.0\times10^{23}" /> to match the 9.0 g input. Reverse counting: <MoleMath tex="n=N/N_A" />.</p>

<!--
L2 · 5 min · cumulative34/45. One lecture click, then independent explanation reveal.
Model unit cancellation.9.0/18.0=0.5mol; writing0.50mol matches2sf. Carry guard digits internally rather than rounding every intermediate. Using abbreviated NA gives calculator3.011e23 but report3.0e23molecules. The exact defined NA does not require an uncertain mass to have9digits.
Ask: does1mol water mean1mol atoms? No,3mol total atoms:2molH+1molO. Use specified entity every time. NA unitmol^-1, countN dimensionless but entity label scientifically essential.
Definition https://www.bipm.org/en/history-si/mole
-->

---

<MoleCheck label="Exercise 5 · specify the entity" question="0.25 mol of O₂ contains approximately…" :options="['1.5 × 10²³ O₂ molecules and 3.0 × 10²³ O atoms', '3.0 × 10²³ O₂ molecules and 1.5 × 10²³ O atoms', '1.5 × 10²³ O₂ molecules and 1.5 × 10²³ O atoms', '0.25 O₂ molecules and 0.50 O atoms']" :answer="0" explanation="One quarter of a mole gives about 1.5 × 10²³ O₂ molecules. Each molecule contains two O atoms, so there are about 3.0 × 10²³ O atoms. Always count the named entity—not just the formula on the bottle." />

<!--
L2 · 4 min · cumulative38/45. Mandatory exercise5.
Individual calculation, pair check, choose answer. More digits for checking:1.5055e23O2 and3.011e23O, rounded to2sf. Follow-up: amount of O atoms=0.50mol, total massO2=8.0g usingM32g/mol. A student doubling molecules has reversed the entity relationship.
NA exact definition: https://www.bipm.org/en/history-si/mole . In visible calculator work NA rounded6.022e23 for school arithmetic.
-->

---

<p class="kicker">Transfer problem · change the substance, keep the logic</p>

# A sealed sample contains 11.0 g of CO₂.

<div class="split top">
<div><p class="lede">Use <MoleMath tex="M(\mathrm{CO_2})=44.0\ \mathrm{g\,mol^{-1}}" />.</p><ol class="task-list"><li>Find the amount of CO₂.</li><li>Find the number of CO₂ molecules.</li><li>Find the amount of O atoms.</li></ol></div>
<div><MoleReveal label="Check the whole path."><MoleMath tex="n=0.250" /> mol CO₂.<br><MoleMath tex="N\approx1.51\times10^{23}" /> CO₂ molecules.<br>Two O per molecule: <strong>0.500 mol O atoms</strong>.</MoleReveal><p class="caption">If the mass doubled, which answers would double? Explain without recalculating.</p></div>
</div>

<!--
L2 · 3 min · cumulative41/45. Additional transfer beyond the mandatory5moments.
Answers use3sf. Guard value0.25×6.022e23=1.5055e23→1.51e23. Oatoms amount0.500mol (number3.01e23). All three answers double if mass doubles for unchanged composition. This is a paper problem, no preparation of CO2 required.
If students finish early reverse the chain: a sample has0.500mol O atoms in CO2; infer11.0gCO2. Entity conversion must precede mass calculation.
-->

---

<p class="kicker">Exit ticket · five answers, no notes</p>

# What is a mole really?

<div class="exit-grid">
<MoleReveal label="1 · Why is the count so enormous?">Atomic mass units are about <MoleMath tex="10^{-24}" /> g. A gram-scale batch needs roughly <MoleMath tex="10^{23}" /> such particles.</MoleReveal>
<MoleReveal label="2 · Why not simply 10²⁴?">The historical size preserves the numerical link between particle masses in <MoleMath tex="u" /> and molar masses in g mol⁻¹.</MoleReveal>
<MoleReveal label="3 · Did Avogadro discover this number?">No. His 1811 hypothesis linked equal gas volumes to equal molecular counts. The number was estimated later.</MoleReveal>
<MoleReveal label="4 · What changed in 2019?">Before: atoms in 12 g carbon-12 defined the batch. Now: exactly <MoleMath tex="6.022\,140\,76\times10^{23}" /> entities define one mole.</MoleReveal>
<MoleReveal label="5 · 0.25 mol O₂: how many molecules? How many O atoms?">About <MoleMath tex="1.5\times10^{23}" /> O₂ molecules; twice as many O atoms, about <MoleMath tex="3.0\times10^{23}" />.</MoleReveal>
</div>

<!--
L2 · 3 min · cumulative44/45.
Students write independently, then reveal entries one by one; don't open all answers before commitment. Can collect written answers and leave the reveals for the next lesson.
The early scale factor is an approximate explanation of the magnitude and convenient size; the exact final digits are a2019SI convention anchored in the best measurements. One mole contains an exact count of specified entities.
Sources: https://www.bipm.org/en/history-si/mole ; Marquardt2019 https://iupac.org/wp-content/uploads/sites/4/2020/01/Chem-Int-JULY_2019-IYPT.pdf
-->

---

<p class="kicker">The answer to our opening question</p>

# The mole lets a balance<br>function as a particle counter.

<div class="split" style="grid-template-columns:.9fr 1.1fr;margin-top:0">
<div><p class="major">Weigh the sample.<br>Use its molar mass.<br>Count the entities.</p><p class="lede">The exact modern count preserves a bridge chemists built through measurement.</p></div>
<figure class="balance-photo"><img class="closing-art" :src="'images/analytical-balance.jpg'" alt="The real analytical balance from the opening slide: two suspended weighing pans in a glass case." /><figcaption><a href="image-credits.html" target="_blank" rel="noopener" @click.stop>Photograph: Sarcyn · CC BY-SA 3.0</a></figcaption></figure>
</div>

<!--
L2 · 1 min · cumulative45/45. Historical foundation complete; next come two applied lessons.
Return to18gwater: using roundedM18g/mol gives1mol, about6.022e23molecules. The mass is approximate, so the actual sample particle count is not known exactly. Ask a volunteer for the full spoken chain.
Next: Lesson3 starts at slide29, Lesson4 at slide43. Students now use the historical bridge to make quantitative predictions about actual chemical reactions. Solution stoichiometry is a later unit, not needed here.
The opening photograph returns for narrative closure. Sarcyn, Detail of antique analytical balance (2009), CC BY-SA 3.0, https://commons.wikimedia.org/wiki/File:Analyticalbalance2.jpg ; https://creativecommons.org/licenses/by-sa/3.0/ . Reproduced without alteration. Scientific summary supported by https://www.bipm.org/en/history-si/mole
-->

---
class: lesson-break
---

<p class="kicker">Lesson 3 · 45 minutes · from mass to chemical amount</p>

# The balance speaks grams.<br>Chemistry speaks moles.

<p class="lede">How do we translate between them—and prepare to use a reaction equation?</p>
<div class="bridge-pair"><span>mass, <em>m</em></span><span class="missing">↔</span><span>amount, <em>n</em></span></div>
<p class="caption" style="color:#d8d4ca;margin-top:44px">Today: molar mass · grams ↔ moles · coefficients as mole ratios</p>

<!--
L3 · 2 min · cumulative2/45.
Retrieve the meaning of M before naming an algorithm: one mole of a specified substance has a characteristic mass. Ask how to prepare0.1000molMg with a balance; defer calculation. Four-lesson unit: L1history,L2scale,L3conversions,L4reaction predictions.
New numerical examples use one stated rounded atomic-mass table: H1.01,C12.01,O16.00,Na22.99,Mg24.31,Cl35.45,Ca40.08,Zn65.38. These are classroom approximations, not exact constants or a claim about all isotopic compositions.
Conceptual source: https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept
-->

---

<p class="kicker">Read the formula before reaching for the calculator</p>

# Molar mass counts every atom in the formula.

<p class="reaction-equation"><MoleMath tex="\mathrm{CaCO_3}\qquad M=40.08+12.01+3(16.00)" /></p>
<div class="open-ledger">
<div><strong>40.08</strong><span>one Ca</span></div><b>+</b><div><strong>60.01</strong><span>one C + three O</span></div><b>=</b><div><strong>100.09</strong><span>g mol⁻¹ of CaCO₃</span></div>
</div>
<div class="claim-field">Relative formula mass is a ratio.<br>Molar mass has a unit: g mol⁻¹.</div>
<p class="caption">Atomic masses used here: Ca 40.08 · C 12.01 · O 16.00. CaCO₃ is ionic: count formula units, not discrete CaCO₃ molecules.</p>

<!--
L3 · 3 min · cumulative5/45.
Students identify3oxygen before arithmetic. Relative formula mass100.09 is dimensionless; M≈100.09g/mol. The extraordinarily close correspondence was established in L2; don't reintroduce an exact u-to-g/mol equality. A formula unit specifies the simplest ratio in the ionic solid.
https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept
-->

---

<p class="kicker">Exercise 6 · parentheses matter</p>

# How much does one mole of Ca(OH)₂ weigh?

<p class="lede">Ca 40.08 · O 16.00 · H 1.01. Write the atom count first.</p>
<p class="thesis"><MoleMath tex="\mathrm{Ca(OH)_2}" /></p>
<MoleReveal label="Which atoms does the 2 multiply?">One Ca, <strong>two O and two H</strong>.<br><MoleMath tex="M=40.08+2(16.00+1.01)=74.10\ \mathrm{g\,mol^{-1}}" /></MoleReveal>

<!--
L3 · 3 min · cumulative8/45. Exercise6.
Individual30seconds, compare atom counts before reveal. Wrong57.09 usually forgets the multiplier;73.09 often doubles oxygen but not hydrogen. Contrast CaOH2, which would not encode the same grouping. Calcium hydroxide is an ionic solid, so relative formula mass is preferable to molecular mass.
https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept
-->

---

<p class="kicker">Worked example · grams to moles</p>

# What amount of Mg is in 2.431 g?

<p class="lede">One mole of Mg has a mass of 24.31 g.</p>
<div class="working">
<div><span class="small-label">Choose the relation</span><MoleMath tex="n=\frac{m}{M}" /></div>
<div v-click><span class="small-label">Let units decide</span><MoleMath tex="n=\frac{2.431\ \mathrm g}{24.31\ \mathrm{g\,mol^{-1}}}=0.1000\ \mathrm{mol}" /></div>
</div>
<div class="claim-field">A tenth of the mass of one mole is a tenth of a mole.</div>
<p class="caption">Grams cancel. The remaining unit is mol—not g, and not particles.</p>

<!--
L3 · 4 min · cumulative12/45. One reasoning click.
Estimate before calculate:2.431 is a tenth of24.31. Show g/(g/mol)=mol, then0.1000mol4sf. Ask why multiplying would give the wrong dimension. This is same-substance conversion, not yet a reaction ratio. Retain guard digits in later multistep problems.
https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept
-->

---

<p class="kicker">Exercise 7 · estimate, calculate, check the unit</p>

# Different masses. How many moles?

<p class="lede">Use <MoleMath tex="n=m/M" />. Predict whether each answer is smaller or larger than one mole.</p>
<MoleFlipCards :cards="[
  {front:'4.862 g Mg · M = 24.31 g mol⁻¹',back:'4.862 ÷ 24.31 = 0.2000 mol Mg. One fifth of a mole.',tone:'blue'},
  {front:'3.60 g H₂O · M = 18.02 g mol⁻¹',back:'3.60 ÷ 18.02 = 0.200 mol H₂O, to 3 significant figures.',tone:'green'},
  {front:'22.0 g CO₂ · M = 44.01 g mol⁻¹',back:'22.0 ÷ 44.01 = 0.500 mol CO₂, to 3 significant figures.',tone:'rust'}
]" />

<!--
L3 · 4 min · cumulative16/45. Exercise7.
All write all3answers, then flip independently. Water andMg amounts nearly equal despite different masses. M(H2O)=18.02 from new teaching tableH1.01,O16; L2used18.0 in a2sfexample. CO2=44.01,unrounded n=.499886... . Never infer equal moles from equal grams of different substances.
Own examples using https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept
-->

---

<p class="kicker">Worked example · reverse the translation</p>

# What mass is 0.125 mol of CO₂?

<div class="working">
<div><span class="small-label">Rearrange</span><MoleMath tex="m=nM" /></div>
<div v-click><span class="small-label">Substitute</span><MoleMath tex="m=0.125\ \mathrm{mol}\times44.01\ \mathrm{g\,mol^{-1}}" /></div>
<div v-click><span class="small-label">Report</span><MoleMath tex="m=5.50\ \mathrm g" /></div>
</div>
<p class="worked-note">An eighth of a mole should weigh an eighth of 44.01 g.</p>
<p class="caption">Mol cancels. The result is a mass. Carry 5.50125 g internally; report 5.50 g to 3 significant figures.</p>

<!--
L3 · 4 min · cumulative20/45. Two lecture clicks.
Students derive m=nM by multiplying n=m/M byM. Check estimate before revealing. No assumption about gas volume or pressure is needed for this mass calculation. Distinguish amount from volume; do not introduce24dm3/mol shortcuts.
https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept
-->

---

<p class="kicker">Prediction workbench · same substance, two descriptions</p>

# Change the mass. Predict the amount.

<MassAmountExplorer />

<!--
L3 · 3 min · cumulative23/45.
Predict2.431gMg→.1000mol, double input4.862g→.2000mol. Reverse direction without changing the physical sample: input becomes.2000mol and output4.862g. Keep mass4.862g and change substance: differentM changesn. Native keyboard-operable select and numeric input; Reset restores starting case. Print shows the current readable calculation; default fresh export uses starting case. Calculator displays4sf but that is not an instruction to overreport precision.
Scientific model n=m/M,m=nM; src lib/stoichiometry.ts. No particle simulation. https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept
-->

---

<MoleCheck label="Exercise 8 · reverse conversion" question="You need 0.150 mol of Zn. M(Zn) = 65.38 g mol⁻¹. Which mass should you predict?" :options="['0.00229 g, because amount must be divided by M', '9.81 g, because mass is amount multiplied by M', '436 g, because M must be divided by amount', '65.38 g, because every sample is one mole']" :answer="1" explanation="m = nM = 0.150 × 65.38 = 9.807 g, reported as 9.81 g. The units mol × g mol⁻¹ leave grams. Since 0.150 mol is less than one mole, the mass must be less than 65.38 g." />

<!--
L3 · 3 min · cumulative26/45. Exercise8.
Students explain unit cancellation and reasonableness, not just optionB. Follow-up inverse9.81/65.38≈.150mol. This is a calculation, not a direction to distribute zinc metal for unsupervised work.
https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept
-->

---

<p class="kicker">Small sample · the unit prefix is part of the data</p>

# The balance reads 250.0 mg of Mg.

<div class="working">
<div><span class="small-label">Convert the unit</span><MoleMath tex="250.0\ \mathrm{mg}=0.2500\ \mathrm g" /></div>
<div v-click><span class="small-label">Then convert to mol</span><MoleMath tex="n=\frac{0.2500}{24.31}=0.01028\ \mathrm{mol}" /></div>
</div>
<MoleReveal label="Why is 10.28 mol impossible here?">That answer treats <strong>milligrams as grams</strong>. It overestimates the amount by a factor of 1 000.</MoleReveal>

<!--
L3 · 3 min · cumulative29/45.
The1000mg/g conversion is exact;250.0mg and24.31g/mol justify4sf:0.010283833...→.01028. Could useM24310mg/mol instead, if units stay consistent. Ask which unit conversion students would need forkg. Do not call a balance's display resolution its accuracy.
https://openstax.org/books/chemistry-2e/pages/3-1-formula-mass-and-the-mole-concept
-->

---

<p class="kicker">Error clinic · the units expose the mistake</p>

# “4.40 × 44.01 = 193.6 mol of CO₂.”

<p class="lede">A student has 4.40 g of CO₂. Their arithmetic works.<br>Their physical reasoning does not.</p>
<p class="reaction-equation rust"><MoleMath tex="\mathrm g\times\mathrm{g\,mol^{-1}}=\mathrm{g^2\,mol^{-1}}\ne\mathrm{mol}" /></p>
<MoleReveal label="Repair the method—not just the number."><MoleMath tex="n=\frac{4.40\ \mathrm g}{44.01\ \mathrm{g\,mol^{-1}}}=0.100\ \mathrm{mol}" /><br>A mass close to one tenth of 44.01 g must be close to one tenth of a mole.</MoleReveal>

<!--
L3 · 3 min · cumulative32/45.
Ask learners to annotate the incorrect expression before opening explanation. Calculator product193.644 rounds193.6 to4sf but even perfect arithmetic cannot make the unitsmol. Correct value.099977... rounds.100mol3sf. NOS link: internal dimensional consistency is necessary, not sufficient, for a model to be right.
-->

---

<p class="kicker">A real reaction · zinc and hydrochloric acid</p>

# Bubbles are evidence.<br>The equation tells us what to count.

<p class="reaction-equation"><MoleMath tex="\mathrm{Zn(s)}+2\mathrm{HCl(aq)}\rightarrow\mathrm{ZnCl_2(aq)}+\mathrm{H_2(g)}" /></p>
<div class="split top">
<div><h2>Observation</h2><p>Zinc is consumed and gas bubbles form.</p><p class="caption">The appearance of bubbles alone does not identify the gas.</p></div>
<div><h2>Reaction model</h2><p>One mole of Zn reacts with two moles of HCl to produce one mole of H₂.</p><p class="caption">(s) solid · (aq) dissolved in water · (g) gas</p></div>
</div>

<!--
L3 · 3 min · cumulative35/45.
CountZn1,H2,Cl2 on each side. The chloride remains in aqueous zinc chloride; the gaseous product is hydrogen. Chemical formulas represent composition; aqueous species are not necessarily intact molecules. Need independent evidence to identify gas; do not direct an unassessed hydrogen ignition test. This lesson requires no chemical practical. Any later demonstration needs teacher risk assessment and school controls.
Balancing and state notation: https://openstax.org/books/chemistry-2e/pages/4-1-writing-and-balancing-chemical-equations
-->

---

<MoleCheck label="Exercise 9 · change coefficients, not identities" question="Magnesium reacts with oxygen to form magnesium oxide. Which equation conserves every atom?" :options="['Mg + O₂ → MgO', 'Mg + O₂ → MgO₂', '2Mg + O₂ → 2MgO', '2Mg + 2O₂ → 2MgO']" :answer="2" explanation="2Mg + O₂ → 2MgO has 2 Mg atoms and 2 O atoms on each side. A coefficient multiplies the whole formula. Changing MgO to MgO₂ changes the substance; it does not balance the intended reaction." />

<!--
L3 · 4 min · cumulative39/45. Exercise9.
Write Mg(s),O2(g),MgO(s) in notebooks after selecting. Students explain why changing subscripts is forbidden. In the simplified quantitative model the metal forms onlyMgO with oxygen; real burning in air may have side reactions such as nitride formation. No student burning experiment is instructed.
https://openstax.org/books/chemistry-2e/pages/4-1-writing-and-balancing-chemical-equations
RSC magnesium source: https://edu.rsc.org/balanced-chemical-equations/the-change-in-mass-when-magnesium-burns/718.article
-->

---

<p class="kicker">An equation is a recipe in moles</p>

# The 2 : 1 : 2 ratio scales to any amount.

<p class="reaction-equation"><MoleMath tex="2\mathrm{Mg(s)}+\mathrm{O_2(g)}\rightarrow2\mathrm{MgO(s)}" /></p>
<div class="open-ledger">
<div><strong>2 mol</strong><span>Mg</span></div><b>+</b><div><strong>1 mol</strong><span>O₂</span></div><b>→</b><div><strong>2 mol</strong><span>MgO</span></div>
</div>
<div v-click class="claim-field"><MoleMath tex="0.100\ \mathrm{mol\ O_2}\times\frac{2\ \mathrm{mol\ MgO}}{1\ \mathrm{mol\ O_2}}=0.200\ \mathrm{mol\ MgO}" /></div>
<p class="caption">Magnesium is in excess; all the oxygen reacts. Coefficients relate amounts, not masses in grams.</p>

<!--
L3 · 3 min · cumulative42/45. One click.
Students write product coefficient/given-reactant coefficient. Doubling amount ofO2 doubles predictedMgO if excessMg assumption remains true. Explain why ratios also apply to particles/formula units. They do not directly apply to masses because substances have differentM.
https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry
-->

---

<p class="kicker">Lesson 3 exit · explain each operation</p>

# Which bridge do you need?

<div class="exit-grid">
<MoleReveal label="1 · 6.00 g water; M = 18.02 g mol⁻¹. Find n.">Divide by M:<br><MoleMath tex="n=6.00/18.02=0.333\ \mathrm{mol}" />.</MoleReveal>
<MoleReveal label="2 · 0.200 mol CO₂; M = 44.01 g mol⁻¹. Find m.">Multiply by M:<br><MoleMath tex="m=0.200(44.01)=8.80\ \mathrm g" />.</MoleReveal>
<MoleReveal label="3 · 0.300 mol HCl reacts with excess Zn. Find n(H₂).">Use <MoleMath tex="\mathrm{Zn}+2\mathrm{HCl}\rightarrow\mathrm{ZnCl_2}+\mathrm{H_2}" />.<br><MoleMath tex="n(\mathrm{H_2})=0.300\times\frac12=0.150\ \mathrm{mol}" />. The equation ratio is not a grams-to-grams shortcut.</MoleReveal>
</div>

<!--
L3 · 3 min · cumulative45/45.
Collect three short answers plus named operation.6/18.02=.332963→.333mol; .200×44.01=8.802→8.80g; .300/2=.150mol. Reaction assumed complete withZn excess. Use exit slips to decide whether to reteach unit conversion at next lesson start.
-->

---
class: lesson-break photo-act
---

<figure class="balance-photo"><img :src="'images/magnesium-burning.jpg'" alt="Real photograph of a magnesium ribbon burning brightly, with pale solid product forming beside it." /><figcaption><a href="image-credits.html#magnesium" target="_blank" rel="noopener" @click.stop>Capt. John Yossarian · CC BY-SA 3.0</a></figcaption></figure>
<div><p class="kicker">Lesson 4 · 45 minutes · predicting product mass</p>

# Bright light.<br>A new solid.<br>How much?

<p class="lede">A reaction changes substances.<br>Can a balance and an equation predict what we will obtain?</p></div>

<!--
L4 · 2 min · cumulative2/45.
Image story: magnesium ribbon burns, solidoxide forms. Retrieve conservation of atoms; invite predictions about product mass before formula manipulation. Photograph not a quantitative measurement or a practical instruction; do not stare directly at burningMg. Any live demonstration requires teacher risk assessment. Ideal calculation modelsMgO only; air can permit otherproducts.
Photograph Capt. John Yossarian, Magnesium ribbon burning, CC BY-SA3.0, https://commons.wikimedia.org/wiki/File:Magnesium_ribbon_burning.jpg ; https://creativecommons.org/licenses/by-sa/3.0/ . Original file unaltered, browser-framed.
Reaction source https://edu.rsc.org/balanced-chemical-equations/the-change-in-mass-when-magnesium-burns/718.article
-->

---

<MoleCheck label="Prediction · before calculating" question="2.431 g of pure Mg reacts completely with excess oxygen to form only MgO. The theoretical MgO mass is…" :options="['less than 2.431 g: burning always removes mass', 'exactly 2.431 g: the product can contain only the starting mass of Mg', 'greater than 2.431 g: oxygen becomes part of the solid', 'unrelated to the amount of Mg used']" :answer="2" explanation="Oxygen from outside the weighed metal joins the magnesium. The MgO mass includes both elements. Total mass is conserved when the consumed oxygen is included; the mass of the solid alone can increase." />

<!--
L4 · 2 min · cumulative4/45.
Separate system boundary from law: initialMg mass is not initialtotalreactant mass. Oxygen is matter, not merely a condition for combustion. Ask whether same reasoning applies to rusting. Prediction constrains the coming numericalanswer.
https://edu.rsc.org/balanced-chemical-equations/the-change-in-mass-when-magnesium-burns/718.article
-->

---

<p class="kicker">Theoretical yield · a prediction with conditions</p>

# How much product could this reaction make?

<p class="thesis" style="font-size:52px">The calculated maximum<br>for the specified reaction<br>and available reactants.</p>
<p class="lede">Our first model: pure Mg, oxygen in excess, complete conversion to MgO.</p>
<MoleReveal label="Is this a promise about the mass we will collect?">No. Incomplete reaction, side reactions and collection losses can lower the actual yield. Wet or impure product can give a misleadingly high measured mass.</MoleReveal>

<!--
L4 · 3 min · cumulative7/45.
Definitiontheoreticalyield maximum product under specifiedstoichiometry and limitingreactant. Do not equate all collected mass to pureproduct. Explainexcess: moreO2 is available than needed to consume allMg; its exact amount neednot be known in this first model. LaterL4slides relaxpurity andexcess assumptions.
https://openstax.org/books/chemistry-2e/pages/4-4-reaction-yields
-->

---

<p class="kicker">Worked reaction · 2.431 g Mg, oxygen in excess</p>

# Grams cannot cross the equation directly.

<p class="reaction-equation"><MoleMath tex="2\mathrm{Mg(s)}+\mathrm{O_2(g)}\rightarrow2\mathrm{MgO(s)}" /></p>
<div class="working" style="gap:28px">
<div v-click><span class="small-label">1 · Mg grams → mol</span><MoleMath tex="n(\mathrm{Mg})=\frac{2.431}{24.31}=0.1000\ \mathrm{mol}" /></div>
<div v-click><span class="small-label">2 · Apply 2 : 2</span><MoleMath tex="n(\mathrm{MgO})=0.1000\times\frac22=0.1000\ \mathrm{mol}" /></div>
<div v-click><span class="small-label">3 · MgO mol → grams</span><MoleMath tex="m(\mathrm{MgO})=0.1000\times40.31=4.031\ \mathrm g" /></div>
</div>
<p class="caption">M(Mg) = 24.31; M(MgO) = 40.31 g mol⁻¹. Predicted oxygen gain: 4.031 − 2.431 = 1.600 g.</p>

<!--
L4 · 5 min · cumulative12/45. Three lecture clicks; students predict each next operation.
Firstdivide startingmass bystartingM, thentransfer in molesusingproduct/givencoefficients, thenmultiplyproductamount byproductM. Coefficients2/2 are exact countrelations;M andmassrounded4sf. Check massincrease1.600g equals.05000molO2×32.00g/mol. AllMg→MgO assumed; no nitride sideproduct.
https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry
-->

---

<p class="kicker">Same reaction · now audit conservation</p>

# 2 : 1 : 2 in moles is not 2 : 1 : 2 in grams.

<div class="open-ledger" style="margin-top:62px">
<div><strong>48.62 g</strong><span>2 mol Mg</span></div><b>+</b><div><strong>32.00 g</strong><span>1 mol O₂</span></div><b>=</b><div><strong>80.62 g</strong><span>2 mol MgO</span></div>
</div>
<div class="claim-field">The mole ratio conserves atoms.<br>The corresponding masses add up.</div>
<p class="lede">One mole of Mg and one mole of MgO contain the same amount of Mg atoms—but have different masses.</p>

<!--
L4 · 2 min · cumulative14/45.
Scaling46 by20 produces48.62+32=80.62g. Showincorrect shortcutmMgO=mMg×2/2 would give2.431g and omit oxygenmass. Numbers use sameroundedMtable, so displayedmassbalance closes exactly at shownprecision.
https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry
-->

---

<p class="kicker">Exercise 10 · begin with the other reactant</p>

# 4.00 g O₂ reacts with excess magnesium.

<p class="reaction-equation"><MoleMath tex="2\mathrm{Mg}+\mathrm{O_2}\rightarrow2\mathrm{MgO}" /></p>
<p class="lede">Predict the theoretical MgO mass.<br>M(O₂) = 32.00; M(MgO) = 40.31 g mol⁻¹.</p>
<MoleReveal label="Check the coefficient ratio before checking the final mass."><MoleMath tex="n(\mathrm{O_2})=4.00/32.00=0.125\ \mathrm{mol}" /><br><MoleMath tex="n(\mathrm{MgO})=0.125\times2=0.250\ \mathrm{mol}" /><br><MoleMath tex="m(\mathrm{MgO})=0.250(40.31)=10.1\ \mathrm g" /></MoleReveal>

<!--
L4 · 4 min · cumulative18/45. Exercise10.
Independent2minutes plus pairedexplanation. Unroundedproduct10.0775g→10.1g3sf. If answer5.04g, learnerused1:1 instead2:1. Productmass>4g becauseMg alsojoins. Coefficients chosen for givenspeciesO2 nowb/a=2/1, not2/2 frompriorMg example.
https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry
-->

---

<p class="kicker">Reaction workbench · one method, different chemistry</p>

# Keep the route. Change the reaction.

<ProductMassExplorer />

<!--
L4 · 3 min · cumulative21/45.
Default2.431gMg→4.031gMgO. Doublemass andpredictdoublingoutput. Switch toO2 startingreactant,set4.00g: ratiochanges2/1 andtheory10.08gcalculator (report10.1g3sf). Then CaCO3 orZn: studentsidentifywhatM andratiochange. Native select/input accessible; no effect masquerading as moleculargeometry. Print exports readablecurrentstate; freshloaddefault. Allcases conditionalcomplete/purereaction withstatedexcess asneeded. UnitsM g/mol.
Sources https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry ; https://openstax.org/books/chemistry-2e/pages/4-4-reaction-yields
-->

---

<p class="kicker">Case study · limestone to lime</p>

# The solid gets lighter. Where did the mass go?

<div class="reaction-story">
<figure class="balance-photo"><img class="reaction-photo" :src="'images/limestone-quarry.jpg'" alt="Limestone quarry beside Dunbar Cement Works: exposed rock benches with the plant in the background." /><figcaption><a href="image-credits.html#limestone" target="_blank" rel="noopener" @click.stop>Richard Webb · CC BY-SA 2.0</a></figcaption></figure>
<div><p><MoleMath tex="\mathrm{CaCO_3(s)}\xrightarrow{\Delta}\mathrm{CaO(s)}+\mathrm{CO_2(g)}" /></p><p>Heat <strong>10.0 g of pure CaCO₃</strong> until decomposition is complete.</p><p class="caption">M: CaCO₃ 100.09 · CaO 56.08 · CO₂ 44.01 g mol⁻¹</p><MoleReveal label="Predict both products."><strong>5.60 g CaO</strong> remains.<br><strong>4.40 g CO₂</strong> leaves as gas.<br>The total is still 10.0 g.</MoleReveal></div>
</div>

<!--
L4 · 4 min · cumulative25/45.
Workedcase, not anexperimentprocedure.10/100.09=.09991008mol; bothproducts1:1 soCaO5.602957→5.60g;CO24.39704→4.40g. The actualrockphotois illustrative; no purity claim about thatquarry. Limeproduction is relevant tocement manufacture, butcement is not simplyCaO. Δmeansheating, notadditionalreactant.
Reaction https://edu.rsc.org/experiments/thermal-decomposition-of-calcium-carbonate/704.article
Image Richard Webb, Limestone quarry,Dunbar Cement Works,12April2021, https://commons.wikimedia.org/wiki/File:Limestone_quarry,_Dunbar_Cement_Works_-_geograph.org.uk_-_6833222.jpg ; https://www.geograph.org.uk/photo/6833222 ; CC BY-SA2.0 https://creativecommons.org/licenses/by-sa/2.0/ . Reusedphoto unaltered,browserframed.
-->

---

<p class="kicker">Exercise 11 · a real rock is not a pure reagent</p>

# Only 80.0% of this 25.0 g rock is CaCO₃.

<p class="lede">The rest is inert. All the CaCO₃ decomposes.<br>What is the theoretical mass of <strong>CaO produced</strong>?</p>
<p class="reaction-equation"><MoleMath tex="\mathrm{CaCO_3}\xrightarrow{\Delta}\mathrm{CaO}+\mathrm{CO_2}" /></p>
<MoleReveal label="Which mass belongs at the start of the mole calculation?"><MoleMath tex="m(\mathrm{CaCO_3})=25.0(0.800)=20.0\ \mathrm g" /><br><MoleMath tex="m(\mathrm{CaO})=\frac{20.0}{100.09}\times56.08=11.2\ \mathrm g" /></MoleReveal>
<p class="caption">M(CaCO₃) = 100.09; M(CaO) = 56.08 g mol⁻¹. CaO mass is not the mass of the whole residue.</p>

<!--
L4 · 3 min · cumulative28/45. Exercise11.
Purity is massfraction by givenproblemstatement. Reacting20g, inert5g. CaO11.2059→11.2g3sf; residueCaO+inert=16.2g; evolvedCO28.79g3sf. Optionalextension asksresidue toforceentityspecification. Data inventedforcalculation, not measuredcomposition ofpicturedrock.
https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry
-->

---

<p class="kicker">A metal can produce a much smaller mass of gas</p>

# 6.538 g Zn: how much hydrogen?

<p class="reaction-equation"><MoleMath tex="\mathrm{Zn(s)}+2\mathrm{HCl(aq)}\rightarrow\mathrm{ZnCl_2(aq)}+\mathrm{H_2(g)}" /></p>
<div class="working">
<div><span class="small-label">Zn grams → mol</span><MoleMath tex="n(\mathrm{Zn})=6.538/65.38=0.1000\ \mathrm{mol}" /></div>
<div v-click><span class="small-label">Zn : H₂ = 1 : 1</span><MoleMath tex="n(\mathrm{H_2})=0.1000\ \mathrm{mol}" /></div>
<div v-click><span class="small-label">H₂ mol → grams</span><MoleMath tex="m(\mathrm{H_2})=0.1000(2.02)=0.202\ \mathrm g" /></div>
</div>
<p class="caption">Pure Zn reacts completely; HCl is in excess. M(Zn) = 65.38; M(H₂) = 2.02 g mol⁻¹. The Zn atoms finish in ZnCl₂—not in H₂.</p>

<!--
L4 · 4 min · cumulative32/45. Twolectureclicks.
Usecoefficient ratioH2/Zn=1/1, not2fromHCl. Thehydrogenatoms originateinacid, notmetalturningintohydrogen. Predicted0.202g3sf islimitedbygivenM(H2)2.02; guardvalue.2020. If fineratomicdatawereused, answerdiffersslightly: teachconsistentprovideddata. Theproductgas representsonlyonepartoftotalproductmass.
https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry
-->

---

<p class="kicker">Remove an assumption · neither reactant is guaranteed to be in excess</p>

# Which reactant sets the ceiling?

<p class="reaction-equation"><MoleMath tex="\mathrm{Zn}+2\mathrm{HCl}\rightarrow\mathrm{ZnCl_2}+\mathrm{H_2}" /></p>
<div class="split top" style="margin-top:20px">
<div class="soft-field blue-field"><h2>0.100 mol Zn</h2><p>Could produce<br><strong>0.100 mol H₂</strong><br>if enough acid were available.</p></div>
<div class="soft-field rust-field"><h2>0.120 mol HCl</h2><p>Could produce<br><strong>0.0600 mol H₂</strong><br>because two HCl are needed per H₂.</p></div>
</div>
<div style="margin-top:24px"><MoleReveal label="Both supplies must support the same reaction. Which runs out first?">HCl limits the reaction: <strong>0.0600 mol H₂ ≈ 0.121 g</strong>.<br>Zn left: <MoleMath tex="0.100-0.0600=0.040\ \mathrm{mol}" />.</MoleReveal></div>

<!--
L4 · 4 min · cumulative36/45.
Introductorylimitingcase avoidsconfoundingmassconversions. Independentcapacitiescompare n/a oramountofsameproduct: min(.100/1,.120/2)=.0600mol reactionextent. H2.0600×2.02=.1212→.121g. Znresidual .040mol reportedtolessprecise.001molgivenZn; internal.0400. Wrong'Znlimitsbecause.100<.120' ignores2:1. No water/hydrogenlaunch orgasapparatusanimationneeded.
https://openstax.org/books/chemistry-2e/pages/4-4-reaction-yields
-->

---

<p class="kicker">Data interpretation · prediction is not collection</p>

# We predicted 4.031 g MgO. We collected 3.63 g.

<p class="reaction-equation"><MoleMath tex="\%\ \mathrm{yield}=\frac{m_\mathrm{actual}}{m_\mathrm{theoretical}}\times100" /></p>
<MoleReveal label="Calculate the yield. Then explain what it does—and does not—tell us."><MoleMath tex="\frac{3.63}{4.031}\times100=90.1\%" /><br>It compares collected product with the prediction. It does not identify which loss or side reaction occurred.</MoleReveal>
<p class="worked-note">NOS question: another group reports 4.20 g. Has conservation of mass failed—or should we inspect the sample and assumptions?</p>
<p class="caption">Constructed teaching data. Assume the 3.63 g sample is dry, pure MgO.</p>

<!--
L4 · 3 min · cumulative39/45.
3.63/4.031×100=90.0521→90.1%3sf.4.20/4.031=104.19%4sf (~104%3sf) flags wet/contaminatedsample,tareerror,incorrectcompositionorprediction. Cannot inferaunique cause fromyieldalone. Discuss distinguishesobservedmass frominferredpureproductmass, linkL1measurementandNOS. Lowerobservedyield mayreflectincompleteconversion,sidereaction,handlingloss. Assumeddrypure lowercase; don'toverclaim90.1%reactionconversion.
https://openstax.org/books/chemistry-2e/pages/4-4-reaction-yields
-->

---

<p class="kicker">Exercise 12 · transfer to an unfamiliar equation</p>

# Heating 8.40 g NaHCO₃: predict the CO₂ mass.

<p class="reaction-equation" style="font-size:27px"><MoleMath tex="2\mathrm{NaHCO_3(s)}\xrightarrow{\Delta}\mathrm{Na_2CO_3(s)}+\mathrm{CO_2(g)}+\mathrm{H_2O(g)}" /></p>
<p class="lede">Pure sodium hydrogencarbonate decomposes completely.<br>M(NaHCO₃) = 84.01; M(CO₂) = 44.01 g mol⁻¹.</p>
<MoleReveal label="Write the three-step route before revealing the result."><MoleMath tex="n(\mathrm{NaHCO_3})=8.40/84.01" /><br><MoleMath tex="n(\mathrm{CO_2})=n(\mathrm{NaHCO_3})\times\frac12" /><br><MoleMath tex="m(\mathrm{CO_2})=\frac{8.40}{84.01}\times\frac12\times44.01=2.20\ \mathrm g" /></MoleReveal>

<!--
L4 · 4 min · cumulative43/45. Exercise12. Transferassessment: no newreactionprocedure.
BalancedNa2,H2,C2,O6eachside. nNaHCO3=.0999881...;CO2=.0499940...;mass2.200238→2.20g3sf.2:1 is theinverse ratiofromO2→MgO,soforcesreadingratherthanmemorizingdoubling. Wateralsoescapesonheating;do nottreatallmasslossasCO2alone. Collectmethodwithunits;fullmarksrequirebalanced-ratio reasoning, notonlycorrectfinalnumber.
Reaction andstoichiometry principles: https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry
-->

---

<p class="kicker">The historical bridge becomes a working method</p>

# Weigh. Convert. Use the ratio. Predict.

<div class="working" style="margin-top:40px">
<div><span class="small-label" style="text-transform:none">For aA → bB</span><MoleMath tex="m_B=\frac{m_A}{M_A}\times\frac{b}{a}\times M_B" /></div>
</div>
<p class="major">The equation links amounts.<br>Molar masses link those amounts to the balance.</p>
<MoleReveal label="Why did these product-mass calculations not need the Avogadro constant?">The particle-count factor cancels when we compare amounts. Balanced coefficients already give the <strong>mole ratio</strong>.</MoleReveal>
<p class="caption">Always state the reaction, limiting reactant and assumptions. A theoretical mass is a conditional prediction.</p>

<!--
L4 · 2 min · cumulative45/45. Fourlessonscomplete:180min,total56slides.
Ask studentexplainwhy masscannotgodirectlyacrossequationwithoutmolar-massfactors. DerivationnB/nA=(NB/NAconstant)/(NAentities/NAconstant)=b/a for reactionstoichiometry; avoidambiguousNA symbol verbally. Generalformula assumesA is limiting or othersufficient,andknownpurityandconversion. Routeworkssharedstoichiometryacrossallstudiedcases, butnot blindlyforunknownmixtures orcompetingreactions.
Finalretrievalprompt: giveadifferentMgstartingmass andask forspokenmethod,notfurtherarithmetic. Futureunit: solutionconcentration,experimentaluncertainty andmorecomplexlimitingreagents.
https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry ; https://openstax.org/books/chemistry-2e/pages/4-4-reaction-yields
-->
