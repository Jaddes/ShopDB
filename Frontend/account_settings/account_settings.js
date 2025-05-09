
document.addEventListener("scroll", function() {
    const footer = document.querySelector("footer");

    // Proverava da li je korisnik skrolovao do dna stranice
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)"; // Footer se prikazuje
    } else {
        footer.style.transform = "translateY(100%)"; // Footer ostaje sakriven
    }
});

function updatePassword() {
    const oldPass = document.getElementById('oldPassword').value.trim();
    const newPass = document.getElementById('newPassword').value.trim();
    const confirmPass = document.getElementById('confirmPassword').value.trim();

    if (!oldPass || !newPass || !confirmPass) {
        alert("Sva polja su obavezna.");
        return;
    }

    if (newPass !== confirmPass) {
        alert("Nove lozinke se ne poklapaju.");
        return;
    }

    // Simulacija zahteva za promenu lozinke
    alert("Lozinka je uspešno promenjena.");
    
    // Reset polja
    document.getElementById('oldPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}
