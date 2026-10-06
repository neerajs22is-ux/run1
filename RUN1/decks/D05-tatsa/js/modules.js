/* ═══════════ Tatsa deck — slide interactions ═══════════ */
function $(s,r){return(r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function setP(r){r.style.setProperty("--p",((r.value-r.min)/(r.max-r.min))*100+"%")}
function mixHex(a,b,t){
  var pa=[1,3,5].map(function(i){return parseInt(a.substr(i,2),16)}),pb=[1,3,5].map(function(i){return parseInt(b.substr(i,2),16)});
  return"rgb("+pa.map(function(v,i){return Math.round(v+(pb[i]-v)*t)}).join(",")+")";
}
function replay(el,cls){el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls)}

/* ── 02 · Mood slider: Lunch ⇄ Evening ── */
(function(){
  var M={
    day:{label:"Day · 12 noon",theme:"The day is about",chips:["Speed","Ease","Groups"],aud:"The office team",h:"Lunch, <em>decided.</em>",offer:"[Lunch offer from client]"},
    eve:{label:"Evening · 7:30 pm",theme:"The evening is about",chips:["Ambience","Comfort","Hanging out"],aud:"Residents & families",h:"Your evening plan <em>is sorted.</em>",offer:"[Family-table offer from client]"}
  };
  var box=$("#mood"),range=$("#mood-range"),seg=$$("#mood-seg button"),orb=$("#orb"),orbC=$("#orb-c");
  var chips=$("#mood-chips"),aud=$("#mood-aud"),hd=$("#mood-h"),label=$("#mood-label"),offer=$("#mood-offer"),themeL=$('[data-k="theme"]');
  var state="";
  function pos(t){
    var x=(1-t)*(1-t)*30+2*(1-t)*t*300+t*t*570,y=(1-t)*(1-t)*140+2*(1-t)*t*-60+t*t*140;
    return[x,y];
  }
  function content(k){
    if(state===k)return;state=k;var m=M[k];
    chips.innerHTML=m.chips.map(function(c,i){return'<span style="animation-delay:'+(i*.07)+'s">'+c+"</span>"}).join("");
    aud.textContent=m.aud;hd.innerHTML=m.h;offer.textContent=m.offer;themeL.textContent=m.theme;
    replay(hd,"swap");hd.style.animation="none";void hd.offsetWidth;hd.style.animation="";
  }
  function update(){
    var v=+range.value,t=v/100;setP(range);
    box.style.setProperty("--m",t.toFixed(3));
    var p=pos(t);orb.setAttribute("transform","translate("+p[0].toFixed(1)+" "+p[1].toFixed(1)+")");
    orbC.setAttribute("fill",mixHex("#f0a81c","#d6401f",Math.min(1,t*1.2)));
    orbC.setAttribute("r",(22+t*8).toFixed(1));
    content(v<50?"day":"eve");
    label.textContent=v<50?M.day.label:M.eve.label;
    seg.forEach(function(b){b.classList.toggle("is-on",(+b.dataset.v<50)===(v<50))});
  }
  range.addEventListener("input",update);
  seg.forEach(function(b){b.addEventListener("click",function(){
    var to=+b.dataset.v,from=+range.value,t0=null;
    (function tick(ts){
      if(t0===null)t0=ts;var p=Math.min(1,(ts-t0)/700),e=1-Math.pow(1-p,3);
      range.value=Math.round(from+(to-from)*e);update();if(p<1)requestAnimationFrame(tick);
    })(performance.now());
  })});
  update();
})();

/* ── 03 · Content pillars ── */
(function(){
  var ICO={
    lunch:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 24h36a18 18 0 0 1-36 0z"/><path d="M16 12q-3 4 0 8M24 9q-3 5 0 10M32 12q-3 4 0 8"/></svg>',
    eve:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M30 8a16 16 0 1 0 10 26A13 13 0 0 1 30 8z"/><path d="M8 42h20M12 42v-6h12v6"/></svg>',
    kit:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 20h28v14a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6zM6 20h36M18 12h12M24 12V8"/></svg>',
    chr:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="8" width="36" height="26" rx="8"/><path d="M16 34l-4 8 12-8"/><circle cx="18" cy="20" r="1.6" fill="currentColor"/><circle cx="30" cy="20" r="1.6" fill="currentColor"/><path d="M18 26q6 5 12 0"/></svg>',
    match:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="9" width="38" height="26" rx="4"/><path d="M17 42h14M24 35v7"/><circle cx="24" cy="22" r="7"/><path d="M24 15v14M17 22h14"/></svg>'
  };
  var P=[
    {k:"lunch",n:"Lunch at Tatsa",c:"#f0a81c",aud:"Office",freq:"1",fu:"a week",what:"Team lunch, lunch combos, corporate catering, pre-set menus.",note:"Anchor: the Monday “What’s for lunch at Tatsa” card.",days:[0],ic:ICO.lunch},
    {k:"eve",n:"Evenings at Tatsa",c:"#d6401f",aud:"Residents",freq:"1–2",fu:"a week",what:"Ambience, family tables, hero dishes, drinks, weekend hangouts.",note:"Warm table shots, soft evening light, logo in a corner.",days:[4,5],ic:ICO.eve},
    {k:"kit",n:"Kitchen",c:"#4f7a3d",aud:"Both",freq:"1",fu:"a week",what:"Quick recipes and food tips in a consistent template.",note:"Ingredients slide, method slide, result shot.",days:[1],ic:ICO.kit},
    {k:"chr",n:"Characters",c:"#b8325d",aud:"Both",freq:"1",fu:"a week",what:"One simple recurring cartoon format.",note:"Two casts only: the office gang and the family table.",days:[2],ic:ICO.chr},
    {k:"match",n:"Match nights",c:"#3b6a8f",aud:"Both",freq:"—",fu:"when relevant",what:"Live screening, only in season.",note:"One editable template: IPL, EPL, F1, tennis.",days:[6],ic:ICO.match}
  ];
  var D=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  var wrap=$("#pillars"),panel=$("#pil-panel"),week=$("#week");
  week.innerHTML=D.map(function(d){return'<div class="wd"><span>'+d+"</span><i></i></div>"}).join("");
  var wds=$$(".wd",week);
  wrap.innerHTML=P.map(function(p,i){
    return'<button class="pillar" role="tab" data-i="'+i+'" style="--pc:'+p.c+'"><span class="pn">0'+(i+1)+"</span>"+p.ic+"<b>"+p.n+"</b><small>"+p.aud+" · "+p.freq+" "+p.fu+"</small></button>";
  }).join("");
  var btns=$$(".pillar",wrap);
  function show(i){
    var p=P[i];
    btns.forEach(function(b,k){b.classList.toggle("is-on",k===i);b.setAttribute("aria-selected",k===i)});
    wds.forEach(function(w,k){var on=p.days.indexOf(k)>-1;w.classList.toggle("on",on);w.classList.toggle("off",!on);w.style.setProperty("--pc",p.c)});
    panel.style.setProperty("--pc",p.c);
    panel.innerHTML='<div><span class="label" style="color:var(--pc)">Pillar 0'+(i+1)+'</span><h3>'+p.n+"</h3><p>"+p.what+"</p></div>"+
      '<div><span class="label muted">Audience &amp; rhythm</span><div class="big" style="margin-top:var(--s-2)">'+p.freq+"<small>"+p.fu+" · "+p.aud+"</small></div></div>"+
      '<div><span class="label muted">How it runs</span><p style="margin-top:var(--s-2)">'+p.note+'</p><span class="tag gold" style="margin-top:var(--s-3)">'+(p.days.map(function(d){return D[d]}).join(" · "))+"</span></div>";
    panel.classList.remove("swap");void panel.offsetWidth;panel.classList.add("swap");
  }
  btns.forEach(function(b){b.addEventListener("click",function(){show(+b.dataset.i)})});
  show(0);
})();

/* ── 04 · Characters ── */
(function(){
  var strip=$("#strip"),cap=$("#cap-line"),segs=$$("#cast-seg button"),key="office",timers=[];
  function render(){
    timers.forEach(clearTimeout);timers=[];
    strip.innerHTML="";
    for(var i=0;i<3;i++){var d=document.createElement("div");d.className="pnl";d.innerHTML=window.TatsaFig.comic(key,i);strip.appendChild(d)}
    cap.textContent="";
    $$(".pnl",strip).forEach(function(p,i){timers.push(setTimeout(function(){p.classList.add("in")},150+i*520))});
    timers.push(setTimeout(function(){cap.textContent=window.TatsaFig.stories[key].caption},1800));
  }
  segs.forEach(function(b){b.addEventListener("click",function(){
    segs.forEach(function(o){o.classList.remove("is-on")});b.classList.add("is-on");key=b.dataset.c;render();
  })});
  $("#cast-replay").addEventListener("click",render);
  /* replay whenever the slide becomes active */
  var slide=strip.closest(".slide"),was=false;
  new MutationObserver(function(){var on=slide.classList.contains("is-active");if(on&&!was)render();was=on}).observe(slide,{attributes:true,attributeFilter:["class"]});
  render();
})();

/* ── 05 · Monday card + WhatsApp ── */
(function(){
  var DAYS=[
    {d:"Monday",h:"Monday needs <em>a good lunch.</em>",dish:[["Dal tadka thali","₹189"],["Paneer butter masala combo","₹229"],["Chicken curry meal","₹249"]]},
    {d:"Tuesday",h:"Lunch, <em>decided.</em>",dish:[["Rajma chawal","₹169"],["Veg biryani + raita","₹199"],["Fish curry meal","₹269"]]},
    {d:"Wednesday",h:"Midweek, <em>sorted.</em>",dish:[["Chole bhature","₹179"],["Butter chicken combo","₹259"],["Dal khichdi bowl","₹149"]]},
    {d:"Thursday",h:"Almost Friday. <em>Eat well.</em>",dish:[["Kadhai paneer meal","₹219"],["Mutton keema pav","₹279"],["Curd rice + pickle","₹129"]]},
    {d:"Friday",h:"Team lunch, <em>on us to plan.</em>",dish:[["Hyderabadi dum biryani","₹249"],["Veg pulao + gravy","₹189"],["Gulab jamun (2)","₹79"]]}
  ];
  var chat=$("#wa-chat"),btns=$$("#hook-day button"),tm=[];
  function time(m){return"12:"+(m<10?"0":"")+m+" pm"}
  function show(i){
    tm.forEach(clearTimeout);tm=[];
    var s=DAYS[i];
    btns.forEach(function(b,k){b.classList.toggle("is-on",k===i)});
    var card='<div class="lc"><div class="l1">What’s for lunch at Tatsa · '+s.d+"</div><h4>"+s.h+"</h4>"+
      s.dish.map(function(x){return'<div class="row"><span>'+x[0]+"</span><i>"+x[1]+"</i></div>"}).join("")+
      '<div class="strip-b">Order for your team · 5 to 500 people</div></div>';
    chat.innerHTML="";
    function add(html,cls,delay){
      tm.push(setTimeout(function(){var m=document.createElement("div");m.className="wa-msg "+(cls||"");m.innerHTML=html;chat.appendChild(m)},delay));
    }
    add("<b>Tatsa · Bellandur</b><br/>Good morning team ☀️<small>"+time(2)+"</small>","",100);
    add(card+"Planning a team lunch? Message us.<small>"+time(3)+"</small>","",750);
    add("Booking for 12 tomorrow 🙌<small>"+time(9)+"</small>","me",1700);
    add("Done. Same table by the window?<small>"+time(9)+"</small>","",2500);
  }
  btns.forEach(function(b,i){b.addEventListener("click",function(){show(i)})});
  var slide=chat.closest(".slide"),was=false;
  new MutationObserver(function(){var on=slide.classList.contains("is-active");if(on&&!was)show(+($("#hook-day .is-on").dataset.d));was=on}).observe(slide,{attributes:true,attributeFilter:["class"]});
  show(0);
})();

/* ── 06 · Channels ── */
(function(){
  var OFF=[
    ['<svg viewBox="0 0 48 48"><rect x="8" y="6" width="32" height="36" rx="3"/><path d="M14 16h20M14 24h20M14 32h12"/></svg>',"Posters & boards","4–5 large communities"],
    ['<svg viewBox="0 0 48 48"><path d="M14 6h20v30H14zM8 42h32M24 36v6"/><path d="M19 14h10M19 20h10"/></svg>',"Standees","in the restaurant"],
    ['<svg viewBox="0 0 48 48"><rect x="12" y="6" width="24" height="36" rx="3"/><path d="M12 14h24M24 6v8"/></svg>',"Table cards","every table"],
    ['<svg viewBox="0 0 48 48"><path d="M14 6h20v36l-10-8-10 8z"/><path d="M19 14h10"/></svg>',"Bookmark card","inside every parcel"]
  ];
  var C=[
    {k:"WA",n:"WhatsApp",s:"The main tool",c:"#25804a",h:"The main tool for <em>communities &amp; offices.</em>",
     pts:["Apartment communities and office groups.","Short visuals, one clear call to action.","Monday lunch card goes straight into office groups."],tags:["Residents","Office","Primary"]},
    {k:"IG",n:"Instagram & Facebook",s:"Pillar content",c:"#b8325d",h:"Pillar content, <em>kept consistent.</em>",
     pts:["All five pillars live here on one visual system.","3 to 4 posts a week; STB at roughly 1 in 5.","Same templates every week so production stays quick."],tags:["Both audiences","3–4 / week"]},
    {k:"G",n:"Google",s:"Cheap to fix, builds trust",c:"#3b6a8f",h:"Reply fast. <em>Show fresh photos.</em>",
     pts:["Quick replies to every review and message.","Fresh photos, starting in Week 1.","Cheap to fix and builds trust fast."],tags:["Reviews","Photos","Week 1"]},
    {k:"▣",n:"Offline",s:"Posters, standees, cards",c:"#d6401f",h:"Where the table <em>meets the brand.</em>",off:true,
     pts:[],tags:["Weeks 1–2"]},
    {k:"→",n:"Later",s:"After month 1",c:"#8c3a1c",h:"Earned after <em>the first month.</em>",
     pts:["Targeted ads by area.","Customer involvement ideas.","Decide using what Week 4 review shows worked."],tags:["After month 1"]}
  ];
  var list=$("#chan-list"),stage=$("#chan-stage");
  list.innerHTML=C.map(function(c,i){
    return'<button class="ch-btn" role="tab" data-i="'+i+'" style="--cc:'+c.c+'"><span class="ci">'+c.k+"</span><span><b>"+c.n+"</b><small>"+c.s+'</small></span><span class="ar">→</span></button>';
  }).join("");
  var btns=$$(".ch-btn",list);
  function show(i){
    var c=C[i];btns.forEach(function(b,k){b.classList.toggle("is-on",k===i);b.setAttribute("aria-selected",k===i)});
    var body=c.off?'<div class="offline-grid">'+OFF.map(function(o){return'<div class="off">'+o[0]+o[1]+"<small>"+o[2]+"</small></div>"}).join("")+"</div>"
      :'<ul class="pts">'+c.pts.map(function(p){return"<li>"+p+"</li>"}).join("")+"</ul>";
    stage.innerHTML='<span class="label muted">Channel 0'+(i+1)+'</span><h3>'+c.h+"</h3>"+body+'<div class="tags">'+c.tags.map(function(t,k){return'<span class="tag '+(k===0?"gold":"")+'">'+t+"</span>"}).join("")+"</div>";
  }
  btns.forEach(function(b){b.addEventListener("click",function(){show(+b.dataset.i)})});
  show(0);
})();

/* ── 07 · Rollout ── */
(function(){
  var W=[
    {t:"Residential push",p:"Poster and WhatsApp visuals for the communities — family, friends and food themes.",l:["Posters & WhatsApp visuals","Start the Google photo and review clean-up","Confirm offers with the client"],focus:"Residents",mix:[1,0,0,0]},
    {t:"In-restaurant",p:"Make the restaurant itself a channel, and start the weekly posting rhythm.",l:["Standees and table cards","Parcel bookmark card","Start the weekly posting rhythm"],focus:"Diners",mix:[1,1,0,0]},
    {t:"Office push",p:"Win the weekday lunch: pre-set menu and team-lunch creatives go live.",l:["Pre-set menu & team-lunch creatives","The Monday lunch card","First character post"],focus:"Office",mix:[1,1,1,0]},
    {t:"Review and add",p:"Add the next layer, then look at what got responses and adjust.",l:["Digital screen video (once edited food photos arrive)","First recipe series","Review responses and adjust"],focus:"Both",mix:[1,1,1,1]}
  ];
  var nodes=$$(".r-node"),fill=$("#r-fill"),panel=$("#r-panel"),play=$("#r-play"),i=0,timer=null;
  function render(n){
    i=n;nodes.forEach(function(b,k){b.classList.toggle("is-on",k===n);b.classList.toggle("is-done",k<n)});
    fill.style.width=(n/(W.length-1))*100+"%";
    var w=W[n];
    panel.innerHTML='<div><span class="label" style="color:var(--hl)">Week 0'+(n+1)+"</span><h3>"+w.t+"</h3><p>"+w.p+"</p></div>"+
      '<div><span class="label muted">What ships</span><ul>'+w.l.map(function(x){return"<li>"+x+"</li>"}).join("")+"</ul></div>"+
      '<div><div class="wk">0'+(n+1)+"<small>Focus · "+w.focus+'</small></div><div class="mix" aria-hidden="true">'+w.mix.map(function(m){return'<i class="'+(m?"on":"")+'"></i>'}).join("")+"</div></div>";
    panel.classList.remove("swap");void panel.offsetWidth;panel.classList.add("swap");
  }
  function stop(){clearInterval(timer);timer=null;play.textContent="▶ Play the month"}
  nodes.forEach(function(b){b.addEventListener("click",function(){stop();render(+b.dataset.i)})});
  play.addEventListener("click",function(){
    if(timer){stop();return}
    if(i>=W.length-1)render(0);
    play.textContent="❚❚ Pause";
    timer=setInterval(function(){if(i>=W.length-1){stop();return}render(i+1)},2400);
  });
  render(0);
})();

/* ── 08 · Measurement simulator ── */
(function(){
  var C=["[Community 1]","[Community 2]","[Community 3]","[Community 4]","[Community 5]"];
  var rows=$("#sim-rows"),read=$("#sim-read"),title=$("#sim-title"),run=$("#sim-run"),reset=$("#sim-reset"),busy=false,val=[0,0,0,0,0];
  rows.innerHTML=C.map(function(c,i){
    return'<div class="sr" data-i="'+i+'"><div class="nm">'+c+" family table<small>QR code 0"+(i+1)+'</small></div><div class="bar"><u></u></div><div class="v">0<small>redeemed</small></div></div>';
  }).join("");
  var els=$$(".sr",rows);
  function paint(max){
    var top=val.indexOf(Math.max.apply(null,val));
    els.forEach(function(e,i){
      e.querySelector("u").style.width=(max?val[i]/max*100:0)+"%";
      e.querySelector(".v").firstChild.nodeValue=val[i];
      e.classList.toggle("top",max>0&&i===top);
    });
  }
  function go(){
    if(busy)return;busy=true;run.disabled=true;
    var target=C.map(function(){return 8+Math.floor(Math.random()*52)});
    var t0=null,dur=1800;
    read.textContent="Counting redemptions…";
    (function tick(ts){
      if(t0===null)t0=ts;var p=Math.min(1,(ts-t0)/dur),e=1-Math.pow(1-p,3);
      val=target.map(function(t){return Math.round(t*e)});
      paint(Math.max.apply(null,target));
      if(p<1){requestAnimationFrame(tick);return}
      var top=target.indexOf(Math.max.apply(null,target)),sum=target.reduce(function(a,b){return a+b},0);
      title.textContent="Offer: “"+C[top]+" family table”";
      read.textContent=C[top]+" redeems most ("+target[top]+" of "+sum+"). Double down there.";
      busy=false;run.disabled=false;
    })(performance.now());
  }
  function clear(){val=[0,0,0,0,0];paint(0);title.textContent="Offer: “[Community] family table”";read.textContent="Press “Simulate a week” to see which community redeems most."}
  run.addEventListener("click",go);reset.addEventListener("click",function(){if(!busy)clear()});
  paint(0);
})();

/* ── 09 · Example briefs ── */
(function(){
  var B=[
    {n:"Apartment WhatsApp visual",tag:"Family theme",mock:"sq",rows:[
      ["Objective","Get families in the community to try Tatsa this weekend."],
      ["Format","Square image plus a short caption, WhatsApp-sized."],
      ["Visual","Warm table shot (real photo, or AI-styled if none yet): family-style spread, soft evening light. Logo in a corner."],
      ["Headline","<q>“Your evening plan is sorted.”</q> — or the client’s one word if it fits."],
      ["Body","One line on the ambience, one on the food. No more."],
      ["Offer / CTA","[Offer from client] + “Show this message at the table” + call or WhatsApp number."],
      ["Notes","Make friends and food versions in the same layout, with different images and headlines."]]},
    {n:"Office lunch post",tag:"Monday card",mock:"card",rows:[
      ["Objective","Become the team’s default lunch option."],
      ["Format","1080 × 1350 Instagram post, also exported for WhatsApp."],
      ["Visual","Clean layout: today’s special, two or three dishes, price, and a small “Order for your team” strip at the bottom."],
      ["Headline","<q>“Lunch, decided.”</q> / <q>“Monday needs a good lunch.”</q>"],
      ["CTA","“Planning a team lunch? Message us.” + the WhatsApp number."],
      ["Notes","Same template each week, with one slot for the corporate pre-set menu (5 to 500 people)."]]},
    {n:"Character post",tag:"The office gang",mock:"comic",rows:[
      ["Objective","Be fun and recognisable, and lightly tie lunch to Tatsa."],
      ["Format","3-panel cartoon, Instagram carousel or single image."],
      ["Scenario","Panel 1: team argues over where to eat. Panel 2: “Tatsa?” — everyone agrees. Panel 3: happy at the table."],
      ["Tone","Gentle workplace humour. No sarcasm about bosses or specific companies."],
      ["Caption","One line + “Tag the colleague who never decides.”"],
      ["Notes","Same two or three characters, same look, every time. Consistency beats the joke."]]},
    {n:"Quick recipe",tag:"Kitchen pillar",mock:"reel",rows:[
      ["Objective","Show the kitchen’s skill and build recognition."],
      ["Format","20 to 30 second reel, or a 4-slide carousel."],
      ["Content","One Tatsa dish, 3 or 4 steps, one chef tip — fixed template: ingredients slide, method slide, result shot."],
      ["Caption","“Make it at home, or let us do it.” + CTA."],
      ["Notes","Reuse for the in-restaurant digital screen: one shoot gives posts, reels and screen content."]]},
    {n:"Match night standee",tag:"When in season",mock:"fest",rows:[
      ["Objective","Let walk-ins know matches are being shown."],
      ["Format","Standee (size to confirm) plus a matching social post."],
      ["Visual","Simple and bold, sport-neutral colours so one design swaps between IPL, EPL and F1."],
      ["Content","“Live on the big screen” + the match or season name + one food or drink offer."],
      ["Notes","Build it as an editable template — the client’s list includes F1, EPL and tennis seasons."]]}
  ];
  var tabs=$("#b-tabs"),mock=$("#b-mock"),sheet=$("#b-sheet");
  tabs.innerHTML=B.map(function(b,i){return'<button class="b-tab" role="tab" data-i="'+i+'"><span class="n">BRIEF 0'+(i+1)+"</span><b>"+b.n+"</b></button>"}).join("");
  var btns=$$(".b-tab",tabs);
  var LAMP='<svg class="lamp" viewBox="0 0 230 90" fill="none" stroke="#ffcf5c" stroke-width="2"><path d="M20 80h190M40 80c0-30 20-48 75-48s75 18 75 48" /><path d="M115 32V14M105 14h20" /><circle cx="115" cy="56" r="10" fill="#ffcf5c" stroke="none" opacity=".85"/></svg>';
  function mockHTML(k){
    if(k==="sq")return'<div class="m-sq"><span class="lg">Tatsa</span>'+LAMP+'<h4>Your evening plan <em>is sorted.</em></h4><p>Warm tables, slow dinners, and a spread built for the whole family.</p><span class="cta">[Offer] · Show this message</span></div>';
    if(k==="card")return'<div class="lc m-portrait" style="margin:0;padding:calc(var(--u)*22);display:flex;flex-direction:column;justify-content:center"><div class="l1">What’s for lunch at Tatsa</div><h4 style="font-size:calc(var(--u)*44)">Monday needs <em>a good lunch.</em></h4><div class="row"><span>Dal tadka thali</span><i>₹189</i></div><div class="row"><span>Paneer butter combo</span><i>₹229</i></div><div class="row"><span>Chicken curry meal</span><i>₹249</i></div><div class="strip-b">Order for your team</div></div>';
    if(k==="comic"){var s='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*8);width:100%">';for(var i=0;i<3;i++)s+='<div style="aspect-ratio:1/1;border-radius:6px;overflow:hidden">'+window.TatsaFig.comic("office",i)+"</div>";return s+"</div>"}
    if(k==="reel")return'<div class="m-reel"><div><small>Slide 1</small><b>Ingredients</b></div><div><small>Slide 2</small><b>Method · 3–4 steps</b></div><div><small>Chef tip</small><b>The one trick</b></div><div><small>Slide 4</small><b>Result shot</b></div></div>';
    if(k==="fest")return'<div class="m-fest" id="fest"><span class="ln"></span><span class="lv">Live on the big screen</span><h4 id="fest-t">IPL<br/>2026</h4><div><div class="of" id="fest-o">Pitcher + wings combo</div></div><div class="sw"><button class="is-on" data-f="0">IPL</button><button data-f="1">EPL</button><button data-f="2">F1</button></div></div>';
    return"";
  }
  var FEST=[["IPL<br/>season","#d6401f","#2a140b","Pitcher + wings combo"],["EPL<br/>weekend","#3b6a8f","#1a0e0a","Pint + platter offer"],["F1<br/>race day","#b8325d","#1a0e0a","Brunch-and-race combo"]];
  function show(i){
    var b=B[i];btns.forEach(function(x,k){x.classList.toggle("is-on",k===i);x.setAttribute("aria-selected",k===i)});
    mock.innerHTML=mockHTML(b.mock);
    sheet.innerHTML='<div class="brow" style="--i:0;border-bottom:1px solid var(--hl)"><span>Brief 0'+(i+1)+'</span><p><b style="font:700 calc(var(--u)*28)/1.1 var(--f-display);letter-spacing:-.035em">'+b.n+'</b> · <span style="font:500 calc(var(--u)*14)/1 var(--f-mono)">'+b.tag+"</span></p></div>"+
      b.rows.map(function(r,k){return'<div class="brow" style="--i:'+(k+1)+'"><span>'+r[0]+"</span><p>"+r[1]+"</p></div>"}).join("");
    sheet.classList.remove("swap");void sheet.offsetWidth;sheet.classList.add("swap");
    if(b.mock==="fest"){
      var f=$("#fest"),t=$("#fest-t"),o=$("#fest-o");
      $$(".sw button",f).forEach(function(x){x.addEventListener("click",function(){
        var d=FEST[+x.dataset.f];$$(".sw button",f).forEach(function(y){y.classList.remove("is-on")});x.classList.add("is-on");
        t.innerHTML=d[0];o.textContent=d[3];f.style.setProperty("--mc1",d[1]);f.style.setProperty("--mc2",d[2]);
      })});
    }
  }
  btns.forEach(function(b){b.addEventListener("click",function(){show(+b.dataset.i)})});
  show(0);
})();

/* ── 10 · To confirm ── */
(function(){
  var Q=[
    ["The client’s “one word” and tagline","Should appear on every single piece, so nothing gets built before it."],
    ["Real offers","For the standees, table cards and WhatsApp visuals."],
    ["Edited food photos?","Decides whether we shoot or lean on AI-styled visuals."],
    ["Names of the 4–5 communities","So each gets its own tracking offer or QR code."]
  ];
  var wrap=$("#checks"),arc=$("#g-arc"),gn=$("#g-n"),gt=$("#g-t");
  wrap.innerHTML=Q.map(function(q,i){
    return'<button class="chk" aria-pressed="false" data-i="'+i+'"><span class="num">0'+(i+1)+"</span><span><b>"+q[0]+"</b><small>"+q[1]+'</small></span><span class="box"><svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg></span></button>';
  }).join("");
  var items=$$(".chk",wrap);
  function update(){
    var n=items.filter(function(b){return b.classList.contains("is-on")}).length;
    arc.style.strokeDashoffset=100-n*25;
    arc.style.stroke=["#d6401f","#d6401f","#f0a81c","#a8b830","#4f7a3d"][n];
    gn.textContent=n+"/4";
    gt.textContent=["Not ready","Warming up","Half-way","Almost there","Ready to produce"][n];
  }
  items.forEach(function(b){b.addEventListener("click",function(){
    var on=!b.classList.contains("is-on");b.classList.toggle("is-on",on);b.setAttribute("aria-pressed",on);update();
  })});
  update();
})();

/* ── 11 · Decisions ── */
(function(){
  var items=$$(".intent"),sum=$("#summary"),copy=$("#btn-copy");
  function chosen(){return items.filter(function(b){return b.classList.contains("is-on")}).map(function(b){return b.dataset.intent})}
  function render(){
    var c=chosen();
    sum.innerHTML="<b>Today’s decisions · "+c.length+" of 3</b>"+(c.length?c.join(" · "):"Nothing selected yet — pick at least one.");
  }
  items.forEach(function(b){b.addEventListener("click",function(){
    var on=!b.classList.contains("is-on");b.classList.toggle("is-on",on);b.setAttribute("aria-pressed",on);render();
  })});
  copy.addEventListener("click",function(){
    var text="Tatsa, Bellandur — decisions for Week 1\n"+chosen().map(function(x,i){return(i+1)+". "+x}).join("\n");
    function done(){var o=copy.innerHTML;copy.innerHTML="Copied ✓";setTimeout(function(){copy.innerHTML=o},1800)}
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(done,done);
    else{var t=document.createElement("textarea");t.value=text;document.body.appendChild(t);t.select();try{document.execCommand("copy")}catch(e){}document.body.removeChild(t);done()}
  });
  render();
})();
