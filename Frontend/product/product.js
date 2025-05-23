document.addEventListener("scroll", function() {
    const footer = document.querySelector("footer");

    // Proverava da li je korisnik skrolovao do dna stranice
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)"; // Footer se prikazuje
    } else {
        footer.style.transform = "translateY(100%)"; // Footer ostaje sakriven
    }
});

// Pretraga proizvoda po nazivu
document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const nameElement = card.querySelector('.product-name');
    const productName = nameElement ? nameElement.textContent.toLowerCase() : '';

    // Prikaži proizvod ako sadrži unos iz pretrage
    if (productName.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Dugmad - prikazuju alert kao privremena funkcionalnost
document.querySelector('.add-cart')?.addEventListener('click', () => {
    alert('Proizvod je dodat u korpu!');
});

document.querySelector('.buy-now').addEventListener('click', () => {
    alert('Hvala na kupovini!');
});

const favoriteBtn = document.querySelector('.favorite');
const heartIcon = favoriteBtn?.querySelector('.heart-icon');

if (favoriteBtn && heartIcon) {
  favoriteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    favoriteBtn.classList.toggle('active');

    heartIcon.src = favoriteBtn.classList.contains('active')
      ? "../../accessories/heart-filled.svg"
      : "../../accessories/heart.svg";
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const variantThumbs = document.querySelectorAll('.variant-thumb');

  variantThumbs.forEach(img => {
    img.addEventListener('click', () => {
      variantThumbs.forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector('.main-image img');
  const thumbs = document.querySelectorAll('.thumb');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      // ROTACIJA
      const tempSrc = mainImage.src;
      mainImage.src = thumb.src;
      thumb.src = tempSrc;

      // Izmena selekcije
      thumbs.forEach(t => t.classList.remove('selected'));
      thumb.classList.add('selected');
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("mainImage");
  const thumbs = [
    document.getElementById("thumb1"),
    document.getElementById("thumb2"),
    document.getElementById("thumb3")
  ];

  const basePath = "../../accessories/picture_products/";

const variants = {
  white: {
    main: `${basePath}white/main.jpg`,
    thumbs: [
      `${basePath}white/thumb1.jpg`,
      `${basePath}white/thumb2.jpg`,
      `${basePath}white/thumb3.jpg`
    ]
  },
  black: {
    main: `${basePath}black/main.jpg`,
    thumbs: [
      `${basePath}black/thumb1.jpg`,
      `${basePath}black/thumb2.jpg`,
      `${basePath}black/thumb3.jpg`
    ]
  },
  red: {
    main: `${basePath}red/main.jpg`,
    thumbs: [
      `${basePath}red/thumb1.jpg`,
      `${basePath}red/thumb2.jpg`,
      `${basePath}red/thumb3.jpg`
    ]
  }
};

  document.querySelectorAll(".variant-box").forEach(box => {
    box.addEventListener("click", () => {
      const color = box.dataset.color;
      main.src = variants[color].main;
      thumbs.forEach((t, i) => t.src = variants[color].thumbs[i]);

      document.querySelectorAll(".variant-box").forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");
    });
  });
});


  
  