const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');
const oracledb = require('oracledb'); // ✅ Dodato

// SVE STAVKE svih lista želja
router.get('/stavke_wishlist', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT 
        ws.id_stavka_wishlist AS ID_STAVKA,
        ws.id_wishlist AS ID_WISHLIST,
        ws.id_proizvod AS ID_PROIZVOD,
        p.naziv AS NAZIV_PROIZVODA
      FROM WISHLIST_STAVKE ws
      JOIN PROIZVODI p ON ws.id_proizvod = p.id_proizvod
      ORDER BY ws.id_wishlist
    `, [], { outFormat: oracledb.OBJECT }); // ✅ Dodato

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/stavke_wishlist:", err);
    res.status(500).json({ error: 'Greška u bazi stavki želja' });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
