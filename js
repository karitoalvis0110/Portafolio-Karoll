window.addEventListener('load',()=>{
  setTimeout(()=>{
    const l=document.getElementById('loader');
    if(l){
      l.style.opacity='0';
      l.style.transition='opacity .5s';
      setTimeout(()=>l.remove(),500);
    }
  },1800);
});

function animateSkill(fillId,labelId,target,interval,delay){
 const fill=document.getElementById(fillId);
 const label=document.getElementById(labelId);
 if(!fill||!label)return;
 function cycle(){
   let value=0;
   fill.style.width='0%';
   label.textContent='0%';
   const t=setInterval(()=>{
      value++;
      fill.style.width=value+'%';
      label.textContent=value+'%';
      if(value>=target){
        clearInterval(t);
        setTimeout(cycle,500);
      }
   },interval);
 }
 setTimeout(cycle,delay);
}
window.addEventListener('load',()=>{
 setTimeout(()=>{
   animateSkill('f1','p1',95,10,0);
   animateSkill('f2','p2',95,20,400);
   animateSkill('f3','p3',95,32,900);
 },1900);
});

const themeBtn=document.getElementById('themeBtn');
themeBtn.addEventListener('click',()=>{
 document.body.classList.toggle('light');
 const icon=themeBtn.querySelector('i');
 if(document.body.classList.contains('light')){
   icon.className='fa-solid fa-sun';
 }else{
   icon.className='fa-solid fa-moon';
 }
});

const panel=document.getElementById('servicePanel');
document.querySelectorAll('.service-box').forEach(box=>{
 box.addEventListener('mouseenter',e=>{
   const r=box.getBoundingClientRect();
   const items=box.dataset.items.split('|').map(i=>'<li>'+i+'</li>').join('');
   panel.innerHTML='<h3>'+box.dataset.title+'</h3><p>Este servicio incluye:</p><ul>'+items+'</ul>';
   panel.style.display='block';
   let left=r.right+20;
   if(left+380>window.innerWidth) left=r.left-380;
   panel.style.left=left+'px';
   panel.style.top=(r.top)+'px';
 });
 box.addEventListener('mouseleave',()=>panel.style.display='none');
});

document.body.style.cursor='none';
let mouseX=window.innerWidth/2,mouseY=window.innerHeight/2;
document.addEventListener('mousemove',e=>{
  mouseX=e.clientX;
  mouseY=e.clientY;
});
function spawnRipple(){
  const r=document.createElement('div');
  r.className='ripple';
  r.style.left=mouseX+'px';
  r.style.top=mouseY+'px';
  document.body.appendChild(r);
  setTimeout(()=>r.remove(),1200);
}
setInterval(spawnRipple,120);

const portfolioData={
 happyClients:80,
 projectsDone:120,
 logosMade:350,
 yearsExp:2
};
function animateCounter(id,target,suffix="+"){
 const el=document.getElementById(id);
 let n=0;
 const step=Math.max(1,Math.ceil(target/60));
 const t=setInterval(()=>{
   n=Math.min(target,n+step);
   el.textContent=n+suffix;
   if(n>=target) clearInterval(t);
 },25);
}
const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{
   if(e.isIntersecting){
     animateCounter('happyClients',portfolioData.happyClients);
     animateCounter('projectsDone',portfolioData.projectsDone);
     animateCounter('logosMade',portfolioData.logosMade);
     animateCounter('yearsExp',portfolioData.yearsExp);
     observer.disconnect();
   }
 });
});
observer.observe(document.querySelector('.stats-panel'));
