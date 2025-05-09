
document.addEventListener("scroll", function() {
    const footer = document.querySelector("footer");

    // Proverava da li je korisnik skrolovao do dna stranice
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)"; // Footer se prikazuje
    } else {
        footer.style.transform = "translateY(100%)"; // Footer ostaje sakriven
    }
});

function sendResetLink() {
    const email = document.getElementById("resetEmail").value.trim();
    const status = document.getElementById("statusMessage");

    if (!email || !email.includes('@')) {
        status.style.color = "red";
        status.textContent = "Unesite validnu email adresu.";
        return;
    }

    // Simulacija slanja emaila
    status.style.color = "green";
    status.textContent = "Link za resetovanje lozinke je poslat na " + email;

    // Ovde ide backend integracija za slanje pravog emaila
}
