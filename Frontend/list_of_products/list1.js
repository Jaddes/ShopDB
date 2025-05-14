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

// VARIJABLE
const productsPerPage = 30;
let currentlyDisplayed = 0;
let allProducts = Array.from(document.querySelectorAll('.product-card'));
const loadMoreBtn = document.querySelector('.load-more');
const countDisplay = document.querySelector('.product-section p');
const searchInput = document.getElementById('searchInput');

// Funkcija za ažuriranje broja prikazanih proizvoda
function updateProductCount() {
  const visibleProducts = allProducts.filter(card => card.style.display !== 'none');
  countDisplay.textContent = `Prikaz ${visibleProducts.filter(card => card.style.visibility === 'visible').length} od ${visibleProducts.length} proizvoda`;
}

// Funkcija za prikaz sledećih proizvoda
function showNextProducts() {
  const visibleUnshown = allProducts.filter(card =>
    card.style.display !== 'none' &&
    (card.style.visibility === '' || card.style.visibility === 'hidden')
  );

  let shown = 0;
  for (let i = 0; i < visibleUnshown.length && shown < productsPerPage; i++) {
    visibleUnshown[i].style.visibility = 'visible';
    visibleUnshown[i].style.display = 'block';
    shown++;
  }

  updateProductCount();

  if (visibleUnshown.length <= productsPerPage) {
    loadMoreBtn.style.display = 'none';
  }
}

// Centralna funkcija za primenu svih filtera
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedRanges = Array.from(document.querySelectorAll('.price-range:checked')).map(cb => ({
    min: parseFloat(cb.getAttribute('data-min')),
    max: parseFloat(cb.getAttribute('data-max'))
  }));

  allProducts.forEach(card => {
    const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
    const price = parseFloat(card.getAttribute('data-price'));

    const matchesSearch = name.includes(searchTerm);
    const matchesPrice = selectedRanges.length === 0 || selectedRanges.some(range => price >= range.min && price <= range.max);

    if (matchesSearch && matchesPrice) {
      card.style.display = 'block';
      card.style.visibility = 'hidden'; // reset prikaza
    } else {
      card.style.display = 'none';
      card.style.visibility = 'hidden';
    }
  });

  currentlyDisplayed = 0;
  loadMoreBtn.style.display = allProducts.filter(card => card.style.display !== 'none').length > productsPerPage ? 'block' : 'none';
  showNextProducts();
}

// Pretraga proizvoda po nazivu
searchInput.addEventListener('input', applyFilters);

// Filter po ceni
document.querySelectorAll('.price-range').forEach(cb => {
  cb.addEventListener('change', applyFilters);
});

// Sortiranje proizvoda
document.getElementById('sort-options').addEventListener('change', function () {
  const option = this.value;
  const productGrid = document.querySelector('.product-grid');
  allProducts = Array.from(productGrid.querySelectorAll('.product-card')); // ažuriranje liste

  let sortedCards = [];

  if (option === 'price-asc') {
    sortedCards = allProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
  } else if (option === 'price-desc') {
    sortedCards = allProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
  } else if (option === 'name-asc') {
    sortedCards = allProducts.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name, 'sr', { sensitivity: 'base' }));
  } else if (option === 'name-desc') {
    sortedCards = allProducts.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name, 'sr', { sensitivity: 'base' }));
  } else {
    return;
  }

  // Očisti i postavi sortirane proizvode
  productGrid.innerHTML = '';
  sortedCards.forEach(card => productGrid.appendChild(card));

  // Ažuriraj referencu na sve proizvode
  allProducts = sortedCards;

  applyFilters(); // primeni trenutne filtere i pretragu na novu listu
});

// Filtriranje preko URL parametra (npr. ?filter=novo)
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get('filter');
  const titleElement = document.querySelector('.product-section h2');

  if (filter === 'novo') {
    if (titleElement) titleElement.textContent = 'NOVI PROIZVODI';
    allProducts.forEach(card => {
      card.style.display = card.classList.contains('novo') ? 'block' : 'none';
      card.style.visibility = 'hidden';
    });
  } else if (filter === 'akcija') {
    if (titleElement) titleElement.textContent = 'PROIZVODI NA AKCIJI';
    allProducts.forEach(card => {
      card.style.display = card.classList.contains('akcija') ? 'block' : 'none';
      card.style.visibility = 'hidden';
    });
  } else {
    allProducts.forEach(card => {
      card.style.display = 'block';
      card.style.visibility = 'hidden';
    });
  }

  currentlyDisplayed = 0;
  loadMoreBtn.style.display = allProducts.filter(card => card.style.display !== 'none').length > productsPerPage ? 'block' : 'none';
  showNextProducts();
});

// Dugme "Učitaj više"
loadMoreBtn.addEventListener('click', showNextProducts);
