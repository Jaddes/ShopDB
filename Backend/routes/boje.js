const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

router.get('/boje', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(`SELECT id_boja, naziv FROM BOJE ORDER BY id_boja`);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Greška pri dohvatanju boja:', err);
    res.status(500).json({ error: 'Greška u konekciji.' });
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
