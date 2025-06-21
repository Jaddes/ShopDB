const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

// GET sve liste želja
router.get('/wishlist', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(`
      SELECT 
        w.id_wishlist AS ID_WISHLIST,
        w.id_kupac AS ID_KUPAC,
        k.ime || ' ' || k.prezime AS KUPAC,
        TO_CHAR(w.datum_kreiranja, 'YYYY-MM-DD') AS DATUM
      FROM WISHLIST w
      JOIN KUPCI kup ON w.id_kupac = kup.id_kupac
      JOIN KORISNICI k ON kup.id_korisnik = k.id_korisnik
      ORDER BY w.id_wishlist DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/wishlist:", err);
    res.status(500).json({ error: 'Greška u bazi želja' });
  } finally {
    if (connection) await connection.close();
  }
});



module.exports = router;
