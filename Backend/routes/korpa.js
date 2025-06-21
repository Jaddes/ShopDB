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

// Stavke za jednu korpu
router.get('/korpe/:id/stavke', async (req, res) => {
  let connection;
  try {
    const id = req.params.id;
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT 
        s.id_stavka_korpe,
        s.id_korpa,
        s.id_proizvod,
        p.naziv AS naziv_proizvoda,
        s.kolicina
      FROM STAVKE_KORPE s
      JOIN PROIZVODI p ON s.id_proizvod = p.id_proizvod
      WHERE s.id_korpa = :id
      ORDER BY s.id_stavka_korpe
    `, [id], { outFormat: oracledb.OBJECT });

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/korpe/:id/stavke:", err);
    res.status(500).json({ error: 'Greška u bazi stavki korpe' });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
