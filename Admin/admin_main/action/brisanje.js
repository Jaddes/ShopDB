function inicijalizujLogickoBrisanje() {
  document.getElementById('logicalDeleteBtn').addEventListener('click', async () => {
    try {
      if (selectedProductId) {
        const res = await fetch(`${window.API_BASE_URL}/api/proizvodi/logicko_brisanje/${selectedProductId}`, { method: 'PUT' });
        if (res.ok) {
          alert("✅ Proizvod logički obrisan.");
          prikaziProizvode();
        }
      } else if (selectedCategoryId) {
        const res = await fetch(`${window.API_BASE_URL}/api/kategorije/logicko_brisanje/${selectedCategoryId}`, { method: 'PUT' });
        if (res.ok) {
          alert("✅ Kategorija logički obrisana.");
          prikaziKatiPKat();  // ili prikaziKategorije(); - zavisno od tvoje funkcije za refresh
        }
      } else if (selectedPodkategorijaId) {
        const res = await fetch(`${window.API_BASE_URL}/api/podkategorije/logicko_brisanje/${selectedPodkategorijaId}`, { method: 'PUT' });
        if (res.ok) {
          alert("✅ Podkategorija logički obrisana.");
          prikaziKatiPKat();
        }
      }
    } catch (err) {
      console.error('❌ Greška pri logičkom brisanju:', err);
    }
    document.getElementById('deleteConfirmModal').style.display = 'none';
  });
}


function inicijalizujFizickoBrisanje() {
  document.getElementById('physicalDeleteBtn').addEventListener('click', async () => {
    try {
      if (selectedProductId) {
        const res = await fetch(`${window.API_BASE_URL}/api/proizvodi/fizicko_brisanje/${selectedProductId}`, { method: 'DELETE' });
        if (res.ok) {
          alert("✅ Proizvod fizički obrisan.");
          prikaziProizvode();
        }
      } else if (selectedCategoryId) {
        const res = await fetch(`${window.API_BASE_URL}/api/kategorije/fizicko_brisanje/${selectedCategoryId}`, { method: 'DELETE' });
        if (res.ok) {
          alert("✅ Kategorija fizički obrisana.");
          prikaziKatiPKat();
        }
      } else if (selectedPodkategorijaId) {
        const res = await fetch(`${window.API_BASE_URL}/api/podkategorije/fizicko_brisanje/${selectedPodkategorijaId}`, { method: 'DELETE' });
        if (res.ok) {
          alert("✅ Podkategorija fizički obrisana.");
          prikaziKatiPKat();
        }
      }
    } catch (err) {
      console.error('❌ Greška pri fizičkom brisanju:', err);
    }
    document.getElementById('deleteConfirmModal').style.display = 'none';
  });
}

document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
  document.getElementById('deleteConfirmModal').style.display = 'none';
});


document.addEventListener('DOMContentLoaded', async () => {
  await initializeApiBaseUrl(); // sigurno sačekaj da API_BASE_URL bude spreman

  const dugmeKorisnici = document.querySelector('button[data-action="korisnici"]');
  if (dugmeKorisnici) {
    dugmeKorisnici.addEventListener('click', prikaziKorisnike);
  } else {
    console.error("❌ Dugme 'Korisnici' nije pronađeno.");
  }

  const dugmeKategorije = document.querySelector('button[data-action="kategorije"]');
  if (dugmeKategorije) {
    dugmeKategorije.addEventListener('click', prikaziKatiPKat);
  }

  prikaziKorisnike(); // Automacki prikaz tabele Korisnici
  inicijalizujLogickoBrisanje();
  inicijalizujFizickoBrisanje();
});

//Event lisiner

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('icon-trash-proizvod')) {
    selectedProductId = e.target.dataset.id;
    document.getElementById('deleteConfirmModal').style.display = 'block';

      // Logičko brisanje proizvoda
    document.getElementById('logicalDeleteBtn').onclick = async () => {
      if (!selectedProductId) return;

      try {
        const res = await fetch(`${window.API_BASE_URL}/api/proizvodi/logicko_brisanje/${selectedProductId}`, {
          method: 'PUT'
        });

        if (res.ok) {
          alert("✅ Proizvod logički obrisan.");
          prikaziProizvode(); // osveži tabelu
        } else {
          alert("❌ Greška pri logičkom brisanju proizvoda.");
        }
      } catch (err) {
        console.error("❌ Greška pri logičkom brisanju proizvoda:", err);
      }

      document.getElementById('deleteConfirmModal').style.display = 'none';
    };


    // Override dugme za fizičko brisanje proizvoda
    document.getElementById('physicalDeleteBtn').onclick = async () => {
      try {
        const res = await fetch(`${window.API_BASE_URL}/api/proizvodi/fizicko_brisanje/${selectedProductId}`, {
          method: 'DELETE'
        });

        if (res.ok) {
          alert("✅ Proizvod fizički obrisan.");
          prikaziProizvode(); // automatski refresh
        } else {
          alert("❌ Greška pri brisanju proizvoda.");
        }
      } catch (err) {
        console.error("❌ Greška pri fizičkom brisanju proizvoda:", err);
      }
      document.getElementById('deleteConfirmModal').style.display = 'none';
    };
  }
});
