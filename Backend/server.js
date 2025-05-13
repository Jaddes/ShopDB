const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// 🔐 Podesi podatke za konekciju ovde
const dbConfig = {
  user: 'shop',
  password: 'shop123',
  connectString: 'localhost/XEPDB1'  // izmeni po potrebi
};

// 📥 API ruta za kategorije i podkategorije
app.get('/api/categories', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(`
      SELECT k.naziv AS kategorija, p.naziv AS podkategorija
      FROM KATEGORIJE k
      LEFT JOIN PODKATEGORIJE p ON k.id_kategorija = p.id_kategorija
      ORDER BY k.naziv, p.naziv
    `);

    // Grupisanje u JSON format
    const grouped = {};
    for (const row of result.rows) {
      const [kategorija, podkategorija] = row;
      if (!grouped[kategorija]) grouped[kategorija] = [];
      if (podkategorija) grouped[kategorija].push(podkategorija);
    }

    res.json(grouped);
  } catch (err) {
    console.error('❌ Greška pri konekciji:', err);
    res.status(500).json({ error: 'Greška u konekciji sa bazom.' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('⚠️ Greška pri zatvaranju konekcije:', err);
      }
    }
  }
});

// 🧪 Test ruta
app.get('/', (req, res) => {
  res.send('Oracle backend radi!');
});

// 🚀 Pokretanje servera
app.listen(PORT, () => {
  console.log(`🚀 Oracle server aktivan na http://localhost:${PORT}`);
});
