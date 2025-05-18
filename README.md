# Multiplayer Joke Game Battle

## Overview

**Multiplayer Joke Game Battle** is a web-based multiplayer game where two players compete by submitting their funniest jokes. The winner of each round is determined by the **OpenAI API**, which evaluates the jokes and selects the funniest submission. The game supports continuous play with real-time evaluation and score tracking, making it a fun and engaging experience.

This project demonstrates how full-stack engineers can combine gamification, real-time interactions, and AI-based decision-making to build interactive applications that boost user engagement.

## Technologies Used

### Frontend
- React  
- JavaScript  
- Axios  

### Backend
- Node.js  
- Express  
- OpenAI API  

## Features

- Player name input for two players  
- Text boxes for each player to submit their jokes  
- Single "Submit Jokes" button to submit both jokes simultaneously  
- Integration with OpenAI API to evaluate jokes and determine the winner  
- Score tracking for each player across rounds  
- Options to continue playing or start a new game after each round  
- Real-time gameplay and evaluation  

## Getting Started

### Prerequisites

- Node.js (v14 or higher)  
- npm (Node Package Manager)  

### Installation

1. Clone the repository:

git clone https://github.com/yourusername/multiplayer-joke-game.git

text

2. Navigate into the project directory:

cd multiplayer-joke-game

text

3. Install dependencies for both frontend and backend:

- For backend:

  ```
  cd backend
  npm install
  ```

- For frontend:

  ```
  cd ../frontend
  npm install
  ```

4. Configure your OpenAI API key in the backend environment variables (e.g., `.env` file):

OPENAI_API_KEY=your_openai_api_key_here

text

5. Run the backend server:

cd ../backend
npm start

text

6. Run the frontend app:

cd ../frontend
npm start

text

7. Open your browser and navigate to `http://localhost:3000` to start playing.

## How It Works

- Players enter their names and submit jokes through the frontend interface.  
- The backend sends both jokes to the OpenAI API, which evaluates their humor and selects a winner.  
- Scores are updated and displayed in real-time.  
- Players can continue playing or reset the game for a fresh start.

## Why This Matters

This project highlights key skills for full-stack engineers:

- Designing backend logic for game state and session management  
- Managing real-time user interactions  
- Automating decision-making using AI APIs  
- Creating engaging gamified experiences that increase user retention  

These capabilities are valuable for companies building branded experiences, user-generated content platforms, or interactive marketing tools.

## Contributing

Contributions are welcome! Please open issues or submit pull requests to improve features or fix bugs.

## License

This project is licensed under the MIT License.

---

Developed by Ismail Cisse 
Combining AI and gamification to create fun, interactive multiplayer experiences.
