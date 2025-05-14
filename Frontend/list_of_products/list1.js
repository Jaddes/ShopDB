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

    // Prikazujemo samo proizvode koji imaju klasu 'akcija'
    productCards.forEach(card => {
      card.style.display = card.classList.contains('akcija') ? 'block' : 'none';
    });
  }
});



// SIDEBAR FUNKCIONALNOST


// Glavne kategorije (npr. Odeća, Kuća)
document.querySelectorAll('.side-category .side-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('open');
  });
});

// Potkategorije (npr. Majice, Farmerke)
document.querySelectorAll('.sub-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Sprečava zatvaranje roditeljskog menija
    btn.parentElement.classList.toggle('open');
  });
});


// VARIJABLE ZA UPRAVLJANJE PRIKAZOM

const productsPerPage = 30;
let currentlyDisplayed = 0;
let allProducts = Array.from(document.querySelectorAll('.product-card'));
const loadMoreBtn = document.querySelector('.load-more');
const countDisplay = document.querySelector('.product-section p');


// FUNKCIJA ZA AŽURIRANJE BROJA PRIKAZANIH PROIZVODA


function updateProductCount() {
  const visibleProducts = allProducts.filter(card => card.style.display !== 'none');
  countDisplay.textContent = `Prikaz ${visibleProducts.length} od ${allProducts.length} proizvoda`;
}


// FUNKCIJA ZA PRIKAZ PROIZVODA U SERIJAMA OD 30


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
