
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

fetch('http://localhost:3000/api/categories')
  .then(res => res.json())
  .then(data => {
    const dropdown = document.querySelector('.dropdown');
    dropdown.innerHTML = ''; // Očisti postojeće

    for (const kategorija in data) {
      const li = document.createElement('li');
      li.classList.add('dropdown-submenu');

      const a = document.createElement('a');
      a.href = '#';
      a.textContent = `${kategorija} ▾`;

      const subUl = document.createElement('ul');
      subUl.classList.add('dropdown', 'sub-dropdown');

      data[kategorija].forEach(podkategorija => {
        const subLi = document.createElement('li');
        const subA = document.createElement('a');
        subA.href = `#`; // po potrebi dodaj link npr. `list1.html?filter=${podkategorija}`
        subA.textContent = podkategorija;
        subLi.appendChild(subA);
        subUl.appendChild(subLi);
      });

      li.appendChild(a);
      li.appendChild(subUl);
      dropdown.appendChild(li);
    }
  })
  .catch(err => {
    console.error("Greška prilikom učitavanja kategorija:", err);
  });
