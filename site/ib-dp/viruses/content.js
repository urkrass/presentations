export const units=['Structure','Replication cycles','Origins','Evolution','Independent practice','Synthesis'];
const p=text=>({type:'p',text});
const fig=(name,caption)=>({type:'figure',name,caption});
const table=(head,rows)=>({type:'table',head,rows});
const simulation=name=>({type:'simulation',name});
const eq=tex=>({type:'math',tex});
const page=(id,unit,title,blocks,question='',marks=0,kind='Guided question')=>({id,unit,title,blocks,question,marks,kind});
export const pages=[
page('start',0,'Viruses: small genomes, big effects',[
 p('IB DP Biology HL · A2.3. Explore viral structure, replication, origins and evolution. Build explanations from diagrams and evidence.'),
 p('Work through one screen at a time. Reading continues with the small page arrows; Next moves to the next activity. On a small screen, switch between Read and Answer.'),
 p('Text, equations, chemical formulae and sketches are all saved together. Long answers turn into pages automatically. Use Student to add your name, then Export to download your work.'),
 p('Answers save in this browser. Download an editable backup to move devices. Hand in the submission file or a PDF; the app link does not include your answers.')]),
page('host',0,'A genome needs a host',[
 fig('capsid','A simplified non-enveloped virion; not to scale.'),
 p('A capsid protects the genome. The genome carries instructions. Host cells supply ribosomes and energy.')],
 'Explain why a virus cannot make new proteins outside a host cell.',2),
page('scale-example',0,'Worked example: compare sizes',[
 p('A virus is 100 nm across. A bacterial cell is 2.0 μm long. Compare these linear dimensions using the same unit.'),
 eq('2.0\\,\\mathrm{\\mu m}=2.0\\times10^3\\,\\mathrm{nm}'),
 eq('\\text{size ratio}=\\frac{2000\\,\\mathrm{nm}}{100\\,\\mathrm{nm}}=20'),
 p('The cell is 20 times longer than the virus diameter. This is a length comparison, not a volume comparison. A ratio has no unit.')]),
page('scale',0,'Now make the comparison',[
 p('A ciliated cell is 60 μm long. An influenza virion is approximately 80–100 nm across. These are approximate dimensions supplied for this calculation.')],
 'Calculate a range for the ratio of cell length to virion diameter. Show the unit conversion and explain why your result is a range.',3),
page('genomes',0,'One genome, several possibilities',[
 p('A viral genome may be DNA or RNA, and single-stranded (ss) or double-stranded (ds). Genome size and gene number also vary greatly.'),
 table(['Genome type','Example'],[['ssRNA','HIV; influenza; coronaviruses'],['dsRNA','Rotaviruses'],['ssDNA','Parvoviruses'],['dsDNA','Lambda phage; variola; herpesviruses']]),
 p('Genome type describes the inherited genome. Replication can involve other nucleic acids: HIV has an RNA genome but makes a DNA intermediate.')]),
page('envelope',0,'An envelope is an extra layer',[
 fig('envelope','Generalised enveloped and non-enveloped virions; not to scale.'),
 p('Some viruses acquire a lipid envelope from a host membrane. Viral surface proteins help them attach to cells. A capsid is protein; an envelope contains lipid and protein.')],
 'Distinguish a capsid from an envelope. Explain why disrupting an envelope can prevent an enveloped virus from infecting a new cell.',3),
page('three-viruses',0,'Compare three viral designs',[
 fig('viruses','HIV, coronavirus and lambda phage: simplified structural models.'),
 table(['Virus','Genome','Envelope'],[['HIV','ssRNA; reverse transcription','Present'],['Coronavirus','ssRNA','Present'],['Lambda phage','dsDNA','Absent']]),
 p('HIV has a conical capsid. Coronaviruses package RNA with nucleocapsid proteins. Lambda has a head and a long, flexible, non-contractile tail.')]),
page('compare',0,'Shared features, different solutions',[
 p('Use the three designs on the preceding screen. Compare the viral particles, rather than the diseases they may cause.')],
 'Give two similarities between HIV and lambda phage, then two structural differences. Link one difference to how the virus enters its host.',5),
page('draw-virion',0,'Build a labelled model',[
 p('Choose HIV, coronavirus or lambda phage. Use Sketch to draw a simplified virion and Label to add clear labels. A written description is an alternative.'),
 p('Show the location of the genome and its protein covering. Include the envelope or tail only where appropriate. State the genome type.')],
 'Produce a labelled model of your chosen virus, and explain the function of two labelled structures.',5),
page('research',0,'A small database investigation',[
 p('Choose a virus and locate a reference genome in NCBI Virus or NCBI Datasets. Record the accession and record version so another student can identify the same sequence.'),
 p('For a segmented genome, state whether your length is one segment or the sum of all segments. Use nucleotides (nt) for a single strand and base pairs (bp) for double-stranded DNA.'),
 p('Record the virus, host or disease, genome type, genome length, accession, source URL and access date. Then state one limitation of using a single sequence as representative of a species.')],
 'Write your database record and limitation. You may add a labelled sketch of the virus.',4,'Research task'),
page('dependence',1,'An obligate intracellular parasite',[
 p('Viruses reproduce only in suitable living cells. Host cells supply energy, building blocks and ribosomes. Some viruses also encode or carry enzymes needed for genome copying.'),
 p('Virions may remain infectious outside cells, but they do not independently grow, make proteins or replicate there. “Cannot replicate outside a host” does not mean “immediately destroyed outside a host”.')],
 'Explain how host dependence allows a virus to function with fewer genes than a cell. Include two functions supplied by the host.',3),
page('entry',1,'Attachment comes before entry',[
 fig('entry','Lambda attaches to a receptor and delivers its DNA. The capsid remains outside.'),
 p('Attachment depends on compatible receptors. Animal viruses may enter by endocytosis or, when enveloped, by membrane fusion. Lambda phage injects DNA into a bacterium; it has no envelope to fuse.')],
 'Predict what could happen if a bacterium’s receptor changes shape. Explain your prediction without assuming every receptor change has the same effect.',2),
page('lytic',1,'The lytic route',[
 fig('lytic','Follow the numbered sequence: synthesis, assembly, then rupture and release.'),
 p('After entry, viral DNA is copied and viral proteins are produced. New virions are assembled. Lysis breaks open the host cell and releases them.')]),
page('lytic-order',1,'Reconstruct the sequence',[
 p('These events are out of order: A — release by lysis; B — synthesis of viral DNA and proteins; C — attachment and DNA entry; D — assembly of new virions.')],
 'Give the correct letter sequence. Explain why protein synthesis must take place before assembly, and what lysis does to the host cell.',3),
page('lysogenic',1,'The lysogenic route',[
 fig('lysogenic','In lambda lysogeny, integrated phage DNA is copied with the bacterial chromosome.'),
 p('Lambda DNA can integrate into the bacterial chromosome as a prophage. The cell can divide, copying the prophage into daughter cells without immediately producing new phage particles.')]),
page('induction',1,'A switch in the life cycle',[
 p('A temperate phage such as lambda can follow either route. Certain stresses, including DNA damage, can induce the prophage to leave the chromosome and enter the lytic cycle.'),
 p('During stable lysogeny, the prophage is copied as the bacterial DNA is copied. Integration is therefore not the same as absence of viral DNA replication.')],
 'A bacterial lineage carries lambda DNA for many generations. After a stress, free phages appear and many cells lyse. Explain the sequence from lysogeny to lysis.',4),
page('lambda-lab',1,'Lab · Follow a phage',[
 p('Follow the lytic route. Reset, then follow lysogeny through host division and induction. Use Model notes to see the assumptions; Save observation records your current state in this answer.'),
 simulation('lambda')],
 'Compare an observation from lysogeny with one from the lytic route. Explain where the phage DNA is and what happens to the host. State one limit of the model.',0,'Simulation investigation'),
page('cycle-compare',1,'Compare the two outcomes',[
 table(['Feature to compare','Your focus'],[['Location of lambda DNA','Separate or integrated'],['New virions','Immediate production or no immediate production'],['Host cell','Lysis or continued division'],['Viral inheritance','Release or copying into daughter cells']])],
 'Compare the lytic and lysogenic routes of lambda using all four features in the table. You can draw a branching diagram instead of writing a paragraph.',4),
page('culture-data',1,'Read a culture experiment',[
 p('Illustrative classroom data, not measurements from a real experiment. A lambda-infected bacterial culture was sampled before and after a stress.'),
 table(['Sample','Viable cells / mL','Free phages / mL'],[['Before stress','8 × 10⁷','2 × 10³'],['40 min later','1 × 10⁷','6 × 10⁸']])],
 'Suggest which life-cycle transition is consistent with the data. Use both measurements as evidence, and state why these data alone do not prove the mechanism.',4),
page('not-all',1,'Avoid an overgeneralisation',[
 p('Lytic and lysogenic routes describe the lambda example. Other viruses have different life cycles; some infections release virions by budding without immediately lysing the cell.')],
 'Correct both claims: (1) All viruses must integrate into host DNA. (2) Every virus can alternate between lytic and lysogenic cycles. Use lambda as an example, not as a rule for all viruses.',3),
page('origin-models',2,'Origins: competing hypotheses',[
 p('Viruses are extremely diverse. More than one origin may be needed to explain different groups. These ideas are hypotheses, not a settled sequence of historical events.'),
 table(['Hypothesis','Proposed starting point'],[['Virus-first / ancient replicators','Genetic molecules predating modern cells'],['Escape / progressive','Mobile genetic elements leaving cells'],['Reduction / regressive','Cellular parasites losing functions']])]),
page('origin-detail',2,'What might change along the way?',[
 p('Ancient replicators might have acquired protective protein coats. Escaped genetic elements might have gained transmission between cells. Reduction would involve loss of functions supplied by a host.'),
 p('Viroids are small infectious RNA molecules without capsids, known from plants. Transposons move within genomes. Both inform discussion of possible origins; neither is a demonstrated universal ancestor of viruses.')],
 'Choose two hypotheses. For each, describe the proposed starting material and one change needed to produce a host-dependent virus.',4),
page('origin-evidence',2,'Evidence does not equal proof',[
 p('Suppose a viral gene resembles a cellular gene. This could be consistent with a cellular origin, but genetic exchange between viruses and cells can also produce similarity.'),
 p('A useful explanation should account for multiple observations: gene sequences, protein structures, replication and the diversity of viral groups.')],
 'Explain why one shared gene would not prove that all viruses evolved by reduction from cells. Suggest one additional kind of evidence to examine.',3),
page('convergence',2,'Similar pressures, similar solutions',[
 p('Convergent evolution produces similar traits independently under similar selective pressures. Efficient genome packaging or attachment to cells can favour similar solutions.'),
 p('Similarity of shape alone does not establish close ancestry. Homology and convergence are competing explanations that require additional evidence.')],
 'Two unrelated viral groups have compact capsids. Explain how convergence could account for this, and suggest evidence that could distinguish convergence from shared ancestry.',3),
page('labels',2,'What does “living” help us explain?',[
 p('Viruses have genomes and evolve, but lack independent metabolism and ribosomes. Whether they are called living depends on the criteria used.'),
 p('Classification can make a discussion clearer while also hiding exceptions or implying properties that have not been tested.')],
 'Give one reason the label “non-living” is useful and one way it could mislead someone learning about viruses. Use biological evidence for both points.',4,'Discussion'),
page('selection',3,'Variation first, selection after',[
 p('Mutations arise during genome copying. They are not produced because a virus needs a particular change. Their effects may be harmful, neutral or beneficial in a given environment.'),
 p('If a heritable variant produces more successful descendants, it may increase in frequency. Evolution concerns a population across generations, not an individual virion deciding to adapt.')]),
page('fast-evolution',3,'Why can evolution be rapid?',[
 p('Many RNA viruses copy genomes with relatively low fidelity. Large populations and short generation times create many opportunities for variants to arise and be selected.'),
 p('Mutation rate per copied nucleotide and the rate of evolutionary change are different quantities. Not every new mutation is retained in a population.')],
 'Link copying errors, population size, generation time and selection in an explanation of rapid viral evolution. Avoid saying mutations are directed by need.',4),
page('hiv',3,'HIV: reverse transcription',[
 fig('hiv-route','An overview of the HIV nucleic-acid pathway, not a full life-cycle diagram.'),
 p('HIV is a retrovirus. Reverse transcriptase copies its RNA into DNA. That DNA can integrate as a provirus. Copying errors and recombination generate variation.'),
 p('Not all RNA viruses are retroviruses. Influenza and coronaviruses do not use the HIV reverse-transcription pathway.')],
 'Explain the difference between an RNA genome and a DNA intermediate. Why is “all RNA viruses are retroviruses” incorrect?',3),
page('influenza',3,'Influenza: changes in antigens',[
 p('Influenza A has eight RNA genome segments. Its surface proteins include haemagglutinin (HA) and neuraminidase (NA). Genetic changes can alter antigens recognised by immunity.'),
 p('Antigenic drift involves accumulated changes. Reassortment can occur when different influenza viruses infect the same cell and progeny inherit a new combination of segments.'),
 p('Reassortment exchanges whole segments. It is distinct from a nucleotide substitution and from recombination within a segment.')]),
page('reassortment',3,'Follow the genome segments',[
 fig('reassortment','Illustrative reassortment of eight segments. Numbers identify segment types; letters and colours identify parental source.'),
 p('Both parental viruses must infect the same cell for this mixture of segments to be assembled into progeny. Not every combination is viable or has an advantage.')],
 'Explain how the mixed progeny differs from a virus with a single new point mutation. State one condition needed for reassortment.',3),
page('segment-lab',3,'Lab · Mix whole segments',[
 p('Compare A-only infection with A + B in the same cell. Switch the source of individual segments and save two observations. Open Model notes for the assumptions and limits.'),
 simulation('reassortment')],
 'Use two model genomes to explain reassortment. What remains unchanged when a segment switches source? Why can this model not predict whether a mixed virus will survive?',0,'Simulation investigation'),
page('coronavirus',3,'An exception improves the model',[
 p('Coronaviruses encode proofreading activity associated with nsp14. Their copying therefore cannot be described simply as “RNA means no proofreading”.'),
 p('SARS-CoV-2 can still evolve through mutation, recombination and selection. A change in a spike-protein sequence does not automatically make a variant more transmissible.')],
 'A student says “Every mutation in spike makes the virus spread better.” Explain two problems with this claim.',3),
page('variation-data',3,'From counts to frequencies',[
 p('Hypothetical surveillance data. The same sampling method identified two variants at two times. Use these data for calculation, not as a claim about a real outbreak.'),
 table(['Time','Variant A','Variant B'],[['Early sample','180','20'],['Later sample','120','80']]),
 eq('\\text{frequency of B}=\\frac{\\text{number of B}}{\\text{A + B}}\\times100\\%')],
 'Calculate the frequency of B in each sample and its change in percentage points. Show your calculations.',3),
page('data-inference',3,'A pattern needs an explanation',[
 table(['Time','Variant A','Variant B'],[['Early sample','180','20'],['Later sample','120','80']]),
 p('The samples show a change in composition. A selective advantage is one possible explanation. Chance, migration and sampling differences can also affect observed frequencies.')],
 'Suggest one selective and one non-selective explanation for B becoming more frequent. Give one additional observation that would help test your explanation.',3),
page('p1',4,'P1 · Structure and function',[
 p('An unknown virion contains a single-stranded RNA genome, a protein covering and a lipid membrane carrying surface glycoproteins. No ribosomes are detected.')],
 'Identify the protein covering and lipid membrane. Explain the roles of the genome and surface glycoproteins, and why the particle depends on a host for protein synthesis.',5,'Independent practice'),
page('p2',4,'P2 · Scale and microscopy',[
 p('A virion has a diameter of 90 nm. A bacterial cell is 1.8 μm long. Use a typical light-microscope resolving limit of approximately 200 nm for this question.')],
 'Calculate the cell-length-to-virion-diameter ratio. Explain why a light microscope cannot resolve the virion’s internal structures, and name a suitable microscopy method.',4,'Independent practice'),
page('p3',4,'P3 · Predict the phage route',[
 p('Culture X releases many new lambda phages and loses viable cells. Culture Y divides repeatedly, and each daughter cell carries lambda DNA within its chromosome.')],
 'Identify the route in each culture. Name the integrated DNA in Y. Explain how Y could later show the pattern seen in X.',5,'Independent practice'),
page('p4',4,'P4 · Evaluate an origin claim',[
 p('A researcher argues: “All viruses have small genomes, so all viruses must descend from one cell that lost most of its genes.”')],
 'Evaluate the claim. Refer to genome diversity, the reduction hypothesis, one alternative hypothesis and the limits of the evidence stated.',5,'Independent practice'),
page('p5',4,'P5 · Selection under pressure',[
 p('In a hypothetical viral population, a rare heritable variant is less affected by a particular antiviral than the common variant. The drug is then applied. Assume both can otherwise reproduce.')],
 'Explain how the resistant variant could increase in frequency over generations. Distinguish the origin of the variation from selection, and explain why the drug need not cause the useful mutation.',5,'Independent practice'),
page('p6',4,'P6 · Two ways to change a genome',[
 p('Virus A gains a nucleotide substitution in a gene. Virus B inherits intact RNA segments from two parental influenza A viruses that infected the same cell.')],
 'Name the genetic process in each case. Compare what changes in the genomes, and explain why neither process guarantees improved transmission.',4,'Independent practice'),
page('p7',4,'P7 · Use evidence carefully',[
 p('Hypothetical sequence data show that two viruses have similarly shaped capsids but very different genome sequences. Both need efficient packaging inside small particles.')],
 'Explain how convergent evolution could account for the shape. State why sequence differences alone do not settle the evolutionary history, and suggest further evidence.',4,'Independent practice'),
page('terms-a',5,'Key terms: structure and replication',[
 p('Use these terms once each: capsid · genome · envelope · obligate · prophage.'),
 p('1. The inherited genetic information is the ___. 2. A protein covering is the ___. 3. A host-derived lipid layer is the ___. 4. Viruses are ___ intracellular parasites. 5. Integrated lambda DNA is a ___.')],
 'Complete the five statements. Then explain one pair of terms that you previously confused.',0,'Retrieval practice'),
page('terms-b',5,'Key terms: change over time',[
 p('Use these terms: mutation · selection · reassortment · convergence.'),
 p('1. A new nucleotide substitution is a ___. 2. Differential reproductive success can produce ___. 3. Mixing intact influenza segments is ___. 4. Similar traits evolving independently is ___.')],
 'Complete the four statements and write one sentence linking mutation to selection.',0,'Retrieval practice'),
page('synthesis-host',5,'How can so few genes be enough?',[
 p('Return to the first guiding question. Draw on structure, host dependence and a named replication example. Organise your explanation around what the virus supplies and what the host supplies.')],
 'Explain how viruses can reproduce with relatively few genes. Include the roles of the genome, capsid, host ribosomes and energy, and one virus-encoded enzyme as an example.',6,'Synthesis'),
page('synthesis-diversity',5,'In what ways do viruses vary?',[
 p('Build a comparison of at least three named viruses. You may write, use equations for size comparisons, or draw a labelled concept map.')],
 'Compare genome type, structure, replication and sources of variation. Explain why one life-cycle diagram cannot represent every virus.',6,'Synthesis'),
page('reflection',5,'Check the explanation, then hand it in',[
 p('Check that you have distinguished capsid from envelope; prophage from free virion; RNA genome from retrovirus; and mutation from selection.'),
 p('Use Contents to return to an activity. “Started” means a response contains work; it is not a mark or a completion judgement.'),
 p('Add your name under Student. Export a submission to send to your teacher, or choose Print / Save PDF. Keep an editable backup if you want to continue on another device.')],
 'Name one idea you can now explain, one piece of evidence that helped, and one question you still have.',0,'Reflection')
];
export const questions=pages.filter(p=>p.question);
export const independentMarks=questions.filter(p=>p.kind==='Independent practice').reduce((n,p)=>n+p.marks,0);
