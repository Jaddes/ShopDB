// Sidebar dugmići
document.querySelectorAll('.side-category .side-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('open');
  });
});

document.querySelectorAll('.sub-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Sprečava zatvaranje roditeljskog menija
    btn.parentElement.classList.toggle('open');
  });
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

  updateProductCount();  // Ažuriranje broja proizvoda nakon pretrage
});

// Filter proizvoda prema URL parametru
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get('filter');
  const titleElement = document.querySelector('.product-section h2');
  const productCards = document.querySelectorAll('.product-card');

  if (filter === 'novo') {
    if (titleElement) titleElement.textContent = 'NOVI PROIZVODI';
    productCards.forEach(card => {
      card.style.display = card.classList.contains('novo') ? 'block' : 'none';
    });
  } else if (filter === 'akcija') {
    if (titleElement) titleElement.textContent = 'PROIZVODI NA AKCIJI';
    productCards.forEach(card => {
      card.style.display = card.classList.contains('akcija') ? 'block' : 'none';
    });
  }

  updateProductCount();  // Ažuriranje broja proizvoda nakon filtera
});

// VARIJABLE ZA UPRAVLJANJE PRIKAZOM
const productsPerPage = 30;
let currentlyDisplayed = 0;
let allProducts = Array.from(document.querySelectorAll('.product-card'));
const loadMoreBtn = document.querySelector('.load-more');
const countDisplay = document.querySelector('.product-section p');

// Funkcija za ažuriranje broja prikazanih proizvoda
function updateProductCount() {
  const visibleProducts = allProducts.filter(card => card.style.display !== 'none');
  countDisplay.textContent = `Prikaz ${visibleProducts.length} od ${allProducts.length} proizvoda`;
}

// Funkcija za prikaz proizvoda u serijama od 30
function showNextProducts() {
  let shown = 0;

  // Prikazuje sledećih 30 proizvoda koji nisu skriveni filterom/pretragom
  for (let i = currentlyDisplayed; i < allProducts.length && shown < productsPerPage; i++) {
    if (allProducts[i].style.display !== 'none') {
      allProducts[i].style.visibility = 'visible';
      allProducts[i].style.display = 'block';
      shown++;
      currentlyDisplayed++;
    } else {
      currentlyDisplayed++;
    }
  }

  updateProductCount();

  // Sakrij dugme ako su svi prikazani
  if (currentlyDisplayed >= allProducts.length) {
    loadMoreBtn.style.display = 'none';
  }
}

// Dugme "Učitaj više"
loadMoreBtn.addEventListener('click', showNextProducts);

// Funkcija za sortiranje proizvoda
document.getElementById('sort-options').addEventListener('change', function () {
  const sortBy = this.value;
  const productCards = Array.from(document.querySelectorAll('.product-card'));

  productCards.sort((a, b) => {
    const priceA = parseFloat(a.getAttribute('data-price'));
    const priceB = parseFloat(b.getAttribute('data-price'));
    const nameA = a.querySelector('.product-name').textContent.toLowerCase();
    const nameB = b.querySelector('.product-name').textContent.toLowerCase();
    const popularityA = parseInt(a.getAttribute('data-popularity'));
    const popularityB = parseInt(b.getAttribute('data-popularity'));

    if (sortBy === 'price-asc') {
      return priceA - priceB;
    } else if (sortBy === 'price-desc') {
      return priceB - priceA;
    } else if (sortBy === 'name') {
      return nameA.localeCompare(nameB);
    } else if (sortBy === 'best-sellers') {
      return popularityB - popularityA;
    }
  });

  // Ponovno učitaj proizvode u prikaz nakon sortiranja
  const productContainer = document.querySelector('.product-grid');
  productContainer.innerHTML = '';
  productCards.forEach(card => productContainer.appendChild(card));

  updateProductCount();  // Ažuriranje broja proizvoda nakon sortiranja
});

// Inicijalno prikazivanje prvih 30 proizvoda
showNextProducts();


//Provera da li su proizvodi u zadatom cenovnom rangu

function filterProducts() {
  const productCards = document.querySelectorAll('.product-card');

  // Prikupljanje selektovanih cenovnih opsega
  const selectedRanges = Array.from(document.querySelectorAll('.price-range:checked'))
    .map(cb => ({
      min: parseFloat(cb.getAttribute('data-min')),
      max: parseFloat(cb.getAttribute('data-max'))
    }));

  productCards.forEach(card => {
    const productPrice = parseFloat(card.getAttribute('data-price'));

    // Ako nijedan cenovni opseg nije selektovan, prikaži sve
    if (selectedRanges.length === 0) {
      card.style.display = 'block';
      return;
    }

    // Proveri da li cena proizvoda spada u neki od selektovanih opsega
    const matchesPrice = selectedRanges.some(range => 
      productPrice >= range.min && productPrice <= range.max
    );

    if (matchesPrice) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  updateProductCount(); // Ažuriranje broja prikazanih proizvoda
}

document.querySelectorAll('.price-range').forEach(cb => {
  cb.addEventListener('change', filterProducts);
});
