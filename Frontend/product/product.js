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

//Wishlist
document.addEventListener("DOMContentLoaded", () => {
  const favoriteBtn = document.querySelector('.favorite');
  const heartIcon = favoriteBtn?.querySelector('.heart-icon');

  const productId = "product-anja-white";
  const productData = {
    id: productId,
    title: "Anja white socks (used for 2 weeks)",
    price: "$30.99",
    image: "../../accessories/picture_products/white/main.jpg"
  };

  // Provera da li je već u wishlist
  const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (saved.find(item => item.id === productId)) {
    favoriteBtn.classList.add("active");
    heartIcon.src = "../../accessories/heart-filled.svg";
  }

  // Klik na srce
  favoriteBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    favoriteBtn.classList.toggle('active');
    const active = favoriteBtn.classList.contains('active');
    heartIcon.src = active
      ? "../../accessories/heart-filled.svg"
      : "../../accessories/heart.svg";

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const index = wishlist.findIndex(item => item.id === productId);

    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productData);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });


  // Varijante
  const variantThumbs = document.querySelectorAll('.variant-thumb');
  variantThumbs.forEach(img => {
    img.addEventListener('click', () => {
      variantThumbs.forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
    });
  });

  const mainImage = document.querySelector('.main-image img');
  const thumbs = document.querySelectorAll('.thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const tempSrc = mainImage.src;
      mainImage.src = thumb.src;
      thumb.src = tempSrc;

      thumbs.forEach(t => t.classList.remove('selected'));
      thumb.classList.add('selected');
    });
  });

  const main = document.getElementById("mainImage");
  const variantBoxes = document.querySelectorAll(".variant-box");
  const variantThumbIds = ["thumb1", "thumb2", "thumb3"];
  const thumbsEls = variantThumbIds.map(id => document.getElementById(id));

  const basePath = "../../accessories/picture_products/";
  const variants = {
    white: {
      main: `${basePath}white/main.jpg`,
      thumbs: [`${basePath}white/thumb1.jpg`, `${basePath}white/thumb2.jpg`, `${basePath}white/thumb3.jpg`]
    },
    black: {
      main: `${basePath}black/main.jpg`,
      thumbs: [`${basePath}black/thumb1.jpg`, `${basePath}black/thumb2.jpg`, `${basePath}black/thumb3.jpg`]
    },
    red: {
      main: `${basePath}red/main.jpg`,
      thumbs: [`${basePath}red/thumb1.jpg`, `${basePath}red/thumb2.jpg`, `${basePath}red/thumb3.jpg`]
    }
  };

  variantBoxes.forEach(box => {
    box.addEventListener("click", () => {
      const color = box.dataset.color;
      main.src = variants[color].main;
      thumbsEls.forEach((t, i) => t.src = variants[color].thumbs[i]);

      variantBoxes.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");
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


  
  