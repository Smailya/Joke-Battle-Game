// backend/server/app.js

const express = require('express');
const path = require('path');

// Log the resolved path for gameRoutes.js
console.log('Resolved path to gameRoutes:', path.resolve(__dirname, '../routes/gameRoutes'));

const gameRoutes = require('../routes/gameRoutes'); // Path corrected if needed

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/games', gameRoutes);

// Error handling middleware for server errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: 'Internal Server Error' }); // Send a JSON response for server errors
});

// 404 Not Found handler
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' }); // Handle 404 errors
});

module.exports = app;
