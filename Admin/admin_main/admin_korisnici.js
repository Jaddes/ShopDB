
async function prikaziKorisnike() {
  const container = document.querySelector('.content-placeholder');

  // Resetuj sadržaj da bi se sve prikazalo ponovo
  container.innerHTML = `
    <h2 style="text-align:center;">Korisnici</h2>
    <div class="proizvodi-top-bar">
      <div class="search-wrapper">
        <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
        <input type="text" id="searchKorisniciInput" placeholder="Pretraži po imenu..." />
        <img src="../../accessories/menu-list.svg" class="search-right-icon" id="meniKorisnici" alt="Meni" />
      </div>
    </div>

    <div id="korisnici-filter-panel" class="filter-panel" style="display: none;">
      <div class="filter-row">
        <label>Pretraga po imenu:</label>
        <input type="text" id="filterIme" placeholder="Unesi ime">
      </div>

    <div class="filter-row">
      <label>Pretraga po prezimenu:</label>
      <input type="text" id="filterPrezime" placeholder="Unesi prezime">
    </div>

    <div class="filter-row">
      <label>Email adresa:</label>
      <input type="text" id="filterEmail" placeholder="Unesi email">
    </div>

    <div class="filter-row">
      <label>Uloga:</label>
      <select id="filterUloga">
        <option value="">-- Sve --</option>
        <option value="ADMIN">Admin</option>
        <option value="KUPAC">Kupac</option>
      </select>
    </div>

    <div class="filter-row">
      <label>Datum rođenja:</label>
      <input type="date" id="filterDatumOd">
      <input type="date" id="filterDatumDo">
    </div>

    <div class="filter-row">
      <label><input type="checkbox" id="filterLogickiObrisani"> Prikaži logički obrisane</label>
    </div>

    <div class="filter-actions">
        <button id="primeniKorisnikFiltereBtn">
          <img src="../../accessories/magnifying-glass.svg" alt="Pretraga" style="width: 16px; vertical-align: middle;">
          <span>Pretraži</span>
        </button>
        <button id="resetujKorisnikFiltereBtn">
          <img src="../../accessories/restart-arrow.svg" alt="Reset" style="width: 16px; vertical-align: middle;">
          <span>Restartuj</span>
        </button>
      </div>
  </div>

    <table class="admin-table" id="korisniciTabela">
      <thead>
        <tr>
          <th>ID_K</th>
          <th>Ime</th>
          <th>Prezime</th>
          <th>Email</th>
          <th>Lozinka</th>
          <th>Uloga</th>
          <th>Datum registracije</th>
          <th>Akcija</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;
  // Prikaz Korisnika
  const menuKorisniciIcon = document.getElementById('meniKorisnici');
  const filterKorisniciPanel = document.getElementById('korisnici-filter-panel');

  if (menuKorisniciIcon && filterKorisniciPanel) {
    menuKorisniciIcon.addEventListener('click', () => {
      filterKorisniciPanel.style.display =
        filterKorisniciPanel.style.display === 'none' ? 'block' : 'none';
    });
  }

  try {
    const res = await fetch(`${window.API_BASE_URL}/api/korisnici`);
    const data = await res.json();

    const tbody = document.querySelector('#korisniciTabela tbody');
    data.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.id_korisnik}</td>
        <td>${row.ime}</td>
        <td>${row.prezime}</td>
        <td>${row.email}</td>
        <td>${row.lozinka}</td>
        <td>${row.uloga}</td>
        <td>${row.datum_registracije}</td>

      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("❌ Greška u fetch korisnika:", err);
  }
}