//! Définir l'accès au serveur
const hostname = 'http://127.0.0.1';
const port = 3000;

//! Importer Express dans le projet
const express = require('express');

//! Importer http-status-code poour gérer les codes de réponse des api
const { StatusCodes } = require('http-status-codes');

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

//? Routage concernant les Contacts
app.use('/contacts', contactRoute);

app.use( (req, res) => {
    res
        .status(StatusCodes.NOT_FOUND)
        .send('Route non trouvée.')
});

//! Ecouter les erreurs émisent par le middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.log(err);
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Erreur interne du serveur');
})

//! Ecouter le port
app.listen(3000, () => {
    console.log(`Application lancée sur ${hostname}:${port}`);
})