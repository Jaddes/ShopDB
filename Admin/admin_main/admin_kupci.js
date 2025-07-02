
// //Dugme za Kupce
function prikaziKupce() {
  const container = document.querySelector('.content-placeholder');
  container.innerHTML = `
    <h2 style="text-align:center;">Kupci</h2>

    <div class="proizvodi-top-bar">
      <div class="search-wrapper">
        <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
        <input type="text" id="searchKupacInput" placeholder="Pretraži po Korisniku..." />
        <img src="../../accessories/menu-list.svg" class="search-right-icon" id="meniKupac" alt="Meni" />
      </div>
    </div>

    <div id="kupci-filter-panel" class="filter-panel" style="display: none;">
      <div class="filter-row">
        <label>Korisnik (ime/prezime/email):</label>
        <input type="text" id="filterKorisnikKupac" placeholder="Unesi ime, prezime ili email">
      </div>
      <div class="filter-row">
        <label>Ulica:</label>
        <input type="text" id="filterUlicaKupac" placeholder="Unesi ulicu">
      </div>
      <div class="filter-row">
        <label>Broj:</label>
        <input type="text" id="filterBrojKupac" placeholder="Unesi broj">
      </div>
      <div class="filter-row">
        <label>Grad:</label>
        <input type="text" id="filterGradKupac" placeholder="Unesi grad">
      </div>
      <div class="filter-row">
        <label>Poštanski broj:</label>
        <input type="text" id="filterPostanskiKupac" placeholder="Unesi poštanski broj">
      </div>
      <div class="filter-row">
        <label>Telefon:</label>
        <input type="text" id="filterTelefonKupac" placeholder="Unesi broj telefona">
      </div>
      <div class="filter-actions">
        <button id="primeniKupciFiltereBtn">
          <img src="../../accessories/magnifying-glass.svg" alt="Pretraga" style="width: 16px; vertical-align: middle;">
          <span>Pretraži</span>
        </button>
        <button id="resetujKupciFiltereBtn">
          <img src="../../accessories/restart-arrow.svg" alt="Reset" style="width: 16px; vertical-align: middle;">
          <span>Restartuj</span>
        </button>
      </div>
    </div>

    <table class="admin-table" id="kupciTabela">
      <thead>
        <tr>
          <th>ID_KUPAC</th>
          <th>ID_KORISNIK</th>
          <th>Korisnik</th>
          <th>Ulica</th>
          <th>Broj</th>
          <th>Grad</th>
          <th>Poštanski broj</th>
          <th>Telefon</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  // Enable prikaz/sakrivanje panela
  const meniKupac = document.getElementById('meniKupac');
  const filterKupciPanel = document.getElementById('kupci-filter-panel');

  if (meniKupac && filterKupciPanel) {
    meniKupac.addEventListener('click', () => {
      filterKupciPanel.style.display =
        filterKupciPanel.style.display === 'none' ? 'block' : 'none';
    });
  }

  fetch(`${API_BASE_URL}/api/kupci`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#kupciTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.id_kupac}</td>
          <td>${row.id_korisnik}</td>
          <td>${row.ime} ${row.prezime}</td>
          <td>${row.ulica}</td>
          <td>${row.broj}</td>
          <td>${row.grad}</td>
          <td>${row.postanski_broj}</td>
          <td>${row.telefon}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch kupaca:", err);
    });
}