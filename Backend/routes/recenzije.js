const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

router.get('/recenzije', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT 
        r.id_recenzija AS ID_RECENZIJA,
        r.id_kupac AS ID_KUPAC,
        k.ime || ' ' || k.prezime AS KUPAC,
        r.id_proizvod AS ID_PROIZVOD,
        p.naziv AS PROIZVOD,
        r.ocena AS OCENA,
        r.komentar AS KOMENTAR,
        TO_CHAR(r.datum, 'YYYY-MM-DD') AS DATUM
      FROM RECENZIJE r
      JOIN KUPCI kup ON r.id_kupac = kup.id_kupac
      JOIN KORISNICI k ON kup.id_korisnik = k.id_korisnik
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

module.exports = router;
