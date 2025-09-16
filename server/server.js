const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 25515;

// Enable CORS for all routes

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint to serve data.json


// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/public/index.html'), err => {
        if (err) {
            console.error('Error serving index.html:', err);
            res.status(500).send('Server error: Unable to load index.html');
        }
    });
});

// Catch-all for debugging 404s


app.listen(port,'0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});