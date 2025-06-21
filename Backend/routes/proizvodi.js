const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

router.get('/proizvodi', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

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
    `, [], { outFormat: require('oracledb').OBJECT });

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/proizvodi:", err);
    res.status(500).json({ error: 'Greška u bazi proizvoda' });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
