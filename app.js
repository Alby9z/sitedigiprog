const express = require('express');
const path = require('path');
const app = express();

// Configuration du port
const PORT = process.env.PORT || 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route de base
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
