
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

function sendResetLink() {
    const email = document.getElementById("resetEmail").value.trim();
    const status = document.getElementById("statusMessage");

    if (!email || !email.includes('@')) {
        status.style.color = "red";
        status.textContent = "Unesite validnu email adresu.";
        return;
    }

    // Simulacija slanja emaila
    status.style.color = "green";
    status.textContent = "Link za resetovanje lozinke je poslat na " + email;

    // Ovde ide backend integracija za slanje pravog emaila
}
