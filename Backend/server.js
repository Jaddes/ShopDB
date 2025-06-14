const express = require('express');
const cors = require('cors');
const kategorijeRoutes = require('./routes/kategorije');

const app = express();
const PORT = 3000;

app.use(cors());
app.use('/api', kategorijeRoutes);

app.get('/', (req, res) => {
  res.send('Backend radi!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server aktivan na http://localhost:${PORT}`);
});

app.get('/api/ping', (req, res) => {
  res.send('pong');
});