document.addEventListener("DOMContentLoaded", function() {
    // Footer animacija kad scrollamo
    const footer = document.querySelector("footer");
    document.addEventListener("scroll", function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            footer.style.transform = "translateY(0)";
        } else {
            footer.style.transform = "translateY(100%)";
        }
    });

    // Dropdown animacija klikom
    const categories = document.querySelectorAll('.category');

    categories.forEach(category => {
        const button = category.querySelector('.category-btn');
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Sprečava slučajno skrolovanje na vrh stranice ako je <button>
            category.classList.toggle('open'); // Ako je otvoren, zatvori, ako nije, otvori
        });
    });
});
