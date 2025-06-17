const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection'); // ako je u istom folderu

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

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Greška u korisnici.js:', err);
    res.status(500).json({ error: 'Greška u bazi podataka' });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
