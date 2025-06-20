
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

// fetch('http://localhost:3000/api/kategorije')
//   .then(res => res.json())
//   .then(data => {
//     const dropdown = document.querySelector('.dropdown');
//     dropdown.innerHTML = ''; // Očisti postojeće

//     for (const kategorija in data) {
//       const li = document.createElement('li');
//       li.classList.add('dropdown-submenu');

//       const a = document.createElement('a');
//       a.href = '#';
//       a.textContent = `${kategorija} ▾`;

//       const subUl = document.createElement('ul');
//       subUl.classList.add('dropdown', 'sub-dropdown');

//       data[kategorija].forEach(podkategorija => {
//         const subLi = document.createElement('li');
//         const subA = document.createElement('a');
//         subA.href = `#`; // po potrebi dodaj link npr. `list1.html?filter=${podkategorija}`
//         subA.textContent = podkategorija;
//         subLi.appendChild(subA);
//         subUl.appendChild(subLi);
//       });

//       li.appendChild(a);
//       li.appendChild(subUl);
//       dropdown.appendChild(li);
//     }
//   })
//   .catch(err => {
//     console.error("Greška prilikom učitavanja kategorija:", err);
//   });


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
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        <td>${row[3]}</td>
        <td>${row[4]}</td>
        <td>${row[5]}</td>
        <td>${row[6]}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("❌ Greška u fetch korisnika:", err);
  }
}



// //Dugme za Kupce
// function prikaziKupce() {
//   const container = document.querySelector('.content-placeholder');
//   container.innerHTML = `
//     <h2 style="text-align:center;">Kupci</h2>
//     <table class="admin-table" id="kupciTabela">
//       <thead>
//         <tr>
//           <th>ID_KUPAC</th>
//           <th>ID_KORISNIK</th>
//           <th>Korisnik</th>
//           <th>Ulica</th>
//           <th>Broj</th>
//           <th>Grad</th>
//           <th>Poštanski broj</th>
//           <th>Telefon</th>
//         </tr>
//       </thead>
//       <tbody></tbody>
//     </table>
//   `;

//   fetch(`${API_BASE_URL}/api/kupci`)
//     .then(res => res.json())
//     .then(data => {
//       const tbody = document.querySelector('#kupciTabela tbody');
//       data.forEach(row => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//           <td>${row[0]}</td> <!-- ID_KUPAC -->
//           <td>${row[1]}</td> <!-- ID_KORISNIK -->
//           <td>${row[7]}</td> <!-- Korisnik (ime + prezime) -->
//           <td>${row[2]}</td> <!-- Ulica -->
//           <td>${row[3]}</td> <!-- Broj -->
//           <td>${row[4]}</td> <!-- Grad -->
//           <td>${row[5]}</td> <!-- Poštanski broj -->
//           <td>${row[6]}</td> <!-- Telefon -->
//         `;
//         tbody.appendChild(tr);
//       });
//     })
//     .catch(err => {
//       console.error("❌ Greška u fetch kupaca:", err);
//     });
// }


// //Dugme za proizvode
// function prikaziProizvode() {
//   const container = document.querySelector('.content-placeholder');
//   container.innerHTML = `
//     <h2 style="text-align:center;">Proizvodi</h2>
//     <div class="table-container">
//       <table class="admin-table" id="proizvodiTabela">
//         <thead>
//           <tr>
//             <th>ID_P</th>
//             <th>Naziv</th>
//             <th>Opis</th>
//             <th>Podkategorija</th>
//             <th>Boja</th>
//             <th>Oznaka</th>
//             <th>Slika</th>
//             <th>Datum nabavke</th>
//             <th>Nabavna cena</th>
//             <th>Prodajna cena</th>
//             <th>Količina</th>
//           </tr>
//         </thead>
//         <tbody></tbody>
//       </table>
//     </div>
//   `;

//   fetch(`${API_BASE_URL}/api/proizvodi`)
//     .then(res => res.json())
//     .then(data => {
//       const tbody = document.querySelector('#proizvodiTabela tbody');
//       data.forEach(row => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//           <td>${row[0]}</td> <!-- id_proizvod -->
//           <td>${row[1]}</td> <!-- naziv -->
//           <td>${row[2]}</td> <!-- opis -->
//           <td>${row[3]}</td> <!-- podkategorija -->
//           <td>${row[4] || ''}</td> <!-- boja -->
//           <td>${row[5] || ''}</td> <!-- oznaka -->
//           <td><img src="${row[6] || ''}" alt="slika" style="width:40px;height:40px;"></td>
//           <td>${row[7]}</td> <!-- datum_nabavke -->
//           <td>${row[8]}</td> <!-- nabavna -->
//           <td>${row[9]}</td> <!-- prodajna -->
//           <td>${row[10]}</td> <!-- kolicina -->
//         `;
//         tbody.appendChild(tr);
//       });
//     })
//     .catch(err => {
//       console.error("❌ Greška u fetch proizvoda:", err);
//     });
// }


// //Dugme za Narudzbine
// function prikaziNarudzbine() {
//   const container = document.querySelector('.content-placeholder');
//   container.innerHTML = `
//     <h2 style="text-align:center;">Narudžbine</h2>
//     <table class="admin-table" id="narudzbineTabela">
//       <thead>
//         <tr>
//           <th>ID_N</th>
//           <th>ID_KUPAC</th>
//           <th>Kupac</th>
//           <th>Datum naručivanja</th>
//           <th>Status</th>
//           <th>Dostava</th>
//           <th>Cena dostave</th>
//           <th>Ukupno</th>
//         </tr>
//       </thead>
//       <tbody></tbody>
//     </table>

//     <h2 style="text-align:center;">Stavke narudžbine</h2>
//     <table class="admin-table" id="stavkeTabela">
//       <thead>
//         <tr>
//           <th>ID_STAVKA</th>
//           <th>ID_NARUDZBINE</th>
//           <th>ID_PROIZVOD</th>
//           <th>KOLIČINA</th>
//           <th>CENA PO KOMADU</th>
//           <th>UKUPNA CENA</th>
//         </tr>
//       </thead>
//       <tbody></tbody>
//     </table>
//   `;

//   fetch(`${API_BASE_URL}/api/narudzbine`)
//     .then(res => res.json())
//     .then(data => {
//       const tbody = document.querySelector('#narudzbineTabela tbody');
//       data.forEach(row => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//           <td>${row[0]}</td>
//           <td>${row[1]}</td>
//           <td>${row[2]}</td>
//           <td>${row[3]}</td>
//           <td>${row[4]}</td>
//           <td>${row[5]}</td>
//           <td>${row[6]}</td>
//           <td>${row[7]}</td>
//         `;
//         tr.addEventListener('click', () => prikaziStavkeZaNarudzbinu(row[0]));
//         tbody.appendChild(tr);
//       });
//     })
//     .catch(err => {
//       console.error("❌ Greška u fetch narudžbina:", err);
//     });
// }

// function prikaziStavkeZaNarudzbinu(idNarudzbina) {
//   const tbody = document.querySelector('#stavkeTabela tbody');
//   tbody.innerHTML = ''; // očisti prethodne stavke

//   fetch(`${API_BASE_URL}/api/narudzbine/${idNarudzbina}/stavke`)
//     .then(res => res.json())
//     .then(data => {
//       data.forEach(stavka => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//           <td>${stavka[0]}</td>
//           <td>${stavka[1]}</td>
//           <td>${stavka[2]}</td>
//           <td>${stavka[3]}</td>
//           <td>${stavka[4]}</td>
//           <td>${stavka[5]}</td>
//         `;
//         tbody.appendChild(tr);
//       });
//     })
//     .catch(err => {
//       console.error("❌ Greška u fetch stavki:", err);
//     });
// }

// //Dugme za Korpu
// function prikaziKorpe() {
//   const container = document.querySelector('.content-placeholder');
//   container.innerHTML = `
//     <h2 style="text-align:center;">Korpe</h2>
//     <table class="admin-table" id="korpaTabela">
//       <thead>
//         <tr>
//           <th>ID_KORPA</th>
//           <th>ID_KUPAC</th>
//           <th>Kupac</th>
//           <th>Datum kreiranja</th>
//         </tr>
//       </thead>
//       <tbody></tbody>
//     </table>

//     <h2 style="text-align:center;">Stavke u korpi</h2>
//     <table class="admin-table" id="stavkeKorpeTabela">
//       <thead>
//         <tr>
//           <th>ID_STAVKA</th>
//           <th>ID_KORPA</th>
//           <th>ID_PROIZVOD</th>
//           <th>Naziv proizvoda</th>
//           <th>Količina</th>
//         </tr>
//       </thead>
//       <tbody></tbody>
//     </table>
//   `;

//   fetch(`${API_BASE_URL}/api/korpe`)
//     .then(res => res.json())
//     .then(data => {
//       const tbody = document.querySelector('#korpaTabela tbody');
//       data.forEach(row => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//           <td>${row[0]}</td> <!-- ID_KORPA -->
//           <td>${row[1]}</td> <!-- ID_KUPAC -->
//           <td>${row[3]}</td> <!-- Ime + prezime -->
//           <td>${row[2]}</td> <!-- Datum -->
//         `;
//         tr.addEventListener('click', () => prikaziStavkeKorpe(row[0]));
//         tbody.appendChild(tr);
//       });
//     })
//     .catch(err => {
//       console.error("❌ Greška u fetch korpi:", err);
//     });
// }

// function prikaziStavkeKorpe(idKorpa) {
//   const tbody = document.querySelector('#stavkeKorpeTabela tbody');
//   tbody.innerHTML = '';

//   fetch(`${API_BASE_URL}/api/korpe/${idKorpa}/stavke`)
//     .then(res => res.json())
//     .then(data => {
//       data.forEach(row => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//           <td>${row[0]}</td> <!-- ID_STAVKA -->
//           <td>${row[1]}</td> <!-- ID_KORPA -->
//           <td>${row[2]}</td> <!-- ID_PROIZVOD -->
//           <td>${row[3]}</td> <!-- Naziv -->
//           <td>${row[4]}</td> <!-- Količina -->
//         `;
//         tbody.appendChild(tr);
//       });
//     })
//     .catch(err => {
//       console.error("❌ Greška u fetch stavki korpe:", err);
//     });
// }


// //Dugme za Recenziju
// function prikaziRecenzije() {
//   const container = document.querySelector('.content-placeholder');
//   container.innerHTML = `
//     <h2 style="text-align:center;">Recenzije</h2>
//     <table class="admin-table" id="recenzijeTabela">
//       <thead>
//         <tr>
//           <th>ID_RECENZIJA</th>
//           <th>ID_KUPAC</th>
//           <th>Kupac</th>
//           <th>ID_PROIZVOD</th>
//           <th>Proizvod</th>
//           <th>Ocena</th>
//           <th>Komentar</th>
//           <th>Datum</th>
//         </tr>
//       </thead>
//       <tbody></tbody>
//     </table>
//   `;

//   fetch(`${API_BASE_URL}/api/recenzije`)
//     .then(res => res.json())
//     .then(data => {
//       const tbody = document.querySelector('#recenzijeTabela tbody');
//       data.forEach(row => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//           <td>${row[0]}</td> <!-- ID_RECENZIJA -->
//           <td>${row[1]}</td> <!-- ID_KUPAC -->
//           <td>${row[2]}</td> <!-- Kupac ime -->
//           <td>${row[3]}</td> <!-- ID_PROIZVOD -->
//           <td>${row[4]}</td> <!-- Naziv proizvoda -->
//           <td>${row[5]}</td> <!-- Ocena -->
//           <td>${row[6]}</td> <!-- Komentar -->
//           <td>${row[7]}</td> <!-- Datum -->
//         `;
//         tbody.appendChild(tr);
//       });
//     })
//     .catch(err => {
//       console.error("❌ Greška u fetch recenzija:", err);
//     });
// }

// //Dugme za Listu Zelja/Wishlist
// function prikaziListaZelja() {
//   const container = document.querySelector('.content-placeholder');
//   container.innerHTML = `
//     <h2 style="text-align:center;">Liste želja</h2>
//     <table class="admin-table" id="wishlistTabela">
//       <thead>
//         <tr>
//           <th>ID_WISHLIST</th>
//           <th>ID_KUPAC</th>
//           <th>Kupac</th>
//           <th>Datum kreiranja</th>
//         </tr>
//       </thead>
//       <tbody></tbody>
//     </table>

//     <h2 style="text-align:center;">Stavke u listi želja</h2>
//     <table class="admin-table" id="stavkeWishlistTabela">
//       <thead>
//         <tr>
//           <th>ID_STAVKA</th>
//           <th>ID_WISHLIST</th>
//           <th>ID_PROIZVOD</th>
//           <th>Naziv proizvoda</th>
//         </tr>
//       </thead>
//       <tbody></tbody>
//     </table>
//   `;

//   fetch(`${API_BASE_URL}/api/wishlist`)
//     .then(res => res.json())
//     .then(data => {
//       const tbody = document.querySelector('#wishlistTabela tbody');
//       data.forEach(row => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//           <td>${row[0]}</td> <!-- ID_WISHLIST -->
//           <td>${row[1]}</td> <!-- ID_KUPAC -->
//           <td>${row[2]}</td> <!-- Kupac ime -->
//           <td>${row[3]}</td> <!-- Datum -->
//         `;
//         tr.addEventListener('click', () => prikaziStavkeListeZelja(row[0]));
//         tbody.appendChild(tr);
//       });
//     })
//     .catch(err => {
//       console.error("❌ Greška u fetch želja:", err);
//     });
// }

// function prikaziStavkeListeZelja(idWishlist) {
//   const tbody = document.querySelector('#stavkeWishlistTabela tbody');
//   tbody.innerHTML = '';

//   fetch(`${API_BASE_URL}/api/wishlist/${idWishlist}/stavke`)
//     .then(res => res.json())
//     .then(data => {
//       data.forEach(row => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//           <td>${row[0]}</td> <!-- ID_STAVKA -->
//           <td>${row[1]}</td> <!-- ID_WISHLIST -->
//           <td>${row[2]}</td> <!-- ID_PROIZVOD -->
//           <td>${row[3]}</td> <!-- Naziv proizvoda -->
//         `;
//         tbody.appendChild(tr);
//       });
//     })
//     .catch(err => {
//       console.error("❌ Greška u fetch stavki liste želja:", err);
//     });
// }

// //Dugme za Kategorija i PodKategorije
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
        tr.addEventListener('click', () => prikaziPodkategorije(row[0]));
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch kategorija:", err);
    });
}

function prikaziPodkategorije(idKategorije) {
  const tbody = document.querySelector('#podkategorijeTabela tbody');
  tbody.innerHTML = '';

  fetch(`${API_BASE_URL}/api/kategorije/${idKategorije}/podkategorije`)
    .then(res => res.json())
    .then(data => {
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

document.addEventListener('DOMContentLoaded', async () => {
  await initializeApiBaseUrl(); // sigurno sačekaj da API_BASE_URL bude spreman

  const dugmeKorisnici = document.querySelector('button[data-action="korisnici"]');
  if (dugmeKorisnici) {
    dugmeKorisnici.addEventListener('click', prikaziKorisnike);
  } else {
    console.error("❌ Dugme 'Korisnici' nije pronađeno.");
  }
});


