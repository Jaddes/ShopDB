
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



//Dugme za korisnike
async function prikaziKorisnike() {
  try {
    const res = await fetch(`${window.API_BASE_URL}/api/korisnici`);
    const podaci = await res.json();

    // Prikaz u tabeli...
    console.log(podaci); // privremeno
  } catch (err) {
    console.error("❌ Greška pri dohvatanju korisnika:", err);
  }
}

async function prikaziKorisnike() {
  const container = document.querySelector('.content-placeholder');

  // Resetuj sadržaj da bi se sve prikazalo ponovo
  container.innerHTML = `
    <h2 style="text-align:center;">Korisnici</h2>
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
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

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


// //Dugme za proizvode
function prikaziProizvode() {
  const container = document.querySelector('.content-placeholder');
  container.innerHTML = `
    <h2 style="text-align:center;">Proizvodi</h2>
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
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  `;

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
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch proizvoda:", err);
    });
}


//Dugme za Narudzbine
function prikaziNarudzbine() {
  const container = document.querySelector('.content-placeholder');

  container.innerHTML = `
    <h2 style="text-align:center;">Narudžbine</h2>
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
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch podkategorija:", err);
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