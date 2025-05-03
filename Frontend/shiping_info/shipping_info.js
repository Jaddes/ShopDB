
document.addEventListener("scroll", function() {
    const footer = document.querySelector("footer");

    // Proverava da li je korisnik skrolovao do dna stranice
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)"; // Footer se prikazuje
    } else {
        footer.style.transform = "translateY(100%)"; // Footer ostaje sakriven
    }
});
function toggleSavedData() {
    var list = document.getElementById("savedDataList");
    list.style.display = list.style.display === "block" ? "none" : "block";
}

function toggleNewAddressForm() {
    var form = document.getElementById("newAddressForm");
    form.style.display = form.style.display === "block" ? "none" : "block";
}

function selectAddress(addressId) {
    // Resetuj sve dugmadi u listi sačuvanih adresa
    let buttons = document.querySelectorAll('.select-button');
    buttons.forEach(button => {
        button.classList.remove('selected-button');  // Ukloni selektovanu klasu
        button.innerText = "Izaberi";  // Vrati originalni tekst dugmeta
    });

    // Selektuj novo dugme
    let selectedButton = document.querySelector(`#${addressId} .select-button`);
    selectedButton.classList.add('selected-button');  // Dodaj selektovanu klasu
    selectedButton.innerText = "Izabrano";  // Promeni tekst dugmeta na "Izabrano"

    // Dodeli svetlosivu pozadinu odabranoj adresi
    let selectedAddress = document.getElementById(addressId);
    selectedAddress.classList.add('selected');  // Dodaj klasu za selektovanu adresu
}

function toggleSavedData() {
    let savedAddresses = document.querySelector('.saved-addresses');
    savedAddresses.style.display = savedAddresses.style.display === 'none' ? 'block' : 'none';
}
