function prikaziArhivu() {
  const container = document.querySelector(".content-placeholder");

  container.innerHTML = `
    <h2 style="text-align:center; margin-top: 20px;">📂 Arhivirani Podaci</h2>
    <div class="admin-tabs" style="justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
      <button onclick="ucitajArhiviraneProizvode()">Obrisani Proizvodi</button>
      <button onclick="ucitajArhiviraneRecenzije()">Obrisane Recenzije</button>
      <button onclick="ucitajArhiviraneStavkeKorpe()">Obrisane Stavke Korpe</button>
      <button onclick="ucitajArhiviraneStavkeNarudzbine()">Obrisane Stavke Narudžbine</button>
      <button onclick="ucitajArhiviraneWishlist()">Obrisane Wishlist Stavke</button>
    </div>
    <div id="arhiva-tabela"></div>
  `;
}

// Proizvodi

function ucitajArhiviraneProizvode() {
  fetch(`${window.API_BASE_URL}/api/arhiva/proizvodi`)
    .then(res => res.json())
    .then(data => {
      const tabela = `
        <h3 style="text-align:center;">🧺 Obrisani Proizvodi</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Naziv</th>
              <th>Opis</th>
              <th>Datum Brisanja</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(p => `
              <tr>
                <td>${p.ID_PROIZVOD}</td>
                <td>${p.NAZIV}</td>
                <td>${p.OPIS}</td>
                <td>${p.DATUM_BRISANJA}</td>
                <td>
                  <img src="../../accessories/return.svg" class="ikonica-vrati" onclick="vratiProizvod(${p.ID_PROIZVOD})" title="Vrati proizvod" />
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
      document.getElementById("arhiva-tabela").innerHTML = tabela;
    })
    .catch(err => {
      console.error("❌ Greška:", err);
    });
}

function vratiProizvod(idProizvod) {
  fetch(`${window.API_BASE_URL}/api/arhiva/proizvodi/vrati/${idProizvod}`, {
    method: 'POST'
  })
  .then(res => {
    if (!res.ok) throw new Error("Greška pri vraćanju");
    alert("✅ Proizvod je uspešno vraćen!");
    ucitajArhiviraneProizvode(); // osveži tabelu
  })
  .catch(err => {
    console.error("❌ Greška:", err);
    alert("Greška pri vraćanju proizvoda.");
  });
}


function ucitajArhiviraneRecenzije() {
  fetch(`${window.API_BASE_URL}/api/arhiva/recenzije`)
    .then(res => res.json())
    .then(data => {
      const tabela = `
        <h3 style="text-align:center;">✍️ Obrisane Recenzije</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Proizvod</th>
              <th>ID Kupac</th>
              <th>Ocena</th>
              <th>Komentar</th>
              <th>Datum</th>
              <th>Datum Brisanja</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(r => `
              <tr>
                <td>${r.ID_RECENZIJA}</td>
                <td>${r.ID_PROIZVOD}</td>
                <td>${r.ID_KUPAC}</td>
                <td>${r.OCENA}</td>
                <td>${r.KOMENTAR}</td>
                <td>${r.DATUM}</td>
                <td>${r.DATUM_BRISANJA}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
      document.getElementById("arhiva-tabela").innerHTML = tabela;
    })
    .catch(err => {
      console.error("❌ Greška:", err);
    });
}

function ucitajArhiviraneStavkeKorpe() {
  fetch(`${window.API_BASE_URL}/api/arhiva/stavke_korpe`)
    .then(res => res.json())
    .then(data => {
      const tabela = `
        <h3 style="text-align:center;">🛒 Obrisane Stavke Korpe</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID Stavke</th>
              <th>ID Korpa</th>
              <th>ID Proizvod</th>
              <th>Količina</th>
              <th>Datum Brisanja</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(s => `
              <tr>
                <td>${s.ID_STAVKA}</td>
                <td>${s.ID_KORPA}</td>
                <td>${s.ID_PROIZVOD}</td>
                <td>${s.KOLICINA}</td>
                <td>${s.DATUM_BRISANJA}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
      document.getElementById("arhiva-tabela").innerHTML = tabela;
    })
    .catch(err => {
      console.error("❌ Greška:", err);
    });
}

function ucitajArhiviraneStavkeNarudzbine() {
  fetch(`${window.API_BASE_URL}/api/arhiva/stavke_narudzbine`)
    .then(res => res.json())
    .then(data => {
      const tabela = `
        <h3 style="text-align:center;">📦 Obrisane Stavke Narudžbine</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID Stavke</th>
              <th>ID Narudžbina</th>
              <th>ID Proizvod</th>
              <th>Količina</th>
              <th>Cena/kom</th>
              <th>Ukupna Cena</th>
              <th>Datum Brisanja</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(s => `
              <tr>
                <td>${s.ID_STAVKA}</td>
                <td>${s.ID_NARUDZBINA}</td>
                <td>${s.ID_PROIZVOD}</td>
                <td>${s.KOLICINA}</td>
                <td>${s.CENA_PO_KOMADU}</td>
                <td>${s.UKUPNA_CENA}</td>
                <td>${s.DATUM_OBRISANJA}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
      document.getElementById("arhiva-tabela").innerHTML = tabela;
    })
    .catch(err => {
      console.error("❌ Greška:", err);
    });
}

function ucitajArhiviraneWishlist() {
  fetch(`${window.API_BASE_URL}/api/arhiva/wishlist_stavke`)
    .then(res => res.json())
    .then(data => {
      const tabela = `
        <h3 style="text-align:center;">❤️ Obrisane Wishlist Stavke</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID Wishlist</th>
              <th>ID Kupac</th>
              <th>Datum Brisanja</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(w => `
              <tr>
                <td>${w.ID_WISHLIST}</td>
                <td>${w.ID_KUPAC}</td>
                <td>${w.DATUM_BRISANJA}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
      document.getElementById("arhiva-tabela").innerHTML = tabela;
    })
    .catch(err => {
      console.error("❌ Greška:", err);
    });
}
