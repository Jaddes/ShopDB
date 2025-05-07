// Footer ponašanje pri skrolovanju
document.addEventListener("scroll", function () {
    const footer = document.querySelector("footer");

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)";
    } else {
        footer.style.transform = "translateY(100%)";
    }
});

// Dugme: Dodaj u korpu
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        alert("Proizvod je dodat u korpu!");
    });
});

// Dugme: Obavesti o akciji
document.querySelectorAll('.notify-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        alert("Bićete obavešteni kada proizvod bude na akciji.");
    });
});

// Dugme: Ukloni iz liste
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.closest('tr').remove();
    });
});