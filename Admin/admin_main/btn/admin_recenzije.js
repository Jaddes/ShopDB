// //Dugme za Recenziju
function prikaziRecenzije() {
  const container = document.querySelector('.content-placeholder');
  container.innerHTML = `
    <h2 style="text-align:center;">Recenzije</h2>

    <div class="proizvodi-top-bar">
      <div class="search-wrapper">
        <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
        <input type="text" id="searchRecenzijaInput" placeholder="Pretraži po kupcu...">
        <img src="../../accessories/menu-list.svg" class="search-right-icon" id="meniRecenzija" alt="Meni" />
      </div>
    </div>

    <div id="recenzije-filter-panel" class="filter-panel" style="display: none;">
      <div class="filter-row">
        <label>Pretraga po proizvodu:</label>
        <input type="text" id="filterProizvodRecenzija" placeholder="Unesi naziv proizvoda">
      </div>

      <div class="filter-row">
        <label>Ocena:</label>
        <input type="number" id="ocenaMinInput" placeholder="Min (1)" min="1" max="5">
        <input type="number" id="ocenaMaxInput" placeholder="Max (5)" min="1" max="5">
      </div>

      <div class="filter-row">
        <label>Datum (od - do):</label>
        <input type="date" id="datumOdInput">
        <input type="date" id="datumDoInput">
      </div>

      <div class="filter-actions">
        <button id="primeniRecenzijeFiltereBtn">
          <img src="../../accessories/magnifying-glass.svg" alt="Pretraga" style="width: 16px; vertical-align: middle;">
          <span>Pretraži</span>
        </button>
        <button id="resetujRecenzijeFiltereBtn">
          <img src="../../accessories/restart-arrow.svg" alt="Reset" style="width: 16px; vertical-align: middle;">
          <span>Restartuj</span>
        </button>
      </div>
    </div>

    <table class="admin-table" id="recenzijeTabela">
      <thead>
        <tr>
          <th>ID_RECENZIJA</th>
          <th>ID_KUPAC</th>
          <th>Kupac</th>
          <th>ID_PROIZVOD</th>
          <th>Proizvod</th>
          <th>Ocena</th>
          <th>Komentar</th>
          <th>Datum</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  // Panel toggle
  const meni = document.getElementById('meniRecenzija');
  const panel = document.getElementById('recenzije-filter-panel');
  if (meni && panel) {
    meni.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Učitavanje podataka
  fetch(`${API_BASE_URL}/api/recenzije`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#recenzijeTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td>${row[3]}</td>
          <td>${row[4]}</td>
          <td>${row[5]}</td>
          <td>${row[6]}</td>
          <td>${row[7]}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch recenzija:", err);
    });
}

