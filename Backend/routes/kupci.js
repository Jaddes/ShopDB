const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

// Dohvatanje svih kupaca sa podacima iz tabele KORISNICI
router.get('/kupci', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT 
        k.id_kupac,
        k.id_korisnik,
        kor.ime,
        kor.prezime,
        kor.email,
        k.ulica,
        k.broj,
        k.grad,
        k.postanski_broj,
        k.telefon
      FROM KUPCI k
      JOIN KORISNICI kor ON k.id_korisnik = kor.id_korisnik
      ORDER BY k.id_kupac
    `);

    const kupci = result.rows.map(row => ({
      id_kupac: row[0],
      id_korisnik: row[1],
      ime: row[2],
      prezime: row[3],
      email: row[4],
      ulica: row[5],
      broj: row[6],
      grad: row[7],
      postanski_broj: row[8],
      telefon: row[9]
    }));

    res.json(kupci);
  } catch (err) {
    console.error("❌ Greška u /api/kupci:", err);
    res.status(500).json({ error: 'Greška u bazi kupaca' });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
