
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

fetch('http://localhost:3000/api/categories')
  .then(res => res.json())
  .then(data => {
    const dropdown = document.querySelector('.dropdown');
    dropdown.innerHTML = ''; // Očisti postojeće

    for (const kategorija in data) {
      const li = document.createElement('li');
      li.classList.add('dropdown-submenu');

      const a = document.createElement('a');
      a.href = '#';
      a.textContent = `${kategorija} ▾`;

      const subUl = document.createElement('ul');
      subUl.classList.add('dropdown', 'sub-dropdown');

      data[kategorija].forEach(podkategorija => {
        const subLi = document.createElement('li');
        const subA = document.createElement('a');
        subA.href = `#`; // po potrebi dodaj link npr. `list1.html?filter=${podkategorija}`
        subA.textContent = podkategorija;
        subLi.appendChild(subA);
        subUl.appendChild(subLi);
      });

      li.appendChild(a);
      li.appendChild(subUl);
      dropdown.appendChild(li);
    }
  })
  .catch(err => {
    console.error("Greška prilikom učitavanja kategorija:", err);
  });

  document.addEventListener("DOMContentLoaded", () => {
  const details = document.querySelector('.order-details');
  const content = details.querySelector('.details-content');
  const summary = details.querySelector('summary');

  summary.addEventListener('click', (e) => {
    e.preventDefault();

    // Proveri da li je otvoren
    if (details.hasAttribute('open')) {
      // Animiraj zatvaranje
      content.style.height = content.scrollHeight + 'px'; // Postavi trenutnu visinu
      setTimeout(() => {
        content.style.height = '0px'; // Animacija
      }, 10);
      setTimeout(() => {
        details.removeAttribute('open');
      }, 300); // Trajanje animacije
    } else {
      details.setAttribute('open', '');
      content.style.height = '0px'; // Postavi početak
      setTimeout(() => {
        content.style.height = content.scrollHeight + 'px'; // Animacija
      }, 10);
    }
    });
  });

document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector(".content-placeholder");

    const orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const order = orders[orders.length - 1]; // Poslednja narudžbina


    if (!order) {
        // Ako nema narudžbine, prikaži poruku o grešci
        content.innerHTML = `
            <h1>❌ Greška!</h1>
            <p>Nije pronađena narudžbina. Molimo vas da pokušate ponovo.</p>
            <button onclick="window.location.href='../main_site/main_site.html'">Vrati se na početnu</button>
        `;
        return;
    }

    // Kreiraj HTML sa detaljima
    let total = 0;
    let detailsHTML = `<p><strong>Adresa za dostavu:</strong> ${order.address}</p>`;

    order.items.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        detailsHTML += `<p><strong>${item.title}</strong>: ${item.quantity} x ${item.price} RSD</p>`;
    });

    detailsHTML += `<p><strong>Ukupno:</strong> ${total} RSD</p>`;

    // Prikaz sadržaja stranice
    content.innerHTML = `
        <div class="confirmation-box">
            <h1>✅ Vaša narudžbina je uspešno završena!</h1>
            <p>Hvala na kupovini. Vaš paket će uskoro biti pripremljen za slanje.</p>
            <details class="order-details">
                <summary>Prikaži detalje narudžbine</summary>
                <div class="details-content">
                    ${detailsHTML}
                </div>
            </details>
            <button class="back-home" onclick="window.location.href='../main_site/main_site.html'">Povratak na početnu</button>
        </div>
    `;

    // Očisti podatke korpe i narudžbine (opciono)
    localStorage.removeItem("cart");
    localStorage.removeItem("order");
});

document.addEventListener("DOMContentLoaded", () => {
    const orderDetailsContent = document.getElementById("orderDetailsContent");
    const orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const order = orders[orders.length - 1]; // Poslednja narudžbina


    if (!order) {
        orderDetailsContent.innerHTML = "<p>Greška: Nema podataka o narudžbini.</p>";
        return;
    }

    let total = 0;
    let detailsHTML = `<p><strong>Adresa za dostavu:</strong> ${order.address}</p>`;
    order.items.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        detailsHTML += `<p><strong>${item.title}</strong>: ${item.quantity} x ${item.price} RSD</p>`;
    });
    detailsHTML += `<p><strong>Ukupno:</strong> ${total} RSD</p>`;

    orderDetailsContent.innerHTML = detailsHTML;
});




 document.addEventListener('DOMContentLoaded', function () {
  const accountDropdown = document.querySelector('.account-dropdown');
  const accountMenu = accountDropdown.querySelector('.account-menu');
  const logoutModal = document.getElementById('logoutModal');
  const confirmLogout = document.querySelector('.confirm-logout');
  const cancelLogout = document.querySelector('.cancel-logout');

  // Provera da li je korisnik ulogovan
  const isLoggedIn = localStorage.getItem('ulogovan') === 'true';

  // Popuni meni u zavisnosti od stanja prijave
  if (isLoggedIn) {
    accountMenu.innerHTML = `
      <li><a href="../account_settings/account_settings.html">Informacije o nalogu</a></li>
      <li><a href="../order_history/order_history.html">Istorija poručivanja</a></li>
      <li><button id="logout-btn">Izloguj se</button></li>
    `;

    // Dodavanje događaja za dugme za odjavu
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // spreči zatvaranje menija
      accountDropdown.classList.remove('open');
      logoutModal.style.display = 'block';
    });

  } else {
    accountMenu.innerHTML = `
      <li><a href="../login/login.html">Uloguj se</a></li>
    `;
  }

  // Zatvori modal kada klikneš "Odustani"
  cancelLogout.addEventListener('click', function () {
    logoutModal.style.display = 'none';
  });

  // Potvrdi odjavu
  confirmLogout.addEventListener('click', function () {
    localStorage.setItem('ulogovan', 'false');
    logoutModal.style.display = 'none';
    location.reload(); // ili preusmeravanje na login stranicu
  });

  // Zatvaranje modala klikom van sadržaja
  window.addEventListener('click', function (event) {
    if (event.target === logoutModal) {
      logoutModal.style.display = 'none';
    }
  });

  // Ručno toggle-ovanje menija (ako ne koristiš :hover)
  accountDropdown.addEventListener('click', function () {
    accountDropdown.classList.toggle('open');
  });
});
