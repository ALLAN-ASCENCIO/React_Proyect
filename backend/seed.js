const mongoose = require('mongoose');
const Game = require('./models/Game');

const MONGO_URI = 'mongodb+srv://240300738_db_user:NbOs79Sl6YdJUqUy@crud1.lfryrnh.mongodb.net/GameVaultDB?appName=CRUD1';

const games = [
  { title: 'The Legend of Zelda', genre: 'Aventura',  rating: 5, image: 'http://localhost:4000/imagenes/zelda.jpg' },
  { title: 'Minecraft',           genre: 'Sandbox',   rating: 4, image: 'http://localhost:4000/imagenes/Minecraft.png' },
  { title: 'Cyberpunk 2077',      genre: 'RPG',       rating: 4, image: 'http://localhost:4000/imagenes/cyberpunk.jpg' },
  { title: 'FIFA 24',             genre: 'Deportes',  rating: 3, image: 'http://localhost:4000/imagenes/fifa.jpeg' },
  { title: 'Hollow Knight',       genre: 'Plataforma',rating: 5, image: 'http://localhost:4000/imagenes/HollowKnight.jpg' },
  { title: 'Persona 3 Reload',    genre: 'J-RPG',     rating: 5, image: 'http://localhost:4000/imagenes/persona.jpeg' },
];

mongoose.connect(MONGO_URI).then(async () => {
  await Game.deleteMany({});
  await Game.insertMany(games);
  console.log('Juegos insertados');
  process.exit();
});