//Dugme za Kategorije i PodKategorije
function prikaziKatiPKat() {
  const container = document.querySelector('.content-placeholder');
  container.innerHTML = `
    <h2 style="text-align:center;">Kategorije</h2>
    <div class="proizvodi-top-bar">
      <div class="search-wrapper">
        <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
        <input type="text" id="searchProizvodInput" placeholder="Pretraži po nazivu..." />
        <img src="../../accessories/menu-list.svg" class="search-right-icon" id="meniKategorije" alt="Meni" />
      </div>
      <button id="dodajKategorijuBtn" class="btn-dodaj">➕ Dodaj novu Kategoriju</button>
    </div>

    <div id="kategorije-filter-panel" class="filter-panel" style="display: none;">
      <div class="filter-row">
        <label>Sortiraj po:</label>
        <select id="sortirajKategorije">
          <option value="">-- Izaberi --</option>
          <option value="naziv_asc">Naziv (A-Z)</option>
          <option value="naziv_desc">Naziv (Z-A)</option>
          <option value="id_asc">ID (rastuce)</option>
          <option value="id_desc">ID (opadajuće)</option>
        </select>
    </div>

  <div class="filter-actions">
    <button id="primeniSortiranjeKategorijeBtn">
      <img src="../../accessories/magnifying-glass.svg" alt="Pretraga" style="width: 16px; vertical-align: middle;">
      <span>Primeni</span>
    </button>
    <button id="resetujSortiranjeKategorijeBtn">
      <img src="../../accessories/restart-arrow.svg" alt="Reset" style="width: 16px; vertical-align: middle;">
      <span>Resetuj</span>
    </button>
    </div>
  </div>

    <table class="admin-table" id="kategorijeTabela">
      <thead>
        <tr>
          <th>ID_KATEGORIJA</th>
          <th>Naziv</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

    <h2 style="text-align:center;">Podkategorije</h2>
    <div class="proizvodi-top-bar">
      <div class="search-wrapper">
        <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
        <input type="text" id="searchPodkategorijaInput" placeholder="Pretraži po nazivu..." />
        <img src="../../accessories/menu-list.svg" class="search-right-icon" id="meniPodkategorije" alt="Meni" />
      </div>
      <button id="dodajPodkategorijuBtn" class="btn-dodaj">➕ Dodaj novu podkategoriju</button>
    </div>

    <div id="podkategorije-filter-panel" class="filter-panel" style="display: none;">
      <div class="filter-row">
        <label>Sortiraj po:</label>
        <select id="sortirajPodkategorije">
          <option value="">-- Izaberi --</option>
          <option value="naziv_asc">Naziv (A-Z)</option>
          <option value="naziv_desc">Naziv (Z-A)</option>
          <option value="id_asc">ID (rastuce)</option>
          <option value="id_desc">ID (opadajuće)</option>
        </select>
      </div>

    <div class="filter-actions">
        <button id="primeniSortiranjePodkategorijeBtn">
          <img src="../../accessories/magnifying-glass.svg" alt="Pretraga" style="width: 16px; vertical-align: middle;">
          <span>Primeni</span>
        </button>
        <button id="resetujSortiranjePodkategorijeBtn">
          <img src="../../accessories/restart-arrow.svg" alt="Reset" style="width: 16px; vertical-align: middle;">
          <span>Resetuj</span>
        </button>
      </div>
    </div>

    <table class="admin-table" id="podkategorijeTabela">
      <thead>
        <tr>
          <th>ID_PODKATEGORIJA</th>
          <th>ID_KATEGORIJA</th>
          <th>Naziv</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  // Prikaz kategorija
  fetch(`${API_BASE_URL}/api/kategorije`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#kategorijeTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td>
              <img src="../../accessories/trash-can.svg" 
              class="icon-trash-kategorija" 
              data-id="${row[0]}" 
              style="cursor:pointer; width:20px;" 
              title="Obriši kategoriju" />

               <img src="../../accessories/settings.svg" 
              class="icon-edit-kategorija" 
              data-id="${row[0]}" 
              data-naziv="${row[1]}"
              style="cursor:pointer; width:20px;" 
              title="Izmeni kategoriju" />

          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch kategorija:", err);
    });

  // Prikaz podkategorija
  fetch(`${API_BASE_URL}/api/podkategorije`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#podkategorijeTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td>
              <img src="../../accessories/trash-can.svg" 
                class="icon-trash-podkategorija" 
                data-id="${row[0]}" 
                style="cursor:pointer; width:20px;" 
                title="Obriši podkategoriju" />

              <img src="../../accessories/settings.svg" 
                  class="icon-settings-kategorija" 
                  data-id="${row[0]}" 
                  style="cursor:pointer; width:20px;" 
                  title="Izmeni kategoriju" />
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch podkategorija:", err);
    });

  // Prikaz filtiranja Kategorije
  // Omogući prikaz/sakrivanje filter panela za kategorije
  const meniKategorije = document.getElementById('meniKategorije');
  const filterKategorijePanel = document.getElementById('kategorije-filter-panel');

  if (meniKategorije && filterKategorijePanel) {
    meniKategorije.addEventListener('click', () => {
      filterKategorijePanel.style.display =
        (filterKategorijePanel.style.display === 'none') ? 'block' : 'none';
    });
  }

  //Sortiranje kategorija
  document.getElementById('primeniSortiranjeKategorijeBtn').addEventListener('click', () => {
    const kriterijum = document.getElementById('sortirajKategorije').value;
    prikaziKategorije(kriterijum);
  });

  document.getElementById('resetujSortiranjeKategorijeBtn').addEventListener('click', () => {
    document.getElementById('sortirajKategorije').value = '';
    prikaziKategorije();
  });

  //Prikaz filtiranja PodKategorije
  const meniPodkategorije = document.getElementById('meniPodkategorije');
  const filterPodkategorijePanel = document.getElementById('podkategorije-filter-panel');

  if (meniPodkategorije && filterPodkategorijePanel) {
    meniPodkategorije.addEventListener('click', () => {
      filterPodkategorijePanel.style.display =
        (filterPodkategorijePanel.style.display === 'none') ? 'block' : 'none';
    });
  }
  // Sortiranje podkategorija
  document.getElementById('primeniSortiranjePodkategorijeBtn').addEventListener('click', () => {
    const kriterijum = document.getElementById('sortirajPodkategorije').value;
    prikaziPodkategorije(kriterijum);
  });

  document.getElementById('resetujSortiranjePodkategorijeBtn').addEventListener('click', () => {
    document.getElementById('sortirajPodkategorije').value = '';
    prikaziPodkategorije();
  });

}