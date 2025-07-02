let selectedCategoryId = null;
let selectedPodkategorijaId = null;
let selectedUserId = null;       
let selectedProductId = null;   





document.addEventListener("scroll", function() {
    const footer = document.querySelector("footer");

    // Proverava da li je korisnik skrolovao do dna stranice
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)"; // Footer se prikazuje
    } else {
        footer.style.transform = "translateY(100%)"; // Footer ostaje sakriven
    }
});

// Pretraga proizvoda po nazivu
document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const nameElement = card.querySelector('.product-name');
    const productName = nameElement ? nameElement.textContent.toLowerCase() : '';

    // Prikaži proizvod ako sadrži unos iz pretrage
    if (productName.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});


 /* account dropdown */
 document.addEventListener('DOMContentLoaded', () => {
  // ---------- TOGGLE DROPDOWN ZA ACCOUNT IKONU ----------
  const accountDropdown = document.querySelector('.account-dropdown');
  const accountMenu = document.querySelector('.account-dropdown .account-menu');

  // accountDropdown.addEventListener('click', (e) => {
  //   e.stopPropagation(); // da klik ne „propagates” i ne zatvori meni odmah
  //   accountDropdown.classList.toggle('open');
  // });

  // Zatvori dropdown ako korisnik klikne van njega
  document.addEventListener('click', () => {
    accountDropdown.classList.remove('open');
  });

  // ---------- HANDLERI ZA LOGOUT MODAL ----------
  const logoutBtn = document.getElementById('logout-btn');
  const logoutModal = document.getElementById('logoutModal');
  const confirmLogout = logoutModal.querySelector('.confirm-logout');
  const cancelLogout = logoutModal.querySelector('.cancel-logout');

  // Otvori modal kad se klikne na “Izloguj se” u meniju
  logoutBtn.addEventListener('click', (e) => {
    e.stopPropagation();       // ne dozvoli da klik zatvori dropdown
    accountDropdown.classList.remove('open');
    logoutModal.style.display = 'block';
  });

  // Kad klikneš “Odustani” u modal-u, zatvori modal
  cancelLogout.addEventListener('click', () => {
    logoutModal.style.display = 'none';
  });

  // Kad klikneš na pozadinu modala, zatvori ga
  window.addEventListener('click', (e) => {
    if (e.target === logoutModal) {
      logoutModal.style.display = 'none';
    }
  });

  // Kad se potvrdi odjava, npr. brišemo token ili localStorage i vraćamo na login/početnu
  confirmLogout.addEventListener('click', () => {
    // Ovde obriši lokalne podatke korisnika, npr. localStorage.clear() ili samo token/ID
    // localStorage.clear();
    // Ili: localStorage.removeItem("userToken"); itd.

    // Preusmeri korisnika na stranicu za login ili glavnu
    window.location.href = '../main_site/main_site.html';
  });
});



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
        <td>
          <img src="../../accessories/trash-can.svg" 
              class="icon-trash" 
              data-id="${row.id_korisnik}" 
              style="cursor:pointer; width:20px;" 
              title="Obriši korisnika" />

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
  } catch (err) {
    console.error("❌ Greška u fetch korisnika:", err);
  }
}


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




// Logicko i Fizicko Brisanje


document.addEventListener('click', function (e) {
  // Korisnici
  if (e.target.classList.contains('icon-trash')) {
    selectedUserId = e.target.dataset.id;
    selectedProductId = null;
    selectedCategoryId = null;
    selectedPodkategorijaId = null;
    document.getElementById('deleteConfirmModal').style.display = 'block';
  }

  // Proizvodi
  else if (e.target.classList.contains('icon-trash-proizvod')) {
    selectedProductId = e.target.dataset.id;
    selectedUserId = null;
    selectedCategoryId = null;
    selectedPodkategorijaId = null;
    document.getElementById('deleteConfirmModal').style.display = 'block';
  }

  // Kategorije
  else if (e.target.classList.contains('icon-trash-kategorija')) {
    selectedCategoryId = e.target.dataset.id;
    selectedUserId = null;
    selectedProductId = null;
    selectedPodkategorijaId = null;
    document.getElementById('deleteConfirmModal').style.display = 'block';
  }

  // Podkategorije
  else if (e.target.classList.contains('icon-trash-podkategorija')) {
    selectedPodkategorijaId = e.target.dataset.id;
    selectedUserId = null;
    selectedProductId = null;
    selectedCategoryId = null;
    document.getElementById('deleteConfirmModal').style.display = 'block';
  }
});


document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
  document.getElementById('deleteConfirmModal').style.display = 'none';
});

function inicijalizujLogickoBrisanje() {
  document.getElementById('logicalDeleteBtn').addEventListener('click', async () => {
    try {
      if (selectedUserId) {
        const res = await fetch(`${window.API_BASE_URL}/api/korisnici/logicko_brisanje/${selectedUserId}`, { method: 'PUT' });
        if (res.ok) {
          alert("✅ Logički obrisan korisnik.");
          prikaziKorisnike();
        }
      } else if (selectedProductId) {
        const res = await fetch(`${window.API_BASE_URL}/api/proizvodi/logicko_brisanje/${selectedProductId}`, { method: 'PUT' });
        if (res.ok) {
          alert("✅ Proizvod logički obrisan.");
          prikaziProizvode();
        }
      } else if (selectedCategoryId) {
        const res = await fetch(`${window.API_BASE_URL}/api/kategorije/logicko_brisanje/${selectedCategoryId}`, { method: 'PUT' });
        if (res.ok) {
          alert("✅ Kategorija logički obrisana.");
          prikaziKatiPKat();  // ili prikaziKategorije(); - zavisno od tvoje funkcije za refresh
        }
      } else if (selectedPodkategorijaId) {
        const res = await fetch(`${window.API_BASE_URL}/api/podkategorije/logicko_brisanje/${selectedPodkategorijaId}`, { method: 'PUT' });
        if (res.ok) {
          alert("✅ Podkategorija logički obrisana.");
          prikaziKatiPKat();
        }
      }
    } catch (err) {
      console.error('❌ Greška pri logičkom brisanju:', err);
    }
    document.getElementById('deleteConfirmModal').style.display = 'none';
  });
}

function inicijalizujFizickoBrisanje() {
  document.getElementById('physicalDeleteBtn').addEventListener('click', async () => {
    try {
      if (selectedUserId) {
        const res = await fetch(`${window.API_BASE_URL}/api/korisnici/fizicko_brisanje/${selectedUserId}`, { method: 'DELETE' });
        if (res.ok) {
          alert("✅ Fizički obrisan korisnik.");
          prikaziKorisnike();
        }
      } else if (selectedProductId) {
        const res = await fetch(`${window.API_BASE_URL}/api/proizvodi/fizicko_brisanje/${selectedProductId}`, { method: 'DELETE' });
        if (res.ok) {
          alert("✅ Proizvod fizički obrisan.");
          prikaziProizvode();
        }
      } else if (selectedCategoryId) {
        const res = await fetch(`${window.API_BASE_URL}/api/kategorije/fizicko_brisanje/${selectedCategoryId}`, { method: 'DELETE' });
        if (res.ok) {
          alert("✅ Kategorija fizički obrisana.");
          prikaziKatiPKat();
        }
      } else if (selectedPodkategorijaId) {
        const res = await fetch(`${window.API_BASE_URL}/api/podkategorije/fizicko_brisanje/${selectedPodkategorijaId}`, { method: 'DELETE' });
        if (res.ok) {
          alert("✅ Podkategorija fizički obrisana.");
          prikaziKatiPKat();
        }
      }
    } catch (err) {
      console.error('❌ Greška pri fizičkom brisanju:', err);
    }
    document.getElementById('deleteConfirmModal').style.display = 'none';
  });
}


document.addEventListener('DOMContentLoaded', async () => {
  await initializeApiBaseUrl(); // sigurno sačekaj da API_BASE_URL bude spreman

  const dugmeKorisnici = document.querySelector('button[data-action="korisnici"]');
  if (dugmeKorisnici) {
    dugmeKorisnici.addEventListener('click', prikaziKorisnike);
  } else {
    console.error("❌ Dugme 'Korisnici' nije pronađeno.");
  }

  const dugmeKategorije = document.querySelector('button[data-action="kategorije"]');
  if (dugmeKategorije) {
    dugmeKategorije.addEventListener('click', prikaziKatiPKat);
  }

  prikaziKorisnike(); // Automacki prikaz tabele Korisnici
  inicijalizujLogickoBrisanje();
  inicijalizujFizickoBrisanje();
});

//Event lisiner

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('icon-trash-proizvod')) {
    selectedProductId = e.target.dataset.id;
    document.getElementById('deleteConfirmModal').style.display = 'block';

      // Logičko brisanje proizvoda
    document.getElementById('logicalDeleteBtn').onclick = async () => {
      if (!selectedProductId) return;

      try {
        const res = await fetch(`${window.API_BASE_URL}/api/proizvodi/logicko_brisanje/${selectedProductId}`, {
          method: 'PUT'
        });

        if (res.ok) {
          alert("✅ Proizvod logički obrisan.");
          prikaziProizvode(); // osveži tabelu
        } else {
          alert("❌ Greška pri logičkom brisanju proizvoda.");
        }
      } catch (err) {
        console.error("❌ Greška pri logičkom brisanju proizvoda:", err);
      }

      document.getElementById('deleteConfirmModal').style.display = 'none';
    };


    // Override dugme za fizičko brisanje proizvoda
    document.getElementById('physicalDeleteBtn').onclick = async () => {
      try {
        const res = await fetch(`${window.API_BASE_URL}/api/proizvodi/fizicko_brisanje/${selectedProductId}`, {
          method: 'DELETE'
        });

        if (res.ok) {
          alert("✅ Proizvod fizički obrisan.");
          prikaziProizvode(); // automatski refresh
        } else {
          alert("❌ Greška pri brisanju proizvoda.");
        }
      } catch (err) {
        console.error("❌ Greška pri fizičkom brisanju proizvoda:", err);
      }
      document.getElementById('deleteConfirmModal').style.display = 'none';
    };
  }
});









document.addEventListener('click', function(e) {
  if (e.target.classList.contains('icon-edit-kategorija')) {
    const id = e.target.dataset.id;
    const naziv = e.target.dataset.naziv;

    document.getElementById('editCategoryId').value = id;
    document.getElementById('editCategoryName').value = naziv;

    document.getElementById('editCategoryModal').style.display = 'block';
  }
});

document.getElementById('cancelEditCategoryBtn').addEventListener('click', () => {
  document.getElementById('editCategoryModal').style.display = 'none';
});

document.getElementById('saveCategoryChangesBtn').addEventListener('click', async () => {
  const id = document.getElementById('editCategoryId').value;
  const naziv = document.getElementById('editCategoryName').value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/kategorije/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ naziv })
    });

    if (res.ok) {
      alert("✅ Kategorija uspešno izmenjena.");
      document.getElementById('editCategoryModal').style.display = 'none';
      prikaziKatiPKat(); // refreshuj prikaz
    } else {
      alert("❌ Greška prilikom izmene kategorije.");
    }
  } catch (err) {
    console.error("❌ Greska:", err);
  }
});



//EDIT

// Otvaranje i zatvaranje modala za uređivanje kategorije
const editCategoryModal = document.getElementById("editCategoryModal");
const editCategoryIdInput = document.getElementById("editCategoryId");
const editCategoryNameInput = document.getElementById("editCategoryName");
const saveCategoryBtn = document.getElementById("saveCategoryChangesBtn");
const cancelEditCategoryBtn = document.getElementById("cancelEditCategoryBtn");

// Otvaranje i zatvaranje modala za uređivanje podkategorije
const editPodkategorijaModal = document.getElementById("editPodkategorijaModal");
const editPodkategorijaIdInput = document.getElementById("editPodkategorijaId");
const editPodkategorijaCategoryIdInput = document.getElementById("editPodkategorijaCategoryId");
const editPodkategorijaNameInput = document.getElementById("editPodkategorijaName");
const savePodkategorijaBtn = document.getElementById("savePodkategorijaChangesBtn");
const cancelEditPodkategorijaBtn = document.getElementById("cancelEditPodkategorijaBtn");

// Otvaranje i zatvaranje modala za uređivanje proizvoda
const editProizvodModal = document.getElementById("editProizvodModal");
const editProizvodIdInput = document.getElementById("editProizvodId");
const editProizvodNazivInput = document.getElementById("editProizvodNaziv");
const editProizvodCenaInput = document.getElementById("editProizvodCena");
const editProizvodKategorijaInput = document.getElementById("editProizvodKategorija");
const editProizvodPodkategorijaInput = document.getElementById("editProizvodPodkategorija");
const saveProizvodBtn = document.getElementById("saveProizvodChangesBtn");
const cancelEditProizvodBtn = document.getElementById("cancelEditProizvodBtn");

// Modal za potvrdu brisanja
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const logicalDeleteBtn = document.getElementById("logicalDeleteBtn");
const physicalDeleteBtn = document.getElementById("physicalDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");


// Funkcije za otvaranje modala sa podacima

function openEditCategoryModal(category) {
  editCategoryIdInput.value = category.id;
  editCategoryNameInput.value = category.naziv;
  editCategoryModal.style.display = "flex";
}

function closeEditCategoryModal() {
  editCategoryModal.style.display = "none";
}

function openEditPodkategorijaModal(podkategorija) {
  editPodkategorijaIdInput.value = podkategorija.id;
  editPodkategorijaCategoryIdInput.value = podkategorija.id_kategorija;
  editPodkategorijaNameInput.value = podkategorija.naziv;
  editPodkategorijaModal.style.display = "flex";
}

function closeEditPodkategorijaModal() {
  editPodkategorijaModal.style.display = "none";
}

function openEditProizvodModal(proizvod) {
  editProizvodIdInput.value = proizvod.id;
  editProizvodNazivInput.value = proizvod.naziv;
  editProizvodCenaInput.value = proizvod.cena;
  editProizvodKategorijaInput.value = proizvod.id_kategorija;
  editProizvodPodkategorijaInput.value = proizvod.id_podkategorija;
  editProizvodModal.style.display = "flex";
}

function closeEditProizvodModal() {
  editProizvodModal.style.display = "none";
}

// Otvaranje modala za brisanje
function openDeleteConfirmModal(id, type) {
  selectedDeleteId = id;
  // Možeš podesiti i poruku u modal-u u zavisnosti od tipa (korisnik, proizvod...)
  deleteConfirmModal.style.display = "flex";
}

function closeDeleteConfirmModal() {
  deleteConfirmModal.style.display = "none";
}

// Event listeneri za zatvaranje modala na dugme Otkaži
cancelEditCategoryBtn.addEventListener("click", closeEditCategoryModal);
cancelEditPodkategorijaBtn.addEventListener("click", closeEditPodkategorijaModal);
cancelEditProizvodBtn.addEventListener("click", closeEditProizvodModal);
cancelDeleteBtn.addEventListener("click", closeDeleteConfirmModal);

// Ovde ide tvoj kod za potvrdu izmene i potvrdu brisanja - npr. fetch zahtevi na backend
saveCategoryBtn.addEventListener("click", () => {
  const id = editCategoryIdInput.value;
  const naziv = editCategoryNameInput.value.trim();
  if (!naziv) {
    alert("Naziv kategorije ne može biti prazan.");
    return;
  }
  // API poziv za čuvanje izmene (primer)
  fetch(`${API_BASE_URL}/kategorije/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ naziv }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Greška prilikom izmene kategorije");
      return res.json();
    })
    .then((data) => {
      alert("Kategorija uspešno izmenjena.");
      closeEditCategoryModal();
      // Osveži prikaz kategorija, npr. pozovi funkciju koja ih učitava
      loadCategories();
    })
    .catch((err) => alert(err.message));
});

savePodkategorijaBtn.addEventListener("click", () => {
  const id = editPodkategorijaIdInput.value;
  const id_kategorija = editPodkategorijaCategoryIdInput.value;
  const naziv = editPodkategorijaNameInput.value.trim();
  if (!naziv || !id_kategorija) {
    alert("Sva polja su obavezna.");
    return;
  }
  fetch(`${API_BASE_URL}/podkategorije/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_kategorija, naziv }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Greška prilikom izmene podkategorije");
      return res.json();
    })
    .then(() => {
      alert("Podkategorija uspešno izmenjena.");
      closeEditPodkategorijaModal();
      loadPodkategorije();
    })
    .catch((err) => alert(err.message));
});

saveProizvodBtn.addEventListener("click", () => {
  const id = editProizvodIdInput.value;
  const naziv = editProizvodNazivInput.value.trim();
  const cena = parseFloat(editProizvodCenaInput.value);
  const id_kategorija = editProizvodKategorijaInput.value;
  const id_podkategorija = editProizvodPodkategorijaInput.value;

  if (!naziv || isNaN(cena) || !id_kategorija || !id_podkategorija) {
    alert("Sva polja moraju biti ispravno popunjena.");
    return;
  }

  fetch(`${API_BASE_URL}/proizvodi/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ naziv, cena, id_kategorija, id_podkategorija }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Greška prilikom izmene proizvoda");
      return res.json();
    })
    .then(() => {
      alert("Proizvod uspešno izmenjen.");
      closeEditProizvodModal();
      loadProizvodi();
    })
    .catch((err) => alert(err.message));
});

// Logičko brisanje
logicalDeleteBtn.addEventListener("click", () => {
  if (!selectedDeleteId) return;
  fetch(`${API_BASE_URL}/korisnici/logicko_brisanje/${selectedDeleteId}`, {
    method: "PUT",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Greška prilikom logičkog brisanja");
      alert("Uspešno izvršeno logičko brisanje.");
      closeDeleteConfirmModal();
      // Refresh liste korisnika
      loadKorisnici();
    })
    .catch((err) => alert(err.message));
});

// Fizičko brisanje
physicalDeleteBtn.addEventListener("click", () => {
  if (!selectedDeleteId) return;
  fetch(`${API_BASE_URL}/korisnici/fizicko_brisanje/${selectedDeleteId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Greška prilikom fizičkog brisanja");
      alert("Uspešno izvršeno fizičko brisanje.");
      closeDeleteConfirmModal();
      loadKorisnici();
    })
    .catch((err) => alert(err.message));
});
