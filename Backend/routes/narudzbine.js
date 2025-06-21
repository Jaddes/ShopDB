const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');


router.get('/narudzbine', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT 
        n.id_narudzbina AS ID_NARUDZBINA,
        n.id_kupac AS ID_KUPAC,
        k.ime || ' ' || k.prezime AS KUPAC,
        TO_CHAR(n.datum_narudzbine, 'YYYY-MM-DD') AS DATUM,
        n.status AS STATUS,
        n.nacin_dostave AS DOSTAVA,
        n.cena_dostave AS CENA_DOSTAVE,
        n.ukupna_cena AS UKUPNO
      FROM NARUDZBINE n
      JOIN KUPCI kup ON n.id_kupac = kup.id_kupac
      JOIN KORISNICI k ON kup.id_korisnik = k.id_korisnik
      ORDER BY n.id_narudzbina DESC
    `, [], { outFormat: oracledb.OBJECT });

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/narudzbine:", err);
    res.status(500).json({ error: 'Greška u bazi narudžbina' });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
