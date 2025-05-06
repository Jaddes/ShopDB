document.addEventListener("scroll", function() {
    const footer = document.querySelector("footer");

    // Check if the user has scrolled to the bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)"; // Show the footer
    } else {
        footer.style.transform = "translateY(100%)"; // Hide the footer
    }
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