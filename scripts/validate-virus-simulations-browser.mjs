// Run against the static app. Optional overrides support managed Chromium runtimes.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import os from 'node:os';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright-chromium');
const root=fileURLToPath(new URL('../site/',import.meta.url));
const out=process.env.VIRUS_QA_DIR||path.join(os.tmpdir(),'virus-simulation-qa');fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{let f=path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(f.endsWith('/'))f+='index.html';try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.otf':'font/otf'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));}catch{res.statusCode=404;res.end('Not found');}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const url=`http://127.0.0.1:${server.address().port}/ib-dp/viruses/`;
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.CHROMIUM_EXECUTABLE_PATH}:{}),args:process.env.CHROMIUM_HELPER?require(process.env.CHROMIUM_HELPER).args:[]});
const errors=[],findings=[];let checked=0;
try{
 const ctx=await browser.newContext({viewport:{width:1280,height:720},acceptDownloads:true});const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
 const act=action=>page.locator('#simulation-dialog [data-action="'+action+'"]').click();
 const view=name=>page.locator('#simulation-dialog [data-view="'+name+'"]').click();
 const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('ita:viruses-hl:v1')));
 async function open(id){
  await page.goto(url+'#'+id);await page.waitForSelector('#page-title',{state:'attached'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100);
  for(let i=0;i<10&&!await page.locator('#reading-body [data-simulation]').count();i++)await page.locator('#reading-next').click();
  await page.locator('#reading-body [data-simulation]').click();await page.waitForFunction(()=>!document.querySelector('#simulation-dialog [data-action="play"]').disabled);assert.equal(await page.locator('.world-host canvas').count(),1);
 }
 async function playUntil(time){await page.locator('[data-speed]').selectOption('4');await act('play');await page.waitForFunction(t=>parseFloat(document.querySelector('.run-time').textContent)>=t,time,{timeout:25000});await act('play');}
 async function check(label){
  const issues=await page.evaluate(()=>{const d=document.querySelector('#simulation-dialog');return [...d.querySelectorAll('*'),d].filter(e=>e instanceof HTMLElement&&!e.classList.contains('sr-only')&&e.getBoundingClientRect().width&&e.getBoundingClientRect().height).flatMap(e=>{const r=e.getBoundingClientRect(),problems=[];if(e.scrollHeight>e.clientHeight+3||e.scrollWidth>e.clientWidth+3)problems.push('overflow');if(r.left<0||r.right>innerWidth+1||r.top<0||r.bottom>innerHeight+1)problems.push('outside viewport');return problems.length?[{tag:e.tagName,cls:e.className,text:e.textContent.slice(0,80),problems,client:[e.clientWidth,e.clientHeight],scroll:[e.scrollWidth,e.scrollHeight]}]:[];});});
  if(issues.length)findings.push({label,issues});checked++;
 }
 async function notes(){await view('notes');let i=0;do{await check('model notes '+i++);if(!await page.locator('[data-note="1"]').isEnabled())break;await page.locator('[data-note="1"]').click();}while(i<8);await view('live');}
 // Real rendered frames must change during a run, remain identical when paused,
 // and repeat exactly after Reset. Counters alone cannot satisfy this check.
 await open('lambda-lab');await act('reset');await page.waitForTimeout(250);const initial=await page.locator('.world-host canvas').screenshot();
 await playUntil(16);const active=await page.locator('.world-host canvas').screenshot();assert.notDeepEqual(active,initial);const paused=await page.locator('.run-time').innerText();await page.waitForTimeout(500);assert.equal(await page.locator('.run-time').innerText(),paused);assert.deepEqual(await page.locator('.world-host canvas').screenshot(),active);
 assert.ok(Number(await page.locator('.run-metrics strong').nth(3).innerText())>0);await page.screenshot({path:path.join(out,'lambda-lytic.png')});
 await act('reset');await page.waitForTimeout(250);assert.deepEqual(await page.locator('.world-host canvas').screenshot(),initial);
 await page.locator('[data-receptors]').selectOption('blocked');await act('apply');await playUntil(5);assert.equal(await page.locator('.run-metrics strong').nth(2).innerText(),'18');assert.equal(await page.locator('.run-metrics strong').nth(3).innerText(),'0');
 await page.locator('[data-receptors]').selectOption('available');await page.locator('[data-route]').selectOption('lysogenic');await act('apply');await playUntil(8);assert.ok(Number(await page.locator('.run-metrics strong').nth(1).innerText())>0);await act('stress');await playUntil(22);assert.ok(Number(await page.locator('.run-metrics strong').nth(3).innerText())>0);await act('record');await act('close');await page.waitForTimeout(350);const lambdaRun=(await state()).experiments.lambda;assert.equal(lambdaRun.events.length,1);
 await open('segment-lab');await act('reset');await playUntil(23);assert.ok(Number(await page.locator('.run-metrics strong').nth(1).innerText())>0);await act('latest');assert.match(await page.locator('.run-event').innerText(),/Genome \d+: 1[AB].*8[AB]/);await page.screenshot({path:path.join(out,'influenza-mixed.png')});await act('record');
 await page.locator('[data-sources]').selectOption('single');await act('apply');await playUntil(20);assert.ok(Number(await page.locator('.run-metrics strong').nth(0).innerText())>0);assert.equal(await page.locator('.run-metrics strong').nth(1).innerText(),'0');await act('latest');assert.doesNotMatch(await page.locator('.run-event').innerText(),/\dB/);
 await act('play');await view('results');const tabPause=await page.locator('.run-time').innerText();await page.waitForTimeout(400);assert.equal(await page.locator('.run-time').innerText(),tabPause);await page.screenshot({path:path.join(out,'influenza-results.png')});await act('close');
 // All three views, every notes page and populated run outputs must fit.
 for(const size of [{width:1440,height:900},{width:1280,height:720},{width:390,height:844},{width:375,height:667},{width:320,height:568},{width:844,height:390},{width:568,height:320},{width:667,height:375}]){
  await page.setViewportSize(size);
  for(const id of ['lambda-lab','segment-lab']){await open(id);await check(`${size.width}×${size.height} ${id} live`);await page.screenshot({path:path.join(out,`${id}-${size.width}.png`)});await view('results');await check(`${size.width}×${size.height} ${id} results`);await notes();await act('close');}
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({checked,findings,errors},null,2));console.log(`Checked ${size.width}×${size.height}: ${findings.length} layout findings`);
 }
 await page.setViewportSize({width:1280,height:720});await open('segment-lab');const savedTime=await page.locator('.run-time').innerText();await act('close');await page.getByLabel('Written answer',{exact:true}).fill('My prediction before exploring.');await page.locator('#reading-body [data-simulation]').click();await page.waitForFunction(()=>!document.querySelector('[data-action="play"]').disabled);await act('record');await act('record');await act('close');await page.waitForTimeout(350);
 let saved=await state();assert.equal(saved.answers['segment-lab'].text.match(/Dynamic model observation/g).length,1);assert.ok(saved.answers['segment-lab'].text.startsWith('My prediction before exploring.'));const run=saved.experiments.reassortment;
 await page.reload();await open('segment-lab');assert.equal(await page.locator('.run-time').innerText(),savedTime);assert.deepEqual((await state()).experiments.reassortment,run);await act('close');
 await page.getByRole('button',{name:'Export',exact:false}).first().click();let promise=page.waitForEvent('download');await page.getByRole('button',{name:'Download editable backup',exact:true}).click();let dl=await promise;await dl.saveAs(path.join(out,'backup.json'));const backup=JSON.parse(fs.readFileSync(path.join(out,'backup.json'),'utf8'));assert.deepEqual(backup.experiments.lambda,lambdaRun);
 promise=page.waitForEvent('download');await page.getByRole('button',{name:'Download submission',exact:true}).click();dl=await promise;await dl.saveAs(path.join(out,'submission.html'));const html=fs.readFileSync(path.join(out,'submission.html'),'utf8');assert.ok(html.includes('My prediction before exploring.'));assert.ok(html.includes('Dynamic experiment record'));assert.ok(html.includes('Stress pulse times:'));assert.ok(!html.includes('<script'));assert.ok(!html.includes('<canvas'));assert.ok(!html.includes('engine-v1'));
 await page.getByRole('button',{name:'Close dialog',exact:true}).click();await open('segment-lab');await act('reset');await act('close');await page.getByRole('button',{name:'Export',exact:false}).first().click();page.once('dialog',d=>d.accept());await page.locator('#backup-file').setInputFiles(path.join(out,'backup.json'));await page.waitForTimeout(400);assert.deepEqual((await state()).experiments,backup.experiments);
 await open('segment-lab');assert.equal(await page.locator('.run-time').innerText(),savedTime);await page.locator('[data-view="live"]').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('[data-view="results"]').getAttribute('aria-selected'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('#simulation-dialog').isVisible(),false);
 const offline=await ctx.newPage();await offline.goto('file://'+path.join(out,'submission.html'));assert.match(await offline.locator('body').innerText(),/Dynamic model observation/);await offline.pdf({path:path.join(out,'submission.pdf'),preferCSSPageSize:true,printBackground:true});await offline.close();
 // Local rendering has no external service dependency once its module is loaded.
 await open('lambda-lab');await act('reset');await ctx.setOffline(true);await playUntil(2);await ctx.setOffline(false);await act('close');
 // Pause and preserve work if storage is full, and show the failure in the modal.
 await page.setViewportSize({width:320,height:568});await open('lambda-lab');await page.evaluate(()=>{window.restoreQaStorage=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new DOMException('Test quota','QuotaExceededError');};});await act('reset');await page.waitForTimeout(400);assert.match(await page.locator('.sim-notice').innerText(),/Save unavailable/);await check('storage failure at 320');await page.evaluate(()=>{Storage.prototype.setItem=window.restoreQaStorage;delete window.restoreQaStorage;});await act('trial');await page.waitForTimeout(400);await act('close');
 // Repeated mounting must keep exactly one game canvas and release it on close.
 for(let i=0;i<3;i++){await open(i%2?'lambda-lab':'segment-lab');await act('close');await page.waitForTimeout(120);assert.equal(await page.locator('.world-host canvas').count(),0);}
 // Touch controls and the software Canvas fallback use the same numerical model.
 const touchContext=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const touch=await touchContext.newPage();await touch.goto(url+'#segment-lab');await touch.locator('#reading-body [data-simulation]').tap();await touch.waitForFunction(()=>!document.querySelector('[data-action="play"]').disabled);await touch.locator('[data-action="play"]').tap();await touch.waitForFunction(()=>parseFloat(document.querySelector('.run-time').textContent)>0);await touch.locator('[data-action="play"]').tap();await touch.locator('[data-action="close"]').tap();await touch.close();
 await page.setViewportSize({width:1280,height:720});await page.goto(url+'#start');
 const fallback=await page.evaluate(async()=>{const {createEngine}=await import('./runtime/engine-v1.js'),{newWorld,FixedClock}=await import('./dynamics.js');const host=document.createElement('div');host.style.cssText='position:fixed;inset:0;width:900px;height:540px;z-index:99999';document.body.append(host);const world=newWorld('lambda'),clock=new FixedClock();let engine;const renderer=await new Promise((resolve,reject)=>{engine=createEngine(host,{forceCanvas:true,getWorld:()=>world,onFrame:dt=>clock.advance(world,dt),onInspect:()=>{},onError:reject,onReady:resolve});});await new Promise(r=>setTimeout(r,600));const result={renderer,tick:world.tick,width:host.querySelector('canvas').width};engine.destroy();host.remove();return result;});assert.equal(fallback.renderer,'Canvas');assert.ok(fallback.tick>0);assert.equal(fallback.width,900);
 const result={checked,findings,errors,functional:'pass',canvasFallback:fallback};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));assert.deepEqual(findings,[]);assert.deepEqual(errors,[]);
}finally{await browser.close();server.close();}
