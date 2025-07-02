
// //Dugme za Proizvode
function prikaziProizvode() {
  const container = document.querySelector('.content-placeholder');
  container.innerHTML = `
    <h2 style="text-align:center;">Proizvodi</h2>
    <div class="proizvodi-top-bar">
      <div class="search-wrapper">
        <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
        <input type="text" id="searchProizvodInput" placeholder="Pretraži po nazivu..." />
        <img src="../../accessories/menu-list.svg" class="search-right-icon" alt="Meni" />
      </div>
      <button id="dodajProizvodBtn" class="btn-dodaj">➕ Dodaj novi proizvod</button>
    </div>

    <div id="formaDodajProizvod" style="margin-top: 20px;"></div>

    <div id="filter-panel" class="filter-panel" style="display: none;">
      <div class="filter-row">
        <label>Podkategorija:</label>
        <select id="filterPodkategorija">
          <option value="">-- Sve --</option>
        </select>
      </div>

      <div class="filter-row">
        <label>Boja:</label>
        <select id="filterBoja">
          <option value="">-- Sve --</option>
        </select>
      </div>

      <div class="filter-row">
        <label>Oznaka:</label>
        <select id="filterOznaka">
          <option value="">-- Sve --</option>
        </select>
      </div>

      <div class="filter-row">
        <label>Datum nabavke:</label>
        <input type="date" id="filterDatumOd">
        <input type="date" id="filterDatumDo">
      </div>

      <!-- NABAVNA CENA -->
      <div class="filter-row">
        <label>Nabavna cena:</label>
        <div class="dual-slider-container">
          <input type="range" id="nabavnaCenaMin" min="0" max="10000" value="0" step="100" class="dual-range">
          <input type="range" id="nabavnaCenaMax" min="0" max="10000" value="10000" step="100" class="dual-range">
          <div class="slider-track-filled" id="nabavnaTrack"></div>
        </div>
        <div class="inputs-container">
          <input type="number" id="nabavnaCenaMinInput" value="0">
          <span> - </span>
          <input type="number" id="nabavnaCenaMaxInput" value="10000">
          <span> RSD</span>
        </div>
      </div>

      <!-- PRODAJNA CENA -->
      <div class="filter-row">
        <label>Prodajna cena:</label>
        <div class="dual-slider-container">
          <input type="range" id="prodajnaCenaMin" min="0" max="10000" value="0" step="100" class="dual-range">
          <input type="range" id="prodajnaCenaMax" min="0" max="10000" value="10000" step="100" class="dual-range">
          <div class="slider-track-filled" id="prodajnaTrack"></div>
        </div>
        <div class="inputs-container">
          <input type="number" id="prodajnaCenaMinInput" value="0">
          <span> - </span>
          <input type="number" id="prodajnaCenaMaxInput" value="10000">
          <span> RSD</span>
        </div>
      </div>

      <div class="filter-row">
        <label>Količina:</label>
        <input type="number" id="filterKolicinaMin" placeholder="Min">
        <input type="number" id="filterKolicinaMax" placeholder="Max">
      </div>

      <div class="filter-row">
        <label><input type="checkbox" id="filterAkcija"> Samo na akciji</label>
      </div>

      <div class="filter-actions">
        <button id="primeniFiltereBtn">
        <img src="../../accessories/magnifying-glass.svg" alt="Pretraga" style="width: 16px; vertical-align: middle;">
        <span>Pretraži</span>
      </button>
      <button id="resetujFiltereBtn">
        <img src="../../accessories/restart-arrow.svg" alt="Reset" style="width: 16px; vertical-align: middle;">
        <span>Restartuj</span>
      </button>
      </div>
    </div>

    <div class="table-container">
      <table class="admin-table" id="proizvodiTabela">
        <thead>
          <tr>
            <th>ID_P</th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Podkategorija</th>
            <th>Boja</th>
            <th>Oznaka</th>
            <th>Slika</th>
            <th>Datum nabavke</th>
            <th>Nabavna cena</th>
            <th>Prodajna cena</th>
            <th>Količina</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  `;
  //FILTER

  // Omogući prikaz/sakrivanje filter panela pri kliku na meni ikonicu
  const menuIcon = document.querySelector('.search-right-icon');
  const filterPanel = document.getElementById('filter-panel');

  if (menuIcon && filterPanel) {
    menuIcon.addEventListener('click', () => {
      filterPanel.style.display = (filterPanel.style.display === 'none') ? 'block' : 'none';
    });
  }

  // Scroll bar za cene
  function poveziSliderInput(sliderMin, sliderMax, inputMin, inputMax, track) {
    function update() {
      inputMin.value = sliderMin.value;
      inputMax.value = sliderMax.value;

      const min = parseInt(sliderMin.value);
      const max = parseInt(sliderMax.value);
      const total = parseInt(sliderMin.max) - parseInt(sliderMin.min);
      const left = ((min - parseInt(sliderMin.min)) / total) * 100;
      const right = ((max - parseInt(sliderMin.min)) / total) * 100;

      track.style.left = `${left}%`;
      track.style.width = `${right - left}%`;
    }

    sliderMin.addEventListener('input', update);
    sliderMax.addEventListener('input', update);
    inputMin.addEventListener('input', () => {
      sliderMin.value = inputMin.value;
      update();
    });
    inputMax.addEventListener('input', () => {
      sliderMax.value = inputMax.value;
      update();
    });

    update(); // inicijalno
    }

    // Poziv za NABAVNU
    poveziSliderInput(
      document.getElementById('nabavnaCenaMin'),
      document.getElementById('nabavnaCenaMax'),
      document.getElementById('nabavnaCenaMinInput'),
      document.getElementById('nabavnaCenaMaxInput'),
      document.getElementById('nabavnaTrack')
    );

    // Poziv za PRODAJNU
    poveziSliderInput(
      document.getElementById('prodajnaCenaMin'),
      document.getElementById('prodajnaCenaMax'),
      document.getElementById('prodajnaCenaMinInput'),
      document.getElementById('prodajnaCenaMaxInput'),
      document.getElementById('prodajnaTrack')
    );

  fetch(`${API_BASE_URL}/api/proizvodi`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#proizvodiTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.ID_PROIZVOD}</td>
          <td>${row.NAZIV}</td>
          <td>${row.OPIS}</td>
          <td>${row.PODKATEGORIJA}</td>
          <td>${row.BOJA || ''}</td>
          <td>${row.OZNAKA || ''}</td>
          <td><img src="${row.SLIKA_URL || ''}" alt="slika" style="width:40px;height:40px;"></td>
          <td>${row.DATUM_NABAVKE}</td>
          <td>${row.NABAVNA_CENA}</td>
          <td>${row.PRODAJNA_CENA}</td>
          <td>${row.KOLICINA}</td>
          <td>
              <img src="../../accessories/trash-can.svg" 
              class="icon-trash-proizvod" 
              data-id="${row.ID_PROIZVOD}" 
              style="cursor:pointer; width:20px;" 
              title="Obriši proizvod" />

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
      console.error("❌ Greška u fetch proizvoda:", err);
    });

  // Dodavanje novog prozivoda
  document.getElementById('dodajProizvodBtn').addEventListener('click', () => {
    const formaDiv = document.getElementById('formaDodajProizvod');

    if (formaDiv.innerHTML.trim() !== "") return; // Ako forma već postoji, ne dodaj je ponovo

    formaDiv.innerHTML = `
      <div class="modal-content custom-modal-form-grid">
        <h3 class="form-title" style="grid-column: span 2;">Dodaj novi proizvod</h3>

        <!-- Levi blok -->
        <input type="text" id="noviNaziv" placeholder="Naziv proizvoda" class="form-input" />
        <textarea id="noviOpis" placeholder="Opis proizvoda" class="form-textarea"></textarea>

        <select id="noviPodkategorija" class="form-select">
          <option value="">-- Odaberi podkategoriju --</option>
        </select>
        <input type="text" id="noviSlikaUrl" placeholder="URL slike" class="form-input" />

        <select id="noviBoja" class="form-select">
          <option value="">-- Odaberi boju --</option>
        </select>
        <input type="date" id="noviDatumNabavke" class="form-input" />

        <select id="noviOznaka" class="form-select">
          <option value="">-- Odaberi oznaku --</option>
        </select>
        <input type="number" id="noviNabavnaCena" placeholder="Nabavna cena" class="form-input" />

        <input type="number" id="noviProdajnaCena" placeholder="Prodajna cena" class="form-input" />
        <input type="number" id="noviKolicina" placeholder="Količina" class="form-input" />

        <!-- Dugmad -->
        <div class="buttons" style="grid-column: span 2; display: flex; justify-content: center; gap: 20px;">
          <button id="potvrdiDodavanjeBtn" class="btn-dodaj">➕ Dodaj</button>
          <button id="zatvoriDodavanjeBtn" class="btn-otkazi">Otkaži</button>
        </div>
      </div>
    `;

    // Napuni <select> elemente (boje, oznake, podkategorije)
    popuniDropdownoveZaDodavanje();

    // Sakrij formu ako klikneš "Otkaži"
    document.getElementById('zatvoriDodavanjeBtn').addEventListener('click', () => {
      formaDiv.innerHTML = "";
    });

    // Ovde će ići logika za POST ka serveru (kasnije)
  });


  // Zatvaranje novog proizvoda
  document.getElementById('dodajProizvodBtn').addEventListener('click', () => {
    const modal = document.getElementById('dodajProizvodModal');
    modal.style.display = 'flex';

    // Ovde smeš da dodaš event listener jer dugme sad postoji
    const zatvoriBtn = document.getElementById('zatvoriDodavanjeBtn');
    if (zatvoriBtn) {
      zatvoriBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    popuniDropdownoveZaDodavanje();
  });

  

  // Search Bar
  document.getElementById('searchProizvodInput').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const rows = document.querySelectorAll('#proizvodiTabela tbody tr');

  rows.forEach(row => {
    const naziv = row.children[1].textContent.toLowerCase(); // kolona "Naziv"
    row.style.display = naziv.includes(searchTerm) ? '' : 'none';
  });
  });

  document.getElementById('dodajProizvodBtn').addEventListener('click', () => {
  document.getElementById('dodajProizvodModal').style.display = 'flex';
  popuniDropdownoveZaDodavanje(); // 🔁 učitaj sve opcije
  });

}

async function popuniDropdownoveZaDodavanje() {
  // Podkategorije
  try {
    const resPK = await fetch(`${API_BASE_URL}/api/podkategorije`);
    const podkategorije = await resPK.json();
    const selectPK = document.getElementById('noviPodkategorija');
    podkategorije.forEach(pk => {
      const option = document.createElement('option');
      option.value = pk[0]; // ID
      option.textContent = pk[2]; // Naziv
      selectPK.appendChild(option);
    });
  } catch (err) {
    console.error("❌ Greška podkategorije:", err);
  }

  // Boje
  try {
    const resB = await fetch(`${API_BASE_URL}/api/boje`);
    const boje = await resB.json();
    const selectB = document.getElementById('noviBoja');
    boje.forEach(b => {
      const option = document.createElement('option');
      option.value = b[0];
      option.textContent = b[1];
      selectB.appendChild(option);
    });
  } catch (err) {
    console.error("❌ Greška boje:", err);
  }

  // Oznake
  try {
    const resO = await fetch(`${API_BASE_URL}/api/oznake`);
    const oznake = await resO.json();
    const selectO = document.getElementById('noviOznaka');
    oznake.forEach(o => {
      const option = document.createElement('option');
      option.value = o[0];
      option.textContent = o[1];
      selectO.appendChild(option);
    });
  } catch (err) {
    console.error("❌ Greška oznake:", err);
  }
}

