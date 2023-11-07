//? Importer Express
const express = require("express");
const app = express();

//? Importer Express-session
const session = require('express-session');

//? Import du package Express-fileupload
const fileUpload = require('express-fileupload');

//? Importer Flash (pour la gestion des messages d'erreur entre contrôleur et vue)
const flash = require('connect-flash');

//? Importer Mongoose
const mongoose = require('mongoose');

//? Connecter la base de données
mongoose.connect('mongodb://localhost/phototheque');

//? Importer Path (pour gérer les chemins d'accès)
const path = require('path');

//? Définir les variables d'accès à l'application
const hostname = "http://127.0.0.1";
const port = 3000;

//? Configurer l'utilisation des body de requête en json (sinon il est impossible de lire le body des requête POST)
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//? Configurer l'upload des fichiers
app.use(fileUpload());;

//? Déclarer l'utilisation dded EJS comme moteur de template
app.set('view engine', 'ejs');

//? Importer le router album
const albumRoutes = require ('./routes/album.routes');

//? Déclarer le répertoire qui contient les views (on joint le répertoire du fichier index.js et 'views' qui est le nom du dossier contenant les vues)
app.set('views', path.join(__dirname, 'views'));

//? Déclarer le dossier  qui contient les fichiers statiques du projet
app.use(express.static('public'));

//? Paramétrer Express-session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'hWogB3lmrirYAZF9gUIV2ApykyBnk9W5',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true } //Ne fonctionne pas en localhost car pas de SSL
}))

//? Paramétrer Flash
app.use(flash()); // Pas besoin de copier les autres lignes précisées dans la doc car express-session les gère déjà

//? Lier le router album à notre application
app.use('/', albumRoutes);

//? Définir les routes
app.get('/', (req, res) => {
    res.redirect('/albums');
});

app.use((req, res) => {
    res.status(404);
    res.send("Page non trouvée");;
})

//? Ecoute du port 3000
app.listen(3000, () => {
    console.log(`Application lancée sur ${hostname}:${port}`);
})