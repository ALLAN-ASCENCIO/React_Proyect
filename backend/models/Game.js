//MogoDB
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title:  String,
  genre:  String,
  rating: Number,
  image: String
});

module.exports = mongoose.model('Game', gameSchema);
