document.addEventListener("DOMContentLoaded", function () {
  const cartTableBody = document.querySelector("table tbody");
  const totalPriceElem = document.querySelector(".cart-summary p:nth-child(2)");
  const grandTotalElem = document.querySelector(".cart-summary p:nth-child(4)");
  const deliveryFee = 400;

  // Učitaj korpu iz localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Funkcija za renderovanje korpe
  function renderCart() {
    cartTableBody.innerHTML = "";  // Očisti tabelu
    let total = 0;

    if (cart.length === 0) {
      // Prikazi poruku ako je korpa prazna
      cartTableBody.innerHTML = `<tr><td colspan="5">Korpa je prazna.</td></tr>`;
    }

    cart.forEach((item) => {
      const quantity = item.quantity || 1;
      const price = parseInt(item.price);
      const subtotal = price * quantity;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.title}</td>
        <td>${price}RSD</td>
        <td><input type="number" value="${quantity}" min="1" data-id="${item.id}" class="qty-input" /></td>
        <td>${subtotal}RSD</td>
        <td><button class="delete-btn" data-id="${item.id}">
          <img src="../../accessories/trash-can.svg" alt="Delete" class="trash-icon">
        </button></td>
      `;
      cartTableBody.appendChild(row);
    });

    totalPriceElem.textContent = `Međuzbir: ${total}RSD`;
    grandTotalElem.textContent = `Ukupno: ${total + deliveryFee}RSD`;

  }

  renderCart();  // Prikazi korpu pri učitavanju stranice

  const checkoutBtn = document.querySelector(".checkout-btn");
  checkoutBtn.addEventListener("click", () => {
    if (cart.length == 0) {
      alert("Korpa je prazna. Dodaj proizvod pre nego sto krenete na placanje.")
      return;
    }

    localStorage.setItem("order", JSON.stringify(cart));
   
    window.location.href = "../shipping_info/shipping_info.html";
  });





  // Event delegation za brisanje
  cartTableBody.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("trash-icon") || target.closest(".delete-btn")) {
      const button = target.closest(".delete-btn");
      const productId = button.getAttribute("data-id");

      const index = cart.findIndex(item => item.id === productId);
      if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();  // Ponovno renderovanje
      }
    }
  });

  // Promena količine
  cartTableBody.addEventListener("input", function (e) {
    if (e.target.classList.contains("qty-input")) {
      const productId = e.target.getAttribute("data-id");
      const newQty = parseInt(e.target.value);
      const index = cart.findIndex(item => item.id === productId);
      if (index > -1 && newQty > 0) {
        cart[index].quantity = newQty;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();  // Ažuriraj prikaz
      }
    }
  });
});
