/* ── Deck engine: dock, contents, drag, wheel ───────────────────
   horizontal → transform-based deck (desktop / landscape)
   vertical   → native snap-scroll column (phone / portrait) */
(function(){
"use strict";
/* ⚠ Keep identical to the vertical @media query in css/responsive.css */
var VERTICAL_QUERY="(max-width: 820px), (orientation: portrait) and (max-width: 1100px)";
var mqVertical=window.matchMedia(VERTICAL_QUERY);
var mqReduce=window.matchMedia("(prefers-reduced-motion: reduce)");
var vertical=mqVertical.matches;
var deck=document.getElementById("deck");
var slides=Array.prototype.slice.call(document.querySelectorAll(".slide"));
var dotsEl=document.getElementById("nav-dots"),progress=document.getElementById("progress");
var btnPrev=document.getElementById("btn-prev"),btnNext=document.getElementById("btn-next"),btnMenu=document.getElementById("btn-menu"),btnFs=document.getElementById("btn-fs");
var menu=document.getElementById("menu"),menuList=document.getElementById("menu-list");
var dockIdx=document.querySelector(".dock-idx"),dockTitle=document.querySelector(".dock-title");
var total=slides.length,current=0,animating=false,menuOpen=false,cleanTimer=null,menuItems=[];
var locked=false,lockTimer=null,scrollRaf=0,lastW=window.innerWidth,resizeTimer=null;

function pad(n){return(n<10?"0":"")+n}
function mk(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e}
function inView(s){var t=deck.scrollTop,h=deck.clientHeight,a=s.offsetTop,b=a+s.offsetHeight;return a<t+h&&b>t}
function clean(){slides.forEach(function(s,k){if(k===current)return;if(vertical&&inView(s))return;s.classList.remove("is-active")})}

function init(){
  slides.forEach(function(s){
    if(!s.classList.contains("dark"))return;
    var a=document.createElement("div");a.className="aura";a.setAttribute("aria-hidden","true");a.innerHTML="<i></i><i></i>";s.insertBefore(a,s.firstChild);
  });
  slides.forEach(function(s,i){
    var title=s.getAttribute("data-title")||"Slide "+(i+1);
    var btn=mk("button","nav-dot");
    btn.setAttribute("aria-label","Go to slide "+(i+1)+": "+title);btn.setAttribute("data-title",title);
    btn.addEventListener("click",function(){goTo(i);btn.blur()});dotsEl.appendChild(btn);
    var li=mk("li"),item=mk("button","menu-item");item.style.setProperty("--i",i);
    item.appendChild(mk("span","menu-n",pad(i+1)));item.appendChild(mk("span","menu-t",title));item.appendChild(mk("span","menu-s",s.getAttribute("data-sub")||""));
    item.addEventListener("click",function(){closeMenu();goTo(i,vertical&&Math.abs(i-current)>1)});
    li.appendChild(item);menuList.appendChild(li);menuItems.push(item);
  });
  btnPrev.addEventListener("click",function(){step(-1)});btnNext.addEventListener("click",function(){step(1)});
  btnMenu.addEventListener("click",openMenu);document.getElementById("menu-close").addEventListener("click",closeMenu);
  menu.addEventListener("click",function(e){if(e.target===menu)closeMenu()});
  var fsOK=document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen;
  if(!fsOK)btnFs.hidden=true;btnFs.addEventListener("click",toggleFs);
  document.addEventListener("click",function(e){
    var b=e.target.closest("[data-go]");if(!b)return;
    var v=b.getAttribute("data-go");goTo(v==="next"?current+1:parseInt(v,10));
  });
  deck.addEventListener("scroll",function(){
    if(!vertical)return;
    if(locked){clearTimeout(lockTimer);lockTimer=setTimeout(unlock,140)}
    if(!scrollRaf)scrollRaf=requestAnimationFrame(syncScroll);
  },{passive:true});
  var onMode=function(){setLayout();goTo(current,true)};
  if(mqVertical.addEventListener)mqVertical.addEventListener("change",onMode);else if(mqVertical.addListener)mqVertical.addListener(onMode);
  window.addEventListener("resize",function(){
    var w=window.innerWidth;if(w===lastW)return;lastW=w;if(!vertical)return;
    clearTimeout(resizeTimer);resizeTimer=setTimeout(function(){goTo(current,true)},120);
  });
  var start=parseInt(location.hash.replace("#",""),10);
  setLayout();goTo(isNaN(start)?0:start-1,true);
}
function setLayout(){vertical=mqVertical.matches;deck.style.transform="";deck.style.width=vertical?"":total*100+"vw";if(!vertical)deck.scrollTop=0}
function toggleFs(){
  var el=document.documentElement;
  if(!document.fullscreenElement&&!document.webkitFullscreenElement)(el.requestFullscreen||el.webkitRequestFullscreen||function(){}).call(el);
  else(document.exitFullscreen||document.webkitExitFullscreen||function(){}).call(document);
}
function openMenu(){menuOpen=true;menu.classList.add("is-open");menu.setAttribute("aria-hidden","false");btnMenu.setAttribute("aria-expanded","true")}
function closeMenu(){menuOpen=false;menu.classList.remove("is-open");menu.setAttribute("aria-hidden","true");btnMenu.setAttribute("aria-expanded","false")}
function setCurrent(index){
  current=index;slides[current].classList.add("is-active");
  slides.forEach(function(s,k){
    var on=k===current;s.classList.toggle("is-current",on);
    if(vertical){s.removeAttribute("aria-hidden");if("inert" in s)s.inert=false}
    else{s.setAttribute("aria-hidden",on?"false":"true");if("inert" in s)s.inert=!on}
  });
  Array.prototype.forEach.call(dotsEl.children,function(dot,i){
    dot.classList.toggle("is-active",i===current);
    if(i===current)dot.setAttribute("aria-current","true");else dot.removeAttribute("aria-current");
  });
  menuItems.forEach(function(m,i){m.classList.toggle("is-current",i===current)});
  dockIdx.textContent=pad(current+1)+" / "+pad(total);
  dockTitle.textContent=current===0?(vertical?"Scroll down to begin":"Click → or scroll to begin"):slides[current].getAttribute("data-title");
  btnPrev.disabled=current===0;btnNext.disabled=current===total-1;
  document.body.classList.toggle("at-start",current===0);
  if(!vertical)progress.style.width=((current+1)/total)*100+"%";
  document.body.classList.toggle("nav-on-light",slides[current].classList.contains("light"));
  if(history.replaceState)history.replaceState(null,"","#"+(current+1));
}
function goTo(index,instant){
  index=Math.max(0,Math.min(total-1,index));
  if(vertical){goVertical(index,instant);return}
  if(index===current&&!instant){deck.style.transform="translateX(-"+index*100+"vw)";return}
  animating=true;
  if(instant){deck.style.transition="none";deck.style.transform="translateX(-"+index*100+"vw)";void deck.offsetWidth;deck.style.transition=""}
  else deck.style.transform="translateX(-"+index*100+"vw)";
  setCurrent(index);clearTimeout(cleanTimer);
  var dur=instant?0:parseFloat(getComputedStyle(deck).transitionDuration)*1000;
  cleanTimer=setTimeout(function(){clean();animating=false},dur);
}
function goVertical(index,instant){
  var smooth=!instant&&!mqReduce.matches;
  if(smooth)lock();
  setCurrent(index);
  var top=slides[index].offsetTop;
  if(typeof deck.scrollTo==="function")deck.scrollTo({top:top,behavior:smooth?"smooth":"auto"});else deck.scrollTop=top;
  updateProgress();
  if(!smooth){clearTimeout(cleanTimer);cleanTimer=setTimeout(clean,120)}
}
function step(dir){
  if(vertical){
    var s=slides[current],t=deck.scrollTop,h=deck.clientHeight,top=s.offsetTop,bottom=top+s.offsetHeight;
    var behavior=mqReduce.matches?"auto":"smooth";
    if(dir>0&&bottom-(t+h)>48){deck.scrollTo({top:Math.min(t+h*.85,bottom-h),behavior:behavior});return}
    if(dir<0&&t>top+48){deck.scrollTo({top:Math.max(top,t-h*.85),behavior:behavior});return}
  }
  goTo(current+dir);
}
function lock(){locked=true;clearTimeout(lockTimer);lockTimer=setTimeout(unlock,300)}
function unlock(){locked=false;syncScroll()}
function updateProgress(){var sh=deck.scrollHeight||1;progress.style.width=Math.min(100,((deck.scrollTop+deck.clientHeight)/sh)*100)+"%"}
function syncScroll(){
  scrollRaf=0;if(!vertical)return;updateProgress();if(locked)return;
  var t=deck.scrollTop,h=deck.clientHeight,mid=t+h/2,probe=t+h-44,idx=current,under=current;
  slides.forEach(function(s,k){
    var a=s.offsetTop,b=a+s.offsetHeight;
    if(a<=mid&&mid<b)idx=k;if(a<=probe&&probe<b)under=k;
    if(a<t+h-40&&b>t+40)s.classList.add("is-active");
  });
  if(idx!==current)setCurrent(idx);
  document.body.classList.toggle("nav-on-light",slides[under].classList.contains("light"));
  clean();
}
document.addEventListener("keydown",function(e){
  if(e.altKey||e.ctrlKey||e.metaKey)return;
  var k=e.key;
  if(k==="Escape"&&menuOpen){closeMenu();return}
  if(menuOpen)return;
  var tag=e.target&&e.target.tagName;
  if(tag==="INPUT"&&(k==="ArrowLeft"||k==="ArrowRight"||k==="ArrowUp"||k==="ArrowDown"||k==="Home"||k==="End"))return;
  if((k===" "||k==="Enter")&&(tag==="BUTTON"||tag==="A"||tag==="INPUT"))return;
  if(k==="f"||k==="F"){toggleFs();return}
  if(animating)return;
  if(k==="ArrowRight"||k==="ArrowDown"||k==="PageDown"||(k===" "&&!e.shiftKey)){e.preventDefault();step(1)}
  else if(k==="ArrowLeft"||k==="ArrowUp"||k==="PageUp"||(k===" "&&e.shiftKey)){e.preventDefault();step(-1)}
  else if(k==="Home"){e.preventDefault();goTo(0)}
  else if(k==="End"){e.preventDefault();goTo(total-1)}
});
var wheelLock=false;
document.addEventListener("wheel",function(e){
  if(vertical)return;e.preventDefault();
  var d=Math.abs(e.deltaY)>=Math.abs(e.deltaX)?e.deltaY:e.deltaX;
  if(menuOpen||animating||wheelLock||Math.abs(d)<12)return;
  wheelLock=true;setTimeout(function(){wheelLock=false},1300);goTo(current+(d>0?1:-1));
},{passive:false});
var drag=null,suppressClick=false;
document.addEventListener("click",function(e){if(suppressClick){e.stopPropagation();e.preventDefault()}},true);
function peek(dir){var n=slides[current+dir];if(n)n.classList.add("is-active")}
function endDrag(){
  if(!drag)return;var d=drag;drag=null;if(!d.active)return;
  document.body.classList.remove("is-dragging");deck.style.transition="";
  suppressClick=true;setTimeout(function(){suppressClick=false},0);
  var thr=Math.min(160,window.innerWidth*.12);
  if(d.dx<-thr)goTo(current+1);else if(d.dx>thr)goTo(current-1);
  else{deck.style.transform="translateX(-"+current*100+"vw)";clearTimeout(cleanTimer);cleanTimer=setTimeout(clean,900)}
}
deck.addEventListener("pointerdown",function(e){
  if(vertical||menuOpen)return;if(e.pointerType==="mouse"&&e.button!==0)return;
  if(e.target.closest("button, a, input, .no-drag"))return;
  drag={x:e.clientX,y:e.clientY,dx:0,active:false,dir:0};
});
window.addEventListener("pointermove",function(e){
  if(!drag)return;
  if(e.pointerType==="mouse"&&e.buttons===0){endDrag();return}
  var dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(!drag.active){
    if(Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)*1.2){drag.active=true;deck.style.transition="none";document.body.classList.add("is-dragging")}else return;
  }
  drag.dx=dx;var dir=dx<0?1:-1;if(dir!==drag.dir){drag.dir=dir;peek(dir)}
  var atEdge=(current===0&&dx>0)||(current===total-1&&dx<0);
  deck.style.transform="translateX(calc(-"+current*100+"vw + "+dx*(atEdge?.25:1)+"px))";
});
window.addEventListener("pointerup",endDrag);window.addEventListener("pointercancel",endDrag);window.addEventListener("blur",endDrag);
init();
})();
