const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');
const oracledb = require('oracledb');

// Sve stavke u korpama (opciono, koristiš ako želiš listu svih stavki)
router.get('/stavke_korpe', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

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

// Stavke za određenu korpu
router.get('/stavke_korpe/:id', async (req, res) => {
  const id = req.params.id;
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT 
        s.id_stavka_korpe AS ID_STAVKA,
        s.id_korpa AS ID_KORPA,
        s.id_proizvod AS ID_PROIZVOD,
        p.naziv AS NAZIV_PROIZVODA,
        s.kolicina AS KOLICINA
      FROM STAVKE_KORPE s
      JOIN PROIZVODI p ON s.id_proizvod = p.id_proizvod
      WHERE s.id_korpa = :id
      ORDER BY s.id_stavka_korpe
    `, [id], { outFormat: oracledb.OBJECT });

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/stavke_korpe/:id:", err);
    res.status(500).json({ error: 'Greška u bazi stavki korpe' });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
