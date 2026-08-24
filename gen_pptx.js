// サンリーノ港北センター北 フロア別販売図面（A4横 2スライド）
const pptxgen = require("pptxgenjs");

const C = { INK:"161B1A", SLATE:"4E5956", MUTE:"7C8783", SEAL:"AE2F26", SEALSOFT:"F7E4E1",
            PANEL:"F2F5F4", BAND:"E9EDEB", RULE:"C4CBC8", RULEFIRM:"8F9995", GO:"26603F", W:"FFFFFF" };
const FONT = "Meiryo";

// ── 版面（inch）A4横 11.69 x 8.27 ──
const M=0.276, SW=11.69, SH=8.27;
const BAND_Y=7.087, BAND_H=1.181;
const HEAD_Y=M, HEAD_H=0.827;
const BODY_Y=1.221;
const LX=0.276, LW=4.882, RX=5.355, RW=6.063;
const ZY=1.221, ZH=3.780, AY=5.158, AH=1.929;
const PY=1.221, PH=1.142, SY=2.442, SH_=1.024, RY=3.545, RH=2.441, FY=6.065, FH=1.024;

const DIS = "※査定賃料は当社の査定によるもので、実際の賃料改定は賃借人との個別協議によります。想定利回り（NOI）は満室想定の年間賃料（税別）から一定の経費を控除して算出しており、公租公課・管理費・修繕積立金等の実額により変動します。将来の収益を保証するものではありません。表面利回りは経費控除前の数値です。別途、管理費・修繕積立金・公租公課および取得時諸費用が必要です。価格・条件は予告なく変更される場合があり、最終条件は売買契約書によります。本物件は共同住宅を含む一棟の建物の一部（区分所有）です。管理規約上の用途制限、一部共用部分の負担区分等は別途資料にてご確認ください。";

const FLOORS = [
 { f:"1", kind:"店舗一括", zumen:"ph_zumen_1f.png", no:"SNK-1F-2608",
   price:"2億7,048", noi:"4.83", gross:"5.14", cnoi:"3.72", cgross:"3.96",
   area:"311.57㎡・94.25坪", tsubo:"287.0万円",
   cur:"981,904円", sat:"1,274,900円", diff:"+292,996円",
   cap:"賃貸状況　／　賃料は月額・税込",
   rows:[["101","美容院","136.40","444,400","554,400"],
         ["102","障がい者サービス","59.81","159,500","244,200"],
         ["103","理容室","46.40","159,104","191,400"],
         ["105","電気通信","68.96","218,900","284,900"]],
   tot:["合計","4区画","311.57","981,904","1,274,900"],
   pitch:[{text:"駅徒歩5分の1階路面4区画。",options:{color:C.INK}},
          {text:"現行賃料は当社査定水準を約30％下回っており、賃料の是正余地が残されています。",options:{color:C.SEAL,bold:true}}] },
 { f:"2", kind:"事務所一括", zumen:"ph_zumen_2f.png", no:"SNK-2F-2608",
   price:"3億3,941", noi:"5.15", gross:"5.48", cnoi:"3.90", cgross:"4.15",
   area:"432.06㎡・130.70坪", tsubo:"259.7万円",
   cur:"1,290,128円", sat:"1,703,900円", diff:"+413,772円",
   cap:"賃貸状況　／　賃料は月額・税込（201+202・205+206は2戸一）",
   rows:[["201+202","学習塾","132.00","386,148","521,400"],
         ["203","駐車場メンテ","70.95","235,400","280,500"],
         ["205+206","児童発達支援教室","122.80","328,900","484,000"],
         ["207","内科クリニック","106.31","339,680","418,000"]],
   tot:["合計","4区画","432.06","1,290,128","1,703,900"],
   pitch:[{text:"教育・医療・福祉で3区画。クリニック・児発は行政の指定を受ける業種で定着性が高く、",options:{color:C.INK}},
          {text:"現行賃料は査定水準を約32％下回っています。",options:{color:C.SEAL,bold:true}}] },
];

const pres = new pptxgen();
pres.defineLayout({ name:"A4L", width:SW, height:SH });
pres.layout = "A4L";

const box=(s,x,y,w,h,o={})=>s.addShape(pres.ShapeType.rect,
  {x,y,w,h,fill:{color:o.fill||C.W},line:{color:o.line||C.RULEFIRM,width:o.lw===undefined?1:o.lw}});
const txt=(s,t,x,y,w,h,o={})=>s.addText(t,Object.assign(
  {x,y,w,h,fontFace:FONT,color:C.INK,margin:0,valign:"top",fontSize:12},o));

FLOORS.forEach(F=>{
  const s = pres.addSlide();

  // ── ヘッダー ──
  txt(s,"収益不動産のご案内　／　フロア一括",M,HEAD_Y,7,0.17,{fontSize:10,color:C.SEAL,charSpacing:1.6});
  txt(s,[{text:"サンリーノ港北センター北　",options:{color:C.INK}},
         {text:F.f+"階",options:{color:C.SEAL}},
         {text:" "+F.kind+"（4区画）",options:{color:C.INK}}],
      M,HEAD_Y+0.19,10.5,0.36,{fontSize:20,bold:true});
  txt(s,[{text:"「センター北」駅 徒歩5分",options:{bold:true,color:C.INK}},
         {text:"／都筑区中川中央1-39-29／RC造 地上7階建の"+F.f+"階部分／1997年築（新耐震）・2026年改修済／全4区画賃貸中",options:{color:C.SLATE}}],
      M,HEAD_Y+0.56,11.14,0.22,{fontSize:12});
  s.addShape(pres.ShapeType.line,{x:M,y:HEAD_Y+HEAD_H,w:11.138,h:0,line:{color:C.INK,width:2.2}});

  // ── 左列：図面・案内図 ──
  s.addImage({path:F.zumen, x:LX, y:ZY, w:LW, h:ZH});
  s.addImage({path:"ph_annaizu.png", x:LX, y:AY, w:LW, h:AH});

  // ── 価格ヘッド ──
  const pw=[2.62,1.72,1.72], px=[RX,RX+2.62,RX+4.34];
  box(s,px[0],PY,pw[0],PH,{fill:C.SEALSOFT,line:C.INK,lw:1.2});
  box(s,px[1],PY,pw[1],PH,{line:C.INK,lw:1.2});
  box(s,px[2],PY,pw[2],PH,{line:C.INK,lw:1.2});
  txt(s,"販売価格（"+F.f+"階一括・税込）",px[0]+0.11,PY+0.11,2.4,0.19,{fontSize:12,color:C.SLATE});
  txt(s,[{text:F.price,options:{fontSize:26,bold:true,color:C.SEAL}},
         {text:" 万円",options:{fontSize:12,color:C.SLATE}}],px[0]+0.11,PY+0.34,2.4,0.42,{});
  txt(s,"4区画一括／オーナーチェンジ",px[0]+0.11,PY+0.82,2.4,0.2,{fontSize:12,color:C.SLATE});
  [["想定利回り",F.noi,F.gross,1],["現況利回り",F.cnoi,F.cgross,2]].forEach(([lab,v,g,i])=>{
    txt(s,lab,px[i]+0.11,PY+0.11,1.5,0.19,{fontSize:12,color:C.SLATE});
    txt(s,[{text:v,options:{fontSize:20,bold:true,color:C.INK}},{text:" ％",options:{fontSize:12,color:C.SLATE}}],
        px[i]+0.11,PY+0.36,1.5,0.36,{});
    txt(s,"表面 "+g+"％",px[i]+0.11,PY+0.82,1.5,0.2,{fontSize:12,color:C.SLATE});
  });

  // ── スペック ──
  box(s,RX,SY,RW,SH_);
  s.addShape(pres.ShapeType.line,{x:RX+RW/2,y:SY,w:0,h:SH_,line:{color:C.RULE,width:1}});
  const spec=[[["専有面積",F.area],["坪単価",F.tsubo],["区画数","4区画・全室賃貸中"]],
              [["現行賃料（月）",F.cur],["査定賃料（月）",F.sat],["差額",F.diff]]];
  spec.forEach((col,ci)=>col.forEach(([k,v],ri)=>{
    const bx=RX+ci*(RW/2)+0.11, by=SY+0.11+ri*0.28;
    txt(s,k,bx,by,1.5,0.24,{fontSize:12,color:C.SLATE});
    txt(s,v,bx,by,RW/2-0.22,0.24,{fontSize:13,align:"right",
        color:k==="差額"?C.GO:C.INK, bold:k==="差額"});
  }));

  // ── 賃貸状況 ──
  box(s,RX,RY,RW,RH);
  s.addShape(pres.ShapeType.rect,{x:RX,y:RY,w:RW,h:0.26,fill:{color:C.PANEL},line:{color:C.RULE,width:1}});
  txt(s,F.cap,RX+0.11,RY+0.05,RW-0.22,0.2,{fontSize:12,color:C.SLATE});
  const head=["号室","業種","面積㎡","現行賃料","査定賃料"];
  const AL=["left","left","right","right","right"];
  const cell=(t,i,o={})=>({text:String(t),options:Object.assign({fontSize:12,align:AL[i],fontFace:FONT,color:C.INK},o)});
  const body=[ head.map((h,i)=>cell(h,i,{bold:true,color:C.SLATE})) ]
    .concat(F.rows.map(r=>r.map((c,i)=>cell(c,i))))
    .concat([F.tot.map((c,i)=>cell(c,i,{bold:true,fill:{color:C.PANEL}}))]);
  s.addTable(body,{x:RX,y:RY+0.26,colW:[1.00,1.62,0.95,1.24,1.25],rowH:0.355,
    fontFace:FONT,fontSize:12,valign:"middle",margin:[2,7,2,7],
    border:[{type:"none"},{type:"none"},{pt:0.5,color:C.RULE},{type:"none"}]});

  // ── 訴求・免責 ──
  s.addShape(pres.ShapeType.rect,{x:RX,y:FY,w:0.04,h:0.45,fill:{color:C.SEAL},line:{width:0}});
  txt(s,F.pitch,RX+0.13,FY,RW-0.13,0.45,{fontSize:12,lineSpacing:17});
  txt(s,DIS,RX,FY+0.53,RW,0.45,{fontSize:5.5,color:C.MUTE,lineSpacing:8,wrap:true,shrinkText:false});

  // ── 下30mm 元付情報欄 ──
  s.addShape(pres.ShapeType.rect,{x:0,y:BAND_Y,w:SW,h:BAND_H,fill:{color:C.BAND},line:{width:0}});
  s.addShape(pres.ShapeType.line,{x:0,y:BAND_Y,w:SW,h:0,line:{color:C.RULEFIRM,width:1,dashType:"dash"}});
  txt(s,"✂ ── この線から下は元付情報欄です ──",M,BAND_Y-0.19,3.6,0.15,{fontSize:7,color:C.MUTE});
  txt(s,"売主",M,BAND_Y+0.16,2,0.18,{fontSize:12,color:C.SLATE,charSpacing:1.2});
  txt(s,"サンヨーホームズ株式会社",M,BAND_Y+0.37,3.4,0.28,{fontSize:15,bold:true});
  txt(s,[{text:"取引態様：",options:{color:C.SLATE}},{text:"売主",options:{bold:true,color:C.INK}}],
      M,BAND_Y+0.72,3.4,0.22,{fontSize:12});

  txt(s,"本件お問合せ先",3.9,BAND_Y+0.16,2.4,0.18,{fontSize:12,color:C.SLATE,charSpacing:1.2});
  txt(s,[{text:"担当　中山",options:{bold:true,color:C.INK}},
         {text:"　TEL 080-3724-6012",options:{color:C.SLATE}}],3.9,BAND_Y+0.40,4.5,0.24,{fontSize:12});
  txt(s,"takeshi_nakayama052@sanyohomes.co.jp",3.9,BAND_Y+0.72,4.5,0.22,{fontSize:12,color:C.SLATE});

  txt(s,"物件番号",8.9,BAND_Y+0.16,2.5,0.18,{fontSize:12,color:C.SLATE,charSpacing:1.2,align:"right"});
  txt(s,F.no,8.9,BAND_Y+0.37,2.5,0.28,{fontSize:15,bold:true,align:"right"});
});

pres.writeFile({fileName:"サンリーノ港北センター北_フロア別販売図面.pptx"})
  .then(f=>console.log("created:",f));
