// Exemple de configuration de la route dans Express.js
const express = require('express');
const app = express();
const port = 5000;

// Route GET pour /api/hotels
app.get('/api/hotels', (req, res) => {
  // Logique pour récupérer les hôtels depuis la base de données par exemple
  const hotels = [
    { id: 1, name: 'Hotel A' },
    { id: 2, name: 'Hotel B' },
  ];

  res.json(hotels); // Renvoyer les hôtels en tant que JSON
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
