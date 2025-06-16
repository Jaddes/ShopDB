document.addEventListener("DOMContentLoaded", function() {
    // Footer animacija kad scrollamo
    const footer = document.querySelector("footer");
    document.addEventListener("scroll", function() {
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

    // Dropdown animacija klikom
    const categories = document.querySelectorAll('.category');

    categories.forEach(category => {
        const button = category.querySelector('.category-btn');
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Sprečava slučajno skrolovanje na vrh stranice ako je <button>
            category.classList.toggle('open'); // Ako je otvoren, zatvori, ako nije, otvori
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
