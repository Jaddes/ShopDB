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
s

