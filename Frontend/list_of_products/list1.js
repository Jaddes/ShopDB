// FOOTER PRIKAZ NA DNU STRANICE
document.addEventListener("scroll", function() { 
    const footer = document.querySelector("footer");
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)";
    } else {
        footer.style.transform = "translateY(100%)";
    }
});

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // GLOBALNE PROMENLJIVE ZA STRANICU PROIZVODA
  const productsPerPage = 30;
  let currentlyDisplayed = 0;
  let selectedCategory = null;

  const productGrid = document.querySelector('.product-grid');
  let allProducts = Array.from(productGrid.querySelectorAll('.product-card'));

  const loadMoreBtn = document.querySelector('.load-more');
  const countDisplay = document.querySelector('.product-section p');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sort-options');

  // URL FILTER („akcija”, „novo”, „najpopularnije”…)
  const urlParams = new URLSearchParams(window.location.search);
  const urlFilter = urlParams.get('filter'); // npr. "akcija" ili null

  // Naslov sekcije (h2 unutar .product-section)
  const titleElement = document.querySelector('.product-section h2');

  // -------------------------------------------------------------------------
  // Funkcija za prikazivanje sledećih N proizvoda (load more)
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

  // Funkcija za ažuriranje prikaza broja proizvoda
  function updateProductCount() {
    const filteredCount = allProducts.filter(card => card.style.display !== 'none').length;
    const visibleCount = Math.min(currentlyDisplayed, filteredCount);
    countDisplay.textContent = `Prikaz ${visibleCount} od ${filteredCount} proizvoda`;
  }

  // -------------------------------------------------------------------------
  // GLAVNA funkcija za filtriranje prema svim kriterijumima:
  // - pretraga po imenu
  // - cena (min, max)
  // - kategorije / podkategorije
  // - i URL-filter (npr. “akcija”)
  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const priceMin = parseFloat(document.getElementById('priceMin').value) || 0;
    const priceMax = parseFloat(document.getElementById('priceMax').value) || Infinity;

    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
                                    .map(cb => cb.dataset.category);
    const selectedSubcategories = Array.from(document.querySelectorAll('.subcategory-filter:checked'))
                                       .map(cb => cb.dataset.subcategory);

    allProducts.forEach(card => {
      const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
      const price = parseFloat(card.dataset.price) || 0;
      const category = card.dataset.category;
      const subcategory = card.dataset.subcategory;

      const matchesSearch = name.includes(searchTerm);
      const matchesPrice = price >= priceMin && price <= priceMax;

      const matchesCategory = selectedCategory
        ? category === selectedCategory
        : (selectedCategories.length === 0 || selectedCategories.includes(category));

      const matchesSubcategory = selectedSubcategories.length === 0
        || (selectedCategory && category === selectedCategory && selectedSubcategories.includes(subcategory));

      // Provera URL-filtera
      const matchesUrlFilter = !urlFilter || card.classList.contains(urlFilter);

      const show = matchesSearch
                && matchesPrice
                && matchesCategory
                && matchesSubcategory
                && matchesUrlFilter;

      card.style.display = show ? 'block' : 'none';
    });

    currentlyDisplayed = 0;
    const filteredCount = allProducts.filter(card => card.style.display !== 'none').length;
    loadMoreBtn.style.display = (filteredCount > productsPerPage) ? 'block' : 'none';
    showNextProducts();
  }

  // -------------------------------------------------------------------------
  // „URL-filter” samo menja naslov, a onda delegira na applyFilters()
  function applyUrlFilter() {
    if (urlFilter) {
      if (urlFilter === 'novo') {
        if (titleElement) titleElement.textContent = 'NOVI PROIZVODI';
      } else if (urlFilter === 'akcija') {
        if (titleElement) titleElement.textContent = 'PROIZVODI NA AKCIJI';
      } else if (urlFilter === 'najpopularnije') {
        if (titleElement) titleElement.textContent = 'NAJPOPULARNIJI PROIZVODI';
      } else {
        // Ako imate i druge varijante (npr. preporuceno), ovde nastavite
      }
    }
    applyFilters();
  }

  // -------------------------------------------------------------------------
  // EVENT-LISTENER-i

  // 1) Sort opcije
  sortSelect.addEventListener('change', () => {
    const option = sortSelect.value;
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

  // 2) Pretraga po imenu (update prilikom unosa)
  searchInput.addEventListener('input', applyFilters);

  // 3) Filter po ceni / kategorijama / podkategorijama
  document.querySelectorAll('.price-range, .category-filter, .subcategory-filter').forEach(el => {
    el.addEventListener('change', applyFilters);
  });

  // 4) Load more dugme
  loadMoreBtn.addEventListener('click', showNextProducts);

  // 5) Sidobar: otvaranje/zatvaranje glavnih kategorija
  document.querySelectorAll('.side-btn').forEach(button => {
    button.addEventListener('click', () => {
      const parentCategory = button.closest('.side-category');
      parentCategory.classList.toggle('active');
      const arrow = button.querySelector('span');
      if (arrow) arrow.textContent = parentCategory.classList.contains('active') ? '▼' : '▶';
    });
  });

  // Otvaranje/zaklapanje podkategorija u sidebaru
  document.querySelectorAll('.sub-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.parentElement.classList.toggle('open');
    });
  });

  // Generisanje liste podkategorija na osnovu izabrane glavne kategorije
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
      document.querySelectorAll('.category-filter').forEach(cb => cb.checked = false);
      document.querySelectorAll('.subcategory-filter').forEach(cb => cb.checked = false);
      const checkbox = document.querySelector(`.category-filter[data-category="${category}"]`);
      if (checkbox) checkbox.checked = true;
      showSubcategories(category);
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

  // Na kraju, pokrećemo početni prikaz filtriranih proizvoda
  applyUrlFilter();

  // -------------------------------------------------------------------------
  // WISHLIST (dodavanje/uklanjanje iz omiljenih)
  const favoriteBtn = document.querySelector('.favorite');
  const heartIcon = favoriteBtn?.querySelector('.heart-icon');
  const productIdWishlist = "101";
  const productDataWishlist = {
    id: productIdWishlist,
    title: "Bluetooth Slušalice",
    price: "1800",
    image: "../../accessories/picture_products/white/main.jpg"
  };
  let savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (savedWishlist.find(item => item.id === productIdWishlist)) {
    favoriteBtn?.classList.add("active");
    if (heartIcon) heartIcon.src = "../../accessories/heart-filled.svg";
  }
  favoriteBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    favoriteBtn.classList.toggle('active');
    const active = favoriteBtn.classList.contains('active');
    if (heartIcon) {
      heartIcon.src = active
        ? "../../accessories/heart-filled.svg"
        : "../../accessories/heart.svg";
    }
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const index = wishlist.findIndex(item => item.id === productIdWishlist);
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productDataWishlist);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });

  // -------------------------------------------------------------------------
  // CART (dodavanje/uklanjanje iz korpe)
  const cartBtn = document.querySelector('.cart-btn');
  const cartIcon = cartBtn?.querySelector('img');
  const productIdCart = "101";
  const productDataCart = {
    id: productIdCart,
    title: "Bluetooth Slušalice",
    price: "1800",
    image: "../../accessories/picture_products/white/main.jpg"
  };
  let savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  if (savedCart.find(item => item.id === productIdCart)) {
    cartBtn?.classList.add("active");
    if (cartIcon) cartIcon.src = "../../accessories/shopping_cart_filled.svg";
  }
  cartBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    cartBtn.classList.toggle('active');
    const active = cartBtn.classList.contains('active');
    if (cartIcon) {
      cartIcon.src = active
        ? "../../accessories/shopping_cart_filled.svg"
        : "../../accessories/shopping_cart.svg";
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === productIdCart);
    if (index > -1) {
      cart.splice(index, 1);
    } else {
      cart.push(productDataCart);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  // -------------------------------------------------------------------------
  // PRICE RANGE SLIDER (sinhronizacija slidera i input polja)
  const priceMinSlider = document.getElementById('priceMin');
  const priceMaxSlider = document.getElementById('priceMax');
  const priceMinInput = document.getElementById('priceMinInput');
  const priceMaxInput = document.getElementById('priceMaxInput');
  const priceRangeDisplay = document.getElementById('priceRangeDisplay');

  function updateDisplay() {
    const min = parseInt(priceMinSlider.value);
    const max = parseInt(priceMaxSlider.value);
    priceRangeDisplay.textContent = `Cena: ${min} - ${max} RSD`;
  }

  function syncSliderWithInputs() {
    let min = parseInt(priceMinInput.value);
    let max = parseInt(priceMaxInput.value);
    if (min > max) min = max;
    if (max < min) max = min;
    priceMinSlider.value = min;
    priceMaxSlider.value = max;
    updateDisplay();
    applyFilters();
  }

  function syncInputsWithSlider(event) {
    let min = parseInt(priceMinSlider.value);
    let max = parseInt(priceMaxSlider.value);
    if (min > max) {
      if (event.target === priceMinSlider) {
        min = max;
        priceMinSlider.value = min;
      } else {
        max = min;
        priceMaxSlider.value = max;
      }
    }
    priceMinInput.value = min;
    priceMaxInput.value = max;
    updateDisplay();
    applyFilters();
  }

  priceMinSlider.addEventListener('input', syncInputsWithSlider);
  priceMaxSlider.addEventListener('input', syncInputsWithSlider);
  priceMinInput.addEventListener('input', syncSliderWithInputs);
  priceMaxInput.addEventListener('input', syncSliderWithInputs);
});
