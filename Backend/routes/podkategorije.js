const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

// Dohvatanje svih podkategorija
router.get('/', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT id_podkategorija, id_kategorija, naziv
      FROM PODKATEGORIJE
      ORDER BY id_podkategorija
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Greška pri dohvatanju podkategorija:', err);
    res.status(500).json({ error: 'Greška u konekciji.' });
  } finally {
    if (connection) await connection.close();
  }
});

// Logičko brisanje podkategorije
router.put('/logicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Provera da li podkategorija postoji
    const provera = await conn.execute(
      `SELECT 1 FROM PODKATEGORIJE WHERE id_podkategorija = :id`,
      [id]
    );

    if (provera.rows.length === 0) {
      return res.status(404).json({ error: 'Podkategorija ne postoji.' });
    }

    // Prebacivanje u OBRISANE_PODKATEGORIJE sa datumom brisanja
    await conn.execute(`
      INSERT INTO OBRISANE_PODKATEGORIJE (
        id_podkategorija, id_kategorija, naziv, datum_brisanja
      )
      SELECT id_podkategorija, id_kategorija, naziv, SYSDATE
      FROM PODKATEGORIJE
      WHERE id_podkategorija = :id
    `, [id]);

    // Brisanje iz glavne tabele
    await conn.execute(`DELETE FROM PODKATEGORIJE WHERE id_podkategorija = :id`, [id]);

    await conn.commit();
    res.json({ message: 'Podkategorija logički obrisana.' });
  } catch (err) {
    console.error('❌ Greška pri logičkom brisanju podkategorije:', err);
    res.status(500).json({ error: 'Greška pri logičkom brisanju podkategorije.' });
  } finally {
    if (conn) await conn.close();
  }
});

// Fizičko brisanje podkategorije
router.delete('/fizicko_brisanje/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Provera da li podkategorija postoji u aktivnoj tabeli
    const provera = await conn.execute(
      `SELECT 1 FROM PODKATEGORIJE WHERE id_podkategorija = :id`,
      [id]
    );
    if (provera.rows.length === 0) {
      return res.status(404).json({ error: 'Podkategorija ne postoji.' });
    }

    // Brišemo iz aktivne tabele
    const result = await conn.execute(
      `DELETE FROM PODKATEGORIJE WHERE id_podkategorija = :id`,
      [id]
    );
    await conn.commit();

    res.json({ message: 'Podkategorija fizički obrisana.' });
  } catch (err) {
    console.error('❌ Greška pri fizičkom brisanju podkategorije:', err);
    res.status(500).json({ error: 'Greška pri fizičkom brisanju podkategorije.' });
  } finally {
    if (conn) await conn.close();
  }
});

// Vraćanje obrisane podkategorije
router.put('/vrati_podkategoriju/:id', async (req, res) => {
  const id = req.params.id;
  let conn;

  try {
    conn = await getConnection();

    // Provera da li postoji u OBRISANE_PODKATEGORIJE
    const provera = await conn.execute(
      `SELECT 1 FROM OBRISANE_PODKATEGORIJE WHERE id_podkategorija = :id`,
      [id]
    );

    if (provera.rows.length === 0) {
      return res.status(404).json({ error: 'Obrisana podkategorija ne postoji.' });
    }

    // Prebacivanje nazad u PODKATEGORIJE
    await conn.execute(`
      INSERT INTO PODKATEGORIJE (id_podkategorija, id_kategorija, naziv)
      SELECT id_podkategorija, id_kategorija, naziv
      FROM OBRISANE_PODKATEGORIJE
      WHERE id_podkategorija = :id
    `, [id]);

    // Brisanje iz arhive
    await conn.execute(
      `DELETE FROM OBRISANE_PODKATEGORIJE WHERE id_podkategorija = :id`,
      [id]
    );

    await conn.commit();
    res.json({ message: 'Podkategorija je vraćena u aktivnu listu.' });
  } catch (err) {
    console.error('❌ Greška pri vraćanju podkategorije:', err);
    res.status(500).json({ error: 'Greška pri vraćanju podkategorije.' });
  } finally {
    if (conn) await conn.close();
  }
});

module.exports = router;
