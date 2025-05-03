// Footer ponašanje pri skrolovanju
document.addEventListener("scroll", function () {
    const footer = document.querySelector("footer");

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)";
    } else {
        footer.style.transform = "translateY(100%)";
    }
});

// Klik na dugme za brisanje (kanticu)
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.classList.add('clicked');

        // Opcionalno ukloni red iz tabele:
        // this.closest('tr').remove();
    });
});
