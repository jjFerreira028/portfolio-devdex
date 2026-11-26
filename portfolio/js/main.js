const $ = (s) => document.querySelector(s);
const list = $("#list"), detail = $("#detail");
let filtro = "all", atual = 7;

const pad = (n) => "#" + String(n).padStart(3, "0");
const byId = (id) => MATERIAS.find((m) => m.id === id);
const visiveis = () => MATERIAS.filter((m) => filtro === "all" || String(m.sem) === filtro);

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
  const evo = m.evo ? byId(m.evo) : null;
  const stats = Object.entries(m.stats).map(([k, v]) =>
    `<div class="stat"><span>${k}</span><div class="bar"><i data-w="${v}"></i></div><b>${v}</b></div>`).join("");
  detail.style.setProperty("--c", m.cor);
  detail.classList.remove("in"); void detail.offsetWidth; detail.classList.add("in");
  detail.innerHTML = `
    <div class="mon"><span>${m.sigla}</span></div>
    <p class="num">${pad(m.id)} · ${m.sem}º semestre</p>
    <h3>${m.nome}</h3>
    <div class="types">${m.tipo.map((t) => `<em>${t}</em>`).join("")}</div>
    <p class="desc">${m.desc}</p>
    <p class="prof">Instrutor: ${m.prof}</p>
    <div class="stats">${stats}</div>
    ${evo ? `<button class="evo" data-id="${evo.id}">Evolui para: ${evo.nome}</button>` : ""}
    <div class="nav"><button data-step="-1" aria-label="Matéria anterior">Anterior</button><button data-step="1" aria-label="Próxima matéria">Próxima</button></div>`;
  requestAnimationFrame(() => requestAnimationFrame(() =>
    detail.querySelectorAll(".bar i").forEach((i) => (i.style.width = i.dataset.w + "%"))));
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
  if (b.dataset.step) passo(+b.dataset.step);
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
window.addEventListener("load", () => setTimeout(() => $("#boot").classList.add("off"), 900));

// Gesto de deslizar no celular: esquerda = próxima, direita = anterior
let tx = null, ty = null;
detail.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
detail.addEventListener("touchend", (e) => {
  if (tx === null) return;
  const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
  tx = ty = null;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) passo(dx < 0 ? 1 : -1);
});
