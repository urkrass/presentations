import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { chromium } from 'playwright-chromium'
import { PDFDocument } from 'pdf-lib'
import { startStaticSite } from './lib/start-static-site.mjs'
// Same built-site harness and answer-edition export strategy as validate-mole-browser.
// Browser plugin not available: validate with the installed Playwright runtime.
if(process.env.EMPIRICAL_SKIP_BUILD!=='1')execFileSync(process.execPath,['scripts/build-empirical.mjs'],{stdio:'inherit'})
const output=process.env.EMPIRICAL_SCREENSHOTS||path.join(os.tmpdir(),'presentations-empirical-qa')
fs.mkdirSync(output,{recursive:true})
const site=await startStaticSite(process.cwd(),'grade-8/empirical-formula/index.html')
const base=site.origin+'/grade-8/empirical-formula'
const browser=await chromium.launch({headless:true})
const failures=[]
function check(ok,label){console.log(`${ok?'PASS':'FAIL'} ${label}`);if(!ok)failures.push(label)}
function watch(page){page.on('pageerror',e=>{if(!e.message.includes('Wake Lock'))failures.push(e.message)});page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('Wake Lock'))failures.push(m.text())})}
async function go(page,n,query=''){
  await page.goto(`${base}/${n}${query}`,{waitUntil:'networkidle'})
  const slide=page.locator(`.slidev-page-${n} .slidev-layout`)
  await slide.waitFor({state:'visible'});await page.evaluate(()=>document.fonts.ready)
  return slide
}
async function bounds(slide){return slide.evaluate(el=>{
  const box=el.getBoundingClientRect(),bad=[]
  for(const node of el.querySelectorAll('h1,h2,p,figure,button,select,table,.working,.ratio-path,.method-steps,.bench-conclusion,.mole-reveal')){
    if(node.closest('[aria-hidden="true"],.slidev-vclick-hidden,.flip-back,.katex-mathml'))continue
    const b=node.getBoundingClientRect(),c=getComputedStyle(node)
    if(!b.width||!b.height||c.display==='none'||c.visibility==='hidden')continue
    if(b.left<box.left-2||b.right>box.right+2||b.top<box.top-2||b.bottom>box.bottom+2)bad.push(`${node.tagName}.${node.className}`)
  }
  const unstyledMath=[...el.querySelectorAll('.katex-mathml')].some(n=>getComputedStyle(n).position!=='absolute')
  return{bad,overflow:el.scrollWidth>el.clientWidth+2||el.scrollHeight>el.clientHeight+2,broken:[...el.querySelectorAll('img')].some(i=>!i.complete||!i.naturalWidth),mathErrors:el.querySelectorAll('.katex-error').length,unstyledMath,text:el.innerText.trim().length}
})}
const fits=b=>!b.bad.length&&!b.overflow&&!b.broken&&!b.mathErrors&&!b.unstyledMath&&b.text>40
try{
  for(const viewport of [{width:1366,height:768},{width:1920,height:1080}]){
    const page=await browser.newPage({viewport,reducedMotion:'reduce'});watch(page)
    for(let n=1;n<=30;n++){
      const slide=await go(page,n),initial=await bounds(slide)
      check(fits(initial),`${viewport.width} slide${n} initial ${JSON.stringify(initial)}`)
      await page.screenshot({path:path.join(output,`${viewport.width}-${String(n).padStart(2,'0')}.png`)})
      for(const button of await slide.locator('.reveal-toggle,.mole-flip').all())await button.click()
      const options=slide.locator('.quick-options button');if(await options.count())await options.first().click()
      // Remove focus from interactive controls before lecture navigation.
      await page.evaluate(()=>document.activeElement?.blur())
      const clicks=await slide.locator('.slidev-vclick-hidden').count()
      for(let j=0;j<clicks;j++)await page.keyboard.press('ArrowRight')
      await page.waitForTimeout(40)
      check(fits(await bounds(slide)),`${viewport.width} slide${n} open-state fit`)
      if(viewport.width===1366)await page.screenshot({path:path.join(output,`open-${String(n).padStart(2,'0')}.png`)})
    }
    await page.close()
  }
  const page=await browser.newPage({viewport:{width:1366,height:768}});watch(page)
  let slide=await go(page,4)
  await slide.getByRole('button',{name:'Divide all by 2',exact:true}).focus();await page.keyboard.press('Enter')
  check((await slide.locator('.ratio-columns strong').allTextContents()).join(':')==='3:6:3','reducer divides every entry by2 via keyboard')
  await slide.getByRole('button',{name:'Divide all by 3',exact:true}).click()
  check((await slide.locator('.ratio-verdict').innerText()).includes('CH₂O'),'reducer reaches empirical formula')
  await slide.getByRole('button',{name:'Reset',exact:true}).click()
  await slide.getByRole('button',{name:'Divide all by 6',exact:true}).click()
  check((await slide.locator('.ratio-columns strong').allTextContents()).join(':')==='1:2:1','direct and two-stage reduction agree')
  check(await slide.getByRole('button',{name:'Divide all by 2',exact:true}).isDisabled(),'invalid whole-number division disabled')
  await page.reload({waitUntil:'networkidle'})
  check((await page.locator('.slidev-page-4 .ratio-columns strong').allTextContents()).join(':')==='6:12:6','refresh resets reducer deterministically')
  slide=await go(page,6)
  const flip=slide.locator('.mole-flip').first();await flip.focus();await page.keyboard.press('Enter');await page.waitForTimeout(420)
  check(await flip.getAttribute('aria-pressed')==='true'&&(await flip.locator('.flip-inner').evaluate(e=>getComputedStyle(e).transform)).startsWith('matrix3d'),'keyboard genuine3D flip')
  await page.keyboard.press('Space');check(await flip.getAttribute('aria-pressed')==='false','Space closes card')
  slide=await go(page,11)
  const reveal=slide.locator('.mole-reveal'),before=await reveal.boundingBox()
  check((await reveal.locator('.reveal-content').evaluate(e=>getComputedStyle(e).filter)).includes('blur'),'evidence initially blurred')
  await reveal.locator('button').focus();await page.keyboard.press('Enter');await page.waitForTimeout(420)
  const after=await reveal.boundingBox()
  check(await reveal.locator('button').getAttribute('aria-expanded')==='true'&&Math.abs(before.y-after.y)<1&&Math.abs(before.height-after.height)<1,'keyboard reveal keeps anchored layout')
  for(const [n,correct] of [[2,1],[13,2],[20,0]]){
    slide=await go(page,n);const opts=slide.locator('.quick-options'),a=await opts.boundingBox()
    await opts.locator('button').nth(correct).click()
    check((await slide.locator('.check-answer').innerText()).startsWith('Supported.'),`quiz${n} correct explanation`)
    const b=await opts.boundingBox();check(Math.abs(a.y-b.y)<1,`quiz${n} choices stable`)
    await opts.locator('button').nth((correct+1)%4).click()
    check((await slide.locator('.check-answer').innerText()).startsWith('Reconsider.'),`quiz${n} misconception feedback`)
  }
  for(const [n,clicks] of [[3,2],[8,1],[10,2],[18,2],[19,2],[23,3]]){
    slide=await go(page,n);check(await slide.locator('.slidev-vclick-hidden').count()===clicks,`slide${n} initial lecture state`)
    for(let j=0;j<clicks;j++)await page.keyboard.press('ArrowRight')
    check(await slide.locator('.slidev-vclick-hidden').count()===0,`slide${n} forward`)
    for(let j=0;j<clicks;j++)await page.keyboard.press('ArrowLeft')
    check(await slide.locator('.slidev-vclick-hidden').count()===clicks,`slide${n} backward`)
    slide=await go(page,n,`?clicks=${clicks}`);await page.reload({waitUntil:'networkidle'})
    check(await page.locator(`.slidev-page-${n} .slidev-vclick-hidden`).count()===0,`slide${n} direct-state refresh`)
  }
  slide=await go(page,26)
  const origin=await slide.locator('.bench-conclusion').boundingBox()
  await slide.locator('select').first().focus();await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter')
  check(await slide.locator('select').first().inputValue()==='1'&&new URL(page.url()).pathname.endsWith('/26'),'native selector works without triggering slide navigation')
  await slide.locator('select').first().selectOption('3')
  for(let i=0;i<3;i++)await slide.getByRole('button',{name:'Next step',exact:true}).click()
  check((await slide.locator('.bench-conclusion').innerText()).includes('Fe₂O₃'),'workbench half ratio yields Fe2O3')
  await slide.locator('select').nth(1).selectOption('2')
  check((await slide.locator('tbody tr').first().innerText()).includes('11.2')&&(await slide.locator('.bench-conclusion').innerText()).includes('Fe₂O₃'),'double sample changes masses not empirical formula')
  check(Math.abs(origin.y-(await slide.locator('.bench-conclusion').boundingBox()).y)<1,'workbench result does not jump')
  await page.screenshot({path:path.join(output,'workbench-final.png')})
  await slide.getByRole('button',{name:'Previous step',exact:true}).click()
  check((await slide.locator('.bench-conclusion strong').innerText())==='Ratio','workbench backward state')
  await slide.getByRole('button',{name:'Reset',exact:true}).click()
  check(await slide.locator('select').first().inputValue()==='0'&&await slide.locator('select').nth(1).inputValue()==='1','workbench reset')
  await go(page,25);slide=await go(page,26)
  check((await slide.locator('.bench-conclusion strong').innerText())==='Mass','repeat direct navigation initializes state')
  await page.emulateMedia({reducedMotion:'reduce'});slide=await go(page,6)
  check(parseFloat(await slide.locator('.flip-inner').first().evaluate(e=>getComputedStyle(e).transitionDuration))<=.001,'reduced motion suppresses spin duration')
  await page.emulateMedia({media:'print'})
  const pdf=await PDFDocument.create();pdf.setTitle('Empirical formula — Grade 8 — teacher answer edition')
  for(let n=1;n<=30;n++){
    slide=await go(page,n);check(fits(await bounds(slide)),`print slide${n} fits`)
    if([4,26].includes(n))check(await slide.locator('.static-only').isVisible(),`print slide${n} stable final argument`)
    if(n===11)check(await slide.locator('.reveal-content').evaluate(e=>getComputedStyle(e).filter)==='none','print unblurs explanation')
    if(n===2)check(await slide.locator('.print-answer').isVisible(),'print quiz answer visible')
    const bytes=await slide.screenshot({animations:'disabled'}),img=await pdf.embedPng(bytes)
    pdf.addPage([1280,720]).drawImage(img,{x:0,y:0,width:1280,height:720})
  }
  fs.writeFileSync(path.join(output,'empirical-formula-teacher.pdf'),await pdf.save())
  check(pdf.getPageCount()===30,'30-page teacher answer export')
  await page.close()
  const mobile=await browser.newPage({viewport:{width:844,height:390},isMobile:true,hasTouch:true});watch(mobile)
  slide=await go(mobile,4);await slide.getByRole('button',{name:'Divide all by 6',exact:true}).tap()
  check((await slide.locator('.ratio-verdict').innerText()).includes('CH₂O')&&fits(await bounds(slide)),'landscape mobile tap and stage fit')
  await mobile.close()
}finally{await browser.close();await site.close()}
console.log(`Screenshots/export: ${output}`)
if(failures.length){console.error([...new Set(failures)].join('\n'));process.exit(1)}
console.log('PASS 30 routes, both viewports, keyboard/touch, reveals, quiz feedback, refresh, reduced motion, print, console')
