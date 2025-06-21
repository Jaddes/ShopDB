let API_BASE_URL = "";
let apiReady = false;


const express = require('express');
const cors = require('cors');

// Dodavanje konekcije sa connection.js
const oracledb = require('oracledb');

//Konekcije sa api
const kategorijeRoutes = require('./routes/kategorije');
const korisniciRoutes = require('./routes/korisnici');
const podkategorijeRoutes = require('./routes/podkategorije');
const kupciRoutes = require('./routes/kupci');
const proizvodiRoutes = require('./routes/proizvodi');

const app = express();
const PORT = 3000;

app.use(cors());
app.use('/api', kategorijeRoutes);
app.use('/api', korisniciRoutes);
app.use('/api', podkategorijeRoutes);
app.use('/api', kupciRoutes);
app.use('/api', proizvodiRoutes);


app.get('/', (req, res) => {
  res.send('Backend radi!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server aktivan na http://localhost:${PORT}`);
});

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

//Dugme za korisnike
const { getConnection } = require('./db/connection');

app.get('/api/korisnici', async (req, res) => {
  let connection;
  try {
    connection = await getConnection(); // ✅ sada koristiš connection
    const result = await connection.execute(`
      SELECT 
        id_korisnik AS ID_K, 
        ime, 
        prezime, 
        email, 
        lozinka, 
        uloga, 
        TO_CHAR(datum_registracije, 'YYYY-MM-DD') AS datum_registracije
      FROM KORISNICI
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška prilikom dohvatanja korisnika:", err);
    res.status(500).json({ error: "Greška u bazi" });
  } finally {
    if (connection) await connection.close();
  }
});

// //Dugme za Kupce
function prikaziKupce() {
  const container = document.querySelector('.content-placeholder');
  container.innerHTML = `
    <h2 style="text-align:center;">Kupci</h2>
    <table class="admin-table" id="kupciTabela">
      <thead>
        <tr>
          <th>ID_KUPAC</th>
          <th>ID_KORISNIK</th>
          <th>Korisnik</th>
          <th>Ulica</th>
          <th>Broj</th>
          <th>Grad</th>
          <th>Poštanski broj</th>
          <th>Telefon</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  fetch(`${window.API_BASE_URL}/api/kupci`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#kupciTabela tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.id_kupac}</td>
          <td>${row.id_korisnik}</td>
          <td>${row.ime} ${row.prezime}</td>
          <td>${row.ulica}</td>
          <td>${row.broj}</td>
          <td>${row.grad}</td>
          <td>${row.postanski_broj}</td>
          <td>${row.telefon}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("❌ Greška u fetch kupaca:", err);
    });
}




// //Dugme za proizvode
app.get('/api/proizvodi', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(`
      SELECT 
        p.id_proizvod,
        p.naziv,
        p.opis,
        pk.naziv AS podkategorija,
        b.naziv AS boja,
        o.naziv AS oznaka,
        p.slika_url,
        TO_CHAR(p.datum_nabavke, 'YYYY-MM-DD') AS datum_nabavke,
        p.nabavna_cena,
        p.prodajna_cena,
        p.kolicina
      FROM PROIZVODI p
      LEFT JOIN PODKATEGORIJE pk ON p.id_podkategorija = pk.id_podkategorija
      LEFT JOIN BOJE b ON p.id_boja = b.id_boja
      LEFT JOIN OZNAKE o ON p.id_oznaka = o.id_oznaka
      ORDER BY p.id_proizvod
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/proizvodi:", err);
    res.status(500).json({ error: 'Greška u bazi proizvoda' });
  } finally {
    if (connection) await connection.close();
  }
});

// //Dugme za Narudzbine
// app.get('/api/narudzbine', async (req, res) => {
//   let connection;
//   try {
//     connection = await oracledb.getConnection(dbConfig);

//     const result = await connection.execute(`
//       SELECT 
//         n.id_narudzbina,
//         n.id_kupac,
//         k.ime || ' ' || k.prezime AS kupac,
//         TO_CHAR(n.datum_narudzbine, 'YYYY-MM-DD') AS datum_narudzbine,
//         n.status,
//         n.nacin_dostave,
//         n.cena_dostave,
//         n.ukupna_cena
//       FROM NARUDZBINE n
//       JOIN KUPCI kup ON n.id_kupac = kup.id_kupac
//       JOIN KORISNICI k ON kup.id_korisnik = k.id_korisnik
//       ORDER BY n.id_narudzbina DESC
//     `);

//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Greška u /api/narudzbine:", err);
//     res.status(500).json({ error: 'Greška u bazi narudžbina' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });

// app.get('/api/narudzbine/:id/stavke', async (req, res) => {
//   const idNarudzbina = req.params.id;
//   let connection;
//   try {
//     connection = await oracledb.getConnection(dbConfig);

//     const result = await connection.execute(`
//       SELECT 
//         id_stavka_narudzbine,
//         id_narudzbina,
//         id_proizvod,
//         kolicina,
//         cena_po_komadu,
//         kolicina * cena_po_komadu AS ukupna_cena
//       FROM STAVKE_NARUDZBINE
//       WHERE id_narudzbina = :id
//     `, [idNarudzbina]);

//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Greška u stavkama narudžbine:", err);
//     res.status(500).json({ error: 'Greška u bazi stavki narudžbine' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });

// //Dugme za korpe
// app.get('/api/korpe', async (req, res) => {
//   let connection;
//   try {
//     connection = await oracledb.getConnection(dbConfig);
//     const result = await connection.execute(`
//       SELECT 
//         k.id_korpa,
//         k.id_kupac,
//         TO_CHAR(k.datum_kreiranja, 'YYYY-MM-DD') AS datum,
//         u.ime || ' ' || u.prezime AS kupac
//       FROM KORPA k
//       JOIN KUPCI c ON k.id_kupac = c.id_kupac
//       JOIN KORISNICI u ON c.id_korisnik = u.id_korisnik
//       ORDER BY k.id_korpa DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Greška u /api/korpe:", err);
//     res.status(500).json({ error: 'Greška u bazi korpi' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });

// app.get('/api/korpe/:id/stavke', async (req, res) => {
//   const idKorpa = req.params.id;
//   let connection;
//   try {
//     connection = await oracledb.getConnection(dbConfig);
//     const result = await connection.execute(`
//       SELECT 
//         s.id_stavka_korpe,
//         s.id_korpa,
//         s.id_proizvod,
//         p.naziv,
//         s.kolicina
//       FROM STAVKE_KORPE s
//       JOIN PROIZVODI p ON s.id_proizvod = p.id_proizvod
//       WHERE s.id_korpa = :id
//     `, [idKorpa]);
//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Greška u /api/korpe/:id/stavke:", err);
//     res.status(500).json({ error: 'Greška u bazi stavki korpe' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });

// //Dugme za Recenziju
// app.get('/api/recenzije', async (req, res) => {
//   let connection;
//   try {
//     connection = await oracledb.getConnection(dbConfig);

//     const result = await connection.execute(`
//       SELECT 
//         r.id_recenzija,
//         r.id_kupac,
//         u.ime || ' ' || u.prezime AS kupac,
//         r.id_proizvod,
//         p.naziv AS proizvod,
//         r.ocena,
//         r.komentar,
//         TO_CHAR(r.datum, 'YYYY-MM-DD') AS datum
//       FROM RECENZIJE r
//       JOIN KUPCI k ON r.id_kupac = k.id_kupac
//       JOIN KORISNICI u ON k.id_korisnik = u.id_korisnik
//       JOIN PROIZVODI p ON r.id_proizvod = p.id_proizvod
//       ORDER BY r.id_recenzija DESC
//     `);

//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Greška u /api/recenzije:", err);
//     res.status(500).json({ error: 'Greška u bazi recenzija' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });

// // Dugme za wishlist
// app.get('/api/wishlist', async (req, res) => {
//   let connection;
//   try {
//     connection = await oracledb.getConnection(dbConfig);

//     const result = await connection.execute(`
//       SELECT 
//         w.id_wishlist,
//         w.id_kupac,
//         u.ime || ' ' || u.prezime AS kupac,
//         TO_CHAR(w.datum_kreiranja, 'YYYY-MM-DD') AS datum
//       FROM WISHLIST w
//       JOIN KUPCI k ON w.id_kupac = k.id_kupac
//       JOIN KORISNICI u ON k.id_korisnik = u.id_korisnik
//       ORDER BY w.id_wishlist DESC
//     `);

//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Greška u /api/wishlist:", err);
//     res.status(500).json({ error: 'Greška u bazi želja' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });

// app.get('/api/wishlist/:id/stavke', async (req, res) => {
//   const idWishlist = req.params.id;
//   let connection;
//   try {
//     connection = await oracledb.getConnection(dbConfig);

//     const result = await connection.execute(`
//       SELECT 
//         ws.id_stavka_wishlist,
//         ws.id_wishlist,
//         ws.id_proizvod,
//         p.naziv
//       FROM WISHLIST_STAVKE ws
//       JOIN PROIZVODI p ON ws.id_proizvod = p.id_proizvod
//       WHERE ws.id_wishlist = :id
//     `, [idWishlist]);

//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Greška u /api/wishlist/:id/stavke:", err);
//     res.status(500).json({ error: 'Greška u bazi stavki želja' });
//   } finally {
//     if (connection) await connection.close();
//   }
// });

// Dugme za Kategorija i PodKategorije
app.get('/api/kategorije', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(`
      SELECT id_kategorija, naziv FROM KATEGORIJE ORDER BY id_kategorija
    `);

    res.json(result.rows); // direktno šaljemo niz sa [id, naziv]
  } catch (err) {
    console.error("❌ Greška u /api/kategorije:", err);
    res.status(500).json({ error: 'Greška u bazi kategorija' });
  } finally {
    if (connection) await connection.close();
  }
});

app.get('/api/kategorije/:id/podkategorije', async (req, res) => {
  const idKat = req.params.id;
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(`
      SELECT id_podkategorija, id_kategorija, naziv
      FROM PODKATEGORIJE
      WHERE id_kategorija = :id
      ORDER BY id_podkategorija
    `, [idKat]);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u podkategorijama:", err);
    res.status(500).json({ error: 'Greška u bazi podkategorija' });
  } finally {
    if (connection) await connection.close();
  }
});
