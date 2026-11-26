const $ = (s) => document.querySelector(s);
const list = $("#list"), detail = $("#detail");
const musicaFundo = $("#background-music"), controleMusica = $("#music-toggle");
const iconeMusica = $("#music-icon"), controleVolume = $("#music-volume");
const backdrop = $("#backdrop");
let filtro = "all", atual = 7;
let audioContext;
let fontesAtivas = [];
let ultimoVolume = Number(controleVolume.value);
let controleManualMusica = false;
const cooldownsChamados = new Map();
const chamadosIniciando = new Set();

[
  [4, 12], [26, 7], [49, 16], [72, 10], [94, 20],
  [14, 38], [38, 31], [60, 42], [84, 35],
  [5, 61], [28, 55], [51, 67], [75, 58], [96, 70],
  [14, 88], [40, 82], [64, 91], [88, 85]
].forEach(([x, y], index) => {
  const bola = document.createElement("img");
  bola.className = "backdrop-ball";
  bola.src = "images/pokeball.svg";
  bola.alt = "";
  bola.draggable = false;
  bola.style.left = `${x}%`;
  bola.style.top = `${y}%`;
  bola.style.setProperty("--spin-duration", `${38 + (index % 5) * 7}s`);
  bola.style.setProperty("--spin-delay", `-${(index * 3) % 45}s`);
  bola.style.setProperty("--spin-direction", index % 2 ? "reverse" : "normal");
  backdrop.appendChild(bola);
});

const pad = (n) => "#" + String(n).padStart(3, "0");
const byId = (id) => MATERIAS.find((m) => m.id === id);
const visiveis = () => MATERIAS.filter((m) => filtro === "all" || String(m.sem) === filtro);

function atualizarControleMusica() {
  const ativa = !musicaFundo.paused && !musicaFundo.muted && musicaFundo.volume > 0;
  iconeMusica.src = ativa ? "images/som.png" : "images/sem-som.png";
  controleMusica.title = ativa ? "Mutar música de fundo" : "Ativar música de fundo";
  controleMusica.setAttribute("aria-label", controleMusica.title);
  controleMusica.setAttribute("aria-pressed", String(ativa));
}

function atualizarVolume() {
  const volume = Number(controleVolume.value);
  controleVolume.style.setProperty("--volume-level", `${volume * 100}%`);
  controleVolume.setAttribute("aria-valuetext", `${Math.round(volume * 100)}%`);
}

async function reproduzirMusicaDeFundo() {
  musicaFundo.muted = false;
  try {
    await musicaFundo.play();
  } catch (error) {
    musicaFundo.muted = true;
    if (error.name !== "NotAllowedError") console.error("Não foi possível iniciar a música de fundo.", error);
  }
  atualizarControleMusica();
}

controleMusica.addEventListener("click", async () => {
  controleManualMusica = true;
  if (!musicaFundo.paused && !musicaFundo.muted && musicaFundo.volume > 0) {
    musicaFundo.muted = true;
    atualizarControleMusica();
    return;
  }
  if (musicaFundo.volume === 0) {
    musicaFundo.volume = ultimoVolume || 0.2;
    controleVolume.value = String(musicaFundo.volume);
    atualizarVolume();
  }
  await reproduzirMusicaDeFundo();
});

musicaFundo.volume = Number(controleVolume.value);
atualizarVolume();
controleVolume.addEventListener("input", async () => {
  controleManualMusica = true;
  const volume = Number(controleVolume.value);
  musicaFundo.volume = volume;
  if (volume === 0) {
    musicaFundo.muted = true;
    atualizarVolume();
    atualizarControleMusica();
    return;
  }
  ultimoVolume = volume;
  atualizarVolume();
  await reproduzirMusicaDeFundo();
});

musicaFundo.play().then(atualizarControleMusica).catch((error) => {
  if (controleManualMusica) return;
  musicaFundo.muted = true;
  atualizarControleMusica();
  if (error.name !== "NotAllowedError") console.error("Não foi possível reproduzir a música de fundo.", error);
});

function renderLista() {
  list.innerHTML = "";
  visiveis().forEach((m) => {
    const li = document.createElement("li");
    li.innerHTML = `<button class="item ${m.id === atual ? "on" : ""}" style="--c:${m.cor}" data-id="${m.id}">
      <span class="ico">${m.sigla}</span><span class="n">${pad(m.id)}</span><span class="t">${m.nome}</span></button>`;
    list.appendChild(li);
  });
}

function renderDetalhe(m) {
  const atributos = [...new Set(m.criatura.atributos)];
  const tiposAdicionais = [...new Set(m.tipo)].filter((tipo) => !atributos.includes(tipo));
  const stats = Object.entries(m.stats).map(([k, v]) =>
    `<div class="stat"><span>${k}</span><div class="bar"><i data-w="${v}"></i></div><b>${v}</b></div>`).join("");
  detail.style.setProperty("--c", m.cor);
  detail.classList.remove("in"); void detail.offsetWidth; detail.classList.add("in");
  detail.innerHTML = `
    <div class="creature-stage">
      <div class="creature-platform" tabindex="0" role="button" aria-label="Ouvir o chamado de ${m.criatura.nome}">
        <img class="creature-image" src="${m.criatura.arquivo}" alt="${m.criatura.nome}" width="128" height="128">
        <span class="creature-fallback" hidden>${m.sigla}</span>
      </div>
      <h3 class="creature-name">${m.criatura.nome}</h3>
      <span class="audio-status" role="status" aria-live="polite"></span>
    </div>
    <p class="subject-subtitle">${m.nome}</p>
    <p class="num">${pad(m.id)} · ${m.sem}º semestre</p>
    <div class="creature-attributes" aria-label="Atributos de ${m.criatura.nome}">${atributos.map((a) => `<span>${a}</span>`).join("")}</div>
    ${tiposAdicionais.length ? `<div class="types">${tiposAdicionais.map((t) => `<em>${t}</em>`).join("")}</div>` : ""}
    <p class="desc">${m.desc}</p>
    <p class="prof">Docente: ${m.prof}</p>
    <div class="stats">${stats}</div>`;
  const plataforma = detail.querySelector(".creature-platform");
  plataforma.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") tocarChamado(m.criatura, m.id);
  });
  plataforma.addEventListener("click", () => {
    if (matchMedia("(hover: none)").matches) tocarChamado(m.criatura, m.id);
  });
  plataforma.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      tocarChamado(m.criatura, m.id);
    }
  });
  requestAnimationFrame(() => requestAnimationFrame(() =>
    detail.querySelectorAll(".bar i").forEach((i) => (i.style.width = i.dataset.w + "%"))));
}

detail.addEventListener("error", (e) => {
  const image = e.target;
  if (!(image instanceof HTMLImageElement) || !image.classList.contains("creature-image")) return;
  image.hidden = true;
  image.nextElementSibling.hidden = false;
}, true);

async function tocarChamado(criatura, id) {
  const agora = Date.now();
  if ((cooldownsChamados.get(id) || 0) > agora || chamadosIniciando.has(id)) return;
  const status = detail.querySelector(".audio-status");
  if (!window.AudioContext) {
    status.textContent = "Áudio não disponível neste navegador.";
    return;
  }
  if (!audioContext) audioContext = new AudioContext();
  chamadosIniciando.add(id);
  try {
    if (audioContext.state !== "running") await audioContext.resume();
  } catch (error) {
    console.error("Não foi possível iniciar o áudio da criatura.", error);
    status.textContent = "Não foi possível reproduzir o chamado.";
    chamadosIniciando.delete(id);
    return;
  }

  chamadosIniciando.delete(id);
  cooldownsChamados.set(id, Date.now() + 5000);
  fontesAtivas.forEach((fonte) => fonte.stop());
  fontesAtivas = [];
  status.textContent = "";
  const inicio = audioContext.currentTime;
  criatura.som.notas.forEach((nota, i) => {
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();
    const comeco = inicio + i * 0.14;
    oscillator.type = criatura.som.forma;
    oscillator.frequency.setValueAtTime(nota, comeco);
    volume.gain.setValueAtTime(0.0001, comeco);
    volume.gain.exponentialRampToValueAtTime(0.035, comeco + 0.02);
    volume.gain.exponentialRampToValueAtTime(0.0001, comeco + 0.12);
    oscillator.connect(volume);
    volume.connect(audioContext.destination);
    oscillator.onended = () => {
      oscillator.disconnect();
      volume.disconnect();
      fontesAtivas = fontesAtivas.filter((fonte) => fonte !== oscillator);
    };
    oscillator.start(comeco);
    oscillator.stop(comeco + 0.13);
    fontesAtivas.push(oscillator);
  });
}

const mobile = () => matchMedia("(max-width:800px)").matches;
function selecionar(id, rolar) {
  atual = id;
  renderDetalhe(byId(id));
  renderLista();
  if (rolar && mobile()) detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function passo(d) {
  const v = visiveis(); if (!v.length) return;
  let i = v.findIndex((m) => m.id === atual);
  i = (i + d + v.length) % v.length;
  selecionar(v[i].id);
}

list.addEventListener("click", (e) => { const b = e.target.closest("[data-id]"); if (b) selecionar(+b.dataset.id, true); });
detail.addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.id) { filtro = "all"; document.querySelectorAll(".tab").forEach((x) => x.classList.toggle("on", x.dataset.f === "all")); selecionar(+b.dataset.id); }
});
document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach((x) => x.classList.remove("on"));
  t.classList.add("on"); filtro = t.dataset.f;
  const v = visiveis(); if (!v.some((m) => m.id === atual)) atual = v[0].id;
  selecionar(atual);
}));
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowRight") passo(1);
  if (e.key === "ArrowUp" || e.key === "ArrowLeft") passo(-1);
});

selecionar(atual);
document.body.classList.add("booting");
window.addEventListener("load", () => setTimeout(() => {
  $("#boot").classList.add("off");
  document.body.classList.remove("booting");
}, 1050));

// Gesto de deslizar no celular: esquerda = próxima, direita = anterior
let tx = null, ty = null;
detail.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
detail.addEventListener("touchend", (e) => {
  if (tx === null) return;
  const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
  tx = ty = null;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) passo(dx < 0 ? 1 : -1);
});

// ===== Habilidades =====
$("#skills").innerHTML = HABILIDADES.map((h) =>
  `<li class="skill"><div><b>${h.nome}</b><em>${h.area}</em></div>
   <div class="stat"><div class="bar"><i data-w="${h.nivel}"></i></div><b>Nv. ${h.nivel}</b></div></li>`).join("");

// ===== Contato (campos vazios são ocultados) =====
const contatos = [
  ["E-mail", PERFIL.email && "mailto:" + PERFIL.email],
  ["LinkedIn", PERFIL.linkedin],
  ["GitHub", PERFIL.github],
  ["WhatsApp", PERFIL.whatsapp && "https://wa.me/" + PERFIL.whatsapp.replace(/\D/g, "")]
].filter((c) => c[1]);
if (contatos.length) {
  $("#contatos").innerHTML = contatos.map(([n, u]) =>
    `<li><a href="${u}" target="_blank" rel="noopener">${n}</a></li>`).join("");
} else {
  $("#contato").remove();
  document.querySelector('.menu a[href="#contato"]').remove();
}
$("#total").textContent = MATERIAS.length;

// ===== Menu ativo e barras que enchem ao entrar na tela =====
const links = [...document.querySelectorAll(".menu a")];
const secoes = links.map((a) => document.querySelector(a.getAttribute("href")));
const menu = $("#main-menu");
const alternarMenu = $("#menu-toggle");
alternarMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("open");
  alternarMenu.setAttribute("aria-expanded", String(aberto));
  alternarMenu.setAttribute("aria-label", aberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
});
menu.addEventListener("click", (e) => {
  if (!e.target.closest("a")) return;
  menu.classList.remove("open");
  alternarMenu.setAttribute("aria-expanded", "false");
  alternarMenu.setAttribute("aria-label", "Abrir menu de navegação");
});
const ativa = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.hash === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
secoes.forEach((s) => s && ativa.observe(s));
const barras = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.querySelectorAll(".bar i").forEach((i) => (i.style.width = i.dataset.w + "%")); barras.unobserve(e.target); }
}), { threshold: 0.3 });
barras.observe($("#skills"));

const revelaveis = [...document.querySelectorAll(".trainer, .dex, .bloco")];
const entrada = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) {
    e.target.classList.add("visible");
    entrada.unobserve(e.target);
  }
}), { threshold: 0.12 });
revelaveis.forEach((s) => {
  s.classList.add("reveal");
  entrada.observe(s);
});
