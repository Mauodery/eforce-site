import { chromium } from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--ignore-certificate-errors']});
const p=await b.newPage({viewport:{width:1440,height:900},ignoreHTTPSErrors:true});
await p.goto(`http://127.0.0.1:5178/pt/kits/${process.argv[2]}`,{waitUntil:'networkidle'});
await p.waitForTimeout(2000);
await p.evaluate(()=>[...document.querySelectorAll('button')].filter(e=>/Aceitar/i.test(e.textContent)).forEach(e=>e.click()));
for(let s=0;s<2200;s+=300){await p.evaluate(v=>window.scrollTo(0,v),s);await p.waitForTimeout(70);}
await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(900);
const m=await p.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return{x:Math.round(r.x+scrollX),y:Math.round(r.y+scrollY),w:Math.round(r.width),h:Math.round(r.height),nat:[e.naturalWidth,e.naturalHeight]};};
 const hero=document.querySelector('img[fetchpriority="high"]');
 const spec=[...document.querySelectorAll('img')].find(i=>/ssb-nobg|principal-nobg|aerial/.test(i.getAttribute('src')||'')&&i!==hero);
 return {hero:hero?{src:hero.getAttribute('src').split('/').pop(),...R(hero)}:null,
         spec:spec?{src:spec.getAttribute('src').split('/').pop(),...R(spec)}:null};});
console.log(JSON.stringify(m,null,1));
// recorta cada bateria para medir o conteudo visivel
for (const [k,o] of Object.entries(m)) { if(!o) continue;
  await p.evaluate(v=>window.scrollTo(0,v), Math.max(0,o.y-50));
  await p.waitForTimeout(600);
  const sy=await p.evaluate(()=>Math.round(window.scrollY));
  await p.screenshot({path:`/tmp/shots/cmp-${k}.png`, clip:{x:o.x,y:o.y-sy,width:o.w,height:Math.min(o.h,880)}});
}
await b.close();
