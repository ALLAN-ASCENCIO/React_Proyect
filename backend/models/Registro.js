const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
  nombre:     String,
  email:      String,
  gamertag:   String,
  juego:      String,
  plataforma: String,
  nivel:      String,
  pais:       String,
  fecha:      { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registro', registroSchema);
