// Footer ponašanje pri skrolovanju
document.addEventListener("scroll", function () {
    const footer = document.querySelector("footer");

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)";
    } else {
        footer.style.transform = "translateY(100%)";
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

// Dugme: Dodaj u korpu
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        alert("Proizvod je dodat u korpu!");
    });
});

// Dugme: Obavesti o akciji
document.querySelectorAll('.notify-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        alert("Bićete obavešteni kada proizvod bude na akciji.");
    });
});

// Dugme: Ukloni iz liste
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.closest('tr').remove();
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("tbody");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Očisti postojeće redove
  tbody.innerHTML = "";

  wishlist.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" style="width: 60px; border-radius: 8px;"></td>
      <td>${item.title}</td>
      <td>${item.price}</td>
      <td><button class="add-to-cart-btn">🛒</button></td>
      <td><button class="delete-btn">🗑</button></td>
    `;
    tbody.appendChild(row);
  });

  // Dodaj funkcionalnost za brisanje
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      const title = row.children[1].textContent.trim();

      const updated = wishlist.filter(item => item.title !== title);
      localStorage.setItem("wishlist", JSON.stringify(updated));

      row.remove();
    });
  });
});
