const pre=document.querySelector('#preloader');setTimeout(()=>pre.classList.add('loaded'),700);
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.14});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));
document.querySelectorAll('[data-scroll]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.scroll).scrollIntoView());
// Acordeón
const bs=document.querySelectorAll('.accordion button');bs.forEach(b=>b.addEventListener('click',()=>{const p=b.nextElementSibling;document.querySelectorAll('.accordion div').forEach(x=>{if(x!==p)x.style.display='none'});p.style.display=p.style.display==='block'?'none':'block'}));
// Cuenta regresiva: cambiar fecha aquí
const target=new Date('2026-11-14T19:00:00-03:00').getTime();const cd=document.querySelector('#countdown');function tick(){let d=Math.max(0,target-Date.now());let days=Math.floor(d/864e5);d%=864e5;let h=Math.floor(d/36e5);d%=36e5;let m=Math.floor(d/6e4);let s=Math.floor((d%6e4)/1e3);cd.innerHTML=[[''+days,'DÍAS'],[String(h).padStart(2,'0'),'HORAS'],[String(m).padStart(2,'0'),'MINUTOS'],[String(s).padStart(2,'0'),'SEGUNDOS']].map(x=>`<div class="unit"><strong>${x[0]}</strong><small>${x[1]}</small></div>`).join('')}tick();setInterval(tick,1000);
// Música. En móviles sólo comienza después de una interacción.
const music=document.querySelector('#music'),sound=document.querySelector('#sound');sound.onclick=async()=>{if(music.paused){try{await music.play();sound.textContent='❚❚'}catch(e){alert('Colocá musica.mp3 en la carpeta audio.')}}else{music.pause();sound.textContent='♫'}};
