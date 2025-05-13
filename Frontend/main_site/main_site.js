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
