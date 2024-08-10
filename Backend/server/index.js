// backend/index.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const gameRoutes = require('../routes/gameRoutes'); // Ensure this path is correct

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use the game routes
app.use('/api/games', gameRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Multiplayer Joke Game API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
