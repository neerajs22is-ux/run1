/* ── Cursor ring (desktop only) ── */
(function(){
  var fine=window.matchMedia("(hover: hover) and (pointer: fine)").matches,ring=document.getElementById("cursor");
  if(!fine||!ring)return;
  var SEL="a, button, input, .panel, .pillar, .ch-btn, .chk, .intent, .menu-item, .r-node, .b-tab";
  var x=0,y=0,rx=0,ry=0,on=false;
  window.addEventListener("mousemove",function(e){
    x=e.clientX;y=e.clientY;if(!on){on=true;rx=x;ry=y;ring.classList.add("is-on")}
    ring.classList.toggle("is-hover",!!(e.target.closest&&e.target.closest(SEL)));
  },{passive:true});
  document.documentElement.addEventListener("mouseleave",function(){on=false;ring.classList.remove("is-on")});
  (function loop(){rx+=(x-rx)*.2;ry+=(y-ry)*.2;ring.style.transform="translate3d("+rx+"px,"+ry+"px,0)";requestAnimationFrame(loop)})();
})();

/* ── Pointer light + parallax (desktop only) ── */
(function(){
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches,fine=window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if(reduce||!fine)return;
  var root=document.documentElement,mx=0,my=0,q=false;
  window.addEventListener("mousemove",function(e){
    mx=e.clientX;my=e.clientY;if(q)return;q=true;
    requestAnimationFrame(function(){
      q=false;root.style.setProperty("--mx",mx+"px");root.style.setProperty("--my",my+"px");
      root.style.setProperty("--px",((mx/window.innerWidth)*2-1).toFixed(3));root.style.setProperty("--py",((my/window.innerHeight)*2-1).toFixed(3));
    });
  },{passive:true});
})();

/* ── Embers: warm sparks rising like a tandoor ── */
(function(){
  var cv=document.getElementById("embers");
  if(!cv||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var COUNT=window.innerWidth<820?16:34,ctx=cv.getContext("2d"),W,H,dpr,P=[];
  function size(){dpr=Math.min(window.devicePixelRatio||1,2);W=cv.width=Math.round(window.innerWidth*dpr);H=cv.height=Math.round(window.innerHeight*dpr)}
  function spawn(init){return{x:Math.random()*W,y:init?Math.random()*H:H+10*dpr,r:(.8+Math.random()*1.8)*dpr,vy:(.2+Math.random()*.5)*dpr,a:.25+Math.random()*.5,t:Math.random()*6.28,s:.5+Math.random()*1.2}}
  size();for(var i=0;i<COUNT;i++)P.push(spawn(true));
  window.addEventListener("resize",size);
  function frame(){
    ctx.clearRect(0,0,W,H);
    var light=document.body.classList.contains("nav-on-light"),col=light?"214,64,31":"255,190,80";
    for(var i=0;i<P.length;i++){
      var p=P[i];p.t+=.02*p.s;p.y-=p.vy;p.x+=Math.sin(p.t)*.5*dpr;
      if(p.y<-10*dpr){P[i]=spawn(false);continue}
      var life=Math.max(0,p.y/H),al=p.a*(.35+.65*Math.abs(Math.sin(p.t*2)))*(light?.45:1)*Math.min(1,life*1.6);
      ctx.fillStyle="rgba("+col+","+al+")";ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
