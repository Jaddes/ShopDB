

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
      const orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
      const order = orders[orders.length - 1]; // Poslednja narudžbina


      if (order && Array.isArray(order.items) && order.items.length > 0) {
          // Očisti prethodni sadržaj
          summary.innerHTML = "<h3>Vaša korpa</h3>";
          let total = 0;
          order.items.forEach(item => {
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

document.addEventListener("DOMContentLoaded", () => {
    const summaryButton = document.querySelector('.shipping-summary button');

    if (!summaryButton) return; // Dugme nije prikazano ako je korpa prazna

    summaryButton.addEventListener('click', () => {
    const selectedAddressElement = document.querySelector('.select-button.selected-button');

    if (!selectedAddressElement) {
        alert("Molimo vas da izaberete adresu za dostavu pre potvrde narudžbine!");
        return;
    }

    const addressDiv = selectedAddressElement.closest('.saved-address');
    const addressText = addressDiv ? addressDiv.querySelector('p').textContent : "Nepoznata adresa";

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Vaša korpa je prazna. Nije moguće potvrditi narudžbinu.");
        return;
    }

    const order = {
        address: addressText,
        items: cart
        
    };

    const previousOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    previousOrders.push(order);
    localStorage.setItem("orderHistory", JSON.stringify(previousOrders));

    // ⬇⬇⬇ Ovo briše korpu nakon potvrde narudžbine ⬇⬇⬇
    localStorage.removeItem("cart");

    // Preusmeravanje na order_confirmation.html
    window.location.href = '../order_confirmation/order_confirmation.html';
  });

});
