
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

function updatePassword() {
    const oldPass = document.getElementById('oldPassword').value.trim();
    const newPass = document.getElementById('newPassword').value.trim();
    const confirmPass = document.getElementById('confirmPassword').value.trim();

    if (!oldPass || !newPass || !confirmPass) {
        alert("Sva polja su obavezna.");
        return;
    }

    if (newPass !== confirmPass) {
        alert("Nove lozinke se ne poklapaju.");
        return;
    }

    // Simulacija zahteva za promenu lozinke
    alert("Lozinka je uspešno promenjena.");
    
    // Reset polja
    document.getElementById('oldPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function togglePasswordVisibility(iconElement) {
    const wrapper = iconElement.closest('.password-wrapper');
    const input = wrapper.querySelector('input');
    const isPassword = input.type === 'password';

    input.type = isPassword ? 'text' : 'password';
    iconElement.querySelector('img').src = isPassword 
    ? "../../accessories/monkey.svg" 
    : "../../accessories/eye.svg";
}

function toggleEdit(button) {
    const infoItem = button.closest('.info-item');
    const displayText = infoItem.querySelector('p');
    const inputField = infoItem.querySelector('.edit-input');

    if (inputField.style.display === "none") {
        inputField.style.display = "inline-block";
        inputField.value = displayText.textContent.trim();
        displayText.style.display = "none";
        button.textContent = "Sačuvaj";
        inputField.classList.add('active');
    } else {
        displayText.textContent = inputField.value.trim();
        inputField.style.display = "none";
        displayText.style.display = "block";
        button.textContent = "Izmeni";
        inputField.classList.remove('active');

        // Ovde možeš dodati logiku da čuvaš podatke, npr. u localStorage
        // localStorage.setItem('user_' + infoItem.querySelector('span').textContent.trim(), inputField.value.trim());
    }
}

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
