const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');


// /api/stavke_narudzbine/:id
router.get('/stavke_narudzbine/:id', async (req, res) => {
  const idNarudzbina = req.params.id;
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT 
        s.id_stavka_narudzbine AS ID_STAVKA,
        s.id_narudzbina AS ID_NARUDZBINA,
        s.id_proizvod AS ID_PROIZVOD,
        p.naziv AS NAZIV_PROIZVODA,
        s.kolicina AS KOLICINA,
        s.cena_po_komadu AS CENA_PO_KOMADU,
        s.kolicina * s.cena_po_komadu AS UKUPNO
      FROM STAVKE_NARUDZBINE s
      JOIN PROIZVODI p ON s.id_proizvod = p.id_proizvod
      WHERE s.id_narudzbina = :id
    `, [idNarudzbina], { outFormat: oracledb.OBJECT });

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u stavke_narudzbine.js:", err);
    res.status(500).json({ error: 'Greška u bazi stavki narudžbine' });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
