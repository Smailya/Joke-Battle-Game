// frontend/src/index.js

import './app.css';  // Corrected path
import './index.css';      // Ensure this file exists in the src directory
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import your main App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
