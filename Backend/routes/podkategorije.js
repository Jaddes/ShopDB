const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

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

module.exports = router;
