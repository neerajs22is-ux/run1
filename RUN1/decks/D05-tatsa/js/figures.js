/* ═══════════ Tatsa cartoon cast — pure SVG generator ═══════════
   Two recurring casts, always drawn the same way (consistency > the joke).
   window.TatsaFig.comic(castKey, panelIndex) → SVG markup for one 300×300 panel */
(function(){
"use strict";
var INK="#2a140b";

/* ── character sheet ── */
var CAST={
  arun :{skin:"#d9a273",shirt:"#3b6a8f",hair:"#1f130d",style:"short",acc:["glasses","lanyard"]},
  meera:{skin:"#c98d5d",shirt:"#d6401f",hair:"#1f130d",style:"bun",acc:["bindi"]},
  kiran:{skin:"#e0b087",shirt:"#4f7a3d",hair:"#2c1a10",style:"short",acc:["beard"]},
  dad  :{skin:"#cf9565",shirt:"#8a5a2b",hair:"#1f130d",style:"short",acc:["glasses","mustache"]},
  mom  :{skin:"#d6a070",shirt:"#b8325d",hair:"#1f130d",style:"long",acc:["bindi"]},
  kid  :{skin:"#e0b087",shirt:"#f0a81c",hair:"#1f130d",style:"tuft",acc:[]},
  nana :{skin:"#c98d5d",shirt:"#e9dcc0",hair:"#f2efe6",style:"nana",acc:["glasses","mustache","stick"]}
};

function face(mood,c){
  var eyes,brows="",mouth,extra="";
  if(mood==="happy"||mood==="eat"){
    eyes='<path d="M-15 -3q5 -6 10 0M5 -3q5 -6 10 0" fill="none" stroke="'+INK+'" stroke-width="2.6" stroke-linecap="round"/>';
    mouth=mood==="eat"
      ?'<path d="M-9 8q9 14 18 0z" fill="#6b1d10"/><path d="M-5 12q5 3 10 0" stroke="#f0a81c" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      :'<path d="M-10 8q10 12 20 0" fill="none" stroke="'+INK+'" stroke-width="2.6" stroke-linecap="round"/>';
    extra='<circle cx="-19" cy="6" r="4.5" fill="#e0603a" opacity=".35"/><circle cx="19" cy="6" r="4.5" fill="#e0603a" opacity=".35"/>';
  }else{
    eyes='<circle cx="-10" cy="-3" r="2.8" fill="'+INK+'"/><circle cx="10" cy="-3" r="2.8" fill="'+INK+'"/>';
    if(mood==="argue"){
      brows='<path d="M-17 -14L-4 -9M17 -14L4 -9" stroke="'+INK+'" stroke-width="2.8" stroke-linecap="round"/>';
      mouth='<ellipse cx="0" cy="12" rx="7" ry="6" fill="#6b1d10"/>';
    }else if(mood==="surprise"){
      brows='<path d="M-16 -13q6 -5 11 -1M5 -14q6 -4 11 1" fill="none" stroke="'+INK+'" stroke-width="2.6" stroke-linecap="round"/>';
      mouth='<circle cx="0" cy="12" r="5" fill="#6b1d10"/>';
      eyes='<circle cx="-10" cy="-3" r="3.6" fill="'+INK+'"/><circle cx="10" cy="-3" r="3.6" fill="'+INK+'"/>';
    }else if(mood==="stern"){
      brows='<path d="M-17 -10L-4 -12M17 -10L4 -12" stroke="'+INK+'" stroke-width="3" stroke-linecap="round"/>';
      mouth='<path d="M-8 13q8 -5 16 0" fill="none" stroke="'+INK+'" stroke-width="2.6" stroke-linecap="round"/>';
    }else{ /* flat */
      mouth='<path d="M-7 12h14" stroke="'+INK+'" stroke-width="2.6" stroke-linecap="round"/>';
    }
  }
  return eyes+brows+mouth+extra;
}

function hairBack(c){
  if(c.style==="long") return '<path d="M-33 0Q-36 -40 0 -38Q36 -40 33 0V58Q0 66 -33 58Z" fill="'+c.hair+'"/>';
  return "";
}
function hairFront(c){
  var h=c.hair;
  if(c.style==="short") return '<path d="M-30 -4Q-34 -38 0 -36Q34 -38 30 -4Q22 -20 0 -19Q-22 -20 -30 -4Z" fill="'+h+'"/>';
  if(c.style==="bun")   return '<circle cx="0" cy="-40" r="12" fill="'+h+'"/><path d="M-30 -4Q-34 -36 0 -35Q34 -36 30 -4Q20 -20 0 -19Q-20 -20 -30 -4Z" fill="'+h+'"/>';
  if(c.style==="long")  return '<path d="M-30 -2Q-34 -38 0 -36Q34 -38 30 -2Q18 -20 -2 -19Q-20 -19 -30 -2Z" fill="'+h+'"/>';
  if(c.style==="tuft")  return '<path d="M-28 -6Q-30 -34 0 -33Q30 -34 28 -6Q16 -20 0 -19Q-16 -20 -28 -6Z" fill="'+h+'"/><path d="M-4 -33Q-2 -46 8 -44Q2 -40 4 -33Z" fill="'+h+'"/>';
  if(c.style==="nana")  return '<circle cx="-29" cy="-2" r="9" fill="'+h+'"/><circle cx="29" cy="-2" r="9" fill="'+h+'"/><path d="M-18 -26Q0 -34 18 -26" stroke="'+h+'" stroke-width="5" fill="none" stroke-linecap="round"/>';
  return "";
}
function accs(c){
  var s="";
  c.acc.forEach(function(a){
    if(a==="glasses") s+='<g fill="none" stroke="'+INK+'" stroke-width="2.4"><circle cx="-10" cy="-3" r="9"/><circle cx="10" cy="-3" r="9"/><path d="M-1 -3h2"/></g>';
    if(a==="mustache") s+='<path d="M-11 7q5 -6 11 -1q6 -5 11 1q-5 7 -11 3q-6 4 -11 -3z" fill="'+(c.style==="nana"?"#e8e4da":c.hair)+'" stroke="'+(c.style==="nana"?"#b9b3a2":"none")+'" stroke-width="1"/>';
    if(a==="beard") s+='<path d="M-27 2Q-26 36 0 36Q26 36 27 2Q19 22 0 22Q-19 22 -27 2Z" fill="'+c.hair+'"/>';
    if(a==="bindi") s+='<circle cx="0" cy="-15" r="3" fill="#d6401f"/>';
  });
  return s;
}
function lanyard(c){
  if(c.acc.indexOf("lanyard")<0) return "";
  return '<path d="M-12 34L0 66L12 34" fill="none" stroke="#d6401f" stroke-width="3"/><rect x="-9" y="64" width="18" height="22" rx="3" fill="#fbf0d9" stroke="'+INK+'" stroke-width="1.5"/><rect x="-5" y="69" width="10" height="3" fill="#d6401f"/>';
}

/* one figure; (x,y) = head centre */
function fig(name,x,y,s,mood,flip){
  var c=CAST[name];
  var raised=(mood==="argue"||mood==="surprise");
  var g='<g transform="translate('+x+' '+y+') scale('+(flip?-s:s)+' '+s+')">';
  g+=hairBack(c);
  if(raised) g+='<path d="M24 56L46 20" stroke="'+c.shirt+'" stroke-width="17" stroke-linecap="round"/><circle cx="47" cy="14" r="9" fill="'+c.skin+'"/>';
  g+='<path d="M-32 120V66Q-32 34 0 34Q32 34 32 66V120Z" fill="'+c.shirt+'"/>';
  g+='<rect x="-8" y="22" width="16" height="16" rx="6" fill="'+c.skin+'"/>';
  g+=lanyard(c);
  g+='<circle cx="-29" cy="-1" r="6" fill="'+c.skin+'"/><circle cx="29" cy="-1" r="6" fill="'+c.skin+'"/>';
  g+='<circle cx="0" cy="0" r="30" fill="'+c.skin+'"/>';
  g+=hairFront(c)+face(mood,c)+accs(c);
  if(c.acc.indexOf("stick")>-1) g+='<path d="M-44 70V124" stroke="#6b3a1c" stroke-width="5" stroke-linecap="round"/><path d="M-44 70q0 -9 8 -9" fill="none" stroke="#6b3a1c" stroke-width="5" stroke-linecap="round"/>';
  return g+"</g>";
}

/* speech bubble: lines[], centre x, top y, tail pointing at tx */
function bubble(cx,y,lines,tx,tone){
  var w=0;lines.forEach(function(l){w=Math.max(w,l.length)});
  w=w*7.4+22;var h=lines.length*18+14,x=cx-w/2;
  if(x<6)x=6; if(x+w>294)x=294-w;
  var fill=tone==="chilli"?"#d6401f":"#fffaf0",col=tone==="chilli"?"#fff8ea":INK;
  var t=Math.max(x+14,Math.min(x+w-14,tx));
  var s='<g class="bub"><path d="M'+(x+10)+' '+y+'H'+(x+w-10)+'Q'+(x+w)+' '+y+' '+(x+w)+' '+(y+10)+'V'+(y+h-10)+'Q'+(x+w)+' '+(y+h)+' '+(x+w-10)+' '+(y+h)+'H'+(t+8)+'L'+tx+' '+(y+h+16)+'L'+(t-8)+' '+(y+h)+'H'+(x+10)+'Q'+x+' '+(y+h)+' '+x+' '+(y+h-10)+'V'+(y+10)+'Q'+x+' '+y+' '+(x+10)+' '+y+'Z" fill="'+fill+'" stroke="'+INK+'" stroke-width="2"/>';
  lines.forEach(function(l,i){
    s+='<text x="'+(x+w/2)+'" y="'+(y+21+i*18)+'" text-anchor="middle" font-family="Figtree,sans-serif" font-weight="700" font-size="13.5" fill="'+col+'">'+l+'</text>';
  });
  return s+"</g>";
}

/* table with dishes + steam */
function table(){
  var s='<rect x="0" y="196" width="300" height="104" fill="#8c3a1c"/><rect x="0" y="196" width="300" height="9" fill="#a8502a"/>';
  s+='<path d="M0 205H300" stroke="#fbf0d9" stroke-width="2" stroke-dasharray="7 7" opacity=".5"/>';
  var dishes=[[60,238,"#f0a81c"],[150,246,"#d6401f"],[240,238,"#a5c985"]];
  dishes.forEach(function(d,i){
    s+='<ellipse cx="'+d[0]+'" cy="'+(d[1]+8)+'" rx="38" ry="11" fill="#2a140b" opacity=".25"/>';
    s+='<ellipse cx="'+d[0]+'" cy="'+d[1]+'" rx="36" ry="12" fill="#fbf0d9" stroke="#2a140b" stroke-width="2"/>';
    s+='<ellipse cx="'+d[0]+'" cy="'+(d[1]-3)+'" rx="24" ry="8" fill="'+d[2]+'"/>';
    s+='<path d="M'+(d[0]-8)+' '+(d[1]-14)+'q4 -10 0 -18" class="stm" style="animation-delay:'+(i*.5)+'s" fill="none" stroke="#fffaf0" stroke-width="3" stroke-linecap="round"/>';
    s+='<path d="M'+(d[0]+8)+' '+(d[1]-14)+'q-4 -10 0 -18" class="stm" style="animation-delay:'+(i*.5+.9)+'s" fill="none" stroke="#fffaf0" stroke-width="3" stroke-linecap="round"/>';
  });
  return s;
}

/* ── the stories (3 panels · one joke · one Tatsa tie-in) ── */
var STORIES={
  office:{
    title:"The office gang", who:"Arun · Meera · Kiran",
    caption:"Same table, 40 minutes later. Tag the colleague who never decides.",
    panels:[
      {cap:"12:47 pm",bg:"#f6d9a0",bubbles:[[84,10,["Where do","we eat?"],64],[218,52,["Anything but","pizza. Again."],232]],
       chars:[["arun",62,128,.86,"argue"],["meera",236,128,.86,"argue",true],["kiran",150,138,.82,"flat"]]},
      {cap:"12:51 pm",bg:"#fbe3b4",bubbles:[[150,8,["…Tatsa?"],150,"chilli"],[62,70,["Done."],62],[240,70,["Finally."],240]],
       chars:[["kiran",150,138,.9,"surprise"],["arun",56,142,.78,"happy"],["meera",244,142,.78,"happy",true]]},
      {cap:"1:05 pm",bg:"#f2cf94",table:true,bubbles:[[84,8,["Same time","tomorrow?"],64],[222,8,["Lunch,","decided."],232,"chilli"]],
       chars:[["arun",62,132,.84,"eat"],["kiran",150,140,.8,"eat"],["meera",238,132,.84,"eat",true]]}
    ]
  },
  family:{
    title:"The family table", who:"Dad · Mom · Chhotu · Nana",
    caption:"Nana has opinions. Tatsa has dinner. Tag your family WhatsApp group.",
    panels:[
      {cap:"7:30 pm",bg:"#e9c9a4",bubbles:[[82,8,["Dinner","plans?"],62],[220,50,["“Anything","is fine.”"],232]],
       chars:[["mom",66,132,.82,"argue"],["dad",236,132,.82,"flat",true],["kid",150,172,.6,"flat"]]},
      {cap:"7:34 pm",bg:"#f4d6a8",bubbles:[[218,8,["Tatsa.","Only Tatsa."],238,"chilli"],[74,58,["Yesss!"],66]],
       chars:[["nana",236,128,.9,"stern",true],["kid",76,150,.72,"surprise"],["mom",150,150,.7,"happy"]]},
      {cap:"8:10 pm",bg:"#f0c98c",table:true,bubbles:[[84,8,["More","rotis!"],66],[222,8,["Needs more","salt. (Eats all.)"],236]],
       chars:[["kid",66,150,.7,"eat"],["mom",138,134,.78,"happy"],["nana",236,128,.86,"eat",true],["dad",190,150,.62,"happy"]]}
    ]
  }
};

function comic(key,i){
  var p=STORIES[key].panels[i],s='<svg viewBox="0 0 300 300" role="img" aria-label="'+STORIES[key].title+' panel '+(i+1)+'">';
  s+='<defs><clipPath id="pc-'+key+i+'"><rect width="300" height="300" rx="6"/></clipPath></defs><g clip-path="url(#pc-'+key+i+')">';
  s+='<rect width="300" height="300" fill="'+p.bg+'"/>';
  s+='<circle cx="268" cy="30" r="46" fill="#fff" opacity=".22"/>';
  if(!p.table){s+='<rect y="236" width="300" height="64" fill="#c98a4e" opacity=".55"/><path d="M0 236H300" stroke="#2a140b" stroke-width="2" opacity=".5"/>'}
  p.chars.forEach(function(c){s+=fig(c[0],c[1],c[2],c[3],c[4],c[5])});
  if(p.table)s+=table();
  p.bubbles.forEach(function(b){s+=bubble(b[0],b[1],b[2],b[3],b[4])});
  s+='<rect x="10" y="272" width="'+(p.cap.length*8.4+16)+'" height="20" rx="4" fill="#2a140b"/><text x="18" y="286" font-family="DM Mono,monospace" font-size="11.5" letter-spacing="1" fill="#fbf0d9">'+p.cap.toUpperCase()+'</text>';
  s+='</g><rect width="300" height="300" rx="6" fill="none" stroke="#2a140b" stroke-width="4"/></svg>';
  return s;
}

window.TatsaFig={comic:comic,stories:STORIES,fig:fig,bubble:bubble};
})();
