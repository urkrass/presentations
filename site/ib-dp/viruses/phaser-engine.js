import Phaser from 'phaser';
import {W,H} from './dynamics.js';
// Canvas textures depict scientific structures consistently at every scale.
// No remote images, fonts, sounds, or game services are loaded by the scene.
function textures(scene){
 const make=(key,w,h,draw)=>{const t=scene.textures.createCanvas(key,w,h);draw(t.context,w,h);t.refresh();};
 make('cell',256,144,(c,w,h)=>{
  const fill=c.createLinearGradient(0,15,0,h-15);fill.addColorStop(0,'#edf7f4');fill.addColorStop(.35,'#b9d3cc');fill.addColorStop(.72,'#82aaa1');fill.addColorStop(1,'#527a72');c.shadowColor='#27463a44';c.shadowBlur=12;c.shadowOffsetY=5;c.beginPath();c.roundRect(9,11,w-18,h-28,58);c.fillStyle=fill;c.fill();c.shadowBlur=0;c.shadowOffsetY=0;c.strokeStyle='#466a61';c.lineWidth=4;c.stroke();c.beginPath();c.roundRect(18,20,w-36,h-46,48);c.strokeStyle='#ffffffaa';c.lineWidth=3;c.stroke();
  for(let i=0;i<37;i++){const x=31+(i*67%192),y=35+(i*29%63);c.fillStyle=i%2?'#4f7a6666':'#e0efe777';c.beginPath();c.arc(x,y,2.5,0,Math.PI*2);c.fill();}
  c.strokeStyle='#3a6257';c.lineWidth=3;c.beginPath();c.ellipse(128,68,57,20,-.12,0,Math.PI*2);c.stroke();
 });
 make('phage',96,152,c=>{c.translate(48,36);c.shadowColor='#48324722';c.shadowBlur=6;c.beginPath();c.moveTo(0,-27);c.lineTo(23,-14);c.lineTo(23,14);c.lineTo(0,27);c.lineTo(-23,14);c.lineTo(-23,-14);c.closePath();const g=c.createLinearGradient(-23,-22,23,27);g.addColorStop(0,'#fbd6e6');g.addColorStop(.5,'#ce75a1');g.addColorStop(1,'#7e315a');c.fillStyle=g;c.fill();c.shadowBlur=0;c.strokeStyle='#693d57';c.lineWidth=2;c.stroke();c.beginPath();c.moveTo(0,-27);c.lineTo(-13,-2);c.lineTo(0,27);c.lineTo(13,-2);c.closePath();c.moveTo(-23,-14);c.lineTo(23,14);c.strokeStyle='#ffffff99';c.lineWidth=1;c.stroke();c.beginPath();c.moveTo(0,27);c.lineTo(0,65);c.quadraticCurveTo(-1,92,20,93);c.strokeStyle='#563b4a';c.lineWidth=4;c.stroke();});
 for(const [key,color,highlight] of [['segmentA','#c4085e','#ffbad9'],['segmentB','#24669b','#c4e7ff']])make(key,144,48,c=>{c.strokeStyle=highlight;c.lineWidth=15;c.lineCap='round';c.beginPath();c.moveTo(16,24);c.bezierCurveTo(42,2,99,46,129,20);c.stroke();c.strokeStyle=color;c.lineWidth=6;c.stroke();for(let i=0;i<7;i++){c.fillStyle=i%2?color:highlight;c.beginPath();c.arc(20+i*17,24+Math.sin(i*1.1)*7,5,0,Math.PI*2);c.fill();}});
 make('virion',128,128,c=>{c.translate(64,64);for(let i=0;i<12;i++){const a=i*Math.PI/6;c.strokeStyle='#6b777f';c.lineWidth=3;c.beginPath();c.moveTo(Math.cos(a)*39,Math.sin(a)*39);c.lineTo(Math.cos(a)*51,Math.sin(a)*51);c.stroke();c.fillStyle='#9aa8b0';c.beginPath();c.arc(Math.cos(a)*51,Math.sin(a)*51,4,0,Math.PI*2);c.fill();}const g=c.createRadialGradient(-12,-14,2,0,0,43);g.addColorStop(0,'#ffffff');g.addColorStop(.7,'#d4dce1');g.addColorStop(1,'#83929c');c.fillStyle=g;c.beginPath();c.arc(0,0,41,0,Math.PI*2);c.fill();c.strokeStyle='#657680';c.lineWidth=2;c.stroke();});
}
export function createEngine(host,{getWorld,onFrame,onInspect,onReady,onError,forceCanvas=false}){
 let game,sceneRef,disposed=false,lastWorld;const sprites=new Map();let resize;
 const clear=()=>{for(const sprite of sprites.values())sprite.destroy();sprites.clear();};
 const sprite=(scene,key,texture,x,y,width,height)=>{let obj=sprites.get(key);if(!obj){obj=scene.add.image(x,y,texture);sprites.set(key,obj);obj.setInteractive({useHandCursor:true});obj.on('pointerdown',()=>onInspect(key));}obj.setPosition(x,y).setDisplaySize(width,height).setVisible(true);return obj;};
 class CultureScene extends Phaser.Scene{
  create(){sceneRef=this;textures(this);this.floor=this.add.graphics();this.detail=this.add.graphics();this.effects=this.add.graphics();this.floor.setDepth(-2);this.detail.setDepth(3);this.effects.setDepth(4);resize=()=>{if(disposed)return;const r=host.getBoundingClientRect();if(r.width<2||r.height<2)return;game.scale.resize(Math.round(r.width),Math.round(r.height));this.cameras.main.setZoom(Math.min(r.width/W,r.height/H)).centerOn(W/2,H/2);};observer.observe(host);resize();game.canvas.setAttribute('role','img');game.canvas.setAttribute('aria-label','Live biological particle simulation. Counts, controls and explanations are provided alongside the canvas.');game.canvas.addEventListener('webglcontextlost',lost);onReady?.(game.renderer.type===Phaser.WEBGL?'WebGL':'Canvas');}
  update(time,delta){if(disposed)return;const w=getWorld();onFrame(delta);if(lastWorld!==w){clear();lastWorld=w;}this.drawWorld(w);}
  drawWorld(w){
   const seen=new Set(),g=this.floor,d=this.detail,fx=this.effects;g.clear();d.clear();fx.clear();
   g.fillStyle(0xf1f5f5,1).fillRoundedRect(8,8,884,524,22);g.lineStyle(1,0xd5dfdf,1).strokeRoundedRect(8,8,884,524,22);
   for(let x=28;x<W;x+=40)for(let y=28;y<H;y+=40)g.fillStyle(0x496860,.07).fillCircle(x,y,1);
   if(w.name==='lambda'){
    for(const c of w.cells){const key='cell:'+c.id;seen.add(key);const obj=sprite(this,key,'cell',c.x,c.y,100,57);obj.setRotation(c.angle);if(['infected','assembly','entry'].includes(c.status))obj.setTint(c.status==='assembly'?0xf6a8ce:0xf2c0d9);else obj.clearTint();
     if(c.status==='lysogen'){d.lineStyle(4,0xc4085e,1);d.beginPath();d.arc(c.x+2,c.y-1,15,-.7,.7,false);d.strokePath();}
     if(c.status==='infected'){for(let i=0;i<3;i++){const a=w.tick/25+i*2;d.fillStyle(0xc4085e,.9).fillCircle(c.x+Math.cos(a)*23,c.y+Math.sin(a)*9,2.5);}}
     if(c.status==='assembly')for(let i=0;i<4;i++){const k='inside:'+c.id+':'+i;seen.add(k);sprite(this,k,'phage',c.x-27+i*18,c.y,11,23).setRotation(-.3);}
     if(c.status==='entry')d.lineStyle(3,0xc4085e,.8).lineBetween(c.x-45,c.y,c.x-10+Math.min(25,c.age*17),c.y);
    }
    for(const p of w.phages){const key='phage:'+p.id;seen.add(key);sprite(this,key,'phage',p.x,p.y,22,35).setRotation(p.angle-Math.PI/2);}
   }else{
    g.fillStyle(0xd7e7e3,.8).fillEllipse(360,270,566,466);g.lineStyle(5,0x9aafa8,1).strokeEllipse(360,270,566,466);g.lineStyle(2,0xfaffff,1).strokeEllipse(360,270,552,452);
    for(const p of w.segments){const key='rna:'+p.id;seen.add(key);sprite(this,key,p.source==='A'?'segmentA':'segmentB',p.x,p.y,33+p.type*2.2,13).setRotation(p.angle);}
    for(const [i,s] of w.stations.entries()){d.fillStyle(0xffffff,.9).fillCircle(s.x,s.y,36);d.lineStyle(2,0x84978f,.9).strokeCircle(s.x,s.y,36);for(let n=0;n<8;n++){const a=n*Math.PI/4,x=s.x+Math.cos(a)*23,y=s.y+Math.sin(a)*23;d.fillStyle(s.slots[n]==='A'?0xc4085e:s.slots[n]==='B'?0x24669b:0xcbd6d0,1).fillRoundedRect(x-3,y-7,6,14,3);}
     const p=w.segments.find(p=>p.id===s.collecting);if(p){d.lineStyle(1,p.source==='A'?0xc4085e:0x24669b,.35).lineBetween(p.x,p.y,s.x,s.y);}}
    for(const p of w.offspring){const key='virion:'+p.id;seen.add(key);sprite(this,key,'virion',p.x,p.y,54,54);for(let n=0;n<8;n++){const x=p.x-10+(n%4)*7,y=p.y-5+Math.floor(n/4)*10;d.fillStyle(p.sources[n]==='A'?0xc4085e:0x24669b,1).fillRoundedRect(x-1,y-3,3,7,1);}}
   }
   for(const e of w.effects){const a=Math.min(1,e.life),radius=(2-e.life)*32;fx.lineStyle(e.kind==='lysis'?4:2,e.kind==='lysis'?0xc4085e:0x537f71,a*.55).strokeCircle(e.x,e.y,Math.max(6,radius));if(e.kind==='lysis')for(let i=0;i<9;i++){const angle=i*Math.PI*2/9;fx.fillStyle(0x74998e,a*.7).fillEllipse(e.x+Math.cos(angle)*radius,e.y+Math.sin(angle)*radius,9,4);}}
   for(const [key,obj]of sprites)if(!seen.has(key)){obj.destroy();sprites.delete(key);}
  }
 }
 const observer=new ResizeObserver(()=>resize?.());
 const lost=e=>{e.preventDefault();onError?.('The graphics context was interrupted. Your run is saved; close and reopen the simulation to continue.');};
 try{game=new Phaser.Game({type:forceCanvas?Phaser.CANVAS:Phaser.AUTO,parent:host,width:Math.max(1,host.clientWidth),height:Math.max(1,host.clientHeight),backgroundColor:'#f1f5f5',transparent:false,banner:false,audio:{noAudio:true},render:{antialias:true,roundPixels:false},fps:{target:60},input:{keyboard:false,mouse:{preventDefaultWheel:false},touch:{capture:false}},scale:{mode:Phaser.Scale.NONE},scene:CultureScene});}catch(error){observer.disconnect();onError?.('The game renderer could not start. Your written answers are safe.');throw error;}
 return {destroy(){disposed=true;observer.disconnect();game?.canvas?.removeEventListener('webglcontextlost',lost);game?.destroy(true);},resize(){resize?.();},get renderer(){return game?.renderer?.type===Phaser.WEBGL?'WebGL':'Canvas';}};
}
