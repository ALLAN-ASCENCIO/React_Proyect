const mongoose = require('mongoose');
const Game = require('./models/Game');

const MONGO_URI = 'mongodb+srv://240300738_db_user:NbOs79Sl6YdJUqUy@crud1.lfryrnh.mongodb.net/GameVaultDB?appName=CRUD1';

const games = [
  { title: 'The Legend of Zelda', genre: 'Aventura',  rating: 5, image: 'https://react-proyect-u58e.onrender.com/zelda.jpg' },
  { title: 'Minecraft',           genre: 'Sandbox',   rating: 4, image: 'https://react-proyect-u58e.onrender.com/Minecraft.png' },
  { title: 'Cyberpunk 2077',      genre: 'RPG',       rating: 4, image: 'https://react-proyect-u58e.onrender.com/cyberpunk.jpg' },
  { title: 'FIFA 24',             genre: 'Deportes',  rating: 3, image: 'https://react-proyect-u58e.onrender.com/fifa.jpeg' },
  { title: 'Hollow Knight',       genre: 'Plataforma',rating: 5, image: 'https://react-proyect-u58e.onrender.com/HollowKnight.jpg' },
  { title: 'Persona 3 Reload',    genre: 'J-RPG',     rating: 5, image: 'https://react-proyect-u58e.onrender.com/persona.jpeg' },
];

mongoose.connect(MONGO_URI).then(async () => {
  await Game.deleteMany({});
  await Game.insertMany(games);
  console.log('Juegos insertados');
  process.exit();
});