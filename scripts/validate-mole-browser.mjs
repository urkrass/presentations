import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { chromium } from 'playwright-chromium'
import { PDFDocument } from 'pdf-lib'
import { startStaticSite } from './lib/start-static-site.mjs'

// Extends the same built-site validation approach used by the two IB decks.
// Browser plugin not available in this session; use the installed Playwright runtime.
// Flow: direct slide route -> reveal/choose/navigate -> stable readable result.
const root = process.cwd()
if (process.env.MOLE_SKIP_BUILD !== '1') execFileSync(process.execPath,['scripts/build-mole.mjs'],{stdio:'inherit'})
const output = process.env.MOLE_SCREENSHOTS || path.join(os.tmpdir(),'presentations-mole-qa')
fs.mkdirSync(output,{recursive:true})
const site = await startStaticSite(root,'ib-dp/mole-history/index.html')
const base = `${site.origin}/ib-dp/mole-history`
const browser = await chromium.launch({headless:true})
const failures=[]
const totalSlides=56
function check(ok,label){console.log(`${ok?'PASS':'FAIL'} ${label}`);if(!ok)failures.push(label)}
function watch(page){page.on('pageerror',e=>{if(!e.message.includes('Wake Lock'))failures.push(e.message)});page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('Wake Lock'))failures.push(m.text())})}
async function go(page,n,query=''){
  await page.goto(`${base}/${n}${query}`,{waitUntil:'networkidle'})
  const slide=page.locator(`.slidev-page-${n} .slidev-layout`)
  await slide.waitFor({state:'visible'});await page.evaluate(()=>document.fonts.ready)
  return slide
}
async function bounds(slide){return slide.evaluate(el=>{
  const stage=el.getBoundingClientRect()
  const bad=[]
  for(const node of el.querySelectorAll('h1,h2,p,figure,button,input,select,.argument-row,.quantity-result,.mapping-row,.katex-display,.cover-art,.mole-reveal')){
    if(node.closest('[aria-hidden="true"],.slidev-vclick-hidden,.flip-back,.katex-mathml'))continue
    const b=node.getBoundingClientRect(),c=getComputedStyle(node)
    if(!b.width||!b.height||c.display==='none'||c.visibility==='hidden')continue
    if(b.left<stage.left-2||b.right>stage.right+2||b.bottom>stage.bottom+2||b.top<stage.top-2)bad.push(`${node.tagName}.${node.className} ${Math.round(b.right-stage.right)},${Math.round(b.bottom-stage.bottom)}`)
  }
  return {bad,overflow:el.scrollWidth>el.clientWidth+2||el.scrollHeight>el.clientHeight+2,broken:[...el.querySelectorAll('img')].filter(i=>!i.complete||!i.naturalWidth).length,mathErrors:el.querySelectorAll('.katex-error').length,rawMath:[...el.querySelectorAll('p,.reveal-content')].filter(n=>n.innerText.includes('$')).map(n=>n.innerText)}
})}
try{
  for(const viewport of [{width:1366,height:768},{width:1920,height:1080}]){
    const page=await browser.newPage({viewport,reducedMotion:'reduce'});watch(page)
    for(let n=1;n<=totalSlides;n++){
      const slide=await go(page,n)
      const b=await bounds(slide)
      check(!b.bad.length&&!b.overflow&&!b.broken&&!b.mathErrors&&!b.rawMath.length,`${viewport.width} slide${n} layout/assets/math ${JSON.stringify(b)}`)
      await page.screenshot({path:path.join(output,`${viewport.width}-${String(n).padStart(2,'0')}.png`)})
      // Review the fully open endpoint as well, not only the initial stage.
      for(const button of await slide.locator('.reveal-toggle,.mole-flip').all())await button.click()
      const count=slide.locator('.many-field');if(await count.count())await count.click()
      const next=slide.getByRole('button',{name:'Next historical estimate'});if(await next.count())for(let j=0;j<3;j++)await next.click()
      const opts=slide.locator('.quick-options button');if(await opts.count())await opts.first().click()
      const lectureSteps=await slide.locator('.slidev-vclick-hidden').count()
      for(let j=0;j<lectureSteps;j++)await page.keyboard.press('ArrowRight')
      await page.waitForTimeout(80)
      const final=await bounds(slide)
      check(!final.overflow&&!final.bad.length,`${viewport.width} slide${n} open-state fit ${JSON.stringify(final.bad)}`)
      if(viewport.width===1366)await page.screenshot({path:path.join(output,`open-${String(n).padStart(2,'0')}.png`)})
    }
    await page.close()
  }
  const page=await browser.newPage({viewport:{width:1366,height:768}});watch(page)
  let slide=await go(page,5)
  const flip=slide.locator('.mole-flip').first();await flip.focus();await page.keyboard.press('Enter');await page.waitForTimeout(420)
  check(await flip.getAttribute('aria-pressed')==='true','flip Enter opens')
  check((await flip.locator('.flip-inner').evaluate(e=>getComputedStyle(e).transform)).startsWith('matrix3d'),'genuine CSS3D flip')
  await page.keyboard.press('Space');check(await flip.getAttribute('aria-pressed')==='false','flip Space closes')
  slide=await go(page,2);const reveal=slide.locator('.mole-reveal');const before=await reveal.boundingBox()
  check((await reveal.locator('.reveal-content').evaluate(e=>getComputedStyle(e).filter)).includes('blur'),'evidence initially blurred')
  await reveal.locator('button').focus();await page.keyboard.press('Enter');await page.waitForTimeout(440)
  check(await reveal.locator('button').getAttribute('aria-expanded')==='true','blur disclosure keyboard operation')
  const after=await reveal.boundingBox();check(Math.abs(before.height-after.height)<1&&Math.abs(before.y-after.y)<1,'reveal reserves stable layout')
  for(const [n,answer] of [[7,1],[25,0],[36,1],[40,2],[44,2]]){
    slide=await go(page,n);const options=slide.locator('.quick-options');const b=await options.boundingBox()
    await options.locator('button').nth(answer).click();check((await slide.locator('.check-answer').innerText()).startsWith('Supported.'),`quiz${n} explanation`)
    const a=await options.boundingBox();check(Math.abs(b.y-a.y)<1&&Math.abs(b.height-a.height)<1,`quiz${n} choices do not jump`)
    await options.locator('button').nth((answer+1)%4).click();check((await slide.locator('.check-answer').innerText()).startsWith('Reconsider.'),`quiz${n} misconception feedback`)
  }
  for(const [n,clicks] of [[8,2],[16,2],[17,2],[18,2],[24,1],[32,1],[34,2],[37,1],[41,1],[46,3],[52,2]]){
    slide=await go(page,n)
    check(await slide.locator('.slidev-vclick-hidden').count()===clicks,`slide${n} initial click state`)
    for(let i=0;i<clicks;i++)await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(450)
    check(await slide.locator('.slidev-vclick-hidden').count()===0,`slide${n} forward reveals`)
    await page.screenshot({path:path.join(output,`clicks-${n}.png`)})
    check(!(await bounds(slide)).overflow,`slide${n} final lecture state fits`)
    for(let i=0;i<clicks;i++)await page.keyboard.press('ArrowLeft')
    check(await slide.locator('.slidev-vclick-hidden').count()===clicks,`slide${n} backward hides`)
    slide=await go(page,n,`?clicks=${clicks}`);check(await slide.locator('.slidev-vclick-hidden').count()===0,`slide${n} direct click-state navigation`)
    await page.reload({waitUntil:'networkidle'});check(await page.locator(`.slidev-page-${n} .slidev-vclick-hidden`).count()===0,`slide${n} refresh preserves lecture state`)
  }
  slide=await go(page,35)
  const amountInput=slide.locator('input')
  await amountInput.fill('4.862')
  check((await slide.locator('.quantity-result').innerText()).includes('0.2000'),'mass explorer doubles amount')
  await slide.getByRole('button',{name:'Reverse direction'}).click()
  check((await slide.locator('.quantity-result').innerText()).includes('4.862'),'reverse mode preserves the sample')
  await amountInput.fill('')
  check(await amountInput.getAttribute('aria-invalid')==='true'&&(await slide.locator('.quantity-result').innerText()).includes('positive'),'empty quantity handled without NaN')
  await slide.getByRole('button',{name:'Reset',exact:true}).click()
  await slide.locator('select').focus();await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter')
  check(await slide.locator('select').inputValue()==='1','substance keyboard selection')
  await page.reload({waitUntil:'networkidle'})
  check((await page.locator('.slidev-page-35 .quantity-result').innerText()).includes('0.1000'),'refresh initializes default mass state')
  slide=await go(page,49)
  const productInput=slide.locator('input')
  check((await slide.locator('.result-row').innerText()).includes('4.031'),'product explorer default Mg yield')
  await productInput.fill('4.862')
  check((await slide.locator('.result-row').innerText()).includes('8.062'),'product yield scales with starting mass')
  await slide.locator('select').selectOption('1');await productInput.fill('4.00')
  check((await slide.locator('.result-row').innerText()).includes('10.08'),'oxygen uses 2:1 product coefficient ratio')
  for(const [choice,mass,expected] of [['2','10.0','5.603'],['3','6.538','0.2020']]){
    await slide.locator('select').selectOption(choice);await productInput.fill(mass)
    check((await slide.locator('.result-row').innerText()).includes(expected),'reaction selection '+choice+' correct product mass')
  }
  const steady=await slide.locator('.product-argument').boundingBox()
  await productInput.fill('-1')
  check(await productInput.getAttribute('aria-invalid')==='true'&&!(await slide.locator('.product-argument').innerText()).includes('NaN'),'negative product input guarded')
  const invalid=await slide.locator('.product-argument').boundingBox()
  check(Math.abs(steady.y-invalid.y)<1,'invalid input does not move workbench origin')
  await slide.getByRole('button',{name:'Reset',exact:true}).click()
  check((await slide.locator('.result-row').innerText()).includes('4.031'),'product reset restores initial reaction')
  await page.emulateMedia({reducedMotion:'reduce'});slide=await go(page,5)
  check(parseFloat(await slide.locator('.flip-inner').first().evaluate(e=>getComputedStyle(e).transitionDuration))<=.001,'reduced motion short-circuits card movement')
  await page.emulateMedia({media:'print'})
  slide=await go(page,27);check(await slide.locator('.reveal-content').first().evaluate(e=>getComputedStyle(e).filter)==='none','print includes independently hidden answers')
  slide=await go(page,5);check(await slide.locator('.flip-back').first().evaluate(e=>getComputedStyle(e).transform)==='none','print includes card explanations')
  slide=await go(page,25);check(await slide.locator('.print-answer').isVisible(),'print includes quiz solution')
  slide=await go(page,11);check(await slide.locator('.pending').first().evaluate(e=>getComputedStyle(e).filter)==='none','print includes complete history plot')
  // Production builds omit Slidev's /print route unless download:true generates a PDF at build time.
  // Follow the repository's export-experiments strategy instead: one final-state page per slide.
  const pdf=await PDFDocument.create()
  pdf.setTitle('The mole and its history — teacher answer edition')
  for(let n=1;n<=totalSlides;n++){
    slide=await go(page,n)
    const result=await bounds(slide)
    check(!result.overflow&&!result.bad.length,`print slide${n} fits ${JSON.stringify(result.bad)}`)
    const bytes=await slide.screenshot({animations:'disabled'})
    const img=await pdf.embedPng(bytes)
    pdf.addPage([1280,720]).drawImage(img,{x:0,y:0,width:1280,height:720})
    if([5,25,27].includes(n))await slide.screenshot({path:path.join(output,`print-${n}.png`),animations:'disabled'})
  }
  fs.writeFileSync(path.join(output,'mole-teacher-export.pdf'),await pdf.save())
  check(pdf.getPageCount()===totalSlides,'56-page stable teacher export')
  await page.close()
}finally{await browser.close();await site.close()}
console.log(`Screenshots/export: ${output}`)
if(failures.length){console.error([...new Set(failures)].join('\n'));process.exit(1)}
console.log('PASS all routes, interactions, navigation, print and console checks')
