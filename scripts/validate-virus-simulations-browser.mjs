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
 const ctx=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
 async function open(id){await page.goto(url+'#'+id);await page.waitForSelector('#page-title',{state:'attached'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100);for(let i=0;i<10&&!await page.locator('#reading-body [data-simulation]').count();i++)await page.locator('#reading-next').click();await page.locator('#reading-body [data-simulation]').click();}
 const act=async action=>page.locator('#simulation-dialog [data-action="'+action+'"]').click();
 async function check(label){
  const issues=await page.evaluate(()=>{const d=document.querySelector('#simulation-dialog');return [...d.querySelectorAll('*'),d].filter(e=>e instanceof HTMLElement&&e.getBoundingClientRect().width&&e.getBoundingClientRect().height).flatMap(e=>{const r=e.getBoundingClientRect(),problems=[];if(e.scrollHeight>e.clientHeight+3||e.scrollWidth>e.clientWidth+3)problems.push('overflow');if(r.left<0||r.right>innerWidth+1||r.top<0||r.bottom>innerHeight+1)problems.push('outside viewport');return problems.length?[{tag:e.tagName,cls:e.className,text:e.textContent.slice(0,80),problems,client:[e.clientWidth,e.clientHeight],scroll:[e.scrollWidth,e.scrollHeight]}]:[];});});
  if(issues.length)findings.push({label,issues});checked++;
 }
 async function notes(){await page.locator('[data-view="notes"]').click();let i=0;do{await check('model notes '+i++);if(!await page.locator('[data-note="1"]').isEnabled())break;await page.locator('[data-note="1"]').click();}while(i<8);await page.locator('[data-view="explore"]').click();}
 for(const size of [{width:1440,height:900},{width:1280,height:720},{width:390,height:844},{width:375,height:667},{width:320,height:568},{width:844,height:390},{width:568,height:320},{width:667,height:375}]){
  await page.setViewportSize(size);await open('lambda-lab');await act('reset');await check(`${size.width} attached`);
  for(const action of ['enter','lytic','assemble','lyse']){await act(action);if(action==='enter')assert.equal(await page.locator('[data-action="lytic"]').evaluate(e=>e===document.activeElement),true,'focus follows the next action');await check(`${size.width} lytic ${action}`);}
  await act('reset');await act('enter');await act('integrate');await check(`${size.width} integrated`);
  for(let i=1;i<=3;i++){await act('divide');await check(`${size.width} divided ${i}`);}assert.equal(await page.locator('[data-action="divide"]').isEnabled(),false);
  if(size.width===1440)await page.screenshot({path:path.join(out,'lambda-desktop.png')});
  for(const action of ['induce','copy','assemble','lyse']){await act(action);await check(`${size.width} induced ${action}`);}
  if(await page.locator('[data-action="pane"]').isVisible()){await act('pane');await check(`${size.width} diagram view`);await act('pane');}
  await notes();await act('close');
  await open('segment-lab');await act('reset');await check(`${size.width} A only`);assert.equal(await page.locator('[data-segment="0"]').isEnabled(),false);
  await act('coinfect');for(let i=0;i<8;i++){await page.locator('[data-segment="'+i+'"]').click();await check(`${size.width} segment ${i}`);}assert.match(await page.locator('.sim-result').innerText(),/All segments from B/);
  for(const i of [0,2,4,6])await page.locator('[data-segment="'+i+'"]').click();await check(`${size.width} mixed`);await page.screenshot({path:path.join(out,`segments-${size.width}.png`)});if(await page.locator('[data-action="pane"]').isVisible()){await act('pane');await check(`${size.width} segments diagram view`);await act('pane');}await notes();await act('single');assert.equal(await page.locator('[data-segment="0"]').isEnabled(),false);await check(`${size.width} single resets mixing`);await act('close');
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({checked,findings,errors},null,2));
  console.log(`Simulation controls and notes checked at ${size.width}×${size.height}`);
 }
 // The same state survives resize, reload, backup import and static export.
 await page.setViewportSize({width:1280,height:720});await open('segment-lab');await act('coinfect');await page.locator('[data-segment="2"]').click();await act('close');await page.getByLabel('Written answer',{exact:true}).fill('My prediction before exploring.');await page.locator('#reading-body [data-simulation]').click();await act('record');await act('record');await check('saved notice');await page.waitForTimeout(300);
 let state=await page.evaluate(()=>JSON.parse(localStorage.getItem('ita:viruses-hl:v1')));assert.equal(state.simulations.reassortment.mask,4);assert.ok(state.answers['segment-lab'].text.startsWith('My prediction before exploring.'));assert.equal(state.answers['segment-lab'].text.match(/Model observation/g).length,1);
 await page.setViewportSize({width:320,height:568});await page.waitForTimeout(100);assert.match(await page.locator('.sim-result').innerText(),/7 A \+ 1 B/);await check('same state after resize');await act('close');await page.reload();await page.waitForSelector('#page-title',{state:'attached'});await open('segment-lab');assert.match(await page.locator('.sim-result').innerText(),/7 A \+ 1 B/);await act('reset');await act('close');await page.waitForTimeout(300);state=await page.evaluate(()=>JSON.parse(localStorage.getItem('ita:viruses-hl:v1')));assert.ok(state.answers['segment-lab'].text.includes('3B'));
 await page.setViewportSize({width:1280,height:720});await open('lambda-lab');await act('reset');for(const action of ['enter','integrate','divide','induce','copy'])await act(action);await act('record');await act('close');await page.getByRole('button',{name:'Export',exact:false}).first().click();
 let promise=page.waitForEvent('download');await page.getByRole('button',{name:'Download editable backup',exact:true}).click();let dl=await promise;await dl.saveAs(path.join(out,'backup.json'));const backup=JSON.parse(fs.readFileSync(path.join(out,'backup.json'),'utf8'));assert.equal(backup.simulations.lambda.stage,'synthesis');
 promise=page.waitForEvent('download');await page.getByRole('button',{name:'Download submission',exact:true}).click();dl=await promise;await dl.saveAs(path.join(out,'submission.html'));const html=fs.readFileSync(path.join(out,'submission.html'),'utf8');assert.ok(html.includes('My prediction before exploring.'));assert.ok(html.includes('Host divisions followed: 1'));assert.ok(!html.includes('data-simulation'));assert.ok(!html.includes('<script'));
 await page.getByRole('button',{name:'Close dialog',exact:true}).click();await page.locator('#reading-body [data-simulation]').click();await act('reset');await act('close');await page.getByRole('button',{name:'Export',exact:false}).first().click();page.once('dialog',d=>d.accept());await page.locator('#backup-file').setInputFiles(path.join(out,'backup.json'));await page.waitForTimeout(300);state=await page.evaluate(()=>JSON.parse(localStorage.getItem('ita:viruses-hl:v1')));assert.deepEqual(state.simulations,backup.simulations);
 await open('lambda-lab');assert.match(await page.locator('.sim-explanation').innerText(),/Genome and protein synthesis/);await page.locator('[data-view="explore"]').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('[data-view="notes"]').getAttribute('aria-selected'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('#simulation-dialog').isVisible(),false);
 const offline=await ctx.newPage();await offline.goto('file://'+path.join(out,'submission.html'));assert.match(await offline.locator('body').innerText(),/Model observation/);await offline.pdf({path:path.join(out,'submission.pdf'),preferCSSPageSize:true,printBackground:true});await offline.close();
 // Saving problems must be visible inside the modal, and another tab must not be overwritten.
 await page.setViewportSize({width:320,height:568});await open('lambda-lab');
 await page.evaluate(()=>{window.restoreQaStorage=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new DOMException('Test quota','QuotaExceededError');};});
 await act('reset');await page.waitForTimeout(300);assert.match(await page.locator('.sim-notice').innerText(),/Save unavailable/);await check('storage quota failure at 320');
 await page.evaluate(()=>{Storage.prototype.setItem=window.restoreQaStorage;delete window.restoreQaStorage;});await act('enter');await page.waitForTimeout(300);assert.match(await page.locator('.sim-notice').innerText(),/Saved on this device/);
 await ctx.setOffline(true);await act('lytic');assert.match(await page.locator('.sim-explanation').innerText(),/Genome and protein synthesis/);await ctx.setOffline(false);await page.waitForTimeout(300);
 const other=await ctx.newPage();await other.goto(url+'#start');await other.waitForTimeout(400);await page.waitForFunction(()=>document.querySelector('.sim-notice').textContent.includes('Changed in another tab'));
 const otherSaved=await other.evaluate(()=>localStorage.getItem('ita:viruses-hl:v1'));await act('assemble');await page.waitForTimeout(300);assert.equal(await other.evaluate(()=>localStorage.getItem('ita:viruses-hl:v1')),otherSaved);assert.match(await page.locator('.sim-notice').innerText(),/Autosave paused/);await check('cross-tab conflict at 320');await other.close();await page.reload();
 const touchContext=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const touch=await touchContext.newPage();await touch.goto(url+'#segment-lab');await touch.waitForSelector('#reading-body [data-simulation]');await touch.locator('#reading-body [data-simulation]').tap();await touch.locator('[data-action="coinfect"]').tap();await touch.locator('[data-segment="0"]').tap();assert.match(await touch.locator('.sim-result').innerText(),/7 A \+ 1 B/);await touch.close();
 await page.setViewportSize({width:1280,height:720});
 // Inspect each updated schematic in the actual reader.
 for(const id of ['host','envelope','three-viruses','entry','lytic','lysogenic','hiv','reassortment']){await page.goto(url+'#'+id);await page.waitForSelector('.science-figure svg');await page.screenshot({path:path.join(out,`diagram-${id}.png`)});const outside=await page.locator('.science-figure svg').evaluate(svg=>{const v=svg.viewBox.baseVal;return [...svg.querySelectorAll('text')].filter(t=>{const r=t.getBBox();return r.x<0||r.y<0||r.x+r.width>v.width+1||r.y+r.height>v.height+1;}).map(t=>t.textContent);});assert.deepEqual(outside,[],`labels fit ${id}`);}
 const result={checked,findings,errors,functional:'pass'};fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));assert.deepEqual(findings,[]);assert.deepEqual(errors,[]);
}finally{await browser.close();server.close();}
