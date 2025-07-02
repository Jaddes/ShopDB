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
