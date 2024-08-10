// frontend/src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import SubmitJoke from './SubmitJoke';

const App = () => {
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [gameId, setGameId] = useState(null);
    const [message, setMessage] = useState('');
    const [scores, setScores] = useState(null); // Initialize scores to null
    const [winner, setWinner] = useState(''); // To store the winner
    const [gameStatus, setGameStatus] = useState('playing'); // Track game status

    const startGame = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/games/start', {
                player1Name,
                player2Name,
            });

            console.log('Game started response:', response.data); // Log the response

            setGameId(response.data.gameId);
            setScores({ player1: 0, player2: 0 }); // Initialize scores
            setGameStatus('playing');
            setMessage(`Game started! ID: ${response.data.gameId}`);
        } catch (error) {
            console.error('Error starting game:', error);
            setMessage('Failed to start game. Please try again.');
        }
    };

    const handleJokeSubmitted = (newScores, newWinner) => {
        setScores(newScores);
        setWinner(newWinner);
    };

    const handleGameRestart = () => {
        setGameStatus('starting');
        setWinner('');
    };

    // Check if gameId is available and game is in progress
    if (!gameId || gameStatus === 'starting') {
        return (
            <div>
                <h1>Multiplayer Joke Game</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Player 1 Name"
                        value={player1Name}
                        onChange={(e) => setPlayer1Name(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Player 2 Name"
                        value={player2Name}
                        onChange={(e) => setPlayer2Name(e.target.value)}
                    />
                    <button onClick={startGame}>Start Game</button>
                </div>
                {message && <p>{message}</p>}
            </div>
        );
    }

    return (
        <div>
            <h1>Multiplayer Joke Game</h1>
            <h2>Player 1: {player1Name}</h2>
            <h2>Player 2: {player2Name}</h2>
            <SubmitJoke gameId={gameId} player1Name={player1Name} player2Name={player2Name} onJokeSubmitted={handleJokeSubmitted} />
            <div>
                <h2>Scores</h2>
                <p>{player1Name}: {scores?.player1 || 0}</p>
                <p>{player2Name}: {scores?.player2 || 0}</p>
            </div>
            {winner && (
                <div>
                    <p>Winner: {winner}</p>
                    <button onClick={handleGameRestart}>Keep Playing</button>
                    <button onClick={handleGameRestart}>Start New Game</button>
                </div>
            )}
        </div>
    );
};

export default App;