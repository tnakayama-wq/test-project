// 販売図面の版面チェック（A4横・枠外/文字切れ/罫線重なり/文字サイズ）
// 使い方: node check_sheet.js sunrino_kohoku_floor_myosoku.html
const {chromium}=require('playwright');
const file=process.argv[2]||'sunrino_kohoku_floor_myosoku.html';
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const pg=await b.newPage({viewport:{width:1400,height:1000},deviceScaleFactor:2});
  await pg.goto('file://'+require('path').resolve(file));
  await pg.emulateMedia({media:'print'}); await pg.waitForTimeout(300);
  const out=await pg.evaluate(()=>{
    const mm=p=>(p*25.4/96).toFixed(1); const r=[]; let bad=0; const small=[];
    document.querySelectorAll('.sheet').forEach((sh,i)=>{
      const sr=sh.getBoundingClientRect(), hd=sh.querySelector('.head'), lc=sh.querySelector('.loc');
      if(hd&&lc){const hs=getComputedStyle(hd);
        const lt=hd.getBoundingClientRect().bottom-parseFloat(hs.borderBottomWidth)-parseFloat(hs.paddingBottom);
        if(lc.getBoundingClientRect().bottom>lt+0.5){bad++;r.push('S'+(i+1)+' loc罫線重なり');}}
      sh.querySelectorAll('*').forEach(el=>{
        const rc=el.getBoundingClientRect(); if(!rc.width||!rc.height) return;
        const c='.'+String(el.className).split(' ')[0], st=getComputedStyle(el);
        if(rc.top<sr.top-.5||rc.bottom>sr.bottom+.5||rc.right>sr.right+.5){bad++;r.push('S'+(i+1)+' '+c+' 枠外');}
        if(el.scrollHeight>el.clientHeight+1&&st.overflow!=='visible'){bad++;r.push('S'+(i+1)+' '+c+' 縦切れ '+mm(el.scrollHeight)+'>'+mm(el.clientHeight));}
        if(el.scrollWidth>el.clientWidth+1&&st.overflow!=='visible'){bad++;r.push('S'+(i+1)+' '+c+' 横切れ');}
        const fs=parseFloat(st.fontSize)*72/96;
        if([...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&fs<11.9&&!el.matches('.dis,.cut,.slot-empty *,.slot-tag'))
          small.push(c+' '+fs.toFixed(1)+'pt');
      });
    });
    return (bad?[...new Set(r)].join('\n'):'✓ 枠外・切れ・重なり なし')
      +'\n12pt未満の本文: '+([...new Set(small)].join(', ')||'なし');
  });
  console.log(out);
  const sh=await pg.$$('.sheet');
  for(let i=0;i<sh.length;i++) await sh[i].screenshot({path:'sheet'+(i+1)+'.png'});
  await b.close();
})();
