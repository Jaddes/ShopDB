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

// Filter proizvoda prema URL parametru
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get('filter');
  const titleElement = document.querySelector('.product-section h2');
  const productCards = document.querySelectorAll('.product-card');

  if (filter === 'novo') {
    // Menjamo naslov sekcije
    if (titleElement) titleElement.textContent = 'NOVI PROIZVODI';

    // Prikazujemo samo proizvode koji imaju klasu 'novo'
    productCards.forEach(card => {
      if (!card.classList.contains('novo')) {
        card.style.display = 'none';
      }
    });
  }
});
