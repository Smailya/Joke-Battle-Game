const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai'); // Import OpenAI directly

const games = {}; // In-memory store for active games

// OpenAI API configuration (directly passing the API key)
const openai = new OpenAI({
    apiKey: 'use_your_own_generate_apikey_from_openai', // Replace with your actual OpenAI API key or you can link it from the .env file
});

// Start a new game
router.post('/start', (req, res) => {
    const { player1Name, player2Name } = req.body;

    // Check for valid player names
    if (!player1Name || !player2Name) {
        return res.status(400).json({ message: 'Both player names are required' });
    }

    // Create a new game instance with a unique ID
    const gameId = Date.now().toString(); // Example game ID generation
    games[gameId] = { 
        player1Name, 
        player2Name, 
        status: 'Game started', 
        jokes: { player1: '', player2: '' }, 
        scores: { player1: 0, player2: 0 } // Track scores for each player
    }; // Store the game

    // Respond with the game ID and additional information
    res.status(201).json({
        gameId,
        player1Name,
        player2Name,
        status: 'Game started',
        message: 'Game started successfully',
    });
});

// Submit jokes and determine winner
router.post('/:gameId/submit', async (req, res) => {
    const { gameId } = req.params;
    const { player1Joke, player2Joke } = req.body;

    const game = games[gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }

    // Store the jokes
    game.jokes.player1 = player1Joke;
    game.jokes.player2 = player2Joke;

    // Call OpenAI API to determine the winner
    try {
        const winner = await determineWinner(player1Joke, player2Joke);
        game.scores[winner] += 1; // Increment the winner's score

        return res.status(200).json({ 
            message: `Both players have submitted their jokes! ${winner} wins this round!`,
            scores: game.scores,
            winner: winner
        });
    } catch (error) {
        console.error('Error determining winner:', error);
        return res.status(500).json({ message: 'Error determining winner. Please try again.' });
    }
});

// Function to call OpenAI API and determine the winner
const determineWinner = async (joke1, joke2) => {
    const prompt = `Which joke is funnier?\nJoke 1: "${joke1}"\nJoke 2: "${joke2}"\nPlease respond with "joke1" or "joke2".`;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // You can use "text-davinci-003" or another model as needed
        messages: [{ role: "user", content: prompt }],
        max_tokens: 10,
        temperature: 0.5,
    });

    const winner = response.choices[0].message.content.trim().toLowerCase();
    return winner === 'joke1' ? 'player1' : 'player2';
};

module.exports = router;