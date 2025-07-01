const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

// Dohvatanje svih kategorija sa njihovim podkategorijama (grupisano)
router.get('/categories', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT DISTINCT k.id_kategorija, k.naziv AS kategorija, p.naziv AS podkategorija
      FROM KATEGORIJE k
      LEFT JOIN PODKATEGORIJE p ON k.id_kategorija = p.id_kategorija
      ORDER BY k.naziv, p.naziv
    `);

    // Grupisanje u JSON objekt: { kategorija: [podkategorije...] }
    const grouped = {};
    for (const [id_kategorija, kategorija, podkategorija] of result.rows) {
      if (!grouped[kategorija]) grouped[kategorija] = [];
      if (podkategorija && !grouped[kategorija].includes(podkategorija)) {
        grouped[kategorija].push(podkategorija);
      }
    }

    res.json(grouped);
  } catch (err) {
    console.error('❌ Greška:', err);
    res.status(500).json({ error: 'Greška u konekciji.' });
  } finally {
    if (connection) await connection.close();
  }
});

// Logičko brisanje kategorije
router.put('/logicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Provera da li kategorija postoji
    const provera = await conn.execute(
      `SELECT 1 FROM KATEGORIJE WHERE id_kategorija = :id`,
      [id]
    );

    if (provera.rows.length === 0) {
      return res.status(404).json({ error: 'Kategorija ne postoji.' });
    }

    // Prebacivanje u OBRISANE_KATEGORIJE sa datumom brisanja
    await conn.execute(`
      INSERT INTO OBRISANE_KATEGORIJE (
        id_kategorija, naziv, datum_brisanja
      )
      SELECT id_kategorija, naziv, SYSDATE
      FROM KATEGORIJE
      WHERE id_kategorija = :id
    `, [id]);

    // Brisanje iz glavne tabele
    await conn.execute(`DELETE FROM KATEGORIJE WHERE id_kategorija = :id`, [id]);

    await conn.commit();
    res.json({ message: 'Kategorija logički obrisana.' });
  } catch (err) {
    console.error('❌ Greška pri logičkom brisanju kategorije:', err);
    res.status(500).json({ error: 'Greška pri logičkom brisanju kategorije.' });
  } finally {
    if (conn) await conn.close();
  }
});

// Fizičko brisanje kategorije
router.delete('/fizicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Provera da li kategorija postoji u aktivnoj tabeli
    const provera = await conn.execute(
      `SELECT 1 FROM KATEGORIJE WHERE id_kategorija = :id`,
      [id]
    );
    if (provera.rows.length === 0) {
      return res.status(404).json({ error: 'Kategorija ne postoji.' });
    }

    // Brišemo iz aktivne tabele
    await conn.execute(
      `DELETE FROM KATEGORIJE WHERE id_kategorija = :id`,
      [id]
    );
    await conn.commit();

    res.json({ message: 'Kategorija fizički obrisana.' });
  } catch (err) {
    console.error('❌ Greška pri fizičkom brisanju kategorije:', err);
    res.status(500).json({ error: 'Greška pri fizičkom brisanju kategorije.' });
  } finally {
    if (conn) await conn.close();
  }
});

// Vraćanje obrisane kategorije
router.put('/vrati_kategoriju/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Provera da li postoji u OBRISANE_KATEGORIJE
    const provera = await conn.execute(
      `SELECT 1 FROM OBRISANE_KATEGORIJE WHERE id_kategorija = :id`,
      [id]
    );

    if (provera.rows.length === 0) {
      return res.status(404).json({ error: 'Obrisana kategorija ne postoji.' });
    }

    // Prebacivanje nazad u KATEGORIJE
    await conn.execute(`
      INSERT INTO KATEGORIJE (id_kategorija, naziv)
      SELECT id_kategorija, naziv
      FROM OBRISANE_KATEGORIJE
      WHERE id_kategorija = :id
    `, [id]);

    // Brisanje iz arhive
    await conn.execute(
      `DELETE FROM OBRISANE_KATEGORIJE WHERE id_kategorija = :id`,
      [id]
    );

    await conn.commit();
    res.json({ message: 'Kategorija je vraćena u aktivnu listu.' });
  } catch (err) {
    console.error('❌ Greška pri vraćanju kategorije:', err);
    res.status(500).json({ error: 'Greška pri vraćanju kategorije.' });
  } finally {
    if (conn) await conn.close();
  }
});

module.exports = router;
