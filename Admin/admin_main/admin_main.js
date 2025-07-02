let selectedCategoryId = null;
let selectedPodkategorijaId = null;
let selectedUserId = null;       
let selectedProductId = null; 





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

 /* account dropdown */
 document.addEventListener('DOMContentLoaded', () => {
  // ---------- TOGGLE DROPDOWN ZA ACCOUNT IKONU ----------
  const accountDropdown = document.querySelector('.account-dropdown');
  const accountMenu = document.querySelector('.account-dropdown .account-menu');

  // accountDropdown.addEventListener('click', (e) => {
  //   e.stopPropagation(); // da klik ne „propagates” i ne zatvori meni odmah
  //   accountDropdown.classList.toggle('open');
  // });

  // Zatvori dropdown ako korisnik klikne van njega
  document.addEventListener('click', () => {
    accountDropdown.classList.remove('open');
  });

  // ---------- HANDLERI ZA LOGOUT MODAL ----------
  const logoutBtn = document.getElementById('logout-btn');
  const logoutModal = document.getElementById('logoutModal');
  const confirmLogout = logoutModal.querySelector('.confirm-logout');
  const cancelLogout = logoutModal.querySelector('.cancel-logout');

  // Otvori modal kad se klikne na “Izloguj se” u meniju
  logoutBtn.addEventListener('click', (e) => {
    e.stopPropagation();       // ne dozvoli da klik zatvori dropdown
    accountDropdown.classList.remove('open');
    logoutModal.style.display = 'block';
  });

  // Kad klikneš “Odustani” u modal-u, zatvori modal
  cancelLogout.addEventListener('click', () => {
    logoutModal.style.display = 'none';
  });

  // Kad klikneš na pozadinu modala, zatvori ga
  window.addEventListener('click', (e) => {
    if (e.target === logoutModal) {
      logoutModal.style.display = 'none';
    }
  });

  // Kad se potvrdi odjava, npr. brišemo token ili localStorage i vraćamo na login/početnu
  confirmLogout.addEventListener('click', () => {
    // Ovde obriši lokalne podatke korisnika, npr. localStorage.clear() ili samo token/ID
    // localStorage.clear();
    // Ili: localStorage.removeItem("userToken"); itd.

    // Preusmeri korisnika na stranicu za login ili glavnu
    window.location.href = '../main_site/main_site.html';
  });
});

document.getElementById("physicalDeleteBtn").addEventListener("click", fizickoBrisanje);



document.addEventListener('click', function (e) {
  
  // Proizvodi
  if (e.target.classList.contains('icon-trash-proizvod')) {
    selectedProductId = e.target.dataset.id;
    selectedUserId = null;
    selectedCategoryId = null;
    selectedPodkategorijaId = null;
    document.getElementById('deleteConfirmModal').style.display = 'block';
  }

  // Kategorije
  else if (e.target.classList.contains('icon-trash-kategorija')) {
    selectedCategoryId = e.target.dataset.id;
    selectedUserId = null;
    selectedProductId = null;
    selectedPodkategorijaId = null;
    document.getElementById('deleteConfirmModal').style.display = 'block';
  }

  // Podkategorije
  else if (e.target.classList.contains('icon-trash-podkategorija')) {
    selectedPodkategorijaId = e.target.dataset.id;
    selectedUserId = null;
    selectedProductId = null;
    selectedCategoryId = null;
    document.getElementById('deleteConfirmModal').style.display = 'block';
  }
});







document.addEventListener('click', function(e) {
  if (e.target.classList.contains('icon-edit-kategorija')) {
    const id = e.target.dataset.id;
    const naziv = e.target.dataset.naziv;

    document.getElementById('editCategoryId').value = id;
    document.getElementById('editCategoryName').value = naziv;

    document.getElementById('editCategoryModal').style.display = 'block';
  }
});

document.getElementById('cancelEditCategoryBtn').addEventListener('click', () => {
  document.getElementById('editCategoryModal').style.display = 'none';
});

document.getElementById('saveCategoryChangesBtn').addEventListener('click', async () => {
  const id = document.getElementById('editCategoryId').value;
  const naziv = document.getElementById('editCategoryName').value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/kategorije/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ naziv })
    });

    if (res.ok) {
      alert("✅ Kategorija uspešno izmenjena.");
      document.getElementById('editCategoryModal').style.display = 'none';
      prikaziKatiPKat(); // refreshuj prikaz
    } else {
      alert("❌ Greška prilikom izmene kategorije.");
    }
  } catch (err) {
    console.error("❌ Greska:", err);
  }
});



//EDIT

// Otvaranje i zatvaranje modala za uređivanje kategorije
const editCategoryModal = document.getElementById("editCategoryModal");
const editCategoryIdInput = document.getElementById("editCategoryId");
const editCategoryNameInput = document.getElementById("editCategoryName");
const saveCategoryBtn = document.getElementById("saveCategoryChangesBtn");
const cancelEditCategoryBtn = document.getElementById("cancelEditCategoryBtn");

// Otvaranje i zatvaranje modala za uređivanje podkategorije
const editPodkategorijaModal = document.getElementById("editPodkategorijaModal");
const editPodkategorijaIdInput = document.getElementById("editPodkategorijaId");
const editPodkategorijaCategoryIdInput = document.getElementById("editPodkategorijaCategoryId");
const editPodkategorijaNameInput = document.getElementById("editPodkategorijaName");
const savePodkategorijaBtn = document.getElementById("savePodkategorijaChangesBtn");
const cancelEditPodkategorijaBtn = document.getElementById("cancelEditPodkategorijaBtn");

// Otvaranje i zatvaranje modala za uređivanje proizvoda
const editProizvodModal = document.getElementById("editProizvodModal");
const editProizvodIdInput = document.getElementById("editProizvodId");
const editProizvodNazivInput = document.getElementById("editProizvodNaziv");
const editProizvodCenaInput = document.getElementById("editProizvodCena");
const editProizvodKategorijaInput = document.getElementById("editProizvodKategorija");
const editProizvodPodkategorijaInput = document.getElementById("editProizvodPodkategorija");
const saveProizvodBtn = document.getElementById("saveProizvodChangesBtn");
const cancelEditProizvodBtn = document.getElementById("cancelEditProizvodBtn");

// Modal za potvrdu brisanja
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const logicalDeleteBtn = document.getElementById("logicalDeleteBtn");
const physicalDeleteBtn = document.getElementById("physicalDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");


// Funkcije za otvaranje modala sa podacima

function openEditCategoryModal(category) {
  editCategoryIdInput.value = category.id;
  editCategoryNameInput.value = category.naziv;
  editCategoryModal.style.display = "flex";
}

function closeEditCategoryModal() {
  editCategoryModal.style.display = "none";
}

function openEditPodkategorijaModal(podkategorija) {
  editPodkategorijaIdInput.value = podkategorija.id;
  editPodkategorijaCategoryIdInput.value = podkategorija.id_kategorija;
  editPodkategorijaNameInput.value = podkategorija.naziv;
  editPodkategorijaModal.style.display = "flex";
}

function closeEditPodkategorijaModal() {
  editPodkategorijaModal.style.display = "none";
}

function openEditProizvodModal(proizvod) {
  editProizvodIdInput.value = proizvod.id;
  editProizvodNazivInput.value = proizvod.naziv;
  editProizvodCenaInput.value = proizvod.cena;
  editProizvodKategorijaInput.value = proizvod.id_kategorija;
  editProizvodPodkategorijaInput.value = proizvod.id_podkategorija;
  editProizvodModal.style.display = "flex";
}

function closeEditProizvodModal() {
  editProizvodModal.style.display = "none";
}

// Otvaranje modala za brisanje
function openDeleteConfirmModal(id, type) {
  selectedDeleteId = id;
  // Možeš podesiti i poruku u modal-u u zavisnosti od tipa (korisnik, proizvod...)
  deleteConfirmModal.style.display = "flex";
}

function closeDeleteConfirmModal() {
  deleteConfirmModal.style.display = "none";
}

// Event listeneri za zatvaranje modala na dugme Otkaži
cancelEditCategoryBtn.addEventListener("click", closeEditCategoryModal);
cancelEditPodkategorijaBtn.addEventListener("click", closeEditPodkategorijaModal);
cancelEditProizvodBtn.addEventListener("click", closeEditProizvodModal);
cancelDeleteBtn.addEventListener("click", closeDeleteConfirmModal);

// Ovde ide tvoj kod za potvrdu izmene i potvrdu brisanja - npr. fetch zahtevi na backend
saveCategoryBtn.addEventListener("click", () => {
  const id = editCategoryIdInput.value;
  const naziv = editCategoryNameInput.value.trim();
  if (!naziv) {
    alert("Naziv kategorije ne može biti prazan.");
    return;
  }
  // API poziv za čuvanje izmene (primer)
  fetch(`${API_BASE_URL}/kategorije/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ naziv }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Greška prilikom izmene kategorije");
      return res.json();
    })
    .then((data) => {
      alert("Kategorija uspešno izmenjena.");
      closeEditCategoryModal();
      // Osveži prikaz kategorija, npr. pozovi funkciju koja ih učitava
      loadCategories();
    })
    .catch((err) => alert(err.message));
});

savePodkategorijaBtn.addEventListener("click", () => {
  const id = editPodkategorijaIdInput.value;
  const id_kategorija = editPodkategorijaCategoryIdInput.value;
  const naziv = editPodkategorijaNameInput.value.trim();
  if (!naziv || !id_kategorija) {
    alert("Sva polja su obavezna.");
    return;
  }
  fetch(`${API_BASE_URL}/podkategorije/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_kategorija, naziv }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Greška prilikom izmene podkategorije");
      return res.json();
    })
    .then(() => {
      alert("Podkategorija uspešno izmenjena.");
      closeEditPodkategorijaModal();
      loadPodkategorije();
    })
    .catch((err) => alert(err.message));
});

saveProizvodBtn.addEventListener("click", () => {
  const id = editProizvodIdInput.value;
  const naziv = editProizvodNazivInput.value.trim();
  const cena = parseFloat(editProizvodCenaInput.value);
  const id_kategorija = editProizvodKategorijaInput.value;
  const id_podkategorija = editProizvodPodkategorijaInput.value;

  if (!naziv || isNaN(cena) || !id_kategorija || !id_podkategorija) {
    alert("Sva polja moraju biti ispravno popunjena.");
    return;
  }

  fetch(`${API_BASE_URL}/proizvodi/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ naziv, cena, id_kategorija, id_podkategorija }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Greška prilikom izmene proizvoda");
      return res.json();
    })
    .then(() => {
      alert("Proizvod uspešno izmenjen.");
      closeEditProizvodModal();
      loadProizvodi();
    })
    .catch((err) => alert(err.message));
});



