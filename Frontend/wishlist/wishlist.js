// Footer ponašanje pri skrolovanju
document.addEventListener("scroll", function () {
    const footer = document.querySelector("footer");

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)";
    } else {
        footer.style.transform = "translateY(100%)";
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

// Dugme: Dodaj u korpu
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        alert("Proizvod je dodat u korpu!");
    });
});

// Dugme: Obavesti o akciji
document.querySelectorAll('.notify-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        alert("Bićete obavešteni kada proizvod bude na akciji.");
    });
});

// Dugme: Ukloni iz liste
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.closest('tr').remove();
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("tbody");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Očisti postojeće redove
  tbody.innerHTML = "";

  wishlist.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" style="width: 100px; border-radius: 8px;"></td>
      <td>${item.title}</td>
      <td>${item.price}</td>
      <td><button class="add-to-cart-btn"><img src="../../accessories/shopping_cart.svg" style="width: 20px; height: 20px;"></button></td>
      <td><button class="delete-btn"><img src="../../accessories/trash-can.svg" style="width: 20px; height: 20px;"></button></td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      const title = row.children[1].textContent.trim();
      const price = row.children[2].textContent.trim().replace(/[^\d]/g, ''); // skini RSD
      const imgSrc = row.querySelector('img').src;
      const id = this.getAttribute('data-id');

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(item => item.id === id);
      if (existing) {
          existing.quantity += 1;
      } else {
          cart.push({ id, title, price: parseInt(price), imgSrc, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Proizvod je dodat u korpu!");
    });
  });

  // Dodaj funkcionalnost za brisanje
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      const title = row.children[1].textContent.trim();

      const updated = wishlist.filter(item => item.title !== title);
      localStorage.setItem("wishlist", JSON.stringify(updated));

      row.remove();
    });
  });
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
