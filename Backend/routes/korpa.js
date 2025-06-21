const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');
const oracledb = require('oracledb');

// Sve korpe
router.get('/korpe', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(`
      SELECT 
        k.id_korpa,
        k.id_kupac,
        TO_CHAR(k.datum_kreiranja, 'YYYY-MM-DD') AS datum,
        korisnici.ime || ' ' || korisnici.prezime AS kupac
      FROM KORPA k
      JOIN KUPCI kupci ON k.id_kupac = kupci.id_kupac
      JOIN KORISNICI korisnici ON kupci.id_korisnik = korisnici.id_korisnik
      ORDER BY k.id_korpa DESC
    `, [], { outFormat: oracledb.OBJECT });

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/korpe:", err);
    res.status(500).json({ error: 'Greška u bazi korpi' });
  } finally {
    if (connection) await connection.close();
  }
});


module.exports = router;
