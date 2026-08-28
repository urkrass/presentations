import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const deck = path.join(root, 'decks', 'ib-dp-a2-cells-viruses')
const slides = fs.readFileSync(path.join(deck, 'slides.md'), 'utf8')
const css = fs.readFileSync(path.join(deck, 'styles', 'index.css'), 'utf8')
const components = fs.readdirSync(path.join(deck, 'components')).filter((file) => file.endsWith('.vue'))
const componentSource = components.map((file) => fs.readFileSync(path.join(deck, 'components', file), 'utf8')).join('\n')
const millerBoilingComponent = fs.readFileSync(path.join(deck, 'components', 'MillerUreyBoiling.vue'), 'utf8')
const millerBoilingShader = fs.readFileSync(path.join(deck, 'lib', 'millerUreyBoilingShaders.ts'), 'utf8')
const millerCondenserComponent = fs.readFileSync(path.join(deck, 'components', 'MillerUreyCondenser.vue'), 'utf8')
const millerCondenserModel = fs.readFileSync(path.join(deck, 'lib', 'millerUreyCondensationModel.ts'), 'utf8')
const millerCondenserPath = fs.readFileSync(path.join(deck, 'lib', 'millerUreyCondenserPath.ts'), 'utf8')
const millerCondenserShader = fs.readFileSync(path.join(deck, 'lib', 'millerUreyCondenserShaders.ts'), 'utf8')
const surfacePath = fs.readFileSync(path.join(deck, 'lib', 'surfacePath.ts'), 'utf8')
const millerUreyPath = path.join(deck, 'assets', 'miller-urey.svg')
const millerUreySource = fs.existsSync(millerUreyPath) ? fs.readFileSync(millerUreyPath, 'utf8') : ''
const checks = []
const check = (name, pass, detail = '') => checks.push({ name, pass, detail })

const sourceBlocks = (slides.match(/\[Sources\]/g) || []).length
const quickChecks = (slides.match(/<QuickCheck/g) || []).length
const notes = (slides.match(/\[Teacher prompt\]/g) || []).length
const sections = ['A2.1', 'A2.2', 'A2.3']
const cases = ['Bennu', 'Miller', 'Hooke', 'Lederberg', 'smallpox', 'Patterson']
const teachingInteractions = ['LifeBoundaryBuilder', 'MillerUreyAssumptions', 'ClaimDisciplineSorter', 'ScaleBarWorkbench', 'DefinitionStressTest', 'PhageTherapyMatcher']

check('all syllabus sections present', sections.every((term) => slides.includes(term)), sections.join(', '))
check('scene-led components present', components.length >= 10, `${components.length} components`)
check('tests distributed through unit', quickChecks >= 3, `${quickChecks} quick checks`)
check('source notes are extensive', sourceBlocks >= 35, `${sourceBlocks} source blocks`)
check('teacher prompts are extensive', notes >= 35, `${notes} prompts`)
check('historical and real cases present', cases.every((term) => slides.toLowerCase().includes(term.toLowerCase())), cases.join(', '))
check('deliberate interactions distributed through the unit', teachingInteractions.every((name) => slides.includes(`<${name}`)), teachingInteractions.join(', '))
check('TOK and NOS present', slides.includes('TOK') && slides.includes('NOS'))
check('no decorative horizontal rules or underlines', !/<hr\b/i.test(slides) && !/border-(?:top|bottom)\s*:/i.test(css + '\n' + componentSource) && !/text-decoration\s*:\s*underline/i.test(css + '\n' + componentSource))
check('no authored SVG path or line geometry', !/<(?:line|polyline)\b/i.test(slides + '\n' + componentSource) && !/<path\b[^>]*\sd\s*=\s*["']/i.test(slides + '\n' + componentSource))
check('no missing local images', [...slides.matchAll(/(?:src=|image:)'?\"?images\/([^'\"\s)]+)/g)].every((match) => fs.existsSync(path.join(deck, 'public', 'images', match[1]))))
check('sourced Miller-Urey vector retains its scientific animation targets', ['path18224', 'path3227', 'path8237', 'path13101', 'path5191'].every(id => millerUreySource.includes(`id="${id}"`)))
check('Miller-Urey flask reuses the validated deterministic boiling model', millerBoilingComponent.includes("from '../../visual-lab/lib/boilingModel'") && millerBoilingComponent.includes("new BoilingModel(100, 'rolling')"))
check('Miller-Urey boiling boundary is rasterized from the sourced apparatus', millerBoilingComponent.includes('data-source-boundary="path5114-outer"') && millerBoilingComponent.includes('new Path2D(props.boundaryPath)') && millerBoilingComponent.includes('maskCanvas.toDataURL') && componentSource.includes("querySelector('#path5114')") && millerBoilingShader.includes('return p;'))
check('Miller-Urey splashes keep the validated particle scale', millerBoilingShader.includes('splashField += bubbleInfluence(p, bubble, flowWarp)') && !/projectedSplash|bubble\.z\s*\*\s*2\.35/.test(millerBoilingShader))
check('Miller-Urey surface meets the sourced glass with a low-angle capillary shoulder', millerBoilingShader.includes('float meniscus = 0.140 * pow(capillaryShoulder, 2.2)') && millerBoilingShader.includes('(x - 0.766) / 0.068') && millerBoilingShader.includes('(0.232 - x) / 0.068') && millerBoilingShader.includes('source-derived raster mask owns'))
check('Miller-Urey liquid field is sealed at the left return-tube junction', millerBoilingShader.includes('float leftBulbSeal = smoothstep(0.158, 0.168, q.x)') && millerBoilingShader.includes('float horizontal = leftBulbSeal * rightExtent'))
check('Miller-Urey water level sits below the return-tube junction with synchronized bubbles', millerBoilingShader.includes('const float MILLER_WATER_SURFACE = 0.402') && millerBoilingComponent.includes('const MILLER_WATER_LEVEL_OFFSET = 0.11') && millerBoilingComponent.includes('shiftedBubbleData[dataOffset + 1] += MILLER_WATER_LEVEL_OFFSET'))
check('Miller-Urey condenser derives an exact channel mask from the two sourced walls and restores sourced glass above it', millerCondenserComponent.includes('new Path2D(props.boundaryPath)') && millerCondenserComponent.includes('data-source-boundary="path5114-inner-lumen"') && millerCondenserComponent.includes('data-source-front-glass="path5114"') && componentSource.includes('deriveCondenserChannelPath') && componentSource.includes("querySelector('#path5114')"))
check('Miller-Urey condenser exposes two explicit wetting surfaces through every sourced bend', surfacePath.includes('class CubicSurfacePath') && surfacePath.includes('pointAt(s: number)') && surfacePath.includes('tangentAt(s: number)') && millerCondenserPath.includes("type CondenserSurfaceSide = 'wall-a' | 'wall-b'") && millerCondenserPath.includes('class OffsetWettingSurface') && millerCondenserPath.includes('condenserWallA') && millerCondenserPath.includes('condenserWallB'))
check('Miller-Urey attached condensate integrates s on immutable wall identity rather than unconstrained world position', millerCondenserModel.includes("surface: CondenserSurfaceSide") && millerCondenserModel.includes("state: 'pinned'") && millerCondenserModel.includes("drop.state = 'sliding'") && millerCondenserModel.includes('drop.s = clamp(drop.s + drop.speed * dt') && !millerCondenserModel.includes('laneOffset') && !/drop\.(?:x|y)\s*\+=/.test(millerCondenserModel.split('private updateDetachedDrops')[0]))
check('Miller-Urey condensate merges and feeds only on the same wetting surface', millerCondenserModel.includes("for (const surface of ['wall-a', 'wall-b'] as const)") && millerCondenserModel.includes('drop.surface === surface') && millerCondenserModel.includes('drop.surface !== this.rivulet.surface') && millerCondenserModel.includes('receiver.mass = totalMass'))
check('Miller-Urey main cycle transitions into a bounded surface drip cadence while static export remains settled', millerCondenserModel.includes("CondenserLifecycleState = 'condensing' | 'flowing' | 'transferring' | 'dripping' | 'settled'") && millerCondenserModel.includes('createStaticFinalState()') && millerCondenserModel.includes('updateTerminalDrip') && millerCondenserModel.includes("this.lifecycleState = 'dripping'") && millerCondenserModel.includes("this.lifecycleState = 'settled'"))
check('Miller-Urey rivulet uses stable path-space seeds and local decimation', millerCondenserModel.includes('stableTrailSeed') && millerCondenserModel.includes('seed: number') && millerCondenserModel.includes('decimateTrailLocally') && !millerCondenserModel.includes('resampleTrail'))
check('Miller-Urey condenser renders a connected variable-width segment ribbon into the sourced trap receiver', millerCondenserShader.includes('vec2 segment = end - start') && millerCondenserShader.includes('distanceToSegment') && millerCondenserShader.includes('effectiveRadius') && millerCondenserShader.includes('stableSeed') && millerCondenserShader.includes('pathCoordinate') && !millerCondenserShader.includes('float(index) * 2.17') && millerCondenserShader.includes('trapPoolInfluence') && millerCondenserComponent.includes('data-source-liquid="path10175"') && millerCondenserComponent.includes('updateRenderedTrapLiquidPath'))
check('Miller-Urey condenser exposes wall identity, normals, segments, and receiver state in debug mode', millerCondenserComponent.includes('data-debug-surface-path="true"') && millerCondenserComponent.includes('condenserWallA') && millerCondenserComponent.includes('condenserWallB') && millerCondenserComponent.includes('drop.normal') && millerCondenserComponent.includes('head.surface') && millerCondenserComponent.includes('g·t'))
check('legacy three-stroke steam is removed', ['path28215', 'path3213', 'path3217'].every(id => !millerUreySource.includes(`id="${id}"`)) && !componentSource.includes('const steam ='))

for (const result of checks) console.log(`${result.pass ? 'PASS' : 'FAIL'} ${result.name}${result.detail ? ` - ${result.detail}` : ''}`)
process.exit(checks.every(({ pass }) => pass) ? 0 : 1)
