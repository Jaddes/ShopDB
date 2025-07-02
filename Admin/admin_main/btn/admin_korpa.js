
// Dugme za korpu
function prikaziKorpe() {
  const container = document.querySelector('.content-placeholder');
  container.innerHTML = `
    <h2 style="text-align:center;">Korpe</h2>

    <div class="proizvodi-top-bar">
      <div class="search-wrapper">
        <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
        <input type="text" id="searchKorpaInput" placeholder="Pretraži po kupcu..." />
        <img src="../../accessories/menu-list.svg" class="search-right-icon" id="meniKorpa" alt="Meni" />
      </div>
    </div>

    <div id="korpe-filter-panel" class="filter-panel" style="display: none;">
      <div class="filter-row">
        <label>Kupac (ime/prezime/email):</label>
        <input type="text" id="filterKupacKorpa" placeholder="Unesi podatke o kupcu">
      </div>

      <div class="filter-row">
        <label>Datum kreiranja:</label>
        <input type="date" id="filterDatumKorpa">
      </div>

      <div class="filter-actions">
        <button id="primeniKorpeFiltereBtn">
          <img src="../../accessories/magnifying-glass.svg" alt="Pretraga" style="width: 16px; vertical-align: middle;">
          <span>Pretraži</span>
        </button>
        <button id="resetujKorpeFiltereBtn">
          <img src="../../accessories/restart-arrow.svg" alt="Reset" style="width: 16px; vertical-align: middle;">
          <span>Restartuj</span>
        </button>
      </div>
    </div>

    <table class="admin-table" id="korpaTabela">
      <thead>
        <tr>
          <th>ID_KORPA</th>
          <th>ID_KUPAC</th>
          <th>Kupac</th>
          <th>Datum kreiranja</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

    <h2 style="text-align:center;">Sve stavke u korpama</h2>

    <div class="proizvodi-top-bar">
      <div class="search-wrapper">
        <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
        <input type="text" id="searchStavkaKorpaInput" placeholder="Pretraži po nazivu proizvoda..." />
        <img src="../../accessories/menu-list.svg" class="search-right-icon" id="meniStavkaKorpa" alt="Meni" />
      </div>
    </div>

    <div id="stavke-korpe-filter-panel" class="filter-panel" style="display: none;">
      <div class="filter-row">
        <label>Količina:</label>
        <input type="number" id="kolicinaMinInput" placeholder="Min">
        <input type="number" id="kolicinaMaxInput" placeholder="Max">
      </div>

      <div class="filter-actions">
        <button id="primeniStavkeKorpeFiltereBtn">
          <img src="../../accessories/magnifying-glass.svg" alt="Pretraga" style="width: 16px; vertical-align: middle;">
          <span>Pretraži</span>
        </button>
        <button id="resetujStavkeKorpeFiltereBtn">
          <img src="../../accessories/restart-arrow.svg" alt="Reset" style="width: 16px; vertical-align: middle;">
          <span>Restartuj</span>
        </button>
      </div>
</div>

    <table class="admin-table" id="stavkeKorpeTabela">
      <thead>
        <tr>
          <th>ID_STAVKA</th>
          <th>ID_KORPA</th>
          <th>ID_PROIZVOD</th>
          <th>Naziv proizvoda</th>
          <th>Količina</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;
  //Filter Korpa
  const meniKorpa = document.getElementById('meniKorpa');
  const filterKorpePanel = document.getElementById('korpe-filter-panel');

  if (meniKorpa && filterKorpePanel) {
    meniKorpa.addEventListener('click', () => {
      filterKorpePanel.style.display =
        filterKorpePanel.style.display === 'none' ? 'block' : 'none';
    });
  }

  //Filter Stavke Korpe
  const meniStavkaKorpa = document.getElementById('meniStavkaKorpa');
  const filterStavkeKorpePanel = document.getElementById('stavke-korpe-filter-panel');

  if (meniStavkaKorpa && filterStavkeKorpePanel) {
    meniStavkaKorpa.addEventListener('click', () => {
      filterStavkeKorpePanel.style.display =
        filterStavkeKorpePanel.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Učitaj korpe
  fetch(`${API_BASE_URL}/api/korpe`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#korpaTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.ID_KORPA}</td>
          <td>${row.ID_KUPAC}</td>
          <td>${row.KUPAC}</td>
          <td>${row.DATUM}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch korpi:", err);
    });

  // Učitaj sve stavke svih korpi
  fetch(`${API_BASE_URL}/api/stavke_korpe`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#stavkeKorpeTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.ID_STAVKA}</td>
          <td>${row.ID_KORPA}</td>
          <td>${row.ID_PROIZVOD}</td>
          <td>${row.NAZIV_PROIZVODA}</td>
          <td>${row.KOLICINA}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch stavki korpi:", err);
    });
}

