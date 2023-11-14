//! Définir l'accès au serveur
const hostname = 'http://127.0.0.1';
const port = 3000;

//! Importer Express dans le projet
const express = require('express');

//! Importer body-parser pour gérer le body des requêtes
const bodyParser = require('body-parser');

//! Importer Mongoose
const mongoose = require('mongoose');

//! Importer le routeur contact.routes
const contactRoute = require('./routes/contact.routes');

//! Créer l'application
const app = express();

//! Paramétrer body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//! Connecter la base de données
mongoose.connect('mongodb://localhost/carnet-adresses');

//! Gérer les routes
app.get('/', (req, res) => {
    res.send('OK')
})

app.use('/', contactRoute);

app.use( (req, res) => {
    res.status(404).send('Route non trouvée.')
});

//! Ecouter le port
app.listen(3000, () => {
    console.log(`Application lancée sur ${hostname}:${port}`);
})