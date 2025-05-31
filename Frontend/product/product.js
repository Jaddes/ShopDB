document.addEventListener("scroll", function() {
    const footer = document.querySelector("footer");

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.transform = "translateY(0)";
    } else {
        footer.style.transform = "translateY(100%)";
    }
});

// Pretraga proizvoda po nazivu
document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const nameElement = card.querySelector('.product-name');
    const productName = nameElement ? nameElement.textContent.toLowerCase() : '';

    if (productName.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Dugmad - privremena funkcionalnost
document.querySelector('.add-cart')?.addEventListener('click', () => {
    const productId = "product-anja-white"; // možeš i iz data-id ili slično
    const productTitle = "Anja white socks (used for 2 weeks)";
    const productPrice = 3099; // Cena u dinarima (bez znaka i decimala)
    const productImage = "../../accessories/picture_products/white/main.jpg";

    const quantity = parseInt(document.querySelector('.quantity span').textContent); // uzmi broj iz span

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Proveri da li proizvod već postoji
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: productId,
            title: productTitle,
            price: productPrice,
            image: productImage,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`Dodato ${quantity} x ${productTitle} u korpu!`);
});


document.querySelector('.buy-now')?.addEventListener('click', () => {
    const productId = "product-anja-white";
    const productTitle = "Anja white socks (used for 2 weeks)";
    const productPrice = 3099;
    const productImage = "../../accessories/picture_products/white/main.jpg";
    const quantity = parseInt(document.querySelector('.quantity span').textContent);

    // Spremi podatke u localStorage (za shipping info)
    const order = [{
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity: quantity
    }];
    localStorage.setItem("order", JSON.stringify(order));

    // Preusmeri na shipping_info.html
    window.location.href = "/shipping_info/shipping_info.html";
});


document.querySelector('.quantity button:nth-child(1)')?.addEventListener('click', () => {
    let span = document.querySelector('.quantity span');
    let currentQty = parseInt(span.textContent);
    if (currentQty > 1) {
        span.textContent = currentQty - 1;
    }
});

document.querySelector('.quantity button:nth-child(3)')?.addEventListener('click', () => {
    let span = document.querySelector('.quantity span');
    let currentQty = parseInt(span.textContent);
    span.textContent = currentQty + 1;
});

function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector('.nav-icon img[alt="Cart"]');
    if (cartIcon) {
        cartIcon.setAttribute('data-quantity', totalQuantity); // ili upiši u HTML
    }
}
updateCartIcon();


// Wishlist i slike
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector('.main-image img');
  const thumbs = document.querySelectorAll('.thumb');
  let imageSources = Array.from(thumbs).map(thumb => thumb.src);
  let currentIndex = 0;

  const updateMainImage = (index) => {
    if (index >= 0 && index < imageSources.length) {
      mainImage.src = imageSources[index];
      thumbs.forEach(t => t.classList.remove('selected'));
      if (thumbs[index]) thumbs[index].classList.add('selected');
      currentIndex = index;
    }
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      updateMainImage(index);
    });
  });

  document.querySelector('.prev-btn')?.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
    updateMainImage(newIndex);
  });

  document.querySelector('.next-btn')?.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % imageSources.length;
    updateMainImage(newIndex);
  });

  const favoriteBtn = document.querySelector('.favorite');
  const heartIcon = favoriteBtn?.querySelector('.heart-icon');
  const productId = "product-anja-white";
  const productData = {
    id: productId,
    title: "Anja white socks (used for 2 weeks)",
    price: "$30.99",
    image: "../../accessories/picture_products/white/main.jpg"
  };

  const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (saved.find(item => item.id === productId)) {
    favoriteBtn.classList.add("active");
    heartIcon.src = "../../accessories/heart-filled.svg";
  }

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

  const variantBoxes = document.querySelectorAll(".variant-box");
  const thumbsEls = [
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

  variantBoxes.forEach(box => {
    box.addEventListener("click", () => {
      const color = box.dataset.color;
      mainImage.src = variants[color].main;
      variants[color].thumbs.forEach((src, i) => {
        if (thumbsEls[i]) thumbsEls[i].src = src;
      });

      imageSources = variants[color].thumbs.slice();
      thumbs.forEach(t => t.classList.remove('selected'));
      thumbs[0]?.classList.add('selected');
      currentIndex = 0;

      variantBoxes.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");
    });
  });

  const commentForm = document.getElementById('comment-form');
  const commentList = document.querySelector('.product-comments');

  const loadComments = () => {
    const savedComments = JSON.parse(localStorage.getItem("product-comments")) || [];
    commentList.innerHTML = "";

    let totalRating = 0;
    
    savedComments.forEach(comment => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";
      commentDiv.innerHTML = `
        <p class="comment-author">${comment.author || "Anonymous"}</p>
        <p class="comment-text">${comment.text}</p>
        <div class="comment-footer">
          <div class="comment-actions">
            <a href="#">Like</a>
            <a href="#">Reply</a>
            <span>${comment.time}</span>
          </div>
          <div class="comment-rating">${"★".repeat(comment.rating)}${"☆".repeat(5 - comment.rating)}</div>
        </div>
      `;
      totalRating += comment.rating;
      commentList.appendChild(commentDiv);
    });

     // Ažuriranje prosečne ocene i broja komentara ispod naslova
    const averageRating = savedComments.length ? (totalRating / savedComments.length) : 0;
    const roundedRating = Math.round(averageRating);
    const reviewsElement = document.querySelector(".reviews");

    if (reviewsElement) {
      let fullStars = Math.floor(averageRating);
      let fractional = averageRating - fullStars;
      let halfStar = fractional >= 0.25 && fractional <= 0.75;
      let emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      let starsHTML = '';

      // Dodaj pune zvezdice
      for (let i = 0; i < fullStars; i++) {
          starsHTML += '<img src="../../accessories/star_fill.svg" alt="star" class="star-icon">';
      }

      // Dodaj pola zvezdice (koristi <span> ili možeš Unicode za pola zvezdice, npr. '⯨')
      if (halfStar) {
          starsHTML += '<img src="../../accessories/star_half.svg" alt="half star" class="star-icon">';
      }

      // Dodaj prazne zvezdice
      for (let i = 0; i < emptyStars; i++) {  // OVDE MOŽE BITI GREŠKA
          starsHTML += '<img src="../../accessories/star_nofill.svg" alt="empty star" class="star-icon">';
      }

      reviewsElement.innerHTML = `${starsHTML} ${averageRating.toFixed(1)} / 5 (${savedComments.length} review${savedComments.length !== 1 ? "s" : ""})`;
    }

      // Ažuriranje prosečne ocene i broja komentara kod opisa proizvoda
    const opisRatingElement = document.querySelector(".more-info-section .rating");
    const opisTotalElement = document.querySelector(".more-info-section .rating-total");

    if (opisRatingElement && opisTotalElement) {
      let fullStars = Math.floor(averageRating);
      let fractional = averageRating - fullStars;
      let halfStar = fractional >= 0.25 && fractional <= 0.75;
      let emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
      let starsHTML = '';

      for (let i = 0; i < fullStars; i++) {
        starsHTML += '<img src="../../accessories/star_fill.svg" alt="star" class="star-icon">';
      }
      if (halfStar) {
        starsHTML += '<img src="../../accessories/star_half.svg" alt="half star" class="star-icon">';
      }
      for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<img src="../../accessories/star_nofill.svg" alt="empty star" class="star-icon">';
      }

      opisRatingElement.innerHTML = `
        <div class="rating-display">
          <div class="stars">${starsHTML}</div>
          <div class="rating-text">
            <span class="average">${averageRating.toFixed(1)}</span> / 5 
            <span class="rating-total">(${savedComments.length} komentar${savedComments.length !== 1 ? "a" : ""})</span>
          </div>
        </div>
      `;
    }


  };

  loadComments();

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    const commentText = document.getElementById('comment-text').value.trim();

    if (!selectedRating && !commentText) {
      alert("Unesite ocenu i/ili komentar!");
      return;
    }

    const comment = {
      rating: selectedRating ? parseInt(selectedRating.value) : 0,
      text: commentText || "Bez teksta.",
      time: new Date().toLocaleString(),
      author: "Anonymous"
    };

    let comments = JSON.parse(localStorage.getItem("product-comments")) || [];
    comments.push(comment);
    localStorage.setItem("product-comments", JSON.stringify(comments));

    commentForm.reset();
    loadComments();
  });
});
