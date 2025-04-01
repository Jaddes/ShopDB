
document.addEventListener("scroll", function() {
    const footer = document.querySelector("footer");

    // Proverava da li je korisnik skrolovao do dna stranice
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)"; // Footer se prikazuje
    } else {
        footer.style.transform = "translateY(100%)"; // Footer ostaje sakriven
    }
});


document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
});

function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email === '' || password === '') {
        alert('Please fill in all fields.');
    } else {
        // Ovde će kasnije ići prava provera
        alert('Login Successful (fake)');
    }
}

