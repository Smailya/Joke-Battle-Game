// backend/models/Game.js

class Game {
    constructor(player1Name, player2Name) {
        this.player1Name = player1Name;
        this.player2Name = player2Name;
        this.player1Score = 0;
        this.player2Score = 0;
        this.winnerName = null;
        this.createdAt = new Date();
        this.player1Joke = null; // Add these properties to store jokes
        this.player2Joke = null;
    }

    // Method to update scores
    updateScore(playerName) {
        if (playerName === this.player1Name) {
            this.player1Score += 1;
        } else if (playerName === this.player2Name) {
            this.player2Score += 1;
        }
    }

    // Method to determine the winner
    determineWinner() {
        if (this.player1Score >= 3) {
            this.winnerName = this.player1Name;
        } else if (this.player2Score >= 3) {
            this.winnerName = this.player2Name;
        }
    }
}

module.exports = Game;
