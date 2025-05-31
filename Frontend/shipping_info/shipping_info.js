document.addEventListener("scroll", function() {
    const footer = document.querySelector("footer");

    // Check if the user has scrolled to the bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)"; // Show the footer
    } else {
        footer.style.transform = "translateY(100%)"; // Hide the footer
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

function toggleSavedData() {
    const list = document.getElementById("savedDataList");
    list.style.display = list.style.display === "block" ? "none" : "block";
  }

  function toggleNewAddressForm() {
    const form = document.getElementById("newAddressForm");
    form.style.display = form.style.display === "block" ? "none" : "block";
  }

  function selectAddress(addressId) {
    document.querySelectorAll('.select-button').forEach(btn => {
      btn.classList.remove('selected-button');
      btn.innerText = "Izaberi";
    });
    const selectedBtn = document.querySelector(`#${addressId} .select-button`);
    selectedBtn.classList.add('selected-button');
    selectedBtn.innerText = "Izabrano";
  
    document.querySelectorAll('.saved-address').forEach(div => {
      div.classList.remove('selected');
    });
    document.getElementById(addressId).classList.add('selected');
  }
  

  function selectNewAddress(button) {
    document.querySelectorAll('.select-button').forEach(btn => {
      btn.classList.remove('selected-button');
      btn.innerText = "Izaberi";
    });
    button.classList.add('selected-button');
    button.innerText = "Izabrano";
  }

  document.addEventListener("DOMContentLoaded", () => {
      const summary = document.querySelector(".shipping-summary");
      const order = JSON.parse(localStorage.getItem("order")) || [];

      if (order.length > 0) {
          // Očisti prethodni sadržaj
          summary.innerHTML = "<h3>Vaša korpa</h3>";
          let total = 0;
          order.forEach(item => {
              const subtotal = item.price * item.quantity;
              total += subtotal;
              summary.innerHTML += `<p><strong>${item.title}</strong><br>${item.quantity} x ${item.price} RSD</p>`;
          });
          summary.innerHTML += `<p><strong>Ukupno:</strong> ${total} RSD</p>`;
          summary.innerHTML += `<button>Potvrdi narudžbinu</button>`;
      } else {
          summary.innerHTML += `<p>Korpa je prazna.</p>`;
      }

});
