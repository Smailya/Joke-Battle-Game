const fetch = require('node-fetch'); // Import fetch for API requests
const Game = require('../models/Game'); // Import the Game class
const games = {}; // In-memory store for active games

// OpenAI API key from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Function to call OpenAI API and judge the jokes
const judgeJokes = async (joke1, joke2) => {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `Which joke is funnier? Joke 1: "${joke1}" or Joke 2: "${joke2}"? Please respond with "Joke 1" or "Joke 2".`
                    }
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`OpenAI API error: ${errorData.error.message}`);
        }

        const data = await response.json();
        const answer = data.choices[0].message.content.trim();
        return answer; // Returns "Joke 1" or "Joke 2"
    } catch (error) {
        console.error('Error judging jokes:', error);
        throw error; // Re-throw the error after logging
    }
};

// Start a new game
const startGame = (req, res) => {
    const { player1Name, player2Name } = req.body;

    // Check for valid player names
    if (!player1Name || !player2Name) {
        return res.status(400).json({ message: 'Both player names are required' });
    }

    // Create a new game instance with a unique ID
    const gameId = Date.now().toString(); // Use a string to avoid issues with numbers
    const newGame = new Game(player1Name, player2Name);

    // Store the game in memory
    games[gameId] = newGame;

    // Respond with the game ID and additional information
    res.status(201).json({
        gameId,
        player1Name,
        player2Name,
        status: 'Game started',
        message: 'Game started successfully',
    });
};

// Submit a joke
const submitJoke = async (req, res) => {
    const { gameId, playerName, joke } = req.body;

    // Check if the game exists
    const game = games[gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }

    // Store the joke based on the player
    if (playerName === game.player1Name) {
        game.player1Joke = joke;
    } else if (playerName === game.player2Name) {
        game.player2Joke = joke;
    } else {
        return res.status(400).json({ message: 'Invalid player name' });
    }

    // Check if both jokes have been submitted
    if (game.player1Joke && game.player2Joke) {
        try {
            const winner = await judgeJokes(game.player1Joke, game.player2Joke);
            
            if (winner === 'Joke 1') {
                game.updateScore(game.player1Name);
            } else if (winner === 'Joke 2') {
                game.updateScore(game.player2Name);
            }

            game.determineWinner();

            // Respond with the updated game state
            res.json({
                gameId,
                player1Score: game.player1Score,
                player2Score: game.player2Score,
                winnerName: game.winnerName,
                player1Joke: game.player1Joke,
                player2Joke: game.player2Joke,
                message: game.winnerName ? `${game.winnerName} wins the game!` : 'Both jokes submitted, waiting for result.',
                playAgain: !!game.winnerName,
            });

            // Reset jokes for the next round if needed
            game.player1Joke = null;
            game.player2Joke = null;

        } catch (error) {
            console.error('Error judging jokes:', error);
            res.status(500).json({ message: 'Error judging jokes' });
        }
    } else {
        res.json({ message: 'Waiting for both players to submit their jokes.' });
    }
};

// Get game status
const getGameStatus = (req, res) => {
    const { gameId } = req.params;

    // Check if the game exists
    const game = games[gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }

    // Respond with the current game status
    res.json({
        gameId,
        player1Name: game.player1Name,
        player2Name: game.player2Name,
        player1Score: game.player1Score,
        player2Score: game.player2Score,
        winnerName: game.winnerName,
        createdAt: game.createdAt,
        player1Joke: game.player1Joke, // Include jokes in the status response
        player2Joke: game.player2Joke,
    });
};

module.exports = {
    startGame,
    submitJoke,
    getGameStatus,
};
