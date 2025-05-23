document.addEventListener('DOMContentLoaded', () => {
  const productsPerPage = 30;
  let currentlyDisplayed = 0;

  const productGrid = document.querySelector('.product-grid');
  let allProducts = Array.from(productGrid.querySelectorAll('.product-card'));

  const loadMoreBtn = document.querySelector('.load-more');
  const countDisplay = document.querySelector('.product-section p');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sort-options');

  function updateProductCount() {
    const filteredProducts = allProducts.filter(card => card.style.display !== 'none');
    const visibleCount = Math.min(currentlyDisplayed, filteredProducts.length);
    countDisplay.textContent = `Prikaz ${visibleCount} od ${filteredProducts.length} proizvoda`;
  }

  function showNextProducts() {
    const filteredProducts = allProducts.filter(card => card.style.display !== 'none');
    let shown = 0;
    for (let i = currentlyDisplayed; i < filteredProducts.length && shown < productsPerPage; i++) {
      filteredProducts[i].style.display = 'block';
      shown++;
    }
    currentlyDisplayed += shown;
    updateProductCount();

    loadMoreBtn.style.display = (currentlyDisplayed >= filteredProducts.length) ? 'none' : 'block';
  }

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
      // Ako je selektovana jedna kategorija (klikom), koristi samo nju
      const matchesCategory = selectedCategory
        ? category === selectedCategory
        : (selectedCategories.length === 0 || selectedCategories.includes(category));

      // Podkategorije se primenjuju samo ako pripadaju selektovanoj kategoriji
      const matchesSubcategory = selectedSubcategories.length === 0 ||
        (selectedCategory && category === selectedCategory && selectedSubcategories.includes(subcategory));



      const show = matchesSearch && matchesPrice && matchesCategory && matchesSubcategory;
      card.style.display = show ? 'block' : 'none';
    });

    currentlyDisplayed = 0;
    const filteredCount = allProducts.filter(card => card.style.display !== 'none').length;
    loadMoreBtn.style.display = filteredCount > productsPerPage ? 'block' : 'none';
    showNextProducts();
  }

  sortSelect.addEventListener('change', () => {
    const option = sortSelect.value;
    allProducts = Array.from(productGrid.querySelectorAll('.product-card'));
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

  searchInput.addEventListener('input', applyFilters);

  document.querySelectorAll('.price-range, .category-filter, .subcategory-filter').forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const urlFilter = urlParams.get('filter');
  const titleElement = document.querySelector('.product-section h2');

  function applyUrlFilter() {
    if (urlFilter === 'novo') {
      if (titleElement) titleElement.textContent = 'NOVI PROIZVODI';
      allProducts.forEach(card => {
        card.style.display = card.classList.contains('novo') ? 'block' : 'none';
      });
    } else if (urlFilter === 'akcija') {
      if (titleElement) titleElement.textContent = 'PROIZVODI NA AKCIJI';
      allProducts.forEach(card => {
        card.style.display = card.classList.contains('akcija') ? 'block' : 'none';
      });
     } else if (urlFilter === 'najpopularnije') {
      if (titleElement) titleElement.textContent = 'NAJPOPULARNIJE PROIZVODI';
      allProducts.forEach(card => {
        card.style.display = card.classList.contains('najpopularnije') ? 'block' : 'none';
      });
    } else {
      allProducts.forEach(card => {
        card.style.display = 'block';
      });
    }
    currentlyDisplayed = 0;
    showNextProducts();
  }

  applyUrlFilter();

  loadMoreBtn.addEventListener('click', showNextProducts);

  const categoryButtons = document.querySelectorAll('.side-btn');
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const parentCategory = button.closest('.side-category');
      parentCategory.classList.toggle('active');
      const arrow = button.querySelector('span');
      arrow.textContent = parentCategory.classList.contains('active') ? '▼' : '▶';
    });
  });

  const subButtons = document.querySelectorAll('.sub-btn');
  subButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.parentElement.classList.toggle('open');
    });
  });

  // --- Kategorije i podkategorije ---
  const subcategoriesData = {
    'odeća': ['Majice', 'Farmerke', 'Kape'],
    'kuća': ['Kuhinja', 'Dekoracije', 'Osvetljenje'],
    'sport': ['Teretana', 'Lopte'],
    'elektronika': ['Telefoni', 'Televizori', 'Smart satovi', 'Slušalice'],
    'lepota': ['Parfemi', 'Šminka', 'Kreme za lice'],
    'aksesoari': ['Nakit', 'Torbe', 'Satovi']
  };

  const categoriesView = document.getElementById('categories-view');
  const subcategoriesView = document.getElementById('subcategories-view');
  const subcategoriesList = document.getElementById('subcategories-list');
  const backToCategoriesBtn = document.getElementById('back-to-categories');

  let selectedCategory = null;

  function showSubcategories(category) {
    selectedCategory = category;
    categoriesView.style.display = 'none';
    subcategoriesView.style.display = 'block';
    subcategoriesList.innerHTML = '';

    const subs = subcategoriesData[category] || [];
    subs.forEach(subcat => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('subcategory-checkbox');
      checkbox.value = subcat.toLowerCase();
      checkbox.dataset.category = category;

      label.appendChild(checkbox);
      label.append(' ' + subcat);
      li.appendChild(label);
      subcategoriesList.appendChild(li);
    });
  }

  backToCategoriesBtn.addEventListener('click', () => {
    selectedCategory = null;
    subcategoriesView.style.display = 'none';
    categoriesView.style.display = 'block';
    subcategoriesList.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    applyFilters();
  });

 document.querySelectorAll('.clickable-category').forEach(label => {
  label.addEventListener('click', () => {
    const category = label.dataset.category;

    // 1. Poništi sve prethodne kategorije i podkategorije
    document.querySelectorAll('.category-filter').forEach(cb => cb.checked = false);
    document.querySelectorAll('.subcategory-filter').forEach(cb => cb.checked = false);

    // 2. Označi samo kliknutu kategoriju
    const checkbox = document.querySelector(`.category-filter[data-category="${category}"]`);
    if (checkbox) {
      checkbox.checked = true;
    }

    // 3. Prikaži odgovarajuće podkategorije
    showSubcategories(category);

    // 4. Primeni filtriranje proizvoda
    applyFilters();
  });
});


  subcategoriesList.addEventListener('change', (e) => {
    if (e.target && e.target.matches('input.subcategory-checkbox')) {
      const value = e.target.value.toLowerCase();
      let subCheckbox = document.querySelector(`.subcategory-filter[data-subcategory="${value}"]`);

      if (!subCheckbox) {
        subCheckbox = document.createElement('input');
        subCheckbox.type = 'checkbox';
        subCheckbox.classList.add('subcategory-filter');
        subCheckbox.dataset.subcategory = value;
        subCheckbox.checked = true;
        subCheckbox.style.display = 'none';
        document.body.appendChild(subCheckbox);
      } else {
        subCheckbox.checked = e.target.checked;
      }

      applyFilters();
    }
  });
});

//dodavanje u listu?
document.addEventListener('click', (event) => {
  // Wishlist
  if (event.target.closest('.wishlist-btn')) {
    const btn = event.target.closest('.wishlist-btn');
    const id_proizvoda = btn.dataset.id;
    const id_korisnika = 1; // ili iz sesije ako imaš autentikaciju

    fetch('http://localhost:3000/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_korisnika, id_proizvoda })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(err => alert('❌ Greška pri dodavanju u wishlist.'));
  }

  // Cart
  if (event.target.closest('.cart-btn')) {
    const btn = event.target.closest('.cart-btn');
    const productCard = btn.closest('.product-card');
    const id_proizvoda = productCard.dataset.id;
    const id_korisnika = 1;

    fetch('http://localhost:3000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_korisnika, id_proizvoda })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(err => alert('❌ Greška pri dodavanju u korpu.'));
  }
});
