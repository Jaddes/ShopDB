const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = './db.sqlite';
const SQL_DUMP_FILE = './DBShop_SR.sql';

app.use(cors());

// 📦 Konekcija ka SQLite
const db = new sqlite3.Database(DB_FILE, async (err) => {
    if (err) {
        console.error('❌ Greška pri konekciji na bazu:', err.message);
        return;
    }

    console.log('✅ Konekcija na SQLite uspostavljena.');

    // 🗃️ Ako je baza prazna, pokreni dump
    if (fs.existsSync(SQL_DUMP_FILE)) {
        const sqlDump = fs.readFileSync(SQL_DUMP_FILE, 'utf8');
        db.exec(sqlDump, (err) => {
            if (err) {
                console.error('❌ Greška pri izvršavanju SQL dumpa:', err.message);
            } else {
                console.log('✅ SQL dump uspešno izvršen.');
            }
        });
    } else {
        console.warn('⚠️ SQL dump fajl nije pronađen.');
    }
});

// 🧪 Test ruta
app.get('/', (req, res) => {
    res.send('Server radi!');
});

// 📥 API ruta za kategorije
app.get('/api/categories', (req, res) => {
    const query = `
        SELECT c.id as category_id, c.name as category_name,
               sc.id as subcategory_id, sc.name as subcategory_name
        FROM categories c
        LEFT JOIN subcategories sc ON sc.category_id = c.id
        ORDER BY c.name, sc.name
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('❌ Greška pri SELECT-u:', err.message);
            return res.status(500).json({ error: 'Greška u bazi' });
        }

        // 📦 Grupisanje po kategorijama
        const result = {};
        rows.forEach(row => {
            if (!result[row.category_name]) {
                result[row.category_name] = [];
            }

            if (row.subcategory_name) {
                result[row.category_name].push(row.subcategory_name);
            }
        });

        res.json(result);
    });
});

// 🚀 Start servera
app.listen(PORT, () => {
    console.log(`🚀 Server radi na http://localhost:${PORT}`);
});
