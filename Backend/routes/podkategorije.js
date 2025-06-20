const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Ruta za dohvatanje svih podkategorija (bez filtera)
router.get('/', async (req, res) => {
  try {
    const result = await connection.execute(`
      SELECT id_podkategorija, id_kategorija, naziv
      FROM PODKATEGORIJE
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Greška prilikom dohvatanja podkategorija:', error);
    res.status(500).json({ error: 'Greška pri dohvatanju podkategorija.' });
  }
});

module.exports = router;
