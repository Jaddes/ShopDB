const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

router.get('/categories', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT DISTINCT k.naziv AS kategorija, p.naziv AS podkategorija
      FROM KATEGORIJE k
      LEFT JOIN PODKATEGORIJE p ON k.id_kategorija = p.id_kategorija
      ORDER BY k.naziv, p.naziv
    `);

    const grouped = {};
    for (const [kategorija, podkategorija] of result.rows) {
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

module.exports = router;
