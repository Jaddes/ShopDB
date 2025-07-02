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
const narudzbineRoutes = require('./routes/narudzbine');
const stavkeNarudzbineRoutes = require('./routes/stavke_narudzbine');
const korpaRoutes = require('./routes/korpa');
const stavkeKorpeRoutes = require('./routes/stavke_korpe');
const recenzijeRoutes = require('./routes/recenzije');
const wishlistRoutes = require('./routes/wishlist');
const stavkeWishlistRoutes = require('./routes/stavke_wishlist');
const bojeRoutes = require('./routes/boje');
const oznakeRoutes = require('./routes/oznake');




const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 
app.use('/api', kategorijeRoutes);
app.use('/api', korisniciRoutes);
app.use('/api', podkategorijeRoutes);
app.use('/api', kupciRoutes);
app.use('/api', proizvodiRoutes);
app.use('/api', narudzbineRoutes);
app.use('/api', stavkeNarudzbineRoutes);
app.use('/api', korpaRoutes);
app.use('/api', stavkeKorpeRoutes);
app.use('/api', recenzijeRoutes);
app.use('/api', wishlistRoutes);
app.use('/api', stavkeWishlistRoutes);
app.use('/api', bojeRoutes);
app.use('/api', oznakeRoutes);






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




//Dugme za proizvode
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

app.post('/api/proizvodi', async (req, res) => {
  const {
    naziv, opis, id_podkategorija, id_boja, id_oznaka,
    slika_url, datum_nabavke, nabavna_cena, prodajna_cena, kolicina
  } = req.body;

  let conn;
  try {
    conn = await getConnection();
    await conn.execute(`
      INSERT INTO PROIZVODI (
        naziv, opis, id_podkategorija, id_boja, id_oznaka,
        slika_url, datum_nabavke, nabavna_cena, prodajna_cena, kolicina
      ) VALUES (
        :naziv, :opis, :id_podkategorija, :id_boja, :id_oznaka,
        :slika_url, TO_DATE(:datum_nabavke, 'YYYY-MM-DD'),
        :nabavna_cena, :prodajna_cena, :kolicina
      )
    `, {
      naziv, opis, id_podkategorija, id_boja, id_oznaka,
      slika_url, datum_nabavke, nabavna_cena, prodajna_cena, kolicina
    });

    await conn.commit();
    res.status(201).json({ msg: '✅ Proizvod uspešno dodat' });
  } catch (err) {
    console.error('❌ Greška pri dodavanju proizvoda:', err);
    res.status(500).json({ error: 'Greška u dodavanju proizvoda' });
  } finally {
    if (conn) await conn.close();
  }
});

//Dugme za Korpu
app.get('/api/stavke_korpe', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`
      SELECT 
        s.id_stavka_korpe AS ID_STAVKA,
        s.id_korpa AS ID_KORPA,
        s.id_proizvod AS ID_PROIZVOD,
        p.naziv AS NAZIV_PROIZVODA,
        s.kolicina AS KOLICINA
      FROM STAVKE_KORPE s
      JOIN PROIZVODI p ON s.id_proizvod = p.id_proizvod
      ORDER BY s.id_korpa
    `, [], { outFormat: oracledb.OBJECT });

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/stavke_korpe:", err);
    res.status(500).json({ error: 'Greška u bazi stavki korpe' });
  } finally {
    if (connection) await connection.close();
  }
});



//Dugme za Recenziju
app.get('/api/recenzije', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(`
      SELECT 
        r.id_recenzija,
        r.id_kupac,
        u.ime || ' ' || u.prezime AS kupac,
        r.id_proizvod,
        p.naziv AS proizvod,
        r.ocena,
        r.komentar,
        TO_CHAR(r.datum, 'YYYY-MM-DD') AS datum
      FROM RECENZIJE r
      JOIN KUPCI k ON r.id_kupac = k.id_kupac
      JOIN KORISNICI u ON k.id_korisnik = u.id_korisnik
      JOIN PROIZVODI p ON r.id_proizvod = p.id_proizvod
      ORDER BY r.id_recenzija DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/recenzije:", err);
    res.status(500).json({ error: 'Greška u bazi recenzija' });
  } finally {
    if (connection) await connection.close();
  }
});

// Dugme za wishlist
app.get('/api/stavke_wishlist', async (req, res) => {
  const idWishlist = req.query.id; // bitno!
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(`
      SELECT 
        ws.id_stavka_wishlist AS ID_STAVKA,
        ws.id_wishlist AS ID_WISHLIST,
        ws.id_proizvod AS ID_PROIZVOD,
        p.naziv AS NAZIV_PROIZVODA
      FROM WISHLIST_STAVKE ws
      JOIN PROIZVODI p ON ws.id_proizvod = p.id_proizvod
      WHERE ws.id_wishlist = :id
    `, [idWishlist], { outFormat: oracledb.OBJECT });

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/stavke_wishlist:", err);
    res.status(500).json({ error: 'Greška u bazi stavki želja' });
  } finally {
    if (connection) await connection.close();
  }
});


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

app.get('/api/podkategorije', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(`
      SELECT id_podkategorija, id_kategorija, naziv
      FROM PODKATEGORIJE
      ORDER BY id_podkategorija
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/podkategorije:", err);
    res.status(500).json({ error: 'Greška u bazi podkategorija' });
  } finally {
    if (connection) await connection.close();
  }
});

// Logicko brisanje proizvoda

app.put('/api/proizvodi/logicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // 1. Provera da li proizvod postoji
    const provera = await conn.execute(
      `SELECT * FROM PROIZVODI WHERE id_proizvod = :id`,
      [id]
    );

    if (provera.rows.length === 0) {
      return res.status(404).json({ error: 'Proizvod ne postoji' });
    }

  // 2. Kopiranje povezanih podataka u arhivske tabele (OBRISANE_*)
await conn.execute(`
  INSERT INTO OBRISANE_STAVKE_KORPE (
    id_stavka_korpe, id_korpa, id_proizvod, kolicina, datum_brisanja
  )
  SELECT 
    id_stavka_korpe, id_korpa, id_proizvod, kolicina, SYSDATE
  FROM STAVKE_KORPE
  WHERE id_proizvod = :id
`, [id]);

await conn.execute(`
  INSERT INTO OBRISANE_WISHLISTE (
    id_wishlist, id_kupac, datum_brisanja
  )
  SELECT 
    w.id_wishlist,
    w.id_kupac,
    SYSDATE
  FROM WISHLIST_STAVKE ws
  JOIN WISHLIST w ON ws.id_wishlist = w.id_wishlist
  WHERE ws.id_proizvod = :id
`, [id]);


await conn.execute(`
  INSERT INTO OBRISANE_RECENZIJE (
    id_recenzija, id_proizvod, id_kupac, ocena, komentar, datum, datum_brisanja
  )
  SELECT 
    id_recenzija, id_proizvod, id_kupac, ocena, komentar, datum, SYSDATE
  FROM RECENZIJE
  WHERE id_proizvod = :id
`, [id]);

await conn.execute(`
  INSERT INTO OBRISANE_STAVKE_NARUDZBINE (
    id_stavka_narudzbine, id_narudzbina, id_proizvod, kolicina, 
    cena_po_komadu, ukupna_cena, datum_obrisanja
  )
  SELECT 
    id_stavka_narudzbine, id_narudzbina, id_proizvod, kolicina, 
    cena_po_komadu, ukupna_cena, SYSDATE
  FROM STAVKE_NARUDZBINE
  WHERE id_proizvod = :id
`, [id]);

    // 3. Kopiranje samog proizvoda u tabelu obrisanih sa datumom brisanja
    await conn.execute(`
      INSERT INTO OBRISANI_PROIZVODI (
        id_proizvod, naziv, opis, id_podkategorija, id_boja, id_oznaka,
        slika_url, datum_nabavke, nabavna_cena, prodajna_cena, kolicina, datum_brisanja
      )
      SELECT
        id_proizvod, naziv, opis, id_podkategorija, id_boja, id_oznaka,
        slika_url, datum_nabavke, nabavna_cena, prodajna_cena, kolicina, SYSDATE
      FROM PROIZVODI
      WHERE id_proizvod = :id
    `, [id]);
  // 4. Brisanje podataka iz originalnih tabela (ISTIM REDOSLEDOM)
  await conn.execute(`DELETE FROM STAVKE_KORPE WHERE id_proizvod = :id`, [id]);
  await conn.execute(`DELETE FROM WISHLIST_STAVKE WHERE id_proizvod = :id`, [id]);
  await conn.execute(`DELETE FROM RECENZIJE WHERE id_proizvod = :id`, [id]);
  await conn.execute(`DELETE FROM STAVKE_NARUDZBINE WHERE id_proizvod = :id`, [id]);
  await conn.execute(`DELETE FROM PROIZVODI WHERE id_proizvod = :id`, [id]);

    await conn.commit();
    res.json({ msg: '✅ Proizvod logički obrisan' });

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('❌ Greška pri logičkom brisanju proizvoda:', err);
    res.status(500).json({ error: 'Greška u logičkom brisanju proizvoda' });
  } finally {
    if (conn) await conn.close();
  }
});


//Fizicko brisanje proizvoda

app.delete('/api/proizvodi/fizicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Prvo obriši sve povezane redove iz vezanih tabela
    // await conn.execute(`DELETE FROM STAVKE_KORPE WHERE id_proizvod = :id`, [id]);
    await conn.execute(`DELETE FROM WISHLIST_STAVKE WHERE id_proizvod = :id`, [id]);
    await conn.execute(`DELETE FROM RECENZIJE WHERE id_proizvod = :id`, [id]);
    await conn.execute(`DELETE FROM STAVKE_NARUDZBINE WHERE id_proizvod = :id`, [id]);

    // Sada možeš obrisati iz PROIZVODI
    await conn.execute(`DELETE FROM PROIZVODI WHERE id_proizvod = :id`, [id]);

    await conn.commit();
    res.json({ msg: '✅ Proizvod fizički obrisan' });
  } catch (err) {
    console.error('❌ Greška pri fizičkom brisanju proizvoda:', err);
    res.status(500).json({ error: 'Greška u brisanju proizvoda' });
  } finally {
    if (conn) await conn.close();
  }
});



//logicko brisanje kategorija

app.put('/api/kategorije/logicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Provera da li kategorija postoji
    const provera = await conn.execute(
      `SELECT * FROM KATEGORIJE WHERE id_kategorija = :id`,
      [id]
    );
    if (provera.rows.length === 0) {
      return res.status(404).json({ error: 'Kategorija ne postoji' });
    }

    // 1. Kopiranje kategorije u OBRISANE_KATEGORIJE
    await conn.execute(`
      INSERT INTO OBRISANE_KATEGORIJE (id_kategorija, naziv, datum_brisanja)
      SELECT id_kategorija, naziv, SYSDATE
      FROM KATEGORIJE WHERE id_kategorija = :id
    `, [id]);

    // 2. Dohvati sve podkategorije za tu kategoriju
    const podkategorije = await conn.execute(`
      SELECT id_podkategorija FROM PODKATEGORIJE WHERE id_kategorija = :id
    `, [id]);

    // 3. Za svaku podkategoriju pozovi logičko brisanje podkategorije (ili napiši inline)
    for (const row of podkategorije.rows) {
      const podkatId = row[0];

      // Kopiranje podkategorije u OBRISANE_PODKATEGORIJE
      await conn.execute(`
        INSERT INTO OBRISANE_PODKATEGORIJE (id_podkategorija, id_kategorija, naziv, datum_brisanja)
        SELECT id_podkategorija, id_kategorija, naziv, SYSDATE
        FROM PODKATEGORIJE WHERE id_podkategorija = :pid
      `, [podkatId]);

      // Logičko brisanje proizvoda te podkategorije - kopiranje u OBRISANI_PROIZVODI itd
      const proizvodi = await conn.execute(`
        SELECT id_proizvod FROM PROIZVODI WHERE id_podkategorija = :pid
      `, [podkatId]);

      for (const pRow of proizvodi.rows) {
        const proizvodId = pRow[0];

        // Logičko brisanje proizvoda (isto kao tvoj postojeći kod)
        // Kopiranje povezanih podataka u arhivske tabele
        await conn.execute(`
          INSERT INTO OBRISANE_STAVKE_KORPE (
            id_stavka_korpe, id_korpa, id_proizvod, kolicina, datum_brisanja
          )
          SELECT id_stavka_korpe, id_korpa, id_proizvod, kolicina, SYSDATE
          FROM STAVKE_KORPE WHERE id_proizvod = :pid
        `, [proizvodId]);

        await conn.execute(`
          INSERT INTO OBRISANE_WISHLISTE (
            id_wishlist, id_kupac, datum_brisanja
          )
          SELECT w.id_wishlist, w.id_kupac, SYSDATE
          FROM WISHLIST_STAVKE ws JOIN WISHLIST w ON ws.id_wishlist = w.id_wishlist
          WHERE ws.id_proizvod = :pid
        `, [proizvodId]);

        await conn.execute(`
          INSERT INTO OBRISANE_RECENZIJE (
            id_recenzija, id_proizvod, id_kupac, ocena, komentar, datum, datum_brisanja
          )
          SELECT id_recenzija, id_proizvod, id_kupac, ocena, komentar, datum, SYSDATE
          FROM RECENZIJE WHERE id_proizvod = :pid
        `, [proizvodId]);

        await conn.execute(`
          INSERT INTO OBRISANE_STAVKE_NARUDZBINE (
            id_stavka_narudzbine, id_narudzbina, id_proizvod, kolicina, cena_po_komadu, ukupna_cena, datum_obrisanja
          )
          SELECT id_stavka_narudzbine, id_narudzbina, id_proizvod, kolicina, cena_po_komadu, ukupna_cena, SYSDATE
          FROM STAVKE_NARUDZBINE WHERE id_proizvod = :pid
        `, [proizvodId]);

        await conn.execute(`
          INSERT INTO OBRISANI_PROIZVODI (
            id_proizvod, naziv, opis, id_podkategorija, id_boja, id_oznaka,
            slika_url, datum_nabavke, nabavna_cena, prodajna_cena, kolicina, datum_brisanja
          )
          SELECT id_proizvod, naziv, opis, id_podkategorija, id_boja, id_oznaka,
            slika_url, datum_nabavke, nabavna_cena, prodajna_cena, kolicina, SYSDATE
          FROM PROIZVODI WHERE id_proizvod = :pid
        `, [proizvodId]);

        // Brisanje iz originalnih tabela
        await conn.execute(`DELETE FROM STAVKE_KORPE WHERE id_proizvod = :pid`, [proizvodId]);
        await conn.execute(`DELETE FROM WISHLIST_STAVKE WHERE id_proizvod = :pid`, [proizvodId]);
        await conn.execute(`DELETE FROM RECENZIJE WHERE id_proizvod = :pid`, [proizvodId]);
        await conn.execute(`DELETE FROM STAVKE_NARUDZBINE WHERE id_proizvod = :pid`, [proizvodId]);
        await conn.execute(`DELETE FROM PROIZVODI WHERE id_proizvod = :pid`, [proizvodId]);
      }

      // Brisanje podkategorije iz originalne tabele
      await conn.execute(`DELETE FROM PODKATEGORIJE WHERE id_podkategorija = :pid`, [podkatId]);
    }

    // Brisanje kategorije iz originalne tabele
    await conn.execute(`DELETE FROM KATEGORIJE WHERE id_kategorija = :id`, [id]);

    await conn.commit();
    res.json({ msg: '✅ Kategorija i sve povezane podkategorije i proizvodi su logički obrisani' });

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('❌ Greška pri logičkom brisanju kategorije:', err);
    res.status(500).json({ error: 'Greška u logičkom brisanju kategorije' });
  } finally {
    if (conn) await conn.close();
  }
});


//fiyicko  brisanje kategorija

app.delete('/api/kategorije/fizicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Prvo dohvati podkategorije da obrišeš njihove proizvode
    const podkategorije = await conn.execute(`
      SELECT id_podkategorija FROM PODKATEGORIJE WHERE id_kategorija = :id
    `, [id]);

    for (const row of podkategorije.rows) {
      const podkatId = row[0];

      // Obriši proizvode te podkategorije i povezane podatke
      const proizvodi = await conn.execute(`
        SELECT id_proizvod FROM PROIZVODI WHERE id_podkategorija = :pid
      `, [podkatId]);

      for (const pRow of proizvodi.rows) {
        const proizvodId = pRow[0];

        await conn.execute(`DELETE FROM STAVKE_KORPE WHERE id_proizvod = :pid`, [proizvodId]);
        await conn.execute(`DELETE FROM WISHLIST_STAVKE WHERE id_proizvod = :pid`, [proizvodId]);
        await conn.execute(`DELETE FROM RECENZIJE WHERE id_proizvod = :pid`, [proizvodId]);
        await conn.execute(`DELETE FROM STAVKE_NARUDZBINE WHERE id_proizvod = :pid`, [proizvodId]);
        await conn.execute(`DELETE FROM PROIZVODI WHERE id_proizvod = :pid`, [proizvodId]);
      }

      // Obriši podkategoriju
      await conn.execute(`DELETE FROM PODKATEGORIJE WHERE id_podkategorija = :pid`, [podkatId]);
    }

    // Na kraju obriši kategoriju
    await conn.execute(`DELETE FROM KATEGORIJE WHERE id_kategorija = :id`, [id]);

    await conn.commit();
    res.json({ msg: '✅ Kategorija i sve povezane podkategorije i proizvodi su fizički obrisani' });

  } catch (err) {
    console.error('❌ Greška pri fizičkom brisanju kategorije:', err);
    res.status(500).json({ error: 'Greška u fizičkom brisanju kategorije' });
  } finally {
    if (conn) await conn.close();
  }
});



//logicko brisanje podkategorija

app.put('/api/podkategorije/logicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    const provera = await conn.execute(
      `SELECT * FROM PODKATEGORIJE WHERE id_podkategorija = :id`, [id]
    );
    if (provera.rows.length === 0) {
      return res.status(404).json({ error: 'Podkategorija ne postoji' });
    }

    // Kopiraj podkategoriju u arhivu
    await conn.execute(`
      INSERT INTO OBRISANE_PODKATEGORIJE (id_podkategorija, id_kategorija, naziv, datum_brisanja)
      SELECT id_podkategorija, id_kategorija, naziv, SYSDATE
      FROM PODKATEGORIJE WHERE id_podkategorija = :id
    `, [id]);

    // Logičko brisanje svih proizvoda te podkategorije (isto kao gore)
    const proizvodi = await conn.execute(`
      SELECT id_proizvod FROM PROIZVODI WHERE id_podkategorija = :id
    `, [id]);

    for (const row of proizvodi.rows) {
      const proizvodId = row[0];

      await conn.execute(`
        INSERT INTO OBRISANE_STAVKE_KORPE (
          id_stavka_korpe, id_korpa, id_proizvod, kolicina, datum_brisanja
        )
        SELECT id_stavka_korpe, id_korpa, id_proizvod, kolicina, SYSDATE
        FROM STAVKE_KORPE WHERE id_proizvod = :pid
      `, [proizvodId]);

      await conn.execute(`
        INSERT INTO OBRISANE_WISHLISTE (
          id_wishlist, id_kupac, datum_brisanja
        )
        SELECT w.id_wishlist, w.id_kupac, SYSDATE
        FROM WISHLIST_STAVKE ws JOIN WISHLIST w ON ws.id_wishlist = w.id_wishlist
        WHERE ws.id_proizvod = :pid
      `, [proizvodId]);

      await conn.execute(`
        INSERT INTO OBRISANE_RECENZIJE (
          id_recenzija, id_proizvod, id_kupac, ocena, komentar, datum, datum_brisanja
        )
        SELECT id_recenzija, id_proizvod, id_kupac, ocena, komentar, datum, SYSDATE
        FROM RECENZIJE WHERE id_proizvod = :pid
      `, [proizvodId]);

      await conn.execute(`
        INSERT INTO OBRISANE_STAVKE_NARUDZBINE (
          id_stavka_narudzbine, id_narudzbina, id_proizvod, kolicina, cena_po_komadu, ukupna_cena, datum_obrisanja
        )
        SELECT id_stavka_narudzbine, id_narudzbina, id_proizvod, kolicina, cena_po_komadu, ukupna_cena, SYSDATE
        FROM STAVKE_NARUDZBINE WHERE id_proizvod = :pid
      `, [proizvodId]);

      await conn.execute(`
        INSERT INTO OBRISANI_PROIZVODI (
          id_proizvod, naziv, opis, id_podkategorija, id_boja, id_oznaka,
          slika_url, datum_nabavke, nabavna_cena, prodajna_cena, kolicina, datum_brisanja
        )
        SELECT id_proizvod, naziv, opis, id_podkategorija, id_boja, id_oznaka,
          slika_url, datum_nabavke, nabavna_cena, prodajna_cena, kolicina, SYSDATE
        FROM PROIZVODI WHERE id_proizvod = :pid
      `, [proizvodId]);

      // Brisanje originalnih podataka
      await conn.execute(`DELETE FROM STAVKE_KORPE WHERE id_proizvod = :pid`, [proizvodId]);
      await conn.execute(`DELETE FROM WISHLIST_STAVKE WHERE id_proizvod = :pid`, [proizvodId]);
      await conn.execute(`DELETE FROM RECENZIJE WHERE id_proizvod = :pid`, [proizvodId]);
      await conn.execute(`DELETE FROM STAVKE_NARUDZBINE WHERE id_proizvod = :pid`, [proizvodId]);
      await conn.execute(`DELETE FROM PROIZVODI WHERE id_proizvod = :pid`, [proizvodId]);
    }

    // Brisanje podkategorije
    await conn.execute(`DELETE FROM PODKATEGORIJE WHERE id_podkategorija = :id`, [id]);

    await conn.commit();
    res.json({ msg: '✅ Podkategorija i njeni proizvodi su logički obrisani' });

  } catch (err) {
    if (conn) await conn.rollback();
    console.error('❌ Greška pri logičkom brisanju podkategorije:', err);
    res.status(500).json({ error: 'Greška u logičkom brisanju podkategorije' });
  } finally {
    if (conn) await conn.close();
  }
});


//fizicko brisanje podkategorija

app.delete('/api/podkategorije/fizicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    const proizvodi = await conn.execute(`
      SELECT id_proizvod FROM PROIZVODI WHERE id_podkategorija = :id
    `, [id]);

    for (const row of proizvodi.rows) {
      const proizvodId = row[0];

      await conn.execute(`DELETE FROM STAVKE_KORPE WHERE id_proizvod = :pid`, [proizvodId]);
      await conn.execute(`DELETE FROM WISHLIST_STAVKE WHERE id_proizvod = :pid`, [proizvodId]);
      await conn.execute(`DELETE FROM RECENZIJE WHERE id_proizvod = :pid`, [proizvodId]);
      await conn.execute(`DELETE FROM STAVKE_NARUDZBINE WHERE id_proizvod = :pid`, [proizvodId]);
      await conn.execute(`DELETE FROM PROIZVODI WHERE id_proizvod = :pid`, [proizvodId]);
    }

    await conn.execute(`DELETE FROM PODKATEGORIJE WHERE id_podkategorija = :id`, [id]);

    await conn.commit();
    res.json({ msg: '✅ Podkategorija i njeni proizvodi su fizički obrisani' });

  } catch (err) {
    console.error('❌ Greška pri fizičkom brisanju podkategorije:', err);
    res.status(500).json({ error: 'Greška u fizičkom brisanju podkategorije' });
  } finally {
    if (conn) await conn.close();
  }
});
