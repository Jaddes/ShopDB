


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



