const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

router.get('/oznake', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(`
      SELECT id_oznaka, naziv
      FROM OZNAKE
      ORDER BY id_oznaka
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Greška pri dohvatanju oznaka:', err);
    res.status(500).json({ error: 'Greška u konekciji.' });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
