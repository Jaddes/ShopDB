const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

router.get('/korisnici', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT 
        id_korisnik,
        ime,
        prezime,
        email,
        lozinka,
        uloga,
        TO_CHAR(datum_registracije, 'YYYY-MM-DD') AS datum_registracije
      FROM KORISNICI
      ORDER BY id_korisnik
    `);

    // Mapiranje rezultata u niz objekata
    const korisnici = result.rows.map(row => ({
      id_korisnik: row[0],
      ime: row[1],
      prezime: row[2],
      email: row[3],
      lozinka: row[4],
      uloga: row[5],
      datum_registracije: row[6]
    }));

    res.json(korisnici);
  } catch (err) {
    console.error('❌ Greška u korisnici.js:', err);
    res.status(500).json({ error: 'Greška u bazi podataka' });
  } finally {
    if (connection) await connection.close();
  }
});

// Logičko brisanje korisnika
router.put('/logicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Prebaci podatke u OBRISANI_KORISNICI
    await conn.execute(`
      INSERT INTO OBRISANI_KORISNICI (id_korisnik, ime, prezime, email, lozinka, uloga, datum_registracije)
      SELECT id_korisnik, ime, prezime, email, lozinka, uloga, datum_registracije
      FROM KORISNICI
      WHERE id_korisnik = :id
    `, [id]);

    // Obriši iz KORISNICI
    await conn.execute(`DELETE FROM KORISNICI WHERE id_korisnik = :id`, [id]);

    await conn.commit();
    res.json({ message: 'Korisnik logički obrisan.' });
  } catch (err) {
    console.error('❌ Logičko brisanje greška:', err);
    res.status(500).json({ error: 'Greška pri logičkom brisanju.' });
  } finally {
    if (conn) await conn.close();
  }
});

// Fizičko brisanje korisnika
router.delete('/fizicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();
    await conn.execute(`DELETE FROM KORISNICI WHERE id_korisnik = :id`, [id]);
    await conn.commit();
    res.json({ message: 'Korisnik fizički obrisan.' });
  } catch (err) {
    console.error('❌ Fizičko brisanje greška:', err);
    res.status(500).json({ error: 'Greška pri fizičkom brisanju.' });
  } finally {
    if (conn) await conn.close();
  }
});


module.exports = router;
