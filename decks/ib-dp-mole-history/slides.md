---
theme: default
title: How do you count what you cannot see?
titleTemplate: '%s · The mole and its history'
info: |
  IB DP Year 1 chemistry. Two 45-minute lessons.
  History, the atomic-mass bridge, the exact Avogadro constant, and particle calculations.
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
L2 · 1 min · cumulative45/45. Two lessons complete,90minutes total.
Return to18gwater: using roundedM18g/mol gives1mol, about6.022e23molecules. The mass is approximate, so the actual sample particle count is not known exactly. Ask a volunteer for the full spoken chain.
Next step for IB DP Year 1: extend amount-of-substance reasoning to equations, limiting reactants and solution stoichiometry. The five checks diagnose prerequisite fluency, while the historical argument, measurement uncertainty and NOS discussion develop the DP-level interpretation.
The opening photograph returns for narrative closure. Sarcyn, Detail of antique analytical balance (2009), CC BY-SA 3.0, https://commons.wikimedia.org/wiki/File:Analyticalbalance2.jpg ; https://creativecommons.org/licenses/by-sa/3.0/ . Reproduced without alteration. Scientific summary supported by https://www.bipm.org/en/history-si/mole
-->
