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