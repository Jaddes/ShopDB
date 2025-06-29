
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
  alert("Otvara se forma za dodavanje proizvoda (uskoro).");
  // Ovde ćeš ubaciti logiku za prikaz forme
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


// //Dugme za Korpu
function prikaziKorpe() {
  const container = document.querySelector('.content-placeholder');
  container.innerHTML = `
    <h2 style="text-align:center;">Korpe</h2>
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



// //Dugme za Recenziju
function prikaziRecenzije() {
  const container = document.querySelector('.content-placeholder');
  container.innerHTML = `
    <h2 style="text-align:center;">Recenzije</h2>
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

  fetch(`${API_BASE_URL}/api/recenzije`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#recenzijeTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row[0]}</td> <!-- ID_RECENZIJA -->
          <td>${row[1]}</td> <!-- ID_KUPAC -->
          <td>${row[2]}</td> <!-- Kupac ime -->
          <td>${row[3]}</td> <!-- ID_PROIZVOD -->
          <td>${row[4]}</td> <!-- Naziv proizvoda -->
          <td>${row[5]}</td> <!-- Ocena -->
          <td>${row[6]}</td> <!-- Komentar -->
          <td>${row[7]}</td> <!-- Datum -->
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch recenzija:", err);
    });
}

// //Dugme za Listu Zelja/Wishlist
function prikaziListaZelja() {
  const container = document.querySelector('.content-placeholder');
  container.innerHTML = `
    <h2 style="text-align:center;">Liste želja</h2>
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
              class="icon-trash" 
              data-id="${row.id_korisnik}" 
              style="cursor:pointer; width:20px;" 
              title="Obriši korisnika" />
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
              class="icon-trash" 
              data-id="${row.id_korisnik}" 
              style="cursor:pointer; width:20px;" 
              title="Obriši korisnika" />
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

// Logicko i Fizicko Brisanje
let selectedUserId = null;

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('icon-trash')) {
    selectedUserId = e.target.dataset.id;
    document.getElementById('deleteConfirmModal').style.display = 'block';
  }
});

document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
  document.getElementById('deleteConfirmModal').style.display = 'none';
});

function inicijalizujLogickoBrisanje() {
  document.getElementById('logicalDeleteBtn').addEventListener('click', async () => {
    try {
      const res = await fetch(`${window.API_BASE_URL}/api/korisnici/logicko_brisanje/${selectedUserId}`, {
        method: 'PUT'
      });
      if (res.ok) {
        alert("✅ Logički obrisan korisnik.");
        prikaziKorisnike();
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
      const res = await fetch(`${window.API_BASE_URL}/api/korisnici/fizicko_brisanje/${selectedUserId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert("✅ Fizički obrisan korisnik.");
        prikaziKorisnike();
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
let selectedProductId = null;

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
