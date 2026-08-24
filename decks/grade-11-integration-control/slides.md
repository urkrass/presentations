---
theme: default
title: Signals, Coordination, and Control
titleTemplate: '%s - Slidev'
info: |
  Grade 11 IB Biology SL/HL
  C3.1 Integration of body systems
  Three 45-minute lessons plus a 60–90 minute investigation extension
class: integration-deck
canvasWidth: 1280
drawings:
  persist: false
transition: fade-out
mdc: true
fonts:
  sans: Arial
  serif: Georgia
  mono: Consolas
---

<div class="cover-grid">
  <div class="cover-copy">
    <p class="eyebrow">Grade 11 · IB Biology SL/HL · C3.1</p>
    <h1>Signals, coordination, and control</h1>
    <p class="cover-subtitle">How animals and plants sense change, integrate information, and produce a coordinated response.</p>
  </div>
  <div class="cover-visual" aria-label="Human nervous system beside a plant bending toward light">
    <img :src="'images/nervous-system.svg'" alt="Unlabelled human nervous system diagram" />
    <div class="cover-plant" aria-hidden="true"><span class="sun"></span><span class="stem"></span><span class="leaf one"></span><span class="leaf two"></span><span class="pot"></span></div>
    <p class="cover-caption">Electrical signals, chemical messages, and feedback make an organism more than separate parts.</p>
  </div>
</div>

<!--
[Timing] 1 minute
[Teacher prompt] Ask: what is one problem a large organism must solve that a single cell does not?
[Sources]
- https://drive.google.com/file/d/1sxAJO5VqcUimrNqPiiiFPdsASEApkrsZ/view — The big picture, pp. 1–3.
- https://commons.wikimedia.org/wiki/File:Nervous_system_diagram_unlabeled.svg — nervous system image, CC BY-SA 4.0.
[/Sources]
-->

---
class: thesis-slide
---

# A city is not a pile of roads

<p class="thesis">It functions because transport, waste removal, communication, and decision-making are <strong>integrated</strong>.</p>
<p class="thesis-support">A multicellular organism has the same challenge: trillions of specialised cells must act as one changing system.</p>

<!--
[Timing] 3 minutes
[Teacher prompt] Use the city analogy from the source. Students name the biological equivalent of roads, sewage, authorities, and alerts.
[Sources]
- https://drive.google.com/file/d/1sxAJO5VqcUimrNqPiiiFPdsASEApkrsZ/view — The big picture, pp. 1–2.
- https://drive.google.com/file/d/1b3P07ps_14bBO_uRabODohOkdfjrRLbJ/view — Hierarchy and emergent properties, pp. 1–3.
[/Sources]
-->

---

# Three lessons, one question

<div class="route-map">
  <article><span>Lesson 1</span><strong>Animal information</strong><p>Organisation, emergence, nervous and endocrine signalling, neurons, reflexes, and coordination.</p><small>45 minutes</small></article>
  <article><span>Lesson 2</span><strong>Regulation</strong><p>Melatonin, epinephrine, endocrine command centres, feedback, ventilation, circulation, and the ENS.</p><small>45 minutes</small></article>
  <article><span>Lesson 3 · HL</span><strong>Plant information</strong><p>Tropisms, phytohormones, auxin transport and growth, hormone ratios, ethylene, and investigation design.</p><small>45 minutes + practical extension</small></article>
</div>

<p class="question-line">How does a signal become a response that is appropriate in direction, size, and duration?</p>

<!--
[Timing] 2 minutes
[Teacher prompt] Name the common thread: information must be detected, transmitted, integrated, and acted upon.
[Sources]
- https://drive.google.com/file/d/1XDRgXlcAEV1Vh5yriGBf7VVqNlumAagu/view — C3.1 checklist, pp. 3–4.
[/Sources]
-->

---

# Entry diagnostic: commit before the reveal

<div class="diagnostic-grid">
  <p><span>1</span><strong>A tissue is a group of similar cells acting as a unit. True or false?</strong></p>
  <p><span>2</span><strong>Which signal is usually faster: a nerve impulse or a hormone?</strong></p>
  <p><span>3</span><strong>Sensory neurons carry impulses toward or away from the CNS?</strong></p>
  <p><span>4</span><strong>Which brain region fine-tunes movement and balance?</strong></p>
  <p><span>5</span><strong>Does negative feedback amplify or reduce the original change?</strong></p>
  <p><span>6</span><strong>What direction is positive phototropism?</strong></p>
</div>

<p class="diagnostic-key" v-click>1 true · 2 nerve impulse · 3 toward · 4 cerebellum · 5 reduce · 6 shoot growth toward light</p>

<!--
[Timing] 5 minutes
[Teacher prompt] Students answer individually, then compare in pairs. Use errors to decide where to slow down.
[Sources]
- https://drive.google.com/file/d/1O5wbU8t7yUd1Ge1biq3eTsSHvWVs4TlY/view — Summary and key terms, pp. 1–5.
[/Sources]
-->

---

# Organisation increases in scale—and in possibility

<div class="hierarchy-chain">
  <div><span>level 1</span><strong>Cell</strong><small>a basic structural and functional unit</small></div><b>→</b>
  <div><span>level 2</span><strong>Tissue</strong><small>similar cells acting together</small></div><b>→</b>
  <div><span>level 3</span><strong>Organ</strong><small>several tissues with a shared function</small></div><b>→</b>
  <div><span>level 4</span><strong>System</strong><small>organs coordinating a major process</small></div><b>→</b>
  <div><span>level 5</span><strong>Organism</strong><small>integrated systems maintaining life</small></div>
</div>

<p class="question-line">At each level, interactions create properties that the parts do not show alone.</p>

<!--
[Timing] 4 minutes
[Teacher prompt] Ask for one example at each level using the digestive system.
[Sources]
- https://drive.google.com/file/d/1b3P07ps_14bBO_uRabODohOkdfjrRLbJ/view — Hierarchy and emergent properties, pp. 3–5.
[/Sources]
-->

---

# Emergence: no single cheetah part is “speed”

<div class="emergence-case">
  <div class="cheetah-figure" aria-label="Stylised running cheetah"><span class="cheetah-body"></span><span class="cheetah-leg a"></span><span class="cheetah-leg b"></span><span class="cheetah-leg c"></span><span class="cheetah-leg d"></span><p>predation is a system-level performance</p></div>
  <div class="emergence-copy">
    <p><span>Musculoskeletal</span><strong>Long limbs, flexible spine, and coordinated muscle force generate acceleration.</strong></p>
    <p><span>Respiratory + circulatory</span><strong>Gas exchange and transport sustain intense cellular respiration.</strong></p>
    <p><span>Nervous</span><strong>Sensory input, timing, balance, and motor control shape the chase.</strong></p>
    <p><span>Behaviour</span><strong>Hunting strategy and cooperation add properties beyond anatomy alone.</strong></p>
  </div>
</div>

<!--
[Timing] 3 minutes
[Teacher prompt] Define emergent property: a property that arises from integration of subsystems and is not predictable from one component alone.
[Sources]
- https://drive.google.com/file/d/1b3P07ps_14bBO_uRabODohOkdfjrRLbJ/view — Hierarchy and emergent properties, pp. 5–6.
[/Sources]
-->

---

# Integration is the missing verb

<div class="signal-loop">
  <div><span>1 · input</span><strong>A change occurs</strong><p>inside the body or in the environment</p></div><b>→</b>
  <div><span>2 · detection</span><strong>A receptor senses it</strong><p>and converts it into biological information</p></div><b>→</b>
  <div><span>3 · integration</span><strong>A centre interprets it</strong><p>brain, spinal cord, endocrine axis, or local network</p></div><b>→</b>
  <div><span>4 · output</span><strong>An effector responds</strong><p>muscle, gland, tissue, or growing plant region</p></div>
</div>

<p class="question-line">Feedback tells the system whether the response corrected—or amplified—the original change.</p>

<!--
[Timing] 4 minutes
[Teacher prompt] Keep this model visible in students' notes. Every later case should be mapped to the four stages.
[Sources]
- https://drive.google.com/file/d/1Rls3syMDoCs9p0SDIM1ddE5mLEnFRYZv/view — Integrating the animal body, pp. 1–5.
- https://drive.google.com/file/d/1vQo1hIhJPieTFmQYjNr8H182h5uq1TNY/view — Feedback mechanisms, pp. 1–4.
[/Sources]
-->

---

# Two signalling systems solve different timing problems

<BiologyComparator
  left-label="Nervous signalling"
  left-title="Fast, targeted, short-lived"
  left-body="Electrical impulses travel along neurons and chemical transmitters cross synapses to precise effectors."
  left-detail="Best for rapid movement, sensation, and immediate correction."
  right-label="Endocrine signalling"
  right-title="Slower, distributed, longer-lived"
  right-body="Hormones enter the bloodstream and act only on cells that carry the matching receptor."
  right-detail="Best for sustained regulation, growth, metabolism, and reproduction."
  hinge="time + reach"
/>

<p class="question-line">Drag the hinge: which system would you choose for withdrawing a hand? For growth over months?</p>

<!--
[Timing] 5 minutes
[Teacher prompt] Use the comparator, then insist on complete comparisons: signal form, route, speed, target, and duration.
[Sources]
- https://drive.google.com/file/d/1Rls3syMDoCs9p0SDIM1ddE5mLEnFRYZv/view — Integrating the animal body, pp. 1–2.
[/Sources]
-->

---

# The nervous system has a central processor and a distributed network

<div class="nervous-map">
  <figure><img :src="'images/nervous-system.svg'" alt="Unlabelled human nervous system with brain, spinal cord, and peripheral nerves" /></figure>
  <div class="nervous-copy">
    <div><span>CNS</span><strong>Brain + spinal cord</strong><p>integrate information and coordinate responses</p></div>
    <div><span>PNS</span><strong>Nerves linking the CNS to receptors, muscles, glands, and organs</strong><p>sensory pathways enter; motor pathways leave</p></div>
    <div><span>Two motor divisions</span><strong>Somatic for voluntary skeletal movement; autonomic for involuntary regulation</strong><p>the enteric system is a specialised autonomic network in the gut</p></div>
  </div>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Trace a signal from a fingertip to the CNS and back to a muscle.
[Sources]
- https://drive.google.com/file/d/1Rls3syMDoCs9p0SDIM1ddE5mLEnFRYZv/view — Integrating the animal body, pp. 1–5.
- https://commons.wikimedia.org/wiki/File:Nervous_system_diagram_unlabeled.svg — nervous system image, CC BY-SA 4.0.
[/Sources]
-->

---

# Brain regions divide the work, then integrate it

<div class="brain-map">
  <div class="brain-shape" aria-label="Simplified side view of the brain"><span class="brain-form"></span><span class="brain-stem"></span><span class="brain-label a">cerebrum</span><span class="brain-label b">cerebellum</span><span class="brain-label c">brainstem</span></div>
  <div class="brain-regions">
    <p><span>Cerebrum</span><strong>Sensation, thinking, speech, and initiation of voluntary movement.</strong></p>
    <p><span>Cerebellum</span><strong>Timing, force, balance, posture, and motor learning.</strong></p>
    <p><span>Brainstem</span><strong>Breathing, heartbeat, swallowing, coughing, and other vital involuntary processes.</strong></p>
    <p><span>Deeper structures</span><strong>Hypothalamus, pituitary, hippocampus, amygdala, and pineal gland link regulation, memory, emotion, and hormones.</strong></p>
  </div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Do not turn this into a label race. Ask which region would be implicated by loss of balance, altered breathing, or impaired conscious speech.
[Sources]
- https://drive.google.com/file/d/1Rls3syMDoCs9p0SDIM1ddE5mLEnFRYZv/view — Integrating the animal body, pp. 2–5.
[/Sources]
-->

---

# Brain and spinal cord integrate at different levels

<BiologyComparator
  left-label="Brain"
  left-title="Conscious + unconscious integration"
  left-body="Combines many sensory inputs, interprets context, supports learning and memory, and coordinates voluntary and involuntary responses."
  left-detail="It can modify a reflex after the spinal pathway begins."
  right-label="Spinal cord"
  right-title="Rapid unconscious integration"
  right-body="Relays information between brain and body and can initiate reflex responses without waiting for conscious processing."
  right-detail="A knee-jerk or withdrawal reflex can begin here."
  hinge="awareness"
/>

<!--
[Timing] 4 minutes
[Teacher prompt] Correct a common misconception: a spinal reflex does not mean the brain receives no information.
[Sources]
- https://drive.google.com/file/d/1Rls3syMDoCs9p0SDIM1ddE5mLEnFRYZv/view — Integrating the animal body, pp. 5–7.
- https://drive.google.com/file/d/1VqYGb7FSOXNsCFOBte4mAFJq1CC_1Thf/view — Reflex arcs and cerebellum, pp. 1–2.
[/Sources]
-->

---

# Learning and memory are related—but not identical

<ConceptFlipCards mode="memory" />

<!--
[Timing] 4 minutes
[Teacher prompt] Students classify one example of explicit and implicit memory, then flip to check the distinction.
[Sources]
- https://drive.google.com/file/d/1Rls3syMDoCs9p0SDIM1ddE5mLEnFRYZv/view — Integrating the animal body, pp. 5–7.
[/Sources]
-->

---

# Learning changes the network that performs the task

<div class="plasticity-field">
  <div class="network" aria-label="Network of connected neurons"><i></i><i></i><i></i><i></i><i></i><b></b><b></b><b></b><b></b><b></b><p>repeated pathways can become stronger</p></div>
  <div class="plasticity-copy">
    <p><span>Form</span><strong>New synapses can appear between neurons.</strong></p>
    <p><span>Strengthen</span><strong>Frequently used pathways become more effective.</strong></p>
    <p><span>Remove</span><strong>Connections can also weaken or disappear.</strong></p>
  </div>
</div>

<p class="question-line">Plasticity is a biological reason why deliberate practice can change performance.</p>

<!--
[Timing] 4 minutes
[Teacher prompt] Separate the biological claim from motivational slogans: effort matters because networks can change, but learning still depends on method, feedback, and conditions.
[Sources]
- https://drive.google.com/file/d/1Rls3syMDoCs9p0SDIM1ddE5mLEnFRYZv/view — Integrating the animal body, pp. 6–8.
[/Sources]
-->

---

# Lesson 1 checkpoint

<div class="check-grid">
  <article><span>Explain</span><strong>Why is running speed an emergent property?</strong><p>Name at least three interacting subsystems.</p></article>
  <article><span>Compare</span><strong>Why can nervous and endocrine signalling not simply replace one another?</strong><p>Use speed, route, target, and duration.</p></article>
  <article><span>Apply</span><strong>Why might practising a movement improve it?</strong><p>Connect plasticity with repeated neural pathways.</p></article>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] One minute silent writing, then pair explanation. Collect one precise comparison and one vague comparison for feedback.
[Sources]
- https://drive.google.com/file/d/1O5wbU8t7yUd1Ge1biq3eTsSHvWVs4TlY/view — Summary and key terms, pp. 1–5.
[/Sources]
-->

---
class: section-slide
---

<p class="section-number">Lesson 1 · pathway depth</p>
<p class="section-title">From receptor to coordinated movement</p>
<p class="section-subtitle">The nervous system is not one wire. Different neurons, receptors, insulation, relay centres, and motor correction give a response its form.</p>

<!--
[Timing] 1 minute
[Teacher prompt] Reset the room: now zoom into the pathway rather than the whole system.
[Sources]
- https://drive.google.com/file/d/1kRAfw03BiqgzifKjq_inIv3WluNLgQQd/view — Sensory and motor neurons, pp. 1–14.
[/Sources]
-->

---

# Sensory and motor neurons differ by direction and role

<BiologyComparator
  left-label="Sensory · afferent"
  left-title="Receptor → CNS"
  left-body="Carries information about internal or external stimuli toward the brain or spinal cord."
  left-detail="Often has a long dendron, cell body part-way along, and a shorter axon."
  right-label="Motor · efferent"
  right-title="CNS → effector"
  right-body="Carries commands from the brain or spinal cord to muscles or glands."
  right-detail="Has many short dendrites around the cell body and one long axon."
  hinge="direction"
/>

<!--
[Timing] 5 minutes
[Teacher prompt] Use Afferent Arrives and Efferent Exits only as a check; the biological meaning is receptor-to-CNS versus CNS-to-effector.
[Sources]
- https://drive.google.com/file/d/1kRAfw03BiqgzifKjq_inIv3WluNLgQQd/view — Sensory and motor neurons, pp. 1–5.
[/Sources]
-->

---

# Receptors specialise in different kinds of change

<ConceptFlipCards mode="receptors" />

<!--
[Timing] 5 minutes
[Teacher prompt] Read the front examples first. Students predict the stimulus category before flipping.
[Sources]
- https://drive.google.com/file/d/1kRAfw03BiqgzifKjq_inIv3WluNLgQQd/view — Sensory and motor neurons, pp. 2–4.
[/Sources]
-->

---

# The same event can activate several receptor classes

<div class="stimulus-cases">
  <article><span>Ice cube</span><strong>Cold + pressure</strong><p>Thermoreceptors detect cooling while mechanoreceptors detect contact and pressure.</p><small>One object, multiple inputs</small></article>
  <article><span>Hot pan</span><strong>Heat + tissue risk</strong><p>Thermoreceptors encode temperature; nociceptors initiate a protective warning when damage is likely.</p><small>Sensation and protection overlap</small></article>
  <article><span>Standing suddenly</span><strong>Arterial stretch changes</strong><p>Baroreceptors detect the fall in stretch and trigger rapid cardiovascular correction.</p><small>Internal receptors protect homeostasis</small></article>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Ask why a receptor is not simply an organ of the five senses. Internal receptors continuously monitor variables we do not consciously feel.
[Sources]
- https://drive.google.com/file/d/1kRAfw03BiqgzifKjq_inIv3WluNLgQQd/view — Sensory and motor neurons, pp. 2–4.
- https://drive.google.com/file/d/1vQo1hIhJPieTFmQYjNr8H182h5uq1TNY/view — Feedback mechanisms, pp. 1–3.
[/Sources]
-->

---

# Myelin changes how the signal travels

<div class="myelin-model">
  <div class="axon-stage">
    <div class="axon"><span class="myelin a"></span><span class="myelin b"></span><span class="myelin c"></span><span class="myelin d"></span><span class="node a"></span><span class="node b"></span><span class="node c"></span><span class="impulse">signal jumps node → node → node</span></div>
    <p>Nodes of Ranvier interrupt the insulating myelin sheath.</p>
  </div>
  <div class="myelin-copy">
    <p><span>Structure</span><strong>Myelin is a lipid-rich membrane wrapped around an axon.</strong></p>
    <p><span>Function</span><strong>Insulation enables saltatory conduction between nodes.</strong></p>
    <p><span>Result</span><strong>Myelinated fibres conduct impulses more rapidly than unmyelinated fibres.</strong></p>
  </div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Avoid saying the impulse literally leaps through open space. Depolarisation is regenerated at the nodes.
[Sources]
- https://drive.google.com/file/d/1kRAfw03BiqgzifKjq_inIv3WluNLgQQd/view — Sensory and motor neurons, pp. 7–11.
[/Sources]
-->

---

# A reflex is a pathway, not a feeling

<ReflexArcBuilder />

<!--
[Timing] 6 minutes
[Teacher prompt] Build the pathway aloud. Ask where the spinal cord is the integrator and where the response becomes conscious.
[Sources]
- https://drive.google.com/file/d/1VqYGb7FSOXNsCFOBte4mAFJq1CC_1Thf/view — Reflex arcs and cerebellum, pp. 1–2.
[/Sources]
-->

---

# The cerebellum predicts and corrects movement

<div class="cerebellum-case">
  <div class="balance-figure" aria-label="Person balancing on a narrow board"><span class="balance-person"></span><span class="balance-leg a"></span><span class="balance-leg b"></span><span class="balance-board"></span></div>
  <div class="cerebellum-copy">
    <p><span>Coordination</span><strong>Adjusts timing and force across groups of voluntary muscles.</strong></p>
    <p><span>Balance + posture</span><strong>Uses proprioceptive and other sensory inputs to correct body position.</strong></p>
    <p><span>Motor learning</span><strong>Fine-tunes repeated actions such as cycling, handwriting, piano, or a tennis serve.</strong></p>
  </div>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] A movement can be initiated by the cerebrum but refined by the cerebellum. Ask students for a movement that improves with feedback.
[Sources]
- https://drive.google.com/file/d/1VqYGb7FSOXNsCFOBte4mAFJq1CC_1Thf/view — Reflex arcs and cerebellum, pp. 2–4.
[/Sources]
-->

---

# Fast protection and refined performance are different jobs

<BiologyComparator
  left-label="Withdrawal reflex"
  left-title="Protect first"
  left-body="A spinal circuit generates a rapid, involuntary contraction before conscious interpretation is complete."
  left-detail="Its value is speed and consistency."
  right-label="Cerebellar control"
  right-title="Correct continuously"
  right-body="Multiple sensory inputs are compared with intended movement so timing, force, balance, and posture can be adjusted."
  right-detail="Its value is accuracy and learning."
  hinge="purpose"
/>

<!--
[Timing] 4 minutes
[Teacher prompt] Ask whether a reflex is always faster than a learned movement and why speed alone is not the only performance goal.
[Sources]
- https://drive.google.com/file/d/1VqYGb7FSOXNsCFOBte4mAFJq1CC_1Thf/view — Reflex arcs and cerebellum, pp. 1–4.
[/Sources]
-->

---

# Animal pathway synthesis

<div class="signal-loop">
  <div><span>Stimulus</span><strong>Heat threatens tissue</strong><p>damaging temperature at the skin</p></div><b>→</b>
  <div><span>Input</span><strong>Nociceptor + sensory neuron</strong><p>afferent impulse enters the spinal cord</p></div><b>→</b>
  <div><span>Integration</span><strong>Interneuron in the spinal cord</strong><p>rapid unconscious relay</p></div><b>→</b>
  <div><span>Output</span><strong>Motor neuron + muscle</strong><p>withdrawal, then conscious pain and learning</p></div>
</div>

<!--
[Timing] 3 minutes
[Teacher prompt] Students retell the chain without looking, then identify the receptor, integrator, and effector.
[Sources]
- https://drive.google.com/file/d/1VqYGb7FSOXNsCFOBte4mAFJq1CC_1Thf/view — Reflex arcs and cerebellum, pp. 1–5.
[/Sources]
-->

---
class: section-slide
---

<p class="section-number">Lesson 2</p>
<p class="section-title">Slow signals, fast corrections</p>
<p class="section-subtitle">Hormones coordinate long-lived changes while neural feedback loops continuously protect the internal environment.</p>

<!--
[Timing] 1 minute
[Teacher prompt] Return to the time-scale distinction: some responses take milliseconds, others hours or months.
[Sources]
- https://drive.google.com/file/d/1k8KySOcQ1-UOw9LU6bJzAFyUVm2ojURc/view — More about the endocrine system, pp. 1–14.
- https://drive.google.com/file/d/1vQo1hIhJPieTFmQYjNr8H182h5uq1TNY/view — Feedback mechanisms, pp. 1–7.
[/Sources]
-->

---

# Melatonin links environmental light to a 24-hour rhythm

<div class="melatonin-slide">
  <figure class="melatonin-graph">
    <svg viewBox="0 0 700 310" role="img" aria-label="Qualitative melatonin curve, low during daylight and high at night">
      <rect class="night" x="50" y="25" width="160" height="235"/><rect class="night" x="540" y="25" width="110" height="235"/>
      <path d="M50 70 C105 50 160 60 210 155 C270 255 430 255 540 170 C585 132 615 82 650 60" class="curve"/>
      <line x1="50" y1="260" x2="650" y2="260" stroke="#8b8f89" stroke-width="2"/>
      <text x="50" y="288">00:00</text><text x="185" y="288">06:00</text><text x="340" y="288">12:00</text><text x="495" y="288">18:00</text><text x="620" y="288">24:00</text>
      <text x="65" y="45">night</text><text x="350" y="45">daylight</text><text x="570" y="45">night</text>
    </svg>
    <figcaption>Qualitative pattern: darkness permits melatonin to rise; daylight inhibits secretion.</figcaption>
  </figure>
  <div class="melatonin-copy">
    <p><span>Detector</span><strong>Photoreceptors report light level to the circadian centre in the hypothalamus.</strong></p>
    <p><span>Gland</span><strong>The pineal gland releases more melatonin in darkness.</strong></p>
    <p><span>Effect</span><strong>Rising melatonin helps prepare the body for sleep and lowers core temperature.</strong></p>
  </div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] The graph is qualitative, not a universal data trace. Ask students to describe, not explain, the trend first.
[Sources]
- https://drive.google.com/file/d/1k8KySOcQ1-UOw9LU6bJzAFyUVm2ojURc/view — More about the endocrine system, pp. 1–4.
[/Sources]
-->

---

# Jet lag is a mismatch between clocks

<div class="case-sequence">
  <div><span>Travel</span><strong>Cross time zones quickly</strong><p>the external light–dark cycle shifts at once</p></div><b>→</b>
  <div><span>Mismatch</span><strong>Internal rhythm still follows the old time</strong><p>melatonin rises at an inconvenient local hour</p></div><b>→</b>
  <div><span>Symptoms</span><strong>Sleepiness, poor alertness, disturbed sleep</strong><p>behaviour and local time disagree</p></div><b>→</b>
  <div><span>Reset</span><strong>Repeated light cues re-entrain the clock</strong><p>the rhythm shifts over several days</p></div>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Students identify the environmental cue, receptor, integrator, endocrine output, and behavioural effect.
[Sources]
- https://drive.google.com/file/d/1k8KySOcQ1-UOw9LU6bJzAFyUVm2ojURc/view — More about the endocrine system, pp. 1–4.
[/Sources]
-->

---

# Epinephrine turns a threat into whole-body readiness

<div class="case-sequence">
  <div><span>Threat</span><strong>Hypothalamus detects stress</strong><p>context is interpreted as demanding action</p></div><b>→</b>
  <div><span>Neural route</span><strong>Autonomic impulses reach adrenal glands</strong><p>a nervous signal starts an endocrine response</p></div><b>→</b>
  <div><span>Hormone</span><strong>Adrenal medulla releases epinephrine</strong><p>blood distributes the chemical message</p></div><b>→</b>
  <div><span>Response</span><strong>Heart, lungs, liver, vessels, and senses change</strong><p>oxygen and fuel reach active tissues rapidly</p></div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] This is a neuroendocrine chain. Ask why the response combines the speed of nerves with the reach of blood-borne hormone.
[Sources]
- https://drive.google.com/file/d/1k8KySOcQ1-UOw9LU6bJzAFyUVm2ojURc/view — More about the endocrine system, pp. 4–8.
[/Sources]
-->

---

# The hypothalamus and pituitary form a command axis

<div class="endocrine-command">
  <div class="command-core">
    <div><span>nervous–endocrine link</span><strong>Hypothalamus</strong></div><b>↓</b>
    <div><span>relay gland</span><strong>Pituitary</strong></div>
  </div>
  <div class="command-targets">
    <p><span>Growth axis</span><strong>Growth hormone supports growth of bone and muscle.</strong></p>
    <p><span>Thyroid axis</span><strong>TSH stimulates thyroid hormone release.</strong></p>
    <p><span>Adrenal axis</span><strong>ACTH stimulates the adrenal cortex to release cortisol.</strong></p>
    <p><span>Reproductive axis</span><strong>FSH and LH regulate gonads and reproductive hormones.</strong></p>
  </div>
</div>

<p class="question-line">The “master gland” still receives instructions—and feedback—from the wider system.</p>

<!--
[Timing] 5 minutes
[Teacher prompt] Avoid memorising every hormone at once. Focus on the architecture: hypothalamus → pituitary → target gland/tissue.
[Sources]
- https://drive.google.com/file/d/1k8KySOcQ1-UOw9LU6bJzAFyUVm2ojURc/view — More about the endocrine system, pp. 8–11.
[/Sources]
-->

---

# Feedback changes the next response

<BiologyComparator
  left-label="Negative feedback"
  left-title="Opposes the change"
  left-body="The response reduces the original deviation, keeping a variable within a workable range."
  left-detail="Examples: baroreflex and ventilation response to elevated CO₂."
  right-label="Positive feedback"
  right-title="Amplifies the change"
  right-body="The response increases the original stimulus, driving a process forward until a separate stop condition is reached."
  right-detail="Example: ethylene production during climacteric fruit ripening."
  hinge="response effect"
/>

<!--
[Timing] 5 minutes
[Teacher prompt] Negative does not mean harmful and positive does not mean beneficial. The terms describe direction of system effect.
[Sources]
- https://drive.google.com/file/d/1vQo1hIhJPieTFmQYjNr8H182h5uq1TNY/view — Feedback mechanisms, pp. 1–4.
- https://drive.google.com/file/d/1IBT9htXAMOOmUSnsVz3rM712i0eejK5n/view — Role of ethylene, pp. 1–4.
[/Sources]
-->

---

# One loop pattern, three biological cases

<FeedbackLab />

<!--
[Timing] 7 minutes
[Teacher prompt] Switch among the three cases. Students name change, sensor, integrator, effector, outcome, and feedback direction.
[Sources]
- https://drive.google.com/file/d/1vQo1hIhJPieTFmQYjNr8H182h5uq1TNY/view — Feedback mechanisms, pp. 1–4.
- https://drive.google.com/file/d/1IBT9htXAMOOmUSnsVz3rM712i0eejK5n/view — Role of ethylene, p. 1.
[/Sources]
-->

---

# Sympathetic and parasympathetic outputs push in opposite directions

<BiologyComparator
  left-label="Sympathetic"
  left-title="Mobilise"
  left-body="Raises heart rate and cardiac output, redirects blood to active tissues, and supports rapid action."
  left-detail="Dominant in stress and when blood pressure must rise."
  right-label="Parasympathetic"
  right-title="Restore"
  right-body="Slows the heart and supports lower-demand maintenance and digestive activity."
  right-detail="Dominant when pressure is high or the body is at rest."
  hinge="autonomic balance"
/>

<!--
[Timing] 4 minutes
[Teacher prompt] Opposing outputs create adjustable control, not a simple on/off switch.
[Sources]
- https://drive.google.com/file/d/1vQo1hIhJPieTFmQYjNr8H182h5uq1TNY/view — Feedback mechanisms, pp. 2–3.
[/Sources]
-->

---

# Exercise couples respiration, circulation, and neural feedback

<div class="exercise-model">
  <div class="runner-field" aria-label="Runner in motion"><span class="runner"></span><span class="runner-arm a"></span><span class="runner-arm b"></span><span class="runner-leg a"></span><span class="runner-leg b"></span><p>one activity perturbs several variables at once</p></div>
  <div class="exercise-chain">
    <p><span>Cellular respiration</span><strong>Working muscles use more O₂ and produce more CO₂.</strong></p>
    <p><span>Blood chemistry</span><strong>Dissolved CO₂ increases; blood pH decreases slightly.</strong></p>
    <p><span>Detection</span><strong>Chemoreceptors signal the medulla.</strong></p>
    <p><span>Ventilation</span><strong>Diaphragm and intercostal activity increases to remove CO₂.</strong></p>
    <p><span>Circulation</span><strong>Heart rate rises to deliver O₂ and transport CO₂ away.</strong></p>
  </div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Students locate the negative feedback: which response reduces the original chemical disturbance?
[Sources]
- https://drive.google.com/file/d/1vQo1hIhJPieTFmQYjNr8H182h5uq1TNY/view — Feedback mechanisms, pp. 1–4.
[/Sources]
-->

---

# The gut contains a local nervous system

<div class="ens-map">
  <div class="gut-visual" aria-label="Simplified digestive tract"><span class="gut"></span><p>the enteric nervous system extends from oesophagus to rectum</p></div>
  <div class="ens-copy">
    <p><span>After swallowing</span><strong>The ENS coordinates peristalsis through rhythmic smooth-muscle contraction.</strong></p>
    <p><span>Local control</span><strong>It regulates secretion, mixing, and blood flow needed for absorption.</strong></p>
    <p><span>Independent—but linked</span><strong>The ENS can function locally while exchanging signals with the CNS.</strong></p>
    <p><span>Voluntary boundaries</span><strong>Initiating swallowing and normally egesting faeces involve CNS control.</strong></p>
  </div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] “Second brain” is a metaphor: it means extensive local neural control, not consciousness in the gut.
[Sources]
- https://drive.google.com/file/d/1vQo1hIhJPieTFmQYjNr8H182h5uq1TNY/view — Feedback mechanisms, pp. 4–6.
[/Sources]
-->

---

# Real case: why standing up can make you briefly dizzy

<div class="case-sequence">
  <div><span>Change</span><strong>Gravity shifts blood downward</strong><p>arterial pressure near the head can fall briefly</p></div><b>→</b>
  <div><span>Sensor</span><strong>Baroreceptors feel less stretch</strong><p>carotid sinus and aortic arch report the change</p></div><b>→</b>
  <div><span>Integrator</span><strong>Medulla increases sympathetic output</strong><p>parasympathetic output is reduced</p></div><b>→</b>
  <div><span>Correction</span><strong>Heart output rises and vessels constrict</strong><p>pressure moves back toward its working range</p></div>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] This application is an inference from the baroreceptor mechanism. Keep the focus on the control loop, not diagnosis.
[Sources]
- https://drive.google.com/file/d/1vQo1hIhJPieTFmQYjNr8H182h5uq1TNY/view — Feedback mechanisms, pp. 1–3.
[/Sources]
-->

---

# Lesson 2 checkpoint

<div class="check-grid">
  <article><span>Trace</span><strong>How does darkness become a sleep-related hormonal signal?</strong><p>Photoreceptor → hypothalamus → pineal → melatonin.</p></article>
  <article><span>Explain</span><strong>Why does elevated CO₂ increase ventilation?</strong><p>Use pH, chemoreceptors, medulla, and respiratory muscles.</p></article>
  <article><span>Distinguish</span><strong>Why is fruit ripening positive feedback but blood-pressure control negative?</strong><p>Describe whether the response amplifies or opposes the initial change.</p></article>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Students give one causal sentence per arrow. Correct answers that name parts without linking their actions.
[Sources]
- https://drive.google.com/file/d/1O5wbU8t7yUd1Ge1biq3eTsSHvWVs4TlY/view — Summary and key terms, pp. 1–5.
[/Sources]
-->

---
class: section-slide
---

<p class="section-number">Lesson 3 · higher level</p>
<p class="section-title">Plants coordinate without nerves</p>
<p class="section-subtitle">Directional growth, polar transport, hormone interactions, and gaseous feedback allow a rooted organism to respond to a changing environment.</p>

<!--
[Timing] 1 minute
[Teacher prompt] Mark the HL boundary explicitly. Ask what a plant can change if it cannot relocate.
[Sources]
- https://drive.google.com/file/d/1ni8UDEgpsfv3jgjXjquYmKCTyWrUzMQr/view — Tropisms and phytohormones, pp. 1–11.
[/Sources]
-->

---

# A rooted organism responds by changing growth

<div class="plant-core">
  <div class="plant-visual" aria-label="Plant bending toward lateral light"><span class="sun"></span><span class="pot"></span><span class="stem"></span><span class="leaf a"></span><span class="leaf b"></span></div>
  <div class="plant-core-copy">
    <p><span>Stimulus</span><strong>Light, gravity, water, touch, and chemicals vary in direction and intensity.</strong></p>
    <p><span>Signal</span><strong>Phytohormones act as chemical messengers between plant regions.</strong></p>
    <p><span>Response</span><strong>Differential growth changes the position of shoots or roots.</strong></p>
    <p><span>Value</span><strong>Growth places photosynthetic surfaces, roots, and reproductive structures in more favourable conditions.</strong></p>
  </div>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Plant movement in this topic is growth, not locomotion. Emphasise directionality.
[Sources]
- https://drive.google.com/file/d/1ni8UDEgpsfv3jgjXjquYmKCTyWrUzMQr/view — Tropisms and phytohormones, pp. 1–4.
[/Sources]
-->

---

# Positive and negative tropisms describe direction—not value

<div class="tropism-map">
  <article><span>Positive tropism</span><h2>Growth toward the stimulus</h2><p>Plant shoots commonly show positive phototropism by curving toward lateral light. Roots usually show positive gravitropism.</p><div class="arrow" aria-hidden="true">→ ●</div></article>
  <article><span>Negative tropism</span><h2>Growth away from the stimulus</h2><p>Roots often grow away from light; shoots commonly grow against the direction of gravity.</p><div class="arrow" aria-hidden="true">● →</div></article>
</div>

<p class="question-line">Positive does not mean “good”; it means toward. Negative means away.</p>

<!--
[Timing] 4 minutes
[Teacher prompt] Give a stimulus and organ; students state positive/negative plus the direction of growth.
[Sources]
- https://drive.google.com/file/d/1ni8UDEgpsfv3jgjXjquYmKCTyWrUzMQr/view — Tropisms and phytohormones, pp. 1–4.
[/Sources]
-->

---

# Charles and Francis Darwin located the light-sensitive region

<div class="darwin-slide">
  <figure><img :src="'images/charles-darwin.jpg'" alt="Charles Darwin in 1855" /><figcaption>Charles Darwin, 1855 · public domain photograph</figcaption></figure>
  <div class="darwin-copy">
    <p><span>1880</span><strong>Charles Darwin, assisted by Francis Darwin, published <em>The Power of Movement in Plants</em>.</strong></p>
    <p><span>Control</span><strong>An untreated seedling bends toward unilateral light.</strong></p>
    <p><span>Tip covered</span><strong>A light-proof cap on the shoot tip prevents the usual bending response.</strong></p>
    <p><span>Base covered</span><strong>Shielding the lower shoot does not prevent the tip from directing curvature.</strong></p>
  </div>
</div>

<p class="question-line">The tip detects directional light; a signal influences growth lower in the shoot.</p>

<!--
[Timing] 6 minutes
[Teacher prompt] Ask what each treatment controls. Historical importance comes from inference using comparisons, not from the portrait.
[Sources]
- https://drive.google.com/file/d/1ni8UDEgpsfv3jgjXjquYmKCTyWrUzMQr/view — Tropisms and phytohormones, pp. 1 and 8–10.
- https://darwin-online.org.uk/converted/pdf/1880_Movement_F1326.pdf — Charles Darwin, assisted by Francis Darwin, The Power of Movement in Plants (1880).
- https://commons.wikimedia.org/wiki/File:Charles_Darwin.jpg — portrait, public domain.
[/Sources]
-->

---

# Lateral light redistributes auxin and changes growth

<AuxinLightLab />

<!--
[Timing] 7 minutes
[Teacher prompt] Switch light direction. Students narrate the causal chain and distinguish redistribution from “more auxin being made on one side.”
[Sources]
- https://drive.google.com/file/d/1eMzkR9dIGCi2J8gusRL7nmEBBHaNs0by/view — More on auxins and cytokinins, pp. 1–4.
[/Sources]
-->

---

# Polar auxin transport gives the signal direction

<div class="transport-model">
  <div class="cell-column" aria-label="Column of plant cells with directional auxin efflux carriers">
    <div class="cell-row"><i></i><i></i><i></i><i></i></div><div class="cell-row"><i></i><i></i><i></i><i></i></div><div class="cell-row"><i></i><i></i><i></i><i></i></div><p>Efflux carriers on one side of neighbouring cells create coordinated, directional cell-to-cell transport.</p>
  </div>
  <div class="transport-copy">
    <p><span>Entry</span><strong>IAA enters by diffusion and auxin influx carriers.</strong></p>
    <p><span>Trap</span><strong>Inside the cell, charged IAA⁻ cannot simply diffuse back across the membrane.</strong></p>
    <p><span>Exit</span><strong>ATP-dependent efflux carriers export IAA⁻ from a particular side of the cell.</strong></p>
  </div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] The position of efflux carriers is the key to direction. Avoid presenting a cell as having intention.
[Sources]
- https://drive.google.com/file/d/1eMzkR9dIGCi2J8gusRL7nmEBBHaNs0by/view — More on auxins and cytokinins, pp. 1–4.
[/Sources]
-->

---

# Acid growth links auxin reception to cell elongation

<div class="acid-growth">
  <div><span>1</span><strong>Auxin binds receptor</strong><p>at the plasma membrane</p></div><b>→</b>
  <div><span>2</span><strong>H⁺-ATPase activates</strong><p>protons are pumped into the cell wall</p></div><b>→</b>
  <div><span>3</span><strong>Wall pH falls</strong><p>the apoplast becomes more acidic</p></div><b>→</b>
  <div><span>4</span><strong>Expansins loosen links</strong><p>cellulose network becomes more extensible</p></div><b>→</b>
  <div><span>5</span><strong>K⁺ and water enter</strong><p>water potential falls; turgor rises</p></div><b>→</b>
  <div><span>6</span><strong>Cell elongates</strong><p>the loosened wall stretches</p></div>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Students explain why pumping protons outside the cell can ultimately increase cell length.
[Sources]
- https://drive.google.com/file/d/1eMzkR9dIGCi2J8gusRL7nmEBBHaNs0by/view — More on auxins and cytokinins, pp. 5–6.
[/Sources]
-->

---

# Five phytohormones organise growth, stress, and development

<ConceptFlipCards mode="hormones" />

<!--
[Timing] 6 minutes
[Teacher prompt] Let groups choose one card, predict its back, then teach it to the class in one sentence.
[Sources]
- https://drive.google.com/file/d/1ni8UDEgpsfv3jgjXjquYmKCTyWrUzMQr/view — Tropisms and phytohormones, pp. 4–6.
[/Sources]
-->

---

# Auxin and cytokinin are a ratio, not independent switches

<BiologyComparator
  left-label="Auxin influence"
  left-title="Elongation, roots, apical dominance"
  left-body="Auxin from shoot meristems moves downward, supports elongation, favours root formation at high relative concentration, and suppresses lateral buds."
  left-detail="High auxin : low cytokinin → roots."
  right-label="Cytokinin influence"
  right-title="Division, differentiation, shoots"
  right-body="Cytokinin from roots moves upward, promotes cell division and differentiation, favours shoots, and stimulates lateral bud development."
  right-detail="Low auxin : high cytokinin → shoots."
  hinge="relative ratio"
/>

<!--
[Timing] 5 minutes
[Teacher prompt] Drag the hinge and ask for predicted tissue outcome. Emphasise relative concentrations.
[Sources]
- https://drive.google.com/file/d/1eMzkR9dIGCi2J8gusRL7nmEBBHaNs0by/view — More on auxins and cytokinins, pp. 7–8.
[/Sources]
-->

---

# Tissue outcome follows the auxin : cytokinin balance

<div class="ratio-field">
  <article><span>High auxin · low cytokinin</span><strong>Root formation</strong><div class="ratio-bar" style="--auxin: 82%; --cytokinin: 18%"><i></i><i></i></div><p>Useful for root induction in tissue culture.</p></article>
  <article><span>Balanced ratio</span><strong>Callus formation</strong><div class="ratio-bar" style="--auxin: 50%; --cytokinin: 50%"><i></i><i></i></div><p>Undifferentiated tissue proliferates.</p></article>
  <article><span>Low auxin · high cytokinin</span><strong>Shoot formation</strong><div class="ratio-bar" style="--auxin: 18%; --cytokinin: 82%"><i></i><i></i></div><p>Useful for shoot multiplication.</p></article>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Ask students to predict the effect of moving the ratio rather than memorising isolated hormone functions.
[Sources]
- https://drive.google.com/file/d/1eMzkR9dIGCi2J8gusRL7nmEBBHaNs0by/view — More on auxins and cytokinins, pp. 7–8.
[/Sources]
-->

---

# Ethylene makes ripening self-amplifying

<div class="ethylene-case">
  <div class="banana-stages" aria-label="Five banana stages from green to spotted brown"><span class="banana" style="--banana:#4e8c45"></span><span class="banana" style="--banana:#86a840"></span><span class="banana" style="--banana:#d6be3f"></span><span class="banana" style="--banana:#d9a83d"></span><span class="banana" style="--banana:#8c6841"></span><small>low ethylene → rising ethylene → accelerated ripening</small></div>
  <div class="ethylene-copy">
    <p><span>Soften</span><strong>Cell-wall breakdown changes texture.</strong></p>
    <p><span>Sweeten</span><strong>Starch is converted into sugars; bitter compounds decrease.</strong></p>
    <p><span>Recolour</span><strong>Chlorophyll breaks down and other pigments become visible.</strong></p>
    <p><span>Amplify</span><strong>Ethylene stimulates further ethylene synthesis: positive feedback.</strong></p>
  </div>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Connect molecular signalling to visible evidence: softness, sweetness, colour, and aroma.
[Sources]
- https://drive.google.com/file/d/1IBT9htXAMOOmUSnsVz3rM712i0eejK5n/view — Role of ethylene, pp. 1–2.
[/Sources]
-->

---

# Real case: ripening is both biology and logistics

<div class="check-grid">
  <article><span>Farmer</span><strong>Harvest before full ripeness</strong><p>Fruit survives transport with less bruising and spoilage.</p></article>
  <article><span>Distributor</span><strong>Control ethylene exposure</strong><p>Ventilation, temperature, and permitted ripening treatment alter timing and shelf-life.</p></article>
  <article><span>Consumer</span><strong>Expect safe, ripe fruit</strong><p>Artificial ripening becomes unethical when unauthorised chemicals or unsafe practice are used.</p></article>
</div>

<p class="question-line">A biological mechanism becomes a decision problem when different stakeholders value time, safety, waste, and quality differently.</p>

<!--
[Timing] 5 minutes
[Teacher prompt] Distinguish permitted ethylene use from unsafe or unauthorised ripening chemicals. Keep the discussion evidence-led.
[Sources]
- https://drive.google.com/file/d/1IBT9htXAMOOmUSnsVz3rM712i0eejK5n/view — Role of ethylene, pp. 1–3.
[/Sources]
-->

---

# Practical: where is the light detected?

<div class="practical-design">
  <article><span>Control</span><strong>Untreated seedlings</strong><p>Lateral light reaches the whole shoot.</p><small>Expected: curvature toward light</small></article>
  <article><span>Tip treatment</span><strong>Opaque cap on shoot tip</strong><p>Blocks light from the apical region while the lower shoot remains exposed.</p><small>Expected: little or no phototropic curvature</small></article>
  <article><span>Base treatment</span><strong>Opaque sleeve around lower shoot</strong><p>Tip remains exposed while the elongation region is partly shielded.</p><small>Expected: curvature still occurs</small></article>
</div>

<!--
[Timing] 6 minutes
[Teacher prompt] Students identify independent variable, dependent variables, controls, and predicted pattern. The source practical runs 7–10 days.
[Sources]
- https://drive.google.com/file/d/1ni8UDEgpsfv3jgjXjquYmKCTyWrUzMQr/view — Tropisms and phytohormones, pp. 7–10.
[/Sources]
-->

---

# Good observations need both numbers and descriptions

<div class="data-quality">
  <article><h2>Quantitative</h2><p><span>Measure</span><strong>Shoot length and angle of curvature at fixed times.</strong></p><p><span>Repeat</span><strong>Use several seedlings per treatment.</strong></p><p><span>Process</span><strong>Calculate means and show variation.</strong></p></article>
  <article><h2>Qualitative</h2><p><span>Record</span><strong>Direction of growth, leaf condition, and unusual development.</strong></p><p><span>Photograph</span><strong>Keep camera position, scale, and lighting constant.</strong></p><p><span>Context</span><strong>Note displaced caps, damaged shoots, uneven watering, or temperature changes.</strong></p></article>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] A photograph is not automatically objective. Standardisation determines whether images can be compared.
[Sources]
- https://drive.google.com/file/d/1ni8UDEgpsfv3jgjXjquYmKCTyWrUzMQr/view — Tropisms and phytohormones, pp. 7–10.
[/Sources]
-->

---

# Investigation extension: does vermifiltered water change onion growth?

<div class="investigation-card">
  <div class="onion-visual" aria-label="Control and experimental onion plants of different heights"><span class="onion a"></span><span class="onion b"></span><p><span>water control</span><span>vermifiltered water</span></p></div>
  <div class="investigation-copy">
    <p><span>Visualise</span><strong>Plot mean growth for control and experimental groups across four months.</strong></p>
    <p><span>Quantify variation</span><strong>Calculate standard deviation for each data set.</strong></p>
    <p><span>Communicate uncertainty</span><strong>Add SD error bars to the graph.</strong></p>
    <p><span>Interpret</span><strong>Describe trends, compare variation with means, and form a bounded conclusion.</strong></p>
  </div>
</div>

<p class="question-line"><span class="hl-tag">HL</span> A difference in means is not enough; variation changes how confidently the groups can be separated.</p>

<!--
[Timing] 60–90 minute extension
[Teacher prompt] Use the data table linked inside the source PDF. Require graph conventions, transparent working, and a conclusion that acknowledges spread.
[Sources]
- https://drive.google.com/file/d/1CTejnyANyU91J3_RezwdQLmhjhZK_S4q/view — Investigation, pp. 1–3.
[/Sources]
-->

---

# One core model, three signalling architectures

<div class="synthesis-map">
  <article><span>Nervous</span><strong>Fast route through specialised cells</strong><p>Receptor → sensory neuron → CNS → motor neuron → effector.</p></article>
  <article><span>Endocrine</span><strong>Distributed route through blood</strong><p>Stimulus → endocrine control → hormone → receptor-bearing target tissue.</p></article>
  <article><span>Plant · HL</span><strong>Directional chemical control of growth</strong><p>Stimulus → hormone redistribution or synthesis → differential cellular response.</p></article>
</div>

<p class="question-line">All three detect change, transmit information, integrate context, and regulate response—using different materials and timescales.</p>

<!--
[Timing] 5 minutes
[Teacher prompt] Students choose one real case and map every step to the four-part integration model introduced earlier.
[Sources]
- https://drive.google.com/file/d/1O5wbU8t7yUd1Ge1biq3eTsSHvWVs4TlY/view — Summary and key terms, pp. 1–5.
[/Sources]
-->

---

# Retrieval: explain, do not only name

<div class="exam-prompts">
  <p><span>1</span><strong>Compare nervous and endocrine signalling using four points.</strong></p>
  <p><span>2</span><strong>Describe the pathway of a pain withdrawal reflex.</strong></p>
  <p><span>3</span><strong>Explain why elevated blood CO₂ increases ventilation rate.</strong></p>
  <p><span>4</span><strong>Explain positive phototropism using auxin distribution and cell elongation.</strong></p>
  <p><span>5</span><strong>Predict the tissue outcome at high auxin : low cytokinin.</strong></p>
  <p><span>6</span><strong>Explain why ethylene production is positive feedback.</strong></p>
</div>

<!--
[Timing] 7 minutes
[Teacher prompt] Assign two prompts per pair. Answers must contain linked causal verbs, not isolated keywords.
[Sources]
- https://drive.google.com/file/d/1XDRgXlcAEV1Vh5yriGBf7VVqNlumAagu/view — C3.1 checklist, pp. 3–4.
[/Sources]
-->

---

# Retrieval key

<div class="answer-grid">
  <p><span>1 · compare</span><strong>Electrical/neuronal/rapid/targeted/short-lived versus chemical/blood-borne/slower/distributed/longer-lived.</strong></p>
  <p><span>2 · reflex</span><strong>Nociceptor → sensory neuron → interneuron in spinal cord → motor neuron → skeletal muscle.</strong></p>
  <p><span>3 · ventilation</span><strong>CO₂ lowers pH; chemoreceptors signal medulla; respiratory muscle activity increases; CO₂ removal rises.</strong></p>
  <p><span>4 · phototropism</span><strong>Auxin accumulates on the shaded side; cells there elongate more; the shoot curves toward light.</strong></p>
  <p><span>5 · ratio</span><strong>High auxin relative to cytokinin favours root formation.</strong></p>
  <p><span>6 · ethylene</span><strong>Ethylene stimulates ripening and additional ethylene production, amplifying the initial signal.</strong></p>
</div>

<!--
[Timing] 4 minutes
[Teacher prompt] Students improve one answer by adding a missing link or comparison dimension.
[Sources]
- https://drive.google.com/file/d/1O5wbU8t7yUd1Ge1biq3eTsSHvWVs4TlY/view — Summary and key terms, pp. 1–5.
[/Sources]
-->

---

# Return to the guiding questions

<div class="reflection-grid">
  <article><span>Integrate</span><strong>What roles do nerves and hormones play in integrating body systems?</strong><p>Use at least two contrasting cases.</p></article>
  <article><span>Regulate</span><strong>What roles do feedback mechanisms play in keeping systems functional?</strong><p>Include one negative and one positive loop.</p></article>
  <article><span>Reflect</span><strong>What remains unclear—and what connection now feels strongest?</strong><p>Name the next question you would investigate.</p></article>
</div>

<!--
[Timing] 5 minutes
[Teacher prompt] Students answer individually. Confidence should be linked to evidence: which mechanism can they now explain without prompts?
[Sources]
- https://drive.google.com/file/d/1AzxROntE_1hFeuym7kegnzfJu7qYksP6/view — Reflection, p. 1.
[/Sources]
-->
