// server.js
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static files (your HTML/CSS/JS)
app.use(express.static(__dirname));

// Simple mock recipes route
app.get('/api/recipes', (req, res) => {
  // return a small mock set of recipes
  const recipes = [
    { _id: '1', name: 'Tomato Pasta', ingredients: ['tomato', 'pasta', 'garlic'], time: 20 },
    { _id: '2', name: 'Egg Fried Rice', ingredients: ['rice', 'egg', 'soy sauce'], time: 15 }
  ];
  res.json(recipes);
});

// fallback route to serve discover page if needed
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'discover.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
