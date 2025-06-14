
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

// fetch('http://localhost:3000/api/categories')
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


// Konekcija sa serverom
initializeApiBaseUrl().then(() => {
  fetch(`${API_BASE_URL}/api/categories`)
    .then(res => res.json())
    .then(data => {
      console.log("Kategorije:", data);
    });
});

// Tabela Kategorija 
initializeApiBaseUrl().then(() => {
  fetch(`${API_BASE_URL}/api/categories`)
    .then(res => res.json())
    .then(data => {
      const content = document.querySelector('.content-placeholder');
      content.innerHTML = ''; // očisti prethodni sadržaj

      const table = document.createElement('table');
      table.style.width = '80%';
      table.style.margin = '40px auto';
      table.style.borderCollapse = 'collapse';

      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr style="background:#EB9C35; color:white;">
          <th style="border:1px solid #ccc; padding:10px;">Kategorija</th>
          <th style="border:1px solid #ccc; padding:10px;">Podkategorije</th>
        </tr>
      `;
      table.appendChild(thead);

      const tbody = document.createElement('tbody');

      const kategorije = Object.keys(data);
      if (kategorije.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td colspan="2" style="padding:10px; text-align:center;">Nema dostupnih kategorija</td>
        `;
        tbody.appendChild(row);
      } else {
        kategorije.forEach(kat => {
          const podkategorije = data[kat].join(', ');
          const row = document.createElement('tr');
          row.innerHTML = `
            <td style="border:1px solid #ccc; padding:10px;">${kat}</td>
            <td style="border:1px solid #ccc; padding:10px;">${podkategorije}</td>
          `;
          tbody.appendChild(row);
        });
      }

      table.appendChild(tbody);
      content.appendChild(table);
    })
    .catch(err => {
      console.error("Greška prilikom učitavanja kategorija:", err);
    });
});

initializeApiBaseUrl().then(() => {
  fetch(`${API_BASE_URL}/api/categories`)
    .then(res => res.json())
    .then(data => {
      const content = document.querySelector('.content-placeholder');
      content.innerHTML = ''; // očisti sve

      const table = document.createElement('table');
      table.classList.add('admin-table'); // možemo stilizovati u CSS-u

      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th>Kategorija</th>
          <th>Podkategorije</th>
        </tr>
      `;
      table.appendChild(thead);

      const tbody = document.createElement('tbody');

      const kategorije = Object.keys(data);

      if (kategorije.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="2" style="text-align:center;">Nema kategorija u bazi</td>`;
        tbody.appendChild(row);
      } else {
        kategorije.forEach(kat => {
          const podkategorije = data[kat].length > 0 ? data[kat].join(', ') : '—';
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${kat}</td>
            <td>${podkategorije}</td>
          `;
          tbody.appendChild(row);
        });
      }

      table.appendChild(tbody);
      content.appendChild(table);
    })
    .catch(err => {
      console.error("❌ Greška u dohvatanju kategorija:", err);
    });
});
