const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');
const oracledb = require('oracledb');

// Dobavljanje svih proizvoda
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
    `, [], { outFormat: oracledb.OBJECT });

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Greška u /api/proizvodi:", err);
    res.status(500).json({ error: 'Greška u bazi proizvoda' });
  } finally {
    if (connection) await connection.close();
  }
});

// Logičko brisanje proizvoda
router.put('/logicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Provera da li proizvod postoji
    const provera = await conn.execute(
      `SELECT 1 FROM PROIZVODI WHERE id_proizvod = :id`,
      [id]
    );

    if (provera.rows.length === 0) {
      return res.status(404).json({ error: 'Proizvod ne postoji.' });
    }

    // Prebacivanje u OBRISANI_PROIZVODI sa datumom brisanja
    await conn.execute(`
      INSERT INTO OBRISANI_PROIZVODI (
        id_proizvod, naziv, opis, id_podkategorija, id_boja, id_oznaka,
        slika_url, datum_nabavke, nabavna_cena, prodajna_cena, kolicina, datum_brisanja
      )
      SELECT 
        id_proizvod, naziv, opis, id_podkategorija, id_boja, id_oznaka,
        slika_url, datum_nabavke, nabavna_cena, prodajna_cena, kolicina, SYSDATE
      FROM PROIZVODI
      WHERE id_proizvod = :id
    `, [id]);

    // Brisanje iz glavne tabele
    await conn.execute(`DELETE FROM PROIZVODI WHERE id_proizvod = :id`, [id]);

    await conn.commit();
    res.json({ message: 'Proizvod logički obrisan.' });
  } catch (err) {
    console.error('❌ Logičko brisanje proizvoda greška:', err);
    res.status(500).json({ error: 'Greška pri logičkom brisanju proizvoda.' });
  } finally {
    if (conn) await conn.close();
  }
});

// Fizičko brisanje proizvoda
router.delete('/fizicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Provera da li proizvod postoji
    const provera = await conn.execute(
      `SELECT 1 FROM PROIZVODI WHERE id_proizvod = :id`,
      [id]
    );

    if (provera.rows.length === 0) {
      return res.status(404).json({ error: 'Proizvod ne postoji.' });
    }

    // Direktno brisanje
    await conn.execute(`DELETE FROM PROIZVODI WHERE id_proizvod = :id`, [id]);

    await conn.commit();
    res.json({ message: 'Proizvod fizički obrisan.' });
  } catch (err) {
    console.error('❌ Fizičko brisanje proizvoda greška:', err);
    res.status(500).json({ error: 'Greška pri fizičkom brisanju proizvoda.' });
  } finally {
    if (conn) await conn.close();
  }
});

module.exports = router;
