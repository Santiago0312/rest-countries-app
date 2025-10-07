// App: Explora países con datos de REST Countries (v3).
// Demuestra: fetch(), async/await, manejo de errores, filtros, búsqueda, eventos, DOM, localStorage y tema oscuro.

const API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3,subregion,languages,currencies";

const state = {
  countries: [],
  filtered: [],
  query: "",
  region: ""
};

const els = {
  grid: document.getElementById("grid"),
  search: document.getElementById("searchInput"),
  region: document.getElementById("regionSelect"),
  themeToggle: document.getElementById("themeToggle"),
  dialog: document.getElementById("detailsDialog"),
  closeDialog: document.getElementById("closeDialog"),
  details: document.getElementById("details"),
  cardTemplate: document.getElementById("cardTemplate")
};

// ====== Tema oscuro con localStorage ======
(function initTheme(){
  const saved = localStorage.getItem("theme") || "light";
  if(saved === "dark"){
    document.documentElement.classList.add("dark");
  }
  els.themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const mode = document.documentElement.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", mode);
  });
})();

// ====== Cargar datos ======
async function loadCountries(){
  try{
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error("Error al consultar la API: " + res.status);
    const data = await res.json();
    state.countries = data.sort((a,b)=> a.name.common.localeCompare(b.name.common));
    state.filtered = state.countries;
    renderGrid();
  }catch(err){
    console.error(err);
    els.grid.innerHTML = `<p role="alert">⚠️ No fue posible cargar los datos. Intenta de nuevo.</p>`;
  }
}

// ====== Renderizado ======
function renderGrid(){
  els.grid.innerHTML = "";
  const frag = document.createDocumentFragment();
  state.filtered.forEach(country => {
    const node = els.cardTemplate.content.cloneNode(true);
    const img = node.querySelector(".flag");
    const name = node.querySelector(".name");
    const pop = node.querySelector(".population");
    const region = node.querySelector(".region");
    const capital = node.querySelector(".capital");
    const article = node.querySelector(".card");

    img.src = country.flags?.svg || country.flags?.png || "";
    img.alt = `Bandera de ${country.name.common}`;
    name.textContent = country.name.common;
    pop.textContent = new Intl.NumberFormat().format(country.population || 0);
    region.textContent = country.region || "—";
    capital.textContent = (country.capital && country.capital[0]) || "—";

    article.addEventListener("click", () => openDetails(country));
    frag.appendChild(node);
  });
  els.grid.appendChild(frag);

  if(state.filtered.length === 0){
    els.grid.innerHTML = `<p>No hay resultados para “${state.query || state.region}”.</p>`;
  }
}

// ====== Filtros y búsqueda ======
function applyFilters(){
  const q = state.query.trim().toLowerCase();
  const region = state.region;

  state.filtered = state.countries.filter(c => {
    const matchesQuery = q === "" || c.name.common.toLowerCase().includes(q);
    const matchesRegion = region === "" || c.region === region;
    return matchesQuery && matchesRegion;
  });

  renderGrid();
}

els.search.addEventListener("input", (e)=>{
  state.query = e.target.value;
  applyFilters();
});

els.region.addEventListener("change", (e)=>{
  state.region = e.target.value;
  applyFilters();
});

// ====== Detalle con <dialog> ======
function openDetails(c){
  const languages = c.languages ? Object.values(c.languages).join(", ") : "—";
  const currencies = c.currencies ?
    Object.values(c.currencies).map(x => `${x.name} (${x.symbol || ""})`).join(", ")
    : "—";

  els.details.innerHTML = `
    <div class="grid-2">
      <img src="${c.flags?.svg || c.flags?.png || ""}" alt="Bandera de ${c.name.common}" />
      <div>
        <h2>${c.name.common}</h2>
        <p><strong>Nombre oficial:</strong> ${c.name.official || "—"}</p>
        <p><strong>Región:</strong> ${c.region || "—"} · <strong>Subregión:</strong> ${c.subregion || "—"}</p>
        <p><strong>Capital:</strong> ${(c.capital && c.capital[0]) || "—"}</p>
        <p><strong>Población:</strong> ${new Intl.NumberFormat().format(c.population || 0)}</p>
        <p><strong>Idiomas:</strong> ${languages}</p>
        <p><strong>Monedas:</strong> ${currencies}</p>
        <p style="color:var(--muted)">Código: ${c.cca3}</p>
      </div>
    </div>
  `;
  els.dialog.showModal();
}

els.closeDialog.addEventListener("click", ()=> els.dialog.close());
els.dialog.addEventListener("click", (e)=>{
  if(e.target === els.dialog) els.dialog.close();
});

// Init
loadCountries();
