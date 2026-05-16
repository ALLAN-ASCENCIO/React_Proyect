//index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Game = require('./models/Game');
const Registro = require('./models/Registro');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public')); // sirve las imágenes

const MONGO_URI = 'mongodb+srv://240300738_db_user:NbOs79Sl6YdJUqUy@crud1.lfryrnh.mongodb.net/GameVaultDB?appName=CRUD1';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

app.get('/api/games', async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

app.post('/api/registros', async (req, res) => {
  try {
    const registro = new Registro(req.body);
    await registro.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/api/games', async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(4000, () => console.log('Server en puerto 4000'));