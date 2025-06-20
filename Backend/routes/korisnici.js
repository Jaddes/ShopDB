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

module.exports = router;
