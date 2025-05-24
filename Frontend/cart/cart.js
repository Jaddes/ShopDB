document.addEventListener("DOMContentLoaded", function () {
  const cartTableBody = document.querySelector("table tbody");
  const totalPriceElem = document.getElementById("total-price");
  const grandTotalElem = document.getElementById("grand-total");
  const deliveryFee = 400;

  // Učitavanje korpe iz localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartTableBody.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const quantity = item.quantity || 1;
      const price = parseInt(item.price);
      const subtotal = price * quantity;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.title}</td>
        <td>${price}RSD</td>
        <td><input type="number" value="${quantity}" min="1" data-index="${index}" class="qty-input" /></td>
        <td>${subtotal}RSD</td>
        <td><button class="delete-btn" data-index="${index}">🗑</button></td>
      `;
      cartTableBody.appendChild(row);
    });

    totalPriceElem.textContent = `Međuzbir: ${total}RSD`;
    grandTotalElem.textContent = `Ukupno: ${total + deliveryFee}RSD`;

    // Dodaj event listenere za brisanje i promenu količine
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll(".qty-input").forEach(input => {
      input.addEventListener("input", function () {
        const index = this.getAttribute("data-index");
        const newQty = parseInt(this.value);
        if (newQty > 0) {
          cart[index].quantity = newQty;
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        }
      });
    });
  }

  renderCart();
});
