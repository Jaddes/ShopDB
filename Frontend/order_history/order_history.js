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

document.addEventListener("DOMContentLoaded", function() {
    const reorderButtons = document.querySelectorAll(".reorder-btn");
    reorderButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Nova porudžbina iz istorije
            const order = [
                {
                    id: "product-double-bed",
                    title: "Double Bed & Dressing",
                    price: 16820,
                    quantity: 1,
                    image: "../../accessories/picture_products/white/main.jpg"
                }
            ];
            // Čistimo prethodne podatke da ne ostanu od product.js
            localStorage.removeItem("cart");  // Čisti cart ako ga koristiš
            localStorage.setItem("order", JSON.stringify(order));

            // Takođe možeš postaviti adresu direktno (po izboru)
            const address = "Marko Marković, Ulica 123, Beograd, 11000";
            localStorage.setItem("selectedAddress", address);

            // Prelazak na shipping_info
            window.location.href = "../shipping_info/shipping_info.html";
        });
    });
});

//lista proizvoda u popup prozoru
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('productsModal');
  const closeBtn = modal.querySelector('.close-btn');
  const productsList = document.getElementById('productsList');

  // Primer podataka proizvoda za svaku porudžbinu
  // U praksi bi ih dobio sa servera ili iz localStorage, ovde je primer statički
  const ordersProducts = {
    '2133': [
      {img: '../../images/product1.jpg', name: 'Majica Floyd', quantity: 2, price: 15.00},
      {img: '../../images/product2.jpg', name: 'Farmerke Levis', quantity: 1, price: 45.00},
      {img: '../../images/product3.jpg', name: 'Kapa Sportska', quantity: 3, price: 12.00}
    ],
    '6663': [
      {img: '../../images/product4.jpg', name: 'Smart Sat', quantity: 1, price: 30.20}
    ]
  };

  // Funkcija za prikaz proizvoda u modalu
  function showProducts(orderId) {
    const products = ordersProducts[orderId];
    if (!products) {
      productsList.innerHTML = '<p>Nema podataka o proizvodima za ovu porudžbinu.</p>';
      return;
    }

    let html = '';
    products.forEach(product => {
      html += `
        <div class="product-item">
          <img src="${product.img}" alt="${product.name}">
          <div class="product-details">
            <p><strong>${product.name}</strong></p>
            <p>Količina: ${product.quantity}</p>
          </div>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      `;
    });
    productsList.innerHTML = html;
  }

  // Na klik dugmeta "Pogledaj proizvode"
  document.querySelectorAll('.view-products-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      // Pronađi broj porudžbine iz reda tabele (prvi <td>)
      const orderId = e.target.closest('tr').querySelector('td').textContent.trim();
      showProducts(orderId);
      modal.style.display = 'block';
    });
  });

  // Zatvori modal kad klikneš na X
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Zatvori modal kad klikneš van modal sadržaja
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
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


