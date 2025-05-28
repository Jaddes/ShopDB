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
    alert('Proizvod je dodat u korpu!');
});

document.querySelector('.buy-now').addEventListener('click', () => {
    alert('Hvala na kupovini!');
});

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
      commentList.appendChild(commentDiv);
    });
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
