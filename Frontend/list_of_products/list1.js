// Sidebar dugmići
document.querySelectorAll('.side-category .side-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('open');
  });
});

document.querySelectorAll('.sub-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
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
const sortSelect = document.getElementById('sort-options');

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
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

// Glavna funkcija za filtriranje
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();

  const selectedPriceRanges = Array.from(document.querySelectorAll('.price-range:checked')).map(cb => ({
    min: parseFloat(cb.getAttribute('data-min')),
    max: parseFloat(cb.getAttribute('data-max'))
  }));

  const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.dataset.category);
  const selectedSubcategories = Array.from(document.querySelectorAll('.subcategory-filter:checked')).map(cb => cb.dataset.subcategory);

  allProducts.forEach(card => {
    const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
    const price = parseFloat(card.getAttribute('data-price'));
    const category = card.getAttribute('data-category');
    const subcategory = card.getAttribute('data-subcategory');

    const matchesSearch = name.includes(searchTerm);
    const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => price >= range.min && price <= range.max);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
    const matchesSubcategory = selectedSubcategories.length === 0 || selectedSubcategories.includes(subcategory);

    const show = matchesSearch && matchesPrice && matchesCategory && matchesSubcategory;

    card.style.display = show ? 'block' : 'none';
    card.style.visibility = 'hidden';
  });

  currentlyDisplayed = 0;
  loadMoreBtn.style.display = allProducts.filter(card => card.style.display !== 'none').length > productsPerPage ? 'block' : 'none';
  showNextProducts();
}

// Sortiranje proizvoda
sortSelect.addEventListener('change', function () {
  const option = this.value;
  const productGrid = document.querySelector('.product-grid');
  allProducts = Array.from(productGrid.querySelectorAll('.product-card')); // osveži listu

  let sortedCards = [...allProducts];

  if (option === 'price-asc') {
    sortedCards.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
  } else if (option === 'price-desc') {
    sortedCards.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
  } else if (option === 'name-asc') {
    sortedCards.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name, 'sr', { sensitivity: 'base' }));
  } else if (option === 'name-desc') {
    sortedCards.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name, 'sr', { sensitivity: 'base' }));
  }

  productGrid.innerHTML = '';
  sortedCards.forEach(card => productGrid.appendChild(card));
  allProducts = sortedCards;

  applyFilters();
});

// Pretraga
searchInput.addEventListener('input', applyFilters);

// Filteri
document.querySelectorAll('.price-range, .category-filter, .subcategory-filter').forEach(cb =>
  cb.addEventListener('change', applyFilters)
);

// URL filteri (?filter=novo ili ?filter=akcija)
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get('filter');
  const titleElement = document.querySelector('.product-section h2');

  if (filter === 'novo') {
    if (titleElement) titleElement.textContent = 'NOVI PROIZVODI';
    allProducts.forEach(card => {
      const show = card.classList.contains('novo');
      card.style.display = show ? 'block' : 'none';
      card.style.visibility = 'hidden';
    });
  } else if (filter === 'akcija') {
    if (titleElement) titleElement.textContent = 'PROIZVODI NA AKCIJI';
    allProducts.forEach(card => {
      const show = card.classList.contains('akcija');
      card.style.display = show ? 'block' : 'none';
      card.style.visibility = 'hidden';
    });
  } else {
    allProducts.forEach(card => {
      card.style.display = 'block';
      card.style.visibility = 'hidden';
    });
  }

  currentlyDisplayed = 0;
  showNextProducts();
});

// Dugme "Učitaj više"
loadMoreBtn.addEventListener('click', showNextProducts);


// Otvaranje podkategorija

document.addEventListener('DOMContentLoaded', function() {
    // Pronađi sve dugmadi za kategorije koje treba da otvore podkategorije
    const categoryButtons = document.querySelectorAll('.side-btn');
    
    // Dodaj event listener za svako dugme
    categoryButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const parentCategory = button.closest('.side-category');
            const subDropdown = parentCategory.querySelector('.side-dropdown');
            
            // Preklopi vidljivost podkategorija
            parentCategory.classList.toggle('active');
            
            // Ako je podkategorija otvorena, promeni strelicu
            const arrow = button.querySelector('span');
            if (parentCategory.classList.contains('active')) {
                arrow.textContent = '▼';  // Strelica prema dole
            } else {
                arrow.textContent = '▶';  // Strelica prema desno
            }
        });
    });
});
