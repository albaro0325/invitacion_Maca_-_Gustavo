const $ = s => document.querySelector(s);
const audio = $("#audio");
const musicBtn = $("#musicBtn");

function iniciar() {
  const d = window.DATOS || DATOS;
  $("#aliasText").textContent = d.alias;
  $("#phoneText").textContent = "+" + d.whatsapp;
  $("#instagramHandle").textContent = d.instagramTexto || "@TU_INSTAGRAM";
  $("#instagramLink").href = d.instagram || "#";
  $("#whatsapp").href = `https://wa.me/${d.whatsapp}?text=${encodeURIComponent(
    `Hola Macarena y Gustavo! Quiero confirmar mi asistencia a su boda del 14 de noviembre de 2026.`
  )}`;

  $("#churchMap").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(d.ceremonia);
  $("#hallMap").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(d.salon);

  const source = audio.querySelector("source");
  source.src = d.musicaArchivo;
  audio.load();

  $("#playSong").addEventListener("click", toggleMusic);
  musicBtn.addEventListener("click", toggleMusic);

  $("#openInvitation").addEventListener("click", async () => {
    $("#intro").classList.add("hide");
    musicBtn.classList.add("show");
    try { await audio.play(); setPlaying(true); } catch(e) { setPlaying(false); }
    setTimeout(()=>document.body.style.overflowY="auto",900);
  });

  document.querySelectorAll(".copy").forEach(btn => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(d.alias);
        btn.textContent = "¡ALIAS COPIADO!";
        setTimeout(()=>btn.textContent="COPIAR ALIAS",1800);
      } catch(e) {
        alert("Alias: " + d.alias);
      }
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
  }, {threshold:.14});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  countdown(d.fechaEvento);
}

function setPlaying(playing){
  musicBtn.textContent = playing ? "❚❚" : "♫";
  $("#playSong").textContent = playing ? "❚❚" : "▶";
}

async function toggleMusic(){
  if(audio.paused){
    try { await audio.play(); setPlaying(true); } catch(e) {
      alert("Para reproducir la música, colocá el archivo musica.mp3 dentro de la carpeta audio.");
    }
  }else{ audio.pause(); setPlaying(false); }
}

function countdown(target){
  const box = $("#countdown");
  const t = new Date(target).getTime();
  function update(){
    let diff = Math.max(0,t-Date.now());
    const d=Math.floor(diff/86400000); diff%=86400000;
    const h=Math.floor(diff/3600000); diff%=3600000;
    const m=Math.floor(diff/60000); diff%=60000;
    const s=Math.floor(diff/1000);
    const vals=[d,h,m,s];
    box.querySelectorAll("strong").forEach((el,i)=>el.textContent=String(vals[i]).padStart(2,"0"));
  }
  update(); setInterval(update,1000);
}
document.addEventListener("DOMContentLoaded", iniciar);
