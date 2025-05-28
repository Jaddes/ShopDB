// Glavni DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const productsPerPage = 30;
  let currentlyDisplayed = 0;
  let selectedCategory = null;

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
    const priceMin = parseFloat(document.getElementById('priceMin').value);
    const priceMax = parseFloat(document.getElementById('priceMax').value);

    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.dataset.category);
    const selectedSubcategories = Array.from(document.querySelectorAll('.subcategory-filter:checked')).map(cb => cb.dataset.subcategory);

    allProducts.forEach(card => {
      const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
      const price = parseFloat(card.getAttribute('data-price'));
      const category = card.getAttribute('data-category');
      const subcategory = card.getAttribute('data-subcategory');

      const matchesSearch = name.includes(searchTerm);
      const matchesPrice = price >= priceMin && price <= priceMax;
      const matchesCategory = selectedCategory
        ? category === selectedCategory
        : (selectedCategories.length === 0 || selectedCategories.includes(category));
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
    if (urlFilter) {
      let className = '';
      if (urlFilter === 'novo') {
        className = 'novo';
        if (titleElement) titleElement.textContent = 'NOVI PROIZVODI';
      } else if (urlFilter === 'akcija') {
        className = 'akcija';
        if (titleElement) titleElement.textContent = 'PROIZVODI NA AKCIJI';
      } else if (urlFilter === 'najpopularnije') {
        className = 'najpopularnije';
        if (titleElement) titleElement.textContent = 'NAJPOPULARNIJI PROIZVODI';
      }

      allProducts.forEach(card => {
        card.style.display = card.classList.contains(className) ? 'block' : 'none';
      });

      currentlyDisplayed = 0;
      showNextProducts();
    } else {
      applyFilters();
    }
  }

  loadMoreBtn.addEventListener('click', showNextProducts);

  document.querySelectorAll('.side-btn').forEach(button => {
    button.addEventListener('click', () => {
      const parentCategory = button.closest('.side-category');
      parentCategory.classList.toggle('active');
      const arrow = button.querySelector('span');
      if (arrow) arrow.textContent = parentCategory.classList.contains('active') ? '▼' : '▶';
    });
  });

  document.querySelectorAll('.sub-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.parentElement.classList.toggle('open');
    });
  });

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

  applyUrlFilter();
});

// Wishlist
document.addEventListener("DOMContentLoaded", () => {
  const favoriteBtn = document.querySelector('.favorite');
  const heartIcon = favoriteBtn?.querySelector('.heart-icon');
  const productId = "101";

  const productData = {
    id: productId,
    title: "Bluetooth Slušalice",
    price: "1800",
    image: "../../accessories/picture_products/white/main.jpg"
  };

  const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (saved.find(item => item.id === productId)) {
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
    const index = wishlist.findIndex(item => item.id === productId);

    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productData);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });
});

// Cart
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.querySelector('.cart-btn');
  const cartIcon = cartBtn?.querySelector('img');
  const productId = "101";

  const productData = {
    id: productId,
    title: "Bluetooth Slušalice",
    price: "1800",
    image: "../../accessories/picture_products/white/main.jpg"
  };

  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  if (savedCart.find(item => item.id === productId)) {
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
    const index = cart.findIndex(item => item.id === productId);

    if (index > -1) {
      cart.splice(index, 1);
    } else {
      cart.push(productData);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

// Price range slider
document.addEventListener('DOMContentLoaded', () => {
  const priceMinSlider = document.getElementById('priceMin');
  const priceMaxSlider = document.getElementById('priceMax');
  const priceMinInput = document.getElementById('priceMinInput');
  const priceMaxInput = document.getElementById('priceMaxInput');
  const priceRangeDisplay = document.getElementById('priceRangeDisplay');

  const updateDisplay = () => {
    const min = parseInt(priceMinSlider.value);
    const max = parseInt(priceMaxSlider.value);
    priceRangeDisplay.textContent = `Cena: ${min} - ${max} RSD`;
  };

  const syncSliderWithInputs = () => {
    let min = parseInt(priceMinInput.value);
    let max = parseInt(priceMaxInput.value);

    if (min > max) min = max;
    if (max < min) max = min;

    priceMinSlider.value = min;
    priceMaxSlider.value = max;

    updateDisplay();
    applyFilters();
  };

  const syncInputsWithSlider = () => {
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
  };

  priceMinSlider.addEventListener('input', syncInputsWithSlider);
  priceMaxSlider.addEventListener('input', syncInputsWithSlider);
  priceMinInput.addEventListener('input', syncSliderWithInputs);
  priceMaxInput.addEventListener('input', syncSliderWithInputs);
});
