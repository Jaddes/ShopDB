// //Dugme za Listu Zelja/Wishlist
function prikaziListaZelja() {
  const container = document.querySelector('.content-placeholder');
  container.innerHTML = `
    <h2 style="text-align:center;">Liste želja</h2>

    <div class="proizvodi-top-bar">
      <div class="search-wrapper">
        <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
        <input type="text" id="searchWishlistInput" placeholder="Pretraži po kupcu...">
        <img src="../../accessories/menu-list.svg" class="search-right-icon" id="meniWishlist" alt="Meni" />
      </div>
    </div>

    <div id="wishlist-filter-panel" class="filter-panel" style="display: none;">
      <div class="filter-row">
        <label>Datum kreiranja (od - do):</label>
        <input type="date" id="wishlistDatumOd">
        <input type="date" id="wishlistDatumDo">
      </div>

      <div class="filter-actions">
        <button id="primeniWishlistFiltereBtn">
          <img src="../../accessories/magnifying-glass.svg" alt="Pretraga" style="width: 16px; vertical-align: middle;">
          <span>Pretraži</span>
        </button>
        <button id="resetujWishlistFiltereBtn">
          <img src="../../accessories/restart-arrow.svg" alt="Reset" style="width: 16px; vertical-align: middle;">
          <span>Restartuj</span>
        </button>
      </div>
    </div>

    <table class="admin-table" id="wishlistTabela">
      <thead>
        <tr>
          <th>ID_WISHLIST</th>
          <th>ID_KUPAC</th>
          <th>Kupac</th>
          <th>Datum kreiranja</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

    <h2 style="text-align:center;">Sve stavke u listama želja</h2>

    <div class="proizvodi-top-bar">
      <div class="search-wrapper">
        <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
        <input type="text" id="searchStavkaWishlistInput" placeholder="Pretraži po nazivu proizvoda...">
      </div>
    </div>


    <table class="admin-table" id="stavkeWishlistTabela">
      <thead>
        <tr>
          <th>ID_STAVKA</th>
          <th>ID_WISHLIST</th>
          <th>ID_PROIZVOD</th>
          <th>Naziv proizvoda</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  // Prikaži panel filter
  const meni = document.getElementById('meniWishlist');
  const panel = document.getElementById('wishlist-filter-panel');
  if (meni && panel) {
    meni.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Stavke Liste
  const searchInput = document.getElementById('searchStavkaWishlistInput');
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#stavkeWishlistTabela tbody tr');
    rows.forEach(row => {
      const naziv = row.cells[3].textContent.toLowerCase();
      row.style.display = naziv.includes(term) ? '' : 'none';
    });
  });

  // Prikaži sve liste želja
  fetch(`${API_BASE_URL}/api/wishlist`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#wishlistTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td>${row[3]}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch želja:", err);
    });

  // Prikaži sve stavke iz svih listi želja
  fetch(`${API_BASE_URL}/api/stavke_wishlist`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#stavkeWishlistTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.ID_STAVKA}</td>
          <td>${row.ID_WISHLIST}</td>
          <td>${row.ID_PROIZVOD}</td>
          <td>${row.NAZIV_PROIZVODA}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch svih stavki liste želja:", err);
    });
}
