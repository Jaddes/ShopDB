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

// Dugmad - prikazuju alert kao privremena funkcionalnost
document.querySelector('.add-cart')?.addEventListener('click', () => {
    alert('Proizvod je dodat u korpu!');
});

document.querySelector('.buy-now').addEventListener('click', () => {
    alert('Hvala na kupovini!');
});

document.addEventListener("DOMContentLoaded", () => {
    const favoriteBtn = document.querySelector('.favorite');
  
    if (!favoriteBtn) {
      console.warn("Dugme za favorite nije pronađeno.");
      return;
    }
  
    favoriteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // sprečava klik da "prođe" na druge elemente
      favoriteBtn.classList.toggle('active');
      favoriteBtn.textContent = favoriteBtn.classList.contains('active') ? '❤️' : '♡';
    });
  });
  
  