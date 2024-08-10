// frontend/src/SubmitJoke.js

import React, { useState } from 'react';
import axios from 'axios';

const SubmitJoke = ({ gameId, player1Name, player2Name, onJokeSubmitted }) => {
    const [player1Joke, setPlayer1Joke] = useState('');
    const [player2Joke, setPlayer2Joke] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading

    const submitJokes = async () => {
        setLoading(true); // Set loading to true before the request
        setResponseMessage(''); // Clear previous messages

        try {
            // Log the jokes being submitted
            console.log('Submitting jokes:', { player1Joke, player2Joke });

            const response = await axios.post(`http://localhost:5000/api/games/${gameId}/submit`, {
                player1Joke,
                player2Joke,
            });

            console.log('Submit jokes response:', response.data); // Log the response

            setResponseMessage(`Jokes submitted! ${response.data.message}`);
            onJokeSubmitted(response.data.scores, response.data.winner); // Pass updated scores and winner back to parent component
            setPlayer1Joke(''); // Clear the joke inputs
            setPlayer2Joke('');
        } catch (error) {
            // Log the error response for debugging
            console.error('Error submitting jokes:', error.response ? error.response.data : error.message);
            setResponseMessage('Failed to submit jokes. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <h2>{player1Name}, Enter Your Joke</h2>
            <textarea
                placeholder="Enter your joke here..."
                value={player1Joke}
                onChange={(e) => setPlayer1Joke(e.target.value)}
            />
            <h2>{player2Name}, Enter Your Joke</h2>
            <textarea
                placeholder="Enter your joke here..."
                value={player2Joke}
                onChange={(e) => setPlayer2Joke(e.target.value)}
            />
            <button onClick={submitJokes} disabled={loading}>Submit Jokes</button>
            {loading && <p>Loading...</p>} {/* Show loading message */}
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default SubmitJoke;
