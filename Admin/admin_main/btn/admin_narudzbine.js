
//Dugme za Narudzbine
function prikaziNarudzbine() {
  const container = document.querySelector('.content-placeholder');

  container.innerHTML = `
    <h2 style="text-align:center;">Narudžbine</h2>

    <div class="proizvodi-top-bar">
          <div class="search-wrapper">
            <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
            <input type="text" id="searchNarudzbinaInput" placeholder="Pretraži po Korisniku..." />
            <img src="../../accessories/menu-list.svg" class="search-right-icon" id="meniNarudzbina" alt="Meni" />
          </div>
        </div>

        <div id="narudzbine-filter-panel" class="filter-panel" style="display: none;">
      <div class="filter-row">
        <label>Kupac (ime/prezime/email):</label>
        <input type="text" id="filterKupacNarudzbina" placeholder="Unesi podatke o kupcu">
      </div>

      <div class="filter-row">
        <label>Status:</label>
        <select id="filterStatusNarudzbina">
          <option value="">-- Sve --</option>
          <!-- JS dopunjuje iz baze -->
        </select>
      </div>

      <div class="filter-row">
        <label>Dostava:</label>
        <select id="filterDostavaNarudzbina">
          <option value="">-- Sve --</option>
          <!-- JS dopunjuje iz baze -->
        </select>
      </div>

      <div class="filter-row">
        <label>Cena dostave:</label>
        <div class="dual-slider-container">
          <input type="range" id="dostavaCenaMin" min="0" max="2000" value="0" step="100" class="dual-range">
          <input type="range" id="dostavaCenaMax" min="0" max="2000" value="2000" step="100" class="dual-range">
          <div class="slider-track-filled" id="dostavaTrack"></div>
        </div>
        <div class="inputs-container">
          <input type="number" id="dostavaCenaMinInput" value="0">
          <span> - </span>
          <input type="number" id="dostavaCenaMaxInput" value="2000">
          <span> RSD</span>
        </div>
      </div>

      <div class="filter-row">
        <label>Ukupan iznos:</label>
        <div class="dual-slider-container">
          <input type="range" id="ukupnoCenaMin" min="0" max="100000" value="0" step="1000" class="dual-range">
          <input type="range" id="ukupnoCenaMax" min="0" max="100000" value="100000" step="1000" class="dual-range">
          <div class="slider-track-filled" id="ukupnoTrack"></div>
        </div>
        <div class="inputs-container">
          <input type="number" id="ukupnoCenaMinInput" value="0">
          <span> - </span>
          <input type="number" id="ukupnoCenaMaxInput" value="100000">
          <span> RSD</span>
        </div>
      </div>

      <div class="filter-actions">
        <button id="primeniNarudzbineFiltereBtn">
          <img src="../../accessories/magnifying-glass.svg" alt="Pretraga" style="width: 16px; vertical-align: middle;">
          <span>Pretraži</span>
        </button>
        <button id="resetujNarudzbineFiltereBtn">
          <img src="../../accessories/restart-arrow.svg" alt="Reset" style="width: 16px; vertical-align: middle;">
          <span>Restartuj</span>
        </button>
      </div>
    </div>


    <table class="admin-table" id="narudzbineTabela">
      <thead>
        <tr>
          <th>ID_N</th>
          <th>ID_KUPAC</th>
          <th>Kupac</th>
          <th>Datum naručivanja</th>
          <th>Status</th>
          <th>Dostava</th>
          <th>Cena dostave</th>
          <th>Ukupno</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

    <h2 style="text-align:center;">Sve stavke narudžbina</h2>

    <div class="proizvodi-top-bar">
        <div class="search-wrapper">
          <img src="../../accessories/magnifying-glass.svg" class="search-left-icon" alt="Search" />
          <input type="text" id="searchStavkaNarudzbinaInput" placeholder="Pretraži po Korisniku..." />
          <img src="../../accessories/menu-list.svg" class="search-right-icon" id="meniStavkaNarudzbina" alt="Meni" />
        </div>
      </div>

    <div id="stavke-filter-panel" class="filter-panel" style="display: none;">
      <div class="filter-row">
        <label>Naziv proizvoda:</label>
        <input type="text" id="filterNazivProizvodaStavka" placeholder="Unesi naziv">
      </div>

      <div class="filter-row">
        <label>Količina:</label>
        <input type="number" id="filterKolicinaMin" placeholder="Min">
        <input type="number" id="filterKolicinaMax" placeholder="Max">
      </div>

      <div class="filter-row">
        <label>Cena po komadu:</label>
        <div class="dual-slider-container">
          <input type="range" id="cenaKomadMin" min="0" max="10000" value="0" step="100" class="dual-range">
          <input type="range" id="cenaKomadMax" min="0" max="10000" value="10000" step="100" class="dual-range">
          <div class="slider-track-filled" id="komadTrack"></div>
        </div>
        <div class="inputs-container">
          <input type="number" id="cenaKomadMinInput" value="0">
          <span> - </span>
          <input type="number" id="cenaKomadMaxInput" value="10000">
          <span> RSD</span>
        </div>
      </div>

      <div class="filter-row">
        <label>Ukupna cena:</label>
        <div class="dual-slider-container">
          <input type="range" id="ukupnaCenaStavkaMin" min="0" max="100000" value="0" step="1000" class="dual-range">
          <input type="range" id="ukupnaCenaStavkaMax" min="0" max="100000" value="100000" step="1000" class="dual-range">
          <div class="slider-track-filled" id="ukupnaStavkaTrack"></div>
        </div>
        <div class="inputs-container">
          <input type="number" id="ukupnaCenaStavkaMinInput" value="0">
          <span> - </span>
          <input type="number" id="ukupnaCenaStavkaMaxInput" value="100000">
          <span> RSD</span>
        </div>
      </div>

      <div class="filter-actions">
        <button id="primeniStavkeFiltereBtn">
          <img src="../../accessories/magnifying-glass.svg" alt="Pretraga" style="width: 16px; vertical-align: middle;">
          <span>Pretraži</span>
        </button>
        <button id="resetujStavkeFiltereBtn">
          <img src="../../accessories/restart-arrow.svg" alt="Reset" style="width: 16px; vertical-align: middle;">
          <span>Restartuj</span>
        </button>
      </div>
    </div>


    <table class="admin-table" id="stavkeTabela">
      <thead>
        <tr>
          <th>ID_STAVKA</th>
          <th>ID_NARUDZBINE</th>
          <th>ID_PROIZVOD</th>
          <th>NAZIV PROIZVODA</th>
          <th>KOLIČINA</th>
          <th>CENA PO KOMADU</th>
          <th>UKUPNA CENA</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  //Narudzbina filter opcija
  const meniNarudzbina = document.getElementById('meniNarudzbina');
  const filterNarudzbinePanel = document.getElementById('narudzbine-filter-panel');

  if (meniNarudzbina && filterNarudzbinePanel) {
    meniNarudzbina.addEventListener('click', () => {
      filterNarudzbinePanel.style.display =
        filterNarudzbinePanel.style.display === 'none' ? 'block' : 'none';
    });
  }

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

    update(); // inicijalno pozivanje
  }

  poveziSliderInput(
    document.getElementById('dostavaCenaMin'),
    document.getElementById('dostavaCenaMax'),
    document.getElementById('dostavaCenaMinInput'),
    document.getElementById('dostavaCenaMaxInput'),
    document.getElementById('dostavaTrack')
  );

  poveziSliderInput(
    document.getElementById('ukupnoCenaMin'),
    document.getElementById('ukupnoCenaMax'),
    document.getElementById('ukupnoCenaMinInput'),
    document.getElementById('ukupnoCenaMaxInput'),
    document.getElementById('ukupnoTrack')
  );

  // Stavke Narudzbine filter
  const meniStavkaNarudzbina = document.getElementById('meniStavkaNarudzbina');
  const filterStavkePanel = document.getElementById('stavke-filter-panel');

  if (meniStavkaNarudzbina && filterStavkePanel) {
    meniStavkaNarudzbina.addEventListener('click', () => {
      filterStavkePanel.style.display =
        filterStavkePanel.style.display === 'none' ? 'block' : 'none';
    });
  }

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

    update(); // inicijalno pozivanje
  }


  // Slider za cena po komadu
  poveziSliderInput(
    document.getElementById('cenaKomadMin'),
    document.getElementById('cenaKomadMax'),
    document.getElementById('cenaKomadMinInput'),
    document.getElementById('cenaKomadMaxInput'),
    document.getElementById('komadTrack')
  );

  // Slider za ukupnu cenu
  poveziSliderInput(
    document.getElementById('ukupnaCenaStavkaMin'),
    document.getElementById('ukupnaCenaStavkaMax'),
    document.getElementById('ukupnaCenaStavkaMinInput'),
    document.getElementById('ukupnaCenaStavkaMaxInput'),
    document.getElementById('ukupnaStavkaTrack')
  );


  fetch(`${API_BASE_URL}/api/narudzbine`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#narudzbineTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.ID_NARUDZBINA}</td>
          <td>${row.ID_KUPAC}</td>
          <td>${row.KUPAC}</td>
          <td>${row.DATUM}</td>
          <td>${row.STATUS}</td>
          <td>${row.DOSTAVA}</td>
          <td>${row.CENA_DOSTAVE}</td>
          <td>${row.UKUPNO}</td>
        `;
        tbody.appendChild(tr);
      });
    });

  // OVDE SE POZIVA PRIKAZ SVIH STAVKI
  fetch(`${API_BASE_URL}/api/stavke_narudzbine`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#stavkeTabela tbody');
      data.forEach(stavka => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${stavka.ID_STAVKA}</td>
          <td>${stavka.ID_NARUDZBINA}</td>
          <td>${stavka.ID_PROIZVOD}</td>
          <td>${stavka.NAZIV_PROIZVODA}</td>
          <td>${stavka.KOLICINA}</td>
          <td>${stavka.CENA_PO_KOMADU}</td>
          <td>${stavka.UKUPNO}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}